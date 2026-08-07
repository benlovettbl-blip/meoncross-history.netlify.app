const fs = require('fs');
let appStr = fs.readFileSync('src/core_app.js', 'utf8');

const startMarker = '} else if (block.image) {';
const endMarker = '          html += `';

const startIndex = appStr.indexOf(startMarker);
const endIndex = appStr.indexOf(endMarker, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  const replaceStr = `        } else if (block.image) {
           let containerStyle = block.image_context 
             ? 'display: flex; flex-wrap: wrap; gap: 20px; align-items: stretch; justify-content: center; margin: 20px 0;'
             : 'text-align: center; margin: 20px 0;';
           let imgWrapperStyle = block.image_context 
             ? 'flex: 1 1 300px; text-align: center; display: flex; flex-direction: column; justify-content: center;' 
             : '';
           let contextHtml = block.image_context 
             ? \`
               <div style="flex: 1 1 300px; background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: center;">
                 <h4 style="margin-top: 0; margin-bottom: 12px; color: #b45309; display: flex; align-items: center; gap: 8px; font-size: 1.1rem;">
                   <i class="fa-solid fa-magnifying-glass-plus"></i> Historical Context
                 </h4>
                 <p style="margin: 0; color: #334155; line-height: 1.6; font-size: 1rem;">\${block.image_context}</p>
               </div>
               \`
             : '';
           
           imageHtml = \`
             <style>
               .image-hint-caption {
                 font-size: 0.9rem; color: #64748b; margin-top: 8px; font-style: italic; cursor: pointer; user-select: none; transition: all 0.3s ease; padding: 4px; border-radius: 4px; display: inline-block;
               }
               .image-hint-caption:hover {
                 background: rgba(0,0,0,0.02);
               }
               .image-hint-caption.blurred {
                 color: transparent !important; text-shadow: 0 0 10px rgba(100,116,139,0.8) !important;
               }
             </style>
             <div class="narrative-image-container" style="\${containerStyle}">
               <div style="\${imgWrapperStyle}">
                 <img src="\${getAssetUrl(block.image)}" alt="\${block.image_alt || 'Narrative Image'}" style="max-width: 100%; max-height: 400px; object-fit: contain; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #cbd5e1; cursor: zoom-in;" onclick="window.openModal(this.src)">
                 \${block.image_alt ? \`<div class="image-hint-caption" onclick="this.classList.toggle('blurred'); const i = this.querySelector('i'); if(this.classList.contains('blurred')) { i.classList.replace('fa-eye', 'fa-eye-slash'); i.style.color = '#94a3b8'; this.title = 'Click to reveal caption'; } else { i.classList.replace('fa-eye-slash', 'fa-eye'); i.style.color = '#10b981'; this.title = 'Click to hide caption'; }" title="Click to hide caption"><i class="fa-solid fa-eye" style="margin-right:4px; color: #10b981;"></i> \${block.source_letter ? \`<strong>Source \${block.source_letter}:</strong> \` : ''}\${block.image_alt}</div>\` : ''}
               </div>
               \${contextHtml}
             </div>
           \`;
        }
\n`;

  appStr = appStr.substring(0, startIndex) + replaceStr + appStr.substring(endIndex);
  fs.writeFileSync('src/core_app.js', appStr);
  console.log("Successfully patched core_app.js");
} else {
  console.log("Could not find start or end index.");
}
