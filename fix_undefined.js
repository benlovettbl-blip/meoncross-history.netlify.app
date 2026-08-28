const fs = require('fs');

['generate_textbooks.js', 'generate_pupil_workbooks.js'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Add block.source numbering
    content = content.replace(
        /if \(block\.hinge_question\) block\.hinge_question\.qNum = globalQNum\+\+;/g,
        'if (block.source && block.source.question) block.source.qNum = globalQNum++;\n        if (block.hinge_question) block.hinge_question.qNum = globalQNum++;'
    );
    
    fs.writeFileSync(file, content, 'utf8');
});
console.log('Fixed undefined block.source numbering');
