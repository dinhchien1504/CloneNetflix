"use client";
import React from "react";
import {BsFillPlayFill, BsList } from "react-icons/bs";
import PlayButton from "./PlayButton";
import useInfoModal from "@/hooks/useInfoModal";
import Image from "next/image";
import ButtonAdd from "./ButtonAdd";
import { MovieItem } from "@/model/MovieApiResponse";

interface MovieCardProps {
  movie: MovieItem;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { openModal } = useInfoModal();

  if (!movie) return;
  return (
    <div className="group bg-zinc-900 col-span h-[12vw] relative">
      <Image
        className="cursor-pointer object-cover transition duration-300 shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 w-full h-[12vw]"
        
        src={movie.thumb_url.startsWith("https") ? movie.thumb_url : `https://phimimg.com/${movie.thumb_url}`}
        alt={`Movie Thumbnail - ${movie.thumb_url}`}

        width={300} height={450}
      />
     
      <div
        className="opacity-0 absolute top-0 transition-all duration-300 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw]  group-hover:opacity-100 
ease-in-out 
"
      >
        <Image
          src={movie.poster_url.startsWith("https") ? movie.poster_url : `https://phimimg.com/${movie.poster_url}`}
          className="cursor-pointer object-cover transition duration-300 shadow-xl rounded-t-md w-full h-[12vw]"
          alt={`Movie poster - ${movie.name}`}  
         width={300} height={450}
         onClick={() => {
          openModal(movie);
        }}
        />

        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row items-center gap-3">
            <div
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              // onClick={handlePlayButtonClick} // Play button click action
              // onClick={() => openModal(slug)}
            >
              {/* <BsFillPlayFill size={30} > */}
              <PlayButton episodeSlug={''} slug={movie.slug} shape={"circle"} content={<BsFillPlayFill className="hover:cursor-pointer" size={25} />} 
      
             />
            </div>

            <div
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              onClick={() => {
                openModal(movie);
              }}
            >
              <BsList />
              {/* <PlayButton slug={slug} shape = {"circle"} content =""/> */}
            </div>
            <ButtonAdd data={movie} inInfoModal={false} />
          </div>
          <p className="text-green-400 font-semibold mt-4 text-xl">
            <span className="text-white">{movie.name}</span>
          </p>
          
          <div className="flex flex-row font-semibold mt-1 gap-2 items-center">
            <p className="text-white text-md lg:text-sm">{movie.origin_name}</p>
          </div>

          <p className="text-green-400 font-semibold mt-1">
            Year : <span className="text-white">{movie.year}</span>
          </p>


          {/* <div className="flex flex-row mt-4 gap-2 items-center">
            <p className='text-white text-[10px] lg:text-sm'>{genre}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
