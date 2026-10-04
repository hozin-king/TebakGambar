"use strict";
/* Proteksi string: jawaban & konfigurasi terenkripsi (XOR+base64).
   Key dibangun dari beberapa bagian agar tidak tampil plaintext mentah. */
const _kA = atob("VGdFbmM=");
const _kB = String.fromCharCode(95, 50, 48, 50, 54, 95);
const _kC = "!7qX".split("").reverse().join("");
const _KEY = _kA + _kB + _kC;
function D(b) {
  const r = atob(b);
  let o = "";
  for (let i = 0; i < r.length; i++)
    o += String.fromCharCode(r.charCodeAt(i) ^ _KEY.charCodeAt(i % _KEY.length));
  return o;
}

/* ============================================================
   TEBAK GAMBAR — kuis tebak kata dari gambar
   6 LEVEL besar x 10 TAHAP + tantangan harian + kombo + pencapaian
   Semua SFX & musik dibuat via WebAudio (original, tanpa aset luar)
   Progress tersimpan di localStorage (offline penuh)
   ============================================================ */

const LEVELS_META = [
  { name: "LEVEL 1", icon: "1️⃣" },
  { name: "LEVEL 2", icon: "2️⃣" },
  { name: "LEVEL 3", icon: "3️⃣" },
  { name: "LEVEL 4", icon: "4️⃣" },
  { name: "LEVEL 5", icon: "5️⃣" },
  { name: "LEVEL 6", icon: "6️⃣" },
];
const STAGES_PER_LEVEL = 10;
const NUM_LEVELS = 6;

const LEVELS = [
  // ---------- LEVEL 1: tahap 1-10 ----------
  { answer: D("FSkPJy0Y"),     img: "assets/level25.png" },
  { answer: D("ByYVJw=="),       img: "assets/level26.png" },
  { answer: D("HzIBLw=="),       img: "assets/level27.png" },
  { answer: D("HSwEIA=="),       img: "assets/level07.png" },
  { answer: D("FT4EIw=="),       img: "assets/level10.png" },
  { answer: D("FjIXOy0Y"),     img: "assets/level28.png" },
  { answer: D("HzIGJy0Y"),     img: "assets/level04.png" },
  { answer: D("EyYPLys="),      img: "assets/level01.png" },
  { answer: D("BCYQPQ=="),       img: "assets/level29.png" },
  { answer: D("HzIXL0MUZ2Jz"),  img: "assets/level30.png" },
  // ---------- LEVEL 2: tahap 1-10 ----------
  { answer: D("HiIXLzMeeg=="),    img: "assets/level31.png" },
  { answer: D("HCYXJy4eZw=="),    img: "assets/level32.png" },
  { answer: D("EygXJy8e"),     img: "assets/level33.png" },
  { answer: D("HyYLKTYNZw=="),    img: "assets/level34.png" },
  { answer: D("HzIVO0MUZ2Bn"),  img: "assets/level17.png" },
  { answer: D("FTcAIg=="),       img: "assets/level35.png" },
  { answer: D("BigRJw=="),       img: "assets/level36.png" },
  { answer: D("ACIJOzE="),      img: "assets/level37.png" },
  { answer: D("BC4WLy0Y"),     img: "assets/level02.png" },
  { answer: D("BzIWJio="),      img: "assets/level38.png" },
  // ---------- LEVEL 3: tahap 1-10 ----------
  { answer: D("BC4fNCI="),      img: "assets/level39.png" },
  { answer: D("FjIXKSYN"),     img: "assets/level40.png" },
  { answer: D("GS4ATiIGc30="),   img: "assets/level41.png" },
  { answer: D("FiYOPSw="),      img: "assets/level42.png" },
  { answer: D("ByYRK0Mea3F/"),  img: "assets/level43.png" },
  { answer: D("ETRlJTEWfw=="),    img: "assets/level21.png" },
  { answer: D("GSYXOiIdc3s="),   img: "assets/level44.png" },
  { answer: D("HysAPiwR"),     img: "assets/level45.png" },
  { answer: D("BiILKiIRdQ=="),    img: "assets/level46.png" },
  { answer: D("GiYWJ0MYfWJ3eBg="),img: "assets/level14.png" },
  // ---------- LEVEL 4: tahap 1-10 ----------
  { answer: D("FigJLw=="),       img: "assets/level05.png" },
  { answer: D("HzILLSo="),      img: "assets/level47.png" },
  { answer: D("GCYIPjY="),      img: "assets/level48.png" },
  { answer: D("FjIOOw=="),       img: "assets/level11.png" },
  { answer: D("BCYcOy0Y"),     img: "assets/level12.png" },
  { answer: D("ByIVKyce"),     img: "assets/level09.png" },
  { answer: D("FjILKSI="),      img: "assets/level08.png" },
  { answer: D("BCIXLysK"),     img: "assets/level20.png" },
  { answer: D("GSgHJy8="),      img: "assets/level03.png" },
  { answer: D("HyYIKzEe"),     img: "assets/level19.png" },
  // ---------- LEVEL 5: tahap 1-10 ----------
  { answer: D("HyIXKzceEnFifw=="), img: "assets/level13.png" },
  { answer: D("HiYITjcefHdzeA=="), img: "assets/level15.png" },
  { answer: D("ACIJKzUWYXk="),   img: "assets/level18.png" },
  { answer: D("BigOKzc="),      img: "assets/level22.png" },
  { answer: D("HCIJJygQYmR3ZA=="), img: "assets/level24.png" },
  { answer: D("ByIOIS8eeg=="),       img: "assets/level49.png" },
  { answer: D("GSYWJCob"),        img: "assets/level50.png" },
  { answer: D("BCYWLzE="),         img: "assets/level51.png" },
  { answer: D("BjIILys="),         img: "assets/level06.png" },
  { answer: D("BzMEPSoKfA=="),       img: "assets/level52.png" },
  // ---------- LEVEL 6: tahap 1-10 ----------
  { answer: D("FiYLKiINcw=="),       img: "assets/level53.png" },
  { answer: D("EzILOy0Y"),        img: "assets/level16.png" },
  { answer: D("HygJLy5/YHV8dxEf"),  img: "assets/level58.png" },
  { answer: D("ACYILy1/eX9mdw=="),    img: "assets/level59.png" },
  { answer: D("HyIHOy1/cHl8dwsZP3A="),img: "assets/level54.png" },
  { answer: D("GTIWKzYS"),        img: "assets/level55.png" },
  { answer: D("BjIILyt/YXF5fws="),   img: "assets/level56.png" },
  { answer: D("HyYLOiwN"),        img: "assets/level57.png" },
  { answer: D("BCYLOiIW"),        img: "assets/level23.png" },
  { answer: D("FS4XTjcaYHpneA=="),    img: "assets/level60.png" },
];

