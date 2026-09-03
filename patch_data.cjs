const fs = require('fs');
const path = require('path');

const fixWater = () => {
  const file = './units/water_and_sanitation/data.js';
  let data = fs.readFileSync(file, 'utf8');

  let jsonStr = data.replace('export const unitData = ', '');
  if (jsonStr.trim().endsWith(';')) jsonStr = jsonStr.trim().slice(0, -1);

  const db = JSON.parse(jsonStr);

  const waterAssessments = [
    'PEEL Paragraph (Change & Continuity): How much progress did the Romans make in public health?',
    'PEEL Paragraph (Causation): Why did public health decline during the Middle Ages?',
    'PEEL Paragraph (Significance): To what extent did towns become filthier during the Early Modern period?',
    'PEEL Paragraph (Causation): How did the Industrial Revolution lead to a public health crisis?',
    'PEEL Paragraph (Significance): Evaluate the impact of Joseph Bazalgette’s sewer system on London.',
    'PEEL Paragraph (Significance): How did the Liberal Reforms (1906-1914) improve public health?',
  ];

  for (let i = 0; i < 6; i++) {
    if (db.lessons[i]) {
      if (!db.lessons[i].formative_assessment) db.lessons[i].formative_assessment = {};
      db.lessons[i].formative_assessment.question = waterAssessments[i];
      db.lessons[i].formative_assessment.type = 'PEEL Paragraph';
    }
  }

  fs.writeFileSync(file, 'export const unitData = ' + JSON.stringify(db, null, 2) + ';\n');
  console.log('Water and Sanitation updated');
};

fixWater();
