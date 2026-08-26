const fs = require('fs');

function patchFile(filename) {
    let content = fs.readFileSync(filename, 'utf8');
    
    // Find where the question text is rendered
    let target = \html += \\\<p style="margin-top:10px;"><strong>Q\. \</strong></p>\\\;\;
    let replacement = \html += \\\<p style="margin-top:10px;"><strong>Q\. \</strong></p>\\\;
                      if (task.type === 'extended_writing' && task.instructions) {
                          html += \\\<p style="font-style: italic; color: #334155; margin-bottom: 5px; margin-top: 5px; font-size: 10pt;">\</p>\\\;
                      }\;
                      
    if (content.includes(target)) {
        content = content.replace(target, replacement);
        fs.writeFileSync(filename, content);
        console.log("Patched extended_writing instructions in " + filename);
    } else {
        console.log("Target not found in " + filename);
    }
}

patchFile('generate_workbooks.js');
patchFile('generate_pupil_workbooks.js');
