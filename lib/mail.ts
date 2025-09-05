import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export { resend };

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name?: string
) => {
  const confirmLink = `${
    process.env.NEXT_PUBLIC_APP_URL
  }/auth/verify-email?email=${encodeURIComponent(email)}&token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL || "Pet Finder <onboarding@resend.dev>",
      to: [email],
      subject: "Verifica tu dirección de email",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Verifica tu email</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #ff8c00, #ff6347); padding: 20px; text-align: center; border-radius: 8px 8px 0 0; color: white; }
              .content { background: white; padding: 30px; border: 1px solid #e9ecef; }
              .code-box { background: #fff5f0; border: 2px dashed #ff8c00; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
              .code { font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #ff6347; font-family: monospace; }
              .button { display: inline-block; background: #ff6347; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; box-shadow: 0 2px 4px rgba(255, 99, 71, 0.3); }
              .button:hover { background: #ff4500; text-decoration: none; color: white; }
              .footer { background: #fff5f0; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; color: #6c757d; }
              .warning { background: #fff3cd; border: 1px solid #ff8c00; padding: 15px; border-radius: 6px; margin: 20px 0; }
              .header h1 { margin: 0 0 10px 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.1); }
              .header h2 { margin: 0; font-weight: normal; opacity: 0.9; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🐾 Pet Finder</h1>
                <h2>Verificación de Email</h2>
              </div>
              
              <div class="content">
                <p>¡Hola ${name || ""}! 👋</p>
                
                <p>¡Bienvenido a Pet Finder! Para completar tu registro, por favor verifica tu dirección de email usando el código de verificación a continuación:</p>
                
                <div class="code-box">
                  <div class="code">${token}</div>
                </div>
                
                <p>Ingresa este código de 6 dígitos en la página de verificación, o haz clic en el botón a continuación:</p>
                
                <p style="text-align: center;">
                  <a 
                  style="color: white;"
                  href="${confirmLink}" class="button">Verificar Dirección de Email</a>
                </p>
                
                <div class="warning">
                  <strong>⚠️ Importante:</strong>
                  <ul>
                    <li>Este código expirará en 1 hora</li>
                    <li>Si no creaste esta cuenta, por favor ignora este email</li>
                    <li>No compartas este código con nadie</li>
                  </ul>
                </div>
                
                <p>Si tienes alguna pregunta, no dudes en responder a este email.</p>
                
                <p>Saludos cordiales,<br>El Equipo de Pet Finder</p>
              </div>
              
              <div class="footer">
                <p>Este email fue enviado a ${email}</p>
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

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  name?: string
) => {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL || "Pet Finder <onboarding@resend.dev>",
      to: [email],
      subject: "Restablecer tu contraseña - Pet Finder",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Restablecer tu contraseña</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #ff8c00, #ff6347); padding: 20px; text-align: center; border-radius: 8px 8px 0 0; color: white; }
              .content { background: white; padding: 30px; border: 1px solid #e9ecef; }
              .button { display: inline-block; background: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; box-shadow: 0 2px 4px rgba(220, 53, 69, 0.3); }
              .button:hover { background: #c82333; text-decoration: none; color: white; }
              .footer { background: #fff5f0; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; color: #6c757d; }
              .warning { background: #f8d7da; border: 1px solid #dc3545; padding: 15px; border-radius: 6px; margin: 20px 0; }
              .header h1 { margin: 0 0 10px 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.1); }
              .header h2 { margin: 0; font-weight: normal; opacity: 0.9; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🐾 Pet Finder</h1>
                <h2>Restablecer Contraseña</h2>
              </div>
              
              <div class="content">
                <p>¡Hola ${name || ""}! 👋</p>
                
                <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta de Pet Finder.</p>
                
                <p style="text-align: center;">
                  <a
                    style="color: white;"
                   href="${resetLink}" class="button">Restablecer Contraseña</a>
                </p>
                
                <div class="warning">
                  <strong>⚠️ Aviso de Seguridad:</strong>
                  <ul>
                    <li>Este enlace expirará en 1 hora</li>
                    <li>Si no solicitaste este restablecimiento, ignora este email</li>
                    <li>Tu contraseña permanecerá sin cambios</li>
                  </ul>
                </div>
                
                <p>Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
                <p style="word-break: break-all; background: #f8f9fa; padding: 10px; border-radius: 4px;">${resetLink}</p>
                
                <p>Saludos cordiales,<br>El Equipo de Pet Finder</p>
              </div>
              
              <div class="footer">
                <p>Este email fue enviado a ${email}</p>
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
