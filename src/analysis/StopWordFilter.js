import stopwords from '../utils/stopwords.js';

/**
 * StopWordFilter: Removes common words that don't add meaning
 * Trade-off: Smaller index size vs. inability to search phrases like "to be or not to be"
 */
class StopWordFilter {
    filter(tokens) {
        return tokens.filter(token => !stopwords.has(token));
    }
}

export default StopWordFilter;