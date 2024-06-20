"use client"

import FallingSandOverlay from "../FallingSand"
import SponsorOverlay from "./sponsorOverlay"

export default function HeroSection() {

  return (
    <>
      <section className="relative z-[100] shadow-2xl">
        <section className={`title-type relative antialiased leading-quart h-screen flex flex-col justify-center items-center`}>
          <FallingSandOverlay />
          <SponsorOverlay />
        </section>
      </section>
    </>
  )
}