import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Settings, BarChart2, ShieldCheck, Cpu, Globe, Users, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();
  
  // Interactive consultation tool state
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const handleScopeGenerate = () => {
    if (!selectedIndustry || !selectedService) {
      setSuggestion('Please select both an industry and a service focus.');
      return;
    }

    const scopes = {
      'environmental': {
        'strategy': 'Recommended Focus: Core ESG modeling and environmental EIA compliance strategy. We will structure a detailed Environmental Management Plan (EMP) aligned with India\'s 2070 Net-Zero strategy.',
        'risk': 'Recommended Focus: Environmental Compliance Audits. Assessing project environmental impact risks and securing regulatory clearances from local & central environmental authorities.',
        'digital': 'Recommended Focus: Green IoT & Monitoring. Implementing automated sensor networks to track emissions, water utilization, and waste outputs in real-time.',
        'finance': 'Recommended Focus: Green Bond & Sustainable Finance Advisory. Securing environmental grants and evaluating CAPEX viability for sustainability transformations.'
      },
      'finance-corp': {
        'strategy': 'Recommended Focus: Corporate Restructuring & Synergy. Realigning business departments for maximum profitability and capital allocations.',
        'risk': 'Recommended Focus: Portfolio Risk Governance. Compliance audits matching RBI, SEBI, or global frameworks, checking wealth assets exposure.',
        'digital': 'Recommended Focus: Modern Fintech Implementations. Cloud-based transaction ledgers, analytics engines, and customer engagement channels.',
        'finance': 'Recommended Focus: Valuations & Capital Raise Support. Structuring M&As, IPO readiness plans, and debt restructuring packages.'
      },
      'infra-manufacturing': {
        'strategy': 'Recommended Focus: Supply Chain Strategy & Site Optimization. Engineering lean pipelines and warehouse layout structures.',
        'risk': 'Recommended Focus: Operational Safety & Quality Audits. Implementing Six Sigma standards and strict engineering hazard controls.',
        'digital': 'Recommended Focus: Industry 4.0 Transformation. Smart factory components, robotics integration, and predictive machinery maintenance models.',
        'finance': 'Recommended Focus: Project Management Cost Controls. Securing capital-intensive machinery funding and cost estimation matrices.'
      }
    };

    const industryData = scopes[selectedIndustry];
    const message = industryData ? industryData[selectedService] : 'Custom scoping recommended. Let us connect to discuss your project requirements.';
    setSuggestion(message);
  };

  const handleStartConsultation = () => {
    // Navigate to contact page with prefilled state
    navigate('/contact', {
      state: {
        subject: `Consultation: ${selectedIndustry} - ${selectedService}`,
        message: `I generated a proposal suggestion using your Project Scope Starter: "${suggestion}". Let's arrange a call to discuss details.`
      }
    });
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section-custom">
        <div className="hero-content">
          <div className="hero-badge">
            <Globe size={14} className="gold-text" /> 
            <span>PAN INDIA ENVIRONMENTAL & CORPORATE ADVISORY</span>
          </div>
          <h1>
            SATTVASHTHA Advisory <br />
            Consultancy For Environmental <span className="gold-text-gradient">EIA/EMP Services</span>
          </h1>
          <p className="hero-subtitle">
            Helping organizations transform 2070 strategy, operations, and technology for sustainable, long-term corporate growth.
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary btn-large">
              Get in Touch <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="btn btn-secondary btn-large">
              Read More
            </Link>
          </div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="section-padding">
        <div className="section-header">
          <h2>Our Core Expertise</h2>
          <p className="section-subtitle">Driving structural success and regulatory compliance across sectors</p>
        </div>

        <div className="expertise-grid-custom">
          <div className="expertise-card card">
            <div className="card-icon-container">
              <BarChart2 size={24} />
            </div>
            <h3>Business Strategy Consulting</h3>
            <p>Strategic modeling and management consulting solutions to streamline corporate performance, scale operations, and capture target market segments.</p>
            <Link to="/solutions/artificial-intelligence" className="card-link">Learn more <ArrowRight size={14} /></Link>
          </div>

          <div className="expertise-card card">
            <div className="card-icon-container">
              <ShieldCheck size={24} />
            </div>
            <h3>Risk & Compliance Advisory</h3>
            <p>Helping organizations manage strict regulatory filings, health audits, and operational hazards, ensuring complete compliance with state and central laws.</p>
            <Link to="/solutions/cybersecurity" className="card-link">Learn more <ArrowRight size={14} /></Link>
          </div>

          <div className="expertise-card card">
            <div className="card-icon-container">
              <Cpu size={24} />
            </div>
            <h3>Digital Transformation</h3>
            <p>Deploying advanced technical architectures, analytics platforms, and intelligent automations to future-proof outdated business environments.</p>
            <Link to="/solutions/cloud" className="card-link">Learn more <ArrowRight size={14} /></Link>
          </div>

          <div className="expertise-card card">
            <div className="card-icon-container">
              <Settings size={24} />
            </div>
            <h3>Financial Advisory</h3>
            <p>Providing expert financial consulting, cost controls, valuation metrics, and project management budgeting to support high-impact expansions.</p>
            <Link to="/solutions/customer-experience" className="card-link">Learn more <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* Interactive Project Scoper Section */}
      <section className="section-padding interactive-section card">
        <div className="interactive-grid">
          <div className="interactive-text">
            <div className="badge-glow"><Sparkles size={14} /> Interactive Tool</div>
            <h2>Interactive Project Scope Starter</h2>
            <p>
              Select your industry sector and the service focus you need. Our engine will suggest an immediate high-level consulting roadmap for you.
            </p>
            
            <div className="form-group-row" style={{ marginTop: '24px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Select Industry Sector</label>
                <select 
                  className="input-text"
                  value={selectedIndustry}
                  onChange={(e) => { setSelectedIndustry(e.target.value); setSuggestion(''); }}
                  style={{ background: 'var(--bg-dark)' }}
                >
                  <option value="">-- Select Sector --</option>
                  <option value="environmental">Environmental Compliance / EIA / EMP</option>
                  <option value="finance-corp">Banking, Wealth & Financial Corporate</option>
                  <option value="infra-manufacturing">Infrastructure, Ports & Manufacturing</option>
                </select>
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Select Service Focus</label>
                <select 
                  className="input-text"
                  value={selectedService}
                  onChange={(e) => { setSelectedService(e.target.value); setSuggestion(''); }}
                  style={{ background: 'var(--bg-dark)' }}
                >
                  <option value="">-- Select Service --</option>
                  <option value="strategy">Corporate Strategy & ESG Plan</option>
                  <option value="risk">Risk & Regulatory Audits</option>
                  <option value="digital">Digital Transformation & IoT</option>
                  <option value="finance">Capital Planning & PM Costing</option>
                </select>
              </div>
            </div>

            <button 
              className="btn btn-primary" 
              onClick={handleScopeGenerate}
              style={{ marginTop: '16px' }}
            >
              Analyze & Generate Scope
            </button>
          </div>

          <div className="interactive-result">
            {suggestion ? (
              <div className="result-display fade-in">
                <h4 style={{ color: 'var(--primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} /> Scope Outline Generated
                </h4>
                <p style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--text-primary)' }}>{suggestion}</p>
                <button 
                  className="btn btn-secondary" 
                  onClick={handleStartConsultation}
                  style={{ marginTop: '20px', width: '100%', border: '1px solid var(--primary-glow)' }}
                >
                  Prefill & Contact Advisor
                </button>
              </div>
            ) : (
              <div className="result-placeholder">
                <AlertCircle size={32} style={{ color: 'var(--text-muted)', marginBottom: '12px' }} />
                <p>Choose an industry and service on the left to output your project scope suggestion.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="section-padding">
        <div className="section-header">
          <h2>Industry Verticals</h2>
          <p className="section-subtitle">Delivering bespoke solutions across global domains</p>
        </div>

        <div className="industry-cards-grid">
          <Link to="/industries/banking-capital-markets" className="industry-card-custom card">
            <span className="industry-num">01</span>
            <h3>Financial Services</h3>
            <p>Modernizing banking platforms, optimizing wealth assets risk, and advising capital market players.</p>
          </Link>

          <Link to="/industries/consumer-goods" className="industry-card-custom card">
            <span className="industry-num">02</span>
            <h3>Manufacturing</h3>
            <p>Formulating Industry 4.0 automation, supply chain resilience models, and shopfloor efficiency audits.</p>
          </Link>

          <Link to="/industries/aerospace-defense" className="industry-card-custom card">
            <span className="industry-num">03</span>
            <h3>Aerospace & Defense</h3>
            <p>Navigating defense procurement compliance, project management systems, and specialized engineering roadmaps.</p>
          </Link>

          <Link to="/industries/asset-wealth-management" className="industry-card-custom card">
            <span className="industry-num">04</span>
            <h3>Energy & Utilities</h3>
            <p>Assisting renewable transitions, ecological EIA mappings, power infrastructure projects, and carbon accounting.</p>
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-dark-tint" style={{ borderRadius: 'var(--radius-lg)', margin: '40px 0' }}>
        <div className="section-header">
          <h2>Why Choose Sattvashtha</h2>
          <p className="section-subtitle">Delivering unparalleled advisory value to scale and protect your operations</p>
        </div>

        <div className="why-choose-grid">
          <div className="why-item">
            <div className="why-icon"><Users size={20} /></div>
            <div>
              <h4>Experienced Consultants</h4>
              <p>Our team comprises senior engineers, environmental biologists, and certified financial consultants with decades of experience.</p>
            </div>
          </div>

          <div className="why-item">
            <div className="why-icon"><TrendingUp size={20} /></div>
            <div>
              <h4>Data-Driven Strategies</h4>
              <p>We combine deep mathematical modeling and market metrics with field surveys to create plans that translate directly to growth.</p>
            </div>
          </div>

          <div className="why-item">
            <div className="why-icon"><Globe size={20} /></div>
            <div>
              <h4>Industry Expertise</h4>
              <p>From complex regulatory compliance frameworks to high-tech AI deployments, we cover both traditional and advanced fields.</p>
            </div>
          </div>

          <div className="why-item">
            <div className="why-icon"><Users size={20} /></div>
            <div>
              <h4>Client-Centric Approach</h4>
              <p>No generic solutions. Every project starts with diagnostic questions to build a roadmap customized for your local challenges.</p>
            </div>
          </div>

          <div className="why-item">
            <div className="why-icon"><Settings size={20} /></div>
            <div>
              <h4>Innovative Systems</h4>
              <p>We deploy proprietary digital audit sheets and real-time client trackers, enhancing the transparency and speed of project delivery.</p>
            </div>
          </div>

          <div className="why-item">
            <div className="why-icon"><Sparkles size={20} /></div>
            <div>
              <h4>Project Value Management</h4>
              <p>Cost-effective methodologies designed to optimize ROI, matching global benchmarks and securing fast statutory approvals.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
