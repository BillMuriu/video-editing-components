"use client";

import Image from "next/image";
import React from "react";

import { useMotionValue, useTransform, motion } from "framer-motion";

const Card = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 0, 100], [30, 0, -30]);
  const rotateY = useTransform(x, [-100, 0, 100], [-30, 0, 30]);

  const colors = [
    { value: "#b6a179", name: "Desert Sand" },
    { value: "#272425", name: "Black" },
    { value: "#6389cb", name: "Blue" },
    { value: "#f2c758", name: "Yellow" },
    { value: "#ffffff", name: "White" },
  ];
  return (
    <div style={{ perspective: 2000 }}>
      {/* Ambient floating particles */}
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -30, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 left-10 w-2 h-2 bg-white/40 rounded-full blur-sm"
      />
      <motion.div
        animate={{
          x: [0, -15, 0],
          y: [0, 25, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-32 right-20 w-3 h-3 bg-blue-200/30 rounded-full blur-sm"
      />
      <motion.div
        animate={{
          x: [0, 10, 0],
          y: [0, -20, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute bottom-20 left-1/3 w-1 h-1 bg-yellow-200/50 rounded-full blur-sm"
      />

      <motion.div
        style={{ x, y, rotateX, rotateY, z: 100 }}
        animate={{
          y: [-5, 5, -5],
          rotateX: [-2, 2, -2],
          rotateY: [-1, 1, -1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        drag
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        whileTap={{ cursor: "grabbing" }}
        dragElastic={0.18}
        className="relative w-[426px] min-h-[600px] bg-gradient-to-br from-[#e4dfdc] to-[#d4cfc8] rounded-[30px] border-[4px] border-white px-[40px] py-[24px] cursor-grab shadow-2xl"
      >
        <div className="mb-6">
          <Image
            src="/logo.svg"
            alt="Nike Logo"
            width={35}
            height={24}
            className="object-contain"
          />
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">
            Air Max 270
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Men&apos;s Lifestyle Shoes
          </p>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Experience all-day comfort with the Air Max 270. Featuring
            Nike&apos;s largest heel Air unit yet, this revolutionary design
            delivers incredible cushioning and a bold, street-ready style that
            turns heads wherever you go.
          </p>
        </div>

        <div className="flex items-center justify-between mb-8">
          <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg">
            Add to Cart
          </button>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-800">$150</div>
            <div className="text-sm text-gray-500 line-through">$180</div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">Colors</p>
          <ul className="flex gap-3 mb-4">
            {colors.map((color, index) => {
              return (
                <li
                  key={index}
                  style={{ backgroundColor: color.value }}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 cursor-pointer hover:scale-110 transition-transform duration-200 shadow-md relative group"
                  title={color.name}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {color.name}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <motion.div
          style={{ x, y, rotateX, rotateY, z: 100000 }}
          animate={{
            x: [-10, 10, -10],
            y: [-8, 8, -8],
            rotateZ: [-1, 1, -1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-25 -right-60 w-[500px]"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              filter: [
                "drop-shadow(0 0 20px rgba(255,255,255,0.3))",
                "drop-shadow(0 0 30px rgba(255,255,255,0.5))",
                "drop-shadow(0 0 20px rgba(255,255,255,0.3))",
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/nike.png"
              alt="Nike Air Max 270"
              draggable="false"
              width={1000}
              height={600}
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Card;
