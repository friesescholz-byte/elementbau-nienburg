import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Loader2 } from 'lucide-react';
import './KontaktPage.css';

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Wasserschaden & Leckortung',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [turnstileToken, setTurnstileToken] = useState('');
  
  const turnstileRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    let interval;

    const renderWidget = () => {
      if (turnstileRef.current && window.turnstile && !widgetIdRef.current) {
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

    renderWidget();

    // Falls API noch lädt, kurz pollen
    if (!widgetIdRef.current) {
      interval = setInterval(() => {
        if (window.turnstile) {
          renderWidget();
        }
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (widgetIdRef.current && window.turnstile) {
        try { window.turnstile.remove(widgetIdRef.current); } catch (e) {}
        widgetIdRef.current = null;
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!turnstileToken) {
      setStatus({ type: 'error', message: 'Bitte bestätigen Sie den Spam-Schutz (CAPTCHA).' });
      return;
    }

    setStatus({ type: 'loading', message: 'Ihre Anfrage wird gesendet...' });

    try {
      const response = await fetch('https://friesescholzwebdesign.pages.dev/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          turnstileToken,
          source: 'elementbau-nienburg',
          formType: 'kontakt'
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus({ type: 'success', message: 'Vielen Dank! Ihre Projektanfrage wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.' });
        setFormData({ name: '', email: '', phone: '', projectType: 'Wasserschaden & Leckortung', message: '' });
        // Reset turnstile
        if (window.turnstile) {
          window.turnstile.reset();
          setTurnstileToken('');
        }
      } else {
        setStatus({ type: 'error', message: data.message || 'Beim Senden Ihrer E-Mail ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Netzwerkfehler. Bitte prüfen Sie Ihre Verbindung und versuchen Sie es erneut.' });
    }
  };

  const projectTypes = [
    'Wasserschaden & Leckortung',
    'Trockenbau & Innenausbau',
    'Altbausanierung & Renovierung',
    'Kellerabdichtung',
    'Badsanierung',
    'Sonstiges Anliegen'
  ];

  return (
    <div className="contact-page-wrapper">
      <section className="contact-hero">
        <div className="container contact-grid-page">
          
          {/* Info Side */}
          <div className="contact-info-side">
            <div className="section-tag">Direkter Kontakt</div>
            <h1 className="contact-main-title">
              Lassen Sie uns über Ihr <span className="highlight">Projekt sprechen.</span>
            </h1>
            <p className="contact-intro-text">
              Egal ob Sie eine umfassende Altbausanierung planen, einen akuten Wasserschaden beheben müssen oder Unterstützung beim Trockenbau benötigen – wir sind für Sie da. Füllen Sie einfach das Formular aus oder kontaktieren Sie uns direkt.
            </p>

            <div className="contact-details-box">
              <div className="detail-card">
                <div className="detail-icon">
                  <Phone size={24} />
                </div>
                <div className="detail-text">
                  <h3>Rufen Sie uns an</h3>
                  <a href="tel:+4950219249870" className="detail-link">05021 9249870</a>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">
                  <Mail size={24} />
                </div>
                <div className="detail-text">
                  <h3>Schreiben Sie uns</h3>
                  <a href="mailto:info@elementbau-ni.de" className="detail-link">info@elementbau-ni.de</a>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">
                  <MapPin size={24} />
                </div>
                <div className="detail-text">
                  <h3>Standort</h3>
                  <p className="detail-val">Auf dem Kampe 6a, 31582 Nienburg (Weser)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="contact-form-side">
            <div className="contact-card">
              <h2 className="form-card-title">Projektanfrage senden</h2>
              <p className="form-card-sub">Kostenlos und unverbindlich</p>

              <form onSubmit={handleSubmit} className="contact-react-form">
                
                <div className="form-group">
                  <label htmlFor="name">Vollständiger Name *</label>
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

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="email">E-Mail-Adresse *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="form-control"
                      placeholder="name@beispiel.de"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Telefonnummer *</label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      className="form-control"
                      placeholder="z. B. 0172 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="projectType">Gewünschtes Gewerk / Projektart *</label>
                  <select
                    id="projectType"
                    className="form-control select-control"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Beschreiben Sie Ihr Anliegen *</label>
                  <textarea
                    id="message"
                    required
                    className="form-control"
                    placeholder="Bitte beschreiben Sie kurz, worum es bei Ihrem Projekt geht, z. B. Maße, Dringlichkeit oder besondere Wünsche."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {/* Turnstile Container */}
                <div className="cf-turnstile-wrapper">
                  <div ref={turnstileRef} className="cf-turnstile"></div>
                </div>

                <button 
                  type="submit" 
                  className="btn-solid submit-btn" 
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
                      <span>Anfrage absenden</span>
                    </>
                  )}
                </button>

                {status.message && (
                  <div className={`status-msg ${status.type}`}>
                    {status.message}
                  </div>
                )}

              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
