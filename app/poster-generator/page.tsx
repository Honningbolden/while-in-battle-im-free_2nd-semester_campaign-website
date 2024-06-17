import FallingSandPosterGenerator from "../components/FallingSand Poster-Generator"

export default function PosterGenerator() {
  return (
    // <main className="relative h-screen flex justify-center m-20">
    <section className="relative z-[100]">
      <section className={`title-type antialiased leading-quart h-screen flex flex-col`}>
        <FallingSandPosterGenerator />
      </section>
    </section>
    // </main>
  )
}