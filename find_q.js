const fs = require('fs');
['generate_textbooks.js', 'generate_pupil_workbooks.js'].forEach(file => {
    console.log("File:", file);
    const lines = fs.readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, i) => {
        if (line.includes('source_analysis') || line.includes('Q${')) {
            console.log(i + ': ' + line);
        }
    });
});
