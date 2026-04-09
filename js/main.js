/* ============================================================
   SakeFind — Main JavaScript v2
   Enhanced UX: Radar Chart / Parallax / Multi-step Scan / FAQ
   ============================================================ */

'use strict';

/* ─── Supabase ─────────────────────────────────────────────── */
const SUPABASE_URL = 'https://vgoblfarmrljkujqyogd.supabase.co';
const SUPABASE_KEY = 'sb_publishable_wJhDnc2aQ6WTEM7F5LzYDQ_ib5kov-v';

let sb = null;
try {
  sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
} catch (e) {
  console.warn('Supabase init failed, using demo data.', e);
}

/* ─── Demo data ────────────────────────────────────────────── */
const DEMO_SAKES = [
  { id:1,  name:'十四代 本丸',      brewery:'高木酒造',    prefecture:'山形', type:'本醸造',    taste_profile:'辛口,淡麗,米の旨味',     image_url:'', ec_url:'#', price_yen:3500,  alcohol_percent:15, is_featured:true  },
  { id:2,  name:'久保田 萬寿',      brewery:'朝日酒造',    prefecture:'新潟', type:'純米大吟醸', taste_profile:'辛口,淡麗,すっきり',     image_url:'', ec_url:'#', price_yen:5500,  alcohol_percent:15, is_featured:true  },
  { id:3,  name:'獺祭 二割三分',    brewery:'旭酒造',      prefecture:'山口', type:'純米大吟醸', taste_profile:'甘口,フルーティー,華やか', image_url:'', ec_url:'#', price_yen:6600,  alcohol_percent:16, is_featured:true  },
  { id:4,  name:'而今 純米吟醸',    brewery:'木屋正酒造',  prefecture:'三重', type:'純米吟醸',  taste_profile:'甘口,フルーティー,華やか', image_url:'', ec_url:'#', price_yen:2800,  alcohol_percent:16, is_featured:false },
  { id:5,  name:'飛露喜 特別純米',  brewery:'廣木酒造',    prefecture:'福島', type:'純米',      taste_profile:'甘口,米の旨味,濃醇',     image_url:'', ec_url:'#', price_yen:1900,  alcohol_percent:17, is_featured:false },
  { id:6,  name:'鍋島 大吟醸',      brewery:'富久千代酒造', prefecture:'佐賀', type:'大吟醸',   taste_profile:'甘口,フルーティー,すっきり', image_url:'', ec_url:'#', price_yen:4200, alcohol_percent:16, is_featured:true  },
  { id:7,  name:'新政 No.6',        brewery:'新政酒造',    prefecture:'秋田', type:'純米',      taste_profile:'甘口,酸味,爽やか',       image_url:'', ec_url:'#', price_yen:2400,  alcohol_percent:12, is_featured:false },
  { id:8,  name:'磯自慢 純米大吟醸', brewery:'磯自慢酒造', prefecture:'静岡', type:'純米大吟醸', taste_profile:'辛口,淡麗,すっきり',     image_url:'', ec_url:'#', price_yen:4800,  alcohol_percent:16, is_featured:false },
  { id:9,  name:'黒龍 石田屋',      brewery:'黒龍酒造',    prefecture:'福井', type:'純米大吟醸', taste_profile:'辛口,米の旨味,深み',     image_url:'', ec_url:'#', price_yen:10000, alcohol_percent:15, is_featured:true  },
  { id:10, name:'田酒 特別純米',    brewery:'西田酒造',    prefecture:'青森', type:'純米',      taste_profile:'辛口,米の旨味,濃醇',     image_url:'', ec_url:'#', price_yen:2200,  alcohol_percent:16, is_featured:false },
  { id:11, name:'醸し人九平次',     brewery:'萬乗醸造',    prefecture:'愛知', type:'純米大吟醸', taste_profile:'甘口,フルーティー,酸味', image_url:'', ec_url:'#', price_yen:3200,  alcohol_percent:16, is_featured:false },
  { id:12, name:'東洋美人 一番纏',  brewery:'澄川酒造場',  prefecture:'山口', type:'純米大吟醸', taste_profile:'甘口,フルーティー,華やか', image_url:'', ec_url:'#', price_yen:5000, alcohol_percent:15, is_featured:false },
];

const DEMO_BREWERIES = [
  {
    name:'高木酒造', prefecture:'山形県', founded:'1615年', awards:['モンドセレクション金賞'],
    desc:'「十四代」を醸す山形の名蔵。400年を超える歴史を誇り、幻の日本酒として名高い銘柄を生み出し続ける。',
    philosophy:'「酒は人なり」— 酒造りは人と人との縁を紡ぐもの。',
    specialty:'十四代', emblem:'木',
  },
  {
    name:'旭酒造', prefecture:'山口県', founded:'1948年', awards:['IWC 2024 トロフィー','フランス料理店採用No.1'],
    desc:'「獺祭」で世界に名を知られる純米大吟醸専門蔵。山奥の小さな酒蔵から世界中の食卓へ届ける革新的な酒造り。',
    philosophy:'「失敗を恐れず、常に最高の一滴を追い求める」',
    specialty:'獺祭', emblem:'旭',
  },
  {
    name:'朝日酒造', prefecture:'新潟県', founded:'1830年', awards:['全国新酒鑑評会金賞 多数'],
    desc:'新潟淡麗辛口の代表格「久保田」を醸す老舗。越後の清らかな水と厳選した米が生む繊細な味わい。',
    philosophy:'「水のように澄み、米のように豊かに」',
    specialty:'久保田', emblem:'朝',
  },
  {
    name:'新政酒造', prefecture:'秋田県', founded:'1852年', awards:['きょうかい6号酵母発祥蔵'],
    desc:'日本最古の酵母「きょうかい6号」発祥の地。自然派・木桶仕込みで伝統と革新を融合させる。',
    philosophy:'「自然の力を借り、人の手で仕上げる」',
    specialty:'新政', emblem:'政',
  },
  {
    name:'廣木酒造', prefecture:'福島県', founded:'1858年', awards:['東北清酒鑑評会優等賞'],
    desc:'家族経営の小さな蔵元「飛露喜」が日本酒業界に革命をもたらした。手作りの丁寧な酒造りが熱狂的なファンを生む。',
    philosophy:'「量より質。一滴一滴に魂を込めて」',
    specialty:'飛露喜', emblem:'廣',
  },
  {
    name:'富久千代酒造', prefecture:'佐賀県', founded:'1688年', awards:['IWC 世界一 3回','G20大阪 公式採用'],
    desc:'九州の地で世界最高峰を目指す「鍋島」の蔵。IWCで世界一を複数回受賞した日本が誇るフラッグシップ蔵。',
    philosophy:'「佐賀の土、水、米。すべてはここから始まる」',
    specialty:'鍋島', emblem:'富',
  },
];

const DEMO_TIMELINE = [
  {
    user:'田中 誠一', location:'新潟', time:'3時間前', sake:'久保田 萬寿',
    type:'純米大吟醸', hashtags:['新潟', '淡麗辛口', '冷酒'],
    text:'新潟に来たらやっぱりこれ。すっきりした中に米の旨味がしっかり。冷やして飲むのが最高！', rating:5, likes:42, avatar:'👨'
  },
  {
    user:'佐藤 由美', location:'東京', time:'5時間前', sake:'獺祭 二割三分',
    type:'純米大吟醸', hashtags:['獺祭', 'フルーティー', 'ワイングラス'],
    text:'果物のような甘い香りが広がる。日本酒が苦手な方にもおすすめできる一本。ワイングラスで飲むと更に香りが楽しめます。', rating:5, likes:89, avatar:'👩'
  },
  {
    user:'山田 大輔', location:'山形', time:'昨日', sake:'十四代 本丸',
    type:'本醸造', hashtags:['十四代', '幻の酒', '山形'],
    text:'幻の日本酒をついにゲット。旨さが全然違う。これを飲んだら他が飲めなくなりそうで怖い笑', rating:5, likes:134, avatar:'🧔'
  },
  {
    user:'鈴木 花子', location:'大阪', time:'2日前', sake:'新政 No.6',
    type:'純米', hashtags:['新政', 'ナチュール', 'チーズペアリング'],
    text:'酸味が独特で最初は驚いたけど、チーズと合わせたら最高のペアリングに。日本酒の可能性を感じた一杯。', rating:4, likes:67, avatar:'👩‍🦱'
  },
  {
    user:'伊藤 健太', location:'青森', time:'3���前', sake:'田酒 特別純米',
    type:'純米', hashtags:['田酒', '青森', '燗酒'],
    text:'青森の地酒。米の濃厚な旨味が凝縮されている。燗にしたら更に深みが増して、一人で一升飲んでしまった。', rating:5, likes:201, avatar:'👨‍🦲'
  },
];

const TYPE_COLORS = {
  '純米大吟醸': { bg:'rgba(201,168,76,0.15)', border:'rgba(201,168,76,0.5)', text:'#c9a84c' },
  '大吟醸':     { bg:'rgba(180,140,60,0.12)', border:'rgba(180,140,60,0.4)', text:'#b48c3c' },
  '純米吟醸':   { bg:'rgba(100,180,255,0.1)', border:'rgba(100,180,255,0.3)', text:'#6ab4ff' },
  '吟醸':       { bg:'rgba(80,160,230,0.1)',  border:'rgba(80,160,230,0.3)', text:'#50a0e6' },
  '純米':       { bg:'rgba(160,220,120,0.1)', border:'rgba(160,220,120,0.3)', text:'#78c840' },
  '本醸造':     { bg:'rgba(255,160,80,0.1)',  border:'rgba(255,160,80,0.3)', text:'#ffa050' },
  '普通酒':     { bg:'rgba(150,150,150,0.1)', border:'rgba(150,150,150,0.3)', text:'#aaa' },
};

