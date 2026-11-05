import { BadgeCheck, MessageCircle, RefreshCw, ShieldCheck } from "lucide-preact";
import { Accent, Btn, Container, Eyebrow } from "./ui";

const STEPS = [
  { icon: MessageCircle, t: "Avisa'ns", d: "Explica'ns què no t'ha convençut dins del termini de 48 hores." },
  { icon: RefreshCw, t: "Repassem", d: "Tornem a casa teva i revisem el punt en qüestió." },
  { icon: BadgeCheck, t: "Sense cost", d: "La correcció no té cap cost addicional per a tu." },
];

export default function Guarantee() {
  return (
    <section id="garantia" className="bg-ink py-24 text-white md:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <Eyebrow light>Garantia de satisfacció</Eyebrow>
            <h2 className="mt-6 text-[2rem] min-[641px]:text-[clamp(2rem,3.5vw,2.8rem)] leading-[1.16] tracking-[-0.035em]">
              Una feina ben feta. <Accent light>I un repàs si cal.</Accent>
            </h2>
            <p className="mt-7 max-w-[480px] text-[15px] min-[641px]:text-[15.5px] leading-[1.8] text-white/65">
              Volem que quedis tranquil·la amb el resultat. Si en acabar la visita hi ha alguna cosa que no t'ha convençut,
              avisa'ns i tornarem a repassar-ho sense cap cost.
            </p>
            <div className="mt-10">
              <Btn variant="light" href="#contacte" arrow>
                Explica'ns què ha passat
              </Btn>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-md border border-white/15 bg-white/[0.04]">
              <div className="flex items-center justify-between gap-6 border-b border-white/15 p-8">
                <div>
                  <p className="text-[12px] uppercase tracking-[0.24em] text-clay-soft">Termini per avisar-nos</p>
                  <p className="mt-3 text-[3rem] leading-none tracking-[-0.03em]">
                    48 <span className="text-[1.4rem] text-white/70">hores</span>
                  </p>
                </div>
                <ShieldCheck size={32} strokeWidth={1.1} className="text-clay-soft" />
              </div>
              <ul>
                {STEPS.map((s, i) => (
                  <li key={s.t} className="flex items-start gap-5 border-b border-white/15 p-7 last:border-0">
                    <s.icon size={22} strokeWidth={1.3} className="mt-0.5 shrink-0 text-clay-soft" />
                    <div className="flex-1">
                      <p className="text-[16px]">{s.t}</p>
                      <p className="mt-1.5 text-[14px] leading-[1.7] text-white/60">{s.d}</p>
                    </div>
                    <span className="text-[12px] tracking-[0.2em] text-white/35">0{i + 1}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
