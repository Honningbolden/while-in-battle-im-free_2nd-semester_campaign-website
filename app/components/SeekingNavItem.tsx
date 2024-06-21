"use client";

import { useFollowPointer } from "../utilities/use-follow-pointer";
import { useRef } from "react";
import { motion } from "framer-motion";

interface SeekingNavItemProps {
  callback: () => void;
  active?: boolean;
  reactiveScaling?: boolean;
  maxDistance?: number;
  scaleAmount?: number;
  label: string;
}

export default function SeekingNavItem({ callback, active, maxDistance = 50, label }: SeekingNavItemProps) {
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref, maxDistance);

  const navButtonVariants = {
    tap: {
      scale: 0.7,
      filter: "saturate(110%) brightness(90%)",
    },
    hover: {
      scale: 0.9
    }
  };



  return (
    <motion.li
      drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      ref={ref}
      style={{ x, y }}
      variants={navButtonVariants}
      whileTap="tap"
      whileHover="hover"
      animate={{ backgroundColor: active ? "#ffffff00" : "#0024cc", color: active ? "#000000" : "#ffffff", scale: active ? 1 : 0.7 }}
      transition={{ type: "spring", damping: 20, stiffness: 400 }}
      className={`cursor-pointer size-64 md:size-48 rounded-full flex justify-center items-center text-center`}
      onClick={callback}>
      <h1 className="button-text font-bold text-3xl">
        {label}
      </h1>
    </motion.li>
  )
}