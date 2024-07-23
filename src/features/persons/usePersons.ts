import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Person } from "../../../types/people/person/person"
import { MoviePersonCreditResponse } from "../../../types/people/movie_credits/movieCredit"

export const usePerson = (id: number) => {
    return useQuery<Person>({
        queryKey: ["person", id],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/person/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
            const result = response.data

            if(result.biography === "") {
                result.biography = "tidak ada biography"
            }

            return result
        }
    })
}

export const usePersonCredit = (id: number) => {
    return useQuery<MoviePersonCreditResponse>({
        queryKey: ["person_credits", id],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/person/${id}/movie_credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
            const results = response.data

            if(results.cast.length <= 12) {
                return results
            }

            const start = Math.floor(Math.random() * (results.cast.length - 12));
            const slicedCast = results.cast.slice(start, start + 12);
            return { ...results, cast: slicedCast };
        }
    })
}

export const usePersonHistoryCredit = (id: number) => {
    return useQuery<MoviePersonCreditResponse>({
        queryKey: ["history_person_credis", id],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/person/${id}/movie_credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
            return response.data
        }
    })
}