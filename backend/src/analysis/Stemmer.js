/**
 * Porter Stemmer: Reduces words to their root form
 * Example: "running", "runs", "ran" -> "run"
 * 
 * Using a library here is acceptable (natural or snowball-stemmer)
 * Implementing Porter Stemmer from scratch is 200+ lines and not the learning goal
 */
import natural from 'natural';
const PorterStemmer = natural.PorterStemmer;

class Stemmer {
    stem(tokens) {
        return tokens.map(token => PorterStemmer.stem(token));
    }
}

export default Stemmer;