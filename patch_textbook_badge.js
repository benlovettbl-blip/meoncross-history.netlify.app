const fs = require('fs');
let c = fs.readFileSync('generate_textbooks.js', 'utf8');

// Patch getTariffBadge signature
c = c.replace('const getTariffBadge = (topic) => {', 'const getTariffBadge = (topic, is_ks3 = false) => {');

// Patch getTariffBadge return
let oldRet = '    return {\n        cleanTopic: topic,\n        badgeHtml: ` <span style="display: inline-block; background-color: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-size: 10pt; padding: 2px 8px; border-radius: 12px; font-weight: normal; vertical-align: middle; margin-left: 10px;">[${marks} marks &bull; ${time} mins]</span>`\n    };';
let newRet = '    return {\n        cleanTopic: topic,\n        badgeHtml: is_ks3 ? "" : ` <span style="display: inline-block; background-color: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-size: 10pt; padding: 2px 8px; border-radius: 12px; font-weight: normal; vertical-align: middle; margin-left: 10px;">[${marks} marks &bull; ${time} mins]</span>`\n    };';
c = c.replace(oldRet, newRet);

// Patch getTariffBadge calls to pass unitData.is_ks3
c = c.replace(/getTariffBadge\((.*?)\)/g, (match, p1) => {
    if (p1.includes('is_ks3')) return match;
    if (p1 === 'topic, is_ks3 = false') return match;
    return `getTariffBadge(${p1}, unitData.is_ks3)`;
});

fs.writeFileSync('generate_textbooks.js', c);
console.log('Patched getTariffBadge in generate_textbooks.js');