/* Jawaban versi lama (24 level, urutan lama) — dipakai untuk migrasi save.
   Ikut terenkripsi oleh build.py seperti jawaban level. */
const OLD_ANSWERS = [D("EyYPLys="), D("BC4WLy0Y"), D("GSgHJy8="), D("HzIGJy0Y"), D("FigJLw=="), D("BjIILys="), D("HSwEIA=="), D("FjILKSI="), D("ByIVKyce"), D("FT4EIw=="), D("FjIOOw=="), D("BCYcOy0Y"), D("HyIXKzceEnFifw=="), D("GiYWJ0MYfWJ3eBg="), D("HiYITjcefHdzeA=="), D("EzILOy0Y"), D("HzIVO0MUZ2Bn"), D("ACIJKzUWYXk="), D("HyYIKzEe"), D("BCIXLysK"), D("ETRlJTEWfw=="), D("BigOKzc="), D("BCYLOiIW"), D("HCIJJygQYmR3ZA==")];

const ACHIEVEMENTS = [
  { id: "lvl10",    icon: "🌟", name: "Pemula Hebat",  desc: "Selesaikan 10 tahap" },
  { id: "combo5",   icon: "🔥", name: "Kombo Master",   desc: "Kombo 5x beruntun" },
  { id: "levelfull", icon: "📦", name: "Penakluk Level", desc: "Selesaikan 1 level penuh (10/10)" },
  { id: "daily3",   icon: "📅", name: "Rajin Harian",   desc: "Streak harian 3 hari" },
  { id: "koin1k",   icon: "💰", name: "Sultan Koin",    desc: "Kumpulkan 1000 koin" },
  { id: "all60",    icon: "🏆", name: "Legenda",         desc: "Selesaikan semua 60 tahap" },
];

