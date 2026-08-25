const fs = require('fs');
const path = require('path');

const regexes = [
    /^(Recall from (last|previous) lesson(s)?:\s*|PAST TOPIC:\s*|Enquiry:\s*|Predict:\s*)/i,
    /^(Q\d+[:.]?\s*|Task \d+[:.]?\s*|Question \d+[a-z]?[:.]?\s*|Enquiry Task[:.]?\s*|\d+\.\s*)/i,
    /^(\d+[\.\)]|Q\.?\d+|Task[s]?\s+\d+|Activity\s+\d+|Question\s+\d+|Source\s+[A-Z]\s+Task|Task:|Source Analysis \(Source [A-Z]\)|Source Analysis)/i,
    /^(Task:|Question:|Q:|Activity:)\s*/i
];

function processFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    // Use (?:[^"\\]|\\.)* to correctly match everything inside a string, even escaped quotes like \"
    const newContent = content.replace(/("(question|text)"\s*:\s*")((?:[^"\\]|\\.)*)(")/g, (match, prefix, fieldName, textValue, suffix) => {
        let originalText = textValue;
        let cleanedText = textValue;
        
        let lastText;
        do {
            lastText = cleanedText;
            for (const r of regexes) {
                // Because literal \n in the string might separate the prefix from the content,
                // we should handle prefixes that end in \n or \s*
                cleanedText = cleanedText.replace(r, "");
                cleanedText = cleanedText.replace(/^(\\n|\s)+/, "");
            }
            cleanedText = cleanedText.replace(/^:\s*/, ""); // remove leftover colons
            cleanedText = cleanedText.replace(/^(\\n|\s)+/, "");
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

const unitsDir = path.join(__dirname, 'units');
const unitDirs = fs.readdirSync(unitsDir).filter(f => fs.statSync(path.join(unitsDir, f)).isDirectory());

unitDirs.forEach(unitFolder => {
    const dataJsPath = path.join(unitsDir, unitFolder, 'data.js');
    if (fs.existsSync(dataJsPath)) {
        processFile(dataJsPath);
    }
});
