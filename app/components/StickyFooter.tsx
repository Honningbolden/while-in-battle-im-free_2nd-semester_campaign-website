import Content from "@/app/components/Sections/ticketInformation"

export default function StickyFooter({ contentData }: any) {
  const footerHeight = 300;
  return (
    <div className="overflow-visible"
      style={{
        position: 'relative',
        height: `${footerHeight}px`,
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%"
      }}
    >
      <div className="overflow-visible"
        style={{
          position: 'relative',
          height: `calc(100vh + ${footerHeight}px)`,
          top: `-100vh`,
        }}>
        <div className="overflow-visible"
          style={{
            height: `${footerHeight}px`,
            position: 'sticky',
            top: `calc(100vh - ${footerHeight}px)`,
          }}>
          <div id="background" className="absolute -top-10 left-0 h-[200%] w-[120%] bg-slate-950 -z-10" />
          <Content content={contentData} />
        </div>
      </div>
    </div>
  )
}