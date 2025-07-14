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
              // Each word's delay is the sum of all previous word durations
              const delay = line.words
                .slice(0, widx)
                .reduce((acc, w) => acc + (w.duration ?? 0.5), 0);
              let style: React.CSSProperties = {};
              if (word.effect === "bold") style.fontWeight = "bold";
              if (word.effect === "italic") style.fontStyle = "italic";
              if (word.effect === "gradient") {
                const type = word.effectOptions?.type || "linear";
                const from = word.effectOptions?.from || "#ff0080";
                const to = word.effectOptions?.to || "#7928ca";
                const angle = word.effectOptions?.angle || 90;
                if (type === "linear") {
                  style.background = `linear-gradient(${angle}deg, ${from}, ${to})`;
                } else {
                  style.background = `radial-gradient(circle, ${from}, ${to})`;
                }
                style.backgroundClip = "text";
                style.WebkitBackgroundClip = "text";
                style.color = "transparent";
                style.WebkitTextFillColor = "transparent";
              }
              return (
                <motion.span
                  key={widx}
                  initial={variants[word.animation ?? "fade"].initial}
                  animate={variants[word.animation ?? "fade"].animate}
                  exit={variants[word.animation ?? "fade"].exit}
                  transition={{ duration: word.duration ?? 0.5, delay }}
                  className="inline-block"
                  style={style}
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
