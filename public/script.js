const groups = document.querySelectorAll('[data-section]');
groups.forEach(group => {
  const tabs = [...group.querySelectorAll('[role="tab"]')];
  const key = `el-sete-cel:${group.dataset.section}`;
  function select(tab, focus = false, save = true) {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
    if (save) { try { localStorage.setItem(key, tab.id); } catch {} }
    if (focus) tab.focus();
  }
  let saved; try { saved = localStorage.getItem(key); } catch {}
  select(tabs.find(tab => tab.id === saved) || tabs[0], false, false);
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      select(tabs[next], true);
    });
  });
});
document.querySelectorAll('.hero').forEach(panel => {
  let contentIndex = 0;
  panel.querySelectorAll('.reveal').forEach(element => {
    const isHeader = element.classList.contains('site-header');
    const isFooter = element.matches('.one-bottom, .two-caption, .three-footer, .four-footer, .five-footer, .new-index');
    element.style.setProperty('--reveal-delay', `${isHeader ? 1050 : isFooter ? 1200 : Math.min(contentIndex++ * 160, 640)}ms`);
  });
});
