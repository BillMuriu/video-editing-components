"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { IconDotsVertical } from "@tabler/icons-react";

interface VideoCompareProps {
  firstVideo?: string;
  secondVideo?: string;
  className?: string;
  firstVideoClassName?: string;
  secondVideoClassname?: string;
  initialSliderPercentage?: number;
  slideMode?: "hover" | "drag";
  showHandlebar?: boolean;
  autoplay?: boolean;
  autoplayDuration?: number;
  videoAutoplay?: boolean;
  videoMuted?: boolean;
  videoLoop?: boolean;
}

export const VideoCompare = ({
  firstVideo = "",
  secondVideo = "",
  className,
  firstVideoClassName,
  secondVideoClassname,
  initialSliderPercentage = 50,
  slideMode = "hover",
  showHandlebar = true,
  autoplay = false,
  autoplayDuration = 5000,
  videoAutoplay = true,
  videoMuted = true,
  videoLoop = true,
}: VideoCompareProps) => {
  const [sliderXPercent, setSliderXPercent] = useState(initialSliderPercentage);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const firstVideoRef = useRef<HTMLVideoElement>(null);
  const secondVideoRef = useRef<HTMLVideoElement>(null);

  const startAutoplay = useCallback(() => {
    if (!autoplay) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress =
        (elapsedTime % (autoplayDuration * 2)) / autoplayDuration;
      const percentage = progress <= 1 ? progress * 100 : (2 - progress) * 100;

      setSliderXPercent(percentage);
      autoplayRef.current = setTimeout(animate, 16); // ~60fps
    };

    animate();
  }, [autoplay, autoplayDuration]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  // Sync video playback and control play/pause based on slider position
  useEffect(() => {
    const firstVideo = firstVideoRef.current;
    const secondVideo = secondVideoRef.current;

    if (firstVideo && secondVideo) {
      // Control which video plays based on slider position
      if (sliderXPercent <= 10) {
        // Near left side (0-10%) - play second video, pause first
        secondVideo.play();
        firstVideo.pause();
      } else if (sliderXPercent >= 90) {
        // Near right side (90-100%) - play first video, pause second
        firstVideo.play();
        secondVideo.pause();
      } else {
        // Middle area - pause both videos
        firstVideo.pause();
        secondVideo.pause();
      }

      // Sync video times when playing
      const syncVideos = () => {
        if (!firstVideo.paused && !secondVideo.paused) {
          if (
            Math.abs(firstVideo.currentTime - secondVideo.currentTime) > 0.1
          ) {
            secondVideo.currentTime = firstVideo.currentTime;
          }
        }
      };

      firstVideo.addEventListener("timeupdate", syncVideos);
      return () => firstVideo.removeEventListener("timeupdate", syncVideos);
    }
  }, [sliderXPercent]);

  function mouseEnterHandler() {
    stopAutoplay();
  }

  function mouseLeaveHandler() {
    if (slideMode === "hover") {
      setSliderXPercent(initialSliderPercentage);
    }
    startAutoplay();
  }

  const handleMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;
      if (slideMode === "hover" || (slideMode === "drag" && isDragging)) {
        const rect = sliderRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percent = (x / rect.width) * 100;
        requestAnimationFrame(() => {
          // Allow full range from 0% to 100%
          setSliderXPercent(Math.max(0, Math.min(100, percent)));
        });
      }
    },
    [slideMode, isDragging]
  );

  const handleMouseDown = useCallback(() => {
    if (slideMode === "drag") {
      setIsDragging(true);
    }
  }, [slideMode]);

  const handleMouseUp = useCallback(() => {
    if (slideMode === "drag") {
      setIsDragging(false);
    }
  }, [slideMode]);

  // Add global mouse up listener to handle dragging outside component
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      document.addEventListener("mouseup", handleGlobalMouseUp);
      document.addEventListener("mouseleave", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("mouseleave", handleGlobalMouseUp);
    };
  }, [isDragging]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (slideMode === "hover" || (slideMode === "drag" && isDragging)) {
        handleMove(e.clientX);
      }
    },
    [handleMove, slideMode, isDragging]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!autoplay) {
        handleMove(e.touches[0].clientX);
      }
    },
    [handleMove, autoplay]
  );

  return (
    <div
      ref={sliderRef}
      className={cn("w-[90vw] h-[90vh] overflow-hidden", className)}
      style={{
        position: "relative",
        cursor: slideMode === "drag" ? "grab" : "col-resize",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={mouseLeaveHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      <AnimatePresence initial={false}>
        <motion.div
          className="h-full w-px absolute top-0 m-auto z-30 bg-gradient-to-b from-transparent from-[5%] to-[95%] via-neutral-500 to-transparent"
          style={{
            left: `${sliderXPercent}%`,
            top: "0",
            zIndex: 40,
          }}
          transition={{ duration: 0 }}
        >
          <div className="w-10 h-3/4 top-1/2 -translate-y-1/2 absolute -right-10 [mask-image:radial-gradient(100px_at_left,white,transparent)]">
            <MemoizedSparklesCore
              background="transparent"
              minSize={0.1}
              maxSize={0.3}
              particleDensity={50}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
          </div>
          {showHandlebar && (
            <div className="h-8 w-8 rounded-md top-1/2 -translate-y-1/2 bg-white z-30 -right-4 absolute flex items-center justify-center shadow-[0px_-1px_0px_0px_#FFFFFF40]">
              <IconDotsVertical className="h-6 w-6 text-black" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="overflow-hidden w-full h-full relative z-20">
        <AnimatePresence initial={false}>
          {firstVideo ? (
            <motion.div
              className={cn(
                "absolute inset-0 z-20 rounded-2xl shrink-0 w-full h-full select-none overflow-hidden",
                firstVideoClassName
              )}
              style={{
                clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)`,
              }}
              transition={{ duration: 0 }}
            >
              <video
                ref={firstVideoRef}
                src={firstVideo}
                className={cn(
                  "absolute inset-0 z-20 rounded-2xl shrink-0 w-full h-full select-none pointer-events-none object-cover",
                  firstVideoClassName
                )}
                autoPlay={videoAutoplay}
                muted={videoMuted}
                loop={videoLoop}
                playsInline
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {secondVideo ? (
          <motion.video
            ref={secondVideoRef}
            className={cn(
              "absolute top-0 left-0 z-[19] rounded-2xl w-full h-full select-none pointer-events-none object-cover",
              secondVideoClassname
            )}
            src={secondVideo}
            autoPlay={videoAutoplay}
            muted={videoMuted}
            loop={videoLoop}
            playsInline
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
};

const MemoizedSparklesCore = React.memo(SparklesCore);
