import dotenv from 'dotenv';
dotenv.config();

/**
 * tmdbFetcher: Fetches popular movies from TMDB API
 */
class TMDBFetcher {
    constructor() {
        this.apiKey = process.env.TMDB_API_KEY;
        this.accessToken = process.env.TMDB_READ_ACCESS_TOKEN;
        this.baseUrl = 'https://api.themoviedb.org/3';

        if (!this.apiKey) {
            console.warn("⚠️ TMDB_API_KEY is not set in .env! Using fallback public dataset instead.");
        }
    }

    /**
     * Fetch multiple pages of popular movies
     * @param {number} pagesToFetch - Number of pages to retrieve (20 movies per page)
     */
    async fetchPopularMovies(pagesToFetch = 5) {
        if (!this.apiKey) {
            return this.fetchFallbackData();
        }

        console.log(`Fetching ${pagesToFetch} pages of popular movies from TMDB...`);
        let allMovies = [];

        for (let page = 1; page <= pagesToFetch; page++) {
            try {
                const response = await fetch(`${this.baseUrl}/movie/popular?language=en-US&page=${page}`, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${this.accessToken}`
                    }
                });

                if (!response.ok) {
                    // If authorization fails, try falling back
                    if (response.status === 401) {
                        console.error("TMDB API Key is invalid or unauthorized. Falling back to mock dataset.");
                        return this.fetchFallbackData();
                    }
                    throw new Error(`TMDB API Error: ${response.status}`);
                }

                const data = await response.json();
                allMovies = allMovies.concat(data.results);

                // Be nice to the API
                await new Promise(resolve => setTimeout(resolve, 200));
            } catch (error) {
                console.error(`Failed to fetch page ${page}:`, error.message);
                break;
            }
        }

        return allMovies;
    }

    /**
     * Fallback to a mock dataset if API key is missing
     */
    async fetchFallbackData() {
        console.log("Loading fallback movie dataset...");
        // Using a static gist with TMDB-like structure for testing without an API key
        try {
            const res = await fetch('https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/523c324c7fcc36efab8224f9ebb7556c09b69a14/Film.JSON');
            const data = await res.json();

            // Manually transform this specific gist to look somewhat like TMDB output
            // so the normalizer doesn't break
            return data.map(movie => ({
                id: movie.Id || Math.floor(Math.random() * 100000),
                title: movie.Title,
                overview: movie.Plot,
                release_date: movie.Released,
                genre_ids: [] // Missing from this specific open dataset
            }));
        } catch (e) {
            console.error("Fallback failed, returning empty array.");
            return [];
        }
    }
}

export default new TMDBFetcher();
