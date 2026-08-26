const fs = require('fs');

function patchBadge(filename) {
    if (!fs.existsSync(filename)) return;
    let content = fs.readFileSync(filename, 'utf8');
    
    // We will just replace the exact lines manually.
    let lines = content.split('\n');
    let startIdx = -1;
    let endIdx = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('const badgeSource = (title, overrideLetter = null) => {')) {
            startIdx = i;
        }
        if (startIdx !== -1 && lines[i].includes('};') && i > startIdx) {
            endIdx = i;
            break;
        }
    }
    
    if (startIdx !== -1 && endIdx !== -1) {
        let replacement = \const badgeSource = (title, overrideLetter = null) => {
    if (!title) return '';
    if (overrideLetter) {
        if (/(Source )\\\\s*[A-Z]/i.test(title)) {
            title = title.replace(/(Source )\\\\s*[A-Z]/i, \\'\\\\' + overrideLetter);
        } else if (/(Source)(?!s)/i.test(title)) {
            title = title.replace(/(Source)/i, \\'\\ \\' + overrideLetter);
        } else {
            title = 'Source ' + overrideLetter + ': ' + title;
        }
    }
    return title.replace(/(Source [A-Z])/i, '<span style="background-color: #1e40af; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 0.9em; letter-spacing: 0.5px; display: inline-block; margin-bottom: 4px;">\\</span>');
};\;
        
        let newContent = lines.slice(0, startIdx).join('\n') + '\n' + replacement + '\n' + lines.slice(endIdx + 1).join('\n');
        fs.writeFileSync(filename, newContent);
        console.log("Patched badgeSource in " + filename);
    } else {
        console.log("Could not find badgeSource in " + filename);
    }
}

patchBadge('generate_textbooks.js');
patchBadge('generate_workbooks.js');
patchBadge('generate_pupil_workbooks.js');
