const ResultCard = ({ result, showScore }) => {
  const doc = result.document;

  return (
    <div className="result-card">
      <div className="card-header">
        <h3 className="card-title">
          {doc.data?.title || doc.title || "No Title"}
          <span className="card-year">{doc.data?.year || doc.year || "Unknown"}</span>
        </h3>
        {showScore && result.score > 0 && (
          <span className="card-score">Score: {result.score.toFixed(4)}</span>
        )}
      </div>
      
      <p className="card-desc">
        {doc.data?.description || doc.description || doc.overview || "No description available."}
      </p>

      <div className="card-footer">
        <span className="card-genre">{doc.data?.genre || doc.genre || "N/A"}</span>
      </div>
    </div>
  );
};

export default ResultCard;
