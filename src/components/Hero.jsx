import React from "react";
import { ArrowRight, Sparkles, Clock, Award, ShieldCheck, Flame } from "lucide-react";

export default function Hero({ onExploreMenu, onCustomCakeClick }) {
  return (
    <section className="hero-section">
      <div className="hero-background-overlay"></div>
      
      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <div className="hero-badge-pill animate-fadeIn">
            <span className="hero-pill-sparkle">✨</span>
            <span>Artisanal Wood-Fired Bakery in Jubilee Hills</span>
          </div>

          <h1 className="hero-title animate-slideUp">
            Slow-Fermented <span className="text-highlight">Sourdough</span> & Divine <span className="text-highlight-accent">Patisseries</span>
          </h1>

          <p className="hero-subtitle">
            At <strong>IamGroot.in</strong>, we believe every loaf and cake is a work of natural art. Baked fresh every morning at 6:00 AM using stone-ground organic heritage wheat and 100% pure Normandy butter.
          </p>

          <div className="hero-cta-group">
            <button onClick={onExploreMenu} className="hero-btn-primary">
              <span>Order Fresh Bakery</span>
              <ArrowRight size={18} />
            </button>

            <button onClick={onCustomCakeClick} className="hero-btn-secondary">
              <Sparkles size={18} />
              <span>Design Custom Cake</span>
            </button>
          </div>

          {/* Highlights */}
          <div className="hero-highlights">
            <div className="highlight-item">
              <div className="highlight-icon">
                <Flame size={20} className="icon-fire" />
              </div>
              <div className="highlight-text">
                <strong>36-Hr Sourdough</strong>
                <span>Natural wild ferment</span>
              </div>
            </div>

            <div className="highlight-item">
              <div className="highlight-icon">
                <Award size={20} className="icon-gold" />
              </div>
              <div className="highlight-text">
                <strong>100% Organic</strong>
                <span>No artificial additives</span>
              </div>
            </div>

            <div className="highlight-item">
              <div className="highlight-icon">
                <Clock size={20} className="icon-time" />
              </div>
              <div className="highlight-text">
                <strong>Baked Daily 6 AM</strong>
                <span>Crisp & warm guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Hero Image Card */}
        <div className="hero-image-wrapper">
          <div className="hero-image-card">
            <img 
              src="/images/hero.png" 
              alt="IamGroot.in Bakery Shop Interior and Sourdough Display" 
              className="hero-main-img"
            />
            <div className="hero-card-gradient"></div>
            
            {/* Floating Badges */}
            <div className="floating-badge top-right animate-float">
              <span className="badge-dot pulse"></span>
              <div>
                <strong>Hot Batch Ready!</strong>
                <span>Pain au Chocolat at 11:30 AM</span>
              </div>
            </div>

            <div className="floating-badge bottom-left animate-float-delayed">
              <div className="rating-stars">★★★★★</div>
              <div className="badge-rating-text">
                <strong>4.95 / 5.0 Rating</strong>
                <span>500+ Verified Customers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
