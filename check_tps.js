const fs = require('fs');

const path = 'public/units/edexcel_medicine/data.js';
let content = fs.readFileSync(path, 'utf8');

// Using a simple regex to find lessons and their titles
// Actually, it's safer to extract it by evaluating the JS
let unitData;
try {
    const dataContent = content.replace('export const unitData = ', 'module.exports = ');
    fs.writeFileSync('temp_data.js', dataContent);
    unitData = require('./temp_data.js');
} catch (e) {
    console.error(e);
}

const genericText = "Think-Pair-Share: Based on the events we have studied in this lesson, what do you think was the most significant turning point or consequence? Discuss your reasoning with your partner.";

let report = "# Generic Think-Pair-Share Audit for Medicine\n\n";

if (unitData && unitData.lessons) {
    unitData.lessons.forEach(lesson => {
        let hasGeneric = false;
        
        // Search in narrative blocks
        if (lesson.narrative_blocks) {
            lesson.narrative_blocks.forEach(block => {
                if (block.tasks) {
                    block.tasks.forEach(task => {
                        if (task.question === genericText) {
                            hasGeneric = true;
                        }
                    });
                }
            });
        }
        
        if (hasGeneric) {
            report += `## ${lesson.title}\n`;
            report += `- ID: ${lesson.id}\n`;
            report += `- Enquiry: ${lesson.enquiry_question || ''}\n\n`;
        }
    });
}

fs.writeFileSync('tps_report.md', report);
console.log("Report generated at tps_report.md");
