const fs = require('fs');
let content = fs.readFileSync('src/engine/lesson_renderer.js', 'utf8');

const target = "      parsed = parsed.replace(/\\n/g, '<br>');";
const replacement = `      if (!parsed.trim().startsWith('<table') && !parsed.trim().startsWith('<div')) {
        parsed = parsed.replace(/\\n/g, '<br>');
      }`;

content = content.replace(target, replacement);

fs.writeFileSync('src/engine/lesson_renderer.js', content);
