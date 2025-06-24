// src/features/movies/components/SearchBar.tsx
import { Input } from "@/components/ui/input";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
    return (
        <div className="w-full max-w-md mx-auto my-4">
            <Input
                placeholder="Busque um filme... (mínimo 3 letras)"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full text-center"
            />
        </div>
    );
}