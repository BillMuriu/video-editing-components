import React from "react";
import { VideoCompare } from "@/components/ui/video-compare";

export default function VideoCompareDemo() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {/* <h1>Hey Ren</h1> */}
      <VideoCompare
        firstVideo="/video1.mp4"
        secondVideo="/video2.mp4"
        firstVideoClassName="object-cover"
        secondVideoClassname="object-cover"
        slideMode="drag"
        autoplay={false}
        videoAutoplay={false}
        videoMuted={true}
        videoLoop={true}
      />
    </div>
  );
}
