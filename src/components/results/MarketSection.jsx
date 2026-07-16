import React from 'react';
import { ShieldAlert, DollarSign, Award } from 'lucide-react';

export const MarketSection = ({ market_analysis = {} }) => {
  const { competitors = [], monetization_suggestions = [] } = market_analysis;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', alignItems: 'start' }}>
      
      {/* Competitors Segment */}
      <div className="card">
        <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert size={18} style={{ color: 'var(--accent-rose)' }} />
          Competitive Disruption Landscape
        </h4>
        
        {competitors.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {competitors.map((comp, idx) => (
              <div 
                key={idx} 
                style={{ 
                  padding: '16px', 
                  borderRadius: '10px', 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid rgba(255,255,255,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Award size={14} style={{ color: 'var(--primary)' }} />
                  {comp.name}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  <span style={{ color: 'var(--accent-rose)', fontWeight: 600 }}>Weakness:</span> {comp.weakness}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No competitors listed.</p>
        )}
      </div>

      {/* Monetization Suggestions Segment */}
      <div className="card">
        <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <DollarSign size={18} style={{ color: 'var(--accent-emerald)' }} />
          Monetization Channels
        </h4>

        {monetization_suggestions.length > 0 ? (
          <ol style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingLeft: '0', listStyle: 'none' }}>
            {monetization_suggestions.map((suggestion, idx) => (
              <li 
                key={idx}
                style={{ 
                  display: 'flex', 
                  gap: '12px', 
                  fontSize: '14px', 
                  color: 'var(--text-secondary)', 
                  lineHeight: '1.5',
                  alignItems: 'flex-start'
                }}
              >
                <span 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    background: 'rgba(16, 185, 129, 0.1)', 
                    color: 'var(--accent-emerald)', 
                    fontSize: '11px',
                    fontWeight: 700,
                    flexShrink: 0
                  }}
                >
                  {idx + 1}
                </span>
                <span style={{ paddingTop: '2px' }}>{suggestion}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No monetization models proposed.</p>
        )}
      </div>

    </div>
  );
};
export default MarketSection;
