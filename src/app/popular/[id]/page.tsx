"use client";

// import { useFetchMovie, useGenreMovies } from '@/features/movies/useFetchMovie'
import { useFetchMovieById } from "@/features/movies/useFetchMovieById";
import { useWatchTrailer } from "@/features/movies/useWatchTrailer";
import VideoPlayer from "@/utils/VideoPlayer";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Youtube from "react-youtube";
import {
  LineVertical,
  Star,
  TwitterLogo,
  Warning,
} from "@phosphor-icons/react";
import {
  useFetchImages,
  useReleaseDate,
} from "@/features/movies/useFetchMovie";
import { ReleaseDate } from "../../../../types/release/release";
import { useRecomemndations } from "@/features/movies/useRecommendations";
import { discoverMovieType } from "../../../../types/discovers/discoverMovies";
import { useCreditsMovie } from "@/features/credits/useCreditsMovie";
import "../../../../styles/dev.css";
import { Card } from "@/components/ui/card";
import { useSocialMedia } from "@/features/social-media/useSocialMedia";
import { InstagramLogo, FacebookLogo } from "@phosphor-icons/react";
import Navbar from "@/components/Navbar/Navbar";
import { trunCateText } from "@/utils/truncateText";
import "../../../../styles/dev.css";
import { ImageTypeProps } from "../../../../types/images/type";
import YouTube from "react-youtube";
import "../../../../styles/dev.css";
import Footer from "@/components/Footer/Footer";

interface Props {
  params: {
    id: number;
  };
}

