import { Skeleton } from "@/components/ui/skeleton";

export function MovieSkeleton() {
    return (
        <div className="flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
            {/* Poster com aspect ratio */}
            <div className="w-full aspect-[2/3] bg-muted">
                <Skeleton className="w-full h-full" />
            </div>

            {/* Detalhes do filme */}
            <div className="flex flex-col space-y-2 p-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        </div>
    );
}