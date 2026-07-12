import fs from 'fs';

let content = fs.readFileSync('c:/Projects/meoncross-history.netlify.app/great_war/generate_worksheets.js', 'utf8');

// Replace great_war with cme_new
content = content.replace(/great_war/g, 'cme_new');

// Split into lines
let lines = content.split('\n');
let newLines = [];
let insideGcseBlock = false;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('// GCSE Cross-Source Analysis')) {
        insideGcseBlock = true;
        newLines.push('  // GCSE Cross-Source Analysis');
        newLines.push('  if (lesson.gcse_task && lesson.gcse_task.sources && lesson.gcse_task.sources.length >= 2) {');
        newLines.push('    html += `<div style="page-break-before: always;">`;');
        newLines.push('    html += `<h2>GCSE Cross-Source Analysis</h2>`;');
        newLines.push('    html += `<p style="font-weight: bold; font-size: 13pt;">How useful are Sources A and B for an enquiry into ${lesson.gcse_task.topic}?</p>`;');
        newLines.push('');
        newLines.push('    let srcA_html = "";');
        newLines.push('    if (lesson.gcse_task.sources[0].src) {');
        newLines.push('        let srcA = lesson.gcse_task.sources[0].src.startsWith("../") ? lesson.gcse_task.sources[0].src : `../cme_new/${lesson.gcse_task.sources[0].src}`;');
        newLines.push('        srcA_html = `<img src="${srcA}" style="max-width: 100%; max-height: 250px;">`;');
        newLines.push('    } else if (lesson.gcse_task.sources[0].text) {');
        newLines.push('        srcA_html = `<blockquote style="font-size: 11pt; font-style: italic; margin: 0 0 10px 0;">${lesson.gcse_task.sources[0].text}</blockquote>`;');
        newLines.push('    }');
        newLines.push('');
        newLines.push('    let srcB_html = "";');
        newLines.push('    if (lesson.gcse_task.sources[1].src) {');
        newLines.push('        let srcB = lesson.gcse_task.sources[1].src.startsWith("../") ? lesson.gcse_task.sources[1].src : `../cme_new/${lesson.gcse_task.sources[1].src}`;');
        newLines.push('        srcB_html = `<img src="${srcB}" style="max-width: 100%; max-height: 250px;">`;');
        newLines.push('    } else if (lesson.gcse_task.sources[1].text) {');
        newLines.push('        srcB_html = `<blockquote style="font-size: 11pt; font-style: italic; margin: 0 0 10px 0;">${lesson.gcse_task.sources[1].text}</blockquote>`;');
        newLines.push('    }');
        newLines.push('');
        newLines.push('    html += `');
        newLines.push('      <div style="display: flex; gap: 20px; margin-bottom: 20px;">');
        newLines.push('        <div style="flex: 1; border: 1px solid #ccc; padding: 10px; text-align: center;">');
        newLines.push('          ${srcA_html}');
        newLines.push('          <p style="font-size: 10pt; font-weight: bold; margin-top: 5px;">${lesson.gcse_task.sources[0].title}</p>');
        newLines.push('        </div>');
        newLines.push('        <div style="flex: 1; border: 1px solid #ccc; padding: 10px; text-align: center;">');
        newLines.push('          ${srcB_html}');
        newLines.push('          <p style="font-size: 10pt; font-weight: bold; margin-top: 5px;">${lesson.gcse_task.sources[1].title}</p>');
        newLines.push('        </div>');
        newLines.push('      </div>');
        newLines.push('    `;');
        
        // Skip lines until we find the end of the block (the closing </div> of the flex container)
        // Let's just find `html += \`<h3 style="margin-top: 0;">Source Evaluation Notes</h3>\`;`
        while(i < lines.length && !lines[i].includes('Source Evaluation Notes')) {
            i++;
        }
        // i is now at the `Source Evaluation Notes` line, so push it
        newLines.push(lines[i]);
        insideGcseBlock = false;
    } else if (!insideGcseBlock) {
        newLines.push(lines[i]);
    }
}

fs.writeFileSync('c:/Projects/meoncross-history.netlify.app/cme_new/generate_worksheets.js', newLines.join('\n'), 'utf8');
console.log("Line-by-line patch applied successfully!");
