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

  const redirectToTicketSite = () => {
    window.location.href = "https://www.eventim-light.com/dk/a/6268ebc70e2f6b59c13b0fac/s/6655dc75e820523242408abe?lang=da";
  }

  return (
    <>
      <section className="h-1/3 w-full mb-4 text-primary-white">
        <div className="title-type h-full flex flex-row justify-evenly items-center my-auto">
          {contentEntries.map(([key, value]) => {
            if (key === 'callToAction') {
              return (
                <div key={key}>
                  <motion.button
                    initial={{ borderRadius: 500 }}
                    whileHover={{ color: "#454545", backgroundColor: "#f3f3f3", borderRadius: 500 }}
                    transition={{
                      duration: 0.1,
                      type: "spring",
                      damping: 80,
                      stiffness: 400,
                      restDelta: 0.1,
                    }}
                    onClick={() => redirectToTicketSite()}
                    className="h-20 px-12 py-4 body-text text-3xl text-primary-white bg-primary-blue rounded-full cursor-pointer select-none flex justify-start items-center">
                    <p>{value}</p>
                  </motion.button>
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