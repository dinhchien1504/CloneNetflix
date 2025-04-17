"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { RiHeartAdd2Line } from "react-icons/ri";
import { FaHeartCircleMinus } from "react-icons/fa6";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { MovieItem } from '@/model/MovieApiResponse';
import { addToMyList, isInMyList, removeFromMyList } from '@/services/movieServices';
import { toast } from 'react-toastify';
import { useMyList } from '@/context/MyListContext';

const ButtonAdd = ({data, inInfoModal} : {data: MovieItem | null, inInfoModal: boolean}) => {
  const [isAdded, setIsAdded] = useState(false);
  const { data: session, status } = useSession();
  const {removeMovie, addMovie} = useMyList();
  const router = useRouter()

  const checkIsAdded = useCallback(async () => {
    const email = session?.user?.email || "";
    if (!email || !data?.slug) return;

    const isAdded = await isInMyList(email, data.slug);
    setIsAdded(isAdded);
  }, [session?.user?.email, data?.slug]);

  useEffect(() => {
    if (status !== "authenticated") {
      setIsAdded(false);
    } else {
      checkIsAdded();
    }
  }, [status]);



  const handleClick = async () => {
    if(status !== 'authenticated') {
      router.push("/login")
    }
    const email = session?.user?.email || "";
    if (!email || !data) return;
  
    try {
      if (isAdded) {
        const result = await removeFromMyList(email, data.slug);
        if (!result) {
          toast.error("Xóa không thành công!");
        } else {
          toast.success("Xóa phim khỏi danh sách yêu thích thành công!");
          setIsAdded(false);
          removeMovie(data.slug)
        }
      } else {
        const result = await addToMyList(email, data);
        if (!result) {
          toast.error("Thêm không thành công!");
        } else {
          toast.success("Thêm phim vào danh sách yêu thích thành công!");
          setIsAdded(true);
          addMovie(data);
        }
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
      console.error(error);
    }
  };

  return (
  <button className={`
    bg-white
    ${!inInfoModal ? "rounded-full p-1 md:p-2" : "rounded-md py-1 md:py-2 px-2 md:px-4"}
    w-auto
    text-xs lg:text-lg
    font-semibold
    flex
    flex-row
    items-center
    hover:cursor-pointer
    transition
    justify-center
  `} 
  onClick={handleClick}>
<div className="flex items-center gap-2">
  {isAdded ? <FaHeartCircleMinus fontSize={20} /> : <RiHeartAdd2Line fontSize={20} />}
  {inInfoModal && <span>{isAdded ? "Added" : "Add"}</span>}
</div>

  </button>
    // <button className='cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300' 
    // onClick={handleClick}
    // >
    //   {isAdded ?  <FaHeartCircleMinus fontSize={20}/> : <RiHeartAdd2Line fontSize={20}/>}
    // </button>
  )
}

export default ButtonAdd