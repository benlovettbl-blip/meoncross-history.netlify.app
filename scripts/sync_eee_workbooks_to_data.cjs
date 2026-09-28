const fs = require('fs');
const path = require('path');
const { KEY_TOPICS_DATA } = require('./render_eee_twopage_workbook.cjs');

const ROOT_DIR = path.join(__dirname, '..');
const dataFilePath = path.join(ROOT_DIR, 'units', 'eee', 'data.js');

// Load original data
const rawData = require(dataFilePath);
const eeeData = rawData.default || rawData;

const allEnquiries = [
  ...KEY_TOPICS_DATA.KT1.enquiries,
  ...KEY_TOPICS_DATA.KT2.enquiries,
  ...KEY_TOPICS_DATA.KT3.enquiries,
];

function cleanGuidance(g) {
  if (!g) return '';
  return g.replace(/&bull;/g, '•').trim();
}

function generateFeatureModel(feature) {
  // Guidance format: Point (...) &bull; Fact (...)
  const guidance = cleanGuidance(feature.guidance);
  const pointMatch = guidance.match(/Point\s*\(([^)]+)\)/i);
  const factMatch = guidance.match(/Fact\s*\(([^)]+)\)/i);
  const point = pointMatch ? pointMatch[1].trim() : '';
  const fact = factMatch ? factMatch[1].trim() : '';

  if (point && fact) {
    return `One key feature was that ${point.charAt(0).toLowerCase() + point.slice(1)}. Specifically, ${fact}.`;
  }
  return guidance;
}

function generateRightExamModel(rightExam) {
  const is12 = rightExam.type === 'explain_why_12';
  const strip = rightExam.structureStrip || [];

  if (is12) {
    // 3-paragraph PEEL causal explanation
    const p1Text = strip[0] ? strip[0].text : '';
    const p2Text = strip[1] ? strip[1].text : '';
    const p3Text = strip[2] ? strip[2].text : '';

    return `One major reason was ${strip[0] ? strip[0].col.replace(/^\d+\.\s*/, '').toLowerCase() : 'the primary cause'}. ${p1Text} This was a critical factor because it directly heightened contemporary tensions and compelled the Crown to take immediate decisive action.<br><br>Furthermore, a second crucial reason was ${strip[1] ? strip[1].col.replace(/^\d+\.\s*/, '').toLowerCase() : 'a secondary cause'}. ${p2Text} Consequently, this compounded the problem by creating lasting institutional friction and reducing Elizabeth’s diplomatic or political room for manoeuvre.<br><br>Finally, an underlying catalyst was ${strip[2] ? strip[2].col.replace(/^\d+\.\s*/, '').toLowerCase() : 'the final factor'}. ${p3Text} Ultimately, this meant that the situation could not be resolved without significant structural changes to Elizabethan governance and policy.`;
  } else {
    // 16-mark balanced evaluative essay
    const p1Text = strip[0] ? strip[0].text : '';
    const p2Text = strip[1] ? strip[1].text : '';
    const p3Text = strip[2] ? strip[2].text : '';

    const stem = rightExam.stem.replace(/^‘/, '').replace(/’.*$/, '');

    return `On the one hand, it can be strongly argued that ${strip[0] ? strip[0].col.replace(/^\d+\.\s*/, '').toLowerCase() : 'the stated factor'} was of primary importance. ${p1Text} This supports the statement because contemporary evidence shows that this factor exerted immediate, disruptive pressure on the Elizabethan settlement.<br><br>On the other hand, an alternative critical perspective points to ${strip[1] ? strip[1].col.replace(/^\d+\.\s*/, '').toLowerCase() : 'the second factor'}. ${p2Text} This demonstrates that the issue cannot be reduced to a single cause, as broader structural, political, and socio-economic dynamics played an equally formidable role.<br><br>Furthermore, a third vital factor was ${strip[2] ? strip[2].col.replace(/^\d+\.\s*/, '').toLowerCase() : 'the third factor'}. ${p3Text} Without this compounding element, the severity and long-term consequences of the crisis would have been substantially reduced.<br><br>In conclusion, while ${strip[0] ? strip[0].col.replace(/^\d+\.\s*/, '').toLowerCase() : 'the primary factor'} was undeniably significant, it was not the sole or even the primary driver in isolation. Rather, a nuanced historical evaluation reveals that ${strip[1] ? strip[1].col.replace(/^\d+\.\s*/, '').toLowerCase() : 'the alternative factor'} was the decisive underlying factor because it established the permanent structural conditions under which all subsequent events unfolded.`;
  }
}

