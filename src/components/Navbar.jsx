import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu as MenuIcon, X, Sparkles, PhoneCall, Heart } from "lucide-react";
import { BAKERY_INFO } from "../data/bakeryData";

export default function Navbar({ cartCount, onOpenCart }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Menu", href: "#menu" },
    { name: "Custom Cakes", href: "#custom-cake" },
    { name: "Our Story", href: "#our-story" },
    { name: "Reviews", href: "#reviews" },
    { name: "Location & Hours", href: "#contact" },
  ];

  return (
    <header className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <a href="#" className="navbar-logo">
          <span className="logo-icon">🌱</span>
          <div className="logo-text-group">
            <span className="logo-title">IamGroot<span className="logo-tld">.in</span></span>
            <span className="logo-subtitle">ARTISANAL BAKERY</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          <a href={`tel:${BAKERY_INFO.phone}`} className="phone-cta-btn">
            <PhoneCall size={16} />
            <span>Call Bakery</span>
          </a>

          <button 
            onClick={onOpenCart}
            className="cart-trigger-btn"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag size={20} />
            <span>Order</span>
            {cartCount > 0 && (
              <span className="cart-badge-count animate-bounce">{cartCount}</span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer animate-slideDown">
          <div className="mobile-nav-links">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="mobile-drawer-footer">
              <p className="mobile-hours-tag">⏰ Open Today: {BAKERY_INFO.hours.weekdays}</p>
              <a href={`tel:${BAKERY_INFO.phone}`} className="mobile-call-btn">
                <PhoneCall size={18} /> {BAKERY_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
