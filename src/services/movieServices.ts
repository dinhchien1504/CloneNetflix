import { Movie } from "@/model/Movie";

const API_URL = "https://ophim1.com/";
export async function getMovies(page: number = 1): Promise<Movie[]> {
  try {
      const response = await fetch(`${API_URL}/danh-sach/phim-moi-cap-nhat?page=${page}`);
      const data = await response.json();

      if (!data || !data.items) {
          throw new Error("Invalid API response");
      }

      return data.items.map((item: any) => ({
          id: item._id,
          title: item.name,
          slug: item.slug,
          origin_name: item.origin_name,
          year: item.year,
          category: item.category || [],
          poster_url: item.poster_url,
          status: item.status,
          time: item.time,
          thumb_url: item.thumb_url,
          view: item.view || 0,
          episodes: item.episodes || [],
      }));
  } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
  }
}

export const getMovieDetails = async (slug: string): Promise<any | null> => {
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
