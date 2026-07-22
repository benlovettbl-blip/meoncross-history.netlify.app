const fs = require('fs');
let content = fs.readFileSync('src/core_app.js', 'utf8');

// Replace the Q${task.qNum} logic with formatQuestion
content = content.replace(
  /const qPrefix = task\.qNum \? \`Q\$\{task\.qNum\}\. \` : "";\s*const ansId = \`ans-emb-\$\{index\}-\$\{tIdx\}\`;/g,
  `const ansId = \`ans-emb-\${index}-\${tIdx}\`;`
);

content = content.replace(
  /<strong>\$\{qPrefix\}\$\{task\.text\}<\/strong>/g,
  `<strong>\${formatQuestion(task.text, task.qNum)}</strong>`
);

fs.writeFileSync('src/core_app.js', content);
console.log("Fixed core_app.js narrative block task numbering formatting.");
