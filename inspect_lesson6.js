const fs = require('fs');

async function inspectLesson6() {
  const m = await import('./early_modern_world/data.js');
  const data = m.unitData;
  const lesson6 = data.lessons.find(l => l.title.includes('1750'));
  
  if (lesson6) {
    console.log(JSON.stringify(lesson6.narrative_blocks.slice(5), null, 2));
    console.log("TASKS: ", JSON.stringify(lesson6.tasks, null, 2));
    console.log("SIDE QUEST: ", JSON.stringify(lesson6.side_quests, null, 2));
    console.log("LESSON REFLECTION: ", JSON.stringify(lesson6.lesson_reflection, null, 2));
  }
}

inspectLesson6().catch(console.error);
