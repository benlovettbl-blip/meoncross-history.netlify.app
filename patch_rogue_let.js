const fs = require('fs');

const files = ['generate_textbooks.js', 'generate_workbooks.js', 'generate_pupil_workbooks.js'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Clean up rogue 'let' that was left behind
    content = content.replace(/let\s*\n\s*\/\/\s*Pair Share/g, '// Pair Share');
    content = content.replace(/let\s*\n\s*\n\s*\/\/\s*Pair Share/g, '// Pair Share');
    content = content.replace(/let\s*\n\s*\/\/\s*Active Tasks/g, '// Active Tasks');

    fs.writeFileSync(file, content);
    console.log("Cleaned up rogue let in", file);
});
