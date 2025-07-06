"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(
  ({
    card,
    index,
    currentStep,
  }: {
    card: Card;
    index: number;
    currentStep: number;
  }) => (
    <div
      className={cn(
        "rounded-lg relative bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 overflow-hidden h-60 md:h-80 w-full transition-all duration-500 ease-out flex flex-col items-center justify-center p-6 text-center border border-neutral-300 dark:border-neutral-600",
        index > currentStep && "blur-sm scale-[0.95] opacity-50"
      )}
    >
      <div className="text-3xl md:text-4xl font-bold mb-4 text-neutral-700 dark:text-neutral-300">
        {card.step}
      </div>
      <div className="text-lg md:text-xl font-semibold mb-3 text-neutral-800 dark:text-neutral-200">
        {card.title}
      </div>
      <div className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {card.description}
      </div>
    </div>
  )
);

Card.displayName = "Card";

type Card = {
  step: string;
  title: string;
  description: string;
};

export function FocusCards({
  cards,
  currentStep,
}: {
  cards: Card[];
  currentStep: number;
}) {
  return (
    <div className="w-full">
      {/* Cards Grid - 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto md:px-8 w-full">
        {cards.map((card, index) => (
          <Card
            key={card.step}
            card={card}
            index={index}
            currentStep={currentStep}
          />
        ))}
      </div>
    </div>
  );
}
