import React from 'react';
import { Target, Compass, Award, Shield, Lightbulb, Users, Milestone, Briefcase } from 'lucide-react';

export const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-content">
          <h1>About Sattvashtha Advisory LLP</h1>
          <p>Empowering Enterprises with Scientific Integrity & Strategic Consulting</p>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding">
        <div className="who-we-are-grid">
          <div>
            <h2 className="gold-text-gradient" style={{ fontSize: '36px', marginBottom: '24px' }}>Who We Are</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
              Sattvashtha Advisory LLP is a premier, multi-disciplinary business and project management consulting (PMC) firm. We specialize in project management, real estate advisory, geological safety engineering, and sustainable innovations. We partner with organizations to deliver strategic solutions that drive sustainable growth and operational excellence.
            </p>
            <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
              Sattvashtha Advisory recruits leading specialists to dig out practical solutions matching the best of Earth Science and engineering. Our reach spans from environmental preambles to transportation, logistical routes, storage options, and safe distribution systems.
            </p>
          </div>
          <div className="who-we-are-image-card card">
            <div style={{ padding: '20px' }}>
              <h4 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Global Engineering Connections</h4>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                We maintain active consulting integrations with premier European and Asian technology leaders, bridging specialized engineering protocols from Germany, Japan, and the EU to construct state-of-the-art logistics, ropeways, and public utility routes.
              </p>
              <div style={{ display: 'flex', gap: '15px', marginTop: '24px' }}>
                <div style={{ flex: 1, textAlign: 'center', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 800, color: '#D4AF37' }}>2/3rd</span>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Earth Science Expertise</p>
                </div>
                <div style={{ flex: 1, textAlign: 'center', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 800, color: '#D4AF37' }}>PAN</span>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>India Network Clearance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-dark-tint" style={{ borderRadius: 'var(--radius-lg)', margin: '40px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', padding: '20px' }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ color: '#D4AF37', background: 'rgba(212, 175, 55, 0.1)', padding: '12px', borderRadius: '50%', width: 'fit-content' }}>
              <Target size={24} />
            </div>
            <h3>Our Mission</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
              To inspire and support organizations in achieving sustainable growth by providing deep strategic insights, cutting-edge engineering solutions, and dedicated hands-on project management tailored to their unique local challenges.
            </p>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ color: '#D4AF37', background: 'rgba(212, 175, 55, 0.1)', padding: '12px', borderRadius: '50%', width: 'fit-content' }}>
              <Compass size={24} />
            </div>
            <h3>Our Vision</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
              To stand as the absolute benchmark in Earth Science engineering preambles and structural PMC solutions. We aim to revolutionize commercial transportation, utility transit, and environmental safety by integrating global designs (Japan, Germany, EU) with sustainable local deployment.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding">
        <div className="section-header">
          <h2>Our Core Values</h2>
          <p className="section-subtitle">The standards that guide our client partnerships and operational delivery</p>
        </div>

        <div className="values-grid-custom">
          <div className="value-card card">
            <Shield className="value-icon" size={20} />
            <h4>Integrity</h4>
            <p>Upholding the highest standards of scientific accuracy, complete honesty, and transparency in compliance reports.</p>
          </div>

          <div className="value-card card">
            <Lightbulb className="value-icon" size={20} />
            <h4>Innovation</h4>
            <p>Continuously seeking advanced technologies and sustainable practices to solve difficult geological hazards.</p>
          </div>

          <div className="value-card card">
            <Award className="value-icon" size={20} />
            <h4>Client Success</h4>
            <p>Focusing on cost efficiency, timeline management, and delivering measurable regulatory approvals.</p>
          </div>

          <div className="value-card card">
            <Users className="value-icon" size={20} />
            <h4>Collaboration</h4>
            <p>Working closely with local developers, governmental bodies, and international engineers to deliver cohesive results.</p>
          </div>
        </div>
      </section>

      {/* Specialized Divisions */}
      <section className="section-padding">
        <div className="section-header">
          <h2>Specialized Consulting Divisions</h2>
          <p className="section-subtitle">Bespoke departments engineered to tackle sector-specific challenges</p>
        </div>

        <div className="divisions-grid">
          <div className="division-card card">
            <div className="division-badge">ENVIRONMENTAL</div>
            <h3>Environmental & Geological Solutions</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              We implement professional environmental solutions using a civil and geological mix. Partnering with MACCAFERRI (French origin geological specialists), Leighton CIMIC Group Australia, and Datt Medi Products UAE to engineer solid structural shields for mountainous and coastal terrains.
            </p>
          </div>

          <div className="division-card card">
            <div className="division-badge">ENGINEERING</div>
            <h3>Construction Consulting & Logistics</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Our project management teams specialize in complex engineering. From designing automated machinery matching Singaporean and German airport specifications to planning ports, sea locks, and specialized aerospace research buildings.
            </p>
          </div>

          <div className="division-card card">
            <div className="division-badge">REAL ESTATE</div>
            <h3>Real Estate Advisory & Asset Structuring</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Operating across multiple premium enterprises, we navigate marketing negotiations, value estimations, and portfolio structures. We facilitate premium ready-to-move-in assets, gated corporate colonies, and high-rise developments in NCR.
            </p>
          </div>

          <div className="division-card card">
            <div className="division-badge">PROJECT MGMT</div>
            <h3>Value-Driven Project Management (PMC)</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Providing capital cost optimization. Our participations range from developing Daman & Diu regions in line with premium tourism layouts to planning the architecture of rare world-scale palaces modeled after historical monuments.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding">
        <div className="section-header">
          <h2>Our Leadership Team</h2>
          <p className="section-subtitle">Experienced industry experts leading our global advisory practices</p>
        </div>

        <div className="team-grid-custom">
          <div className="team-card card">
            <div className="team-avatar-placeholder">DC</div>
            <h4>David Carter</h4>
            <p style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: 600 }}>CEO & Managing Partner</p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>Over 25 years advising infrastructure consortia on geological risk and ESG compliance.</p>
          </div>

          <div className="team-card card">
            <div className="team-avatar-placeholder">EW</div>
            <h4>Emma Wilson</h4>
            <p style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: 600 }}>Director of Strategy</p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>Former EU infrastructure panel advisor, specializing in digital twin systems and capital allocation.</p>
          </div>

          <div className="team-card card">
            <div className="team-avatar-placeholder">MB</div>
            <h4>Michael Brown</h4>
            <p style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: 600 }}>Head of PMC Operations</p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>Operations lead directing environmental impact assessments (EIA) for high-speed rail and utility grids.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default About;
