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
    { id:"m1gbI62dSBI", title:"Real Estate ",    category:"Real Estate",           tag:"Real Estate",              desc:"Real estate content edited for impact: scroll-stopping hooks, high-energy pacing, and high-value property insights that convert views into leads." },
    { id:"9hDjgpzifQQ", title:"Real Estate ",    category:"Real Estate",           tag:"Real Estate",              desc:"High-conversion property video: fast-paced listing tours, scroll-stopping real estate hooks, and clear market insights designed to turn views into open-house bookings." },
    { id:"daab2ZKxzyU", title:"Personal Brands",     category:"Personal Brands",           tag:"Personal Brands",          desc:"High-retention finance editing with fast cuts, sharp hooks, and messaging that builds personal brands." },
    { id:"iVoQZneNLvc", title:"Personal Brands",   category:"Personal Brands",           tag:"Personal Brands",          desc:"Fast-paced, high-hook finance editing engineered to turn casual viewers into personal brand assets." },
    { id:"0lTEAg-Kx-U", title:"Ads & Marketing", category:"Ads & Marketing",   tag:"Ads & Marketing",  desc:"Content for a business coach that positions them as an authority, not just fills their feed." },
    { id:"", title:"Ads & Marketing",   category:"Ads & Marketing",   tag:"Ads & Marketing",  desc:"hyper-engaging content built with high-retention hooks and fast cuts to skyrocket your views and revenue." },
    { id:"3aMG0McFzcU", title:"Motion Graphics",  category:"Motion Graphics",              tag:"Motion Graphics",             desc:"High-retention, precision-edited content designed to capture and hold the attention of ultra-high-net-worth investors." },
    { id:"93KP4Q18gR", title:"Motion Graphics", category:"Motion Graphics",              tag:"Motion Graphics",             desc:"High-impact, rapid-cadence storytelling engineered exclusively for the modern luxury investor." },
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
