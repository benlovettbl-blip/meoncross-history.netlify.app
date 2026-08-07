const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'early_modern_world', 'data.js');
let content = fs.readFileSync(targetFile, 'utf8');

// Extract the JSON object from `export const unitData = { ... };`
let jsonStr = content.substring(content.indexOf('{'));
jsonStr = jsonStr.replace(/;\s*$/, '');

let data;
try {
    data = JSON.parse(jsonStr);
} catch (e) {
    console.error("Error parsing JSON:", e);
    process.exit(1);
}

// Inject Capstone Synthesis task into every lesson
data.lessons.forEach(lesson => {
    if (!lesson.tasks) lesson.tasks = [];
    
    // Check if capstone already exists to avoid duplicates
    const hasCapstone = lesson.tasks.some(t => t.text && t.text.includes('Capstone Synthesis'));
    
    if (!hasCapstone) {
        lesson.tasks.push({
            text: "🎓 Capstone Synthesis: Write a detailed summary paragraph explaining the most significant change, event, or concept from this lesson. You must synthesize your knowledge by including at least THREE specific historical facts or examples from the text above to support your explanation.",
            model: "A strong synthesis paragraph will directly address the core theme of the lesson in its opening sentence. It will then smoothly integrate at least three specific historical facts (dates, names, statistics, or key events) learned in the lesson to prove its point. Finally, it will conclude by linking this specific event back to the broader context of the Early Modern World."
        });
    }
});

// Write back to file
const finalContent = "export const unitData = " + JSON.stringify(data, null, 2) + ";\n";
fs.writeFileSync(targetFile, finalContent);
console.log("Successfully injected Capstone Synthesis tasks into all early_modern_world lessons.");
