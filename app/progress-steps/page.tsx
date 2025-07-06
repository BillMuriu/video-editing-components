"use client";
import { ProgressSteps } from "@/components/ui/progress-steps";
import { useState, useEffect } from "react";

export default function ProgressStepsDemo() {
  const [currentStep, setCurrentStep] = useState(-1); // Start with no progress

  const steps = [
    {
      step: "Step 1",
      title: "Define Your Goal",
    },
    {
      step: "Step 2",
      title: "Research & Plan",
    },
    {
      step: "Step 3",
      title: "Take Action",
    },
    {
      step: "Step 4",
      title: "Monitor Progress",
    },
    {
      step: "Step 5",
      title: "Optimize & Scale",
    },
    {
      step: "Step 6",
      title: "Celebrate Success",
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep >= 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
      } else if (event.key === "ArrowLeft") {
        setCurrentStep((prev) => (prev >= 0 ? prev - 1 : prev));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [steps.length]);

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center"
      tabIndex={0}
    >
      <div className="max-w-[95vw] mx-auto px-4">
        {/* Progress Steps Component */}
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-3xl p-8 md:p-20 border border-neutral-200 dark:border-neutral-800">
          <ProgressSteps steps={steps} currentStep={currentStep} />
        </div>
      </div>
    </div>
  );
}
