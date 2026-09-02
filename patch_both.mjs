import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const fixUnits = async () => {
  // 1. Water and Sanitation
  const waterFile = path.resolve('./units/water_and_sanitation/data.js');
  try {
    const waterModule = await import(pathToFileURL(waterFile).href);
    const waterDb = waterModule.default || waterModule.unitData;

    const waterAssessments = [
      'PEEL Paragraph (Change & Continuity): How much progress did the Romans make in public health?',
      'PEEL Paragraph (Causation): Why did public health decline during the Middle Ages?',
      'PEEL Paragraph (Significance): To what extent did towns become filthier during the Early Modern period?',
      'PEEL Paragraph (Causation): How did the Industrial Revolution lead to a public health crisis?',
      'PEEL Paragraph (Significance): Evaluate the impact of Joseph Bazalgette’s sewer system on London.',
      'PEEL Paragraph (Significance): How did the Liberal Reforms (1906-1914) improve public health?',
    ];

    for (let i = 0; i < 6; i++) {
      if (waterDb.lessons[i]) {
        if (!waterDb.lessons[i].formative_assessment) waterDb.lessons[i].formative_assessment = {};
        waterDb.lessons[i].formative_assessment.question = waterAssessments[i];
        waterDb.lessons[i].formative_assessment.type = 'PEEL Paragraph';
      }
    }

    const waterContent = fs.readFileSync(waterFile, 'utf8');
    if (waterContent.includes('export const unitData =')) {
      fs.writeFileSync(
        waterFile,
        'export const unitData = ' + JSON.stringify(waterDb, null, 2) + ';\n',
      );
    } else {
      fs.writeFileSync(waterFile, 'export default ' + JSON.stringify(waterDb, null, 2) + ';\n');
    }
    console.log('Water and Sanitation updated');
  } catch (e) {
    console.error('Water failed:', e);
  }

  // 2. Early Modern World
  const earlyFile = path.resolve('./units/early_modern_world/data.js');
  try {
    const earlyModule = await import(pathToFileURL(earlyFile).href);
    const earlyDb = earlyModule.default || earlyModule.unitData;

    // Fix Duplication: Lesson 6 learning objectives
    if (earlyDb.lessons[5]) {
      if (!earlyDb.lessons[5].teacher_notes) earlyDb.lessons[5].teacher_notes = {};
      earlyDb.lessons[5].teacher_notes.objectives = [
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

    earlyDb.lessons.forEach((lesson, i) => {
      lesson.disciplinary_focus = focuses[i] || 'Change and Continuity';
    });

    if (earlyDb.lessons[6]) {
      if (earlyDb.lessons[6].formative_assessment) {
        let assessmentStr = JSON.stringify(earlyDb.lessons[6].formative_assessment);
        assessmentStr = assessmentStr.replace(
          /Write down your findings for Task A and B[^"]*/g,
          'Teacher led summary task.',
        );
        assessmentStr = assessmentStr.replace(/the the/g, 'the');
        earlyDb.lessons[6].formative_assessment = JSON.parse(assessmentStr);
      }

      if (earlyDb.lessons[6].narrative_blocks) {
        earlyDb.lessons[6].narrative_blocks.forEach((block) => {
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

    const replacementTasks = {
      0: 'PEEL Paragraph (Enquiry): What was the primary motivation for early global explorers?',
      1: 'PEEL Paragraph (Change & Continuity): How did the printing press revolutionize the spread of ideas?',
      2: 'Formative Question (Causation): Identify three major causes of the Protestant Reformation.',
      8: 'PEEL Paragraph (Significance): What was the most significant change of the Early Modern era?',
    };

    [0, 1, 2, 8].forEach((idx) => {
      if (earlyDb.lessons[idx]) {
        if (!earlyDb.lessons[idx].formative_assessment)
          earlyDb.lessons[idx].formative_assessment = {};
        earlyDb.lessons[idx].formative_assessment.type = 'PEEL Paragraph';
        earlyDb.lessons[idx].formative_assessment.question = replacementTasks[idx];

        if (earlyDb.lessons[idx].narrative_blocks) {
          earlyDb.lessons[idx].narrative_blocks.forEach((block) => {
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

    const earlyContent = fs.readFileSync(earlyFile, 'utf8');
    if (earlyContent.includes('const early_modern_world =')) {
      fs.writeFileSync(
        earlyFile,
        'const early_modern_world = ' +
          JSON.stringify(earlyDb, null, 2) +
          ';\n\nexport const unitData = early_modern_world;\n',
      );
    } else if (earlyContent.includes('export default')) {
      fs.writeFileSync(earlyFile, 'export default ' + JSON.stringify(earlyDb, null, 2) + ';\n');
    } else {
      fs.writeFileSync(
        earlyFile,
        'export const unitData = ' + JSON.stringify(earlyDb, null, 2) + ';\n',
      );
    }
    console.log('Early Modern World updated');
  } catch (e) {
    console.error('Early Modern failed:', e);
  }
};

fixUnits();
