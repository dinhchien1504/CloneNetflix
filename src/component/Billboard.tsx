"use client";

import React, { useEffect, useState } from "react";
import PlayButton from "./PlayButton";
import { BillboardProps } from "@/model/BillboardProps";
import { getMovieDetails } from "@/services/movieServices"; // Import hàm lấy chi tiết phim
import { BsFillPlayFill } from "react-icons/bs";
import useInfoModal from "@/hooks/useInfoModal";
import Image from "next/image";
import { MovieDetail } from "@/model/MovieDetailApiRespone";
import { MovieItem } from "@/model/MovieApiResponse";

const Billboard: React.FC<BillboardProps> = ({ items }) => {
  const [movie, setMovie] = useState<MovieItem | null>(null);
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const { openModal } = useInfoModal();

  useEffect(() => {
    if (!items || items.length === 0) return;

    const randomMovie = items[Math.floor(Math.random() * items.length)];
    setMovie(randomMovie)
    // Gọi API để lấy chi tiết phim theo `slug`
    getMovieDetails(randomMovie.slug) 
      .then((data) => {
        if (data) {
          // setMovieDetail({...data,data?.movie: {{...data?.movie}, content: data.content.replace(/<[^>]+>/g, "") }}});
          setMovieDetail({
            ...data.movie,
            content: data.movie.content?.replace(/<[^>]+>/g, "") || "",
          });
        }
      })
      .catch((err) => console.error("Lỗi khi lấy chi tiết phim:", err));
  }, [items]);

  // console.log ('move in bill', movieDetail)

  if (!movieDetail) return null; // Đợi dữ liệu tải xong mới hiển thị

  return (
    <div className=" relative h-[56.25vw]">
      <Image
      src={movieDetail.poster_url.startsWith("https") ? movieDetail.poster_url : `https://phimimg.com/${movieDetail.poster_url}`}
        alt={movieDetail.name || "Movie Poster"}
        fill
        className="brightness-[60%] w-full h-full object-cover"
      />
      <div className="top-[30%] absolute md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[70%] lg:text-6xl font-bold drop-shadow-2xl">
          {movieDetail.name}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl ">
          {movieDetail.content.length > 800
            ? movieDetail.content.substring(0, 800) + "..."
            : movieDetail.content}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton
            epIndex={0}
            slug={movieDetail.slug}
            shape="Rectangle"
            content={
              <>
                <BsFillPlayFill className="hover:cursor-pointer" size={25} />
                <span className="">Play</span>
              </>
            }
          />
          <button
          onClick={() => {
            openModal(movie);
          }}
          className=" text-white  bg-white/30 rounded-md py-1 md:py-2 px-2 md:px-4 text-xs lg:text-lg font-semibold flex flex-row hover:bg-white/20 transition">
            More Infor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
