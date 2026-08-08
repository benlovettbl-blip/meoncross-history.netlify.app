const fs = require('fs');
const txt = fs.readFileSync('early_modern_world/data.js', 'utf8').split('\n');
const jsonStr = txt.join('\n').substring(txt.join('\n').indexOf('{'), txt.join('\n').lastIndexOf('}')+1);
const data = eval('(' + jsonStr + ')');
const l3 = data.lessons[3];

l3.narrative_blocks.forEach(b => {
  if (b.title === 'Macro-History: The Financial Hub') {
    b.source_letter = 'A';
  }
  if (b.title === 'Investigating Power: The King vs. The Merchants') {
    b.text = b.text.replace('Source D:', 'Source B:').replace('Source E:', 'Source C:').replace('Source F:', 'Source D:');
    b.tasks.forEach(t => {
      t.question = t.question.replace('Source D', 'Source B').replace('Source E', 'Source C').replace('Source F', 'Source D');
      t.model_answer = t.model_answer.replace(/Source D/g, 'Source B').replace(/Source E/g, 'Source C').replace(/Source F/g, 'Source D');
    });
    b.source_letter = 'B';
  }
  if (b.title === 'Visual Analysis: The Great Seal of the Commonwealth (1651)') {
    b.source_letter = 'E';
  }
  if (b.title === 'Historiographical Debate: Who won the English Civil War?') {
    b.text = b.text.replace('Source H:', 'Source F:');
    b.tasks.forEach(t => {
      t.question = t.question.replace('Source H', 'Source F');
      t.model_answer = t.model_answer.replace(/Source H/g, 'Source F');
    });
    b.source_letter = 'F';
  }
  if (b.title === 'Side Quest: The Diggers and the Dream of Equality') {
    b.text = b.text.replace('Source G:', 'Source G:'); // Remains G
    b.tasks.forEach(t => {
      t.question = t.question.replace('Study I.', 'Study Source G.');
      t.model_answer = t.model_answer.replace(/Source I/g, 'Source G');
    });
    b.source_letter = 'G';
  }
});

fs.writeFileSync('l3_fixed.json', JSON.stringify(l3, null, 2));
console.log('Fixed l3 successfully!');
