import { useCallback, useState } from "preact/hooks";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Defining from "./components/Defining";
import Quote from "./components/Quote";
import Pricing from "./components/Pricing";
import Frequencies from "./components/Frequencies";
import HowItWorks from "./components/HowItWorks";
import Hygiene from "./components/Hygiene";
import Coverage from "./components/Coverage";
import Guarantee from "./components/Guarantee";
import Faq from "./components/Faq";
import Blog from "./components/Blog";
import { Cta, Footer } from "./components/CtaFooter";
import ServiceModal from "./components/ServiceModal";
import type { Service } from "./data";

export default function App() {
  const [active, setActive] = useState<Service | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <Header />
      <main>
        <Hero />
        <About /> {/* blanco */}
        <Services onOpen={setActive} /> {/* arena */}
        <Defining /> {/* blanco */}
        <Quote /> {/* imagen */}
        <Pricing /> {/* blanco */}
        <Frequencies /> {/* arena */}
        <HowItWorks /> {/* blanco */}
        <Hygiene /> {/* arena */}
        <Coverage /> {/* blanco */}
        <Guarantee /> {/* azul */}
        <Faq /> {/* blanco */}
        <Blog /> {/* arena */}
        <Cta /> {/* imagen */}
      </main>
      <Footer />
      {active && <ServiceModal service={active} onClose={close} />}
    </div>
  );
}
