"use client"

import FallingSandOverlay from "../FallingSand"
import SponsorOverlay from "./sponsorOverlay"

export default function HeroSection() {

  return (
    <>
      <section className="relative h-lvh overflow-clip z-[100] shadow-2xl">
        <section className={`title-type h-full relative antialiased leading-quart flex flex-col justify-center items-center`}>
          <FallingSandOverlay />
          <SponsorOverlay />
        </section>
      </section>
    </>
  )
}