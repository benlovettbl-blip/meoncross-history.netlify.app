const fs = require('fs');

function checkUnit(unitPath) {
  let content = fs.readFileSync(unitPath, 'utf8');
  const jsonStr = content.replace('export const unitData = ', '').replace(/;\s*$/, '');
  let data = JSON.parse(jsonStr);

  console.log(`\n=== UNIT: ${data.id} ===`);

  data.lessons.forEach((lesson, i) => {
    let q = 1;
    let questions = [];

    if (lesson.primary_source && lesson.primary_source.question) {
      questions.push(`Q${q++}. [HOOK] ${lesson.primary_source.question}`);
    }

    if (lesson.do_now) {
      if (lesson.do_now.type === "timeline" && lesson.do_now.prediction_question) {
        questions.push(`Q${q++}. [DONOW-TIMELINE] ${lesson.do_now.prediction_question}`);
      } else if (lesson.do_now.type === "questions" && lesson.do_now.items) {
        lesson.do_now.items.forEach(item => {
          questions.push(`Q${q++}. [DONOW-ITEM] ${item.question}`);
        });
      }
    }

    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach(block => {
        if (block.tasks) {
          block.tasks.forEach(task => {
            questions.push(`Q${q++}. [NARRATIVE-TASK] ${task.text}`);
          });
        }
      });
    }

    if (lesson.sources) {
      lesson.sources.forEach(source => {
        if (source.question) {
          questions.push(`Q${q++}. [SOURCE-Q] ${source.question}`);
        }
      });
    }

    if (lesson.tasks) {
      lesson.tasks.forEach(task => {
        questions.push(`Q${q++}. [APPLICATION-TASK] ${task.text}`);
      });
    }

    if (lesson.historians_corner && lesson.historians_corner.stretch_question) {
      questions.push(`Q${q++}. [HISTORIAN-STRETCH] ${lesson.historians_corner.stretch_question}`);
    }

    if (lesson.extended && lesson.extended.question) {
      questions.push(`Q${q++}. [EXTENDED] ${lesson.extended.question}`);
    }

    console.log(`\nLesson ${i + 1}: ${lesson.title}`);
    questions.forEach(qStr => console.log('  ' + qStr));
  });
}

checkUnit('water_and_sanitation/data.js');
checkUnit('public/units/great_war/data.js');
