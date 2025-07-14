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
    { text: "In This Video", duration: 1800 },
    { text: "You'll learn", duration: 1000 },
    { text: "How to Animate", duration: 100 },
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
