"use client";

import { useFollowPointer } from "../utilities/use-follow-pointer";
import { useRef } from "react";
import { motion } from "framer-motion";

interface NavItemProps {
  callback: () => void;
  isSelected?: boolean;
  label: string;
}

export default function NavItem({ callback, isSelected, label }: NavItemProps) {
  const ref = useRef(null);
  const position = useFollowPointer(ref);

  const navButtonVariants = {
    tap: {
      scale: 0.7,
    },
    hover: {
      scale: 1,
    },
  };

  return (
    <motion.li drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      ref={ref}
      style={{
        x: position.x,
        y: position.y,
      }}
      variants={navButtonVariants}
      whileHover="hover"
      whileTap="tap"
      animate={{ backgroundColor: isSelected ? "#ffffff00" : "#0024cc", color: isSelected ? "#000000" : "#ffffff", scale: isSelected ? 1 : 0.7 }}
      transition={{ type: "spring", damping: 20, stiffness: 400 }}
      className={`cursor-pointer size-48 rounded-full flex justify-center items-center text-center`}
      onClick={callback}>
      <h1 className="button-text font-bold text-3xl">
        {label}
      </h1>
    </motion.li>
  )
}