eeeData.lessons.forEach((lesson, i) => {
  const enquiry = allEnquiries[i];
  if (!enquiry) {
    console.warn(`No matching enquiry for lesson ${i}: ${lesson.id}`);
    return;
  }

  // 1. DO NOW SYNCHRONIZATION (10 Authentic Recall Questions matching workbook verbatim)
  lesson.do_now = {
    type: 'questions',
    title: 'Recall & Retrieval',
    instructions: 'Answer these questions in full sentences.',
    items: enquiry.doNow.map((d) => ({
      question: d.q,
      answer: d.a,
    })),
  };

  // 2. GENERATE MODELS
  const modelA = generateFeatureModel(enquiry.featureA);
  const modelB = generateFeatureModel(enquiry.featureB);
  const modelRight = generateRightExamModel(enquiry.rightExam);

  // 3. EXAM PRACTICE (Left Page Features + Right Page Exam Task)
  lesson.exam_practice = {
    title: 'Edexcel GCSE (9–1) Paper 2 Exam Practice',
    tariff:
      enquiry.rightExam.type === 'explain_why_12' ? '16 marks (Q1 & Q2)' : '20 marks (Q1 & Q3)',
    questions: [
      {
        tariff: '2 marks',
        type: 'feature_2m',
        question: `1(a). ${enquiry.featureA.stem} [2 marks]`,
        prompt: cleanGuidance(enquiry.featureA.guidance),
        model: modelA,
        scaffolding: {
          acronym: 'Point & Detail (2 Marks)',
          acronym_title:
            'Feature Question Formula: State One Valid Feature + Support with Factual Detail',
          guidance: cleanGuidance(enquiry.featureA.guidance),
          sentence_starters: enquiry.featureA.stems ? [enquiry.featureA.stems] : [],
        },
      },
      {
        tariff: '2 marks',
        type: 'feature_2m',
        question: `1(b). ${enquiry.featureB.stem} [2 marks]`,
        prompt: cleanGuidance(enquiry.featureB.guidance),
        model: modelB,
        scaffolding: {
          acronym: 'Point & Detail (2 Marks)',
          acronym_title:
            'Feature Question Formula: State One Valid Feature + Support with Factual Detail',
          guidance: cleanGuidance(enquiry.featureB.guidance),
          sentence_starters: enquiry.featureB.stems ? [enquiry.featureB.stems] : [],
        },
      },
      {
        tariff: enquiry.rightExam.type === 'explain_why_12' ? '12 marks' : '16 marks',
        type: enquiry.rightExam.type,
        question: `${enquiry.rightExam.type === 'explain_why_12' ? '2. ' : '3. '}${enquiry.rightExam.stem}`,
        stimulus: enquiry.rightExam.stimulus || [],
        prompt:
          'Use the structure strip, causal connectives, and word bank below to structure your response.',
        model: modelRight,
        scaffolding: {
          acronym:
            enquiry.rightExam.type === 'explain_why_12'
              ? 'PEEL Structure Strip'
              : 'Evaluative Essay Framework',
          acronym_title:
            enquiry.rightExam.type === 'explain_why_12'
              ? '3-Paragraph Causal Analysis (PEEL)'
              : 'Balanced Evaluative Essay (3 Themes + Judgement)',
          guidance: cleanGuidance(enquiry.rightExam.connectives),
          steps: (enquiry.rightExam.structureStrip || []).map((s, sIdx) => ({
            letter: s.col
              ? s.col
                  .split(':')[0]
                  .replace(/^\d+\.\s*/, '')
                  .trim()
              : `P${sIdx + 1}`,
            name: s.col ? s.col.split(':').slice(1).join(':').trim() : `Theme ${sIdx + 1}`,
            prompt: s.text,
            starter: '',
          })),
          sentence_starters: enquiry.rightExam.connectives
            ? enquiry.rightExam.connectives.split('&bull;').map((c) => c.trim())
            : [],
          connectives_bank: enquiry.rightExam.wordBank
            ? enquiry.rightExam.wordBank.split('&bull;').map((w) => w.trim())
            : [],
        },
      },
    ],
  };

  // 4. GCSE TASK (Standard interactive task cards)
  lesson.gcse_task = {
    title: `Edexcel GCSE Paper 2 Section B Practice: Q1 & ${enquiry.rightExam.type === 'explain_why_12' ? 'Q2' : 'Q3'}`,
    tasks: [
      {
        type: 'written',
        tariff: 'Q1(a): Feature [2 marks]',
        text: `Q1(a). ${enquiry.featureA.stem} [2 marks]`,
        model: modelA,
      },
      {
        type: 'written',
        tariff: 'Q1(b): Feature [2 marks]',
        text: `Q1(b). ${enquiry.featureB.stem} [2 marks]`,
        model: modelB,
      },
      {
        type: 'written',
        tariff:
          enquiry.rightExam.type === 'explain_why_12'
            ? 'Q2: Explain Why [12 marks]'
            : 'Q3: Evaluative Essay [16 marks]',
        text: `${enquiry.rightExam.type === 'explain_why_12' ? 'Q2. ' : 'Q3. '}${enquiry.rightExam.stem}`,
        stimulus: enquiry.rightExam.stimulus || [],
        model: modelRight,
      },
    ],
  };
});

// Serialize back to units/eee/data.js preserving ESM export format
const outputContent = `// Early Elizabethan England, 1558–88 Unit Data
const unitData = ${JSON.stringify(eeeData, null, 2)};

export default unitData;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = unitData;
}
`;

fs.writeFileSync(dataFilePath, outputContent, 'utf8');
console.log(
  '✅ Successfully synchronized Early Elizabethan England (eee) data.js with pupil workbooks!',
);
