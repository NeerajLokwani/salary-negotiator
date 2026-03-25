import React, { useState } from 'react';

interface NegotiationScriptProps {
  script: string;
}

const NegotiationScript: React.FC<NegotiationScriptProps> = ({ script }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="negotiation-script-card">
      <h2>Your Negotiation Script</h2>
      <pre>{script}</pre>
      <button onClick={handleCopy}>{copied ? 'Copied!' : 'Copy to Clipboard'}</button>
    </div>
  );
};

export default NegotiationScript;