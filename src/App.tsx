// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "@/features/movies/pages/Home.tsx";
import MovieDetail from "@/features/movies/pages/MovieDetail.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:slug" element={<MovieDetail />} />
        </Routes>
    );
}

export default App;