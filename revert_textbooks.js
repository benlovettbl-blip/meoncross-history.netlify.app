const fs = require('fs');

let text = fs.readFileSync('generate_textbooks.js', 'utf8');

// The injected code started with: if (currentUnitId === 'great_war') {
let startIdx = text.indexOf("if (currentUnitId === 'great_war') {");
if (startIdx > -1) {
    // Find the end of the injected code
    // The else block is right before original logic starts
    let elseIdx = text.indexOf("} else {", startIdx);
    if (elseIdx > -1) {
        let hasQuestionsIdx = text.indexOf("const hasQuestions = lesson.sources.some((s) => s.question);", elseIdx);
        if (hasQuestionsIdx > -1) {
            // Reconstruct the original if condition for the rest of the code
            let originalStart = "if (lesson.sources && lesson.sources.length > 0 && !isGCSE) {\n      const hasQuestions = lesson.sources.some((s) => s.question);";
            text = text.substring(0, startIdx) + originalStart + text.substring(hasQuestionsIdx + 60);
        }
    }
}

// Remove the end bracket that closed the else logic
let endCheck = "    } // end currentUnitId check\n";
if (text.includes(endCheck)) {
    text = text.replace(endCheck, "");
} else {
    text = text.replace("    } // end currentUnitId check", "");
}

// Write the reverted content to original file name
fs.writeFileSync('generate_textbooks.js', text);
console.log('Successfully reverted generate_textbooks.js');
