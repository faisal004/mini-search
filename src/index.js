import createServer from "./api/server.js";
import initializeSearchEngine from "./app.js";


const PORT = process.env.PORT || 3000;

// Initialize search engine
const searchEngine = initializeSearchEngine();

// Create and start server
const app = createServer(searchEngine);

app.listen(PORT, () => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🚀 Mini Search Engine running on port ${PORT}`);
    console.log(`${'='.repeat(60)}\n`);
    console.log('Available endpoints:');
    console.log(`  GET  /health`);
    console.log(`  GET  /api/search?q=<query>`);
    console.log(`\n${'='.repeat(60)}\n`);
});