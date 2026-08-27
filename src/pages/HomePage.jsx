import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Check, X, Phone, Mail,
  Star, MessageSquare, CheckCircle2, ChevronLeft, ChevronRight, ChevronDown, ZoomIn, MapPin,
  Droplets, Clock, ShieldCheck, Home, ShieldAlert, Sparkles, Paintbrush, Hammer, Wrench, Waves
} from 'lucide-react';
import { servicesData, r2Url } from '../data/servicesData';
import './HomePage.css';

export default function HomePage() {
  // Hero Background Slideshow State (4 high quality photos)
  const heroSlides = [
    {
      id: 1,
      image: `${r2Url}/nb/Elementbau-Auto02.webp`,
      title: '24h Vor-Ort Einsatzflotte',
      tag: '24h Notdienst vor Ort'
    },
    {
      id: 2,
      image: `${r2Url}/nb/Elementbau-13_ergebnis.webp`,
      title: 'Zerstörungsfreie Bautrocknung',
      tag: 'Moderne Kondensationstechnik'
    },
    {
      id: 3,
      image: `${r2Url}/nb/Elementbau-7_ergebnis.webp`,
      title: 'Wasserschadensanierung',
      tag: 'Alles aus einer Hand'
    },
    {
      id: 4,
      image: `${r2Url}/nb/Elementbau-1_ergebnis.webp`,
      title: 'Moderne Baudienstleistungen',
      tag: 'Präzises Handwerk vor Ort'
    }
  ];

  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(heroTimer);
  }, [heroSlides.length]);
  // Framer Motion Animation Constants
  const ease = [0.25, 1, 0.5, 1];
  
  const fadeUp = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease }
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  // Gallery Filter & Lightbox State
  const [activeFilter, setActiveFilter] = useState('Alle');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const galleryProjects = [
    {
      id: 1,
      title: 'Hochwertige Fußbodenverlegung',
      category: 'Bodenbeläge & Finish',
      location: 'Wohnraum Modernisierung',
      desc: 'Fachgerechtes Verlegen von edlen Design- & Vinylböden mit lückenloser Untergrundvorbereitung und exakter Kantenausbildung.',
      image: `${r2Url}/nb/Elementbau-2_ergebnis.webp`,
      alt: 'Fachgerechte Fußbodenverlegung in Nienburg',
      isPortrait: true
    },
    {
      id: 2,
      title: 'Professionelle Bautrocknung',
      category: 'Trocknung & Notdienst',
      location: 'Wasserschadensanierung',
      desc: 'Gezielte Tiefenentfeuchtung von Estrich, Mauerwerk und Dämmschichten mit modernster Kondensationstrocknungstechnik.',
      image: `${r2Url}/nb/Elementbau-15_ergebnis.webp`,
      alt: 'Professionelle Bautrocknung nach Wasserschaden',
      isPortrait: true
    },
    {
      id: 3,
      title: 'Sockel- & Kellerabdichtung',
      category: 'Feuchtigkeitsschutz',
      location: 'Eingangsbereich & Mauerwerk',
      desc: 'Lückenlose Abdichtung gegen drückendes Wasser und aufsteigende Feuchtigkeit.',
      image: `${r2Url}/d-abdichtung-im-eingangsbereich-erfolgreich-abgeschlossen-fa1-4r-unseren-kunden-easyfitness_nien-20C8pnOX78IJqO2c.jpg`,
      alt: 'Sockelabdichtung und Pflasterarbeiten'
    },
    {
      id: 4,
      title: 'Moderne Badsanierung',
      category: 'Fliesen & Sanitär',
      location: 'Komplettbad & Kleinaufträge',
      desc: 'Schlüsselfertiger Umbau, Waschtisch- & WC-Tausch sowie barrierefreie Walk-In Duschen.',
      image: `${r2Url}/nb/Elementbau-Badsanierung01.webp`,
      alt: 'Moderne Badsanierung Elementbau Nienburg'
    },
    {
      id: 5,
      title: 'Schiebetüren- & Fenstermontage',
      category: 'Bauelemente',
      location: 'Passgenaue Montage',
      desc: 'Einbau hochwertiger Schiebetüren und energieeffizienter Fenstersysteme.',
      image: `${r2Url}/schiebeta1-4r-einmal-neu-bitte-dy-dy-kann-sich-sehen-lassen-oder-home_innovation_bauelemente-JuPHcH6Zw7UI8kkj.jpg`,
      alt: 'Schiebetüren- und Fenstermontage'
    },
    {
      id: 6,
      title: 'Q4 Spachtel- & Putzarbeiten',
      category: 'Maler & Putz',
      location: 'Exakte Kantenausbildung',
      desc: 'Plane Wandflächen, scharfe Kanten und edle Anstriche.',
      image: `${r2Url}/pexels-jimmy-nilsson-masth-193596566-11427055-PZ3mUxKrXAEfdW6S.jpg`,
      alt: 'Präzise Verputzarbeiten'
    },
    {
      id: 7,
      title: 'Trockenbau, Verputzen & Lichtspots',
      category: 'Trockenbau & Licht',
      location: 'Decken- & Wandgestaltung',
      desc: 'Fachgerechtes Verputzen von Wänden, raumbildende Trockenbauwände und moderne Lichtspots-Installation.',
      image: `${r2Url}/nb/Elementbau-Badsanierung101.webp`,
      alt: 'Trockenbau, Wandverputzen und Deckenbeleuchtung mit Lichtspots'
    },
    {
      id: 8,
      title: 'Großbaustellen Fenstereinbau',
      category: 'Großprojekte',
      location: 'Gewerbe & Wohnbau',
      desc: 'Präzise Montage bei umfangreichen Gebäudeelementen.',
      image: `${r2Url}/diese-woche-starten-wir-eine-grapaere-baustelle-mit-home_innovation_bauelemente-neue-fenster-ro-1-BBwRqVvNfA3ccoHf.jpg`,
      alt: 'Großbaustelle Fenstermontage'
    }
  ];

  const filteredProjects = galleryProjects.filter(p => {
    if (activeFilter === 'Alle') return true;
    if (activeFilter === 'Wasserschaden & Trocknung') return p.category.includes('Trocknung') || p.category.includes('Notdienst');
    if (activeFilter === 'Badsanierung') return p.category.includes('Fliesen') || p.category.includes('Sanitär') || p.category.includes('Boden');
    if (activeFilter === 'Maler & Ausbau') return p.category.includes('Maler') || p.category.includes('Putz') || p.category.includes('Trockenbau') || p.category.includes('Energie');
    if (activeFilter === 'Abdichtung & Montage') return p.category.includes('Abdichtung') || p.category.includes('Bauelemente') || p.category.includes('Tiefbau') || p.category.includes('Großprojekte');
    return true;
  });

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % galleryProjects.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + galleryProjects.length) % galleryProjects.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, galleryProjects.length]);

  const googleReviews = [
    {
      name: 'Markus Kupfer',
      type: 'Wasserschaden & Notfall',
      rating: 5,
      date: 'Google Rezension',
      text: 'Bestens. Ich hatte bei meinem Einfamilienhaus einen Wasser-Notfall. Das Team war schnell vor Ort, hat sofort "Erste Hilfe" geleistet und mich danach beraten, was ich tun kann, um das Wasser von meinem Haus fernzuhalten. Die verschiedenen Maßnahmen wurden fachgerecht und zum fairen Preis umgesetzt. Danke!'
    },
    {
      name: 'Brayn Stammer',
      type: 'Wasserschadensanierung',
      rating: 5,
      date: 'Google Rezension',
      text: 'Nach einem Wasserschaden waren wir auf schnelle und kompetente Hilfe angewiesen und genau das haben wir bei ElementBau bekommen! Vom ersten Kontakt an wurde professionell, freundlich und lösungsorientiert gearbeitet.'
    },
    {
      name: 'Joachim Roß',
      type: 'Baudienstleistungen & Sanierung',
      rating: 5,
      date: 'Google Rezension',
      text: 'Absolut empfehlenswert. Schnelle Terminzusage, Auftrag sauber und akkurat erledigt. Freundliches Team, wir sind äußerst zufrieden.'
    }
  ];

  return (
    <div className="homepage-wrapper">
      
      {/* 1. HERO SECTION WITH SEAMLESS REAL BRUSH STROKE & SLIDESHOW */}
      <section id="hero" className="hero-section hero-brush-split">
        
        {/* Right Half: Centered Photo Slideshow */}
        <div className="hero-slideshow-wrap" aria-hidden="true">
          {heroSlides.map((slide, idx) => (
            <div 
              key={slide.id}
              className={`hero-slide-bg ${idx === activeHeroSlide ? 'active' : ''}`}
            >
              <img 
                src={slide.image} 
                alt="" 
                className="hero-slide-img-full"
              />
            </div>
          ))}
          <div className="hero-slide-right-gradient" />
        </div>

        {/* Left Side: Deep #012444 Navy Block with Real PNG Brush Edge */}
        <div className="hero-navy-brush-block">
          
          <img 
            src="/brush-edge-real.png" 
            alt="" 
            className="hero-brush-edge-real-png" 
            aria-hidden="true" 
          />

          <div className="container hero-container-brush">
            
            <motion.div 
              className="hero-brush-content"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Main Headline - High z-index & wide padding so it NEVER gets cut off */}
              <motion.h1 className="hero-insta-title" variants={fadeUp}>
                <span className="title-nowrap">SCHADENSSANIERUNG</span><br />
                <span className="title-nowrap">& LECKORTUNG</span>
              </motion.h1>

              {/* Orange Sub-Headline */}
              <motion.h2 className="hero-insta-subline" variants={fadeUp}>
                WIR BRINGEN IHRE RÄUME SCHNELL ZURÜCK ZUR NORMALITÄT!
              </motion.h2>

              {/* Orange bar with description */}
              <motion.div className="hero-insta-desc-box" variants={fadeUp}>
                <div className="insta-bar" />
                <p className="insta-text">
                  Feuchtigkeit im Gebäude oder akuter Rohrbruch? Wir sind Ihr kompetenter 24h-Partner für zerstörungsfreie Leckortung, Bautrocknung und fachgerechte Komplettsanierung.
                </p>
              </motion.div>

              {/* 4 Circular feature icons */}
              <motion.div className="hero-insta-features-grid" variants={fadeUp}>
                <div className="insta-feat-item">
                  <div className="insta-feat-icon">
                    <Droplets size={22} />
                  </div>
                  <span className="insta-feat-label">ZERSTÖRUNGSFREIE<br />ORTUNG</span>
                </div>

                <div className="insta-feat-item">
                  <div className="insta-feat-icon">
                    <Clock size={22} />
                  </div>
                  <span className="insta-feat-label">SCHNELLE<br />EINSATZBEREITSCHAFT</span>
                </div>

                <div className="insta-feat-item">
                  <div className="insta-feat-icon">
                    <ShieldCheck size={22} />
                  </div>
                  <span className="insta-feat-label">MODERNE<br />TECHNIK</span>
                </div>

                <div className="insta-feat-item">
                  <div className="insta-feat-icon">
                    <Home size={22} />
                  </div>
                  <span className="insta-feat-label">FÜR PRIVAT &<br />GEWERBE</span>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div className="hero-insta-actions" variants={fadeUp}>
                <Link to="/kontakt?service=Wasserschaden%20%26%20Leckortung" className="btn-hero-primary-insta">
                  <span>Schaden online melden</span>
                  <ArrowRight size={18} />
                </Link>

                <a href="tel:+4950219249870" className="btn-hero-emergency-insta">
                  <Phone size={17} />
                  <span>24h Notfall anrufen</span>
                </a>
              </motion.div>

            </motion.div>

          </div>
        </div>

      </section>

      {/* 1.5. SCHADENSSANIERUNG & NOTDIENST (PREMIUM STORYLINE WITH AUTHENTIC PAINTERLY CARDS) */}
      <section id="soforthilfe" className="soforthilfe-section storyline-flow">
        <div className="container">
          
          <div className="section-header center">
            <h2 className="section-title">
              Wasserschaden? <span className="highlight-navy">So helfen wir Ihnen</span> <span className="highlight">Schritt für Schritt.</span>
            </h2>
            <p className="section-intro text-center">
              Von der ersten Notfall-Ortung bis zur schlüsselfertigen Wiederherstellung – transparent, schnell und alles aus einer Hand.
            </p>
          </div>

          <div className="storyline-steps-container">
            {/* Center Vertical Connecting Line on Desktop */}
            <div className="storyline-center-spine" aria-hidden="true" />

            {/* STEP 01: Photo Left | Painterly Blue Card Right (Brush on outer RIGHT) */}
            <div className="storyline-step-row step-row-left">
              <div className="storyline-photo-col">
                <div className="storyline-photo-frame">
                  <img 
                    src={`${r2Url}/nb/Elementbau-Auto02.webp`} 
                    alt="24h Notfalleinsatz und zerstörungsfreie Ortung bei Elementbau Nienburg" 
                    className="storyline-img" 
                  />
                </div>
              </div>

              <div className="storyline-text-col">
                <div className="storyline-blue-card card-fused-brush-right">
                  {/* Real Acrylic Painterly Brush Edge on outer RIGHT side */}
                  <img 
                    src="/card-brush-rounded-right.png" 
                    alt="" 
                    className="card-fused-brush-edge-right" 
                    aria-hidden="true" 
                  />

                  <div className="step-card-header">
                    <div className="step-card-eyebrow">
                      <span className="pulse-dot-orange-sm" />
                      <span>ERSTVERSORGUNG & LECKORTUNG</span>
                    </div>
                    <h3 className="step-card-title">Zerstörungsfreie Ortung & Schadensstopp</h3>
                    <p className="step-card-desc">
                      Wasser im Gebäude? Unser 24h-Notdienst ist sofort bei Ihnen vor Ort in Nienburg und Umgebung. Mit modernster Akustik- und Infrarottechnik orten wir das Leck zentimetergenau – ohne unnötige Wandaufbrüche.
                    </p>
                  </div>

                  <ul className="step-card-highlights">
                    <li>
                      <div className="highlight-icon-box"><Check size={16} /></div>
                      <div className="highlight-text-box">
                        <span className="highlight-key">Schnell vor Ort:</span>
                        <span className="highlight-val">24/7 Notdienst in Nienburg & Region</span>
                      </div>
                    </li>
                    <li>
                      <div className="highlight-icon-box"><Check size={16} /></div>
                      <div className="highlight-text-box">
                        <span className="highlight-key">Ohne Stemmarbeiten:</span>
                        <span className="highlight-val">Zerstörungsfreie Ortung spart Zeit & Kosten</span>
                      </div>
                    </li>
                    <li>
                      <div className="highlight-icon-box"><Check size={16} /></div>
                      <div className="highlight-text-box">
                        <span className="highlight-key">Versicherungsbericht:</span>
                        <span className="highlight-val">Lückenloses Schadensprotokoll inklusive</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* STEP 02: Painterly Blue Card Left (Brush on outer LEFT) | Photo Right */}
            <div className="storyline-step-row step-row-right">
              <div className="storyline-photo-col">
                <div className="storyline-photo-frame">
                  <img 
                    src={`${r2Url}/nb/Elementbau-13_ergebnis.webp`} 
                    alt="Professionelle Bautrocknung und Feuchtigkeitsentzug" 
                    className="storyline-img storyline-img-dryer" 
                  />
                </div>
              </div>

              <div className="storyline-text-col">
                <div className="storyline-blue-card card-fused-brush-left">
                  {/* Real Acrylic Painterly Brush Edge on outer LEFT side */}
                  <img 
                    src="/card-brush-rounded-left.png" 
                    alt="" 
                    className="card-fused-brush-edge-left" 
                    aria-hidden="true" 
                  />

                  <div className="step-card-header">
                    <div className="step-card-eyebrow">
                      <span className="pulse-dot-orange-sm" />
                      <span>BAUTROCKNUNG & FEUCHTIGKEITSENTZUG</span>
                    </div>
                    <h3 className="step-card-title">Gezielte technische Bautrocknung</h3>
                    <p className="step-card-desc">
                      Wir entziehen Estrich, Wänden und Dämmschichten die Feuchtigkeit vollständig mit modernen Kondenstrocknern. Das schützt Ihre Bausubstanz und verhindert Schimmelbildung dauerhaft.
                    </p>
                  </div>

                  <ul className="step-card-highlights">
                    <li>
                      <div className="highlight-icon-box"><Check size={16} /></div>
                      <div className="highlight-text-box">
                        <span className="highlight-key">Tiefenentfeuchtung:</span>
                        <span className="highlight-val">Leistungsstarke Trocknungs- & Gebläsetechnik</span>
                      </div>
                    </li>
                    <li>
                      <div className="highlight-icon-box"><Check size={16} /></div>
                      <div className="highlight-text-box">
                        <span className="highlight-key">Schimmelschutz:</span>
                        <span className="highlight-val">Sichere Prävention für ein gesundes Raumklima</span>
                      </div>
                    </li>
                    <li>
                      <div className="highlight-icon-box"><Check size={16} /></div>
                      <div className="highlight-text-box">
                        <span className="highlight-key">Messprotokolle:</span>
                        <span className="highlight-val">Exakte Feuchtemessung bis zum optimalen Wert</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* STEP 03: Photo Left | Painterly Blue Card Right (Brush on outer RIGHT) */}
            <div className="storyline-step-row step-row-left">
              <div className="storyline-photo-col">
                <div className="storyline-photo-frame">
                  <img 
                    src={`${r2Url}/nb/Bad-Sanieren_Elementbau.jpg`} 
                    alt="Schlüsselfertige Sanierung und Wiederherstellung" 
                    className="storyline-img" 
                  />
                </div>
              </div>

              <div className="storyline-text-col">
                <div className="storyline-blue-card card-fused-brush-right">
                  {/* Real Acrylic Painterly Brush Edge on outer RIGHT side */}
                  <img 
                    src="/card-brush-rounded-right.png" 
                    alt="" 
                    className="card-fused-brush-edge-right" 
                    aria-hidden="true" 
                  />

                  <div className="step-card-header">
                    <div className="step-card-eyebrow">
                      <span className="pulse-dot-orange-sm" />
                      <span>KOMPLETTSANIERUNG & WIEDERHERSTELLUNG</span>
                    </div>
                    <h3 className="step-card-title">Fachgerechte Komplettsanierung</h3>
                    <p className="step-card-desc">
                      Vom Trockenbau und Spachteln über Malerarbeiten bis zum neuen Bad: Unser Team übernimmt die komplette Wiederherstellung – schlüsselfertig, sauber und bezugsfertig übergeben.
                    </p>
                  </div>

                  <ul className="step-card-highlights">
                    <li>
                      <div className="highlight-icon-box"><Check size={16} /></div>
                      <div className="highlight-text-box">
                        <span className="highlight-key">Alle Gewerke:</span>
                        <span className="highlight-val">Trockenbau, Fliesen, Maler & Sanitär aus einer Hand</span>
                      </div>
                    </li>
                    <li>
                      <div className="highlight-icon-box"><Check size={16} /></div>
                      <div className="highlight-text-box">
                        <span className="highlight-key">Ein Ansprechpartner:</span>
                        <span className="highlight-val">Keine mühsame Koordination verschiedener Firmen</span>
                      </div>
                    </li>
                    <li>
                      <div className="highlight-icon-box"><Check size={16} /></div>
                      <div className="highlight-text-box">
                        <span className="highlight-key">Schlüsselfertig:</span>
                        <span className="highlight-val">Saubere, termingerechte Übergabe im Neuzustand</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* Clean Navy Soforthilfe Action Banner */}
          <div className="soforthilfe-navy-cta-banner">
            <div className="cta-banner-content">
              <h3 className="cta-banner-title">Feuchtigkeit oder akuter Schaden im Gebäude?</h3>
              <p className="cta-banner-subtitle">
                Wir sind in kürzester Zeit bei Ihnen in Nienburg und Umgebung. Rufen Sie uns jetzt an oder senden Sie Ihren Schaden online.
              </p>
            </div>
            <div className="cta-banner-buttons">
              <Link to="/kontakt?service=Wasserschaden%20%26%20Leckortung" className="btn-banner-primary">
                <span>Schaden online melden</span>
                <ArrowRight size={17} />
              </Link>
              <a href="tel:+4950219249870" className="btn-banner-emergency">
                <Phone size={17} />
                <span>24h Notruf: 05021 / 9249870</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 2. LEISTUNGEN OVERVIEW SECTION WITH RICH DEEP NAVY BLUE CARDS */}
      <section id="leistungen" className="services-section">
        {/* Multi-Section Smooth Gradient Atmosphere & Sweeping Architectural Contour Lines */}
        <div className="services-designer-bg" aria-hidden="true">
          <div className="designer-glow glow-navy-1" />
          <div className="designer-glow glow-orange-1" />
          <div className="designer-glow glow-navy-2" />
          
          <svg className="designer-lines-svg" viewBox="0 0 1600 1000" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="waveGradPrimary" x1="0%" y1="0%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="#012444" stopOpacity="0.08" />
                <stop offset="25%" stopColor="#012444" stopOpacity="0.3" />
                <stop offset="60%" stopColor="#ff8c00" stopOpacity="0.4" />
                <stop offset="85%" stopColor="#012444" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#012444" stopOpacity="0.04" />
              </linearGradient>
              <linearGradient id="waveGradSecondary" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ff8c00" stopOpacity="0.4" />
                <stop offset="40%" stopColor="#ea580c" stopOpacity="0.25" />
                <stop offset="75%" stopColor="#012444" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#012444" stopOpacity="0.04" />
              </linearGradient>
              <linearGradient id="waveGradAccent" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#012444" stopOpacity="0.04" />
                <stop offset="50%" stopColor="#ff8c00" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#012444" stopOpacity="0.04" />
              </linearGradient>
              <linearGradient id="gridGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#012444" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#012444" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Architectural Blueprint Grid Pattern */}
            <pattern id="subtleGrid" width="70" height="70" patternUnits="userSpaceOnUse">
              <path d="M 70 0 L 0 0 0 70" fill="none" stroke="url(#gridGrad)" strokeWidth="0.9" />
              <circle cx="70" cy="70" r="1.5" fill="rgba(255, 140, 0, 0.28)" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#subtleGrid)" />

            {/* Sweeping Wave 1: Bold Flow Wave (3.5px) */}
            <path d="M -150 240 C 280 60, 650 380, 1100 160 C 1350 40, 1550 140, 1750 220" stroke="url(#waveGradPrimary)" strokeWidth="3.5" strokeLinecap="round" />
            
            {/* Sweeping Wave 2: Harmonizing Mid Wave (2px dashed) */}
            <path d="M -120 280 C 310 100, 680 420, 1130 200 C 1380 80, 1580 180, 1750 260" stroke="url(#waveGradPrimary)" strokeWidth="2" strokeDasharray="10 12" strokeLinecap="round" />
            
            {/* Sweeping Wave 3: Delicate Echo Wave (1px) */}
            <path d="M -90 320 C 340 140, 710 460, 1160 240 C 1410 120, 1610 220, 1750 300" stroke="url(#waveGradPrimary)" strokeWidth="1" strokeLinecap="round" />

            {/* Counter Swirl Wave 4: Dynamic Bottom Ribbon (3px) */}
            <path d="M -100 780 C 400 940, 850 620, 1280 840 C 1480 940, 1620 860, 1750 800" stroke="url(#waveGradSecondary)" strokeWidth="3" strokeLinecap="round" />
            
            {/* Counter Swirl Wave 5: Lower Delicate Echo (1.5px dashed) */}
            <path d="M -60 740 C 430 900, 880 580, 1310 800 C 1510 900, 1650 820, 1750 760" stroke="url(#waveGradSecondary)" strokeWidth="1.5" strokeDasharray="8 10" strokeLinecap="round" />

            {/* Accent Glowing Center Line */}
            <path d="M -50 520 Q 800 380 1700 580" stroke="url(#waveGradAccent)" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
          </svg>
        </div>

        <div className="container relative-content">
          
          <div className="section-header">
            <div className="section-tag">Baudienstleistungen</div>
            <h2 className="section-title">
              Unsere Gewerke <span className="highlight-navy">im</span> <span className="highlight">Überblick.</span>
            </h2>
            <p className="section-intro">
              Von der Leckortung und Trocknung über Badsanierung bis hin zu Malerarbeiten und Sanierung.
            </p>
          </div>

          <div className="services-showcase-master">
            
            {/* Top Wide Service Card: Wasserschaden & Leckortung (Light Glass with subtle reddish tint, NO 24h badge) */}
            {servicesData.filter(s => s.slug === 'wasserschaden').map((service) => (
              <div key={service.slug} className="service-card-clean service-card-clean-wide service-card-reddish">
                
                {/* Watermark Photo Layer */}
                <div className="service-card-watermark-bg" aria-hidden="true">
                  <img 
                    src={`${r2Url}/nb/Elementbau-Auto01.webp`} 
                    alt="" 
                    className="service-card-watermark-img" 
                  />
                  <div className="service-card-watermark-overlay" />
                </div>

                <div className="service-wide-grid">
                  <div className="service-wide-col-left">
                    <div className="service-card-clean-header">
                      <div className="service-icon-clean icon-reddish">
                        <ShieldAlert size={24} />
                      </div>
                    </div>

                    <div className="service-card-clean-body">
                      <h3 className="card-clean-title">{service.title}</h3>
                      <p className="card-clean-desc">{service.cardShortDesc || service.shortDesc}</p>
                    </div>
                  </div>

                  <div className="service-wide-col-right">
                    {service.cardBullets && service.cardBullets.length > 0 && (
                      <ul className="service-clean-bullets">
                        {service.cardBullets.slice(0, 3).map((bullet, idx) => (
                          <li key={idx}>
                            <Check className="clean-bullet-icon" size={16} />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="service-wide-actions">
                      <Link to={`/leistungen/${service.slug}`} className="service-clean-action">
                        <span>Details ansehen</span>
                        <ArrowRight size={16} className="clean-action-arrow" />
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            ))}

            {/* 6 Balanced Light Glass Cards below */}
            <div className="services-grid-balanced-6">
              {servicesData.filter(s => s.slug !== 'wasserschaden').map((service) => (
                <div key={service.slug} className="service-card-clean">
                  
                  {/* Watermark Photo Layer */}
                  <div className="service-card-watermark-bg" aria-hidden="true">
                    <img 
                      src={`${r2Url}/nb/Elementbau-Auto01.webp`} 
                      alt="" 
                      className="service-card-watermark-img" 
                    />
                    <div className="service-card-watermark-overlay" />
                  </div>

                  <div className="service-card-clean-header">
                    <div className="service-icon-clean">
                      {service.slug === 'badsanierung' && <Sparkles size={24} />}
                      {service.slug === 'malerarbeiten' && <Paintbrush size={24} />}
                      {service.slug === 'renovierung-sanierung' && <Hammer size={24} />}
                      {service.slug === 'trockenbau' && <Wrench size={24} />}
                      {service.slug === 'sanitaerarbeiten' && <Droplets size={24} />}
                      {service.slug === 'kellerabdichtung' && <Waves size={24} />}
                    </div>
                  </div>

                  <div className="service-card-clean-body">
                    <h3 className="card-clean-title">{service.title}</h3>
                    <p className="card-clean-desc">{service.cardShortDesc || service.shortDesc}</p>
                    
                    {service.cardBullets && service.cardBullets.length > 0 && (
                      <ul className="service-clean-bullets">
                        {service.cardBullets.slice(0, 3).map((bullet, idx) => (
                          <li key={idx}>
                            <Check className="clean-bullet-icon" size={16} />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link to={`/leistungen/${service.slug}`} className="service-clean-action">
                      <span>Details ansehen</span>
                      <ArrowRight size={16} className="clean-action-arrow" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className="cta-banner">
            <div className="cta-text">
              <h3>Bereit für Ihr nächstes Projekt?</h3>
              <p>Rufen Sie uns direkt an unter <a href="tel:+4950219249870" className="cta-phone">05021 9249870</a> oder vereinbaren Sie online einen Termin. Wir beraten Sie gerne unverbindlich.</p>
            </div>
            <Link to="/kontakt" className="btn-solid">
              Projekt anfragen
              <ArrowRight className="arrow" />
            </Link>
          </div>

        </div>
      </section>

      {/* 3. GOOGLE REVIEWS SECTION WITH RICH DEEP NAVY BLUE AESTHETICS */}
      <section id="bewertungen" className="reviews-section">
        {/* Ambient Blue Atmosphere Layer */}
        <div className="reviews-ambient-bg" aria-hidden="true">
          <div className="reviews-glow-left" />
          <div className="reviews-glow-right" />
        </div>

        <div className="container relative-content">
          
          <div className="section-header center">
            <div className="section-tag center">Google Rezensionen</div>
            <h2 className="section-title">
              Was Kunden <span className="highlight-navy">über uns</span> <span className="highlight">sagen.</span>
            </h2>
            <p className="section-intro text-center">
              Echte Erfahrungen von Kunden aus Nienburg und der Region – von akuten Wasserschaden-Notfällen bis zu geplanten Sanierungen.
            </p>
          </div>

          <div className="reviews-grid">
            {googleReviews.map((rev, idx) => (
              <div className="review-card" key={idx}>
                <div className="review-header">
                  <div className="reviewer-avatar">
                    {rev.name.charAt(0)}
                  </div>
                  <div className="reviewer-meta">
                    <h3 className="reviewer-name">{rev.name}</h3>
                    <span className="review-type">{rev.type}</span>
                  </div>
                  <div className="google-icon-badge">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                      alt="Google Logo" 
                      className="google-svg" 
                    />
                  </div>
                </div>

                <div className="stars-row">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} className="star-filled" />
                  ))}
                  <span className="verified-badge">Verifizierte Bewertung</span>
                </div>

                <p className="review-text">"{rev.text}"</p>
              </div>
            ))}
          </div>

          {/* Google Trust CTA Bar */}
          <div className="google-trust-bar">
            <div className="trust-stars-total">
              <div className="google-g-wrap">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                  alt="Google" 
                  className="google-g-logo" 
                />
              </div>
              <div>
                <div className="rating-score">
                  <strong>5.0</strong>
                  <div className="stars-mini">
                    <Star size={14} className="star-filled" />
                    <Star size={14} className="star-filled" />
                    <Star size={14} className="star-filled" />
                    <Star size={14} className="star-filled" />
                    <Star size={14} className="star-filled" />
                  </div>
                </div>
                <span className="rating-count">100% Kundenzufriedenheit auf Google</span>
              </div>
            </div>

            <div className="trust-actions">
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-google-review"
              >
                <span>Alle Rezensionen ansehen</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 4. VERTRAUEN / WHY US SECTION */}
      <section id="vertrauen" className="why-us-section trust-section">
        <div className="container why-us-container">
          
          <div className="section-header center why-us-header">
            <div className="section-tag center">Verlässlichkeit & Qualität</div>
            <h2 className="section-title">
              Warum Kunden <span className="highlight">Elementbau vertrauen.</span>
            </h2>
            <p className="section-intro text-center">
              Wir verbinden langjährige Handwerkserfahrung mit moderner Technik, transparenter Kommunikation und absoluter Verlässlichkeit.
            </p>
          </div>

          <div className="trust-grid">
            
            <div className="trust-card card-negative">
              <h3 className="card-heading">Bei uns gibt es</h3>
              <ul className="trust-list">
                <li>
                  <span className="list-icon">
                    <X size={18} />
                  </span>
                  Keine versteckten Kosten
                </li>
                <li>
                  <span className="list-icon">
                    <X size={18} />
                  </span>
                  Keine unnötigen Verzögerungen
                </li>
                <li>
                  <span className="list-icon">
                    <X size={18} />
                  </span>
                  Keine halben Lösungen
                </li>
              </ul>
            </div>

            <div className="trust-card card-positive">
              <h3 className="card-heading">Sondern immer</h3>
              <ul className="trust-list">
                <li>
                  <span className="list-icon">
                    <Check size={18} />
                  </span>
                  Klare Prozesse & 24h-Erreichbarkeit
                </li>
                <li>
                  <span className="list-icon">
                    <Check size={18} />
                  </span>
                  Verlässliche Kostentransparenz
                </li>
                <li>
                  <span className="list-icon">
                    <Check size={18} />
                  </span>
                  Saubere, fachgerechte Ausführung
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 5. REFERENZEN & PROJEKTE SECTION (HIGH-END MODERN PROJECT SHOWCASE) */}
      <section id="projekte" className="references-section">
        <div className="container">
          
          <div className="ref-header center">
            <div className="section-tag center">Referenzen / Projekte</div>
            <h2 className="ref-title">
              Qualität, die <span className="highlight">man sieht.</span>
            </h2>
            <p className="ref-intro text-center">
              Ein kleiner Einblick in unsere tägliche Arbeit – von der Schadensbehebung über Badsanierung bis zum Innenausbau.
            </p>
          </div>

          {/* Category Filter: 3 on Top / 2 on Bottom on Desktop, Single 1-Line Swipe on Mobile */}
          <div className="project-filter-unified-track">
            {[
              { label: 'Alle Projekte', val: 'Alle' },
              { label: 'Wasserschaden & Trocknung', val: 'Wasserschaden & Trocknung' },
              { label: 'Badsanierung & Fliesen', val: 'Badsanierung' },
              { isBreak: true },
              { label: 'Maler & Trockenbau', val: 'Maler & Ausbau' },
              { label: 'Abdichtung & Montage', val: 'Abdichtung & Montage' }
            ].map((item, idx) => {
              if (item.isBreak) {
                return <div key="filter-break-line" className="filter-desktop-break" aria-hidden="true" />;
              }
              return (
                <button
                  key={item.val}
                  className={`btn-filter-pill ${activeFilter === item.val ? 'active' : ''}`}
                  onClick={() => { setActiveFilter(item.val); setVisibleCount(6); }}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Modern Clean Project Cards Grid (Max 6 visible by default) */}
          <div className="projects-modern-grid">
            {filteredProjects.slice(0, visibleCount).map((project, idx) => (
              <div 
                key={project.id} 
                className="project-showcase-card"
                onClick={() => setLightboxIndex(galleryProjects.findIndex(p => p.id === project.id))}
              >
                <div className="project-card-image-wrap">
                  <img 
                    src={project.image} 
                    alt={project.alt} 
                    className="project-card-img" 
                  />
                  <div className="project-card-zoom-btn">
                    <ZoomIn size={18} />
                  </div>
                </div>

                <div className="project-card-body">
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-desc">{project.desc}</p>
                  
                  <div className="project-card-footer">
                    <span className="project-view-link">
                      <span>Großansicht öffnen</span>
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button if more than 6 projects */}
          {filteredProjects.length > visibleCount && (
            <div className="load-more-projects-container">
              <button 
                className="btn-load-more-projects"
                onClick={() => setVisibleCount(prev => prev + 6)}
              >
                <span>Weitere Projekte anzeigen ({filteredProjects.length - visibleCount} weitere)</span>
                <ChevronDown size={18} />
              </button>
            </div>
          )}

          {/* FULLSCREEN LIGHTBOX MODAL */}
          <AnimatePresence>
            {lightboxIndex !== null && galleryProjects[lightboxIndex] && (
              <motion.div 
                className="gallery-lightbox-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setLightboxIndex(null)}
              >
                <div className="lightbox-content-wrap" onClick={(e) => e.stopPropagation()}>
                  <button 
                    className="lightbox-close-btn"
                    onClick={() => setLightboxIndex(null)}
                    aria-label="Schließen"
                  >
                    <X size={22} />
                  </button>

                  <button 
                    className="lightbox-arrow lightbox-arrow-prev"
                    onClick={() => setLightboxIndex((lightboxIndex - 1 + galleryProjects.length) % galleryProjects.length)}
                    aria-label="Vorheriges Bild"
                  >
                    <ChevronLeft size={26} />
                  </button>

                  <div className="lightbox-media-container">
                    <img 
                      src={galleryProjects[lightboxIndex].image} 
                      alt={galleryProjects[lightboxIndex].alt} 
                      className="lightbox-main-img" 
                    />
                    <div className="lightbox-caption">
                      <span className="lightbox-category-badge">{galleryProjects[lightboxIndex].category}</span>
                      <h3 className="lightbox-title">{galleryProjects[lightboxIndex].title}</h3>
                      <p className="lightbox-desc">{galleryProjects[lightboxIndex].desc}</p>
                    </div>
                  </div>

                  <button 
                    className="lightbox-arrow lightbox-arrow-next"
                    onClick={() => setLightboxIndex((lightboxIndex + 1) % galleryProjects.length)}
                    aria-label="Nächstes Bild"
                  >
                    <ChevronRight size={26} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="cta-block">
            <div className="cta-text-wrapper">
              <h3 className="cta-headline">Überzeugt von unserer Arbeit?</h3>
              <p className="cta-subtext">Lassen Sie uns gemeinsam Ihr nächstes Projekt realisieren. Schnell, sauber und zu fairen Konditionen.</p>
            </div>
            <Link to="/kontakt" className="btn-solid">
              Jetzt Projekt anfragen
              <ArrowRight className="arrow" />
            </Link>
          </div>

        </div>
      </section>

      
      {/* 6. ÜBER UNS SECTION (WITH DEEP NAVY PHILOSOPHY BOX) */}
      <section id="ueber-uns" className="about-section">
        <div className="container about-grid relative-content">
          
          <div className="about-content">
            <div className="section-tag">Das sind wir</div>
            
            <h2 className="about-title">
              <span className="about-title-blue">Jung. Dynamisch.</span><br />
              <span className="highlight">Handwerk mit Herz.</span>
            </h2>
            
            <p className="about-text">
              Hallo, ich bin Louis Gerber. Als junges Handwerksunternehmen aus Nienburg stehen wir für eine moderne Generation im Bauwesen: schnell erreichbar, lösungsorientiert und immer auf Augenhöhe mit unseren Kunden.
            </p>
            
            <p className="about-text">
              Ob akuter Wasserschaden mit 24h-Einsatz, Badsanierung oder umfassender Innenausbau – wir legen Wert auf ehrliche Arbeit, direkte Kommunikation und Ergebnisse, die sich sehen lassen können. Bei uns wissen Sie immer, wer auf Ihrer Baustelle arbeitet.
            </p>
            
            {/* Deep Navy Blue Philosophy Card with Orange Title and White Text */}
            <div className="claim-box about-claim-blue">
              <span className="claim-title claim-title-blue">Meine Philosophie</span>
              <p className="claim-text">
                "Gute Arbeit braucht kein langes Reden, sondern saubere Ausführung und ein klares Wort."
              </p>
            </div>

            <Link to="/bewerben" className="btn-solid">
              Werde Teil unseres Teams
              <ArrowRight className="arrow" />
            </Link>
          </div>

          <div className="image-container">
            <div className="image-wrapper about-image-wrapper-blue">
              <img 
                src={`${r2Url}/nb/Louis-Gerber_ergebnis.webp`} 
                alt="Portrait von Louis Gerber - Elementbau Nienburg" 
                className="profile-img" 
              />
            </div>
          </div>

        </div>
      </section>

      {/* 6.5. FULL-WIDTH DEEP NAVY CAREER SECTION (NO BOX/CARD - LARGE HEROIC PHOTO & CLEAN TYPOGRAPHY) */}
      <section id="karriere" className="career-full-section">
        {/* Ambient Glows */}
        <div className="career-ambient-glow glow-top-orange" aria-hidden="true" />
        <div className="career-ambient-glow glow-bottom-navy" aria-hidden="true" />

        <div className="container relative-content">
          <div className="career-full-grid">
            
            {/* Left Column: Clean, Highly Readable Content & Benefits */}
            <div className="career-text-col">
              <div className="career-section-eyebrow">
                <span className="pulse-dot-orange-sm" />
                <span>KARRIERE BEI ELEMENTBAU</span>
              </div>

              <h2 className="career-pro-title">
                Allrounder & Fliesenleger <span className="highlight">gesucht!</span>
              </h2>

              <p className="career-pro-desc">
                Du suchst echte Wertschätzung, eine 4-Tage-Woche, modernste Arbeitsbedingungen und ein starkes Team auf Augenhöhe? Bei Elementbau in Nienburg bieten wir dir das perfekte Umfeld für dein Handwerkstalent.
              </p>

              {/* Benefit List with crisp readability (No emojis) */}
              <ul className="career-pro-benefits">
                <li>
                  <div className="career-benefit-icon"><Check size={18} /></div>
                  <div className="career-benefit-info">
                    <strong className="benefit-title">4-Tage-Woche möglich:</strong>
                    <span className="benefit-detail">Mehr Freizeit, optimale Work-Life-Balance</span>
                  </div>
                </li>
                <li>
                  <div className="career-benefit-icon"><Check size={18} /></div>
                  <div className="career-benefit-info">
                    <strong className="benefit-title">Eigener Firmenwagen:</strong>
                    <span className="benefit-detail">Inklusive privater Nutzung & Tankkarte</span>
                  </div>
                </li>
                <li>
                  <div className="career-benefit-icon"><Check size={18} /></div>
                  <div className="career-benefit-info">
                    <strong className="benefit-title">Modernes Firmen-Smartphone:</strong>
                    <span className="benefit-detail">Neueste Gerätegeneration für deinen Alltag</span>
                  </div>
                </li>
                <li>
                  <div className="career-benefit-icon"><Check size={18} /></div>
                  <div className="career-benefit-info">
                    <strong className="benefit-title">Freie Profi-Werkzeugwahl:</strong>
                    <span className="benefit-detail">Du entscheidest, mit welchem Werkzeug du arbeiten willst</span>
                  </div>
                </li>
                <li>
                  <div className="career-benefit-icon"><Check size={18} /></div>
                  <div className="career-benefit-info">
                    <strong className="benefit-title">Überdurchschnittliche Bezahlung:</strong>
                    <span className="benefit-detail">Faire, leistungsgerechte Vergütung + Extras</span>
                  </div>
                </li>
              </ul>

              {/* Express CTA */}
              <div className="career-pro-actions">
                <Link to="/bewerben" className="btn-career-pro-main">
                  <span>Offene Stellen & 60s Express-Bewerbung</span>
                  <ArrowRight size={18} />
                </Link>
                <span className="career-sub-note">Kein Lebenslauf nötig • Bewerbung in unter 60 Sekunden</span>
              </div>
            </div>

            {/* Right Column: Majestic Large Team & Job Photo */}
            <div className="career-photo-col">
              <div className="career-large-photo-frame">
                <img 
                  src={`${r2Url}/nb/Elementbau-Auto01.webp`} 
                  alt="Elementbau Team Nienburg im Praxiseinsatz" 
                  className="career-large-img" 
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. FINAL CTA & EMERGENCY CONTACT SECTION */}
      <section className="final-cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="cta-content">
              
              <div className="section-tag">24h Soforthilfe & Anfrage</div>
              
              <h2 className="cta-title">
                Starten wir Ihr<br /><span className="highlight">Projekt.</span>
              </h2>
              
              <p className="cta-text">
                Sie haben einen akuten Wasserschaden oder planen einen Umbau?<br />
                Rufen Sie uns direkt an oder senden Sie uns Ihre unverbindliche Anfrage mit Schadensfotos.
              </p>

              <div className="contact-grid">
                <a href="tel:+4950219249870" className="contact-item item-emergency-final">
                  <div className="contact-icon">
                    <Phone size={20} />
                  </div>
                  <span className="contact-detail">05021 9249870 (24h Notruf)</span>
                </a>

                <a href="mailto:info@elementbau-ni.de" className="contact-item">
                  <div className="contact-icon">
                    <Mail size={20} />
                  </div>
                  <span className="contact-detail">info@elementbau-ni.de</span>
                </a>
              </div>

              <Link to="/kontakt" className="btn-solid">
                Jetzt Schaden / Projekt melden
                <ArrowRight className="arrow" />
              </Link>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
