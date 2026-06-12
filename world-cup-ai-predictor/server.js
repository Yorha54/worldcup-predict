const http = require("http");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || "127.0.0.1";
const DATA_DIR = process.env.DATA_DIR || ROOT;
const SCOREBOARD = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world";
const LIVE_INTERVAL = 2 * 60 * 1000;
const IDLE_INTERVAL = 3 * 60 * 60 * 1000;
const runtimePath = path.join(DATA_DIR, "runtime-data.json");

fs.mkdirSync(DATA_DIR, { recursive: true });
let runtime = readJson(runtimePath, { updatedAt: null, mode: "starting", matches: {}, teamTournamentForm: {}, news: [], schedule: [] });
let timer;
const metaSandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "schedule-data.js"), "utf8"), metaSandbox);
const teamMeta = metaSandbox.window.WORLD_CUP_TEAM_META || {};
const aliases = metaSandbox.window.WORLD_CUP_TEAM_ALIASES || {};

function zhName(name) {
  return teamMeta[aliases[name] || name]?.name || name;
}

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch { return fallback; }
}

function writeRuntime() {
  const temporary = `${runtimePath}.tmp`;
  fs.writeFileSync(temporary, JSON.stringify(runtime, null, 2));
  fs.renameSync(temporary, runtimePath);
}

