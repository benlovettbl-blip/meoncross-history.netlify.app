const fs = require('fs');
const files = [
  'generate_workbooks.js',
  'generate_textbooks.js',
  'generate_pupil_workbooks.js',
  'generate_cheat_sheets.js',
  'generate_quiz_packs.js'
];
files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    
    // Replace block.source.src
    content = content.replace(/block\.source\.src/g, '(block.source.src || block.source.source)');
    
    // Replace source.src but ONLY when preceded by whitespace or symbols (not a dot or word character)
    content = content.replace(/(?<![\w\.])source\.src/g, '(source.src || source.source)');
    
    // Replace lesson.primary_source.src
    content = content.replace(/lesson\.primary_source\.src/g, '(lesson.primary_source.src || lesson.primary_source.source)');
    
    fs.writeFileSync(f, content);
    console.log(`Patched ${f}`);
  }
});
