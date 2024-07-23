"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { MovieIdProps } from "../../../types/movieById/MovieById"


export const useFetchMovieById = (id: number) => {
    return useQuery<MovieIdProps>({
        queryKey: ["movieId", id],
        queryFn: async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
            return response.data
        }
    })
}