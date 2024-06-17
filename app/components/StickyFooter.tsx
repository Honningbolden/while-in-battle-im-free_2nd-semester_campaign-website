import Content from "../Sections/ticketInformation"

export default function StickyFooter({ contentData }: any) {
  const footerHeight = 400;
  return (
    <div
      className={`relative h-[${footerHeight}px]`}
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%" }}
    >
      <div className={`relative h-[calc(100vh+${footerHeight}px)] -top-[100vh]`}>
        <div className={`h-[${footerHeight}px] sticky top-[calc(100vh-${footerHeight}px)]`}>
          <Content content={contentData}/>
        </div>
      </div>
    </div>
  )
}