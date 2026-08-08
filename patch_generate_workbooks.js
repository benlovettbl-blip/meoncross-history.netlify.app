const fs = require('fs');

let content = fs.readFileSync('generate_workbooks.js', 'utf8');

// 1. Remove banner image
content = content.replace(
  '${bannerImageSrc ? `<img src="${bannerImageSrc}" style="width: 100%; height: 100%; object-fit: cover;">` : \'\'}',
  '<!-- Banner image removed per user request -->'
);

// 2. Fix Mansa Musa (block.images instead of just block.image)
const imageBlockOld = `          if (block.image) {
            let src = typeof resolveAssetPath === 'function' ? resolveAssetPath(block.image, 2) : block.image;
            if (src.toLowerCase().endsWith('.svg')) {
                html += \`<img src="\${src}" style="width: 85%; max-width: 650px; height: auto; display:block; margin: 25px auto 5px auto; border-radius: 8px; border: 1.5px solid #475569; padding: 10px; background: #f8fafc;">\`;
            } else {
                html += \`<img src="\${src}" style="max-width:100%; max-height: 250px; display:block; margin: 15px auto 5px auto; border-radius: 6px; border: 1px solid #ccc;">\`;
            }
            if (block.image_alt) {
                html += \`<div style="text-align: center; font-size: 10pt; font-style: italic; color: #555; margin-bottom: 15px;">\${block.source_letter ? \`<strong>Source \${block.source_letter}:</strong> \` : ''}\${block.image_alt}</div>\`;
            }
          }`;
          
const imageBlockNew = `          let blockImages = block.images ? block.images : [];
          if (block.image && !blockImages.some(img => img.image === block.image)) {
            blockImages.push({ image: block.image, image_alt: block.image_alt, source_letter: block.source_letter });
          }
          if (blockImages.length > 0) {
            blockImages.forEach(imgData => {
              let src = typeof resolveAssetPath === 'function' ? resolveAssetPath(imgData.image, 2) : imgData.image;
              if (src.toLowerCase().endsWith('.svg')) {
                  html += \`<img src="\${src}" style="width: 85%; max-width: 650px; height: auto; display:block; margin: 25px auto 5px auto; border-radius: 8px; border: 1.5px solid #475569; padding: 10px; background: #f8fafc;">\`;
              } else {
                  html += \`<img src="\${src}" style="max-width:100%; max-height: 250px; display:block; margin: 15px auto 5px auto; border-radius: 6px; border: 1px solid #ccc;">\`;
              }
              if (imgData.image_alt) {
                  html += \`<div style="text-align: center; font-size: 10pt; font-style: italic; color: #555; margin-bottom: 15px;">\${imgData.source_letter ? \`<strong>Source \${imgData.source_letter}:</strong> \` : ''}\${imgData.image_alt}</div>\`;
              }
            });
          }`;
content = content.replace(imageBlockOld, imageBlockNew);

// 3. Fix spilled leveling (add page-break-inside: avoid)
content = content.replace(
  '.grading-footer { margin-top: 30px; padding-top: 15px; font-size: 9.5pt; color: #555; display: flex; flex-direction: column; gap: 8px; border-top: 1px solid #ccc;  }',
  '.grading-footer { margin-top: 30px; padding-top: 15px; font-size: 9.5pt; color: #555; display: flex; flex-direction: column; gap: 8px; border-top: 1px solid #ccc; page-break-inside: avoid; }'
);

// 4. Side Quest tasks inside the purple box
const sideQuestOld = `        finalRenderedText = finalRenderedText.replace(/<\\/details>/gi, '</div>');
        finalRenderedText = finalRenderedText.replace(/<summary[^>]*>(.*?)<\\/summary>/gi, '<h3 style="color: #6d28d9; margin-top: 0; font-size: 14pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px dashed #c4b5fd; padding-bottom: 8px; display: flex; align-items: center; gap: 10px;">$1</h3>');
        html += \`<p class="narrative-block" id="para-\${bIdx+1}">\${finalRenderedText}</p>\`;`;

const sideQuestNew = `        let isSideQuest = finalRenderedText.includes('<details class="side-quest-box"');
        finalRenderedText = finalRenderedText.replace(/<\\/details>/gi, ''); // Don't close yet
        finalRenderedText = finalRenderedText.replace(/<summary[^>]*>(.*?)<\\/summary>/gi, '<h3 style="color: #6d28d9; margin-top: 0; font-size: 14pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px dashed #c4b5fd; padding-bottom: 8px; display: flex; align-items: center; gap: 10px;">$1</h3>');
        html += \`<div class="narrative-block" id="para-\${bIdx+1}">\${finalRenderedText}\`;`;
content = content.replace(sideQuestOld, sideQuestNew);

const closeTaskBoxOld = `            html += \`</div>\`; // Close the initial task-box
          }`;
const closeTaskBoxNew = `            html += \`</div>\`; // Close the initial task-box
          }
          if (isSideQuest) html += \`</div>\`; // Close the side-quest-box
          html += \`</div>\`; // Close the narrative-block div`;
content = content.replace(closeTaskBoxOld, closeTaskBoxNew);

fs.writeFileSync('generate_workbooks.js', content, 'utf8');
console.log('Successfully patched generate_workbooks.js');
