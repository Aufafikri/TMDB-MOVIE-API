import { create } from "zustand";
import { useStoreMoviePersonCreditResposne } from "../../types/people/movie_credits/movieCredit";

export const useFilterHistory = create<useStoreMoviePersonCreditResposne>((set) => ({
    filter: '',
    setFilter: (filter) => set({ filter })
}))

export const useFilterActors = create<useStoreMoviePersonCreditResposne>((set) => ({
    filter: '',
    setFilter: (filter) => set({ filter })
}))