import { create } from "zustand";
import { movieState } from "../types/discovers/discoverMovies";

export const useMovieSlice = create<movieState>((set) => ({
    movies: [],
    setMovies: (movies) => set({ movies }),
    slice: [0, 8],
    setSlice: (slice) => set({ slice })
}))