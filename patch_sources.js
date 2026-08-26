const fs = require('fs');

function patchFile(filename) {
    if (!fs.existsSync(filename)) return;
    let content = fs.readFileSync(filename, 'utf8');
    
    // Fix extended writing Source A and B hardcoding
    let target1 = `if (lesson.extended.source_a || lesson.extended.source_b) {`;
    let replacement1 = `
          let letterA = 'A';
          let letterB = 'B';
          if (lesson.extended.source_a || lesson.extended.source_b) {
              letterA = String.fromCharCode(sourceCharCode++);
              if (lesson.extended.source_b) letterB = String.fromCharCode(sourceCharCode++);
              
              if (lesson.extended.question) {
                  lesson.extended.question = lesson.extended.question.replace(/Sources\\s+A\\s+and\\s+B/g, 'Sources ' + letterA + ' and ' + letterB);
                  lesson.extended.question = lesson.extended.question.replace(/Source\\s+A/g, 'Source ' + letterA);
                  lesson.extended.question = lesson.extended.question.replace(/Source\\s+B/g, 'Source ' + letterB);
              }
`;
    content = content.replace(target1, replacement1);
    
    content = content.replace(/<strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source A<\/strong>/g, 
                             '<strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source ${letterA}</strong>');
                             
    content = content.replace(/<strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source B<\/strong>/g, 
                             '<strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source ${letterB}</strong>');


    // Fix GCSE tasks Source A and B hardcoding
    let target2 = `} else if (lesson.gcse_task.sources) {`;
    let replacement2 = `} else if (lesson.gcse_task.sources) {
          let letterA = String.fromCharCode(sourceCharCode++);
          let letterB = lesson.gcse_task.sources.length > 1 ? String.fromCharCode(sourceCharCode++) : '';
          
          if (lesson.gcse_task.topic) {
              lesson.gcse_task.topic = lesson.gcse_task.topic.replace(/Sources\\s+A\\s+and\\s+B/g, 'Sources ' + letterA + ' and ' + letterB);
              lesson.gcse_task.topic = lesson.gcse_task.topic.replace(/Source\\s+A/g, 'Source ' + letterA);
              lesson.gcse_task.topic = lesson.gcse_task.topic.replace(/Source\\s+B/g, 'Source ' + letterB);
          }
`;
    content = content.replace(target2, replacement2);
    
    // Replace "How useful are Sources A and B"
    let target3 = `} else {
            html += \`<p style="font-weight: bold; font-size: 13pt;">\${lesson.gcse_task.qNum ? \`Q\${lesson.gcse_task.qNum}. \` : ''}How useful are Sources A and B for an enquiry into \${topicText}?</p>\`;
          }`;
    let replacement3 = `} else {
            html += \`<p style="font-weight: bold; font-size: 13pt;">\${lesson.gcse_task.qNum ? \`Q\${lesson.gcse_task.qNum}. \` : ''}How useful are \${letterB ? 'Sources ' + letterA + ' and ' + letterB : 'Source ' + letterA} for an enquiry into \${topicText}?</p>\`;
          }`;
    content = content.replace(target3, replacement3);
    
    // Replace srcObj.title
    let target4 = `lesson.gcse_task.sources.forEach(srcObj => {`;
    let replacement4 = `lesson.gcse_task.sources.forEach((srcObj, srcIdx) => {
            let currentLetter = srcIdx === 0 ? letterA : letterB;
            let displayTitle = srcObj.title.replace(/Source\\s+[A-Z]/, 'Source ' + currentLetter);`;
    content = content.replace(target4, replacement4);
    
    let target5 = `sourceHTML += \`<p style="font-size: 10pt; font-weight: bold; margin-top: 5px;">\${srcObj.title}</p>\`;`;
    let replacement5 = `sourceHTML += \`<p style="font-size: 10pt; font-weight: bold; margin-top: 5px;">\${displayTitle}</p>\`;`;
    content = content.replace(target5, replacement5);
    
    // Replace the NOP Table
    let target6 = `<tr><td style=" padding-top: 8px; padding-bottom: 8px; text-align: center; font-weight: bold; height: 120px;">A</td>`;
    let replacement6 = `<tr><td style=" padding-top: 8px; padding-bottom: 8px; text-align: center; font-weight: bold; height: 120px;">\${letterA}</td>`;
    content = content.replace(target6, replacement6);
    
    let target7 = `<tr><td style=" padding-top: 8px; padding-bottom: 8px; text-align: center; font-weight: bold; height: 120px;">B</td>`;
    let replacement7 = `<tr><td style=" padding-top: 8px; padding-bottom: 8px; text-align: center; font-weight: bold; height: 120px;">\${letterB}</td>`;
    content = content.replace(target7, replacement7);
    
    fs.writeFileSync(filename, content);
    console.log("Patched " + filename);
}

patchFile('generate_textbooks.js');
patchFile('generate_workbooks.js');
patchFile('generate_pupil_workbooks.js');
