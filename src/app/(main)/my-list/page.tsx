"use client"
import MovieCard from '@/component/MovieCard';
import { useMyList } from '@/context/MyListContext';

const MyList = () => {
  const { movies } = useMyList();

  return (
    <>
        {/* <Navbar/> */}
        <div className="pt-30 px-40 min-h-[65%]">
          <>
            <h1 className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">My List</h1>
                    { movies?.length===0 ? <h3 className='text-white text-md md:text-xl lg:text-2xl font-semibold'>Hiện không có phim nào được thêm</h3>  :
          <div className="grid grid-cols-4 gap-2">
             {movies?.map((movie) => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
            </div> 
                    }
          </>  
      </div>
        {/* <Footer/> */}
    </>
  )
}

export default MyList