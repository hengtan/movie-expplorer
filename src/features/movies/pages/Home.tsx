// src/features/pages/Home.tsx
import { useEffect, useState } from "react";
import { fetchMovies } from "@/features/movies/api/moviesApi";
import { SearchBar } from "@/features/movies/components/SearchBar";
import { MovieList } from "@/features/movies/components/MovieList";
import type { Movie } from "@/features/movies/types/movie";
import { useDebounce } from "@/lib/useDebounce";
import { Loader2 } from "lucide-react";

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState("");

    const debouncedQuery = useDebounce(query, 500);

    // 🔁 Executa busca automática ao parar de digitar
    useEffect(() => {
        if (debouncedQuery.trim().length >= 3) {
            handleSearch(debouncedQuery);
        } else {
            setMovies([]);
        }
    }, [debouncedQuery]);

    const handleSearch = async (search: string) => {
        try {
            setLoading(true);
            setError(null);

            const fetchPromise = fetchMovies(search);
            const delayPromise = new Promise((res) => setTimeout(res, 500)); // mínimo 500ms

            const [results] = await Promise.all([fetchPromise, delayPromise]);
            setMovies(results as Movie[]);
        } catch (err) {
            console.error("Erro na busca:", err);
            setError(err instanceof Error ? err.message : "Erro desconhecido");
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex flex-col items-center px-4 py-10">
            <h1 className="text-4xl font-bold flex items-center gap-2 mb-6">🎬 Movie Explorer</h1>
            <SearchBar value={query} onChange={setQuery} />

            {loading && (
                <div className="flex justify-center items-center h-96">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
            )}

            {error && (
                <p className="text-center mt-4 text-red-500">{error}</p>
            )}

            {!loading && !error && movies.length > 0 && (
                <>
                    <h2 className="text-xl font-semibold text-center my-6">Resultados:</h2>
                    <MovieList movies={movies} />
                </>
            )}
        </main>
    );
}