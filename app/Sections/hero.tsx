import styles from "../styles/hero.module.css"

export default function HeroSection() {
  return (
    <>
      <section className={`title-type antialiased leading-quart h-screen flex flex-col justify-center items-center`}>
        <div className={`flex flex-col justify-center items-center`}>
          <h1 className={`${styles.top} font-medium`}>While In Battle I'm Free,</h1>
          <h1 className={`${styles.bottom} font-medium`}>Never Free to Rest</h1>
          <div className="subtitle-type mt-10 -mb-24 flex flex-col items-center gap-4 opacity-25">
            <p className="title-type text-2xl font-medium uppercase">Rooted in resistance & coexistance</p>
            <span className="w-2/3">
              <p className="text-balance text-center leading-tight text-lg opacity-75">A performance about the necessity to stand for something that can be taken away from you</p>
            </span>
          </div>
        </div>
      </section>
    </>
  )
}