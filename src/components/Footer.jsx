import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ShieldAlert, Briefcase } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo">
            <span className="logo-accent">ELEMENTBAU</span>
            <span className="logo-sub">NIENBURG</span>
          </Link>
          <p className="footer-tagline">
            Ihr Fachbetrieb für Schadenssanierung, zerstörungsfreie Leckortung und Baudienstleistungen in Nienburg & Umgebung. Alles aus einer Hand.
          </p>
          <div className="footer-google-badge">
            <a 
              href="https://search.google.com/local/writereview?placeid=ChIJvT4qfNTK04ARtbgIU5NoR5k" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="google-badge-link"
            >
              ★ ★ ★ ★ ★ 5.0 Google Bewertung abgeben
            </a>
          </div>
        </div>

        {/* Services Column */}
        <div className="footer-col">
          <h4 className="footer-title">Baudienstleistungen</h4>
          <ul className="footer-links">
            {servicesData.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link to={`/leistungen/${s.slug}`} className="footer-link">
                  {s.navTitle}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/#leistungen" className="footer-link highlight-link">
                Alle Gewerke ansehen →
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footer-col">
          <h4 className="footer-title">Kontakt & Notruf</h4>
          <ul className="footer-links">
            <li>
              <a href="tel:+4950219249870" className="footer-link-icon footer-emergency-phone">
                <ShieldAlert size={16} />
                <span>05021 9249870 (24h Notruf)</span>
              </a>
            </li>
            <li>
              <a href="mailto:info@elementbau-ni.de" className="footer-link-icon">
                <Mail size={16} />
                <span>info@elementbau-ni.de</span>
              </a>
            </li>
            <li>
              <div className="footer-link-icon no-hover">
                <MapPin size={16} />
                <span>Auf dem Kampe 6a<br />31582 Nienburg (Weser)</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="footer-col">
          <h4 className="footer-title">Rechtliches</h4>
          <ul className="footer-links">
            <li>
              <Link to="/impressum" className="footer-link">Impressum</Link>
            </li>
            <li>
              <Link to="/datenschutz" className="footer-link">Datenschutz</Link>
            </li>
            <li>
              <Link to="/bewerben" className="footer-link footer-jobs-highlight">
                <Briefcase size={14} className="footer-jobs-icon" />
                <span>Jobs / Karriere</span>
              </Link>
            </li>
            <li>
              <Link to="/barrierefreiheit" className="footer-link">Barrierefreiheitserklärung</Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>© {currentYear} Elementbau Nienburg. Alle Rechte vorbehalten.</p>
          <p className="agency-tag">
            Website by <a href="https://scholz-friese-webdesign.de/" target="_blank" rel="noopener noreferrer">Scholz & Friese Webdesign</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
