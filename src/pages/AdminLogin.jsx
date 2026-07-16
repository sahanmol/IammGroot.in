import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '../store/adminStore.js';
import { Shield, Key, AlertCircle, CheckCircle2, Server } from 'lucide-react';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { loginAdmin, setupDefaultAdmin, isAdminAuthenticated, isLoading, error } = useAdminStore();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [setupStatus, setSetupStatus] = useState(null); // { type: 'success' | 'error', message: '' }

  // Redirect if already authenticated
  useEffect(() => {
    if (isAdminAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAdminAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) return;
    
    const result = await loginAdmin(username, password);
    if (result.success) {
      navigate('/admin/dashboard');
    }
  };

  const handleInitializeAdmin = async () => {
    setSetupStatus(null);
    const result = await setupDefaultAdmin();
    if (result.success) {
      setSetupStatus({
        type: 'success',
        message: `${result.message} Default credentials generated. Username: admin | Password: SattvashthaAdmin2026!`
      });
    } else {
      setSetupStatus({
        type: 'error',
        message: result.message || 'Initialization failed. Admin may already exist in the database.'
      });
    }
  };

  return (
    <div className="auth-container" style={{ margin: '80px auto', maxWidth: '450px' }}>
      <div className="card fade-in">
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ 
            display: 'inline-flex', 
            padding: '16px', 
            borderRadius: '50%', 
            background: 'rgba(212, 175, 55, 0.1)', 
            color: '#D4AF37', 
            marginBottom: '15px' 
          }}>
            <Shield size={32} />
          </div>
          <h2>Admin Portal Access</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Log in to view client inquiries and manage requests.</p>
        </div>

        {error && (
          <div className="status-banner error" style={{
            display: 'flex', gap: '8px', padding: '12px', background: 'rgba(244, 63, 94, 0.08)',
            border: '1px solid var(--accent-rose)', color: 'var(--accent-rose)', borderRadius: 'var(--radius-sm)',
            fontSize: '13px', marginBottom: '20px'
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{error}</span>
          </div>
        )}

        {setupStatus && (
          <div className={`status-banner ${setupStatus.type}`} style={{
            display: 'flex', gap: '8px', padding: '12px', 
            background: setupStatus.type === 'success' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.08)',
            border: setupStatus.type === 'success' ? '1px solid var(--accent-emerald)' : '1px solid var(--accent-rose)', 
            color: setupStatus.type === 'success' ? 'var(--accent-emerald)' : 'var(--accent-rose)', 
            borderRadius: 'var(--radius-sm)', fontSize: '13px', marginBottom: '20px'
          }}>
            {setupStatus.type === 'success' ? <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '2px' }} /> : <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />}
            <span>{setupStatus.message}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Admin Username</label>
            <input 
              type="text" 
              className="input-text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '25px' }}>
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="input-text" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', height: '44px' }}
            disabled={isLoading}
          >
            <Key size={16} /> {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div style={{ 
          borderTop: '1px solid rgba(255, 255, 255, 0.05)', 
          marginTop: '30px', 
          paddingTop: '20px', 
          textAlign: 'center' 
        }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Server size={12} style={{ color: '#D4AF37' }} /> Database Setup Check
          </p>
          <button 
            onClick={handleInitializeAdmin}
            className="btn btn-secondary" 
            style={{ fontSize: '12px', padding: '6px 12px' }}
          >
            Seed Default Admin Account
          </button>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.4' }}>
            Click this to auto-generate the first 'admin' user profile in the database on your system.
          </p>
        </div>
      </div>
    </div>
  );
};
export default AdminLogin;
