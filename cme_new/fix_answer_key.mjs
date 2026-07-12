import fs from 'fs';

let content = fs.readFileSync('c:/Projects/meoncross-history.netlify.app/cme_new/generate_answer_key.js', 'utf8');

// The corrupted part is at `// Historians Corner\n// Append Quiz Pack`
const replacement = `    }
  }

  // Historians Corner
  if (lesson.historians_corner) {
    html += \`<div class="task-box" style="page-break-inside: avoid; background: #fff; border: 2px dashed #666;">\`;
    html += \`<h3 style="margin-top: 0;">Historian's Corner: \${lesson.historians_corner.title}</h3>\`;
    html += \`<p style="font-size: 11pt; font-style: italic;">\${lesson.historians_corner.text}</p>\`;
    html += \`</div>\`;
  }

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
        <div style="flex: 1; border: 1px solid #ccc; padding: 10px;">
          \${srcB_html}
          <p style="font-size: 10pt; font-weight: bold; margin-top: 5px;">\${lesson.gcse_task.sources[1].title}</p>
        </div>
      </div>
    \`;

    html += \`<h3 style="margin-top: 0;">Source Evaluation Notes</h3>\`;
    html += \`
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; page-break-inside: avoid;">
        <tr>
          <th style="border: 2px solid #000; padding: 8px; width: 10%;">Source</th>
          <th style="border: 2px solid #000; padding: 8px; width: 30%;">N.O.P. (Nature, Origin, Purpose)</th>
          <th style="border: 2px solid #000; padding: 8px; width: 30%;">Content (What it shows/says)</th>
          <th style="border: 2px solid #000; padding: 8px; width: 30%;">Contextual Knowledge</th>
        </tr>
        <tr>
          <td style="border: 2px solid #000; padding: 8px; text-align: center; font-weight: bold; height: 120px;">A</td>
          <td style="border: 2px solid #000; padding: 8px;"></td>
          <td style="border: 2px solid #000; padding: 8px;"></td>
          <td style="border: 2px solid #000; padding: 8px;"></td>
        </tr>
        <tr>
          <td style="border: 2px solid #000; padding: 8px; text-align: center; font-weight: bold; height: 120px;">B</td>
          <td style="border: 2px solid #000; padding: 8px;"></td>
          <td style="border: 2px solid #000; padding: 8px;"></td>
          <td style="border: 2px solid #000; padding: 8px;"></td>
        </tr>
      </table>
    \`;

    html += \`<h3 style="margin-top: 0;">Final Written Evaluation</h3>\`;
    html += \`<div style="color:red; font-weight:bold; padding: 15px; background: #fff0f0; border: 2px dashed red; min-height: 200px; margin-top: 15px;">\${lesson.gcse_task.model}</div>\`;
    
    html += \`</div>\`;
  }
});

// Append Quiz Pack`;

content = content.replace('  // Historians Corner\r\n// Append Quiz Pack', replacement);
content = content.replace('  // Historians Corner\n// Append Quiz Pack', replacement);

fs.writeFileSync('c:/Projects/meoncross-history.netlify.app/cme_new/generate_answer_key.js', content, 'utf8');
console.log("Restored generate_answer_key.js successfully");
