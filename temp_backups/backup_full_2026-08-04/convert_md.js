const fs = require('fs');

function convertMdToDataJs(mdPath, dataJsPath, unitTitle) {
  if (!fs.existsSync(mdPath)) {
    console.log("File not found:", mdPath);
    return;
  }
  const md = fs.readFileSync(mdPath, 'utf8');
  
  const lines = md.split('\n');
  const unitData = {
    title: unitTitle,
    lessons: []
  };

  let currentLesson = null;
  let currentArray = null; 
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith('## ')) {
      if (currentLesson) {
        unitData.lessons.push(currentLesson);
      }
      currentLesson = {
        id: 'lesson_' + (unitData.lessons.length + 1),
        title: line.replace('## ', ''),
        narrative: [],
        tasks: [],
        vocab: [],
        do_now: {
          type: "timeline",
          events: []
        }
      };
      currentArray = 'narrative';
    } else if (line.startsWith('### Fill-in-the-Blanks') || line.startsWith('### True or False') || line.startsWith('### Timeline')) {
      currentArray = null; 
    } else if (line.startsWith('### Vocabulary')) {
      currentArray = 'vocab';
    } else if (line.startsWith('### Retrieval Questions')) {
      currentArray = 'tasks';
    } else if (currentLesson && currentArray === 'narrative' && !line.startsWith('---') && !line.startsWith('id:') && !line.startsWith('title:') && !line.startsWith('year_group:') && !line.startsWith('unlocked_for:')) {
      currentLesson.narrative.push(line);
    } else if (currentLesson && currentArray === 'vocab' && line.startsWith('- **')) {
      const parts = line.replace('- **', '').split('**: ');
      if (parts.length >= 2) {
        currentLesson.vocab.push({
          term: parts[0],
          definition: parts.slice(1).join('**: ')
        });
      }
    } else if (currentLesson && currentArray === 'tasks' && line.startsWith('- **Question**: ')) {
      const q = line.replace('- **Question**: ', '');
      let a = '';
      if (i + 1 < lines.length && lines[i + 1].trim().startsWith('- **Answer**: ')) {
        a = lines[i + 1].trim().replace('- **Answer**: ', '');
      }
      currentLesson.tasks.push({
        type: 'written',
        text: q,
        model: a
      });
    }
  }

  if (currentLesson) {
    unitData.lessons.push(currentLesson);
  }

  fs.writeFileSync(dataJsPath, `export const unitData = ${JSON.stringify(unitData, null, 2)};`);
  console.log(`Converted ${mdPath} to ${dataJsPath}`);
}

convertMdToDataJs('./public/content/ks3/norman_conquest.md', './norman_conquest/data.js', 'The Norman Conquest (1066)');
convertMdToDataJs('./public/content/ks3/change_1450_1750.md', './change_1450_1750/data.js', 'Change from 1450-1750');
