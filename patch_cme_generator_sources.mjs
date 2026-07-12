import fs from 'fs';

const filePath = 'c:/Projects/meoncross-history.netlify.app/cme_new/generate_worksheets.js';
let content = fs.readFileSync(filePath, 'utf8');

const oldSourceBlock = `
    let srcA = lesson.gcse_task.sources[0].src.startsWith('../') ? lesson.gcse_task.sources[0].src : \`../cme_new/\${lesson.gcse_task.sources[0].src}\`;
    html += \`
      <div style="display: flex; gap: 20px; margin-bottom: 20px;">
        <div style="flex: 1; border: 1px solid #ccc; padding: 10px; text-align: center;">
          <img src="\${srcA}" style="max-width: 100%; max-height: 250px;">
          <p style="font-size: 10pt; font-weight: bold; margin-top: 5px;">\${lesson.gcse_task.sources[0].title}</p>
        </div>
        <div style="flex: 1; border: 1px solid #ccc; padding: 10px;">
          <blockquote style="font-size: 11pt; font-style: italic; margin: 0 0 10px 0;">\${lesson.gcse_task.sources[1].text}</blockquote>
          <p style="font-size: 10pt; font-weight: bold; margin: 0;">\${lesson.gcse_task.sources[1].title}</p>
        </div>
      </div>
    \`;
`.trim();

const newSourceBlock = `
    let srcA_html = '';
    if (lesson.gcse_task.sources[0].src) {
        let srcA = lesson.gcse_task.sources[0].src.startsWith('../') ? lesson.gcse_task.sources[0].src : \`../cme_new/\${lesson.gcse_task.sources[0].src}\`;
        srcA_html = \`<img src="\${srcA}" style="max-width: 100%; max-height: 250px;">\`;
    } else if (lesson.gcse_task.sources[0].text) {
        srcA_html = \`<blockquote style="font-size: 11pt; font-style: italic; margin: 0 0 10px 0;">\${lesson.gcse_task.sources[0].text}</blockquote>\`;
    }

    let srcB_html = '';
    if (lesson.gcse_task.sources[1].src) {
        let srcB = lesson.gcse_task.sources[1].src.startsWith('../') ? lesson.gcse_task.sources[1].src : \`../cme_new/\${lesson.gcse_task.sources[1].src}\`;
        srcB_html = \`<img src="\${srcB}" style="max-width: 100%; max-height: 250px;">\`;
    } else if (lesson.gcse_task.sources[1].text) {
        srcB_html = \`<blockquote style="font-size: 11pt; font-style: italic; margin: 0 0 10px 0;">\${lesson.gcse_task.sources[1].text}</blockquote>\`;
    }

    html += \`
      <div style="display: flex; gap: 20px; margin-bottom: 20px;">
        <div style="flex: 1; border: 1px solid #ccc; padding: 10px; text-align: center;">
          \${srcA_html}
          <p style="font-size: 10pt; font-weight: bold; margin-top: 5px;">\${lesson.gcse_task.sources[0].title}</p>
        </div>
        <div style="flex: 1; border: 1px solid #ccc; padding: 10px; text-align: center;">
          \${srcB_html}
          <p style="font-size: 10pt; font-weight: bold; margin-top: 5px;">\${lesson.gcse_task.sources[1].title}</p>
        </div>
      </div>
    \`;
`.trim();

content = content.replace(oldSourceBlock, newSourceBlock);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully patched source handling in generate_worksheets.js");
