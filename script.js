/* ─────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────── */
const cur   = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

setInterval(() => {
  tx += (mx - tx) * .15;
  ty += (my - ty) * .15;
  trail.style.left = tx + 'px';
  trail.style.top  = ty + 'px';
}, 16);

/* ─────────────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────────────── */
const prog = document.getElementById('progress');

window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  prog.style.width = pct + '%';
});

/* ─────────────────────────────────────────────
   BACKGROUND CANVAS — FLOATING PARTICLES
───────────────────────────────────────────── */
const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x     = Math.random() * W;
    this.y     = Math.random() * H;
    this.r     = Math.random() * 2 + .5;
    this.vx    = (Math.random() - .5) * .3;
    this.vy    = -Math.random() * .4 - .1;
    this.alpha = Math.random() * .4 + .05;
    this.color = Math.random() > .5 ? '82,183,136' : '212,160,23';
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
    ctx.fill();
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y < -10) this.reset();
    this.draw();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function animateCanvas() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => p.update());
  requestAnimationFrame(animateCanvas);
}
animateCanvas();

/* ─────────────────────────────────────────────
   MARQUEE — TECH STACK TICKER
───────────────────────────────────────────── */
const items = [
  'Python', 'Flask', 'MySQL', 'Linux', 'HTML & CSS',
  'Render', 'Git & GitHub', 'Data Structures',
  'Algorithms', 'LeetCode', 'OOP', 'REST APIs'
];

const m = document.getElementById('marquee');
const doubled = [...items, ...items];

doubled.forEach(t => {
  const el = document.createElement('span');
  el.className = 'marquee-item';
  el.innerHTML = `<span class="marquee-dot"></span>${t}`;
  m.appendChild(el);
});

/* ─────────────────────────────────────────────
   TERMINAL TYPEWRITER EFFECT
───────────────────────────────────────────── */
const termLines = [
  { cls: 't-prompt',  text: 'arockia@dev:~$ ' },
  { cls: 't-cmd',     text: 'python3 intro.py',              delay: 600 },
  { cls: 't-out',     text: '',                               delay: 300 },
  { cls: 't-out',     text: '{ Arockia Joyston }',           delay: 0,  prefix: '  ' },
  { cls: 't-out',     text: '',                               delay: 0 },
  { cls: 't-key',     text: '  name:   ', val: 'Arockia Joyston',          valCls: 't-val', delay: 100 },
  { cls: 't-key',     text: '  role:   ', val: '2nd Year CSE Student',      valCls: 't-val', delay: 80  },
  { cls: 't-key',     text: '  stack:  ', val: '["Python","Flask","MySQL"]', valCls: 't-val', delay: 80  },
  { cls: 't-key',     text: '  focus:  ', val: '"DSA + Web Dev"',            valCls: 't-val', delay: 80  },
  { cls: 't-key',     text: '  status: ', val: '"Actively Learning 🌱"',     valCls: 't-val', delay: 80  },
  { cls: 't-comment', text: '  # Open to internships & collabs',             delay: 200 },
  { cls: 't-out',     text: '',                               delay: 200 },
  { cls: 't-prompt',  text: 'arockia@dev:~$ ▊',              delay: 300 },
];

const tb = document.getElementById('terminal-body');
let lineIdx = 0;

function addLine(line) {
  const el = document.createElement('div');
  el.className = 't-line';
  if (line.val) {
    el.innerHTML = `<span class="${line.cls}">${line.prefix || ''}${line.text}</span><span class="${line.valCls}">${line.val}</span>`;
  } else {
    el.innerHTML = `<span class="${line.cls}">${line.prefix || ''}${line.text}</span>`;
  }
  tb.appendChild(el);
  tb.scrollTop = tb.scrollHeight;
}

function typeLines() {
  if (lineIdx >= termLines.length) return;
  const l = termLines[lineIdx++];
  setTimeout(() => { addLine(l); typeLines(); }, l.delay ?? 50);
}

setTimeout(typeLines, 800);

/* ─────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('vis');
  });
}, { threshold: .1 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ─────────────────────────────────────────────
   SKILL BARS — ANIMATE ON SCROLL
───────────────────────────────────────────── */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sbar-fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
    }
  });
}, { threshold: .2 });

document.querySelectorAll('.skill-block').forEach(el => barObs.observe(el));

/* ─────────────────────────────────────────────
   TIMELINE ANIMATIONS
───────────────────────────────────────────── */
const tlObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: .15 });

document.querySelectorAll('.tl-item').forEach((el, i) => {
  el.style.transitionDelay = (i * .15) + 's';
  tlObs.observe(el);
});

/* ─────────────────────────────────────────────
   ANIMATED STAT COUNTER
───────────────────────────────────────────── */
function counter(el, end, dur = 1500) {
  let start = 0;
  const step = end / 60;
  const interval = setInterval(() => {
    start += step;
    if (start >= end) {
      clearInterval(interval);
      el.textContent = end + '+';
    } else {
      el.textContent = Math.floor(start) + '+';
    }
  }, dur / 60);
}

const lc = document.getElementById('leet-count');
const lcObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      counter(lc, 50);
      lcObs.disconnect();
    }
  });
}, { threshold: .5 });

if (lc) lcObs.observe(lc);
