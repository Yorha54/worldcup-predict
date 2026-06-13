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

function phaseForecast(minute, homeName, awayName, homeScore, awayScore, homePressure, awayPressure) {
  const leader = homeScore > awayScore ? homeName : awayScore > homeScore ? awayName : null;
  const trailer = homeScore > awayScore ? awayName : awayScore > homeScore ? homeName : null;
  const pressureTeam = homePressure > awayPressure + 8 ? homeName : awayPressure > homePressure + 8 ? awayName : null;
  if (minute < 20) return `${pressureTeam ? `${pressureTeam}开局施压更有效，但样本仍小` : "开局尚未形成单向压制"}。未来10分钟要看后腰能否在第一次逼抢后保护中路；首球会迫使落后一方提前改变原计划。`;
  if (minute < 45) return `${leader ? `${leader}接下来会在继续进攻与控制风险之间选择，${trailer}必须提高向前传球速度` : "比分仍胶着，半场前的定位球和禁区前沿犯规价值上升"}。若压迫强度下降，第二点球可能成为下一次明显机会的来源。`;
  if (minute < 65) return `进入教练主动调整窗口。${pressureTeam ? `${pressureTeam}应利用当前压力增加禁区人数` : "双方需要通过换人明确是加强边路、增加中锋，还是补充中场控制"}；最值得观察的是替补登场后首先攻击哪一侧。`;
  if (minute < 80) return `${leader ? `${leader}会逐步收窄阵型，${trailer}则需要让边后卫更靠前并增加传中、远射和定位球` : "平局下双方都要权衡一分与冒险争胜，替补速度点可能决定最后十分钟的场地倾斜"}。体能下降后，边后卫身后和禁区弧顶会成为主要薄弱区域。`;
  return `${leader ? `${leader}现在的首要目标是减少无保护的丢球，${trailer}会把更多球员推入禁区` : "最后阶段任何一次失误、定位球或门将处理都可能直接决定结果"}。补时长度、二点球和反击时是否选择正确传球，将比整体控球率更重要。`;
}

function buildPostMatchReview(homeName, awayName, homeScore, awayScore, hs, as) {
  const winner = homeScore > awayScore ? homeName : awayScore > homeScore ? awayName : null;
  const loser = homeScore > awayScore ? awayName : awayScore > homeScore ? homeName : null;
  const homeShots = hs.totalShots || 0, awayShots = as.totalShots || 0;
  const homeTargets = hs.shotsOnTarget || 0, awayTargets = as.shotsOnTarget || 0;
  const homePossession = hs.possessionPct || 0, awayPossession = as.possessionPct || 0;
  const homeCorners = hs.wonCorners || 0, awayCorners = as.wonCorners || 0;
  const homeEfficiency = homeTargets ? homeScore / homeTargets : 0;
  const awayEfficiency = awayTargets ? awayScore / awayTargets : 0;
  const dominant = homeShots + homeTargets * 1.8 > awayShots + awayTargets * 1.8 + 5 ? homeName : awayShots + awayTargets * 1.8 > homeShots + homeTargets * 1.8 + 5 ? awayName : null;
  const headline = winner ? `${winner}以 ${homeScore}-${awayScore} 取胜。${dominant === winner ? "赛果与机会优势基本一致。" : dominant === loser ? "胜方在场面不占优时展现了更高效率与比赛管理。" : "比赛整体接近，关键阶段的处理决定结果。"}` : `双方 ${homeScore}-${awayScore} 战平。两队都制造了得分阶段，但没有把优势持续转化为胜势。`;
  const homeEvaluation = `${homeName}控球 ${homePossession}%，完成 ${homeShots} 次射门、${homeTargets} 次射正和 ${homeCorners} 个角球。${homeScore > awayScore ? (homeEfficiency >= .45 ? "进攻机会转化效率较高，领先后对比赛风险的处理也更成熟。" : "虽然取胜，但射正转化仍有提升空间，胜利更多来自持续施压或关键球。") : homeScore < awayScore ? (homeTargets >= awayTargets ? "并非没有机会，但门前处理和防守关键回合不如对手。" : "推进难以稳定转成高质量射门，落后后也未能形成持续压制。") : "场面贡献足以拿分，但要赢球仍需提高最后一传和射门质量。"}`;
  const awayEvaluation = `${awayName}控球 ${awayPossession}%，完成 ${awayShots} 次射门、${awayTargets} 次射正和 ${awayCorners} 个角球。${awayScore > homeScore ? (awayEfficiency >= .45 ? "反击或关键机会把握非常有效，比赛计划执行清楚。" : "通过更完整的攻防阶段赢下比赛，但仍有未被兑现的机会。") : awayScore < homeScore ? (awayTargets >= homeTargets ? "创造力并不落后，问题集中在效率、失球时机和领先区域的防守。" : "多数时间未能把球推进到真正危险区域，进攻支援和禁区人数不足。") : "防守韧性帮助球队保住积分，下一场需要增加主动进攻阶段。"}`;
  const decisiveFactors = `${homeTargets}-${awayTargets} 的射正、${homeCorners}-${awayCorners} 的角球以及 ${homeScore}-${awayScore} 的机会转化共同说明：${winner ? `${winner}在决定比分的回合中处理更准确` : "双方在机会质量和转化上没有拉开足够差距"}。${(hs.redCards || 0) + (as.redCards || 0) ? `本场红牌为 ${hs.redCards || 0}-${as.redCards || 0}，人数变化也是比赛结构的重要转折。` : "比赛没有因红牌形成长期人数失衡。"}`;
  const nextImpact = `这场真实数据会写入两队本届世界杯档案，下一轮将据此调整进攻效率、防守稳定性、预期进球、胜平负概率和模型信心。`;
  return { headline, homeEvaluation, awayEvaluation, decisiveFactors, nextImpact };
}

