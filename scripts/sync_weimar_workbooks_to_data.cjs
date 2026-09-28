const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const dataFilePath = path.join(ROOT_DIR, 'units', 'weimar_nazi_germany', 'data.js');
const meta = require('./components/weimar_workbook_metadata.cjs');
const cfg = meta.WEIMAR_ENQUIRY_EXAM_CONFIG;

const rawData = require(dataFilePath);
const weimarData = rawData.default || rawData;

function cleanText(t) {
  if (!t) return '';
  return t
    .replace(/&bull;/g, '•')
    .replace(/&amp;/g, '&')
    .trim();
}

function generateRightExamModel(e) {
  const tariff = cleanText(e.rectoTariff || '');
  const stem = cleanText(e.rectoStem || '');
  const plan = e.rectoPlan || [];

  if (tariff.includes('12 Marks') || tariff.includes('Explain Why')) {
    const p1 = plan[0] ? cleanText(plan[0].guidance) : '';
    const p2 = plan[1] ? cleanText(plan[1].guidance) : '';
    const p3 = plan[2] ? cleanText(plan[2].guidance) : '';

    return `One major reason was ${plan[0] ? cleanText(plan[0].title).toLowerCase() : 'the primary factor'}. ${p1} This was crucial because it directly destabilised the existing political order and placed insurmountable pressure on the Weimar leadership.<br><br>Furthermore, a second critical factor was ${plan[1] ? cleanText(plan[1].title).toLowerCase() : 'a secondary factor'}. ${p2} Consequently, this exacerbated the crisis by alienating key social groups and undermining democratic legitimacy.<br><br>Finally, an underlying reason was ${plan[2] ? cleanText(plan[2].title).toLowerCase() : 'the third factor'}. ${p3} Ultimately, this meant that the situation could not be contained, directly triggering decisive structural change.`;
  } else if (tariff.includes('Utility') || tariff.includes('8 Marks')) {
    const p1 = plan[0] ? cleanText(plan[0].guidance) : '';
    const p2 = plan[1] ? cleanText(plan[1].guidance) : '';

    return `Source B is useful for an enquiry into this topic because it provides valuable contemporary insight into the situation. ${p1} From my own knowledge, I know that these developments were central to the contemporary climate. The provenance of Source B makes it particularly valuable as a first-hand account reflecting contemporary attitudes and immediate observations.<br><br>Similarly, Source C is useful because it offers an alternative, critical perspective on the same enquiry. ${p2} From my own knowledge, I know that these underlying tensions significantly qualified official claims. When evaluated in light of its provenance and context, Source C provides essential corroborating evidence that reveals the complexities and limitations of the period. Combined, both sources provide high historical utility for understanding this enquiry.`;
  } else {
    // 16-mark evaluative verdict
    const p1 = plan[0] ? cleanText(plan[0].guidance) : '';
    const p2 = plan[1] ? cleanText(plan[1].guidance) : '';
    const p3 = plan[2] ? cleanText(plan[2].guidance) : '';

    return `On the one hand, Interpretation 1 is supported by compelling historical evidence. ${p1} This provides strong weight to the view because contemporary developments clearly demonstrate that this factor exerted immense influence over popular attitudes and political outcomes.<br><br>On the other hand, Interpretation 2 offers an equally persuasive counter-perspective that emphasizes alternative structural causes. ${p2} This demonstrates that the historical process was far more multi-faceted than a single viewpoint suggests, with deeper economic, ideological, and institutional factors driving events.<br><br>Furthermore, contextual historical analysis confirms that ${p3}<br><br>In conclusion, having weighed both interpretations against the historical evidence, I agree with Interpretation 2 to a moderate extent. While Interpretation 1 correctly identifies a prominent catalyst, Interpretation 2 provides a more profound historical explanation because it accounts for the broader structural conditions that ultimately determined the course of German history.`;
  }
}

const keyTopicKeys = ['KT1', 'KT2', 'KT3', 'KT4'];
let globalLessonIndex = 0;

