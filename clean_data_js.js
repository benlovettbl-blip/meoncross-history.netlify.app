const fs = require('fs');

['great_war/data.js', 'great_war_part2/data.js'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Extract the object portion
    let dbText = content.replace('export const unitData = ', '').trim();
    if (dbText.endsWith(';')) {
        dbText = dbText.slice(0, -1);
    }
    
    let db;
    try {
        db = eval('(' + dbText + ')');
    } catch(e) {
        console.error('Eval failed for', file, e);
        return;
    }

    let modified = false;

    db.lessons.forEach(lesson => {
        if (lesson.narrative_blocks) {
            lesson.narrative_blocks.forEach(nb => {
                if (nb.tasks) {
                    let newTasks = [];
                    nb.tasks.forEach(t => {
                        let txt = t.text || '';
                        let mod = t.model || '';
                        
                        // Fix multi-questions
                        if (txt.includes('<br>Q') || txt.includes('<br> Q')) {
                            modified = true;
                            
                            let questions = txt.split(/<br>\s*Q[0-9]+\.\s*/);
                            questions[0] = questions[0].replace(/^Q[0-9]+\.\s*/, '');
                            
                            let answers = mod.split(/<br>\s*<br>\s*(?:Q)?[0-9]+\.\s*/);
                            answers[0] = answers[0].replace(/^(?:Q)?[0-9]+\.\s*/, '');
                            
                            for (let i = 0; i < questions.length; i++) {
                                newTasks.push({
                                    type: t.type || 'text',
                                    text: questions[i].trim(),
                                    model: (answers[i] || '').trim()
                                });
                            }
                        } else {
                            // Single tasks
                            if (txt.match(/^Q[0-9]+\.\s*/)) {
                                t.text = txt.replace(/^Q[0-9]+\.\s*/, '');
                                modified = true;
                            }
                            if (mod.match(/^(?:Q)?[0-9]+\.\s*/)) {
                                t.model = mod.replace(/^(?:Q)?[0-9]+\.\s*/, '');
                                modified = true;
                            }
                            newTasks.push(t);
                        }
                    });
                    nb.tasks = newTasks;
                }
            });
        }
    });

    if (modified) {
        let newContent = 'export const unitData = ' + JSON.stringify(db, null, 4) + ';\n';
        fs.writeFileSync(file, newContent);
        console.log('Successfully updated', file);
    }
});
