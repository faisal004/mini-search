import { useState, useEffect, useRef } from 'react';
import ResultCard from './components/ResultCard';

function App() {
  const [query, setQuery] = useState('');
  const [customResults, setCustomResults] = useState({ hits: [], total: 0 });
  const [naiveResults, setNaiveResults] = useState({ hits: [], total: 0 });
  const [isSearching, setIsSearching] = useState(false);
  const debounceTimeout = useRef(null);

  const fetchResults = async (searchQuery) => {
    if (!searchQuery.trim()) {
        setIsSearching(false);
        return;
    }

    try {
      const [customRes, naiveRes] = await Promise.all([
        fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`).then(res => res.json()),
        fetch(`/api/search/naive?q=${encodeURIComponent(searchQuery)}`).then(res => res.json())
      ]);

      if (customRes.success) setCustomResults(customRes.data);
      if (naiveRes.success) setNaiveResults(naiveRes.data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    
    if (query) {
      setIsSearching(true);
      debounceTimeout.current = setTimeout(() => {
        fetchResults(query);
      }, 300);
    } else {
      setCustomResults({ hits: [], total: 0 });
      setNaiveResults({ hits: [], total: 0 });
      setIsSearching(false);
    }

    return () => clearTimeout(debounceTimeout.current);
  }, [query]);

  return (
    <div className="app-container">
      <header>
        <h1>Mini Search Engine</h1>
        <p className="subtitle">The power of TF-IDF, Stemming, and Normalized Tokens</p>
      </header>

      <div className="search-container">
        <input 
          type="text" 
          className="search-input"
          placeholder="Try searching for: 'matrix reality', 'dream technology'..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {isSearching && <div className="search-spinner"></div>}
      </div>

      <div className="comparison-container">
        {/* Our Custom Engine */}
        <div className="engine-panel">
          <div className="panel-header">
            <h2 className="panel-title">
              <span className="badge-custom">🚀 Our Engine</span> (Mini Search)
            </h2>
            <span className="results-meta">{customResults.total} results found</span>
          </div>
          
          <div className="results-list">
            {customResults.hits.length > 0 ? (
              customResults.hits.map(hit => (
                <ResultCard key={`custom-${hit.docId}`} result={hit} showScore={true} />
              ))
            ) : (
              <div className="empty-state">
                {query ? "No intelligent matches found." : "Type a query to see smart matching."}
              </div>
            )}
          </div>
        </div>

        {/* Naive Search Engine */}
        <div className="engine-panel">
          <div className="panel-header">
            <h2 className="panel-title">
              <span className="badge-naive">🐢 Naive Search</span> (String.includes)
            </h2>
            <span className="results-meta">{naiveResults.total} results found</span>
          </div>

          <div className="results-list">
            {naiveResults.hits.length > 0 ? (
              naiveResults.hits.map(hit => (
                <ResultCard key={`naive-${hit.docId}`} result={hit} showScore={false} />
              ))
            ) : (
              <div className="empty-state">
                {query ? "No exact substring matches found." : "Type a query to see exact matching."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
