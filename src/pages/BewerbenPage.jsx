import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, Mail, CheckCircle2, User, Send, Loader2, ArrowRight, ArrowLeft, Trophy, Calendar, Truck, Heart, Droplets 
} from 'lucide-react';
import './BewerbenPage.css';

export default function BewerbenPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: 'Keine Vorkenntnisse',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [turnstileToken, setTurnstileToken] = useState('');
  
  const turnstileRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    let interval;

    const renderWidget = () => {
      if (step === 3 && turnstileRef.current && window.turnstile && !widgetIdRef.current) {
        try {
          // 1. Container zwingend leeren, um StrictMode-Doppelrender-Fehler zu vermeiden!
          turnstileRef.current.innerHTML = "";
          
          // 2. Widget rendern
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

      // Falls API noch lädt, kurz pollen
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

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!turnstileToken) {
      setStatus({ type: 'error', message: 'Bitte bestätigen Sie den Spam-Schutz (CAPTCHA).' });
      return;
    }

    setStatus({ type: 'loading', message: 'Bewerbung wird gesendet...' });

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
        setStatus({ type: 'success', message: 'Erfolgreich abgesendet! Vielen Dank für deine Bewerbung. Wir melden uns innerhalb von 48 Stunden telefonisch bei dir!' });
        setFormData({ name: '', email: '', phone: '', experience: 'Keine Vorkenntnisse', message: '' });
        setStep(4); // Success step
      } else {
        setStatus({ type: 'error', message: data.message || 'Fehler beim Absenden der Bewerbung. Bitte versuche es erneut.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Netzwerkfehler. Bitte prüfe deine Internetverbindung.' });
    }
  };

  const nextStep = () => {
    if (step === 1 && (!formData.name || !formData.email || !formData.phone)) {
      setStatus({ type: 'error', message: 'Bitte fülle alle Pflichtfelder aus.' });
      return;
    }
    setStatus({ type: '', message: '' });
    setStep(step + 1);
  };

  const prevStep = () => {
    setStatus({ type: '', message: '' });
    setStep(step - 1);
  };

  const benefits = [
    {
      title: 'Sichere Arbeit',
      desc: 'Nachhaltige Lösungen gegen Feuchtigkeit und Nässe.',
      icon: <Droplets size={24} />
    },
    {
      title: 'Zukunft mit Perspektive',
      desc: 'Ein starkes Team und spannende, abwechslungsreiche Projekte.',
      icon: <Trophy size={24} />
    },
    {
      title: 'Wertschätzung',
      desc: 'Faire Bezahlung, offene Kommunikation und ein respektvolles Miteinander.',
      icon: <Heart size={24} />
    },
    {
      title: 'Firmenfahrzeug',
      desc: 'Modernes Montagefahrzeug mit optionaler Privatnutzung.',
      icon: <Truck size={24} />
    },
    {
      title: '4-Tage-Woche',
      desc: 'Mehr Zeit für Familie, Hobbys und das, was wirklich zählt.',
      icon: <Calendar size={24} />
    }
  ];

  return (
    <div className="apply-page-wrapper">
      <section className="apply-section-page">
        <div className="container apply-grid-page">
          
          {/* Left Side: Text and Benefits */}
          <div className="apply-info-side">
            <div className="section-tag">Werde Teil unseres Teams!</div>
            <h1 className="apply-main-title">
              Mitarbeiter <span className="highlight">gesucht!</span>
            </h1>
            <h2 className="apply-sub-title">Für das Abdichten von Kellern & Trockenbau</h2>
            
            <p className="apply-intro">
              Wir suchen engagierte Verstärkung für unsere Baustellen im Bereich Kellerabdichtung und Trockenbau. Du musst kein Meister sein – wichtig ist, dass du anpacken kannst und Lust auf ein großartiges Team hast!
            </p>

            <div className="apply-benefits-list">
              {benefits.map((benefit, index) => (
                <div className="apply-benefit-card" key={index}>
                  <div className="benefit-icon-box">
                    {benefit.icon}
                  </div>
                  <div className="benefit-card-content">
                    <h3>{benefit.title}</h3>
                    <p>{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="apply-contact-box">
              <h3>Schneller Draht zu uns</h3>
              <p>Keine Lust auf Formulare? Ruf uns einfach an oder schreib uns eine E-Mail – ganz unkompliziert.</p>
              <div className="box-links">
                <a href="tel:+4950219249870" className="box-link">
                  <Phone size={16} />
                  <span>05021 9249870</span>
                </a>
                <a href="mailto:info@elementbau-ni.de" className="box-link">
                  <Mail size={16} />
                  <span>info@elementbau-ni.de</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Step-by-Step Interactive Form */}
          <div className="apply-form-side">
            <div className="apply-form-card">
              
              {/* Progress Indicator */}
              {step < 4 && (
                <div className="progress-bar-wrapper">
                  <div className="progress-bar-steps">
                    <span className={`step-dot ${step >= 1 ? 'active' : ''}`}>1</span>
                    <span className="step-bar-line"></span>
                    <span className={`step-dot ${step >= 2 ? 'active' : ''}`}>2</span>
                    <span className="step-bar-line"></span>
                    <span className={`step-dot ${step >= 3 ? 'active' : ''}`}>3</span>
                  </div>
                  <div className="step-label">
                    {step === 1 && "Schritt 1: Kontaktinformationen"}
                    {step === 2 && "Schritt 2: Erfahrung & Motivation"}
                    {step === 3 && "Schritt 3: Absenden & Spamschutz"}
                  </div>
                </div>
              )}

              {/* Form Content */}
              <AnimatePresence mode="wait">
                
                {/* STEP 1: Kontaktdaten */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="form-step-title">Deine Kontaktdaten</h3>
                    <p className="form-step-desc">Wie können wir dich erreichen?</p>

                    <div className="form-group">
                      <label htmlFor="name">Dein vollständiger Name *</label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="form-control"
                        placeholder="z. B. Christian Schmidt"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Deine E-Mail-Adresse *</label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="form-control"
                        placeholder="beispiel@mail.de"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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

                    {status.message && (
                      <div className={`status-msg ${status.type}`}>{status.message}</div>
                    )}

                    <button type="button" onClick={nextStep} className="btn-solid apply-next-btn">
                      <span>Weiter zum nächsten Schritt</span>
                      <ArrowRight size={18} />
                    </button>
                  </motion.div>
                )}

                {/* STEP 2: Erfahrung */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="form-step-title">Erfahrung & Kenntnisse</h3>
                    <p className="form-step-desc">Erzähl uns kurz etwas über dich.</p>

                    <div className="form-group">
                      <label>Wie viel Erfahrung hast du im Handwerk? *</label>
                      <div className="radio-group">
                        {[
                          'Keine Vorkenntnisse (Quereinsteiger)',
                          'Etwas Erfahrung (Helfertätigkeit)',
                          'Mehrjährige Erfahrung im Bauhandwerk',
                          'Abgeschlossene Ausbildung (Maurer, Trockenbauer, etc.)'
                        ].map((expOption) => (
                          <label key={expOption} className={`radio-label ${formData.experience === expOption ? 'selected' : ''}`}>
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

                    <div className="form-group">
                      <label htmlFor="message">Warum möchtest du in unser Team? (Optional)</label>
                      <textarea
                        id="message"
                        className="form-control"
                        placeholder="Schreibe uns kurz auf, warum du Lust auf diesen Job hast oder was du bisher gemacht hast."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <div className="step-button-group">
                      <button type="button" onClick={prevStep} className="btn-subtle back-btn">
                        <ArrowLeft size={16} />
                        <span>Zurück</span>
                      </button>

                      <button type="button" onClick={nextStep} className="btn-solid next-btn-right">
                        <span>Weiter</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Spamschutz & Absenden */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="form-step-title">Bewerbung absenden</h3>
                    <p className="form-step-desc">Bitte bestätige den Spamschutz, um deine Bewerbung sicher zu übertragen.</p>

                    <div className="apply-summary-box">
                      <h4>Zusammenfassung:</h4>
                      <p><strong>Name:</strong> {formData.name}</p>
                      <p><strong>Telefon:</strong> {formData.phone}</p>
                      <p><strong>Erfahrung:</strong> {formData.experience}</p>
                    </div>

                    {/* Turnstile Container */}
                    <div className="cf-turnstile-wrapper">
                      <div ref={turnstileRef} className="cf-turnstile"></div>
                    </div>

                    {status.message && (
                      <div className={`status-msg ${status.type}`}>{status.message}</div>
                    )}

                    <div className="step-button-group">
                      <button type="button" onClick={prevStep} className="btn-subtle back-btn" disabled={status.type === 'loading'}>
                        <ArrowLeft size={16} />
                        <span>Zurück</span>
                      </button>

                      <button 
                        type="button" 
                        onClick={handleSubmit} 
                        className="btn-solid next-btn-right submit-btn-apply"
                        disabled={status.type === 'loading'}
                      >
                        {status.type === 'loading' ? (
                          <>
                            <Loader2 className="animate-spin" size={18} />
                            <span>Wird gesendet...</span>
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            <span>Jetzt bewerben</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Success */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease }}
                    className="apply-success-step"
                  >
                    <div className="success-icon-wrapper">
                      <CheckCircle2 size={60} />
                    </div>
                    <h3 className="success-title-main">Bewerbung eingegangen!</h3>
                    <p className="success-desc-main">
                      Vielen Dank für dein Interesse, {formData.name.split(' ')[0]}! Wir haben deine Daten erfolgreich erhalten.
                    </p>
                    <div className="success-next-steps">
                      <h4>So geht es jetzt weiter:</h4>
                      <ol>
                        <li>Wir sichten deine Angaben (dauert meist weniger als 24 Stunden).</li>
                        <li>Wir rufen dich kurz an, um ein erstes kurzes Telefonat zu führen.</li>
                        <li>Wir vereinbaren ein Treffen zum gegenseitigen Kennenlernen bei uns vor Ort.</li>
                      </ol>
                    </div>
                    <a href="/" className="btn-solid back-home-btn">
                      Zurück zur Startseite
                    </a>
                  </motion.div>
                )}

              </AnimatePresence>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
