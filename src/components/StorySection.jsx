import React from "react";
import { Wheat, Flame, Clock, HeartHandshake, ShieldCheck } from "lucide-react";

export default function StorySection() {
  const steps = [
    {
      icon: Wheat,
      title: "1. Organic Heritage Grains",
      description: "We source single-origin stone-ground wheat from sustainable organic farms across India."
    },
    {
      icon: Clock,
      title: "2. 36-Hour Wild Fermentation",
      description: "Our mother sourdough starter, nurtured daily, develops complex flavor profiles and high digestibility."
    },
    {
      icon: Flame,
      title: "3. Wood-Fired Hearth Baking",
      description: "Baked at 450°F on stone hearths to achieve our signature caramelized, blistered crust."
    }
  ];

  return (
    <section id="our-story" className="story-section">
      <div className="story-container">
        <div className="story-grid">
          {/* Left Text */}
          <div className="story-content">
            <span className="section-badge">OUR HERITAGE & CRAFT</span>
            <h2 className="section-title">Rooted in Tradition, Baked with Passion</h2>
            <p className="story-lead">
              At <strong>IamGroot.in</strong>, we believe baking is an art form of patience and natural purity. Named after our love for deep organic roots and growth, we craft breads and pastries that bring people together.
            </p>
            <p className="story-body">
              Every morning at 4:00 AM, our master bakers ignite the stone hearth ovens. We shun commercial yeasts, artificial preservatives, and shortcuts. What you taste is pure wheat, pure butter, wild yeast, and genuine human dedication.
            </p>

            <div className="story-stats-row">
              <div className="stat-card">
                <span className="stat-num">36+</span>
                <span className="stat-label">Hours Fermentation</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">100%</span>
                <span className="stat-label">Organic Ingredients</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">12k+</span>
                <span className="stat-label">Loaves Baked Yearly</span>
              </div>
            </div>
          </div>

          {/* Right Cards Timeline */}
          <div className="story-timeline">
            <h3>The 3-Step IamGroot Craft</h3>
            <div className="timeline-cards-list">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="timeline-step-card">
                    <div className="step-icon-bubble">
                      <Icon size={22} />
                    </div>
                    <div className="step-card-text">
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
