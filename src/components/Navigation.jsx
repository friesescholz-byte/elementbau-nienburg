import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import './Navigation.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Leistungen', path: '/#leistungen' },
    { name: 'Ablauf', path: '/#ablauf' },
    { name: 'Über Uns', path: '/#ueber-uns' },
    { name: 'Projekte', path: '/#projekte' },
    { name: 'Jobs / Karriere', path: '/bewerben' },
  ];

  const handleLinkClick = (e, path) => {
    if (path.startsWith('/#')) {
      const id = path.split('#')[1];
      if (location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <nav className={`navigation-bar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-accent">ELEMENTBAU</span>
          <span className="logo-sub">NIENBURG</span>
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.path.startsWith('/#') ? (
                  <a
                    href={link.path}
                    onClick={(e) => handleLinkClick(e, link.path)}
                    className="nav-link"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link to={link.path} className="nav-link">
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <a href="tel:+4950219249870" className="nav-phone-btn">
            <Phone size={18} />
            <span>05021 9249870</span>
          </a>

          <Link to="/kontakt" className="nav-cta-btn">
            Anfrage senden
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Menü öffnen">
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${isOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.path.startsWith('/#') ? (
                <a
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  className="mobile-nav-link"
                >
                  {link.name}
                </a>
              ) : (
                <Link to={link.path} className="mobile-nav-link">
                  {link.name}
                </Link>
              )}
            </li>
          ))}
          <li>
            <Link to="/kontakt" className="mobile-nav-link highlight">
              Projekt anfragen
            </Link>
          </li>
          <li className="mobile-phone-li">
            <a href="tel:+4950219249870" className="mobile-phone-link">
              <Phone size={18} />
              <span>05021 9249870</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
