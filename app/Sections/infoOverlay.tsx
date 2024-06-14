"use client";

import { motion } from "framer-motion"
import { useRef, useState } from "react";
import { useFollowPointer } from "../utilities/use-follow-pointer";

type InformationOverlayProps = {
  onClose: () => void;
};

export default function InformationOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);

  return (
    <motion.div ref={ref} className="w-20 h-20 rounded-full bg-blue-700" style={{ x, y }}>
    </motion.div>
  )
}