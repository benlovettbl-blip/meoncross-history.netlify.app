const fs = require('fs');

let content = fs.readFileSync('early_modern_world/data.js', 'utf8');
let data;
eval('data = ' + content.replace('export default early_modern_world;', 'early_modern_world;').replace('const early_modern_world =', ''));

let report = '# Source Usage Report for early_modern_world\n\n';

data.lessons.forEach((lesson, i) => {
    let definedSources = new Set();
    let questionsText = '';

    // 1. Gather all sources
    lesson.narrative_blocks?.forEach(block => {
        // Direct source letter
        if (block.source_letter) definedSources.add(block.source_letter);
        
        // Images array
        if (block.images) {
            block.images.forEach(img => {
                if (img.source_letter) definedSources.add(img.source_letter);
            });
        }
        
        // Inline text sources (e.g. "Source B:")
        if (block.text) {
            let match = block.text.match(/Source ([A-Z])/g);
            if (match) {
                match.forEach(m => definedSources.add(m.replace('Source ', '')));
            }
        }
    });

    // 2. Gather all questions and tasks text
    lesson.narrative_blocks?.forEach(block => {
        if (block.tasks) {
            block.tasks.forEach(task => {
                questionsText += (task.question || '') + ' ' + (task.instructions || '') + ' ';
                if (task.questions) {
                    task.questions.forEach(q => {
                        questionsText += (q.q || '') + ' ';
                        if (q.options) questionsText += q.options.join(' ') + ' ';
                    });
                }
            });
        }
    });

    // 3. Find Orphan Sources
    let orphanSources = [];
    definedSources.forEach(src => {
        // Look for "Source X" in the questions text.
        // Also account for just "X" if it's explicitly clear, but usually it says "Source X".
        let regex = new RegExp(`Source ${src}\\b`, 'i');
        if (!regex.test(questionsText)) {
            orphanSources.push(src);
        }
    });

    if (orphanSources.length > 0) {
        report += `### Lesson ${i+1}: ${lesson.title}\n`;
        report += `- **Orphan Sources (Never asked about):** ${orphanSources.join(', ')}\n\n`;
    }
});

fs.writeFileSync('scratch_orphan_report.md', report);
console.log('Orphan report generated!');
