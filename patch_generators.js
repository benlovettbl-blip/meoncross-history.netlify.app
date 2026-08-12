const fs = require('fs');

function patchFile(filename) {
    let code = fs.readFileSync(filename, 'utf8');
    
    // Patch 1: Remove 'Task X:' prefix permanently
    if (!code.includes("typeof task.text === 'string'")) {
        code = code.replace(
            /block\.tasks\.forEach\(task => \{/,
            "block.tasks.forEach(task => {\n              if (typeof task.text === 'string') task.text = task.text.replace(/^Task\\s*\\d*:\\s*/i, '');\n              if (typeof task.question === 'string') task.question = task.question.replace(/^Task\\s*\\d*:\\s*/i, '');"
        );
    }
    
    // Patch 2: Fix 'undefined' bug in generate_textbooks.js by ignoring drag_drop_timeline
    if (filename === 'generate_textbooks.js') {
        code = code.replace(
            "if (task.type === 'vocab_match') {",
            "if (task.type === 'vocab_match' || task.type === 'drag_drop_timeline') {"
        );
    }

    fs.writeFileSync(filename, code);
    console.log(`Patched ${filename}`);
}

patchFile('generate_workbooks.js');
patchFile('generate_textbooks.js');
patchFile('generate_pupil_workbooks.js');
