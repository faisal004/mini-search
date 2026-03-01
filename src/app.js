import Document from "./index/Document.js";
import FieldConfig from "./index/FieldConfig.js";
import InvertedIndex from "./index/InvertedIndex.js";
import SearchEngine from "./search/SearchEngine.js";


/**
 * Initialize the search engine with sample data
 */
function initializeSearchEngine() {
    const fieldConfig = new FieldConfig();
    const index = new InvertedIndex(fieldConfig);
    const searchEngine = new SearchEngine(index, fieldConfig);

    // Sample movie data
    const movies = [
        { id: 1, title: "The Matrix", description: "A computer hacker learns about the true nature of reality and his role in the war against its controllers", genre: "Sci-Fi Action", year: "1999" },
        { id: 2, title: "The Matrix Reloaded", description: "Freedom fighters Neo, Trinity and Morpheus continue to lead the revolt against the Machine Army", genre: "Sci-Fi Action", year: "2003" },
        { id: 3, title: "The Matrix Revolutions", description: "The human city of Zion defends itself against the massive invasion of the machines", genre: "Sci-Fi Action", year: "2003" },
        { id: 4, title: "Inception", description: "A thief who steals corporate secrets through dream-sharing technology", genre: "Sci-Fi Thriller", year: "2010" },
        { id: 5, title: "Interstellar", description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival", genre: "Sci-Fi Drama", year: "2014" },
        { id: 6, title: "The Prestige", description: "Two magicians engage in competitive one-upmanship in an attempt to create the ultimate stage illusion", genre: "Drama Thriller", year: "2006" },
        { id: 7, title: "Memento", description: "A man with short-term memory loss attempts to track down his wife's murderer", genre: "Thriller Mystery", year: "2000" },
        { id: 8, title: "The Dark Knight", description: "Batman must accept one of the greatest psychological and physical tests to fight injustice", genre: "Action Thriller", year: "2008" },
        { id: 9, title: "Pulp Fiction", description: "The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine", genre: "Crime Drama", year: "1994" },
        { id: 10, title: "Fight Club", description: "An insomniac office worker and a soap salesman form an underground fight club", genre: "Drama Thriller", year: "1999" }
    ];

    // Index documents
    console.log('Indexing documents...');
    movies.forEach(movie => {
        const doc = new Document(movie.id, movie);
        index.addDocument(doc);
    });

    console.log(`Indexed ${movies.length} documents`);
    console.log('Index stats:', index.getStats());

    return searchEngine;
}

export default initializeSearchEngine;