const FAQ_DATA = [
  { q:'どのくらいの頻度で届きますか？', a:'毎月1回、月初旬にお届けします。定期便なので、受け取りのご都合が悪い月は前月25日までにご連絡いただければ休止可能です。' },
  { q:'銘柄は毎月違いますか？', a:'はい、毎月テーマを設けて厳選した異なる銘柄をお届けします。同じ銘柄が連続することはありません。' },
  { q:'産地や種類の希望は伝えられますか？', a:'プレミアム・コレクタープランでは、苦手な産地や種類のご要望をお伺いできます。スタンダードは固定キュレーションとなります。' },
  { q:'キャンセルはいつでもできますか？', a:'いつでも解約可能です。次回発送の5日前までにマイページよりお手続きください。違約金等は一切ありません。' },
  { q:'ギフト包装はできますか？', a:'すべてのプランでギフト包装（無料）・熨斗（のし）対応が可能です。ご注文時の備考欄にてご指定ください。' },
];

/* ─── DOM Ready ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initNav();
  initParticles();
  initParallax();
  initScrollReveal();
  initCounters();
  initDiagnosis();
  initCatalog();
  initMap();
  initTimeline();
  initLabelScan();
  initBrewery();
  initFAQ();
  initTestimonials();
});

/* ============================================================
   Custom Cursor
   ============================================================ */
function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.addEventListener('mouseleave', () => { dot.style.opacity = 0; ring.style.opacity = 0; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = 1; ring.style.opacity = 0.7; });
}

/* ============================================================
   Navigation
   ============================================================ */
function initNav() {
  const nav    = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveLink();
  }, { passive: true });

  toggle?.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });

  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
}

