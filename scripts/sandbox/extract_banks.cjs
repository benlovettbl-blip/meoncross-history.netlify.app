const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const QRCode = require('qrcode');

const ROOT_DIR = path.resolve('.');
const dataPath = path.join(ROOT_DIR, 'units', 'water_and_sanitation', 'data.js');

const dataContent = fs.readFileSync(dataPath, 'utf8');
const startIndex = dataContent.indexOf('{');
const endIndex = dataContent.lastIndexOf('}');
const unitData = eval('(' + dataContent.substring(startIndex, endIndex + 1) + ')');
const lessons = unitData.lessons || [];

function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'water_and_sanitation', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'water_and_sanitation', 'assets', path.basename(clean)),
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      const ext = path.extname(cand).toLowerCase();
      let mime = 'image/jpeg';
      if (ext === '.png') mime = 'image/png';
      else if (ext === '.webp') mime = 'image/webp';
      else if (ext === '.svg') mime = 'image/svg+xml';
      const buf = fs.readFileSync(cand);
      return `data:${mime};base64,${buf.toString('base64')}`;
    }
  }
  return null;
}

function formatText(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

function generateQrSvg(url) {
  const qr = QRCode.create(url, { margin: 1 });
  const size = qr.modules.size;
  const data = qr.modules.data;
  let pathD = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (data[r * size + c]) {
        pathD += `M${c},${r}h1v1h-1z `;
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" style="width: 100%; height: 100%;"><path fill="#ffffff" d="M0,0h${size}v${size}H0z"/><path fill="#0f172a" d="${pathD.trim()}"/></svg>`;
}

// Read original script's banks
const origScript = fs.readFileSync(
  path.join(ROOT_DIR, 'scripts', 'render_standard_textbook_water_and_sanitation.cjs'),
  'utf8',
);

// Extract WATER_COMPONENT_BANK, WATER_LEFT_SOURCES, WATER_LEFT_VOCAB, getWaterLessonSections
const bankMatch = origScript.match(
  /const WATER_COMPONENT_BANK = \{([\s\S]*?)\n\};\n\n\/\/ Rich Disciplinary/,
);
const bankCode = bankMatch ? 'const WATER_COMPONENT_BANK = {' + bankMatch[1] + '\n};' : '';

const leftVocabMatch = origScript.match(
  /const WATER_LEFT_VOCAB = \{([\s\S]*?)\n\};\n\n\/\/ Rich Disciplinary Primary/,
);
const leftVocabCode = leftVocabMatch
  ? 'const WATER_LEFT_VOCAB = {' + leftVocabMatch[1] + '\n};'
  : '';

const leftSourcesMatch = origScript.match(
  /const WATER_LEFT_SOURCES = \{([\s\S]*?)\n\};\n\n\/\*\*\n \* Calibrated 4-Act/,
);
const leftSourcesCode = leftSourcesMatch
  ? 'const WATER_LEFT_SOURCES = {' + leftSourcesMatch[1] + '\n};'
  : '';

const secFuncMatch = origScript.match(
  /function getWaterLessonSections\(lesson, idx\) \{([\s\S]*?)\n\/\*\*\n \* Builds the complete/,
);
const secFuncCode = secFuncMatch
  ? 'function getWaterLessonSections(lesson, idx) {' + secFuncMatch[1]
  : '';

// Evaluate banks and function
eval(leftVocabCode);
eval(leftSourcesCode);
eval(bankCode);
eval(secFuncCode);

console.log('Banks and functions loaded successfully!');

// Export for calibration
module.exports = {
  WATER_COMPONENT_BANK,
  WATER_LEFT_SOURCES,
  WATER_LEFT_VOCAB,
  getWaterLessonSections,
  lessons,
  getBase64Image,
  formatText,
  generateQrSvg,
};
