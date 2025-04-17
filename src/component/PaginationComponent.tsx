"use client";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const createPageNumbers = () => {
    const delta = 2;
    const range: (number | string)[] = [];
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    range.push(1);
    if (left > 2) range.push("...");

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < totalPages - 1) range.push("...");
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  const pageNumbers = createPageNumbers();

  return (
    <div className="flex justify-center mt-8 flex-wrap gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg shadow-md bg-gray-800 text-white disabled:opacity-40 hover:bg-gray-700 transition"
      >
        Prev
      </button>

      {pageNumbers.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-lg shadow-md border transition duration-200
              ${
                page === currentPage
                  ? "bg-blue-600 text-white border-blue-700 scale-105"
                  : "bg-white text-gray-700 hover:bg-blue-100 border-gray-300"
              }`}
          >
            {page}
          </button>
        ) : (
          <span
            key={index}
            className="px-3 py-2 text-gray-400 font-semibold select-none"
          >
            ...
          </span>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg shadow-md bg-gray-800 text-white disabled:opacity-40 hover:bg-gray-700 transition"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationComponent;
