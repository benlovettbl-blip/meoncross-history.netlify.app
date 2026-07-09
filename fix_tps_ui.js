const fs = require('fs');
const path = require('path');

function updateAppJs(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  const tpsHTML = `
    if (lesson.pair_share) {
      html += \`<div class="tasks-section" style="background: #e8f5e9; border: 2px solid #4caf50; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
        <h3 style="color: #2e7d32; border-bottom: 2px solid #81c784; padding-bottom: 10px; margin-top: 0;">
          <i class="fa-solid fa-users"></i> Think-Pair-Share Challenge
        </h3>
        <p style="font-weight: 600; font-size: 1.15rem; color: #1b5e20;">\${lesson.pair_share.prompt}</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-top: 15px;">
          <div style="background: #fff; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <h4 style="color: #388e3c; margin-top: 0;"><i class="fa-solid fa-brain"></i> 1. Think (1 min)</h4>
            <p style="font-size: 0.95rem; margin-bottom: 0;">\${lesson.pair_share.think}</p>
          </div>
          <div style="background: #fff; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <h4 style="color: #f57c00; margin-top: 0;"><i class="fa-solid fa-comments"></i> 2. Pair (2 mins)</h4>
            <p style="font-size: 0.95rem; margin-bottom: 0;">\${lesson.pair_share.pair}</p>
          </div>
          <div style="background: #fff; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <h4 style="color: #1976d2; margin-top: 0;"><i class="fa-solid fa-bullhorn"></i> 3. Share</h4>
            <p style="font-size: 0.95rem; margin-bottom: 0;">\${lesson.pair_share.share}</p>
          </div>
        </div>
      </div>\`;
    }
  `;

  if (!content.includes('lesson.pair_share')) {
    // Replace right before "// Tasks (Knowledge Check)"
    content = content.replace(
      /\/\/ Tasks \(Knowledge Check\)/,
      tpsHTML + '\n    // Tasks (Knowledge Check)'
    );
    fs.writeFileSync(filePath, content);
    console.log("Injected TPS into " + path.basename(filePath));
  } else {
    console.log("TPS already exists in " + path.basename(filePath));
  }
}

updateAppJs(path.join(__dirname, 'great_war_v2', 'app.js'));
updateAppJs(path.join(__dirname, 'great_war_v2', 'generate_worksheets.js'));
