/**
 * scripts/strip_all_historians_corner.cjs
 *
 * 1. Creates timestamped backups of data.js in temp_backups/
 * 2. Safely strips all historians_corner blocks from:
 *    - units/great_war/data.js
 *    - units/great_war_part2/data.js
 *    - units/water_and_sanitation/data.js
 *    - units/usa/data.js
 *    - units/cme_new/data.js
 * 3. Verifies syntax on every file.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');
const backupDir = path.join(ROOT_DIR, 'temp_backups');

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

function stripHistoriansCorner(code) {
  let idx = 0;
  let count = 0;
  while (true) {
    const match = code.indexOf('historians_corner:', idx);
    if (match === -1) break;

    const openBrace = code.indexOf('{', match);
    if (openBrace === -1) break;

    let depth = 1;
    let pos = openBrace + 1;
    let inString = false;
    let stringChar = '';
    let inEscape = false;

    while (pos < code.length && depth > 0) {
      const ch = code[pos];
      if (inEscape) {
        inEscape = false;
      } else if (ch === '\\') {
        inEscape = true;
      } else if (inString) {
        if (ch === stringChar) inString = false;
      } else if (ch === '"' || ch === "'" || ch === '`') {
        inString = true;
        stringChar = ch;
      } else if (ch === '{') {
        depth++;
      } else if (ch === '}') {
        depth--;
      }
      pos++;
    }

    let endPos = pos;
    while (endPos < code.length && (code[endPos] === ' ' || code[endPos] === '\t')) endPos++;
    if (code[endPos] === ',') endPos++;
    while (endPos < code.length && (code[endPos] === ' ' || code[endPos] === '\t')) endPos++;
    if (code[endPos] === '\n') endPos++;
    else if (code[endPos] === '\r' && code[endPos + 1] === '\n') endPos += 2;

    let startPos = match;
    while (startPos > 0 && (code[startPos - 1] === ' ' || code[startPos - 1] === '\t')) {
      startPos--;
    }

    code = code.slice(0, startPos) + code.slice(endPos);
    count++;
    idx = startPos;
  }
  return { code, count };
}

const targetDirs = [path.join(ROOT_DIR, 'units'), path.join(ROOT_DIR, 'public', 'units')];
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

let totalStripped = 0;

targetDirs.forEach((parentDir) => {
  if (!fs.existsSync(parentDir)) return;
  const dirs = fs
    .readdirSync(parentDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  dirs.forEach((unit) => {
    const filePath = path.join(parentDir, unit, 'data.js');
    if (!fs.existsSync(filePath)) return;

    // Check if file contains historians_corner
    const originalCode = fs.readFileSync(filePath, 'utf8');
    if (!originalCode.includes('historians_corner')) return;

    // Backup
    const relTag = parentDir.includes('public') ? 'public_' : '';
    const backupPath = path.join(backupDir, `${relTag}${unit}_data_${timestamp}.js`);
    fs.copyFileSync(filePath, backupPath);
    console.log(`📦 Backup created: ${backupPath}`);

    // Strip
    const { code: strippedCode, count } = stripHistoriansCorner(originalCode);
    totalStripped += count;

    fs.writeFileSync(filePath, strippedCode, 'utf8');
    console.log(`🧹 ${relTag}${unit}: Stripped ${count} instances of historians_corner.`);

    // Validate syntax
    try {
      execSync(`node --check "${filePath}"`, { stdio: 'inherit' });
      console.log(`✅ ${relTag}${unit}/data.js: Syntax validated.`);
    } catch (err) {
      console.error(`❌ Syntax error in ${relTag}${unit}/data.js! Restoring backup...`);
      fs.copyFileSync(backupPath, filePath);
      process.exit(1);
    }
  });
});

console.log(
  `\n🎉 Complete! Successfully stripped a total of ${totalStripped} historians_corner instances.`,
);
