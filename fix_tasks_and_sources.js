const fs = require('fs');
const path = require('path');

// 1. Sanitize "Task N: ", "Question N: ", and "Task: " from all data.js files
const unitsDir = path.join(__dirname, 'public', 'units');
const dirs = fs.readdirSync(unitsDir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);

dirs.forEach(unit => {
    const dataPath = path.join(unitsDir, unit, 'data.js');
    if (fs.existsSync(dataPath)) {
        let content = fs.readFileSync(dataPath, 'utf8');
        
        // Match "Task N: " or "Question N: "
        content = content.replace(/\"(text|question)\"\s*:\s*\"Task\s+\d+:\s*/g, '"$1": "');
        content = content.replace(/\"(text|question)\"\s*:\s*\"Question\s+\d+:\s*/g, '"$1": "');
        content = content.replace(/\"(text|question)\"\s*:\s*\"Task:\s*/g, '"$1": "');

        // Since the previous script had a regex bug with the strong tags, I'll make absolutely sure "Part A:" is gone from all text strings
        // Example: "Q1. <strong>Part A: Core Factual Recall</strong><br>" -> "Q1. "
        content = content.replace(/<strong>Part\s+[A-Z0-9]*:\s*(.*?)<\/strong><br>\s*/g, '');
        content = content.replace(/\*\*Part\s+[A-Z0-9]*:\s*(.*?)\*\*\s*/g, '');
        
        // Some might be just "Part A: Core Factual Recall<br>"
        content = content.replace(/Part\s+[A-Z0-9]*:\s*[^<]*<br>\s*/g, '');

        // 2. Fix the specific map source in great_war or great_war_part2
        // Look for "Map of the European Alliances" and add "Source A: " if it doesn't have it
        if (content.includes('"title": "Map of the European Alliances') && !content.includes('"title": "Source A: Map of the European Alliances')) {
            content = content.replace(/"title": "Map of the European Alliances/g, '"title": "Source A: Map of the European Alliances');
        }

        fs.writeFileSync(dataPath, content);
    }
});
console.log("Sanitized prefixes and fixed map source title.");
