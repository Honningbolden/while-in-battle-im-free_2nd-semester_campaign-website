"use client"

import NavItem from "../SeekingNavItem";
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

  const [menuIsOpen, setMenuIsOpen] = useState(true);

  const toggleSection = (section: Section) => {
    setSelectedTab(section);
  }

  const closeButtonVariants = {
    initial: {
      height: 0,
      width: 0,
      backgroundColor: "#ffffff",
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
            className={`${styles.clippy} fixed z-[500] top-0 min-h-dvh w-dvw left-0 overflow-hidden`}>
            <motion.div className='relative min-h-dvh w-full flex flex-col md:flex-row bg-white overflow-y-scroll' initial={{ y: 0.8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}>
              <ul id='nav' className='md:relative h-screen top-0 z-50 flex flex-col items-center justify-center gap-4'>
                {aboutContent.map((section, index) => (
                  <NavItem
                    key={index}
                    callback={() => toggleSection(section)}
                    active={section === selectedTab}
                    label={section.title}
                  />
                ))}
              </ul>
              <motion.div className="absolute top-0 left-0 m-2 md:m-8 z-50"
                onClick={toggleOpen}
                variants={closeButtonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                transition={{ type: "spring", damping: 20, stiffness: 600 }}
              />
              <div id="content" className="flex flex-col justify-start items-center w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTab ? selectedTab.title : "empty"}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="min-h-dvh w-full p-4 md:p-16 flex flex-col md:justify-center items-start gap-12"
                  >
                    <div className="flex flex-col xl:flex-row justify-center items-center gap-16">
                      <div className="flex flex-col w-full lg:w-1/2 2xl:w-1/3">
                        {selectedTab ? selectedTab.articles.map((article, articleIndex) => (
                          <div key={article.title} className="flex flex-col 2xl:max-w-screen-md gap-2">
                            <h1 className="title-type text-4xl font-bold mb-4 md:mt-8"
                            >{article.title}</h1>
                            <div className="w-full">
                              {selectedTab.imgUrl &&
                                <div className="2xl:float-end mb-4 w-full md:flex justify-center hidden">
                                  <img src={selectedTab.imgUrl} className=" ~@xl/3xl:~max-w-64/96 object-cover" />
                                </div>
                              }
                              {article.paragraphs.map((paragraph, pIndex) => (
                                <p key={`${articleIndex}-${pIndex}`} className="body-text text-xl font-light text-pretty">{paragraph}</p>
                              ))}
                            </div>
                          </div>
                        )) : null}
                      </div>
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