"use client"

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
