document.addEventListener('DOMContentLoaded', () => {

  /* NAV INJECTION */
  const placeholder = document.getElementById('nav-placeholder');
  if (placeholder) {
    fetch('nav.html')
      .then(r => r.text())
      .then(html => {
        placeholder.innerHTML = html;
        initNav();
        initTheme();
        highlightActive();
      });
  }

  function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const links  = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.textContent = open ? '✕' : '☰';
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.textContent = '☰';
      });
    });
  }

  function highlightActive() {
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
      if (a.getAttribute('href') === page) a.classList.add('active');
    });
  }

  function initTheme() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light');
      btn.textContent = '🌙';
    }
    btn.addEventListener('click', () => {
      const light = document.body.classList.toggle('light');
      btn.textContent = light ? '🌙' : '☀️';
      localStorage.setItem('theme', light ? 'light' : 'dark');
    });
  }

  /* SCROLL REVEAL */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 70);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(el => io.observe(el));
  }

  /* STARFIELD (home page only) */
  const canvas = document.getElementById('starfield');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [], t = 0;
    function resize() {
      canvas.width  = canvas.offsetWidth  || window.innerWidth;
      canvas.height = canvas.offsetHeight || window.innerHeight;
    }
    function mkStar() {
      return { x: Math.random()*canvas.width, y: Math.random()*canvas.height,
               r: Math.random()*1.4+0.15, base: Math.random()*0.65+0.1,
               speed: Math.random()*0.012+0.003, phase: Math.random()*Math.PI*2 };
    }
    resize();
    stars = Array.from({length:240}, mkStar);
    window.addEventListener('resize', () => { resize(); stars = Array.from({length:240}, mkStar); });
    (function draw() {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        const a = s.base * (0.45 + 0.55 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(190,215,255,${a})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    })();
  }

  /* BURST PARTICLES (home page only) */
  const burstSets = {
    '🚀': ['🚀','✨','🌟','💫','⭐'],
    '💎': ['💎','🔷','✨','🪨','⚗️'],
    '🔭': ['🔭','⭐','🌙','🌌','✦'],
    '☄️': ['☄️','💥','✨','🌟','🔥'],
  };

  document.querySelectorAll('.space-obj').forEach(obj => {
    obj.addEventListener('click', function(e) {
      const emoji = this.querySelector('.rocket, .crystal, .scope, .meteor');
      const key = emoji ? emoji.textContent.trim() : '✨';
      const set = burstSets[key] || ['✨','⭐','💫'];
      const cx = e.clientX, cy = e.clientY;
      for (let i = 0; i < 8; i++) {
        const b = document.createElement('div');
        b.className = 'burst';
        b.textContent = set[Math.floor(Math.random() * set.length)];
        const angle = (i / 8) * Math.PI * 2;
        const dist  = 45 + Math.random() * 35;
        Object.assign(b.style, { left: cx+'px', top: cy+'px', fontSize: (0.9+Math.random()*0.5)+'rem', opacity:'1' });
        document.body.appendChild(b);
        requestAnimationFrame(() => {
          b.style.transform = `translate(${Math.cos(angle)*dist}px,${Math.sin(angle)*dist-20}px)`;
          b.style.opacity = '0';
        });
        setTimeout(() => b.remove(), 700);
      }
    });
  });

});
