import HeroSection from "./components/Sections/heroSection";
import TicketInformation from "./components/Sections/ticketInformation";
import TeaserDescription from "./components/Sections/teaserDescription";
import AboutSection from "./components/Sections/AboutSection";
import ParallaxBackground from "./components/ParallaxBackground";
import StickyFooter from "./components/StickyFooter";
import ImageGallery from "./components/ImageGallery";

async function fetchContentJSON() {
  const baseUrl = 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/cms/content.json`, { cache: 'no-store' });
  const data = await res.json();
  if (!res.ok) {
    throw new Error('Failed to fetch content');
  }

  return data;
}

export default async function Home() {
  const { ticketInformation, aboutContent } = await fetchContentJSON();


  return (
    <>
      <main className="relative overflow-x-clip">
        <ParallaxBackground/>
        <AboutSection aboutContent={aboutContent} />
        <HeroSection />
        <StickyFooter contentData={ticketInformation}/>
        <ImageGallery/>
      </main>
    </>
  );
}
