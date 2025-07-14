"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCaptionStore } from "./captionStore";

interface CaptionPreviewProps {
  lineIndex?: number;
  fullscreen?: boolean;
  showFullDimension?: boolean;
}

export const CaptionPreview: React.FC<CaptionPreviewProps> = ({
  lineIndex,
  fullscreen = false,
  showFullDimension = false,
}) => {
  const {
    lines,
    currentLine: storeCurrentLine,
    background,
    previewDimensions,
  } = useCaptionStore();

  // Use passed lineIndex or fall back to store's currentLine
  const effectiveCurrentLine =
    lineIndex !== undefined ? lineIndex : storeCurrentLine;
  const line = lines[effectiveCurrentLine];

  // Compute background style
  const bgStyle: React.CSSProperties = {};
  if (background.type === "gradient") {
    const from = background.options?.from || "#ff0080";
    const to = background.options?.to || "#7928ca";
    const angle = background.options?.angle ?? 90;
    const gradType = background.options?.type || "linear";
    if (gradType === "linear") {
      bgStyle.background = `linear-gradient(${angle}deg, ${from}, ${to})`;
    } else {
      bgStyle.background = `radial-gradient(circle, ${from}, ${to})`;
    }
  } else if (background.type === "grid") {
    const color = background.options?.color || "#e5e7eb";
    const size = background.options?.size ?? 24;
    bgStyle.backgroundImage = `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`;
    bgStyle.backgroundSize = `${size}px ${size}px`;
    bgStyle.backgroundColor = "#fff";
  } else if (background.type === "dots") {
    const dotColor = background.options?.dotColor || "#d1d5db";
    const dotSize = background.options?.dotSize ?? 4;
    const spacing = background.options?.spacing ?? 24;
    const svg = encodeURIComponent(
      `<svg width='${spacing}' height='${spacing}' viewBox='0 0 ${spacing} ${spacing}' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='${
        spacing / 2
      }' cy='${spacing / 2}' r='${dotSize}' fill='${dotColor}'/></svg>`
    );
    bgStyle.backgroundImage = `url("data:image/svg+xml,${svg}")`;
    bgStyle.backgroundColor = "#fff";
  } else {
    bgStyle.background = "#fff";
  }

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

  // Fullscreen mode (existing functionality)
  if (fullscreen) {
    return (
      <div
        style={{
          width: previewDimensions.width,
          height: previewDimensions.height,
          ...bgStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {line && (
          <div
            key={effectiveCurrentLine}
            className="text-3xl font-bold text-gray-900 text-center px-4 flex flex-wrap gap-2 items-center justify-center w-full h-full"
            style={{ position: "relative", width: "100%" }}
          >
            {line.words?.map((word, widx) => {
              const delay = line.words
                .slice(0, widx)
                .reduce((acc, w) => acc + (w.duration ?? 0.5), 0);
              const style: React.CSSProperties = {};
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
      </div>
    );
  }

  // Full dimension mode (new functionality)
  if (showFullDimension) {
    return (
      <div className="flex flex-col items-center w-full">
        <div
          style={{
            width: previewDimensions.width,
            height: previewDimensions.height,
            ...bgStyle,
            borderRadius: 12,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {line && (
            <div
              key={effectiveCurrentLine}
              className="text-3xl font-bold text-gray-900 text-center px-4 flex flex-wrap gap-2 items-center justify-center w-full h-full"
              style={{ position: "relative", width: "100%" }}
            >
              {line.words?.map((word, widx) => {
                const delay = line.words
                  .slice(0, widx)
                  .reduce((acc, w) => acc + (w.duration ?? 0.5), 0);
                const style: React.CSSProperties = {};
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
        </div>
        <div className="mt-4 text-sm text-gray-600 font-medium">
          Full Dimension Preview: {previewDimensions.width} ×{" "}
          {previewDimensions.height} ({previewDimensions.aspect})
        </div>
      </div>
    );
  }

  // Default scaled preview mode (existing functionality)
  const maxWidth = 640;
  const scale = Math.min(1, maxWidth / previewDimensions.width);

  const containerStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: maxWidth,
    aspectRatio: `${previewDimensions.width} / ${previewDimensions.height}`,
    background: "#eee",
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    position: "relative",
    overflow: "hidden",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div style={containerStyle}>
        <div
          style={{
            width: previewDimensions.width,
            height: previewDimensions.height,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            ...bgStyle,
            position: "absolute",
            left: 0,
            top: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {line && (
            <div
              key={effectiveCurrentLine}
              className="text-3xl font-bold text-gray-900 text-center px-4 flex flex-wrap gap-2 items-center justify-center w-full h-full"
              style={{ position: "relative", width: "100%" }}
            >
              {line.words?.map((word, widx) => {
                const delay = line.words
                  .slice(0, widx)
                  .reduce((acc, w) => acc + (w.duration ?? 0.5), 0);
                const style: React.CSSProperties = {};
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
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Virtual size: {previewDimensions.width} × {previewDimensions.height} (
        {previewDimensions.aspect})
      </div>
    </div>
  );
};
