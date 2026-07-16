import React from 'react';
import { X, Sparkles, AlertTriangle, CheckCircle, BarChart3, HelpCircle } from 'lucide-react';

export const GlassModal = ({ isOpen, onClose, analysis }) => {
  if (!isOpen || !analysis) return null;

  const result = analysis.result || {};
  const aiProbability = result.aiProbability ?? 0;
  const confidence = result.confidence || 'medium';
  const breakdown = result.breakdown || { clarity: 0, originality: 0, structure: 0, readability: 0 };
  const keyInsights = result.keyInsights || [];
  const hallucinations = result.hallucinations || [];

  // Determine stroke color type
  const strokeColorClass = aiProbability > 65 ? 'ai' : aiProbability < 35 ? 'human' : '';
  const circumference = 2 * Math.PI * 15.915; // ~100 stroke-dasharray
  const strokeDashoffset = Math.max(100 - aiProbability, 0);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="card modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <span className="score-badge medium" style={{ marginBottom: '8px' }}>Scan Report</span>
            <h3 style={{ fontSize: '24px', letterSpacing: '-0.5px' }}>Analysis Details</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Top Info Dial */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} style={{ color: 'var(--primary)' }} />
                AI Generation Score
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.5' }}>
                {result.summary || 'A breakdown of indicators pointing to automated writing patterns.'}
              </p>
              <div style={{ marginTop: '12px', display: 'flex', gap: '16px' }}>
                <div style={{ fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Confidence:</span>{' '}
                  <span className={`score-badge ${confidence === 'high' ? 'high' : confidence === 'low' ? 'low' : 'medium'}`} style={{ textTransform: 'capitalize' }}>
                    {confidence}
                  </span>
                </div>
                <div style={{ fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Score Strength:</span>{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>{analysis.viability_score ?? 50}%</strong>
                </div>
              </div>
            </div>

            <div className="dial-container">
              <svg viewBox="0 0 36 36" className="dial-svg">
                <circle cx="18" cy="18" r="15.915" className="dial-bg" />
                <circle 
                  cx="18" 
                  cy="18" 
                  r="15.915" 
                  className={`dial-progress ${strokeColorClass}`}
                  strokeDasharray={`${aiProbability} 100`}
                />
              </svg>
              <div style={{ position: 'absolute', transform: 'translate(31px, 0px)', textAlign: 'center' }}>
                <span className="dial-text" style={{ color: aiProbability > 65 ? 'var(--accent-rose)' : aiProbability < 35 ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
                  {aiProbability}%
                </span>
                <div style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '-4px' }}>AI Match</div>
              </div>
            </div>
          </div>

          {/* Breakdown bars */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={18} style={{ color: 'var(--primary)' }} />
              Quality Indicator Analysis
            </h4>
            <div className="metrics-row">
              <div className="metric-bar-group">
                <div className="metric-header">
                  <span>Structural Clarity</span>
                  <span>{breakdown.clarity}%</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${breakdown.clarity}%` }}></div>
                </div>
              </div>
              <div className="metric-bar-group">
                <div className="metric-header">
                  <span>Natural Flow / Readability</span>
                  <span>{breakdown.readability}%</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${breakdown.readability}%` }}></div>
                </div>
              </div>
              <div className="metric-bar-group">
                <div className="metric-header">
                  <span>Originality Index</span>
                  <span>{breakdown.originality}%</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${breakdown.originality}%` }}></div>
                </div>
              </div>
              <div className="metric-bar-group">
                <div className="metric-header">
                  <span>Cohesive Structure</span>
                  <span>{breakdown.structure}%</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${breakdown.structure}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          {keyInsights.length > 0 && (
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={18} style={{ color: 'var(--accent-emerald)' }} />
                Stylistic Diagnostics
              </h4>
              <ul style={{ paddingLeft: '20px', fontSize: '14px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {keyInsights.map((insight, idx) => (
                  <li key={idx} style={{ listStyleType: 'square' }}>{insight}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Hallucinations */}
          <div>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={18} style={{ color: 'var(--accent-rose)' }} />
              Flagged Statements ({hallucinations.length})
            </h4>
            {hallucinations.length > 0 ? (
              <div className="hallucination-alert-list">
                {hallucinations.map((item, idx) => (
                  <div key={idx} className="hallucination-item">
                    <div className="hallucinated-sentence">"{item.sentence}"</div>
                    <div className="hallucinated-reason">{item.reason}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', background: 'rgba(16, 185, 129, 0.03)', padding: '12px 16px', border: '1px dashed rgba(16, 185, 129, 0.2)', borderRadius: '8px' }}>
                No hyperbolic claims, extreme qualifiers, or logical overreaches were found in the scanned text.
              </p>
            )}
          </div>

          {/* Scanned Text Source */}
          <div style={{ marginTop: '12px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '8px' }}>Scanned Source text</h4>
            <div style={{ maxHeight: '150px', overflowY: 'auto', background: 'rgba(0,0,0,0.2)', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)', fontSize: '13px', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
              {analysis.idea_text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
