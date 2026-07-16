import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Shield } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{
      background: 'rgba(10, 13, 28, 0.95)',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '60px 0 20px 0',
      marginTop: '80px',
      color: 'var(--text-secondary)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px'
      }}>
        <div>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              background: 'linear-gradient(135deg, #fff, #D4AF37)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent', 
              fontWeight: 800,
              letterSpacing: '1px'
            }}>SATTVASHTHA</span>
          </h3>
          <p style={{ fontSize: '14px', lineHeight: '1.7' }}>
            Sattvashtha Advisory LLP is a leading business and environmental consulting firm. We partner with organizations to improve strategy, operations, and digital transformation through expert advisory and sustainable growth solutions.
          </p>
        </div>

        <div>
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '20px', fontSize: '16px', fontWeight: 600 }}>Solutions</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
            <li><Link to="/solutions/artificial-intelligence" style={{ color: 'inherit', textDecoration: 'none' }} className="footer-link">Artificial Intelligence</Link></li>
            <li><Link to="/solutions/cloud" style={{ color: 'inherit', textDecoration: 'none' }} className="footer-link">Cloud Services</Link></li>
            <li><Link to="/solutions/customer-experience" style={{ color: 'inherit', textDecoration: 'none' }} className="footer-link">Customer Experience</Link></li>
            <li><Link to="/solutions/cybersecurity" style={{ color: 'inherit', textDecoration: 'none' }} className="footer-link">Cybersecurity</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '20px', fontSize: '16px', fontWeight: 600 }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
            <li><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link></li>
            <li><Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</Link></li>
            <li><Link to="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact Us</Link></li>
            <li><Link to="/admin" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}><Shield size={13} style={{ color: '#D4AF37' }} /> Admin Portal</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '20px', fontSize: '16px', fontWeight: 600 }}>Contact Info</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px' }}>
            <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <MapPin size={18} style={{ color: '#D4AF37', flexShrink: 0, marginTop: '2px' }} />
              <span>Supernova Supertech, <br />Astralis Office No 1212, <br />Sector 94 Noida, India</span>
            </li>
            <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Phone size={16} style={{ color: '#D4AF37' }} />
              <span>+91-9217509906</span>
            </li>
            <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Mail size={16} style={{ color: '#D4AF37' }} />
              <span style={{ wordBreak: 'break-all' }}>info@sattvashthaadvisory.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div style={{
        maxWidth: '1280px',
        margin: '40px auto 0 auto',
        padding: '20px 24px 0 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '15px',
        fontSize: '13px'
      }}>
        <p>© {new Date().getFullYear()} Sattvashtha Advisory LLP. All Rights Reserved.</p>
        <p style={{ color: 'var(--text-muted)' }}>Environmental EIA/EMP Services PAN India</p>
      </div>
    </footer>
  );
};
export default Footer;
