import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { SocialMedia } from "../../../types/social-media/social-media"

export const useSosmedPerson = (id: number) => {
    return useQuery<SocialMedia>({
        queryKey: ["sosmed_person", id],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/person/${id}/external_ids?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
            return response.data
        }
    })
}