import FallingSandPosterGenerator from "../components/FallingSand Poster-Generator"

export default function PosterGenerator() {
  return (
    <section className="relative z-[100]">
      <section className={`title-type antialiased leading-quart h-screen flex flex-col`}>
        <FallingSandPosterGenerator />
      </section>
    </section>
  )
}