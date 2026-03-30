/* ================================================================
   FRESHINNOV LABS — main.js
   Particles · Magnetic buttons · Custom cursor · Scroll animations
   ================================================================ */

(function () {
  'use strict';

  /* ---- CUSTOM CURSOR ---- */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  if (cursor && follower) {
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    const tickFollower = () => {
      followerX += (mouseX - followerX) * 0.14;
      followerY += (mouseY - followerY) * 0.14;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(tickFollower);
    };
    tickFollower();

    document.querySelectorAll('a, button, .nav-cta, .svc-card, .why-card').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* ---- PARTICLE CANVAS ---- */
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [], animId;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - .5) * .4;
        this.vy = (Math.random() - .5) * .4;
        this.r = Math.random() * 1.5 + .5;
        this.alpha = Math.random() * .4 + .1;
        this.color = Math.random() > .7 ? [16,232,122] : Math.random() > .5 ? [56,189,248] : [255,255,255];
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.join(',')},${this.alpha})`;
        ctx.fill();
      }
    }

    const connect = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${.06 * (1 - dist / 120)})`;
            ctx.lineWidth = .5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((W * H) / 14000), 80);
      for (let i = 0; i < count; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      connect();
      animId = requestAnimationFrame(animate);
    };

    const init = () => { resize(); initParticles(); if (animId) cancelAnimationFrame(animId); animate(); };
    init();
    window.addEventListener('resize', init);
  }

  /* ---- MAGNETIC BUTTONS ---- */
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * .35;
      const dy = (e.clientY - cy) * .35;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  /* ---- NAVBAR SCROLL ---- */
  const navbar = document.getElementById('navbar');
  const handleNavScroll = () => {
    if (window.scrollY > 30) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ---- HAMBURGER MENU ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  let menuOpen = false;

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle('open', menuOpen);
      const [s1, s2] = hamburger.querySelectorAll('span');
      if (menuOpen) {
        s1.style.transform = 'translateY(7px) rotate(45deg)';
        s2.style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        s1.style.transform = '';
        s2.style.transform = '';
      }
    });
    document.querySelectorAll('.mob-link, .mob-cta').forEach(l => {
      l.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => s.style.transform = '');
      });
    });
  }

  /* ---- SCROLL REVEAL (IntersectionObserver) ---- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.scroll-reveal, .reveal-up, .reveal-line').forEach(el => {
    revealObserver.observe(el);
  });

  // Trigger hero elements immediately
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal-up, .hero .reveal-line').forEach(el => el.classList.add('in'));
  }, 100);

  /* ---- COUNTER ANIMATION ---- */
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        let current = 0;
        const duration = 1800;
        const stepTime = 16;
        const steps = duration / stepTime;
        const increment = target / steps;
        const timer = setInterval(() => {
          current = Math.min(current + increment, target);
          el.textContent = Math.floor(current);
          if (current >= target) { el.textContent = target; clearInterval(timer); }
        }, stepTime);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.8 });

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  /* ---- HERO DEVICE 3D TILT ---- */
  const heroDevice = document.getElementById('hero-device');
  if (heroDevice) {
    const hero = document.querySelector('.hero');
    hero.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = (e.clientY - cy) / cy * -8;
      const ry = (e.clientX - cx) / cx * 10;
      heroDevice.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    hero.addEventListener('mouseleave', () => {
      heroDevice.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
    });
  }

  /* ---- SMOOTH SCROLL ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---- CONTACT FORM ---- */
  const form = document.getElementById('contactForm');
  const successEl = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<span>Sending…</span>';
      btn.disabled = true;
      btn.style.opacity = '.75';

      // Simulate submission (replace with real endpoint if desired)
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
        btn.style.opacity = '';
        if (successEl) {
          successEl.style.display = 'flex';
          form.reset();
          setTimeout(() => { successEl.style.display = 'none'; }, 6000);
        }
      }, 1400);
    });
  }

  /* ---- ACTIVE NAV LINK ON SCROLL ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.style.color = '');
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.style.color = 'var(--green)';
      }
    });
  }, { threshold: .5 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ---- SERVICE CARD HOVER GLOW ---- */
  document.querySelectorAll('.svc-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(16,232,122,.06), var(--surface-2) 60%)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

})();
