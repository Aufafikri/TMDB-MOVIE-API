import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReleaseDate } from "../../../types/release/release";
import { ImageTypeProps } from "../../../types/images/type";

export const useFetchMovie = () => {
  return useQuery({
    queryKey: ["movie"],
    queryFn: async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
        return response.data.results.slice(9, 17)
    }
  })
}

export const useFetchHeroMovie = () => {
  return useQuery({
    queryKey: ["movie-hero"],
    queryFn: async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
        return response.data.results.slice(0, 4)
    }
  })
}

export const useReleaseDate = (id: number) => {
  return useQuery<ReleaseDate>({
    queryKey: ["release_date", id],
    queryFn: async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/${id}/release_dates?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
      const result = response.data.results
      
      const indonesiaReleaseDate = result.find((item: any) => item.iso_3166_1 === "ID");
      if (indonesiaReleaseDate) {
        return indonesiaReleaseDate;
      }

      const asiaReleaseDate = result.find((item: any) => item.iso_3166_1 === "AS");
      if (asiaReleaseDate) {
        return asiaReleaseDate;
      }

      
    }
  })
}

export const useFetchImages = (id: number) => {
  return useQuery<ImageTypeProps[]>({
    queryKey: ["images", id],
    queryFn: async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/${id}/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
      const result = response.data.backdrops
      console.log(result)
      return result
    }
  })
}