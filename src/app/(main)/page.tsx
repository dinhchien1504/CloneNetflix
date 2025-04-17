// "use client"
import Billboard from "@/component/Billboard";
import MovieList from "@/component/MovieList";
import { getMovies } from "@/services/movieServices";


export default async function Page() {
  const movies = await getMovies(); // Gọi API trực tiếp trong server component
  // const movies2 = await getMovies(2)
  // console.log ('this is page movies', movies.items)
  // const {isOpen , closeModal} = useInfoModal();
  return (
    <>
      {/* <InfoModal visible = {isOpen}  onClose={closeModal}/> */}
      <Billboard  items={movies?.items}/>
      <div className="px-40">
        <MovieList title="Movies" />
      </div>
    </>
  );
}