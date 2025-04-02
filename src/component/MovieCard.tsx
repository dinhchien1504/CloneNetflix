"use client";
import React from "react";
import { Bs0Circle, BsFillPlayFill, BsList } from "react-icons/bs";
import PlayButton from "./PlayButton";
import useInfoModal from "@/hooks/useInfoModal";
import Image from "next/image";
import { Movie } from "@/model/Movie";
import { DetailsMovie } from "@/model/DetailsMovie";

interface MovieCardProps {
  data: Movie[];
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  console.log ('data in moviecard', data)
  const { openModal } = useInfoModal();

  if (!data) return;
  return (
    <div className="group bg-zinc-900 col-span h-[12vw] relative">
      <Image
        className="cursor-pointer object-cover transition duration-300 shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 w-full h-[12vw]"
        
        src={data?.movie.thumb_url ? `https://img.ophim.live/uploads/movies/${data.movie.thumb_url}` : "/fallback-image.jpg"}
        alt={`Movie Thumbnail - ${data.movie.thumb_url}`}

        width={300} height={450}
      />
     
      <div
        className="opacity-0 absolute top-0 transition-all duration-300 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw]  group-hover:opacity-100 
ease-in-out 
"
      >
        <Image
          src={`https://img.ophim.live/uploads/movies/${data.movie.poster_url}`}
          className="cursor-pointer object-cover transition duration-300 shadow-xl rounded-t-md w-full h-[12vw]"
          alt={`Movie poster - ${data.movie.title}`}  
         width={300} height={450}
         onClick={() => {
          openModal(data.movie.slug);
        }}
        />

        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row items-center gap-3">
            <div
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              // onClick={handlePlayButtonClick} // Play button click action
              // onClick={() => openModal(data.slug)}
            >
              {/* <BsFillPlayFill size={30} > */}
              <PlayButton episodeSlug={''} slug={data.movie.slug} shape={"circle"} content={<BsFillPlayFill className="hover:cursor-pointer" size={25} />} 
      
             />
            </div>

            <div
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              onClick={() => {
                openModal(data.movie.slug);
              }}
            >
              <BsList />
              {/* <PlayButton slug={data.slug} shape = {"circle"} content =""/> */}
            </div>
          </div>
          <p className="text-green-400 font-semibold mt-4 text-xl">
            <span className="text-white">{data.movie.name}</span>
          </p>
          
          <div className="flex flex-row font-semibold mt-1 gap-2 items-center">
            <p className="text-white text-md lg:text-sm">{data.movie.origin_name}</p>
          </div>

          <p className="text-green-400 font-semibold mt-1">
            Year : <span className="text-white">{data.movie.year}</span>
          </p>


          {/* <div className="flex flex-row mt-4 gap-2 items-center">
            <p className='text-white text-[10px] lg:text-sm'>{data.genre}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
