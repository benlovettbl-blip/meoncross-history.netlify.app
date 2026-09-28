const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const dataFilePath = path.join(ROOT_DIR, 'units', 'cme_new', 'data.js');

function getCfgs(p, varName) {
  const s = fs.readFileSync(path.join(ROOT_DIR, p), 'utf8');
  const start = s.indexOf('const ' + varName + ' = [');
  const nextFunc = s.indexOf('\nfunction ', start);
  const end = s.lastIndexOf('];', nextFunc) + 1;
  const code = s.slice(start + ('const ' + varName + ' = ').length, end);
  return eval('(' + code + ')');
}

const kt1 = getCfgs('scripts/render_cme_kt1_twopage_workbook.cjs', 'kt1Configs');
const kt2 = getCfgs('scripts/render_cme_twopage_workbook.cjs', 'kt2Configs');
const kt3 = getCfgs('scripts/render_cme_kt3_twopage_workbook.cjs', 'kt3Configs');

const mapping = [
  { id: 'lesson_1', cfg: kt1[0] },
  { id: 'lesson_2', cfg: kt1[1] },
  { id: 'lesson_3', cfg: kt1[3] },
  { id: 'lesson_4', cfg: kt1[4] },
  { id: 'lesson_6', cfg: kt2[0] },
  { id: 'lesson_7', cfg: kt2[1] },
  { id: 'lesson_8', cfg: kt2[2] },
  { id: 'lesson_9', cfg: kt2[3] },
  { id: 'lesson_10', cfg: kt2[4] },
  { id: 'lesson_11', cfg: kt3[0] },
  { id: 'lesson_12', cfg: kt3[1] },
  { id: 'lesson_13', cfg: kt3[2] },
];

const rawData = require(dataFilePath);
const cmeData = rawData.default || rawData;

function cleanText(t) {
  if (!t) return '';
  return t
    .replace(/&bull;/g, '•')
    .replace(/&amp;/g, '&')
    .replace(/Protocol of Sèvres/gi, 'secret tripartite agreement')
    .replace(/Operation Focus/gi, 'pre-emptive air strike')
    .trim();
}

function sanitizeSpecFacts(str) {
  if (!str) return '';
  return str
    .replace(/Protocol of Sèvres/gi, 'secret tripartite agreement')
    .replace(/Operation Focus/gi, 'pre-emptive air strike')
    .replace(/Hosni Mubarak/gi, 'The Treaty of Washington');
}

function generateConsequenceModel(consq) {
  const q = consq.question || '';
  const guidance = cleanText(consq.guidance || '');
  const stems = cleanText(consq.stems || '');

  let eventName = q
    .replace(/^Explain one consequence of (the )?/i, '')
    .replace(/\.?\s*\[4 marks\]/i, '')
    .trim();

  const parts = stems
    .split('...')
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length >= 2 && guidance) {
    return `${parts[0]} ${guidance.slice(0, 1).toLowerCase() + guidance.slice(1).split('.')[0]}. ${parts[1]} this altered the strategic situation by creating long-term political friction and entrenching hostility between the opposing parties. Consequently, this directly prevented peaceful negotiation and accelerated the cycle of regional conflict.`;
  }

  return `One consequence of ${eventName} was significant escalation in regional tensions. Specifically, ${guidance || 'it altered relations between the key parties'}. Consequently, this directly exacerbated the dispute and created lasting obstacles to a peaceful resolution.`;
}

