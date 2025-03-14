import HeroSection from './components/Sections/heroSection';
import TicketInformation from './components/Sections/ticketInformation';
import TeaserDescription from './components/Sections/teaserDescription';
import AboutSection from './components/Sections/AboutSection';
import ParallaxBackground from './components/ParallaxBackground';
import StickyFooter from './components/StickyFooter';

async function fetchContentJSON() {
  try {
    const res = await fetch(`/cms/content.json`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch content');
    }
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch content:', error);
    throw new Error('Failed to fetch content');
  }
}

export default async function Home() {
  const { ticketInformation, aboutContent } = await fetchContentJSON();

  return (
    <>
      <main className='relative overflow-x-clip'>
        <ParallaxBackground />
        <AboutSection aboutContent={aboutContent} />
        <HeroSection />
        <StickyFooter contentData={ticketInformation} />
      </main>
    </>
  );
}
