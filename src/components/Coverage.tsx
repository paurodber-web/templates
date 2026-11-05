import type { JSX } from "preact";
import { useState } from "preact/hooks";
import { CheckCircle2, MapPin, Search, XCircle } from "lucide-preact";
import { Accent, Container, SectionHead } from "./ui";
import { MUNICIPIS } from "../data";

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

export default function Coverage() {
  const [q, setQ] = useState("");
  const [result, setResult] = useState<null | { ok: boolean; name: string }>(null);

  const check = (e: JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!q.trim()) return setResult(null);
    const hit = MUNICIPIS.find((m) => norm(m) === norm(q));
    setResult({ ok: !!hit, name: hit ?? q.trim() });
  };

  return (
    <section id="cobertura" className="bg-white py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Cobertura"
          title={
            <>
              Som a Osona. <Accent>Som a prop de casa.</Accent>
            </>
          }
          desc="Treballem en una àrea concreta per garantir puntualitat i un tracte proper. Escriu el teu municipi i ho comprovem a l'instant."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <div className="flex flex-col rounded-md border border-line bg-white p-8 md:p-10 lg:col-span-5">
            <MapPin size={26} strokeWidth={1.3} className="text-clay" />
            <h3 className="mt-6 text-[1.4rem] leading-tight tracking-[-0.015em]">Comprova el teu municipi</h3>
            <form onSubmit={check} className="mt-7">
              <label htmlFor="mun" className="text-[12px] uppercase tracking-[0.2em] text-muted">
                Escriu el teu municipi
              </label>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  id="mun"
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setResult(null);
                  }}
                  placeholder="Per exemple, Manlleu"
                  className="min-w-0 flex-1 rounded-sm border border-line bg-white px-4 py-3.5 text-[14.5px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ink"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2.5 rounded-sm border border-ink bg-ink px-6 py-3.5 text-[14px] text-white transition-colors hover:bg-ink-soft"
                >
                  <Search size={15} strokeWidth={1.5} />
                  Comprova
                </button>
              </div>
            </form>

            {result && (
              <div
                className={`anim-fade mt-5 flex items-start gap-3.5 rounded-md p-4 text-[14px] leading-[1.65] ${
                  result.ok ? "bg-clay/10 text-ink" : "bg-sand text-muted"
                }`}
              >
                {result.ok ? (
                  <CheckCircle2 size={18} strokeWidth={1.4} className="mt-0.5 shrink-0 text-clay" />
                ) : (
                  <XCircle size={18} strokeWidth={1.4} className="mt-0.5 shrink-0" />
                )}
                {result.ok
                  ? `Sí, arribem a ${result.name}. Pots reservar quan vulguis.`
                  : `Encara no tenim ${result.name} a la llista, però escriu-nos: potser podem fer una excepció.`}
              </div>
            )}

            <p className="mt-auto pt-8 text-[13.5px] leading-[1.7] text-muted">
              Si el teu municipi no hi és, escriu-nos igualment: valorem cada cas de manera individual.
            </p>
          </div>

          <div className="rounded-md border border-line bg-white p-8 md:p-10 lg:col-span-7">
            <div className="flex items-center justify-between">
              <p className="text-[12px] uppercase tracking-[0.24em] text-clay">Principals municipis</p>
              <span className="text-[12px] tracking-[0.12em] text-muted">Osona</span>
            </div>
            <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
              {MUNICIPIS.map((m) => (
                <li key={m} className="flex items-center gap-3.5 border-b border-line py-3.5 text-[14.5px] text-ink/85">
                  <span className="h-1 w-1 shrink-0 rounded-[1px] bg-clay" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
