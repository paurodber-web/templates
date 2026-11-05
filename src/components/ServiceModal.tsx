import { useEffect, useRef } from "preact/hooks";
import { Check, Clock, Info, Target, Users, X } from "lucide-preact";
import type { Service } from "../data";

export default function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sin ocultar la barra de scroll de la página (evita el "shift"):
    // bloqueamos el scroll de fondo interceptando rueda/táctil fuera del modal.
    const overlay = overlayRef.current!;
    const guard = (e: Event) => {
      if (!panelRef.current?.contains(e.target as Node)) e.preventDefault();
    };
    overlay.addEventListener("wheel", guard, { passive: false });
    overlay.addEventListener("touchmove", guard, { passive: false });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Home", "End"].includes(e.key)) {
        const t = e.target as HTMLElement;
        if (!panelRef.current?.contains(t) || t === document.body) {
          panelRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus({ preventScroll: true });
    return () => {
      overlay.removeEventListener("wheel", guard);
      overlay.removeEventListener("touchmove", guard);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const goTo = (hash: string) => {
    onClose();
    setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  return (
    <div
      ref={overlayRef}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      className="anim-fade fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-[3px] sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={service.name}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className="anim-modal modal-scroll relative max-h-full w-full max-w-[864px] overflow-y-auto overscroll-contain rounded-md bg-white outline-none"
      >
        {/* Cabecera con imagen */}
        <div className="relative h-[230px] overflow-hidden bg-ink sm:h-[254px]">
          <img src={service.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/0" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Tancar"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-sm bg-white text-ink transition-colors hover:bg-sand"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
          <div className="absolute bottom-7 left-7 right-7 sm:left-9">
            <p className="text-[12px] uppercase tracking-[0.24em] text-clay-soft">
              {service.index} · {service.category}
            </p>
            <h3 className="mt-3 text-[2rem] leading-tight tracking-[-0.02em] text-white sm:text-[2.3rem]">{service.name}</h3>
          </div>
        </div>

        {/* Cuerpo */}
        <div className="px-7 pb-9 pt-9 sm:px-10 sm:pt-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:gap-10">
            <p className="max-w-[540px] text-[15.5px] leading-[1.85] text-muted">{service.long}</p>
            <div className="shrink-0 sm:text-right">
              <p className="text-[11.5px] uppercase tracking-[0.22em] text-muted">Preu des de</p>
              <p className="mt-1.5 text-[2.1rem] leading-none tracking-[-0.02em]">{service.price} €</p>
            </div>
          </div>

          {/* Datos clave */}
          <div className="mt-9 grid overflow-hidden rounded-md border border-line sm:grid-cols-3">
            {[
              { i: Clock, l: "Durada", v: service.duration },
              { i: Users, l: "Equip", v: service.team },
              { i: Target, l: "Ideal per a", v: service.ideal },
            ].map(({ i: I, l, v }) => (
              <div
                key={l}
                className="flex items-start gap-4 border-b border-line px-6 py-5 last:border-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
              >
                <I size={20} strokeWidth={1.3} className="mt-0.5 shrink-0 text-clay/80" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{l}</p>
                  <p className="mt-1.5 text-[15px] text-ink">{v}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Listas */}
          <div className="mt-10 grid gap-10 md:grid-cols-[1.5fr_1fr] md:gap-14">
            <div>
              <p className="text-[12px] uppercase tracking-[0.24em] text-clay">Què inclou</p>
              <ul className="mt-5">
                {service.includes.map((t) => (
                  <li key={t} className="flex items-center gap-4 border-b border-line py-3.5 text-[15px] text-ink/85 last:border-0">
                    <Check size={16} strokeWidth={1.5} className="shrink-0 text-clay" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[12px] uppercase tracking-[0.24em] text-muted">No inclou</p>
              <ul className="mt-5">
                {service.excludes.map((t) => (
                  <li key={t} className="flex items-center gap-4 border-b border-line py-3.5 text-[15px] text-ink/80 last:border-0">
                    <X size={15} strokeWidth={1.4} className="shrink-0 text-muted/70" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex gap-3.5 rounded-md bg-sand p-5 text-[14px] leading-[1.7] text-muted">
                <Info size={16} strokeWidth={1.4} className="mt-1 shrink-0 text-clay" />
                {service.note}
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="mt-10 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[14px] text-muted">Preu tancat i sense sorpreses. Te'l confirmem abans de reservar.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => goTo("#calculadora")}
                className="rounded-sm border border-ink/20 px-6 py-3.5 text-[14px] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
              >
                Calcula el teu preu
              </button>
              <button
                onClick={() => goTo("#reserva")}
                className="rounded-sm border border-ink bg-ink px-6 py-3.5 text-[14px] text-white transition-colors hover:bg-ink-soft"
              >
                Reserva aquest servei
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
