(() => {
  const storageKey = 'el-sete-cel-version-position';
  const selector = document.querySelector('.version-selector');
  if (!selector) return;

  selector.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link || link.getAttribute('aria-current') === 'page') return;

    const sections = [...document.querySelectorAll('main[id], section[id], .page-content > footer')];
    const position = window.scrollY;
    const section = sections.filter((item) => item.getBoundingClientRect().top + position <= position + 1).pop();
    const top = section ? section.getBoundingClientRect().top + position : 0;
    const progress = section ? Math.max(0, Math.min(1, (position - top) / Math.max(section.offsetHeight, 1))) : 0;

    try {
      sessionStorage.setItem(storageKey, JSON.stringify({ id: section?.matches('footer') ? '__footer__' : section?.id || 'inicio', progress, fallback: position }));
    } catch (_) {
      // Navigation still works if storage is unavailable.
    }
  });

  let saved;
  try {
    saved = JSON.parse(sessionStorage.getItem(storageKey) || 'null');
    sessionStorage.removeItem(storageKey);
  } catch (_) {
    return;
  }
  if (!saved) return;

  const restore = () => {
    const section = (saved.id === '__footer__' ? document.querySelector('.page-content > footer') : document.getElementById(saved.id)) ||
      (saved.id === 'v5' ? document.getElementById('inicio') : null) ||
      (saved.id === 'inicio' ? document.getElementById('v5') : null);
    const target = section
      ? section.getBoundingClientRect().top + window.scrollY + section.offsetHeight * saved.progress
      : saved.fallback;
    window.scrollTo({ top: target, behavior: 'instant' });
  };

  restore();
  if (document.readyState !== 'complete') {
    window.addEventListener('load', restore, { once: true });
  }
})();
