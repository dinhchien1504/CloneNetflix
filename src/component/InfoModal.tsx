"use client";
import React, { useEffect, useState } from "react";
import useInfoModal from "@/hooks/useInfoModal";
import { getMovieDetails } from "@/services/movieServices";
import { MovieDetailResponse } from "@/model/MovieDetailApiRespone";
import ModalWrapper from "@/component/ModalWrapper";
import ModalHeader from "@/component/ModalHeader";
import ModalContent from "@/component/ModalContent";

const InfoModal: React.FC = () => {
  const { item, isOpen, closeModal } = useInfoModal();
  const [data, setData] = useState<MovieDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!item) return;
    setLoading(true);
    getMovieDetails(item.slug)
      .then((data) => setData(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [item]);

  if (!isOpen || !item) return null;

  return (
    <ModalWrapper onClose={closeModal}>
      {loading ? (
        <div className="flex justify-center items-center h-[80vh] text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
        </div>
      ) : data ? (
        <>
          <ModalHeader
            trailerUrl={data.movie.trailer_url}
            posterUrl={data.movie.poster_url}
          />
          <ModalContent movieData={data} item={item} />
        </>
      ) : null}
    </ModalWrapper>
  );
};

export default InfoModal;
