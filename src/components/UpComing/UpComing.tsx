import { useUpComingMovie } from '@/features/movies/useUpComingMovie'
import React from 'react'
import { discoverMovieType } from '../../../types/discovers/discoverMovies'
import { Card } from '../ui/card'
import Link from 'next/link'
import { trunCateText } from '@/utils/truncateText'

const UpComing = () => {
    const { data: upComingMovie } = useUpComingMovie()
    console.log(upComingMovie)
  return (
    <div className="p-4">
    <div className="overflow-x-auto snap-x snap-mandatory custom-scrollbar max-sm:w-full flex">
  <div className="flex space-x-2 max-sm:w-full">
    {upComingMovie?.map((upComing: discoverMovieType) => (
      <div key={upComing.id} className="flex-shrink-0 w-80 snap-start mb-2">
        <Link href={`/popular/${upComing.id}`}>
        <Card>
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${upComing.poster_path}`}
          alt=""
          className="h-80 w-80 object-cover"
          />
          <div className="flex justify-between p-2">
                <p>{trunCateText(upComing.title, 25)}</p>
                <p>{upComing.release_date}</p>
              </div>
          </Card>
          </Link>
      </div>
    ))}
  </div>
</div>
</div>
  )
}

export default UpComing