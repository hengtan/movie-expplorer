// src/features/movies/components/MovieCard.tsx

import { Link } from "react-router-dom";
import type { Movie } from "@/features/movies/types/movie";

export function MovieCard({ movie }: { movie: Movie }) {
    return (
        <Link
            to={`/movie/${movie.imdbID}`}
            className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition border"
        >
            <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full aspect-[2/3] object-cover"
            />
            <div className="p-3">
                <h3 className="text-base font-semibold text-foreground line-clamp-2">
                    {movie.Title}
                </h3>
                <p className="text-sm text-muted-foreground">{movie.Year}</p>
            </div>
        </Link>
    );
}