/* ============================================================
   Particles
   ============================================================ */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${Math.random() * 2.5 + 0.5}px;
      height: ${Math.random() * 2.5 + 0.5}px;
      animation-duration: ${Math.random() * 18 + 10}s;
      animation-delay: ${Math.random() * 12}s;
      opacity: ${Math.random() * 0.5 + 0.15};
    `;
    container.appendChild(p);
  }
}

/* ============================================================
   Parallax — Hero Bottle
   ============================================================ */
function initParallax() {
  const bottle = document.querySelector('.hero-bottle');
  if (!bottle) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      bottle.style.transform = `translateY(calc(-50% + ${y * 0.25}px))`;
      bottle.style.opacity = 1 - y / window.innerHeight;
    }
  }, { passive: true });
}

/* ============================================================
   Scroll Reveal
   ============================================================ */
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ============================================================
   Counter Animation
   ============================================================ */
function initCounters() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); observer.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num').forEach(el => observer.observe(el));
}

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (p < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(update);
}

/* ============================================================
   AI Taste Diagnosis — v2
   Slide transitions + Step dots + Radar Chart + Personality
   ============================================================ */
const QUESTIONS = [
  {
    text: 'どんな甘さが好みですか？', key: 'sweet', icon: '🍯',
    options: [
      { label: '甘口', sub:'蜜のような甘さ', value: 5 },
      { label: 'やや甘口', sub:'ほんのり甘め', value: 4 },
      { label: '中口', sub:'バランス重視', value: 3 },
      { label: 'やや辛口', sub:'キリッと締まる', value: 2 },
      { label: '辛口', sub:'すっきりドライ', value: 1 },
    ]
  },
  {
    text: 'フルーティーな香りはどのくらい好きですか？', key: 'fruity', icon: '🍑',
    options: [
      { label: '大好き！', sub:'吟醸香たっぷり', value: 3 },
      { label: 'やや好き', sub:'ほのかに感じたい', value: 2 },
      { label: 'どちらでも', sub:'こだわらない', value: 1.5 },
      { label: '米の香りが好き', sub:'純米らしさを重視', value: 1 },
    ]
  },
  {
    text: '日本酒はどの温度で楽しみたい？', key: 'temp', icon: '🌡️',
    options: [
      { label: '冷酒', sub:'5〜10℃ キリッと', value: 1 },
      { label: '常温', sub:'15〜20℃ そのまま', value: 2 },
      { label: 'ぬる燗', sub:'40℃ 優しい温かさ', value: 3 },
      { label: '熱燗', sub:'55℃ しっかり温めて', value: 4 },
    ]
  },
  {
    text: '米の旨味・コクはどのくらい求めますか？', key: 'umami', icon: '🌾',
    options: [
      { label: 'たっぷり感じたい', sub:'濃醇で深みがある', value: 3 },
      { label: 'ほどよく', sub:'旨味と軽さのバランス', value: 2 },
      { label: '薄くさっぱり', sub:'軽やかで飲みやすい', value: 1 },
    ]
  },
  {
    text: 'お酒の強さの好みは？', key: 'alcohol', icon: '💧',
    options: [
      { label: 'しっかり', sub:'16%以上 存在感あり', value: 3 },
      { label: '普通', sub:'14〜15% 標準的', value: 2 },
      { label: '軽め', sub:'13%以下 スムース', value: 1 },
    ]
  },
];

const PERSONALITY_TYPES = [
  { name:'純米の求道者', condition: a => a.sweet <= 2 && a.fruity <= 1 && a.umami >= 3, desc:'米の旨味を極める本物志向。農業・蔵の文化まで探求する通好みタイプ。' },
  { name:'吟醸香マニア', condition: a => a.fruity >= 2.5 && (a.sweet >= 3), desc:'華やかな香りに恋するロマンチスト。大吟醸の世界を旅する探求者。' },
  { name:'辛口エレガント', condition: a => a.sweet <= 2 && a.fruity >= 1.5, desc:'キレのある辛口を上品に楽しむ通。料理とのペアリングを大切にする。' },
  { name:'燗酒の達人', condition: a => a.temp >= 3, desc:'温めることで広がる旨味を知る玄人。日本酒の深みを理解するベテラン。' },
  { name:'フレッシュ探求家', condition: a => a.alcohol <= 1 && a.sweet >= 3, desc:'軽やかで飲みやすい現代酒が好み。日本酒入門者から上級者まで幅広い。' },
  { name:'バランスの美食家', condition: () => true, desc:'甘辛・香り・コクのバランスを楽しむ。どんな場面でも日本酒を引き立てる達人。' },
];

let diagAnswers = {};
let currentQ   = 0;

function initDiagnosis() {
  renderQuestion(0);
  document.getElementById('retryBtn')?.addEventListener('click', resetDiagnosis);
}

function resetDiagnosis() {
  diagAnswers = {}; currentQ = 0;
  document.getElementById('diagnosisResult').classList.add('hidden');
  document.getElementById('diagnosisQuiz').classList.remove('hidden');
  renderQuestion(0);
}

function renderQuestion(index) {
  const quiz = document.getElementById('diagnosisQuiz');
  const progressText = document.getElementById('progressText');
  if (!quiz) return;

  const q   = QUESTIONS[index];
  const pct = (index / QUESTIONS.length) * 100;
  const fill = document.getElementById('progressFill');
  if (fill) fill.style.width = pct + '%';
  progressText.textContent = `${index} / ${QUESTIONS.length}`;

  // Step dots
  const stepsEl = document.getElementById('diagSteps');
  if (stepsEl) {
    stepsEl.innerHTML = QUESTIONS.map((_, i) => `
      <div class="diag-step ${i < index ? 'done' : i === index ? 'active' : ''}"></div>
    `).join('');
  }

  // Slide transition
  quiz.style.opacity = '0';
  quiz.style.transform = 'translateX(20px)';
  setTimeout(() => {
    quiz.innerHTML = `
      <div class="question-block">
        <p class="question-num">QUESTION ${index + 1} <span class="q-icon">${q.icon}</span></p>
        <h3 class="question-text">${q.text}</h3>
        <div class="question-options">
          ${q.options.map(o => `
            <button class="option-btn" onclick="selectOption(this,'${q.key}',${o.value})">
              <span class="opt-label">${o.label}</span>
              <span class="opt-sub">${o.sub}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
    quiz.style.transition = 'opacity 0.35s, transform 0.35s';
    quiz.style.opacity = '1';
    quiz.style.transform = 'translateX(0)';
  }, 150);
}

function selectOption(btn, key, value) {
  btn.closest('.question-options').querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  diagAnswers[key] = value;

  setTimeout(() => {
    if (currentQ < QUESTIONS.length - 1) {
      currentQ++;
      renderQuestion(currentQ);
    } else {
      showDiagnosisResult();
    }
  }, 380);
}

async function showDiagnosisResult() {
  const quiz   = document.getElementById('diagnosisQuiz');
  const result = document.getElementById('diagnosisResult');
  const fill   = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');

  if (fill) fill.style.width = '100%';
  progressText.textContent = '5 / 5';

  quiz.style.opacity = '0';
  setTimeout(() => { quiz.classList.add('hidden'); }, 200);

  // AI "thinking" animation
  result.classList.remove('hidden');
  result.innerHTML = `
    <div style="text-align:center;padding:3rem 0;">
      <div class="ai-thinking">
        <div class="ai-dot"></div><div class="ai-dot"></div><div class="ai-dot"></div>
      </div>
      <p style="color:var(--text-2);margin-top:1rem;font-size:0.9rem">AIが味覚プロファイルを分析中...</p>
    </div>
  `;

  let sakes = DEMO_SAKES;
  if (sb) {
    try {
      const { data } = await sb.from('sakes').select('*');
      if (data && data.length > 0) sakes = data;
    } catch(e) {}
  }

  await new Promise(r => setTimeout(r, 1400));

  const scored = sakes.map(s => ({ ...s, score: scoreSake(s, diagAnswers) }))
    .sort((a, b) => b.score - a.score).slice(0, 3);

  const personality = PERSONALITY_TYPES.find(p => p.condition(diagAnswers));
  const tasteAxes   = buildTasteAxes(diagAnswers);

  result.innerHTML = `
    <div class="result-header">
      <div class="result-personality-badge">${personality.name}</div>
      <div class="result-icon">🍶</div>
      <h3>あなたへのおすすめ</h3>
      <p class="result-personality-desc">${personality.desc}</p>
    </div>

    <div class="result-radar-wrap">
      <div class="result-radar">
        ${drawRadarChart(tasteAxes)}
      </div>
      <div class="result-axes-list">
        ${tasteAxes.map(a => `
          <div class="axis-row">
            <span class="axis-label">${a.label}</span>
            <div class="axis-bar-bg"><div class="axis-bar-fill" style="width:${a.pct}%"></div></div>
            <span class="axis-val">${a.pct}%</span>
          </div>
        `).join('')}
      </div>
    </div>

    <h4 class="result-rec-title">マッチする銘柄 TOP 3</h4>
    <div class="result-grid">
      ${scored.map((s, i) => `
        <div class="result-sake-card" style="animation-delay:${i * 0.12}s">
          <div class="result-rank">#${i + 1}</div>
          <div class="result-sake-emoji">🍶</div>
          <div class="result-sake-name">${s.name}</div>
          <div class="result-sake-type">${s.type}</div>
          <div class="result-sake-pref">${s.brewery} · ${s.prefecture}</div>
          <div class="match-bar-wrap">
            <div class="match-bar-bg"><div class="match-bar-fill" style="width:${s.score}%"></div></div>
            <span class="match-pct">${s.score}%</span>
          </div>
          ${s.ec_url && s.ec_url !== '#' ? `<a href="${s.ec_url}" target="_blank" class="result-buy-btn">購入する →</a>` : ''}
        </div>
      `).join('')}
    </div>

    <div style="text-align:center;margin-top:2.5rem">
      <button class="btn btn-outline" id="retryBtn">もう一度診断する</button>
    </div>
  `;

  // Animate bars after render
  requestAnimationFrame(() => {
    document.querySelectorAll('.axis-bar-fill, .match-bar-fill').forEach(el => {
      const w = el.style.width;
      el.style.width = '0';
      setTimeout(() => { el.style.width = w; }, 100);
    });
  });

  document.getElementById('retryBtn')?.addEventListener('click', resetDiagnosis);
}

function buildTasteAxes(answers) {
  return [
    { label:'甘み', pct: Math.round((answers.sweet || 3) / 5 * 100) },
    { label:'香り', pct: Math.round((answers.fruity || 2) / 3 * 100) },
    { label:'旨味', pct: Math.round((answers.umami || 2) / 3 * 100) },
    { label:'コク', pct: Math.round(((answers.umami || 2) + (answers.alcohol || 2)) / 6 * 100) },
    { label:'清涼感', pct: Math.round((4 - (answers.temp || 2)) / 3 * 100) },
  ];
}

function drawRadarChart(axes) {
  const cx = 90, cy = 90, r = 65, n = axes.length;
  const pts = axes.map((a, i) => {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
    const rr = r * (a.pct / 100);
    return { x: cx + rr * Math.cos(angle), y: cy + rr * Math.sin(angle), lx: cx + (r + 20) * Math.cos(angle), ly: cy + (r + 20) * Math.sin(angle) };
  });
  const gridPts = axes.map((_, i) => {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });
  const polygon = pts.map(p => `${p.x},${p.y}`).join(' ');
  const gridPoly = gridPts.map(p => `${p.x},${p.y}`).join(' ');
  const grid50 = gridPts.map(p => `${cx + (p.x - cx) * 0.5},${cy + (p.y - cy) * 0.5}`).join(' ');

  return `
    <svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg" class="radar-svg">
      <polygon points="${gridPoly}" fill="none" stroke="rgba(201,168,76,0.15)" stroke-width="1"/>
      <polygon points="${grid50}" fill="none" stroke="rgba(201,168,76,0.1)" stroke-width="0.8"/>
      ${gridPts.map(p => `<line x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}" stroke="rgba(201,168,76,0.1)" stroke-width="0.8"/>`).join('')}
      <polygon points="${polygon}" fill="rgba(201,168,76,0.18)" stroke="#c9a84c" stroke-width="1.5" stroke-linejoin="round"/>
      ${pts.map(p => `<circle cx="${p.x}" cy="${p.y}" r="3" fill="#c9a84c"/>`).join('')}
      ${pts.map((p, i) => {
        const anchor = p.lx < cx - 5 ? 'end' : p.lx > cx + 5 ? 'start' : 'middle';
        return `<text x="${p.lx}" y="${p.ly + 4}" text-anchor="${anchor}" font-size="9" fill="#b09880" font-family="Noto Serif JP">${axes[i].label}</text>`;
      }).join('')}
    </svg>
  `;
}

function scoreSake(sake, answers) {
  const profile = (sake.taste_profile || '').toLowerCase();
  let score = 50;
  if (answers.sweet >= 4 && profile.includes('甘口')) score += 15;
  if (answers.sweet <= 2 && profile.includes('辛口')) score += 15;
  if (answers.sweet >= 4 && profile.includes('辛口')) score -= 10;
  if (answers.sweet <= 2 && profile.includes('甘口')) score -= 10;
  if (answers.fruity >= 2 && (profile.includes('フルーティー') || profile.includes('華やか'))) score += 15;
  if (answers.fruity <= 1 && (profile.includes('米の旨味') || profile.includes('濃醇'))) score += 10;
  if (answers.umami >= 3 && (profile.includes('米の旨味') || profile.includes('濃醇'))) score += 12;
  if (answers.umami <= 1 && (profile.includes('すっきり') || profile.includes('淡麗'))) score += 12;
  const alc = sake.alcohol_percent || 15;
  if (answers.alcohol === 3 && alc >= 16) score += 8;
  if (answers.alcohol === 2 && alc >= 14 && alc <= 15) score += 8;
  if (answers.alcohol === 1 && alc <= 13) score += 8;
  if (answers.fruity >= 2 && (sake.type === '純米大吟醸' || sake.type === '大吟醸')) score += 10;
  return Math.min(99, Math.max(55, score));
}

/* ============================================================
   Catalog v2 — Taste tags + Sort + Count
   ============================================================ */
let allSakes  = [];
let sortOrder = 'featured';

async function initCatalog() {
  const loading = document.getElementById('catalogLoading');

  let sakes = [];
  if (sb) {
    try {
      const { data } = await sb.from('sakes').select('*').order('is_featured', { ascending: false });
      if (data && data.length > 0) sakes = data;
      else sakes = DEMO_SAKES;
    } catch(e) { sakes = DEMO_SAKES; }
  } else {
    sakes = DEMO_SAKES;
  }

  allSakes = sakes;
  loading.remove();
  renderCatalog(sakes);

  document.getElementById('searchInput').addEventListener('input', filterCatalog);
  document.getElementById('filterType').addEventListener('change', filterCatalog);
  document.getElementById('filterPref').addEventListener('change', filterCatalog);
  document.getElementById('sortSelect')?.addEventListener('change', e => {
    sortOrder = e.target.value; filterCatalog();
  });
  document.getElementById('resetFilters').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    document.getElementById('filterType').value  = '';
    document.getElementById('filterPref').value  = '';
    const ss = document.getElementById('sortSelect');
    if (ss) ss.value = 'featured';
    sortOrder = 'featured';
    renderCatalog(allSakes);
    document.getElementById('catalogEmpty').classList.add('hidden');
  });
}

function filterCatalog() {
  const q    = document.getElementById('searchInput').value.toLowerCase();
  const type = document.getElementById('filterType').value;
  const pref = document.getElementById('filterPref').value;

  let filtered = allSakes.filter(s => {
    const matchQ    = !q    || s.name.includes(q) || (s.brewery && s.brewery.includes(q));
    const matchType = !type || s.type === type;
    const matchPref = !pref || (s.prefecture && s.prefecture.includes(pref));
    return matchQ && matchType && matchPref;
  });

  // Sort
  if (sortOrder === 'price_asc')  filtered.sort((a, b) => (a.price_yen||0) - (b.price_yen||0));
  if (sortOrder === 'price_desc') filtered.sort((a, b) => (b.price_yen||0) - (a.price_yen||0));
  if (sortOrder === 'alc_desc')   filtered.sort((a, b) => (b.alcohol_percent||0) - (a.alcohol_percent||0));
  if (sortOrder === 'featured')   filtered.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));

  renderCatalog(filtered);
  document.getElementById('catalogEmpty').classList.toggle('hidden', filtered.length > 0);

  const countEl = document.getElementById('catalogCount');
  if (countEl) countEl.textContent = `${filtered.length}銘柄`;
}

function renderCatalog(sakes) {
  const grid = document.getElementById('catalogGrid');
  grid.innerHTML = '';

  const countEl = document.getElementById('catalogCount');
  if (countEl) countEl.textContent = `${sakes.length}銘柄`;

  sakes.forEach((s, i) => {
    const card  = document.createElement('div');
    card.className = 'sake-card';
    card.style.animationDelay = `${i * 0.04}s`;
    const price = s.price_yen ? `¥${s.price_yen.toLocaleString()}` : '—';
    const alc   = s.alcohol_percent ? `${s.alcohol_percent}%` : '';
    const tags  = (s.taste_profile || '').split(',').filter(Boolean);
    const tc    = TYPE_COLORS[s.type] || TYPE_COLORS['普通酒'];

    card.innerHTML = `
      <div class="sake-card-img">
        ${s.image_url
          ? `<img src="${s.image_url}" alt="${s.name}" loading="lazy" />`
          : `<div class="sake-card-img-placeholder"><div class="bottle-mini-svg">${miniBottleSVG()}</div></div>`}
        ${s.is_featured ? `<div class="sake-card-badge">注目</div>` : ''}
        <div class="sake-card-type-chip" style="background:${tc.bg};border-color:${tc.border};color:${tc.text}">${s.type || ''}</div>
      </div>
      <div class="sake-card-body">
        <h3 class="sake-card-name">${s.name}</h3>
        <p class="sake-card-brewery">${s.brewery || ''} ${s.prefecture ? `· ${s.prefecture}` : ''}</p>
        <div class="taste-tags">
          ${tags.map(t => `<span class="taste-tag">${t}</span>`).join('')}
        </div>
        <div class="sake-card-meta">
          <span class="sake-card-price">${price}</span>
          ${alc ? `<span class="sake-card-alc">${alc}</span>` : ''}
        </div>
      </div>
      ${s.ec_url ? `
        <div class="sake-card-actions">
          <a href="${s.ec_url}" target="_blank" rel="noopener">購入・詳細を見る</a>
        </div>
      ` : ''}
    `;
    grid.appendChild(card);
  });
}

function miniBottleSVG() {
  return `<svg viewBox="0 0 40 100" xmlns="http://www.w3.org/2000/svg" style="width:40px;height:100px;opacity:0.25">
    <rect x="15" y="0" width="10" height="5" rx="2" fill="#c9a84c"/>
    <path d="M15 5 L12 18 L28 18 L25 5Z" fill="#1e1518"/>
    <rect x="10" y="18" width="20" height="78" rx="2" fill="#1e1518"/>
    <rect x="12" y="28" width="16" height="40" rx="1" fill="none" stroke="#c9a84c" stroke-width="0.5" opacity="0.4"/>
  </svg>`;
}

/* ============================================================
   Map — 全国酒蔵 + 酒屋 + 飲食店 with toggle filters
   ============================================================ */
const MAP_LOCATIONS = [
  /* ── 北海道 ── */
  { name:'男山酒造',       lat:43.77, lng:142.37, type:'brewery', sake:'男山',         pref:'北海道旭川市' },
  { name:'国稀酒造',       lat:43.86, lng:141.53, type:'brewery', sake:'国稀',         pref:'北海道増毛町' },
  { name:'二世古酒造',     lat:42.90, lng:140.75, type:'brewery', sake:'二世古',       pref:'北海道倶知安町' },
  { name:'田中酒造',       lat:43.19, lng:141.00, type:'brewery', sake:'宝川',         pref:'北海道小樽市' },
  /* ── 青森 ── */
  { name:'西田酒造店',     lat:40.82, lng:140.75, type:'brewery', sake:'田酒',         pref:'青森県青森市' },
  { name:'八戸酒類',       lat:40.51, lng:141.49, type:'brewery', sake:'陸奥八仙',     pref:'青森県八戸市' },
  { name:'桃川',           lat:40.68, lng:141.37, type:'brewery', sake:'桃川',         pref:'青森県三沢市' },
  { name:'鳴海醸造店',     lat:40.77, lng:140.74, type:'brewery', sake:'陸奥男山',     pref:'青森県黒石市' },
  /* ── 岩手 ── */
  { name:'南部美人',       lat:40.27, lng:141.31, type:'brewery', sake:'南部美人',     pref:'岩手県二戸市' },
  { name:'あさ開',         lat:39.70, lng:141.15, type:'brewery', sake:'あさ開',       pref:'岩手県盛岡市' },
  { name:'赤武酒造',       lat:39.63, lng:141.13, type:'brewery', sake:'赤武',         pref:'岩手県盛岡市' },
  { name:'月の輪酒造',     lat:39.55, lng:141.18, type:'brewery', sake:'月の輪',       pref:'岩手県紫波町' },
  /* ── 宮城 ── */
  { name:'新澤醸造店',     lat:38.57, lng:140.95, type:'brewery', sake:'伯楽星',       pref:'宮城県大崎市' },
  { name:'一ノ蔵',         lat:38.51, lng:140.78, type:'brewery', sake:'一ノ蔵',       pref:'宮城県加美郡' },
  { name:'浦霞醸造',       lat:38.31, lng:141.02, type:'brewery', sake:'浦霞',         pref:'宮城県塩竈市' },
  { name:'墨廼江酒造',     lat:38.43, lng:141.30, type:'brewery', sake:'墨廼江',       pref:'宮城県石巻市' },
  { name:'黄金澤川敬商店', lat:38.35, lng:140.73, type:'brewery', sake:'黄金澤',       pref:'宮城県黒川郡' },
  /* ── 秋田 ── */
  { name:'新政酒造',       lat:39.72, lng:140.10, type:'brewery', sake:'新政',         pref:'秋田県秋田市' },
  { name:'秋田酒類製造',   lat:39.71, lng:140.11, type:'brewery', sake:'高清水',       pref:'秋田県秋田市' },
  { name:'刈穂酒造',       lat:39.46, lng:140.47, type:'brewery', sake:'刈穂',         pref:'秋田県大仙市' },
  { name:'由利正宗',       lat:39.39, lng:140.05, type:'brewery', sake:'由利正宗',     pref:'秋田県由利本荘市' },
  { name:'飛良泉本舗',     lat:39.68, lng:140.45, type:'brewery', sake:'飛良泉',       pref:'秋田県にかほ市' },
  { name:'齋彌酒造店',     lat:39.37, lng:139.89, type:'brewery', sake:'雪の茅舎',     pref:'秋田県由利本荘市' },
  /* ── 山形 ── */
  { name:'高木酒造',       lat:38.48, lng:140.38, type:'brewery', sake:'十四代',       pref:'山形県村山市' },
  { name:'出羽桜酒造',     lat:38.36, lng:140.38, type:'brewery', sake:'出羽桜',       pref:'山形県天童市' },
  { name:'楯の川酒造',     lat:39.02, lng:139.92, type:'brewery', sake:'楯野川',       pref:'山形県遊佐町' },
  { name:'酒田酒造',       lat:38.91, lng:139.84, type:'brewery', sake:'上喜元',       pref:'山形県酒田市' },
  { name:'米鶴酒造',       lat:38.00, lng:140.19, type:'brewery', sake:'米鶴',         pref:'山形県高畠町' },
  { name:'水戸部酒造',     lat:38.36, lng:140.38, type:'brewery', sake:'山形正宗',     pref:'山形県天童市' },
  { name:'東北泉酒造',     lat:38.73, lng:139.83, type:'brewery', sake:'東北泉',       pref:'山形県鶴岡市' },
  { name:'小屋酒造',       lat:38.73, lng:140.13, type:'brewery', sake:'くどき上手',   pref:'山形県東根市' },
  /* ── 福島 ── */
  { name:'廣木酒造本店',   lat:37.57, lng:139.93, type:'brewery', sake:'飛露喜',       pref:'福島県河沼郡' },
  { name:'末廣酒造',       lat:37.50, lng:139.93, type:'brewery', sake:'末廣',         pref:'福島県会津若松市' },
  { name:'宮泉銘醸',       lat:37.50, lng:139.94, type:'brewery', sake:'冩樂',         pref:'福島県会津若松市' },
  { name:'人気酒造',       lat:37.59, lng:140.43, type:'brewery', sake:'人気一',       pref:'福島県二本松市' },
  { name:'国権酒造',       lat:37.22, lng:139.77, type:'brewery', sake:'国権',         pref:'福島県南会津町' },
  { name:'榮川酒造',       lat:37.69, lng:139.90, type:'brewery', sake:'榮川',         pref:'福島県耶麻郡' },
  /* ── 茨城 ── */
  { name:'木内酒造',       lat:36.45, lng:140.49, type:'brewery', sake:'常陸野ネスト',  pref:'茨城県那珂市' },
  { name:'府中誉',         lat:36.19, lng:140.29, type:'brewery', sake:'渡舟',         pref:'茨城県石岡市' },
  { name:'結城酒造',       lat:36.30, lng:139.99, type:'brewery', sake:'結ゆい',       pref:'茨城県結城市' },
  /* ── 栃木 ── */
  { name:'せんきん',       lat:36.69, lng:139.97, type:'brewery', sake:'仙禽',         pref:'栃木県さくら市' },
  { name:'小林酒造',       lat:36.31, lng:139.80, type:'brewery', sake:'鳳凰美田',     pref:'栃木県小山市' },
  { name:'惣誉酒造',       lat:36.57, lng:140.10, type:'brewery', sake:'惣誉',         pref:'栃木県芳賀郡' },
  /* ── 群馬 ── */
  { name:'永井酒造',       lat:36.77, lng:139.00, type:'brewery', sake:'水芭蕉',       pref:'群馬県川場村' },
  { name:'聖酒造',         lat:36.26, lng:138.89, type:'brewery', sake:'聖',           pref:'群馬県富岡市' },
  /* ── 埼玉 ── */
  { name:'神亀酒造',       lat:35.97, lng:139.66, type:'brewery', sake:'神亀',         pref:'埼玉県蓮田市' },
  { name:'北西酒造',       lat:35.99, lng:139.59, type:'brewery', sake:'文楽',         pref:'埼玉県上尾市' },
  { name:'松岡醸造',       lat:36.02, lng:139.39, type:'brewery', sake:'帝松',         pref:'埼玉県比企郡' },
  /* ── 千葉 ── */
  { name:'東薫酒造',       lat:35.90, lng:140.50, type:'brewery', sake:'東薫',         pref:'千葉県香取市' },
  { name:'木戸泉酒造',     lat:35.27, lng:140.41, type:'brewery', sake:'木戸泉',       pref:'千葉県いすみ市' },
  /* ── 東京 ── */
  { name:'小澤酒造',       lat:35.79, lng:139.27, type:'brewery', sake:'澤乃井',       pref:'東京都青梅市' },
  { name:'石川酒造',       lat:35.74, lng:139.33, type:'brewery', sake:'多満自慢',     pref:'東京都福生市' },
  { name:'田村酒造場',     lat:35.74, lng:139.32, type:'brewery', sake:'嘉泉',         pref:'東京都福生市' },
  /* ── 神奈川 ── */
  { name:'泉橋酒造',       lat:35.44, lng:139.39, type:'brewery', sake:'いづみ橋',     pref:'神奈川県海老名市' },
  { name:'熊澤酒造',       lat:35.34, lng:139.42, type:'brewery', sake:'天青',         pref:'神奈川県茅ヶ崎市' },
  { name:'黄金井酒造',     lat:35.44, lng:139.36, type:'brewery', sake:'盛升',         pref:'神奈川県厚木市' },
  /* ── 新潟 ── */
  { name:'朝日酒造',       lat:37.45, lng:138.85, type:'brewery', sake:'久保田',       pref:'新潟県長岡市' },
  { name:'八海醸造',       lat:37.07, lng:138.89, type:'brewery', sake:'八海山',       pref:'新潟県南魚沼市' },
  { name:'菊水酒造',       lat:37.95, lng:139.33, type:'brewery', sake:'菊水',         pref:'新潟県新発田市' },
  { name:'白瀧酒造',       lat:37.10, lng:138.78, type:'brewery', sake:'上善如水',     pref:'新潟県南魚沼郡' },
  { name:'北雪酒造',       lat:38.02, lng:138.37, type:'brewery', sake:'北雪',         pref:'新潟県佐渡市' },
  { name:'今代司酒造',     lat:37.92, lng:139.05, type:'brewery', sake:'今代司',       pref:'新潟県新潟市' },
  { name:'高千代酒造',     lat:37.07, lng:138.89, type:'brewery', sake:'高千代',       pref:'新潟県南魚沼市' },
  { name:'苗場酒造',       lat:37.16, lng:138.73, type:'brewery', sake:'苗場山',       pref:'新潟県中魚沼郡' },
  { name:'大洋酒造',       lat:38.22, lng:139.48, type:'brewery', sake:'大洋盛',       pref:'新潟県村上市' },
  { name:'越後湯沢 雪国酒造', lat:36.93, lng:138.82, type:'brewery', sake:'魚沼',     pref:'新潟県南魚沼郡' },
  { name:'越乃景虎（諸橋酒造）', lat:37.42, lng:139.02, type:'brewery', sake:'越乃景虎', pref:'新潟県栃尾市' },
  /* ── 富山 ── */
  { name:'桝田酒造店',     lat:36.70, lng:137.21, type:'brewery', sake:'満寿泉',       pref:'富山県富山市' },
  { name:'富美菊酒造',     lat:36.71, lng:137.22, type:'brewery', sake:'羽根屋',       pref:'富山県富山市' },
  { name:'皇国晴酒造',     lat:36.87, lng:137.45, type:'brewery', sake:'幻の瀧',       pref:'富山県黒部市' },
  { name:'高澤酒造場',     lat:36.86, lng:136.99, type:'brewery', sake:'獅子の里',     pref:'富山県氷見市' },
  /* ── 石川 ── */
  { name:'菊姫合資会社',   lat:36.52, lng:136.58, type:'brewery', sake:'菊姫',         pref:'石川県白山市' },
  { name:'車多酒造',       lat:36.51, lng:136.57, type:'brewery', sake:'天狗舞',       pref:'石川県白山市' },
  { name:'鹿野酒造',       lat:36.30, lng:136.32, type:'brewery', sake:'常きげん',     pref:'石川県加賀市' },
  { name:'農口尚彦研究所', lat:36.41, lng:136.45, type:'brewery', sake:'農口',         pref:'石川県小松市' },
  { name:'宗玄酒造',       lat:37.43, lng:137.23, type:'brewery', sake:'宗玄',         pref:'石川県珠洲市' },
  { name:'福光屋',         lat:36.59, lng:136.63, type:'brewery', sake:'加賀鳶',       pref:'石川県金沢市' },
  { name:'吉田酒造店',     lat:36.52, lng:136.57, type:'brewery', sake:'手取川',       pref:'石川県白山市' },
  /* ── 福井 ── */
  { name:'黒龍酒造',       lat:36.09, lng:136.29, type:'brewery', sake:'黒龍',         pref:'福井県永平寺町' },
  { name:'舟木酒造',       lat:36.07, lng:136.22, type:'brewery', sake:'白岳仙',       pref:'福井県福井市' },
  { name:'南部酒造場',     lat:35.98, lng:136.49, type:'brewery', sake:'花垣',         pref:'福井県大野市' },
  /* ── 山梨 ── */
  { name:'萬屋醸造店',     lat:35.70, lng:138.73, type:'brewery', sake:'春鶯囀',       pref:'山梨県甲州市' },
  { name:'谷桜酒造',       lat:35.79, lng:138.40, type:'brewery', sake:'谷桜',         pref:'山梨県北杜市' },
  { name:'笹一酒造',       lat:35.61, lng:138.94, type:'brewery', sake:'笹一',         pref:'山梨県大月市' },
  /* ── 長野 ── */
  { name:'大信州酒造',     lat:36.24, lng:137.97, type:'brewery', sake:'大信州',       pref:'長野県松本市' },
  { name:'宮坂醸造',       lat:36.04, lng:138.11, type:'brewery', sake:'真澄',         pref:'長野県諏訪市' },
  { name:'小野酒造店',     lat:35.99, lng:137.99, type:'brewery', sake:'夜明け前',     pref:'長野県辰野町' },
  { name:'田中屋酒造店',   lat:36.85, lng:138.37, type:'brewery', sake:'水尾',         pref:'長野県飯山市' },
  { name:'佐久の花酒造',   lat:36.26, lng:138.47, type:'brewery', sake:'佐久の花',     pref:'長野県佐久市' },
  { name:'仙醸',           lat:36.09, lng:138.09, type:'brewery', sake:'こんな夜に',   pref:'長野県伊那市' },
  /* ── 岐阜 ── */
  { name:'白木恒助商店',   lat:35.39, lng:136.72, type:'brewery', sake:'達磨正宗',     pref:'岐阜県岐阜市' },
  { name:'玉泉堂酒造',     lat:35.31, lng:136.63, type:'brewery', sake:'醴泉',         pref:'岐阜県養老郡' },
  { name:'小坂酒造場',     lat:36.09, lng:137.33, type:'brewery', sake:'蓬莱泉',       pref:'岐阜県下呂市' },
  /* ── 静岡 ── */
  { name:'磯自慢酒造',     lat:34.86, lng:138.32, type:'brewery', sake:'磯自慢',       pref:'静岡県焼津市' },
  { name:'志太泉酒造',     lat:34.87, lng:138.26, type:'brewery', sake:'志太泉',       pref:'静岡県藤枝市' },
  { name:'神沢川酒造場',   lat:34.98, lng:138.38, type:'brewery', sake:'正雪',         pref:'静岡県静岡市' },
  { name:'花の舞酒造',     lat:34.71, lng:137.73, type:'brewery', sake:'花の舞',       pref:'静岡県浜松市' },
  { name:'富士錦酒造',     lat:35.22, lng:138.62, type:'brewery', sake:'富士錦',       pref:'静岡県富士宮市' },
  /* ── 愛知 ── */
  { name:'萬乗醸造',       lat:35.18, lng:136.91, type:'brewery', sake:'醸し人九平次', pref:'愛知県名古屋市' },
  { name:'金虎酒造',       lat:35.19, lng:136.90, type:'brewery', sake:'金虎',         pref:'愛知県名古屋市' },
  { name:'丸一酒造',       lat:35.05, lng:136.89, type:'brewery', sake:'神杉',         pref:'愛知県安城市' },
  /* ── 三重 ── */
  { name:'木屋正酒造',     lat:34.62, lng:136.11, type:'brewery', sake:'而今',         pref:'三重県名張市' },
  { name:'清水清三郎商店', lat:34.88, lng:136.58, type:'brewery', sake:'作',           pref:'三重県鈴鹿市' },
  { name:'伊勢萬',         lat:34.77, lng:136.13, type:'brewery', sake:'半蔵',         pref:'三重県伊賀市' },
  { name:'宮﨑本店',       lat:34.77, lng:136.52, type:'brewery', sake:'キンミヤ',     pref:'三重県四日市市' },
  /* ── 滋賀 ── */
  { name:'冨田酒造',       lat:35.37, lng:136.28, type:'brewery', sake:'七本鎗',       pref:'滋賀県長浜市' },
  { name:'浪乃音酒造',     lat:35.00, lng:135.87, type:'brewery', sake:'浪乃音',       pref:'滋賀県大津市' },
  { name:'喜多酒造',       lat:35.13, lng:136.21, type:'brewery', sake:'喜楽長',       pref:'滋賀県東近江市' },
  /* ── 京都 ── */
  { name:'玉乃光酒造',     lat:35.02, lng:135.76, type:'brewery', sake:'玉乃光',       pref:'京都府京都市' },
  { name:'増田徳兵衛商店', lat:35.03, lng:135.75, type:'brewery', sake:'月の桂',       pref:'京都府京都市' },
  { name:'招徳酒造',       lat:35.02, lng:135.77, type:'brewery', sake:'招徳',         pref:'京都府京都市' },
  { name:'羽田酒造',       lat:35.32, lng:135.28, type:'brewery', sake:'辛口 羽田',    pref:'京都府福知山市' },
  /* ── 大阪 ── */
  { name:'秋鹿酒造',       lat:34.93, lng:135.47, type:'brewery', sake:'秋鹿',         pref:'大阪府豊能郡' },
  { name:'山野酒造',       lat:34.77, lng:135.68, type:'brewery', sake:'片野桜',       pref:'大阪府交野市' },
  /* ── 兵庫 ── */
  { name:'剣菱酒造',       lat:34.70, lng:135.20, type:'brewery', sake:'剣菱',         pref:'兵庫県神戸市' },
  { name:'沢の鶴',         lat:34.70, lng:135.22, type:'brewery', sake:'沢の鶴',       pref:'兵庫県神戸市(灘)' },
  { name:'白鶴酒造',       lat:34.71, lng:135.24, type:'brewery', sake:'白鶴',         pref:'兵庫県神戸市(灘)' },
  { name:'菊正宗酒造',     lat:34.71, lng:135.25, type:'brewery', sake:'菊正宗',       pref:'兵庫県神戸市(灘)' },
  { name:'大関酒造',       lat:34.74, lng:135.34, type:'brewery', sake:'大関',         pref:'兵庫県西宮市' },
  { name:'辰馬本家酒造',   lat:34.74, lng:135.35, type:'brewery', sake:'白鹿',         pref:'兵庫県西宮市' },
  /* ── 奈良 ── */
  { name:'今西酒造',       lat:34.51, lng:135.85, type:'brewery', sake:'みむろ杉',     pref:'奈良県桜井市' },
  { name:'油長酒造',       lat:34.46, lng:135.73, type:'brewery', sake:'風の森',       pref:'奈良県御所市' },
  { name:'北村酒造',       lat:34.38, lng:135.93, type:'brewery', sake:'春鹿',         pref:'奈良県奈良市' },
  /* ── 和歌山 ── */
  { name:'名手酒造店',     lat:34.16, lng:135.21, type:'brewery', sake:'黒牛',         pref:'和歌山県海南市' },
  { name:'平和酒造',       lat:34.17, lng:135.21, type:'brewery', sake:'紀土',         pref:'和歌山県海南市' },
  /* ── 鳥取 ── */
  { name:'千代むすび酒造', lat:35.55, lng:133.23, type:'brewery', sake:'千代むすび',   pref:'鳥取県境港市' },
  { name:'諏訪酒造',       lat:35.26, lng:134.24, type:'brewery', sake:'諏訪泉',       pref:'鳥取県智頭町' },
  /* ── 島根 ── */
  { name:'李白酒造',       lat:35.47, lng:133.06, type:'brewery', sake:'李白',         pref:'島根県松江市' },
  { name:'國暉酒造',       lat:35.46, lng:133.05, type:'brewery', sake:'國暉',         pref:'島根県松江市' },
  { name:'一宮酒造',       lat:35.37, lng:132.76, type:'brewery', sake:'七冠馬',       pref:'島根県出雲市' },
  /* ── 岡山 ── */
  { name:'菊池酒造',       lat:34.59, lng:133.77, type:'brewery', sake:'燦然',         pref:'岡山県倉敷市' },
  { name:'宮下酒造',       lat:34.66, lng:133.93, type:'brewery', sake:'極聖',         pref:'岡山県岡山市' },
  { name:'辻本店',         lat:35.09, lng:133.63, type:'brewery', sake:'幻',           pref:'岡山県真庭市' },
  /* ── 広島 ── */
  { name:'竹鶴酒造',       lat:34.35, lng:132.92, type:'brewery', sake:'竹鶴',         pref:'広島県竹原市' },
  { name:'宝剣酒造',       lat:34.24, lng:132.56, type:'brewery', sake:'宝剣',         pref:'広島県呉市' },
  { name:'賀茂泉酒造',     lat:34.43, lng:132.74, type:'brewery', sake:'賀茂泉',       pref:'広島県東広島市' },
  { name:'今田酒造本店',   lat:34.44, lng:132.76, type:'brewery', sake:'富久長',       pref:'広島県東広島市' },
  { name:'中尾醸造',       lat:34.35, lng:132.93, type:'brewery', sake:'誠鏡',         pref:'広島県竹原市' },
  /* ── 山口 ── */
  { name:'旭酒造',         lat:34.17, lng:131.95, type:'brewery', sake:'獺祭',         pref:'山口県岩国市' },
  { name:'澄川酒造場',     lat:34.41, lng:131.40, type:'brewery', sake:'東洋美人',     pref:'山口県萩市' },
  { name:'永山本家酒造場', lat:33.95, lng:131.25, type:'brewery', sake:'貴',           pref:'山口県宇部市' },
  /* ── 徳島 ── */
  { name:'三芳菊酒造',     lat:34.03, lng:133.81, type:'brewery', sake:'三芳菊',       pref:'徳島県三好市' },
  { name:'司菊酒造',       lat:34.07, lng:134.56, type:'brewery', sake:'芳水',         pref:'徳島県吉野川市' },
  /* ── 香川 ── */
  { name:'川鶴酒造',       lat:34.12, lng:133.66, type:'brewery', sake:'川鶴',         pref:'香川県観音寺市' },
  { name:'西野金陵',       lat:34.27, lng:133.83, type:'brewery', sake:'金陵',         pref:'香川県仲多度郡' },
  /* ── 愛媛 ── */
  { name:'梅錦山川',       lat:33.92, lng:133.18, type:'brewery', sake:'梅錦',         pref:'愛媛県西条市' },
  { name:'成龍酒造',       lat:33.92, lng:133.19, type:'brewery', sake:'伊予賀儀屋',   pref:'愛媛県西条市' },
  { name:'協和酒造',       lat:33.76, lng:132.71, type:'brewery', sake:'媛一会',       pref:'愛媛県伊予市' },
  /* ── 高知 ── */
  { name:'司牡丹酒造',     lat:33.24, lng:133.05, type:'brewery', sake:'司牡丹',       pref:'高知県高岡郡' },
  { name:'土佐鶴酒造',     lat:33.39, lng:133.73, type:'brewery', sake:'土佐鶴',       pref:'高知県安芸郡' },
  { name:'酔鯨酒造',       lat:33.56, lng:133.53, type:'brewery', sake:'酔鯨',         pref:'高知県高知市' },
  { name:'有光酒造場',     lat:33.50, lng:133.90, type:'brewery', sake:'安芸虎',       pref:'高知県安芸市' },
  /* ── 福岡 ── */
  { name:'喜多屋',         lat:33.21, lng:130.56, type:'brewery', sake:'喜多屋',       pref:'福岡県八女市' },
  { name:'白糸酒造',       lat:33.59, lng:130.19, type:'brewery', sake:'田中六五',     pref:'福岡県糸島市' },
  { name:'若波酒造',       lat:33.22, lng:130.39, type:'brewery', sake:'若波',         pref:'福岡県大川市' },
  { name:'杜の蔵',         lat:33.32, lng:130.51, type:'brewery', sake:'杜の蔵',       pref:'福岡県久留米市' },
  { name:'繁桝（高橋商店）', lat:33.21, lng:130.57, type:'brewery', sake:'繁桝',       pref:'福岡県八女市' },
  /* ── 佐賀 ── */
  { name:'富久千代酒造',   lat:33.10, lng:130.10, type:'brewery', sake:'鍋島',         pref:'佐賀県鹿島市' },
  { name:'天吹酒造',       lat:33.30, lng:130.46, type:'brewery', sake:'天吹',         pref:'佐賀県三養基郡' },
  { name:'東一酒造',       lat:33.09, lng:129.99, type:'brewery', sake:'東一',         pref:'佐賀県嬉野市' },
  { name:'矢野酒造',       lat:33.11, lng:130.09, type:'brewery', sake:'肥前蔵心',     pref:'佐賀県鹿島市' },
  /* ── 長崎 ── */
  { name:'福田酒造',       lat:33.36, lng:129.56, type:'brewery', sake:'福田',         pref:'長崎県平戸市' },
  { name:'今里酒造',       lat:32.74, lng:129.87, type:'brewery', sake:'六十餘洲',     pref:'長崎県東彼杵郡' },
  /* ── 熊本 ── */
  { name:'瑞鷹',           lat:32.79, lng:130.74, type:'brewery', sake:'瑞鷹',         pref:'熊本県熊本市' },
  { name:'美少年酒造',     lat:32.97, lng:130.82, type:'brewery', sake:'美少年',       pref:'熊本県菊池郡' },
  { name:'千代の園酒造',   lat:33.01, lng:130.69, type:'brewery', sake:'千代の園',     pref:'熊本県山鹿市' },
  /* ── 大分 ── */
  { name:'八鹿酒造',       lat:33.28, lng:131.16, type:'brewery', sake:'八鹿',         pref:'大分県玖珠郡' },
  { name:'萱島酒造',       lat:33.57, lng:131.74, type:'brewery', sake:'西の関',       pref:'大分県国東市' },
  { name:'老松酒造',       lat:33.32, lng:130.94, type:'brewery', sake:'老松',         pref:'大分県日田市' },
  /* ── 宮崎 ── */
  { name:'千徳酒造',       lat:32.58, lng:131.67, type:'brewery', sake:'千徳',         pref:'宮崎県延岡市' },
  /* ── 鹿児島 ── */
  { name:'西酒造',         lat:31.81, lng:130.30, type:'brewery', sake:'天賦',         pref:'鹿児島県薩摩川内市' },

  /* ══════════════ 酒屋（shop） ══════════════ */
  { name:'はせがわ酒店 東京駅店', lat:35.681, lng:139.769, type:'shop', sake:'全国銘柄多数', pref:'東京都千代田区' },
  { name:'酒のいまでや 恵比寿店', lat:35.647, lng:139.710, type:'shop', sake:'自然派・純米中心', pref:'東京都渋谷区' },
  { name:'鈴傳',            lat:35.694, lng:139.716, type:'shop', sake:'灘・伏見の正統派', pref:'東京都新宿区' },
  { name:'地酒屋こだま',    lat:35.762, lng:139.728, type:'shop', sake:'新潟・山形中心', pref:'東京都荒川区' },
  { name:'横浜 君嶋屋',     lat:35.445, lng:139.643, type:'shop', sake:'全国プレミアム銘柄', pref:'神奈川県横浜市' },
  { name:'さかや栗原',      lat:35.775, lng:139.916, type:'shop', sake:'埼玉・全国銘柄', pref:'埼玉県川口市' },
  { name:'リカーマウンテン 仙台店', lat:38.268, lng:140.872, type:'shop', sake:'東北銘柄中心', pref:'宮城県仙台市' },
  { name:'奈良地酒 吉田酒店', lat:34.685, lng:135.805, type:'shop', sake:'奈良・関西銘柄', pref:'奈良県奈良市' },
  { name:'升本総本店',      lat:35.685, lng:139.689, type:'shop', sake:'灘・伏見の老舗', pref:'東京都新宿区' },
  { name:'大阪 八尾市 地酒専門店', lat:34.628, lng:135.600, type:'shop', sake:'大阪・関西銘柄', pref:'大阪府八尾市' },
  { name:'博多 地酒専門 きらく', lat:33.590, lng:130.401, type:'shop', sake:'九州銘柄中心', pref:'福岡県福岡市' },
  { name:'京都 酒商 田端屋', lat:35.013, lng:135.754, type:'shop', sake:'京都・伏見銘柄', pref:'京都府京都市' },
  { name:'リカーズハセガワ 札幌', lat:43.063, lng:141.357, type:'shop', sake:'北海道・東北銘柄', pref:'北海道札幌市' },

  /* ══════════════ 飲食店（restaurant） ══════════════ */
  { name:'銀座 SAKE HALL 君嶋屋', lat:35.671, lng:139.764, type:'restaurant', sake:'全国銘柄150種以上', pref:'東京都中央区' },
  { name:'新宿 日本酒スタンド 斗', lat:35.693, lng:139.703, type:'restaurant', sake:'立ち飲み・全国銘柄', pref:'東京都新宿区' },
  { name:'渋谷 日本酒バー 庫裏',   lat:35.658, lng:139.702, type:'restaurant', sake:'季節限定多数',    pref:'東京都渋谷区' },
  { name:'神楽坂 粋な夜　和酒',    lat:35.701, lng:139.741, type:'restaurant', sake:'純米酒専門',     pref:'東京都新宿区' },
  { name:'上野 日本酒居酒屋 酒国', lat:35.712, lng:139.774, type:'restaurant', sake:'全国地酒100種', pref:'東京都台東区' },
  { name:'大阪 心斎橋 酒肴 SAKANA', lat:34.673, lng:135.501, type:'restaurant', sake:'関西銘柄中心', pref:'大阪府大阪市' },
  { name:'京都 祇園 日本酒バー 澤',  lat:35.003, lng:135.777, type:'restaurant', sake:'京都・奈良銘柄', pref:'京都府京都市' },
  { name:'名古屋 栄 純米酒専門居酒屋', lat:35.170, lng:136.905, type:'restaurant', sake:'東海銘柄中心', pref:'愛知県名古屋市' },
  { name:'博多 中洲 日本酒 蔵人',   lat:33.591, lng:130.407, type:'restaurant', sake:'九州地酒多数', pref:'福岡県福岡市' },
  { name:'仙台 国分町 日本酒バー 酔心', lat:38.265, lng:140.877, type:'restaurant', sake:'東北地酒中心', pref:'宮城県仙台市' },
  { name:'札幌 ススキノ 地酒 北の宴', lat:43.057, lng:141.353, type:'restaurant', sake:'北海道・東北銘柄', pref:'北海道札幌市' },
];

/* グローバル: マーカー管理 */
let mapMarkers = { brewery: [], shop: [], restaurant: [] };
let mapTypeVis = { brewery: true, shop: true, restaurant: true };

const TYPE_META = {
  brewery:    { color:'#c9a84c', label:'🏯 酒蔵',  pulse: true },
  shop:       { color:'#6ab4ff', label:'🏪 酒屋',   pulse: false },
  restaurant: { color:'#ff8fa0', label:'🍽 飲食店', pulse: false },
};

async function initMap() {
  const container = document.getElementById('mapContainer');
  if (!container || typeof L === 'undefined') return;

  const map = L.map('mapContainer', { center: [36.5, 137.2], zoom: 5, zoomControl: true });
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd', maxZoom: 19,
  }).addTo(map);
  window._sakeFindMap = map;

  // Supabaseから取得、失敗時はハードコードデータにフォールバック
  let locations = MAP_LOCATIONS;
  if (sb) {
    try {
      const { data, error } = await sb.from('locations').select('name,lat,lng,type,sake,pref');
      if (!error && data && data.length > 0) {
        locations = data;
      }
    } catch(e) {
      console.warn('locations fetch failed, using local data', e);
    }
  }

  renderMapMarkers(map, locations);
}

function renderMapMarkers(map, locations) {
  const panel = document.getElementById('mapPanel');
  mapMarkers = { brewery: [], shop: [], restaurant: [] };

  locations.forEach(loc => {
    const meta  = TYPE_META[loc.type] || TYPE_META.brewery;
    const color = meta.color;
    const pulse = meta.pulse
      ? `<div style="position:absolute;width:26px;height:26px;border-radius:50%;background:${color};opacity:0.18;animation:mapPulse 2s ease-out infinite;top:-6px;left:-6px;"></div>`
      : '';
    const icon = L.divIcon({
      className: '',
      html: `<div style="position:relative;width:14px;height:14px;">
        ${pulse}
        <div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid rgba(0,0,0,0.45);box-shadow:0 0 8px ${color}aa;position:relative;z-index:1;"></div>
      </div>`,
      iconSize: [14, 14], iconAnchor: [7, 7],
    });

    const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(map);
    marker.on('click', () => {
      if (!panel) return;
      panel.innerHTML = `
        <div class="map-panel-header">
          <span class="map-panel-type" style="color:${color}">${meta.label}</span>
          <button class="map-panel-close" onclick="document.getElementById('mapPanel').classList.add('hidden')">✕</button>
        </div>
        <h3 class="map-panel-name">${loc.name}</h3>
        <p class="map-panel-pref">📍 ${loc.pref}</p>
        <div class="map-panel-sake">
          <span>${loc.type === 'brewery' ? '代表銘柄' : '取扱い'}</span>
          <strong>${loc.sake}</strong>
        </div>
        <a href="#catalog" class="btn btn-outline" style="width:100%;justify-content:center;font-size:0.82rem;margin-top:0.5rem">カタログで探す</a>
      `;
      panel.classList.remove('hidden');
    });

    if (mapMarkers[loc.type]) mapMarkers[loc.type].push(marker);
  });

  // カウントバッジ更新
  ['brewery','shop','restaurant'].forEach(t => {
    const el = document.getElementById('count' + t.charAt(0).toUpperCase() + t.slice(1));
    if (el) el.textContent = (mapMarkers[t] || []).length;
  });
}

function toggleMapType(type, btn) {
  mapTypeVis[type] = !mapTypeVis[type];
  btn.classList.toggle('active', mapTypeVis[type]);
  const map = window._sakeFindMap;
  if (!map) return;
  (mapMarkers[type] || []).forEach(m => {
    if (mapTypeVis[type]) m.addTo(map);
    else map.removeLayer(m);
  });
}

/* ============================================================
   Timeline v2 — Likes + Hashtags + Type color
   ============================================================ */
let timelineLikes = {};

function initTimeline() {
  const wrapper = document.getElementById('timelineWrapper');
  if (!wrapper) return;

  DEMO_TIMELINE.forEach((item, i) => {
    timelineLikes[i] = item.likes;
    const tc = TYPE_COLORS[item.type] || TYPE_COLORS['普通酒'];
    const el = document.createElement('div');
    el.className = 'timeline-item reveal';
    el.setAttribute('data-delay', (i * 100).toString());
    el.innerHTML = `
      <div class="timeline-avatar">${item.avatar}</div>
      <div class="timeline-body">
        <div class="timeline-header">
          <div>
            <span class="timeline-user">${item.user}</span>
            <span class="timeline-location">📍 ${item.location}</span>
          </div>
          <span class="timeline-time">${item.time}</span>
        </div>
        <div class="timeline-sake-row">
          <div class="timeline-sake-tag">🍶 ${item.sake}</div>
          <div class="timeline-type-chip" style="background:${tc.bg};border-color:${tc.border};color:${tc.text}">${item.type}</div>
        </div>
        <p class="timeline-text">${item.text}</p>
        <div class="timeline-hashtags">
          ${item.hashtags.map(h => `<a href="#catalog" class="hash-tag">#${h}</a>`).join('')}
        </div>
        <div class="timeline-footer">
          <div class="timeline-rating">${'★'.repeat(item.rating)}${'☆'.repeat(5 - item.rating)}</div>
          <button class="timeline-like" data-idx="${i}" onclick="toggleLike(this,${i})">
            <span class="like-heart">♡</span>
            <span class="like-count">${item.likes}</span>
          </button>
        </div>
      </div>
    `;
    wrapper.appendChild(el);
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  wrapper.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

function toggleLike(btn, idx) {
  const heart = btn.querySelector('.like-heart');
  const count = btn.querySelector('.like-count');
  if (btn.classList.contains('liked')) {
    btn.classList.remove('liked');
    heart.textContent = '♡';
    timelineLikes[idx]--;
  } else {
    btn.classList.add('liked');
    heart.textContent = '♥';
    timelineLikes[idx]++;
    heart.classList.add('heart-pop');
    setTimeout(() => heart.classList.remove('heart-pop'), 400);
  }
  count.textContent = timelineLikes[idx];
}

/* ============================================================
   Label Scan v2 — Multi-step progress
   ============================================================ */
const SCAN_STEPS = [
  '画像を検出中...', 'ラベルを解析中...', '銘柄データベースを照合中...',
];
const SCAN_DEMO_RESULTS = [
  { name:'純米大吟醸 山田錦', brewery:'旭酒造', prefecture:'山口県', type:'純米大吟醸', alc:'16%', price:'¥3,300', profile:'フルーティー・華やか', pairing:'刺身・白身魚', ec:'#', conf:97 },
  { name:'特別純米 越の雫', brewery:'朝日酒造', prefecture:'新潟県', type:'純米', alc:'15%', price:'¥1,980', profile:'淡麗・すっきり', pairing:'豆腐料理・蒸し鶏', ec:'#', conf:91 },
  { name:'本醸造 金紋', brewery:'菊正宗酒造', prefecture:'兵庫県', type:'本醸造', alc:'14%', price:'¥1,200', profile:'辛口・淡麗', pairing:'焼き魚・漬物', ec:'#', conf:88 },
];

function initLabelScan() {
  const fileInput  = document.getElementById('scanFileInput');
  const uploadArea = document.getElementById('scanUploadArea');
  if (!fileInput) return;

  fileInput.addEventListener('change', e => { if (e.target.files[0]) handleScanFile(e.target.files[0]); });

  uploadArea.addEventListener('dragover', e => { e.preventDefault(); uploadArea.classList.add('drag-over'); });
  uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('drag-over'));
  uploadArea.addEventListener('drop', e => {
    e.preventDefault(); uploadArea.classList.remove('drag-over');
    if (e.dataTransfer.files[0]?.type.startsWith('image/')) handleScanFile(e.dataTransfer.files[0]);
  });
}

function handleScanFile(file) {
  const placeholder    = document.getElementById('scanPlaceholder');
  const preview        = document.getElementById('scanPreview');
  const previewImg     = document.getElementById('scanPreviewImg');
  const resultSection  = document.getElementById('scanResult');
  const stepsContainer = document.getElementById('scanSteps');

  const reader = new FileReader();
  reader.onload = ev => {
    previewImg.src = ev.target.result;
    placeholder.classList.add('hidden');
    preview.classList.remove('hidden');
    resultSection.classList.add('hidden');

    // Step-by-step progress
    if (stepsContainer) {
      stepsContainer.classList.remove('hidden');
      stepsContainer.innerHTML = SCAN_STEPS.map((s, i) => `
        <div class="scan-step" id="scanStep${i}">
          <div class="scan-step-dot"></div>
          <span>${s}</span>
        </div>
      `).join('');

      let step = 0;
      const next = () => {
        if (step > 0) document.getElementById(`scanStep${step - 1}`)?.classList.add('done');
        if (step < SCAN_STEPS.length) {
          document.getElementById(`scanStep${step}`)?.classList.add('active');
          step++;
          setTimeout(next, 650);
        } else {
          setTimeout(showScanResult, 400);
        }
      };
      next();
    } else {
      setTimeout(showScanResult, 2000);
    }
  };
  reader.readAsDataURL(file);

  function showScanResult() {
    const r = SCAN_DEMO_RESULTS[Math.floor(Math.random() * SCAN_DEMO_RESULTS.length)];
    if (stepsContainer) stepsContainer.classList.add('hidden');
    document.getElementById('scanResultName').textContent   = r.name;
    document.getElementById('scanResultBrewery').textContent = `${r.brewery} / ${r.prefecture}`;
    document.getElementById('scanResultDetails').innerHTML  = `
      <div class="scan-detail-row"><span class="label">種別</span><span class="value">${r.type}</span></div>
      <div class="scan-detail-row"><span class="label">アルコール度数</span><span class="value">${r.alc}</span></div>
      <div class="scan-detail-row"><span class="label">参考価格</span><span class="value">${r.price}</span></div>
      <div class="scan-detail-row"><span class="label">味わい</span><span class="value">${r.profile}</span></div>
      <div class="scan-detail-row"><span class="label">合う料理</span><span class="value">${r.pairing}</span></div>
      <div class="scan-conf-row">
        <span class="label">認識精度</span>
        <div class="conf-bar-bg"><div class="conf-bar-fill" style="width:${r.conf}%"></div></div>
        <span class="conf-val">${r.conf}%</span>
      </div>
    `;
    document.getElementById('scanBuyBtn').href = r.ec;
    resultSection.classList.remove('hidden');
    setTimeout(() => {
      document.querySelector('.conf-bar-fill') && (document.querySelector('.conf-bar-fill').style.width = r.conf + '%');
    }, 50);
  }
}

/* ============================================================
   FAQ Accordion
   ============================================================ */
function initFAQ() {
  const container = document.getElementById('faqContainer');
  if (!container) return;

  container.innerHTML = FAQ_DATA.map((item, i) => `
    <div class="faq-item" id="faqItem${i}">
      <button class="faq-q" onclick="toggleFAQ(${i})">
        <span>${item.q}</span>
        <span class="faq-icon">＋</span>
      </button>
      <div class="faq-a" id="faqA${i}">
        <p>${item.a}</p>
      </div>
    </div>
  `).join('');
}

function toggleFAQ(i) {
  const item  = document.getElementById(`faqItem${i}`);
  const icon  = item.querySelector('.faq-icon');
  const open  = item.classList.contains('open');

  document.querySelectorAll('.faq-item.open').forEach(el => {
    el.classList.remove('open');
    el.querySelector('.faq-icon').textContent = '＋';
  });

  if (!open) {
    item.classList.add('open');
    icon.textContent = '－';
  }
}

/* ============================================================
   Testimonials (subscription section)
   ============================================================ */
const TESTIMONIALS = [
  { name:'Y. Tanaka', role:'日本酒愛好家・東京', text:'毎月届く瞬間が一番の楽しみになりました。知らなかった蔵元の銘柄に出会えて視野が広がった。', rating:5 },
  { name:'M. Sato', role:'ソムリエ・大阪', text:'プレミアムプランは品質が素晴らしい。大吟醸が毎月一本必ず入るのが嬉しい。ギフトにも最適。', rating:5 },
  { name:'K. Yamada', role:'グルメブロガー・京都', text:'テイスティングカードの説明が丁寧で、毎月勉強になります。ペアリングレシピも実践的で助かる。', rating:4 },
];

function initTestimonials() {
  const el = document.getElementById('testimonialGrid');
  if (!el) return;

  el.innerHTML = TESTIMONIALS.map((t, i) => `
    <div class="testimonial-card reveal" data-delay="${i * 150}">
      <div class="testimonial-stars">${'★'.repeat(t.rating)}${'☆'.repeat(5-t.rating)}</div>
      <p class="testimonial-text">「${t.text}」</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${t.name[0]}</div>
        <div>
          <div class="testimonial-name">${t.name}</div>
          <div class="testimonial-role">${t.role}</div>
        </div>
      </div>
    </div>
  `).join('');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  el.querySelectorAll('.reveal').forEach(el2 => obs.observe(el2));
}

/* ============================================================
   Brewery v2 — Founding year + Awards + Philosophy
   ============================================================ */
function initBrewery() {
  const grid = document.getElementById('breweryGrid');
  if (!grid) return;

  DEMO_BREWERIES.forEach((b, i) => {
    const card = document.createElement('div');
    card.className = 'brewery-card reveal';
    card.setAttribute('data-delay', (i * 100).toString());
    card.innerHTML = `
      <div class="brewery-card-top">
        <div class="brewery-emblem">${b.emblem}</div>
        <div class="brewery-info">
          <h3>${b.name}</h3>
          <p class="pref">📍 ${b.prefecture}</p>
          <p class="founded">創業 ${b.founded}</p>
        </div>
      </div>
      <div class="brewery-card-body">
        <p class="brewery-desc">${b.desc}</p>
        <blockquote class="brewery-philosophy">${b.philosophy}</blockquote>
        <div class="brewery-footer">
          <span class="brewery-specialty">代表：${b.specialty}</span>
          <div class="brewery-awards">
            ${b.awards.slice(0, 2).map(a => `<span class="award-chip">🏆 ${a}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  grid.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ============================================================
   Subscription Buttons
   ============================================================ */
document.addEventListener('click', e => {
  if (e.target.classList.contains('sub-btn')) {
    const orig = e.target.textContent;
    e.target.textContent = '✓ 近日公開予定！';
    e.target.disabled = true;
    setTimeout(() => { e.target.textContent = orig; e.target.disabled = false; }, 2500);
  }
});
