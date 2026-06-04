  document.getElementById('yr').textContent = new Date().getFullYear();

  // ── SCROLL REVEAL OBSERVER ──
  const revealEls = document.querySelectorAll('.reveal, .reveal-group, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // don't unobserve — re-animates every time it enters view
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));



  // ── COUNTING ANIMATION ──
  function animateCounter(el, target, suffix, duration) {
    let start = 0;
    const isDecimal = target % 1 !== 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
        const display = isDecimal ? start.toFixed(1) : Math.floor(start);
        el.innerHTML = display + '<em>' + suffix + '</em>';
        el.classList.remove('land');
        void el.offsetWidth;
        el.classList.add('land');
        return;
      }
      const display = isDecimal ? start.toFixed(1) : Math.floor(start);
      el.innerHTML = display + '<em>' + suffix + '</em>';
    }, 16);
  }

  // ── INTERSECTION OBSERVER — trigger counters when results section visible ──
  const resultNums = document.querySelectorAll('.result-num[data-target]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, suffix, 1800);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  resultNums.forEach(el => observer.observe(el));

  // ── SCROLL FADE IN for sections ──
  const fadeEls = document.querySelectorAll('.results-section, .about-wrap, .cta-block, .niches-grid');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    fadeObserver.observe(el);
  });


  const works = [
    { id:"i3DkxAKdAL", title:"Wealth & Finance Brand",    category:"Real Estate",           tag:"Real Estate",              desc:"Finance content edited for attention. Fast cuts, clear messaging, hooks that actually work." },
    { id:"daab2ZKxzy", title:"Luxury Property Group",     category:"Personal Brands",           tag:"Personal Brands",          desc:"Property showcase reels that feel worth watching. Clean edits built for a high-end audience." },
    { id:"ko3Rsa8DEO", title:"Property Investment Co.",   category:"Personal Brands",           tag:"Personal Brands",          desc:"Educational real estate content that builds trust and gets people to take action." },
    { id:"fViDDWARY-", title:"Executive Coach & Founder", category:"Before & After",   tag:"Before & After",  desc:"Content for a business coach that positions them as an authority, not just fills their feed." },
    { id:"I57iVckFBd", title:"Business Owner Podcast",   category:"Before & After",   tag:"Before & After",  desc:"Podcast clip edited for short-form. Trimmed to the point, hooks in fast." },
    { id:"zIHQo7PFJ9", title:"Personal Project Vol. I",  category:"Luxury Projects",              tag:"Luxury Projects",             desc:"A personal edit focused on pacing and colour. Just me seeing what I can do." },
    { id:"93KP4Q18gR", title:"Personal Project Vol. II", category:"Luxury Projects",              tag:"Luxury Projects",             desc:"Testing hook formats and motion styles. Short-form but cinematic." },
    { id:"ungG7KUp3D", title:"Personal Project Vol. III",category:"Luxury Projects",              tag:"Luxury Projects",             desc:"Cuts, transitions, sound design. A look at my editing range." },
  ];

  function buildCards(filter) {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    const list = filter === 'all' ? works : works.filter(w => w.category === filter);
    list.forEach((w, i) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.animationDelay = `${i * 0.07}s`;
      card.innerHTML = `
        <div class="card-thumb">
          <img src="https://img.youtube.com/vi/${w.id}/hqdefault.jpg" alt="${w.title}" loading="lazy"/>
          <div class="card-overlay"></div>
          <div class="card-play">▶</div>
          <div class="card-tag">${w.tag}</div>
        </div>
        <div class="card-body">
          <div class="card-title">${w.title}</div>
          <div class="card-desc">${w.desc}</div>
        </div>`;
      card.addEventListener('click', () => openModal(w));
      grid.appendChild(card);
    });
  }

  buildCards('all');

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      buildCards(btn.dataset.filter);
    });
  });

  const modal    = document.getElementById('modal');
  const iframe   = document.getElementById('modal-iframe');

  function openModal(w) {
    document.getElementById('modal-title').textContent = w.title;
    document.getElementById('modal-tag').textContent   = w.tag;
    iframe.src = `https://www.youtube.com/embed/${w.id}?autoplay=1&rel=0&modestbranding=1`;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    iframe.src = '';
    document.body.style.overflow = '';
  }

  document.getElementById('modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
