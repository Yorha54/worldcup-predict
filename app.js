const demoMatches = [
  {
    id: "fra-bra", stage: "四分之一决赛", date: "模拟 · 7月11日", confidence: 78,
    home: team("法国", "🇫🇷", 2, 2, 46, ["快速转换", "高位压迫", "边路爆点"], "控球不求多，但向前效率极高。擅长在对手失位后的 6 秒内完成纵向推进。", "迪迪埃·德尚", "DD", "务实的杯赛专家 · 4-2-3-1", [
      player("姆巴佩", 10, "皇家马德里", "核心主力", ["爆发速度", "内切射门", "反击终结"]),
      player("楚阿梅尼", 8, "皇家马德里", "主力", ["防守覆盖", "长传转移", "远射"]),
      player("萨利巴", 4, "阿森纳", "主力", ["正面防守", "回追", "出球"]),
      player("登贝莱", 11, "巴黎圣日耳曼", "轮换 / 奇兵", ["双足", "一对一", "创造机会"])
    ]),
    away: team("巴西", "🇧🇷", 5, 1, 38, ["个人突破", "边路围攻", "前场反抢"], "通过边锋制造人数优势，进攻上限很高，但两名边后卫同时前压时身后空间明显。", "多里瓦尔·儒尼奥尔", "DJ", "强调纪律与纵深 · 4-3-3", [
      player("维尼修斯", 7, "皇家马德里", "核心主力", ["左路突破", "速度", "造犯规"]),
      player("罗德里戈", 10, "皇家马德里", "主力", ["无球跑位", "小空间处理", "关键球"]),
      player("吉马良斯", 5, "纽卡斯尔联", "主力", ["节奏控制", "抢断", "向前传球"]),
      player("恩德里克", 9, "皇家马德里", "替补奇兵", ["禁区嗅觉", "对抗", "左脚射门"])
    ]),
    probs: [46, 27, 27], score: [2, 1], result: "法国胜",
    summary: "法国会主动让出部分球权，诱导巴西边后卫前压，再由姆巴佩攻击身后。巴西在左路能持续制造威胁，但中场丢球后的保护可能决定比赛。",
    momentum: [70, 54, 82, 61, 45, 76, 98, 68, 42, 58, 88, 72],
    moments: [["18'", "巴西左路连续冲击"], ["54'", "法国反击打破平衡"], ["82'", "替补球员决定比赛"]],
    history: [["近 5 场状态", 82, "4胜1平"], ["场均进球", 74, "2.0"], ["零封率", 68, "60%"]],
    awayHistory: [["近 5 场状态", 65, "3胜1平1负"], ["场均进球", 69, "1.8"], ["零封率", 48, "40%"]],
    process: [["0–20'", "巴西先声夺人", "巴西通过左路连续形成一对一，法国阵型回收，比赛节奏很快。"], ["20–45'", "法国找到身后", "法国逐渐绕过第一道压迫，反击开始直指巴西右侧防区。"], ["45–70'", "胜负转折", "中场调整后法国加强肋部前插，预计在这一阶段取得领先。"], ["70–90'", "开放式决战", "巴西大举压上追分，双方都有进球机会，替补深度成为关键。"]]
  },
  {
    id: "arg-eng", stage: "半决赛", date: "模拟 · 7月14日", confidence: 72,
    home: team("阿根廷", "🇦🇷", 1, 2, 52, ["中路渗透", "节奏变化", "强硬反抢"], "用耐心传导调动防线，再由前腰和边锋突然提速。领先后的比赛控制尤其成熟。", "利昂内尔·斯卡洛尼", "LS", "灵活而均衡 · 4-3-3", [player("阿尔瓦雷斯", 9, "马德里竞技", "核心主力", ["压迫", "跑位", "终结"]), player("麦卡利斯特", 20, "利物浦", "主力", ["传控", "前插", "定位球"]), player("恩佐", 8, "切尔西", "主力", ["长传", "节奏", "远射"]), player("加纳乔", 17, "曼联", "轮换 / 奇兵", ["速度", "突破", "反击"]) ]),
    away: team("英格兰", "🏴", 4, 1, 44, ["阵地控制", "定位球", "边中结合"], "阵容厚度顶尖，能持续保持对抗强度，但面对低位防守时有时缺少冒险的纵向传球。", "托马斯·图赫尔", "TT", "高强度结构足球 · 4-2-3-1", [player("贝林厄姆", 10, "皇家马德里", "核心主力", ["前插", "对抗", "关键球"]), player("凯恩", 9, "拜仁慕尼黑", "主力", ["终结", "支点", "回撤组织"]), player("萨卡", 7, "阿森纳", "主力", ["右路突破", "内切", "传中"]), player("帕尔默", 19, "切尔西", "轮换 / 奇兵", ["创造力", "点球", "左脚"]) ]),
    probs: [39, 34, 27], score: [2, 1], result: "阿根廷加时胜",
    summary: "这会是一场低容错率的中场争夺。英格兰的身高优势让定位球极具威胁，但阿根廷在比赛节奏和淘汰赛细节上略占上风，常规时间可能难分胜负。",
    momentum: [52, 64, 49, 72, 58, 42, 55, 78, 62, 48, 72, 91],
    moments: [["33'", "英格兰定位球威胁"], ["67'", "阿根廷加强中路渗透"], ["108'", "加时赛出现制胜球"]],
    history: [["近 5 场状态", 88, "4胜1平"], ["场均进球", 70, "1.8"], ["零封率", 72, "60%"]], awayHistory: [["近 5 场状态", 76, "3胜2平"], ["场均进球", 66, "1.7"], ["零封率", 68, "60%"]],
    process: [["0–25'", "谨慎试探", "双方优先封锁中路，身体对抗多于绝对机会。"], ["25–60'", "定位球破局", "英格兰利用身高制造威胁，阿根廷则寻找二点球后的反击。"], ["60–90'", "中场换挡", "阿根廷增加技术型球员，控球优势开始转化为禁区触球。"], ["加时赛", "经验定胜负", "体能下降后空间增多，阿根廷的小范围配合更可能创造制胜球。"]]
  },
  {
    id: "esp-ger", stage: "八分之一决赛", date: "模拟 · 7月5日", confidence: 74,
    home: team("西班牙", "🇪🇸", 3, 3, 49, ["高位控球", "边锋宽度", "三角传递"], "通过极致宽度拉开防线，两侧年轻边锋可以单挑，也能为中路后插上制造空间。", "路易斯·德拉富恩特", "LF", "控制与速度兼备 · 4-3-3", [player("亚马尔", 19, "巴塞罗那", "核心主力", ["右路创造", "内切", "最后一传"]), player("罗德里", 16, "曼城", "主力", ["控场", "拦截", "远射"]), player("尼科·威廉姆斯", 11, "毕尔巴鄂竞技", "主力", ["左路突破", "速度", "传中"]), player("奥尔莫", 10, "巴塞罗那", "轮换 / 主力", ["肋部跑位", "远射", "串联"]) ]),
    away: team("德国", "🇩🇪", 9, 2, 35, ["快速传导", "中场压迫", "肋部进攻"], "善于把比赛推向高节奏，前场技术点很多，但防线面对速度型边锋时容易被拉开。", "尤利安·纳格尔斯曼", "JN", "主动进攻 · 4-2-3-1", [player("穆西亚拉", 10, "拜仁慕尼黑", "核心主力", ["盘带", "摆脱", "肋部渗透"]), player("维尔茨", 17, "利物浦", "主力", ["创造力", "小空间配合", "前插"]), player("基米希", 6, "拜仁慕尼黑", "主力", ["长传", "定位球", "领导力"]), player("沃尔特马德", 9, "斯图加特", "轮换", ["支点", "头球", "做球"]) ]),
    probs: [49, 26, 25], score: [3, 2], result: "西班牙胜",
    summary: "两队都会尝试把比赛掌握在自己脚下，因此中场压迫后的第一次传球非常关键。西班牙边路一对一优势更大，德国则能用肋部组合持续回应。",
    momentum: [60, 76, 48, 85, 62, 79, 51, 88, 65, 42, 73, 96],
    moments: [["12'", "西班牙右路率先发难"], ["48'", "德国中路组合扳平"], ["86'", "边路突破制造绝杀"]],
    history: [["近 5 场状态", 84, "4胜1负"], ["场均进球", 86, "2.4"], ["零封率", 55, "40%"]], awayHistory: [["近 5 场状态", 70, "3胜1平1负"], ["场均进球", 78, "2.1"], ["零封率", 42, "20%"]],
    process: [["0–20'", "高速开局", "西班牙拉开宽度，德国压迫中卫，双方很快交换机会。"], ["20–45'", "中场争夺", "德国加强对后腰的限制，比赛进入连续转换。"], ["45–70'", "对攻升级", "两队边后卫前压，禁区内人数增加，预计出现连续进球。"], ["70–90'", "边路定局", "体能下降后，西班牙边锋的一对一能力更可能带来决定性机会。"]]
  }
];

