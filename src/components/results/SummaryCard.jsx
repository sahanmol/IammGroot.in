import React from 'react';
import { Target, AlertCircle, FileText, Activity } from 'lucide-react';

export const SummaryCard = ({ startup_summary = {}, scores = {} }) => {
  const { elevator_pitch = '', core_problem = '', target_audience = '' } = startup_summary;
  const { development_complexity = 'Medium', scalability_potential = 'High' } = scores;

  const getComplexityColor = (level) => {
    const l = String(level).toLowerCase();
    if (l === 'low') return 'rgba(16, 185, 129, 0.1)';
    if (l === 'high') return 'rgba(244, 63, 94, 0.1)';
    return 'rgba(245, 158, 11, 0.1)'; // medium
  };

  const getComplexityTextColor = (level) => {
    const l = String(level).toLowerCase();
    if (l === 'low') return 'var(--accent-emerald)';
    if (l === 'high') return 'var(--accent-rose)';
    return 'var(--accent-amber)';
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={18} style={{ color: 'var(--primary)' }} />
          Concept Pitch
        </h4>
        <p style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: '1.6', fontStyle: 'italic' }}>
          "{elevator_pitch}"
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
        <div>
          <h5 style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <AlertCircle size={14} />
            Core Problem
          </h5>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{core_problem}</p>
        </div>

        <div>
          <h5 style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <Target size={14} />
            Target Audience
          </h5>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{target_audience}</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Development Complexity:</span>
          <span 
            className="score-badge"
            style={{ 
              background: getComplexityColor(development_complexity),
              color: getComplexityTextColor(development_complexity),
              fontWeight: 700,
              textTransform: 'uppercase'
            }}
          >
            {development_complexity}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Scalability Potential:</span>
          <span 
            className="score-badge low"
            style={{ 
              fontWeight: 700,
              textTransform: 'uppercase'
            }}
          >
            {scalability_potential}
          </span>
        </div>
      </div>
    </div>
  );
};
export default SummaryCard;
