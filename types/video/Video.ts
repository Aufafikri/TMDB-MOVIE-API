export interface VideoPlayerStore {
    isOpen: boolean;
    togglePlayer: () => void;
    closePlayer: () => void
}