function generateRightExamModel(rightExam) {
  const tariff = cleanText(rightExam.tariff || '');
  const strip = rightExam.structureStrip || [];

  if (tariff.toLowerCase().includes('narrative')) {
    const p1 = strip[0]
      ? cleanText(strip[0].text)
      : 'The initial phase began with significant political and military manoeuvring.';
    const p2 = strip[1]
      ? cleanText(strip[1].text)
      : 'This escalated into direct military confrontation and crisis.';
    const p3 = strip[2]
      ? cleanText(strip[2].text)
      : 'Ultimately, this produced decisive consequences for regional control.';

    return `The chain of events began with ${
      strip[0]
        ? cleanText(strip[0].col)
            .replace(/^\d+\.\s*/, '')
            .toLowerCase()
        : 'the opening phase'
    }. ${p1} This directly altered relations by creating an immediate sense of crisis and prompting rapid military mobilisation.<br><br>Following this, the situation escalated into ${
      strip[1]
        ? cleanText(strip[1].col)
            .replace(/^\d+\.\s*/, '')
            .toLowerCase()
        : 'the second phase'
    }. ${p2} In direct response, the opposing sides hardened their stances, preventing diplomatic compromise and making active conflict virtually unavoidable.<br><br>Finally, this culminated in ${
      strip[2]
        ? cleanText(strip[2].col)
            .replace(/^\d+\.\s*/, '')
            .toLowerCase()
        : 'the decisive outcome'
    }. ${p3} Consequently, this fundamentally transformed the balance of power in the Middle East and established enduring geopolitical realities that shaped all subsequent decades of conflict.`;
  } else if (tariff.toLowerCase().includes('importance')) {
    const p1 = strip[0]
      ? cleanText(strip[0].text)
      : 'It altered the immediate military and diplomatic balance.';
    const p2 = strip[1]
      ? cleanText(strip[1].text)
      : 'It created profound long-term consequences for international diplomacy.';

    return `One reason why this was of profound historical importance was ${
      strip[0]
        ? cleanText(strip[0].col)
            .replace(/^\d+\.\s*/, '')
            .toLowerCase()
        : 'its immediate strategic impact'
    }. ${p1} This was crucial because it directly demonstrated the vulnerability of existing political arrangements and forced key regional leaders to reconsider their operational assumptions.<br><br>Furthermore, a second reason for its major importance was ${
      strip[1]
        ? cleanText(strip[1].col)
            .replace(/^\d+\.\s*/, '')
            .toLowerCase()
        : 'its lasting diplomatic legacy'
    }. ${p2} Ultimately, this meant that the event acted as an enduring turning point, permanently altering international alignments and setting the agenda for subsequent peace negotiations.`;
  } else {
    return `Source A is useful for an enquiry into this topic because it provides valuable contemporary insight into the perspectives and operational priorities of the period. From my own knowledge, I know that contemporary actors were under immense pressure to justify their actions to both domestic and international audiences. The provenance of Source A is particularly valuable because, as a direct contemporary record, it reveals the official rationale and mindset of the leadership at that precise historical moment.<br><br>Similarly, Source B is useful because it corroborates these findings while illuminating the tangible human and strategic impact on the ground. When evaluated against the broader context of the conflict, the details in Source B provide reliable evidence of how policy decisions were implemented and perceived. Consequently, while each source reflects the subjective motives of its author, combined they provide high historical utility for understanding both the official motivations and the concrete realities of the crisis.`;
  }
}

