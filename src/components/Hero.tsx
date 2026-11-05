import { ArrowDown, BadgeCheck, CalendarCheck, ShieldCheck } from "lucide-preact";
import { Accent, Btn, Container } from "./ui";
import { IMG } from "../data";

export default function Hero() {
  return (
    <section id="top" className="relative flex h-screen min-h-[680px] w-full flex-col overflow-hidden bg-ink text-white">
      <img src={IMG.hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/50" />

      <Container className="relative flex flex-1 flex-col justify-center pt-24">
        <div className="max-w-[640px]">
          <div className="anim-up flex items-center gap-4" style={{ animationDelay: "0.1s" }}>
            <span className="h-px w-10 bg-clay-soft/80" />
            <span className="text-[10px] min-[641px]:text-[11.5px] uppercase tracking-[0.17em] text-clay-soft">
              Neteja professional de la llar · Osona
            </span>
          </div>
          <h1
            className="anim-up mt-7 text-[clamp(2.55rem,12vw,3.2rem)] min-[641px]:text-[clamp(2.7rem,5.2vw,4rem)] leading-[1.04] tracking-[-0.052em]"
            style={{ animationDelay: "0.2s" }}
          >
            Un lloc per
            <br />
            tornar a <Accent light>respirar.</Accent>
          </h1>
          <p
            className="anim-up mt-7 max-w-[480px] text-[16.5px] min-[641px]:text-[18px] leading-[1.75] text-white/75"
            style={{ animationDelay: "0.35s" }}
          >
            Una neteja minuciosa, un tracte proper: la calma de saber que tot està ben fet.
          </p>
          <div className="anim-up mt-10 flex flex-wrap gap-3" style={{ animationDelay: "0.5s" }}>
            <Btn variant="light" href="#reserva" arrow>
              Reserva la teva neteja
            </Btn>
            <Btn variant="outline-light" href="#serveis">
              Descobreix els serveis
            </Btn>
          </div>
          <div
            className="anim-up mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[13px] text-white/70"
            style={{ animationDelay: "0.65s" }}
          >
            {[
              { i: BadgeCheck, t: "Preu tancat" },
              { i: CalendarCheck, t: "Reserva en 2 minuts" },
              { i: ShieldCheck, t: "Garantia de 48 h" },
            ].map(({ i: I, t }) => (
              <span key={t} className="flex items-center gap-2.5">
                <I size={16} strokeWidth={1.4} className="text-clay-soft" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </Container>

      <div className="relative">
        <Container>
          <div className="flex items-center justify-between border-t border-white/20 py-6 text-[12px] uppercase tracking-[0.2em] text-white/70">
            <div className="hidden gap-10 md:flex">
              <span>Neteja estàndard</span>
              <span>Neteja profunda</span>
              <span>Neteja per a mudances</span>
            </div>
            <a href="#sobre" className="flex items-center gap-3 transition-colors hover:text-white">
              Descobreix més
              <ArrowDown size={14} strokeWidth={1.4} />
            </a>
          </div>
        </Container>
      </div>
    </section>
  );
}