let matches = window.WORLD_CUP_MATCHES || demoMatches;
const richMatches = [...matches];

function team(name, flag, rank, titles, form, styles, description, coach, initials, coachStyle, players) {
  return { name, flag, rank, titles, form, styles, description, coach, initials, coachStyle, players };
}
function player(name, number, club, role, skills) { return { name, number, club, role, skills }; }

let selectedMatch = matches[0];
let selectedTab = "history";
let selectedPlayerTeam = "home";
let liveRuntime = { mode: "starting", matches: {}, teamTournamentForm: {} };
let runtimeTimer;
let scheduleTimer;

const $ = (selector) => document.querySelector(selector);
const matchList = $("#matchList");
if (location.protocol === "file:") $("#serviceNotice").hidden = false;

function renderMatchList() {
  const grouped = matches.reduce((days, match) => {
    const key = match.dateKey || match.date.split(" ")[0];
    (days[key] ||= []).push(match);
    return days;
  }, {});
  matchList.innerHTML = Object.entries(grouped).map(([dateKey, dayMatches]) => {
    const weekday = dayMatches[0].weekday || "";
    const isToday = dateKey === chinaDateKey(new Date());
    return `<section class="schedule-day ${isToday ? "today" : ""}" data-date="${dateKey}"><div class="schedule-date"><strong>${dateKey}</strong><span>${weekday}${isToday ? " · 今天" : ""}</span></div><div class="day-games">${dayMatches.map(match => matchButton(match)).join("")}</div></section>`;
  }).join("");
}

function matchButton(match) {
  const statusText = match.status === "finished" ? `完场 ${match.score[0]}:${match.score[1]}` : match.status === "live" ? `${match.liveText || "进行中"} ${match.score[0]}:${match.score[1]}` : "待开赛";
  return `<button class="match-option ${match.id === selectedMatch.id ? "active" : ""} ${match.status}" data-match="${match.id}"><span class="mini-team"><span>${match.home.flag}</span>${match.home.name}</span><span class="mini-meta">${match.stage}<br>${match.time || match.date.split(" ")[1] || ""}<br><i class="status">${statusText}</i></span><span class="mini-team">${match.away.name}<span>${match.away.flag}</span></span></button>`;
}

function renderPrediction() {
  const m = selectedMatch;
  const finished = m.status === "finished";
  const isLive = m.status === "live";
  const liveAnalysis = m.espnId ? liveRuntime.matches?.[m.espnId]?.analysis : null;
  if (!finished && !liveAnalysis) adjustPredictionForTournamentForm(m);
  if (liveAnalysis) {
    m.probs = liveAnalysis.probabilities;
    m.score = liveAnalysis.score;
    m.confidence = liveAnalysis.confidence || m.confidence;
  }
  $("#confidenceLabel").textContent = finished ? "赛后数据状态" : "模型综合信心";
  $("#confidenceValue").innerHTML = finished ? "完整" : `${m.confidence}<small>%</small>`;
  $("#confidenceBar").style.width = finished ? "100%" : `${m.confidence}%`;
  $("#matchMeta").textContent = `${m.date} · ${m.stage}`;
  $("#predictionType").textContent = finished ? "赛后数据复盘" : isLive ? "实时 AI 分析" : "AI 核心预测";
  $("#modelNote").textContent = finished ? "真实赛果 · AI 复盘比赛走势" : isLive ? "基于场上统计与关键事件 · 每2分钟更新" : "基于赛程、状态、阵容与比赛资讯";
  $("#scoreLabel").textContent = finished ? "真实比分" : isLive ? "实时比分" : "预测比分";
  $("#trendLabel").textContent = finished ? "赛事实况复盘 · 90'" : isLive ? "场上趋势 · 每2分钟更新" : "AI 模拟 · 90'";
  $("#processTitle").textContent = finished ? "比赛过程复盘" : isLive ? "实时比赛解读与后续预测" : "AI 推演的比赛过程";
  ["home", "away"].forEach(side => {
    $(`#${side}Flag`).textContent = m[side].flag;
    $(`#${side}Name`).textContent = m[side].name;
    $(`#${side}Rank`).textContent = m[side].rank === "--" ? "世界排名持续同步 · 实时情报模型" : `FIFA 排名 #${m[side].rank} · ${m[side].titles} 次冠军`;
  });
  $("#homeScore").textContent = m.score[0];
  $("#awayScore").textContent = m.score[1];
  $("#resultBadge").textContent = finished ? `完场 · ${m.result}` : m.result;
  const review = finished ? postMatchReview(m, liveAnalysis) : null;
  $("#aiSummary").textContent = review?.headline || liveAnalysis?.sections?.join(" ") || tournamentAdjustedSummary(m);
  if (finished && liveAnalysis) renderFinishedStats(m, liveAnalysis);
  else {
    const labels = [`${m.home.name}胜`, "平局", `${m.away.name}胜`];
    $("#probabilities").innerHTML = m.probs.map((value, index) => `<div class="prob-item"><div><span>${labels[index]}</span><strong>${value}%</strong></div><div class="prob-track"><i style="width:${value}%"></i></div></div>`).join("");
  }
  renderSidePredictions(m, liveAnalysis);
  renderMomentum();
  renderIntel();
  renderTeamSwitch();
  renderPlayers();
  renderProcess();
}

