import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ControlPanelState {
  iframeLink: string;
  setIframeLink: (v: string) => void;
  bounceVigor: number;
  setBounceVigor: (v: number) => void;
  videoTitle: string;
  setVideoTitle: (v: string) => void;
  channelName: string;
  setChannelName: (v: string) => void;
  entranceDelay: number;
  setEntranceDelay: (v: number) => void;
  zoomDuration: number;
  setZoomDuration: (v: number) => void;
  staggerSpeed: number;
  setStaggerSpeed: (v: number) => void;
}

export const useControlPanelStore = create<ControlPanelState>()(
  persist(
    (set) => ({
      iframeLink: "https://ui.shadcn.com/docs/components/dialog",
      setIframeLink: (v) => set({ iframeLink: v }),
      bounceVigor: 12,
      setBounceVigor: (v) => set({ bounceVigor: v }),
      videoTitle: "How to Build Amazing React Components in 2025",
      setVideoTitle: (v) => set({ videoTitle: v }),
      channelName: "TechChannel Name",
      setChannelName: (v) => set({ channelName: v }),
      entranceDelay: 0.15,
      setEntranceDelay: (v) => set({ entranceDelay: v }),
      zoomDuration: 1.1,
      setZoomDuration: (v) => set({ zoomDuration: v }),
      staggerSpeed: 0.12,
      setStaggerSpeed: (v) => set({ staggerSpeed: v }),
    }),
    {
      name: "control-panel-storage",
    }
  )
);
