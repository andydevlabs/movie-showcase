export default function MovieCard({
    movie: {
        title,
        poster_path,
        vote_average,
        original_language,
        release_date,
    },
}) {
    const IMG_URL = `https://image.tmdb.org/t/p/w500/${poster_path}`;

    return (
        <>
            <div className="movie-card">
                <img
                    src={poster_path ? `${IMG_URL}` : "/no-movie.png"}
                    alt={`${title} poster`}
                />

                <div className="mt-3">
                    <h3>{title}</h3>
                </div>

                <div className="content">
                    <div className="flex flex-row items-center gap-1">
                        <img src="star.svg" alt="Star icon" />
                        <p>{vote_average ? vote_average.toFixed(1) : "N/A"} </p>
                    </div>

                    <span>/</span>
                    <p className="lang">{original_language}</p>

                    <span>/</span>
                    <p className="year">{release_date ? release_date.split("-")[0] : "N/A"}</p>
                </div>
            </div>
        </>
    );
}
