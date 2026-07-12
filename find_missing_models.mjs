import fs from 'fs';

const dataPath = 'c:/Projects/meoncross-history.netlify.app/cme_new/data.js';
let content = fs.readFileSync(dataPath, 'utf8');

// Strip the export part to parse JSON
let jsonStr = content.replace('export const unitData = ', '');
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);

const unitData = JSON.parse(jsonStr);

unitData.lessons.forEach(lesson => {
  let q = 1;
  const missing = [];
  if (lesson.primary_source && lesson.primary_source.question) {
    if (!lesson.primary_source.model && !lesson.primary_source.model_answer) {
      missing.push(`Q${q} (primary_source) in ${lesson.id}`);
    }
    q++;
  }
  if (lesson.do_now) {
    if (lesson.do_now.type === "timeline" && lesson.do_now.prediction_question) {
      if (!lesson.do_now.model && !lesson.do_now.answer) missing.push(`Q${q} (do_now timeline) in ${lesson.id}`);
      q++;
    }
    else if (lesson.do_now.type === "questions") {
      lesson.do_now.items.forEach(item => {
        if (!item.model && !item.answer) missing.push(`Q${q} (do_now item) in ${lesson.id}`);
        q++;
      });
    }
  }
  if (lesson.narrative_blocks) {
    lesson.narrative_blocks.forEach(block => {
      if (block.tasks) {
        block.tasks.forEach(task => {
          if (!task.model) missing.push(`Q${q} (narrative task) in ${lesson.id}`);
          q++;
        });
      }
    });
  }
  if (lesson.tasks) {
    lesson.tasks.forEach(task => {
      if (!task.model) missing.push(`Q${q} (task) in ${lesson.id}`);
      q++;
    });
  }
  if (lesson.extended && lesson.extended.question) {
    if (!lesson.extended.model) missing.push(`Q${q} (extended) in ${lesson.id}`);
    q++;
  }
  if (missing.length > 0) {
    console.log(`Lesson ${lesson.id} missing models:`, missing);
  }
});
