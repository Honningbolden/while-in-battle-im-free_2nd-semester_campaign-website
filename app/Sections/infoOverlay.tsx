"use client";

import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useFollowPointer } from "../utilities/use-follow-pointer";

type InformationOverlayProps = {
  onClose: () => void;
};

export default function InformationOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);

  const toggleOpen = () => {
    console.log("toggle");
    setIsOpen(!isOpen);
  };

  return (
    <>
      <motion.div layout
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
        style={{ x, y }}
        onClick={toggleOpen} ref={ref} className="h-20 w-20 rounded-full bg-blue-700">
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div onClick={toggleOpen} className="fixed z-50 top-0 left-0 h-screen w-screen bg-blue-700 flex flex-col justify-center"
            key="modal"
            initial={{ y: "-100vh" }}
            animate={{ y: "0vh" }}
            exit={{ y: "-100vh" }}
            transition={{ duration: 1 }}>
            <h1>HELLO HELLO</h1>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}