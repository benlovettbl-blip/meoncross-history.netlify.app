const fs = require('fs');
const file = 'src/key_individuals.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace('export function initKeyIndividualsTask(container, keyIndividualsData) {', 'export function initKeyIndividualsTask(container, keyIndividualsData, customTitle, customDescription) {');

const headerRegex = /header\.innerHTML = `[\s\S]+?`;/;
const newHeader = `  const title = customTitle || 'Key Individuals';
  const desc = customDescription || 'Profiles of the major historical figures who shaped these events.';
  header.innerHTML = \`
    <h1 style="font-family: var(--font-heading); color: var(--primary); margin-bottom: 10px; font-size: 2.5rem;">\${title}</h1>
    <p style="color: var(--text-muted); font-size: 1.1rem; max-width: 600px; margin: 0 auto;">\${desc}</p>
  \`;`;

content = content.replace(headerRegex, newHeader);
fs.writeFileSync(file, content);
console.log("Updated key_individuals.js");
