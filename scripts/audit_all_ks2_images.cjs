const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');
const dirsToScan = [
  path.join(baseDir, 'public', 'units', 'ks2_ww2'),
  path.join(baseDir, 'units', 'ks2_ww2'),
];

const results = [];

function checkBufferForAI(buf, label) {
  const str = buf.toString('latin1');
  const isC2PA =
    str.includes('c2pa') ||
    str.includes('SynthID') ||
    str.includes('trainedAlgorithmicMedia') ||
    str.includes('Generative AI');
  const isDallE = str.includes('DALL-E') || str.includes('OpenAI');
  const isMidjourney = str.includes('Midjourney');
  const isAI = isC2PA || isDallE || isMidjourney;
  return {
    label,
    size: buf.length,
    isAI,
    details: isAI
      ? str.includes('Generative AI')
        ? 'Google Generative AI / SynthID'
        : 'AI Metadata Detected'
      : 'Clean / Archival',
  };
}

// 1. Check all files in assets directories
function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      scanDir(full);
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(f)) {
      const buf = fs.readFileSync(full);
      results.push(checkBufferForAI(buf, full.replace(baseDir, '')));
    }
  }
}

dirsToScan.forEach(scanDir);

// 2. Scan all HTML worksheets for embedded base64 images
const worksheetsDir = path.join(baseDir, 'public', 'units', 'ks2_ww2', 'worksheets');
if (fs.existsSync(worksheetsDir)) {
  const wsFiles = fs.readdirSync(worksheetsDir).filter((f) => f.endsWith('.html'));
  for (const wf of wsFiles) {
    const content = fs.readFileSync(path.join(worksheetsDir, wf), 'utf8');
    const matches = [...content.matchAll(/src="(data:image\/[^;]+;base64,([A-Za-z0-9+/=]+))"/g)];
    matches.forEach((m, idx) => {
      const buf = Buffer.from(m[2], 'base64');
      results.push(checkBufferForAI(buf, `[Inlined in ${wf} - Image ${idx + 1}]`));
    });
  }
}

console.log('=== AUDIT RESULTS FOR KS2 WW2 IMAGES ===\n');
let aiCount = 0;
results.forEach((r) => {
  if (r.isAI) {
    aiCount++;
    console.log(`🚨 AI DETECTED: ${r.label} (${r.size} bytes) -> ${r.details}`);
  } else {
    // console.log(`✅ OK: ${r.label} (${r.size} bytes)`);
  }
});

console.log(`\nTotal images scanned: ${results.length}`);
console.log(`Total AI images detected: ${aiCount}`);
