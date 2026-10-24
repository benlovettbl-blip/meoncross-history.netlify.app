const fs = require('fs');
const path = require('path');

const PAPER_CONFIGS = [
  {
    file: 'public/data/edexcel_medicine_past_papers.json',
    paperId: 'paper1_11_medicine_britain',
    paperName: 'Paper 1: Medicine in Britain',
    unitId: 'edexcel_medicine',
  },
  {
    file: 'public/data/eee_past_papers.json',
    paperId: 'paper2_b4_early_elizabethan_england',
    paperName: 'Paper 2: Early Elizabethan England',
    unitId: 'eee',
  },
  {
    file: 'public/data/cme_new_past_papers.json',
    paperId: 'paper2_p5_middle_east',
    paperName: 'Paper 2: Conflict in the Middle East',
    unitId: 'cme_new',
  },
  {
    file: 'public/data/weimar_nazi_germany_past_papers.json',
    paperId: 'paper3_31_weimar_nazi_germany',
    paperName: 'Paper 3: Weimar & Nazi Germany',
    unitId: 'weimar_nazi_germany',
  },
  {
    file: 'public/data/usa_past_papers.json',
    paperId: 'paper3_33_usa_conflict_home_abroad',
    paperName: 'Paper 3: USA Conflict at Home & Abroad',
    unitId: 'usa',
  },
];

function extractWordbank(text, stimulus, indicative) {
  const combined = (text || '') + ' ' + (stimulus || '') + ' ' + (indicative || []).join(' ');
  const items = new Set();

  // Extract years: 4 digits, e.g. 1956, 1588, 1348
  const years = combined.match(/\b(1[2-9]\d{2})\b/g);
  if (years) {
    years.forEach((y) => items.add(y));
  }

  // Extract quoted or capitalized multi-word phrases
  const caps = combined.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+\b/g);
  if (caps) {
    caps.slice(0, 8).forEach((c) => {
      if (
        c.length > 4 &&
        !c.includes('Explain') &&
        !c.includes('Write') &&
        !c.includes('Describe')
      ) {
        items.add(c);
      }
    });
  }

  // If stimulus has bullet lines, extract words
  if (stimulus) {
    stimulus.split('\n').forEach((line) => {
      const clean = line
        .replace(/^[•\-\*\s]+/, '')
        .replace(/You must also use.*/i, '')
        .trim();
      if (clean && clean.length > 2) items.add(clean);
    });
  }

  const result = Array.from(items).slice(0, 12);
  return result.length > 0
    ? result
    : ['Key turning points', 'Named individuals', 'Specific statistics'];
}

function getStartersForType(type, q) {
  const t = (type || '').toLowerCase();
  if (t.includes('narrative')) {
    return [
      'The initial event that triggered this development was...',
      'Following this, a crucial turning point occurred when...',
      'This sequence of actions ultimately resulted in...',
    ];
  }
  if (t.includes('consequence')) {
    return [
      'One major consequence of this event was...',
      'A second decisive consequence was...',
      'As a result of these developments, the long-term impact was...',
    ];
  }
  if (t.includes('feature')) {
    return ['One key feature was...', 'A second distinct feature was...'];
  }
  if (t.includes('importance')) {
    return [
      'This was critically important for the development of...',
      'Furthermore, its significance lay in the fact that...',
    ];
  }
  if (t.includes('causation') || t.includes('why')) {
    return [
      'One significant reason for this was...',
      'Furthermore, another major contributing factor was...',
      'Overall, the decisive catalyst behind this outcome was...',
    ];
  }
  if (t.includes('judgment') || t.includes('how far') || t.includes('statement')) {
    return [
      'On the one hand, there is strong evidence supporting the view that...',
      'On the other hand, an alternative and equally significant factor was...',
      'In conclusion, weighing up the evidence demonstrates that...',
    ];
  }
  return [
    'One crucial factor to consider was...',
    'In addition, historical evidence shows that...',
    'The overall significance of this was...',
  ];
}

function getScaffoldQuestionsForType(type, q) {
  const t = (type || '').toLowerCase();
  if (t.includes('narrative')) {
    return [
      'What initial cause or provocation set these events in motion?',
      'What were the crucial intermediate steps and military/political moves?',
      'How did the situation resolve, and what was the lasting outcome?',
    ];
  }
  if (t.includes('consequence')) {
    return [
      'What was the immediate short-term impact on the people or governments involved?',
      'What was the wider geopolitical, territorial, or long-term consequence?',
    ];
  }
  if (t.includes('feature')) {
    return [
      'What is the first distinct feature, supported by precise factual detail?',
      'What is the second distinct feature, supported by precise factual detail?',
    ];
  }
  return [
    'What primary factor or event explains this historical development?',
    'What specific dates, named figures, or actions substantiate this explanation?',
    'What was the outcome, and why was it significant?',
  ];
}

const allPastQuestions = [];

