// src/features/movies/components/SearchBar.tsx
import { Input } from "@/components/ui/input";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
    return (
        <div className="flex gap-2 items-center w-full max-w-xl mx-auto my-4">
            <Input
                placeholder="Search for a movie..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}