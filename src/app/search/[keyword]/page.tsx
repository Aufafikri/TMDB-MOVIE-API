"use client"

import { useSearchMovie } from '@/features/search/useSearchMovie'
import React from 'react'
import { discoverMovieType } from '../../../../types/discovers/discoverMovies'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { trunCateText } from '@/utils/truncateText'

interface paramsProps {
    params: any
}

const Search: React.FC<paramsProps> = ({ params }) => {
    const keyword = params.keyword
    const decodedKeyword = decodeURI(keyword)

    const { data: searchMovie, isLoading } = useSearchMovie(decodedKeyword)

    console.log(searchMovie)

    return (
        <div className="p-4">
            <p className='mb-2 text-xl font-semibold'> {`percarian anda untuk ${decodedKeyword} ...`} </p>
        <div className="grid grid-cols-4 gap-4 max-sm:grid-cols-1">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index}>
                  <Skeleton className="w-80 h-80 bg-slate-300" />
                  <Skeleton className="h-6 mt-4 w-3/4 bg-slate-200" />
                  <Skeleton className="h-6 mt-2 w-1/2 bg-slate-200" />
                  <Skeleton className="h-4 mt-2 w-1/4 bg-sl bg-slate-200" />
                </div>
              ))
            : searchMovie?.map((movie: discoverMovieType) => (
              <div key={movie.id}>
                  <Link href={`/popular/${movie.id}`}>
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${movie.poster_path}`}
                    className="w-80 h-80 object-cover image-scale"
                  />
                </Link>
                  <div className="flex justify-between">
                    <p>{trunCateText(movie.title, 25)}</p>
                    <p>{movie.release_date}</p>
                  </div>
                  <p className="text-yellow-600">{movie.popularity}</p>
                  <p className="italic">popularity</p>
                </div>
              ))}
        </div>
      </div>
  )
}

export default Search