import Content from "@/app/components/Sections/ticketInformation"
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
          <div className="relative h-full flex flex-col justify-evenly items-center">
            <div className="h-full hidden lg:flex flex-col justify-center items-center">
              <div className="h-full xl:h-4/5 w-3/4 2xl:w-2/3 flex lg:gap-2 flex-col lg:flex-row justify-center items-center overflow-hidden">
                <div className="w-full flex flex-col gap-16">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-neutral-800 title-type text-xl leading-none">
                      Metropolis præsenterer
                    </h1>
                    <h1 className="text-white title-type ~text-3xl/5xl mb-2 leading-none z-50 shrink-0 line-clamp-2 text-balance">
                      While In Battle I'm Free, Never Free To Rest
                    </h1>
                    <h1 className="text-neutral-700 title-type text-base justify-self-end leading-snug max-w-60">
                      En koreografi af Hooman Sharifi i samarbejde med Cullberg
                    </h1>
                  </div>
                </div>
                <SwipeImageGallery />
              </div>
            </div>
            <div className="hidden lg:block w-4/5 h-0.5 rounded-full bg-neutral-500" />
            <Content content={contentData} />
          </div>
        </div>
      </div>
    </div>
  )
}