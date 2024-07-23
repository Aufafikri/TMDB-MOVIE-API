"use client";

import {
  usePerson,
  usePersonCredit,
  usePersonHistoryCredit,
} from "@/features/persons/usePersons";
import React, { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import "../../../../styles/dev.css";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useSosmedPerson } from "@/features/persons/useSosmedPerson";
import {
  FacebookLogo,
  InstagramLogo,
  TiktokLogo,
  YoutubeLogo,
  Users,
  Sparkle,
} from "@phosphor-icons/react";
import { trunCateText } from "@/utils/truncateText";
import { Warning } from "@phosphor-icons/react";
import { formatDate } from "@/utils/formatDate";
import '../../../../styles/dev.css'
import { useFilterHistory } from "../../../../hooks/filters/useFilter";
import Footer from "@/components/Footer/Footer";

interface Props {
  params: {
    id: number;
  };
}

const Person: React.FC<Props> = ({ params }) => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');
  const {filter, setFilter} = useFilterHistory()
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const [showFullBio, setShowFullBio] = useState(false);
  const { data: person } = usePerson(params.id);
  const { data: personCredits } = usePersonCredit(params.id);
  const { data: personSosmed } = useSosmedPerson(params.id);
  const { data: historyPersonMovie } = usePersonHistoryCredit(params.id);

  const toggleBio = () => {
    setShowFullBio(!showFullBio);
  };

  const biographyParagraphs = person?.biography.split("\n") || [];
  const truncatedBio = biographyParagraphs.slice(0, 3);

  const getGender = (gender: any) => {
    switch (gender) {
      case 1:
        return "Perempuan";
      case 2:
        return "Laki-Laki";
      default:
        return "Non-binary/Unspecified";
    }
  };

  useEffect(() => {
    if (historyPersonMovie) {
      const sortedMovies = [...historyPersonMovie.cast].sort((a, b) => {
        const dateA = new Date(a.release_date).getTime();
        const dateB = new Date(b.release_date).getTime();

        if (sortOrder === 'newest') {
          return dateB - dateA;
        } else {
          return dateA - dateB;
        }
      });
      historyPersonMovie.cast = sortedMovies;
    }
  }, [sortOrder, historyPersonMovie]);

  const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as 'newest' | 'oldest');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const filteredHistory = historyPersonMovie?.cast.filter((histori) => histori.original_title.toLowerCase().includes(filter.toLowerCase()) || histori.release_date.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className="test-simple">
      {/* <Navbar setSearchQuery={setSearchQuery} /> */}
      <div className="flex p-8 max-sm:block">
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${person?.profile_path}`}
          alt=""
          className="w-96 h-[500px] rounded-md max-sm:w-80 max-sm:h-full max-sm:object-cover "
        />
        <div className="p-6 max-sm:p-2">
          <h1 className="mb-4 text-4xl font-bold max-sm:text-center">
            {" "}
            {person?.name}{" "}
          </h1>
          <p className="font-semibold text-2xl"> Biografi </p>
          {showFullBio
            ? biographyParagraphs.map((paragraph, index) => (
                <p key={index} className="mb-2 text-justify">
                  {paragraph}
                </p>
              ))
            : truncatedBio.map((paragraph, index) => (
                <p key={index} className="mb-2 text-justify">
                  {paragraph}
                </p>
              ))}

          {biographyParagraphs.length > 3 && (
            <button onClick={toggleBio} className="text-blue-500 ml-2">
              {showFullBio ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      </div>
      <div className="flex p-8 justify-between max-sm:-mt-12">
        <div>
          <div className="flex">
            <a href={`https://www.instagram.com/${personSosmed?.instagram_id}`}>
              {" "}
              <InstagramLogo size={32} weight="fill" />{" "}
            </a>
            <a href={`https://www.facebook.com/${personSosmed?.facebook_id}`}>
              {" "}
              <FacebookLogo
                size={32}
                weight="fill"
                color="#4267B2"
                className="ml-4"
              />{" "}
            </a>
            <a href={`https://www.youtube.com/${personSosmed?.youtube_id}`}>
              {" "}
              <YoutubeLogo
                size={32}
                weight="fill"
                color="red"
                className="ml-4"
              />{" "}
            </a>
            <a href={`https://www.tiktok.com/${personSosmed?.tiktok_id}`}>
              {" "}
              <TiktokLogo size={32} weight="fill" className="ml-4" />{" "}
            </a>
          </div>
          <h1 className="mt-4 text-2xl font-bold"> Tentang </h1>
          <h2 className="mt-3 text-xl font-semibold">Peran</h2>
          <p> {person?.known_for_department} </p>
          <h2 className="mt-3 text-xl font-semibold">Popularity</h2>
          <p className="flex">
            {" "}
            <Users size={24} /> {person?.popularity}{" "}
          </p>
          <h2 className="mt-3 text-xl font-semibold">Jenis Kelamin</h2>
          <p> {getGender(person?.gender)} </p>
          <h2 className="mt-3 text-xl font-semibold">Kelahiran</h2>
          <p> {formatDate(person?.birthday)} </p>
          <h2 className="mt-3 text-xl font-semibold">Lokasi Kelahiran</h2>
          <p> {person?.place_of_birth} </p>
          <h2 className="mt-3 text-xl font-semibold">Juga Dikenal Sebagai</h2>
          <p className="max-w-28">
            {" "}
            {person?.also_known_as.slice(0, 8).join(", ")
              ? person?.also_known_as
              : "-"}{" "}
          </p>
          <h2 className="mt-3 text-xl font-semibold">Status Kematian</h2>
          <p> {person?.deathday ? person.deathday : "masih hidup"} </p>
        </div>

        <div className="max-sm:hidden">
          <h1 className="text-2xl font-semibold ml-2">Peran</h1>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {personCredits &&
              personCredits.cast.length > 0 &&
              personCredits.cast.map((credit) => {
                if (!credit.poster_path) {
                  return (
                    <div key={credit.id} className="mb-4">
                      <div className="w-56 h-56 flex items-center justify-center bg-gray-600">
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
                  <div key={credit.id} className="mb-4">
                    <Link href={`/popular/${credit.id}`}>
                      <Card>
                        <img
                          src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${credit.poster_path}`}
                          alt=""
                          className="w-56 h-56 image-scale object-cover"
                        />
                      </Card>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="p-4 min-h-screen">
        <div className="flex justify-between">
        <h1 className="text-4xl font-bold max-sm:text-2xl">Riwayat Perfilman</h1>
        <select onChange={handleSortOrderChange} value={sortOrder}>
            <option value="newest">Tanggal Terlama</option>
            <option value="oldest">Tanggal Terbaru</option>
          </select>
        </div>
        <div className="my-4 mb-4">
        <input type="text" className="border shadow-md shadow-gray-600 p-1 rounded-md w-60 focus:outline-none focus:outline-gray-700 dark:shadow-blue-600 dark:focus:outline-indigo-700" placeholder="cari riwayat film..." value={filter} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-3 mt-2 gap-4 max-sm:grid-cols-1">
          {filteredHistory?.map((historyPerson) => {
            return (
              <Link href={`../popular/${historyPerson.id}`}>
                <Card className="p-4 shadow-lg hover:shadow-xl cursor-pointer dark:hover:shadow-gray-800">
                  <div key={historyPerson?.id}>
                    <div className="flex items-center">
                      <p> {historyPerson.release_date} </p>
                      <p className="ml-4 text-xl">
                        {trunCateText(historyPerson.original_title, 30)}{" "}
                      </p>
                    </div>
                    <p>
                      Vote count :{" "}
                      <span className="text-red-600">
                        {historyPerson.vote_count}
                      </span>{" "}
                    </p>
                    <p className="flex items-center">
                      Popularity :{" "}
                      <Sparkle
                        weight="fill"
                        color="#CA8A04"
                        className="ml-1 mr-0.5"
                      />{" "}
                      <span className="text-textHeader">
                        {historyPerson.popularity}
                      </span>{" "}
                    </p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
  <Footer />
    </div>
  );
};

export default Person;