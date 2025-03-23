import useSWR from 'swr';
// import getMovieDetails from '../src/services/movieServices';
const fetcher = (url: string) => fetch(url).then(res => res.json());

const useMovie = ( slug? : string  ) => {
    const {
        data, 
        error, 
        isLoading 
    } = useSWR ( slug?  `https://ophim1.com/phim/${slug}` : null , getMovieDetails(slug) ,{
        revalidateIfStale: false,
        revalidateOnFocus: false ,
        revalidateOnReconnect:false
    } )

    return {
        data,
        error ,
        isLoading
    }
}
export default useMovie