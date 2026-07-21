import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Mostrador } from "@/components/home/Mostrador";
import { ConseguimosPieza } from "@/components/home/ConseguimosPieza";
import { CounterNotes } from "@/components/home/CounterNotes";
import { TrustStrip } from "@/components/home/TrustStrip";
import { HowItWorks } from "@/components/home/HowItWorks";
import { MechanicAdvisory } from "@/components/home/MechanicAdvisory";
import { PorQueRecambia } from "@/components/home/PorQueRecambia";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustMetrics } from "@/components/home/TrustMetrics";
import { DescuentoEmail } from "@/components/home/DescuentoEmail";
import { GarantiaVideo } from "@/components/home/GarantiaVideo";
import { ExitIntentPopup } from "@/components/marketing/ExitIntentPopup";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Mostrador />
        <TrustStrip />
        <PorQueRecambia />
        {/* Reseñas reales: aparece solo cuando testimonials.ts tenga datos */}
        <Testimonials />
        <HowItWorks />
        <ConseguimosPieza />
        <TrustMetrics />
        <MechanicAdvisory />
        <DescuentoEmail />
        <GarantiaVideo />
        <CounterNotes />
      </main>
      <Footer />
      <ExitIntentPopup />
    </>
  );
}