async function getJson(url) {
  const response = await fetch(url, { headers: { "User-Agent": "WorldCupAnalysis/1.0" } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
}

function dateStrings() {
  const dates = [];
  for (let day = 11; day <= 27; day += 1) dates.push(`202606${String(day).padStart(2, "0")}`);
  return dates;
}

async function getEventsForDates(dates) {
  const payloads = await Promise.all(dates.map(date => getJson(`${SCOREBOARD}/scoreboard?dates=${date}&limit=100`)));
  const events = new Map();
  payloads.flatMap(item => item.events || []).forEach(event => events.set(event.id, event));
  return [...events.values()];
}

function activeDateStrings() {
  const now = new Date();
  return [-1, 0, 1].map(offset => {
    const date = new Date(now.getTime() + offset * 86400000);
    return `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, "0")}${String(date.getUTCDate()).padStart(2, "0")}`;
  });
}

async function getEvents() {
  const scheduleIsStale = !runtime.scheduleUpdatedAt || Date.now() - new Date(runtime.scheduleUpdatedAt).getTime() >= IDLE_INTERVAL || !runtime.schedule?.length;
  if (scheduleIsStale) {
    const events = await getEventsForDates(dateStrings());
    runtime.scheduleUpdatedAt = new Date().toISOString();
    return events;
  }
  const active = await getEventsForDates(activeDateStrings());
  const merged = new Map((runtime.schedule || []).map(event => [event.id, event]));
  active.forEach(event => merged.set(event.id, event));
  return [...merged.values()];
}

function teamEntries(event) {
  const entries = event.competitions?.[0]?.competitors || [];
  return {
    home: entries.find(item => item.homeAway === "home"),
    away: entries.find(item => item.homeAway === "away")
  };
}

function statMap(team) {
  return Object.fromEntries((team?.statistics || []).map(stat => [stat.name, Number(stat.value ?? stat.displayValue ?? 0)]));
}

function clockMinute(detail) {
  const raw = detail?.header?.competitions?.[0]?.status?.displayClock || detail?.header?.competitions?.[0]?.status?.type?.detail || "0";
  const match = String(raw).match(/\d+/);
  return Math.min(120, Number(match?.[0] || 0));
}

function buildLiveAnalysis(detail) {
  const competition = detail.header?.competitions?.[0];
  const entries = competition?.competitors || [];
  const homeEntry = entries.find(item => item.homeAway === "home");
  const awayEntry = entries.find(item => item.homeAway === "away");
  const teams = detail.boxscore?.teams || [];
  const homeBox = teams.find(item => item.team?.id === homeEntry?.team?.id) || teams[0];
  const awayBox = teams.find(item => item.team?.id === awayEntry?.team?.id) || teams[1];
  const hs = statMap(homeBox);
  const as = statMap(awayBox);
  const minute = clockMinute(detail);
  const completed = competition?.status?.type?.completed;
  const homeScore = Number(homeEntry?.score || 0);
  const awayScore = Number(awayEntry?.score || 0);
  const homeName = zhName(homeEntry?.team?.displayName || "主队");
  const awayName = zhName(awayEntry?.team?.displayName || "客队");
  const shotEdge = (hs.totalShots || 0) - (as.totalShots || 0);
  const targetEdge = (hs.shotsOnTarget || 0) - (as.shotsOnTarget || 0);
  const possessionEdge = (hs.possessionPct || 50) - (as.possessionPct || 50);
  const redEdge = (as.redCards || 0) - (hs.redCards || 0);
  let homeWin = 36 + (homeScore - awayScore) * Math.max(10, minute / 3) + shotEdge * 1.2 + targetEdge * 2 + possessionEdge * .25 + redEdge * 12;
  let awayWin = 32 + (awayScore - homeScore) * Math.max(10, minute / 3) - shotEdge * 1.2 - targetEdge * 2 - possessionEdge * .25 - redEdge * 12;
  let draw = Math.max(6, 100 - homeWin - awayWin);
  homeWin = Math.max(2, homeWin); awayWin = Math.max(2, awayWin);
  const total = homeWin + awayWin + draw;
  const probabilities = completed ? (homeScore > awayScore ? [100, 0, 0] : homeScore < awayScore ? [0, 0, 100] : [0, 100, 0]) : [homeWin, draw, awayWin].map(value => Math.round(value / total * 100));
  if (!completed) probabilities[1] += 100 - probabilities.reduce((sum, value) => sum + value, 0);
  const sortedProbabilities = [...probabilities].sort((a, b) => b - a);
  const confidence = completed ? 100 : Math.min(96, Math.max(58, Math.round(58 + minute * .18 + (sortedProbabilities[0] - sortedProbabilities[1]) * .35 + ((hs.totalShots || 0) + (as.totalShots || 0)) * .2 + ((hs.redCards || 0) + (as.redCards || 0)) * 4)));

  const controlTeam = possessionEdge > 8 ? homeName : possessionEdge < -8 ? awayName : null;
  const dangerTeam = targetEdge > 1 ? homeName : targetEdge < -1 ? awayName : null;
  const sections = [
    `${minute || "当前"}分钟，比分 ${homeScore}-${awayScore}。${controlTeam ? `${controlTeam}控球更主动` : "双方控球接近"}，控球率为 ${hs.possessionPct || 0}% 对 ${as.possessionPct || 0}%。`,
    `射门 ${hs.totalShots || 0}-${as.totalShots || 0}、射正 ${hs.shotsOnTarget || 0}-${as.shotsOnTarget || 0}。${dangerTeam ? `${dangerTeam}目前制造的真实门前威胁更高` : "两队高质量机会差距不大"}。`,
    `角球 ${hs.wonCorners || 0}-${as.wonCorners || 0}，犯规 ${hs.foulsCommitted || 0}-${as.foulsCommitted || 0}，红牌 ${hs.redCards || 0}-${as.redCards || 0}。${redEdge ? "人数变化已经显著改变比赛预期。" : "人数仍然均等，比赛结构尚未被纪律事件打破。"}`,
    completed ? `赛后结论：${homeScore > awayScore ? homeName : homeScore < awayScore ? awayName : "双方"}${homeScore === awayScore ? "各取一分" : "把场面或机会优势转化成了结果"}。这场实战数据会自动进入下一轮预测，修正球队进攻效率、防守稳定性和阵容使用评价。` : minute < 30 ? "接下来重点看先失控的一方能否降低转换频率；首球会大幅改变双方原定计划。" : minute < 70 ? "未来15分钟通常是教练首次主动调整的窗口，边路体能与中场第二点会决定下一波攻势。" : "比赛进入结果管理阶段。领先方会降低风险，落后方的边后卫和定位球投入将明显增加。"
  ];
  const important = (detail.keyEvents || []).filter(event => ["Goal", "Red Card", "Yellow Card", "Substitution", "Penalty"].some(type => event.type?.text?.includes(type))).slice(-8).map(event => ({ time: event.clock?.displayValue || "", type: event.type?.text || "事件", text: event.text || "比赛关键事件" }));
  return { minute, score: [homeScore, awayScore], probabilities, confidence, stats: { home: hs, away: as }, sections, events: important, updatedAt: new Date().toISOString() };
}

function updateTournamentForm(event, detail) {
  const status = event.status?.type;
  if (!status?.completed) return;
  const { home, away } = teamEntries(event);
  if (!home || !away) return;
  const key = String(event.id);
  if (runtime.matches[key]?.formApplied) return;
  const analysis = buildLiveAnalysis(detail);
  [[home, away, "home"], [away, home, "away"]].forEach(([team, opponent, side]) => {
    const scored = Number(team.score || 0), conceded = Number(opponent.score || 0);
    const result = scored > conceded ? "胜" : scored < conceded ? "负" : "平";
    const stats = analysis.stats[side];
    const name = team.team.displayName;
    runtime.teamTournamentForm[name] ||= { played: 0, points: 0, goalsFor: 0, goalsAgainst: 0, reports: [] };
    const form = runtime.teamTournamentForm[name];
    form.played += 1; form.points += result === "胜" ? 3 : result === "平" ? 1 : 0; form.goalsFor += scored; form.goalsAgainst += conceded;
    form.reports.push({ eventId: key, opponent: zhName(opponent.team.displayName), result, score: `${scored}-${conceded}`, possession: stats.possessionPct || 0, shots: stats.totalShots || 0, shotsOnTarget: stats.shotsOnTarget || 0, summary: `${result}${zhName(opponent.team.displayName)}：控球${stats.possessionPct || 0}%，射门${stats.totalShots || 0}次、射正${stats.shotsOnTarget || 0}次。` });
  });
  runtime.matches[key] ||= {};
  runtime.matches[key].formApplied = true;
}

async function refreshNews() {
  const feeds = [
    "https://news.google.com/rss/search?q=2026+World+Cup+team+news&hl=en-US&gl=US&ceid=US:en",
    "https://news.google.com/rss/search?q=2026%E4%B8%96%E7%95%8C%E6%9D%AF+%E7%90%83%E9%98%9F+%E4%BC%A4%E7%97%85&hl=zh-CN&gl=CN&ceid=CN:zh-Hans"
  ];
  const items = [];
  for (const url of feeds) {
    try {
      const response = await fetch(url, { headers: { "User-Agent": "WorldCupAnalysis/1.0" } });
      const xml = await response.text();
      for (const match of xml.matchAll(/<item>[\s\S]*?<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>[\s\S]*?<link>([\s\S]*?)<\/link>[\s\S]*?<pubDate>([\s\S]*?)<\/pubDate>[\s\S]*?<\/item>/g)) {
        const title = match[1].replace(/<[^>]+>/g, "").replaceAll("&amp;", "&").trim();
        const sourceMatch = title.match(/\s+-\s+([^-]+)$/);
        items.push({ title, source: sourceMatch?.[1]?.trim() || "新闻来源", url: match[2].trim().replaceAll("&amp;", "&"), publishedAt: match[3].trim() });
      }
    } catch {}
  }
  runtime.news = [...new Map(items.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)).map(item => [item.title, item])).values()].slice(0, 40);
  runtime.newsUpdatedAt = new Date().toISOString();
}

