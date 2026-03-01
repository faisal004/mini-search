import Document from './index/Document.js';
import FieldConfig from './index/FieldConfig.js';
import InvertedIndex from './index/InvertedIndex.js';
import TFIDFScorer from './scoring/TFIDFScorer.js';

// Setup
const fieldConfig = new FieldConfig();
const index = new InvertedIndex(fieldConfig);

// Sample documents
const docs = [
    new Document(1, {
        title: "The Matrix",
        description: "A computer hacker learns about the true nature of reality",
        genre: "Sci-Fi",
        year: "1999"
    }),
    new Document(2, {
        title: "The Matrix Reloaded",
        description: "Freedom fighters continue their rebellion against machines",
        genre: "Sci-Fi",
        year: "2003"
    }),
    new Document(3, {
        title: "Inception",
        description: "A thief who steals secrets through dream-sharing technology",
        genre: "Sci-Fi Thriller",
        year: "2010"
    })
];

// Index documents
console.log("=== Indexing Documents ===");
docs.forEach(doc => {
    index.addDocument(doc);
    console.log(`Indexed: ${doc.getField('title')}`);
});

console.log("\n=== Index Statistics ===");
console.log(index.getStats());

// Search
const scorer = new TFIDFScorer(index, fieldConfig);
const query = "matrix reality";
const queryTerms = index.analyzer.analyze(query);

console.log(`\n=== Search: "${query}" ===`);
console.log(`Query terms: [${queryTerms.join(', ')}]\n`);

// Score all documents
const scores = [];
for (let docId = 1; docId <= 3; docId++) {
    const score = scorer.score(queryTerms, docId);
    if (score > 0) {
        scores.push({ docId, score });
    }
}

// Sort by score
scores.sort((a, b) => b.score - a.score);

scores.forEach(({ docId, score }) => {
    const doc = index.getDocument(docId);
    console.log(`Score: ${score.toFixed(4)} - ${doc.getField('title')}`);

    // Show explanation
    const explanation = scorer.explainScore(queryTerms, docId);
    console.log("  Breakdown:", JSON.stringify(explanation.termScores, null, 2));
    console.log();
});