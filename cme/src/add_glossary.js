const fs = require('fs');
const content = `
export function renderGlossaryView() {
  const container = document.getElementById('main-content');
  if (!container) return;

  let html = \`<div class="study-tools-header">
    <h2><i class="fa-solid fa-book-atlas"></i> Interactive Glossary (Tier 3 Words)</h2>
    <p style="color: var(--text-muted);">Master the key vocabulary essential for GCSE History.</p>
  </div>
  <div class="glossary-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; padding: 16px;">\`;

  GLOSSARY_TERMS.forEach((term, index) => {
    html += \`
      <div class="flashcard" style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 8px; padding: 16px; cursor: pointer; transition: transform 0.2s;" onclick="this.classList.toggle('flipped');">
        <div class="flashcard-inner" style="position: relative; width: 100%; height: 100%;">
          <h3 style="color: var(--primary); margin-bottom: 8px;">\${term.term}</h3>
          <p style="font-size: 0.95rem; line-height: 1.4; margin-bottom: 12px;">\${term.definition}</p>
          <div style="background: rgba(255,255,255,0.05); padding: 8px; border-radius: 4px; border-left: 3px solid var(--accent);">
            <small style="color: var(--text-muted); font-style: italic;">e.g., \${term.example}</small>
          </div>
        </div>
      </div>
    \`;
  });

  html += '</div>';
  container.innerHTML = html;
}
`;
fs.appendFileSync('cme_structured/src/views.js', content);
console.log('Appended renderGlossaryView successfully.');
