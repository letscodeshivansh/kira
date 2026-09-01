/* =========================================================
   For Kira — engine
   Nothing here needs editing. All words live in content.js
   ========================================================= */

const C = CONTENT;
document.title = C.her.tabTitle;

/* ---------- tiny helpers ---------- */
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};
const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const fmt = s => esc(s).replace(/\*(.+?)\*/g, "<em>$1</em>");   // *word* -> accent italic
const rand = (a,b) => a + Math.random()*(b-a);
const pick = a => a[(Math.random()*a.length)|0];
const hexa = (hex, a) => {
  const h = hex.replace("#","");
  const n = parseInt(h.length === 3 ? h.split("").map(c=>c+c).join("") : h, 16);
  return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`;
};

/* =========================================================
   Artwork
   ========================================================= */
let uid = 0;

/* The batakh. */
function duckSVG(cls = ""){
  return `
  <svg class="${cls}" viewBox="0 0 116 96" width="100%" height="100%" fill="none">
    <g class="duck-body">
      <!-- feet -->
      <g class="duck-foot">
        <rect x="37" y="70" width="3.4" height="13" rx="1.7" fill="#f08c2e"/>
        <path d="M30 83h18l-9 7z" fill="#ff9f1c"/>
      </g>
      <g class="duck-foot duck-foot--b">
        <rect x="56" y="70" width="3.4" height="13" rx="1.7" fill="#e07d24"/>
        <path d="M49 83h18l-9 7z" fill="#f08c2e"/>
      </g>
      <!-- tail -->
      <path d="M20 44 L4 34 L17 56 Z" fill="#f5c23a"/>
      <!-- body -->
      <ellipse cx="48" cy="52" rx="32" ry="24" fill="#ffd24c"/>
      <ellipse cx="48" cy="52" rx="32" ry="24" fill="url(#dg${uid})"/>
      <!-- wing -->
      <g transform="rotate(-9 46 54)">
        <ellipse cx="47" cy="55" rx="17" ry="12" fill="#f5b92e"/>
        <path d="M34 55q13 -8 27 -2" stroke="#e0a622" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      </g>
      <!-- head -->
      <circle cx="80" cy="26" r="17" fill="#ffd24c"/>
      <circle cx="80" cy="26" r="17" fill="url(#dg${uid})"/>
      <!-- beak -->
      <path d="M94 21 L114 27 L94 33 Z" fill="#ff9f1c"/>
      <path d="M94 27 L114 27" stroke="#e07d24" stroke-width="1.2"/>
      <!-- eye -->
      <circle cx="85" cy="21" r="3" fill="#2b2014"/>
      <circle cx="86.1" cy="20" r="1" fill="#fff"/>
    </g>
    <defs>
      <linearGradient id="dg${uid++}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".28"/>
        <stop offset="1" stop-color="#c98f14" stop-opacity=".22"/>
      </linearGradient>
    </defs>
  </svg>`;
}

/* A white rose. */
function roseSVG(cls = ""){
  const id = uid++;
  const outer = [0,60,120,180,240,300].map(a =>
    `<g transform="rotate(${a} 50 50)"><ellipse cx="50" cy="31" rx="19" ry="23" fill="url(#rp${id})" stroke="rgba(226,180,100,.22)" stroke-width=".8"/></g>`
  ).join("");
  const mid = [30,90,150,210,270,330].map(a =>
    `<g transform="rotate(${a} 50 50)"><ellipse cx="50" cy="39" rx="12.5" ry="15" fill="#fdfaf5" stroke="rgba(226,180,100,.20)" stroke-width=".7"/></g>`
  ).join("");
  return `
  <svg class="rose ${cls}" viewBox="0 0 100 100" fill="none">
    <defs>
      <radialGradient id="rp${id}" cx="50%" cy="72%" r="72%">
        <stop offset="0" stop-color="#efe4d8"/>
        <stop offset="1" stop-color="#ffffff"/>
      </radialGradient>
    </defs>
    ${outer}${mid}
    <circle cx="50" cy="50" r="10" fill="#f7eee2"/>
    <path d="M50 42a8 8 0 1 1-7.6 10.4" stroke="rgba(200,160,110,.5)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M50 46a4.5 4.5 0 1 1-4.2 6" stroke="rgba(200,160,110,.4)" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  </svg>`;
}

/* =========================================================
   Ambient layers
   ========================================================= */

/* stars */
(function stars(){
  const cv = document.getElementById("stars"), ctx = cv.getContext("2d");
  let w, h, pts = [];
  function size(){
    w = cv.width = innerWidth * devicePixelRatio;
    h = cv.height = innerHeight * devicePixelRatio;
    cv.style.width = innerWidth+"px"; cv.style.height = innerHeight+"px";
    const n = Math.min(90, Math.round(innerWidth*innerHeight/16000));
    pts = Array.from({length:n}, () => ({
      x: Math.random()*w, y: Math.random()*h,
      r: rand(.4,1.5)*devicePixelRatio, a: rand(.15,.6),
      s: rand(.004,.014), t: Math.random()*Math.PI*2
    }));
  }
  function frame(){
    ctx.clearRect(0,0,w,h);
    for (const p of pts){
      p.t += p.s;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,7);
      ctx.fillStyle = `rgba(255,244,220,${p.a*(0.55+0.45*Math.sin(p.t))})`; ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  addEventListener("resize", size); size(); frame();
})();

/* white rose petals, drifting down */
const petals = (() => {
  const cv = document.getElementById("petals"), ctx = cv.getContext("2d");
  let w, h, ps = [], level = 1, tint = ["#fffaf4"];
  function size(){
    w = cv.width = innerWidth*devicePixelRatio; h = cv.height = innerHeight*devicePixelRatio;
    cv.style.width = innerWidth+"px"; cv.style.height = innerHeight+"px";
  }
  function spawn(fromTop = true){
    const d = devicePixelRatio;
    ps.push({
      x: Math.random()*w, y: fromTop ? -20*d : Math.random()*h,
      r: rand(2.5,6)*d, vy: rand(.2,.6)*d, vx: rand(-.25,.25)*d,
      rot: Math.random()*6, vr: rand(-.012,.012),
      sq: rand(.3,.7), a: rand(.10,.30), fade: 1,
      // most petals stay white; every third one picks up the chapter colour
      c: Math.random() < .34 ? pick(tint) : "#fffaf4"
    });
  }
  function frame(){
    ctx.clearRect(0,0,w,h);
    const target = Math.round(level * Math.min(14, innerWidth/40));
    if (ps.length < target && Math.random() < .2) spawn();
    // fade out the surplus instead of leaving a snowstorm behind
    let surplus = ps.length - target;
    for (const p of ps) if (surplus-- > 0) p.fade = Math.max(0, p.fade - .012);
    ps = ps.filter(p => p.y < h + 40*devicePixelRatio && p.fade > 0);
    for (const p of ps){
      p.y += p.vy; p.x += p.vx + Math.sin(p.y*.004)*.3*devicePixelRatio; p.rot += p.vr;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot);
      ctx.globalAlpha = p.a * p.fade;
      ctx.beginPath(); ctx.ellipse(0,0,p.r,p.r*p.sq,0,0,7);
      ctx.fillStyle = p.c; ctx.fill();
      ctx.restore();
    }
    requestAnimationFrame(frame);
  }
  addEventListener("resize", size); size();
  for (let i=0;i<6;i++) spawn(false);
  frame();
  return {
    set(l, colors){ level = l; if (colors) tint = colors; },
    shower(n = 26){ for (let i=0;i<n;i++) spawn(); }
  };
})();

/* confetti — colours follow the chapter, and a third of the pieces are hearts */
let CONFETTI_COLORS = ["#e2b464","#ff9db0","#fff8f0","#b39cff","#6bb8ff","#59e0bd","#ffcf4d"];
const confetti = (() => {
  const cv = document.getElementById("confetti"), ctx = cv.getContext("2d");
  let parts = [], running = false;
  function heart(ctx, s){
    ctx.beginPath();
    ctx.moveTo(0, s*.32);
    ctx.bezierCurveTo(0,-s*.1, -s*.62,-s*.12, -s*.5, s*.18);
    ctx.bezierCurveTo(-s*.42, s*.5, 0, s*.62, 0, s);
    ctx.bezierCurveTo(0, s*.62, s*.42, s*.5, s*.5, s*.18);
    ctx.bezierCurveTo(s*.62,-s*.12, 0,-s*.1, 0, s*.32);
    ctx.fill();
  }
  function size(){
    cv.width = innerWidth*devicePixelRatio; cv.height = innerHeight*devicePixelRatio;
    cv.style.width = innerWidth+"px"; cv.style.height = innerHeight+"px";
  }
  addEventListener("resize", size); size();
  function loop(){
    ctx.clearRect(0,0,cv.width,cv.height);
    parts = parts.filter(p => p.life > 0);
    for (const p of parts){
      p.life--; p.vy += 0.12*devicePixelRatio; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot);
      ctx.globalAlpha = Math.min(1, p.life/40);
      ctx.fillStyle = p.c;
      if (p.shape === 1){ heart(ctx, p.w*.9); }
      else if (p.shape === 2){ ctx.beginPath(); ctx.arc(0,0,p.w*.5,0,7); ctx.fill(); }
      else ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
      ctx.restore();
    }
    if (parts.length) requestAnimationFrame(loop);
    else { running = false; ctx.clearRect(0,0,cv.width,cv.height); }
  }
  return function burst(n = 90, originY = 0.45){
    const d = devicePixelRatio;
    for (let i=0;i<n;i++) parts.push({
      x: cv.width*rand(.3,.7), y: cv.height*originY,
      vx: rand(-6,6)*d, vy: rand(-14,-4)*d,
      w: rand(4,9)*d, h: rand(6,13)*d,
      rot: Math.random()*6, vr: rand(-.2,.2),
      c: CONFETTI_COLORS[(Math.random()*CONFETTI_COLORS.length)|0],
      shape: (Math.random()*3)|0, life: rand(90,170)
    });
    if (!running){ running = true; requestAnimationFrame(loop); }
  };
})();

/* background glow, crossfaded per chapter */
const glow = (() => {
  const a = document.getElementById("glowA"), b = document.getElementById("glowB");
  let front = a, back = b, current = "";
  function css(g){
    const [top, bottom, third = bottom] = g;
    return `radial-gradient(120% 85% at 50% -12%, ${top} 0%, transparent 62%),
            radial-gradient(95% 70% at 85% 112%, ${bottom} 0%, transparent 66%),
            radial-gradient(75% 60% at 8% 78%, ${third} 0%, transparent 70%)`;
  }
  return function set(g){
    const next = css(g);
    if (next === current) return;
    current = next;
    back.style.backgroundImage = next;
    back.classList.add("on"); front.classList.remove("on");
    [front, back] = [back, front];
  };
})();

/* the batakh, waddling past every so often */
const roamer = (() => {
  const node = document.getElementById("roamer");
  node.innerHTML = duckSVG();
  let busy = false;

  node.addEventListener("click", e => {
    e.stopPropagation();
    quack(node.getBoundingClientRect());
  });

  function walk(){
    if (busy || document.hidden) return schedule();
    busy = true;
    const rtl = Math.random() < .35;
    const dur = rand(9000, 14000);
    const w = innerWidth + 200;
    node.classList.add("walking");
    node.style.transition = "none";
    node.style.transform = `translateX(${rtl ? w : 0}px)${rtl ? " scaleX(-1)" : ""}`;
    node.getBoundingClientRect();                        // reflow
    node.style.transition = `transform ${dur}ms linear`;
    node.style.transform = `translateX(${rtl ? 0 : w}px)${rtl ? " scaleX(-1)" : ""}`;
    setTimeout(() => { node.classList.remove("walking"); busy = false; schedule(); }, dur + 200);
  }
  function schedule(){ setTimeout(walk, rand(14000, 30000)); }
  setTimeout(walk, 9000);
  return { walk };
})();

/* speech bubble */
function quack(rect, text){
  const b = el("div","quack", esc(text || pick(C.duck.quacks)));
  document.body.appendChild(b);
  b.style.left = Math.min(innerWidth - 200, Math.max(10, rect.left + rect.width*0.55)) + "px";
  b.style.top  = Math.max(10, rect.top - 44) + "px";
  setTimeout(() => b.remove(), 2500);
}

/* every card in a list gets its own colour, cycled from this ribbon */
const RIBBON = ["#ff9db0","#ffcf4d","#7ff0c4","#6bb8ff","#c58cf0","#ff8f6b","#63e6ff","#ffd166"];

/* =========================================================
   CHAPTERS
   { el, accent, glow:[top,bottom], onEnter?, onAdvance? }
   onAdvance() -> true means "I handled it, don't turn the page yet"
   ========================================================= */
const chapters = [];
const add = o => chapters.push(o);

/* ---- Ch.0  Cover ---- */
add((() => {
  const c = C.cover;
  const page = el("section","page cover");
  page.innerHTML = `
    <div class="page__inner stagger">
      ${roseSVG("rose--corner rose--tl")}
      ${roseSVG("rose--corner rose--br")}
      <p class="kicker">${esc(c.kicker)}</p>
      <h1>${esc(c.title)}</h1>
      <div class="rule"></div>
      <p class="subtitle">${fmt(c.subtitle)}</p>
      <div><button class="btn btn--solid" data-open>${esc(c.button)}</button></div>
    </div>
    <div class="hint">${esc(c.hint)}</div>`;
  page.querySelector("[data-open]").addEventListener("click", e => { e.stopPropagation(); book.next(); });
  return { el: page, name:"Cover", accent:"#ffd479", accent2:"#ff8fc7", glow:["#4b2360","#1a2a55","#3d1740"], petals:.8 };
})());

/* ---- Ch.1  Happy Birthday ---- */
add((() => {
  const b = C.birthday;
  const page = el("section","page");
  page.innerHTML = `
    <div class="page__inner stagger" style="text-align:center">
      <p class="chapter-label">${esc(b.chapter)}</p>
      <h2>${esc(b.heading)}</h2>
      <div class="cake-wrap">
        <svg class="cake" width="180" height="150" viewBox="0 0 180 150" fill="none">
          ${[54,90,126].map((x,i)=>`
            <g>
              <ellipse class="smoke" cx="${x}" cy="34" rx="3" ry="7" fill="rgba(246,239,230,.22)"/>
              <g class="flame" style="animation-delay:${i*.18}s">
                <ellipse cx="${x}" cy="38" rx="5" ry="9" fill="#ffcf4d"/>
                <ellipse cx="${x}" cy="40" rx="2.4" ry="5" fill="#fff6d8"/>
              </g>
              <rect x="${x-3}" y="48" width="6" height="26" rx="2" fill="#fdf3f6"/>
              <rect x="${x-3}" y="48" width="6" height="26" rx="2" fill="url(#stripe)"/>
            </g>`).join("")}
          <defs>
            <pattern id="stripe" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
              <rect width="3" height="6" fill="#ff9db0" opacity=".85"/>
            </pattern>
          </defs>
          <rect x="30" y="74" width="120" height="26" rx="7" fill="#fdf6ee"/>
          <rect x="22" y="98" width="136" height="34" rx="9" fill="#f0e1d3"/>
          <rect x="22" y="98" width="136" height="8" rx="4" fill="#ff9db0" opacity=".6"/>
          <rect x="14" y="130" width="152" height="7" rx="3.5" fill="rgba(246,239,230,.25)"/>
        </svg>
        <p class="sub" data-blow style="margin-top:1rem">${esc(b.blowPrompt)}</p>
      </div>
      <div data-lines></div>
    </div>`;

  const cake = page.querySelector(".cake");
  const lines = page.querySelector("[data-lines]");
  const prompt = page.querySelector("[data-blow]");
  b.lines.forEach(t => lines.appendChild(el("p", null, fmt(t))));

  let blown = false;
  cake.addEventListener("click", e => {
    e.stopPropagation();
    if (blown) return;
    blown = true;
    cake.classList.add("out");
    prompt.style.opacity = 0;
    confetti(120,.5); petals.shower(14);
    lines.innerHTML = "";
    b.afterBlow.forEach((t,i) => {
      const p = el("p", i === 0 ? "lead" : null, fmt(t));
      p.style.animation = `rise .8s cubic-bezier(.22,.8,.25,1) ${.25+i*.35}s both`;
      lines.appendChild(p);
    });
  });
  return { el: page, name:"Happy Birthday", accent:"#ff9db0", accent2:"#ffd166", glow:["#5c1a44","#331352","#7a2340"], petals:1 };
})());

/* ---- Ch.2  Your beauty ---- */
add((() => {
  const b = C.beauty;
  const page = el("section","page");
  page.innerHTML = `
    <div class="page__inner">
      <p class="chapter-label">${esc(b.chapter)}</p>
      <h2>${esc(b.heading)}</h2>
      <div class="poem" data-poem></div>
      <div class="rose-row">${roseSVG()}${roseSVG()}${roseSVG()}</div>
    </div>
    <div class="hint" data-hint>${esc(b.tapHint)}</div>`;

  const box = page.querySelector("[data-poem]");
  const hint = page.querySelector("[data-hint]");
  const nodes = b.lines.map(t => { const p = el("p","poem__line", fmt(t)); box.appendChild(p); return p; });
  let i = -1;

  function reveal(){
    if (i >= 0) nodes[i].classList.add("dim");
    i++;
    nodes[i].classList.add("in");
    nodes[i].scrollIntoView({ behavior:"smooth", block:"center" });
    petals.shower(4);
    if (i === nodes.length - 1) hint.textContent = "turn the page";
  }
  return {
    el: page, name:"Your Beauty", accent:"#f7c9dc", accent2:"#a8c6ff", glow:["#4a2748","#1e2c52","#3a2050"], petals:1.6,
    onEnter(){ if (i < 0) setTimeout(reveal, 700); },
    onAdvance(){ if (i < nodes.length - 1){ reveal(); return true; } return false; }
  };
})());

/* ---- Ch.3  Small crimes ---- */
add((() => {
  const c = C.crimes;
  const page = el("section","page");
  page.innerHTML = `
    <div class="page__inner">
      <p class="chapter-label">${esc(c.chapter)}</p>
      <h2>${esc(c.heading)}</h2>
      <p class="sub">${esc(c.subheading)}</p>
      <div class="crimes" data-list></div>
      <p class="verdict" data-verdict>${esc(c.verdict)}</p>
    </div>`;
  const list = page.querySelector("[data-list]");
  const verdict = page.querySelector("[data-verdict]");
  let flipped = 0;

  c.items.forEach((it, n) => {
    const card = el("div","crime");
    card.style.setProperty("--tint", RIBBON[n % RIBBON.length]);
    card.innerHTML = `
      <div class="crime__inner">
        <div class="crime__face crime__face--front" data-n="${String(n+1).padStart(2,"0")}">${fmt(it.front)}</div>
        <div class="crime__face crime__face--back"><span>${fmt(it.back)}</span></div>
      </div>`;
    card.addEventListener("click", e => {
      e.stopPropagation();
      if (card.classList.contains("flipped")) return;
      card.classList.add("flipped");
      if (++flipped === c.items.length) setTimeout(() => verdict.classList.add("in"), 500);
    });
    list.appendChild(card);
  });

  // Faces are absolutely positioned, so the card can't size itself.
  function fit(){
    list.querySelectorAll(".crime").forEach(card => {
      const [f, bk] = card.querySelectorAll(".crime__face");
      card.style.minHeight = "";
      const h = Math.max(f.scrollHeight, bk.scrollHeight, 92);
      card.style.minHeight = h + "px";
      card.querySelector(".crime__inner").style.minHeight = h + "px";
    });
  }
  addEventListener("resize", fit);
  return { el: page, name:"Your Crimes", accent:"#c58cf0", accent2:"#63e6ff", glow:["#3d1a58","#141c46","#20174d"], petals:.5,
           onEnter(){ requestAnimationFrame(fit); } };
})());

/* ---- Ch.4  The batakh ---- */
add((() => {
  const d = C.batakh;
  const page = el("section","page");
  page.innerHTML = `
    <div class="page__inner">
      <p class="chapter-label">${esc(d.chapter)}</p>
      <h2>${esc(d.heading)}</h2>
      <p class="sub">${esc(d.intro)}</p>
      <div class="duckfield" data-field>
        <div class="catchme" data-duck>${duckSVG()}</div>
        <div class="caught-msg" data-caught>${fmt(d.caught)}</div>
      </div>
      <p class="sub" style="text-align:center" data-prompt>${esc(d.catchPrompt)}</p>
      <div class="reasons" data-reasons>
        ${d.reasons.map(r => `<p>${fmt(r)}</p>`).join("")}
      </div>
    </div>`;

  const field = page.querySelector("[data-field]");
  const duck  = page.querySelector("[data-duck]");
  const msg   = page.querySelector("[data-caught]");
  const prompt= page.querySelector("[data-prompt]");
  const reasons = [...page.querySelectorAll(".reasons p")];
  let t = -1, caught = false, lastTouch = 0;

  function flee(e){
    if (caught) return;
    // a phone fires touchstart AND click — only count one
    if (e.type === "click" && Date.now() - lastTouch < 700) return;
    if (e.type === "touchstart") lastTouch = Date.now();
    e.preventDefault(); e.stopPropagation();
    t++;
    if (t >= d.taunts.length){ capture(); return; }
    quack(duck.getBoundingClientRect(), d.taunts[t]);
    const fw = field.clientWidth, fh = field.clientHeight;
    duck.style.left = rand(12, Math.max(14, fw - 98)) + "px";
    duck.style.top  = rand(12, Math.max(14, fh - 90)) + "px";
    duck.style.transform = "none";
    duck.querySelector("svg").style.transform = Math.random() < .5 ? "scaleX(-1)" : "none";
  }
  function capture(){
    caught = true;
    duck.style.transition = "opacity .5s, transform .5s";
    duck.style.opacity = "0"; duck.style.transform = "scale(.6)";
    duck.style.pointerEvents = "none";
    prompt.style.opacity = "0";
    msg.classList.add("in");
    confetti(70,.45);
    reasons.forEach((p,i) => setTimeout(() => p.classList.add("in"), 700 + i*550));
  }
  duck.addEventListener("mouseenter", flee);
  duck.addEventListener("touchstart", flee, { passive:false });
  duck.addEventListener("click", flee);
  field.addEventListener("click", e => e.stopPropagation());

  return { el: page, name:"The Batakh", accent:"#ffcf4d", accent2:"#7ff0c4", glow:["#5a3a10","#0f3c48","#4a2c1a"], petals:.4 };
})());

/* ---- Ch.5  Do you love me? ---- */
add((() => {
  const g = C.game1;
  const page = el("section","page");
  page.innerHTML = `
    <div class="page__inner game">
      <p class="chapter-label">${esc(g.chapter)}</p>
      <h2>${esc(g.heading)}</h2>
      <p class="game__q">${esc(g.question)}</p>
      <div class="game__field" data-field>
        <button class="btn btn--solid" id="btnYes">${esc(g.yes)}</button>
        <button class="btn" id="btnNo">${esc(g.no)}</button>
      </div>
      <p class="game__win" data-win>${fmt(g.win)}</p>
    </div>`;

  const field = page.querySelector("[data-field]");
  const no = page.querySelector("#btnNo"), yes = page.querySelector("#btnYes");
  const win = page.querySelector("[data-win]");
  let t = 0, done = false, lastTouch = 0;

  function flee(e){
    if (done) return;
    if (e && e.type === "click" && Date.now() - lastTouch < 700) return;
    if (e && e.type === "touchstart") lastTouch = Date.now();
    if (e) e.preventDefault();
    t = Math.min(t + 1, g.taunts.length - 1);
    no.textContent = g.taunts[t];
    const fw = field.clientWidth, fh = field.clientHeight;
    no.style.left = rand(0, Math.max(0, fw - no.offsetWidth)) + "px";
    no.style.top  = rand(0, Math.max(0, fh - no.offsetHeight)) + "px";
    no.style.transform = "none";
    if (t >= g.taunts.length - 1){ no.style.opacity = ".25"; no.style.pointerEvents = "none"; }
  }
  no.addEventListener("mouseenter", flee);
  no.addEventListener("touchstart", flee, { passive:false });
  no.addEventListener("click", flee);

  yes.addEventListener("click", e => {
    e.stopPropagation();
    if (done) return; done = true;
    no.style.opacity = "0"; no.style.pointerEvents = "none";
    yes.style.transform = "translateX(-50%) scale(1.06)";
    win.classList.add("in");
    confetti(80,.5); petals.shower(10);
  });
  return { el: page, name:"Do You Love Me", accent:"#ff7a8a", accent2:"#ffb36b", glow:["#5c1626","#331542","#6a2130"], petals:1 };
})());

/* ---- Ch.6  Memory lane ---- */
add((() => {
  const m = C.memories;
  const page = el("section","page");
  page.innerHTML = `
    <div class="page__inner">
      <p class="chapter-label">${esc(m.chapter)}</p>
      <h2>${esc(m.heading)}</h2>
      <p class="sub">${esc(m.subheading)}</p>
    </div>
    <div class="rail" data-rail></div>`;
  const rail = page.querySelector("[data-rail]");

  m.items.forEach((it, n) => {
    const card = el("div","polaroid");
    card.innerHTML = `
      <div class="polaroid__img"><span>photo</span></div>
      <div class="polaroid__cap">
        <span class="polaroid__date">${esc(it.date)}</span>
        ${esc(it.caption)}
      </div>`;
    card.style.setProperty("--tint", RIBBON[n % RIBBON.length]);
    if (it.src){
      const img = new Image();
      img.alt = it.caption;
      img.onload = () => {
        const w = card.querySelector(".polaroid__img");
        w.innerHTML = ""; w.appendChild(img);
        card.classList.add("has-photo");
      };
      img.src = it.src;                     // missing file -> caption-only card
    }
    // tapping a card that actually has a photo opens the viewer
    card.addEventListener("click", e => {
      e.stopPropagation();
      if (card.classList.contains("has-photo")) openLightbox(n);
    });
    rail.appendChild(card);
  });
  rail.addEventListener("click", e => e.stopPropagation());
  return { el: page, name:"Memory Lane", accent:"#f0a868", accent2:"#7fd7e8", glow:["#52290f","#16304a","#3c1f2e"], petals:.6 };
})());

/* ---- Ch.7  The prescription ---- */
add((() => {
  const d = C.doctor;
  const page = el("section","page");
  const beat = "M0 26 H30 l6 -14 6 28 5 -14 H88 l7 -20 6 40 6 -20 H160 l6 -10 5 20 5 -10 H320";
  page.innerHTML = `
    <div class="page__inner">
      <p class="chapter-label">${esc(d.chapter)}</p>
      <h2>${esc(d.heading)}</h2>
      <svg class="ecg" viewBox="0 0 320 52" preserveAspectRatio="none"><path d="${beat}"/></svg>
      <div class="pad" data-pad>
        <p class="pad__clinic">${esc(d.clinic)}</p>
        <p class="pad__patient">${esc(d.patient)}</p>
        ${d.disease ? `<p class="pad__disease">${esc(d.disease)}</p>` : ""}
        <p class="pad__diag">${esc(d.diagnosis)}</p>
        <div class="pad__rule"></div>
        <div class="pad__rx">
          <div class="pad__symbol">℞</div>
          <ul class="rxlist" data-rx>
            ${d.rx.map(r => `<li><span class="dose">${esc(r.dose)}</span><span>${fmt(r.text)}</span></li>`).join("")}
          </ul>
        </div>
        <p class="pad__sign">${esc(d.signOff)}</p>
        <p class="pad__hint" data-hint>${esc(d.revealPrompt)}</p>
      </div>
      <p class="doc-note" data-note>${fmt(d.note)}</p>
    </div>`;

  const items = [...page.querySelectorAll(".rxlist li")];
  const note = page.querySelector("[data-note]");
  const hint = page.querySelector("[data-hint]");
  const pad = page.querySelector("[data-pad]");
  let i = 0;

  function reveal(){
    if (i >= items.length) return false;
    items[i].classList.add("in"); i++;
    if (i === items.length){ hint.style.opacity = "0"; setTimeout(() => note.classList.add("in"), 600); }
    return true;
  }
  pad.addEventListener("click", e => { e.stopPropagation(); reveal(); });

  return {
    el: page, name:"The Prescription", accent:"#59e0bd", accent2:"#7fb8ff", glow:["#0f463f","#152f52","#123b52"], petals:.4,
    onEnter(){ if (i === 0) setTimeout(reveal, 900); },
    onAdvance(){ return reveal(); }
  };
})());

/* ---- Ch.8  The gym ---- */
add((() => {
  const g = C.gym;
  const page = el("section","page");
  page.innerHTML = `
    <div class="page__inner" style="text-align:center">
      <p class="chapter-label">${esc(g.chapter)}</p>
      <h2>${esc(g.heading)}</h2>
      <p class="sub">${esc(g.subheading)}</p>
      <div class="lift">
        <svg class="dumbbell" data-bell width="200" height="88" viewBox="0 0 200 88" fill="none">
          <rect x="66" y="38" width="68" height="12" rx="6" fill="#c9d3e0"/>
          <rect x="66" y="38" width="68" height="12" rx="6" fill="url(#bar)"/>
          <rect x="40" y="22" width="18" height="44" rx="6" fill="#8fa6c4"/>
          <rect x="18" y="14" width="20" height="60" rx="7" fill="#b9c9de"/>
          <rect x="142" y="22" width="18" height="44" rx="6" fill="#8fa6c4"/>
          <rect x="162" y="14" width="20" height="60" rx="7" fill="#b9c9de"/>
          <defs><linearGradient id="bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#fff" stop-opacity=".5"/>
            <stop offset="1" stop-color="#5c7796" stop-opacity="0"/>
          </linearGradient></defs>
        </svg>
        <div class="counter"><span data-count>0</span><small>${esc(g.counterLabel)}</small></div>
        <div class="bar"><span data-bar></span></div>
      </div>
      <p class="repline" data-line></p>
    </div>`;

  const bell = page.querySelector("[data-bell]");
  const count = page.querySelector("[data-count]");
  const line = page.querySelector("[data-line]");
  const bar = page.querySelector("[data-bar]");
  let n = 0;

  function rep(){
    if (n >= g.reps.length) return false;
    line.classList.remove("in");
    bell.classList.remove("rep"); void bell.offsetWidth; bell.classList.add("rep");
    n++;
    count.textContent = n;
    bar.style.width = (n / g.reps.length * 100) + "%";
    setTimeout(() => { line.innerHTML = fmt(n === g.reps.length ? g.done : g.reps[n-1]); line.classList.add("in"); }, 180);
    if (n === g.reps.length) setTimeout(() => confetti(60,.5), 500);
    return true;
  }
  bell.addEventListener("click", e => { e.stopPropagation(); rep(); });

  return {
    el: page, name:"The Gym", accent:"#6bb8ff", accent2:"#b39cff", glow:["#14305c","#301a52","#123a5e"], petals:.3,
    onAdvance(){ return rep(); }
  };
})());

/* ---- Ch.9  What you are ---- */
add((() => {
  const s = C.inspire;
  const page = el("section","page");
  page.innerHTML = `
    <div class="page__inner stagger">
      <p class="chapter-label">${esc(s.chapter)}</p>
      <h2>${esc(s.heading)}</h2>
      <p class="lead">${fmt(s.intro)}</p>
      <div class="points">
        ${s.points.map((p, n) => `<div class="point" style="--tint:${RIBBON[n % RIBBON.length]}"><h3>${fmt(p.title)}</h3><p>${fmt(p.body)}</p></div>`).join("")}
      </div>
      <p class="outro">${fmt(s.outro)}</p>
    </div>`;
  return { el: page, name:"What You Are", accent:"#ffc978", accent2:"#ff9db0", glow:["#4a3116","#1a2742","#42203a"], petals:.5 };
})());

/* ---- Ch.10  Scold me ---- */
add((() => {
  const s = C.scold;
  const page = el("section","page");
  page.innerHTML = `
    <div class="page__inner">
      <p class="chapter-label">${esc(s.chapter)}</p>
      <h2>${esc(s.heading)}</h2>
      <p class="sub" style="margin-bottom:1.2rem">${esc(s.subheading)}</p>
      <textarea class="scold__box" data-box placeholder="${esc(s.placeholder)}" maxlength="600"></textarea>
      <div class="scold__row">
        <span class="scold__count" data-count>0 / 600</span>
        <button class="btn btn--ghost" data-clear hidden>clear</button>
        <button class="btn btn--solid" data-send>${esc(s.send)}</button>
      </div>
      <div class="scold__log" data-log></div>
      <p class="scold__final" data-final>${fmt(s.final)}</p>
    </div>`;

  const box = page.querySelector("[data-box]");
  const log = page.querySelector("[data-log]");
  const fin = page.querySelector("[data-final]");
  const counter = page.querySelector("[data-count]");
  const clearBtn = page.querySelector("[data-clear]");
  let n = 0;

  /* everything she has already said, so a refresh doesn't wipe it */
  let history = load("kira.scold", []);

  function draw(text, reply, animate){
    const pair = el("div","scold__pair");
    if (!animate) pair.style.animation = "none";
    pair.innerHTML = `<div class="scold__hers">${esc(text)}</div>
                      <div class="scold__mine">${fmt(reply)}</div>`;
    log.appendChild(pair);
    clearBtn.hidden = false;
    return pair;
  }
  history.forEach((h, i) => { draw(h.text, s.replies[i % s.replies.length], false); n++; });
  if (n) fin.classList.add("in");

  function count(){
    counter.textContent = `${box.value.length} / 600`;
    counter.classList.toggle("full", box.value.length > 540);
  }
  box.addEventListener("input", count); count();

  function send(){
    const text = box.value.trim();
    if (!text){ box.focus(); return; }
    box.value = ""; count();
    const pair = draw(text, s.replies[n % s.replies.length], true);
    n++;
    history.push({ text, at: new Date().toISOString() });
    save("kira.scold", history);
    if (n === 1) setTimeout(() => fin.classList.add("in"), 900);
    pair.scrollIntoView({ behavior:"smooth", block:"nearest" });
    confetti(18, .62);
    if (s.endpoint){
      fetch(s.endpoint, {
        method:"POST",
        headers:{ "Content-Type":"application/json", "Accept":"application/json" },
        body: JSON.stringify({ from: C.her.name, scolding: text, at: new Date().toLocaleString() })
      }).catch(()=>{});
    }
  }
  page.querySelector("[data-send]").addEventListener("click", e => { e.stopPropagation(); send(); });
  // ctrl/cmd + enter sends, so she never has to reach for the button
  box.addEventListener("keydown", e => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)){ e.preventDefault(); send(); }
  });
  clearBtn.addEventListener("click", e => {
    e.stopPropagation();
    history = []; save("kira.scold", history);
    log.innerHTML = ""; n = 0;
    fin.classList.remove("in"); clearBtn.hidden = true;
  });
  return { el: page, name:"Scold Me", accent:"#ff8f6b", accent2:"#ffd166", glow:["#57230f","#241a44","#4e2a12"], petals:.4 };
})());

/* ---- Ch.11  Quiz ---- */
add((() => {
  const q = C.quiz;
  const page = el("section","page");
  page.innerHTML = `
    <div class="page__inner">
      <p class="chapter-label">${esc(q.chapter)}</p>
      <h2>${esc(q.heading)}</h2>
      <p class="sub">${esc(q.subheading)}</p>
      <p class="quiz__count" data-count></p>
      <p class="quiz__q" data-q></p>
      <div class="quiz__opts" data-opts></div>
      <p class="quiz__resp" data-resp></p>
      <div class="quiz__recap" data-recap></div>
    </div>`;

  const $q = page.querySelector("[data-q]"), $o = page.querySelector("[data-opts]");
  const $r = page.querySelector("[data-resp]"), $c = page.querySelector("[data-count]");
  const $recap = page.querySelector("[data-recap]");
  let i = 0, answered = false, picks = [];

  function render(){
    const item = q.questions[i];
    answered = false;
    $c.textContent = `${i+1} / ${q.questions.length}`;
    $q.textContent = item.q;
    $r.classList.remove("in"); $r.textContent = "";
    $o.innerHTML = "";
    item.options.forEach((opt, k) => {
      const b = el("button","quiz__opt", esc(opt));
      b.style.setProperty("--tint", RIBBON[k % RIBBON.length]);
      b.addEventListener("click", e => {
        e.stopPropagation();
        if (answered) return; answered = true;
        [...$o.children].forEach(c => c !== b && c.classList.add("fade"));
        b.classList.add("chosen");
        picks[i] = opt;
        save("kira.quiz", picks);
        $r.innerHTML = fmt(item.responses[k]);
        $r.classList.add("in");
        confetti(14, .6);
        setTimeout(() => {
          if (i < q.questions.length - 1){ i++; render(); }
          else finish();
        }, 2600);
      });
      $o.appendChild(b);
    });
  }

  /* the scorecard: every answer was right, so show them all back to her */
  function finish(){
    $q.textContent = ""; $o.innerHTML = ""; $c.textContent = "";
    $r.innerHTML = fmt(q.done); $r.classList.add("in");
    $recap.innerHTML = `
      <p class="quiz__score">${q.questions.length} / ${q.questions.length}</p>
      ${q.questions.map((item, n) => `
        <div class="quiz__row" style="--tint:${RIBBON[n % RIBBON.length]}">
          <span class="quiz__rowq">${esc(item.q)}</span>
          <span class="quiz__rowa">${esc(picks[n] || "—")}</span>
        </div>`).join("")}
      <div class="quiz__again"><button class="btn btn--ghost" data-again>play it again</button></div>`;
    $recap.classList.add("in");
    $recap.querySelector("[data-again]").addEventListener("click", e => {
      e.stopPropagation();
      i = 0; picks = []; save("kira.quiz", picks);
      $recap.classList.remove("in"); $recap.innerHTML = "";
      render();
    });
    confetti(80,.5);
  }
  render();
  return { el: page, name:"The Quiz", accent:"#b39cff", accent2:"#6bb8ff", glow:["#33245e","#152444","#1e2f5e"], petals:.5 };
})());

/* ---- Ch.12  The last page ---- */
add((() => {
  const l = C.letter;
  const page = el("section","page");
  page.innerHTML = `
    <div class="page__inner letter stagger">
      <p class="chapter-label">${esc(l.chapter)}</p>
      ${l.paragraphs.map((p,i) => `<p class="${i===0?"salutation":""}">${fmt(p)}</p>`).join("")}
      <p class="sig">${esc(l.signature)}</p>
      <div class="rose-row">${roseSVG()}${roseSVG()}${roseSVG()}</div>
      <p class="roses-note">${fmt(l.rosesNote)}</p>
      <div class="letter__actions"><button class="btn" data-replay>${esc(l.replayButton)}</button></div>
    </div>`;
  page.querySelector("[data-replay]").addEventListener("click", e => { e.stopPropagation(); book.go(0); });
  return {
    el: page, name:"The Last Page", accent:"#ffd9a0", accent2:"#ff9db0", glow:["#4d2f1e","#1d2440","#452038"], petals:2,
    onEnter(){ setTimeout(() => { confetti(140,.55); petals.shower(22); }, 600); }
  };
})());

/* =========================================================
   Small persistent memory — so the site remembers her between visits.
   Wrapped in try/catch: private-mode browsers throw on localStorage.
   ========================================================= */
function save(key, value){
  try { localStorage.setItem(key, JSON.stringify(value)); } catch(e){}
}
function load(key, fallback){
  try {
    const v = localStorage.getItem(key);
    return v == null ? fallback : JSON.parse(v);
  } catch(e){ return fallback; }
}
function forget(){
  try { Object.keys(localStorage).filter(k => k.startsWith("kira.")).forEach(k => localStorage.removeItem(k)); } catch(e){}
}

/* =========================================================
   The book
   ========================================================= */
const book = (() => {
  const root = document.getElementById("book");
  const dots = document.getElementById("progress");
  const bPrev = document.getElementById("btnPrev"), bNext = document.getElementById("btnNext");
  const rootStyle = document.documentElement.style;
  let idx = 0, furthest = 0;

  chapters.forEach(ch => root.appendChild(ch.el));
  chapters.forEach((c, i) => {
    const d = el("button"); d.setAttribute("aria-label", c.name || `page ${i+1}`);
    d.title = c.name || "";
    d.style.setProperty("--dot", c.accent);
    d.addEventListener("click", e => { e.stopPropagation(); go(i); });
    dots.appendChild(d);
  });

  function paint(){
    const ch = chapters[idx];
    chapters.forEach((c, i) => {
      c.el.classList.toggle("is-active", i === idx);
      c.el.classList.toggle("is-past", i < idx);
      if (i !== idx) c.el.scrollTop = 0;
    });
    [...dots.children].forEach((d, i) => {
      d.classList.toggle("on", i === idx);
      d.classList.toggle("seen", i <= furthest);
    });
    dots.classList.toggle("is-visible", idx > 0);
    bPrev.disabled = idx === 0;
    bNext.disabled = idx === chapters.length - 1;

    const a2 = ch.accent2 || ch.accent;
    rootStyle.setProperty("--accent", ch.accent);
    rootStyle.setProperty("--accent-2", a2);
    rootStyle.setProperty("--accent-soft", hexa(ch.accent, .14));
    rootStyle.setProperty("--accent-soft-2", hexa(a2, .14));
    rootStyle.setProperty("--accent-glow", hexa(ch.accent, .45));
    document.querySelector('meta[name="theme-color"]').setAttribute("content", ch.glow[0]);
    glow(ch.glow);
    petals.set(ch.petals ?? .6, [ch.accent, a2, "#fffaf4"]);
    CONFETTI_COLORS = [ch.accent, a2, "#fff8f0", "#ffd166", "#ff9db0", "#b39cff"];

    if (ch.onEnter) ch.onEnter();
  }
  function go(i){
    i = Math.max(0, Math.min(chapters.length - 1, i));
    if (i === idx) return;
    idx = i;
    furthest = Math.max(furthest, idx);
    save("kira.furthest", furthest);
    paint();
    document.body.dispatchEvent(new CustomEvent("pageturn", { detail:{ index: idx } }));
  }
  function next(){
    const ch = chapters[idx];
    if (ch.onAdvance && ch.onAdvance()) return;   // chapter consumed the tap
    go(idx + 1);
  }
  furthest = Math.max(0, Math.min(chapters.length - 1, load("kira.furthest", 0) | 0));
  paint();
  return {
    go, next, prev: () => go(idx - 1),
    get index(){ return idx; },
    get furthest(){ return furthest; },
    get count(){ return chapters.length; },
    nameOf: i => chapters[i].name || `Page ${i+1}`,
    colorOf: i => chapters[i].accent
  };
})();

/* ---------- input ----------
   Tap the page to turn it — but never when she's tapping something
   she's meant to be playing with. */
const INTERACTIVE = "button, a, textarea, input, select, .crime, .polaroid, .rail, .cake, .pad, .dumbbell, .duckfield, .roamer, .toc, .lightbox, .chip, .scold__log, .point";

document.getElementById("book").addEventListener("click", e => {
  if (e.target.closest(INTERACTIVE)) return;
  (e.clientX > innerWidth * 0.35) ? book.next() : book.prev();
});
document.getElementById("btnNext").addEventListener("click", () => book.next());
document.getElementById("btnPrev").addEventListener("click", () => book.prev());

addEventListener("keydown", e => {
  if (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT") return;
  if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter"){ e.preventDefault(); book.next(); }
  if (e.key === "ArrowLeft") book.prev();
});

/* swipe */
(() => {
  let x0 = null, y0 = null, t0 = 0;
  addEventListener("touchstart", e => {
    x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; t0 = Date.now();
  }, { passive:true });
  addEventListener("touchend", e => {
    if (x0 == null) return;
    const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    if (Date.now() - t0 < 700 && Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.6){
      dx < 0 ? book.next() : book.prev();
    }
    x0 = y0 = null;
  }, { passive:true });
})();

/* ---------- optional background music ----------
   Drop an mp3 at  music.mp3  and the button appears by itself. */
const sound = (() => {
  const btn = document.getElementById("music");
  const audio = new Audio("music.mp3");
  audio.loop = true; audio.volume = 0;
  let hasFile = false, on = false, ac = null;
  btn.hidden = false;
  audio.addEventListener("canplaythrough", () => { hasFile = true; }, { once:true });

  /* No mp3? Then the button still works — it plays little bells we make here. */
  function chime(freq = 660, len = .5, gainTo = .10){
    if (!on || hasFile) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      if (ac.state === "suspended") ac.resume();
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = "sine"; o.frequency.value = freq;
      g.gain.setValueAtTime(0, ac.currentTime);
      g.gain.linearRampToValueAtTime(gainTo, ac.currentTime + .03);
      g.gain.exponentialRampToValueAtTime(.0001, ac.currentTime + len);
      o.connect(g); g.connect(ac.destination);
      o.start(); o.stop(ac.currentTime + len + .02);
    } catch(e){}
  }

  btn.addEventListener("click", e => {
    e.stopPropagation();
    on = !on; btn.classList.toggle("on", on);
    save("kira.sound", on);
    if (on){
      if (hasFile){ audio.play().catch(()=>{}); fade(.35); }
      else { chime(784,.6,.09); setTimeout(() => chime(1047,.7,.07), 130); }
      toast(on ? "sound on" : "sound off");
    } else fade(0);
  });
  function fade(to){
    const step = () => {
      audio.volume += (to - audio.volume) * .08;
      if (Math.abs(to - audio.volume) > .01) requestAnimationFrame(step);
      else { audio.volume = to; if (to === 0) audio.pause(); }
    };
    step();
  }
  // a soft note on every page turn, in a different key each time
  document.body.addEventListener("pageturn", e => {
    chime([523,587,659,698,784,880][e.detail.index % 6], .45, .06);
  });
  return { chime, get on(){ return on; } };
})();

/* =========================================================
   Everything below is the "alive" layer — feedback, menus,
   the photo viewer, and the small conveniences.
   ========================================================= */

/* ---------- toast ---------- */
let toastNode = null, toastTimer = 0;
function toast(text){
  if (!toastNode){ toastNode = el("div","toast"); document.body.appendChild(toastNode); }
  toastNode.textContent = text;
  toastNode.classList.add("in");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastNode.classList.remove("in"), 1900);
}

/* ---------- a small colour burst wherever she taps ---------- */
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  addEventListener("pointerdown", e => {
    if (reduce) return;
    if (e.target.closest(".lightbox, .toc")) return;
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#e2b464";
    const accent2 = getComputedStyle(document.documentElement).getPropertyValue("--accent-2").trim() || accent;
    for (let i = 0; i < 6; i++){
      const dot = el("span","spark");
      const a = Math.random() * Math.PI * 2, d = rand(16, 46);
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
      dot.style.background = Math.random() < .5 ? accent : accent2;
      dot.style.setProperty("--dx", Math.cos(a) * d + "px");
      dot.style.setProperty("--dy", Math.sin(a) * d + "px");
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 700);
    }
  }, { passive:true });
})();

/* ---------- a short buzz on the things that matter ---------- */
function buzz(ms = 8){ try { navigator.vibrate && navigator.vibrate(ms); } catch(e){} }
document.body.addEventListener("pageturn", () => buzz(6));

/* ---------- chapter menu ---------- */
(() => {
  const btn = el("button","toc-btn");
  btn.setAttribute("aria-label","chapters");
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h10"/></svg>`;
  document.body.appendChild(btn);

  const panel = el("div","toc");
  panel.innerHTML = `<p class="toc__title">${esc(C.ui.menuTitle)}</p><div class="toc__list"></div>`;
  const list = panel.querySelector(".toc__list");
  document.body.appendChild(panel);

  for (let i = 0; i < book.count; i++){
    const row = el("button","toc__row");
    row.style.setProperty("--tint", book.colorOf(i));
    row.innerHTML = `<span class="toc__dot"></span>
                     <span class="toc__n">${String(i).padStart(2,"0")}</span>
                     <span class="toc__name">${esc(book.nameOf(i))}</span>`;
    row.addEventListener("click", e => { e.stopPropagation(); book.go(i); close(); });
    list.appendChild(row);
  }

  let open = false;
  function mark(){
    [...list.children].forEach((r, i) => {
      r.classList.toggle("on", i === book.index);
      r.classList.toggle("seen", i <= book.furthest);
    });
  }
  function show(){ open = true; mark(); panel.classList.add("in"); btn.classList.add("on"); }
  function close(){ open = false; panel.classList.remove("in"); btn.classList.remove("on"); }

  btn.addEventListener("click", e => { e.stopPropagation(); open ? close() : show(); });
  addEventListener("click", e => { if (open && !e.target.closest(".toc, .toc-btn")) close(); });
  addEventListener("keydown", e => { if (e.key === "Escape" && open) close(); });
  document.body.addEventListener("pageturn", mark);
})();

