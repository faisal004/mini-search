import Analyzer from './analysis/Analyzer.js';

const analyzer = new Analyzer();

// Test cases
const testTexts = [
    "The quick brown fox jumps over the lazy dog",
    "Running, runs, and ran are different forms",
    "Natural Language Processing is fascinating!"
];

console.log("=== Text Analysis Demo ===\n");
testTexts.forEach(text => {
    const tokens = analyzer.analyze(text);
    console.log(`Input:  "${text}"`);
    console.log(`Output: [${tokens.join(', ')}]\n`);
});