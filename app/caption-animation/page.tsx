"use client";
import React, { useState, useEffect } from "react";
import { CaptionEditor } from "./components/CaptionEditor";
import { CaptionPreview } from "./components/CaptionPreview";
import { useCaptionStore } from "./components/captionStore";

const CaptionAnimation = () => {
  const [fullscreen, setFullscreen] = useState(false);
  const [showFullDimension, setShowFullDimension] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const { lines, previewDimensions } = useCaptionStore();

  // Keyboard navigation for fullscreen preview
  useEffect(() => {
    if (!fullscreen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentLine((prev) => Math.min(prev + 1, lines.length - 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentLine((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Escape") {
        setFullscreen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [fullscreen, lines.length]);

  // Reset line index when entering fullscreen
  useEffect(() => {
    if (fullscreen) setCurrentLine(0);
  }, [fullscreen]);

  if (fullscreen) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.85)",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {lines.length > 0 && (
            <CaptionPreview lineIndex={currentLine} fullscreen />
          )}
        </div>
        <div style={{ marginTop: 32, display: "flex", gap: 16 }}>
          <button
            onClick={() => setFullscreen(false)}
            style={{
              padding: "10px 32px",
              fontSize: 18,
              borderRadius: 8,
              background: "#fff",
              color: "#222",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Exit
          </button>
        </div>
        <div style={{ marginTop: 16, color: "#fff", fontSize: 16 }}>
          <span>Use ← and → to switch lines. Esc to exit.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Editor Panel */}
      <div className="w-full md:w-1/2 p-4 border-r border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Caption Animation Editor</h1>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => setFullscreen(true)}
          >
            Fullscreen Preview
          </button>
        </div>
        <CaptionEditor />
      </div>

      {/* Preview Panel */}
      <div className="w-full md:w-1/2 p-4 flex flex-col items-center justify-center bg-gray-50">
        <div className="mb-4 flex gap-2">
          <button
            className={`px-4 py-2 rounded transition ${
              !showFullDimension
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setShowFullDimension(false)}
          >
            Scaled Preview
          </button>
          <button
            className={`px-4 py-2 rounded transition ${
              showFullDimension
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setShowFullDimension(true)}
          >
            Full Dimension
          </button>
        </div>

        <div className="w-full overflow-auto max-h-full">
          <CaptionPreview showFullDimension={showFullDimension} />
        </div>
      </div>
    </div>
  );
};

export default CaptionAnimation;
