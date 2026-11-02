(() => {
  const section = document.getElementById('municipio');
  if (!section) return;
  const controls = document.createElement('div');
  controls.className = 'town-variant-controls';
  controls.setAttribute('role', 'group');
  controls.setAttribute('aria-label', 'Variant del comprovador de municipi');
  const buttons = [1, 2, 3, 4, 5].map(variant => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = `Variant ${variant}`;
    button.addEventListener('click', () => select(variant, true));
    controls.append(button);
    return button;
  });
  function select(variant, save) {
    section.dataset.townVariant = String(variant);
    buttons.forEach((button, index) => button.setAttribute('aria-pressed', String(index + 1 === variant)));
    if (save) try { localStorage.setItem('el-sete-cel-town-variant', String(variant)); } catch (_) {}
  }
  let variant = 1;
  try {
    const saved = Number(localStorage.getItem('el-sete-cel-town-variant'));
    if (saved >= 1 && saved <= 5 && Number.isInteger(saved)) variant = saved;
  } catch (_) {}
  section.prepend(controls);
  select(variant, false);
})();
