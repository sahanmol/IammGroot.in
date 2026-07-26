import React, { useState } from "react";
import { BAKERY_INFO } from "../data/bakeryData";
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, Twitter, Heart } from "lucide-react";

export default function ContactFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 2000);
  };

  return (
    <footer id="contact" className="contact-footer-section">
      <div className="footer-container">
        {/* Top Info Grid */}
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <a href="#" className="footer-logo">
              <span className="logo-icon">🌱</span>
              <div className="logo-text-group">
                <span className="logo-title">IamGroot<span className="logo-tld">.in</span></span>
                <span className="logo-subtitle">ARTISANAL BAKERY</span>
              </div>
            </a>
            <p className="footer-brand-desc">
              {BAKERY_INFO.description}
            </p>

            <div className="social-links-row">
              <a href="#" aria-label="Instagram" className="social-icon-btn"><Instagram size={18} /></a>
              <a href="#" aria-label="Facebook" className="social-icon-btn"><Facebook size={18} /></a>
              <a href="#" aria-label="Twitter" className="social-icon-btn"><Twitter size={18} /></a>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="footer-col">
            <h3 className="footer-col-title">
              <Clock size={18} /> Opening Hours
            </h3>
            <ul className="hours-list">
              <li>
                <span>Monday - Friday:</span>
                <strong>{BAKERY_INFO.hours.weekdays}</strong>
              </li>
              <li>
                <span>Saturday - Sunday:</span>
                <strong>{BAKERY_INFO.hours.weekends}</strong>
              </li>
              <li className="fresh-batch-note">
                ⚡ <em>First oven batch ready every morning at 6:00 AM!</em>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h3 className="footer-col-title">
              <MapPin size={18} /> Visit Our Bakery
            </h3>
            <ul className="contact-info-list">
              <li>
                <MapPin size={16} className="contact-icon" />
                <span>{BAKERY_INFO.address}</span>
              </li>
              <li>
                <Phone size={16} className="contact-icon" />
                <a href={`tel:${BAKERY_INFO.phone}`}>{BAKERY_INFO.phone}</a>
              </li>
              <li>
                <Mail size={16} className="contact-icon" />
                <a href={`mailto:${BAKERY_INFO.email}`}>{BAKERY_INFO.email}</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="footer-col">
            <h3 className="footer-col-title">Join The Groot Club</h3>
            <p className="newsletter-text">
              Subscribe to get secret weekend pastry specials & 10% off your first online order!
            </p>

            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input 
                type="email" 
                required 
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-submit-btn">
                {subscribed ? "Subscribed! 🎉" : <Send size={16} />}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} <strong>IamGroot.in</strong>. All Rights Reserved. Crafted with love & wild yeast.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <span>•</span>
            <a href="#">Terms of Service</a>
            <span>•</span>
            <a href="#">FSSAI Certified Bakery</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