function renderFinishedStats(match, analysis) {
  const hs = analysis.stats.home, as = analysis.stats.away;
  const cards = [
    ["控球率", `${hs.possessionPct || 0}% - ${as.possessionPct || 0}%`, hs.possessionPct || 50],
    ["射门", `${hs.totalShots || 0} - ${as.totalShots || 0}`, (hs.totalShots || 0) / Math.max(1, (hs.totalShots || 0) + (as.totalShots || 0)) * 100],
    ["射正", `${hs.shotsOnTarget || 0} - ${as.shotsOnTarget || 0}`, (hs.shotsOnTarget || 0) / Math.max(1, (hs.shotsOnTarget || 0) + (as.shotsOnTarget || 0)) * 100]
  ];
  $("#probabilities").innerHTML = cards.map(([label, value, width]) => `<div class="prob-item"><div><span>${label}</span><strong>${value}</strong></div><div class="prob-track"><i style="width:${clamp(Math.round(width), 4, 96)}%"></i></div></div>`).join("");
}

function renderSidePredictions(match, liveAnalysis) {
  if (match.status === "finished" && liveAnalysis) {
    const hs = liveAnalysis.stats.home, as = liveAnalysis.stats.away;
    const goals = liveAnalysis.score[0] + liveAnalysis.score[1];
    const corners = (hs.wonCorners || 0) + (as.wonCorners || 0);
    const fouls = (hs.foulsCommitted || 0) + (as.foulsCommitted || 0);
    const yellow = (hs.yellowCards || 0) + (as.yellowCards || 0);
    const red = (hs.redCards || 0) + (as.redCards || 0);
    const cards = [
      ["实际总进球", `${goals} 球`, `最终比分 ${liveAnalysis.score[0]}-${liveAnalysis.score[1]}`],
      ["2.5球赛果", goals >= 3 ? "大球" : "小球", goals >= 3 ? "全场至少产生3球" : "全场不超过2球"],
      ["双方均进球", liveAnalysis.score[0] > 0 && liveAnalysis.score[1] > 0 ? "是" : "否", "依据最终赛果，不再是概率预测"],
      ["实际角球", `${corners} 个`, `${match.home.name} ${hs.wonCorners || 0} - ${as.wonCorners || 0} ${match.away.name}`],
      ["全场犯规", `${fouls} 次`, `${match.home.name} ${hs.foulsCommitted || 0} - ${as.foulsCommitted || 0} ${match.away.name}`],
      ["牌数", `黄牌 ${yellow} · 红牌 ${red}`, "真实比赛纪律数据"]
    ];
    $("#sidePredictions").innerHTML = cards.map(([label, value, note]) => `<div class="side-prediction"><span>${label}</span><strong>${value}</strong><small>${note}</small></div>`).join("");
    return;
  }
  const side = buildSidePredictions(match, liveAnalysis);
  const cards = [
    ["全场总进球", `${side.totalGoals} 球`, side.totalText],
    ["2.5球大小", `大球 ${side.over}% · 小球 ${100 - side.over}%`, side.over >= 55 ? "倾向至少出现3球" : side.over <= 45 ? "倾向不超过2球" : "大小球分布接近"],
    ["双方均进球", `${side.btts}%`, side.btts >= 55 ? "双方都有较明显破门路径" : "至少一队被零封的概率更高"],
    ["其他可能比分", side.scores.join(" · "), "按胜平负概率与总进球预期排列"],
    ["全场角球", `${side.corners[0]}–${side.corners[1]} 个`, side.cornerText],
    ["预测状态", liveAnalysis ? `实时更新 · ${liveAnalysis.minute}'` : "赛前模型", liveAnalysis ? "随比分、射门、射正和角球变化" : "开赛后每2分钟重新计算"]
  ];
  $("#sidePredictions").innerHTML = cards.map(([label, value, note]) => `<div class="side-prediction"><span>${label}</span><strong>${value}</strong><small>${note}</small></div>`).join("");
}

function buildSidePredictions(match, liveAnalysis) {
  const strength = window.WORLD_CUP_TEAM_STRENGTH || {};
  const gap = Math.abs((strength[match.homeEnglishName] || 68) - (strength[match.awayEnglishName] || 68));
  const currentGoals = liveAnalysis ? liveAnalysis.score[0] + liveAnalysis.score[1] : 0;
  const minute = liveAnalysis?.minute || 0;
  const stats = liveAnalysis?.stats;
  const shotQuality = stats ? ((stats.home.shotsOnTarget || 0) + (stats.away.shotsOnTarget || 0)) * .16 + ((stats.home.totalShots || 0) + (stats.away.totalShots || 0)) * .025 : 0;
  const remainingFactor = liveAnalysis ? Math.max(0, (95 - minute) / 95) : 1;
  const preMatchExpected = match.expectedGoals?.length ? match.expectedGoals[0] + match.expectedGoals[1] : 2.2 + gap / 35 + (Math.min(match.probs[0], match.probs[2]) > 25 ? .25 : 0);
  const expected = liveAnalysis ? currentGoals + Math.max(.15, (preMatchExpected + shotQuality) * remainingFactor) : preMatchExpected;
  const totalGoals = Math.max(currentGoals, Math.min(6, Math.round(expected)));
  const overBase = 1 - Math.exp(-expected) * (1 + expected + expected * expected / 2);
  const over = currentGoals >= 3 ? 100 : clamp(Math.round(overBase * 100 + currentGoals * 3), 8, 96);
  const homeExpected = liveAnalysis ? Math.max(liveAnalysis.score[0], (match.expectedGoals?.[0] || expected / 2) * remainingFactor + liveAnalysis.score[0]) : (match.expectedGoals?.[0] || expected / 2);
  const awayExpected = liveAnalysis ? Math.max(liveAnalysis.score[1], (match.expectedGoals?.[1] || expected / 2) * remainingFactor + liveAnalysis.score[1]) : (match.expectedGoals?.[1] || expected / 2);
  const bttsBase = (1 - Math.exp(-homeExpected)) * (1 - Math.exp(-awayExpected));
  const btts = (liveAnalysis?.score[0] > 0 && liveAnalysis?.score[1] > 0) ? 100 : clamp(Math.round(bttsBase * 100), 10, 88);
  const primary = match.score || [1, 1];
  const modelCandidates = match.scoreCandidates?.map(item => item.score) || [];
  const candidates = [primary, ...modelCandidates, [primary[0] + 1, primary[1]], [primary[0], primary[1] + 1], [Math.max(0, primary[0] - 1), primary[1]]];
  const scores = [...new Set(candidates.map(score => `${score[0]}-${score[1]}`))].filter(score => !liveAnalysis || score.split("-").every((value, index) => Number(value) >= liveAnalysis.score[index])).slice(0, 3);
  const currentCorners = stats ? (stats.home.wonCorners || 0) + (stats.away.wonCorners || 0) : 0;
  const projectedCorners = liveAnalysis ? currentCorners + Math.round(Math.max(0, 9.5 - currentCorners) * remainingFactor) : Math.round(8 + gap / 18);
  return { totalGoals, over, btts, scores, corners: [Math.max(currentCorners, projectedCorners - 2), Math.max(currentCorners + 1, projectedCorners + 2)], totalText: liveAnalysis ? `当前已有 ${currentGoals} 球，按剩余时间和机会质量估算` : "结合双方实力差、胜平负概率与比赛开放程度", cornerText: liveAnalysis ? `当前 ${currentCorners} 个，按剩余时间和攻势估算` : "强队压制、边路进攻和预期比赛节奏综合估算" };
}

