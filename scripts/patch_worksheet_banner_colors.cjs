const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, '..', 'public', 'units', 'ks2_ww2', 'worksheets'),
  path.join(__dirname, '..', 'units', 'ks2_ww2', 'worksheets'),
];

const replacementCss = `
    /* ENQUIRY TITLE BANNER & HIGH-CONTRAST TYPOGRAPHY */
    .enquiry-banner {
      background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%) !important;
      color: #ffffff !important;
      border: 1px solid #1e3a8a !important;
      border-radius: 6px !important;
      padding: 2.2mm 3.8mm !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      margin-bottom: 2.4mm !important;
      flex-shrink: 0 !important;
      box-shadow: 0 2px 5px rgba(15, 23, 42, 0.15) !important;
    }

    .enquiry-title-group {
      flex: 1 !important;
      min-width: 0 !important;
      padding-right: 4mm !important;
    }

    .enquiry-title-group h1 {
      font-family: 'Cinzel', serif !important;
      font-size: 11.2pt !important;
      font-weight: 800 !important;
      letter-spacing: 0.02em !important;
      line-height: 1.15 !important;
      color: #ffffff !important;
      margin: 0 !important;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;
    }

    .enquiry-title-group .enquiry-question,
    .enquiry-question {
      font-family: 'Lora', serif !important;
      font-size: 7.8pt !important;
      font-style: italic !important;
      color: #fef08a !important;
      margin-top: 0.5mm !important;
      line-height: 1.25 !important;
      display: block !important;
    }

    .lesson-badge {
      background: #ffffff !important;
      color: #1e3a8a !important;
      border: 1.5px solid #93c5fd !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
      padding: 1.8mm 3.8mm !important;
      border-radius: 5px !important;
      text-align: center !important;
      font-size: 7.4pt !important;
      font-weight: 900 !important;
      letter-spacing: 0.06em !important;
      white-space: nowrap !important;
      flex-shrink: 0 !important;
      line-height: 1.25 !important;
    }

    .lesson-badge span {
      color: #0369a1 !important;
      font-size: 6.2pt !important;
      font-weight: 800 !important;
      letter-spacing: 0.05em !important;
      display: block !important;
    }
`;

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.html'));
  files.forEach((f) => {
    const fullPath = path.join(dir, f);
    let html = fs.readFileSync(fullPath, 'utf8');

    // Replace the block from .enquiry-banner up to the next section or selector
    // We target .enquiry-banner through .lesson-badge { ... }
    const bannerRegex = /\.enquiry-banner\s*\{[\s\S]*?\.lesson-badge\s*\{[\s\S]*?\}/;
    if (bannerRegex.test(html)) {
      html = html.replace(bannerRegex, replacementCss.trim());
      fs.writeFileSync(fullPath, html, 'utf8');
      console.log(
        `✅ Patched banner styles in: ${path.relative(path.join(__dirname, '..'), fullPath)}`,
      );
    } else {
      console.log(`⚠️ Regex did not match in: ${f}`);
    }
  });
});

console.log('🎉 Done patching worksheet banner styles!');
