export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Preflight Pre-check
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    if (url.pathname === '/api/send-email' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { 
          name, 
          email, 
          phone, 
          projectType, 
          message, 
          experience, 
          turnstileToken, 
          toEmail, 
          formType 
        } = body;

        // 1. Spamschutz Turnstile validieren
        if (!turnstileToken) {
          return new Response(
            JSON.stringify({ success: false, message: 'Turnstile CAPTCHA Token fehlt.' }), 
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const verifyResult = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `secret=${encodeURIComponent(env.CLOUDFLARE_TURNSTILE_SECRET_KEY)}&response=${encodeURIComponent(turnstileToken)}`,
        });

        const verifyData = await verifyResult.json();
        if (!verifyData.success) {
          return new Response(
            JSON.stringify({ success: false, message: 'Spam-Schutz fehlgeschlagen. Bitte laden Sie die Seite neu.' }), 
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // 2. E-Mail über Resend formatieren und senden
        let emailSubject = '';
        let emailHtml = '';

        if (formType === 'bewerbung') {
          emailSubject = `💼 Neue Bewerbung: Kellerabdichter - ${name}`;
          emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ff8c00; border-top: 4px solid #ff8c00; border-radius: 6px;">
              <h2 style="color: #1f2937; text-transform: uppercase; margin-bottom: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">Neue Online-Bewerbung</h2>
              <p style="font-size: 16px; line-height: 1.5; color: #4b5563;"><strong>Position:</strong> Kellerabdichter / Helfer Handwerk</p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr style="background-color: #f9fafb;">
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #e5e7eb; width: 150px;">Bewerber:</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #e5e7eb;">E-Mail:</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr style="background-color: #f9fafb;">
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #e5e7eb;">Telefon:</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb;"><a href="tel:${phone}">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #e5e7eb;">Erfahrung:</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold; color: #ff8c00;">${experience}</td>
                </tr>
              </table>
              <div style="margin-top: 25px; padding: 15px; background-color: #f3f4f6; border-left: 3px solid #ff8c00; border-radius: 0 4px 4px 0;">
                <h4 style="margin: 0 0 10px 0; color: #1f2937; text-transform: uppercase;">Nachricht / Motivation:</h4>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #4b5563; white-space: pre-wrap;">${message || 'Keine Nachricht hinterlassen.'}</p>
              </div>
              <p style="font-size: 12px; color: #9ca3af; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 15px; text-align: center;">Website: elementbau-ni.de | Design by Scholz & Friese</p>
            </div>
          `;
        } else {
          // Standard Kontaktformular
          emailSubject = `✉️ Neue Projektanfrage: ${projectType} - ${name}`;
          emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ff8c00; border-top: 4px solid #ff8c00; border-radius: 6px;">
              <h2 style="color: #1f2937; text-transform: uppercase; margin-bottom: 20px; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">Neue Projektanfrage</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr style="background-color: #f9fafb;">
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #e5e7eb; width: 150px;">Name:</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #e5e7eb;">E-Mail:</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr style="background-color: #f9fafb;">
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #e5e7eb;">Telefon:</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb;"><a href="tel:${phone}">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; border: 1px solid #e5e7eb;">Projektart:</td>
                  <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold; color: #ff8c00;">${projectType}</td>
                </tr>
              </table>
              <div style="margin-top: 25px; padding: 15px; background-color: #f3f4f6; border-left: 3px solid #ff8c00; border-radius: 0 4px 4px 0;">
                <h4 style="margin: 0 0 10px 0; color: #1f2937; text-transform: uppercase;">Projektbeschreibung:</h4>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #4b5563; white-space: pre-wrap;">${message}</p>
              </div>
              <p style="font-size: 12px; color: #9ca3af; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 15px; text-align: center;">Website: elementbau-ni.de | Design by Scholz & Friese</p>
            </div>
          `;
        }

        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Elementbau Nienburg <anfragen@scholz-friese.de>',
            to: toEmail || 'info@elementbau-ni.de',
            reply_to: email,
            subject: emailSubject,
            html: emailHtml,
          }),
        });

        if (!resendResponse.ok) {
          const errData = await resendResponse.json();
          return new Response(
            JSON.stringify({ success: false, message: 'Fehler beim E-Mail-Versand über Resend.', error: errData }), 
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({ success: true, message: 'Bewerbung/Anfrage erfolgreich per E-Mail gesendet.' }), 
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      } catch (err) {
        return new Response(
          JSON.stringify({ success: false, message: 'Serverfehler.', error: err.message }), 
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response(
      JSON.stringify({ success: false, message: 'Endpunkt nicht gefunden.' }), 
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};
