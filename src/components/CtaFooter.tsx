import { BadgeCheck, Home, Mail, MapPin, Phone, ShieldCheck, Clock } from "lucide-preact";
import { Accent, Btn, Container } from "./ui";
import { IMG } from "../data";

export function Cta() {
  return (
    <section id="reserva" className="relative w-full overflow-hidden bg-ink py-28 text-white md:py-40">
      <img src={IMG.cta} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-ink/70" />
      <Container className="relative">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="text-[13px] uppercase tracking-[0.3em] text-clay-soft">Neteja de la llar · Calma</p>
          <h2 className="cta-heading mt-7 text-[2rem] min-[360px]:text-[2.1rem] min-[414px]:text-[2.3rem] leading-[1.16] tracking-[-0.035em]">
            Neteja a punt. <Accent light>I més temps per a tu.</Accent>
          </h2>
          <p className="mx-auto mt-7 max-w-[520px] text-[17px] md:text-[18px] leading-[1.8] text-white/70">
            Tens tot el que necessites per començar: consulta el preu en un minut i reserva quan et vagi bé.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Btn variant="light" href="mailto:hola@elsetecel.cat" arrow>
              Prepara la teva reserva
            </Btn>
            <Btn variant="outline-light" href="#calculadora">
              Calcula el teu preu
            </Btn>
          </div>
          <p className="mt-8 text-[14px] text-white/60">
            o escriu-nos a{" "}
            <a href="mailto:hola@elsetecel.cat" className="border-b border-white/30 pb-0.5 text-white transition-colors hover:border-white">
              hola@elsetecel.cat
            </a>
          </p>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 border-t border-white/20 pt-8 text-[12px] uppercase tracking-[0.2em] text-white/60">
            {[
              { i: BadgeCheck, t: "Preu clar" },
              { i: ShieldCheck, t: "Garantia 48 h" },
              { i: Clock, t: "Reserva en 2 minuts" },
            ].map(({ i: I, t }) => (
              <span key={t} className="flex items-center gap-2.5">
                <I size={15} strokeWidth={1.4} className="text-clay-soft" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

const footerColumns = (homePath: string) => [
  {
    title: "Serveis",
    links: [
      ["Neteja estàndard", `${homePath}#serveis`],
      ["Neteja profunda", `${homePath}#serveis`],
      ["Neteja per a mudances", `${homePath}#serveis`],
      ["Preu tancat o per hores", `${homePath}#preus`],
    ],
  },
  {
    title: "Empresa",
    links: [
      ["Sobre nosaltres", `${homePath || './'}sobre-nosaltres/`],
      ["Com funciona", `${homePath}#com-funciona`],
      ["Freqüències", `${homePath}#frequencies`],
      ["Garantia", `${homePath}#garantia`],
    ],
  },
  {
    title: "Ajuda",
    links: [
      ["Preguntes freqüents", `${homePath}#faq`],
      ["Cobertura", `${homePath}#cobertura`],
      ["Consells de la llar", `${homePath}#blog`],
      ["Política de contaminació creuada", `${homePath}#higiene`],
    ],
  },
];

export function Footer({ homePath = '' }: { homePath?: string }) {
  return (
    <footer id="contacte" className="bg-[#161c2c] text-white">
      <Container className="pb-8 pt-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <a href={`${homePath}#top`} className="flex items-center gap-3.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-md border border-white/25 text-white">
                <Home size={19} strokeWidth={1.4} />
              </span>
              <span className="leading-none">
                <span className="block text-[18px] tracking-[-0.01em]">El Quart Desig</span>
                <span className="mt-1.5 block text-[10px] uppercase tracking-[0.26em] text-white/50">Neteja de la llar</span>
              </span>
            </a>
            <p className="mt-7 max-w-[320px] text-[13px] leading-[1.8] text-white/60">
              Neteja professional de la llar amb mètode, preu tancat i un tracte proper.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            {footerColumns(homePath).map((c) => (
              <div key={c.title}>
                <p className="text-[12px] uppercase tracking-[0.24em] text-clay-soft">{c.title}</p>
                <ul className="mt-6 space-y-3.5">
                  {c.links.map(([l, h]) => (
                    <li key={l}>
                      <a href={h} className="text-[12.5px] text-white/65 transition-colors hover:text-white">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="text-[12px] uppercase tracking-[0.24em] text-clay-soft">Contacte</p>
              <ul className="mt-6 space-y-3.5 text-[12.5px] text-white/65">
                <li className="flex items-start gap-3">
                  <Mail size={15} strokeWidth={1.4} className="mt-0.5 shrink-0 text-clay-soft" />
                  hola@elsetecel.cat
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={15} strokeWidth={1.4} className="mt-0.5 shrink-0 text-clay-soft" />
                  +34 600 000 000
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={15} strokeWidth={1.4} className="mt-0.5 shrink-0 text-clay-soft" />
                  Dl – Dv, 8:00 – 19:00
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={15} strokeWidth={1.4} className="mt-0.5 shrink-0 text-clay-soft" />
                  Osona
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/15 pt-7 text-[10.5px] text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} El Quart Desig. Tots els drets reservats.</p>
          <div className="flex gap-7">
            <a href={`${homePath}#top`} className="transition-colors hover:text-white">Avís legal</a>
            <a href={`${homePath}#top`} className="transition-colors hover:text-white">Privacitat</a>
            <a href={`${homePath}#top`} className="transition-colors hover:text-white">Cookies</a>
          </div>
        </div>
      </Container>
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden text-center">
        <div className="translate-y-[28%] whitespace-nowrap text-[clamp(3rem,11vw,10rem)] leading-[0.8] tracking-[-0.06em] text-white/15">
          EL QUART DESIG
        </div>
      </div>
    </footer>
  );
}
