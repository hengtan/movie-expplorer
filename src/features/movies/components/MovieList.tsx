import type { Movie } from "@/features/movies/types/movie";
import { MovieCard } from "./MovieCard";

export function MovieList({ movies }: { movies: Movie[] }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
            {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
            ))}
        </div>
    );
}