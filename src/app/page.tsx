// "use client"
import Navbar from "../../component/Navbar";
import Billboard from "../../component/Billboard";
import MovieList from "../../component/MovieList";
import InfoModal from "../../component/InfoModal";
import { getMovies } from "@/services/movieServices";
import { GetServerSideProps } from "next";
import { Movie } from "@/model/Movie";
import useInfoModal from "../../hooks/useInfoModal";


export default async function Page() {
  const movies = await getMovies(); // Gọi API trực tiếp trong server component
  // const movies2 = await getMovies(2)
  // console.log ('this is page movies', movies)
  // const {isOpen , closeModal} = useInfoModal();
  return (
    <>
      {/* <InfoModal visible = {isOpen}  onClose={closeModal}/> */}
      <Navbar/>
      <Billboard movies={movies} />
      <div className="px-40">
        <MovieList title="Trending Now" movies={movies} />
      </div>
      <div className="px-40">
        {/* <MovieList title="Your Favorite" movies={movies2} /> */}
      </div>
    </>
  );
}