import Image from "next/image";

interface ModalHeaderProps {
  trailerUrl: string;
  posterUrl: string;
}

const getEmbedUrl = (url: string) => {
  if (!url) return "";
  if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/");
  if (url.includes("youtu.be/")) return url.replace("youtu.be/", "youtube.com/embed/");
  return "";
};

const ModalHeader: React.FC<ModalHeaderProps> = ({ trailerUrl, posterUrl }) => {
  const embedUrl = getEmbedUrl(trailerUrl);

  return (
    <div className="relative aspect-video w-full">
     
      {embedUrl ? (
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={embedUrl}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      ) : (
        <Image
          fill
          src={posterUrl.startsWith("https") ? posterUrl : `https://phimimg.com/${posterUrl}`}
          className="object-cover"
          alt="poster"
        />
      )}
    </div>
  );
};

export default ModalHeader;
