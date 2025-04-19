import { MovieApiResponse, MovieItem } from "@/model/MovieApiResponse";
import { Category, Country, MovieDetailResponse } from "@/model/MovieDetailApiRespone";
import { MyList } from "@/model/MyList";

const API_URL = "https://phimapi.com";
const BE_FAKE_URL = "http://localhost:8000"
interface SearchFilters {
    page?: number;
    keyword?: string;
    category?: string;
    country?: string;
    year?: string;
  }
  
  export const getCategories = async () : Promise<Category[]> => {
    try {
      const response = await fetch(`${API_URL}/the-loai`);
      const result = await response.json();
      
      return result; 
  } catch (error) {
      console.error("Lỗi khi lấy chi tiết phim:", error);
      return [];
  }
  }

  export const getCountries = async () : Promise<Country[]> => {
    try {
      const response = await fetch(`${API_URL}/quoc-gia`);
      const result = await response.json();
      
      return result; 
  } catch (error) {
      console.error("Lỗi khi lấy chi tiết phim:", error);
      return [];
  }
  }

  export async function getMovies(filters: SearchFilters = {}): Promise<MovieApiResponse | null> {
    const {
      page = 1,
      keyword = ' ',
      category = '',
      country = '',
      year = '',
    } = filters;
  
    // Nếu có từ khóa => dùng API tìm kiếm
    const isSearching = keyword.trim() !== '';
    const isFilteringCategory = !isSearching && category.trim() !== '';
    const isFilteringCountry = !isSearching && country.trim() !== '';
  
    let baseUrl = `${API_URL}/danh-sach/phim-moi-cap-nhat-v3`;
  
    if (isSearching) {
      baseUrl = `${API_URL}/v1/api/tim-kiem`;
    } else if (isFilteringCategory) {
      baseUrl = `${API_URL}/v1/api/the-loai/${category}`;
    } else if (isFilteringCountry) {
      baseUrl = `${API_URL}/v1/api/quoc-gia/${country}`;
    }

    const queryParams = new URLSearchParams({
      page: page.toString(),
      ...(keyword && { keyword }),
      ...(category && { category }),
      ...(country && { country }),
      ...(year && { year }),
      limit: "24"
    });
  
    try {
      const response = await fetch(`${baseUrl}?${queryParams}`);
      const result = await response.json();
      
      if ((isSearching && result.status !== "success") || (!isSearching &&!result.status)) {
        throw new Error('Invalid API response');
      }
      if(isSearching || isFilteringCategory || isFilteringCountry ) {
              return {
                items: result.data.items,
                pagination: result.data.params?.pagination
              };
      }
      return {
        items: result.items,
        pagination: result.pagination
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      return null;
    }
  }

export const getMovieDetails = async (slug: string): Promise<MovieDetailResponse | null> => {
    try {
        const response = await fetch(`${API_URL}/phim/${slug}`);
        const result = await response.json();
        

        if (!result.status) {
            throw new Error("Invalid API response");
        }
        
        const res : MovieDetailResponse = {
            movie: result.movie,
            episodes: result.episodes
        }

        return res; 
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

