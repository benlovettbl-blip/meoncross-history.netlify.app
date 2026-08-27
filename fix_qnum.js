const fs = require('fs');

function fixQNum(file) {
    let c = fs.readFileSync(file, 'utf8');
    let sourcesBlock = `    if (lesson.sources) {
      lesson.sources.forEach(source => { 
        if (source.question) source.qNum = globalQNum++; 
      });
    }`;
    let nbBlock = `    if (lesson.narrative_blocks) {`;

    if (c.includes(sourcesBlock)) {
        c = c.replace(sourcesBlock + '\n', '');
        c = c.replace(nbBlock, sourcesBlock + '\n' + nbBlock);
        fs.writeFileSync(file, c);
        console.log('Fixed qNum loop in ' + file);
    } else {
        console.log('Could not find sources block in ' + file);
    }
}

fixQNum('generate_workbooks.js');
fixQNum('generate_textbooks.js');
