"use client";

import { useFetchImages } from "@/features/movies/useFetchMovie";
import React from "react";
import Image from "next/image";

interface Props {
  params: {
    id: number;
  };
}

const Images: React.FC<Props> = ({ params }) => {
  const { data } = useFetchImages(params.id);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">All Images</h1>
      <div className="grid grid-cols-4 gap-4">
        {data?.map((image, index) => {
          return (
            <div key={index}>
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${image?.file_path}`}
                alt={`Image ${index}`}
                width={320}
                height={320}
                className="object-cover"
              ></Image>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Images;