function adjustPredictionForTournamentForm(match) {
  match.baseProbs ||= [...match.probs];
  const homeForm = liveRuntime.teamTournamentForm?.[match.homeEnglishName];
  const awayForm = liveRuntime.teamTournamentForm?.[match.awayEnglishName];
  const formScore = form => form ? form.points * 3 + (form.goalsFor - form.goalsAgainst) * 2 + (form.reports?.at(-1)?.shotsOnTarget || 0) * .4 : 0;
  const shift = Math.max(-10, Math.min(10, Math.round(formScore(homeForm) - formScore(awayForm))));
  const adjusted = [Math.max(2, match.baseProbs[0] + shift), match.baseProbs[1], Math.max(2, match.baseProbs[2] - shift)];
  const total = adjusted.reduce((sum, value) => sum + value, 0);
  match.probs = adjusted.map(value => Math.round(value / total * 100));
  match.probs[1] += 100 - match.probs.reduce((sum, value) => sum + value, 0);
  const attackEvidence = form => form?.played ? form.goalsFor / form.played + (form.reports?.at(-1)?.shotsOnTarget || 0) * .08 : 1.15;
  const defensiveEvidence = form => form?.played ? form.goalsAgainst / form.played : 1;
  const tournamentGoalAdjustment = clamp((attackEvidence(homeForm) + attackEvidence(awayForm) - 2.3) * .18 + (defensiveEvidence(homeForm) + defensiveEvidence(awayForm) - 2) * .1, -.35, .65);
  const distribution = scoreDistribution(match.homeEnglishName, match.awayEnglishName, match.probs, match.marketTotal, tournamentGoalAdjustment);
  const modeled = predictionFromDistribution(distribution, match.home.name, match.away.name);
  match.score = modeled.score;
  match.result = modeled.result;
  match.expectedGoals = modeled.expectedGoals;
  match.scoreCandidates = modeled.scoreCandidates;
}

function tournamentAdjustedSummary(match) {
  const reports = [match.homeEnglishName, match.awayEnglishName].map(name => liveRuntime.teamTournamentForm?.[name]?.reports?.at(-1)).filter(Boolean);
  if (!reports.length) return match.summary;
  return `${match.summary} 本届世界杯最新依据：${reports.map(report => report.summary).join("；")}`;
}

function renderMomentum() {
  const liveAnalysis = selectedMatch.espnId ? liveRuntime.matches?.[selectedMatch.espnId]?.analysis : null;
  if (liveAnalysis) {
    const stats = liveAnalysis.stats;
    const homePressure = Math.min(98, 35 + (stats.home.totalShots || 0) * 3 + (stats.home.shotsOnTarget || 0) * 7 + (stats.home.wonCorners || 0) * 2);
    const awayPressure = Math.min(98, 35 + (stats.away.totalShots || 0) * 3 + (stats.away.shotsOnTarget || 0) * 7 + (stats.away.wonCorners || 0) * 2);
    selectedMatch.momentum = [50, homePressure, awayPressure, homePressure, awayPressure, Math.max(homePressure, awayPressure), Math.min(homePressure, awayPressure), homePressure, awayPressure, homePressure, awayPressure, 55];
    selectedMatch.probs = liveAnalysis.probabilities;
    selectedMatch.score = liveAnalysis.score;
    if (selectedMatch.status === "finished") {
      const review = postMatchReview(selectedMatch, liveAnalysis);
      selectedMatch.process = [
        ["全场", "比赛结果", review.headline],
        ["全场", `${selectedMatch.home.name}表现`, review.homeEvaluation],
        ["全场", `${selectedMatch.away.name}表现`, review.awayEvaluation],
        ["全场", "机会与效率", `全场射门 ${stats.home.totalShots || 0}-${stats.away.totalShots || 0}，射正 ${stats.home.shotsOnTarget || 0}-${stats.away.shotsOnTarget || 0}，角球 ${stats.home.wonCorners || 0}-${stats.away.wonCorners || 0}。这些是真实赛后数据，不再是趋势预测。`],
        ["全场", "胜负关键", review.decisiveFactors],
        ["赛后", "下一轮影响", review.nextImpact]
      ];
    } else {
      const liveLabels = ["比分与控球", "射门与机会质量", "推进方式与压迫", "定位球与比赛纪律", "体能、换人与薄弱区域", "未来阶段推演"];
      selectedMatch.process = liveAnalysis.sections.map((text, index) => [`${liveAnalysis.minute || "实时"}'`, liveLabels[index] || "实时走势", text]);
    }
    selectedMatch.moments = liveAnalysis.events.length ? liveAnalysis.events.slice(-3).map(event => [event.time || "事件", translateMatchEvent(event.text, event.type)]) : [[selectedMatch.status === "finished" ? "完场" : `${liveAnalysis.minute || 0}'`, selectedMatch.status === "finished" ? "全场数据已同步" : "实时数据已同步"], ["射门", `${stats.home.totalShots || 0}-${stats.away.totalShots || 0}`], ["控球", `${stats.home.possessionPct || 0}%-${stats.away.possessionPct || 0}%`]];
  }
  const values = selectedMatch.momentum;
  const points = values.map((value, index) => `${index * (600 / (values.length - 1))},${165 - value * 1.35}`).join(" ");
  $("#momentumLine").setAttribute("points", points);
  $("#areaPath").setAttribute("d", `M ${points.replaceAll(" ", " L ")} L 600 170 L 0 170 Z`);
  $("#keyMoments").innerHTML = selectedMatch.moments.map(item => `<div class="moment"><strong>${item[0]}</strong>${item[1]}</div>`).join("");
  const reviewBox = $("#fullMatchReview");
  if (selectedMatch.status === "finished" && liveAnalysis) {
    const review = postMatchReview(selectedMatch, liveAnalysis);
    reviewBox.hidden = false;
    reviewBox.innerHTML = `<h4>全场文字复盘</h4><p><strong>比赛定性：</strong>${review.headline}</p><p><strong>${selectedMatch.home.name}：</strong>${review.homeEvaluation}</p><p><strong>${selectedMatch.away.name}：</strong>${review.awayEvaluation}</p><p><strong>胜负关键：</strong>${review.decisiveFactors}</p><p><strong>后续影响：</strong>${review.nextImpact}</p>`;
  } else {
    reviewBox.hidden = true;
    reviewBox.innerHTML = "";
  }
}

function postMatchReview(match, analysis) {
  if (analysis?.review) return analysis.review;
  const hs = analysis?.stats?.home || {}, as = analysis?.stats?.away || {};
  const [homeScore, awayScore] = analysis?.score || match.score;
  const winner = homeScore > awayScore ? match.home.name : awayScore > homeScore ? match.away.name : null;
  const headline = winner ? `${winner}以 ${homeScore}-${awayScore} 取胜。比赛已经结束，评价依据真实比分和全场数据，不再引用赛前预测。` : `双方以 ${homeScore}-${awayScore} 战平。比赛已经结束，以下内容依据全场真实数据复盘。`;
  const evaluate = (name, own, other, scored, conceded) => `${name}控球 ${own.possessionPct || 0}%，射门 ${own.totalShots || 0} 次、射正 ${own.shotsOnTarget || 0} 次、角球 ${own.wonCorners || 0} 个。${scored > conceded ? "球队在关键回合的处理更准确，并成功把机会转化为胜势。" : scored < conceded ? (own.shotsOnTarget >= other.shotsOnTarget ? "创造机会并不少，但门前效率和防守关键回合不如对手。" : "推进未能稳定转化成高质量射门，落后后也缺少持续压制。") : "整体表现足以拿分，但距离胜利仍差更稳定的最后一传和终结。"}`;
  return { headline, homeEvaluation: evaluate(match.home.name, hs, as, homeScore, awayScore), awayEvaluation: evaluate(match.away.name, as, hs, awayScore, homeScore), decisiveFactors: `射正 ${hs.shotsOnTarget || 0}-${as.shotsOnTarget || 0}、角球 ${hs.wonCorners || 0}-${as.wonCorners || 0}。${winner ? `${winner}在决定比分的回合中更有效率。` : "双方均未建立足以改变平局的效率优势。"}`, nextImpact: "本场数据会写入两队世界杯档案，并用于修正下一轮的攻防评价、预期进球和胜平负概率。" };
}

