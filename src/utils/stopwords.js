/**
 * Common English stop words
 * Why remove them: High frequency, low information value
 * They bloat the index and don't help with relevance
 */
module.exports = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for',
    'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on',
    'that', 'the', 'to', 'was', 'will', 'with'
]);