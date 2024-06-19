import Content from "@/app/components/Sections/ticketInformation"
import ImageGallery from "./ImageGallery";

export default function StickyFooter({ contentData }: any) {
  const footerHeight = 30;
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
          <div id="test" className="h-full flex flex-col justify-center">
            <Content content={contentData} />
          </div>
        </div>
      </div>
    </div>
  )
}