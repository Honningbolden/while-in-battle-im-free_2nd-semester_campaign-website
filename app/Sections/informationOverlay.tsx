import styles from "../styles/informationOverlay.module.css"
import ParallaxText from "../components/ParallaxText"

export default function InformationOverlay() {
  return (
    <>
      <div className={`${styles.clippy} h-[65vh] w-[65vh] absolute -top-20 -right-0 bg-blue-600`}>
        <div className="fixed top-0 left-0 w-screen h-80 ">
          <div className="body-text text-2xl text-white gap-4">
            <ParallaxText baseVelocity={-5} rows={3}>Læs mere</ParallaxText>
            <ParallaxText baseVelocity={5} rows={3}>Læs mere</ParallaxText>
            <ParallaxText baseVelocity={-5} rows={3}>Læs mere</ParallaxText>
            <ParallaxText baseVelocity={5} rows={3}>Læs mere</ParallaxText>
          </div>
        </div>
      </div>
      <svg className="absolute">
        <clipPath id="heroClipPath" clipPathUnits="objectBoundingBox">
          <path d="M0.19511 0.250989C0.097433 0.215836 -0.000244141 0.127986 -0.000244141 0H0.999969V0.250989V0.694885C0.999969 0.694885 0.894684 0.673828 0.842041 0.568542C0.789398 0.463257 0.77887 0.389557 0.568298 0.315857C0.357727 0.242157 0.292787 0.286142 0.19511 0.250989Z" fill="#1400FF" />
        </clipPath>
      </svg>
    </>
  )
}