/**
 * LowercaseFilter: Normalizes tokens to lowercase
 * Why: "Apple" and "apple" should be treated as the same term
 */
class LowercaseFilter {
    filter(tokens) {
        return tokens.map(token => token.toLowerCase());
    }
}

export default LowercaseFilter;