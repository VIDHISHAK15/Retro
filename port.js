// Progress bar
window.addEventListener('scroll', () => {
  const doc = document.documentElement;
  const prog = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
  document.getElementById('progressBar').style.width = prog + '%';
});

// Coordinate readout
document.addEventListener('mousemove', (e) => {
  const x = String(Math.round(e.clientX)).padStart(4, '0');
  const y = String(Math.round(e.clientY)).padStart(4, '0');
  document.getElementById('coordReadout').textContent = `X:${x} Y:${y}`;
});

// Skill bar animation on scroll
const skillTracks = document.querySelectorAll('.skill-track');
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('animated'); });
}, { threshold: 0.3 });
skillTracks.forEach((t) => skillObs.observe(t));

// Experience items fade in
const expItems = document.querySelectorAll('.exp-item');
const expObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 120);
    }
  });
}, { threshold: 0.2 });
expItems.forEach((i) => expObs.observe(i));

// Section title typewriter on scroll
const secTitles = document.querySelectorAll('.sec-title');
const titleObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting && !e.target.dataset.animated) {
      e.target.dataset.animated = '1';
      const text = e.target.textContent;
      e.target.textContent = '';
      let i = 0;
      const t = setInterval(() => {
        e.target.textContent = text.slice(0, ++i);
        if (i >= text.length) clearInterval(t);
      }, 40);
    }
  });
}, { threshold: 0.5 });
secTitles.forEach((t) => titleObs.observe(t));

// Blueprint computer typewriter on scroll
const blueprintComputer = document.querySelector('.blueprint-computer');
if (blueprintComputer) {
  const blueprintObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !e.target.dataset.animated) {
        e.target.dataset.animated = '1';
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });
  blueprintObs.observe(blueprintComputer);
}

const clickSound = new Audio('matthewvakaliuk73627-mouse-click-290204.mp3');

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', playClickSound);
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelector('.form-submit')
  ?.addEventListener('click', playClickSound);


// Resume download placeholder
const resumeBadge = document.querySelector('.resume-badge');
if (resumeBadge) {
  resumeBadge.addEventListener('click', () => {
    alert('Resume download would go here');
  });
}
