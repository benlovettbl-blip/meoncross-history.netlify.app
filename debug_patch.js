const fs = require('fs');

async function debugPatch() {
  const m = await import('./early_modern_world/data.js');
  const data = m.unitData;

  data.lessons.forEach((lesson, i) => {
    if (lesson.text && lesson.text.includes('Frankopan')) {
      console.log(`Found Frankopan in lesson ${i}:`, lesson.title);
      console.log(lesson.text.substring(lesson.text.indexOf('Frankopan') - 20, lesson.text.indexOf('Frankopan') + 40));
    }
  });
}

debugPatch().catch(console.error);
