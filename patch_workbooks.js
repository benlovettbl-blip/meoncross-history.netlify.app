const fs = require('fs');

const path = 'generate_pupil_workbooks.js';
let content = fs.readFileSync(path, 'utf8');

const targetStr = "if (srcObj.type === 'visual' || srcObj.src || srcObj.source || srcObj.image) {";
const replStr = "if ((srcObj.type === 'visual' || srcObj.src || srcObj.source || srcObj.image) && unitId !== 'cme_new') {";

// Replace all occurrences
content = content.split(targetStr).join(replStr);

fs.writeFileSync(path, content);
console.log('Patched generate_pupil_workbooks.js');
