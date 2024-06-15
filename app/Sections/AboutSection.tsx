"use client"

import { motion, AnimatePresence, spring } from "framer-motion";
import { useEffect, useState } from "react";

interface Article {
  title: string;
  paragraphs: string[];
}

interface Section {
  title: string,
  articles: Article[];
}

interface AboutSectionProps {
  aboutContent: Section[];
}

export default function AboutSection({ aboutContent }: AboutSectionProps) {
  const [selectedTab, setSelectedTab] = useState(aboutContent[0]);

  const navButtonVariants = {
    tap: {
      scale: 0.7,
      // backgroundColor: "#ffffff00",
    },
    hover: {
      scale: 1,
    },
  }

  useEffect(() => {
    // console.log("forestiilingen", )
  })


  return (
    <div className='relative h-screen w-screen flex flex-row bg-red-50 overflow-y-scroll'>
      <div>
        <ul id='nav' className='top-0 z-50 h-full flex flex-col items-center justify-center'>
          {aboutContent.map((section, index) => (
            <motion.li
              key={index}
              variants={navButtonVariants}
              whileHover="hover"
              whileTap="tap"
              animate={{ backgroundColor: section === selectedTab ? "#ffffff00" : "#007bff", color: section === selectedTab ? "#000000" : "#ffffff", scale: section === selectedTab ? 1 : 0.7 }}
              transition={{ type: "spring", damping: 10, stiffness: 200 }}
              className={`cursor-pointer size-60 rounded-full flex justify-center items-center text-center`}
              onClick={() => setSelectedTab(section)}>
              <h1 className="button-text font-bold text-3xl">
                {section.title}
              </h1>
            </motion.li>
          ))}
        </ul>
      </div>
      <div id="content" className="flex flex-col justify-start items-center my-64 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.title : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-1/2 flex flex-col gap-12"
          >
            {selectedTab ? selectedTab.articles.map((article, articleIndex) => (
              <div key={article.title} className="flex flex-col gap-2">
                <h1 className="title-type text-4xl font-bold mb-4 mt-8"
                >{article.title}</h1>
                {article.paragraphs.map((paragraph, pIndex) => (
                  <p key={`${articleIndex}-${pIndex}`} className="body-text text-xl font-light">{paragraph}</p>
                ))}
              </div>
            )) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div >
  )
}