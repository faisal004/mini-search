/**
 * PunctuationFilter: Removes punctuation characters from text
 * Note: Only removes non-alphanumeric and non-whitespace characters
 */
class PunctuationFilter {
    filter(text) {
        if (typeof text !== 'string') return text;

        // Remove characters that aren't a word character (\w) or whitespace (\s)
        return text.replace(/[^\w\s]/g, '');
    }
}

export default PunctuationFilter;
