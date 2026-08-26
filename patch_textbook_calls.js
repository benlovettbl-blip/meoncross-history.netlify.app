const fs = require('fs');

function patchTextbook(filename) {
    if (!fs.existsSync(filename)) return;
    let content = fs.readFileSync(filename, 'utf8');
    
    // Replace badgeSource definition
    let target = \const badgeSource = (title) => {
    if (!title) return '';
    return title.replace(/(Source [A-Z])/i, '<span style="background-color: #1e40af; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 0.9em; letter-spacing: 0.5px; display: inline-block; margin-bottom: 4px;">\\</span>');
  };\;
  
    let replacement = \const badgeSource = (title, overrideLetter = null) => {
    if (!title) return '';
    if (overrideLetter) {
      if (/(Source )\\\\s*[A-Z]/i.test(title)) {
          title = title.replace(/(Source )\\\\s*[A-Z]/i, '\\' + overrideLetter);
      } else if (/(Source)(?!s)/i.test(title)) {
          title = title.replace(/(Source)/i, '\\ ' + overrideLetter + ':');
      } else {
          title = 'Source ' + overrideLetter + ': ' + title;
      }
    }
    return title.replace(/(Source [A-Z])/i, '<span style="background-color: #1e40af; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 0.9em; letter-spacing: 0.5px; display: inline-block; margin-bottom: 4px;">\\</span>');
  };\;
  
    content = content.replace(target, replacement);
    
    // Replace calls to badgeSource
    content = content.replace(/badgeSource\\(lesson\\.primary_source\\.title\\)/g, 'badgeSource(lesson.primary_source.title, String.fromCharCode(sourceCharCode++))');
    content = content.replace(/badgeSource\\(source\\.title\\)/g, 'badgeSource(source.title, String.fromCharCode(sourceCharCode++))');
    content = content.replace(/badgeSource\\(block\\.source\\.title\\)/g, 'badgeSource(block.source.title, String.fromCharCode(sourceCharCode++))');
    content = content.replace(/badgeSource \\? badgeSource\\(block\\.source\\.title\\) : block\\.source\\.title/g, 'badgeSource ? badgeSource(block.source.title, String.fromCharCode(sourceCharCode++)) : block.source.title');
    
    fs.writeFileSync(filename, content);
    console.log("Patched badgeSource calls in " + filename);
}

patchTextbook('generate_textbooks.js');
