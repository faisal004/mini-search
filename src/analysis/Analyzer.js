import LowercaseFilter from './LowercaseFilter.js';
import PunctuationFilter from './PunctuationFilter.js';
import Tokenizer from './Tokenizer.js';
import StopWordFilter from './StopWordFilter.js';
import Stemmer from './Stemmer.js';

/**
 * Analyzer: Chains all text processing steps
 * This is the SAME pipeline used for both indexing and querying
 * 
 * Pipeline: Lowercase -> Remove Punctuation -> Tokenize -> Remove Stopwords -> Stem
 */
class Analyzer {
    constructor() {
        this.lowercaseFilter = new LowercaseFilter();
        this.punctuationFilter = new PunctuationFilter();
        this.tokenizer = new Tokenizer();
        this.stopWordFilter = new StopWordFilter();
        this.stemmer = new Stemmer();
    }

    /**
     * Analyze text into normalized tokens
     * @param {string} text - Raw input text
     * @returns {string[]} - Array of normalized tokens
     */
    analyze(text) {
        let processedText = this.lowercaseFilter.filter(text);
        processedText = this.punctuationFilter.filter(processedText);

        let tokens = this.tokenizer.tokenize(processedText);
        tokens = this.stopWordFilter.filter(tokens);
        tokens = this.stemmer.stem(tokens);

        return tokens;
    }

    /**
     * Analyze with position tracking (for phrase queries - future enhancement)
     */
    analyzeWithPositions(text) {
        const tokens = this.analyze(text);
        return tokens.map((token, position) => ({ token, position }));
    }
}

export default Analyzer;