
import React from 'react'

interface MovieCardProps {
    data: Record <string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({data}) => {
  return (
    <div className='group bg-zinc-900 col-span h-[12vw] relative'>
      <img 
      className='cursor-pointer
      object-cover
      transition
      duration
      shadow-xl
      rounded-md
      group-hover:opacity-90
      sm:group-hover:opacity-0
      delay-300
      w-full
      h-[12vw]
      '
      src={data.thumbnailUrl} alt="ThumbnailThumbnail" />
      
      <div className="
        opacity-0
        absolute
        top-0
        transition
        duration-200
        z-10
        invisible
        sm:visible
        delay-300
        w-full
        scale-0
        group-hover:scale-110
        group-hover:-translate-y-[6vw]
        group-hover:translate-x-[2vw]
        group-hover:opacity-100

      ">
        <img src={data.thumbnailUrl} 
        className='
        cursor-pointer
        object-cover
        transition
        duration
        shadow-xl
        rounded-t-md
        w-full
        h-[12vw]

        '
        alt="" />
        <div className="
        z-10
        bg-zinc-800
        p-2
        lg:p-4
        absolute
        w-full
        transition
        shadow-md
        rounded-b-md
        ">
          

        </div>

      </div>
    </div>
  )
}

export default MovieCard
