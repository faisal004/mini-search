import Tokenizer from './Tokenizer.js';
import LowercaseFilter from './LowercaseFilter.js';
import StopWordFilter from './StopWordFilter.js';
import Stemmer from './Stemmer.js';

/**
 * Analyzer: Chains all text processing steps
 * This is the SAME pipeline used for both indexing and querying
 * 
 * Pipeline: Raw Text -> Tokens -> Lowercase -> Remove Stopwords -> Stem
 */
class Analyzer {
    constructor() {
        this.tokenizer = new Tokenizer();
        this.lowercaseFilter = new LowercaseFilter();
        this.stopWordFilter = new StopWordFilter();
        this.stemmer = new Stemmer();
    }

    /**
     * Analyze text into normalized tokens
     * @param {string} text - Raw input text
     * @returns {string[]} - Array of normalized tokens
     */
    analyze(text) {
        let tokens = this.tokenizer.tokenize(text);
        tokens = this.lowercaseFilter.filter(tokens);
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