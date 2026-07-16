import React from 'react';
import { Target, Lightbulb, Sparkles, HelpCircle } from 'lucide-react';

export const GTMSection = ({ go_to_market = {} }) => {
  const { acquisition_channels = [], validation_hack = '' } = go_to_market;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Channels segment */}
      <div className="card">
        <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Target size={18} style={{ color: 'var(--primary)' }} />
          Acquisition Channels
        </h4>
        
        {acquisition_channels.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {acquisition_channels.map((channel, idx) => (
              <div 
                key={idx} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '12px 16px', 
                  borderRadius: '8px', 
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.04)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--primary)' }}>
                  <Sparkles size={14} />
                </div>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{channel}</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No marketing channels specified.</p>
        )}
      </div>

      {/* Validation Hack segment */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent-amber)', background: 'rgba(245, 158, 11, 0.02)' }}>
        <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-amber)' }}>
          <Lightbulb size={18} />
          Fast Validation Hack
        </h4>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          {validation_hack || 'Run a simple cold email script, mockup landing page check, or ad click test to establish user interest before writing production architectures.'}
        </p>
      </div>

    </div>
  );
};
export default GTMSection;
