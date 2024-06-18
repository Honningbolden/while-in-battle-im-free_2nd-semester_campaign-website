"use client";

import { motion } from "framer-motion"

import Image from "next/image"

import img_0 from "@/public/gallery/0.png"
import img_1 from "@/public/gallery/1.png"
import img_2 from "@/public/gallery/2.png"
import img_3 from "@/public/gallery/3.png"
import img_4 from "@/public/gallery/4.png"
import { useState } from "react";

export default function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [img_0, img_1, img_2, img_3, img_4];

  const toggle = (index: number) => {
    setCurrentIndex(index);
  }

  return (
    <div className="relative h-screen flex bg-black flex-col justify-center items-center gap-4">
      <div className=" whitespace-nowrap flex flex-row items-center justify-start flex-shrink-0">
        {images.map((image, index) => (
          <div key={index} className="m-4 bg-blue-100 max-w-screen-md aspect-square flex-shrink-0 overflow-hidden">
            <Image src={images[index]} alt="Gallery Image" placeholder="blur" loading="lazy" style={{ objectFit: "cover" }} />
          </div>
        ))}
      </div>
      <ul className=" flex flex-row items-center justify-evenly full p-4 gap-4">
        {images.map((image, index) => (
          <motion.li key={index} onClick={() => toggle(index)}
            initial={{
              height: "20px",
              width: "20px",
              borderRadius: "100%",
              border: "2px solid #ffffff",
              // backgroundColor: "transparent",
              // opacity: 0.5,
            }}
            whileHover={{
              scale: 1.2,
            }}
            animate={{
              opacity: currentIndex === index ? 0.8 : 0.5,
              backgroundColor: currentIndex === index ? "#0a0a0a" : "transparent",
            }}/>
        ))}
      </ul>
    </div>
  )
}