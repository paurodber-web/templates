import type { ComponentChildren } from "preact";
import { useMemo, useState } from "preact/hooks";
import { ArrowRight, Check, ChevronDown, PiggyBank, Receipt, TrendingDown } from "lucide-preact";
import { Accent, Container, SectionHead } from "./ui";
import { FREQUENCIES, SERVICES } from "../data";

const RATES: Record<string, { extra: number; mph: number }> = {
  estandard: { extra: 0.55, mph: 30 },
  profunda: { extra: 0.9, mph: 18 },
  mudances: { extra: 1.5, mph: 14 },
};
const HOURLY = 18;

const eur = (n: number) =>
  n.toLocaleString("ca-ES", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function Frequencies() {
  const [freqId, setFreqId] = useState<string>("setmanal");
  const [mode, setMode] = useState<"closed" | "hourly">("closed");
  const [serviceId, setServiceId] = useState("estandard");
  const [area, setArea] = useState(80);

  const freq = FREQUENCIES.find((f) => f.id === freqId)!;
  const service = SERVICES.find((s) => s.id === serviceId)!;

  const calc = useMemo(() => {
    const r = RATES[serviceId];
    let base: number;
    let hours = 0;
    if (mode === "closed") {
      base = service.price + Math.max(0, area - 60) * r.extra;
    } else {
      hours = Math.max(2, Math.ceil((area / r.mph) * 2) / 2);
      base = hours * HOURLY;
    }
    base = Math.round(base * 100) / 100;
    const saving = Math.round(base * (freq.discount / 100) * 100) / 100;
    const total = Math.round((base - saving) * 100) / 100;
    const visitsMonth = freq.weeks ? 52 / 12 / freq.weeks : 0;
    return {
      base,
      hours,
      saving,
      total,
      visitsMonth,
      monthlySaving: saving * visitsMonth,
      monthlyTotal: total * visitsMonth,
    };
  }, [mode, serviceId, area, freq, service.price]);

  return (
    <section id="frequencies" className="bg-sand py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Freqüències i descomptes"
          title={
            <>
              Tria el teu ritme. <Accent>I estalvia cada cop.</Accent>
            </>
          }
          desc="Tria la freqüència que t'encaixa i configura la teva visita: veuràs el preu final i el que t'estalvies, sense passos intermedis."
        />

        <div className="mt-16 grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Columna izquierda: frecuencias */}
          <div className="lg:col-span-5">
            <p className="mb-5 text-[12px] uppercase tracking-[0.24em] text-muted">Tria la freqüència</p>
            <div className="space-y-3">
              {FREQUENCIES.map((f) => {
                const active = f.id === freqId;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFreqId(f.id)}
                    aria-pressed={active}
                    className={`flex w-full items-center justify-between gap-4 rounded-md border bg-white px-6 py-5 text-left transition-all duration-300 ${
                      active ? "border-ink shadow-[0_14px_30px_-22px_rgba(27,35,54,0.5)]" : "border-line hover:border-ink/30"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-sm border transition-colors ${
                          active ? "border-ink bg-ink text-white" : "border-line text-transparent"
                        }`}
                      >
                        <Check size={12} strokeWidth={2} />
                      </span>
                      <div>
                        <p className="text-[14.4px] text-ink">{f.label}</p>
                        <p className="mt-1 text-[12px] text-muted">{f.sub}</p>
                      </div>
                    </div>
                    <span
                      className={`shrink-0 rounded-sm px-3 py-1.5 text-[12.5px] tracking-wide ${
                        f.discount ? "bg-clay/10 text-clay" : "bg-sand text-muted"
                      }`}
                    >
                      {f.discount ? `−${f.discount} %` : "0 %"}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-6 text-[13.5px] leading-[1.75] text-muted">
              Els descomptes s'apliquen automàticament sobre cada visita. La freqüència mensual correspon a una visita{" "}
              <span className="text-ink">cada 4 setmanes</span>.
            </p>
          </div>

          {/* Columna derecha: calculadora */}
          <div id="calculadora" className="scroll-mt-24 rounded-md border border-line bg-white p-7 md:p-9 lg:col-span-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[12px] uppercase tracking-[0.24em] text-clay">Pressupost orientatiu</p>
                <h3 className="mt-3 text-[21px] min-[641px]:text-[24px] leading-[1.16] tracking-[-0.035em]">Configura la visita</h3>
              </div>
              <PiggyBank size={24} strokeWidth={1.3} className="mt-1 text-clay" />
            </div>

            {/* Tabs */}
            <div className="mt-7 grid grid-cols-2 gap-1 rounded-md bg-sand p-1">
              {(
                [
                  ["closed", "Preu tancat"],
                  ["hourly", "Per hores"],
                ] as const
              ).map(([k, l]) => (
                <button
                  key={k}
                  onClick={() => setMode(k)}
                  className={`rounded-sm py-3 text-[14px] transition-all duration-300 ${
                    mode === k ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Select label="Servei" value={serviceId} onChange={setServiceId}>
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </Select>
              <Select label="Freqüència" value={freqId} onChange={setFreqId}>
                {FREQUENCIES.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                    {f.id === "mensual" ? " (cada 4 setmanes)" : ""}
                  </option>
                ))}
              </Select>
            </div>

            <div className="mt-7">
              <div className="flex items-baseline justify-between">
                <label htmlFor="area" className="text-[12px] uppercase tracking-[0.2em] text-muted">
                  Superfície aproximada
                </label>
                <span className="text-[16px] text-ink">{area} m²</span>
              </div>
              <input
                id="area"
                type="range"
                min={30}
                max={250}
                step={5}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="mt-5"
              />
              <div className="mt-3 flex justify-between text-[12px] text-muted/80">
                <span>30 m²</span>
                <span>250 m²</span>
              </div>
            </div>

            {/* Desglose */}
            <div className="mt-8 border-t border-line">
              {mode === "hourly" && (
                <Row label="Hores estimades" value={`${calc.hours.toString().replace(".", ",")} h × 18 €`} />
              )}
              <Row label="Preu per visita sense descompte" value={eur(calc.base)} />
              <Row
                label={freq.discount ? `Descompte ${freq.label.toLowerCase()} (−${freq.discount} %)` : "Descompte"}
                value={freq.discount ? `−${eur(calc.saving)}` : "—"}
                accent={!!freq.discount}
              />
            </div>

            <div className="mt-5 rounded-md bg-ink p-5 text-white sm:p-6">
              <p className="flex items-center gap-2.5 text-[12px] uppercase tracking-[0.22em] text-white/60">
                <Receipt size={15} strokeWidth={1.4} className="text-clay-soft" aria-hidden="true" />
                Preu per visita
              </p>
              <div className="mt-3 flex flex-nowrap items-baseline gap-3 whitespace-nowrap">
                <p className="text-[1.75rem] leading-none tracking-[-0.02em]">{eur(calc.total)}</p>
                <p className="text-[13px] text-white/50">IVA inclòs</p>
              </div>
            </div>

            {/* Ahorro */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-line bg-sand/60 p-5">
                <div className="flex items-center gap-2.5 text-[11.5px] uppercase tracking-[0.2em] text-muted">
                  <TrendingDown size={15} strokeWidth={1.4} className="text-clay" />
                  Estalvi per servei
                </div>
                <p className="mt-3 text-[1.5rem] leading-none tracking-[-0.02em] text-clay">
                  {freq.discount ? eur(calc.saving) : "—"}
                </p>
              </div>
              <div className="rounded-md border border-line bg-sand/60 p-5">
                <div className="flex items-center gap-2.5 text-[11.5px] uppercase tracking-[0.2em] text-muted">
                  <PiggyBank size={15} strokeWidth={1.4} className="text-clay" />
                  Estalvi mensual
                </div>
                <p className="mt-3 text-[1.5rem] leading-none tracking-[-0.02em] text-clay">
                  {freq.discount ? `≈ ${eur(calc.monthlySaving)}` : "—"}
                </p>
              </div>
            </div>

            <p className="mt-5 text-[13px] leading-[1.7] text-muted">
              {freq.weeks
                ? `Amb ${freq.label.toLowerCase()}${freq.id === "mensual" ? " (cada 4 setmanes)" : ""} fas unes ${calc.visitsMonth
                    .toFixed(1)
                    .replace(".", ",")} visites al mes: ≈ ${eur(calc.monthlyTotal)} mensuals.`
                : "Una visita puntual no té descompte. Amb recurrència t'estalvies fins a un 10 % per visita."}
            </p>

            <a
              href="#reserva"
              className="group mt-7 flex items-center justify-center gap-3 rounded-sm border border-ink bg-white px-6 py-3.5 text-[14px] text-ink transition-colors duration-300 hover:bg-ink hover:text-white"
            >
              Reserva amb aquest preu
              <ArrowRight size={16} strokeWidth={1.4} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Row({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-line py-4 text-[14.5px]">
      <span className="text-muted">{label}</span>
      <span className={accent ? "text-clay" : "text-ink"}>{value}</span>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: ComponentChildren;
}) {
  return (
    <label className="block">
      <span className="text-[12px] uppercase tracking-[0.2em] text-muted">{label}</span>
      <div className="relative mt-3">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-sm border border-line bg-white px-4 py-3.5 pr-10 text-[14.5px] text-ink outline-none transition-colors hover:border-ink/30 focus:border-ink"
        >
          {children}
        </select>
        <ChevronDown size={16} strokeWidth={1.4} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
      </div>
    </label>
  );
}
