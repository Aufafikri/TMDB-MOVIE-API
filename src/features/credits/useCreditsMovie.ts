import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { CastMember, CrewMember, MovieCredits } from "../../../types/credits/credits"

export const useCreditsMovie = (id: number) => {
    return useQuery<MovieCredits>({
        queryKey: ["credits", id],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)

            const crew: CrewMember[] = response.data.crew
            const cast: CastMember[] = response.data.cast

            const directors = crew.filter((person) => person.known_for_department === "Directing")
            const writers = crew.filter((person) => person.known_for_department === "Writing")

            const actors = cast.filter((person) => person.known_for_department === "Acting")

            return {
                directors,
                writers,
                actors
            }
        }
    })
}