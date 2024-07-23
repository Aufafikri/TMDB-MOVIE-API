import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useUpComingMovie = () => {
    return useQuery({
        queryKey: ["up-coming"],
        queryFn: async () => { 
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
            const results = response.data.results

            if(results.length <= 8) {
                return results
            }

            const reproduce = Math.floor(Math.random() * (results.length - 8))
            return results.slice(reproduce, reproduce + 8)
        }
    })
}