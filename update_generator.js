const fs = require('fs');
let content = fs.readFileSync('early_modern_world/generate_worksheets.js', 'utf8');

const target = `      \${Array.isArray(unitData.cover_image) ? 
        \`<div style="display: flex; gap: 10px; justify-content: center; align-items: center; height: 230px;">
          \${unitData.cover_image.map(img => \`<img src="\${img}" style="max-height: 100%; max-width: 32%; object-fit: contain; border: 3px solid #1a237e; border-radius: 4px; box-shadow: 4px 4px 8px rgba(0,0,0,0.2);" alt="\${unitData.title}">\`).join('')}
        </div>\`
        : 
        \`<img src="\${unitData.cover_image || ''}" style="max-width: 100%; max-height: 230px; border: 3px solid #1a237e; border-radius: 4px; box-shadow: 4px 4px 8px rgba(0,0,0,0.2);" alt="\${unitData.title}">\`
      }`;

const replacement = `      \${unitData.cover_sources ? 
        \`<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; width: 100%;">
          \${unitData.cover_sources.map(src => \`
            <div style="display: flex; gap: 10px; align-items: center; background: #f8fafc; padding: 10px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <img src="..\${src.image}" style="width: 90px; height: 90px; object-fit: cover; border: 2px solid white; border-radius: 4px; box-shadow: 1px 1px 3px rgba(0,0,0,0.2);" alt="\${src.title}">
              <div style="text-align: left; flex: 1;">
                <strong style="display: block; font-size: 8pt; color: #1a237e; margin-bottom: 3px;">\${src.title}</strong>
                <span style="font-size: 7.5pt; color: #475569; line-height: 1.2; display: block;">\${src.description}</span>
              </div>
            </div>
          \`).join('')}
        </div>\`
        : Array.isArray(unitData.cover_image) ? 
        \`<div style="display: flex; gap: 10px; justify-content: center; align-items: center; height: 230px;">
          \${unitData.cover_image.map(img => \`<img src="..\${img}" style="max-height: 100%; max-width: 32%; object-fit: contain; border: 3px solid #1a237e; border-radius: 4px; box-shadow: 4px 4px 8px rgba(0,0,0,0.2);" alt="\${unitData.title}">\`).join('')}
        </div>\`
        : 
        \`<img src="..\${unitData.cover_image || ''}" style="max-width: 100%; max-height: 230px; border: 3px solid #1a237e; border-radius: 4px; box-shadow: 4px 4px 8px rgba(0,0,0,0.2);" alt="\${unitData.title}">\`
      }`;

content = content.replace(target, replacement);
fs.writeFileSync('early_modern_world/generate_worksheets.js', content, 'utf8');
console.log("generate_worksheets.js updated successfully.");
