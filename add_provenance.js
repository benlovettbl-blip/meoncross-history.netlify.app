const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'edexcel_medicine', 'data.js');
let content = fs.readFileSync(dataPath, 'utf8');

const regex = /(\s*)"(?:question|text)":\s*".*?How useful are Sources.*?Explain your answer.*?",/g;

content = content.replace(regex, (match, whitespace) => {
    const scaffoldingStr = `\n${whitespace}"scaffolding": ["**Provenance Clues:** Analyze the Nature, Origin, and Purpose of the source. Ask yourself: Who wrote it? When? Why? How does their motive or the intended audience affect what they have written and its usefulness for the enquiry?"],`;
    
    // Check if scaffolding is already present right after the match
    return match + scaffoldingStr;
});

fs.writeFileSync(dataPath, content, 'utf8');
console.log('Successfully injected provenance scaffolding.');
