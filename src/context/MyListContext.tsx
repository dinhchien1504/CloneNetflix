"use client"
import React, { createContext, useContext, useState, useEffect } from "react";
import { MovieItem } from "@/model/MovieApiResponse";
import { getMyList } from "@/services/movieServices";
import { useSession } from "next-auth/react";

interface MyListContextProps {
  movies: MovieItem[];
  refreshList: () => void;
  removeMovie: (slug: string) => void;
  addMovie: (movie: MovieItem) => void;
}

const MyListContext = createContext<MyListContextProps | null>(null);

export const useMyList = () => useContext(MyListContext)!;

export const MyListProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [movies, setMovies] = useState<MovieItem[]>([]);

  const fetchList = async () => {
    if (session?.user?.email) {
      const data = await getMyList(session.user.email);
      setMovies(data || []);
    }
  };

  useEffect(() => {
    fetchList();
  }, [session?.user?.email]);

  const refreshList = fetchList;

  const removeMovie = (slug: string) => {
    setMovies(prev => prev.filter(movie => movie.slug !== slug));
  };

  const addMovie = (movie: MovieItem) => {
    setMovies(prev => [...prev, movie]);
  };

  return (
    <MyListContext.Provider value={{ movies, refreshList, removeMovie, addMovie }}>
      {children}
    </MyListContext.Provider>
  );
};
