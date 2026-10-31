(() => {
  const section = document.getElementById('como-funciona');
  const steps = section?.querySelector('.steps');
  if (!steps) return;
  const controls = document.createElement('div');
  controls.className = 'step-number-controls';
  controls.setAttribute('role', 'group');
  controls.setAttribute('aria-label', 'Variant dels números dels passos');
  const buttons = ['Variant 1', 'Variant 2'].map((label, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.addEventListener('click', () => select(index + 1, true));
    controls.append(button);
    return button;
  });
  function select(variant, save) {
    steps.dataset.numberVariant = String(variant);
    buttons.forEach((button, index) => button.setAttribute('aria-pressed', String(index + 1 === variant)));
    if (save) try { localStorage.setItem('el-sete-cel-step-number-variant', String(variant)); } catch (_) {}
  }
  let variant = 1;
  try { if (localStorage.getItem('el-sete-cel-step-number-variant') === '2') variant = 2; } catch (_) {}
  steps.before(controls);
  select(variant, false);
})();
