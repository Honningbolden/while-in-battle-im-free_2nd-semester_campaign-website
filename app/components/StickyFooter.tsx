import Content from "@/app/components/Sections/ticketInformation"
import ImageGallery from "./ImageGallery";
import SwipeImageGallery from "./SwipeImageGallery";

export default function StickyFooter({ contentData }: any) {
  const footerHeight = 95;
  return (
    <div className="overflow-clip"
      style={{
        position: 'relative',
        height: `${footerHeight}vh`,
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%"
      }}
    >
      <div className="overflow-visible"
        style={{
          position: 'relative',
          height: `calc(100vh + ${footerHeight}vh)`,
          top: `-100vh`,
        }}>
        <div className="overflow-visible"
          style={{
            height: `${footerHeight}vh`,
            position: 'sticky',
            top: `calc(100vh - ${footerHeight}vh)`,
          }}>
          <div id="background" className="absolute -top-10 left-0 h-[200%] w-[120%] bg-black -z-10" />
          <div id="test" className="h-full flex flex-col justify-evenly items-center">
            <div className="h-4/5 w-2/3 flex flex-row justify-center items-center overflow-hidden">
              <div className="w-2/3 flex flex-col gap-16">
                <div className="flex flex-col">
                  <h1 className="text-neutral-800 title-type text-xl leading-none">
                    Metropolis præsenterer
                  </h1>
                  <h1 className="text-white title-type text-5xl mb-2 leading-none">
                    While In Battle I'm Free, Never Free To Rest
                  </h1>
                  <h1 className="text-neutral-700 title-type text-lg justify-self-end leading-none line-clamp-1">
                    En koreografi af Hooman Sharifi, i samarbejde med Cullberg
                  </h1>
                  {/* <p className="text-white body-text text-lg">
                    10 dansere fra Cullberg indtager en byens mest mangfoldige pladser med 10 dansere fra gadenmiljøet. Med Sharifis koreografi og Nada Sanais soundtrack af dekonstrueret iransk folkemusik opstår et rum, hvor forskelligheder kan trives og udfolde sig med hinanden.
                  </p> */}
                </div>
                {/* <div className="flex flex-row gap-8">
                  <div className="flex flex-col w-full">
                    <p className="text-neutral-400 body-text italic text- leading-relaxed">"Verdensklasse, når Cullberg opskalerer… Cullberg har skabt et værk at møde mange med; det er stort, stærkt, smukt og nuancerer alle udsagn om at høre hjemme og høre til. Urdans, verdensdans, verdensklasse."</p>
                    <h6 className="body-text text-base text-neutral-600 italic text-start">Ekspressen</h6>
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="text-neutral-400 body-text italic text- leading-relaxed">"… a feeling of quiet euphoria arises. A small step for our audience affinity, a big one for Hoomanism."</p>
                    <h6 className="body-text text-base text-neutral-600 italic text-start">Aftonbladet</h6>
                  </div>
                </div> */}
              </div>
              <SwipeImageGallery />
            </div>
            <div className="w-4/5 h-0.5 rounded-full bg-neutral-500" />
            <Content content={contentData} />
          </div>
        </div>
      </div>
    </div>
  )
}