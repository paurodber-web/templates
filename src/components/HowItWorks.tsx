import { Calculator, CalendarCheck, ClipboardCheck, HelpCircle, Sparkles } from "lucide-preact";
import { Accent, ConceptCard, Container, SectionHead } from "./ui";

const STEPS = [
  {
    n: "01",
    icon: Calculator,
    title: "Coneix el preu",
    text: "Calcula el preu a partir de la superfície i del tipus de neteja. Sense compromís i sense sorpreses.",
    caption: "Resultat immediat",
  },
  {
    n: "02",
    icon: CalendarCheck,
    title: "Reserva el servei",
    text: "Tria entre les dates i franges disponibles. Explica'ns com accedir a casa i qualsevol indicació.",
    caption: "En menys de 2 minuts",
  },
  {
    n: "03",
    icon: Sparkles,
    title: "Cuidem casa teva",
    text: "L'equip arriba puntual amb tot el material i segueix el mètode de sempre, estança per estança.",
    caption: "Mètode pas a pas",
  },
  {
    n: "04",
    icon: ClipboardCheck,
    title: "Revisem el resultat",
    text: "Repassem el resultat plegats. Si alguna cosa no et convenç, ho arreglem durant les 48 h següents.",
    caption: "Garantia de 48 h",
  },
];

export default function HowItWorks() {
  return (
    <section id="com-funciona" className="bg-white py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="Com funciona"
          title={
            <>
              Reservar és fàcil. <Accent>I tot queda a punt.</Accent>
            </>
          }
          desc="Un procés pensat perquè sempre sàpigues què passa després i què pots esperar de nosaltres."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <ConceptCard key={step.n} {...step} process />
          ))}
        </div>

        <div className="mt-6 flex gap-5 rounded-md border border-line bg-sand p-6 md:items-center md:p-7">
          <HelpCircle size={22} strokeWidth={1.3} className="mt-0.5 shrink-0 text-clay md:mt-0" />
          <p className="text-[14.5px] leading-[1.75] text-muted">
            <span className="text-ink">Per què et demanem uns detalls abans de la visita?</span> Perquè el preu sigui tancat i
            correcte necessitem saber la superfície i l'estat de la casa. Així evitem sorpreses d'última hora, per a tots dos.
          </p>
        </div>
      </Container>
    </section>
  );
}
