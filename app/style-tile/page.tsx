import FallingSandStyleTile from "../components/FallingSand_Style-Tile-Generator"

export default function StyleTile() {
  return (
    <section className="relative z-[100]">
      <section className={`title-type antialiased leading-quart h-screen flex flex-col`}>
        <FallingSandStyleTile />
      </section>
    </section>
  )
}