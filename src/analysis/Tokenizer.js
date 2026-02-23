/**
 * Tokenizer: Splits text into individual tokens
 * Strategy: Split on whitespace
 */
class Tokenizer {
    tokenize(text) {
        if (!text) return [];

        // Split on whitespace characters, filter empty strings
        return text
            .split(/\s+/)
            .filter(token => token.length > 0);
    }
}

export default Tokenizer;