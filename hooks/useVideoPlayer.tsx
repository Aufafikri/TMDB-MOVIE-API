import { VideoPlayerStore } from "../types/video/Video";
import { create } from "zustand";

export const useVideoPlayer = create<VideoPlayerStore>((set) => ({
    isOpen: true,
    togglePlayer: () => set((state) => ({ isOpen: !state.isOpen })),
    closePlayer: () => set({ isOpen: false })
}))
