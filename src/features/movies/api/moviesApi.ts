// src/features/movies/api/moviesApi.ts
const API_URL = "https://www.omdbapi.com/";
const API_KEY = "9ad2b907";

export async function fetchMovies(search: string, page = 1) {
    const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${search}&page=${page}`);
    const data = await response.json();
    if (data.Response === "False") throw new Error(data.Error);
    return { results: data.Search, total: parseInt(data.totalResults) };
}

export async function fetchMovieById(id: string) {
    const response = await fetch(`${API_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
    const data = await response.json();
    if (data.Response === "False") throw new Error(data.Error);
    return data;
}

