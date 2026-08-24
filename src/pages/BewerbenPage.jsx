import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, Mail, CheckCircle2, Send, Loader2, ArrowRight, ArrowLeft, 
  Truck, Heart, Calendar, ShieldCheck, Clock, Award, Briefcase, 
  MapPin, Check, Sparkles, Wrench, Hammer, Paintbrush, Droplets,
  MessageCircle, Star, ChevronDown, UserCheck
} from 'lucide-react';
import './BewerbenPage.css';

const r2Url = 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Elementbau-Ni';


const careerHeroSlides = [
  {
    id: 1,
    image: `${r2Url}/heute-beim-kunden-im-einsatz-dawir-haben-den-alten-mutterboden-fachgerecht-ausgekoffert-und-die-WQru6cOqBraRgsDv.jpg`,
    alt: 'Elementbau Team im Praxiseinsatz'
  },
  {
    id: 2,
    image: `${r2Url}/nb/Elementbau-Auto01.webp`,
    alt: 'Elementbau Firmenwagen Flotte'
  },
  {
    id: 3,
    image: `${r2Url}/nb/Elementbau-9_ergebnis.webp`,
    alt: 'Fachgerechter Innenausbau'
  },
  {
    id: 4,
    image: `${r2Url}/nb/Elementbau-7_ergebnis.webp`,
    alt: 'Qualitätsausführung Elementbau'
  }
];

const jobsData = [
  {
    id: 'allrounder-sanierung',
    title: 'Allrounder für Wasserschäden, Kellerabdichtungen etc. gesucht! (m/w/d)',
    category: 'Schadenssanierung & Bautenschutz',
    type: '4-Tage-Woche oder Vollzeit • Unbefristet',
    location: 'Nienburg (Weser) & Region',
    icon: <Hammer size={24} />,
    description: 'Wir machen Schäden wieder gut! Schnell. Sauber. Zuverlässig. Als Allrounder übernimmst du abwechslungsreiche Aufgaben rund um Wasserschadensanierung, Leckortung, Bautrocknung und Kellerabdichtungen mit topmoderner Werkzeugausstattung.',
    tasks: [
      'Fachgerechte Wasserschadensanierung, Bautrocknung und Demontage vor Ort',
      'Unterstützung bei zerstörungsfreier Leckortung und Leitungsüberprüfungen',
      'Fachgerechte Kellerabdichtungen (innen & außen) sowie Feuchtigkeitsschutz',
      'Abwechslungsreiche Wiederherstellungs- und Ausbauarbeiten im Sanierungs- und Neubaubereich'
    ],
    requirements: [
      'Handwerkliches Geschick und Freude an abwechslungsreichen Projekten',
      'Zuverlässige, eigenständige und saubere Arbeitsweise im Team',
      'Führerschein Klasse B (Firmenwagen wird auch zur privaten Nutzung gestellt)'
    ],
    highlights: [
      '4-Tage-Woche (Mehr Freizeit. Mehr Leben.)',
      'Firmenwagen auch zur privaten Nutzung',
      'Firmenhandy auch zur privaten Nutzung',
      'Professionelles Werkzeug frei wählbar',
      'Arbeitskleidung wird gestellt',
      'Faire Bezahlung & sicherer Arbeitsplatz'
    ]
  },
  {
    id: 'fliesenleger',
    title: 'Fliesenleger gesucht! (m/w/d)',
    category: 'Fliesen & Badsanierung',
    type: '4-Tage-Woche oder Vollzeit • Unbefristet',
    location: 'Nienburg (Weser) & Region',
    icon: <Sparkles size={24} />,
    description: 'Werde Teil des Elementbau-Teams! Du liebst saubere Fugen, perfekte Kanten und hochwertige Bäder? Bei uns erwarten dich spannende Projekte im Sanierungs- und Neubaubereich mit bester Ausstattung und echter Wertschätzung.',
    tasks: [
      'Fachgerechtes Verlegen von Fliesen, Mosaik, Feinsteinzeug und Großformaten',
      'Komplette Badsanierungen und Sanierungsarbeiten nach Wasserschäden',
      'Untergrundvorbereitung, Verbundabdichtungen & professionelle Silikonierungsarbeiten',
      'Qualitätskontrolle und sauberes Baustellen-Finish'
    ],
    requirements: [
      'Erfahrung im Bereich Fliesen-, Platten- und Mosaiklegen',
      'Auge fürs Detail, Sorgfalt, Sauberkeit und Qualitätsbewusstsein',
      'Zuverlässigkeit, freundliches Auftreten und Teamgeist'
    ],
    highlights: [
      '4-Tage-Woche (Mehr Freizeit. Mehr Leben.)',
      'Firmenwagen auch zur privaten Nutzung',
      'Firmenhandy auch zur privaten Nutzung',
      'Hochwertige Profi-Werkzeuge & Maschinen',
      'Arbeitskleidung wird gestellt',
      'Faire Bezahlung & langfristige Perspektive'
    ]
  }
];