function translateMatchEvent(text, type) {
  if (!text) return "比赛关键事件";
  if (!/[A-Za-z]/.test(text) || /[\u3400-\u9fff]/.test(text)) return text;
  const localizeTeams = value => Object.entries(window.WORLD_CUP_TEAM_META || {}).reduce((result, [english, meta]) => result.replaceAll(english, meta.name), value);
  let match;
  if ((type === "Goal" || text.startsWith("Goal!")) && (match = text.match(/Goal!\s*([^.]*)\.\s*([^.(]+)(?:\s*\(([^)]+)\))?/i))) {
    const assist = text.match(/Assisted by ([^.]+)\./i)?.[1];
    return `进球：${match[2].trim()}破门，比分变为 ${localizeTeams(match[1].trim())}${assist ? `，助攻：${assist.trim()}` : ""}。`;
  }
  if ((type === "Substitution" || text.startsWith("Substitution")) && (match = text.match(/Substitution,\s*([^.]+)\.\s*([^.]*) replaces ([^.]+)\./i))) return `换人：${localizeTeams(match[1].trim())}用 ${match[2].trim()} 换下 ${match[3].trim()}。`;
  if (/red card/i.test(text) || type === "Red Card") {
    const player = text.match(/^([^.(]+)/)?.[1]?.trim() || "一名球员";
    const team = text.match(/\(([^)]+)\)/)?.[1];
    return `红牌：${player}${team ? `（${localizeTeams(team)}）` : ""}被罚下，场上人数发生变化。`;
  }
  if (/yellow card/i.test(text) || type === "Yellow Card") {
    const player = text.match(/^([^.(]+)/)?.[1]?.trim() || "一名球员";
    const team = text.match(/\(([^)]+)\)/)?.[1];
    return `黄牌：${player}${team ? `（${localizeTeams(team)}）` : ""}因本次犯规受到警告。`;
  }
  if (/penalty/i.test(text) || type === "Penalty") return "点球事件：裁判判罚点球，这次判罚直接影响了比赛的重要阶段。";
  return "比赛关键事件已记录，后台将继续整理为中文说明。";
}

function renderIntel() {
  const m = selectedMatch;
  $("#infoTabs").querySelectorAll("button").forEach(button => button.classList.toggle("active", button.dataset.tab === selectedTab));
  $("#intelContent").innerHTML = `${intelCard(m.home, "home")}<div class="versus-badge">VS</div>${intelCard(m.away, "away")}`;
}

function intelCard(teamData, side) {
  let body = "";
  if (selectedTab === "history") {
    const stats = teamData.metrics || (side === "home" ? selectedMatch.history : selectedMatch.awayHistory).map(item => ({ label: item[0], value: item[1], grade: item[2], reason: "综合近期赛果、比赛内容和阵容情况得出。" }));
    const form = liveRuntime.teamTournamentForm?.[selectedMatch[`${side}EnglishName`]];
    const tournamentEvidence = form?.reports?.length ? `<div class="tournament-form"><strong>本届世界杯实战</strong>${form.reports.map(report => `<p>${report.opponent}：${report.score}（${report.result}），控球 ${report.possession}%，射门 ${report.shots} 次、射正 ${report.shotsOnTarget} 次。</p>`).join("")}</div>` : "";
    const recent = teamData.recentMatches?.length ? `<div class="recent-results"><strong>最近比赛记录</strong>${teamData.recentMatches.map(item => `<div class="recent-result"><span>${item.date || "近期"}</span><p>${item.opponent}</p><b>${item.score}</b></div>`).join("")}</div>` : "";
    body = `<div class="evidence-list">${stats.map(stat => `<div class="evidence-item"><div class="evidence-head"><span>${stat.label}</span><strong>${stat.grade}</strong></div><div class="light-track"><i style="width:${stat.value}%"></i></div><p>${stat.reason}</p></div>`).join("")}</div>${recent}${tournamentEvidence}${intelSources(teamData)}`;
  } else if (selectedTab === "style") {
    const details = teamData.styleDetails || [{ title: "比赛方式", text: teamData.description }];
    body = `<div class="style-tags">${teamData.styles.map(tag => `<span>${tag}</span>`).join("")}</div><p class="intel-lead">${teamData.description}</p><div class="analysis-blocks">${details.map(item => `<div><strong>${item.title}</strong><p>${item.text}</p></div>`).join("")}</div>${intelSources(teamData)}`;
  } else {
    body = `<div class="coach-block"><span class="coach-avatar">${teamData.initials}</span><div><h4>${teamData.coach}</h4><p>${teamData.coachStyle}</p></div></div><div class="analysis-blocks coach-analysis"><div><strong>执教履历</strong><p>${teamData.coachBio || "国家队与俱乐部执教经验丰富。"}</p></div><div><strong>战术方法</strong><p>${teamData.coachApproach || teamData.description}</p></div><div><strong>本场观察</strong><p>${teamData.coachMatch || "换人时机和对比赛节奏的控制值得关注。"}</p></div></div>${intelSources(teamData)}`;
  }
  return `<article class="intel-card"><div class="intel-team"><span>${teamData.flag}</span><div><h3>${teamData.name}</h3><small>世界排名 #${teamData.rank}</small></div></div>${body}</article>`;
}

function intelSources(teamData) {
  const newsSources = (liveRuntime.news || []).filter(item => item.title?.toLowerCase().includes(teamData.englishName?.toLowerCase()) || item.title?.includes(teamData.name)).slice(0, 3).map(item => ({ label: `NEW · ${item.source || "球队资讯"}`, url: safeExternalUrl(item.url) }));
  const sources = [...(teamData.sources || []), ...newsSources].filter(source => source.url);
  if (!sources.length) return "";
  return `<div class="intel-sources"><span>分析参考</span>${sources.map(source => `<a href="${safeExternalUrl(source.url)}" target="_blank" rel="noreferrer">${escapeHtml(source.label)}</a>`).join("")}</div>`;
}

function renderTeamSwitch() {
  $("#teamSwitch").innerHTML = ["home", "away"].map(side => `<button class="${selectedPlayerTeam === side ? "active" : ""}" data-team="${side}">${selectedMatch[side].flag} ${selectedMatch[side].name}</button>`).join("");
}

