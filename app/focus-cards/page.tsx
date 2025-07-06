"use client";
import { FocusCards } from "@/components/ui/focus-cards";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FocusCardsDemo() {
  const [currentStep, setCurrentStep] = useState(-1); // Start with all cards blurred

  const cards = [
    {
      step: "Step 1",
      title: "Define Your Goal",
      description:
        "Clearly identify what you want to achieve and set specific, measurable objectives.",
    },
    {
      step: "Step 2",
      title: "Research & Plan",
      description:
        "Gather information, analyze requirements, and create a detailed roadmap.",
    },
    {
      step: "Step 3",
      title: "Take Action",
      description:
        "Execute your plan systematically, breaking down tasks into manageable chunks.",
    },
    {
      step: "Step 4",
      title: "Monitor Progress",
      description:
        "Track your advancement, measure results, and adjust your approach as needed.",
    },
    {
      step: "Step 5",
      title: "Optimize & Scale",
      description:
        "Refine your process, eliminate inefficiencies, and expand successful strategies.",
    },
    {
      step: "Step 6",
      title: "Celebrate Success",
      description:
        "Acknowledge achievements, learn from the journey, and set new ambitious goals.",
    },
  ];

  const nextStep = () => {
    if (currentStep < cards.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep >= 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-7xl mx-auto px-8">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Step-by-Step Presentation
        </h1>
        <p className="text-neutral-500 text-center mb-12 text-lg">
          Use the navigation arrows to reveal each step in your presentation
        </p>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <button
            onClick={prevStep}
            disabled={currentStep < 0}
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300",
              currentStep < 0
                ? "border-neutral-300 text-neutral-300 cursor-not-allowed dark:border-neutral-700 dark:text-neutral-700"
                : "border-neutral-600 text-neutral-600 hover:border-neutral-800 hover:text-neutral-800 hover:bg-neutral-100 dark:border-neutral-400 dark:text-neutral-400 dark:hover:border-neutral-200 dark:hover:text-neutral-200 dark:hover:bg-neutral-800"
            )}
          >
            <ChevronLeft size={24} />
          </button>

          <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400 min-w-[120px] text-center">
            {currentStep === -1
              ? "Ready to start"
              : `Step ${currentStep + 1} of ${cards.length}`}
          </div>

          <button
            onClick={nextStep}
            disabled={currentStep >= cards.length - 1}
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300",
              currentStep >= cards.length - 1
                ? "border-neutral-300 text-neutral-300 cursor-not-allowed dark:border-neutral-700 dark:text-neutral-700"
                : "border-neutral-600 text-neutral-600 hover:border-neutral-800 hover:text-neutral-800 hover:bg-neutral-100 dark:border-neutral-400 dark:text-neutral-400 dark:hover:border-neutral-200 dark:hover:text-neutral-200 dark:hover:bg-neutral-800"
            )}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Main Content - FocusCards */}
        <FocusCards cards={cards} currentStep={currentStep} />
      </div>
    </div>
  );
}
