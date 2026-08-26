const fs = require('fs');

const filesToPatch = [
    'generate_textbooks.js',
    'generate_workbooks.js',
    'generate_pupil_workbooks.js'
];

filesToPatch.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix Flowchart CSS
    content = content.replace(
        /width:\s*45%;\s*padding:\s*5px;\s*box-sizing:\s*border-box;\s*\$\{m\}\s*box-shadow:\s*2px\s*2px\s*0px\s*#aaa;/g,
        'width: 45%; border: 1px solid #334155; border-radius: 4px; padding: 5px; box-sizing: border-box; ${m} box-shadow: 2px 2px 0px #aaa;'
    );
    if (file === 'generate_pupil_workbooks.js') {
        content = content.replace(
            /\$\{lesson\.do_now\.qNum \? "Q" \+ lesson\.do_now\.qNum \+ "\\. " : "1\\. "\}/g,
            'Q${lesson.do_now.qNum || globalQNum++}. '
        );
    }
    
    let regexQNum = /if \(task\.type !== 'vocab_match'\) task\.qNum = globalQNum\+\+;/g;
    content = content.replace(regexQNum, "if (task.type !== 'vocab_match' && task.type !== 'drag_drop_timeline') task.qNum = globalQNum++;");
    
    let regexDoNow = /if \(lesson\.primary_source && lesson\.primary_source\.question\) lesson\.primary_source\.qNum = globalQNum\+\+;/g;
    content = content.replace(regexDoNow, "if (lesson.do_now && lesson.do_now.prediction_question) lesson.do_now.qNum = globalQNum++;\n    if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = globalQNum++;");

    fs.writeFileSync(file, content);
    console.log(`Patched ${file} (qNum logic & flowchart css)`);
});

const textbookFiles = ['generate_textbooks.js', 'generate_workbooks.js'];
textbookFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    let idxHC = content.lastIndexOf('// Historian\'s Corner');
    if (idxHC === -1) idxHC = content.lastIndexOf('if (lesson.historians_corner)');
    let idxPS = content.lastIndexOf('if (lesson.pair_share)');
    let idxGCSE = content.lastIndexOf('if (lesson.gcse_task)');
    
    if (idxHC !== -1 && idxPS !== -1 && idxGCSE !== -1 && idxHC < idxPS && idxPS < idxGCSE) {
        let beforeHC = content.substring(0, idxHC);
        let hcBlock = content.substring(idxHC, idxPS);
        let psBlock = content.substring(idxPS, idxGCSE);
        let afterPS = content.substring(idxGCSE);
        
        fs.writeFileSync(file, beforeHC + psBlock + hcBlock + afterPS);
        console.log(`Swapped PS and HC in ${file}`);
    } else {
        console.log(`Could not swap PS and HC in ${file} (indices: HC=${idxHC}, PS=${idxPS}, GCSE=${idxGCSE})`);
    }
});
