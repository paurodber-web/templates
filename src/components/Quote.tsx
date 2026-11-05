import { Quote as QuoteIcon } from "lucide-preact";
import { Accent, Container } from "./ui";
import { IMG } from "../data";

export default function Quote() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 text-white md:py-40">
      <img src={IMG.quote} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-ink/75" />
      <Container className="relative">
        <div className="mx-auto max-w-[860px] text-center">
          <QuoteIcon size={34} strokeWidth={1.1} className="mx-auto text-clay-soft" />
          <p className="mt-8 text-[11.5px] uppercase tracking-[0.3em] text-clay-soft">Manifest</p>
          <blockquote className="mt-8 text-[1.65rem] leading-[1.45] tracking-[-0.015em] md:text-[2.25rem] md:leading-[1.4]">
            Creiem que una casa neta no és nota: <Accent light>es respira.</Accent> Que l'ordre no és estètica, és calma. I que
            qui entra a casa teva ha de tractar-la com tu la tractes: amb respecte, mètode i{" "}
            <Accent light>zero improvisació.</Accent>
          </blockquote>
          <div className="mx-auto mt-10 h-px w-14 bg-clay-soft/60" />
          <p className="mt-6 text-[13px] uppercase tracking-[0.22em] text-white/60">El Quart Desig</p>
        </div>
      </Container>
    </section>
  );
}
