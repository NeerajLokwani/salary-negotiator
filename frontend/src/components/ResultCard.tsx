import React from 'react';

interface ResultCardProps {
  marketRange: { min: number; max: number; currency: string };
  counterOffer: number;
  verdict: 'Accept' | 'Negotiate' | 'Walk Away';
  negotiationScript: string;
  redFlags: string[];
  reasoning: string;
}

const ResultCard: React.FC<ResultCardProps> = ({
  marketRange,
  counterOffer,
  verdict,
  negotiationScript,
  redFlags,
  reasoning,
}) => {
  const getBadgeColor = () => {
    switch (verdict) {
      case 'Accept':
        return 'green';
      case 'Negotiate':
        return 'yellow';
      case 'Walk Away':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <div className="result-card">
      <h2>
        Market Range: {marketRange.currency} {marketRange.min.toLocaleString()} - {marketRange.currency} {marketRange.max.toLocaleString()}
      </h2>
      <h3>Counter Offer: {marketRange.currency} {counterOffer.toLocaleString()}</h3>
      <span className={`badge ${getBadgeColor()}`}>{verdict}</span>
      <p>{reasoning}</p>
      <h4>Negotiation Script:</h4>
      <pre>{negotiationScript}</pre>
      {redFlags.length > 0 && (
        <>
          <h4>Red Flags:</h4>
          <ul>
            {redFlags.map((flag, index) => (
              <li key={index}>
                ⚠️ {flag}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ResultCard;