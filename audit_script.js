const fs = require('fs');
const path = require('path');
const unitsDir = 'c:/Projects/meoncross-history.netlify.app/public/units';
const units = fs.readdirSync(unitsDir).filter(f => fs.statSync(path.join(unitsDir, f)).isDirectory());

let issuesFound = 0;

for (const unit of units) {
  const dataPath = path.join(unitsDir, unit, 'data.js');
  if (fs.existsSync(dataPath)) {
    const content = fs.readFileSync(dataPath, 'utf-8');
    
    // We can extract the JSON object directly by finding the first { and the last };
    const startIndex = content.indexOf('{');
    const endIndex = content.lastIndexOf('}');
    
    if (startIndex !== -1 && endIndex !== -1) {
      try {
        const jsonStr = content.substring(startIndex, endIndex + 1);
        const data = eval('(' + jsonStr + ')');
        
        data.lessons.forEach((l, lIdx) => {
          if(l.narrative_blocks || l.sections) {
            const blocks = l.narrative_blocks || l.sections;
            blocks.forEach((s, sIdx) => {
               // Check for empty narrative text but it has tasks
               if ((!s.text || s.text.trim() === '') && s.tasks && s.tasks.length > 0) {
                   console.log(`Unit: ${unit}, L${lIdx+1}: Block ${sIdx+1} has tasks but NO narrative text (causes blank blue box).`);
                   issuesFound++;
               }
               
               if(s.tasks) {
                 s.tasks.forEach((t, tIdx) => {
                    if((t.type === 'extended_writing' || t.type === 'short_answer') && !t.model_answer && !t.model && !t.a) {
                       console.log(`Unit: ${unit}, L${lIdx+1}: Task ${tIdx+1} is missing a model answer (causes blank white box).`);
                       issuesFound++;
                    }
                 });
               }
            });
          }
        });
      } catch (e) {
        console.error(`Could not parse ${unit}: ${e.message}`);
      }
    }
  }
}

if (issuesFound === 0) {
    console.log("No recurring issues found in any other lessons.");
} else {
    console.log(`Found ${issuesFound} issues.`);
}
