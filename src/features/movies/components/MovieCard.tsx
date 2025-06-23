// src/features/movies/components/MovieCard.tsx
// src/features/movies/components/MovieCard.tsx
import type {Movie} from "../types/movie";
import { Card, CardContent } from "@/components/ui/card";

export function MovieCard({ movie }: { movie: Movie }) {
    return (
        <Card className="w-full max-w-xs overflow-hidden shadow-sm hover:shadow-md transition rounded-xl">
            <div className="aspect-[2/3] w-full">
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : '/placeholder.png'}
                    alt={movie.Title}
                    className="w-full h-full object-cover"
                />
            </div>
            <CardContent className="p-4">
                <p className="font-bold">{movie.Title}</p>
                <p className="text-sm text-muted-foreground">{movie.Year}</p>
            </CardContent>
        </Card>
    );
}