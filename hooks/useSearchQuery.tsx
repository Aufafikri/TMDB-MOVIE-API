import { create } from "zustand"
import { SearchQueryState } from "../types/search/Search"

export const useSearchQuery = create<SearchQueryState>((set) => ({
    searchTerm: '',
    setSearchTerm: (searchTerm) => ({ searchTerm })
}))