import { resend } from "./mail";

export const sendPetScanNotification = async (
  ownerEmail: string,
  ownerName: string,
  petName: string,
  scanLocation?: { latitude: number; longitude: number },
  scanTime?: Date
) => {
  const formattedTime = scanTime
    ? new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Argentina/Buenos_Aires",
      }).format(scanTime)
    : new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Argentina/Buenos_Aires",
      }).format(new Date());

  const hasLocation =
    scanLocation && scanLocation.latitude !== 0 && scanLocation.longitude !== 0;
  const googleMapsLink = hasLocation
    ? `https://www.google.com/maps?q=${scanLocation.latitude},${scanLocation.longitude}&z=15`
    : null;

  try {
    const { data, error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL || "Pet Finder <onboarding@resend.dev>",
      to: [ownerEmail],
      subject: `🐾 ¡${petName} ha sido visto! - Pet Finder`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>¡Tu mascota ha sido vista!</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #28a745, #20c997); padding: 20px; text-align: center; border-radius: 8px 8px 0 0; color: white; }
              .content { background: white; padding: 30px; border: 1px solid #e9ecef; }
              .location-box { background: #e7f3ff; border: 2px solid #007bff; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
              .button { display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3); }
              .button:hover { background: #0056b3; text-decoration: none; color: white; }
              .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; color: #6c757d; }
              .info-box { background: #d4edda; border: 1px solid #28a745; padding: 15px; border-radius: 6px; margin: 20px 0; }
              .header h1 { margin: 0 0 10px 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.1); }
              .header h2 { margin: 0; font-weight: normal; opacity: 0.9; }
              .icon { font-size: 48px; margin: 10px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🐾 Pet Finder</h1>
                <h2>¡Buenas noticias!</h2>
              </div>
              
              <div class="content">
                <div class="icon">🎉</div>
                
                <p>¡Hola ${ownerName}!</p>
                
                <p><strong>¡Tenemos excelentes noticias para ti!</strong></p>
                
                <div class="info-box">
                  <strong>🐕 Tu mascota ${petName} ha sido vista</strong><br>
                  <strong>📅 Fecha y hora:</strong> ${formattedTime}<br>
                  ${
                    hasLocation
                      ? "<strong>📍 Ubicación:</strong> Disponible"
                      : "<strong>📍 Ubicación:</strong> No compartida"
                  }
                </div>

                <p>Alguien acaba de escanear el código QR de ${petName}. ¡Esto significa que tu mascota está siendo vista por personas que quieren ayudar!</p>

                ${
                  hasLocation
                    ? `
                  <div class="location-box">
                    <h3>📍 Ubicación donde fue vista</h3>
                    <p>La persona que encontró a ${petName} compartió su ubicación para ayudarte.</p>
                    <p style="text-align: center;">
                      <a href="${googleMapsLink}" class="button" style="color: white;" target="_blank">
                        Ver en Google Maps 🗺️
                      </a>
                    </p>
                    <p style="word-break: break-all; background: #f8f9fa; padding: 10px; border-radius: 4px; font-size: 12px;">
                      Enlace directo: ${googleMapsLink}
                    </p>
                  </div>
                `
                    : `
                  <div class="location-box">
                    <h3>ℹ️ Sin ubicación compartida</h3>
                    <p>La persona que encontró a ${petName} registró el avistamiento pero no compartió su ubicación.</p>
                    <p>Te recomendamos revisar las áreas cercanas donde ${petName} suele estar.</p>
                  </div>
                `
                }

                <p><strong>¿Qué hacer ahora?</strong></p>
                <ul>
                  ${
                    hasLocation
                      ? "<li>Dirígete al lugar marcado en el mapa lo antes posible</li>"
                      : ""
                  }
                  <li>Revisa las áreas cercanas a donde ${petName} fue visto por última vez</li>
                  <li>Lleva algunos premios o comida favorita</li>
                  <li>Mantén la calma y llama suavemente su nombre</li>
                  <li>Si es posible, ve acompañado de otra persona</li>
                </ul>

                <div class="info-box">
                  <strong>💡 Consejo:</strong> Las mascotas perdidas suelen esconderse durante el día y ser más activas al amanecer o atardecer.
                </div>

                <p>¡Esperamos que esta información te ayude a reunirte con ${petName} pronto! 🙏</p>
                
                <p>Con cariño,<br>El Equipo de Pet Finder</p>
              </div>
              
              <div class="footer">
                <p>Este email fue enviado a ${ownerEmail}</p>
                <p>Pet Finder - Ayudando a las mascotas a encontrar su camino a casa 🏠</p>
                <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email sending error:", error);
    return { success: false, error: "Failed to send email" };
  }
};
