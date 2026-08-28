const fs = require('fs');
let content = fs.readFileSync('generate_textbooks.js', 'utf8');

const target = `
      }
      html += \\`</div>\\`;
    }

    if (lesson.narrative_blocks) {`;

const replacement = `
      }
      html += \\`</div>\\`;
    }

    html += \\`</div>\\`;
    
    html += \\`</div>\\`;

    // Sources
    let isGCSE = (unitId === 'weimar_nazi_germany' || unitId === 'cme_new');
    if (lesson.sources && lesson.sources.length > 0 && !isGCSE) {
      html += \\`<div style="page-break-inside: auto; margin-bottom: 15px;">\\`;
      lesson.sources.forEach((source, sIdx) => {
        let sourceContent = source.content || source.text;
        if((source.src || source.source) || source.caption || sourceContent) {
          html += \\`
            <div class="source-container" style="">
              <span style="color: #ffffff; font-size: 4px;">[[SRC_MARKER:L\${lesson.globalIndex}_Source_\${sIdx}]]</span>
              \${source.title ? \\`<strong>\${currentUnitId === 'great_war' ? badgeSource(source.title, 'S' + (sIdx + 1)) : badgeSource(source.title)}</strong><br>\\` : ''}
              \${(source.src || source.source) ? \\`<img src="\${typeof resolveAssetPath === 'function' ? resolveAssetPath((source.src || source.source), 2) : (source.src || source.source)}" alt="Source">\\` : ''}
              \${sourceContent ? \\`<blockquote style="text-align: left; font-size: 11pt; margin-top: 10px;">\${formatText(sourceContent)}</blockquote>\\` : ''}
              \${source.caption ? \\`<div class="source-caption">\${source.caption}</div>\\` : ''}
              \${source.question ? \\`<div style="margin-top: 15px; text-align: left;"><strong>Q\${source.qNum ? source.qNum + '.' : ''} \${source.question}\${source.page ? \\` (See Textbook Page \${source.page})\\` : ''}</strong></div>\\` : ''}
            </div>
          \\`;
        }
      });
      html += \\`</div>\\`;
    }

    if (lesson.narrative_blocks) {`;

content = content.replace(target.replace(/\\`/g, '`'), replacement.replace(/\\`/g, '`'));
fs.writeFileSync('generate_textbooks.js', content);
