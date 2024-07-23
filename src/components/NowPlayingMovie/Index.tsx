"use client";

import { useNowPlayingMovie } from "@/features/movies/useNowPlayingMovie";
import React from "react";
import { discoverMovieType } from "../../../types/discovers/discoverMovies";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import AutoPlay from "embla-carousel-autoplay";
import '../../../styles/dev.css'
import { trunCateText } from "@/utils/truncateText";
import { Star } from "@phosphor-icons/react";
import Link from "next/link";

const NowPlayingMovie: React.FC = () => {
  const { data: NowPlayingData } = useNowPlayingMovie();

  console.log("now playing", NowPlayingData);
  return (
    <div className="p-4">
      <div className="overflow-x-auto snap-x snap-mandatory custom-scrollbar max-sm:w-full flex">
    <div className="flex space-x-2 max-sm:w-full">
      {NowPlayingData?.map((nowPlaying: discoverMovieType) => (
        <div key={nowPlaying.id} className="flex-shrink-0 w-60 snap-start mb-2">
          <Link href={`/popular/${nowPlaying.id}`}>
          <Card>
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${nowPlaying.poster_path}`}
            alt=""
            className="h-60 w-60 object-cover"
            />
            <div className="flex justify-between p-2">
                  <p>{trunCateText(nowPlaying.title, 10)}</p>
                  <p>{nowPlaying.release_date}</p>
                </div>
            </Card>
            </Link>
        </div>
      ))}
    </div>
  </div>
</div>
  );
};

export default NowPlayingMovie;
