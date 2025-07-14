import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CaptionWord = {
  text: string;
  animation?: string;
  duration?: number;
  effect?: string;
  effectOptions?: Record<string, any>;
};

export type CaptionLine = {
  text: string;
  words: CaptionWord[];
};

interface CaptionState {
  lines: CaptionLine[];
  currentLine: number;
  animationTypes: string[];
  setLines: (lines: CaptionLine[]) => void;
  setCurrentLine: (idx: number) => void;
  setWordAnimation: (
    lineIdx: number,
    wordIdx: number,
    animation: string
  ) => void;
  setWordDuration: (lineIdx: number, wordIdx: number, duration: number) => void;
  setWordEffect: (
    lineIdx: number,
    wordIdx: number,
    effect: string
  ) => void;
  setWordEffectOptions: (
    lineIdx: number,
    wordIdx: number,
    options: Record<string, any>
  ) => void;
}

function splitWords(text: string): CaptionWord[] {
  return text.split(/\s+/).map((w) => ({ text: w, duration: 0.5, effect: "none" }));
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
      }),
    }
  )
);
