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
  if (background.type === "color") {
    bgStyle.background = background.options?.color || "#fff";
  } else if (background.type === "gradient") {
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
    blur: {
      initial: (direction: string, blurIntensity: number) => ({
        filter: `blur(${blurIntensity}px)`,
        opacity: 0,
        y: direction === "top" ? -50 : 50,
      }),
      animate: (steps: number, blurIntensity: number) => ({
        filter: [
          `blur(${blurIntensity}px)`,
          `blur(${blurIntensity / 2}px)`,
          "blur(0px)",
        ],
        opacity: [0, 0.5, 1],
        y: [null, 5, 0],
      }),
      exit: { filter: "blur(10px)", opacity: 0 },
    },
  };

  // Function to create comprehensive word style
  const createWordStyle = (word: any): React.CSSProperties => {
    const style: React.CSSProperties = {
      fontSize: word.fontSize ? `${word.fontSize}px` : "48px",
      fontFamily: word.fontFamily || "Inter",
      fontWeight: word.fontWeight || "700",
      textDecoration: word.textDecoration || "none",
      textTransform: word.textTransform || "none",
      letterSpacing: word.letterSpacing ? `${word.letterSpacing}px` : "0px",
    };

    // Handle effects
    if (word.effect === "bold") {
      style.fontWeight = "bold";
    }
    if (word.effect === "italic") {
      style.fontStyle = "italic";
    }
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
    } else {
      // Only apply text color if not using gradient effect
      style.color = word.textColor || "#1f2937";
    }

    return style;
  };

  // Helper function to render words with animation logic
  const renderWords = (words: any[]) => {
    return words?.map((word, widx) => {
      const delay = words
        .slice(0, widx)
        .reduce((acc, w) => acc + (w.duration ?? 0.5), 0);
      const wordStyle = createWordStyle(word);

      // Handle blur animation
      if (word.animation === "blur" || word.effect === "blur") {
        const direction = word.effectOptions?.direction || "top";
        const blurIntensity = word.effectOptions?.blurIntensity || 10;
        const steps = word.effectOptions?.steps || 2;

        return (
          <React.Fragment key={widx}>
            <motion.span
              initial={variants.blur.initial(direction, blurIntensity)}
              animate={variants.blur.animate(steps, blurIntensity)}
              transition={{
                duration: word.duration ?? 0.5,
                delay,
                times: [0, 0.6, 1],
              }}
              className="inline-block will-change-[transform,filter,opacity]"
              style={wordStyle}
            >
              {word.text}
            </motion.span>
            {widx < words.length - 1 && (
              <span
                style={{
                  display: "inline-block",
                  width: `${word.spaceAfter ?? 8}px`,
                }}
              />
            )}
          </React.Fragment>
        );
      }

      // Original rendering for other animations
      return (
        <React.Fragment key={widx}>
          <motion.span
            initial={variants[word.animation ?? "fade"].initial}
            animate={variants[word.animation ?? "fade"].animate}
            transition={{ duration: word.duration ?? 0.5, delay }}
            className="inline-block"
            style={wordStyle}
          >
            {word.text}
          </motion.span>
          {widx < words.length - 1 && (
            <span
              style={{
                display: "inline-block",
                width: `${word.spaceAfter ?? 8}px`,
              }}
            />
          )}
        </React.Fragment>
      );
    });
  };

  // Fullscreen mode
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
            className="text-center px-4 flex flex-wrap items-center justify-center w-full h-full"
            style={{ position: "relative", width: "100%" }}
          >
            {renderWords(line.words)}
          </div>
        )}
      </div>
    );
  }

  // Full dimension mode
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
              className="text-center px-4 flex flex-wrap items-center justify-center w-full h-full"
              style={{ position: "relative", width: "100%" }}
            >
              {renderWords(line.words)}
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

  // Default scaled preview mode
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
              className="text-center px-4 flex flex-wrap items-center justify-center w-full h-full"
              style={{ position: "relative", width: "100%" }}
            >
              {renderWords(line.words)}
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
