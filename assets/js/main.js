(function () {
  const normalizePage = (raw) => {
    const key = (raw || '').toLowerCase();
    if (!key || key === '/' || key === 'index' || key === 'index.html' || key === 'home' || key === 'home.html') {
      return 'home';
    }
    if (key === 'demos' || key === 'demos.html' || key === 'demo' || key === 'demo.html') {
      return 'demos';
    }
    if (key === 'submit' || key === 'submit.html') {
      return 'submit';
    }
    return key;
  };

  const currentRaw = window.location.pathname.split('/').pop() || '';
  const currentPage = normalizePage(currentRaw);

  // Keep URLs clean (`home`, `demos`, `submit`) while preserving local-file compatibility.
  if (currentRaw.toLowerCase().endsWith('.html')) {
    const cleanPath = window.location.pathname.replace(/[^/]+$/, currentPage);
    if (cleanPath !== window.location.pathname) {
      window.history.replaceState({}, '', `${cleanPath}${window.location.search}${window.location.hash}`);
    }
  }

  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    reveals.forEach((el) => io.observe(el));
  }

  document.querySelectorAll('[data-nav]').forEach((item) => {
    const href = item.getAttribute('href') || '';
    const target = normalizePage(href.split('/').pop());
    if (target === currentPage) {
      item.classList.add('active');
    }
  });
})();
