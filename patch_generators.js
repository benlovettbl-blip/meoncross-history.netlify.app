const fs = require('fs');

function patchGenerator(path) {
  let content = fs.readFileSync(path, 'utf8');
  
  const targetStr = `
          // Legacy support for single 'image' string`;
          
  const newStr = `
          if (block.source) {
            let sIdx = lesson.sources ? lesson.sources.length + idx : idx;
            html += \`
              <div class="source-container" style="page-break-inside: avoid; margin-bottom: 15px; margin-top: 15px; border-left: 3px solid #ccc; padding-left: 15px;">
                <span style="color: #ffffff; font-size: 4px;">[[SRC_MARKER:L\${lesson.globalIndex}_Source_\${sIdx}]]</span>
                \${block.source.title ? \`<strong>\${badgeSource ? badgeSource(block.source.title) : block.source.title}</strong><br>\` : ''}
                \${block.source.src ? \`<img src="\${typeof resolveAssetPath === 'function' ? resolveAssetPath(block.source.src, 2) : block.source.src}" alt="Source" style="max-width: 100%; max-height: 250px;">\` : ''}
                \${block.source.content ? \`<blockquote style="text-align: left; font-size: 11pt; margin-top: 10px; font-style: italic;">\${typeof formatText === 'function' ? formatText(block.source.content) : block.source.content}</blockquote>\` : ''}
                \${block.source.caption ? \`<div class="source-caption">\${block.source.caption}</div>\` : ''}
                \${block.source.question ? \`<div style="margin-top: 15px; text-align: left;"><strong>Q\${block.source.qNum ? block.source.qNum + '.' : ''} \${block.source.question}\${block.source.page ? \` (See Textbook Page \${block.source.page})\` : ''}</strong></div>\` : ''}
              </div>
            \`;
          }

          // Legacy support for single 'image' string`;

  if (content.includes(targetStr)) {
    content = content.replace(targetStr, newStr);
    fs.writeFileSync(path, content);
    console.log(`Successfully updated ${path}!`);
  } else {
    console.log(`Target string not found in ${path}`);
  }
}

patchGenerator('generate_textbooks.js');
patchGenerator('generate_workbooks.js');
