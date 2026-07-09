const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'great_war', 'app.js');
let appContent = fs.readFileSync(appPath, 'utf8');

// Add Progress Bar to renderLesson
const stickyHeaderRegex = /<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; position: sticky; top: 0; background: rgba\(255, 255, 255, 0.95\); backdrop-filter: blur\(5px\); padding: 10px 15px; z-index: 1000; border-bottom: 1px solid #e2e8f0; box-shadow: 0 2px 10px rgba\(0,0,0,0.05\);">\s*<h4 style="margin: 0; font-size: 1.1rem; color: var\(--primary\); line-height: 1.3;">\$\{lesson\.title\}<\/h4>\s*<div style="display: flex; gap: 8px;">/;

appContent = appContent.replace(stickyHeaderRegex, `<div id="progress-container" style="position: sticky; top: 0; background: #e2e8f0; height: 6px; width: 100%; z-index: 1001;">
      <div id="progress-bar" style="height: 100%; width: 0%; background: #4caf50; transition: width 0.3s ease;"></div>
    </div>
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; position: sticky; top: 6px; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(5px); padding: 10px 15px; z-index: 1000; border-bottom: 1px solid #e2e8f0; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
      <h4 style="margin: 0; font-size: 1.1rem; color: var(--primary); line-height: 1.3;">\${lesson.title}</h4>
      <div style="display: flex; gap: 8px; align-items: center;">
        <label style="margin-right: 15px; font-size: 0.9rem; color: var(--primary); font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 5px;">
          <input type="checkbox" id="teacherModeToggle" onchange="window.toggleTeacherMode(this.checked)"> Teacher Mode
        </label>`);

// Add textareas to tasks and update progress bar
appContent = appContent.replace(
  /<div class="task-text"><strong>Q\$\{task\.qNum\}:<\/strong> \$\{task\.text\.(.*?)\}<\/div>\s*<div id="scaffold-model-\$\{tIdx\}" class="scaffold-box model" style="display:none; margin-top:10px;">/g,
  `<div class="task-text"><strong>Q\${task.qNum}:</strong> \${task.text.$1}</div>
            <textarea class="student-answer-input" placeholder="Type your answer here..." style="width: 100%; height: 80px; margin-top: 10px; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-family: inherit; resize: vertical;" oninput="window.updateProgress()"></textarea>
            <div id="scaffold-model-\${tIdx}" class="scaffold-box model" style="display:none; margin-top:10px;">`
);

// Add the window functions
const functionDefinitions = `
  window.toggleTeacherMode = (isActive) => {
    const models = document.querySelectorAll('.model');
    models.forEach(m => {
      m.style.display = isActive ? 'block' : 'none';
    });
  };

  window.updateProgress = () => {
    const inputs = document.querySelectorAll('.student-answer-input');
    if (inputs.length === 0) return;
    let filled = 0;
    inputs.forEach(input => {
      if (input.value.trim().length > 0) filled++;
    });
    const percentage = (filled / inputs.length) * 100;
    const bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = percentage + '%';
  };
`;

appContent = appContent.replace(/window\.renderLesson = \(idx\) => \{/, `${functionDefinitions}\n  window.renderLesson = (idx) => {`);

fs.writeFileSync(appPath, appContent);
console.log("Updated app.js with Teacher Mode and Progress Bar");