/* ---------- share ---------- */
(() => {
  const btn = el("button","share-btn");
  btn.setAttribute("aria-label","share");
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M12 15V3"/><path d="M8 7l4-4 4 4"/></svg>`;
  document.body.appendChild(btn);
  btn.addEventListener("click", async e => {
    e.stopPropagation();
    const data = { title: C.her.tabTitle, text: C.ui.shareText, url: location.href };
    try {
      if (navigator.share){ await navigator.share(data); return; }
      await navigator.clipboard.writeText(location.href);
      toast(C.ui.linkCopied);
    } catch(err){ /* she cancelled the share sheet — say nothing */ }
  });
})();

/* ---------- the photo viewer ---------- */
function openLightbox(startIndex){
  const items = C.memories.items;
  let i = startIndex;

  const box = el("div","lightbox");
  box.innerHTML = `
    <button class="lightbox__close" aria-label="close">&times;</button>
    <button class="lightbox__nav lightbox__nav--prev" aria-label="previous photo">&#8249;</button>
    <button class="lightbox__nav lightbox__nav--next" aria-label="next photo">&#8250;</button>
    <figure class="lightbox__fig">
      <img alt="">
      <figcaption><span class="lightbox__date"></span><span class="lightbox__cap"></span></figcaption>
    </figure>`;
  document.body.appendChild(box);
  setTimeout(() => box.classList.add("in"), 20);

  const img = box.querySelector("img");
  const date = box.querySelector(".lightbox__date");
  const cap = box.querySelector(".lightbox__cap");

  function draw(){
    const it = items[i];
    img.style.opacity = 0;
    img.onload = () => { img.style.opacity = 1; };
    img.src = it.src; img.alt = it.caption;
    date.textContent = it.date;
    cap.textContent = it.caption;
  }
  function step(dir){
    // only hop between photos that actually loaded
    for (let k = 1; k <= items.length; k++){
      const n = (i + dir * k + items.length * k) % items.length;
      if (items[n].src){ i = n; break; }
    }
    draw();
  }
  function close(){
    box.classList.remove("in");
    setTimeout(() => box.remove(), 300);
    removeEventListener("keydown", key);
  }
  function key(e){
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight"){ e.stopPropagation(); step(1); }
    if (e.key === "ArrowLeft"){ e.stopPropagation(); step(-1); }
  }

  box.querySelector(".lightbox__close").addEventListener("click", e => { e.stopPropagation(); close(); });
  box.querySelector(".lightbox__nav--next").addEventListener("click", e => { e.stopPropagation(); step(1); });
  box.querySelector(".lightbox__nav--prev").addEventListener("click", e => { e.stopPropagation(); step(-1); });
  box.addEventListener("click", e => { if (e.target === box) close(); });
  addEventListener("keydown", key);

  // swipe between photos
  let x0 = null;
  box.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive:true });
  box.addEventListener("touchend", e => {
    if (x0 == null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    x0 = null;
  }, { passive:true });

  draw();
}

