const fs = require('fs');
const path = require('path');

const unitsDir = path.join(__dirname, 'public', 'units');
const units = fs.readdirSync(unitsDir).filter(f => fs.statSync(path.join(unitsDir, f)).isDirectory());

// Exclude non-content directories
const validUnits = units.filter(u => !['dist2', 'v2-app', 'trip_ypres'].includes(u));

function getHighestQNum(filePath) {
    if (!fs.existsSync(filePath)) return 0;
    const content = fs.readFileSync(filePath, 'utf8');
    const regex = /(?<!Exam )Q(\d+)/g;
    let maxQ = 0;
    let match;
    while ((match = regex.exec(content)) !== null) {
        const num = parseInt(match[1], 10);
        if (num > maxQ) {
            maxQ = num;
        }
    }
    return maxQ;
}

console.log("==================================================");
console.log("🔎 END-TO-END AUDIT: Final Q-Number Verification");
console.log("==================================================");

let failedUnits = 0;

validUnits.forEach(unitId => {
    const unitPath = path.join(unitsDir, unitId);
    const files = fs.readdirSync(unitPath);
    
    // Find all textbooks in this unit
    const textbooks = files.filter(f => f.startsWith('textbook') && f.endsWith('.html'));
    
    textbooks.forEach(textbookFile => {
        // Derive the corresponding workbook name
        // textbook.html -> pupil_workbook.html
        // textbook_medieval.html -> pupil_workbook_medieval.html
        let suffix = textbookFile.replace('textbook', '').replace('.html', '');
        let workbookFile = `pupil_workbook${suffix}.html`;
        
        const textbookPath = path.join(unitPath, textbookFile);
        const workbookPath = path.join(unitPath, workbookFile);
        
        const displayName = suffix ? `${unitId} (${suffix.substring(1)})` : unitId;
        
        if (!fs.existsSync(workbookPath)) {
            console.log(`⚠️ ${displayName.padEnd(35)} : WARNING (Workbook ${workbookFile} not found)`);
            return;
        }
        
        const tbMax = getHighestQNum(textbookPath);
        const wbMax = getHighestQNum(workbookPath);
        
        if (tbMax === wbMax) {
            console.log(`✅ ${displayName.padEnd(35)} : Perfect Match (Final Q${tbMax})`);
        } else {
            console.log(`❌ ${displayName.padEnd(35)} : MISMATCH (Textbook: Q${tbMax}, Workbook: Q${wbMax})`);
            failedUnits++;
        }
    });
});

console.log("==================================================");
if (failedUnits === 0) {
    console.log("🎉 SUCCESS! All textbooks and workbooks have perfectly synchronized Q-Numbers.");
} else {
    console.log(`⚠️ Found ${failedUnits} mismatches in final Q-Numbers.`);
}
console.log("==================================================\n");
