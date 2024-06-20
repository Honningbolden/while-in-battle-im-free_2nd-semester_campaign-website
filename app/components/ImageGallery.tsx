"use client";

import { motion, AnimatePresence } from "framer-motion"

import Image from "next/image"

import img_0 from "@/public/gallery/0.png"
import img_1 from "@/public/gallery/1.png"
import img_2 from "@/public/gallery/2.png"
import img_3 from "@/public/gallery/3.png"
import img_4 from "@/public/gallery/4.png"
import { useEffect, useState } from "react";
import next from "next";

export default function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for right, -1 for left
  const images = [img_0, img_1, img_2, img_3, img_4];

  const toggle = (index: number) => {
    const direction = index > currentIndex ? 1 : -1;
    setDirection(direction);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(currentIndex);
      setCurrentIndex(currentIndex => (currentIndex === images.length - 1 ? 0 : currentIndex + 1));
      console.log(currentIndex);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  }


  return (
    <div className="relative h-screen flex bg-black flex-col justify-center items-center gap-4">
      <div className=" whitespace-nowrap flex flex-row items-center justify-center flex-shrink-0">
        {[prevIndex, currentIndex, nextIndex].map((index) => (
          <AnimatePresence key={`${index}-motion`} mode="popLayout">
            <motion.div className="m-4 bg-blue-100 max-w-screen-sm aspect-square flex-shrink-0 overflow-hidden"
              
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{scale: currentIndex === index ? 1 : 0.8}}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
              }}
            >
              <Image src={images[index]} alt="Gallery Image" priority objectFit="cover" />
            </motion.div>
          </AnimatePresence>
        ))}
      </div>
      <ul className=" flex flex-row items-center justify-evenly full p-4 gap-4 text-primary-white">
        {images.map((image, index) => (
          <motion.li key={index} onClick={() => toggle(index)}
            initial={{
              height: "20px",
              width: "20px",
              borderRadius: "100%",
              border: "2px solid #ffffff",
            }}
            whileHover={{
              scale: 1.2,
            }}
            animate={{
              opacity: currentIndex === index ? 0.8 : 0.5,
              scale: currentIndex === index ? 1 : 1 - (0.3 * Math.abs(currentIndex - index))/Math.sqrt(2),
            }} />
        ))}
      </ul>
    </div>
  )
}