/**
 * Normalizes raw API data into our engine's expected Document format
 */
class Normalizer {
    /**
     * Normalize an array of TMDB movie objects
     * @param {Array} rawMovies 
     * @returns {Array} Array of uniform movie objects
     */
    normalize(rawMovies) {
        if (!Array.isArray(rawMovies)) return [];

        return rawMovies.map(movie => {
            // Extract the year from release_date (e.g., "1999-03-30")
            let year = "";
            if (movie.release_date && typeof movie.release_date === 'string') {
                year = movie.release_date.split('-')[0];
            }

            // We don't have direct access to string genres without another API call
            // in TMDB (they send genre_ids). For this mini engine, we'll just mock it
            // or leave it as "Unknown" if not provided by the fallback gist.
            const genre = movie.genre || "Unknown";

            return {
                id: movie.id,
                title: movie.title || movie.original_title || "Unknown Title",
                description: movie.overview || "",
                year: year,
                genre: genre
            };
        });
    }
}

export default new Normalizer();
