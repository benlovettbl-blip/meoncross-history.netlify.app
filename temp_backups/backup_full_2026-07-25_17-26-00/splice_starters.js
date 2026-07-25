const fs = require('fs');
let code = fs.readFileSync('src/core_app.js', 'utf8');

const targetStr = "if (lesson.do_now && lesson.do_now.type === 'timeline' && lesson.do_now.events) {";

if (code.includes(targetStr)) {
  const insertion = `
      if (lesson.starters && lesson.starters.length > 0) {
        html += \`
          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; margin-bottom: 20px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <div style="padding: 15px 20px; background: linear-gradient(to right, #1e3a8a, #3b82f6); color: white; font-weight: bold; font-size: 1.2rem; display: flex; align-items: center;">
              <i class="fa-solid fa-image" style="margin-right: 10px;"></i> Historical Sources: Think & Wonder
            </div>
            <div style="padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start;">
        \`;
        lesson.starters.forEach((starter, index) => {
          html += \`
              <div style="display: flex; flex-direction: column; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 15px; height: 100%;">
                <h4 style="margin: 0 0 15px 0; color: #0f172a; font-size: 1.1rem; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">Source \${String.fromCharCode(65 + index)}: \${starter.title}</h4>
                <div style="width: 100%; height: 250px; background-color: #000; border-radius: 4px; overflow: hidden; margin-bottom: 15px; display: flex; justify-content: center; align-items: center;">
                  <img src="\${starter.source}" style="max-width: 100%; max-height: 100%; object-fit: contain; cursor: zoom-in;" onclick="window.openModal(this.src)">
                </div>
                <div style="font-size: 0.95rem; color: #475569; margin-bottom: 15px; font-style: italic;">
                  \${starter.caption}
                </div>
                <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 12px; border-radius: 0 4px 4px 0; margin-top: auto;">
                  <div style="font-weight: 700; color: #1e3a8a; margin-bottom: 5px; font-size: 0.95rem;"><i class="fa-solid fa-lightbulb" style="color: #fbbf24; margin-right: 5px;"></i> Think & Wonder</div>
                  <div style="font-size: 0.95rem; color: #1e40af;">\${starter.think_wonder}</div>
                </div>
              </div>
          \`;
        });
        html += \`
            </div>
          </div>
        \`;
      }
      
      `;
  code = code.replace(targetStr, insertion + targetStr);
  fs.writeFileSync('src/core_app.js', code, 'utf8');
  console.log("Successfully injected starters UI into core_app.js");
} else {
  console.log("Could not find target string in core_app.js");
}
