const fs = require('fs');

let c = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');

// 1. Inject flatQuestions array
c = c.replace(
  `      if (lesson.startPage) {`,
  `      let flatQuestions = [];\n      if (lesson.startPage) {`
);

// 2. Primary Source
c = c.replace(
  `      // Primary Source
      if (lesson.primary_source) {`,
  `      // Primary Source
      if (lesson.primary_source) {
        let _psHtml = "";`
);
c = c.replace(
  `        html += \`
        <div class="source-container" style=" margin-bottom: 0px; padding-top: 0px; border-top: none;">`,
  `        _psHtml += \`
        <div class="source-container" style=" margin-bottom: 0px; padding-top: 0px; border-top: none;">`
);
c = c.replace(
  `        </div>
      \`;
      }`,
  `        </div>
      \`;
        if (lesson.primary_source.question) {
            flatQuestions.push({ qNum: lesson.primary_source.qNum, html: _psHtml });
        } else {
            html += _psHtml;
        }
      }`
);

// 3. Sources
c = c.replace(
  `        if (hasQuestions) {
          html += \`<div style="page-break-inside: auto; margin-bottom: 15px;">\`;
          lesson.sources.forEach((source) => {
            if (source.question) {
              html += \`
              <div class="source-container" style="border: none; padding-top: 0; margin-top: 0; margin-bottom: 10px; text-align: left;">
                <div style="margin-top: 10px; text-align: left;"><strong>Q\${source.qNum ? source.qNum + "." : ""} \${source.question}\${source.page ? \` [p. \${source.page}]\` : ""}</strong></div><div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>
              </div>
            \`;
            }
          });
          html += \`</div>\`;
        }`,
  `        if (hasQuestions) {
          lesson.sources.forEach((source) => {
            if (source.question) {
              flatQuestions.push({ qNum: source.qNum, html: \`
              <div class="source-container" style="page-break-inside: auto; border: none; padding-top: 0; margin-top: 0; margin-bottom: 25px; text-align: left;">
                <div style="margin-top: 10px; text-align: left;"><strong>Q\${source.qNum ? source.qNum + "." : ""} \${source.question}\${source.page ? \` [p. \${source.page}]\` : ""}</strong></div><div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>
              </div>
            \` });
            }
          });
        }`
);

// 4. Narrative Blocks
c = c.replace(
  `          if (hasContent) {
            html += \`<div class="narrative-block" id="para-\${bIdx + 1}">\`;`,
  `          if (hasContent) {
            let _nbHtml = \`<div class="narrative-block" id="para-\${bIdx + 1}">\`;
            let _nbFirstQNum = null;`
);

// In narrative blocks, there are multiple html += calls. We need to replace all of them with _nbHtml +=
// Let's just use string replacement for the entire narrative block section using a python script or custom replacer.
fs.writeFileSync('patch_pupil_1.js', c);
console.log('Done part 1');