export default function BewerbenPage() {
  const [selectedJob, setSelectedJob] = useState('Allrounder für Wasserschäden, Kellerabdichtungen etc. gesucht! (m/w/d)');
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % careerHeroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);
  const [activeJobAccordion, setActiveJobAccordion] = useState('allrounder-sanierung');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    jobPosition: 'Allrounder für Wasserschäden, Kellerabdichtungen etc. gesucht! (m/w/d)',
    name: '',
    email: '',
    phone: '',
    location: '',
    experience: 'Mehrjährige Erfahrung im Handwerk',
    hasLicense: 'Ja (Klasse B vorhanden)',
    earliestStart: 'Sofort / Nach Absprache',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [turnstileToken, setTurnstileToken] = useState('');
  
  const turnstileRef = useRef(null);
  const widgetIdRef = useRef(null);
  const formSectionRef = useRef(null);

  // Auto-fill selected job in form state
  useEffect(() => {
    setFormData(prev => ({ ...prev, jobPosition: selectedJob }));
  }, [selectedJob]);

  // Turnstile script rendering
  useEffect(() => {
    let interval;

    const renderWidget = () => {
      if (step === 3 && turnstileRef.current && window.turnstile && !widgetIdRef.current) {
        try {
          turnstileRef.current.innerHTML = "";
          widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
            sitekey: '0x4AAAAAADYkqUkruymHstA5',
            callback: (token) => {
              setTurnstileToken(token);
              setStatus({ type: '', message: '' });
            },
            "expired-callback": () => setTurnstileToken(""),
            theme: "light",
          });
          if (interval) clearInterval(interval);
        } catch (e) {
          console.error("Turnstile render error:", e);
        }
      }
    };

    if (step === 3) {
      renderWidget();

      if (!widgetIdRef.current) {
        interval = setInterval(() => {
          if (window.turnstile) {
            renderWidget();
          }
        }, 100);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
      if (widgetIdRef.current && window.turnstile) {
        try { window.turnstile.remove(widgetIdRef.current); } catch (e) {}
        widgetIdRef.current = null;
      }
    };
  }, [step]);

  const scrollToForm = (jobTitle) => {
    if (jobTitle) {
      setSelectedJob(jobTitle);
    }
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextStep = () => {
    if (step === 1 && (!formData.name || !formData.phone)) {
      setStatus({ type: 'error', message: 'Bitte gib mindestens deinen Namen und deine Telefonnummer an.' });
      return;
    }
    setStatus({ type: '', message: '' });
    setStep(step + 1);
  };

  const prevStep = () => {
    setStatus({ type: '', message: '' });
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!turnstileToken) {
      setStatus({ type: 'error', message: 'Bitte bestätige den Spam-Schutz (CAPTCHA).' });
      return;
    }

    setStatus({ type: 'loading', message: 'Bewerbung wird sicher übertragen...' });

    try {
      const response = await fetch('https://friesescholzwebdesign.pages.dev/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          turnstileToken,
          source: 'elementbau-nienburg',
          formType: 'bewerbung'
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus({ type: 'success', message: 'Erfolgreich eingegangen!' });
        setStep(4);
      } else {
        setStatus({ type: 'error', message: data.message || 'Fehler beim Absenden. Bitte versuche es erneut oder rufe uns direkt an.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Netzwerkfehler. Bitte prüfe deine Internetverbindung.' });
    }
  };

  const benefitsList = [
    {
      icon: <Calendar size={26} />,
      title: '4-Tage-Woche',
      desc: 'Mehr Freizeit, mehr Leben: Genieße regelmäßige 3-Tage-Wochenenden für Familie, Hobbys und Erholung.'
    },
    {
      icon: <Truck size={26} />,
      title: 'Firmenwagen inkl. Privatnutzung',
      desc: 'Modernes Montagefahrzeug mit ergonomischem Ausbau – auf Wunsch auch für deine privaten Fahrten.'
    },
    {
      icon: <Award size={26} />,
      title: 'Faire Bezahlung & Wertschätzung',
      desc: 'Überdurchschnittliches Gehalt, pünktliche Auszahlung und Sonderprämien für deinen Einsatz.'
    },
    {
      icon: <Wrench size={26} />,
      title: 'Profi-Werkzeug frei wählbar',
      desc: 'Volle Profi-Ausstattung mit Hilti, Festool und modernster Messtechnik ohne Kompromisse.'
    },
    {
      icon: <Briefcase size={26} />,
      title: 'Firmenhandy & Arbeitskleidung',
      desc: 'Eigenes Smartphone (auch privat nutzbar) und hochwertige Arbeitskleidung werden komplett gestellt.'
    },
    {
      icon: <Heart size={26} />,
      title: 'Sicherer Arbeitsplatz & starkes Team',
      desc: 'Langfristige Perspektive in einem wachsenden Betrieb mit familiärem Zusammenhalt und flachen Hierarchien.'
    }
  ];

  return (
    <div className="career-page-root">
      
      {/* 1. HERO SECTION (EXACT HOMEPAGE PRO MAX BRUSH SPLIT ARCHITECTURE) */}
      <section className="hero-section hero-brush-split career-hero-split-master">
        {/* Right Half: Centered Photo Slideshow */}
        <div className="hero-slideshow-wrap" aria-hidden="true">
          {careerHeroSlides.map((slide, idx) => (
            <div 
              key={slide.id}
              className={`hero-slide-bg ${idx === activeSlide ? 'active' : ''}`}
            >
              <img 
                src={slide.image} 
                alt={slide.alt} 
                className="hero-slide-img-full" 
              />
              <div className="hero-slide-right-gradient" />
            </div>
          ))}
          <div className="hero-mobile-slide-dots">
            {careerHeroSlides.map((_, i) => (
              <span key={i} className={`hero-mobile-dot ${i === activeSlide ? 'active' : ''}`} />
            ))}
          </div>
        </div>

        {/* Left Half: Solid Deep Navy Block with Real Acrylic Brush Edge PNG */}
        <div className="hero-navy-brush-block">
          <img 
            src="/brush-edge-real.png" 
            alt="" 
            className="hero-brush-edge-real-png" 
            aria-hidden="true" 
          />

          <div className="hero-container-brush">
            <div className="hero-brush-content">
              
              {/* Eyebrow */}
              <div className="career-section-eyebrow">
                <span className="pulse-dot-orange-sm" />
                <span>KARRIERE BEI ELEMENTBAU NIENBURG</span>
              </div>

              {/* Title */}
              <h1 className="hero-insta-title">
                Handwerk mit Zukunft.<br />
                <span className="highlight">Werde Teil unseres Teams.</span>
              </h1>

              {/* Subline */}
              <p className="hero-insta-subline">
                4-Tage-Woche • Eigener Firmenwagen • Freie Werkzeugwahl • Nienburg
              </p>

              {/* Description quote with orange bar */}
              <div className="hero-insta-desc-box">
                <div className="insta-bar" />
                <p className="insta-text">
                  Du suchst echte Wertschätzung, modernste Maschinen und ein starkes Team auf Augenhöhe? Bei Elementbau bieten wir dir beste Bedingungen und langfristige Perspektiven für dein Handwerk.
                </p>
              </div>

              {/* 4 Circular Feature Icons */}
              <div className="hero-insta-features-grid">
                <div className="insta-feat-item">
                  <div className="insta-feat-icon"><Calendar size={22} /></div>
                  <span className="insta-feat-label">4-Tage-Woche</span>
                </div>
                <div className="insta-feat-item">
                  <div className="insta-feat-icon"><Truck size={22} /></div>
                  <span className="insta-feat-label">Firmenwagen</span>
                </div>
                <div className="insta-feat-item">
                  <div className="insta-feat-icon"><Wrench size={22} /></div>
                  <span className="insta-feat-label">Profi-Werkzeug</span>
                </div>
                <div className="insta-feat-item">
                  <div className="insta-feat-icon"><Award size={22} /></div>
                  <span className="insta-feat-label">Top Gehalt</span>
                </div>
              </div>

              {/* Hero Action Buttons */}
              <div className="hero-insta-actions">
                <button 
                  onClick={() => scrollToForm('Allrounder für Wasserschäden, Kellerabdichtungen etc. gesucht! (m/w/d)')} 
                  className="btn-hero-primary-insta"
                >
                  <span>In 60 Sekunden bewerben</span>
                  <ArrowRight size={18} />
                </button>

                <a href="#stellen" className="btn-hero-emergency-insta btn-hero-career-explore">
                  <span>Offene Stellen ansehen</span>
                  <ChevronDown size={18} />
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. WARUM ELEMENTBAU? (BENEFITS & VORTEILE) */}
      <section className="career-benefits-section">
        <div className="container">
          
          <div className="section-header center">
            <div className="section-tag center">Deine Vorteile bei uns</div>
            <h2 className="section-title">
              Warum es sich lohnt, <span className="highlight">bei uns zu arbeiten.</span>
            </h2>
            <p className="section-intro text-center">
              Wir wissen: Gute Arbeit entsteht nur unter besten Bedingungen. Deshalb bieten wir dir ein Arbeitsumfeld, das dir Sicherheit, Spaß und Freiraum gibt.
            </p>
          </div>

          <div className="benefits-grid-cards">
            {benefitsList.map((b, idx) => (
              <div className="benefit-feature-card" key={idx}>
                <div className="benefit-feature-icon">
                  {b.icon}
                </div>
                <h3 className="benefit-feature-title">{b.title}</h3>
                <p className="benefit-feature-desc">{b.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. OFFENE STELLEN (ÜBERSICHTLICH & DETAILLIERT) */}
      <section id="stellen" className="career-jobs-section">
        <div className="container">
          
          <div className="section-header center">
            <div className="section-tag center">Aktuelle Jobangebote</div>
            <h2 className="section-title">
              Offene Stellen in <span className="highlight">Nienburg & Region.</span>
            </h2>
            <p className="section-intro text-center">
              Finde die Position, die perfekt zu deinen Fähigkeiten und Zielen passt. Klicke auf eine Stelle für alle Details und bewirb dich direkt in 60 Sekunden.
            </p>
          </div>

          <div className="jobs-accordion-list">
            {jobsData.map((job) => {
              const isOpen = activeJobAccordion === job.id;
              
              return (
                <div className={`job-card-item ${isOpen ? 'active-job-card' : ''}`} key={job.id}>
                  
                  {/* Job Card Header */}
                  <div 
                    className="job-card-header"
                    onClick={() => setActiveJobAccordion(isOpen ? null : job.id)}
                  >
                    <div className="job-header-left">
                      <div className="job-icon-circle">
                        {job.icon}
                      </div>
                      <div>
                        <span className="job-category-tag">{job.category}</span>
                        <h3 className="job-title-text">{job.title}</h3>
                        <div className="job-meta-row">
                          <span className="meta-item"><Briefcase size={14} /> {job.type}</span>
                          <span className="meta-item"><MapPin size={14} /> {job.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="job-header-right">
                      <button 
                        className="btn-quick-select"
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToForm(job.title);
                        }}
                      >
                        <span>Direkt bewerben</span>
                        <ArrowRight size={15} />
                      </button>
                      <div className={`job-expand-arrow ${isOpen ? 'rotated' : ''}`}>
                        <ChevronDown size={22} />
                      </div>
                    </div>
                  </div>

                  {/* Job Details Accordion Body */}
                  {isOpen && (
                    <div className="job-card-body-expanded">
                      <p className="job-full-description">{job.description}</p>

                      <div className="job-details-columns">
                        
                        <div className="job-column-box">
                          <h4 className="column-sub-heading">Deine Aufgaben:</h4>
                          <ul className="job-bullets-list">
                            {job.tasks.map((task, tIdx) => (
                              <li key={tIdx}>
                                <Check size={16} className="task-bullet-icon" />
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="job-column-box">
                          <h4 className="column-sub-heading">Das bringst du mit:</h4>
                          <ul className="job-bullets-list">
                            {job.requirements.map((req, rIdx) => (
                              <li key={rIdx}>
                                <Check size={16} className="req-bullet-icon" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>

                      {/* Job Highlights Pill Row */}
                      <div className="job-highlights-bar">
                        <span className="highlights-label">Deine Top-Benefits:</span>
                        <div className="highlights-pills-wrap">
                          {job.highlights.map((hl, hIdx) => (
                            <span key={hIdx} className="hl-pill">{hl}</span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Action inside Job Card */}
                      <div className="job-card-bottom-action">
                        <button 
                          onClick={() => scrollToForm(job.title)}
                          className="btn-solid btn-apply-job-inside"
                        >
                          <Send size={16} />
                          <span>Auf diese Stelle bewerben</span>
                        </button>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. DER ROTE FADEN (DER 3-SCHRITTE-BEWERBUNGSABLAUF) */}
      <section className="career-process-section">
        <div className="container">
          
          <div className="section-header center">
            <div className="section-tag center">Der rote Faden</div>
            <h2 className="section-title">
              In 3 Schritten zu <span className="highlight">deinem neuen Job.</span>
            </h2>
            <p className="section-intro text-center">
              Keine komplizierten Bewerbungsmappen, kein langes Warten. Bei uns läuft alles unkompliziert, transparent und auf Augenhöhe ab.
            </p>
          </div>

          <div className="process-timeline-grid">
            
            <div className="process-step-card">
              <div className="process-step-badge">1</div>
              <div className="process-step-icon">
                <Send size={24} />
              </div>
              <h3 className="process-step-title">60-Sekunden Express-Bewerbung</h3>
              <p className="process-step-desc">
                Kein Anschreiben, kein Lebenslauf-Zwang. Fülle einfach unten unser kurzes Formular aus oder schreib uns eine kurze WhatsApp-Nachricht.
              </p>
              <div className="step-time-pill">Dauer: ca. 1 Minute</div>
            </div>

            <div className="process-step-card">
              <div className="process-step-badge">2</div>
              <div className="process-step-icon">
                <Phone size={24} />
              </div>
              <h3 className="process-step-title">Lockeres Kennenlernen</h3>
              <p className="process-step-desc">
                Wir melden uns innerhalb von 24–48 Stunden telefonisch bei dir für ein kurzes Telefonat und laden dich auf einen Kaffee zu uns ein.
              </p>
              <div className="step-time-pill">Schnelle Rückmeldung</div>
            </div>

            <div className="process-step-card">
              <div className="process-step-badge">3</div>
              <div className="process-step-icon">
                <UserCheck size={24} />
              </div>
              <h3 className="process-step-title">Probetag & Arbeitsvertrag</h3>
              <p className="process-step-desc">
                Fahr einen Tag mit auf die Baustelle, lerne dein Team kennen. Wenn es für beide Seiten passt, unterschreibst du direkt deinen festen Vertrag.
              </p>
              <div className="step-time-pill">Direkter Einstieg möglich</div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. TEAM-GALERIE & EINBLICKE IN DEN ALLTAG */}
      <section className="career-gallery-section">
        <div className="container">
          
          <div className="section-header center">
            <div className="section-tag center">Einblicke in den Alltag</div>
            <h2 className="section-title">
              Hier wird Qualität <span className="highlight">großgeschrieben.</span>
            </h2>
            <p className="section-intro text-center">
              Echte Eindrücke von unseren Baustellen in Nienburg: Von der Leckortung bis zur schlüsselfertigen Sanierung.
            </p>
          </div>

          <div className="career-photos-grid-3">
            <div className="career-grid-photo-card">
              <img 
                src={`${r2Url}/nb/Elementbau-7_ergebnis.webp`} 
                alt="Baustellen-Einsatz Elementbau" 
                className="gallery-grid-img" 
              />
              <div className="photo-card-caption">Moderne Ausführung vor Ort</div>
            </div>

            <div className="career-grid-photo-card">
              <img 
                src={`${r2Url}/d-abdichtung-im-eingangsbereich-erfolgreich-abgeschlossen-fa1-4r-unseren-kunden-easyfitness_nien-20C8pnOX78IJqO2c.jpg`} 
                alt="Kellerabdichtung und Bautrocknung" 
                className="gallery-grid-img" 
              />
              <div className="photo-card-caption">Abdichtung & Bautrocknung</div>
            </div>

            <div className="career-grid-photo-card">
              <img 
                src={`${r2Url}/schiebeta1-4r-einmal-neu-bitte-dy-dy-kann-sich-sehen-lassen-oder-home_innovation_bauelemente-JuPHcH6Zw7UI8kkj.jpg`} 
                alt="Innenausbau und Sanierung" 
                className="gallery-grid-img" 
              />
              <div className="photo-card-caption">Schlüsselfertiges Finish</div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. STATEMENT VON INHABER LOUIS GERBER */}
      <section className="career-statement-section">
        <div className="container statement-grid-box">
          
          <div className="statement-image-side">
            <div className="statement-portrait-wrap">
              <img 
                src={`${r2Url}/nb/Louis-Gerber_ergebnis.webp`} 
                alt="Louis Gerber - Inhaber Elementbau Nienburg" 
                className="statement-portrait-img" 
              />
            </div>
          </div>

          <div className="statement-text-side">
            <div className="section-tag">Ein Wort von Louis Gerber</div>
            <h2 className="statement-title">
              „Gute Arbeit funktioniert nur, wenn das Team gerne zusammenarbeitet.“
            </h2>
            <p className="statement-body">
              Hallo! Als Inhaber von Elementbau Nienburg ist mir eines besonders wichtig: Ein fairer, ehrlicher Umgang miteinander. Bei uns bist du keine Nummer im System, sondern ein geschätztes Teammitglied. Wenn du motiviert bist und verlässlich anpackst, bieten wir dir einen sicheren Arbeitsplatz mit Zukunft.
            </p>
            <p className="statement-signature">
              <strong>Louis Gerber</strong> • Inhaber Elementbau Nienburg
            </p>

            <div className="statement-direct-contacts">
              <a href="tel:+4950219249870" className="statement-contact-btn">
                <Phone size={16} />
                <span>05021 9249870</span>
              </a>
              <a href="https://wa.me/4950219249870" target="_blank" rel="noopener noreferrer" className="statement-contact-btn btn-wa">
                <MessageCircle size={16} />
                <span>Per WhatsApp schreiben</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 7. EXPRESS-BEWERBUNGSFORMULAR (#bewerben-form) */}
      <section id="bewerben-form" ref={formSectionRef} className="career-form-section">
        <div className="container career-form-container">
          
          <div className="section-header center">
            <div className="section-tag center">Express-Bewerbung</div>
            <h2 className="section-title">
              Jetzt in 60 Sekunden <span className="highlight">bewerben.</span>
            </h2>
            <p className="section-intro text-center">
              Fülle kurz die folgenden Felder aus. Wir melden uns innerhalb von 24–48 Stunden persönlich bei dir!
            </p>
          </div>

          <div className="apply-form-card-main">
            
            {/* Progress Bar Header */}
            {step < 4 && (
              <div className="form-progress-header">
                <div className="progress-steps-row">
                  <div className={`step-circle ${step >= 1 ? 'active' : ''}`}>1</div>
                  <div className={`step-connector-line ${step >= 2 ? 'active' : ''}`} />
                  <div className={`step-circle ${step >= 2 ? 'active' : ''}`}>2</div>
                  <div className={`step-connector-line ${step >= 3 ? 'active' : ''}`} />
                  <div className={`step-circle ${step >= 3 ? 'active' : ''}`}>3</div>
                </div>
                <div className="progress-step-text">
                  {step === 1 && "Schritt 1: Stelle & Kontaktdaten"}
                  {step === 2 && "Schritt 2: Erfahrung & Führerschein"}
                  {step === 3 && "Schritt 3: Zusammenfassung & Absenden"}
                </div>
              </div>
            )}

            {/* Step Form Body */}
            <AnimatePresence mode="wait">
              
              {/* STEP 1 */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="form-step-inner">
                    <h3 className="form-inner-title">Für welche Stelle möchtest du dich bewerben?</h3>

                    <div className="form-group">
                      <label htmlFor="jobPosition">Gewünschte Position *</label>
                      <select
                        id="jobPosition"
                        className="form-control form-select-custom"
                        value={formData.jobPosition}
                        onChange={(e) => setFormData({ ...formData, jobPosition: e.target.value })}
                      >
                        <option value="Allrounder für Wasserschäden, Kellerabdichtungen etc. gesucht! (m/w/d)">Allrounder für Wasserschäden, Kellerabdichtungen etc. (m/w/d)</option>
                        <option value="Fliesenleger gesucht! (m/w/d)">Fliesenleger (m/w/d)</option>
                        <option value="Initiativbewerbung (Allgemein)">Initiativbewerbung (Einfach anpacken)</option>
                      </select>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label htmlFor="name">Dein vollständiger Name *</label>
                        <input
                          type="text"
                          id="name"
                          required
                          className="form-control"
                          placeholder="z. B. Max Mustermann"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="phone">Deine Telefonnummer *</label>
                        <input
                          type="tel"
                          id="phone"
                          required
                          className="form-control"
                          placeholder="z. B. 0176 1234567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label htmlFor="email">Deine E-Mail-Adresse (Optional)</label>
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          placeholder="z. B. max@beispiel.de"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="location">Wohnort / Region</label>
                        <input
                          type="text"
                          id="location"
                          className="form-control"
                          placeholder="z. B. Nienburg (Weser)"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                      </div>
                    </div>

                    {status.message && (
                      <div className={`status-msg ${status.type}`}>{status.message}</div>
                    )}

                    <div className="form-buttons-row">
                      <button type="button" onClick={nextStep} className="btn-solid btn-step-next">
                        <span>Weiter zu Schritt 2</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="form-step-inner">
                    <h3 className="form-inner-title">Erfahrung & Vorkenntnisse</h3>

                    <div className="form-group">
                      <label>Wie viel Erfahrung hast du im Handwerk? *</label>
                      <div className="radio-grid-options">
                        {[
                          'Keine Vorkenntnisse (Motivierter Quereinsteiger)',
                          'Etwas Erfahrung (Helfertätigkeiten auf Baustellen)',
                          'Mehrjährige praktische Erfahrung im Handwerk',
                          'Abgeschlossene Fachausbildung / Gesellenbrief'
                        ].map((expOption) => (
                          <label 
                            key={expOption} 
                            className={`radio-box-item ${formData.experience === expOption ? 'selected' : ''}`}
                          >
                            <input
                              type="radio"
                              name="experience"
                              value={expOption}
                              checked={formData.experience === expOption}
                              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                            />
                            <span>{expOption}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>Besitzt du einen Führerschein (Klasse B)?</label>
                        <select
                          className="form-control"
                          value={formData.hasLicense}
                          onChange={(e) => setFormData({ ...formData, hasLicense: e.target.value })}
                        >
                          <option value="Ja (Klasse B vorhanden)">Ja, Klasse B vorhanden</option>
                          <option value="Ja (mit Anhänger BE)">Ja, Klasse BE (mit Anhänger)</option>
                          <option value="Nein (aktuell kein Führerschein)">Nein, aktuell kein Führerschein</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Wann könntest du frühestens starten?</label>
                        <select
                          className="form-control"
                          value={formData.earliestStart}
                          onChange={(e) => setFormData({ ...formData, earliestStart: e.target.value })}
                        >
                          <option value="Sofort / Sehr zeitnah">Sofort / Sehr zeitnah</option>
                          <option value="In 1 Monat (Kündigungsfrist)">In 1 Monat (Kündigungsfrist)</option>
                          <option value="In 2-3 Monaten">In 2–3 Monaten</option>
                          <option value="Nach Absprache">Nach flexibler Absprache</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Möchtest du uns noch etwas mitteilen? (Optional)</label>
                      <textarea
                        id="message"
                        className="form-control"
                        rows="3"
                        placeholder="Z. B. bisherige Schwerpunkte, besondere Fähigkeiten oder warum du Lust auf Elementbau hast..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <div className="form-buttons-row split">
                      <button type="button" onClick={prevStep} className="btn-subtle btn-step-back">
                        <ArrowLeft size={16} />
                        <span>Zurück</span>
                      </button>

                      <button type="button" onClick={nextStep} className="btn-solid btn-step-next">
                        <span>Weiter zu Schritt 3</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="form-step-inner">
                    <h3 className="form-inner-title">Fast geschafft – Zusammenfassung prüfen</h3>

                    <div className="application-summary-card">
                      <div className="summary-row">
                        <span className="summary-label">Stelle:</span>
                        <strong className="summary-value highlight-job">{formData.jobPosition}</strong>
                      </div>
                      <div className="summary-row">
                        <span className="summary-label">Name:</span>
                        <span className="summary-value">{formData.name}</span>
                      </div>
                      <div className="summary-row">
                        <span className="summary-label">Telefon:</span>
                        <span className="summary-value">{formData.phone}</span>
                      </div>
                      <div className="summary-row">
                        <span className="summary-label">Erfahrung:</span>
                        <span className="summary-value">{formData.experience}</span>
                      </div>
                      <div className="summary-row">
                        <span className="summary-label">Führerschein:</span>
                        <span className="summary-value">{formData.hasLicense}</span>
                      </div>
                    </div>

                    {/* Turnstile Container */}
                    <div className="cf-turnstile-wrapper">
                      <div ref={turnstileRef} className="cf-turnstile"></div>
                    </div>

                    {status.message && (
                      <div className={`status-msg ${status.type}`}>{status.message}</div>
                    )}

                    <div className="form-buttons-row split">
                      <button 
                        type="button" 
                        onClick={prevStep} 
                        className="btn-subtle btn-step-back" 
                        disabled={status.type === 'loading'}
                      >
                        <ArrowLeft size={16} />
                        <span>Zurück</span>
                      </button>

                      <button 
                        type="button" 
                        onClick={handleSubmit} 
                        className="btn-solid btn-step-next submit-action-btn"
                        disabled={status.type === 'loading'}
                      >
                        {status.type === 'loading' ? (
                          <>
                            <Loader2 className="animate-spin" size={18} />
                            <span>Bewerbung wird gesendet...</span>
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            <span>Bewerbung jetzt absenden</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: SUCCESS CONFIRMATION */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="apply-success-box"
                >
                  <div className="success-icon-big">
                    <CheckCircle2 size={64} />
                  </div>
                  <h3 className="success-heading">Bewerbung erfolgreich eingegangen!</h3>
                  <p className="success-subheading">
                    Vielen Dank für dein Vertrauen, <strong>{formData.name.split(' ')[0]}</strong>! Wir haben deine Angaben sicher erhalten.
                  </p>

                  <div className="success-steps-guide">
                    <h4>So geht es jetzt weiter:</h4>
                    <ol>
                      <li><strong>Kurze Durchsicht:</strong> Louis Gerber sichtet deine Angaben persönlich innerhalb von 24–48 Stunden.</li>
                      <li><strong>Kurzer Anruf:</strong> Wir rufen dich kurz an, um ein unkompliziertes Telefonat zu führen.</li>
                      <li><strong>Kennenlernen & Probetag:</strong> Wir laden dich zu uns ein, damit du das Team kennenlernen kannst.</li>
                    </ol>
                  </div>

                  <div className="success-cta-row">
                    <a href="/" className="btn-solid">
                      Zurück zur Startseite
                    </a>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>
      </section>

    </div>
  );
}
