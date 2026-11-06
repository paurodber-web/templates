import { useEffect, useState } from "preact/hooks";
import { Home, Menu, X } from "lucide-preact";
import { Container } from "./ui";
import { siteNavigation } from "../navigation";

export default function Header({ homePath = '', currentPage = '' }: { homePath?: string; currentPage?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const nav = siteNavigation(homePath);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        solid ? "border-b border-line bg-white shadow-[0_1px_0_rgba(27,35,54,0.02)]" : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container className="flex h-[76px] items-center justify-between gap-6">
        <a href={`${homePath}#top`} className="flex items-center gap-3.5">
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-md border transition-colors duration-500 ${
              solid ? "border-line bg-white text-ink" : "border-white/35 bg-white/5 text-white"
            }`}
          >
            <Home size={19} strokeWidth={1.4} />
          </span>
          <span className="leading-none">
            <span className={`block text-[18px] tracking-[-0.01em] transition-colors duration-500 ${solid ? "text-ink" : "text-white"}`}>
              El Quart Desig
            </span>
            <span className={`mt-1.5 block text-[10px] uppercase tracking-[0.26em] transition-colors duration-500 ${solid ? "text-muted" : "text-white/60"}`}>
              Neteja de la llar
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              aria-current={currentPage === 'about' && n.label === 'Sobre nosaltres' ? 'page' : undefined}
              className={`text-[13px] tracking-[0.035em] transition-colors duration-300 ${
                solid ? "text-ink/75 hover:text-ink" : "text-white/80 hover:text-white"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`${homePath}#reserva`}
            className={`hidden rounded-sm px-6 py-3 text-[14px] transition-colors duration-500 sm:inline-flex ${
              solid ? "bg-ink text-white hover:bg-ink-soft" : "bg-white text-ink hover:bg-sand"
            }`}
          >
            Reserva
          </a>
          <button
            aria-label="Menú"
            aria-expanded={open}
            aria-controls="site-mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className={`flex h-11 w-11 items-center justify-center rounded-md border lg:hidden ${
              solid ? "border-line text-ink" : "border-white/35 text-white"
            }`}
          >
            {open ? <X size={19} strokeWidth={1.4} /> : <Menu size={19} strokeWidth={1.4} />}
          </button>
        </div>
      </Container>

      {open && (
        <div id="site-mobile-menu" className="border-t border-line bg-white lg:hidden">
          <Container className="flex flex-col py-3">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                aria-current={currentPage === 'about' && n.label === 'Sobre nosaltres' ? 'page' : undefined}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 text-[15px] text-ink last:border-0"
              >
                {n.label}
              </a>
            ))}
            <a
              href={`${homePath}#reserva`}
              onClick={() => setOpen(false)}
              className="my-4 rounded-sm bg-ink py-3.5 text-center text-[14px] text-white"
            >
              Reserva
            </a>
          </Container>
        </div>
      )}
    </header>
  );
}
