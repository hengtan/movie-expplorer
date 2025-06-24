import { Routes, Route, useLocation } from "react-router-dom";
import Home from "@/features/movies/pages/Home";
import MovieDetail from "@/features/movies/pages/MovieDetail";
import { AnimatePresence } from "framer-motion";

function AppRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:slug" element={<MovieDetail />} />
            </Routes>
        </AnimatePresence>
    );
}

export default AppRoutes; // ← apenas exporta as rotas