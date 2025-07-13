"use client";

import React, { useState } from "react";
import { useCaptionStore } from "./captionStore";

export const CaptionEditor = () => {
  const {
    lines,
    setLines,
    setCurrentLine,
    animationTypes,
    setWordAnimation,
    setWordDuration,
  } = useCaptionStore();

  const [input, setInput] = useState(lines.map((l) => l.text).join("\n"));

  // Update lines from textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    const split = value.split("\n");
    setLines(
      split.map((text, idx) => ({
        text,
        words: text.split(/\s+/).map((w, widx) => {
          const prevAnim = lines[idx]?.words?.[widx]?.animation;
          const prevDuration = lines[idx]?.words?.[widx]?.duration;
          const wordObj = { text: w };
          if (prevAnim) wordObj.animation = prevAnim;
          if (prevDuration !== undefined) wordObj.duration = prevDuration;
          return wordObj;
        }),
      }))
    );
  };

  return (
    <div>
      <h2 className="font-bold mb-2">Caption Lines</h2>
      <textarea
        className="w-full border rounded p-2 mb-4"
        rows={8}
        value={input}
        onChange={handleInputChange}
        placeholder="Enter one caption line per row"
      />
      <h3 className="font-semibold mb-2">Word Animations</h3>
      {lines.map((line, idx) => (
        <div key={idx} className="mb-4 p-2 border rounded bg-gray-100">
          <div className="mb-1 font-mono">{line.text}</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {line.words?.map((word, widx) => (
              <span
                key={widx}
                className="inline-flex items-center gap-1 bg-white border rounded px-2 py-1"
              >
                <span>{word.text}</span>
                <select
                  value={word.animation}
                  onChange={(e) => setWordAnimation(idx, widx, e.target.value)}
                  className="text-xs"
                >
                  {animationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min={0.01}
                  step={0.01}
                  value={word.duration ?? ""}
                  onChange={(e) =>
                    setWordDuration(idx, widx, Number(e.target.value))
                  }
                  className="w-14 text-xs border rounded px-1 ml-1"
                  placeholder="s"
                  title="Duration (seconds)"
                />
              </span>
            ))}
          </div>
          <button
            className="mt-2 px-2 py-1 bg-blue-500 text-white rounded"
            onClick={() => setCurrentLine(idx)}
          >
            Preview
          </button>
        </div>
      ))}
    </div>
  );
};
