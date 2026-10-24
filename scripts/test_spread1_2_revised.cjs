const fs = require('fs');
const path = require('path');
const vm = require('vm');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.resolve(__dirname, '..');
const dataPath = path.join(ROOT_DIR, 'units', 'cme_new', 'data.js');

let raw = fs.readFileSync(dataPath, 'utf8');
raw =
  raw
    .replace(/export\s+const\s+unitData\s*=/g, 'const unitData =')
    .replace(/export\s+default\s+unitData;?/g, '')
    .replace(/export\s*\{[^}]*\};?/g, '') + '; unitData;';

const unitData = vm.runInNewContext(raw);
const l1 = unitData.lessons[0];
const l2 = unitData.lessons[1];

console.log('Loaded lessons 1 and 2.');
console.log('L1 blocks:', l1.narrative_blocks.length);
console.log('L2 blocks:', l2.narrative_blocks.length);
