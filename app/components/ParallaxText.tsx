"use client";
import { useRef, useEffect, useState } from "react";
import { wrap } from "@motionone/utils";
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimate, useAnimationFrame } from "framer-motion";

interface ParallaxProps {
  children: string;
  baseVelocity: number;
  rows: number;
}

export default function ParallaxText({ children, baseVelocity = 100, rows = 1 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const textRef = useRef<HTMLSpanElement>(null);
  const [instances, setInstances] = useState(4); // Default to 4, adjust based on calculation

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 100,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], {
    clamp: false,
  });

  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.getBoundingClientRect().width;
      const viewportWidth = window.innerWidth;
      const neededInstances = Math.ceil(viewportWidth / textWidth) + 1; // +1 to ensure overlap
      setInstances(neededInstances);
    }
  }, [children]);

  const x = useTransform(baseX, (v) => `${wrap(-50, 50, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax">
      <motion.div className={`scroller flex flex-row`} style={{ x }}>
        {Array.from({ length: instances * 4 }).map((_, i) => (
          <span className="flex flex-col" key={`instance-${i}`}>
            {Array.from({ length: rows }).map((_, j) => (
              <span className="whitespace-nowrap px-4" key={`${i}-${j}`} ref={i === 0 ? textRef : null}>{children} </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  )
}