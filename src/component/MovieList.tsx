'use client';

import React, { useState, useEffect, useRef } from 'react';
import MovieCard from './MovieCard';
import { getMovies } from '@/services/movieServices';
import { MovieItem, Pagination } from '@/model/MovieApiResponse';
import PaginationComponent from './PaginationComponent';
import MovieSearch from './MovieSearch';
import { useRouter, useSearchParams } from 'next/navigation';
interface Filters{
  keyword: string;
  category: string;
  country: string;
  year: string;
};

const MovieList: React.FC<{ title: string }> = ({ title }) => {
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [pagination, setPagination] = useState<Pagination>();
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get('page') || '1');
  const [filters, setFilters] = useState<Filters>({
    keyword: '',
    category: '',
    country: '',
    year: '',
  });
  

  // Scroll lên đầu trang mỗi khi đổi trang hoặc tìm kiếm
  const scrollToSearch = () => {
    if (searchRef.current) {
      searchRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const newFilters: Filters = {
      keyword: searchParams.get('keyword') || '',
      category: searchParams.get('category') || '',
      country: searchParams.get('country') || '',
      year: searchParams.get('year') || '',
    };
    setFilters(newFilters);

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getMovies({ ...newFilters, page });
        if (data?.items) {
          setMovies(data.items);
          setPagination(data.pagination);
        }
      } catch (error) {
        console.error('Lỗi khi fetch dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    scrollToSearch();
  }, [page, searchParams]);

  const handleSearch = (newFilters: Filters) => {
    const params = new URLSearchParams({ page: '1', ...newFilters });
    router.push(`?${params.toString()}`);
  };

  const changePage = (newPage: number) => {
    const params = new URLSearchParams({ page: newPage.toString(), ...filters });
    router.push(`?${params.toString()}`);
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
          currentPage={page}
          totalPages={pagination ? pagination.totalPages : 1}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
};

export default MovieList;
