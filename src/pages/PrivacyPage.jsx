import React from 'react';
import './LegalPages.css';

export default function PrivacyPage() {
  return (
    <div className="legal-page-wrapper">
      <div className="container legal-container">
        <h1 className="legal-title">Datenschutzerklärung</h1>
        
        <div className="legal-section">
          <h2>1. Datenschutz auf einen Blick</h2>
          <h3>Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>
        </div>

        <div className="legal-section">
          <h2>2. Verantwortlicher</h2>
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          </p>
          <p>
            <strong>Louis Gerber Einzelunternehmen</strong><br />
            Auf dem Kampe 6a<br />
            31582 Nienburg (Weser)<br />
            Telefon: <a href="tel:+4950219249870">05021 9249870</a><br />
            E-Mail: <a href="mailto:info@elementbau-ni.de">info@elementbau-ni.de</a>
          </p>
        </div>

        <div className="legal-section">
          <h2>3. Datenerfassung auf unserer Website</h2>
          <h3>Server-Log-Dateien</h3>
          <p>
            Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
          </p>
          <ul>
            <li>Browsertyp und Browserversion</li>
            <li>Verwendetes Betriebssystem</li>
            <li>Referrer URL</li>
            <li>Hostname des zugreifenden Rechners</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse</li>
          </ul>
          <p>
            Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO zur fehlerfreien Bereitstellung der Website.
          </p>
        </div>

        <div className="legal-section">
          <h2>4. Cookies</h2>
          <p>
            Unsere Website verwendet Cookies. Cookies richten auf Ihrem Endgerät keinen Schaden an und enthalten keine Viren. Wir verwenden:
          </p>
          <ul>
            <li>Technisch notwendige Cookies (für den Betrieb der Website)</li>
            <li>Analyse- oder Marketing-Cookies (nur mit Ihrer ausdrücklichen Einwilligung)</li>
          </ul>
          <p>
            Die Speicherung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Sie können Ihre Cookie-Einstellungen jederzeit über unser Consent-Tool anpassen oder Cookies im Browser deaktivieren.
          </p>
        </div>

        <div className="legal-section">
          <h2>5. Kontaktaufnahme (Formulare & E-Mail)</h2>
          <p>
            Wenn Sie uns per E-Mail, Kontaktformular oder über das Online-Bewerbertool Anfragen zukommen lassen, werden Ihre Angaben aus dem jeweiligen Formular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </p>
          <p>
            Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen (z. B. Angebotsanfragen, Bewerbungen) erforderlich ist.
          </p>
        </div>

        <div className="legal-section">
          <h2>6. Drittanbieter-Dienste</h2>
          <h3>Google Maps</h3>
          <p>
            Diese Website nutzt den Kartendienst Google Maps. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und an einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.
          </p>
          <h3>Google Bewertungen</h3>
          <p>
            Auf unserer Website können Verweise oder Widgets von Google-Bewertungen eingebunden sein. Anbieter ist Google Ireland Limited. Beim Laden dieser Bewertungen können personenbezogene Daten (z. B. Ihre IP-Adresse) an Google übertragen werden. Die Einbindung erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
          </p>
        </div>

        <div className="legal-section">
          <h2>7. Ihre Rechte</h2>
          <p>
            Sie haben jederzeit das Recht auf:
          </p>
          <ul>
            <li>Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO)</li>
            <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
            <li>Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO)</li>
            <li>Einschränkung der Datenverarbeitung (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          </ul>
          <p>
            Zudem steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. In Niedersachsen ist dies:<br />
            <strong>Der Landesbeauftragte für den Datenschutz Niedersachsen</strong><br />
            Prinzenstraße 5, 30159 Hannover
          </p>
        </div>

      </div>
    </div>
  );
}
