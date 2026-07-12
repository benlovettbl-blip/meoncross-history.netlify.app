import fs from 'fs';

// Copy fresh from great_war
let content = fs.readFileSync('c:/Projects/meoncross-history.netlify.app/great_war/generate_worksheets.js', 'utf8');

// 1. Replace great_war with cme_new
content = content.replace(/great_war/g, 'cme_new');

// 2. Fix GCSE task to handle written sources
const oldSourceBlock = `
  // GCSE Cross-Source Analysis
  if (lesson.gcse_task) {
    html += \`<div style="page-break-before: always;">\`;
    html += \`<h2>GCSE Cross-Source Analysis</h2>\`;
    html += \`<p style="font-weight: bold; font-size: 13pt;">How useful are Sources A and B for an enquiry into \${lesson.gcse_task.topic}?</p>\`;
    
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
  // GCSE Cross-Source Analysis
  if (lesson.gcse_task && lesson.gcse_task.sources && lesson.gcse_task.sources.length >= 2) {
    html += \`<div style="page-break-before: always;">\`;
    html += \`<h2>GCSE Cross-Source Analysis</h2>\`;
    html += \`<p style="font-weight: bold; font-size: 13pt;">How useful are Sources A and B for an enquiry into \${lesson.gcse_task.topic}?</p>\`;
    
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
          <p style="font-size: 10pt; font-weight: bold; margin:-top: 5px;">\${lesson.gcse_task.sources[1].title}</p>
        </div>
      </div>
    \`;
`.trim();

content = content.replace(oldSourceBlock, newSourceBlock);

fs.writeFileSync('c:/Projects/meoncross-history.netlify.app/cme_new/generate_worksheets.js', content, 'utf8');
console.log("Successfully created and patched cme_new/generate_worksheets.js from scratch");
