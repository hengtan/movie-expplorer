// src/features/movies/components/MovieCard.tsx

import { Link } from "react-router-dom";
import type { Movie } from "@/features/movies/types/movie";
import {Card, CardContent} from "@/components/ui/card.tsx";

export function MovieCard({ movie }: { movie: Movie }) {
    return (
        <Link
            to={`/movie/${movie.imdbID}`}
        >
            <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
                <CardContent className="p-2">
                    <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="w-full h-auto rounded-md aspect-[2/3] object-cover"
                    />
                    <p className="mt-2 text-sm text-center font-medium">{movie.Title}</p>
                </CardContent>
            </Card>
        </Link>
    );
}