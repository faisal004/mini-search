import TFIDFScorer from "../scoring/TFIDFScorer.js";
import QueryProcessor from "./QuerryProcessor.js";

class SearchEngine {
    constructor(index, fieldConfig) {
        this.index = index;
        this.fieldConfig = fieldConfig;
        this.queryProcessor = new QueryProcessor();
        this.scorer = new TFIDFScorer(index, fieldConfig);
    }

    search(query) {
        const tokens = this.queryProcessor.processQuery(query);

        // Find all unique documents that contain at least one of the query tokens
        const matchedDocIds = new Set();
        tokens.forEach(token => {
            this.fieldConfig.getSearchableFields().forEach(field => {
                const postings = this.index.getPostings(token, field);

                postings.forEach(p => matchedDocIds.add(p.docId));
            });
        });

        // Score each matched document
        const results = [];
        for (const docId of matchedDocIds) {
            const explanation = this.scorer.explainScore(tokens, docId);
            if (explanation.totalScore > 0) {
                const document = this.index.getDocument(docId);
                results.push({
                    docId,
                    score: parseFloat(explanation.totalScore), // keep score as a number
                    reasons: explanation.termScores,
                    document
                });
            }
        }

        const sortedResults = this.sortResults(results);

        return {
            total: sortedResults.length,
            hits: sortedResults
        };
    }

    sortResults(results) {
        return results.sort((a, b) => b.score - a.score);
    }
}

export default SearchEngine;