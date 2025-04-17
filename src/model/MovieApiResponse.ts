export type MovieApiResponse = {
  status: boolean;
  items: MovieItem[];
  pathImage: string;
  pagination: Pagination;
};

export type MovieItem = {
  tmdb: TmdbInfo;
  imdb: ImdbInfo;
  modified: ModifiedInfo;
  _id: string;
  name: string;
  origin_name: string;
  thumb_url: string;
  slug: string;
  year: number;
  poster_url: string;
};


export type TmdbInfo = {
  type: string;
  id: string;
  season: number | null;
  vote_average: number;
  vote_count: number;
};

export type ImdbInfo = {
  id: string;
};


export type ModifiedInfo = {
  time: string;
};

export type Pagination = {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  totalPages: number;
};