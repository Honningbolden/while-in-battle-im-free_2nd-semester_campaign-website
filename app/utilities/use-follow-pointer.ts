import { useState, RefObject, useEffect } from "react";
import { useMotionValue, useSpring, frame } from "framer-motion";

const spring = { damping: 10, stiffness: 50, restDelta: 0.001 };

export function useFollowPointer(ref: RefObject<HTMLElement>) {
  const xPoint = useMotionValue(0);
  const yPoint = useMotionValue(0);
  const x = useSpring(xPoint, spring);
  const y = useSpring(yPoint, spring);
  const maxDistance = 50;

  useEffect(() => {
    console.log("useFollowPointer called")
    if (!ref.current) return;

    const handlePointerMove = ({ pageX, pageY }: MouseEvent) => {
      const element = ref.current!;
      const elementCenterX = element.offsetLeft + element.offsetWidth/2;
      const elementCenterY = element.offsetTop + element.offsetHeight/2;

      const deltaX = pageX - elementCenterX;
      const deltaY = pageY - elementCenterY;
      const dist = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      console.log("dist", dist);

      const angle = Math.atan2(deltaY, deltaX);
      const newX = Math.cos(angle) * maxDistance;
      const newY = Math.sin(angle) * maxDistance;

      frame.read(() => {
        xPoint.set(newX);
        yPoint.set(newY);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [ref]);

  return { x, y };
}
