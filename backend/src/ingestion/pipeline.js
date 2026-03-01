import tmdbFetcher from './tmdbFetcher.js';
import normalizer from './normalizer.js';

/**
 * The main pipeline that coordinates fetching, normalizing, and returning data
 */
class DataIngestionPipeline {
    /**
     * Execute the pipeline to fetch and normalize real movie data
     * @returns {Promise<Array>} Array of normalized movie objects
     */
    async runPipeline() {
        console.log("=== Starting Data Ingestion Pipeline ===");

        // 1. Fetch
        console.log("-> Fetching raw data...");
        const rawData = await tmdbFetcher.fetchPopularMovies(50); // Fetch 5 pages
        console.log(`   Fetched ${rawData.length} raw records.`);

        // 2. Normalize
        console.log("-> Normalizing data format...");
        const normalizedData = normalizer.normalize(rawData);

        console.log("=== Pipeline Complete ===");
        return normalizedData;
    }
}

export default new DataIngestionPipeline();
