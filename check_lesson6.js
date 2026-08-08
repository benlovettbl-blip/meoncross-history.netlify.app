const fs = require('fs');

async function checkLesson6() {
  const m = await import('./early_modern_world/data.js');
  const data = m.unitData;
  const lesson6 = data.lessons.find(l => l.title.includes('1750'));
  
  if (lesson6) {
    console.log("TITLE:", lesson6.title);
    console.log("KEYS:", Object.keys(lesson6));
    console.log("BANNER:", lesson6.banner_image || lesson6.banner || lesson6.cover_image);
    
    if (lesson6.narrative_blocks) {
      lesson6.narrative_blocks.forEach((block, idx) => {
        console.log(`\n--- Block ${idx}: ${block.title} ---`);
        if (block.images) {
          block.images.forEach((img, i) => {
            console.log(`Image ${i}: ${img.image} (Alt: ${img.image_alt})`);
          });
        }
        if (block.tasks) {
          block.tasks.forEach((task, i) => {
             console.log(`Task ${i}: [${task.type}] ${task.question || task.text}`);
          });
        }
      });
    }

    if (lesson6.side_quests) {
        console.log("\nSIDE QUESTS:");
        lesson6.side_quests.forEach((sq, i) => console.log(sq.title));
    }
    
    if (lesson6.lesson_reflection) {
        console.log("\nLESSON REFLECTION:");
        console.log(lesson6.lesson_reflection.question || lesson6.lesson_reflection.text);
    }
  } else {
    console.log("Lesson 6 not found.");
  }
}

checkLesson6().catch(console.error);
