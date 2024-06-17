import Content from "../Sections/ticketInformation"

export default function StickyFooter({ contentData }: any) {
  return (
    <div
      className="relative h-[250px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%" }}
    >
      <div className="fixed bottom-0 h-[250px] w-full">
        <Content content={contentData} />
      </div>
    </div>
  )
}