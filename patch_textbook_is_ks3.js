const fs = require('fs');
let c = fs.readFileSync('generate_textbooks.js', 'utf8');

c = c.replace('const processTaskTextWithTariff = (text) => {', 'const processTaskTextWithTariff = (text, is_ks3 = false) => {');

let oldIf = '        if (marks === 16) time = 20;\n        \n        return text + ` <span style="display: inline-block; background-color: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-size: 10pt; padding: 2px 8px; border-radius: 12px; font-weight: normal; vertical-align: middle; margin-left: 10px;">[${marks} marks &bull; ${time} mins]</span>`;';
let newIf = `        if (marks === 16) time = 20;\n        if (is_ks3) {\n            if (match) {\n                text = text.replace(match[0], '').trim();\n            }\n            return text;\n        }\n        \n        return text + \` <span style="display: inline-block; background-color: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-size: 10pt; padding: 2px 8px; border-radius: 12px; font-weight: normal; vertical-align: middle; margin-left: 10px;">[\${marks} marks &bull; \${time} mins]</span>\`;`;

c = c.replace(oldIf, newIf);

c = c.replace(/processTaskTextWithTariff\((.*?)\)/g, (match, p1) => {
    if (p1.includes('is_ks3')) return match;
    if (p1 === 'text, is_ks3 = false') return match;
    return `processTaskTextWithTariff(${p1}, unitData.is_ks3)`;
});

fs.writeFileSync('generate_textbooks.js', c);
console.log('Patched generate_textbooks.js');
