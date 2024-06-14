import HeroSection from "./Sections/hero";
import InformationOverlay from "./Sections/infoOverlay";

export default function Home() {

  return (
    <>
      <InformationOverlay />
      <main>
        <HeroSection />
      </main>
    </>
  );
}
