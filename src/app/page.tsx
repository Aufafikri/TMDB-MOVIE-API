"use client"

import Head from "next/head";
import HeaderMovieList from "../components/MovieList/Header";
import PopularListMovie from "../components/MovieList/Index";
import NowPlayingMovie from "../components/NowPlayingMovie/Index";
import HeaderNowPlayingMovie from "../components/NowPlayingMovie/Header";
import HeaderUpComingMovie from "../components/UpComing/Header"
import UpComingMovie from "@/components/UpComing/UpComing";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import { useState } from "react";
import Footer from "@/components/Footer/Footer";

const Page: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null)
  return (
    <>
    <Head>
        <title>EVST Movies</title>
        <meta name="description" content="Discover the best movies on evst movies." />
        <meta name="keywords" content="movies, evstmovies, watch movies online, film streaming" />
        <meta property="og:title" content="evst movies" />
        <meta property="og:description" content="Explore the latest and best movies on evst movies." />
        <meta property="og:url" content="https://evstmovies.vercel.app" />
        <meta property="og:type" content="website" />
      </Head>
      <Navbar setSearchQuery={setSearchQuery} />
      <Hero />
      <section>
        <HeaderMovieList title="Popular Movies" />
        <PopularListMovie />
      </section>
      <section>
        <HeaderNowPlayingMovie title="Now Playing" />
        <NowPlayingMovie />
      </section>
      <section>
        <HeaderUpComingMovie title="Up Coming" />
        <UpComingMovie />
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
};

export default Page;
