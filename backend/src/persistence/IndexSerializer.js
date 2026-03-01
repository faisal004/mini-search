import fs from 'fs/promises';
import path from 'path';
import Document from '../index/Document.js';

export default class IndexSerializer {
    /**
     * Serialize and save the InvertedIndex to a JSON file
     * @param {InvertedIndex} index - The index instance
     * @param {string} filePath - Path to save the file (e.g., './data/index.json')
     */
    static async save(index, filePath) {
        try {
            console.log("Saving index to disk...");

            // Ensure directory exists
            const dir = path.dirname(filePath);
            await fs.mkdir(dir, { recursive: true });

            // Maps cannot be directly stringified to JSON. 
            // We must convert them to Arrays of [key, value] pairs.
            const serializedData = {
                docCount: index.docCount,

                // Convert Map<docId, Document> to Array<[docId, docObject]>
                documents: Array.from(index.documents.entries()).map(([id, doc]) => {
                    return [id, doc.fields]; // Store only the raw data, re-instantiate later
                }),

                // Convert Map<term, Object> to Array<[term, Object]>
                indexMap: Array.from(index.index.entries())
            };

            await fs.writeFile(filePath, JSON.stringify(serializedData), 'utf-8');
            console.log(`Index saved successfully to ${filePath} (${(JSON.stringify(serializedData).length / 1024).toFixed(2)} KB)`);
            return true;
        } catch (error) {
            console.error("Failed to save index:", error);
            return false;
        }
    }

    /**
     * Load, parse, and populate an InvertedIndex from a JSON file
     * @param {string} filePath - Path to the saved file
     * @param {InvertedIndex} emptyIndex - A newly instantiated, empty InvertedIndex
     * @returns {boolean} True if loaded successfully
     */
    static async load(filePath, emptyIndex) {
        try {
            const rawData = await fs.readFile(filePath, 'utf-8');
            const parsedData = JSON.parse(rawData);

            // Restore basic counters
            emptyIndex.docCount = parsedData.docCount;

            // Restore documents (Map)
            parsedData.documents.forEach(([id, docData]) => {
                emptyIndex.documents.set(id, new Document(id, docData));
            });

            // Restore inverted index structure (Map)
            parsedData.indexMap.forEach(([term, postingsObj]) => {
                emptyIndex.index.set(term, postingsObj);
            });

            console.log(`Index successfully restored from ${filePath}. Loaded ${emptyIndex.docCount} documents.`);
            return true;
        } catch (error) {
            // File not found is a normal case on the first run
            if (error.code === 'ENOENT') {
                console.log(`No existing index found at ${filePath}. Will build from scratch.`);
            } else {
                console.error("Error loading index from disk:", error);
            }
            return false;
        }
    }
}
