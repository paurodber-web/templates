import { Check, HeartHandshake, PackageOpen, SprayCan } from "lucide-preact";
import { Accent, Container, SectionHead } from "./ui";

const OPTIONS = [
  {
    tag: "Si ho prefereixes",
    icon: PackageOpen,
    title: "El teu equip, el nostre mètode",
    text: "Si vols que treballem amb els teus productes i estris, ho fem. El mètode i l'ordre de treball són exactament els mateixos.",
    items: [
      "Treballem amb el teu material i productes",
      "Mantenim la separació d'estris per zones",
      "Ho deixem tot recollit en acabar",
    ],
  },
  {
    tag: "Opció habitual",
    icon: SprayCan,
    title: "Tot a punt per a casa teva",
    text: "Portem el nostre material professional, net i preparat per a cada visita, i triem el producte adequat per a cada superfície.",
    items: [
      "Productes adequats a cada superfície",
      "Estris diferenciats per zones i estances",
      "Material net i desinfectat a cada casa",
    ],
  },
];

const STORY = [
  { k: "Des de la pandèmia", v: "Vam començar a oferir als clients aquesta possibilitat." },
  { k: "Molts ho preferien", v: "Van valorar poder fer servir el seu propi material." },
  { k: "Vam veure que funcionava", v: "Anava bé, així que vam decidir mantenir-ho." },
];

export default function Hygiene() {
  return (
    <section id="higiene" className="bg-sand py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Política de contaminació creuada"
          title={
            <>
              Pensem en la higiene. <Accent>I en la teva calma.</Accent>
            </>
          }
          desc="Per reduir el risc de contaminació creuada entre llars, pots triar que fem servir el teu aspirador i la teva mopa."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {OPTIONS.map((o) => (
            <div key={o.title} className="flex flex-col rounded-md border border-line bg-white p-8 md:p-10">
              <div className="flex items-start justify-between">
                <span className="rounded-sm border border-line px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-muted">
                  {o.tag}
                </span>
                <o.icon size={26} strokeWidth={1.3} className="text-clay" />
              </div>
              <h3 className="mt-8 text-[20px] min-[641px]:text-[22px] leading-[1.16] tracking-[-0.035em]">{o.title}</h3>
              <p className="mt-3 text-[14.5px] leading-[1.8] text-muted">{o.text}</p>
              <ul className="mt-7">
                {o.items.map((i) => (
                  <li key={i} className="flex items-center gap-3.5 border-b border-line py-3.5 text-[14.5px] text-ink/85 first:border-t">
                    <Check size={16} strokeWidth={1.5} className="shrink-0 text-clay" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Política: opción, no obligación */}
        <div className="mt-6 grid gap-10 rounded-md border border-line bg-white p-8 md:p-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <HeartHandshake size={26} strokeWidth={1.3} className="text-clay" />
            <h3 className="mt-6 text-[1.55rem] leading-tight tracking-[-0.02em]">Una opció, mai una obligació.</h3>
            <p className="mt-4 text-[14.5px] leading-[1.8] text-muted">
              Posem en pràctica aquesta política per una raó molt simple: va néixer de les preferències dels nostres clients. En
              cap cas és una obligació, només una opció a la teva elecció.
            </p>
          </div>
          <ul className="lg:col-span-7">
            {STORY.map((s, i) => (
              <li key={s.k} className="flex items-start gap-6 border-b border-line py-5 first:pt-0 last:border-0 last:pb-0">
                <span className="mt-1 text-[12px] tracking-[0.2em] text-muted/70">0{i + 1}</span>
                <div>
                  <p className="text-[16px] text-ink">{s.k}</p>
                  <p className="mt-1.5 text-[14.5px] leading-[1.7] text-muted">{s.v}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
