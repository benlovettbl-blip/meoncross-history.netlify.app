const fs = require('fs');

function patchTextbooks() {
    let code = fs.readFileSync('generate_textbooks.js', 'utf8');
    
    // 1. Skip GCSE sources at the top
    code = code.replace(
        "if (lesson.sources && lesson.sources.length > 0) {",
        "let isGCSE = (unitId === 'weimar_nazi_germany' || unitId === 'cme_new');\n    if (lesson.sources && lesson.sources.length > 0 && !isGCSE) {"
    );

    // 2. Add GCSE sources at the bottom before exam practice
    const gcseBlock = `
      if (lesson.sources && lesson.sources.length > 0 && isGCSE) {
        html += \`<div style="page-break-inside: auto; margin-bottom: 15px; margin-top: 20px;">\`;
        lesson.sources.forEach((source, sIdx) => {
          let sourceContent = source.content || source.text;
          if(source.src || source.caption || sourceContent) {
            html += \`
              <div class="source-container" style="">
                <span style="color: #ffffff; font-size: 4px;">[[SRC_MARKER:L\${lessonIndex}_Source_\${sIdx}]]</span>
                \${source.title ? \`<strong>\${badgeSource(source.title)}</strong><br>\` : ''}
                \${source.src ? \`<img src="\${typeof resolveAssetPath === 'function' ? resolveAssetPath(source.src, 2) : source.src}" alt="Source">\` : ''}
                \${sourceContent ? \`<blockquote style="text-align: left; font-size: 11pt; margin-top: 10px;">\${formatText(sourceContent)}</blockquote>\` : ''}
                \${source.caption ? \`<div class="source-caption">\${source.caption}</div>\` : ''}
                \${source.question ? \`<div style="margin-top: 15px; text-align: left;"><strong>Q\${source.qNum ? source.qNum + '.' : ''} \${source.question}\${source.page ? \` (See Textbook Page \${source.page})\` : ''}</strong></div>\` : ''}
              </div>
            \`;
          }
        });
        html += \`</div>\`;
      }

      if (lesson.gcse_task) {`;

    code = code.replace("if (lesson.gcse_task) {", gcseBlock);
    
    fs.writeFileSync('generate_textbooks.js', code);
    console.log("Patched generate_textbooks.js");
}

function patchWorkbooks() {
    let code = fs.readFileSync('generate_pupil_workbooks.js', 'utf8');
    
    // 1. Skip GCSE sources at the top
    code = code.replace(
        "if (lesson.sources && lesson.sources.length > 0) {",
        "let isGCSE = (unitId === 'weimar_nazi_germany' || unitId === 'cme_new');\n    if (lesson.sources && lesson.sources.length > 0 && !isGCSE) {"
    );

    // 2. Add GCSE sources at the bottom before exam practice
    const gcseBlock = `
      if (lesson.sources && lesson.sources.length > 0 && isGCSE) {
        html += \`<div style="page-break-inside: auto; margin-bottom: 15px; margin-top: 20px;">\`;
        lesson.sources.forEach((source, sIdx) => {
          let sourceContent = source.content || source.text;
          if(source.src || source.caption || sourceContent) {
            html += \`
              <div class="source-container" style="border: 1px solid #ccc; padding: 15px; margin-bottom: 15px; border-radius: 6px;">
                \${source.title ? \`<strong style="font-size: 11pt;">\${source.title}</strong><br>\` : ''}
                \${source.src ? \`<img src="\${typeof resolveAssetPath === 'function' ? resolveAssetPath(source.src, 2) : source.src}" alt="Source" style="max-width: 100%; max-height: 250px; margin-top: 10px;">\` : ''}
                \${sourceContent ? \`<blockquote style="text-align: left; font-size: 11pt; margin-top: 10px; font-style: italic;">\${formatText(sourceContent)}</blockquote>\` : ''}
                \${source.caption ? \`<div class="source-caption" style="margin-top: 5px; font-size: 10pt;">\${source.caption}</div>\` : ''}
              </div>
            \`;
          }
        });
        html += \`</div>\`;
      }

      let epArray = lesson.exam_practice;`;

    code = code.replace("let epArray = lesson.exam_practice;", gcseBlock);
    
    fs.writeFileSync('generate_pupil_workbooks.js', code);
    console.log("Patched generate_pupil_workbooks.js");
}

patchTextbooks();
patchWorkbooks();
