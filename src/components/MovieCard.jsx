export default function MovieCard({ movie: { poster_path} }) {
    const IMG_URL = `https://image.tmdb.org/t/p/w500/${poster_path}`;

    return (
        <>
            <div>
                <img src={poster_path ? `${IMG_URL}` : "/no-movie.png"} alt="Movie poster" />
            </div>
        </>
    );
}
