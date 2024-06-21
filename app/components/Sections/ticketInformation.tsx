"use client"

import { useEffect } from "react";
import { motion } from "framer-motion";
import NavItem from "../NavItem";

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
                <div key={key} className="m-0 aspect-video flex justify-center">
                  <NavItem
                  callback={() => redirectToTicketSite}
                  label={value}
                  />
                </div>
              )
            } else {
              return (
                <div key={key} className="flex flex-col justify-end">
                  <div className="flex flex-col justify-end gap-4">
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

const InformationItem = () => {
  
}