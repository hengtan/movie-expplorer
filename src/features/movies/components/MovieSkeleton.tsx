import {Skeleton} from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function MovieSkeleton() {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.4}}
        >
            <div className="flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                {/* Poster com aspect ratio */}
                <div className="w-full aspect-[2/3] bg-muted">
                    <Skeleton className="w-full h-full"/>
                </div>

                {/* Detalhes do filme */}
                <div className="flex flex-col space-y-2 p-4">
                    <Skeleton className="h-4 w-3/4"/>
                    <Skeleton className="h-4 w-1/2"/>
                </div>
            </div>
        </motion.div>
    );
}