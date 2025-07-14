import { create } from "zustand";
import { persist } from "zustand/middleware";

export type EffectOptions = {
  type?: string;
  from?: string;
  to?: string;
  angle?: number;
};

export type CaptionWord = {
  text: string;
  animation?: string;
  duration?: number;
  effect?: string;
  effectOptions?: EffectOptions;
};

export type CaptionLine = {
  text: string;
  words: CaptionWord[];
};

export type BackgroundOptions = {
  // For grid
  color?: string;
  size?: number;
  // For dots
  dotColor?: string;
  dotSize?: number;
  spacing?: number;
  // For gradient
  from?: string;
  to?: string;
  angle?: number;
  type?: string;
};

interface BackgroundSettings {
  type: "none" | "grid" | "dots" | "gradient";
  options?: BackgroundOptions;
}

interface PreviewDimensions {
  aspect: "16:9" | "4:3" | "1:1" | "9:16" | "custom";
  width: number;
  height: number;
}

interface CaptionState {
  lines: CaptionLine[];
  currentLine: number;
  animationTypes: string[];
  background: BackgroundSettings;
  previewDimensions: PreviewDimensions;
  setPreviewDimensions: (dims: PreviewDimensions) => void;
  setBackground: (bg: BackgroundSettings) => void;
  setLines: (lines: CaptionLine[]) => void;
  setCurrentLine: (idx: number) => void;
  setWordAnimation: (
    lineIdx: number,
    wordIdx: number,
    animation: string
  ) => void;
  setWordDuration: (lineIdx: number, wordIdx: number, duration: number) => void;
  setWordEffect: (lineIdx: number, wordIdx: number, effect: string) => void;
  setWordEffectOptions: (
    lineIdx: number,
    wordIdx: number,
    options: EffectOptions
  ) => void;
}

function splitWords(text: string): CaptionWord[] {
  return text
    .split(/\s+/)
    .map((w) => ({ text: w, duration: 0.5, effect: "none" }));
}

export const useCaptionStore = create<CaptionState>(
  persist(
    (set) => ({
      lines: [
        {
          text: "The component you're referring to",
          words: splitWords("The component you're referring to"),
        },
        {
          text: "is called an iframe.",
          words: splitWords("is called an iframe."),
        },
      ],
      currentLine: 0,
      animationTypes: ["fade", "slide", "bounce"],
      background: { type: "none", options: {} },
      previewDimensions: { aspect: "16:9", width: 1280, height: 720 },
      setPreviewDimensions: (dims) => set({ previewDimensions: dims }),
      setBackground: (bg) => set({ background: bg }),
      setLines: (lines) => set({ lines }),
      setCurrentLine: (idx) => set({ currentLine: idx }),
      // No line-level animation/duration/exit
      setWordAnimation: (lineIdx, wordIdx, animation) =>
        set((state) => {
          const lines = [...state.lines];
          const words = [...lines[lineIdx].words];
          words[wordIdx] = { ...words[wordIdx], animation };
          lines[lineIdx] = { ...lines[lineIdx], words };
          return { lines };
        }),
      setWordDuration: (lineIdx, wordIdx, duration) =>
        set((state) => {
          const lines = [...state.lines];
          const words = [...lines[lineIdx].words];
          words[wordIdx] = { ...words[wordIdx], duration };
          lines[lineIdx] = { ...lines[lineIdx], words };
          return { lines };
        }),
      setWordEffect: (lineIdx, wordIdx, effect) =>
        set((state) => {
          const lines = [...state.lines];
          const words = [...lines[lineIdx].words];
          words[wordIdx] = { ...words[wordIdx], effect };
          lines[lineIdx] = { ...lines[lineIdx], words };
          return { lines };
        }),
      setWordEffectOptions: (lineIdx, wordIdx, options) =>
        set((state) => {
          const lines = [...state.lines];
          const words = [...lines[lineIdx].words];
          words[wordIdx] = { ...words[wordIdx], effectOptions: options };
          lines[lineIdx] = { ...lines[lineIdx], words };
          return { lines };
        }),
    }),
    {
      name: "caption-store-v1",
      partialize: (state) => ({
        lines: state.lines,
        currentLine: state.currentLine,
        background: state.background,
        previewDimensions: state.previewDimensions,
      }),
    }
  )
);
