import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Loader2, UploadCloud, Image as ImageIcon, X, AlertTriangle, ShieldCheck } from 'lucide-react';
import './KontaktPage.css';

export default function KontaktPage() {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');

  const projectTypes = [
    'Wasserschaden & Leckortung',
    'Badsanierung',
    'Maler- & Spachtelarbeiten',
    'Renovierung & Sanierung',
    'Trockenbau',
    'Sanitärarbeiten',
    'Innenausbau',
    'Kellerabdichtung & Feuchtigkeitsschutz',
    'Sonstiges / Allgemeines Anliegen'
  ];

  // Match initial service from query param if available
  const getInitialProjectType = () => {
    if (!serviceParam) return 'Wasserschaden & Leckortung';
    const match = projectTypes.find(p => p.toLowerCase().includes(serviceParam.toLowerCase()) || serviceParam.toLowerCase().includes(p.toLowerCase()));
    return match || 'Wasserschaden & Leckortung';
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: getInitialProjectType(),
    message: ''
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [turnstileToken, setTurnstileToken] = useState('');
  
  const turnstileRef = useRef(null);
  const widgetIdRef = useRef(null);
  const fileInputRef = useRef(null);

  // Sync service from URL if it changes
  useEffect(() => {
    if (serviceParam) {
      const match = projectTypes.find(p => p.toLowerCase().includes(serviceParam.toLowerCase()) || serviceParam.toLowerCase().includes(p.toLowerCase()));
      if (match) {
        setFormData(prev => ({ ...prev, projectType: match }));
      }
    }
  }, [serviceParam]);

  useEffect(() => {
    let interval;

    const renderWidget = () => {
      if (turnstileRef.current && window.turnstile && !widgetIdRef.current) {
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

    renderWidget();

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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedFiles.length > 5) {
      setStatus({ type: 'error', message: 'Maximal 5 Fotos können gleichzeitig angehängt werden.' });
      return;
    }

    // Check size (< 10MB per file)
    const validFiles = files.filter(f => f.size <= 10 * 1024 * 1024);
    if (validFiles.length < files.length) {
      setStatus({ type: 'error', message: 'Einige Dateien überschreiten das Limit von 10 MB.' });
    }

    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (indexToRemove) => {
    setSelectedFiles(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!turnstileToken) {
      setStatus({ type: 'error', message: 'Bitte bestätigen Sie den Spam-Schutz (CAPTCHA).' });
      return;
    }

    setStatus({ type: 'loading', message: 'Ihre Anfrage wird gesendet...' });

    try {
      const fileNames = selectedFiles.map(f => f.name).join(', ');
      const payloadMessage = selectedFiles.length > 0 
        ? `${formData.message}\n\n[Angehängte Fotos: ${selectedFiles.length} Datei(en): ${fileNames}]`
        : formData.message;

      const response = await fetch('https://friesescholzwebdesign.pages.dev/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData,
          message: payloadMessage,
          fileCount: selectedFiles.length,
          turnstileToken,
          source: 'elementbau-nienburg',
          formType: 'kontakt'
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus({ 
          type: 'success', 
          message: 'Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns schnellstmöglich bei Ihnen.' 
        });
        setFormData({ name: '', email: '', phone: '', projectType: 'Wasserschaden & Leckortung', message: '' });
        setSelectedFiles([]);
        if (window.turnstile) {
          window.turnstile.reset();
          setTurnstileToken('');
        }
      } else {
        setStatus({ type: 'error', message: data.message || 'Beim Senden ist ein Fehler aufgetreten. Bitte rufen Sie uns direkt an.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Netzwerkfehler. Bitte prüfen Sie Ihre Verbindung oder rufen Sie uns direkt an.' });
    }
  };

  const isEmergencyType = formData.projectType.includes('Wasserschaden');

  return (
    <div className="contact-page-wrapper">
      <section className="contact-hero">
        <div className="container contact-grid-page">
          
          {/* Info Side */}
          <div className="contact-info-side">
            <div className="section-tag">Direkter Kontakt</div>
            <h1 className="contact-main-title">
              Projekt oder <span className="highlight">Schaden melden.</span>
            </h1>
            <p className="contact-intro-text">
              Egal ob akuter Wasserschaden mit Notdienst, geplante Badsanierung oder Trockenbau: Wir beraten Sie persönlich, transparent und fair. Senden Sie uns hier Ihre Anfrage oder rufen Sie uns direkt an.
            </p>

            {/* Emergency Hotline Box */}
            <div className="contact-emergency-banner">
              <div className="emergency-banner-icon">
                <AlertTriangle size={24} />
              </div>
              <div className="emergency-banner-text">
                <h3>Akuter Notfall?</h3>
                <p>Bei laufendem Wasseraustritt empfehlen wir den sofortigen Anruf:</p>
                <a href="tel:+4950219249870" className="emergency-call-anchor">
                  <Phone size={16} /> 05021 9249870 (24h Notruf)
                </a>
              </div>
            </div>

            <div className="contact-details-box">
              <div className="detail-card">
                <div className="detail-icon">
                  <Phone size={24} />
                </div>
                <div className="detail-text">
                  <h3>Telefonische Beratung</h3>
                  <a href="tel:+4950219249870" className="detail-link">05021 9249870</a>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">
                  <Mail size={24} />
                </div>
                <div className="detail-text">
                  <h3>E-Mail Kontakt</h3>
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
              <h2 className="form-card-title">Anfrage & Schadenmeldung</h2>
              <p className="form-card-sub">Kostenlos und unverbindlich • Antwort innerhalb von 24h</p>

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
                      placeholder="ihre-mail@beispiel.de"
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
                    placeholder="Bitte beschreiben Sie kurz, worum es geht (z. B. Ort des Schadens, betroffene Räume, geplanter Umfang oder Dringlichkeit)."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {/* File Upload Field */}
                <div className="form-group">
                  <label className="file-upload-label">
                    <span>Fotos des Schadens / Projekts anhängen (optional)</span>
                    <span className="file-hint">Max. 5 Fotos (JPG, PNG, WebP bis 10MB)</span>
                  </label>
                  
                  <div 
                    className="file-drop-zone"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange}
                      multiple
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                    <UploadCloud size={24} className="upload-icon" />
                    <div className="drop-text">
                      <strong>Dateien auswählen</strong> oder hier ablegen
                    </div>
                  </div>

                  {/* Selected Files List */}
                  {selectedFiles.length > 0 && (
                    <div className="selected-files-list">
                      {selectedFiles.map((file, idx) => (
                        <div className="file-chip" key={idx}>
                          <ImageIcon size={15} className="chip-icon" />
                          <span className="chip-name">{file.name}</span>
                          <span className="chip-size">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
                          <button 
                            type="button" 
                            className="chip-remove-btn" 
                            onClick={() => removeFile(idx)}
                            aria-label="Datei entfernen"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Turnstile Container */}
                <div className="cf-turnstile-wrapper">
                  <div ref={turnstileRef} className="cf-turnstile"></div>
                </div>

                <button 
                  type="submit" 
                  className={`btn-solid submit-btn ${isEmergencyType ? 'btn-emergency-submit' : ''}`}
                  disabled={status.type === 'loading'}
                >
                  {status.type === 'loading' ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      <span>Wird übermittelt...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Anfrage jetzt absenden</span>
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
