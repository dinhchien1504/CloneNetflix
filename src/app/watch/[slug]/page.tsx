"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { getMovieDetails } from "@/services/movieServices";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Movie } from "@/model/Movie";

const Watch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathSlug = usePathname();
  // Lấy `ep` từ query params
  const ep = searchParams.get("ep");

  // Lấy slug phim từ URL
  const movieSlug = pathSlug.split("/")[2];

  // State lưu dữ liệu phim
  const [data, setData] = useState<Movie>();
  const [loading, setLoading] = useState(true);
  const [videoSrc, setVideoSrc] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (!movieSlug) return;

      setLoading(true);
      try {
        const result = await getMovieDetails(movieSlug);
        if (result) {
          setData(result);
         
        } else {
          console.error("No data returned from API");
        }
      } catch (error) {
        console.error(" Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

      fetchData();
   
  }, [movieSlug]);

  useEffect(() => {
    if (data && data?.episodes?.length > 0) {
      const episodeIndex = ep ? parseInt(ep) - 1 : 0;
      const episode = data?.episodes[0]?.server_data[episodeIndex]?.link_embed || "";
      setVideoSrc(episode)
      console.log(episode)
    }
  }, [data, ep]);

    console.log ('this is ep ', data)
  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        
        <button className="text-white" onClick={() => router.push("/")}>  
        <AiOutlineArrowLeft className="text-white" size={40} />
        </button>
        <p className="text-white text-xl md:text-2xl font-bold">
          <span>Watching : </span>
          {/* {data?.movie?.name ?? "Đang tải..."} */}
        </p>
      </nav>

      {loading ? (
        <div className="flex justify-center items-center h-full text-white">
          Đang tải dữ liệu...
        </div>
      ) : videoSrc ? (
        // <video autoPlay controls className="h-full w-full"/>
        <iframe
        src={videoSrc}
        width="100%"
        height="100%"
        allowFullScreen
      ></iframe>
      ) : (
        <div className="flex justify-center items-center h-full text-white">
          Không có tập phim để phát!
        </div>
      )}
    </div>
  );
};

export default Watch;
