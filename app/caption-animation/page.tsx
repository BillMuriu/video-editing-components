import React from "react";
import { CaptionEditor } from "./components/CaptionEditor";
import { CaptionPreview } from "./components/CaptionPreview";

const CaptionAnimation = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Editor Panel */}
      <div className="w-full md:w-1/2 p-4 border-r border-gray-200">
        <CaptionEditor />
      </div>
      {/* Preview Panel */}
      <div className="w-full md:w-1/2 p-4 flex items-center justify-center bg-gray-50">
        <CaptionPreview />
      </div>
    </div>
  );
};

export default CaptionAnimation;
