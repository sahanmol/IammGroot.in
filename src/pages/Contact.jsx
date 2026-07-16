import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle2 } from 'lucide-react';

// Use env variable VITE_API_URL or default to localhost:5000/api
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const Contact = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: '' }

  // Prefill details if navigated from Home page scoper tool
  useEffect(() => {
    if (location.state) {
      setFormData(prev => ({
        ...prev,
        subject: location.state.subject || '',
        message: location.state.message || ''
      }));
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields (Name, Email, Subject, Message).' });
      return;
    }

    setIsLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }

      setStatus({
        type: 'success',
        message: data.message || 'Thank you! Your inquiry was successfully submitted.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Contact submit error:', error);
      setStatus({
        type: 'error',
        message: error.message || 'Failed to connect to the server. Please check your network and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-page-container">
      <div className="contact-grid">
        {/* Contact Info Column */}
        <div className="contact-info-col">
          <div className="badge-glow">LET'S CONNECT</div>
          <h2>Have Questions?<br /><span className="gold-text-gradient">Get In Touch With Us</span></h2>
          <p style={{ margin: '20px 0 40px 0', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            We provide specialized environmental EIA/EMP clearances and business management consulting across India. Drop us a message, and our consultants will get back to you within 24 hours.
          </p>

          <div className="info-boxes">
            <div className="info-box-item card">
              <Phone className="info-icon" />
              <div>
                <h4>Call Us</h4>
                <p>+91-9217509906</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Monday - Saturday (9 AM - 6 PM)</p>
              </div>
            </div>

            <div className="info-box-item card">
              <Mail className="info-icon" />
              <div>
                <h4>Email Support</h4>
                <p>info@sattvashthaadvisory.com</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Drop us a mail anytime</p>
              </div>
            </div>

            <div className="info-box-item card">
              <MapPin className="info-icon" />
              <div>
                <h4>Corporate Office</h4>
                <p>Supernova Supertech,</p>
                <p>Astralis Office No 1212,</p>
                <p>Sector 94 Noida, Uttar Pradesh, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="contact-form-col card">
          <h3>Send Us a Message</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '30px' }}>Fill out the form below and we'll analyze your requirements.</p>

          {status && (
            <div className={`status-banner ${status.type} fade-in`} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '16px',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '24px',
              fontSize: '14px',
              background: status.type === 'success' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.08)',
              border: status.type === 'success' ? '1px solid var(--accent-emerald)' : '1px solid var(--accent-rose)',
              color: status.type === 'success' ? 'var(--accent-emerald)' : 'var(--accent-rose)'
            }}>
              {status.type === 'success' ? <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} /> : <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />}
              <span>{status.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form-element">
            <div className="form-group-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-text" 
                  placeholder="Your Name" 
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-text" 
                  placeholder="email@example.com" 
                  required
                />
              </div>
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input-text" 
                  placeholder="e.g. +91-9876543210" 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject *</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="input-text" 
                  placeholder="e.g. Environmental EIA Clearance" 
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Message Details *</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="textarea-text" 
                placeholder="Please describe your project scope or questions in detail..." 
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', height: '48px', marginTop: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting Inquiry...' : (
                <>
                  Send Message <Send size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Contact;
