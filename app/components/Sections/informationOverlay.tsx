"use client";

// import styles from "@/app/styles/informationOverlay.module.css"
import styles from "@/app/styles/informationOverlay.module.css"
import ParallaxText from "../ParallaxText";
import { useEffect, useRef, useState } from "react";

interface InformationOverlayProps {
  toggleOpen: () => void;
}

export default function InformationOverlay({ toggleOpen }: InformationOverlayProps) {

  return (
    <>
      <div onClick={toggleOpen} className={`${styles.clippy} z-[200] cursor-pointer h-[50vh] w-[100vh] absolute -top-0 -right-0 bg-primary-blue mix-blend-normal stroke-black stroke-2 hover:bg-blue-500 transition-colors`}>
        <div className="absolute top-0 left-0 w-screen h-80 ">
          <div className="body-text text-2xl text-white gap-4 flex flex-col items-center justify-start">
            <ParallaxText baseVelocity={1} rows={1}>Læs mere</ParallaxText>
            <ParallaxText baseVelocity={-1} rows={1}>Læs mere</ParallaxText>
            <ParallaxText baseVelocity={1} rows={1}>Læs mere</ParallaxText>
            <ParallaxText baseVelocity={-1} rows={1}>Læs mere</ParallaxText>
            <ParallaxText baseVelocity={1} rows={1}>Læs mere</ParallaxText>
            <ParallaxText baseVelocity={-1} rows={1}>Læs mere</ParallaxText>
            <ParallaxText baseVelocity={1} rows={1}>Læs mere</ParallaxText>
            <ParallaxText baseVelocity={-1} rows={1}>Læs mere</ParallaxText>
          </div>
        </div>
      </div>
      <svg className="absolute">
        <defs>
          <clipPath id="heroClipPath" clipPathUnits="objectBoundingBox">
            {/* <path d="M0.19511 0.250989C0.097433 0.215836 -0.000244141 0.127986 -0.000244141 0H0.999969V0.250989V0.694885C0.999969 0.694885 0.894684 0.673828 0.842041 0.568542C0.789398 0.463257 0.77887 0.389557 0.568298 0.315857C0.357727 0.242157 0.292787 0.286142 0.19511 0.250989Z" fill="#1400FF" /> */}
            <path d="M0.873605 0.285601C0.732371 0.0389194 0.617874 0.0629489 0.495293 0.129023C0.315659 0.225849 0.111446 0.223776 0 0H1V1C0.988814 0.697163 0.953755 0.425592 0.873605 0.285601Z" fill="#0007B2"/>

          </clipPath>
        </defs>
      </svg>
    </>
  )
}