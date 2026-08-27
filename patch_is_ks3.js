const fs = require('fs');

function patchFile(file) {
    let c = fs.readFileSync(file, 'utf8');
    let oldCode = `        return {
            cleanText: formatText(cleanText),
            badgeHtml: \`<div style="margin-top: 5px; margin-bottom: 15px;"><span style="display: inline-block; background-color: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-size: 10pt; padding: 2px 8px; border-radius: 12px; font-weight: normal; vertical-align: middle;">[\${totalMarks} marks &bull; \${time} mins]</span></div>\`
        };`;
    
    // Make regex to match whitespace flexibly
    let regex = /return\s*\{\s*cleanText:\s*formatText\(cleanText\),\s*badgeHtml:\s*`<div[^>]*>.*?\[\$\{totalMarks\}\s*marks.*?\$\{time\}\s*mins\].*?<\/div>`\s*\};/g;

    let newCode = `        // Also manually strip brackets if any exist, e.g. [16 marks 20 mins]
        cleanText = cleanText.replace(/\\s*\\[\\d+\\s*marks?\\s*\\d*\\s*mins?\\]/g, '').trim();

        if (typeof unitData !== 'undefined' && unitData.is_ks3) {
             return {
                cleanText: formatText(cleanText),
                badgeHtml: ""
             };
        }
        
        return {
            cleanText: formatText(cleanText),
            badgeHtml: \`<div style="margin-top: 5px; margin-bottom: 15px;"><span style="display: inline-block; background-color: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; font-size: 10pt; padding: 2px 8px; border-radius: 12px; font-weight: normal; vertical-align: middle;">[\${totalMarks} marks &bull; \${time} mins]</span></div>\`
        };`;
    
    if (regex.test(c)) {
        c = c.replace(regex, newCode);
        fs.writeFileSync(file, c);
        console.log('Patched is_ks3 logic in ' + file);
    } else {
        console.log('Could not find match in ' + file);
    }
}

['generate_pupil_workbooks.js', 'generate_workbooks.js', 'generate_textbooks.js'].forEach(patchFile);
