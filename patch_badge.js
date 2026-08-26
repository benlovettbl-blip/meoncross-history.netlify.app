const fs = require('fs');

function patchBadge(filename) {
    if (!fs.existsSync(filename)) return;
    let content = fs.readFileSync(filename, 'utf8');
    
    let target = `  const badgeSource = (title, overrideLetter = null) => {
    if (overrideLetter) title = title.replace(/(Source )\\s*[A-Z]/i, \`$1\${overrideLetter}\`);
    if (!title) return '';
    return title.replace(/(Source [A-Z])/i, '<span style="background-color: #1e40af; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 0.9em; letter-spacing: 0.5px; display: inline-block; margin-bottom: 4px;">$1</span>');
  };`;
  
    let replacement = `  const badgeSource = (title, overrideLetter = null) => {
    if (!title) return '';
    if (overrideLetter) {
      if (/(Source )\\s*[A-Z]/i.test(title)) {
          title = title.replace(/(Source )\\s*[A-Z]/i, \`$1\${overrideLetter}\`);
      } else if (/(Source)(?!s)/i.test(title)) {
          title = title.replace(/(Source)/i, \`$1 \${overrideLetter}\`);
      } else {
          title = \`Source \${overrideLetter}: \` + title;
      }
    }
    return title.replace(/(Source [A-Z])/i, '<span style="background-color: #1e40af; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 0.9em; letter-spacing: 0.5px; display: inline-block; margin-bottom: 4px;">$1</span>');
  };`;
    
    if (content.includes(target)) {
        content = content.replace(target, replacement);
        fs.writeFileSync(filename, content);
        console.log("Patched badgeSource in " + filename);
    } else {
        console.log("Could not find badgeSource target in " + filename);
    }
}

patchBadge('generate_textbooks.js');
patchBadge('generate_workbooks.js');
patchBadge('generate_pupil_workbooks.js');
