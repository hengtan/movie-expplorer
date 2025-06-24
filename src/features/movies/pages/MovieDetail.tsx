import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieById } from "@/features/movies/api/moviesApi";
import type { MovieDetail } from "@/features/movies/types/movieDetail";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function MovieDetail() {
    const { slug } = useParams();
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const parts = slug.split("-");
        const imdbID = parts[parts.length - 1]; // extrai o imdbID do slug

        setLoading(true);
        fetchMovieById(imdbID)
            .then(setMovie)
            .catch((err) => {
                console.error("Erro ao buscar filme:", err);
                setMovie(null);
            })
            .finally(() => setLoading(false));
    }, [slug]);

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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto px-4 py-8"
        >
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
        </motion.div>
    );
}