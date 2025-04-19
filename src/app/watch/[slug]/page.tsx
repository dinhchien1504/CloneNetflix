"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineUnorderedList } from "react-icons/ai";
import { getMovieDetails } from "@/services/movieServices";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MovieDetailResponse } from "@/model/MovieDetailApiRespone";

const Watch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathSlug = usePathname();

  const ep = searchParams.get("ep");
  const movieSlug = pathSlug.split("/")[2];

  const [data, setData] = useState<MovieDetailResponse | null>();
  const [loading, setLoading] = useState(true);
  const [videoSrc, setVideoSrc] = useState<string>("");
  const [showEpisodeList, setShowEpisodeList] = useState(false);

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
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieSlug]);

  useEffect(() => {
    if (data && data?.episodes?.length > 0) {
      const episodeIndex = ep ? parseInt(ep) - 1 : 0;
      const episode =
        data?.episodes[0]?.server_data[episodeIndex]?.link_embed || "";
      setVideoSrc(episode);
    }
  }, [data, ep]);

  return (
    <div className="h-screen w-screen bg-black relative">
      {/* Navigation */}
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <button
          className="text-white cursor-pointer"
          onClick={() => router.push("/")}
        >
          <AiOutlineArrowLeft className="text-white" size={40} />
        </button>
        <p className="text-white text-xl md:text-2xl font-bold">
          <span>Watching : </span>
          {data?.movie.name
            ? `${data.movie.name} ${
                data.movie.type.trim() !== "single"
                  ? `- Tập ${ep === null ? 1 : ep}`
                  : ""
              }`
            : "Đang tải..."}
        </p>
        {/* Button mở danh sách tập */}
        { data && data.episodes[0]?.server_data?.length > 1 && (
          <button
            className="ml-auto text-white text-lg flex items-center gap-2 bg-black opacity-65 px-3 py-1 rounded-md hover:opacity-100 relative"
            onClick={() => setShowEpisodeList(!showEpisodeList)}
          >
            <AiOutlineUnorderedList size={24} />
            Danh sách tập
          </button>
        )}
      </nav>

      {/* Danh sách tập nằm ngay dưới nút Danh sách tập */}
      {showEpisodeList && data && data.episodes[0]?.server_data?.length > 1 && (
        <div className="absolute right-4 top-16 bg-black opacity-75 p-4 rounded-md w-64 max-h-60 overflow-y-auto z-20">
          <h3 className="text-white text-lg mb-2">Chọn tập phim:</h3>
          <div className="grid grid-cols-4 gap-2 ">
            {data.episodes[0].server_data.map((episode, index) => (
              <button
                key={index}
                onClick={() =>
                  router.push(`${pathSlug}?ep=${index + 1}`, {
                    scroll: false,
                  })
                }
                className={`
                  ${(ep === null ? 1 : Number(ep)) === index + 1 ? "bg-black opacity-70 text-white" : "bg-gray-600"}
      text-white px-2 py-1 rounded hover:bg-gray-600 cursor-pointer
    `}
              >
                {episode.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Video Player */}
      {loading ? (
        <div className="flex justify-center items-center h-full text-white">
          Đang tải dữ liệu...
        </div>
      ) : videoSrc ? (
        <div className="relative w-full h-full">
          <iframe
            src={videoSrc}
            width="100%"
            height="100%"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full text-white">
          Không có tập phim để phát!
        </div>
      )}
    </div>
  );
};

export default Watch;
