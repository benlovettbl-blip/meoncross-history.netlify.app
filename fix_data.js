const fs = require('fs');
let c = fs.readFileSync('early_modern_world/data.js', 'utf8');
c = c.replace('export default early_modern_world;', '');
let obj = eval(c + '\n early_modern_world;');

// 1. HARDCODE L6 DO NOW
obj.lessons[5].do_now = {
  title: "Do Now: Previous Knowledge",
  type: "questions",
  items: [
    {
      "question": "What political belief held that kings were chosen directly by God and possessed absolute power?",
      "answer": "The Divine Right of Kings"
    },
    {
      "question": "What was the name of the illegal tax on coastal (and later inland) towns revived by Charles I during his Eleven Years' Tyranny?",
      "answer": "Ship Money"
    },
    {
      "question": "What was the name of Parliament's disciplined, professional military force created during the Civil War?",
      "answer": "The New Model Army"
    },
    {
      "question": "Who served as the commander of the New Model Army and later became 'Lord Protector' of England?",
      "answer": "Oliver Cromwell"
    },
    {
      "question": "On what date was King Charles I executed outside the Banqueting House in London?",
      "answer": "27 January 1649"
    }
  ]
};

// 3. FIX ORPHANED QUESTIONS
// For Lesson 5 (Index 4), move the task containing "Study Source A" from narrative_blocks to sources
let l5 = obj.lessons[4];
if (!l5.sources) l5.sources = [];
l5.narrative_blocks.forEach(b => {
  if (b.tasks) {
    let taskIdx = b.tasks.findIndex(t => t.question && t.question.includes('Study Source A. Why did the monarch combine'));
    if (taskIdx > -1) {
      let task = b.tasks.splice(taskIdx, 1)[0];
      l5.sources.push(task);
    }
  }
});

// For Lesson 6 (Index 5), move the task containing "Study Source E" from narrative_blocks to sources
let l6 = obj.lessons[5];
if (!l6.sources) l6.sources = [];
l6.narrative_blocks.forEach(b => {
  if (b.tasks) {
    let taskIdx = b.tasks.findIndex(t => t.question && t.question.includes('Study Source E (The Great Seal'));
    if (taskIdx > -1) {
      let task = b.tasks.splice(taskIdx, 1)[0];
      l6.sources.push(task);
    }
    
    // Check for Source B or others that might be similar
    let taskIdx2 = b.tasks.findIndex(t => t.text && t.text.includes('Look at Source B. What did the design'));
    if (taskIdx2 > -1) {
      let task2 = b.tasks.splice(taskIdx2, 1)[0];
      // Map text to question for sources processing
      if(task2.text && !task2.question) {
         task2.question = task2.text;
         delete task2.text;
      }
      l6.sources.push(task2);
    }
  }
});

let finalJson = JSON.stringify(obj, null, 2);

// 2. MANUALLY DELETE TARIFFS
finalJson = finalJson.replace(/\s*\[\d+\s*marks?\s*\d*\s*mins?\]/g, '');

let newC = 'const early_modern_world = ' + finalJson + ';\nexport default early_modern_world;\n';
fs.writeFileSync('early_modern_world/data.js', newC);
console.log('Fixed early_modern_world/data.js successfully');
