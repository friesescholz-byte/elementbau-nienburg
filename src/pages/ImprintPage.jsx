import React from 'react';
import './LegalPages.css';

export default function ImprintPage() {
  return (
    <div className="legal-page-wrapper">
      <div className="container legal-container">
        <h1 className="legal-title">Impressum</h1>
        <p className="legal-subtitle">Angaben gemäß § 5 TMG</p>
        
        <div className="legal-section">
          <h2>Anbieter & Kontakt</h2>
          <p>
            <strong>Louis Gerber Einzelunternehmen</strong><br />
            Auf dem Kampe 6a<br />
            31582 Nienburg (Weser)<br />
            Deutschland
          </p>
          <p className="contact-legal-links">
            <strong>Telefon:</strong> <a href="tel:+4950219249870">05021 9249870</a><br />
            <strong>E-Mail:</strong> <a href="mailto:info@elementbau-ni.de">info@elementbau-ni.de</a><br />
            <strong>Website:</strong> <a href="https://elementbau-ni.de">elementbau-ni.de</a>
          </p>
        </div>

        <div className="legal-section">
          <h2>Vertretungsberechtigte Personen</h2>
          <p><strong>Geschäftsführer:</strong> Louis Gerber</p>
        </div>

        <div className="legal-section">
          <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>
            Louis Gerber<br />
            Auf dem Kampe 6a<br />
            31582 Nienburg (Weser)
          </p>
        </div>

        <div className="legal-section">
          <h2>Haftungsausschluss</h2>
          <h3>Haftung für Inhalte</h3>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
          </p>
          <h3>Haftung für Links</h3>
          <p>
            Unsere Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>
          <h3>Urheberrecht</h3>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </div>

      </div>
    </div>
  );
}
