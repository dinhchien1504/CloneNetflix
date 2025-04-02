import { Category } from './Category';

export interface DetailsMovie {
  id: string;
  name: string;
  type:string;
  slug: string;
  origin_name: string;
  year: number;
  category: Category[];
  poster_url: string;
  thumb_url:string;
  status: string;
  time: string;
  view: number;
  trailer_url:string;
}