function nextDelay(events, liveEvents) {
  if (liveEvents.length) return LIVE_INTERVAL;
  const now = Date.now();
  const inMatchWindow = events.some(event => {
    const kickoff = new Date(event.date).getTime();
    return kickoff <= now && now <= kickoff + 3 * 60 * 60 * 1000 && !event.status?.type?.completed;
  });
  if (inMatchWindow) return LIVE_INTERVAL;
  const nextKickoff = events.map(event => new Date(event.date).getTime()).filter(time => time > now).sort((a, b) => a - b)[0];
  if (!nextKickoff) return IDLE_INTERVAL;
  return Math.max(30 * 1000, Math.min(IDLE_INTERVAL, nextKickoff - now + 15 * 1000));
}

async function update() {
  try {
    const events = await getEvents();
    const liveEvents = events.filter(event => event.status?.type?.state === "in");
    const recentlyCompleted = events.filter(event => event.status?.type?.completed).slice(-12);
    for (const event of [...liveEvents, ...recentlyCompleted]) {
      try {
        const detail = await getJson(`${SCOREBOARD}/summary?event=${event.id}`);
        runtime.matches[event.id] = { ...(runtime.matches[event.id] || {}), analysis: buildLiveAnalysis(detail), state: event.status.type.state, status: event.status.type.description };
        updateTournamentForm(event, detail);
      } catch (error) { console.error("detail", event.id, error.message); }
    }
    runtime.schedule = events;
    const newsIsStale = !runtime.newsUpdatedAt || Date.now() - new Date(runtime.newsUpdatedAt).getTime() >= IDLE_INTERVAL;
    if (!liveEvents.length && newsIsStale) await refreshNews();
    runtime.updatedAt = new Date().toISOString();
    runtime.mode = liveEvents.length ? "live" : "idle";
    const delay = nextDelay(events, liveEvents);
    runtime.nextUpdateAt = new Date(Date.now() + delay).toISOString();
    writeRuntime();
    console.log(`[${new Date().toISOString()}] updated: ${liveEvents.length} live, next ${runtime.mode}`);
    clearTimeout(timer);
    timer = setTimeout(update, delay);
  } catch (error) {
    console.error("update failed", error.message);
    clearTimeout(timer);
    timer = setTimeout(update, LIVE_INTERVAL);
  }
}

const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml" };
const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  if (pathname === "/health") {
    response.writeHead(200, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
    return response.end(JSON.stringify({ ok: true, mode: runtime.mode, updatedAt: runtime.updatedAt, nextUpdateAt: runtime.nextUpdateAt }));
  }
  if (pathname === "/api/runtime") {
    response.writeHead(200, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
    return response.end(JSON.stringify(runtime));
  }
  const file = pathname === "/" ? path.join(ROOT, "index.html") : path.join(ROOT, pathname);
  if (!file.startsWith(ROOT)) return response.writeHead(403).end("Forbidden");
  fs.readFile(file, (error, data) => {
    if (error) return response.writeHead(404).end("Not found");
    response.writeHead(200, { "Content-Type": mime[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-cache" });
    response.end(data);
  });
});

server.listen(PORT, HOST, () => { console.log(`World Cup analyzer: http://${HOST}:${PORT}`); update(); });
process.on("SIGTERM", () => server.close(() => process.exit(0)));
process.on("SIGINT", () => server.close(() => process.exit(0)));
