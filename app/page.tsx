import HeroSection from "./Sections/hero";
import TicketInformation from "./Sections/ticketInformation";
import TeaserDescription from "./Sections/teaserDescription";


async function fetchContentJSON() {
  const baseUrl = 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/cms/content.json`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error('Failed to fetch content');
  }
  return data;
}

export default async function Home() {
  const { ticketInformation } = await fetchContentJSON();

  return (
    <>
      <main>
        <HeroSection />
        <TicketInformation content={ticketInformation}/>
        <TeaserDescription/>
      </main>
    </>
  );
}
