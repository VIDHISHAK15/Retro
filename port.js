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


// Click sound effect
const clickSound = new Audio("matthewvakaliuk73627-mouse-click-290204.mp3");
function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', playClickSound);
});

document.querySelector('.form-submit')
  ?.addEventListener('click', playClickSound);




// Contact form email sending

const emailConfig = {
  serviceId: 'service_w35jr8u',
  templateId: 'template_q3o7for',
  publicKey: '5fNLf6MpCw3gT2Gmv'
};

const contactForm = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');
const submitButton = document.querySelector('.form-submit');

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!window.emailjs) {
      if (formStatus) formStatus.textContent = 'TRANSMISSION FAILED: Email service unavailable.';
      return;
    }

    const formData = new FormData(contactForm);
    const templateParams = {
      sender: formData.get('sender'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'TRANSMITTING...';
    }
    if (formStatus) formStatus.textContent = 'TRANSMISSION IN PROGRESS...';

    try {
      await window.emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        templateParams,
        emailConfig.publicKey
      );

      contactForm.reset();
      if (formStatus) formStatus.textContent = 'TRANSMISSION RECEIVED. THANK YOU.';
    } catch (error) {
      console.error('EmailJS send failed:', error);
      if (formStatus) formStatus.textContent = 'TRANSMISSION FAILED. PLEASE TRY AGAIN.';
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'TRANSMIT MESSAGE ↗';
      }
    }
  });
}


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

// Resume download placeholder
const resumeBadge = document.querySelector('.resume-badge');
if (resumeBadge) {
  resumeBadge.addEventListener('click', () => {
    alert('Resume download would go here');
  });
}


/*use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./BlueprintKeyboard.css";

export default function BlueprintKeyboard() {
  const containerRef = useRef(null);

  const keys = [
    { char: "Q", x: 18, y: 37 },
    { char: "W", x: 23, y: 37 },
    { char: "E", x: 28, y: 37 },
    { char: "R", x: 33, y: 37 },
    { char: "T", x: 38, y: 37 },
    { char: "Y", x: 43, y: 37 },
    { char: "U", x: 48, y: 37 },
    { char: "I", x: 53, y: 37 },
    { char: "O", x: 58, y: 37 },
    { char: "P", x: 63, y: 37 },

    { char: "A", x: 20, y: 47 },
    { char: "S", x: 25, y: 47 },
    { char: "D", x: 30, y: 47 },
    { char: "F", x: 35, y: 47 },
    { char: "G", x: 40, y: 47 },
    { char: "H", x: 45, y: 47 },
    { char: "J", x: 50, y: 47 },
    { char: "K", x: 55, y: 47 },
    { char: "L", x: 60, y: 47 },

    { char: "Z", x: 22, y: 57 },
    { char: "X", x: 27, y: 57 },
    { char: "C", x: 32, y: 57 },
    { char: "V", x: 37, y: 57 },
    { char: "B", x: 42, y: 57 },
    { char: "N", x: 47, y: 57 },
    { char: "M", x: 52, y: 57 },

    { char: "1", x: 16, y: 27 },
    { char: "2", x: 21, y: 27 },
    { char: "3", x: 26, y: 27 },
    { char: "4", x: 31, y: 27 },
    { char: "5", x: 36, y: 27 },

    { char: "@", x: 58, y: 27 },
    { char: "#", x: 63, y: 27 },
    { char: "$", x: 68, y: 27 }
  ];

  useEffect(() => {
    const labels =
      containerRef.current.querySelectorAll(".key-char");

    gsap.set(labels, {
      opacity: 0.4
    });

    gsap.to(labels, {
      opacity: 1,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",

      stagger: {
        each: 0.05,
        from: "random"
      }
    });

    gsap.to(labels, {
      textShadow:
        "0 0 8px rgba(74,103,255,0.8)",
      duration: 2,
      repeat: -1,
      yoyo: true,

      stagger: {
        each: 0.08,
        from: "random"
      }
    });

    gsap.to(labels, {
      scale: 1.08,
      duration: 2,
      repeat: -1,
      yoyo: true,

      stagger: {
        each: 0.03,
        from: "random"
      }
    });
    gsap.to(".key-char", {
        opacity: () =>
          gsap.utils.random(
            0.4,
            1
          ),
      
        duration: () =>
          gsap.utils.random(
            1,
            3
          ),
      
        repeat: -1,
      
        yoyo: true,
      
        ease: "sine.inOut"
      });

  }, []);

  return (
    <div
      ref={containerRef}
      className="keyboard-wrapper"
    >
      <img
        src="/keyboard.png"
        alt="keyboard"
        className="keyboard-image"
      />

      {keys.map((key, i) => (
        <span
          key={i}
          className="key-char"
          style={{
            left: `${key.x}%`,
            top: `${key.y}%`
          }}
        >
          {key.char}
        </span>
      ))}
    </div>
  );*/
