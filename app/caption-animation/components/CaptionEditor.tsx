"use client";

import React, { useState } from "react";
import { useCaptionStore } from "./captionStore";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const CaptionEditor = () => {
  const {
    lines,
    setLines,
    setCurrentLine,
    animationTypes,
    setWordAnimation,
    setWordDuration,
    setWordEffect,
    setWordEffectOptions,
    background,
    setBackground,
    previewDimensions,
    setPreviewDimensions,
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
          const prevEffect = lines[idx]?.words?.[widx]?.effect;
          const prevEffectOptions = lines[idx]?.words?.[widx]?.effectOptions;
          const wordObj: any = { text: w };
          if (prevAnim) wordObj.animation = prevAnim;
          if (prevDuration !== undefined) wordObj.duration = prevDuration;
          if (prevEffect) wordObj.effect = prevEffect;
          if (prevEffectOptions) wordObj.effectOptions = prevEffectOptions;
          return wordObj;
        }),
      }))
    );
  };

  return (
    <div>
      <h2 className="font-bold mb-2">Preview Dimensions</h2>
      <div className="mb-4 flex flex-wrap items-center gap-2 p-2 border rounded bg-gray-50">
        <label className="font-semibold mr-2">Aspect Ratio:</label>
        <select
          value={previewDimensions.aspect}
          onChange={(e) => {
            const aspect = e.target.value as any;
            let width = previewDimensions.width;
            let height = previewDimensions.height;
            if (aspect === "16:9") {
              width = 1280;
              height = 720;
            } else if (aspect === "4:3") {
              width = 1024;
              height = 768;
            } else if (aspect === "1:1") {
              width = 800;
              height = 800;
            } else if (aspect === "9:16") {
              width = 720;
              height = 1280;
            }
            setPreviewDimensions({ aspect, width, height });
          }}
          className="text-xs border rounded px-2 py-1"
        >
          <option value="16:9">16:9</option>
          <option value="4:3">4:3</option>
          <option value="1:1">1:1</option>
          <option value="9:16">9:16</option>
          <option value="custom">Custom</option>
        </select>
        <label className="ml-2 text-xs">Width:</label>
        <input
          type="number"
          min={100}
          max={3840}
          value={previewDimensions.width}
          onChange={(e) =>
            setPreviewDimensions({
              ...previewDimensions,
              width: Number(e.target.value),
              aspect: "custom",
            })
          }
          className="w-20 text-xs border rounded px-1"
          disabled={previewDimensions.aspect !== "custom"}
        />
        <label className="ml-2 text-xs">Height:</label>
        <input
          type="number"
          min={100}
          max={2160}
          value={previewDimensions.height}
          onChange={(e) =>
            setPreviewDimensions({
              ...previewDimensions,
              height: Number(e.target.value),
              aspect: "custom",
            })
          }
          className="w-20 text-xs border rounded px-1"
          disabled={previewDimensions.aspect !== "custom"}
        />
      </div>
      <h2 className="font-bold mb-2">Background</h2>
      <div className="mb-4 flex flex-wrap items-center gap-2 p-2 border rounded bg-gray-50">
        {/* ...existing background controls... */}
        <label className="font-semibold mr-2">Type:</label>
        <select
          value={background.type}
          onChange={(e) =>
            setBackground({ ...background, type: e.target.value as any })
          }
          className="text-xs border rounded px-2 py-1"
        >
          <option value="none">None</option>
          <option value="grid">Grid</option>
          <option value="dots">Dots</option>
          <option value="gradient">Gradient</option>
        </select>
        {/* ...existing background options... */}
        {background.type === "grid" && (
          <>
            {/* ...grid options... */}
            <label className="ml-2 text-xs">Color:</label>
            <input
              type="color"
              value={background.options?.color || "#e5e7eb"}
              onChange={(e) =>
                setBackground({
                  ...background,
                  options: { ...background.options, color: e.target.value },
                })
              }
            />
            <label className="ml-2 text-xs">Size:</label>
            <input
              type="number"
              min={8}
              max={64}
              value={background.options?.size ?? 24}
              onChange={(e) =>
                setBackground({
                  ...background,
                  options: {
                    ...background.options,
                    size: Number(e.target.value),
                  },
                })
              }
              className="w-14 text-xs border rounded px-1"
            />
          </>
        )}
        {background.type === "dots" && (
          <>
            {/* ...dots options... */}
            <label className="ml-2 text-xs">Dot Color:</label>
            <input
              type="color"
              value={background.options?.dotColor || "#d1d5db"}
              onChange={(e) =>
                setBackground({
                  ...background,
                  options: { ...background.options, dotColor: e.target.value },
                })
              }
            />
            <label className="ml-2 text-xs">Dot Size:</label>
            <input
              type="number"
              min={2}
              max={16}
              value={background.options?.dotSize ?? 4}
              onChange={(e) =>
                setBackground({
                  ...background,
                  options: {
                    ...background.options,
                    dotSize: Number(e.target.value),
                  },
                })
              }
              className="w-12 text-xs border rounded px-1"
            />
            <label className="ml-2 text-xs">Spacing:</label>
            <input
              type="number"
              min={8}
              max={64}
              value={background.options?.spacing ?? 24}
              onChange={(e) =>
                setBackground({
                  ...background,
                  options: {
                    ...background.options,
                    spacing: Number(e.target.value),
                  },
                })
              }
              className="w-14 text-xs border rounded px-1"
            />
          </>
        )}
        {background.type === "gradient" && (
          <>
            {/* ...gradient options... */}
            <label className="ml-2 text-xs">From:</label>
            <input
              type="color"
              value={background.options?.from || "#ff0080"}
              onChange={(e) =>
                setBackground({
                  ...background,
                  options: { ...background.options, from: e.target.value },
                })
              }
            />
            <label className="ml-2 text-xs">To:</label>
            <input
              type="color"
              value={background.options?.to || "#7928ca"}
              onChange={(e) =>
                setBackground({
                  ...background,
                  options: { ...background.options, to: e.target.value },
                })
              }
            />
            <label className="ml-2 text-xs">Angle:</label>
            <input
              type="number"
              min={0}
              max={360}
              value={background.options?.angle ?? 90}
              onChange={(e) =>
                setBackground({
                  ...background,
                  options: {
                    ...background.options,
                    angle: Number(e.target.value),
                  },
                })
              }
              className="w-12 text-xs border rounded px-1"
            />
            <label className="ml-2 text-xs">Type:</label>
            <select
              value={background.options?.type || "linear"}
              onChange={(e) =>
                setBackground({
                  ...background,
                  options: { ...background.options, type: e.target.value },
                })
              }
              className="text-xs border rounded px-1"
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
          </>
        )}
      </div>
      <h2 className="font-bold mb-2">Caption Lines</h2>
      <textarea
        className="w-full border rounded p-2 mb-4"
        rows={8}
        value={input}
        onChange={handleInputChange}
        placeholder="Enter one caption line per row"
      />
      <h3 className="font-semibold mb-2">Word Animations</h3>
      <ScrollArea className="h-96 w-full rounded-md border bg-white">
        <div className="p-2">
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
                      onChange={(e) =>
                        setWordAnimation(idx, widx, e.target.value)
                      }
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
                    <select
                      value={word.effect || "none"}
                      onChange={(e) => setWordEffect(idx, widx, e.target.value)}
                      className="text-xs ml-1"
                      title="Effect"
                    >
                      <option value="none">No Effect</option>
                      <option value="bold">Bold</option>
                      <option value="italic">Italic</option>
                      <option value="gradient">Gradient</option>
                    </select>
                    {/* Gradient effect options panel */}
                    {word.effect === "gradient" && (
                      <span className="flex items-center gap-1 ml-1">
                        <select
                          value={word.effectOptions?.type || "linear"}
                          onChange={(e) =>
                            setWordEffectOptions(idx, widx, {
                              ...word.effectOptions,
                              type: e.target.value,
                            })
                          }
                          className="text-xs"
                          title="Gradient Type"
                        >
                          <option value="linear">Linear</option>
                          <option value="radial">Radial</option>
                        </select>
                        <input
                          type="color"
                          value={word.effectOptions?.from || "#ff0080"}
                          onChange={(e) =>
                            setWordEffectOptions(idx, widx, {
                              ...word.effectOptions,
                              from: e.target.value,
                            })
                          }
                          title="From Color"
                        />
                        <input
                          type="color"
                          value={word.effectOptions?.to || "#7928ca"}
                          onChange={(e) =>
                            setWordEffectOptions(idx, widx, {
                              ...word.effectOptions,
                              to: e.target.value,
                            })
                          }
                          title="To Color"
                        />
                        {(!word.effectOptions?.type ||
                          word.effectOptions?.type === "linear") && (
                          <input
                            type="number"
                            min={0}
                            max={360}
                            step={1}
                            value={word.effectOptions?.angle ?? 90}
                            onChange={(e) =>
                              setWordEffectOptions(idx, widx, {
                                ...word.effectOptions,
                                angle: Number(e.target.value),
                              })
                            }
                            className="w-12 text-xs border rounded px-1"
                            placeholder="Angle"
                            title="Angle (deg)"
                          />
                        )}
                      </span>
                    )}
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
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};
