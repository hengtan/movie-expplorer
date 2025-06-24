import { useTheme } from "@/lib/theme";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            style={{ outline: "none", boxShadow: "none", border: "none" }}
            className="fixed top-4 right-4 z-50 flex items-center gap-2 text-sm font-medium
             text-foreground bg-transparent hover:bg-foreground/10
             transition-colors duration-300 rounded-md px-3 py-2
             focus:outline-none focus:ring-0 focus:border-none"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <>
                    <Sun className="w-4 h-4 text-yellow-400" />
                    <span>Light Mode</span>
                </>
            ) : (
                <>
                    <Moon className="w-4 h-4 text-blue-500" />
                    <span>Dark Mode</span>
                </>
            )}
        </button>
    );
}