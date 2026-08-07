const fs = require('fs');

let c = fs.readFileSync('src/core_app.js', 'utf8');
const idx = c.indexOf('// ==========================================');

if (idx !== -1) {
    const before = c.substring(0, idx);
    const after = c.substring(idx);
    
    const injection = `      if (lesson.sources && lesson.sources.length > 0) {
        html += \`<div class="sources-grid" style="margin-top: 20px;">\`;
        lesson.sources.forEach(source => {
          html += \`
            <div class="source-card" style="background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px; text-align: center;">
              \${source.title ? \`<h4 style="color: var(--primary); margin-top: 0; text-align: left;">\${source.title}</h4>\` : ''}
              
              \${source.src ? \`
                <div style="display: inline-flex; flex-direction: column; position: relative; max-width: 100%; text-align: left; margin: 15px 0;">
                  <div style="position: relative;">
                    <img src="\${getAssetUrl(source.src)}" alt="Source Image" style="max-width: 100%; max-height: 400px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #cbd5e1; cursor: zoom-in; display: block;" onclick="window.openModal(this.src)">
                    \${source.caption ? \`
                      <button class="source-accordion-btn no-print" onclick="const panel = this.parentElement.nextElementSibling; panel.style.display = panel.style.display === 'none' ? 'block' : 'none';" title="Source Information" style="position: absolute; top: 10px; right: 10px; background: #10b981; color: white; border: none; border-radius: 50%; width: 32px; height: 32px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2); z-index: 10; display: flex; align-items: center; justify-content: center;">
                        <i class="fa-solid fa-info"></i>
                      </button>
                    \` : ''}
                  </div>
                  \${source.caption ? \`
                    <div class="source-info-panel" style="display: none; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 15px; font-size: 0.95rem; color: #334155; margin-top: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); position: relative;">
                      <strong style="color: #0f172a; margin-bottom: 5px; display: block;">
                        <i class="fa-solid fa-circle-info" style="color: #10b981; margin-right: 5px;"></i>
                        About this source
                      </strong>
                      \${source.caption}
                    </div>
                  \` : ''}
                </div>
              \` : ''}
              
              \${source.content ? \`<div style="text-align: left; margin-top: 10px; font-style: italic; color: #334155; font-size: 1.05rem; line-height: 1.5;">\${source.content}</div>\` : ''}
              \${source.question ? \`
                <div style="background: #ebf8ff; border-left: 4px solid #3182ce; padding: 15px; border-radius: 0 4px 4px 0; text-align: left; margin-top: 15px;">
                  <p style="margin-bottom: 0; font-size: 1.1rem; color: #1e3a8a;"><strong>\${formatQuestion(source.question)}</strong></p>
                </div>
              \` : ''}
            </div>
          \`;
        });
        html += \`</div>\`;
      }

`;
    
    fs.writeFileSync('src/core_app.js', before + injection + after);
    console.log('Successfully injected sources!');
} else {
    console.log('Could not find injection point');
}
