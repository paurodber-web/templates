(() => {
  const header = document.querySelector(".v5-top, .hero-top") || document.querySelector("body > .site-header");
  if (!header) return;
  document.querySelectorAll("body > .site-header").forEach(el => { if (el !== header) el.style.setProperty("display", "none", "important"); });
  const links = [['/', 'Inici'], ['/serveis/', 'Serveis'], ['/preus/', 'Preus'], ['/sobre-nosaltres/', 'Sobre nosaltres'], ['/blog/', 'Blog'], ['/faqs/', 'Preguntes freqüents'], ['/contacte/', 'Contacte'], ['/reserva/', 'Reserva']];
  const populate = nav => {
    nav.replaceChildren(...links.map(([href, label]) => {
      const a = document.createElement('a');
      a.href = href;
      a.target = '_top';
      a.textContent = label;
      if (href === '/reserva/') a.classList.add('shared-reserve-button');
      const path = location.pathname;
      if (href === '/' ? path === '/' : path === href.slice(0, -1) || path.startsWith(href)) a.setAttribute('aria-current', 'page');
      return a;
    }));
  };
  let nav = header.querySelector(':scope > nav');
  if (!nav) { nav = document.createElement('nav'); header.append(nav); }
  nav.classList.add('shared-nav');
  nav.setAttribute('aria-label', 'Navegació principal');
  populate(nav);
  let menu = header.querySelector(':scope > details');
  if (!menu) {
    menu = document.createElement('details');
    menu.innerHTML = '<summary aria-label="Obrir el menú"><span></span><span></span><span></span></summary><nav aria-label="Navegació mòbil"></nav>';
    header.append(menu);
  }
  menu.classList.add('shared-mobile-menu');
  let mobileNav = menu.querySelector('nav');
  if (!mobileNav) { mobileNav = document.createElement('nav'); menu.append(mobileNav); }
  populate(mobileNav);
  mobileNav.addEventListener('click', event => { if (event.target.closest('a')) menu.open = false; });
  const logo = header.querySelector(".logo");
  if (logo && logo.tagName !== "A") { const link = document.createElement("a"); link.className = logo.className; link.href = "/"; link.innerHTML = logo.innerHTML; logo.replaceWith(link); }
  const placeholder = document.createElement("div");
  placeholder.setAttribute("aria-hidden", "true");
  placeholder.style.flex = "none";
  header.before(placeholder);
  const height = header.getBoundingClientRect().height;
  placeholder.style.height = height + "px";
  header.classList.add("shared-sticky-header");
  document.body.append(header);
  const update = () => header.classList.toggle("is-compact", window.scrollY > 24);
  addEventListener("scroll", update, { passive: true });
  update();
})();
