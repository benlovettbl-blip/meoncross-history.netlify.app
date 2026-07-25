const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'great_war_v2', 'app.js');
let appContent = fs.readFileSync(appPath, 'utf8');

// Add textarea to extended reading
appContent = appContent.replace(
  /<div id="scaffold-model-ext" class="scaffold-box model" style="display:none; margin-top:10px;">/,
  `<textarea class="student-answer-input" placeholder="Type your extended answer here..." style="width: 100%; height: 100px; margin-top: 10px; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-family: inherit; resize: vertical;" oninput="window.updateProgress()"></textarea>
              <div id="scaffold-model-ext" class="scaffold-box model" style="display:none; margin-top:10px;">`
);

fs.writeFileSync(appPath, appContent);
console.log("Updated app.js with Extended Textarea");
