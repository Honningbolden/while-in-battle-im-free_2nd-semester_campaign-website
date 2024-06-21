"use client"

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import SeekingButton from "../SeekingNavItem";
import { useFollowPointer } from "@/app/utilities/use-follow-pointer";

interface TicketInformationProps {
  content: {
    scene: string,
    schedule: string,
    length: string,
    price: string,
    callToAction: string,
  }
}

export default function TicketInformation({ content }: TicketInformationProps) {
  const contentEntries = Object.entries(content);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);

  const redirectToTicketSite = () => {
    setHasBeenClicked(true);
    window.location.href = "https://www.eventim-light.com/dk/a/6268ebc70e2f6b59c13b0fac/s/6655dc75e820523242408abe?lang=da";
  }

  return (
    <>
      <section className="h-1/3 w-full mb-4 text-primary-white">
        <div className="title-type h-full flex flex-row justify-evenly items-center my-auto">
          {contentEntries.map(([key, value]) => {
            if (key === 'callToAction') {
              return (
                <div key={key} className="m-0 aspect-video flex justify-center">
                  <SeekingButton
                    callback={redirectToTicketSite}
                    active={hasBeenClicked}
                    maxDistance={50}
                    label={value}
                  />
                </div>
              )
            } else {
              return (
                <div key={key} className="flex flex-col justify-end">
                  <SeekingElement>
                    <motion.h3
                      initial={{ fontSize: "0.875rem", fontWeight: 400 }}
                      animate={{ fontSize: "0.875rem", fontWeight: 400 }}
                      variants={{ hover: { fontSize: "2rem", fontWeight: 600 } }}
                      transition={{ type: "spring", stiffness: 200, damping: 40 }}
                      className="text-neutral-600 text-base lowercase leading-none">{`${key}`}</motion.h3>
                    <motion.p className="text-3xl leading-none">{`${value}`}</motion.p>
                  </SeekingElement>
                </div>
              )
            }
          })}
        </div>
      </section>
    </>
  )
}

interface SeekingElementProps {
  children: React.ReactNode;
}

function SeekingElement({ children }: SeekingElementProps) {
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref, 20);

  return (
    <motion.div whileHover="hover"
      ref={ref}
      style={{ x, y }}
      transition={{ type: "spring", damping: 20, stiffness: 400 }}
      className="flex flex-col justify-end gap-1"
    >
      {children}
    </motion.div>
  )
}