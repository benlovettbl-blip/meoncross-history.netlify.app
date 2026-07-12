import fs from 'fs';

let content = fs.readFileSync('src/lessons.js', 'utf8');

// The block we want to remove
const blockRegex = /[ \t]*const warMap = \{[\s\S]*?if \(warId\) \{[\s\S]*?if \(bodyStartIdx !== -1 && bodyEndIdx !== -1\) \{[\s\S]*?html \+= '\\n' \+ warBodyContent;[\s\S]*?\}[\s\S]*?\}[\s\S]*?\}/;

const warMapMatch = content.match(blockRegex);

if (warMapMatch) {
  // Remove it from its current location
  content = content.replace(blockRegex, '');
  
  // Clean up the match to ensure correct indentation
  let blockString = warMapMatch[0];
  // Convert 4-space indent to 2-space indent
  blockString = blockString.split('\\n').map(line => line.replace(/^  /, '')).join('\\n');

  // Insert it before `  html += \`\n</body>`
  const target = '  html += `\\n</body>'; // Wait, let's just find `  return html;\n}` of generateWorkbookHtml
  
  const endOfFunc = /  html \+= `\r?\n<\/body>\r?\n<\/html>\r?\n  `;\r?\n  return html;\r?\n}/;
  
  content = content.replace(endOfFunc, (match) => {
    return blockString + '\\n\\n' + match;
  });
  
  fs.writeFileSync('src/lessons.js', content);
  console.log("Successfully moved warMap!");
} else {
  console.log("warMap block not found!");
}
