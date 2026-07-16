import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plane, ShieldAlert, DollarSign, ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';

export const IndustryDetail = () => {
  const { id } = useParams();

  // Industry sectors data dictionary
  const industriesData = {
    'aerospace-defense': {
      title: 'Aerospace & Defense Advisory',
      subtitle: 'Achieve Operational Excellence & Compliance in Complex Projects',
      icon: <Plane size={48} className="gold-text" />,
      description: 'Sattvashtha Advisory LLP assists defense contractors and aerospace research teams in constructing specialized infrastructure. We structure automated manufacturing layouts, testbeds, and security vaults while verifying compliance with national defense frameworks.',
      challenges: [
        'Highly volatile R&D budgeting and strict delivery timelines.',
        'Complex supply chains with zero tolerance for sub-par component quality.',
        'Strict military-grade security clearances and data residency protocols.'
      ],
      howWeHelp: [
        'Deploying PMC operations teams to construct research labs and assembly hangars.',
        'Implementing Zero-Trust network defenses to secure defense blueprints.',
        'Capital risk modeling and supplier quality audits to optimize project cost structures.',
        'Advising on statutory clearance protocols matching defense manufacturing mandates.'
      ]
    },
    'asset-wealth-management': {
      title: 'Asset & Wealth Management',
      subtitle: 'Premium Real Estate Advisory & Environmental ESG Mappings',
      icon: <DollarSign size={48} className="gold-text" />,
      description: 'We consult major investment funds, developers, and landowners to optimize their capital layout. We orchestrate structural costing, real estate negotiations, and ESG (Environmental, Social, Governance) portfolio clearances for large assets.',
      challenges: [
        'Rising regulatory focus on ESG and environmental impact assessment (EIA).',
        'Fluctuating land values and complex legal negotiations in real estate portfolios.',
        'Geological hazards causing delays in high-value infrastructure projects.'
      ],
      howWeHelp: [
        'Providing ready-to-move flat/bungalow asset valuations and marketing negotiations.',
        'Partnering with geological specialists (MACCAFERRI origin) for coastal/terrain shielding.',
        'Drafting detailed environmental EIA/EMP blueprints to secure fast statutory approvals.',
        'Structuring sustainable ESG assets that align with India\'s 2070 Net-Zero carbon goal.'
      ]
    },
    'banking-capital-markets': {
      title: 'Banking & Capital Markets',
      subtitle: 'Accelerate Digital Banking Systems and Risk Governance',
      icon: <ShieldCheck size={48} className="gold-text" />,
      description: 'We help commercial banks and financial players transition their legacy architectures to secure, high-availability clouds. We audit systemic security postures, build automated risk scoring matrices, and streamline trading desks.',
      challenges: [
        'Legacy server bottlenecks preventing quick digital transactions.',
        'Continuous changes in central bank compliance logs (RBI, SEBI, etc.).',
        'Rising threat of cyber financial fraud and transaction leaks.'
      ],
      howWeHelp: [
        'Assisting secure cloud deployments (AWS/Azure/GCP) matching digital banking regulations.',
        'Designing machine learning algorithms for automated credit underwriting.',
        'Vulnerability testing (VAPT) and access management audits (IAM).',
        'Streamlining regulatory reporting pipelines to eliminate clerical errors.'
      ]
    },
    'consumer-goods': {
      title: 'Consumer Goods & Manufacturing',
      subtitle: 'Lean Supply Chains, Industrial Automation & Sustainable Utilities',
      icon: <ShoppingBag size={48} className="gold-text" />,
      description: 'We help consumer goods and durable manufacturers optimize their supply and shopfloor pipelines. We formulate automated sorting layouts, warehouse trackings, and energy/water conservation steps to drive maximum operational efficiency.',
      challenges: [
        'Thin retail margins and volatile raw-material cost fluctuations.',
        'Inefficient inventory storage routes leading to increased transport costs.',
        'Tough environmental norms regarding water effluent discharge and waste management.'
      ],
      howWeHelp: [
        'Designing automated material sorting layouts and lean warehouse pathways.',
        'Implementing Six-Sigma quality tracking to eliminate production bottlenecks.',
        'Securing Environmental Clearance (EC) for manufacturing plants via detailed EMP filings.',
        'Developing resource recycling frameworks to lower utility costs (water, heat, electricity).'
      ]
    }
  };

  const industry = industriesData[id];

  if (!industry) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Industry Sector Not Found</h2>
        <p style={{ margin: '20px 0', color: 'var(--text-secondary)' }}>The requested industry page does not exist.</p>
        <Link to="/" className="btn btn-secondary">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="industry-detail-container fade-in">
      {/* Back Button */}
      <Link to="/" className="back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '40px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Industries
      </Link>

      {/* Header Panel */}
      <div className="solution-header-card card" style={{ padding: '40px', marginBottom: '40px', display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '20px', borderRadius: '14px' }}>
          {industry.icon}
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '36px', marginBottom: '8px', color: 'var(--text-primary)' }}>{industry.title}</h1>
          <p className="gold-text" style={{ fontSize: '18px', fontWeight: 500 }}>{industry.subtitle}</p>
        </div>
      </div>

      {/* Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px', alignItems: 'start' }}>
        {/* Left Side: Overview & How We Help */}
        <div>
          <div className="card" style={{ marginBottom: '30px' }}>
            <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px', marginBottom: '20px' }}>Industry Profile</h3>
            <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>{industry.description}</p>
          </div>

          <h3 style={{ marginBottom: '20px', fontSize: '22px' }}>How We Deliver Value</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {industry.howWeHelp.map((sol, index) => (
              <div key={index} className="card" style={{ borderLeft: '3px solid var(--primary)' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.6', fontWeight: 500 }}>{sol}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Challenges & Contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Market Challenges Card */}
          <div className="card" style={{ background: 'rgba(25, 30, 58, 0.4)' }}>
            <h3 style={{ marginBottom: '20px', color: '#D4AF37', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={18} /> Sector Challenges
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {industry.challenges.map((chal, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px' }}>
                  <span style={{ height: '6px', width: '6px', background: '#D4AF37', borderRadius: '50%', flexShrink: 0, marginTop: '7px' }}></span>
                  <span style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>{chal}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Consultation CTA */}
          <div className="card text-center" style={{ padding: '30px 20px', background: 'linear-gradient(135deg, var(--bg-card), rgba(139, 92, 246, 0.08))' }}>
            <h4 style={{ marginBottom: '10px' }}>Talk to an Industry Advisor</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>Consult our team to navigate complex regulatory audits and cost optimization blueprints.</p>
            <Link 
              to="/contact" 
              state={{ subject: `Advisory Inquiry: ${industry.title}` }}
              className="btn btn-primary" 
              style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              Contact Advisor <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IndustryDetail;
