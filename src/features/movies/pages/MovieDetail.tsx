// src/features/movies/pages/MovieDetail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieById } from "@/features/movies/api/moviesApi";
import type { MovieDetail } from "@/features/movies/types/movieDetail";
import { Loader2 } from "lucide-react";

export default function MovieDetail() {
    const { slug } = useParams();
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const parts = slug.split("-");
        const imdbID = parts[parts.length - 1]; // último elemento

        fetchMovieById(imdbID).then((data) => {
            setMovie(data);
            setLoading(false);
        });
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!movie) return <p>Filme não encontrado.</p>;

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">{movie.Title}</h1>
            <img src={movie.Poster} alt={movie.Title} className="w-64 mb-4" />
            <p><strong>Ano:</strong> {movie.Year}</p>
            <p><strong>Diretor:</strong> {movie.Director}</p>
            <p><strong>Gênero:</strong> {movie.Genre}</p>
            <p><strong>Sinopse:</strong> {movie.Plot}</p>
        </div>
    );
}