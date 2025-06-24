import {useEffect, useRef, useState} from "react";
import {fetchMovies} from "@/features/movies/api/moviesApi";
import {SearchBar} from "@/features/movies/components/SearchBar";
import {MovieList} from "@/features/movies/components/MovieList";
import type {Movie} from "@/features/movies/types/movie";
import {useDebounce} from "@/lib/useDebounce";
import {Loader2} from "lucide-react";
export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [error, setError] = useState<string | null>(null);
    const debouncedQuery = useDebounce(query, 500);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (debouncedQuery.trim().length < 3) {
            setMovies([]);
            setPage(1);
            setHasMore(true);
            setError(null);
            return;
        }

        setPage(1);
        setMovies([]);
        loadMovies(debouncedQuery, 1, true);
    }, [debouncedQuery]);

    useEffect(() => {
        if (!sentinelRef.current || !hasMore) return;

        if (!debouncedQuery || debouncedQuery.length < 3) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && hasMore) {
                    loadMovies(debouncedQuery, page + 1);
                }
            },
            { threshold: 1 }
        );

        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [sentinelRef.current, loading, hasMore, page, debouncedQuery]);

    const loadMovies = async (search: string, pageToLoad: number, reset = false) => {
        try {
            setLoading(true);
            const delay = new Promise((res) => setTimeout(res, 500));
            const [{ results, total }] = await Promise.all([
                fetchMovies(search, pageToLoad),
                delay,
            ]);

            setMovies((prev) => (reset ? results : [...prev, ...results]));
            setPage(pageToLoad);
            setHasMore(results.length > 0 && movies.length + results.length < total);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido");
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen px-4 py-10">
            <div className="w-full max-w-md mb-6 text-center">
                <h1 className="text-4xl font-bold flex justify-center items-center gap-2 mb-4">🎬 Movie Explorer</h1>
                <SearchBar value={query} onChange={setQuery} />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <MovieList movies={movies} />

            {loading && (
                <div className="my-6">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
            )}

            {/* Mostrar aviso quando acabar os resultados */}
            {!hasMore && !loading && movies.length > 0 && (
                <p className="text-center mt-4 text-muted-foreground">Fim dos resultados.</p>
            )}

            {/* Ref do scroll infinito */}
            <div ref={sentinelRef} className="h-10" />
        </main>
    );
}