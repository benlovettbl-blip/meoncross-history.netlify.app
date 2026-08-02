const fs = require('fs');
const path = require('path');

const dbPath = path.join('public', 'database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
let md = `# History Hub Video Tracker\n\n`;
md += `Paste the YouTube or ERA links below the corresponding lesson. When you're ready, pass this list back to me!\n\n`;

Object.keys(db).forEach(unitId => {
    const dataJsPath = path.join('public', 'units', unitId, 'data.js');
    if (fs.existsSync(dataJsPath)) {
        let dataJs = fs.readFileSync(dataJsPath, 'utf8');
        
        let titleMatch = dataJs.match(/title:\s*['"]([^'"]+)['"]/);
        let unitTitle = titleMatch ? titleMatch[1] : unitId;
        
        md += `## Unit: ${unitTitle} (${unitId})\n\n`;
        
        const lessonRegex = /"id":\s*"([^"]+)",[\s\S]*?"title":\s*"([^"]+)"/g;
        let match;
        let found = false;
        while ((match = lessonRegex.exec(dataJs)) !== null) {
            if (match[1].startsWith('lesson_')) {
                found = true;
                md += `### ${match[2]}\n`;
                md += `- [ ] Video Link:\n\n`;
            }
        }
        if (!found) {
            md += `*(No lessons found or standard format not matched)*\n\n`;
        }
    }
});

fs.writeFileSync('lesson_tracker.md', md, 'utf8');
console.log('Generated lesson_tracker.md');
