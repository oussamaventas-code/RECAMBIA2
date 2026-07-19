import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Mostrador } from "@/components/home/Mostrador";
import { BrandIndex } from "@/components/home/BrandIndex";
import { CategoryIndex } from "@/components/home/CategoryIndex";
import { Packs } from "@/components/home/Packs";
import { ConseguimosPieza } from "@/components/home/ConseguimosPieza";
import { CounterNotes } from "@/components/home/CounterNotes";
import { TrustStrip } from "@/components/home/TrustStrip";
import { HowItWorks } from "@/components/home/HowItWorks";
import { MechanicAdvisory } from "@/components/home/MechanicAdvisory";
import { DeliveryServices } from "@/components/home/DeliveryServices";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Mostrador />
        <TrustStrip />
        <BrandIndex />
        <HowItWorks />
        <CategoryIndex />
        <Packs />
        <ConseguimosPieza />
        <MechanicAdvisory />
        <DeliveryServices />
        <CounterNotes />
      </main>
      <Footer />
    </>
  );
}
