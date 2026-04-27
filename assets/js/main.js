// AEclipse — vanilla JS for navbar, scroll reveal, stat counters, carousel

(function(){
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // -------- Mobile menu --------
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.navbar-links');
  if(toggle && navLinks){
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }

  // -------- Navbar scroll state --------
  const nav = document.querySelector('.navbar');
  if(nav){
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // -------- Scroll reveal --------
  const reveals = document.querySelectorAll('.reveal');
  if(reveals.length){
    if(reduceMotion){
      reveals.forEach(el => el.classList.add('visible'));
    } else {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if(e.isIntersecting){
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(el => io.observe(el));
    }
  }

  // -------- Stat counters --------
  const counters = document.querySelectorAll('[data-count]');
  if(counters.length){
    const animate = (el) => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      if(reduceMotion){ el.textContent = target.toLocaleString() + suffix; return; }
      const start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const v = Math.floor(target * eased);
        el.textContent = v.toLocaleString() + suffix;
        if(t < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString() + suffix;
      };
      requestAnimationFrame(step);
    };
    const cio = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(e.isIntersecting){
          animate(e.target);
          cio.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => cio.observe(c));
  }

  // -------- Testimonial carousel --------
  const carousel = document.querySelector('.testimonial-carousel');
  if(carousel){
    const slides = carousel.querySelectorAll('.testimonial');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    let idx = 0;
    let timer;
    if(slides.length && dotsContainer){
      slides.forEach((_, i) => {
        const b = document.createElement('button');
        b.className = 'dot' + (i === 0 ? ' active' : '');
        b.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
        b.addEventListener('click', () => { go(i); resetTimer(); });
        dotsContainer.appendChild(b);
      });
      const dots = dotsContainer.querySelectorAll('.dot');
      const go = (n) => {
        slides[idx].classList.remove('active');
        dots[idx].classList.remove('active');
        idx = (n + slides.length) % slides.length;
        slides[idx].classList.add('active');
        dots[idx].classList.add('active');
      };
      const resetTimer = () => {
        if(timer) clearInterval(timer);
        if(!reduceMotion) timer = setInterval(() => go(idx + 1), 6000);
      };
      resetTimer();
      carousel.addEventListener('mouseenter', () => timer && clearInterval(timer));
      carousel.addEventListener('mouseleave', resetTimer);
    }
  }

  // -------- Form submission feedback --------
  document.querySelectorAll('form[data-formspree]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const success = form.querySelector('.form-success');
      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Sending...';
      try{
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if(res.ok){
          form.reset();
          if(success){ success.style.display = 'block'; success.textContent = 'Thanks — we\u2019ll be in touch shortly.'; }
        } else {
          if(success){ success.style.display = 'block'; success.style.background = 'rgba(239,68,68,0.15)'; success.style.borderColor = 'rgba(239,68,68,0.45)'; success.style.color = '#fca5a5'; success.textContent = 'Something went wrong. Please call 01244 691 993.'; }
        }
      } catch(err){
        if(success){ success.style.display = 'block'; success.style.background = 'rgba(239,68,68,0.15)'; success.style.borderColor = 'rgba(239,68,68,0.45)'; success.style.color = '#fca5a5'; success.textContent = 'Network error. Please call 01244 691 993.'; }
      } finally {
        btn.disabled = false;
        btn.textContent = original;
      }
    });
  });

  // -------- Set current year in footer --------
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();
})();
