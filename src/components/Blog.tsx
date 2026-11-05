import { ArrowUpRight } from "lucide-preact";
import { Accent, Container, SectionHead } from "./ui";
import { IMG } from "../data";

const POSTS = [
  {
    tag: "Criteri",
    time: "4 min",
    image: IMG.blog1,
    title: "Quan necessites una neteja profunda (i quan no)",
    text: "Alguns senyals que indiquen que ha arribat el moment, i quan el manteniment és més que suficient.",
  },
  {
    tag: "Mudances",
    time: "3 min",
    image: IMG.blog2,
    title: "La llista breu abans d'entregar les claus",
    text: "Tot el que convé revisar perquè l'entrega de claus sigui tranquil·la i sense retrets.",
  },
  {
    tag: "Higiene",
    time: "5 min",
    image: IMG.blog3,
    title: "Per què separem els draps per colors",
    text: "Una idea senzilla que evita que la brutícia d'una zona acabi a una altra.",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="bg-sand py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Consells de la llar"
          title={
            <>
              Petits gestos. <Accent>Per cuidar la teva llar.</Accent>
            </>
          }
          desc="Descobreix idees pràctiques, consells i explicacions que t'ajudaran a cuidar casa teva amb més criteri i confiança."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p) => (
            <a
              key={p.title}
              href="#top"
              className="group flex flex-col overflow-hidden rounded-md border border-line bg-white transition-shadow duration-500 hover:shadow-[0_24px_50px_-28px_rgba(27,35,54,0.35)]"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-ink">
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute left-5 top-5 rounded-sm bg-white px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-ink">
                  {p.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-[21px] min-[641px]:text-[22px] leading-[1.35] tracking-[-0.035em]">{p.title}</h3>
                <p className="mt-3 flex-1 text-[13.5px] leading-[1.75] text-muted">{p.text}</p>
                <div className="mt-7 flex items-center justify-between border-t border-line pt-5 text-[13.5px]">
                  <span className="text-muted">{p.time} de lectura</span>
                  <span className="flex items-center gap-2 text-ink">
                    Llegir article
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
