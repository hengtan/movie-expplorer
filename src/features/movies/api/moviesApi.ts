// src/features/movies/api/moviesApi.ts
const API_URL = "https://www.omdbapi.com/";
const API_KEY = "9ad2b907"; // ← substitua por sua chave real

export async function fetchMovies(search: string) {
    const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${search}`);
    const data = await response.json();
    if (data.Response === "False") throw new Error(data.Error);
    return data.Search;
}