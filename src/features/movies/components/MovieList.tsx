// src/features/movies/components/MovieList.tsx
// src/features/movies/components/MovieList.tsx
import type {Movie} from "../types/movie";
import { MovieCard } from "./MovieCard.tsx";

export function MovieList({ movies }: { movies: Movie[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
            {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
            ))}
        </div>
    );
}