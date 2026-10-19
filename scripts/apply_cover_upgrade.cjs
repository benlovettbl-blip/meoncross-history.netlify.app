const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, 'render_standard_textbook_cme_unified.cjs');
let code = fs.readFileSync(targetFile, 'utf8');

// 1. Remove cover-concept-strip from HTML template
code = code.replace(
  `      <!-- CORE CONCEPTS STRIP -->\n      <div class="cover-concept-strip">\n        <span class="cover-concept-label">Core Concepts</span>\n        <span>\${DATA.COVER_CONFIG.coreConcepts.join(' &bull; ')}</span>\n      </div>`,
  '',
);

// 2. Remove the double headings from cover-enquiries-box
code = code.replace(
  `      <!-- 12 ENQUIRIES OVERVIEW BOX -->\n      <div class="cover-enquiries-box">\n        <div class="cover-enquiries-header">\n          <h2>Pearson Edexcel Curriculum Architecture</h2>\n          <span>Option P5 Specification: Key Topics 1, 2 &amp; 3 (12 Core Enquiries)</span>\n        </div>\n        <div class="cover-enquiry-list">`,
  `      <!-- 12 ENQUIRIES OVERVIEW BOX -->\n      <div class="cover-enquiries-box">\n        <div class="cover-enquiry-list">`,
);

// 3. Update CSS for cover-enquiries-box and cover-enquiry-list
code = code.replace(
  /\.cover-enquiries-box\s*\{[^}]*\}\s*\.cover-enquiries-header\s*\{[^}]*\}\s*\.cover-enquiries-header h2\s*\{[^}]*\}\s*\.cover-enquiries-header span\s*\{[^}]*\}\s*\.cover-enquiry-list\s*\{[^}]*\}/s,
  `.cover-enquiries-box {
      background: #ffffff;
      color: #0f172a;
      border-radius: 4px;
      padding: 12px 16px;
      margin-bottom: 2mm;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .cover-enquiry-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px 18px;
      flex: 1;
      align-content: space-around;
    }`,
);

// 4. Update cover-enquiry-item, num, and text CSS
code = code.replace(
  /\.cover-enquiry-item\s*\{[^}]*\}\s*\.cover-enquiry-num\s*\{[^}]*\}/s,
  `.cover-enquiry-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 7.2pt;
    }
    .cover-enquiry-num {
      font-family: var(--font-sans);
      font-weight: 800;
      color: var(--crimson-accent);
      background: #fee2e2;
      padding: 1.5px 5px;
      border-radius: 2px;
      font-size: 6.2pt;
      white-space: nowrap;
    }`,
);

code = code.replace(
  /\.cover-enquiry-title\s*\{[^}]*\}\s*\.cover-enquiry-locator\s*\{[^}]*\}\s*\.cover-enquiry-question\s*\{[^}]*\}/s,
  `.cover-enquiry-title {
      font-weight: 700;
      color: #0f172a;
      font-family: var(--font-sans);
      font-size: 7.8pt;
    }
    .cover-enquiry-locator {
      font-size: 6.6pt;
      color: #64748b;
      font-weight: 600;
    }
    .cover-enquiry-question {
      font-style: italic;
      color: #475569;
      font-size: 7.2pt;
      line-height: 1.25;
    }`,
);

// 5. Add autoFitCoverEnquiries to the script
const autoFitCoverCode = `
    function autoFitCoverEnquiries() {
      const p1 = document.querySelector('#page-1');
      const items = Array.from(document.querySelectorAll('#page-1 .cover-enquiry-item'));
      if (!p1 || !items.length) return;
      
      let bestFs = 6.8;
      for (let fs = 6.8; fs <= 9.5; fs += 0.1) {
        items.forEach(it => {
          it.querySelectorAll('.cover-enquiry-title').forEach(t => t.style.fontSize = (fs + 0.6).toFixed(1) + 'pt');
          it.querySelectorAll('.cover-enquiry-question').forEach(q => { q.style.fontSize = fs.toFixed(1) + 'pt'; q.style.lineHeight = '1.25'; });
          it.querySelectorAll('.cover-enquiry-locator').forEach(l => l.style.fontSize = (fs - 0.4).toFixed(1) + 'pt');
          it.querySelectorAll('.cover-enquiry-num').forEach(n => n.style.fontSize = (fs - 0.4).toFixed(1) + 'pt');
        });
        if (p1.scrollHeight <= p1.clientHeight) {
          bestFs = fs;
        } else {
          break;
        }
      }
      items.forEach(it => {
        it.querySelectorAll('.cover-enquiry-title').forEach(t => t.style.fontSize = (bestFs + 0.6).toFixed(1) + 'pt');
        it.querySelectorAll('.cover-enquiry-question').forEach(q => { q.style.fontSize = bestFs.toFixed(1) + 'pt'; q.style.lineHeight = '1.25'; });
        it.querySelectorAll('.cover-enquiry-locator').forEach(l => l.style.fontSize = (bestFs - 0.4).toFixed(1) + 'pt');
        it.querySelectorAll('.cover-enquiry-num').forEach(n => n.style.fontSize = (bestFs - 0.4).toFixed(1) + 'pt');
      });
      return bestFs;
    }
`;

if (!code.includes('function autoFitCoverEnquiries()')) {
  code = code.replace(
    "window.addEventListener('DOMContentLoaded', autoFitKeyTopicCards);",
    `${autoFitCoverCode.trim()}\n    window.addEventListener('DOMContentLoaded', autoFitKeyTopicCards);\n    window.addEventListener('DOMContentLoaded', autoFitCoverEnquiries);\n    window.autoFitCoverEnquiries = autoFitCoverEnquiries;`,
  );
}

// Ensure Puppeteer runs autoFitCoverEnquiries
if (!code.includes('window.autoFitCoverEnquiries && window.autoFitCoverEnquiries()')) {
  code = code.replace(
    'await page.evaluate(() => window.autoFitKeyTopicCards && window.autoFitKeyTopicCards());',
    'await page.evaluate(() => {\n    if (window.autoFitCoverEnquiries) window.autoFitCoverEnquiries();\n    if (window.autoFitKeyTopicCards) window.autoFitKeyTopicCards();\n  });',
  );
}

fs.writeFileSync(targetFile, code, 'utf8');
console.log(
  'Successfully updated render_standard_textbook_cme_unified.cjs with upgraded front cover!',
);
