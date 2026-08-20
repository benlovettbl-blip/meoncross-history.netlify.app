import fs from 'fs';

async function validatePedagogy() {
  const m = await import('./medieval_england/data.js');
  const data = m.unitData;

  console.log("--- DO NOW VALIDATION ---");
  data.lessons.forEach((lesson, idx) => {
    console.log(`\nLesson ${idx + 1}: ${lesson.title}`);
    if (lesson.do_now) {
      if (lesson.do_now.tasks) {
        lesson.do_now.tasks.forEach(t => console.log(`  - ${t.question || t.text}`));
      } else {
        console.log(`  - Type: ${lesson.do_now.type}`);
      }
    } else {
       console.log("  - No Do Now found!");
    }
  });

  console.log("\n--- MODEL ANSWER VALIDATION ---");
  let missingModels = 0;
  let genericModels = 0;
  
  function checkTasks(obj, path) {
    if (Array.isArray(obj)) {
      obj.forEach((item, i) => checkTasks(item, `${path}[${i}]`));
    } else if (typeof obj === 'object' && obj !== null) {
      if (obj.type && !['image', 'written', 'video'].includes(obj.type)) {
         if (obj.type === 'sorting') return; // no model answer needed for sorting usually, wait, sorting has model_answer
         const ma = obj.model_answer;
         if (!ma) {
            console.log(`Missing model answer at ${path}: Type: ${obj.type}`);
            missingModels++;
         } else if (ma.toLowerCase().includes('lorem') || ma.toLowerCase().includes('todo') || ma.toLowerCase().includes('goes here')) {
            console.log(`Generic model answer at ${path}: ${ma}`);
            genericModels++;
         }
      }
      for (const key in obj) {
         if (key === 'tasks' || key === 'do_now') {
            checkTasks(obj[key], `${path}.${key}`);
         } else if (Array.isArray(obj[key]) && key === 'narrative_blocks') {
            checkTasks(obj[key], `${path}.${key}`);
         }
      }
    }
  }
  
  data.lessons.forEach((l, i) => checkTasks(l, `Lesson ${i+1}`));
  console.log(`\nFound ${missingModels} missing model answers and ${genericModels} generic ones.`);
}

validatePedagogy().catch(console.error);
