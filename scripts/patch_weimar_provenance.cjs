/**
 * patch_weimar_provenance.cjs
 *
 * Injects official Pearson Edexcel GCSE Paper 3 past paper provenance into:
 *  - units/weimar_nazi_germany/data.js
 *  - public/units/weimar_nazi_germany/data.js
 */

const fs = require('fs');
const path = require('path');

const PROVENANCE_MAP = {
  lesson_1_1: {
    overall: '★ High-Yield Forecast (Q1 Inference)',
    questions: ['★ High-Yield Forecast (Q1 Inference)'],
  },
  lesson_1_2: {
    overall: 'Edexcel November 2021 (Q2 Causation)',
    questions: ['Edexcel November 2021 (Q2 Causation)'],
  },
  lesson_1_3: {
    overall: 'Edexcel November 2020 (Q2) / June 2026 Specimen (Q3a)',
    questions: ['Edexcel November 2020 (Q2) / June 2026 Specimen (Q3a)'],
  },
  lesson_1_4: {
    overall: 'Edexcel June 2019 (Q3b-d Interpretations)',
    questions: [
      'Edexcel June 2019 (Q3b Interpretation Difference)',
      'Edexcel June 2019 (Q3c Interpretation Why)',
      'Edexcel June 2019 (Q3d Interpretation Evaluation)',
    ],
  },
  lesson_2_1: {
    overall: 'Edexcel June 2024 (Q1 Inference)',
    questions: ['Edexcel June 2024 (Q1 Inference)'],
  },
  lesson_2_2: {
    overall: 'Edexcel June 2023 (Q2 Causation)',
    questions: ['Edexcel June 2023 (Q2 Causation)'],
  },
  lesson_2_3: {
    overall: 'Edexcel November 2021 (Q3a Utility)',
    questions: ['Edexcel November 2021 (Q3a Utility)'],
  },
  lesson_2_4: {
    overall: 'Edexcel June 2022 (Q3b-d Interpretations)',
    questions: [
      'Edexcel June 2022 (Q3b Interpretation Difference)',
      'Edexcel June 2022 (Q3c Interpretation Why)',
      'Edexcel June 2022 (Q3d Interpretation Evaluation)',
    ],
  },
  lesson_3_1: {
    overall: 'Edexcel November 2021 (Q1 Inference)',
    questions: ['Edexcel November 2021 (Q1 Inference)'],
  },
  lesson_3_2: {
    overall: 'Edexcel June 2019 (Q2 Causation)',
    questions: ['Edexcel June 2019 (Q2 Causation)'],
  },
  lesson_3_3: {
    overall: 'Edexcel June 2024 (Q3a Utility)',
    questions: ['Edexcel June 2024 (Q3a Utility)'],
  },
  lesson_3_4: {
    overall: 'Edexcel June 2024 (Q3b-d Interpretations)',
    questions: [
      'Edexcel June 2024 (Q3b Interpretation Difference)',
      'Edexcel June 2024 (Q3c Interpretation Why)',
      'Edexcel June 2024 (Q3d Interpretation Evaluation)',
    ],
  },
  lesson_4_1: {
    overall: 'Edexcel June 2019 (Q1/Q3a Inference)',
    questions: ['Edexcel June 2019 (Q1/Q3a Inference)'],
  },
  lesson_4_2: {
    overall: 'Edexcel June 2022 (Q1) / June 2025 (Q2b Causation)',
    questions: ['Edexcel June 2022 (Q1) / June 2025 (Q2b Causation)'],
  },
  lesson_4_3: {
    overall: 'Edexcel June 2018 (Q2) / June 2025 (Q3a Utility)',
    questions: ['Edexcel June 2018 (Q2) / June 2025 (Q3a Utility)'],
  },
  lesson_4_4: {
    overall: 'Edexcel November 2020 (Q3b-d Interpretations)',
    questions: [
      'Edexcel November 2020 (Q3b Interpretation Difference)',
      'Edexcel November 2020 (Q3c Interpretation Why)',
      'Edexcel November 2020 (Q3d Interpretation Evaluation)',
    ],
  },
};

function patchFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping missing file: ${filePath}`);
    return;
  }
  console.log(`Patching ${filePath}...`);
  let content = fs.readFileSync(filePath, 'utf8');

  for (const [lessonId, provData] of Object.entries(PROVENANCE_MAP)) {
    const lessonStartStr = `id: '${lessonId}',`;
    const lessonStartIndex = content.indexOf(lessonStartStr);
    if (lessonStartIndex === -1) {
      console.warn(`⚠️ Could not find lesson ${lessonId} in ${filePath}`);
      continue;
    }

    const nextLessonIndex = content.indexOf(
      `id: 'lesson_`,
      lessonStartIndex + lessonStartStr.length,
    );
    const lessonEndIndex = nextLessonIndex !== -1 ? nextLessonIndex : content.length;
    let lessonBlock = content.slice(lessonStartIndex, lessonEndIndex);

    const epIdx = lessonBlock.indexOf('exam_practice: {');
    if (epIdx === -1) {
      console.warn(`⚠️ Could not find exam_practice in ${lessonId}`);
      continue;
    }

    let epBlock = lessonBlock.slice(epIdx);

    // Ensure overall provenance
    if (!epBlock.includes(`provenance: '${provData.overall}'`)) {
      epBlock = epBlock.replace(
        'exam_practice: {',
        `exam_practice: {\n        provenance: '${provData.overall}',`,
      );
    }

    // Now find questions: [ INSIDE epBlock
    const qIdx = epBlock.indexOf('questions: [');
    if (qIdx !== -1) {
      const qStart = epBlock.indexOf('[', qIdx);
      // find closing bracket for questions
      let depth = 0;
      let qEnd = -1;
      for (let i = qStart; i < epBlock.length; i++) {
        if (epBlock[i] === '[') depth++;
        else if (epBlock[i] === ']') {
          depth--;
          if (depth === 0) {
            qEnd = i;
            break;
          }
        }
      }

      if (qEnd !== -1) {
        let qArrayStr = epBlock.slice(qStart, qEnd + 1);

        provData.questions.forEach((qProv) => {
          if (!qArrayStr.includes(`provenance: '${qProv}'`)) {
            // Find the next object in questions array without provenance
            // Look for `question:\s*['"]` preceded by `{` where provenance is not yet set
            qArrayStr = qArrayStr.replace(
              /(\{\s*\n\s*)(?!provenance:)(question:)/,
              `$1provenance: '${qProv}',\n            $2`,
            );
          }
        });

        epBlock = epBlock.slice(0, qStart) + qArrayStr + epBlock.slice(qEnd + 1);
      }
    }

    lessonBlock = lessonBlock.slice(0, epIdx) + epBlock;
    content = content.slice(0, lessonStartIndex) + lessonBlock + content.slice(lessonEndIndex);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Successfully patched ${filePath}`);
}

const targetFiles = [
  path.join(__dirname, '..', 'units', 'weimar_nazi_germany', 'data.js'),
  path.join(__dirname, '..', 'public', 'units', 'weimar_nazi_germany', 'data.js'),
];

targetFiles.forEach(patchFile);
