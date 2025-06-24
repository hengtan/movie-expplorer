export function createMovieSlug(title: string, year: string, imdbID: string): string {
    const normalizedTitle = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") // troca espaços e símbolos por hífen
        .replace(/(^-|-$)/g, ""); // remove hífen do começo/fim

    return `${normalizedTitle}-${year}-${imdbID}`;
}