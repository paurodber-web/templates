import { useState } from "preact/hooks";
import { ChevronDown, MessageSquare } from "lucide-preact";
import { Accent, Container, Eyebrow } from "./ui";

const FAQS = [
  {
    q: "Necessito estar a casa durant la neteja?",
    a: "No cal. Pots deixar-nos les claus o indicar-nos com accedir i nosaltres ens ocupem de tot. Si prefereixes ser-hi, tampoc hi ha cap problema.",
  },
  {
    q: "Quins productes utilitzeu i porteu el vostre material?",
    a: "Portem material i productes professionals adequats a cada superfície. Si ho prefereixes, també podem treballar amb els teus productes i estris: és una opció, mai una obligació.",
  },
  {
    q: "Què passa si no quedo satisfet amb la neteja?",
    a: "Tens 48 hores per avisar-nos. Tornem a casa teva, repassem el que no t'ha convençut i ho arreglem sense cap cost.",
  },
  {
    q: "Sempre és el mateix equip?",
    a: "Ho intentem sempre. Treballem amb equips estables perquè coneguin la teva casa i les teves preferències, i perquè la confiança es construeixi visita rere visita.",
  },
  {
    q: "Com s'apliquen els descomptes per freqüència?",
    a: "Automàticament sobre el preu de cada visita: un 10 % amb freqüència setmanal o quinzenal, i un 5 % amb visites cada 3 setmanes o mensuals (cada 4 setmanes).",
  },
  {
    q: "Treballeu caps de setmana i festius?",
    a: "Treballem principalment de dilluns a divendres. Per a caps de setmana i festius, consulta'ns la disponibilitat i mirem de trobar la millor solució.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-24 md:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Preguntes freqüents</Eyebrow>
              <h2 className="mt-6 text-[clamp(2rem,3.4vw,2.65rem)] leading-[1.16] tracking-[-0.035em]">
                Tens dubtes? <Accent>Parlem-ne plegats.</Accent>
              </h2>
              <p className="mt-7 max-w-[400px] text-[14.5px] leading-[1.8] text-muted">
                La resposta ràpida a les dudes més habituals. Si no hi trobes la teva, escriu-nos.
              </p>
              <a
                href="#contacte"
                className="group mt-9 inline-flex items-center gap-3 text-[14px] text-ink"
              >
                <MessageSquare size={17} strokeWidth={1.4} className="text-clay" />
                <span className="border-b border-ink/30 pb-1 transition-colors group-hover:border-ink">Fes-nos una pregunta</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="border-t border-line">
              {FAQS.map((f, i) => {
                const isOpen = open === i;
                return (
                  <li key={f.q} className="border-b border-line">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className={`text-[15.5px] min-[641px]:text-[16px] leading-[1.16] tracking-[-0.015em] transition-colors ${isOpen ? "text-ink" : "text-ink/85"}`}>
                        {f.q}
                      </span>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border transition-all duration-300 ${
                          isOpen ? "border-ink bg-ink text-white" : "border-line text-ink"
                        }`}
                      >
                        <ChevronDown
                          size={16}
                          strokeWidth={1.5}
                          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-500 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-[560px] pb-7 text-[14px] leading-[1.8] text-muted">{f.a}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
