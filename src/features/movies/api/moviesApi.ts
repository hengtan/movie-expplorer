// src/features/movies/api/moviesApi.ts
const API_URL = "https://www.omdbapi.com/";
const API_KEY = "9ad2b907";

export async function fetchMovies(search: string) {
    const res = await fetch(`${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(search)}`);
    const data = await res.json();
    if (data.Response === "False") throw new Error(data.Error);
    return data.Search;
}

export async function fetchMovieById(id: string) {
    const response = await fetch(`${API_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
    const data = await response.json();
    if (data.Response === "False") throw new Error(data.Error);
    return data;
}