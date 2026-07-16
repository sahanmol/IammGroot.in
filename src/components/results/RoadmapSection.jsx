import React from 'react';
import { CheckCircle2, Clock, Database, Terminal, Layout } from 'lucide-react';

export const RoadmapSection = ({ mern_mvp_roadmap = {} }) => {
  const { 
    database_design = '', 
    backend_api = '', 
    frontend_react = '', 
    phase_1_features = [], 
    cut_features = [] 
  } = mern_mvp_roadmap;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Scope Checklist segment */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        
        {/* Phase 1 Features */}
        <div className="card">
          <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)' }}>
            <CheckCircle2 size={18} />
            Phase 1 MVP Scope
          </h4>
          {phase_1_features.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {phase_1_features.map((feature, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '2px' }} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>No phase 1 features defined.</p>
          )}
        </div>

        {/* Cut Features */}
        <div className="card">
          <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-amber)' }}>
            <Clock size={18} />
            Cut Scope (Phase 2 Backlog)
          </h4>
          {cut_features.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {cut_features.map((feature, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>
                  <Clock size={16} style={{ color: 'var(--accent-amber)', flexShrink: 0, marginTop: '2px' }} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>No features deferred.</p>
          )}
        </div>

      </div>

      {/* Code Monospace Textboxes */}
      <div className="card">
        <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>MVP Technical Architecture Specs</h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* DB Design */}
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Database size={14} style={{ color: 'var(--primary)' }} />
              Database Schemas Design
            </div>
            <pre style={{ 
              background: 'rgba(0,0,0,0.25)', 
              padding: '12px 16px', 
              borderRadius: '8px', 
              border: '1px solid rgba(255,255,255,0.03)', 
              fontSize: '13px', 
              color: 'var(--text-primary)', 
              whiteSpace: 'pre-wrap', 
              fontFamily: 'monospace',
              lineHeight: '1.5'
            }}>
              {database_design}
            </pre>
          </div>

          {/* Backend APIs */}
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Terminal size={14} style={{ color: 'var(--accent-cyan)' }} />
              Express API Endpoint Spec
            </div>
            <pre style={{ 
              background: 'rgba(0,0,0,0.25)', 
              padding: '12px 16px', 
              borderRadius: '8px', 
              border: '1px solid rgba(255,255,255,0.03)', 
              fontSize: '13px', 
              color: 'var(--text-primary)', 
              whiteSpace: 'pre-wrap', 
              fontFamily: 'monospace',
              lineHeight: '1.5'
            }}>
              {backend_api}
            </pre>
          </div>

          {/* Frontend React */}
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Layout size={14} style={{ color: 'var(--accent-amber)' }} />
              React Component State Layout
            </div>
            <pre style={{ 
              background: 'rgba(0,0,0,0.25)', 
              padding: '12px 16px', 
              borderRadius: '8px', 
              border: '1px solid rgba(255,255,255,0.03)', 
              fontSize: '13px', 
              color: 'var(--text-primary)', 
              whiteSpace: 'pre-wrap', 
              fontFamily: 'monospace',
              lineHeight: '1.5'
            }}>
              {frontend_react}
            </pre>
          </div>

        </div>
      </div>

    </div>
  );
};
export default RoadmapSection;
