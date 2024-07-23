"use client";

import { Card } from "@/components/ui/card";
import { useCreditsMovie } from "@/features/credits/useCreditsMovie";
import React, { ChangeEvent, useState } from "react";
import "../../../../styles/dev.css";
import { Warning } from "@phosphor-icons/react";
import Link from "next/link";
import { useFilterActors } from "../../../../hooks/filters/useFilter";

interface Props {
  params: {
    id: number;
  };
}

const Actor: React.FC<Props> = ({ params }) => {
  const { filter, setFilter } = useFilterActors()
  const { data: credits } = useCreditsMovie(params.id);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const filteredActors = credits?.actors.filter((credit) => credit.name.toLowerCase().includes(filter.toLowerCase()) || credit.character.toLowerCase().includes(filter.toLowerCase()))

  const filteredDirectors = credits?.directors.filter((credit) => credit.name.toLowerCase().includes(filter.toLowerCase()) || credit.job.toLowerCase().includes(filter.toLowerCase()))

  const filteredWriters = credits?.writers.filter((credit) => credit.name.toLowerCase().includes(filter.toLowerCase()) || credit.job.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className="p-4">
      <div className="flex justify-center">
        <input
          type="text"
          className="border shadow-blue-600 shadow-md p-1"
          name=""
          id=""
          placeholder="search actor..."
          value={filter}
          onChange={handleChange}
        />
      </div>
      <h1 className="mb-2 text-3xl font-semibold">Pemeran</h1>
      <div className="grid grid-cols-8 gap-4 max-sm:grid-cols-2">
        {filteredActors?.map((credit) => {
          if (!credit.profile_path) {
            return (
              <div key={credit.id} className="w-40 h-52 flex items-center justify-center bg-gray-600 image-scale">
                <div className="flex-col flex justify-center items-center">
                  <span>
                    <Warning size={32} color="#fbff0f" weight="fill" />
                  </span>
                  <p>Image Error</p>
                </div>
              </div>
            );
          }
          return (
            <div key={credit.id}>
              <Link href={`/person/${credit.id}`}>
                <Card>
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${credit.profile_path}`}
                    alt=""
                    className="w-40 h-40 image-scale"
                  />
                  <p className="text-center"> {credit.name} </p>
                  <p className="text-center"> {credit.character} </p>
                </Card>
              </Link>
            </div>
          );
        })}
      </div>
      <h1 className="mb-2 text-3xl font-semibold mt-4">Directors</h1>
      <div className="grid grid-cols-8 gap-4 max-sm:grid-cols-2">
        {filteredDirectors?.map((credit) => {
          if (!credit.profile_path) {
            return (
              <div className="w-40 h-52 flex items-center justify-center bg-gray-600 image-scale">
                <div className="flex-col flex justify-center items-center">
                  <span>
                    <Warning size={32} color="#fbff0f" weight="fill" />
                  </span>
                  <p>Image Error</p>
                </div>
              </div>
            );
          }
          return (
            <div key={credit.id}>
              <Link href={`/person/${credit.id}`}>
                <Card>
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${credit.profile_path}`}
                    alt=""
                    className="w-40 h-40 image-scale"
                  />
                  <p className="text-center"> {credit.name} </p>
                  <p className="text-center"> {credit.job} </p>
                </Card>
              </Link>
            </div>
          );
        })}
      </div>
      <h1 className="mb-2 text-3xl font-semibold mt-4">Writers</h1>
      <div className="grid grid-cols-8 gap-4 max-sm:grid-cols-2">
        {filteredWriters?.map((credit) => {
          if (!credit.profile_path) {
            return (
              <div className="w-40 h-52 flex items-center justify-center bg-gray-600 image-scale">
                <div className="flex-col flex justify-center items-center">
                  <span>
                    <Warning size={32} color="#fbff0f" weight="fill" />
                  </span>
                  <p>Image Error</p>
                </div>
              </div>
            );
          }
          return (
            <div>
              <Link href={`/person/${credit.id}`}>
                <Card>
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${credit.profile_path}`}
                    alt=""
                    className="w-40 h-40 image-scale"
                  />
                  <p className="text-center"> {credit.name} </p>
                  <p className="text-center"> {credit.job} </p>
                </Card>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Actor;