"use client"

import NavItem from "../NavItem";
import styles from "@/app/styles/AboutSection.module.css"
import { useFollowPointer } from "@/app/utilities/use-follow-pointer";
import { motion, AnimatePresence, MotionValue } from "framer-motion";
import { useEffect, useState, useRef } from "react";

import InformationOverlay from "./informationOverlay";

interface Article {
  title: string;
  paragraphs: string[];
}

export interface Section {
  title: string,
  articles: Article[];
  imgUrl?: string,
}

interface AboutSectionProps {
  aboutContent: Section[];
}

interface Position {
  x: MotionValue<any>;
  y: MotionValue<any>;
}

export default function AboutSection({ aboutContent }: AboutSectionProps) {
  const [isOpen, setIsOpen] = useState(false); // Issue here! Nav buttons aren't calling useFollower when useState(false) and not true
  const toggleOpen = () => setIsOpen(!isOpen);
  const [selectedTab, setSelectedTab] = useState(aboutContent[0]);

  const toggleSection = (section: Section) => {
    setSelectedTab(section);
  }

  const closeButtonVariants = {
    initial: {
      height: 0,
      width: 0,
      backgroundColor: "#0024cc",
      boxShadow: "inset 0 0 0 30px #000000",
      borderRadius: 50,
    },
    animate: {
      height: 50,
      width: 50,
    },
    hover: {
      scale: 1.05,
    },
    tap: {
      boxShadow: "inset 0 0 0 20px #000000",
    }
  }


  return (
    <>
      <InformationOverlay toggleOpen={toggleOpen} />
      <AnimatePresence>
        {isOpen && (
        <div
          className={`${styles.clippy} fixed z-[500] top-0 left-0 overflow-hidden`}>
          <motion.div className='relative h-screen w-screen flex flex-row bg-white overflow-y-scroll'
            initial={{ y: 0.8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}>
            <div>

              <ul id='nav' className='absolute top-0 z-50 h-full flex flex-col items-start justify-center gap-8'>
                {aboutContent.map((section, index) => (
                  <NavItem
                  key={index}
                  toggleSection={() => toggleSection(section)}
                  isSelected={section === selectedTab}
                  label={section.title}
                  />
                ))}
              </ul>
              <motion.div className="absolute top-0 left-0 m-8 z-50"
                onClick={toggleOpen}
                variants={closeButtonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                transition={{ type: "spring", damping: 20, stiffness: 600 }}
              />
            </div>
            <div id="content" className="flex flex-col justify-center items-center w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTab ? selectedTab.title : "empty"}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-1/2 flex flex-col gap-12"
                >
                  <div className="flex flex-row gap-20">
                    <div className="flex flex-col w-full">
                      {selectedTab ? selectedTab.articles.map((article, articleIndex) => (
                        <div key={article.title} className="flex flex-col gap-2">
                          <h1 className="title-type text-4xl font-bold mb-4 mt-8"
                          >{article.title}</h1>
                          {article.paragraphs.map((paragraph, pIndex) => (
                            <p key={`${articleIndex}-${pIndex}`} className="body-text text-xl font-light">{paragraph}</p>
                          ))}
                        </div>
                      )) : null}
                    </div>
                    {selectedTab.imgUrl ?
                      <div className="h-full w-2/3">
                        <img src={selectedTab.imgUrl} className="h-full w-full object-cover" />
                      </div> : null}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div >
        </div>
        )}
      </AnimatePresence >
    </>
  )
}