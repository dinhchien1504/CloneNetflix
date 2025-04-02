'use client'
import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { BsArrow90DegLeft, BsArrowBarLeft, BsArrowLeft, BsArrowLeftCircle, BsArrowRight, BsArrowRightCircle, BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';

const MovieList: React.FC<{ title: string }> = ({ title }) => {
    const [movies, setMovies] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [prevMovies, setPrevMovies] = useState<any[]>([]); // Giữ data cũ

    // Hàm fetch dữ liệu từ API
    const fetchMovies = async (page: number) => {
        setLoading(true);
        try {
            const response = await fetch(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${page}`);
            const data = await response.json();
            if (data?.items) {
                setPrevMovies(movies); // Lưu lại data cũ
                setMovies(data.items);
                setTotalPages(data?.pagination?.totalPages || 1);
            }
        } catch (error) {
            console.error('Lỗi khi fetch dữ liệu:', error);
        } finally {
            setLoading(false);
        }
    };

    // Gọi API khi trang thay đổi
    useEffect(() => {
        fetchMovies(currentPage);
    }, [currentPage]);

    // Xử lý chuyển trang mượt hơn
    const changePage = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
        window.history.pushState(null, '', `?page=${newPage}`); // Cập nhật URL nhưng không load lại
    };

    return (
        <div className="px-4 md:px-12 mt-4 space-y-8">
            <div>
                <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                    {title}
                </p>
                <div className="grid grid-cols-4 gap-2">
                    {(loading ? prevMovies : movies).map((movie) => (
                        <MovieCard key={movie._id} data={{ movie }} />
                    ))}
                </div>

                {/* Điều hướng phân trang */}
                <div className="flex justify-center mt-4 space-x-4 pb-10 pt-5 items-center">
                    <button
                        onClick={() => changePage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-4  text-white rounded-full disabled:opacity-50 hover:cursor-pointer"
                    >
                       <BsCaretLeftFill/>
                    </button>
                    <span className="text-white">Trang {currentPage} / {totalPages}</span>
                    <button
                        onClick={() => changePage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-4  text-white rounded-full disabled:opacity-50 hover:cursor-pointer"
                    >
                        <BsCaretRightFill/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieList;
