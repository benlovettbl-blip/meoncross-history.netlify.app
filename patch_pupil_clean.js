const fs = require('fs');

let c = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');

c = c.replace(
    '      if (lesson.startPage) {',
    '      let flatQuestions = [];\n      if (lesson.startPage) {'
);

let endStr = '      if (allVideos.length > 0) {';
let before_end = c.indexOf(endStr);
c = c.substring(0, before_end) + '      flatQuestions.sort((a,b) => a.qNum - b.qNum);\n      flatQuestions.forEach(q => html += q.html);\n\n' + c.substring(before_end);

// 1. Primary Source
let psStart = c.indexOf('      // Primary Source');
let psEnd = c.indexOf('      // Vocab', psStart);
let psSection = c.substring(psStart, psEnd);
psSection = psSection.replace('if (lesson.primary_source) {', 'if (lesson.primary_source) {\n        let _psHtml = "";');
psSection = psSection.replace('html += `\n        <div class="source-container"', '_psHtml += `\n        <div class="source-container"');
psSection = psSection.replace('        </div>\n      `;\n      }', '        </div>\n      `;\n        if (lesson.primary_source && typeof lesson.primary_source === "object" && lesson.primary_source.question) {\n            flatQuestions.push({ qNum: lesson.primary_source.qNum, html: _psHtml });\n        } else {\n            html += _psHtml;\n        }\n      }');
c = c.substring(0, psStart) + psSection + c.substring(psEnd);

// 2. Sources
let srcStart = c.indexOf('      // Sources');
let srcEnd = c.indexOf('      // Narrative Blocks & Tasks', srcStart);
let srcSection = c.substring(srcStart, srcEnd);
srcSection = srcSection.replace('html += `\n              <div class="source-container"', 'flatQuestions.push({ qNum: source.qNum, html: `\n              <div class="source-container"');
srcSection = srcSection.replace('              </div>\n            `;\n            }\n          });\n          html += `</div>`;\n        }', '              </div>\n            ` });\n            }\n          });\n        }');
srcSection = srcSection.replace('html += `<div style="page-break-inside: auto; margin-bottom: 15px;">`;\n          lesson.sources.forEach', 'lesson.sources.forEach');
c = c.substring(0, srcStart) + srcSection + c.substring(srcEnd);

// 3. Narrative Blocks
let nbStart = c.indexOf('      // Narrative Blocks & Tasks');
let nbEnd = c.indexOf('      if (lesson.tasks && lesson.tasks.length > 0) {', nbStart);
let nbSection = c.substring(nbStart, nbEnd);
nbSection = nbSection.replace(/html \+=/g, '_nbHtml +=');
nbSection = nbSection.replace('if (hasContent) {', 'if (hasContent) {\n            let _nbHtml = "";\n            let _firstQNum = 9999;');
nbSection = nbSection.replace('if (block.extended && block.extended.question) {', 'if (block.extended && block.extended.question) {\n              if (block.extended.qNum && block.extended.qNum < _firstQNum) _firstQNum = block.extended.qNum;');
nbSection = nbSection.replace('if (block.hinge_question) {', 'if (block.hinge_question) {\n              if (block.hinge_question.qNum && block.hinge_question.qNum < _firstQNum) _firstQNum = block.hinge_question.qNum;');
nbSection = nbSection.replace('let qNumStr = task.qNum ? `<strong>Q${task.qNum}.</strong> ` : "";', 'if (task.qNum && task.qNum < _firstQNum) _firstQNum = task.qNum;\n                let qNumStr = task.qNum ? `<strong>Q${task.qNum}.</strong> ` : "";');
nbSection = nbSection.replace('_nbHtml += `</div>`; // Close narrative-block div\n          }', '_nbHtml += `</div>`; // Close narrative-block div\n            if (_firstQNum !== 9999) {\n                flatQuestions.push({ qNum: _firstQNum, html: _nbHtml });\n            } else {\n                html += _nbHtml;\n            }\n          }');
c = c.substring(0, nbStart) + nbSection + c.substring(nbEnd);

// 4. Pair Share
let psShareStart = c.indexOf('      // Pair Share');
let psShareEnd = c.indexOf('      // GCSE Task', psShareStart);
if(psShareStart !== -1 && psShareEnd !== -1) {
    let psShareSection = c.substring(psShareStart, psShareEnd);
    psShareSection = psShareSection.replace(/html \+=/g, '_pshHtml +=');
    psShareSection = psShareSection.replace('if (lesson.pair_share) {', 'if (lesson.pair_share) {\n        let _pshHtml = "";');
    psShareSection = psShareSection.replace('_pshHtml += `</div>`;\n      }', '_pshHtml += `</div>`;\n        flatQuestions.push({ qNum: lesson.pair_share.qNum || 999, html: _pshHtml });\n      }');
    c = c.substring(0, psShareStart) + psShareSection + c.substring(psShareEnd);
}

// 5. GCSE Task
let gcStart = c.indexOf('      // GCSE Task');
let gcEnd = c.indexOf('      // End of individual lesson loop', gcStart);
if (gcEnd === -1) gcEnd = c.indexOf('      // Add to Tracker', gcStart); // fallback
if (gcEnd === -1) gcEnd = c.indexOf('      if (allVideos.length > 0) {', gcStart); // fallback 2

if (gcStart !== -1 && gcEnd !== -1) {
    let gcSection = c.substring(gcStart, gcEnd);
    gcSection = gcSection.replace(/html \+=/g, '_gcHtml +=');
    gcSection = gcSection.replace('if (lesson.gcse_task) {', 'if (lesson.gcse_task) {\n        let _gcHtml = "";');
    gcSection = gcSection.replace('_gcHtml += `</div>`;\n      }', '_gcHtml += `</div>`;\n        let _gq = lesson.gcse_task.qNum || (lesson.gcse_task.tasks && lesson.gcse_task.tasks[0] && lesson.gcse_task.tasks[0].qNum) || 999;\n        flatQuestions.push({ qNum: _gq, html: _gcHtml });\n      }');
    c = c.substring(0, gcStart) + gcSection + c.substring(gcEnd);
}

fs.writeFileSync('generate_pupil_workbooks.js', c);
console.log('Patched correctly.');
