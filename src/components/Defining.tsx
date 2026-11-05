import { Eye, FileText, Heart, ShieldCheck } from "lucide-preact";
import { Accent, ConceptCard, Container, SectionHead } from "./ui";

const ITEMS = [
  {
    n: "01",
    icon: ShieldCheck,
    title: "Confiança contrastada",
    text: "Un equip estable i de confiança, que coneix la teva casa i les teves preferències, visita rere visita.",
  },
  {
    n: "02",
    icon: Eye,
    title: "Atenció al detall",
    text: "Seguim un mètode fix que cobreix cada racó. Cap punt crític queda sense revisar.",
  },
  {
    n: "03",
    icon: FileText,
    title: "Transparència total",
    text: "Expliquem què inclou cada servei i quant costa abans de reservar. Sense lletra petita.",
  },
  {
    n: "04",
    icon: Heart,
    title: "Respecte per la teva llar",
    text: "Adaptem productes i mètodes a cada superfície i tractem casa teva com si fos nostra.",
  },
];

export default function Defining() {
  return (
    <section className="bg-white py-24 md:py-32">
      <Container>
        <SectionHead
          eyebrow="El que ens defineix"
          title={
            <>
              Quatre principis. <Accent>Per cuidar casa teva.</Accent>
            </>
          }
          desc="No són una declaració de principis: són la manera concreta com treballem cada dia a casa teva."
        />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <ConceptCard key={item.n} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
