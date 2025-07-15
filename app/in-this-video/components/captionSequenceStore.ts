import { create } from "zustand";

export interface CaptionItem {
  text: string;
  duration: number; // ms
}

interface CaptionSequenceState {
  captions: CaptionItem[];
  currentIndex: number;
  setCaptions: (captions: CaptionItem[]) => void;
  nextCaption: () => void;
  resetSequence: () => void;
}

export const useCaptionSequenceStore = create<CaptionSequenceState>((set) => ({
  captions: [
    { text: "In This Video", duration: 800 },
    { text: "We're", duration: 200 },
    { text: "fixing", duration: 200 },
    { text: "one", duration: 200 },
    { text: "of", duration: 200 },
    { text: "the most frustrating", duration: 300 },
    // { text: "issue", duration: 300 },
  ],
  currentIndex: 0,
  setCaptions: (captions) => set({ captions, currentIndex: 0 }),
  nextCaption: () =>
    set((state) => ({
      currentIndex:
        state.currentIndex + 1 < state.captions.length
          ? state.currentIndex + 1
          : state.currentIndex,
    })),
  resetSequence: () => set({ currentIndex: 0 }),
}));
