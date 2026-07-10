import Hero from "@/components/Hero";
import IntroSection from "@/components/IntroSection";
import TreatmentsMenu from "@/components/TreatmentsMenu";
import BookingSection from "@/components/BookingSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <IntroSection />
        <TreatmentsMenu />
        <BookingSection />
        <LocationSection />
      </main>
      <Footer />
    </>
  );
}
