import { useQuery } from "@tanstack/react-query"
import axios from "axios"


export const useSearchMovie = (searchQuery: string) => {
    return useQuery({
        queryKey: ["search", searchQuery],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/search/movie?query=${searchQuery}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
            return response.data.results
        },
        enabled: !!searchQuery
    })
}