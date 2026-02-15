/**
 * Tokenizer: Splits text into individual tokens
 * Strategy: Split on whitespace and punctuation, preserve alphanumeric
 */
class Tokenizer {
    tokenize(text) {
        if (!text) return [];

        // Split on non-alphanumeric characters, filter empty strings
        return text
            .split(/[^a-zA-Z0-9]+/)
            .filter(token => token.length > 0);
    }
}

module.exports = Tokenizer;