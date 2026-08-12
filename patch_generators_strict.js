const fs = require('fs');

function patchFile(filename) {
    let code = fs.readFileSync(filename, 'utf8');
    
    // Revert previous un-isolated patch
    code = code.replace(
        "block.tasks.forEach(task => {\n              if (typeof task.text === 'string') task.text = task.text.replace(/^Task\\s*\\d*:\\s*/i, '');\n              if (typeof task.question === 'string') task.question = task.question.replace(/^Task\\s*\\d*:\\s*/i, '');",
        "block.tasks.forEach(task => {"
    );
    
    // Apply Strict Containment patch 1
    code = code.replace(
        /block\.tasks\.forEach\(task => \{/,
        "block.tasks.forEach(task => {\n              if (unitId === 'great_war' || unitId === 'great_war_part2') {\n                if (typeof task.text === 'string') task.text = task.text.replace(/^Task\\s*\\d*:\\s*/i, '');\n                if (typeof task.question === 'string') task.question = task.question.replace(/^Task\\s*\\d*:\\s*/i, '');\n              }"
    );
    
    // Revert previous un-isolated patch 2 in generate_textbooks.js
    if (filename === 'generate_textbooks.js') {
        code = code.replace(
            "if (task.type === 'vocab_match' || task.type === 'drag_drop_timeline') {",
            "if (task.type === 'vocab_match') {"
        );
        
        // Apply Strict Containment patch 2
        code = code.replace(
            "if (task.type === 'vocab_match') {",
            "if (task.type === 'vocab_match' || ((unitId === 'great_war' || unitId === 'great_war_part2') && task.type === 'drag_drop_timeline')) {"
        );
    }

    fs.writeFileSync(filename, code);
    console.log(`Strictly patched ${filename}`);
}

patchFile('generate_workbooks.js');
patchFile('generate_textbooks.js');
patchFile('generate_pupil_workbooks.js');
