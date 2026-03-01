/**
 * TFIDFScorer: Implements TF-IDF ranking algorithm
 * 
 * Score = Σ (TF × IDF × field_weight) for all query terms
 */
class TFIDFScorer {
    constructor(index, fieldConfig) {
        this.index = index;
        this.fieldConfig = fieldConfig;
    }

    /**
     * Score a document for a query
     * @param {string[]} queryTerms - Analyzed query terms
     * @param {number} docId - Document ID to score
     * @returns {number} - TF-IDF score
     */
    score(queryTerms, docId) {
        let totalScore = 0;

        queryTerms.forEach(term => {
            // Check each field
            this.fieldConfig.getSearchableFields().forEach(field => {
                const postings = this.index.getPostings(term, field);
                const posting = postings.find(p => p.docId === docId);

                if (posting) {
                    const tf = posting.tf;
                    const idf = this.index.calculateIDF(term, field);
                    const fieldWeight = this.fieldConfig.getWeight(field);

                    const termScore = tf * idf * fieldWeight;
                    totalScore += termScore;
                }
            });
        });

        return totalScore;
    }

    /**
     * Score with explanation (for debugging/interviews)
     */
    explainScore(queryTerms, docId) {
        const explanation = {
            docId,
            totalScore: 0,
            termScores: []
        };

        queryTerms.forEach(term => {
            this.fieldConfig.getSearchableFields().forEach(field => {
                const postings = this.index.getPostings(term, field);
                const posting = postings.find(p => p.docId === docId);

                if (posting) {
                    const tf = posting.tf;
                    const idf = this.index.calculateIDF(term, field);
                    const fieldWeight = this.fieldConfig.getWeight(field);
                    const termScore = tf * idf * fieldWeight;

                    explanation.termScores.push({
                        term,
                        field,
                        tf: tf.toFixed(4),
                        idf: idf.toFixed(4),
                        fieldWeight,
                        score: termScore.toFixed(4)
                    });

                    explanation.totalScore += termScore;
                }
            });
        });

        explanation.totalScore = explanation.totalScore.toFixed(4);
        return explanation;
    }
}

export default TFIDFScorer;