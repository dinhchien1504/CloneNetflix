// types/movie.ts
import { Category } from './Category';
import { DetailsMovie } from './DetailsMovie';
import { Episode } from './Episode';

export interface Movie {
  movie: DetailsMovie[]
  episodes: Episode[];
  
}
