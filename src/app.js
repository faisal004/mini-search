import Document from "./index/Document.js";
import FieldConfig from "./index/FieldConfig.js";
import InvertedIndex from "./index/InvertedIndex.js";
import SearchEngine from "./search/SearchEngine.js";
import pipeline from "./ingestion/pipeline.js";
import IndexSerializer from "./persistence/IndexSerializer.js";
import path from "path";

const INDEX_FILE_PATH = path.join(process.cwd(), 'data', 'index.json');

/**
 * Initialize the search engine by running the ingestion pipeline
 */
async function initializeSearchEngine() {
    console.log("Initializing Search Engine Components...");
    const fieldConfig = new FieldConfig();
    const index = new InvertedIndex(fieldConfig);
    const searchEngine = new SearchEngine(index, fieldConfig);

    // 1. Attempt to load existing index from disk
    const loaded = await IndexSerializer.load(INDEX_FILE_PATH, index);

    if (loaded) {
        console.log("Skipping data ingestion. Using loaded index.");
        return searchEngine;
    }

    // 2. If load failed (doesn't exist), run ingestion pipeline
    console.log("Building new index from ingestion pipeline...");
    const movies = await pipeline.runPipeline();

    // Index documents
    console.log('Indexing documents...');
    let indexedCount = 0;

    movies.forEach(movie => {
        // Skip invalid movies
        if (!movie.id || !movie.title) return;

        const doc = new Document(movie.id, movie);
        index.addDocument(doc);
        indexedCount++;
    });

    console.log(`\nSuccessfully indexed ${indexedCount} out of ${movies.length} fetched documents.`);
    console.log('Index stats:', index.getStats());

    // 3. Save the newly built index for future runs
    await IndexSerializer.save(index, INDEX_FILE_PATH);

    return searchEngine;
}

export default initializeSearchEngine;