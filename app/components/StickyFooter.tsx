import Content from "@/app/components/Sections/ticketInformation"
import styles from "@/app/styles/footer.module.css"
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
          <div className="relative h-full flex flex-col justify-evenly items-center">
            <div className="h-full flex flex-col justify-evenly items-center">

              {/* <div className={`${styles.clippy} absolute -top-52 -left-52 h-[60vh] w-[60vh] bg-primary-blue z-0 overflow-hidden mix-blend-screen`}/> */}

              <div className="h-4/5 w-2/3 flex flex-row justify-center items-center overflow-hidden">
                <div className="w-2/3 flex flex-col gap-16">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-neutral-800 title-type text-xl leading-none">
                      Metropolis præsenterer
                    </h1>
                    <h1 className="text-white title-type text-5xl mb-2 leading-none z-50">
                      While In Battle I'm Free, Never Free To Rest
                    </h1>
                    <h1 className="text-neutral-700 title-type text-base justify-self-end leading-snug max-w-60">
                      En koreografi af Hooman Sharifi i samarbejde med Cullberg
                    </h1>
                  </div>
                </div>
                <SwipeImageGallery />
              </div></div>
            <div className="w-4/5 h-0.5 rounded-full bg-neutral-500" />
            <Content content={contentData} />
          </div>

          <svg width="1" height="1" viewBox="0 0 1 1" fill="none" xmlns="http://www.w3.org/2000/svg">
            <clipPath id="footerBlob" clipPathUnits="objectBoundingBox">
              <path d="M0.581106 0.968065C0.411995 0.877935 0.398375 0.731056 0.104418 0.816179C0.0630602 0.828155 0.0296082 0.840252 0 0.85123V0H0.762702C0.881726 0.201766 0.785329 0.289022 0.920463 0.504062C1.04213 0.697675 0.996506 0.727718 0.963592 0.856237C0.930678 0.984756 0.716395 1.04017 0.581106 0.968065Z" fill="#D9D9D9" />
            </clipPath>
          </svg>
        </div>
      </div>
    </div>
  )
}