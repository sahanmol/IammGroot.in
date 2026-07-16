import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Brain, Cloud, Users, ShieldAlert, ArrowLeft, ArrowRight, CheckCircle2, Cpu, Globe, Zap, Settings } from 'lucide-react';

export const SolutionDetail = () => {
  const { id } = useParams();

  // Solutions data dictionary
  const solutionsData = {
    'artificial-intelligence': {
      title: 'Artificial Intelligence Solutions',
      subtitle: 'Transforming Enterprises with Intelligent Automation and Analytics',
      icon: <Brain size={48} className="gold-text" />,
      intro: 'At Sattvashtha Advisory LLP, we help organizations leverage Artificial Intelligence through a consulting-led approach that aligns technology with business strategy. Our focus is on enabling smarter decision-making, operational efficiency, and scalable growth.',
      capabilities: [
        { title: 'Machine Learning', description: 'Predict market patterns, evaluate client risk, and automate decision-making using advanced mathematical models.' },
        { title: 'Natural Language Processing', description: 'Enable machines to process, translate, and understand human language to automate service workflows.' },
        { title: 'Computer Vision', description: 'Extract real-time insights from images and security videos to protect facilities and monitor assets.' },
        { title: 'AI Automation', description: 'Automate repetitive workflows, reduce labor-intensive errors, and optimize industrial production lines.' }
      ],
      whyChoose: [
        'Experienced AI Consultants & Engineers',
        'Scalable & Custom AI Integration Models',
        'Secure Data Practices & Compliance Governance',
        'End-to-End Implementation & Post-Launch Audits'
      ],
      environmentalLink: 'We integrate machine learning models to track carbon footprints, simulate water outflow, and predict environmental impact metrics for fast EIA approvals.'
    },
    'cloud': {
      title: 'Cloud Advisory & Governance',
      subtitle: 'Achieve Scale, Agility, and Security with Modern Architectures',
      icon: <Cloud size={48} className="gold-text" />,
      intro: 'Our cloud advisory services help organizations transition to modern, secure cloud environments. We formulate migration roadmaps, cloud-native application designs, and robust resource governance strategies.',
      capabilities: [
        { title: 'Migration & Strategy', description: 'Seamless transitions to AWS, Azure, or GCP with zero downtime and robust database integrity.' },
        { title: 'Cloud Native Architecture', description: 'Designing microservices, containerization (Docker/Kubernetes), and serverless infrastructure.' },
        { title: 'Cost Optimization', description: 'Analyzing cloud utilization, right-sizing resources, and implementing cost-containment tools.' },
        { title: 'IAM & Network Security', description: 'Setting up multi-tenant security groups, Virtual Private Clouds (VPC), and strict access controls.' }
      ],
      whyChoose: [
        'Certified Multi-Cloud Solutions Architects',
        'Proven Zero-Downtime Migration Frameworks',
        'Up to 40% Average Reduction in Cloud Overheads',
        'Strict Regulatory Compliance (GDPR, HIPAA, SOC2)'
      ],
      environmentalLink: 'We build high-availability cloud servers for local pollution control boards to monitor EIA emission trackers and host environmental datasets.'
    },
    'customer-experience': {
      title: 'Customer Experience Advisory',
      subtitle: 'Engage, Retain, and Delight Customers across Every Touchpoint',
      icon: <Users size={48} className="gold-text" />,
      intro: 'We blend digital UI/UX designs with behavioral science to optimize your customer experience (CX). We audit user journeys, identify friction points, and engineer interfaces that boost conversions.',
      capabilities: [
        { title: 'User Journey Audits', description: 'Deep qualitative interviews and screen tracking to evaluate user friction and conversion drops.' },
        { title: 'UI/UX Interface Design', description: 'Prototyping responsive, modern layouts that match your brand values and engage users.' },
        { title: 'Frictionless Portals', description: 'Engineering smooth transaction steps and client service portals to expedite user interactions.' },
        { title: 'Omnichannel Alignment', description: 'Ensuring consistency across mobile, web, support desks, and chatbot agents.' }
      ],
      whyChoose: [
        'Conversion Rate Optimization Focus',
        'Aesthetic, Clean, and Premium Visual Designs',
        'Interactive Usability Testing Paradigms',
        'Agile Prototyping & Quick Turnarounds'
      ],
      environmentalLink: 'We design easy-to-use community portals that help environmental organizations submit public feedback on EIA/EMP projects.'
    },
    'cybersecurity': {
      title: 'Cybersecurity & Risk Advisory',
      subtitle: 'Protect Your Assets and Ensure Complete Compliance Governance',
      icon: <ShieldAlert size={48} className="gold-text" />,
      intro: 'We protect your critical business infrastructure from cybersecurity threats. Our risk advisory team sets up firewalls, audits security postures, and ensures compliance with global and local standards.',
      capabilities: [
        { title: 'Vulnerability Assessments', description: 'Regular penetration testing, port scanning, and codebase security audits.' },
        { title: 'Zero-Trust Access (IAM)', description: 'Implementing multi-factor credentials, role-based controls, and security keys.' },
        { title: 'Incident Response Blueprints', description: 'Structuring immediate containment and disaster recovery steps for database failovers.' },
        { title: 'regulatory Compliance', description: 'Securing audits to match ISO 27001, SOC2 Type II, and RBI digital banking regulations.' }
      ],
      whyChoose: [
        'Certified Information Security Managers (CISM)',
        'Zero-Trust Network Access Engineering',
        '24/7 Security Operations Center Advisory',
        'Rapid Threat Detection & Containment Protocols'
      ],
      environmentalLink: 'Securing confidential land survey logs, mineral exploration coordinates, and industrial EIA clearances from digital espionage.'
    }
  };

  const solution = solutionsData[id];

  if (!solution) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Solution Not Found</h2>
        <p style={{ margin: '20px 0', color: 'var(--text-secondary)' }}>The requested solution page does not exist.</p>
        <Link to="/" className="btn btn-secondary">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="solution-detail-container fade-in">
      {/* Back Button */}
      <Link to="/" className="back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '40px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Solutions
      </Link>

      {/* Header Panel */}
      <div className="solution-header-card card" style={{ padding: '40px', marginBottom: '40px', display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '20px', borderRadius: '14px' }}>
          {solution.icon}
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '36px', marginBottom: '8px', color: 'var(--text-primary)' }}>{solution.title}</h1>
          <p className="gold-text" style={{ fontSize: '18px', fontWeight: 500 }}>{solution.subtitle}</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="solution-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px', alignItems: 'start' }}>
        {/* Left Col: Description & Capabilities */}
        <div>
          <div className="card" style={{ marginBottom: '30px' }}>
            <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px', marginBottom: '20px' }}>Overview</h3>
            <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>{solution.intro}</p>
          </div>

          <h3 style={{ marginBottom: '20px', fontSize: '22px' }}>Core Capabilities</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
            {solution.capabilities.map((cap, index) => (
              <div key={index} className="card capability-item" style={{ borderLeft: '3px solid var(--primary)' }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>{cap.title}</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{cap.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Why & Environmental Relevance */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Why Choose Us Card */}
          <div className="card" style={{ background: 'rgba(25, 30, 58, 0.4)' }}>
            <h3 style={{ marginBottom: '20px', color: '#D4AF37', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} /> Why Sattvashtha
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {solution.whyChoose.map((why, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '14px' }}>
                  <CheckCircle2 size={16} style={{ color: '#D4AF37', flexShrink: 0, marginTop: '2px' }} />
                  <span>{why}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Environmental Compliance Sync Card */}
          <div className="card" style={{ border: '1px solid rgba(212, 175, 55, 0.15)', background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.02), rgba(139, 92, 246, 0.02))' }}>
            <h3 style={{ marginBottom: '12px', fontSize: '16px', color: '#D4AF37', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={16} /> Environmental Synergy
            </h3>
            <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
              {solution.environmentalLink}
            </p>
          </div>

          {/* Call to Action */}
          <div className="card text-center" style={{ padding: '30px 20px', background: 'linear-gradient(135deg, var(--bg-card), rgba(139, 92, 246, 0.08))' }}>
            <h4 style={{ marginBottom: '10px' }}>Ready to implement?</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>Let's design a custom road map for your organization.</p>
            <Link 
              to="/contact" 
              state={{ subject: `Request Proposal: ${solution.title}` }}
              className="btn btn-primary" 
              style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              Request Proposal <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SolutionDetail;
