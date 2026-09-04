import fs from 'fs';
import { unitData } from './units/edexcel_medicine/data.js';

let countFixedDuplicates = 0;
let countDowngraded = 0;

unitData.lessons.forEach((l) => {
  // 1. Remove duplicate 16-markers
  // Many duplicates happen because extended and exam_practice have the exact same question.
  let seenQuestions = new Set();

  let cleanExamPractice = [];
  if (l.exam_practice) {
    let epArray = Array.isArray(l.exam_practice)
      ? l.exam_practice
      : l.exam_practice.questions
        ? l.exam_practice.questions
        : l.exam_practice.question
          ? [l.exam_practice]
          : [];

    epArray.forEach((ep) => {
      let qText = ep.question || ep.text || ep;
      if (!seenQuestions.has(qText)) {
        seenQuestions.add(qText);
        cleanExamPractice.push(ep);
      } else {
        countFixedDuplicates++;
      }
    });

    if (Array.isArray(l.exam_practice)) {
      l.exam_practice = cleanExamPractice;
    } else if (l.exam_practice.questions) {
      l.exam_practice.questions = cleanExamPractice;
    } else if (cleanExamPractice.length === 1) {
      l.exam_practice = cleanExamPractice[0];
    } else if (cleanExamPractice.length === 0) {
      delete l.exam_practice;
    }
  }

  if (l.extended && l.extended.question) {
    if (seenQuestions.has(l.extended.question)) {
      countFixedDuplicates++;
      delete l.extended; // Delete duplicate extended
    } else {
      seenQuestions.add(l.extended.question);
    }
  }

  // 2. Downgrade 16-markers in early lessons (KT1.1 and KT1.2)
  if (l.id === 'lesson_1_1') {
    if (l.extended) {
      l.extended.question =
        'Explain one similarity between the medical ideas of Galen and Hippocrates. (4 marks)';
      l.extended.model =
        '<strong>Grade 9 Model Answer:</strong><br>One similarity is that both believed in the Theory of the Four Humours. Hippocrates first developed the idea that the body contained blood, phlegm, yellow bile, and black bile. Galen built directly upon this by adding the Theory of Opposites.';
      l.extended.starter = 'One similarity is...';
      countDowngraded++;
    }
  }
  if (l.id === 'lesson_1_2') {
    if (l.extended) {
      l.extended.question =
        'How useful are Sources A and B for an enquiry into medieval hospital care? (8 marks)';
      l.extended.model =
        '<strong>Grade 9 Model Answer:</strong><br>Source A is highly useful because it shows the religious nature of care, matching my contextual knowledge that most hospitals were run by monks and nuns who prioritized prayer over medical treatment.';
      l.extended.starter = 'Source A is useful for the enquiry because...';
      countDowngraded++;
    }
  }

  // 3. Add guided reading scaffolding
  if (!l.guided_reading) l.guided_reading = {};
  if (!l.guided_reading.questions || l.guided_reading.questions.length === 0) {
    let qs = [];
    if (l.narrative_blocks) {
      l.narrative_blocks.forEach((nb, i) => {
        let firstSentence = nb.text.split('.')[0].replace(/[*#]/g, '').trim();
        qs.push({
          question: `Read section ${i + 1}. According to the text, what is the significance of: "${firstSentence.substring(0, 50)}..."?`,
          answer: 'Refer to the narrative block.',
        });
      });
    }
    l.guided_reading.questions = qs;
  }
});

console.log(`Removed ${countFixedDuplicates} duplicated exam questions.`);
console.log(`Downgraded ${countDowngraded} early 16-mark essays.`);

let output = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
fs.writeFileSync('./units/edexcel_medicine/data.js', output, 'utf-8');
console.log('Saved data.js');
