"use client";

import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ThumbsUp,
  ThumbsDown,
  Share,
  Bookmark,
  Clock,
  Heart,
  Reply,
} from "lucide-react";
import { motion } from "framer-motion";

const InThisVideo = () => {
  const [zoomed, setZoomed] = useState(false);
  const [centerY, setCenterY] = useState(0);
  const videoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ZOOM_SCALE = 1.7;

  useLayoutEffect(() => {
    if (zoomed && videoRef.current && containerRef.current) {
      const videoRect = videoRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const containerCenter = containerRect.top + containerRect.height / 2;
      const videoCenter = videoRect.top + videoRect.height / 2;
      // Calculate the distance from video center to container center
      const delta = videoCenter - containerCenter;
      // After scaling, the distance increases by (scale - 1) * delta
      const scaledDelta = delta * (ZOOM_SCALE - 1);
      // The new video center will be at containerCenter + scaledDelta
      // So offset needed to bring it to viewport center, but a bit lower:
      const offset = viewportCenter - (containerCenter + scaledDelta) + 120; // move 120px lower
      setCenterY(offset);
    }
  }, [zoomed]);

  useEffect(() => {
    // Trigger zoom after all entrance animations (e.g. 2.2s)
    const timeout = setTimeout(() => setZoomed(true), 2200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ scale: 1, y: 0 }}
      animate={
        zoomed
          ? { scale: ZOOM_SCALE, y: centerY }
          : { scale: 1, y: 0 }
      }
      transition={{ duration: 1.1, ease: "easeInOut" }}
      className="min-h-screen p-2 md:p-4 flex items-center justify-center overflow-hidden"
      style={{ zIndex: 10, background: '#fff' }}
    >
      <div className="max-w-3xl w-full mx-auto space-y-3">
        {/* LAYER 1: VIDEO SECTION - Slides in first and fastest */}
        <motion.div
          ref={videoRef}
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={
            zoomed
              ? "w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg z-20"
              : "w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg"
          }
          style={{}}
        >
          <div className="w-full h-full flex items-center justify-center text-white text-xl font-semibold">
            Video Player Area
          </div>
        </motion.div>

        {/* CONTENT CONTAINER - Light gray background for all content below video */}
        <motion.div
          animate={zoomed ? { opacity: 0, y: 40 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* LAYER 2: VIDEO TITLE */}
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: "easeOut",
              type: "spring",
              damping: 12,
              stiffness: 200,
              mass: 0.8,
            }}
          >
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
              How to Build Amazing React Components in 2025
            </h1>
          </motion.div>

          {/* LAYER 3: VIEWS & TIME INFO */}
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: 0.25,
              ease: "easeOut",
              type: "spring",
              damping: 10,
              stiffness: 180,
              mass: 0.9,
            }}
            className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
          >
            <span>1,234,567 views</span>
            <span>•</span>
            <span>2 hours ago</span>
          </motion.div>

          {/* LAYER 4: CHANNEL INFO & SUBSCRIBE */}
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.0,
              delay: 0.35,
              ease: "easeOut",
              type: "spring",
              damping: 8,
              stiffness: 160,
              mass: 1.0,
            }}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src="/api/placeholder/48/48"
                  alt="Channel Avatar"
                />
                <AvatarFallback className="bg-blue-500 text-white">
                  TC
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  TechChannel Name
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  2.5M subscribers
                </p>
              </div>
            </div>
            <Button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full font-medium text-sm">
              SUBSCRIBE
            </Button>
          </motion.div>

          {/* LAYER 5: ENGAGEMENT BUTTONS */}
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.1,
              delay: 0.45,
              ease: "easeOut",
              type: "spring",
              damping: 7,
              stiffness: 140,
              mass: 1.1,
            }}
            className="flex items-center space-x-2 py-3 border-t border-b border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs"
              >
                <ThumbsUp className="w-4 h-4" />
                <span className="font-medium">123K</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs"
              >
                <ThumbsDown className="w-4 h-4" />
                <span className="font-medium">2</span>
              </Button>
            </div>

            <div className="flex items-center space-x-1 ml-3">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs"
              >
                <Share className="w-4 h-4" />
                <span className="font-medium">Share</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs"
              >
                <Bookmark className="w-4 h-4" />
                <span className="font-medium">Save</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs"
              >
                <Clock className="w-4 h-4" />
                <span className="font-medium">Later</span>
              </Button>
            </div>
          </motion.div>

          {/* LAYER 6: COMMENTS SECTION */}
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.55,
              ease: "easeOut",
              type: "spring",
              damping: 6,
              stiffness: 120,
              mass: 1.2,
            }}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Comments
              </h3>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                (1,847)
              </span>
            </div>

            {/* Top Comment Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3 shadow-sm">
              <div className="flex items-start space-x-3">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage
                    src="/api/placeholder/40/40"
                    alt="Commenter Avatar"
                  />
                  <AvatarFallback className="bg-green-500 text-white text-xs">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      @johndev2025
                    </h4>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      3 hours ago
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                    &ldquo;This is exactly what I was looking for! Your
                    explanation of React components is so clear and practical.
                    Can&apos;t wait to implement these techniques in my project.
                    Thank you!&rdquo;
                  </p>
                  <div className="flex items-center space-x-3 pt-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-1"
                    >
                      <Heart className="w-3 h-3" />
                      <span className="text-xs">124</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-1"
                    >
                      <Reply className="w-3 h-3" />
                      <span className="text-xs">Reply</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InThisVideo;
