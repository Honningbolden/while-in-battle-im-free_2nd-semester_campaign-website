import Content from "@/app/components/Sections/ticketInformation"
import ImageGallery from "./ImageGallery";
import SwipeImageGallery from "./SwipeImageGallery";

export default function StickyFooter({ contentData }: any) {
  const footerHeight = 95;
  return (
    <div className="overflow-visible"
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
            <div className="h-4/5 w-2/3 flex flex-row justify-center items-center">
              <div className="w-2/3">
                <h1 className="text-neutral-800 title-type text-xl">
                  Metropolis præsenterer
                </h1>
                <h1 className="text-white title-type text-6xl mb-2">
                  While In Battle I'm Free, Never Free To Rest
                </h1>
                <h1 className="text-neutral-700 title-type text-xl justify-self-end">
                  En koreografi af Hooman Sharifi
                </h1>

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