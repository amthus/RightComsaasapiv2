const fs = require('fs');
const path = require('path');

const getEmailTemplate = (templateName, replacements) => {
  const filePath = path.join(__dirname, `../templates/${templateName}.html`);
  let html = fs.readFileSync(filePath, 'utf8');
  
  // Remplacer les variables {{nom}}, {{prenom}}, etc.
  Object.entries(replacements).forEach(([key, value]) => {
    html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
  });

  return html;
};

module.exports = getEmailTemplate;
