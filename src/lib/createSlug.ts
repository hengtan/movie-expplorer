export function createSlug(title: string, imdbID: string) {
    return `${title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}-${imdbID}`;
}