const fs = require('fs');

function fixTable(filename) {
    if (!fs.existsSync(filename)) return;
    let content = fs.readFileSync(filename, 'utf8');
    let target = '<table style="page-break-inside: avoid;" style="width:100%; border-collapse:collapse; margin-top:10px; border: 1px solid #333;">';
    let replacement = '<table style="page-break-inside: avoid; width:100%; border-collapse:collapse; margin-top:10px; border: 1px solid #333;">';
    
    if (content.includes(target)) {
        content = content.replaceAll(target, replacement);
        fs.writeFileSync(filename, content);
        console.log("Fixed table style in " + filename);
    }
}

fixTable('generate_pupil_workbooks.js');
fixTable('generate_workbooks.js');
fixTable('generate_textbooks.js');
