const fs = require('fs');

function fixNumbering(file) {
    let content = fs.readFileSync(file, 'utf8');

    // Remove bold Part X tags (e.g. <strong>Part A: Core Factual Recall</strong><br>)
    content = content.replace(/<strong>Part [A-Z].*?<\/strong><br>/g, '');
    
    // Remove inline Part X tags (e.g. **Part A: Core Comprehension** )
    content = content.replace(/\*\*Part [A-Z]:.*?\*\* /g, '');
    
    // Convert numbered lists to Q1, Q2, Q3.
    // Handles <br>1. 
    content = content.replace(/<br>([0-9]+)\.\s/g, '<br>Q$1. ');
    // Handles start of string or newline 1. 
    content = content.replace(/^([0-9]+)\.\s/gm, 'Q$1. ');
    // Handles "text": "1. 
    content = content.replace(/\"text\":\s*\"([0-9]+)\.\s/g, '"text": "Q$1. ');

    // For the specific KS3 problem where there's "Q1. 1. Why did..."
    // Because sometimes it already has Q1 in user_banners?
    content = content.replace(/Q([0-9]+)\.\s*Q\1\./g, 'Q$1.');
    
    fs.writeFileSync(file, content);
    console.log(`Fixed numbering in ${file}`);
}

fixNumbering('great_war_part2/data.js');
fixNumbering('great_war/data.js');

console.log('Done.');
