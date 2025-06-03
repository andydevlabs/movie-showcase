import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "../lib/appwrite";

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_KEY;
const API_OPTIONS = {
    method: "GET",
    headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
    },
};

const Section = () => {
    const [searchInput, setSearchInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [movieList, setMovieList] = useState([]);
    const [debounceSearch, setDebounceSearch] = useState("");
    const [trendingMovies, setTrendingMovies] = useState([]);

    useDebounce(() => setDebounceSearch(searchInput), 700, [searchInput]);

    const getMovies = async (query) => {
        const endpoint = query
            ? `${TMDB_API_BASE_URL}/search/movie?query=${encodeURIComponent(
                  query
              )}`
            : `${TMDB_API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

        try {
            setIsLoading(true);
            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            setMovieList(data.results);

            if (query && data.results.length > 0) {
                await updateSearchCount(query, data.results[0]);
            }
        } catch (error) {
            console.error(error.message);
            setErrorMessage("Error getting movies, please try again");
        } finally {
            setIsLoading(false);
        }
    };

    const loadTrendingMovies = async () => {
        try {
            const movies = await getTrendingMovies();
            setTrendingMovies(movies);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getMovies(debounceSearch);
        
    }, [debounceSearch]);

    useEffect(() => {
        loadTrendingMovies();
    }, [])

    return (
        <>
            <div className="search">
                <div>
                    <img src="search.svg" alt="Search Icon" />
                    <input
                        type="text"
                        placeholder="Search for movies..."
                        value={searchInput}
                        onChange={(e) => {
                            setSearchInput(e.target.value);
                        }}
                    />
                </div>
            </div>

            {trendingMovies.length > 0 && (
                <section className="trending">
                    <h2 className="px-10 text-center lg:text-start lg:text-5xl">
                        Trending Movies
                    </h2>
                    <ul className="flex justify-center items-center">
                        {trendingMovies.map((movie, index) => (
                            <li key={movie.$id}>
                                <p className="text-transparent">{index + 1}</p>
                                <img src={movie.poster_url} alt={movie.title} className="scale-120"/>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <section className="all-movies">
                <h2 className="px-10 text-center lg:text-start lg:text-5xl">
                    All Movies
                </h2>
                {isLoading ? (
                    <div className="w-full flex justify-center items-center pt-4 pb-10">
                        <span className="loading loading-spinner loading-xl scale-[2]"></span>
                    </div>
                ) : errorMessage ? (
                    <p className="text-red-500">{errorMessage}</p>
                ) : (
                    <ul className="px-10">
                        {movieList.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </ul>
                )}
            </section>
        </>
    );
};

export default Section;
