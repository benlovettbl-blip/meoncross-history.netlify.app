const fs = require('fs');
const files = [
  'edexcel_medicine/data.js',
  'great_war/data.js',
  'weimar_nazi/data.js',
  'cold_war/data.js'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    const data = fs.readFileSync(file, 'utf8');
    console.log(`\n--- File: ${file} ---`);
    let regex = /"text":\s*"[^"]*12 marks[^"]*",(?:[^}]*?)"model":\s*"([^"]+)"/g;
    let match;
    while ((match = regex.exec(data)) !== null) {
      const modelAns = match[1];
      const pCount = modelAns.split(/<br\s*\/?>|<p>|\\n/).filter(p => p.length > 20).length;
      console.log(`Found 12 mark question. Paragraphs detected: ${pCount}`);
      if (pCount < 3) {
        console.log(`[NEEDS FIX] Starts with: ${modelAns.substring(0, 80)}...`);
      }
    }
  }
});
