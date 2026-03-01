const ResultCard = ({ result, showScore }) => {
  const doc = result.document;

  // The backend uses a 'fields' object inside the Document class
  const title = doc.fields?.title || doc.data?.title || doc.title || "No Title";
  const year = doc.fields?.year || doc.data?.year || doc.year || "Unknown";
  const description = doc.fields?.description || doc.data?.description || doc.description || doc.overview || "No description available.";
  const genre = doc.fields?.genre || doc.data?.genre || doc.genre || "N/A";

  return (
    <div className="result-card">
      <div className="card-header">
        <h3 className="card-title">
          {title}
          <span className="card-year">{year}</span>
        </h3>
        {showScore && result.score > 0 && (
          <span className="card-score">Score: {result.score.toFixed(4)}</span>
        )}
      </div>
      
      <p className="card-desc">
        {description}
      </p>

      {showScore && result.reasons && result.reasons.length > 0 && (
        <div className="card-reasons">
          <span className="reasons-title">Matched terms:</span>
          <div className="reasons-list">
            {result.reasons.map((reason, idx) => (
              <span key={idx} className="reason-tag">
                <span className="reason-term">"{reason.term}"</span> in <span className="reason-field">{reason.field}</span>
                <span className="reason-score">(+{reason.score})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="card-footer">
        <span className="card-genre">{genre}</span>
      </div>
    </div>
  );
};

export default ResultCard;
