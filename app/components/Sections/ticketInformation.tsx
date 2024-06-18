"use client"

import { useEffect } from "react";
import { motion } from "framer-motion";

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

  return (
    <>
      <section className="h-1/3 text-white">
        {/* <div id="background" className="absolute -bottom-10 left-0 h-[120%] w-[120%] bg-slate-950 -z-10" /> */}
        <div className="title-type h-full flex flex-row justify-evenly items-center my-auto">
          {contentEntries.map(([key, value]) => {
            if (key === 'callToAction') {
              return (
                <div key={key}>
                  <motion.div
                    initial={{ borderRadius: 10 }}
                    whileHover={{ color: "#454545", backgroundColor: "#f3f3f3", borderRadius: 50 }}
                    transition={{
                      duration: 0.1,
                      type: "spring",
                      damping: 80,
                      stiffness: 400,
                      restDelta: 0.1,
                    }}
                    className="h-20 px-12 py-4 text-2xl text-white bg-blue-800 rounded-lg cursor-pointer select-none flex justify-start items-center">
                    <p>{value}</p>
                  </motion.div>
                </div>
              )
            } else {
              return (
                <div key={key} className="flex flex-col justify-end">
                  <div className="flex flex-col justify-end gap-4 h-9">
                    <h3 className="text-white text-sm">{`${key}`}</h3>
                    <p className="text-3xl">{`${value}`}</p>
                  </div>
                </div>
              )
            }
          })}
        </div>
      </section>
    </>
  )
}