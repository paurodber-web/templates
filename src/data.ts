const px = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const IMG = {
  hero: px(7031210, 2200, 1400),
  about: px(28905874, 900, 1100),
  quote: px(39228994, 2200, 1200),
  cta: px(33312398, 2200, 1100),
  serviceStandard: px(5644353, 1000, 760),
  serviceDeep: px(6492399, 1000, 760),
  serviceMove: px(7203775, 1000, 760),
  blog1: px(4008518, 900, 600),
  blog2: px(31015267, 900, 600),
  blog3: px(4440527, 900, 600),
};

export type Service = {
  id: string;
  index: string;
  category: string;
  name: string;
  short: string;
  long: string;
  price: number;
  image: string;
  highlights: string[];
  duration: string;
  team: string;
  ideal: string;
  includes: string[];
  excludes: string[];
  note: string;
};

export const SERVICES: Service[] = [
  {
    id: "estandard",
    index: "01",
    category: "Manteniment",
    name: "Neteja estàndard",
    short:
      "El manteniment que fa que casa estigui sempre a punt: ordre, pols i higiene sense complicacions.",
    long: "La neteja estàndard és la base d'una casa que sempre respira. Seguim un mètode d'ordre fix, de dalt a baix i de dins a fora, perquè cada visita tingui el mateix resultat i no calgui explicar res dues vegades.",
    price: 49,
    image: IMG.serviceStandard,
    highlights: [
      "Manteniment periòdic de tota la llar",
      "Punts crítics sempre revisats",
      "Freqüència adaptable al teu ritme",
    ],
    duration: "2 – 4 hores",
    team: "1 o 2 professionals",
    ideal: "Cases en ús diari",
    includes: [
      "Eliminació de pols en mobles i superfícies",
      "Aspirat i fregat de tots els terres",
      "Cuina: fogons, tauler, pica i façanes",
      "Banys: sanitaris, mampara, mirall i aixeteria",
      "Neteja de miralls i vidres interiors accessibles",
      "Llits fets i ordre general de les estances",
      "Buidatge de papereres i cubells",
    ],
    excludes: [
      "Interior de forn i nevera",
      "Vidres exteriors i persianes",
      "Rentat i planxat de roba",
    ],
    note: "Amb recurrència apliquem descomptes automàtics de fins al 10 % sobre cada visita.",
  },
  {
    id: "profunda",
    index: "02",
    category: "A fons",
    name: "Neteja profunda",
    short:
      "Arribem als racons que el dia a dia deixa de banda. Un punt de partida perfecte per començar de zero.",
    long: "La neteja profunda arriba allà on el manteniment no ho fa: calç, greix acumulat, sòcols, interiors d'electrodomèstics i tot allò que costa de veure fins que ho tens a sobre. Ideal com a primera visita o un cop per temporada.",
    price: 79,
    image: IMG.serviceDeep,
    highlights: [
      "Atenció detallada a cada racó",
      "Desincrustació de cuina i banys",
      "Ideal com a primera visita",
    ],
    duration: "4 – 7 hores",
    team: "2 professionals",
    ideal: "Primera visita o canvi de temporada",
    includes: [
      "Desincrustació de calç en banys i aixeteria",
      "Cuina a fons: campana, rajoles i extractor",
      "Interior de forn, microones i nevera",
      "Interior d'armaris de cuina i banys",
      "Sòcols, marcs de portes i interruptors",
      "Vidres interiors, bastidors i ferrures",
      "Darrere i sota els mobles accessibles",
    ],
    excludes: [
      "Vidres exteriors d'accés complicat",
      "Taques de pintura o d'obra",
      "Rentat i planxat de roba",
    ],
    note: "Després d'una neteja profunda, el manteniment és molt més àgil i amb descomptes de fins al 10 %.",
  },
  {
    id: "mudances",
    index: "03",
    category: "Entrega de claus",
    name: "Neteja per a mudances",
    short:
      "Per deixar la casa impecable abans d'entregar les claus o de començar a viure en un nou lloc.",
    long: "Una neteja pensada per a moments de canvi. Deixem la casa buida i a punt per entregar, o preparada perquè estrenis la nova llar sense haver de netejar res. Revisem cada estança amb una llista final.",
    price: 149,
    image: IMG.serviceMove,
    highlights: [
      "Casa buida o a punt d'entregar",
      "Interior d'armaris i calaixos",
      "Pensada per a l'entrega de claus",
    ],
    duration: "5 – 8 hores",
    team: "2 o 3 professionals",
    ideal: "Entregues de claus i estrenes",
    includes: [
      "Interior d'armaris, calaixos i prestatgeries",
      "Interior d'electrodomèstics i campana",
      "Banys i cuina desincrustats",
      "Vidres, marcs i persianes interiors",
      "Terres de totes les estances",
      "Retirada d'adhesius i marques",
      "Revisió final amb llista de control",
    ],
    excludes: [
      "Retirada de mobles o trastos",
      "Reparacions o pintura",
      "Neteja post-obra pesada",
    ],
    note: "El preu s'ajusta a la superfície i a l'estat de l'habitatge. Te'l confirmem abans de reservar.",
  },
];

export const FREQUENCIES = [
  { id: "setmanal", label: "Setmanal", sub: "Una visita cada setmana", discount: 10, weeks: 1 },
  { id: "quinzenal", label: "Quinzenal", sub: "Una visita cada 2 setmanes", discount: 10, weeks: 2 },
  { id: "tres", label: "Cada 3 setmanes", sub: "Una visita cada 3 setmanes", discount: 5, weeks: 3 },
  { id: "mensual", label: "Mensual", sub: "Una visita cada 4 setmanes", discount: 5, weeks: 4 },
  { id: "puntual", label: "Puntual", sub: "Una sola visita, sense compromís", discount: 0, weeks: 0 },
] as const;

export const MUNICIPIS = [
  "Vic",
  "Manlleu",
  "Torelló",
  "Tona",
  "Roda de Ter",
  "Les Masies de Voltregà",
  "Sant Hipòlit de Voltregà",
  "Folgueroles",
  "Gurb",
  "Calldetenes",
  "Taradell",
  "Centelles",
  "Santa Eugènia de Berga",
  "L'Esquirol",
  "Seva",
  "Balenyà",
];
