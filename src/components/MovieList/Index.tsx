"use client";

import { useFetchMovie } from "@/features/movies/useFetchMovie";
import React from "react";
import { discoverMovieType } from "../../../types/discovers/discoverMovies";
import Image from "next/image";
import { trunCateText } from "@/utils/truncateText";
import { Skeleton } from "../ui/skeleton";
// import { useSearchMovie } from "@/features/movies/useSearchMovie";
import "../../../styles/dev.css";
import Link from "next/link";
import { Star } from "@phosphor-icons/react";
import { Card } from "../ui/card";

const MovieList = () => {
  const { data, isLoading } = useFetchMovie();

  console.log(data);

  return (
    <div className="p-4">
      <div className="grid grid-cols-4 gap-4 max-sm:grid-cols-2">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="w-80 h-80 bg-slate-300" />
                <Skeleton className="h-6 mt-4 w-3/4 bg-slate-200" />
                <Skeleton className="h-6 mt-2 w-1/2 bg-slate-200" />
                <Skeleton className="h-4 mt-2 w-1/4 bg-sl bg-slate-200" />
              </div>
            ))
          : data?.map((movie: discoverMovieType) => (
              <div key={movie.id}>
                <Card>
                  <Link href={`/popular/${movie.id}`}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${movie.poster_path}`}
                      alt="Movie Poster"
                      width={320} // Sesuaikan dengan ukuran yang Anda inginkan
                      height={320} // Sesuaikan dengan ukuran yang Anda inginkan
                      className="object-cover image-scale max-sm:place-content-center max-sm:place-items-center"
                    />
                  </Link>
                  <div className="flex justify-between p-2">
                    <p>{trunCateText(movie.title, 20)}</p>
                    <p>{movie.release_date}</p>
                  </div>
                  <div className="flex items-center ml-2">
                    <Star size={20} color="#CA8A04" weight="fill" />
                    <p className="text-yellow-600 pl-1">{movie.popularity}</p>
                  </div>
                  <button className="w-full p-3 dark:bg-slate-900 mt-4 dark:hover:bg-slate-800 transition-all duration-200">
                    See {trunCateText(movie.title, 20)} Movie
                  </button>
                </Card>
              </div>
            ))}
      </div>
    </div>
  );
};

export default MovieList;
