const express = require('express');
const { Client } = require('mailersend'); // Asegúrate de instalar mailersend
const router = express.Router();
const { MailerSend } = require('mailersend');
   const mailersend = new MailerSend({ apiKey: 'mlsn.3e1d4cc1d31ec4bd6c22baaa81c6998554b1af6d56d119ec582828be995fa7ef' });
// Ruta para enviar correo con la serie Fibonacci
router.post('/send-email', async (req, res) => {
  try {
    const { hour, minute, second, series, email, subject } = req.body;

    // Validar datos
    if (!email || !subject || !series) {
      return res.status(400).send({ error: 'Por favor, proporciona un correo, asunto y la serie Fibonacci.' });
    }

    // Formato de la hora (ejemplo: "12:23")
    const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

    // Cuerpo del correo electrónico
    const emailContent = `
      La serie Fibonacci generada es:
      ${series.join(', ')}

      Hora exacta de generación: ${formattedTime}
    `;

    // Parámetros del correo
    const emailParams = {
      from: 'cristianrojas350@gmail.com', // Reemplaza con tu dirección de correo
      fromName: 'Pruebas', // Nombre del remitente
      to: [{ email: email, name: 'Destinatario' }], // Destinatario
      subject: subject || 'Prueba técnica - Pepito Pérez', // Asunto
      html: `<p>${emailContent.replace(/\n/g, '<br>')}</p>`, // Cuerpo en HTML
      text: emailContent, // Cuerpo en texto
    };

    // Enviar el correo usando MailerSend
    await mailersend.sendTransacEmail(emailParams); // Método para enviar el correo

    // Respuesta exitosa
    res.status(200).send({ message: 'Correo enviado correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Hubo un error al intentar enviar el correo.' });
  }
});

module.exports = router;