function translateEvent(event) {
  const type = event.type?.text || "事件";
  const raw = event.text || "比赛关键事件";
  const teamNames = Object.keys(teamMeta).sort((a, b) => b.length - a.length);
  const localizeTeam = value => teamNames.reduce((text, name) => text.replaceAll(name, zhName(name)), value);
  let match;
  if (type.includes("Goal") && (match = raw.match(/Goal!\s*([^.]*)\.\s*([^.(]+)(?:\s*\(([^)]+)\))?/i))) {
    const scoreLine = localizeTeam(match[1].trim());
    const scorer = match[2].trim();
    const assist = raw.match(/Assisted by ([^.]+)\./i)?.[1];
    return { type: "进球", text: `进球：${scorer}破门，场上比分变为 ${scoreLine}${assist ? `，助攻：${assist.trim()}` : ""}。` };
  }
  if (type.includes("Substitution") && (match = raw.match(/Substitution,\s*([^.]+)\.\s*([^.]*) replaces ([^.]+)\./i))) return { type: "换人", text: `换人：${localizeTeam(match[1].trim())}用 ${match[2].trim()} 换下 ${match[3].trim()}。` };
  if (type.includes("Red Card")) {
    const player = raw.match(/^([^.(]+)/)?.[1]?.trim() || "一名球员";
    const team = raw.match(/\(([^)]+)\)/)?.[1];
    return { type: "红牌", text: `红牌：${player}${team ? `（${localizeTeam(team)}）` : ""}被罚下，比赛人数平衡发生变化。` };
  }
  if (type.includes("Yellow Card")) {
    const player = raw.match(/^([^.(]+)/)?.[1]?.trim() || "一名球员";
    const team = raw.match(/\(([^)]+)\)/)?.[1];
    return { type: "黄牌", text: `黄牌：${player}${team ? `（${localizeTeam(team)}）` : ""}因本次犯规受到警告。` };
  }
  if (type.includes("Penalty")) return { type: "点球", text: "点球事件：裁判判罚点球，这次判罚直接影响了比赛的重要阶段。" };
  return { type: "比赛事件", text: "比赛关键事件已记录，后台将继续整理为中文说明。" };
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
  const homePressure = (hs.totalShots || 0) * 2 + (hs.shotsOnTarget || 0) * 5 + (hs.wonCorners || 0) * 1.5;
  const awayPressure = (as.totalShots || 0) * 2 + (as.shotsOnTarget || 0) * 5 + (as.wonCorners || 0) * 1.5;
  const homeAccuracy = hs.totalShots ? Math.round((hs.shotsOnTarget || 0) / hs.totalShots * 100) : 0;
  const awayAccuracy = as.totalShots ? Math.round((as.shotsOnTarget || 0) / as.totalShots * 100) : 0;
  const passingTeam = possessionEdge > 5 ? homeName : possessionEdge < -5 ? awayName : null;
  const sections = [
    completed ? `全场结束，${homeName} ${homeScore}-${awayScore} ${awayName}。${controlTeam ? `${controlTeam}拥有更多控球` : "双方控球接近"}，最终控球率为 ${hs.possessionPct || 0}% 对 ${as.possessionPct || 0}%。比分已经成为事实，以下内容仅作比赛复盘。` : `${minute || "当前"}分钟，比分 ${homeScore}-${awayScore}。${controlTeam ? `${controlTeam}控球更主动` : "双方控球接近"}，控球率为 ${hs.possessionPct || 0}% 对 ${as.possessionPct || 0}%。${homeScore === awayScore ? "比分尚未迫使任何一方彻底放弃赛前结构。" : "当前比分已经开始改变两队的风险选择。"}`,
    `射门 ${hs.totalShots || 0}-${as.totalShots || 0}、射正 ${hs.shotsOnTarget || 0}-${as.shotsOnTarget || 0}，射正率约 ${homeAccuracy}%-${awayAccuracy}%。${dangerTeam ? `${dangerTeam}${completed ? "全场" : "目前"}制造的真实门前威胁更高` : completed ? "两队全场机会质量差距不大" : "两队机会质量接近或样本仍小"}；射门的区域、压力和防守是否失位，比单纯数量更能解释结果。`,
    `${passingTeam ? `${passingTeam}更能把比赛留在自己脚下` : "两队在球权控制上没有明显分界"}。结合射门和角球计算的压力值约为 ${Math.round(homePressure)}-${Math.round(awayPressure)}，${homePressure > awayPressure + 8 ? `${homeName}的连续进攻更完整` : awayPressure > homePressure + 8 ? `${awayName}的连续进攻更完整` : "场面在双方之间反复转换"}。${completed ? "这一数据反映了全场攻势持续性，但最终仍需与进球效率一同判断。" : "下一步要看第一脚向前传球能否越过对方中场。"}`,
    `角球 ${hs.wonCorners || 0}-${as.wonCorners || 0}，犯规 ${hs.foulsCommitted || 0}-${as.foulsCommitted || 0}，黄牌 ${hs.yellowCards || 0}-${as.yellowCards || 0}，红牌 ${hs.redCards || 0}-${as.redCards || 0}。${redEdge ? completed ? "人数变化显著改变了比赛结构，少打一方被迫缩短阵型并减少进攻投入。" : "人数变化已显著改变攻守预期，少打一方必须缩短阵型并减少无谓压上。" : completed ? "全场没有出现红牌导致的长期人数失衡，比赛主要由十一对十一阶段决定。" : "人数仍然均等，但累积黄牌会降低后卫后续上抢强度。"}`,
    completed ? `体能与换人复盘：最终射门、射正和控球反映的是整场结果，不代表每个阶段都由同一方占优。需要结合关键事件判断换人是否提升了推进速度，以及领先方是否成功保护了边路和禁区弧顶。` : `${minute < 55 ? "首批换人尚可能改变中场人数和边路速度" : "比赛已经进入换人直接改变对位的阶段"}。当前更需要保护的区域是${homePressure > awayPressure + 8 ? `${awayName}禁区前沿与边后卫身后` : awayPressure > homePressure + 8 ? `${homeName}禁区前沿与边后卫身后` : "双方后腰身侧和第二点区域"}。`,
    completed ? `赛后结论：${homeScore > awayScore ? homeName : homeScore < awayScore ? awayName : "双方"}${homeScore === awayScore ? "各取一分" : "把关键阶段的机会转化成了结果"}。这场实战会自动进入下一轮预测，修正进攻效率、防守稳定性、阵容使用和模型信心。` : phaseForecast(minute, homeName, awayName, homeScore, awayScore, homePressure, awayPressure)
  ];
  const important = (detail.keyEvents || []).filter(event => ["Goal", "Red Card", "Yellow Card", "Substitution", "Penalty"].some(type => event.type?.text?.includes(type))).slice(-8).map(event => ({ time: event.clock?.displayValue || "", ...translateEvent(event) }));
  const review = completed ? buildPostMatchReview(homeName, awayName, homeScore, awayScore, hs, as) : null;
  return { minute, completed, score: [homeScore, awayScore], probabilities, confidence, stats: { home: hs, away: as }, sections, events: important, review, updatedAt: new Date().toISOString() };
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
  const previousTranslations = new Map((runtime.news || []).filter(item => item.originalTitle && item.titleZh).map(item => [item.originalTitle, item.titleZh]));
  const unique = [...new Map(items.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)).map(item => [item.title, item])).values()].slice(0, 40);
  runtime.news = await Promise.all(unique.map(async item => {
    const originalTitle = item.title.replace(/\s+-\s+[^-]+$/, "").trim();
    const titleZh = previousTranslations.get(originalTitle) || await translateTitle(originalTitle);
    return { ...item, originalTitle, titleZh, title: titleZh || originalTitle };
  }));
  runtime.newsUpdatedAt = new Date().toISOString();
}

async function translateTitle(title) {
  if (!/[A-Za-z]/.test(title) || /[\u3400-\u9fff]/.test(title)) return title;
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=zh-CN&dt=t&q=${encodeURIComponent(title)}`;
    const response = await fetch(url, { headers: { "User-Agent": "WorldCupAnalysis/1.0" }, signal: AbortSignal.timeout(8000) });
    if (!response.ok) return title;
    const data = await response.json();
    return data?.[0]?.map(part => part?.[0] || "").join("").trim() || title;
  } catch {
    return title;
  }
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
    const ageSeconds = runtime.updatedAt ? Math.round((Date.now() - new Date(runtime.updatedAt).getTime()) / 1000) : null;
    return response.end(JSON.stringify({ ok: true, service: "world-cup-ai-predictor", mode: runtime.mode, updatedAt: runtime.updatedAt, ageSeconds, nextUpdateAt: runtime.nextUpdateAt, liveRefreshSeconds: LIVE_INTERVAL / 1000, idleRefreshSeconds: IDLE_INTERVAL / 1000 }));
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
