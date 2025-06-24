// src/features/movies/components/MovieCard.tsx

import { Link } from "react-router-dom";
import { createMovieSlug } from "@/lib/createMovieSlug";
import type {Movie} from "@/features/movies/types/movie.ts";

export function MovieCard({ movie }: { movie: Movie }) {
    const slug = createMovieSlug(movie.Title, movie.Year, movie.imdbID);

    return (
        <Link to={`/movie/${slug}`}>
            <div className="rounded shadow hover:scale-105 transition cursor-pointer">
                <img src={movie.Poster} alt={movie.Title} className="w-full h-auto" />
                <div className="p-2">
                    <h3 className="font-semibold text-sm">{movie.Title}</h3>
                    <p className="text-xs text-muted-foreground">{movie.Year}</p>
                </div>
            </div>
        </Link>
    );
}