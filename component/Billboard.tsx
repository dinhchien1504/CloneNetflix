'use client';

import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import PlayButton from "./PlayButton";
import { BillboardProps } from "../src/model/BillboardProps";
import { getMovieDetails } from "../src/services/movieServices"; // Import hàm lấy chi tiết phim

const Billboard: React.FC<BillboardProps> = ({ movies }) => {
  const [movieDetail, setMovieDetail] = useState<any | null>(null);

  useEffect(() => {
    if (!movies || movies.length === 0) return;

    const randomMovie = movies[Math.floor(Math.random() * movies.length)];

    // Gọi API để lấy chi tiết phim theo `slug`
    getMovieDetails(randomMovie.slug)
      .then((data) => {
        if (data) {
          // setMovieDetail({...data,data?.movie: {{...data?.movie}, content: data.content.replace(/<[^>]+>/g, "") }}});
          setMovieDetail({
            ...data,
            movie: {
              ...data?.movie,
              content: data?.movie?.content?.replace(/<[^>]+>/g, "") || ""
            }
          });
        }
      })
      .catch((err) => console.error("Lỗi khi lấy chi tiết phim:", err));
  }, [movies]);

  // console.log ('move in bill', movieDetail)


  if (!movieDetail) return null; // Đợi dữ liệu tải xong mới hiển thị

  return (
    <div className=' relative h-[56.25vw]'>
        <video 
             src={movieDetail.movie.videoUrl} // Thay đổi dựa vào API trả về
             poster={movieDetail.movie.poster_url}
            autoPlay 
            loop 
            muted
            className="brightness-[60%] w-full h-full object-cover"
        />
        <div className="top-[30%] absolute md:top-[40%] ml-4 md:ml-16">
            <p className='text-white text-1xl md:text-5xl h-full w-[70%] lg:text-6xl font-bold drop-shadow-2xl'>
                {movieDetail.movie.name}
            </p>
            <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl ">
              {movieDetail.movie.content}

            </p>
            <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
                <PlayButton slug={movieDetail.movie.slug} shape="Rectangle" content="Play"/>
                <button
                className=' text-white  bg-white/30 rounded-md py-1 md:py-2 px-2 md:px-4 text-xs lg:text-lg font-semibold flex flex-row hover:bg-white/20 transition'
                >
                        More Infor
                </button>
            </div>
        </div>
    </div>
);
};

export default Billboard;
