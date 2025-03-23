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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoSrc, setVideoSrc] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!movieSlug) return;

      setLoading(true);
      try {
        const result = await getMovieDetails(movieSlug);
        console.log ('data', result)
        if (result) {
          setData(result);
          console.log("📌 Movie Data:", result);
          if (result && result?.episodes?.length > 0) {
            const episodeIndex = ep ? parseInt(ep) - 1 : 0;
            const episode = result?.episodes[episodeIndex]?.server_data?.link_embed;
      
            if (episode) {
              setVideoSrc(episode);
            } else {
              console.error("⚠️ No valid video link found for episode", ep);
              setVideoSrc(null);
            }
          }
        } else {
          console.error("⚠️ No data returned from API");
        }
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

      fetchData();
     
  }, []);

  // useEffect(() => {
  //   if (data?.episodes?.length > 0) {
  //     const episodeIndex = ep ? parseInt(ep) - 1 : 0;
  //     const episode = data.episodes[episodeIndex]?.server_data?.link_embed;

  //     if (episode) {
  //       setVideoSrc(episode);
  //     } else {
  //       console.error("⚠️ No valid video link found for episode", ep);
  //       setVideoSrc(null);
  //     }
  //   }
  // }, [data, ep]);

    // console.log ('this is ep ', data.episodes[0].server_data)
  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft className="text-white" size={40} />
        <button className="text-white" onClick={() => router.push("/")}>  
          Quay lại
        </button>
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span>Watching: </span>
          {/* {data?.movie?.name ?? "Đang tải..."} */}
        </p>
      </nav>

      {loading ? (
        <div className="flex justify-center items-center h-full text-white">
          Đang tải dữ liệu...
        </div>
      ) : videoSrc ? (
        <video autoPlay controls className="h-full w-full" src={videoSrc} />
      ) : (
        <div className="flex justify-center items-center h-full text-white">
          Không có tập phim để phát!
        </div>
      )}
    </div>
  );
};

export default Watch;