mapping.forEach((m) => {
  const lesson = cmeData.lessons.find((l) => l.id === m.id);
  if (!lesson) {
    console.warn(`Lesson ${m.id} not found in cmeData!`);
    return;
  }
  const cfg = m.cfg;
  const rightExam = cfg.rightExam || cfg.extendedPractice;

  // 1. DO NOW SYNCHRONIZATION (10 Authentic Recall Questions)
  lesson.do_now = {
    type: 'questions',
    title: 'Recall & Retrieval',
    instructions: 'Answer these questions in full sentences.',
    items: cfg.doNow.map((d) => {
      let q = cleanText(d.q);
      let a = cleanText(d.a);
      if (q.includes('signed in France in October 1956 between Britain, France, and Israel')) {
        q =
          'What secret tripartite agreement was signed in France in October 1956 between Britain, France, and Israel to invade Egypt?';
        a = 'The secret tripartite agreement (Sèvres pact)';
      }
      return { question: q, answer: a };
    }),
  };

  // 2. GENERATE MODELS
  const modelA = generateConsequenceModel(cfg.consequenceA);
  const modelB = generateConsequenceModel(cfg.consequenceB);
  const modelRight = generateRightExamModel(rightExam);

  let rawConA = cleanText(cfg.consequenceA.question);
  let rawConB = cleanText(cfg.consequenceB.question);
  const conAQ = rawConA.endsWith('.') ? rawConA : `${rawConA}.`;
  const conBQ = rawConB.endsWith('.') ? rawConB : `${rawConB}.`;

  // 3. EXAM PRACTICE (Left Page Consequence + Right Page Exam Task)
  lesson.exam_practice = {
    type: 'consequence_and_extended',
    title: 'Edexcel GCSE (9–1) Paper 2 Exam Practice',
    tariff:
      '16 marks (Q1 Consequence & ' +
      (rightExam.tariff ? cleanText(rightExam.tariff).split('•')[0].trim() : 'Q2/Q3') +
      ')',
    questions: [
      {
        tariff: '4 marks',
        type: '4-mark',
        marks: 4,
        question: `1(a). ${conAQ} (4 marks)`,
        prompt: cleanText(cfg.consequenceA.guidance),
        model: modelA,
        scaffolding: {
          acronym: 'P-F-C (Point • Fact • Consequence)',
          acronym_title: 'The P-F-C High-Yield Consequence Formula (1 Concise Paragraph)',
          guidance:
            'Write 1 concise paragraph (approx. 3–4 sentences). State one clear consequence (Point), support with accurate historical facts (Fact), and explain the causal link to the event (Consequence Link).',
          sentence_starters: cfg.consequenceA.stems
            ? [cleanText(cfg.consequenceA.stems)]
            : ['One consequence was...', 'Specifically, ...', 'Consequently, this led to...'],
          connectives_bank: [
            'One consequence was',
            'Specifically, this meant that',
            'Consequently, this directly led to',
            'As a result of this',
          ],
        },
      },
      {
        tariff: '4 marks',
        type: '4-mark',
        marks: 4,
        question: `1(b). ${conBQ} (4 marks)`,
        prompt: cleanText(cfg.consequenceB.guidance),
        model: modelB,
        scaffolding: {
          acronym: 'P-F-C (Point • Fact • Consequence)',
          acronym_title: 'The P-F-C High-Yield Consequence Formula (1 Concise Paragraph)',
          guidance:
            'Write 1 concise paragraph (approx. 3–4 sentences). State one clear consequence (Point), support with accurate historical facts (Fact), and explain the causal link to the event (Consequence Link).',
          sentence_starters: cfg.consequenceB.stems
            ? [cleanText(cfg.consequenceB.stems)]
            : ['One consequence was...', 'Specifically, ...', 'Consequently, this led to...'],
          connectives_bank: [
            'One consequence was',
            'Specifically, this meant that',
            'Consequently, this directly led to',
            'As a result of this',
          ],
        },
      },
      {
        tariff: rightExam.tariff ? cleanText(rightExam.tariff).split('•')[0].trim() : '8 marks',
        type: rightExam.type || 'extended_8m',
        marks: 8,
        question: `${rightExam.tariff && rightExam.tariff.includes('Question 2') ? '2. ' : '3. '}${cleanText(rightExam.stem || rightExam.title)}`,
        stimulus: (rightExam.stimulus || []).map((s) => cleanText(s)),
        prompt: 'Use the structure strip and causal connectives below to structure your response.',
        model: modelRight,
        scaffolding: {
          acronym:
            rightExam.tariff && rightExam.tariff.includes('Narrative')
              ? 'Chronological Narrative Framework'
              : 'Analytical Importance Framework',
          acronym_title: cleanText(rightExam.tariff || 'Extended Writing Framework'),
          guidance: cleanText(rightExam.connectives || ''),
          steps: (rightExam.structureStrip || []).map((s, idx) => ({
            letter: s.col
              ? cleanText(s.col)
                  .split(':')[0]
                  .replace(/^\d+\.\s*/, '')
                  .trim()
              : `P${idx + 1}`,
            name: s.col ? cleanText(s.col).split(':').slice(1).join(':').trim() : `Step ${idx + 1}`,
            prompt: cleanText(s.text),
            starter: '',
          })),
          sentence_starters: rightExam.connectives
            ? cleanText(rightExam.connectives)
                .split('•')
                .map((c) => c.trim())
            : [],
          connectives_bank: rightExam.wordBank
            ? cleanText(rightExam.wordBank)
                .split('•')
                .map((w) => w.trim())
            : [],
        },
      },
    ],
  };

  // 4. GCSE TASK (Standard interactive task cards)
  lesson.gcse_task = {
    title: `Edexcel GCSE Paper 2 Practice: Question 1 & ${rightExam.tariff && rightExam.tariff.includes('Question 2') ? 'Question 2' : 'Question 3'}`,
    tasks: [
      {
        type: 'written',
        tariff: 'Q1(a): Consequence [4 marks]',
        text: `Q1(a). ${conAQ} [4 marks]`,
        model: modelA,
      },
      {
        type: 'written',
        tariff: 'Q1(b): Consequence [4 marks]',
        text: `Q1(b). ${conBQ} [4 marks]`,
        model: modelB,
      },
      {
        type: 'written',
        tariff: rightExam.tariff
          ? cleanText(rightExam.tariff).split('•')[0].trim()
          : 'Q2/Q3 [8 marks]',
        text: `${rightExam.tariff && rightExam.tariff.includes('Question 2') ? 'Q2. ' : 'Q3. '}${cleanText(rightExam.stem || rightExam.title)}`,
        stimulus: (rightExam.stimulus || []).map((s) => cleanText(s)),
        model: modelRight,
      },
    ],
  };
});

// Also sanitize any older remaining occurrences in data
let serialized = JSON.stringify(cmeData, null, 2);
serialized = serialized
  .replace(/The Protocol of Sèvres/g, 'The secret tripartite agreement (Sèvres pact)')
  .replace(/Protocol of Sèvres/g, 'secret tripartite agreement')
  .replace(/Operation Focus/g, 'pre-emptive air strike')
  .replace(
    /Who succeeded Anwar Sadat as President of Egypt and pledged to uphold the 1979 Peace Treaty\?/g,
    'Which 1979 peace treaty did Anwar Sadat’s successor pledge to uphold, maintaining peaceful relations with Israel?',
  )
  .replace(
    /"answer": "Hosni Mubarak"/g,
    '"answer": "The Treaty of Washington (Egyptian-Israeli Peace Treaty)"',
  );

const outputContent = `// Conflict in the Middle East, 1945–95 Unit Data
const unitData = ${serialized};

export default unitData;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = unitData;
}
`;

fs.writeFileSync(dataFilePath, outputContent, 'utf8');
console.log(
  '✅ Successfully synchronized Conflict in the Middle East (cme_new) data.js with pupil workbooks!',
);
