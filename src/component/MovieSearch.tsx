'use client';
import React, { useState } from 'react';

interface SearchProps {
  onSearch: (filters: {
    keyword: string;
    category: string;
    country: string;
    year: string;
  }) => void;
}

const categories = [
  { label: 'Hành động', value: 'hanh-dong' },
  { label: 'Tình cảm', value: 'tinh-cam' },
  { label: 'Kinh dị', value: 'kinh-di' },
];

const countries = [
  { label: 'Việt Nam', value: 'viet-nam' },
  { label: 'Hàn Quốc', value: 'han-quoc' },
  { label: 'Trung Quốc', value: 'trung-quoc' },
];

const years = Array.from({ length: 2025 - 1970 + 1 }, (_, i) => ({
  label: (1970 + i).toString(),
  value: (1970 + i).toString(),
}));

const MovieSearch: React.FC<SearchProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ keyword, category, country, year });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex justify-center flex-wrap gap-4 text-white">
      <input
        type="text"
        placeholder="Từ khóa..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="p-2 rounded w-full sm:w-48 border-1"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 rounded w-full sm:w-40"
      >
        <option value="" className='text-black'>--Thể loại--</option>
        {categories.map((item) => (
          <option key={item.value} value={item.value} className='text-black'>
            {item.label}
          </option>
        ))}
      </select>

      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="p-2 rounded w-full sm:w-40"
      >
        <option value="" className='text-black'>--Quốc gia--</option>
        {countries.map((item) => (
          <option key={item.value} value={item.value} className='text-black'>
            {item.label}
          </option>
        ))}
      </select>

      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="p-2 rounded w-full sm:w-24" 
      >
        <option value="" className='text-black'>--Năm--</option>
        {years.reverse().map((item) => (
          <option key={item.value} value={item.value} className='text-black'>
            {item.label}
          </option>
        ))}
      </select>

      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
        Tìm kiếm
      </button>
    </form>
  );
};

export default MovieSearch;
