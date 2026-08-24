const fs = require('fs');

let content = fs.readFileSync('early_modern_world/data.js', 'utf8');
let jsonStr = content.replace('export default early_modern_world;', '').replace('const early_modern_world =', '').trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
let data = eval('(' + jsonStr + ')');

// 1. Fix Empty Tag in Lesson 5 Block 1
let l5 = data.lessons[4];
l5.narrative_blocks[1].text = l5.narrative_blocks[1].text.replace(
    'Led by a strict Puritan country gentleman named <strong></strong>,',
    'Led by a strict Puritan country gentleman named <strong>Oliver Cromwell</strong>,'
);

// 2. Fix Orphaned Source C in Lesson 4 Block 4
let l4 = data.lessons[3];
if (!l4.narrative_blocks[4].tasks) l4.narrative_blocks[4].tasks = [];
// Only push if it doesn't already exist to avoid duplicates
let cExists = l4.narrative_blocks[4].tasks.find(t => t.question && t.question.includes('Source C'));
if (!cExists) {
    l4.narrative_blocks[4].tasks.push({
        type: "source_analysis",
        question: "Study Source C. What does this execution scene suggest about how the government punished treason in the 17th century?",
        model_answer: "Source C depicts a brutal, public execution where conspirators are hanged, drawn, and quartered. This suggests that the government used extreme, theatrical violence to deter others and demonstrate the absolute power of the monarch."
    });
}

// 3. Fix Orphaned Source A in Lesson 5 Block 0
if (!l5.narrative_blocks[0].tasks) l5.narrative_blocks[0].tasks = [];
let aExists = l5.narrative_blocks[0].tasks.find(t => t.question && t.question.includes('Source A'));
if (!aExists) {
    l5.narrative_blocks[0].tasks.unshift({
        type: "source_analysis",
        question: "Study Source A. Why did the monarch combine the English and Scottish symbols into a single Coat of Arms?",
        model_answer: "The combined symbols represented the 1707 Act of Union, formally joining England and Scotland into a single, unified political entity: Great Britain."
    });
}

// 4. Fix Orphaned Source F in Lesson 9 Block 11
let l9 = data.lessons[8];
if (!l9.narrative_blocks[11].tasks) l9.narrative_blocks[11].tasks = [];
let fExists = l9.narrative_blocks[11].tasks.find(t => t.question && t.question.includes('Source F'));
if (!fExists) {
    l9.narrative_blocks[11].tasks.push({
        type: "source_analysis",
        question: "Study Source F. How does the existence of 'Mudlarks' challenge the idea that 1750 London was entirely prosperous and modern?",
        model_answer: "Source F shows desperate children scavenging in freezing, sewage-filled mud just to survive. This challenges the idea of a 'modern' London by highlighting the extreme, lethal poverty that existed right alongside the wealthy coffee houses."
    });
}

const newContent = "const early_modern_world = " + JSON.stringify(data, null, 2) + ";\n\nexport default early_modern_world;";

fs.writeFileSync('early_modern_world/data.js', newContent);
console.log('Successfully patched all 5 newly discovered errors using AST!');
