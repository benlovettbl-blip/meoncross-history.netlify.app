const fs = require('fs');

const files = [
  'industrialisation_and_empire/data.js',
  'great_war_part2/data.js'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace "IDEA framework" with an abbr tag
    content = content.replace(/IDEA framework/g, "<abbr title=\\\"I - Identify (make your point)\\nD - Describe (give historical evidence/detail)\\nE - Explain (how the evidence supports the point)\\nA - Analyse (link back to the question and evaluate significance)\\\" style=\\\"text-decoration: underline dotted; cursor: help;\\\">IDEA framework</abbr>");
    
    // Also handle "IDEA" if it is in quotes for the Great War unit
    content = content.replace(/\\"IDEA\\" Paragraph Scaffold/g, "<abbr title=\\\"I - Identify (make your point)\\nD - Describe (give historical evidence/detail)\\nE - Explain (how the evidence supports the point)\\nA - Analyse (link back to the question and evaluate significance)\\\" style=\\\"text-decoration: underline dotted; cursor: help;\\\">IDEA</abbr> Paragraph Scaffold");
    
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