const SAVE_KEY = D("IAInDwgYU11QVy0LEEFEAlY=");
const COIN_REWARD = parseInt(D("YFc="), 10);
const COST_REVEAL = parseInt(D("YVc="), 10);
const COST_REMOVE = parseInt(D("Z1c="), 10);
const COST_SKIP = parseInt(D("ZVd1"), 10);
const DAILY_MULT    = 2;

/* ---------------- save ---------------- */
function defaultSave() {
  return {
    coins: 100, done: [], unlockedLevels: 1,
    combo: 0, bestCombo: 0, totalEarned: 0,
    achievements: {},
    daily: { lastDate: "", streak: 0, doneDate: "" },
    settings: { sfx: true, music: true, volume: 80 },
  };
}
function migrateOldSave(s) {
  // format sangat lama: 24 level flat dengan field `unlocked`
  const ns = defaultSave();
  ns.coins = typeof s.coins === "number" ? s.coins : 100;
  const done = [];
  (s.done || []).forEach((d, i) => {
    if (d && OLD_ANSWERS[i]) {
      const ni = LEVELS.findIndex((lv) => lv.answer === OLD_ANSWERS[i]);
      if (ni >= 0) done[ni] = true;
    }
  });
  ns.done = done;
  recalcLevelUnlock(ns);
  return ns;
}
function loadSave() {
  try {
    const s = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (s && typeof s.coins === "number") {
      if (s.unlockedLevels === undefined && s.unlockedPacks === undefined && typeof s.unlocked === "number")
        return migrateOldSave(s); // format 24 level lama
      const ns = Object.assign(defaultSave(), s);
      if (s.unlockedLevels === undefined)
        recalcLevelUnlock(ns); // format 60-flat lama (unlockedPacks) -> hitung ulang
      if (ns.achievements && ns.achievements.pack1 && !ns.achievements.levelfull) {
        ns.achievements.levelfull = true; // pencapaian pack lama dibawa ke level
        delete ns.achievements.pack1;
      }
      return ns;
    }
  } catch (e) {}
  return defaultSave();
}
function persist() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) {} }
let save = loadSave();

/* ---------------- level & tanggal ---------------- */
function levelOf(i) { return Math.floor(i / STAGES_PER_LEVEL); }
function stageOf(i) { return i % STAGES_PER_LEVEL; }
function levelDoneCount(s, L) {
  let n = 0;
  for (let i = L * STAGES_PER_LEVEL; i < L * STAGES_PER_LEVEL + STAGES_PER_LEVEL; i++) if (s.done[i]) n++;
  return n;
}
function recalcLevelUnlock(s) {
  s = s || save;
  for (let L = 0; L < NUM_LEVELS - 1; L++)
    if (levelDoneCount(s, L) >= Math.ceil(STAGES_PER_LEVEL / 2))
      s.unlockedLevels = Math.max(s.unlockedLevels, L + 2);
  s.unlockedLevels = Math.min(s.unlockedLevels, NUM_LEVELS);
}
function todayStr(d) {
  d = d || new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function yesterdayStr() {
  const d = new Date(); d.setDate(d.getDate() - 1);
  return todayStr(d);
}
function dailySeed() { return parseInt(todayStr().replace(/-/g, ""), 10) % LEVELS.length; }

/* ---------------- kombo ---------------- */
function comboBonus(combo) {
  if (combo >= 5) return 50;
  if (combo === 4) return 30;
  if (combo === 3) return 20;
  if (combo === 2) return 10;
  return 0;
}

/* ---------------- audio: SFX + musik original (WebAudio) ---------------- */
const Sfx = {
  ctx: null,
  ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) { try { this.ctx = new AC(); } catch (e) {} }
    }
    if (this.ctx && this.ctx.state === "suspended") this.ctx.resume();
    return this.ctx;
  },
  tone(freq, dur, type, vol, delay) {
    if (!save.settings.sfx) return;
    const v = (vol || 0.12) * ((save.settings.volume || 0) / 100);
    if (v <= 0.0005) return;
    const ctx = this.ensure(); if (!ctx || !freq) return;
    const t = ctx.currentTime + (delay || 0);
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || "sine"; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(v, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(ctx.destination);
    o.start(t); o.stop(t + dur + 0.05);
  },
  click()   { this.tone(720, 0.06, "square", 0.05); },
  back()    { this.tone(420, 0.06, "square", 0.05); },
  coin()    { this.tone(1318.5, 0.08, "sine", 0.09); this.tone(1760, 0.14, "sine", 0.09, 0.07); },
  hint()    { this.tone(880, 0.1, "sine", 0.09); this.tone(1174.7, 0.14, "sine", 0.09, 0.07); },
  correct() { [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => this.tone(f, 0.16, "triangle", 0.13, i * 0.09)); },
  wrong()   { this.tone(196, 0.18, "sawtooth", 0.09); this.tone(147, 0.28, "sawtooth", 0.09, 0.1); },
  fanfare() { [523.25, 523.25, 659.25, 783.99, 1046.5].forEach((f, i) => this.tone(f, 0.14, "square", 0.07, i * 0.1)); },
};

