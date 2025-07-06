import React from "react";
import { Compare } from "@/components/ui/compare";

export default function CompareDemo() {
  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <div className="rounded-3xl border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <Compare
          firstImage="https://assets.aceternity.com/notes-dark.png"
          secondImage="https://assets.aceternity.com/linear-dark.png"
          firstImageClassName="object-cover object-left-top"
          secondImageClassname="object-cover object-left-top"
          className="h-[500px] w-[400px] md:h-[700px] md:w-[1000px]"
          slideMode="drag"
          autoplay={false}
        />
      </div>
    </div>
  );
}