PAPER_CONFIGS.forEach((cfg) => {
  const fullPath = path.join(__dirname, '..', cfg.file);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${fullPath}`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  let count = 0;

  (data.papers || []).forEach((paper) => {
    (paper.questions || []).forEach((q, idx) => {
      // Build normalized active recall topic object
      const topicId = `past_${cfg.unitId}_${paper.year}_${q.q_id || 'q' + idx}`;

      const indicative = q.indicative_content || [];
      const stimulus = q.stimulus || null;
      const examinerTips = q.examiner_tips || '';

      // Build thematic clusters from indicative paragraphs
      const thematicClusters = indicative.map((item, cIdx) => {
        const firstSentence = item.split(/[.:]/)[0] || `Point ${cIdx + 1}`;
        const words = item
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .split(/\s+/)
          .filter((w) => w.length > 3);
        const keywords = Array.from(new Set(words)).slice(0, 10);
        return {
          name: firstSentence.slice(0, 45).trim() + (firstSentence.length > 45 ? '...' : ''),
          description: item.slice(0, 140) + (item.length > 140 ? '...' : ''),
          keywords: keywords,
        };
      });

      // Extract milestone dates for checklist
      const datesFound = [];
      indicative.forEach((item) => {
        const matches = item.match(/\b(1[2-9]\d{2})\b/g);
        if (matches) {
          matches.forEach((y) => {
            if (!datesFound.find((d) => d.date === y)) {
              datesFound.push({
                date: y,
                label: item.split('.')[0].slice(0, 60),
              });
            }
          });
        }
      });
      if (datesFound.length === 0) {
        datesFound.push({ date: `${paper.year} Series`, label: q.topic || 'Historical Context' });
      }

      // Extract key terms
      const vocabFound = [];
      indicative.forEach((item) => {
        const colonSplit = item.split(':');
        if (colonSplit.length > 1 && colonSplit[0].length < 35) {
          const term = colonSplit[0].trim();
          if (!vocabFound.find((v) => v.term.toLowerCase() === term.toLowerCase())) {
            vocabFound.push({
              term: term,
              meaning: colonSplit[1].slice(0, 80).trim(),
            });
          }
        }
      });
      if (vocabFound.length < 2) {
        vocabFound.push({
          term: q.topic,
          meaning: 'Core syllabus focus tested in this exam paper.',
        });
      }

      const blurtTopic = {
        topicId: topicId,
        paperId: cfg.paperId,
        unitId: cfg.unitId,
        isPastPaperQuestion: true,
        year: paper.year,
        series: paper.series || `${paper.year} Exam`,
        qNumber: q.q_number,
        tariff: q.tariff,
        questionType: q.type || 'exam_question',
        specTopic: q.spec_topic || q.topic,
        topicName: q.topic,
        title: `${q.topic} (${paper.series} ${q.q_number} • ${q.tariff}m)`,
        specCode: `${paper.series} • ${q.q_number} [${q.tariff}m]`,
        subtitle: `${q.spec_topic || q.topic} &bull; ${q.tariff} Marks (${q.type ? q.type.toUpperCase() : 'EXAM'})`,
        drivingQuestion: `${q.question_text} [${q.tariff} Marks]`,
        stimulus: stimulus,
        pupilPromptCue:
          examinerTips ||
          `Retrieve detailed factual evidence and explanations for this authentic ${q.tariff}-mark Pearson Edexcel question.`,
        examinerTips: examinerTips,
        indicativeContent: indicative,
        scaffoldLadder: {
          step1_questions: getScaffoldQuestionsForType(q.type, q),
          step2_wordbank: extractWordbank(q.question_text, stimulus, indicative),
          step3_starters: getStartersForType(q.type, q),
        },
        thematicClusters: thematicClusters,
        benchmark: {
          dates: datesFound.slice(0, 4),
          vocab: vocabFound.slice(0, 4),
          mechanisms: indicative,
          examinerTip:
            examinerTips ||
            'Ensure clear historical detail and focused answer addressing the specific question stem.',
        },
      };

      allPastQuestions.push(blurtTopic);
      count++;
    });
  });

  console.log(`Loaded ${count} questions from ${cfg.file}`);
});

console.log(`Total past paper questions compiled: ${allPastQuestions.length}`);

// Write to src/blurt_past_papers_curriculum.js
const outPath = path.join(__dirname, '..', 'src', 'blurt_past_papers_curriculum.js');
const jsContent = `// ==========================================================================
// Pearson Edexcel Official Past Paper Questions Bank (2018–2026)
// Generated automatically from verified past paper examination databases
// Platform: The History Revision Hub
// Total Questions: ${allPastQuestions.length}
// ==========================================================================

export const BLURT_PAST_QUESTIONS_DATABASE = ${JSON.stringify(allPastQuestions, null, 2)};
`;

fs.writeFileSync(outPath, jsContent, 'utf8');
console.log(`Successfully written database to ${outPath}`);
