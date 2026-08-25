const fs = require('fs');
const path = require('path');

const regexes = [
    /^(Recall from (last|previous) lesson(s)?:\s*|PAST TOPIC:\s*|Enquiry:\s*|Predict:\s*)/i,
    /^(Q\d+[:.]?\s*|Task \d+[:.]?\s*|Question \d+[a-z]?[:.]?\s*|Enquiry Task[:.]?\s*|\d+\.\s*)/i,
    /^(\d+[\.\)]|Q\.?\d+|Task[s]?\s+\d+|Activity\s+\d+|Question\s+\d+|Source\s+[A-Z]\s+Task|Task:)/i,
    /^(Task:|Question:|Q:|Activity:)\s*/i
];

function processFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    const newContent = content.replace(/("(question|text)"\s*:\s*")([^"]+)(")/g, (match, prefix, fieldName, textValue, suffix) => {
        let originalText = textValue;
        let cleanedText = textValue;
        
        let lastText;
        do {
            lastText = cleanedText;
            for (const r of regexes) {
                cleanedText = cleanedText.replace(r, "").trim();
            }
            cleanedText = cleanedText.replace(/^:\s*/, ""); // remove leftover colons
        } while (cleanedText !== lastText);
        
        if (cleanedText !== originalText) {
            changed = true;
            console.log(`[${path.basename(path.dirname(filePath))}] Cleaned:\n  - ${originalText}\n  + ${cleanedText}\n`);
        }
        
        return prefix + cleanedText + suffix;
    });

    if (changed) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Saved changes to ${filePath}\n`);
    }
}

const roots = [path.join(__dirname, 'units', 'medieval_england'), path.join(__dirname, 'public', 'units', 'medieval_england')];

roots.forEach(dataPath => {
    const dataJsPath = path.join(dataPath, 'data.js');
    if (fs.existsSync(dataJsPath)) {
        processFile(dataJsPath);
    } else if (fs.existsSync(dataPath) && !fs.statSync(dataPath).isDirectory()) {
        processFile(dataPath); // If the path itself is the data.js file
    } else {
        processFile(dataPath + '\\data.js');
    }
});
