const fs = require('fs');

function patchFile(filename, replacements) {
    if (!fs.existsSync(filename)) return;
    let code = fs.readFileSync(filename, 'utf8');
    let original = code;
    
    replacements.forEach(rep => {
        if (rep.target instanceof RegExp) {
            code = code.replace(rep.target, rep.replacement);
        } else if (code.includes(rep.target)) {
            code = code.replace(rep.target, rep.replacement);
        } else {
            console.log(`Warning: Target not found in ${filename}:`, rep.target.toString().substring(0, 50));
        }
    });

    if (code !== original) {
        fs.writeFileSync(filename, code);
        console.log(`Patched ${filename}`);
    } else {
        console.log(`No changes made to ${filename}`);
    }
}

// 1. Enlarge Tracking Grid
const trackerTarget = /<table style="width: 100%; border-collapse: collapse; font-size: 11pt;">/g;
const trackerReplacement = `<table style="width: 100%; border-collapse: collapse; font-size: 13pt;">`;

const trackerHeader1 = /padding: 10px; border: 1px solid #cbd5e1; width: 60%; text-align: left;/g;
const trackerHeaderReplacement1 = `padding: 14px; border: 1px solid #cbd5e1; width: 60%; text-align: left;`;
const trackerHeader2 = /padding: 10px; border: 1px solid #cbd5e1; width: 10%; text-align: center;/g;
const trackerHeaderReplacement2 = `padding: 14px; border: 1px solid #cbd5e1; width: 10%; text-align: center;`;

// 2. Resize Primary Source Maps
const mapStyleTarget = /const style = lesson\.primary_source\.custom_style \|\| \(srcs\.length > 1 \? 'max-width: 48%; max-height: 250px; object-fit: contain;  border-radius: 4px; box-shadow: 2px 2px 5px rgba\(0,0,0,0\.1\);' : 'max-width: 100%; max-height: 250px; object-fit: contain;  border-radius: 4px; box-shadow: 2px 2px 5px rgba\(0,0,0,0\.1\);'\);/g;
const mapStyleReplacement = `const style = lesson.primary_source.custom_style || (srcs.length > 1 ? 'max-width: 100%; max-height: 450px; object-fit: contain; display: block; margin: 0 auto; border-radius: 4px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1);' : 'max-width: 100%; max-height: 350px; object-fit: contain;  border-radius: 4px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1);');`;
const mapFlexTarget = /<div style="display: flex; justify-content: center; gap: 10px; margin: 10px 0;">\$\{imgTags\}<\/div>/g;
const mapFlexReplacement = `<div style="\${srcs.length > 1 ? 'display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 20px;' : 'display: flex; justify-content: center; gap: 10px;'} margin: 15px 0;">\${imgTags}</div>`;


// 3. Remove Double Page Numbering
const pageNumberTarget = /@page\s*\{\s*@bottom-center\s*\{\s*content:\s*"Page "\s*counter\(page\);\s*font-family:[^}]+\}\s*\}/g;


// 4. Fix "Q4. undefined" Bug
const dragDropSkipTarget = `if (task.type === 'vocab_match') {`;
const dragDropSkipReplacement = `if (task.type === 'vocab_match' || task.type === 'drag_drop_timeline') {`;


const replacements = [
    { target: trackerTarget, replacement: trackerReplacement },
    { target: trackerHeader1, replacement: trackerHeaderReplacement1 },
    { target: trackerHeader2, replacement: trackerHeaderReplacement2 },
    { target: mapStyleTarget, replacement: mapStyleReplacement },
    { target: mapFlexTarget, replacement: mapFlexReplacement },
    { target: pageNumberTarget, replacement: '' },
    { target: dragDropSkipTarget, replacement: dragDropSkipReplacement }
];

patchFile('generate_workbooks.js', replacements);
patchFile('generate_pupil_workbooks.js', replacements);

// Also remove page numbering from textbooks and guided reading just in case
patchFile('generate_textbooks.js', [{ target: pageNumberTarget, replacement: '' }]);
patchFile('generate_guided_reading.js', [{ target: pageNumberTarget, replacement: '' }]);

// Apply tracker padding logic globally to workbooks
patchFile('generate_workbooks.js', [
    { target: /padding:6px/g, replacement: 'padding:10px' },
    { target: /padding:4px/g, replacement: 'padding:10px' }
]);
patchFile('generate_pupil_workbooks.js', [
    { target: /padding:6px/g, replacement: 'padding:10px' },
    { target: /padding:4px/g, replacement: 'padding:10px' }
]);
