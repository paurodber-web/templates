import { ArrowRight, Check, Users } from "lucide-preact";
import { Accent, Container, Eyebrow } from "./ui";
import { IMG } from "../data";

const POINTS = [
  "Equip estable i professionals de confiança",
  "Productes adequats a cada superfície",
  "Comunicació directa i honesta",
];

export default function About() {
  return (
    <section id="sobre" className="bg-white py-24 md:py-32">
      <Container>
        <div className="grid items-center gap-10 min-[821px]:grid-cols-[1.05fr_0.95fr] min-[821px]:gap-[45px] min-[1021px]:gap-[78px]">
          <div className="relative">
            <div className="aspect-[1.15] min-[641px]:aspect-[1.65] min-[821px]:aspect-[1.08] overflow-hidden rounded-md bg-sand">
              <img src={IMG.about} alt="Saló lluminós i endreçat" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="absolute inset-x-5 bottom-5 flex items-center gap-4 rounded-md bg-ink/95 p-5 text-white backdrop-blur sm:right-auto sm:max-w-[290px]">
              <Users size={22} strokeWidth={1.3} className="shrink-0 text-clay-soft" />
              <p className="text-[13.5px] leading-[1.6] text-white/80">
                Equips estables. Sempre les mateixes cares a casa teva.
              </p>
            </div>
          </div>

          <div className="max-[820px]:max-w-[640px]">
            <Eyebrow>Sobre nosaltres</Eyebrow>
            <h2 className="mt-6 text-[2rem] min-[641px]:text-[clamp(2rem,3.2vw,2.65rem)] leading-[1.16] tracking-[-0.035em]">
              Cuidem casa teva. <Accent>I la teva tranquil·litat.</Accent>
            </h2>
            <p className="mt-7 max-w-[560px] text-[15.5px] leading-[1.8] text-muted">
              El Quart Desig neix d'una idea molt senzilla: la neteja professional ha de donar tranquil·litat, no més coses a
              gestionar. Per això combinem mètode, un tracte proper i atenció a cada detall, visita rere visita.
            </p>

            <ul className="mt-10 max-w-[560px]">
              {POINTS.map((p) => (
                <li key={p} className="flex items-center gap-4 border-b border-line py-4 first:border-t">
                  <Check size={17} strokeWidth={1.5} className="shrink-0 text-clay" />
                  <span className="text-[15px] text-ink/85">{p}</span>
                </li>
              ))}
            </ul>

            <a
              href="#serveis"
              className="group mt-10 inline-flex items-center gap-3 text-[14px] text-ink"
            >
              <span className="border-b border-ink/30 pb-1 transition-colors group-hover:border-ink">Descobreix els serveis</span>
              <ArrowRight size={16} strokeWidth={1.4} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
