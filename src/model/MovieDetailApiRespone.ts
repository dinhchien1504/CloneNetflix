export type MovieDetailResponse = {
  status: boolean;
  msg: string;
  movie: MovieDetail;
  episodes: EpisodeServer[];
};

export type MovieDetail = {
  tmdb: TmdbInfo;
  imdb: ImdbInfo;
  created: TimestampInfo;
  modified: TimestampInfo;
  _id: string;
  name: string;
  origin_name: string;
  content: string;
  type: string;
  status: string;
  thumb_url: string;
  trailer_url: string;
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  notify: string;
  showtimes: string;
  slug: string;
  year: number;
  view: number;
  actor: string[];
  director: string[];
  category: Category[];
  country: Country[];
  is_copyright: boolean;
  chieurap: boolean;
  poster_url: string;
  sub_docquyen: boolean;
};

export type TmdbInfo = {
  type: string | null;
  id: string;
  season: number | null;
  vote_average: number;
  vote_count: number;
};

export type ImdbInfo = {
  id: string;
};

export type TimestampInfo = {
  time: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Country = {
  id: string;
  name: string;
  slug: string;
};

export type EpisodeServer = {
  server_name: string;
  server_data: Episode[];
};

export type Episode = {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
};
