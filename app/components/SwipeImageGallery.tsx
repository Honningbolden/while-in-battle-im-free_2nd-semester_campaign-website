"use client";

import { motion, AnimatePresence, useMotionValue, useMotionValueEvent } from "framer-motion"

import Image from "next/image"

import img_0 from "@/public/gallery/0.png"
import img_1 from "@/public/gallery/1.png"
import img_2 from "@/public/gallery/2.png"
import img_3 from "@/public/gallery/3.png"
import img_4 from "@/public/gallery/4.png"
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const imgs = [img_0, img_1, img_2, img_3, img_4];

const DRAG_BUFFER = 10;
const AUTO_DELAY = 8000;

export default function SwipeImageGallery() {
  const [dragging, setDragging] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  const dragX = useMotionValue(0);
  const dragXProgress = useMotionValue(0);

  useMotionValueEvent(dragX, "change", (latest) => {
    if (typeof latest === "number" && dragging) {
      dragXProgress.set(latest)
    } else {
      dragXProgress.set(0);
    }
  })

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragXProgress.get();
      if (x === 0) {
        setImgIndex(prev => {
          if (prev === imgs.length - 1) {
            return 0;
          } else {
            return prev + 1;
          }
        })
      }
    }, AUTO_DELAY)
    return () => clearInterval(intervalRef);
  }, [])

  const onDragStart = () => {
    setDragging(true);
  }

  const onDragEnd = () => {
    setDragging(false);

    const x = dragX.get();
    console.log(x);

    if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
      setImgIndex(prev => prev + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex(prev => prev - 1);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 h-3/5 m-24 bg-black">
      <div className="relative min-h-full aspect-square max-w-screen-sm overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{
            left: 0,
            right: 0,
          }}
          style={{
            x: dragX,
          }}
          animate={{
            translateX: `-${imgIndex * 100}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 80,
          }}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          className="flex items-center cursor-grab active:cursor-grabbing rounded-lg min-h-full">
          <Images imgIndex={imgIndex} />
        </motion.div>
      </div>
      <Dots
        imgIndex={imgIndex}
        setImgIndex={setImgIndex}
      />
    </div>
  )
}

const Images = ({ imgIndex }: { imgIndex: number }) => {
  return (
    <>
      {imgs.map((imgSrc, index) => {
        return (
          <motion.div
            key={index}
            style={{
              backgroundImage: `url(${imgSrc.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="aspect-square w-full shrink-0 bg-neutral-800 object-top"
          >
          </motion.div>)
      })}
    </>
  )
}

const Dots = ({ imgIndex, setImgIndex }: { imgIndex: number, setImgIndex: Dispatch<SetStateAction<number>> }) => {
  return <div className="mt-4 flex w-full justify-center gap-2">
    {imgs.map((_, index) => {
      return <button
        key={index}
        onClick={() => setImgIndex(index)}
        className={`size-3 rounded-full transition-colors ${index === imgIndex ? "bg-neutral-50" : "bg-neutral-500"}`}
      />
    })}
  </div>
}