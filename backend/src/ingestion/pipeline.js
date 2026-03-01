import fs from 'fs';
import path from 'path';

/**
 * The main pipeline that coordinates fetching, normalizing, and returning data
 */
class DataIngestionPipeline {
    /**
     * Execute the pipeline to load product data
     * @returns {Promise<Array>} Array of product objects
     */
    async runPipeline() {
        console.log("=== Starting Data Ingestion Pipeline ===");

        // 1. Load data
        console.log("-> Loading product data...");
        const dataPath = path.join(process.cwd(), 'data', 'products.json');

        if (!fs.existsSync(dataPath)) {
            throw new Error("Products file not found. Please run scripts/generate-products.js first.");
        }

        const rawData = fs.readFileSync(dataPath, 'utf-8');
        const products = JSON.parse(rawData);

        console.log(`   Loaded ${products.length} products.`);

        console.log("=== Pipeline Complete ===");
        return products;
    }
}

export default new DataIngestionPipeline();