keyTopicKeys.forEach((kt) => {
  const enqs = cfg[kt];
  Object.keys(enqs).forEach((k) => {
    const e = enqs[k];
    const lesson = weimarData.lessons[globalLessonIndex];
    if (!lesson) {
      console.warn(`Lesson index ${globalLessonIndex} not found in weimarData!`);
      return;
    }

    const rightModel = generateRightExamModel(e);
    const rightTariff = cleanText(e.rectoTariff).includes('12 Marks')
      ? '12 marks'
      : cleanText(e.rectoTariff).includes('16 Marks')
        ? '16 marks (+4 SPaG)'
        : '8 marks';
    const rightType = cleanText(e.rectoTariff).includes('12 Marks')
      ? 'explain_why_12'
      : cleanText(e.rectoTariff).includes('16 Marks')
        ? 'verdict_16m'
        : 'utility_8m';
    const rightQNum = cleanText(e.rectoTariff).includes('12 Marks')
      ? '2. '
      : cleanText(e.rectoTariff).includes('16 Marks')
        ? '3(d). '
        : '3(a). ';

    // 1. ENSURE EXAM PRACTICE HAS BOTH VERSO AND RECTO TASKS
    if (!lesson.exam_practice) {
      lesson.exam_practice = {
        title: 'Edexcel GCSE (9–1) Paper 3 Exam Practice',
        questions: [],
      };
    }

    const versoQ = (lesson.exam_practice.questions && lesson.exam_practice.questions[0]) || {
      tariff: '4 marks',
      type: '4-mark',
      question: `1. Give two things you can infer from Source A about the topic. (4 marks)`,
      model: 'I can infer that the situation was critical. Details in the source support this.',
    };

    const rectoQ = {
      tariff: rightTariff,
      type: rightType,
      marks: rightType === 'explain_why_12' ? 12 : rightType === 'verdict_16m' ? 16 : 8,
      question: `${rightQNum}${cleanText(e.rectoStem)} [${rightTariff}]`,
      stimulus: e.rectoStimulus || [],
      prompt: 'Use the structure strip and historical guidance below to structure your response.',
      model: rightModel,
      scaffolding: {
        acronym:
          rightType === 'explain_why_12'
            ? 'PEEL Structure Strip'
            : rightType === 'verdict_16m'
              ? 'Interpretation Verdict Framework'
              : 'Source Utility Framework',
        acronym_title: cleanText(e.rectoTariff || 'Exam Writing Framework'),
        steps: (e.rectoPlan || []).map((p, idx) => ({
          letter: p.tag || `P${idx + 1}`,
          name: cleanText(p.title),
          prompt: cleanText(p.guidance),
          starter: '',
        })),
      },
    };

    lesson.exam_practice.title = 'Edexcel GCSE (9–1) Paper 3 Exam Practice';
    lesson.exam_practice.tariff = `20 marks (Q1 & ${rightQNum.trim()})`;
    lesson.exam_practice.questions = [versoQ, rectoQ];

    // 2. GCSE TASK (Standard interactive task cards)
    lesson.gcse_task = {
      title: `Edexcel GCSE Paper 3 Exam Practice: Section A & Section B`,
      tasks: [
        {
          type: 'written',
          tariff: versoQ.tariff || 'Q1: Inference [4 marks]',
          text: versoQ.question,
          model: versoQ.model,
        },
        {
          type: 'written',
          tariff: `${rightQNum}${cleanText(e.rectoTariff).split('•')[0].trim()} [${rightTariff}]`,
          text: `${rightQNum}${cleanText(e.rectoStem)}`,
          stimulus: e.rectoStimulus || [],
          model: rightModel,
        },
      ],
    };

    globalLessonIndex++;
  });
});

const outputContent = `// Weimar and Nazi Germany, 1918–39 Unit Data
const unitData = ${JSON.stringify(weimarData, null, 2)};

export default unitData;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = unitData;
}
`;

fs.writeFileSync(dataFilePath, outputContent, 'utf8');
console.log(
  `✅ Successfully synchronized all ${globalLessonIndex} lessons of Weimar & Nazi Germany with workbook Right Page tasks!`,
);
