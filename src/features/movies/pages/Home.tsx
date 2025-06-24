import {useEffect, useState} from "react";
import {fetchMovies} from "@/features/movies/api/moviesApi";
import {SearchBar} from "@/features/movies/components/SearchBar";
import {MovieList} from "@/features/movies/components/MovieList";
import type {Movie} from "@/features/movies/types/movie";
import {useDebounce} from "@/lib/useDebounce";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Loader2, AlertTriangle} from "lucide-react";

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState("");

    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        if (debouncedQuery.trim().length >= 3) {
            handleSearch(debouncedQuery);
        } else {
            setMovies([]);
            setError(null); // limpa erro se limpar a busca
        }
    }, [debouncedQuery]);

    const handleSearch = async (query: string) => {
        try {
            setLoading(true);
            setError(null);

            const fetchPromise = fetchMovies(query);
            const delayPromise = new Promise((res) => setTimeout(res, 500));
            const [results] = await Promise.all([fetchPromise, delayPromise]);

            if (!results || (Array.isArray(results) && results.length === 0)) {
                throw new Error("Movie not found!");
            }

            setMovies(results as Movie[]);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido");
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen px-4 py-10">
            <div className="w-full max-w-md flex flex-col items-center gap-6">
                {/* Centralizado com base total do título + ícone */}
                <div className="relative flex justify-center items-center">
                    {/* Ícone absoluto à esquerda */}
                    <span className="absolute left-0 text-4xl">🎬</span>
                    {/* Título com padding-left para compensar o ícone */}
                    <h1 className="text-4xl font-bold pl-10">Movie Explorer</h1>
                </div>

                {/* Input 100% da largura do container */}
                <div className="w-full">
                    <SearchBar value={query} onChange={setQuery} />
                </div>
            </div>

            {/* Resto (loader, erros e resultados) abaixo */}
            {loading && (
                <div className="flex justify-center items-center h-96">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
            )}

            {!loading && error && (
                <Alert variant="destructive" className="mt-6 max-w-lg">
                    <AlertTriangle className="h-5 w-5" />
                    <AlertTitle>Erro na busca</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
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