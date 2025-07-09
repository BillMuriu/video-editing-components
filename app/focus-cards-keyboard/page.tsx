"use client";
import { FocusCardsKeyboard } from "./_components/focus-cards-keyboard";
import { useState, useEffect } from "react";

export default function FocusCardsKeyboardDemo() {
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        if (currentStep < cards.length - 1) {
          setCurrentStep(currentStep + 1);
        }
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (currentStep >= 0) {
          setCurrentStep(currentStep - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, cards.length]);

  return (
    <div className="min-h-screen py-20" style={{ backgroundColor: "#00FF00" }}>
      <div className="max-w-7xl mx-auto px-8">
        {/* Main Content - FocusCards */}
        <FocusCardsKeyboard cards={cards} currentStep={currentStep} />
      </div>
    </div>
  );
}
