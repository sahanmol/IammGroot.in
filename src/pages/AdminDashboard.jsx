import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '../store/adminStore.js';
import { Shield, Search, Trash2, Calendar, Phone, Mail, FileText, User, RefreshCw, X, AlertCircle } from 'lucide-react';

// Use env variable VITE_API_URL or default to localhost:5000/api
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { adminToken, isAdminAuthenticated } = useAdminStore();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  // Security gate
  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin');
    }
  }, [isAdminAuthenticated, navigate]);

  const fetchContacts = async () => {
    if (!adminToken) return;
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(`${API_URL}/contact/admin/contacts`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to fetch contact inquiries');
      }
      setContacts(data.data || []);
      setFilteredContacts(data.data || []);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [adminToken]);

  // Handle Search Filtering
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredContacts(contacts);
      return;
    }
    const query = searchQuery.toLowerCase();
    const filtered = contacts.filter(c => 
      c.name.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.subject.toLowerCase().includes(query) ||
      c.message.toLowerCase().includes(query) ||
      (c.phone && c.phone.includes(query))
    );
    setFilteredContacts(filtered);
  }, [searchQuery, contacts]);

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // Avoid opening details card
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      const response = await fetch(`${API_URL}/contact/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete record');
      }
      
      // Update local state
      setContacts(prev => prev.filter(c => c._id !== id));
      if (selectedContact && selectedContact._id === id) {
        setSelectedContact(null);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="dashboard-container fade-in">
      {/* Header card */}
      <div className="dashboard-header card" style={{ padding: '24px 30px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(212, 175, 55, 0.1)', color: '#D4AF37', padding: '10px', borderRadius: '10px', display: 'inline-flex' }}>
            <Shield size={24} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '22px' }}>Inquiry Management Panel</h2>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Review client messages and environmental EIA proposals.</p>
          </div>
        </div>
        <button 
          onClick={fetchContacts} 
          className="btn btn-secondary" 
          disabled={isLoading}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <RefreshCw size={14} className={isLoading ? 'spinner' : ''} style={{ animation: isLoading ? 'spin 1s linear infinite' : 'none' }} />
          Reload List
        </button>
      </div>

      {errorMessage && (
        <div className="status-banner error" style={{
          display: 'flex', gap: '8px', padding: '16px', background: 'rgba(244, 63, 94, 0.08)',
          border: '1px solid var(--accent-rose)', color: 'var(--accent-rose)', borderRadius: 'var(--radius-sm)',
          fontSize: '14px', marginBottom: '24px'
        }}>
          <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Control Row */}
      <div className="search-row" style={{ display: 'flex', gap: '15px', marginBottom: '24px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '13px', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="input-text" 
            placeholder="Search inquiries by name, email, subject, phone..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '48px', height: '44px' }}
          />
        </div>
      </div>

      {/* Main Grid split */}
      <div className="admin-dashboard-split" style={{ display: 'grid', gridTemplateColumns: selectedContact ? '1fr 1fr' : '1fr', gap: '30px', alignItems: 'start' }}>
        {/* Table/List Card */}
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
            <h4 style={{ margin: 0, fontSize: '16px' }}>All Inquiries ({filteredContacts.length})</h4>
          </div>

          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <div className="spinner" style={{ 
                border: '3px solid rgba(139, 92, 246, 0.1)', 
                borderTop: '3px solid var(--primary)', 
                borderRadius: '50%', 
                width: '30px', 
                height: '30px', 
                margin: '0 auto 15px auto', 
                animation: 'spin 1s linear infinite' 
              }}></div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Loading inquiries list...</p>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
              <p>No client inquiries found. Share your contact form to receive requests.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <th style={{ padding: '16px 24px', fontWeight: 600 }}>Contact Name</th>
                    <th style={{ padding: '16px 24px', fontWeight: 600 }}>Subject</th>
                    <th style={{ padding: '16px 24px', fontWeight: 600 }}>Submission Date</th>
                    <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact) => (
                    <tr 
                      key={contact._id} 
                      onClick={() => setSelectedContact(contact)}
                      className={`table-row-hover ${selectedContact && selectedContact._id === contact._id ? 'selected-row' : ''}`}
                      style={{ 
                        borderBottom: '1px solid rgba(255,255,255,0.03)', 
                        cursor: 'pointer',
                        background: selectedContact && selectedContact._id === contact._id ? 'rgba(139, 92, 246, 0.04)' : 'transparent'
                      }}
                    >
                      <td style={{ padding: '16px 24px', fontWeight: 500 }}>
                        <div>{contact.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{contact.email}</div>
                      </td>
                      <td style={{ padding: '16px 24px', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {contact.subject}
                      </td>
                      <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>
                        {formatDate(contact.createdAt)}
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                        <button 
                          onClick={(e) => handleDelete(contact._id, e)}
                          className="btn btn-secondary" 
                          style={{ padding: '6px', minWidth: 'auto', color: 'var(--accent-rose)', border: '1px solid rgba(244, 63, 94, 0.1)' }}
                          title="Delete Inquiry"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detailed Card Panel */}
        {selectedContact && (
          <div className="card fade-in" style={{ padding: '28px', border: '1px solid var(--primary-glow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} className="gold-text" /> Inquiry Details
              </h3>
              <button 
                onClick={() => setSelectedContact(null)} 
                className="btn btn-secondary" 
                style={{ padding: '4px', minWidth: 'auto', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <User size={18} style={{ color: '#D4AF37', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>From</div>
                  <strong style={{ fontSize: '15px' }}>{selectedContact.name}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Mail size={18} style={{ color: '#D4AF37', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Email</div>
                  <a href={`mailto:${selectedContact.email}`} style={{ color: 'var(--primary)', textDecoration: 'none', wordBreak: 'break-all' }}>{selectedContact.email}</a>
                </div>
              </div>

              {selectedContact.phone && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <Phone size={18} style={{ color: '#D4AF37', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Phone</div>
                    <span>{selectedContact.phone}</span>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Calendar size={18} style={{ color: '#D4AF37', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Submitted On</div>
                  <span>{formatDate(selectedContact.createdAt)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                <div style={{ width: '100%' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Subject</div>
                  <strong style={{ fontSize: '15px', display: 'block', marginBottom: '12px', color: 'var(--text-primary)' }}>{selectedContact.subject}</strong>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>Message</div>
                  <p style={{ 
                    whiteSpace: 'pre-wrap', 
                    fontSize: '14px', 
                    lineHeight: '1.6', 
                    background: 'rgba(255,255,255,0.02)', 
                    padding: '16px', 
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(255,255,255,0.03)',
                    color: 'var(--text-secondary)'
                  }}>
                    {selectedContact.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AdminDashboard;
