const fs = require('fs');
['water_and_sanitation', 'great_war'].forEach(dir => {
  const p = dir + '/generate_worksheets.js';
  if (!fs.existsSync(p)) return;
  let code = fs.readFileSync(p, 'utf8');

  // Strip prefixes from written tasks
  code = code.replace(/\$\{task\.text\}/g, "${task.text.replace(/^(Q\\d+: |Task \\d+: |Question \\d+[a-z]?: |Enquiry Task: |Q\\d+\\.\\s*)/i, '').replace(/\\s*\\((P|Para\\s*)\\d+\\)/gi, '').replace(/\\s*\\(Ext P\\d+(-\\d+)?\\)/gi, '')}");
  
  fs.writeFileSync(p, code);
});
console.log('Fixed double labeling!');
