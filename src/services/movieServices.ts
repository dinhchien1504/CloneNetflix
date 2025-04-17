import { MovieApiResponse, MovieItem } from "@/model/MovieApiResponse";
import { MovieDetailResponse } from "@/model/MovieDetailApiRespone";
import { MyList } from "@/model/MyList";

const API_URL = " https://ophim1.com/";
const BE_FAKE_URL = "http://localhost:8000"
export async function getMovies(page: number = 1): Promise<MovieApiResponse | null> {
  try {
      const response = await fetch(`${API_URL}/danh-sach/phim-moi-cap-nhat?page=${page}`);
      const data = await response.json();

      if (!data || !data.items) {
          throw new Error("Invalid API response");
      }

      return data;
  } catch (error) {
      console.error("Error fetching movies:", error);
      return null;
  }
}

export const getMovieDetails = async (slug: string): Promise<MovieDetailResponse | null> => {
    try {
        
        console.log(`Fetching details for: ${slug}`);
        const res = await fetch(`${API_URL}/phim/${slug}`);
        
        if (!res.ok) {
            throw new Error(`Không lấy được thông tin phim. Mã lỗi: ${res.status}`);
        }
        
        const data = await res.json();
        console.log("API response data:", data);

        if (!data || !data.movie) {
            throw new Error("Dữ liệu không hợp lệ hoặc thiếu thông tin phim.");
        }

        return data; 
    } catch (error) {
        console.error("Lỗi khi lấy chi tiết phim:", error);
        return null;
    }
};

export const isInMyList = async (email:string, slug: string,) : Promise<boolean> => {
    if(email === "") return false;
    try {
        const response = await fetch(`${BE_FAKE_URL}/my-list/${email}`);
        const data = await response.json();
    
        if (!data || !Array.isArray(data.movies)) return false;
    
        const found = data.movies.some((movie: MovieItem) => movie.slug === slug);
        return found;
      } catch (error) {
        console.error('Lỗi khi kiểm tra list:', error);
        return false;
      }
}

export const getMyList = async(email:string) : Promise<MovieItem[]|null> => {
    const response = await fetch(`${BE_FAKE_URL}/my-list/${email}`);
    if(!response.ok) return null;
    const data:MyList = await response.json()

    return data.movies ? data.movies : []
}

export const addToMyList = async (email: string, movie: MovieItem) => {
    const myList = await getMyList(email)
    console.log("myList",myList)
    if (myList === null) {
        // Nếu chưa có danh sách, tạo mới
        const response = await fetch(`${BE_FAKE_URL}/my-list`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: email,
                movies: [movie]
            }),
        });

        return response.ok;
    } else {
        // Đã có danh sách, cập nhật
        const response = await fetch(`${BE_FAKE_URL}/my-list/${email}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                movies: [...myList, movie],
            }),
        });

        return response.ok;
    }
};
  export const removeFromMyList = async (email: string, slug: string) => {
    const myList = await getMyList(email)

    if (myList === null) {
        console.warn("Không có danh sách để xóa");
        return false;
    }

    const updatedMovies = myList.filter(movie => movie.slug !== slug);

    const response = await fetch(`${BE_FAKE_URL}/my-list/${email}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            movies: updatedMovies, // Cập nhật danh sách phim sau khi xóa
        }),
    });

    if (response.ok) {
        return true;
    } else {
        console.error('Lỗi khi xóa phim khỏi danh sách');
        return false;
    }
  };