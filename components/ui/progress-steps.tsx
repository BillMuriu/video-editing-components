"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

type ProgressStep = {
  step: string;
  title: string;
};

export function ProgressSteps({
  steps,
  currentStep,
}: {
  steps: ProgressStep[];
  currentStep: number;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 max-w-[90vw] mx-auto">
      {steps.map((stepItem, index) => (
        <div key={stepItem.step} className="flex items-center">
          {/* Step Card */}
          <div
            className={cn(
              "relative bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 rounded-2xl border border-neutral-300 dark:border-neutral-600 p-8 md:p-12 transition-all duration-500 ease-out min-w-[200px] md:min-w-[280px] min-h-[160px] md:min-h-[220px]",
              index > currentStep && "blur-sm scale-[0.95] opacity-50",
              index <= currentStep && "shadow-2xl"
            )}
          >
            {/* Step Number Circle */}
            <div
              className={cn(
                "flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full border-4 transition-all duration-500 mx-auto mb-4",
                index <= currentStep
                  ? "bg-neutral-800 border-neutral-800 text-white dark:bg-neutral-200 dark:border-neutral-200 dark:text-neutral-800"
                  : "bg-transparent border-neutral-400 text-neutral-400 dark:border-neutral-500 dark:text-neutral-500"
              )}
            >
              <span className="text-lg md:text-2xl font-bold">{index + 1}</span>
            </div>

            {/* Step Info */}
            <div className="text-center">
              <div
                className={cn(
                  "text-sm md:text-lg font-semibold transition-all duration-500 mb-2",
                  index <= currentStep
                    ? "text-neutral-800 dark:text-neutral-200"
                    : "text-neutral-500 dark:text-neutral-400"
                )}
              >
                {stepItem.step}
              </div>
              <div
                className={cn(
                  "text-sm md:text-base text-neutral-600 dark:text-neutral-400 transition-all duration-500",
                  index <= currentStep ? "opacity-100" : "opacity-60"
                )}
              >
                {stepItem.title}
              </div>
            </div>
          </div>

          {/* Arrow (only show if not last step) */}
          {index < steps.length - 1 && (
            <div className="mx-4 md:mx-8">
              <ChevronRight
                size={32}
                className={cn(
                  "transition-all duration-500",
                  index < currentStep
                    ? "text-neutral-600 dark:text-neutral-400 opacity-100"
                    : "text-neutral-300 dark:text-neutral-600 opacity-50"
                )}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