function renderPlayers() {
  const players = selectedMatch[selectedPlayerTeam].players;
  if (!players?.length) {
    $("#playerGrid").innerHTML = `<article class="player-card player-placeholder"><span class="role-tag">资料更新中</span><h3>${selectedMatch[selectedPlayerTeam].name}球员情报</h3><p class="player-profile">赛程与比分已经实时接入。详细球员位置、俱乐部角色和近期状态将在该队比赛日前结合最新名单与新闻补充。</p></article>`;
    return;
  }
  $("#playerGrid").innerHTML = players.map(p => `<article class="player-card"><span class="shirt-number">${p.number}</span><span class="role-tag">${p.role}</span><h3>${p.name}</h3><p class="club">${p.club} · ${p.number} 号 · ${p.position || "多面手"}</p><div class="player-facts"><div><span>俱乐部层级</span><p>${p.clubLevel || "国内外高水平职业俱乐部"}</p></div><div><span>国家队职责</span><p>${p.nationalRole || p.role}</p></div></div><p class="player-profile">${p.profile || "技术特点鲜明，是球队比赛计划中的重要一环。"}</p><span class="skill-label">看球时重点观察</span><div class="skill-tags">${p.skills.map(skill => `<span>${skill}</span>`).join("")}</div><p class="player-form"><strong>近期状态：</strong>${p.form || "状态稳定，具体出场安排取决于临场选择。"}</p></article>`).join("");
}

function renderProcess() {
  $("#processGrid").innerHTML = selectedMatch.process.map(item => `<article class="process-card"><strong>${item[0]}</strong><h3>${item[1]}</h3><p>${item[2]}</p></article>`).join("");
}

function renderNews() {
  const list = $("#newsList");
  const news = liveRuntime.news || [];
  if (!news.length) {
    list.innerHTML = `<div class="news-empty">暂未取得最新资讯，后台会在非比赛时每3小时重新尝试。</div>`;
    return;
  }
  list.innerHTML = news.slice(0, 12).map(item => {
    const date = new Date(item.publishedAt);
    const time = Number.isNaN(date.getTime()) ? "刚刚更新" : new Intl.DateTimeFormat("zh-CN", { timeZone: "Asia/Shanghai", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false }).format(date);
    return `<a class="news-item" href="${safeExternalUrl(item.url)}" target="_blank" rel="noreferrer"><span class="new-badge">NEW</span><span class="news-copy"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.source || "世界杯资讯")} · ${time}</span></span><span class="news-link">阅读原文 ↗</span></a>`;
  }).join("");
  if (liveRuntime.updatedAt) {
    $("#newsUpdated").textContent = `最近整理：${new Intl.DateTimeFormat("zh-CN", { timeZone: "Asia/Shanghai", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(liveRuntime.updatedAt))}`;
  }
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
}

function safeExternalUrl(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "#";
  } catch { return "#"; }
}

function chinaParts(date) {
  const parts = new Intl.DateTimeFormat("zh-CN", { timeZone: "Asia/Shanghai", month: "numeric", day: "numeric", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(date);
  return Object.fromEntries(parts.map(part => [part.type, part.value]));
}

function chinaDateKey(date) {
  const p = chinaParts(date);
  return `${p.month}月${p.day}日`;
}

function normalizeTeamName(name) {
  return window.WORLD_CUP_TEAM_ALIASES?.[name] || name;
}

function genericTeam(englishName) {
  const key = normalizeTeamName(englishName);
  const chineseName = window.WORLD_CUP_TEAM_META?.[key]?.name;
  const existing = richMatches.flatMap(match => [match.home, match.away]).find(teamData => teamData.name === chineseName && teamData.players?.length);
  if (existing) return { ...existing, englishName: key };
  const detailed = window.WORLD_CUP_TEAM_PROFILES?.[key];
  if (detailed) return { ...detailed, englishName: key };
  const meta = window.WORLD_CUP_TEAM_META?.[key] || { name: englishName, flag: "🏳️", group: "-" };
  const strength = window.WORLD_CUP_TEAM_STRENGTH?.[key] || 68;
  const tier = strength >= 88 ? "争冠级" : strength >= 80 ? "强队级" : strength >= 72 ? "出线竞争级" : "挑战者";
  const styles = strength >= 85 ? ["主动掌控", "高压比赛经验", "阵容深度"] : strength >= 75 ? ["结构成熟", "攻守转换", "淘汰赛竞争力"] : ["防守组织", "反击与定位球", "降低比赛回合"];
  return { name: meta.name, englishName: key, flag: meta.flag, rank: "--", titles: 0, styles, description: `${meta.name}当前基础竞争力评分为 ${strength}/100，属于${tier}。这一层判断来自长期国际比赛实力与赛区竞争强度；正式首发、伤病、赛前资讯以及世界杯实战会继续覆盖和修正它。`, coach: "赛前资料同步中", initials: "--", coachStyle: "教练体系将结合发布会与比赛数据更新", players: [], metrics: [{ label: "综合竞争力", value: strength, grade: tier, reason: `基础实力评分 ${strength}/100。该评分不是单场胜率，而是用于和同组对手比较阵容上限与长期稳定性。` }, { label: "进攻威胁", value: Math.min(92, strength + 2), grade: strength >= 82 ? "较高" : strength >= 72 ? "中上" : "依赖效率", reason: "开赛前由实力层级和赛前概率估算；首轮结束后会自动加入射门、射正、进球与机会转化数据。" }, { label: "阵容情况", value: Math.max(58, strength - 3), grade: "持续更新", reason: "后台每3小时读取伤病、名单和赛前新闻；出现明确缺席或复出信息时，预测信心和比赛脚本会同步调整。" }] };
}

function findRichMatch(homeName, awayName) {
  const homeMeta = window.WORLD_CUP_TEAM_META?.[normalizeTeamName(homeName)];
  const awayMeta = window.WORLD_CUP_TEAM_META?.[normalizeTeamName(awayName)];
  return richMatches.find(match => match.home.name === homeMeta?.name && match.away.name === awayMeta?.name);
}

function impliedProbability(americanOdds) {
  const odds = Number(americanOdds);
  if (!odds) return 0;
  return odds < 0 ? Math.abs(odds) / (Math.abs(odds) + 100) : 100 / (odds + 100);
}

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value));
}

function poissonProbability(goals, expected) {
  let factorial = 1;
  for (let value = 2; value <= goals; value += 1) factorial *= value;
  return Math.exp(-expected) * Math.pow(expected, goals) / factorial;
}

function scoreDistribution(homeEnglish, awayEnglish, probs, marketTotal, totalAdjustment = 0) {
  const strengths = window.WORLD_CUP_TEAM_STRENGTH || {};
  const attacks = window.WORLD_CUP_TEAM_ATTACK || strengths;
  const defences = window.WORLD_CUP_TEAM_DEFENCE || strengths;
  const homeStrength = strengths[homeEnglish] || 68;
  const awayStrength = strengths[awayEnglish] || 68;
  const homeAttack = attacks[homeEnglish] || homeStrength;
  const awayAttack = attacks[awayEnglish] || awayStrength;
  const homeDefence = defences[homeEnglish] || homeStrength;
  const awayDefence = defences[awayEnglish] || awayStrength;
  const mismatch = Math.abs(homeStrength - awayStrength);
  const attackAverage = (homeAttack + awayAttack) / 2;
  const weakDefence = Math.max(0, 70 - Math.min(homeDefence, awayDefence));
  const blowoutUplift = clamp(Math.max(0, mismatch - 27) * .06 + Math.max(0, 60 - Math.min(homeDefence, awayDefence)) * .015, 0, .5);
  const baselineTotal = 2.25 + (attackAverage - 72) * .02 + mismatch * .027 + weakDefence * .018 + blowoutUplift;
  const expectedTotal = clamp((marketTotal ? Number(marketTotal) + mismatch * .02 + Math.max(0, attackAverage - 82) * .01 + blowoutUplift * .7 : baselineTotal) + totalAdjustment, 1.55, 5.1);
  const probabilityEdge = (probs[0] - probs[2]) / 100;
  const ratingEdge = ((homeAttack - awayDefence) - (awayAttack - homeDefence)) / 55;
  const expectedDifference = clamp(probabilityEdge * expectedTotal * 1.08 + ratingEdge, -expectedTotal + .28, expectedTotal - .28);
  const homeExpected = clamp((expectedTotal + expectedDifference) / 2, .14, 4.35);
  const awayExpected = clamp((expectedTotal - expectedDifference) / 2, .14, 4.35);
  const scores = [];
  for (let home = 0; home <= 7; home += 1) {
    for (let away = 0; away <= 7; away += 1) {
      scores.push({ score: [home, away], probability: poissonProbability(home, homeExpected) * poissonProbability(away, awayExpected) });
    }
  }
  scores.sort((a, b) => b.probability - a.probability);
  return { homeExpected, awayExpected, expectedTotal: homeExpected + awayExpected, scores };
}