/* Musik latar ceria: loop sederhana I–V–vi–IV, komposisi sendiri */
const Music = {
  timer: null, step: 0, on: true, bpm: 116,
  bass: [130.81, 98.00, 110.00, 87.31],          // C3 G2 A2 F2
  lead: [523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25, 440.00,
         392.00, 440.00, 523.25, 659.25, 587.33, 523.25, 440.00, 392.00],
  start() {
    if (this.timer || !this.on) return;
    const stepDur = 60 / this.bpm / 2;
    const tick = () => {
      if (!this.on) return;
      const s = this.step % 32, bar = Math.floor(s / 8);
      if (s % 8 === 0) Sfx.tone(this.bass[bar], stepDur * 6, "triangle", 0.06);
      const n = this.lead[s % 16];
      if (n) Sfx.tone(n, stepDur * 0.9, "sine", 0.035);
      if (s % 4 === 2) Sfx.tone(6500, 0.025, "square", 0.008);
      this.step++;
    };
    tick();
    this.timer = setInterval(tick, stepDur * 1000);
  },
  stop() { if (this.timer) { clearInterval(this.timer); this.timer = null; } },
  toggle() {
    this.on = !this.on;
    save.settings.music = this.on; persist();
    if (this.on) this.start(); else this.stop();
    return this.on;
  }
};

/* ---------------- gambar level terenkripsi (.bin) ----------------
   .bin = PNG yang di-XOR (lihat encrypt_assets.py). Key sama dengan
   key jawaban (_KEY dari blok enkripsi build.py; fallback untuk test source). */
function assetKey() {
  if (typeof _KEY !== "undefined") return _KEY;
  return atob("VGdFbmM=") + String.fromCharCode(95, 50, 48, 50, 54, 95) + "!7qX".split("").reverse().join("");
}
const imgURLCache = {};
function decryptBytes(u8) {
  const k = assetKey();
  const out = new Uint8Array(u8.length);
  for (let i = 0; i < u8.length; i++) out[i] = u8[i] ^ k.charCodeAt(i % k.length);
  return out;
}
function isPng(u8) {
  return u8.length > 4 && u8[0] === 0x89 && u8[1] === 0x50 && u8[2] === 0x4e && u8[3] === 0x47;
}
function setImgSrc(url) { const im = $("levelImg"); if (im) im.src = url; }
async function loadLevelImage(pngPath) {
  const binPath = pngPath.replace(/\.png$/i, ".bin");
  if (imgURLCache[binPath]) { setImgSrc(imgURLCache[binPath]); return; }
  try {
    const resp = await fetch(binPath);
    if (!resp.ok) throw new Error("fetch " + resp.status);
    const dec = decryptBytes(new Uint8Array(await resp.arrayBuffer()));
    if (!isPng(dec)) throw new Error("bad magic");
    const url = URL.createObjectURL(new Blob([dec], { type: "image/png" }));
    imgURLCache[binPath] = url;
    setImgSrc(url);
  } catch (e) {
    setImgSrc(pngPath); // fallback: PNG langsung (dev tanpa .bin)
  }
}
function preloadImage(pngPath) {
  const binPath = pngPath.replace(/\.png$/i, ".bin");
  if (!binPath || imgURLCache[binPath]) return;
  fetch(binPath).then((r) => (r.ok ? r.arrayBuffer() : Promise.reject()))
    .then((ab) => {
      const dec = decryptBytes(new Uint8Array(ab));
      if (isPng(dec)) imgURLCache[binPath] = URL.createObjectURL(new Blob([dec], { type: "image/png" }));
    }).catch(() => {});
}

