import createServer from "./api/server.js";
import initializeSearchEngine from "./app.js";

const PORT = process.env.PORT || 3000;

async function startApp() {
    try {
        // Initialize search engine (now async because it fetches data)
        const searchEngine = await initializeSearchEngine();

        // Create and start server
        const app = createServer(searchEngine);

        app.listen(PORT, () => {
            console.log(`\n${'='.repeat(60)}`);
            console.log(`🚀 Mini Search Engine running on port ${PORT}`);
            console.log(`${'='.repeat(60)}\n`);
            console.log('Available endpoints:');
            console.log(`  GET  /health`);
            console.log(`  GET  /api/search?q=<query>&page=1&pageSize=10`);
            console.log(`  GET  /api/search/explain/:docId?q=<query>`);
            console.log(`  GET  /api/stats`);
            console.log(`\n${'='.repeat(60)}\n`);
            console.log('Example requests:');
            console.log(`  curl "http://localhost:${PORT}/api/search?q=matrix"`);
            console.log(`  curl "http://localhost:${PORT}/api/search?q=dream&year=2010"`);
            console.log(`  curl "http://localhost:${PORT}/api/stats"`);
            console.log(`\n${'='.repeat(60)}\n`);
        });
    } catch (error) {
        console.error("Failed to start application:", error);
        process.exit(1);
    }
}

startApp();