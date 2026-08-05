const fs = require('fs');

const dataStr = fs.readFileSync('great_war_part2/data.js', 'utf8');
const jsonStartIndex = dataStr.indexOf('{');
const preText = dataStr.substring(0, jsonStartIndex);
const data = JSON.parse(dataStr.substring(jsonStartIndex));

data.lessons.forEach(l => {
  if (!l.narrative_blocks) return;

  // 1. Rename "Source Pit Stop"
  l.narrative_blocks.forEach(b => {
    if (b.title && b.title.includes('Source Pit Stop')) {
      b.title = b.title.replace('Source Pit Stop', 'Source Spotlight');
    }
  });

  // 2. Gather all tasks
  let allTasks = [];
  l.narrative_blocks.forEach(b => {
    if (b.tasks) {
      allTasks = allTasks.concat(b.tasks);
      b.tasks = []; // Clear for redistribution
    }
  });

  if (allTasks.length === 0) return;

  // 3. Clean up and rename
  allTasks.forEach(t => {
    if (t.text) {
      // Remove Edexcel and GCSE
      t.text = t.text.replace(/Edexcel/gi, '').replace(/GCSE/gi, '').replace(/\s+/g, ' ');
      t.text = t.text.replace(/ 'Features' Question/gi, ' Key Features Question');
      t.text = t.text.replace(/ Features Practice/gi, ' Key Features');
      t.text = t.text.replace(/ Source Practice/gi, ' Source Evaluation');
      
      // Fix spacing issues created by removal
      t.text = t.text.replace(/<strong>\s+/g, '<strong>');
      t.text = t.text.replace(/\s+<\/strong>/g, '</strong>');

      // Strip existing "Part X:" or "Part X2:"
      t.text = t.text.replace(/<strong>Part [A-Z0-9]+:\s*/g, '<strong>');
    }
  });

  // 4. Distribute
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const numBlocks = l.narrative_blocks.length;
  
  allTasks.forEach((t, i) => {
     let blockTarget = i;
     if (blockTarget >= numBlocks) {
         blockTarget = numBlocks - 1;
     }
     
     let letter = letters[i] || 'X';
     
     if (t.text) {
        if (t.text.includes('<strong>')) {
            t.text = t.text.replace('<strong>', `<strong>Part ${letter}: `);
        } else {
            t.text = `<strong>Part ${letter}: Task</strong><br>` + t.text;
        }
     }
     
     if (!l.narrative_blocks[blockTarget].tasks) {
       l.narrative_blocks[blockTarget].tasks = [];
     }
     l.narrative_blocks[blockTarget].tasks.push(t);
  });
});

fs.writeFileSync('great_war_part2/data.js', preText + JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully refactored tasks in data.js!');
