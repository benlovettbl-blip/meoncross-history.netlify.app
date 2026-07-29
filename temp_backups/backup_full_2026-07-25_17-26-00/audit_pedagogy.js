const fs = require('fs');

function auditUnit(filePath) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8')).data;
    let report = `\n========== AUDITING ${data.id} ==========\n`;

    data.lessons.forEach((l, index) => {
        report += `\n--- Lesson ${index + 1}: ${l.title} ---\n`;
        
        // 1. Check Do Now
        if (l.do_now) {
            report += `[DO NOW] Type: ${l.do_now.type || 'unknown'}\n`;
            if (l.do_now.items) {
                l.do_now.items.forEach(item => {
                    report += `  - Q: ${item.question || item.term}\n`;
                });
            }
            if (l.do_now.events) {
                l.do_now.events.forEach(ev => {
                    report += `  - Event: ${ev.year} - ${ev.title}\n`;
                });
            }
        } else {
            report += `[DO NOW] MISSING\n`;
        }

        // 2. Check Primary Source
        if (l.primary_source) {
            report += `[PRIMARY SOURCE] ${l.primary_source.src}\n`;
            report += `  - Caption: ${l.primary_source.caption ? l.primary_source.caption.substring(0, 100).replace(/\\n/g, ' ') : 'MISSING'}\n`;
            report += `  - Question: ${l.primary_source.question || 'MISSING'}\n`;
            if (l.primary_source.tasks) {
                l.primary_source.tasks.forEach(t => {
                    report += `  - Task: ${t.text}\n`;
                });
            }
            report += `  - Model Answer: ${l.primary_source.model_answer ? l.primary_source.model_answer.substring(0, 100) : 'MISSING'}\n`;
        }

        // 3. Narrative Blocks & Tasks
        if (l.narrative_blocks) {
            l.narrative_blocks.forEach((b, i) => {
                report += `[NARRATIVE BLOCK ${i + 1}] Text: "${b.text ? b.text.substring(0, 80).replace(/\\n/g, ' ') : 'MISSING'}..."\n`;
                if (b.tasks) {
                    b.tasks.forEach(t => {
                        report += `  - Task: ${t.text}\n`;
                        if (!t.model) {
                            report += `    !!! MISSING MODEL ANSWER !!!\n`;
                        } else if (t.model.includes('Student responses should') || t.model.length < 15) {
                            report += `    !!! GENERIC OR SHORT MODEL ANSWER: ${t.model} !!!\n`;
                        }
                    });
                }
            });
        }

        // 4. Historians Corner
        if (l.historians_corner) {
            report += `[HISTORIANS CORNER] Title: ${l.historians_corner.title}\n`;
            report += `  - Author Context: ${l.historians_corner.author_context ? 'PRESENT' : 'MISSING'}\n`;
            report += `  - Extract: ${l.historians_corner.extract ? l.historians_corner.extract.substring(0, 80) : 'MISSING'}\n`;
            report += `  - Question: ${l.historians_corner.stretch_question || l.historians_corner.hinge_question || 'MISSING'}\n`;
        }

        // 5. GCSE Task
        if (l.gcse_task) {
            report += `[GCSE TASK] ${l.gcse_task.question || l.gcse_task.text || 'MISSING'}\n`;
        }
    });
    
    return report;
}

const waterReport = auditUnit('./public/data/water_and_sanitation.json');
fs.writeFileSync('audit_water.txt', waterReport);
console.log('Water audit written to audit_water.txt');

const warReport = auditUnit('./public/data/great_war.json');
fs.writeFileSync('audit_war.txt', warReport);
console.log('Great War audit written to audit_war.txt');
