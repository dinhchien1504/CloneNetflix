'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import MovieCard from './MovieCard';
import { getMovies } from '@/services/movieServices';
import { MovieItem, Pagination } from '@/model/MovieApiResponse';
import PaginationComponent from './PaginationComponent';
import MovieSearch from './MovieSearch';
interface Filters{
  keyword: string;
  category: string;
  country: string;
  year: string;
};

const MovieList: React.FC<{ title: string }> = ({ title }) => {
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [pagination, setPagination] = useState<Pagination>();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // const [prevMovies, setPrevMovies] = useState<MovieItem[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<Filters>({
    keyword: '',
    category: '',
    country: '',
    year: ''
  });

  // Scroll lên đầu trang mỗi khi đổi trang hoặc tìm kiếm
  const scrollToSearch = () => {
    if (searchRef.current) {
      searchRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getFiltersFromURL = (): { filters: Filters; page: number } => {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page') || '1');
    const keyword = params.get('keyword') || '';
    const category = params.get('category') || '';
    const country = params.get('country') || '';
    const year = params.get('year') || '';
    return {
      filters: { keyword, category, country, year },
      page
    };
  };

  useEffect(() => {
    const { filters, page } = getFiltersFromURL();
    setFilters(filters);
    setCurrentPage(page);
  }, []);

  const fetchMovies = useCallback(async (filters: Filters, page: number) => {
    setLoading(true);
    try {
      const data = await getMovies({ ...filters, page });
      if (data?.items) {
        // setPrevMovies(movies);
        setMovies(data.items);
        setPagination(data.pagination);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error('Lỗi khi fetch dữ liệu:', error);
    } finally {
      setLoading(false);
    }
  }, [movies]);

  useEffect(() => {
    fetchMovies(filters, currentPage);
    scrollToSearch();
  }, [currentPage, JSON.stringify(filters)]);

  const handleSearch = (newFilters: Filters) => {
    const params = new URLSearchParams({ page: '1', ...newFilters });
    window.history.pushState(null, '', `?${params.toString()}`);
    setFilters(newFilters);
    setCurrentPage(1);
    fetchMovies(newFilters, 1);
    scrollToSearch();
  };

  const changePage = (newPage: number) => {
    if (!pagination || newPage < 1 || newPage > pagination.totalPages) return;
    const params = new URLSearchParams({ page: newPage.toString(), ...filters });
    window.history.pushState(null, '', `?${params.toString()}`);
    setCurrentPage(newPage);
    scrollToSearch();
  };

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div ref={searchRef}>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>

        <MovieSearch onSearch={handleSearch}/>

        {loading && (
          <p className="text-center text-white text-lg py-4 animate-pulse">Đang tải phim...</p>
        )}

        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {(loading ? prevMovies : movies).map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div> */}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {loading
  ? Array.from({ length: 8 }).map((_, index) => (
      <div
        key={index}
        className="h-[300px] bg-gray-800 animate-pulse rounded"
      ></div>
    ))
  : movies.map((movie) => (
      <MovieCard key={movie._id} movie={movie} />
    ))}
</div>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={pagination ? pagination.totalPages : 1}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
};

export default MovieList;
