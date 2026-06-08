import React from 'react';
import './LegalPages.css';

export default function AccessibilityPage() {
  return (
    <div className="legal-page-wrapper">
      <div className="container legal-container">
        <h1 className="legal-title">Barrierefreiheitserklärung</h1>
        <p className="legal-subtitle">Stand: 10. März 2026</p>
        
        <div className="legal-section">
          <p>
            Die Betreiberin dieser Website (<a href="https://elementbau-nienburg.de/">https://elementbau-nienburg.de/</a>) legt großen Wert auf eine möglichst barrierefreie Zugänglichkeit der Inhalte. Die Website wurde unter Berücksichtigung aktueller Anforderungen an digitale Barrierefreiheit gestaltet und wird kontinuierlich weiter optimiert.
          </p>
          <p>
            Rechtsgrundlage sind das Niedersächsische Behindertengleichstellungsgesetz (NBGG), die Barrierefreie-Informationstechnik-Verordnung (BITV 2.0) sowie ab dem 28. Juni 2025 das Barrierefreiheitsstärkungsgesetz (BFSG) in Umsetzung des EU Accessibility Acts (EAA).
          </p>
        </div>

        <div className="legal-section">
          <h2>Vereinbarkeit mit den Anforderungen</h2>
          <p>
            Diese Website ist weitestgehend mit den Anforderungen der BITV 2.0 sowie der EN 301 549 (WCAG 2.1/2.2 - Konformitätsstufe AA) vereinbar. Die meisten Funktionen sind bereits barrierefrei zugänglich.
          </p>
        </div>

        <div className="legal-section">
          <h2>Noch bestehende Einschränkungen</h2>
          <p>
            Eine fortlaufende Verbesserung im Sinne der Barrierefreiheit ist geplant. Ziel ist die vollständige Einhaltung der gesetzlichen Anforderungen. Noch bestehende Einschränkungen betreffen im Einzelnen:
          </p>
          <ul>
            <li>Einzelne PDF-Dokumente sind noch nicht vollständig barrierefrei. Diese werden bei Überarbeitung ersetzt oder alternativ bereitgestellt.</li>
            <li>Einige Farbkontraste werden aktuell überprüft und ggf. angepasst, um optimale Lesbarkeit sicherzustellen.</li>
            <li>Einzelne Bilder oder Bedienelemente könnten noch mit alternativen Texten oder zusätzlichen semantischen Informationen ergänzt werden.</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2>Feedback und Kontakt</h2>
          <p>
            Sollten Ihnen Barrieren auf unserer Website auffallen oder Sie Hinweise zur Verbesserung der Zugänglichkeit haben, freuen wir uns über Ihre Rückmeldung:
          </p>
          <div className="contact-legal-links">
            <p>
              <strong>Louis Gerber Einzelunternehmen</strong><br />
              Auf dem Kampe 6a<br />
              31582 Nienburg (Weser)<br />
              Deutschland<br />
              Telefon: <a href="tel:+4950219249870">05021 9249870</a><br />
              E-Mail: <a href="mailto:info@elementbau-ni.de">info@elementbau-ni.de</a>
            </p>
          </div>
          <p style={{ marginTop: '20px' }}>
            Diese Erklärung wurde zuletzt am 19. März 2026 überprüft.
          </p>
        </div>

        <div className="legal-section">
          <h2>Durchsetzungsverfahren</h2>
          <p>
            Falls Sie innerhalb von sechs Wochen keine zufriedenstellende Antwort auf Ihre Anfrage zur Barrierefreiheit erhalten, können Sie sich an die zuständige Durchsetzungsstelle wenden:
          </p>
          <p>
            <strong>Durchsetzungsstelle für digitale Barrierefreiheit</strong><br />
            Niedersächsisches Ministerium für Soziales, Arbeit, Gesundheit und Gleichstellung<br />
            Website: <a href="https://www.ms.niedersachsen.de/barrierefreiheit/" target="_blank" rel="noopener noreferrer">https://www.ms.niedersachsen.de/barrierefreiheit/</a>
          </p>
        </div>

      </div>
    </div>
  );
}
