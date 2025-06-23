// src/features/movies/pages/MovieDetail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieById } from "@/features/movies/api/moviesApi";
import type { MovieDetail } from "@/features/movies/types/movieDetail";
import { Loader2 } from "lucide-react";

export function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        fetchMovieById(id)
            .then(setMovie)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!movie) {
        return (
            <p className="text-center text-red-500 mt-4">Filme não encontrado</p>
        );
    }

    return (
        <main className="flex flex-col items-center px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">{movie.Title}</h1>
            <img src={movie.Poster} alt={movie.Title} className="w-48 mb-4 rounded" />
            <div className="text-sm space-y-2">
                <p><strong>Ano:</strong> {movie.Year}</p>
                <p><strong>Diretor:</strong> {movie.Director}</p>
                <p><strong>Gênero:</strong> {movie.Genre}</p>
                <p><strong>Sinopse:</strong> {movie.Plot}</p>
            </div>
        </main>
    );
}