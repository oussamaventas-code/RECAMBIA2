import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Mostrador } from "@/components/home/Mostrador";
import { CategoryIndex } from "@/components/home/CategoryIndex";
import { PopularParts } from "@/components/home/PopularParts";
import { CounterNotes } from "@/components/home/CounterNotes";
import { PromoBanner } from "@/components/home/PromoBanner";
import { TrustStrip } from "@/components/home/TrustStrip";
import { WorkshopMap } from "@/components/talleres/WorkshopMap";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <PromoBanner />
        <Mostrador />
        <TrustStrip />
        <CategoryIndex />
        <PopularParts />
        <WorkshopMap />
        <CounterNotes />
      </main>
      <Footer />
    </>
  );
}
