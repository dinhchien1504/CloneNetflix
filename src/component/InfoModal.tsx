"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import useInfoModal from "@/hooks/useInfoModal";
import { getMovieDetails } from "@/services/movieServices";
import PlayButton from "./PlayButton";
import { BsFillPlayFill } from "react-icons/bs";

const InfoModal: React.FC = () => {
  const { slug, isOpen, closeModal } = useInfoModal();
  const [data, setData] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    if (!slug) return;
    getMovieDetails(slug).then(setData).catch(console.error);
  }, [slug]);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      setTimeout(() => setShowModal(false), 10);
    }
  }, [isOpen]);

  if (!isOpen || !data) return null;
  console.log ('data infor' , data)
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/");
    if (url.includes("youtu.be/"))
      return url.replace("youtu.be/", "youtube.com/embed/");
    return "";
  };

  const embedUrl = getEmbedUrl(data.movie.trailer_url);

  return (
    <div className="fixed inset-0 pt-[2%] flex justify-center items-center z-50 font-semibold">
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          showModal ? "opacity-0" : "opacity-70"
        }`}
        onClick={closeModal}
      ></div>

      <div
        className={`relative w-[60%] h-[100%] bg-zinc-900 rounded-md shadow-lg overflow-hidden opacity-100 z-10 overflow-y-auto scrollbar-hide
        transition-all duration-300 transform ${
          showModal ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {embedUrl ? (
          <div className="relative h-[70%]">
            <iframe
              className="w-full h-full"
              src={embedUrl  }
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="h-[70%] flex items-center justify-center text-white bg-gray-800">
            <img src={data.movie.poster_url} className="h-full w-full" alt="" />
          </div>
        )}

        <div
          className="absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center cursor-pointer"
          onClick={closeModal}
        >
          <AiOutlineClose className="text-white" size={20} />
        </div>

        <div className="flex flex-col px-10 py-4">
          <div className="px-4 w-full">
            <div className=" pt-4  w-full h-full  flex  items-center overflow-hidden overflow-y-auto scrollbar-hide ">
              <PlayButton
                episodeSlug={""}
                slug={data.movie.slug}
                shape={"sql"}
                content={
                  <>
                    <BsFillPlayFill
                      className="hover:cursor-pointer"
                      size={25}
                    />
                    <span className="">Play</span>
                  </>
                }
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="p-4 w-[70%]">
              <h2 className="text-white text-4xl font-bold py-2">
                {data.movie.name}
              </h2>
              <p className="text-gray-400 text-lg font-semibold flex gap-1">
                Năm:{" "}
                <span className="text-white text-lg">{data.movie.year}</span>
              </p>
              <p className="text-gray-400 text-lg font-semibold flex gap-1">
                Thời lượng:{" "}
                <span className="text-white text-lg">
                  {data.movie.type.trim() === "single"
                    ? data.movie.time
                    : `${data.movie.episode_total} Tập (${data.movie.time})`}
                </span>
              </p>
              <p
                className="text-gray-300 text-lg mt-2"
                dangerouslySetInnerHTML={{ __html: data.movie.content }}
              ></p>
            </div>
            <div className="p-4 w-[30%] text-white">
              <p className="text-gray-400 text-lg">
                Diễn viên:{" "}
                <span className="text-white text-lg">
                  {data.movie.actor?.join(", ")}
                </span>
              </p>
              <p className="text-gray-400 text-lg flex">
                Đạo diễn:{" "}
                <span className="text-white text-lg">
                  {data.movie.director}
                </span>
              </p>
              <p className="text-gray-400 text-lg flex">
                Quốc gia:{" "}
                <span className="text-white text-lg">
                  {data.movie?.country.map((c: any) => c.name).join(", ")}
                </span>
              </p>
            </div>
          </div>
          {data.movie.type.trim() !== "single" && (
            <div className="pb-4 px-4 w-full">
              <h3 className="text-white text-3xl font-bold mb-2">
                Danh sách tập
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {data.episodes[0]?.server_data?.map((episode: any) => (
                  <PlayButton
                    key={episode.slug}
                    slug={data.movie.slug}
                    episodeSlug={episode.slug}
                    shape="sql"
                    content={`Tập ${episode.name}`}
                    
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
