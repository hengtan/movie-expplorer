import type {Movie} from "@/features/movies/types/movie";
import {motion} from "framer-motion";
import {Card, CardContent} from "@/components/ui/card";
import {Link} from "react-router-dom";
import {createSlug} from "@/lib/createSlug.ts";

export function MovieCard({movie}: { movie: Movie }) {
    const slug = createSlug(movie.Title, movie.imdbID);

    return (
        <Link to={`/movie/${slug}`}>
            <motion.div
                layout
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.3, ease: "easeOut"}}
            >
                <Card className="hover:shadow-lg transition">
                    <CardContent className="p-0">
                        <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="rounded-t-md w-full aspect-[2/3] object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold">{movie.Title}</h3>
                            <p className="text-sm text-muted-foreground">{movie.Year}</p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </Link>
    );
}