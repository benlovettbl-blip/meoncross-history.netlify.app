import fs from 'fs';
import path from 'path';

// Fix Early Modern World
const fixEarlyModern = async () => {
  const file = './units/early_modern_world/data.js';

  // We will parse it by removing everything up to the first `{` and from the last `}`
  let data = fs.readFileSync(file, 'utf8');
  const firstBrace = data.indexOf('{');
  const lastBrace = data.lastIndexOf('}');
  let jsonStr = data.substring(firstBrace, lastBrace + 1);

  let db;
  try {
    db = JSON.parse(jsonStr);
  } catch (e) {
    console.error('JSON parse failed', e.message);
    return;
  }

  // Fix Duplication: Lesson 6 learning objectives
  if (db.lessons[5]) {
    if (!db.lessons[5].teacher_notes) db.lessons[5].teacher_notes = {};
    db.lessons[5].teacher_notes.objectives = [
      {
        objective: 'Understand the major economic changes of the 17th century.',
        primer:
          'Explain how global trade and the establishment of new colonies created wealth for European powers.',
        question: 'How did colonial expansion lead to an economic shift in Europe?',
      },
      {
        objective: 'Analyze the impact of colonial wealth on social structures.',
        primer:
          'Discuss how the influx of new goods and wealth changed the everyday lives of people.',
        question:
          'What new goods were introduced through colonial trade, and how did they affect society?',
      },
    ];
  }

  // Upgrade Disciplinary Focus: Replace generic fallback with precise concept for all 9 lessons
  const focuses = [
    'Historical Enquiry - Analyzing the motivations behind early global exploration.',
    'Change and Continuity - Examining the impact of the printing press on society.',
    'Causation - Investigating the causes of the Reformation.',
    'Significance - Evaluating the impact of the Renaissance on art and science.',
    "Causation - Analyzing the reasons for the Spanish Armada's defeat.",
    'Change and Continuity - Tracing the economic shift towards global trade.',
    'Significance - Understanding the consequences of the English Civil War.',
    'Causation - Why did the Witch Craze spread across early modern Europe?',
    'Historical Enquiry - Evaluating the legacy of the Early Modern era.',
  ];

  db.lessons.forEach((lesson, i) => {
    lesson.disciplinary_focus = focuses[i] || 'Change and Continuity';
  });

  // Remove Student Text: Lesson 7
  if (db.lessons[6]) {
    if (db.lessons[6].formative_assessment) {
      let assessmentStr = JSON.stringify(db.lessons[6].formative_assessment);
      assessmentStr = assessmentStr.replace(
        /Write down your findings for Task A and B[^"]*/g,
        'Teacher led summary task.',
      );
      assessmentStr = assessmentStr.replace(/the the/g, 'the');
      db.lessons[6].formative_assessment = JSON.parse(assessmentStr);
    }

    if (db.lessons[6].narrative_blocks) {
      db.lessons[6].narrative_blocks.forEach((block) => {
        if (block.tasks) {
          block.tasks.forEach((task) => {
            if (task.question) {
              task.question = task.question.replace(
                /Write down your findings for Task A and B[^"]*/g,
                'Summarize the core findings.',
              );
              task.question = task.question.replace(/the the/g, 'the');
            }
            if (task.instruction) {
              task.instruction = task.instruction.replace(
                /Write down your findings for Task A and B[^"]*/g,
                'Summarize the core findings.',
              );
              task.instruction = task.instruction.replace(/the the/g, 'the');
            }
          });
        }
      });
    }
  }

  // Specify Core Tasks: Lessons 1, 2, 3, and 9
  const replacementTasks = {
    0: 'PEEL Paragraph (Enquiry): What was the primary motivation for early global explorers?',
    1: 'PEEL Paragraph (Change & Continuity): How did the printing press revolutionize the spread of ideas?',
    2: 'Formative Question (Causation): Identify three major causes of the Protestant Reformation.',
    8: 'PEEL Paragraph (Significance): What was the most significant change of the Early Modern era?',
  };

  [0, 1, 2, 8].forEach((idx) => {
    if (db.lessons[idx]) {
      if (!db.lessons[idx].formative_assessment) db.lessons[idx].formative_assessment = {};
      db.lessons[idx].formative_assessment.type = 'PEEL Paragraph';
      db.lessons[idx].formative_assessment.question = replacementTasks[idx];

      if (db.lessons[idx].narrative_blocks) {
        db.lessons[idx].narrative_blocks.forEach((block) => {
          if (block.tasks) {
            block.tasks.forEach((task) => {
              if (
                task.type === 'discussion' ||
                (task.question && task.question.includes('Narrative exploration'))
              ) {
                task.type = 'extended_writing';
                task.question = replacementTasks[idx];
              }
            });
          }
        });
      }
    }
  });

  if (data.includes('const early_modern_world =')) {
    fs.writeFileSync(
      file,
      'const early_modern_world = ' +
        JSON.stringify(db, null, 2) +
        ';\n\nexport const unitData = early_modern_world;\n',
    );
  } else {
    fs.writeFileSync(file, 'export const unitData = ' + JSON.stringify(db, null, 2) + ';\n');
  }
  console.log('Early Modern World updated');
};

fixEarlyModern();
