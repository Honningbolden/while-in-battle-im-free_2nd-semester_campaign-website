"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { useRef } from "react"

export default function TeaserDescription() {
  return (
    <>
      <section className="h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center gap-8 w-1/3">
          <motion.div className="flex flex-col justify-start w-full">
            <h3 className="title-type text-3xl font-bold" >For den kompromisløse koreograf Sharifi er kunst altid politisk</h3>
          </motion.div>
          <motion.div className="flex flex-col justify-start gap-8 w-full">
            <p className="body-text text-xl" >Forestillingens titel er et citat af medborgerrettighedsaktivisten James Baldwin. While in battle I’m free, never free to rest. Er livet en kamp på liv og død? Eller en kraftfuld dansefest, hvis bare vi sætter kroppene fri?</p>
            <p className="body-text text-xl" >Danserne hvirvler rundt mellem hinanden i intense, sveddryppende koreografier, mens vi som publikum bliver trukket ind i deres univers. Vi omringer danserne, mens det dragende soundtrack omslutter os. Neda Sanai har skabt sin egen, særlige musik ved at sample et unikt lydtæppe af iransk folkemusik.</p>
            <p className="body-text text-xl" >20 kroppe i konstant bevægelse skaber et nomadisk og menneskeligt ritual, der insisterer på, at vi er en del af den samme uendelige krop, og at vi sætter dens puls fri.</p>
          </motion.div>
        </div>
      </section>
    </>
  )
}