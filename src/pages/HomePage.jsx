import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Check, X, ShieldAlert, Award, Sparkles, FileText, CheckCircle2, Phone, Mail 
} from 'lucide-react';
import './HomePage.css';

export default function HomePage() {
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

  // R2 Base URL for Images (synced directly with Cloudflare R2 website-datein bucket)
  const r2Url = 'https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Elementbau-Ni';

  return (
    <div className="homepage-wrapper">
      
      {/* 1. HERO SECTION */}
      <section id="hero" className="hero-section">
        <div className="container hero-container">
          
          <motion.div 
            className="content-side"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div className="brand-tag" variants={fadeUp}>
              Inh. Louis Gerber
            </motion.div>
            
            <motion.h1 className="title" variants={fadeUp}>
              Bauen, Sanieren <span className="keep-together">& <span className="highlight">Pflegen.</span></span><br />
              Alles aus einer Hand.
            </motion.h1>
            
            <motion.p className="subtitle" variants={fadeUp}>
              Ob Innenausbau, Altbausanierung, Erdarbeiten oder schnelle Hilfe bei Wasserschäden – wir realisieren Ihr Projekt zuverlässig und zu fairen, transparenten Konditionen.
            </motion.p>

            <motion.div className="stats-row" variants={fadeUp}>
              <div className="stat">
                <span className="stat-title">Vielseitig.</span>
                <span className="stat-desc">Alles aus einer Hand</span>
              </div>
              <div className="stat">
                <span className="stat-title">Transparent.</span>
                <span className="stat-desc">Faire Festpreise</span>
              </div>
              <div className="stat">
                <span className="stat-title">Schnell.</span>
                <span className="stat-desc">Notdienst & Hilfe</span>
              </div>
            </motion.div>

            <motion.div className="button-group" variants={fadeUp}>
              <a href="/kontakt" className="btn-solid">
                Projekt anfragen
                <ArrowRight className="arrow" />
              </a>
              <a href="/bewerben" className="btn-subtle">
                Wir suchen Verstärkung für unser Team
                <ArrowRight className="arrow" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="media-side"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease }}
          >
            <div className="media-decor decor-top-right"></div>
            <div className="media-decor decor-bottom-left"></div>
            
            <div className="video-wrapper">
              <video 
                className="hero-video" 
                src={`${r2Url}/elementbau_Clip.mp4`}
                autoPlay 
                muted 
                loop 
                playsInline
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. LEISTUNGEN SECTION */}
      <section id="leistungen" className="services-section">
        <div className="container">
          
          <div className="section-header">
            <div className="section-tag">Leistungen</div>
            <h2 className="section-title">
              Unser Service<br /><span className="highlight">im Überblick.</span>
            </h2>
          </div>

          <motion.div 
            className="services-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Card 1 */}
            <motion.div className="service-card" variants={fadeUp}>
              <span className="service-number">01</span>
              <div className="service-icon">
                <ShieldAlert size={32} />
              </div>
              <h3 className="card-title">Wasserschaden & Leckortung</h3>
              <p className="card-desc">Bei Wasserschäden handeln wir schnell und zuverlässig. Von der Schadensanalyse bis zur vollständigen Trocknung und Sanierung kümmern wir uns um alles.</p>
              <ul className="service-list">
                <li>Leckortung & Schadensdiagnose</li>
                <li>Reparatur bei Rohrbruch & Leitungswasserschäden</li>
                <li>Wasserschaden-Notdienst</li>
                <li>Bautrocknung & Entfeuchtung</li>
                <li>Schimmelbeseitigung</li>
              </ul>
            </motion.div>

            {/* Card 2 */}
            <motion.div className="service-card" variants={fadeUp}>
              <span className="service-number">02</span>
              <div className="service-icon">
                <FileText size={32} />
              </div>
              <h3 className="card-title">Trockenbau & Innenausbau</h3>
              <p className="card-desc">Mit professionellem Trockenbau schaffen wir neue Räume und moderne Innenbereiche. Ideal für Renovierungen, Umbauten oder den Ausbau von Dachgeschossen.</p>
              <ul className="service-list">
                <li>Trennwände & Raumaufteilungen</li>
                <li>Decken- und Wandverkleidungen</li>
                <li>Trockenestrich & Bodenaufbau</li>
                <li>Dachgeschossausbau</li>
                <li>Dämmung & Isolierung</li>
              </ul>
            </motion.div>

            {/* Card 3 */}
            <motion.div className="service-card" variants={fadeUp}>
              <span className="service-number">03</span>
              <div className="service-icon">
                <Award size={32} />
              </div>
              <h3 className="card-title">Altbausanierung & Renovierung</h3>
              <p className="card-desc">Wir verwandeln alte Gebäude in moderne Wohn- oder Arbeitsräume. Dabei übernehmen wir die komplette Koordination aller Arbeiten – alles aus einer Hand.</p>
              <ul className="service-list">
                <li>Renovierung und Modernisierung</li>
                <li>Trockenbau & Dämmarbeiten</li>
                <li>Einbau von Fenstern, Türen & Böden</li>
                <li>Badsanierungen</li>
                <li>Koordination aller Gewerke</li>
              </ul>
            </motion.div>

            {/* Card 4 */}
            <motion.div className="service-card" variants={fadeUp}>
              <span className="service-number">04</span>
              <div className="service-icon">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="card-title">Kellerabdichtung</h3>
              <p className="card-desc">Ihr Vorteil: Ein Ansprechpartner, ein durchdachter Ablauf und ein dauerhaft trockenes Ergebnis. Wir schützen Ihr Gebäude nachhaltig vor Feuchtigkeit.</p>
              <ul className="service-list">
                <li>Freilegung des betroffenen Mauerwerks</li>
                <li>Gründliche Vorbereitung der Flächen</li>
                <li>Hochwertige Abdichtung (innen & außen)</li>
                <li>Fachgerechtes Verschließen</li>
                <li>Wiederherstellung von Gelände & Oberflächen</li>
              </ul>
            </motion.div>

            {/* Card 5 */}
            <motion.div className="service-card" variants={fadeUp}>
              <span className="service-number">05</span>
              <div className="service-icon">
                <Sparkles size={32} />
              </div>
              <h3 className="card-title">Badsanierung</h3>
              <p className="card-desc">Wir verwandeln Ihr Badezimmer in eine moderne Wohlfühloase. Ihr Vorteil: Ein Ansprechpartner, klare Abläufe und ein Bad, das perfekt zu Ihnen passt.</p>
              <ul className="service-list">
                <li>Rückbau und fachgerechte Entkernung</li>
                <li>Planung und individuelle Gestaltung</li>
                <li>Sanitär- und Elektroarbeiten</li>
                <li>Fliesenarbeiten und Abdichtung</li>
                <li>Montage von Badmöbeln & Ausstattung</li>
                <li>Saubere Fertigstellung und Übergabe</li>
              </ul>
            </motion.div>
          </motion.div>

          <div className="cta-banner">
            <div className="cta-text">
              <h3>Bereit für Ihr nächstes Projekt?</h3>
              <p>Rufen Sie uns direkt an unter <a href="tel:+4950219249870" className="cta-phone">05021 9249870</a> oder vereinbaren Sie online einen Termin. Wir beraten Sie gerne unverbindlich.</p>
            </div>
            <a href="/kontakt" className="btn-solid">
              Projekt anfragen
              <ArrowRight className="arrow" />
            </a>
          </div>

        </div>
      </section>

      {/* 3. ABLAUF SECTION */}
      <section id="ablauf" className="process-section">
        <div className="container">
          
          <div className="section-header center">
            <div className="section-tag center">Ablauf</div>
            <h2 className="section-title">
              So läuft Ihr Projekt<br /><span className="highlight">mit uns ab.</span>
            </h2>
            <p className="section-intro text-center">
              Ein kompakter, strukturierter Prozess – für maximale Sicherheit und Transparenz von der ersten Idee bis zur finalen Übergabe.
            </p>
          </div>

          <div className="process-steps">
            {/* Step 1 */}
            <div className="step-row">
              <div className="step-content">
                <span className="step-bg-num">01</span>
                <h3 className="step-title">Persönliche Beratung</h3>
                <p className="step-text">Wir treffen uns direkt bei Ihnen vor Ort. So können wir die Gegebenheiten analysieren, Ihre Wünsche aufnehmen und erste Lösungsansätze besprechen.</p>
              </div>
              <div className="step-image-wrapper">
                <img src={`${r2Url}/pexels-hazardos-804065-hGYvBKT6XnZcJwtw.jpg`} alt="Persönliche Beratung" className="step-img" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="step-row">
              <div className="step-content">
                <span className="step-bg-num">02</span>
                <h3 className="step-title">Planung & Angebot</h3>
                <p className="step-text">Nach der Besichtigung erstellen wir ein detailliertes Konzept. Sie erhalten von uns ein transparentes und faires Angebot, das exakt auf Ihre individuellen Wünsche und die Gegebenheiten vor Ort zugeschnitten ist.</p>
              </div>
              <div className="step-image-wrapper">
                <img src={`${r2Url}/photo-1503387762-592deb58ef4e.jpg`} alt="Planung und Kalkulation" className="step-img" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="step-row">
              <div className="step-content">
                <span className="step-bg-num">03</span>
                <h3 className="step-title">Vorbereitung</h3>
                <p className="step-text">Wir kümmern uns um die gesamte Materialbeschaffung und bereiten die Baustelle optimal vor, damit am Stichtag direkt und sauber losgelegt werden kann.</p>
              </div>
              <div className="step-image-wrapper">
                <img src={`${r2Url}/gemini_generated_image_xjke6ixjke6ixjke-DBmLUNLJwji5Aik3.png`} alt="Baustelle Vorbereitung" className="step-img" />
              </div>
            </div>

            {/* Step 4 */}
            <div className="step-row">
              <div className="step-content">
                <span className="step-bg-num">04</span>
                <h3 className="step-title">Umsetzung vor Ort</h3>
                <p className="step-text">Unsere erfahrenen Handwerker setzen das Projekt präzise um. Dabei achten wir besonders auf eine saubere Ausführung und die Einhaltung des Zeitplans.</p>
              </div>
              <div className="step-image-wrapper">
                <img src={`${r2Url}/gemini_generated_image_22rait22rait22ra-1tv5QxiizvRCc2jX.png`} alt="Montage auf der Baustelle" className="step-img" />
              </div>
            </div>

            {/* Step 5 */}
            <div className="step-row">
              <div className="step-content">
                <span className="step-bg-num">05</span>
                <h3 className="step-title">Besenreine Übergabe</h3>
                <p className="step-text">Bevor wir gehen, räumen wir auf. Sie erhalten die Räumlichkeiten besenrein zurück. Erst nach einer gemeinsamen Qualitätskontrolle ist das Projekt für uns abgeschlossen.</p>
              </div>
              <div className="step-image-wrapper">
                <img src={`${r2Url}/photo-1584622650111-993a426fbf0a.jpg`} alt="Besenreine Übergabe" className="step-img" />
              </div>
            </div>
          </div>

          <div className="cta-wrapper text-center">
            <a href="/kontakt" className="btn-solid">
              Jetzt Projekt anfragen
              <ArrowRight className="arrow" />
            </a>
          </div>

        </div>
      </section>

      {/* 4. VERTRAUEN & USP SECTION */}
      <section className="trust-section">
        <div className="container">
          
          <div className="section-header center">
            <div className="section-tag center">Unser Versprechen</div>
            <h2 className="section-title">
              Warum Kunden<br /><span className="highlight">uns vertrauen.</span>
            </h2>
            <p className="section-intro text-center">
              Wir stehen für ehrliche Beratung, transparente Kommunikation und kompromisslose Qualität – von der ersten Skizze bis zur besenreinen Übergabe.
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
                  Klare Prozesse
                </li>
                <li>
                  <span className="list-icon">
                    <Check size={18} />
                  </span>
                  Verlässliche Festpreise
                </li>
                <li>
                  <span className="list-icon">
                    <Check size={18} />
                  </span>
                  Saubere Ausführung
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
              Ein kleiner Einblick in unsere tägliche Arbeit – von der Badsanierung bis zum Dachgeschossausbau.
            </p>
            <div className="claim-box">
              <p className="claim-text">
                Unsere Projekte stehen für handwerkliche Präzision, saubere Ausführung und zuverlässige Umsetzung.
              </p>
            </div>
          </div>

          <div className="gallery-grid">
            {/* Item 1 */}
            <div className="gallery-item span-2-row">
              <img 
                src={`${r2Url}/heute-beim-kunden-im-einsatz-dawir-haben-den-alten-mutterboden-fachgerecht-ausgekoffert-und-die-WQru6cOqBraRgsDv.jpg`} 
                alt="Fachgerechter Aushub von altem Mutterboden" 
                className="gallery-img"
              />
              <div className="project-overlay">
                <h3 className="project-title">Tiefbauarbeiten</h3>
                <span className="project-cat">Mutterboden Aushub</span>
              </div>
            </div>

            {/* Item 2 */}
            <div className="gallery-item span-2-col">
              <img 
                src={`${r2Url}/pexels-tima-miroshnichenko-6195961-rfUv8zMCUSldDbne.jpg`} 
                alt="Bauendreinigung" 
                className="gallery-img"
              />
              <div className="project-overlay">
                <h3 className="project-title">Bauendreinigung</h3>
                <span className="project-cat">Sauberkeit nach Maß</span>
              </div>
            </div>
            
            {/* Item 3 */}
            <div className="gallery-item">
              <img 
                src={`${r2Url}/pexels-ono-kosuki-5974235-XaEPDarDU7l1STiy.jpg`} 
                alt="Holzarbeiten" 
                className="gallery-img"
              />
              <div className="project-overlay">
                <h3 className="project-title">Holzarbeiten</h3>
                <span className="project-cat">Montage & Reparatur</span>
              </div>
            </div>
            
            {/* Item 4 */}
            <div className="gallery-item span-2-col">
              <img 
                src={`${r2Url}/diese-woche-starten-wir-eine-grapaere-baustelle-mit-home_innovation_bauelemente-neue-fenster-ro-1-BBwRqVvNfA3ccoHf.jpg`} 
                alt="Start einer Großbaustelle mit neuen Fenstern" 
                className="gallery-img"
              />
              <div className="project-overlay">
                <h3 className="project-title">Fenstermontage</h3>
                <span className="project-cat">Großbaustelle</span>
              </div>
            </div>

            {/* Item 5 */}
            <div className="gallery-item">
              <img 
                src={`${r2Url}/d-abdichtung-im-eingangsbereich-erfolgreich-abgeschlossen-fa1-4r-unseren-kunden-easyfitness_nien-20C8pnOX78IJqO2c.jpg`} 
                alt="Pflastern und Abdichten" 
                className="gallery-img"
              />
              <div className="project-overlay">
                <h3 className="project-title">Pflastern & Abdichten</h3>
                <span className="project-cat">Außenanlagen</span>
              </div>
            </div>
            
            {/* Item 6 */}
            <div className="gallery-item">
              <img 
                src={`${r2Url}/schiebeta1-4r-einmal-neu-bitte-dy-dy-kann-sich-sehen-lassen-oder-home_innovation_bauelemente-JuPHcH6Zw7UI8kkj.jpg`} 
                alt="Neue Schiebetür erfolgreich eingebaut" 
                className="gallery-img"
              />
              <div className="project-overlay">
                <h3 className="project-title">Fenstereinbau</h3>
                <span className="project-cat">Moderne Schiebetüren</span>
              </div>
            </div>

            {/* Item 7 */}
            <div className="gallery-item">
              <img 
                src={`${r2Url}/pexels-jimmy-nilsson-masth-193596566-11427055-PZ3mUxKrXAEfdW6S.jpg`} 
                alt="Verputzen von Kanten" 
                className="gallery-img"
              />
              <div className="project-overlay">
                <h3 className="project-title">Verputzarbeiten</h3>
                <span className="project-cat">Präzision im Detail</span>
              </div>
            </div>

            {/* Item 8 */}
            <div className="gallery-item span-2-col">
              <img 
                src={`${r2Url}/pexels-introspectivedsgn-6124239-2kgBXEvUloO7d9EN.jpg`} 
                alt="Anbringen von Dämmung" 
                className="gallery-img"
              />
              <div className="project-overlay">
                <h3 className="project-title">Energieeffizienz</h3>
                <span className="project-cat">Dämmung & Isolierung</span>
              </div>
            </div>
          </div>

          <div className="cta-block">
            <div className="cta-text-wrapper">
              <h3 className="cta-headline">Überzeugt von unserer Arbeit?</h3>
              <p className="cta-subtext">Lassen Sie uns gemeinsam Ihr nächstes Projekt realisieren. Schnell, sauber und zu fairen, transparenten Konditionen.</p>
            </div>
            <a href="/kontakt" className="btn-solid">
              Jetzt Projekt anfragen
              <ArrowRight className="arrow" />
            </a>
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
              Hallo, ich bin Louis Gerber. Als junges Unternehmen aus der Region stehen wir für eine neue Generation im Handwerk: modern, verlässlich und immer auf Augenhöhe mit unseren Kunden.
            </p>
            
            <p className="about-text">
              Wir sind kein riesiger, anonymer Konzern, sondern ein eingespieltes Team, das anpackt. Ob Trockenbau, Sanierung oder schnelle Hilfe beim Wasserschaden – wir legen Wert auf ehrliche Arbeit, direkte Kommunikation und Ergebnisse, die sich sehen lassen können. Bei uns wissen Sie immer, wer auf Ihrer Baustelle arbeitet.
            </p>
            
            <div className="claim-box">
              <span className="claim-title">Meine Philosophie</span>
              <p className="claim-text">
                "Gute Arbeit braucht kein langes Reden, sondern saubere Ausführung und ein klares Wort."
              </p>
            </div>

            <a href="/bewerben" className="btn-solid">
              Werde Teil unseres Teams
              <ArrowRight className="arrow" />
            </a>
          </div>

          <div className="image-container">
            <div className="image-wrapper">
              <img 
                src={`${r2Url}/profilbild_louis_gerber-EnnxyBfGmmKeemaD.jpeg`} 
                alt="Portrait von Louis Gerber - Elementbau" 
                className="profile-img"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 7. FINAL CTA & CONTACT SECTION */}
      <section className="final-cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="cta-content">
              
              <div className="section-tag">Projektanfrage</div>
              
              <h2 className="cta-title">
                Starten wir Ihr<br /><span className="highlight">Projekt.</span>
              </h2>
              
              <p className="cta-text">
                Sie haben ein Anliegen, einen Ausbau oder einen akuten Schaden?<br />
                Sprechen Sie mit mir – ich berate Sie persönlich, ehrlich und unverbindlich.
              </p>

              <div className="contact-grid">
                <a href="tel:+4950219249870" className="contact-item">
                  <div className="contact-icon">
                    <Phone size={20} />
                  </div>
                  <span className="contact-detail">05021 9249870</span>
                </a>

                <a href="mailto:info@elementbau-ni.de" className="contact-item">
                  <div className="contact-icon">
                    <Mail size={20} />
                  </div>
                  <span className="contact-detail">info@elementbau-ni.de</span>
                </a>
              </div>

              <a href="/kontakt" className="btn-solid">
                Jetzt anfragen
                <ArrowRight className="arrow" />
              </a>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
