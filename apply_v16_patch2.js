const fs = require('fs');

function patchGenerators() {
    const files = [
        'generate_pupil_workbooks.js',
        'generate_workbooks.js',
        'generate_textbooks.js'
    ];

    files.forEach(file => {
        if (!fs.existsSync(file)) return;
        let content = fs.readFileSync(file, 'utf8');
        let patched = false;

        // 1. Cloze blanks replace with border-bottom span
        if (content.includes(".replace(/_{3,}/g, '――――――')")) {
            content = content.replace(
                /\.replace\(\/_{3,}\/g,\s*'――――――'\)/g,
                ".replace(/_{3,}/g, '<span style=\"border-bottom: 1px solid black;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>')"
            );
            patched = true;
        }

        if (patched) {
            fs.writeFileSync(file, content, 'utf8');
            console.log("Patched Cloze Blanks in " + file);
        }
    });

    // 2. Fix data.js mislabeled Q7 in L2: Prevent and Treat Disease
    const dataFile = 'public/units/edexcel_medicine/data.js';
    if (fs.existsSync(dataFile)) {
        let dataContent = fs.readFileSync(dataFile, 'utf8');
        const oldQ = '"question": "\'In the years c1250-c1500, the physician was the most important person providing care and treatment.\' How far do you agree? Explain your answer. (16 marks + 4 marks for SPaG)"';
        const newQ = '"question": "\'In the years c1250-c1500, the physician was the most important person providing care and treatment.\' How far do you agree? Explain your answer. (16 marks + 4 marks for SPaG)",\n        "examQNum": 7';
        if (dataContent.includes(oldQ) && !dataContent.includes(newQ)) {
            dataContent = dataContent.replace(oldQ, newQ);
            fs.writeFileSync(dataFile, dataContent, 'utf8');
            console.log("Patched data.js mislabeled Q7");
        }
    }
}

patchGenerators();
