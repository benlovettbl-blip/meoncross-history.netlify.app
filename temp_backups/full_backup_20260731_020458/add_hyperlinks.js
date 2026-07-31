const fs = require('fs');
const path = require('path');

// 1. Update style.css
const cssPath = path.join(__dirname, 'great_war_v2', 'style.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

if (!cssContent.includes('scroll-behavior: smooth')) {
  cssContent = cssContent.replace('body {', 'html { scroll-behavior: smooth; }\nbody {');
}
if (!cssContent.includes('.scaffold-link')) {
  cssContent += `
.scaffold-link {
  color: #e67e22;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.2s;
  padding: 2px 6px;
  background: #fff3e0;
  border-radius: 4px;
}
.scaffold-link:hover {
  background: #e67e22;
  color: #fff;
}
@media print {
  .scaffold-link {
    color: #1a237e !important;
    background: transparent !important;
    padding: 0;
  }
}
`;
  fs.writeFileSync(cssPath, cssContent);
  console.log("Updated style.css");
}

function updateAppJs(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Add IDs to paragraphs
  content = content.replace(
    /lesson\.narrative\.forEach\(para => \{/,
    `let pCounter = 1;\n      lesson.narrative.forEach(para => {`
  );
  content = content.replace(
    /html \+= \`<p class="narrative-block">\$\{para\}<\/p>\`;/g,
    `html += \`<p class="narrative-block" id="para-\${pCounter}">\${para}</p>\`; pCounter++;`
  );

  // Add IDs to Extended paragraphs
  content = content.replace(
    /lesson\.extended\.paragraphs\.forEach\(para => \{/,
    `let extCounter = 1;\n        lesson.extended.paragraphs.forEach(para => {`
  );
  // It's tricky because the second replace might catch the extended paragraphs too if we use /g
  // Let's do it via regex replace with a function or just targeted replaces

  return content;
}

// Let's just do targeted string replaces for app.js and generate_worksheets.js
function targetedUpdate(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // NARRATIVE PARAGRAPHS
  content = content.replace(
    /lesson\.narrative\.forEach\(para => \{([\s\S]*?)html \+= \`<p class="narrative-block">\$\{para\}<\/p>\`;([\s\S]*?)\}\);/g,
    `let pCounter = 1;\n      lesson.narrative.forEach(para => {$1html += \`<p class="narrative-block" id="para-\${pCounter}">\${para}</p>\`; pCounter++;$2});`
  );

  // EXTENDED PARAGRAPHS
  content = content.replace(
    /lesson\.extended\.paragraphs\.forEach\(para => \{([\s\S]*?)html \+= \`<p class="narrative-block">\$\{para\}<\/p>\`;([\s\S]*?)\}\);/g,
    `let extCounter = 1;\n        lesson.extended.paragraphs.forEach(para => {$1html += \`<p class="narrative-block" id="ext-para-\${extCounter}">\${para}</p>\`; extCounter++;$2});`
  );

  // HYPERLINKS IN TASKS
  // Replace ${task.text.replace(...)}
  content = content.replace(
    /\$\{task\.text\.replace\(\/\^\(Q\\d\+: \|Task \\d\+: \|Question \\d\+\[a-z\]\?\: \|Enquiry Task: \)\/,\s*''\)\}/g,
    `\${task.text.replace(/^(Q\\d+: |Task \\d+: |Question \\d+[a-z]?: |Enquiry Task: )/, '').replace(/\\(P(\\d+)\\)/g, '<a href="#para-$1" class="scaffold-link">(P$1)</a>').replace(/\\(Ext P(\\d+)(-\\d+)?\\)/g, '<a href="#ext-para-$1" class="scaffold-link">(Ext P$1$2)</a>')}`
  );

  // HYPERLINKS IN EXTENDED QUESTIONS
  content = content.replace(
    /\$\{lesson\.extended\.question\}/g,
    `\${lesson.extended.question.replace(/\\(Ext P(\\d+)(-\\d+)?\\)/g, '<a href="#ext-para-$1" class="scaffold-link">(Ext P$1$2)</a>')}`
  );
  
  // HYPERLINKS IN DO NOW PREDICTION
  content = content.replace(
    /\$\{lesson\.do_now\.prediction_question\.replace\('Predict: ', ''\)\}/g,
    `\${lesson.do_now.prediction_question.replace('Predict: ', '').replace(/\\(P(\\d+)\\)/g, '<a href="#para-$1" class="scaffold-link">(P$1)</a>')}`
  );

  fs.writeFileSync(filePath, content);
  console.log("Updated " + path.basename(filePath));
}

targetedUpdate(path.join(__dirname, 'great_war_v2', 'app.js'));
targetedUpdate(path.join(__dirname, 'great_war_v2', 'generate_worksheets.js'));

