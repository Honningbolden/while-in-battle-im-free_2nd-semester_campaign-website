"use client";

import Image from "next/image";
import Background from "@/public/Wave_Pattern.svg";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";


export default function ParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [1,0], ["-10vh", "10vh"]);

  return (
    <div ref={containerRef} className="fixed -top-[10vh] left-0 h-[120vh] w-full -z-50">
      <motion.div style={{y}} className="relative h-full w-full">
        <Image src={Background} fill alt="paper white background" style={{objectFit: "cover"}}/>
      </motion.div>
    </div>
  )
}