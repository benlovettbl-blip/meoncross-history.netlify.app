const fs = require('fs');

function patchFile(file) {
    let c = fs.readFileSync(file, 'utf8');
    
    // Find the end of `if (isExam) { ... }` inside processTaskTextWithTariff
    let findStr = `        return {
            cleanText: formatText(text),`;
    let replacement = `        // Also manually strip brackets if any exist, e.g. [16 marks 20 mins]
        text = text.replace(/\\s*\\[\\d+\\s*marks?\\s*\\d*\\s*mins?\\]/g, '').trim();

        if (typeof unitData !== 'undefined' && unitData.is_ks3) {
             return {
                cleanText: formatText(text),
                badgeHtml: ""
             };
        }
        
        return {
            cleanText: formatText(text),`;
            
    if (c.includes(findStr)) {
        c = c.replace(findStr, replacement);
        fs.writeFileSync(file, c);
        console.log('Patched is_ks3 logic in ' + file);
    } else {
        console.log('Could not find match in ' + file);
    }
}

['generate_workbooks.js', 'generate_textbooks.js'].forEach(patchFile);
