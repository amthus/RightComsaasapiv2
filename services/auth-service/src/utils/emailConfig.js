const nodemailer = require("nodemailer");

// Configuration du transporteur pour Mailtrap
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: 'smtp.gmail.com', 
  port: 465, 
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASSWORD, 
  },
});

// Fonction pour envoyer un email
const sendEmail = async (to, subject, text, html, attachments) => {
  if (!to || !subject || !text) {
    throw new Error("Missing required email parameters");
  }

  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to,
    subject,
    text,
    html: html|| `<p>${text}</p>`,
    attachments,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email envoyé avec succès");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    throw error;
  }
};

module.exports = sendEmail;

/** via mailtrap */

// const nodemailer = require("nodemailer");

// // Configuration du transporteur pour Mailtrap
// const transporter = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: process.env.MAILTRAP_USER, 
//     pass: process.env.MAILTRAP_PASSWORD, 
//   },
// });

// // Fonction pour envoyer un email
// const sendEmail = async (to, subject, text, html, attachments) => {
//   if (!to || !subject || !text) {
//     throw new Error("Missing required email parameters");
//   }

//   const mailOptions = {
//     from: process.env.EMAIL_USER, // Vous pouvez utiliser une adresse email fictive ici
//     to,
//     subject,
//     text,
//     html: html|| `<p>${text}</p>`,
//     attachments,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("Email envoyé avec succès");
//   } catch (error) {
//     console.error("Erreur lors de l'envoi de l'email :", error);
//     throw error;
//   }
// };

// module.exports = sendEmail;