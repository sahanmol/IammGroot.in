import React, { useEffect, useState } from 'react';

export const ScoreGauge = ({ score }) => {
  const [offset, setOffset] = useState(100);

  useEffect(() => {
    // Force animation trigger
    const timer = setTimeout(() => {
      setOffset(Math.max(100 - score, 0));
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  // Color mapping based on score
  const getGaugeColor = (val) => {
    if (val < 40) return '#E24B4A'; // red
    if (val < 70) return '#EF9F27'; // amber
    return '#1D9E75'; // teal
  };

  const color = getGaugeColor(score);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', width: '130px', height: '130px' }}>
      <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
        {/* Background Arc */}
        <circle 
          cx="18" 
          cy="18" 
          r="15.915" 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.05)" 
          strokeWidth="3.8" 
        />
        {/* Active Progress Arc */}
        <circle 
          cx="18" 
          cy="18" 
          r="15.915" 
          fill="none" 
          stroke={color} 
          strokeWidth="3.8" 
          strokeLinecap="round"
          strokeDasharray="100"
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </svg>
      {/* Center text */}
      <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '32px', fontWeight: 800, color, lineHeight: '1' }}>{score}</span>
        <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginTop: '2px' }}>Viability</span>
      </div>
    </div>
  );
};
export default ScoreGauge;
