"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import useInfoModal from "@/hooks/useInfoModal";
import { getMovieDetails } from "@/services/movieServices";

const InfoModal: React.FC = () => {
  const { slug, isOpen, closeModal } = useInfoModal();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;
    getMovieDetails(slug).then(setData).catch(console.error);
  }, [slug]);

  console.log("Rendering InfoModal:", { data });

  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Lớp nền mờ */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Modal chính */}
      <div className="relative w-[600px] bg-zinc-900 rounded-md overflow-hidden shadow-lg opacity-100 z-10">
        {/* Video Trailer */}
        <div className="relative h-80">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${data.movie.trailer}?autoplay=1`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>

          <div
            className="absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center cursor-pointer"
            onClick={closeModal}
          >
            <AiOutlineClose className="text-white" size={20} />
          </div>
        </div>

        {/* Thông tin phim */}
        <div className="px-6 py-4">
          <p className="text-white"> Details</p>
          <h2 className="text-white text-2xl font-bold">{data.movie.title}</h2>
          <p className="text-green-400 text-lg font-semibold">
            {data.movie.releaseYear}
          </p>
          <p className="text-gray-300 mt-2">{data.movie.description}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
