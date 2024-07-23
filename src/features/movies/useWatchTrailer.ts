import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Trailer } from "../../../types/trailers/trailer"

export const useWatchTrailer = (trailerId: string | number | null) => {
    return useQuery<Trailer[]>({
        queryKey: ["trailer", trailerId],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/${trailerId}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
            console.log('trailer id bos', trailerId)
            return response.data.results
        },
        enabled: !!trailerId
    })
}