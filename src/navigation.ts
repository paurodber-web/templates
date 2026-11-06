export function siteNavigation(homePath = '') {
  const root = homePath && !homePath.endsWith('/') ? `${homePath}/` : homePath;
  const about = `${root || './'}sobre-nosaltres/`;
  return [
    { label: 'Serveis', href: `${root}#serveis` },
    { label: 'Preus', href: `${root}#preus` },
    { label: 'Sobre nosaltres', href: about },
    { label: 'Preguntes freqüents', href: `${root}#faq` },
    { label: 'Contacte', href: `${root}#contacte` },
  ];
}
