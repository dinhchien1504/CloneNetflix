import { useRouter } from "next/navigation";
import React from "react";

interface PlayButtonProps {
  episodeSlug: string;
  slug: string;
  shape: string;
  content: React.ReactNode; // Thay đổi kiểu dữ liệu từ string => ReactNode
}

const PlayButton: React.FC<PlayButtonProps> = ({ slug, shape, content, episodeSlug }) => {
  const router = useRouter();

  const ep:number = Number.parseInt(episodeSlug.split("-")[1])
  return (
    <button
      onClick={() => {
        const url =
          episodeSlug && episodeSlug.trim() !== ""
            ? `/watch/${slug}?ep=${ep}`
            : `/watch/${slug}`;
        router.push(url);
      }}
      className={`
        bg-white
        ${shape === "circle" ? "rounded-full p-1 md:p-2" : "rounded-md py-1 md:py-2 px-2 md:px-4"}
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
    >
      {content} 
    </button>
  );
};

export default PlayButton;
