import { resend } from "./mail";

export const sendEmailChangeVerification = async (
  newEmail: string,
  token: string,
  name?: string
) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/home/profile/verify-email-change?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL || "Pet Finder <onboarding@resend.dev>",
      to: [newEmail],
      subject: "Verificar nuevo email - Pet Finder",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Verificar nuevo email</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #ff8c00, #ff6347); padding: 20px; text-align: center; border-radius: 8px 8px 0 0; color: white; }
              .content { background: white; padding: 30px; border: 1px solid #e9ecef; }
              .code { background: #f8f9fa; border: 2px dashed #ff8c00; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
              .code-number { font-size: 32px; font-weight: bold; color: #ff8c00; letter-spacing: 8px; font-family: 'Courier New', monospace; }
              .button { display: inline-block; background: #ff8c00; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; box-shadow: 0 2px 4px rgba(255, 140, 0, 0.3); }
              .button:hover { background: #e67e00; text-decoration: none; color: white; }
              .footer { background: #fff5f0; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; color: #6c757d; }
              .warning { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 6px; margin: 20px 0; }
              .header h1 { margin: 0 0 10px 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.1); }
              .header h2 { margin: 0; font-weight: normal; opacity: 0.9; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🐾 Pet Finder</h1>
                <h2>Verificar Nuevo Email</h2>
              </div>
              
              <div class="content">
                <p>¡Hola ${name || ""}! 👋</p>
                
                <p>Recibimos una solicitud para cambiar tu dirección de email. Para confirmar este cambio, usa el siguiente código de verificación:</p>
                
                <div class="code">
                  <div class="code-number">${token}</div>
                </div>
                
                <p>Ingresa este código de 6 dígitos en la página de verificación, o haz clic en el botón a continuación:</p>
                
                <p style="text-align: center;">
                  <a 
                  style="color: white;"
                  href="${confirmLink}" class="button">Verificar Nuevo Email</a>
                </p>
                
                <div class="warning">
                  <strong>⚠️ Importante:</strong>
                  <ul>
                    <li>Este código expirará en 1 hora</li>
                    <li>Si no solicitaste este cambio, ignora este email</li>
                    <li>No compartas este código con nadie</li>
                    <li>Tu email actual seguirá activo hasta que confirmes el cambio</li>
                  </ul>
                </div>
                
                <p>Si tienes alguna pregunta, no dudes en responder a este email.</p>
                
                <p>Saludos cordiales,<br>El Equipo de Pet Finder</p>
              </div>
              
              <div class="footer">
                <p>Este email fue enviado a ${newEmail}</p>
                <p>Pet Finder - Ayudando a las mascotas a encontrar su camino a casa 🏠</p>
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
