(() => {
  const hero = document.getElementById('v5');
  const header = document.querySelector('.shared-sticky-header');
  if (!hero || !header) return;

  const variants = [null, 1, 5, 6, 7, 10, 20, 23];
  const controls = document.createElement('div');
  controls.className = 'hero-variant-controls';
  controls.setAttribute('role', 'group');
  controls.setAttribute('aria-label', 'Variant de la portada');
  const buttons = variants.map((id, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = id === null ? 'Actual' : String(id).padStart(2, '0');
    button.addEventListener('click', () => select(index, true));
    controls.append(button);
    return button;
  });
  hero.append(controls);
  const panel = document.createElement('div');
  panel.className = 'imported-hero-frame';
  panel.hidden = true;
  const shadow = panel.attachShadow({ mode: 'open' });
  hero.append(panel);
  let source;
  let selectedId = null;
  async function showImported(id) {
    try {
      source ||= fetch('/imported-heroes.html').then(response => {
        if (!response.ok) throw new Error('Unable to load hero variants');
        return response.text();
      }).then(html => new DOMParser().parseFromString(html, 'text/html'));
      const doc = await source;
      if (selectedId !== id) return;
      const original = doc.getElementById('hero-' + id);
      if (!original) throw new Error('Hero variant not found');
      const style = doc.querySelector('style').cloneNode(true);
      style.textContent = style.textContent.replaceAll(':root', ':host') + `
        .hero{height:100%;min-height:100%;color:#fff}
        .hero h1,.hero h1 em,.hero p{color:#fff}
        @media(max-width:760px){
          .variant-6 .two-content{flex-direction:column;align-items:flex-start;justify-content:center;gap:1.25rem}
          .variant-6 .vertical-label{writing-mode:horizontal-tb;transform:none}
          .variant-6 .two-copy{width:100%}
        }
      `;
      const content = original.cloneNode(true);
      content.hidden = false;
      if (id === 6) content.querySelector('.vertical-label').textContent = 'CURA DE LA LLAR';
      content.querySelectorAll('.reveal').forEach((element, i) => element.style.setProperty('--reveal-delay', Math.min(i * 120, 480) + 'ms'));
      shadow.replaceChildren(style, content);
    } catch (error) {
      source = null;
      if (selectedId === id) select(0, true);
      console.error(error);
    }
  }
  const key = 'el-sete-cel-imported-hero';
  function select(index, save) {
    const id = variants[index];
    selectedId = id;
    hero.classList.toggle('has-imported-hero', id !== null);
    document.body.classList.toggle('hero-fullbleed-active', id !== null);
    panel.hidden = id === null;
    if (id !== null) showImported(id);
    buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    if (save) try { localStorage.setItem(key, String(index)); } catch (_) {}
  }
  let initial = 0;
  try { const stored = Number(localStorage.getItem(key)); if (Number.isInteger(stored) && stored >= 0 && stored < variants.length) initial = stored; } catch (_) {}
  select(initial, false);
})();