/* ---------------- navigation stack ----------------
   home -> levels -> play, home -> play, home -> settings.
   Tombol back (UI maupun native Android) = pop stack.
   window.__goBack dipanggil native via evaluateJavascript;
   return true = di-handle JS, false = sudah di home (native boleh exit). */
const navStack = ["screen-home"];
function goScreen(id) {
  show(id);
  if (navStack[navStack.length - 1] !== id) navStack.push(id);
}
function goHome() {
  navStack.length = 0; navStack.push("screen-home");
  refreshHome(); show("screen-home");
}
function goLevels() {
  navStack.length = 0; navStack.push("screen-home", "screen-levels");
  renderLevelTabs(); renderStages(); show("screen-levels");
}
function goBack() {
  if (!$("overlay").classList.contains("hidden")) {
    $("overlay").classList.add("hidden");
    Sfx.back();
    return true;
  }
  if (navStack.length > 1) {
    navStack.pop();
    const top = navStack[navStack.length - 1];
    if (top === "screen-home") refreshHome();
    if (top === "screen-levels") { renderLevelTabs(); renderStages(); }
    Sfx.back();
    show(top);
    return true;
  }
  return false;
}
window.__goBack = function () { return goBack(); };

/* ---------------- state level ---------------- */
let levelIndex = 0;
let dailyMode = false;
let slots = [];  // {space:true} | {ch, bank}  (bank = index bank yg mengisi, -1 = kosong)
let bank = [];   // {ch, used, gone}

