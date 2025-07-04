import { useState, RefObject, useEffect } from "react";
import { useMotionValue, useSpring, frame } from "framer-motion";

const spring = { damping: 10, stiffness: 50, restDelta: 0.001 };

export function useFollowPointer(ref: RefObject<HTMLElement>, maxDistance = 50 as number) {
  const xPoint = useMotionValue(0);
  const yPoint = useMotionValue(0);
  const x = useSpring(xPoint, spring);
  const y = useSpring(yPoint, spring);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      if (!element) return;

      const elementCenterX = element.offsetLeft + element.offsetWidth / 2;
      const elementCenterY = element.offsetTop + element.offsetHeight / 2;

      const deltaX = clientX - elementCenterX;
      const deltaY = clientY - elementCenterY;
      const dist = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      const normalizedDist = Math.min(dist / maxDistance, 1);

      const angle = Math.atan2(deltaY, deltaX);
      const newX = Math.cos(angle) * maxDistance * normalizedDist;
      const newY = Math.sin(angle) * maxDistance * normalizedDist;

      frame.read(() => {
        xPoint.set(newX);
        yPoint.set(newY);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [ref]);

  return { x, y };
}
