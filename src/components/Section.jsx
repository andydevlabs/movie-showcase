import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

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
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const url = `${TMDB_API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            try {
                setIsLoading(true);
                const response = await fetch(url, API_OPTIONS);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);

                setMovieList(data.results);
            } catch (error) {
                console.error(error.message);
                setErrorMessage("Error getting movies, please try again");
            } finally {
                setIsLoading(false);
            }
        };
        getMovies();
    }, []);

    return (
        <>
            <div className="all-movies">
                <h2 className="mt-[20px] text-center">All Movies</h2>
                {isLoading ? (
                    <div className="w-full flex justify-center items-center pt-4 pb-10">
                        <span className="loading loading-spinner loading-xl scale-[2]"></span>
                    </div>
                ) : errorMessage ? (
                    <p className="text-red-500">{errorMessage}</p>
                ) : (
                    <ul className="p-10">
                        {movieList.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default Section;