/* ---------------- helpers DOM ---------------- */
const $ = (id) => document.getElementById(id);
function show(id) {
  document.querySelectorAll(".screen").forEach((el) => el.classList.toggle("active", el.id === id));
}
let toastTimer = null;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg; t.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add("hidden"), 1800);
}
function updateCoins(pulse) {
  $("coinCount").textContent = save.coins;
  if (pulse) {
    const pill = document.querySelector(".coin-pill");
    pill.classList.remove("pulse"); void pill.offsetWidth; pill.classList.add("pulse");
  }
}
function updateCombo() {
  const el = $("comboBadge");
  if (save.combo >= 2) { el.textContent = "🔥x" + save.combo; el.classList.remove("hidden"); }
  else el.classList.add("hidden");
}
function shuffled(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------------- pencapaian ---------------- */
function unlockAchievement(id) {
  if (save.achievements[id]) return;
  const a = ACHIEVEMENTS.find((x) => x.id === id);
  save.achievements[id] = true; persist();
  if (a) { Sfx.fanfare(); toast("🏅 " + a.name + " — " + a.desc); renderAchievements(); }
}
function checkAchievements() {
  const doneCount = save.done.filter(Boolean).length;
  if (doneCount >= 10) unlockAchievement("lvl10");
  if (save.bestCombo >= 5) unlockAchievement("combo5");
  for (let L = 0; L < NUM_LEVELS; L++)
    if (levelDoneCount(save, L) >= STAGES_PER_LEVEL) unlockAchievement("levelfull");
  if (save.daily.streak >= 3) unlockAchievement("daily3");
  if (save.totalEarned >= 1000) unlockAchievement("koin1k");
  if (doneCount >= LEVELS.length) unlockAchievement("all60");
}
function renderAchievements() {
  const box = $("achRow");
  box.innerHTML = "";
  ACHIEVEMENTS.forEach((a) => {
    const un = !!save.achievements[a.id];
    const d = document.createElement("div");
    d.className = "ach" + (un ? "" : " locked");
    d.title = a.name + " — " + a.desc;
    d.innerHTML = '<span class="ach-icon">' + (un ? a.icon : "🔒") + '</span><span class="ach-name">' + a.name + "</span>";
    box.appendChild(d);
  });
}

/* ---------------- home ---------------- */
function refreshHome() {
  const doneCount = save.done.filter(Boolean).length;
  $("homeProgress").textContent = "Tahap selesai: " + doneCount + " / " + LEVELS.length;
  $("homeStats").textContent = "🔥 Kombo maks: " + save.bestCombo + "   ·   🪙 Total koin: " + save.totalEarned;
  updateCoins();
  refreshDailyBtn();
  renderAchievements();
}
function refreshDailyBtn() {
  const btn = $("btnDaily");
  const done = save.daily.doneDate === todayStr();
  btn.disabled = done;
  btn.classList.toggle("done", done);
  btn.innerHTML = done
    ? "📅 HARIAN SELESAI ✓"
    : "📅 TANTANGAN HARIAN" + (save.daily.streak > 0 ? ' <span class="streak">🔥' + save.daily.streak + "</span>" : "") + '<small>hadiah 2x koin</small>';
}

/* ---------------- pilih level -> pilih tahap ---------------- */
let curLevel = 0;
function renderLevelTabs() {
  const tabs = $("levelTabs");
  tabs.innerHTML = "";
  LEVELS_META.forEach((m, i) => {
    const locked = i >= save.unlockedLevels;
    const n = levelDoneCount(save, i);
    const b = document.createElement("button");
    b.className = "level-tab" + (i === curLevel ? " active" : "") + (locked ? " locked" : "");
    b.innerHTML = (locked ? "🔒 " : m.icon + " ") + m.name + (locked ? "" : " · " + n + "/10");
    b.addEventListener("click", () => {
      Sfx.click();
      if (locked) { toast("Selesaikan 5 tahap " + LEVELS_META[i - 1].name + " untuk membuka!"); return; }
      curLevel = i; renderLevelTabs(); renderStages();
    });
    tabs.appendChild(b);
  });
}
function renderStages() {
  const grid = $("stageGrid");
  grid.innerHTML = "";
  const locked = curLevel >= save.unlockedLevels;
  for (let k = 0; k < STAGES_PER_LEVEL; k++) {
    const i = curLevel * STAGES_PER_LEVEL + k;
    const b = document.createElement("button");
    b.className = "level-btn";
    if (locked) { b.classList.add("locked"); b.textContent = "🔒"; }
    else {
      b.textContent = (k + 1);
      if (save.done[i]) { b.classList.add("done"); b.innerHTML = (k + 1) + '<span class="check">✓</span>'; }
      b.addEventListener("click", () => { Sfx.click(); startLevel(i); goScreen("screen-play"); });
    }
    grid.appendChild(b);
  }
  $("levelProgress").textContent = locked
    ? "🔒 Terkunci — selesaikan 5 tahap " + LEVELS_META[curLevel - 1].name
    : LEVELS_META[curLevel].icon + " " + LEVELS_META[curLevel].name + " — selesai: " + levelDoneCount(save, curLevel) + " / " + STAGES_PER_LEVEL;
}

/* ---------------- gameplay ---------------- */
function buildBank(answer) {
  const letters = answer.replace(/ /g, "").split("");
  const need = Math.max(12, letters.length + 4);
  const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const pool = letters.slice();
  while (pool.length < need) pool.push(alpha[Math.floor(Math.random() * alpha.length)]);
  return shuffled(pool).map((ch) => ({ ch, used: false, gone: false }));
}
function buildSlots(answer) {
  return answer.split("").map((ch) => (ch === " " ? { space: true } : { ch, bank: -1 }));
}

function startLevel(i, opts) {
  opts = opts || {};
  dailyMode = !!opts.daily;
  levelIndex = i;
  const lv = LEVELS[i];
  slots = buildSlots(lv.answer);
  bank = buildBank(lv.answer);
  const lm = LEVELS_META[levelOf(i)];
  $("levelTitle").textContent = dailyMode
    ? "📅 TANTANGAN HARIAN"
    : lm.name + " · TAHAP " + (stageOf(i) + 1);
  loadLevelImage(lv.img);
  if (i + 1 < LEVELS.length) preloadImage(LEVELS[i + 1].img);
  $("overlay").classList.add("hidden");
  renderSlots(); renderBank(); updateCoins(); updateCombo();
}

function renderSlots() {
  const box = $("slots");
  box.innerHTML = "";
  slots.forEach((s, i) => {
    const d = document.createElement("div");
    if (s.space) { d.className = "slot space"; }
    else {
      d.className = "slot" + (s.bank !== -1 ? " filled" : "");
      d.textContent = s.bank !== -1 ? bank[s.bank].ch : "";
      d.addEventListener("click", () => tapSlot(i));
    }
    box.appendChild(d);
  });
}
function renderBank() {
  const box = $("bank");
  box.innerHTML = "";
  bank.forEach((b, i) => {
    const btn = document.createElement("button");
    btn.className = "tile" + (b.used ? " used" : "") + (b.gone ? " gone" : "");
    btn.textContent = b.ch;
    btn.addEventListener("click", () => tapBank(i));
    box.appendChild(btn);
  });
}

function tapBank(i) {
  const b = bank[i];
  if (b.used || b.gone) return;
  const s = slots.find((x) => !x.space && x.bank === -1);
  if (!s) return;
  s.bank = i; b.used = true;
  Sfx.click(); renderSlots(); renderBank();
}
function tapSlot(i) {
  const s = slots[i];
  if (s.space || s.bank === -1) return;
  bank[s.bank].used = false; s.bank = -1;
  Sfx.back(); renderSlots(); renderBank();
}

function currentGuess() {
  return slots.map((s) => (s.space ? " " : (s.bank === -1 ? "" : bank[s.bank].ch))).join("");
}
function isComplete() { return slots.every((s) => s.space || s.bank !== -1); }

function checkAnswer() {
  if (!isComplete()) { toast("Lengkapi dulu jawabannya!"); return; }
  if (currentGuess() === LEVELS[levelIndex].answer) winLevel();
  else {
    Sfx.wrong();
    save.combo = 0; persist(); updateCombo();
    const box = $("slots");
    box.classList.remove("shake"); void box.offsetWidth; box.classList.add("shake");
    toast("Belum tepat, kombo reset! Coba lagi!");
  }
}

function winLevel() {
  Sfx.correct(); setTimeout(() => Sfx.coin(), 350);
  let reward, title, emoji;
  if (dailyMode) {
    reward = COIN_REWARD * DAILY_MULT;
    const t = todayStr();
    save.daily.streak = (save.daily.lastDate === yesterdayStr()) ? save.daily.streak + 1 : 1;
    save.daily.lastDate = t;
    save.daily.doneDate = t;
    title = "TANTANGAN SELESAI!";
    emoji = "📅";
  } else {
    save.combo += 1;
    save.bestCombo = Math.max(save.bestCombo, save.combo);
    reward = COIN_REWARD + comboBonus(save.combo);
    save.done[levelIndex] = true;
    const last = levelIndex === LEVELS.length - 1;
    title = last ? "SEMUA SELESAI! 🏆" : "BENAR!";
    emoji = last ? "🏆" : "🎉";
  }
  save.coins += reward;
  save.totalEarned += reward;
  recalcLevelUnlock();
  persist(); updateCoins(true); updateCombo();
  checkAchievements(); refreshHome();
  $("winEmoji").textContent = emoji;
  $("winTitle").textContent = title;
  $("winText").textContent = "+" + reward + " koin" +
    (!dailyMode && save.combo >= 2 ? "  (🔥x" + save.combo + ")" : "") +
    (dailyMode && save.daily.streak >= 2 ? "  (streak 🔥" + save.daily.streak + " hari)" : "");
  $("btnNext").style.display = (dailyMode || levelIndex === LEVELS.length - 1) ? "none" : "";
  $("overlay").classList.remove("hidden");
}

/* ---------------- hints ---------------- */
function spend(cost) {
  if (save.coins < cost) { toast("Koin kurang! Menangkan tahap dulu."); return false; }
  save.coins -= cost; persist(); updateCoins();
  return true;
}
function hintReveal() {
  const empties = slots.map((s, i) => ({ s, i })).filter((x) => !x.s.space && x.s.bank === -1);
  if (!empties.length) { toast("Semua huruf sudah terisi!"); return; }
  if (!spend(COST_REVEAL)) return;
  const pick = empties[Math.floor(Math.random() * empties.length)];
  const bi = bank.findIndex((b) => !b.used && !b.gone && b.ch === pick.s.ch);
  if (bi !== -1) { pick.s.bank = bi; bank[bi].used = true; }
  Sfx.hint(); renderSlots(); renderBank();
}
function hintRemove() {
  // huruf yg masih dibutuhkan oleh slot kosong
  const need = {};
  slots.forEach((s) => { if (!s.space && s.bank === -1) need[s.ch] = (need[s.ch] || 0) + 1; });
  const avail = {};
  bank.forEach((b) => { if (!b.used && !b.gone) avail[b.ch] = (avail[b.ch] || 0) + 1; });
  const removable = [];
  for (let i = 0; i < bank.length && removable.length < 3; i++) {
    const b = bank[i];
    if (b.used || b.gone) continue;
    if ((avail[b.ch] || 0) > (need[b.ch] || 0)) { removable.push(i); avail[b.ch]--; }
  }
  if (!removable.length) { toast("Tidak ada huruf pengecoh!"); return; }
  if (!spend(COST_REMOVE)) return;
  removable.forEach((i) => { bank[i].gone = true; });
  Sfx.hint(); renderBank();
}
function hintSkip() {
  if (!spend(COST_SKIP)) return;
  Sfx.hint();
  if (!dailyMode) {
    save.done[levelIndex] = true;
    recalcLevelUnlock();
  }
  persist();
  toast("Tahap dilewati!");
  if (levelIndex < LEVELS.length - 1) { startLevel(levelIndex + 1, { daily: dailyMode }); show("screen-play"); }
  else goLevels();
  refreshHome();
}

/* ---------------- wiring ---------------- */
$("btnPlay").addEventListener("click", () => {
  Sfx.ensure(); Music.start();
  Sfx.click();
  let i = 0;
  while (i < LEVELS.length && (levelOf(i) >= save.unlockedLevels || save.done[i])) i++;
  if (i >= LEVELS.length) i = LEVELS.length - 1;
  curLevel = levelOf(i);
  startLevel(i); goScreen("screen-play");
});
$("btnDaily").addEventListener("click", () => {
  if (save.daily.doneDate === todayStr()) { toast("Tantangan hari ini sudah selesai. Besok lagi ya!"); return; }
  Sfx.ensure(); Music.start();
  Sfx.click();
  startLevel(dailySeed(), { daily: true }); goScreen("screen-play");
});
$("btnLevels").addEventListener("click", () => { Sfx.click(); goLevels(); });
$("btnBackHome").addEventListener("click", () => { goBack(); });
$("btnBackLevels").addEventListener("click", () => { goBack(); });
$("btnCheck").addEventListener("click", checkAnswer);
$("hintReveal").addEventListener("click", hintReveal);
$("hintRemove").addEventListener("click", hintRemove);
$("hintSkip").addEventListener("click", hintSkip);
$("btnNext").addEventListener("click", () => {
  Sfx.click();
  if (dailyMode) { goHome(); }
  else { startLevel(levelIndex + 1); show("screen-play"); }
});
/* BUGFIX: tombol PILIH LEVEL di popup harus menutup popup + ke layar level */
$("btnWinLevels").addEventListener("click", () => {
  Sfx.click();
  $("overlay").classList.add("hidden");
  refreshHome();
  goLevels();
});
$("musicBtn").addEventListener("click", () => {
  Sfx.ensure();
  const on = Music.toggle();
  $("musicBtn").textContent = on ? "🔊" : "🔇";
  if (on) Sfx.click();
});

/* ---------------- pengaturan ---------------- */
function renderSettings() {
  $("setSfx").checked = !!save.settings.sfx;
  $("setMusic").checked = !!save.settings.music;
  $("setVolume").value = save.settings.volume;
  $("setVolumeVal").textContent = save.settings.volume;
}
$("settingsBtn").addEventListener("click", () => { Sfx.click(); renderSettings(); goScreen("screen-settings"); });
$("btnBackSettings").addEventListener("click", () => { goBack(); });
$("setSfx").addEventListener("change", (e) => {
  save.settings.sfx = e.target.checked; persist();
  if (e.target.checked) Sfx.click();
});
$("setMusic").addEventListener("change", (e) => {
  save.settings.music = e.target.checked; persist();
  if (e.target.checked) { Music.on = true; Music.start(); Sfx.click(); }
  else { Music.on = false; Music.stop(); }
  $("musicBtn").textContent = e.target.checked ? "🔊" : "🔇";
});
$("setVolume").addEventListener("input", (e) => {
  save.settings.volume = Math.max(0, Math.min(100, parseInt(e.target.value, 10) || 0));
  persist();
  $("setVolumeVal").textContent = save.settings.volume;
});
$("btnResetSettings").addEventListener("click", () => {
  if (confirm("Yakin hapus semua progress dan mulai dari awal?")) {
    const st = save.settings;
    save = defaultSave(); save.settings = st; persist();
    refreshHome(); renderSettings(); Sfx.back(); toast("Progress direset!");
  }
});

/* cegah double-tap zoom di iOS */
document.addEventListener("dblclick", (e) => e.preventDefault(), { passive: false });

/* ---------------- boot ---------------- */
Music.on = save.settings.music !== false;
$("musicBtn").textContent = Music.on ? "🔊" : "🔇";
recalcLevelUnlock();
refreshHome();
show("screen-home");