function predictionFromDistribution(distribution, homeName, awayName) {
  let score = [Math.round(distribution.homeExpected), Math.round(distribution.awayExpected)];
  if (score[0] === 0 && score[1] === 0 && distribution.expectedTotal >= 1.5) score = [1, 1];
  return {
    score,
    result: score[0] > score[1] ? `${homeName}胜` : score[0] < score[1] ? `${awayName}胜` : "平局",
    expectedGoals: [distribution.homeExpected, distribution.awayExpected],
    scoreCandidates: distribution.scores.slice(0, 6).map(item => ({ score: item.score, probability: Math.round(item.probability * 1000) / 10 }))
  };
}

function marketPrediction(event, homeEnglish, awayEnglish, homeName, awayName) {
  const market = event.competitions?.[0]?.odds?.[0];
  const moneyline = market?.moneyline;
  if (!moneyline) return null;
  const raw = [moneyline.home?.close?.odds, moneyline.draw?.close?.odds ?? market.drawOdds?.moneyLine, moneyline.away?.close?.odds].map(impliedProbability);
  if (raw.some(value => !value)) return null;
  const total = raw.reduce((sum, value) => sum + value, 0);
  const probs = raw.map(value => Math.round(value / total * 100));
  probs[1] += 100 - probs.reduce((sum, value) => sum + value, 0);
  const marketTotal = Number(market.overUnder || 2.5);
  const favorite = probs[0] > probs[2] ? "home" : "away";
  const gap = Math.abs(probs[0] - probs[2]);
  const distribution = scoreDistribution(homeEnglish, awayEnglish, probs, marketTotal);
  const modeled = predictionFromDistribution(distribution, homeName, awayName);
  const favoriteName = favorite === "home" ? homeName : awayName;
  const underdogName = favorite === "home" ? awayName : homeName;
  const confidence = Math.min(90, Math.max(60, Math.round(62 + gap * .42 + (market ? 5 : 0))));
  return { probs, ...modeled, marketTotal, confidence, summary: `赛前综合概率显示${favoriteName}占优，优势程度为${gap > 35 ? "明显" : gap > 18 ? "中等" : "有限"}。进球模型给出的预期为 ${distribution.homeExpected.toFixed(1)}-${distribution.awayExpected.toFixed(1)}，总进球约 ${distribution.expectedTotal.toFixed(1)} 球；因此强弱悬殊时会保留大胜和大球分支，而不是固定压成2-0。${underdogName}需要通过防守转换、定位球或门将表现压低热门球队的机会转化。模型信心 ${confidence}% 来自市场概率、攻防评级、总进球盘口、阵容与本届世界杯实战修正。` };
}

function baselinePrediction(homeEnglish, awayEnglish, homeName, awayName) {
  const strengths = window.WORLD_CUP_TEAM_STRENGTH || {};
  const homeStrength = strengths[homeEnglish] || 68;
  const awayStrength = strengths[awayEnglish] || 68;
  const edge = homeStrength - awayStrength + 2;
  const home = Math.max(14, Math.min(74, Math.round(36 + edge * 1.35)));
  const away = Math.max(10, Math.min(68, Math.round(31 - edge * 1.15)));
  const draw = Math.max(16, 100 - home - away);
  const total = home + draw + away;
  const probs = [home, draw, away].map(value => Math.round(value / total * 100));
  probs[1] += 100 - probs.reduce((sum, value) => sum + value, 0);
  const gap = Math.abs(probs[0] - probs[2]);
  const favorite = probs[0] >= probs[2] ? homeName : awayName;
  const distribution = scoreDistribution(homeEnglish, awayEnglish, probs);
  const modeled = predictionFromDistribution(distribution, homeName, awayName);
  const confidence = Math.max(58, Math.min(78, Math.round(58 + gap * .3)));
  return { probs, ...modeled, confidence, summary: `基础攻防模型认为${favorite}占优，预期进球为 ${distribution.homeExpected.toFixed(1)}-${distribution.awayExpected.toFixed(1)}，总进球约 ${distribution.expectedTotal.toFixed(1)}。实力差、进攻上限和弱侧防守会共同影响净胜球，因此可能出现3-0、4-0或4-1；同时精确比分本身不确定，页面会列出多条高概率分支。当前信心 ${confidence}% 会在获得正式首发、市场概率和本届世界杯实战后自动修正。` };
}

function eventToMatch(event) {
  const competitors = event.competitions?.[0]?.competitors || [];
  const homeEntry = competitors.find(item => item.homeAway === "home");
  const awayEntry = competitors.find(item => item.homeAway === "away");
  if (!homeEntry || !awayEntry) return null;
  const homeEnglish = normalizeTeamName(homeEntry.team.displayName);
  const awayEnglish = normalizeTeamName(awayEntry.team.displayName);
  const rich = findRichMatch(homeEnglish, awayEnglish);
  const kickoff = new Date(event.date);
  const p = chinaParts(kickoff);
  const completed = event.status?.type?.completed;
  const live = !completed && event.status?.type?.state === "in";
  const actualScore = [Number(homeEntry.score || 0), Number(awayEntry.score || 0)];
  const homeMeta = window.WORLD_CUP_TEAM_META?.[homeEnglish];
  const awayMeta = window.WORLD_CUP_TEAM_META?.[awayEnglish];
  const market = marketPrediction(event, homeEnglish, awayEnglish, homeMeta?.name || homeEnglish, awayMeta?.name || awayEnglish);
  const baseline = baselinePrediction(homeEnglish, awayEnglish, homeMeta?.name || homeEnglish, awayMeta?.name || awayEnglish);
  const base = rich || {
    id: `espn-${event.id}`, home: genericTeam(homeEnglish), away: genericTeam(awayEnglish), ...baseline, momentum: [50,56,48,61,53,58,47,62,55,59,52,57], moments: [["赛前", "关注正式首发与阵型"], ["上半场", "观察中场控制和推进方向"], ["下半场", "替补深度与比分压力可能改变比赛"]], process: [["0–15'", "确认比赛计划", `${homeMeta?.name || homeEnglish}会先测试对手的压迫高度与边路保护，${awayMeta?.name || awayEnglish}则观察能否安全完成第一次向前传递。开局不只看控球率，更要看哪队能把球送到对方中场身后。`], ["15–35'", "形成主要进攻路线", "阵型适应后，优势一方会反复攻击同一薄弱区域。重点观察边后卫是否敢于压上、后腰能否保护反击，以及中锋获得的是背身球还是面向球门的机会。"], ["35–45+'", "上半场风险窗口", "体能首次下降后，禁区前沿犯规、角球和第二点会增加。若仍是平局，热门一方可能提高压迫，反而给对手留下最清晰的反击空间。"], ["45–60'", "教练修正", "中场休息会针对出球线路和盯人方式调整。落后方通常先提高边路位置；领先方则要决定继续压迫，还是用更稳妥的控球降低比赛回合。"], ["60–75'", "替补改变对位", "第一批换人会带来速度、支点或额外中场。此阶段需观察新球员攻击哪一侧，以及原先承担大量跑动的边后卫和后腰是否开始失位。"], ["75–90+'", "结果管理与最后冲击", "比分会主导一切：领先方收窄阵型、保护禁区中路；落后方增加传中、远射和定位球投入。最后结果往往由二点球、门将处理和一次错误选择决定。"]]
  };
  if (!rich && market) Object.assign(base, market);
  const status = completed ? "finished" : live ? "live" : "upcoming";
  return { ...base, id: `espn-${event.id}`, espnId: event.id, homeEnglishName: homeEnglish, awayEnglishName: awayEnglish, kickoff: event.date, dateKey: `${p.month}月${p.day}日`, weekday: p.weekday, time: `${p.hour}:${p.minute}`, date: `${p.month}月${p.day}日 ${p.hour}:${p.minute}`, stage: `${homeMeta?.group || base.home.group || "-"}组 · 小组赛`, status, score: completed || live ? actualScore : base.score, result: completed ? (actualScore[0] > actualScore[1] ? `${base.home.name}胜` : actualScore[0] < actualScore[1] ? `${base.away.name}胜` : "平局") : base.result, liveText: event.status?.type?.shortDetail || event.status?.type?.detail || "进行中" };
}

