import { ArrowUpRight, Check } from "lucide-preact";
import { Accent, Container, SectionHead } from "./ui";
import { SERVICES, type Service } from "../data";

export default function Services({ onOpen }: { onOpen: (s: Service) => void }) {
  return (
    <section id="serveis" className="bg-sand py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Els nostres serveis"
          title={
            <>
              Tres neteges. <Accent>Una mateixa cura.</Accent>
            </>
          }
          desc="Tres maneres de cuidar la teva llar, segons el moment i les necessitats. Totes comencen escoltant-te."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article
              key={s.id}
              className="group flex flex-col overflow-hidden rounded-md border border-line bg-white transition-shadow duration-500 hover:shadow-[0_24px_50px_-28px_rgba(27,35,54,0.35)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                <img
                  src={s.image}
                  alt={s.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent" />
                <span className="absolute left-5 top-5 rounded-sm bg-white px-3 py-1.5 text-[12px] tracking-[0.2em] text-ink">
                  {s.index}
                </span>
                <span className="absolute bottom-5 left-5 text-[12px] uppercase tracking-[0.24em] text-white">
                  {s.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-[22px] leading-[1.16] tracking-[-0.035em]">{s.name}</h3>
                <p className="mt-3.5 min-h-[96px] text-[15px] min-[641px]:text-[14.5px] leading-[1.75] text-muted">{s.short}</p>

                <ul className="mt-6">
                  {s.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3.5 border-b border-line py-3.5 text-[14px] min-[641px]:text-[13.5px] text-ink/85 last:border-0">
                      <Check size={16} strokeWidth={1.5} className="shrink-0 text-clay" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-6">
                  <p className="text-[14.5px] text-muted">
                    des de <span className="ml-1 text-[16px] text-ink">{s.price} €</span>
                  </p>
                  <button
                    onClick={() => onOpen(s)}
                    className="group/btn inline-flex items-center gap-2.5 rounded-sm border border-ink/20 px-4 py-2.5 text-[14px] text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
                  >
                    Veure detalls
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                    />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
