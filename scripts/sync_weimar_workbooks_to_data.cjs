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

    const enqNum = (globalLessonIndex % 4) + 1;
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

    // 1. BUILD VERSO QUESTION MATCHING WORKBOOK LEFT PAGE
    let versoQ = null;
    let lessonStimulus = lesson.exam_practice?.stimulus || [];

    if (enqNum === 1) {
      // Enquiry 1: Q1 Inference from Source A [4 marks]
      const q1Focus = e.q1Focus || 'conditions in Germany';
      versoQ = {
        tariff: '4 marks',
        type: '4-mark',
        question: `1. Give two things you can infer from Source A about ${q1Focus}. [4 marks]`,
        prompt:
          'Give two separate inferences. For each inference, provide a clear deduction and support it with a direct quote or detail from Source A.',
        model: `(i) What I can infer: I can infer that ${q1Focus} caused acute disruption and instability across Germany.<br>Details in Source A that tell me this: The source notes that conditions were deteriorating rapidly.<br><br>(ii) What I can infer: I can infer that the authorities faced severe public pressure and could not rely on standard controls.<br>Details in Source A that tell me this: The author states that popular discontent had spread into open resistance.`,
        scaffolding: {
          acronym: 'Inference + Detail Formula (AO3)',
          acronym_title: 'Deduction & Quote Framework',
          steps: [
            {
              letter: 'I1',
              name: 'First Inference',
              prompt: 'State what you can deduce from Source A (do not simply copy a quote).',
            },
            {
              letter: 'Q1',
              name: 'Supporting Quote',
              prompt: 'Quote the exact detail from Source A that supports your first inference.',
            },
            {
              letter: 'I2',
              name: 'Second Inference',
              prompt: 'State a second, different deduction about the topic.',
            },
            {
              letter: 'Q2',
              name: 'Supporting Quote',
              prompt: 'Quote the exact detail from Source A that supports your second inference.',
            },
          ],
        },
      };
    } else if (enqNum === 2) {
      // Enquiry 2: Single Source B Utility [6 marks]
      const singleSrc = e.singleSourceB || {
        stem: `How useful is Source B for an enquiry into ${lesson.title}? [6 marks]`,
        guidance:
          'Content Deduction • Own Knowledge Corroboration • Provenance Value (Nature, Origin, Purpose).',
        stems:
          'Source B is useful because it reveals that... From my own knowledge, I know that... The provenance makes this account valuable because...',
        content: 'Historical testimony documenting conditions and turning points of the crisis.',
        provenance: 'From a contemporary record of the period.',
      };

      versoQ = {
        tariff: '6 marks',
        type: 'utility_6m',
        question: `1. ${singleSrc.stem}`,
        prompt: cleanText(singleSrc.guidance),
        model: `Source B is useful for an enquiry into this topic because it reveals direct contemporary insight into the situation. From my own knowledge of this period, I know that these developments were central to the crisis facing Germany. Furthermore, the provenance of Source B as a contemporary account gives it significant value because it reflects immediate observations without the distortion of hindsight.`,
        scaffolding: {
          acronym: 'COP Utility Formula',
          acronym_title: 'Content, Own Knowledge, Provenance',
          steps: [
            {
              letter: 'C',
              name: 'Content Deduction',
              prompt: 'Explain what Source B reveals with a direct quote.',
            },
            {
              letter: 'O',
              name: 'Own Knowledge',
              prompt: 'Corroborate the source using precise contextual historical facts.',
            },
            {
              letter: 'P',
              name: 'Provenance',
              prompt: 'Evaluate how the Nature, Origin, and Purpose affect its value.',
            },
          ],
        },
      };

      // Ensure singleSourceB is in stimulus if not already present
      if (!lessonStimulus || lessonStimulus.length === 0) {
        lessonStimulus = [
          {
            title: `Source B (Contemporary Written Source): ${singleSrc.provenance}`,
            content: singleSrc.content,
          },
        ];
      }
    } else if (enqNum === 3) {
      // Enquiry 3: Q3(a) Preparation: Content & Provenance (COP) Analysis [4 marks]
      versoQ = {
        tariff: '4 marks',
        type: '4-mark',
        question: `3(a) Part 1: Content & Provenance (COP) Comparative Analysis for Sources B & C. [4 marks]`,
        prompt:
          'Compare what Sources B and C reveal about the enquiry, and evaluate how their contrasting provenances affect their usefulness.',
        model: `Source B provides valuable insight into the official or prominent viewpoint, highlighting key achievements and contemporary data. In contrast, Source C reveals an alternative critical perspective, exposing underlying social friction and popular anxieties. When evaluated together, Source B demonstrates what contemporary leadership intended, while Source C captures the reality experienced by ordinary citizens, giving both high historical utility.`,
        scaffolding: {
          acronym: 'COP Comparative Formula',
          acronym_title: 'Dual-Source Evaluation',
          steps: [
            {
              letter: 'B',
              name: 'Source B Value',
              prompt: 'Analyse Source B content and provenance strengths.',
            },
            {
              letter: 'C',
              name: 'Source C Value',
              prompt: 'Analyse Source C content and provenance strengths.',
            },
            {
              letter: 'S',
              name: 'Synthesis',
              prompt: 'Explain how both sources complement each other.',
            },
          ],
        },
      };
    } else {
      // Enquiry 4: Q3(b) Interpretation Difference [4 marks]
      versoQ = {
        tariff: '4 marks',
        type: '4-mark',
        question: `3(b). Study Interpretations 1 and 2. They give different views about ${e.interpFocus || 'the topic'}. What is the main difference between these views? [4 marks]`,
        prompt:
          'Explain the main difference between the two interpretations, quoting details from both to support your answer.',
        model: `The main difference between these interpretations is their assessment of ${e.interpFocus || 'the period'}. Interpretation 1 argues that the period was characterized by substantial progress and positive transformation, emphasizing that new opportunities genuinely reshaped German society. In contrast, Interpretation 2 contends that these developments were largely superficial or provoked a severe traditionalist backlash, demonstrating that deep structural divisions remained unresolved.`,
        scaffolding: {
          acronym: 'Difference + Quotes Formula',
          acronym_title: 'Historiographical Comparison',
          steps: [
            {
              letter: 'D',
              name: 'Core Difference',
              prompt: 'Identify the key conceptual disagreement between both views.',
            },
            {
              letter: 'I1',
              name: 'Quote Interp 1',
              prompt: 'Quote and explain a phrase from Interpretation 1.',
            },
            {
              letter: 'I2',
              name: 'Quote Interp 2',
              prompt: 'Quote and explain a phrase from Interpretation 2.',
            },
          ],
        },
      };
    }

    // 2. BUILD RECTO QUESTION MATCHING WORKBOOK RIGHT PAGE
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

    lesson.exam_practice = {
      title: 'Edexcel GCSE (9–1) Paper 3 Exam Practice',
      tariff: `Section A & Section B (${versoQ.tariff} & ${rightTariff})`,
      stimulus: lessonStimulus,
      questions: [versoQ, rectoQ],
    };

    // 3. GCSE TASK (Standard interactive task cards)
    lesson.gcse_task = {
      title: `Edexcel GCSE Paper 3 Exam Practice: Section A & Section B`,
      tasks: [
        {
          type: 'written',
          tariff: versoQ.tariff,
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
