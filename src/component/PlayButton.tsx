'use client'

import { useRouter } from "next/navigation";
import React from 'react'
import { BsFillPlayFill } from 'react-icons/bs';

interface PlayButtonProps {
    slug: string;
    shape: string;
    content: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ slug, shape , content }) => {
    const router = useRouter();
    return (
        <button
            onClick={() => router.push(`/watch/${slug}`)}
            className={`
                bg-white
                ${shape === 'circle' ? 'rounded-full  p-1 md:p-2  ' : 'rounded-md  py-1 md:py-2 px-2 md:px-4'}
                w-auto
                text-xs lg:text-lg
                font-semibold
                flex
                flex-row
                items-center
                hover:cursor-pointer
                transition
                
            `}
        >
            <BsFillPlayFill className="hover:cursor-pointer" size={25} >
            </BsFillPlayFill>
           <p className="align-middle">
           {content}
            </p> 

        </button>
    );
}

export default PlayButton;
