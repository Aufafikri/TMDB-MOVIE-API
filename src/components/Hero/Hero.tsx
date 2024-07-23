"use client";

import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import AutoPlay from "embla-carousel-autoplay";
import "../../../styles/dev.css";
import { useFetchHeroMovie } from "@/features/movies/useFetchMovie";
import { discoverMovieType } from "../../../types/discovers/discoverMovies";
import '../../../styles/dev.css'
import { useWatchTrailer } from "@/features/movies/useWatchTrailer";
import Link from "next/link";
// import { Star } from '@phosphor-icons/react'


const Hero: React.FC = () => {
  const [selectedMovieId, setSelectedMovieId] = useState<string | number | null>(null);
  const { data } = useFetchHeroMovie()
  const { data: trailer } = useWatchTrailer(selectedMovieId)
  console.log('trailer id nya client bos', trailer)
  console.log('hero banner:', data)

  return (
    <div className="relative hero-container">
        <div className="carousel-container">
      <Carousel plugins={[AutoPlay({ delay: 3000 })]}>
        <CarouselContent>
          {data?.map((movie: discoverMovieType) => {
            return (
              <CarouselItem key={movie.id}>
                <Link href={`/popular/${movie.id}`}>
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${movie.poster_path}`}
                alt="rimuru"
                className="w-full object-cover h-[530px] ring-opacity-90 image-position max-sm:h-[400px]"
              />
                <h1 className="absolute text-5xl mt-0 top-36 text-center w-full text-white font-semibold max-sm:text-2xl"> {movie.title} </h1>
                <p className="absolute text-center w-full max-w-xl top-48 text-white font-semibold mt-0 text-xl ml-96 max-sm:text-lg max-sm:p-6 max-sm:pb-20"> {movie.overview} </p>
                </Link>
            </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
      </div>
    </div>
  );
};

export default Hero;
