const fs = require('fs');

const files = [
  'generate_workbooks.js',
  'generate_pupil_workbooks.js',
  'generate_textbooks.js',
  'generate_textbooks_debug.js'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Cover Margin Collision (max-height: 100vh -> height: 80vh; box-sizing: border-box;)
  if (content.includes('max-height: 100vh;')) {
    content = content.replaceAll('max-height: 100vh;', 'height: 80vh; box-sizing: border-box;');
    changed = true;
  }

  // 2. Orphaned Vocabulary Checks (page-break-inside: avoid;)
  if (content.includes('class="task-box" style="margin-bottom: 0px; padding: 5px;"')) {
    content = content.replaceAll('class="task-box" style="margin-bottom: 0px; padding: 5px;"', 'class="task-box" style="margin-bottom: 0px; padding: 5px; page-break-inside: avoid;"');
    changed = true;
  }

  // 3. The Markdown Underscore Trap
  if (content.includes("replace(/_{3,}/g, '___________')")) {
    content = content.replaceAll("replace(/_{3,}/g, '___________')", "replace(/_{3,}/g, '&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;')");
    changed = true;
  }
  if (content.includes("replace(/\\[.*?\\]/g, ' ___________ ')")) {
    content = content.replaceAll("replace(/\\[.*?\\]/g, ' ___________ ')", "replace(/\\[.*?\\]/g, ' &#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95; ')");
    changed = true;
  }
  if (content.includes("replace(/\\[.*?\\]/g, '__________________')")) {
    content = content.replaceAll("replace(/\\[.*?\\]/g, '__________________')", "replace(/\\[.*?\\]/g, '&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;')");
    changed = true;
  }
  if (content.includes("replace(/\\[.*?\\]/g, ' _______________________ ')")) {
    content = content.replaceAll("replace(/\\[.*?\\]/g, ' _______________________ ')", "replace(/\\[.*?\\]/g, ' &#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95; ')");
    changed = true;
  }

  // 4. Exam Tariff RegEx Failure
  const oldRegStr1 = "/\\(\\d+\\s*marks?\\)/i.test(text)";
  const newRegStr1 = "/\\(?\\b\\d+\\s*marks?\\b\\)?/i.test(text)";
  if (content.includes(oldRegStr1)) {
    content = content.replaceAll(oldRegStr1, newRegStr1);
    changed = true;
  }
  
  const oldRegStr2 = "text.match(/\\(\\s*(\\d+)\\s*marks?\\s*\\)/i) || text.match(/\\[\\s*(\\d+)\\s*marks?\\s*\\]/i)";
  const newRegStr2 = "text.match(/\\(?\\[?\\b(\\d+)\\s*marks?\\b\\]?\\)?/i)";
  if (content.includes(oldRegStr2)) {
    content = content.replaceAll(oldRegStr2, newRegStr2);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
