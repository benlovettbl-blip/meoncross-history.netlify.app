const fs = require('fs');

async function addQuotes() {
  const jsFile = 'src/key_individuals.js';
  let jsContent = fs.readFileSync(jsFile, 'utf8');
  
  const searchStr = `    if (!hasDetailedContent) {`;
  
  const replaceStr = `    if (person.quotes) {
      hasDetailedContent = true;
      let quotesHtml = Array.isArray(person.quotes) ? person.quotes.map(q => \`&ldquo;\${q}&rdquo;\`).join('<br><br>') : \`&ldquo;\${person.quotes}&rdquo;\`;
      backHtml += \`
        <div style="background: rgba(168, 85, 247, 0.1); border-left: 3px solid #a855f7; padding: 10px; margin-bottom: 10px; border-radius: 4px;">
          <strong style="color: #a855f7; display: block; margin-bottom: 3px; font-size: 0.85rem; text-transform: uppercase;">Key Quotes</strong>
          <span style="font-size: 0.9rem; color: var(--text-main); display: block; font-style: italic;">\${quotesHtml}</span>
        </div>\`;
    }
  
    if (!hasDetailedContent) {`;

  jsContent = jsContent.split(searchStr).join(replaceStr);
  fs.writeFileSync(jsFile, jsContent);
  console.log("Patched key_individuals.js with quotes");
}

addQuotes().catch(console.error);
