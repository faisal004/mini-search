/**
 * LowercaseFilter: Normalizes text to lowercase
 * Why: "Apple" and "apple" should be treated as the same term
 */
class LowercaseFilter {
    filter(text) {
        if (typeof text !== 'string') return text;
        return text.toLowerCase();
    }
}

export default LowercaseFilter;