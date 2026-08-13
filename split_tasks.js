const fs = require('fs');

let file = 'great_war_part2/data.js';
let content = fs.readFileSync(file, 'utf8');

// We need to parse the JS, but it uses module.exports = { ... }
// We can use a regex to find tasks that have <br>Q[0-9]+\. in their text
// But it's safer to just do a smart string replacement or parse it properly.
// Since it's valid JS but not JSON, we can parse it by stripping module.exports.

let dbText = content.replace('module.exports = ', '');
let db;
try {
    // using eval to parse the JS object
    db = eval('(' + dbText + ')');
} catch(e) {
    console.error("Eval failed:", e);
    process.exit(1);
}

let modified = false;

db.lessons.forEach(lesson => {
    if (lesson.narrative_blocks) {
        lesson.narrative_blocks.forEach(nb => {
            if (nb.tasks) {
                let newTasks = [];
                nb.tasks.forEach(t => {
                    let txt = t.text || "";
                    let mod = t.model || "";
                    
                    // check if this is a multi-question task
                    if (txt.includes('<br>Q') || txt.includes('<br> Q')) {
                        modified = true;
                        
                        // Split the text by <br>Q[num].
                        // Wait, it might be <br>Q2. or <br> Q2.
                        let questions = txt.split(/<br>\s*Q[0-9]+\.\s*/);
                        // The first question might start with Q[num]. 
                        questions[0] = questions[0].replace(/^Q[0-9]+\.\s*/, '');
                        
                        // Split the model
                        // Models usually have <br><br>Q2. or <br><br>2.
                        let answers = mod.split(/<br>\s*<br>\s*(?:Q)?[0-9]+\.\s*/);
                        answers[0] = answers[0].replace(/^(?:Q)?[0-9]+\.\s*/, '');
                        
                        for (let i = 0; i < questions.length; i++) {
                            newTasks.push({
                                type: t.type || "text",
                                text: questions[i].trim(),
                                model: (answers[i] || "").trim()
                            });
                        }
                    } else {
                        // For single tasks, just remove leading Q[num]. if it got added
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
    // We need to write it back as formatted JS
    // We can use JSON.stringify and then prepend module.exports = 
    let newContent = 'module.exports = ' + JSON.stringify(db, null, 4) + ';\n';
    fs.writeFileSync(file, newContent);
    console.log("Successfully split tasks and stripped Q-prefixes!");
} else {
    console.log("No modifications needed.");
}
