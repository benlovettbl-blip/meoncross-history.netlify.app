const fs = require('fs');
const path = require('path');

const targetPath = path.resolve(__dirname, 'render_standard_textbook_medieval_england.cjs');
let code = fs.readFileSync(targetPath, 'utf8');

// 1. Replace ENQUIRIES definition
const startIdx = code.indexOf('const ENQUIRIES = [');
const endMarker =
  '\n// ============================================================================\n// HTML GENERATOR FUNCTION';
const endIdx = code.indexOf('// HTML GENERATOR FUNCTION');

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find ENQUIRIES markers:', { startIdx, endIdx });
  process.exit(1);
}

// Find the last "];" before endIdx
const lastBracket = code.lastIndexOf('];', endIdx);
if (lastBracket === -1) {
  console.error('Could not find ending bracket ]; before HTML GENERATOR FUNCTION');
  process.exit(1);
}

const replacement = `const ENQUIRIES = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'perfect_calibrated_enquiries.json'), 'utf8')
);`;

code = code.slice(0, startIdx) + replacement + code.slice(lastBracket + 2);

// 2. Update CSS
// Update margin-top on page-running-footer
code = code.replace(/margin-top:\s*3\.5mm;/g, 'margin-top: 2.2mm;');

// Update line-height and margin-bottom on .prose-p
code = code.replace(/line-height:\s*1\.58;/g, 'line-height: 1.57;');
code = code.replace(/margin-bottom:\s*6px;/g, 'margin-bottom: 5.8px;');

// Add last-child zero margin if not present
if (!code.includes('.prose-two-column .narrative-block:last-child')) {
  code = code.replace(
    '.narrative-block {',
    `.prose-two-column .narrative-block:last-child,\n    .prose-two-column .narrative-block:last-child .prose-p:last-child {\n      margin-bottom: 0;\n    }\n    .narrative-block {`,
  );
}

fs.writeFileSync(targetPath, code, 'utf8');
console.log('Successfully updated render_standard_textbook_medieval_england.cjs!');
