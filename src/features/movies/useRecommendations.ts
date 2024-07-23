import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { discoverMovieType } from "../../../types/discovers/discoverMovies"

export const useRecomemndations = (id: number) => {
    return useQuery<discoverMovieType[]>({
        queryKey: ["recommendations", id],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/${id}/recommendations?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
            return response.data.results
        }
    })
}