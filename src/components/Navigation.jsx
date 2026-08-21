import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown, ShieldAlert, Sparkles, Paintbrush, Hammer, Wrench, Home, Droplets, Waves, Layers, Briefcase } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import './Navigation.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150);
  };

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

  // Close mobile menu and dropdown when navigating
  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
    setIsMobileServicesOpen(false);
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
  }, [location]);

  // Click outside listener for desktop dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleHashLinkClick = (e, targetId) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const getServiceIcon = (slug) => {
    switch (slug) {
      case 'wasserschaden': return <ShieldAlert size={16} className="menu-icon-accent emergency" />;
      case 'badsanierung': return <Sparkles size={16} className="menu-icon-accent" />;
      case 'malerarbeiten': return <Paintbrush size={16} className="menu-icon-accent" />;
      case 'bodenbelaege': return <Layers size={16} className="menu-icon-accent" />;
      case 'bauelemente': return <Hammer size={16} className="menu-icon-accent" />;
      case 'trockenbau': return <Wrench size={16} className="menu-icon-accent" />;
      case 'sanitaerarbeiten': return <Droplets size={16} className="menu-icon-accent" />;
      case 'innenausbau': return <Home size={16} className="menu-icon-accent" />;
      case 'kellerabdichtung': return <Waves size={16} className="menu-icon-accent" />;
      default: return <Wrench size={16} className="menu-icon-accent" />;
    }
  };

  return (
    <>
      <nav className={`navigation-bar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="nav-logo" onClick={() => setIsOpen(false)}>
            <span className="logo-accent">ELEMENTBAU</span>
            <span className="logo-sub">NIENBURG</span>
          </Link>

          {/* Desktop Menu */}
          <div className="desktop-menu">
            <ul className="nav-links">
              
              {/* Services Dropdown */}
              <li 
                className="nav-item-dropdown" 
                ref={dropdownRef}
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <button 
                  className={`nav-link dropdown-toggle ${isDropdownOpen ? 'active' : ''}`}
                  onClick={() => setIsDropdownOpen(prev => !prev)}
                  aria-expanded={isDropdownOpen}
                >
                  <span>Baudienstleistungen</span>
                  <ChevronDown size={14} className={`dropdown-chevron ${isDropdownOpen ? 'rotate' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <div className={`nav-dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                  <div className="dropdown-grid">
                    {servicesData.map((s) => (
                      <Link 
                        key={s.slug} 
                        to={`/leistungen/${s.slug}`} 
                        className={`dropdown-link-item ${s.slug === 'wasserschaden' ? 'item-emergency' : ''}`}
                      >
                        <div className="item-icon-wrap">
                          {getServiceIcon(s.slug)}
                        </div>
                        <div className="item-text-wrap">
                          <span className="item-title">{s.navTitle}</span>
                          <span className="item-desc">{s.badge.split('•')[0]}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="dropdown-footer">
                    <a 
                      href="/#leistungen" 
                      onClick={(e) => { setIsDropdownOpen(false); handleHashLinkClick(e, 'leistungen'); }}
                      className="dropdown-footer-link"
                    >
                      <span>Alle Leistungen in der Übersicht anzeigen</span>
                      <ChevronDown size={13} className="dropdown-footer-chevron" />
                    </a>
                  </div>
                </div>
              </li>

              <li>
                <a 
                  href="/#bewertungen" 
                  onClick={(e) => handleHashLinkClick(e, 'bewertungen')} 
                  className="nav-link"
                >
                  Bewertungen
                </a>
              </li>

              <li>
                <a 
                  href="/#projekte" 
                  onClick={(e) => handleHashLinkClick(e, 'projekte')} 
                  className="nav-link"
                >
                  Referenzen
                </a>
              </li>

              <li>
                <a 
                  href="/#ueber-uns" 
                  onClick={(e) => handleHashLinkClick(e, 'ueber-uns')} 
                  className="nav-link"
                >
                  Über Uns
                </a>
              </li>

              <li>
                <Link to="/bewerben" className="nav-link nav-link-jobs-orange">
                  <Briefcase size={14} className="jobs-nav-icon" />
                  <span>Jobs</span>
                </Link>
              </li>
            </ul>

            {/* Slim, Modern Action Buttons Group */}
            <div className="nav-actions-group">
              <a href="tel:+4950219249870" className="nav-emergency-btn" title="24h Notruf anrufen">
                <span className="nav-pulse-dot"></span>
                <Phone size={13} />
                <span>24h Notruf</span>
              </a>

              <Link to="/kontakt" className="nav-cta-btn">
                Anfrage senden
              </Link>
            </div>
          </div>

          {/* Mobile Header Quick Actions */}
          <div className="mobile-header-actions">
            <a href="tel:+4950219249870" className="mobile-quick-call" title="24h Notruf sofort anrufen">
              <Phone size={16} />
              <span className="mobile-call-pulse"></span>
            </a>
            <button 
              className="mobile-toggle" 
              onClick={() => setIsOpen(!isOpen)} 
              aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay Backdrop */}
      <div 
        className={`mobile-nav-backdrop ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Offcanvas Drawer */}
      <div className={`mobile-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="mobile-sidebar-header">
          <div className="mobile-sidebar-logo">
            <span className="m-logo-main">ELEMENTBAU</span>
            <span className="m-logo-sub">NIENBURG</span>
          </div>
          <button 
            className="mobile-sidebar-close" 
            onClick={() => setIsOpen(false)}
            aria-label="Menü schließen"
          >
            <X size={22} />
          </button>
        </div>

        {/* 24h Emergency Banner at top of drawer for instant mobile conversion */}
        <div className="mobile-drawer-emergency-card">
          <a href="tel:+4950219249870" className="mobile-drawer-emergency-btn">
            <div className="m-em-icon-wrap">
              <Phone size={18} />
              <span className="m-pulse-ring"></span>
            </div>
            <div className="m-em-text-wrap">
              <span className="m-em-label">24h Notruf Soforthilfe</span>
              <span className="m-em-phone">05021 9249870</span>
            </div>
          </a>
        </div>

        <ul className="mobile-nav-links">
          {/* Mobile Accordion for Baudienstleistungen */}
          <li className="mobile-dropdown-li">
            <button 
              className={`mobile-nav-link mobile-dropdown-btn ${isMobileServicesOpen ? 'active' : ''}`}
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
            >
              <span>Baudienstleistungen</span>
              <ChevronDown size={18} className={`mobile-chevron ${isMobileServicesOpen ? 'rotate' : ''}`} />
            </button>

            <div className={`mobile-sub-menu-wrap ${isMobileServicesOpen ? 'expanded' : ''}`}>
              <ul className="mobile-sub-menu">
                {servicesData.map((s) => (
                  <li key={s.slug}>
                    <Link 
                      to={`/leistungen/${s.slug}`} 
                      className={`mobile-sub-link ${s.slug === 'wasserschaden' ? 'm-link-emergency' : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="m-sub-icon">{getServiceIcon(s.slug)}</span>
                      <span className="m-sub-text">{s.navTitle}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <a 
                    href="/#leistungen" 
                    onClick={(e) => { setIsOpen(false); handleHashLinkClick(e, 'leistungen'); }}
                    className="mobile-sub-link m-sub-all"
                  >
                    <span>→ Alle Leistungen ansehen</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <a 
              href="/#bewertungen" 
              onClick={(e) => handleHashLinkClick(e, 'bewertungen')} 
              className="mobile-nav-link"
            >
              Bewertungen
            </a>
          </li>

          <li>
            <a 
              href="/#projekte" 
              onClick={(e) => handleHashLinkClick(e, 'projekte')} 
              className="mobile-nav-link"
            >
              Referenzen
            </a>
          </li>

          <li>
            <a 
              href="/#ueber-uns" 
              onClick={(e) => handleHashLinkClick(e, 'ueber-uns')} 
              className="mobile-nav-link"
            >
              Über Uns
            </a>
          </li>

          <li>
            <Link 
              to="/bewerben" 
              className="mobile-nav-link mobile-nav-jobs-highlight"
              onClick={() => setIsOpen(false)}
            >
              <span className="mobile-jobs-inner">
                <Briefcase size={16} className="jobs-nav-icon" />
                <span>Jobs / Karriere</span>
              </span>
              <span className="m-jobs-badge">Wir stellen ein</span>
            </Link>
          </li>
        </ul>

        {/* Mobile Drawer Bottom Actions */}
        <div className="mobile-drawer-footer">
          <Link 
            to="/kontakt" 
            className="mobile-drawer-cta-btn"
            onClick={() => setIsOpen(false)}
          >
            Unverbindliche Anfrage senden
          </Link>
          <div className="mobile-drawer-info">
            <span>Elementbau Nienburg • Inh. Louis Gerber</span>
            <span>Verdener Landstraße 126 • 31582 Nienburg</span>
          </div>
        </div>
      </div>
    </>
  );
}
