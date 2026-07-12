import fs from 'fs';

const filePath = 'c:/Projects/meoncross-history.netlify.app/cme_new/generate_worksheets.js';
let content = fs.readFileSync(filePath, 'utf8');

const newLogic = fs.readFileSync('c:/Projects/meoncross-history.netlify.app/new_logic.txt', 'utf8');
const endingLogic = fs.readFileSync('c:/Projects/meoncross-history.netlify.app/ending_logic.txt', 'utf8');

// Replace narrative and tasks rendering logic
const oldLogicStart = "  // Render Narrative";
const oldLogicEnd = "  // Extended Scholarship";

if (!content.includes(oldLogicStart) || !content.includes(oldLogicEnd)) {
    console.error("Could not find Old Logic bounds");
    process.exit(1);
}

const beforeOld = content.substring(0, content.indexOf(oldLogicStart));
const afterOld = content.substring(content.indexOf(oldLogicEnd));

// Inject endingLogic before Historians Corner end
let endTagRegex = /  \/\/ Historians Corner[\s\S]*?  }/;
let match = afterOld.match(endTagRegex);

if (match) {
    let replacedAfterOld = afterOld.replace(endTagRegex, match[0] + "\n" + endingLogic);
    content = beforeOld + newLogic + replacedAfterOld;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Successfully patched generate_worksheets.js with chunking and timelines using txt files!");
} else {
    console.error("Could not find the end tag regex in afterOld");
    process.exit(1);
}
