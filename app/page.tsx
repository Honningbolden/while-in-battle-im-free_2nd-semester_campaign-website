import HeroSection from "./Sections/heroSection";
import TicketInformation from "./Sections/ticketInformation";
import TeaserDescription from "./Sections/teaserDescription";
import AboutSection from "./Sections/AboutSection";


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
      <main>
        <AboutSection aboutContent={aboutContent} />
        <HeroSection />
        <TicketInformation content={ticketInformation} />
        <TeaserDescription />
      </main>
    </>
  );
}