/* ---------- pick up where she left off ---------- */
(() => {
  if (book.furthest < 1) return;
  const chip = el("div","chip");
  chip.innerHTML = `<button class="chip__go">${esc(C.ui.resume)} <b></b></button>
                    <button class="chip__x" aria-label="dismiss">&times;</button>`;
  const label = chip.querySelector("b");
  label.textContent = book.nameOf(book.furthest);
  chip.querySelector(".chip__go").addEventListener("click", e => {
    e.stopPropagation(); book.go(book.furthest); chip.remove();
  });
  chip.querySelector(".chip__x").addEventListener("click", e => { e.stopPropagation(); chip.remove(); });
  document.body.appendChild(chip);
  setTimeout(() => chip.classList.add("in"), 20);
  // it belongs to the cover only
  document.body.addEventListener("pageturn", () => chip.remove(), { once:true });
  setTimeout(() => chip.classList.remove("in"), 12000);
})();

/* ---------- if today actually is the day, say so ---------- */
(() => {
  const [m, d] = String(C.her.birthday || "").split("-").map(Number);
  if (!m || !d) return;
  const now = new Date();
  if (now.getMonth() + 1 !== m || now.getDate() !== d) return;
  const cover = chapters[0].el.querySelector(".page__inner");
  const flag = el("p","today", esc(C.ui.today));
  cover.insertBefore(flag, cover.querySelector("h1"));
  setTimeout(() => { confetti(70, .3); }, 1400);
})();

/* ---------- start over ---------- */
document.body.addEventListener("pageturn", e => {
  if (e.detail.index !== book.count - 1) return;
  const actions = chapters[book.count - 1].el.querySelector(".letter__actions");
  if (!actions || actions.querySelector("[data-reset]")) return;
  const b = el("button","btn btn--ghost", esc(C.ui.startOver));
  b.setAttribute("data-reset","");
  b.addEventListener("click", ev => {
    ev.stopPropagation();
    forget();
    location.reload();
  });
  actions.appendChild(b);
});

/* ---------- restore the sound preference ---------- */
if (load("kira.sound", false)) {
  // browsers won't let audio start without a tap, so just light the button up
  document.getElementById("music").classList.add("hint-on");
}
