import React, { useState } from 'react';
import SalaryForm from './components/SalaryForm';
import ResultCard from './components/ResultCard';
import NegotiationScript from './components/NegotiationScript';
import './App.css';

interface NegotiationResult {
  marketRange: { min: number; max: number; currency: string };
  counterOffer: number;
  verdict: 'Accept' | 'Negotiate' | 'Walk Away';
  negotiationScript: string;
  redFlags: string[];
  reasoning: string;
}

const App: React.FC = () => {
  const [result, setResult] = useState<NegotiationResult | null>(null);

  return (
    <div className="app-container">
      <h1>SalaryNegotiator 💰</h1>
      <p className="subtitle">Know your worth. Negotiate with confidence.</p>
      <SalaryForm onSubmit={setResult} />
      {result && (
        <>
          <ResultCard {...result} />
          <NegotiationScript script={result.negotiationScript} />
        </>
      )}
    </div>
  );
};

export default App;