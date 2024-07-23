"use client"

import { useFetchImages } from '@/features/movies/useFetchMovie';
import React from 'react'

interface Props {
    params: {
      id: number;
    };
  }

const Images: React.FC<Props> = ({ params }) => {
    const { data } = useFetchImages(params.id)

  return (
    <div className='p-4'>
        <h1 className='text-2xl font-bold'>All Images</h1>
      <div className='grid grid-cols-4 gap-4'>
        {data?.map((image, index) => {
          return (
            <div key={index}>
              <img src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${image?.file_path}`} alt="" className='w-80 h-80 object-cover' />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Images