const Popular: React.FC<Props> = ({ params }) => {
  const [trailerMovie, setTrailerMovie] = useState<string | number | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const { data: movie, isLoading, isError } = useFetchMovieById(params.id);
  const { data: releaseDate } = useReleaseDate(params.id);
  const { data: recommendation } = useRecomemndations(params.id);
  const { data: credits } = useCreditsMovie(params.id);
  const { data: socialMedia } = useSocialMedia(params.id);
  const { data: backdropsImage } = useFetchImages(params.id);

  // console.log(useState, useEffect } from 'react';


  console.log(credits);

  useEffect(() => {
    if (movie) {
      setTrailerMovie(movie.id);
    }
  }, [movie]);

  const movieGenres = movie?.genres.map((genre) => genre.name) || [];

  const { data: trailer } = useWatchTrailer(trailerMovie);
  const trailerId = trailer?.[0]?.key || "";
  const trailerMedia = trailer?.[1]?.key || "";

  const trailerVideoOne = trailer?.[2]?.key || "";
  const trailerVideoTwo = trailer?.[3]?.key || "";
  const trailerVideoThree = trailer?.[4]?.key || "";

  console.log(movie);

  const exchangeRate = 16000;

  const formatCurrency = (amount: any, locale: any, currency: any) => {
    if (amount === 0) {
      return <del className="text-gray-500">unknown</del>;
    }
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(amount);
  };
  const budgetUSD = movie?.budget;
  const budgetIDR = budgetUSD ? budgetUSD * exchangeRate : 0;

  const revenueUSD = movie?.revenue;
  const revenueIDR = revenueUSD ? revenueUSD * exchangeRate : 0;

  const option = {
    width: "650",
    height: "240",
  };

  const optionTrailerVideo = {
    width: "294",
    height: "240",
  };

  return (
    <div>
      {/* <Navbar  setSearchQuery={setSearchQuery}/> */}
      <div className="min-h-screen flex justify-center items-center gap-4 relative">
        <div className="absolute inset-0 z-0">
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${movie?.backdrop_path}`}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.3)" }}
          />
        </div>
        <div className="relative flex max-sm:flex-col justify-center gap-28 max-sm:gap-0 max-sm:mt-8 max-sm:items-center z-10 max-sm:justify-center">
          <Link href={``}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
              className="w-80 h-[450px] rounded-xl max-sm:w-80 max-sm:h-80 max-sm:object-cover image-scale"
            />
          </Link>
          <div className="flex flex-col max-w-xl max-sm:max-w-xs">
            <h1 className="text-4xl font-bold text-white max-sm:text-3xl text-center max-sm:mt-2">
              {movie?.original_title}
            </h1>
            <div className="flex gap-4 mt-1 max-sm:block">
              {releaseDate && releaseDate.release_dates.length > 0 ? (
                <p className="text-white border border-gray-500 p-1 max-sm:p-1.5 max-sm:max-w-10">
                  {releaseDate.release_dates[0].certification || "SU"}
                </p>
              ) : (
                <p className="text-white border border-gray-500 p-1 max-sm:p-1.5 max-sm:max-w-10">
                  SU
                </p>
              )}
              <p className="pt-1 text-white">{movie?.release_date} (ID)</p>
              {movieGenres.map((genre, index) => {
                return (
                  <span
                    key={index}
                    className="text-textHeader pt-1 max-sm:mr-2"
                  >
                    {genre}
                  </span>
                );
              })}
            </div>
            <h1 className="mt-3 text-2xl text-textHeader font-semibold">
              Synopsis
            </h1>
            <p className="text-justify text-white"> {movie?.overview} </p>
            <div className="flex gap-1 mt-3">
              <p className="text-white text-lg font-serif">Tagline:</p>
              <p className="mb-3 text-white text-lg font-serif">
                {" "}
                {movie?.tagline}{" "}
              </p>
            </div>
            {credits && (
              <div className="text-white max-sm:mb-3">
                {credits.directors.length > 0 && (
                  <>
                    <ul>
                      {credits.directors.slice(0, 1).map((person) => (
                        <li key={person.id}>{person.name}</li>
                      ))}
                      <p className="text-sm">director</p>
                    </ul>
                  </>
                )}
                {credits.writers.length > 0 && (
                  <>
                    <ul className="mt-2">
                      {credits.writers.slice(0, 1).map((person) => (
                        <li key={person.id}>{person.name}</li>
                      ))}
                      <p className="text-sm">writers</p>
                    </ul>
                  </>
                )}
              </div>
            )}
            <div></div>
            {trailerId ? <VideoPlayer youtubeId={trailerId} /> : null}
          </div>
        </div>
      </div>
      <div className="p-4">
        <h1 className="text-3xl test-simple font-semibold">Pemeran Unggulan</h1>
        {credits && credits.actors.length > 0 && (
          <div className="flex max-sm:block">
            <div className="overflow-x-auto snap-x snap-mandatory custom-scrollbar w-[900px] p-4 max-sm:w-[900px] flex justify-between">
              <div className="flex space-x-4 text-black">
                {credits.actors.slice(0, 8).map((person) => {
                  if (!person.profile_path) {
                    return (
                      <div key={person.id} className="mb-4">
                        <div className="w-40 h-60 flex items-center justify-center bg-gray-600 rounded-lg">
                          <div className="flex-col flex justify-center items-center">
                            <span>
                              <Warning
                                size={32}
                                color="#fbff0f"
                                weight="fill"
                              />
                            </span>
                            <p>Image Error</p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div
                      key={person.id}
                      className="flex-shrink-0 w-40 snap-start mr-5"
                    >
                      <Card className="dark:border-none">
                        <Link href={`/person/${person.id}`}>
                          <img
                            src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${person.profile_path}`}
                            alt=""
                            className="w-60 h-60 rounded-lg max-sm:w-40 max-sm:h-40 image-scale"
                          />
                          <p className="text-center font-semibold mt-1">
                            {" "}
                            {trunCateText(person.name, 10)}{" "}
                          </p>
                          <p className="text-center"> {person.character} </p>
                        </Link>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-2 max-sm:-ml-10">
              <div className="ml-12 flex">
                <a
                  href={`https://www.instagram.com/${socialMedia?.instagram_id}`}
                  target="_blank"
                >
                  {" "}
                  <InstagramLogo size={32} />{" "}
                </a>
                <a
                  href={`https://www.facebook.com/${socialMedia?.facebook_id}`}
                  target="_blank"
                  className="ml-2"
                >
                  {" "}
                  <FacebookLogo size={32} />{" "}
                </a>
                <h1>
                  {" "}
                  <LineVertical height={32} size={32} />{" "}
                </h1>
                <a
                  href={`https://www.twitter.com/${socialMedia?.twitter_id}`}
                  target="_blank"
                >
                  {" "}
                  <TwitterLogo size={32} color="#1DA1F2" weight="fill" />{" "}
                </a>
              </div>
              <div className="mt-6 ml-12">
                <h1 className="text-xl font-semibold"> Judul Asli </h1>
                <p className="mt-0.5"> {movie?.original_title} </p>
                <h1 className="text-xl font-semibold mt-4"> Status </h1>
                <p className="mt-0.5"> {movie?.status} </p>
                <h1 className="text-xl font-semibold mt-4">
                  {" "}
                  Bahasa Pengucapan{" "}
                </h1>
                <p className="mt-0.5">
                  {movie?.spoken_languages.map((language, index) => (
                    <span key={index}>
                      {language.name}
                      {index < movie.spoken_languages.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
                <h1 className="text-xl font-semibold mt-4"> Anggaran </h1>
                <p>USD: {formatCurrency(budgetUSD, "en-US", "USD")}</p>
                <p className="mt-0.5">
                  IDR: {formatCurrency(budgetIDR, "id-ID", "IDR")}
                </p>
                <h1 className="text-xl font-semibold mt-4">Pendapatan</h1>
                <p>USD: {formatCurrency(revenueUSD, "en-US", "USD")}</p>
                <p className="mt-0.5">
                  IDR: {formatCurrency(revenueIDR, "id-ID", "IDR")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 max-sm:ml-2">
        <Link
          href={`/actor/${params.id}`}
          className="text-xl font-bold hover:text-gray-700 transition duration-200 dark:hover:text-gray-400"
        >
          Kru & Actor Lainya
        </Link>
        <hr className="mt-6 w-[900px] font-bold border max-sm:w-[300px]" />
        <div>
          <h1 className="text-3xl font-bold mt-6">Media</h1>
          <div className="flex mt-4">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${movie?.poster_path}`}
              alt=""
              className="w-60 h-60 object-cover"
            />
            <Youtube opts={option} videoId={trailerMedia} className="ml-2" />
          </div>
          <div>
            <div className="flex mt-4">
              <h1 className="text-xl font-bold mt-2">Video</h1>
              <Link href={`/media/videos/${params.id}`}>
                <h1 className="text-lg font-bold ml-[670px] mt-2">
                  Lihat Semua Video
                </h1>
              </Link>
            </div>
            <div className="flex">
              <Youtube opts={optionTrailerVideo} videoId={trailerVideoOne} />
              <Youtube
                opts={optionTrailerVideo}
                videoId={trailerVideoTwo}
                className="ml-2"
              />
              <Youtube
                opts={optionTrailerVideo}
                videoId={trailerVideoThree}
                className="ml-2"
              />
            </div>
          </div>
          <div>
            <div className="flex mt-4">
              <h1 className="text-xl font-bold mt-2">Gambar</h1>
              <Link href={`/media/images/${params.id}`}>
                <h1 className="text-lg font-bold ml-[630px] mt-2">
                  Lihat Semua Gambar
                </h1>
              </Link>
            </div>
            <div className="flex max-sm:block">
              <div className="overflow-x-auto snap-x snap-mandatory custom-scrollbar w-[900px] pb-2 max-sm:w-[900px] flex justify-between">
                <div className="flex space-x-4 text-black">
                  {backdropsImage &&
                    backdropsImage.slice(0, 8).map((backdrop, index) => {
                      return (
                        <div key={index} className="snap-center w-[300px]">
                          <img
                            src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${backdrop.file_path}`}
                            alt=""
                            className="w-full h-auto"
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1 className="mt-6 mb-3 text-xl font-bold">Disarankan</h1>
        <div className="place-content-center place-items-center place-self-center">
          <div className="grid grid-cols-4 w-[900px] gap-4 max-sm:grid-cols-1 max-sm:w-[300px] items-center">
            {recommendation?.map((recomen) => {
              if (!recomen.backdrop_path) {
                return (
                  <div key={recomen.id}>
                    <div className="w-full h-[263px] flex items-center justify-center bg-gray-600 rounded-b-md">
                      <div className="flex-col flex justify-center items-center">
                        <span>
                          <Warning size={32} color="#fbff0f" weight="fill" />
                        </span>
                        <p>Image Error</p>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div key={recomen.id}>
                  <Link href={`/popular/${recomen.id}`}>
                    <Card className="image-scale">
                      <img
                        src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${recomen.backdrop_path}`}
                        alt=""
                        className="w-full h-60 object-cover"
                      />
                      <p className="text-center">
                        {" "}
                        {trunCateText(recomen.title, 20)}{" "}
                      </p>
                    </Card>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Popular;