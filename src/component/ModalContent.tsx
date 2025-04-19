import { BsFillPlayFill } from "react-icons/bs";
import { Episode, MovieDetailResponse } from "@/model/MovieDetailApiRespone";
import PlayButton from "@/component/PlayButton";
import ButtonAdd from "@/component/ButtonAdd";
import { MovieItem } from "@/model/MovieApiResponse";

interface ModalContentProps {
  movieData: MovieDetailResponse;
  item: MovieItem;
}

const ModalContent: React.FC<ModalContentProps> = ({ movieData, item }) => {
  const { movie, episodes } = movieData;

  return (
    <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-600">
      <div className="flex items-center gap-4">
        <PlayButton
          epIndex={0}
          slug={movie.slug}
          shape="sql"
          content={
            <>
              <BsFillPlayFill size={25} />
              <span>Play</span>
            </>
          }
        />
        <ButtonAdd data={item} inInfoModal={true} />
      </div>

      <h2 className="text-white text-3xl font-bold">{movie.name}</h2>
      <p className="text-gray-400 text-lg italic">({movie.origin_name})</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-2 text-gray-400 text-sm">
        <p>Năm: <span className="text-white">{movie.year}</span></p>
        <p>Trạng thái: <span className="text-white">{movie.status === "completed" ? "Hoàn tất" : "Đang tiến hành"}</span></p>
        <p>Chất lượng: <span className="text-white">{movie.quality}</span></p>
        <p>Ngôn ngữ: <span className="text-white">{movie.lang}</span></p>
        <p>Thời lượng: <span className="text-white">{movie.time}</span></p>
        <p>Số tập hiện tại: <span className="text-white">{movie.episode_current}</span></p>
        <p>Tổng số tập: <span className="text-white">{movie.episode_total}</span></p>
      </div>

      <p className="text-gray-300 text-base mt-2" dangerouslySetInnerHTML={{ __html: movie.content }}></p>

      <p className="text-gray-400 text-base">
        Diễn viên: <span className="text-white">{movie.actor?.join(", ")}</span>
      </p>
      <p className="text-gray-400 text-base">
        Đạo diễn: <span className="text-white">{movie.director?.join(", ")}</span>
      </p>
      <p className="text-gray-400 text-base">
        Quốc gia: <span className="text-white">{movie.country.map(c => c.name).join(", ")}</span>
      </p>
      <p className="text-gray-400 text-base">
        Thể loại: <span className="text-white">{movie.category.map(c => c.name).join(", ")}</span>
      </p>

      {movie.type.trim() !== "single" && (
        <div>
          <h3 className="text-white text-2xl font-bold mb-2">Danh sách tập</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {episodes[0]?.server_data?.map((episode: Episode, index) => (
              <PlayButton
                key={episode.slug}
                slug={movie.slug}
                epIndex={index}
                shape="sql"
                content={`${episode.name}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalContent;
