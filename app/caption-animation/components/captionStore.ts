import { create } from "zustand";
import { persist } from "zustand/middleware";

export type EffectOptions = {
  type?: string;
  from?: string;
  to?: string;
  angle?: number;
  direction?: "top" | "bottom";
  blurIntensity?: number;
  steps?: number;
};

export type CaptionWord = {
  text: string;
  animation?: string;
  duration?: number;
  effect?: string;
  effectOptions?: EffectOptions;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  textDecoration?: string;
  textTransform?: string;
  letterSpacing?: number;
  textColor?: string;
  spaceAfter?: number; // Space after this word in pixels
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
  effectTypes: string[];
  fontFamilies: string[];
  fontWeights: string[];
  textDecorations: string[];
  textTransforms: string[];
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
  setWordFontSize: (lineIdx: number, wordIdx: number, fontSize: number) => void;
  setWordFontFamily: (
    lineIdx: number,
    wordIdx: number,
    fontFamily: string
  ) => void;
  setWordFontWeight: (
    lineIdx: number,
    wordIdx: number,
    fontWeight: string
  ) => void;
  setWordTextDecoration: (
    lineIdx: number,
    wordIdx: number,
    textDecoration: string
  ) => void;
  setWordTextTransform: (
    lineIdx: number,
    wordIdx: number,
    textTransform: string
  ) => void;
  setWordLetterSpacing: (
    lineIdx: number,
    wordIdx: number,
    letterSpacing: number
  ) => void;
  setWordTextColor: (
    lineIdx: number,
    wordIdx: number,
    textColor: string
  ) => void;
  setWordSpaceAfter: (
    lineIdx: number,
    wordIdx: number,
    spaceAfter: number
  ) => void;
}

function splitWords(text: string): CaptionWord[] {
  return text.split(/\s+/).map((w) => ({
    text: w,
    duration: 0.5,
    effect: "none",
    fontSize: 48,
    fontFamily: "Inter",
    fontWeight: "700",
    textColor: "#1f2937",
    spaceAfter: 8, // Default 8px space after each word
  }));
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
      effectTypes: [
        "none",
        "shadow",
        "glow",
        "outline",
        "gradient",
        "blur",
        "neon",
        "emboss",
        "stroke",
        "highlight",
        "underline-animated",
        "rainbow",
        "glitch",
        "typewriter",
        "fade-in",
        "slide-up",
        "slide-down",
        "slide-left",
        "slide-right",
        "zoom-in",
        "zoom-out",
        "rotate",
        "flip",
        "bounce-in",
        "elastic",
        "pulse",
        "shake",
        "wobble",
        "flash",
        "rubberBand",
        "swing",
        "tada",
        "jello",
        "heartBeat",
        "backInUp",
        "backInDown",
        "backInLeft",
        "backInRight",
        "bounceIn",
        "bounceInDown",
        "bounceInLeft",
        "bounceInRight",
        "bounceInUp",
        "fadeIn",
        "fadeInDown",
        "fadeInDownBig",
        "fadeInLeft",
        "fadeInLeftBig",
        "fadeInRight",
        "fadeInRightBig",
        "fadeInUp",
        "fadeInUpBig",
        "fadeInTopLeft",
        "fadeInTopRight",
        "fadeInBottomLeft",
        "fadeInBottomRight",
        "flip",
        "flipInX",
        "flipInY",
        "lightSpeedIn",
        "lightSpeedInRight",
        "lightSpeedInLeft",
        "rotateIn",
        "rotateInDownLeft",
        "rotateInDownRight",
        "rotateInUpLeft",
        "rotateInUpRight",
        "jackInTheBox",
        "rollIn",
        "zoomIn",
        "zoomInDown",
        "zoomInLeft",
        "zoomInRight",
        "zoomInUp",
        "slideInDown",
        "slideInLeft",
        "slideInRight",
        "slideInUp",
      ],
      fontFamilies: [
        "Inter",
        "Arial",
        "Helvetica",
        "Times New Roman",
        "Georgia",
        "Verdana",
        "Tahoma",
        "Trebuchet MS",
        "Impact",
        "Comic Sans MS",
        "Courier New",
        "Lucida Console",
      ],
      fontWeights: [
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
      ],
      textDecorations: ["none", "underline", "line-through", "overline"],
      textTransforms: ["none", "uppercase", "lowercase", "capitalize"],
      background: { type: "none", options: {} },
      previewDimensions: { aspect: "16:9", width: 1280, height: 720 },
      setPreviewDimensions: (dims) => set({ previewDimensions: dims }),
      setBackground: (bg) => set({ background: bg }),
      setLines: (lines) => set({ lines }),
      setCurrentLine: (idx) => set({ currentLine: idx }),
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
      setWordFontSize: (lineIdx, wordIdx, fontSize) =>
        set((state) => {
          const lines = [...state.lines];
          const words = [...lines[lineIdx].words];
          words[wordIdx] = { ...words[wordIdx], fontSize };
          lines[lineIdx] = { ...lines[lineIdx], words };
          return { lines };
        }),
      setWordFontFamily: (lineIdx, wordIdx, fontFamily) =>
        set((state) => {
          const lines = [...state.lines];
          const words = [...lines[lineIdx].words];
          words[wordIdx] = { ...words[wordIdx], fontFamily };
          lines[lineIdx] = { ...lines[lineIdx], words };
          return { lines };
        }),
      setWordFontWeight: (lineIdx, wordIdx, fontWeight) =>
        set((state) => {
          const lines = [...state.lines];
          const words = [...lines[lineIdx].words];
          words[wordIdx] = { ...words[wordIdx], fontWeight };
          lines[lineIdx] = { ...lines[lineIdx], words };
          return { lines };
        }),
      setWordTextDecoration: (lineIdx, wordIdx, textDecoration) =>
        set((state) => {
          const lines = [...state.lines];
          const words = [...lines[lineIdx].words];
          words[wordIdx] = { ...words[wordIdx], textDecoration };
          lines[lineIdx] = { ...lines[lineIdx], words };
          return { lines };
        }),
      setWordTextTransform: (lineIdx, wordIdx, textTransform) =>
        set((state) => {
          const lines = [...state.lines];
          const words = [...lines[lineIdx].words];
          words[wordIdx] = { ...words[wordIdx], textTransform };
          lines[lineIdx] = { ...lines[lineIdx], words };
          return { lines };
        }),
      setWordLetterSpacing: (lineIdx, wordIdx, letterSpacing) =>
        set((state) => {
          const lines = [...state.lines];
          const words = [...lines[lineIdx].words];
          words[wordIdx] = { ...words[wordIdx], letterSpacing };
          lines[lineIdx] = { ...lines[lineIdx], words };
          return { lines };
        }),
      setWordTextColor: (lineIdx, wordIdx, textColor) =>
        set((state) => {
          const lines = [...state.lines];
          const words = [...lines[lineIdx].words];
          words[wordIdx] = { ...words[wordIdx], textColor };
          lines[lineIdx] = { ...lines[lineIdx], words };
          return { lines };
        }),
      setWordSpaceAfter: (lineIdx, wordIdx, spaceAfter) =>
        set((state) => {
          const lines = [...state.lines];
          const words = [...lines[lineIdx].words];
          words[wordIdx] = { ...words[wordIdx], spaceAfter };
          lines[lineIdx] = { ...lines[lineIdx], words };
          return { lines };
        }),
    }),
    {
      name: "caption-store-v2",
      partialize: (state) => ({
        lines: state.lines,
        currentLine: state.currentLine,
        background: state.background,
        previewDimensions: state.previewDimensions,
      }),
    }
  )
);
