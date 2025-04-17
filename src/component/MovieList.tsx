'use client'
import React, { useState, useEffect, useCallback } from 'react';
import MovieCard from './MovieCard';
import { getMovies } from '@/services/movieServices';
import { MovieItem, Pagination } from '@/model/MovieApiResponse';
import PaginationComponent from './PaginationComponent';

const MovieList: React.FC<{ title: string}> = ({ title }) => {
    const [movies, setMovies] = useState<MovieItem[]>([]);
    const [pagination, setPagination] = useState<Pagination>();
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [prevMovies, setPrevMovies] = useState<MovieItem[]>([]); // Giữ data cũ

    // Hàm fetch dữ liệu từ API 
    const fetchMovies = useCallback(async (page: number) => {
        setLoading(true);
        try {
            const data = await getMovies(page);
            if (data?.items) {
                setPrevMovies(movies);
                setMovies(data.items);
                setPagination(data.pagination);
                setCurrentPage(page); // cập nhật page khi fetch thành công
            }
        } catch (error) {
            console.error('Lỗi khi fetch dữ liệu:', error);
        } finally {
            setLoading(false);
        }
    },[movies]);

    // Gọi API khi trang thay đổi
    useEffect(() => {
        fetchMovies(currentPage);
    }, [currentPage]);

    // Xử lý chuyển trang mượt hơn
    const changePage = (newPage: number) => {
        if (!pagination) return;
        if (newPage < 1 || newPage > pagination.totalPages) return;

        setCurrentPage(newPage); // trigger useEffect
        window.history.pushState(null, '', `?page=${newPage}`);
    };

    return (
        <div className="px-4 md:px-12 mt-4 space-y-8">
            <div>
                <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                    {title}
                </p>
                <div className="grid grid-cols-4 gap-2">
                    {(loading ? prevMovies : movies).map((movie) => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
                </div>

                {/* Điều hướng phân trang */}
                <PaginationComponent currentPage={currentPage} totalPages={pagination ? pagination.totalPages : 1} onPageChange={changePage}  ></PaginationComponent>
            </div>
        </div>
    );
};

export default MovieList;