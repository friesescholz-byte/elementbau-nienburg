import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Phone, CheckCircle2, ShieldCheck, Clock, FileText, ChevronRight, AlertTriangle
} from 'lucide-react';
import { getServiceBySlug, servicesData } from '../data/servicesData';
import './ServiceDetailPage.css';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  // Animation variants
  const ease = [0.25, 1, 0.5, 1];
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } }
  };

  const isEmergency = service.slug === 'wasserschaden';

  return (
    <div className="service-detail-page">
      
      {/* 1. HERO SECTION */}
      <section className={`service-hero ${isEmergency ? 'hero-emergency' : ''}`}>
        <div className="container">
          
          {/* Breadcrumbs */}
          <div className="breadcrumbs">
            <Link to="/" className="crumb-link">Startseite</Link>
            <ChevronRight size={14} className="crumb-arrow" />
            <Link to="/#leistungen" className="crumb-link">Baudienstleistungen</Link>
            <ChevronRight size={14} className="crumb-arrow" />
            <span className="crumb-current">{service.navTitle}</span>
          </div>

          <motion.div 
            className="service-hero-content"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <motion.div className={`service-badge ${isEmergency ? 'badge-emergency' : ''}`} variants={fadeUp}>
              {isEmergency && <AlertTriangle size={15} className="emergency-icon" />}
              {service.badge}
            </motion.div>

            <motion.h1 className="service-hero-title" variants={fadeUp}>
              {service.title} <span className="highlight">in Nienburg.</span>
            </motion.h1>

            <motion.p className="service-hero-subtitle" variants={fadeUp}>
              {service.subtitle}
            </motion.p>

            {service.emergencyText && (
              <motion.div className="emergency-alert-box" variants={fadeUp}>
                <span>{service.emergencyText}</span>
              </motion.div>
            )}

            <motion.div className="service-hero-actions" variants={fadeUp}>
              <Link 
                to={`/kontakt?service=${encodeURIComponent(service.title)}`} 
                className="btn-solid hero-btn"
              >
                Jetzt unverbindlich anfragen
                <ArrowRight className="arrow" />
              </Link>
              
              <a href="tel:+4950219249870" className={`btn-phone-call ${isEmergency ? 'call-emergency' : ''}`}>
                <Phone size={18} />
                <span>05021 9249870 {isEmergency && '(24h Notruf)'}</span>
              </a>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* 2. MAIN CONTENT & FEATURES GRID */}
      <section className="service-main-section">
        <div className="container">
          <div className="service-content-grid">
            
            {/* Left Column: Description & Features */}
            <div className="service-text-column">
              <div className="section-tag">Leistungsumfang</div>
              <h2 className="content-heading">
                Präzise Umsetzung & <span className="highlight">höchste Qualität.</span>
              </h2>
              
              <p className="lead-paragraph">
                {service.heroDesc}
              </p>

              <div className="features-container">
                <h3 className="features-title">Ihre Vorteile & unsere Leistungen:</h3>
                <ul className="features-list">
                  {service.features.map((feat, idx) => (
                    <li key={idx}>
                      <span className="feat-check">
                        <CheckCircle2 size={20} />
                      </span>
                      <span className="feat-text">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Booking Reminder */}
              <div className="service-direct-box">
                <div className="direct-box-icon">
                  <Clock size={28} />
                </div>
                <div className="direct-box-content">
                  <h4>Schnelle Terminvergabe</h4>
                  <p>Wir melden uns innerhalb von 24 Stunden bei Ihnen oder vereinbaren direkt einen Vor-Ort-Termin.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Images & Sticky Contact Box */}
            <div className="service-media-column">
              {service.images && service.images.length > 0 && (
                <div className="service-images-wrapper">
                  {service.images.map((img, i) => (
                    <div className={`service-img-card ${i === 0 ? 'primary-img' : 'secondary-img'}`} key={i}>
                      <img src={img.url} alt={img.alt} className="service-img" />
                      <div className="img-caption">{img.alt}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Trust Box */}
              <div className="service-trust-badge-card">
                <div className="trust-card-header">
                  <ShieldCheck size={26} className="trust-icon" />
                  <div>
                    <h4>Elementbau Qualitätsversprechen</h4>
                    <p>Inh. Louis Gerber • Nienburg (Weser)</p>
                  </div>
                </div>
                <p className="trust-card-desc">
                  Saubere Baustellen, transparente Angebote und fachgerechte Umsetzung aller Gewerke aus einer Hand.
                </p>
                <Link 
                  to={`/kontakt?service=${encodeURIComponent(service.title)}`} 
                  className="btn-solid full-width-btn"
                >
                  Projekt anfragen
                  <ArrowRight className="arrow" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* 5. FINAL CTA BANNER */}
      <section className="service-final-cta">
        <div className="container">
          <div className="service-cta-card">
            <div className="service-cta-content">
              <div className="section-tag">Projekt starten</div>
              <h2 className="service-cta-title">
                Haben Sie Fragen zu <span className="highlight">{service.navTitle}?</span>
              </h2>
              <p className="service-cta-text">
                Rufen Sie uns direkt an oder senden Sie uns Ihre unverbindliche Anfrage mit Projekt- oder Schadensdetails.
              </p>
              
              <div className="cta-buttons-wrapper">
                <Link 
                  to={`/kontakt?service=${encodeURIComponent(service.title)}`} 
                  className="btn-solid"
                >
                  Jetzt Anfrage stellen
                  <ArrowRight className="arrow" />
                </Link>
                <a href="tel:+4950219249870" className="btn-phone-white">
                  <Phone size={18} />
                  <span>05021 9249870</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
