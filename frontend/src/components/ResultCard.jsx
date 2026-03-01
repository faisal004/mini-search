const ResultCard = ({ result, showScore }) => {
  const doc = result.document;

  const title = doc.fields?.title || doc.data?.title || doc.title || "No Title";
  const brand = doc.fields?.brand || doc.data?.brand || doc.brand || "Unknown Brand";
  const category = doc.fields?.category || doc.data?.category || doc.category || "General";
  const description = doc.fields?.description || doc.data?.description || doc.description || "No description available.";
  const price = doc.fields?.price || doc.data?.price || doc.price || 0;
  const rating = doc.fields?.rating || doc.data?.rating || doc.rating || 0;
  const thumbnail = doc.fields?.thumbnail || doc.data?.thumbnail || doc.thumbnail;

  return (
    <div className="result-card product-card">
      {thumbnail && (
        <div className="product-image">
          <img src={thumbnail} alt={title} loading="lazy" />
        </div>
      )}
      <div className="product-details">
        <div className="card-header">
          <h3 className="card-title">
            {title}
          </h3>
          <div className="product-meta">
            <span className="product-price">${price.toFixed(2)}</span>
            <span className="product-rating">⭐ {rating}</span>
          </div>
        </div>
        
        {showScore && result.score > 0 && (
            <div className="score-badge">Score: {result.score.toFixed(4)}</div>
        )}
        
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
                  {/* <span className="reason-score">(+{reason.score.toFixed(2)})</span> */}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="card-footer">
          <span className="card-genre">{category}</span>
          <span className="card-brand">{brand}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
