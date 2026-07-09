const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'great_war_v2', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// Parse data
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

// Modify data
unitData.lessons.forEach(lesson => {
  // Move "draw" tasks into primary_source.tasks
  if (lesson.tasks && lesson.primary_source) {
    const drawTasks = lesson.tasks.filter(t => t.type === 'draw');
    const otherTasks = lesson.tasks.filter(t => t.type !== 'draw');
    
    if (drawTasks.length > 0) {
      lesson.primary_source.tasks = drawTasks;
      lesson.tasks = otherTasks;
    }
  }

  // Remove (Ext P...) from extended questions
  if (lesson.extended && lesson.extended.question) {
    lesson.extended.question = lesson.extended.question.replace(/\s*\(Ext\s*P[\d-]+\)/g, '');
  }
});

// Write data back
const newJsContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
fs.writeFileSync(dataPath, newJsContent);
console.log("Updated data.js");

// Modify app.js
const appPath = path.join(__dirname, 'great_war_v2', 'app.js');
let appContent = fs.readFileSync(appPath, 'utf8');

// Add "Main Dashboard" to the header and add sticky
appContent = appContent.replace(
  /<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">\s*<h2>\$\{lesson\.title\}<\/h2>\s*<button class="btn btn-secondary" onclick="window\.renderDashboard\(\)"><i class="fa-solid fa-arrow-left"><\/i> Back to Lessons<\/button>\s*<\/div>/,
  `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; position: sticky; top: 0; background: white; padding: 15px 0; z-index: 1000; border-bottom: 2px solid #e2e8f0;">
    <h2 style="margin: 0;">\${lesson.title}</h2>
    <div style="display: flex; gap: 10px;">
      <button class="btn btn-secondary" onclick="window.renderDashboard()"><i class="fa-solid fa-arrow-left"></i> Unit Menu</button>
      <button class="btn btn-secondary" onclick="window.location.href='../index.html'"><i class="fa-solid fa-house"></i> Main Dashboard</button>
    </div>
  </div>`
);

// Add primary_source tasks to render in app.js
appContent = appContent.replace(
  /\$\{lesson\.primary_source\.caption \? \`<p class="source-caption">\$\{lesson\.primary_source\.caption\}<\/p>\` : ''\}\s*<\/div>\s*`;/g,
  `\${lesson.primary_source.caption ? \`<p class="source-caption">\${lesson.primary_source.caption}</p>\` : ''}
            \${lesson.primary_source.tasks ? lesson.primary_source.tasks.map((task, idx) => \`<div class="task-item" style="margin-top: 15px; border-left: 3px solid #f39c12; padding-left: 10px;"><strong>Task \${idx + 1}:</strong> \${task.text.replace(/Task \\d+:\\s*/, '')}</div>\`).join('') : ''}
          </div>
        \`;`
);

// Add Flashcards and Quiz Bank at the bottom of the lesson
if (!appContent.includes('flashcard-grid')) {
  appContent = appContent.replace(
    /html \+= `<\/div>`;\s*contentArea\.innerHTML = html;/g,
    `if (lesson.flashcards && lesson.flashcards.length > 0) {
      html += \`<div class="tasks-section" style="margin-top: 40px; background: #fff8e1; border: 2px solid #ffca28; border-radius: 8px; padding: 20px;">
        <h3 style="color: #ff8f00; margin-top: 0; border-bottom: 2px solid #ffe082; padding-bottom: 10px;"><i class="fa-solid fa-bolt"></i> Lesson Flashcards</h3>
        <div class="flashcard-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">\`;
      lesson.flashcards.forEach(fc => {
        html += \`<div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
          <h4 style="margin: 0 0 5px 0; color: #d84315;">\${fc.term}</h4>
          <p style="margin: 0; font-size: 0.95rem;">\${fc.definition}</p>
        </div>\`;
      });
      html += \`</div>
        <div style="margin-top: 20px; text-align: right;">
          <button class="btn btn-primary" onclick="window.location.href='../index.html'"><i class="fa-solid fa-gamepad"></i> Go to Taboo Recall Quiz Bank</button>
        </div>
      </div>\`;
    }
    html += \`</div>\`;
    contentArea.innerHTML = html;`
  );
}

fs.writeFileSync(appPath, appContent);
console.log("Updated app.js");

// Modify generate_worksheets.js similarly
const genPath = path.join(__dirname, 'great_war_v2', 'generate_worksheets.js');
let genContent = fs.readFileSync(genPath, 'utf8');

// Add primary_source tasks
genContent = genContent.replace(
  /\$\{lesson\.primary_source\.caption \? \`<p class="source-caption">\$\{lesson\.primary_source\.caption\}<\/p>\` : ''\}\s*<\/div>\s*`;/g,
  `\${lesson.primary_source.caption ? \`<p class="source-caption">\${lesson.primary_source.caption}</p>\` : ''}
            \${lesson.primary_source.tasks ? lesson.primary_source.tasks.map((task, idx) => \`<div class="task-item" style="margin-top: 15px;"><strong>Annotation Task \${idx + 1}:</strong> \${task.text.replace(/Task \\d+:\\s*/, '')}</div>\`).join('') : ''}
          </div>
        \`;`
);

fs.writeFileSync(genPath, genContent);
console.log("Updated generate_worksheets.js");
