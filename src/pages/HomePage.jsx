import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Check, X, Phone, Mail,
  Star, MessageSquare, CheckCircle2, ChevronLeft, ChevronRight, ZoomIn,
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
      image: `${r2Url}/heute-beim-kunden-im-einsatz-dawir-haben-den-alten-mutterboden-fachgerecht-ausgekoffert-und-die-WQru6cOqBraRgsDv.jpg`,
      title: 'Handwerk & Baudienstleistungen',
      tag: 'Team im Kundeneinsatz'
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

  // 3D Gallery Slider & Lightbox State
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

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
      location: 'Komplettbad Modernisierung',
      desc: 'Schlüsselfertiger Umbau mit barrierefreier Dusche und hochwertiger Sanitärausstattung.',
      image: `${r2Url}/nb/Bad-Sanieren_Elementbau.jpg`,
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
      title: 'Dachdämmung & Trockenbau',
      category: 'Energieeffizienz',
      location: 'Dachausbau & Isolierung',
      desc: 'Wärmedämmung und raumbildende Trockenbauwände.',
      image: `${r2Url}/pexels-introspectivedsgn-6124239-2kgBXEvUloO7d9EN.jpg`,
      alt: 'Dachdämmung und Isolierung'
    },
    {
      id: 8,
      title: 'Erdarbeiten & Mutterbodenaushub',
      category: 'Tiefbau & Sanierung',
      location: 'Nienburg (Weser)',
      desc: 'Fachgerechtes Auskoffern und Untergrundstabilisierung.',
      image: `${r2Url}/heute-beim-kunden-im-einsatz-dawir-haben-den-alten-mutterboden-fachgerecht-ausgekoffert-und-die-WQru6cOqBraRgsDv.jpg`,
      alt: 'Fachgerechte Erdarbeiten und Schadensbehebung'
    },
    {
      id: 9,
      title: 'Großbaustellen Fenstereinbau',
      category: 'Großprojekte',
      location: 'Gewerbe & Wohnbau',
      desc: 'Präzise Montage bei umfangreichen Gebäudeelementen.',
      image: `${r2Url}/diese-woche-starten-wir-eine-grapaere-baustelle-mit-home_innovation_bauelemente-neue-fenster-ro-1-BBwRqVvNfA3ccoHf.jpg`,
      alt: 'Großbaustelle Fenstermontage'
    }
  ];

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

  // Auto-advance 3D slider smoothly every 5 seconds (paused if hovered or lightbox open)
  useEffect(() => {
    if (isHovered || lightboxIndex !== null) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % galleryProjects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, lightboxIndex, activeSlide, galleryProjects.length]);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % galleryProjects.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + galleryProjects.length) % galleryProjects.length);

  const getSlidePositionClass = (index) => {
    const total = galleryProjects.length;
    let diff = (index - activeSlide + total) % total;
    if (diff > total / 2) diff -= total;

    if (diff === 0) return 'slide-active';
    if (diff === -1) return 'slide-prev';
    if (diff === 1) return 'slide-next';
    if (diff === -2) return 'slide-far-prev';
    if (diff === 2) return 'slide-far-next';
    return 'slide-hidden';
  };

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
      
      {/* 1. HERO SECTION WITH AUTHENTIC DRY-BRUSH STROKE & CENTERED BACKGROUND PHOTOS */}
      <section id="hero" className="hero-section hero-brush-split">
        
        {/* Right Half: Perfectly Centered Photo Slideshow */}
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
          {/* Subtle soft vignette on the right */}
          <div className="hero-slide-right-gradient" />
        </div>

        {/* Left Side: Deep #012444 Navy Painterly Block with Organic Brush Edge */}
        <div className="hero-navy-brush-block">
          
          {/* Authentic Painterly Brush SVG Edge */}
          <div className="hero-brush-edge-right" aria-hidden="true">
            <svg viewBox="0 0 200 900" preserveAspectRatio="none" className="brush-edge-svg">
              <defs>
                <filter id="paintBrushFilter" x="-20%" y="-10%" width="140%" height="120%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.045 0.09" numOctaves="4" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" result="displaced" />
                  <feMerge>
                    <feMergeNode in="displaced" />
                  </feMerge>
                </filter>
              </defs>

              {/* Main Paint Body with Brush Dispersion */}
              <g filter="url(#paintBrushFilter)">
                <path 
                  d="M0 0 H40 
                  C60 15 75 22 110 28 C140 34 175 42 150 50 C120 58 165 68 185 78 C155 88 135 98 165 110 
                  C140 122 180 135 160 148 C135 160 185 174 165 188 C145 200 175 214 145 228 C120 240 180 254 165 268 
                  C150 282 125 294 175 308 C195 320 145 334 165 348 C185 362 135 376 175 390 C195 404 140 418 165 432 
                  C185 446 130 460 170 474 C195 488 145 502 165 518 C185 532 135 546 175 560 C195 574 150 588 165 602 
                  C180 616 135 630 170 644 C195 658 140 672 165 686 C185 700 145 714 170 728 C195 742 150 756 165 770 
                  C180 784 135 798 165 812 C185 826 140 840 160 854 C175 868 130 882 150 894 C160 900 100 900 50 900 H0 Z" 
                  fill="#012444" 
                />
                {/* Horizontal Bristle Scratches */}
                <path d="M30 20 H165 M20 40 H185 M40 65 H175 M25 90 H190 M35 115 H170 M20 140 H185 M40 165 H175 M25 190 H190 M35 215 H170 M20 240 H185 M40 265 H175 M25 290 H190 M35 315 H170 M20 340 H185 M40 365 H175 M25 390 H190 M35 415 H170 M20 440 H185 M40 465 H175 M25 490 H190 M35 515 H170 M20 540 H185 M40 565 H175 M25 590 H190 M35 615 H170 M20 640 H185 M40 665 H175 M25 690 H190 M35 715 H170 M20 740 H185 M40 765 H175 M25 790 H190 M35 815 H170 M20 840 H185 M40 865 H175 M25 890 H180" stroke="#012444" strokeWidth="6" strokeLinecap="round" />
              </g>
              
              {/* Secondary Dry-Brush Layer with Fine Whiskers */}
              <g opacity="0.85">
                <path d="M120 35 Q170 38 190 40 M130 75 Q180 78 200 80 M110 120 Q165 124 185 126 M130 165 Q185 168 205 170 M115 210 Q170 214 190 216 M135 255 Q190 258 210 260 M120 300 Q175 304 195 306 M140 345 Q195 348 215 350 M125 390 Q180 394 200 396 M145 435 Q200 438 220 440 M130 480 Q185 484 205 486 M150 525 Q205 528 225 530 M135 570 Q190 574 210 576 M155 615 Q210 618 230 620 M140 660 Q195 664 215 666 M160 705 Q215 708 235 710 M145 750 Q200 754 220 756 M165 795 Q220 798 240 800 M150 840 Q205 844 225 846 M170 885 Q225 888 245 890" stroke="#012444" strokeWidth="3" strokeLinecap="round" />
                <path d="M140 45 Q180 48 198 50 M150 135 Q190 138 208 140 M145 225 Q185 228 203 230 M155 315 Q195 318 213 320 M150 405 Q190 408 208 410 M160 495 Q200 498 218 500 M155 585 Q195 588 213 590 M165 675 Q205 678 223 680 M160 765 Q200 768 218 770 M170 855 Q210 858 228 860" stroke="#012444" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
              </g>
            </svg>
          </div>

          <div className="container hero-container-brush">
            
            <motion.div 
              className="hero-brush-content"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Eyebrow badge */}
              <motion.div className="hero-insta-badge" variants={fadeUp}>
                <span className="pulse-dot-orange" />
                <span>24h Notdienst • Inh. Louis Gerber • Nienburg (Weser)</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1 className="hero-insta-title" variants={fadeUp}>
                SCHADENSSANIERUNG<br />
                & LECKORTUNG
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

      {/* 1.5. SCHADENSSANIERUNG & NOTDIENST (SEAMLESS 3-STEP FLOW) */}
      <section id="soforthilfe" className="soforthilfe-section">
        <div className="container">
          
          <div className="section-header center">
            <div className="section-tag center">3-Stufen Soforthilfe</div>
            <h2 className="section-title">
              Wasserschaden? <span className="highlight">Wir handeln sofort.</span>
            </h2>
            <p className="section-intro text-center">
              Von der zerstörungsfreien Ortung bis zur schlüsselfertigen Übergabe – schnell, transparent und fachgerecht.
            </p>
          </div>

          <div className="soforthilfe-grid-wrap">
            <div className="soforthilfe-process-track" />

            <div className="soforthilfe-grid">
              
              {/* Step 1 */}
              <div className="soforthilfe-card">
                <div className="soforthilfe-card-media">
                  <img 
                    src={`${r2Url}/nb/Elementbau-6_ergebnis.webp`} 
                    alt="Zerstörungsfreie Leckortung" 
                    className="soforthilfe-img" 
                  />
                  <div className="step-num-pill">1</div>
                </div>
                <div className="soforthilfe-card-body">
                  <h3 className="soforthilfe-card-title">Zerstörungsfreie Ortung</h3>
                  <p className="soforthilfe-card-desc">
                    Punktgenaue Lokalisierung des Rohrbruchs per Infrarot- und Akustikmesstechnik – ganz ohne unnötige Wandaufbrüche.
                  </p>
                  <ul className="soforthilfe-bullets">
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Ortung ohne Stemmarbeiten</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Schadensbericht für Versicherung</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 2 */}
              <div className="soforthilfe-card">
                <div className="soforthilfe-card-media">
                  <img 
                    src={`${r2Url}/nb/Elementbau-13_ergebnis.webp`} 
                    alt="Gezielte Bautrocknung" 
                    className="soforthilfe-img soforthilfe-img-step2" 
                  />
                  <div className="step-num-pill">2</div>
                </div>
                <div className="soforthilfe-card-body">
                  <h3 className="soforthilfe-card-title">Gezielte Bautrocknung</h3>
                  <p className="soforthilfe-card-desc">
                    Hocheffiziente Tiefenentfeuchtung von Estrich, Mauerwerk und Dämmschichten zur dauerhaften Schimmel-Prävention.
                  </p>
                  <ul className="soforthilfe-bullets">
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Tiefenentfeuchtung der Bausubstanz</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Lückenloses Messprotokoll</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 3 */}
              <div className="soforthilfe-card">
                <div className="soforthilfe-card-media">
                  <img 
                    src={`${r2Url}/nb/Elementbau-14_ergebnis.webp`} 
                    alt="Komplette Wiederherstellung" 
                    className="soforthilfe-img" 
                  />
                  <div className="step-num-pill">3</div>
                </div>
                <div className="soforthilfe-card-body">
                  <h3 className="soforthilfe-card-title">Komplette Sanierung</h3>
                  <p className="soforthilfe-card-desc">
                    Trockenbau, Fliesen- und Malerarbeiten aus einer Hand – sauber, fachgerecht und bezugsfertig übergeben.
                  </p>
                  <ul className="soforthilfe-bullets">
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Alle Gewerke nahtlos koordiniert</span>
                    </li>
                    <li>
                      <CheckCircle2 size={20} />
                      <span>Schlüsselfertig & bezugsfertig</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. LEISTUNGEN OVERVIEW SECTION */}
      <section id="leistungen" className="services-section">
        <div className="container">
          
          <div className="section-header">
            <div className="section-tag">Baudienstleistungen</div>
            <h2 className="section-title">
              Unsere Gewerke <span className="highlight">im Überblick.</span>
            </h2>
            <p className="section-intro">
              Von der Leckortung und Trocknung über Badsanierung bis hin zu Malerarbeiten und Sanierung.
            </p>
          </div>

          <div className="services-grid">
            {servicesData.map((service) => (
              <div key={service.slug} className="service-card-clean">
                <div className="service-card-clean-header">
                  <div className="service-icon-clean">
                    {service.slug === 'wasserschaden' && <ShieldAlert size={24} />}
                    {service.slug === 'badsanierung' && <Sparkles size={24} />}
                    {service.slug === 'malerarbeiten' && <Paintbrush size={24} />}
                    {service.slug === 'renovierung-sanierung' && <Hammer size={24} />}
                    {service.slug === 'trockenbau' && <Wrench size={24} />}
                    {service.slug === 'sanitaerarbeiten' && <Droplets size={24} />}
                    {service.slug === 'innenausbau' && <Home size={24} />}
                    {service.slug === 'kellerabdichtung' && <Waves size={24} />}
                  </div>
                  {service.slug === 'wasserschaden' && (
                    <span className="service-badge-emergency">24h Notdienst</span>
                  )}
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

      {/* 3. GOOGLE REVIEWS SECTION */}
      <section id="bewertungen" className="reviews-section">
        <div className="container">
          
          <div className="section-header center">
            <div className="section-tag center">Google Rezensionen</div>
            <h2 className="section-title">
              Was Kunden <span className="highlight">über uns sagen.</span>
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
                <span className="rating-sub">Bewertet auf Google</span>
              </div>
            </div>

            <a 
              href="https://search.google.com/local/writereview?placeid=ChIJvT4qfNTK04ARtbgIU5NoR5k" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-google-review"
            >
              <MessageSquare size={16} />
              <span>Jetzt Google-Bewertung abgeben</span>
            </a>
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

      {/* 5. REFERENZEN & PROJEKTE SECTION */}
      <section id="projekte" className="references-section">
        <div className="container">
          
          <div className="ref-header">
            <div className="section-tag">Referenzen / Projekte</div>
            <h2 className="ref-title">
              Qualität, die<br /><span className="highlight">man sieht.</span>
            </h2>
            <p className="ref-intro">
              Ein kleiner Einblick in unsere tägliche Arbeit – von der Schadensbehebung über Badsanierung bis zum Innenausbau.
            </p>
            <div className="claim-box">
              <p className="claim-text">
                Unsere Projekte stehen für handwerkliche Präzision, saubere Ausführung und zuverlässige Umsetzung.
              </p>
            </div>
          </div>

          {/* 3D Perspective Cover Flow Stage */}
          <div 
            className="perspective-carousel-wrapper"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="perspective-stage">
              {galleryProjects.map((project, idx) => {
                const posClass = getSlidePositionClass(idx);
                const isActive = idx === activeSlide;

                return (
                  <div 
                    key={project.id} 
                    className={`perspective-slide ${posClass}`}
                    onClick={() => {
                      if (!isActive) {
                        setActiveSlide(idx);
                      } else {
                        setLightboxIndex(idx);
                      }
                    }}
                  >
                    <div className="slide-card-inner">
                      <div className="slide-image-wrapper">
                        {/* Ambient blurred backdrop for portrait / custom aspect ratio shots */}
                        <img 
                          src={project.image} 
                          alt="" 
                          className="slide-img-blur-bg" 
                          aria-hidden="true" 
                        />

                        {/* Foreground sharp image (automatically adapts to any orientation) */}
                        <img 
                          src={project.image} 
                          alt={project.alt} 
                          className="slide-img" 
                        />

                        <div className="slide-badge-tag">
                          {project.category}
                        </div>

                        {isActive && (
                          <button 
                            className="slide-zoom-pill"
                            onClick={(e) => {
                              e.stopPropagation();
                              setLightboxIndex(idx);
                            }}
                            title="Großansicht öffnen"
                          >
                            <ZoomIn size={13} />
                            <span>Großansicht</span>
                          </button>
                        )}
                      </div>

                      <div className="slide-caption-bar">
                        <div className="slide-text-main">
                          <h3 className="slide-title">{project.title}</h3>
                          <p className="slide-location">{project.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slider Navigation & Dots Bar */}
            <div className="slider-controls-bar">
              <button 
                className="slider-nav-arrow" 
                onClick={prevSlide} 
                aria-label="Vorheriges Projekt"
              >
                <ChevronLeft size={22} />
              </button>

              <div className="slider-dots-container">
                {galleryProjects.map((_, dotIdx) => (
                  <button 
                    key={dotIdx} 
                    className={`slider-dot ${dotIdx === activeSlide ? 'active' : ''}`}
                    onClick={() => setActiveSlide(dotIdx)}
                    aria-label={`Gehe zu Projekt ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <button 
                className="slider-nav-arrow" 
                onClick={nextSlide} 
                aria-label="Nächstes Projekt"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

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

      {/* 6. ÜBER UNS SECTION */}
      <section id="ueber-uns" className="about-section">
        <div className="container about-grid">
          
          <div className="about-content">
            <div className="section-tag">Das sind wir</div>
            
            <h2 className="about-title">
              Jung. Dynamisch.<br /><span className="highlight">Handwerk mit Herz.</span>
            </h2>
            
            <p className="about-text">
              Hallo, ich bin Louis Gerber. Als junges Handwerksunternehmen aus Nienburg stehen wir für eine moderne Generation im Bauwesen: schnell erreichbar, lösungsorientiert und immer auf Augenhöhe mit unseren Kunden.
            </p>
            
            <p className="about-text">
              Ob akuter Wasserschaden mit 24h-Einsatz, Badsanierung oder umfassender Innenausbau – wir legen Wert auf ehrliche Arbeit, direkte Kommunikation und Ergebnisse, die sich sehen lassen können. Bei uns wissen Sie immer, wer auf Ihrer Baustelle arbeitet.
            </p>
            
            <div className="claim-box">
              <span className="claim-title">Meine Philosophie</span>
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
            <div className="image-wrapper">
              <img 
                src={`${r2Url}/nb/Louis-Gerber_ergebnis.webp`} 
                alt="Portrait von Louis Gerber - Elementbau Nienburg" 
                className="profile-img"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 6.5. HIGH-IMPACT CAREER TEASER SECTION */}
      <section className="career-teaser-section">
        <div className="container">
          <div className="career-teaser-card">
            <div className="career-teaser-content">
              <div className="career-teaser-tag">
                <span className="pulse-dot" />
                <span>Karriere bei Elementbau • Nienburg & Region</span>
              </div>
              <h2 className="career-teaser-title">
                Allrounder & Fliesenleger gesucht!
              </h2>
              <p className="career-teaser-desc">
                Du suchst eine 4-Tage-Woche, faire Bezahlung, Firmenwagen (auch privat nutzbar), frei wählbares Profi-Werkzeug und ein starkes Team auf Augenhöhe? Bewirb dich jetzt in unter 60 Sekunden ohne Lebenslauf.
              </p>
              <div className="career-teaser-pills">
                <span className="teaser-pill">📅 4-Tage-Woche</span>
                <span className="teaser-pill">🚗 Firmenwagen (auch privat)</span>
                <span className="teaser-pill">📱 Firmenhandy</span>
                <span className="teaser-pill">🛠️ Profi-Werkzeug frei wählbar</span>
              </div>
              <div className="career-teaser-actions">
                <Link to="/bewerben" className="btn-hero-primary btn-career-teaser">
                  <span>Offene Stellen & 60s Express-Bewerbung</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
            <div className="career-teaser-visual">
              <div className="teaser-photo-wrapper">
                <img 
                  src={`${r2Url}/heute-beim-kunden-im-einsatz-dawir-haben-den-alten-mutterboden-fachgerecht-ausgekoffert-und-die-WQru6cOqBraRgsDv.jpg`} 
                  alt="Elementbau Team im Einsatz" 
                  className="teaser-photo-img" 
                />
                <div className="teaser-badge-overlay">
                  <strong>2 offene Stellen</strong>
                  <span>4-Tage-Woche möglich</span>
                </div>
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
