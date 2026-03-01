import Analyzer from "../analysis/Analyzer.js";

/**
 * InvertedIndex: Core data structure for fast term lookup
 * 
 * Structure:
 * {
 *   "term": {
 *     "field_name": [
 *       { docId: 1, tf: 0.05, positions: [0, 5] },
 *       { docId: 3, tf: 0.02, positions: [12] }
 *     ]
 *   }
 * }
 */
class InvertedIndex {
    constructor(fieldConfig) {
        this.index = new Map(); // term -> field -> postings list
        this.documents = new Map(); // docId -> Document
        this.fieldConfig = fieldConfig;
        this.analyzer = new Analyzer();
        this.docCount = 0;
    }

    /**
     * Add a document to the index
     */
    addDocument(doc) {
        this.documents.set(doc.id, doc);
        this.docCount++;

        // Index each field separately
        this.fieldConfig.getSearchableFields().forEach(fieldName => {
            const text = doc.getField(fieldName);
            if (!text) return;

            // Analyze the field text
            const tokens = this.analyzer.analyze(text);

            // Calculate term frequencies
            const termFreqs = this._calculateTermFrequencies(tokens);

            // Add to inverted index
            Object.entries(termFreqs).forEach(([term, freq]) => {
                this._addPosting(term, fieldName, doc.id, freq, tokens.length);
            });
        });
    }

    /**
     * Calculate term frequencies in token array
     */
    _calculateTermFrequencies(tokens) {
        const freqs = {};
        tokens.forEach(token => {
            freqs[token] = (freqs[token] || 0) + 1;
        });
        return freqs;
    }

    /**
     * Add a posting to the inverted index
     */
    _addPosting(term, field, docId, frequency, totalTerms) {
        if (!this.index.has(term)) {
            this.index.set(term, {});
        }

        const termEntry = this.index.get(term);
        if (!termEntry[field]) {
            termEntry[field] = [];
        }

        // Calculate normalized term frequency (TF)
        const tf = frequency / totalTerms;

        termEntry[field].push({
            docId,
            tf,
            frequency
        });
    }

    /**
     * Get postings for a term in a specific field
     */
    getPostings(term, field) {
        const termEntry = this.index.get(term);
        if (!termEntry) return [];
        return termEntry[field] || [];
    }

    /**
     * Calculate IDF for a term in a field
     * IDF = log(total docs / docs containing term)
     */
    calculateIDF(term, field) {
        const postings = this.getPostings(term, field);
        if (postings.length === 0) return 0;

        const docsWithTerm = postings.length;
        return Math.log(this.docCount / docsWithTerm);
    }

    /**
     * Get document by ID
     */
    getDocument(docId) {
        return this.documents.get(docId);
    }

    /**
     * Get index statistics (useful for debugging)
     */
    getStats() {
        return {
            totalDocuments: this.docCount,
            totalTerms: this.index.size,
            indexSizeKB: JSON.stringify([...this.index.entries()]).length / 1024
        };
    }
}

export default InvertedIndex;