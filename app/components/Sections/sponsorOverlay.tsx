"use client";

// import styles from "@/app/styles/informationOverlay.module.css"
import styles from "@/app/styles/SponsorOverlay.module.css"
import ParallaxText from "../ParallaxText";
import { useEffect, useRef, useState } from "react";

export default function SponsorOverlay() {
  const openLink = () => window.location.href = "https://www.metropolis.dk";

  return (
    <>
      <div onClick={openLink} className={`${styles.clippy} z-[200] overflow-hidden cursor-pointer h-[20vh] w-[74vh] absolute bottom-0 left-0 bg-primary-blue mix-blend-normal stroke-black stroke-2 hover:bg-blue-500 transition-colors`}>
        <div className="absolute bottom-0 left-0 w-screen h-full ">
          <div className="h-full body-text text-xl font-bold text-primary-white gap-4 flex flex-col items-center justify-start">
            <ParallaxText baseVelocity={-1} rows={1}>Præsenteres af Metropolis</ParallaxText>
            <ParallaxText baseVelocity={1} rows={1}>Præsenteres af Metropolis</ParallaxText>
            <ParallaxText baseVelocity={-1} rows={1}>Præsenteres af Metropolis</ParallaxText>
            <ParallaxText baseVelocity={1} rows={1}>Præsenteres af Metropolis</ParallaxText>
            <ParallaxText baseVelocity={-1} rows={1}>Præsenteres af Metropolis</ParallaxText>
            <ParallaxText baseVelocity={1} rows={1}>Præsenteres af Metropolis</ParallaxText>
          </div>
        </div>
      </div>
      <svg className="absolute">
        <defs>
          <clipPath id="sponsorClipPath" clipPathUnits="objectBoundingBox">
            <path d="M0.632298 0.594972C0.431944 0.690531 0.301911 0.757246 0.146271 0.438811C0.0638837 0.270249 0.0247533 0.117023 0 0V1H1C0.990415 0.974931 0.979972 0.950598 0.97029 0.927131C0.868618 0.680703 0.76269 0.532782 0.632298 0.594972Z" fill="#0007B2" />
          </clipPath>
        </defs>
      </svg>
    </>
  )
}