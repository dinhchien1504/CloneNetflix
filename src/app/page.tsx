import Navbar from "../../component/Navbar";
import Billboard from "../../component/Billboard";
import MovieList from "../../component/MovieList";

const movies = [
  {
    id: 1,
    title: "Inception",
    description:
      "A skilled thief, the absolute best in the art of extraction, enters the dream world to steal valuable secrets.",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    thumbnailUrl:
    "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg",

    genre: "Sci-Fi",
    duration: "2h 28m",
  },
  {
    id: 2,
    title: "The Dark Knight",
    description:
      "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham into anarchy.",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnailUrl:
    "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg",

    genre: "Action",
    duration: "2h 32m",
  },
  {
    id: 3,
    title: "Interstellar",
    description:
      "A team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival.",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    thumbnailUrl:
      "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg",
    genre: "Adventure",
    duration: "2h 49m",
  },
  {
    id: 4,
    title: "Parasite",
    description:
      "A poor family cons their way into becoming the servants of a rich family, but their easy life gets complicated.",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    thumbnailUrl:
    "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg",

    genre: "Thriller",
    duration: "2h 12m",
  },
  {
    id: 5,
    title: "Avengers: Endgame",
    description:
      "After Thanos wipes out half of the universe, the Avengers assemble to restore balance.",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnailUrl:
      "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SY679_.jpg",
    genre: "Superhero",
    duration: "3h 1m",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <Billboard />
      <div className="px-40">
        {/* Truyền danh sách movies vào MovieList */}
        <MovieList title="Trending Now" data={movies} />
      </div>

      <div className="px-40">
        {/* Truyền danh sách movies vào MovieList */}
        <MovieList title="Your Favorite" data={movies} />
      </div>
    </>
  );
}
