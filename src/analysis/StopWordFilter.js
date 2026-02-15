const stopwords = require('../utils/stopwords');

/**
 * StopWordFilter: Removes common words that don't add meaning
 * Trade-off: Smaller index size vs. inability to search phrases like "to be or not to be"
 */
class StopWordFilter {
    filter(tokens) {
        return tokens.filter(token => !stopwords.has(token));
    }
}

module.exports = StopWordFilter;