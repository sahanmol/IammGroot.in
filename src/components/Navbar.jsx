import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdminStore } from '../store/adminStore.js';
import { Menu, X, ChevronDown, Shield, LogOut, LayoutDashboard } from 'lucide-react';

export const Navbar = () => {
  const { isAdminAuthenticated, logoutAdmin } = useAdminStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [industriesDropdownOpen, setIndustriesDropdownOpen] = useState(false);

  const handleSignOut = () => {
    logoutAdmin();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;
  
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className="navbar-custom">
      <div className="navbar-container">
        <Link to="/" className="nav-logo" onClick={() => setMobileMenuOpen(false)}>
          <span className="logo-icon">S</span>
          <span className="logo-text">SATTVASHTHA <span className="gold-text">ADVISORY</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-menu-desktop">
          <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>Home</Link>
          
          {/* Solutions Dropdown */}
          <div 
            className="dropdown-wrapper"
            onMouseEnter={() => setSolutionsDropdownOpen(true)}
            onMouseLeave={() => setSolutionsDropdownOpen(false)}
          >
            <button className={`nav-item dropdown-btn ${location.pathname.startsWith('/solutions') ? 'active' : ''}`}>
              Solutions <ChevronDown size={14} />
            </button>
            {solutionsDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/solutions/artificial-intelligence" className="dropdown-item">Artificial Intelligence</Link>
                <Link to="/solutions/cloud" className="dropdown-item">Cloud</Link>
                <Link to="/solutions/customer-experience" className="dropdown-item">Customer Experience</Link>
                <Link to="/solutions/cybersecurity" className="dropdown-item">Cybersecurity</Link>
              </div>
            )}
          </div>

          {/* Industries Dropdown */}
          <div 
            className="dropdown-wrapper"
            onMouseEnter={() => setIndustriesDropdownOpen(true)}
            onMouseLeave={() => setIndustriesDropdownOpen(false)}
          >
            <button className={`nav-item dropdown-btn ${location.pathname.startsWith('/industries') ? 'active' : ''}`}>
              Industries <ChevronDown size={14} />
            </button>
            {industriesDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/industries/aerospace-defense" className="dropdown-item">Aerospace & Defense</Link>
                <Link to="/industries/asset-wealth-management" className="dropdown-item">Asset & Wealth Management</Link>
                <Link to="/industries/banking-capital-markets" className="dropdown-item">Banking & Capital Markets</Link>
                <Link to="/industries/consumer-goods" className="dropdown-item">Consumer Goods</Link>
              </div>
            )}
          </div>

          <Link to="/about" className={`nav-item ${isActive('/about') ? 'active' : ''}`}>About Us</Link>
          <Link to="/contact" className={`nav-item ${isActive('/contact') ? 'active' : ''}`}>Contact Us</Link>

          {isAdminAuthenticated ? (
            <div className="nav-admin-section">
              <Link 
                to="/admin/dashboard" 
                className={`btn btn-secondary ${isActive('/admin/dashboard') ? 'pulse-glow' : ''}`}
                style={{ padding: '6px 12px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
              >
                <LayoutDashboard size={14} />
                Dashboard
              </Link>
              <button 
                className="btn btn-secondary" 
                onClick={handleSignOut}
                style={{ padding: '6px', minWidth: 'auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                title="Logout Admin"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <Link to="/admin" className="admin-portal-link" title="Admin Portal" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <Shield size={16} />
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle-btn" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="nav-menu-mobile">
          <Link to="/" className={`mobile-nav-item ${isActive('/') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Home</Link>
          
          <div className="mobile-dropdown-section">
            <div className="mobile-section-title">Solutions</div>
            <Link to="/solutions/artificial-intelligence" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Artificial Intelligence</Link>
            <Link to="/solutions/cloud" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Cloud Services</Link>
            <Link to="/solutions/customer-experience" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Customer Experience</Link>
            <Link to="/solutions/cybersecurity" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Cybersecurity</Link>
          </div>

          <div className="mobile-dropdown-section">
            <div className="mobile-section-title">Industries</div>
            <Link to="/industries/aerospace-defense" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Aerospace & Defense</Link>
            <Link to="/industries/asset-wealth-management" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Asset & Wealth Management</Link>
            <Link to="/industries/banking-capital-markets" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Banking & Capital Markets</Link>
            <Link to="/industries/consumer-goods" className="mobile-dropdown-item" onClick={() => setMobileMenuOpen(false)}>Consumer Goods</Link>
          </div>

          <Link to="/about" className={`mobile-nav-item ${isActive('/about') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          <Link to="/contact" className={`mobile-nav-item ${isActive('/contact') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>

          {isAdminAuthenticated ? (
            <div className="mobile-admin-row">
              <Link to="/admin/dashboard" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LayoutDashboard size={16} /> Admin Dashboard
              </Link>
              <button className="btn btn-secondary" onClick={handleSignOut} style={{ width: '100%', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <LogOut size={16} /> Logout Admin
              </button>
            </div>
          ) : (
            <Link to="/admin" className="mobile-nav-item" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={16} /> Admin Portal
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};
export default Navbar;
