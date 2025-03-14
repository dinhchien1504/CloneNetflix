import React from 'react'
import { BsFillPlayFill } from 'react-icons/bs';

interface MovieCardProps {
    data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const handlePlayButtonClick = () => {
    // You can replace this with actual functionality like opening a modal or navigating to a trailer.
    // console.log(`Playing movie: ${data.title}`);
  };

  return (
    <div className='group bg-zinc-900 col-span h-[12vw] relative'>
      <img 
        className='cursor-pointer object-cover transition duration-300 shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 w-full h-[12vw]'
        src={data.thumbnailUrl} 
        alt={`Movie Thumbnail - ${data.title}`} // More descriptive alt text
      />
      
      <div className="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw]  group-hover:opacity-100">
        <img 
          src={data.thumbnailUrl} 
          className='cursor-pointer object-cover transition duration-300 shadow-xl rounded-t-md w-full h-[12vw]' 
          alt={`Movie Thumbnail - ${data.title}`} 
        />
        
        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row items-center gap-3">
            <div 
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              // onClick={handlePlayButtonClick} // Play button click action
            >
              <BsFillPlayFill size={30} />
            </div>
          </div>  

          <p className="text-green-400 font-semibold mt-4">
            New <span className='text-white'>{data.year}</span>
          </p>

          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className='text-white text-[10px] lg:text-sm'>{data.duration}</p>
          </div>

          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className='text-white text-[10px] lg:text-sm'>{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
