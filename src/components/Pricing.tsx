import { Check, Clock, Lock } from "lucide-preact";
import { Accent, Btn, Container, SectionHead } from "./ui";
import { SERVICES } from "../data";

export default function Pricing() {
  return (
    <section id="preus" className="bg-white py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Modalitats"
          title={
            <>
              Preu fix o per hores. <Accent>Com tu prefereixis.</Accent>
            </>
          }
          desc="Dues maneres de contractar: amb totes les tasques del servei incloses o prioritzant allò que més necessites."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Preu tancat */}
          <div className="flex flex-col rounded-md border border-line bg-white p-8 md:p-10">
            <div className="flex items-start justify-between">
              <Lock size={26} strokeWidth={1.3} className="text-clay" />
              <span className="rounded-sm border border-line px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-muted">
                Casa sencera
              </span>
            </div>
            <h3 className="mt-8 text-[25px] min-[641px]:text-[27px] leading-[1.16] tracking-[-0.035em]">Preu tancat</h3>
            <p className="mt-3 max-w-[460px] text-[15px] min-[641px]:text-[14.5px] leading-[1.8] text-muted">
              Un preu fix per a tota la casa, segons la superfície i el tipus de neteja. Saps el que pagaràs abans de reservar.
            </p>

            <ul className="mt-8">
              {SERVICES.map((s) => (
                <li key={s.id} className="flex items-center justify-between border-b border-line py-4 first:border-t">
                  <span className="text-[15px] text-ink/85">{s.name}</span>
                  <span className="text-[14.5px] text-muted">
                    des de <span className="ml-1 text-[16px] text-ink">{s.price} €</span>
                  </span>
                </li>
              ))}
            </ul>

            <ul className="mt-6 space-y-3">
              {["Totes les tasques del servei incloses", "El temps s'ajusta al que cal", "Cap sorpresa a la factura"].map((t) => (
                <li key={t} className="flex items-center gap-3.5 text-[14px] text-muted">
                  <Check size={15} strokeWidth={1.5} className="text-clay" />
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-10">
              <Btn variant="dark" href="#calculadora" arrow className="w-full">
                Consulta el preu
              </Btn>
            </div>
          </div>

          {/* Per hores */}
          <div className="flex flex-col rounded-md border border-line bg-white p-8 md:p-10">
            <div className="flex items-start justify-between">
              <Clock size={26} strokeWidth={1.3} className="text-clay" />
              <span className="rounded-sm border border-line px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-muted">
                Tasques concretes
              </span>
            </div>
            <h3 className="mt-8 text-[25px] min-[641px]:text-[27px] leading-[1.16] tracking-[-0.035em]">Per hores</h3>
            <p className="mt-3 max-w-[460px] text-[15px] min-[641px]:text-[14.5px] leading-[1.8] text-muted">
              Pagues només el temps que necessites. Una opció flexible per a tasques puntuals o per ajustar la neteja al que
              tens entre mans.
            </p>

            <ul className="mt-8">
              {[
                ["Preu per hora", "18 €/h"],
                ["Reserva mínima", "2 hores"],
                ["Increments", "De 30 en 30 minuts"],
              ].map(([k, v]) => (
                <li key={k} className="flex items-center justify-between border-b border-line py-4 first:border-t">
                  <span className="text-[15px] text-ink/85">{k}</span>
                  <span className="text-[16px] text-ink">{v}</span>
                </li>
              ))}
            </ul>

            <ul className="mt-6 space-y-3">
              {["Tu decideixes en què s'inverteix el temps", "Ideal per a estades curtes o retocs", "Ajustable a cada visita"].map((t) => (
                <li key={t} className="flex items-center gap-3.5 text-[14px] text-muted">
                  <Check size={15} strokeWidth={1.5} className="text-clay" />
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-10">
              <Btn variant="outline" href="#calculadora" arrow className="w-full">
                Calcula el teu preu
              </Btn>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