function tournamentDates() {
  const dates = [];
  for (let day = 11; day <= 27; day += 1) dates.push(`202606${String(day).padStart(2, "0")}`);
  return dates;
}

async function fetchScheduleDates(dates) {
  const responses = await Promise.all(dates.map(date => fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=${date}&limit=100`)));
  if (responses.some(response => !response.ok)) throw new Error("score feed unavailable");
  const payloads = await Promise.all(responses.map(response => response.json()));
  const events = new Map();
  payloads.flatMap(payload => payload.events || []).forEach(event => events.set(event.id, event));
  return [...events.values()];
}

function applyEvents(events, replaceAll = false) {
  const incoming = events.map(eventToMatch).filter(Boolean);
  if (replaceAll) {
    matches = incoming.sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff));
  } else {
    const byId = new Map(matches.map(match => [match.espnId, match]));
    incoming.forEach(match => byId.set(match.espnId, match));
    matches = [...byId.values()].sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff));
  }
  const selectedId = selectedMatch?.espnId;
  selectedMatch = matches.find(match => match.espnId === selectedId) || matches.find(match => match.status === "live") || matches.find(match => match.status === "upcoming") || matches[0];
  renderMatchList();
  renderPrediction();
}

async function syncFullSchedule() {
  try {
    const events = await fetchScheduleDates(tournamentDates());
    applyEvents(events, true);
    const hasLive = matches.some(match => match.status === "live");
    $("#dataFreshness").textContent = `全部 ${matches.length} 场小组赛已同步 · ${hasLive ? "比赛中每2分钟" : "非比赛时每3小时"}更新`;
    clearTimeout(scheduleTimer);
    scheduleTimer = setTimeout(syncFullSchedule, hasLive ? 2 * 60 * 1000 : 3 * 60 * 60 * 1000);
  } catch {
    $("#dataFreshness").textContent = `${window.WORLD_CUP_UPDATED_AT || "本地快照"} · 实时源暂不可用`;
    clearTimeout(scheduleTimer);
    scheduleTimer = setTimeout(syncFullSchedule, 2 * 60 * 1000);
  }
}

async function pollLiveScores() {
  const now = new Date();
  const dates = [-1, 0, 1].map(offset => {
    const date = new Date(now.getTime() + offset * 86400000);
    return `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, "0")}${String(date.getUTCDate()).padStart(2, "0")}`;
  });
  try {
    applyEvents(await fetchScheduleDates(dates), false);
    const p = chinaParts(new Date());
    $("#dataFreshness").textContent = `实时更新 · ${p.hour}:${p.minute}（中国时间）`;
  } catch {}
}

async function loadRuntimeAnalysis() {
  try {
    const response = await fetch(`/api/runtime?t=${Date.now()}`);
    if (!response.ok) throw new Error("runtime unavailable");
    liveRuntime = await response.json();
    if (liveRuntime.schedule?.length) applyEvents(liveRuntime.schedule, true);
    renderPrediction();
    renderNews();
    const nextDelay = !liveRuntime.schedule?.length ? 5000 : liveRuntime.mode === "live" ? 2 * 60 * 1000 : Math.min(3 * 60 * 60 * 1000, Math.max(30000, new Date(liveRuntime.nextUpdateAt || Date.now() + 30000).getTime() - Date.now()));
    clearTimeout(runtimeTimer);
    runtimeTimer = setTimeout(loadRuntimeAnalysis, nextDelay);
  } catch {
    if (!matches.some(match => match.espnId)) syncFullSchedule();
    clearTimeout(runtimeTimer);
    runtimeTimer = setTimeout(loadRuntimeAnalysis, 2 * 60 * 1000);
  }
}

matchList.addEventListener("click", event => {
  const button = event.target.closest("[data-match]");
  if (!button) return;
  selectedMatch = matches.find(match => match.id === button.dataset.match);
  selectedPlayerTeam = "home";
  renderMatchList();
  renderPrediction();
});

$("#infoTabs").addEventListener("click", event => {
  const button = event.target.closest("[data-tab]");
  if (!button) return;
  selectedTab = button.dataset.tab;
  renderIntel();
});

$("#teamSwitch").addEventListener("click", event => {
  const button = event.target.closest("[data-team]");
  if (!button) return;
  selectedPlayerTeam = button.dataset.team;
  renderTeamSwitch();
  renderPlayers();
});

$("#themeToggle").addEventListener("click", () => document.body.classList.toggle("light"));
document.querySelectorAll("[data-scroll]").forEach(button => button.addEventListener("click", () => $(`#${button.dataset.scroll}`).scrollIntoView()));

if (window.WORLD_CUP_UPDATED_AT) $("#dataFreshness").textContent = `更新于 ${window.WORLD_CUP_UPDATED_AT}`;
renderMatchList();
renderPrediction();
loadRuntimeAnalysis();

let dragStartX = 0;
let dragScrollLeft = 0;
matchList.addEventListener("pointerdown", event => { if (event.target.closest("button")) return; matchList.classList.add("dragging"); dragStartX = event.clientX; dragScrollLeft = matchList.scrollLeft; matchList.setPointerCapture(event.pointerId); });
matchList.addEventListener("pointermove", event => { if (!matchList.classList.contains("dragging")) return; matchList.scrollLeft = dragScrollLeft - (event.clientX - dragStartX); });
matchList.addEventListener("pointerup", () => matchList.classList.remove("dragging"));
matchList.addEventListener("pointercancel", () => matchList.classList.remove("dragging"));
