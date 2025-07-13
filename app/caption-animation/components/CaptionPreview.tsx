"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCaptionStore } from "./captionStore";

export const CaptionPreview = () => {
  const { lines, currentLine } = useCaptionStore();
  const line = lines[currentLine];

  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { y: 40, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -40, opacity: 0 },
    },
    bounce: {
      initial: { scale: 0.8, opacity: 0 },
      animate: {
        scale: 1,
        opacity: 1,
        transition: { type: "spring", bounce: 0.5 },
      },
      exit: { scale: 0.8, opacity: 0 },
    },
  };

  return (
    <div className="w-full h-64 flex items-center justify-center bg-white rounded shadow relative">
      <AnimatePresence mode="wait">
        {line && (
          <div
            key={currentLine}
            className="text-3xl font-bold text-gray-900 text-center px-4 flex flex-wrap gap-2 items-center justify-center w-full h-full"
            style={{ position: "absolute", width: "100%" }}
          >
            {line.words?.map((word, widx) => {
              // Calculate delay as the sum of durations of previous words
              const delay = line.words
                .slice(0, widx)
                .reduce((acc, w) => acc + (w.duration ?? 0), 0);
              return (
                <motion.span
                  key={widx}
                  initial={variants[word.animation]?.initial || {}}
                  animate={variants[word.animation]?.animate || {}}
                  exit={variants[word.animation]?.exit || {}}
                  transition={{ duration: word.duration ?? 0.5, delay }}
                  className="inline-block"
                >
                  {word.text}
                </motion.span>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
