// types/movie.ts
import { Category } from './Category';
import { Episode } from './Episode';

export interface Movie {
  id: string;
  title: string;
  slug: string;
  origin_name: string;
  year: number;
  category: Category[];
  poster_url: string;
  thumb_url:string;
  status: string;
  time: string;
  view: number;
  episodes: Episode[];
}
