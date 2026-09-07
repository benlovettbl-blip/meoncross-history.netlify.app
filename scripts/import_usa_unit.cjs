const fs = require('fs');
const path = require('path');

const USA_ROOT = 'C:/Projects/edexcelgcsehistoryusa.netlify.app';
const TARGET_DIR = path.join(__dirname, '..', 'units', 'usa');
const PUBLIC_USA_DIR = path.join(__dirname, '..', 'public', 'units', 'usa');
const PUBLIC_IMAGES_DIR = path.join(__dirname, '..', 'public', 'images', 'usa');

if (!fs.existsSync(TARGET_DIR)) fs.mkdirSync(TARGET_DIR, { recursive: true });
if (!fs.existsSync(PUBLIC_USA_DIR)) fs.mkdirSync(PUBLIC_USA_DIR, { recursive: true });
if (!fs.existsSync(PUBLIC_IMAGES_DIR)) fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });

console.log('--- Step 1: Loading raw data from legacy USA app ---');

const lessonsDataRaw = fs.readFileSync(path.join(USA_ROOT, 'src/lessons_data.js'), 'utf8');
const keyTopicsRaw = fs.readFileSync(path.join(USA_ROOT, 'src/key_topics_data.js'), 'utf8');
const questionsRaw = fs.readFileSync(path.join(USA_ROOT, 'questions.js'), 'utf8');
const coreQRaw = fs.readFileSync(path.join(USA_ROOT, 'src/core_questions_data.js'), 'utf8');
const tradingRaw = fs.readFileSync(path.join(USA_ROOT, 'src/trading_cards_data.js'), 'utf8');

// Parse raw data using eval in isolated VM or Function
function extractExport(source, exportName) {
  const regex = new RegExp(
    `export\\s+const\\s+${exportName}\\s*=\\s*([\\s\\S]*?);\\s*(?:export|$)`,
  );
  const match = source.match(regex);
  if (!match) {
    // Try without final semicolon match
    const sub = source.substring(source.indexOf(`export const ${exportName}`));
    const eqIdx = sub.indexOf('=');
    return new Function(`return ${sub.substring(eqIdx + 1)}`)();
  }
  return new Function(`return ${match[1]}`)();
}

const LESSONS_DATA = extractExport(lessonsDataRaw, 'LESSONS_DATA');
const KEY_TOPICS_OVERVIEWS = extractExport(keyTopicsRaw, 'KEY_TOPICS_OVERVIEWS');
const QUIZ_DATA = extractExport(questionsRaw, 'QUIZ_DATA');
const PAST_PAPERS_DATA = extractExport(questionsRaw, 'PAST_PAPERS_DATA');
const CORE_QUESTIONS_DATA = extractExport(coreQRaw, 'CORE_QUESTIONS_DATA');
const TRADING_CARDS_DATA = extractExport(tradingRaw, 'TRADING_CARDS_DATA');

console.log(
  `Loaded ${Object.keys(LESSONS_DATA).length} lessons, ${Object.keys(KEY_TOPICS_OVERVIEWS).length} topics, ${PAST_PAPERS_DATA.length} past papers.`,
);

// Copy assets
console.log('--- Step 2: Copying visual assets ---');
const srcAssets = path.join(USA_ROOT, 'public', 'assets');
if (fs.existsSync(srcAssets)) {
  const targetAssets = path.join(PUBLIC_USA_DIR, 'assets');
  if (!fs.existsSync(targetAssets)) fs.mkdirSync(targetAssets, { recursive: true });

  const copyDir = (src, dest) => {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const ent of entries) {
      const sPath = path.join(src, ent.name);
      const dPath = path.join(dest, ent.name);
      if (ent.isDirectory()) {
        copyDir(sPath, dPath);
      } else {
        fs.copyFileSync(sPath, dPath);
      }
    }
  };
  copyDir(srcAssets, targetAssets);
  console.log('Assets copied to public/units/usa/assets');
}

// Build workbooks metadata
const workbooks = [
  {
    id: 'KT1',
    title: 'Key Topic 1: The development of the civil rights movement, 1954–60',
    image: '/units/usa/assets/card_mlk.png',
    prefix: 'lesson_1_',
    enquiry:
      'How did legal victories and grassroots action transform the struggle for civil rights?',
  },
  {
    id: 'KT2',
    title: 'Key Topic 2: Protest, progress and radicalism, 1960–75',
    image: '/units/usa/assets/card_malcolmx.png',
    prefix: 'lesson_2_',
    enquiry: 'How did the civil rights movement evolve from non-violent protest to Black Power?',
  },
  {
    id: 'KT3',
    title: 'Key Topic 3: US involvement in the Vietnam War, 1954–75',
    image: '/units/usa/assets/card_westmoreland.png',
    prefix: 'lesson_3_',
    enquiry:
      'Why did the USA become militarily entangled in Vietnam, and why were US tactics unable to defeat the Vietcong?',
  },
  {
    id: 'KT4',
    title: 'Key Topic 4: Reactions to, and the end of, US involvement in the Vietnam War, 1964–75',
    image: '/units/usa/assets/card_nixon.png',
    prefix: 'lesson_4_',
    enquiry:
      'Why did domestic opposition force the USA to withdraw, and what was the consequence of the fall of Saigon?',
  },
];

// Build timeline
const timeline = [];
Object.values(KEY_TOPICS_OVERVIEWS).forEach((kt) => {
  if (kt.timeline) {
    kt.timeline.forEach((ev) => {
      timeline.push({
        year: ev.year,
        title: ev.title,
        detail: ev.bullets ? ev.bullets.join(' ') : '',
        figures: ev.figures || [],
        quote: ev.quote || '',
      });
    });
  }
});

// Build key individuals
const key_individuals = TRADING_CARDS_DATA.map((c) => ({
  name: c.name.replace(/ the [A-Za-z]+$/, '').trim(),
  title: c.frontPhrase || '',
  image: `/units/usa/${c.image}`,
  description: c.bio || c.description || '',
  stats: c.stats || {},
}));

// Build lessons
console.log('--- Step 3: Transforming 16 lessons ---');
const lessons = [];

const lessonKeys = [
  'subtopic_1_1',
  'subtopic_1_2',
  'subtopic_1_3',
  'subtopic_1_4',
  'subtopic_2_1',
  'subtopic_2_2',
  'subtopic_2_3',
  'subtopic_2_4',
  'subtopic_3_1',
  'subtopic_3_2',
  'subtopic_3_3',
  'subtopic_3_4',
  'subtopic_4_1',
  'subtopic_4_2',
  'subtopic_4_3',
  'subtopic_4_4',
];

lessonKeys.forEach((key, idx) => {
  const rawL = LESSONS_DATA[key] || {};
  const tNum = key.split('_')[1];
  const sNum = key.split('_')[2];
  const lessonId = `lesson_${tNum}_${sNum}`;

  // Find corresponding quiz subtopic
  let qList = [];
  QUIZ_DATA.forEach((t) => {
    if (t.subtopics) {
      const st = t.subtopics.find((s) => s.id === key);
      if (st && st.standard) qList.push(...st.standard);
    }
  });

  // Find core questions
  const coreList = CORE_QUESTIONS_DATA[key] || [];

  // Construct Do Now items (prior recall from previous subtopics or early questions)
  const doNowItems = [];
  if (idx === 0) {
    doNowItems.push(
      {
        question: 'What was the 1896 Plessy v. Ferguson Supreme Court ruling?',
        answer:
          "It established the 'separate but equal' doctrine, making racial segregation legal across the USA.",
      },
      {
        question: 'What is the difference between the US Constitution and state laws?',
        answer:
          'The US Constitution is federal supreme law; state laws cannot violate constitutional rights.',
      },
      {
        question: 'What was the 14th Amendment to the US Constitution?',
        answer:
          'It guaranteed citizenship and equal protection under the law to all persons born in the USA.',
      },
      {
        question: 'What does the term disenfranchisement mean?',
        answer: 'Depriving someone or a group of citizens of the right to vote.',
      },
      {
        question: 'Who were the Ku Klux Klan (KKK)?',
        answer:
          'A white supremacist terrorist organisation founded in the South after the Civil War.',
      },
    );
  } else {
    // Pick 5 recall questions from prior lessons
    const prevKey = lessonKeys[idx - 1];
    const prevCore = CORE_QUESTIONS_DATA[prevKey] || [];
    prevCore.slice(0, 3).forEach((c) => {
      doNowItems.push({ question: c.q, answer: c.starter });
    });
    // Add 2 general recall items
    if (qList.length > 0) {
      qList.slice(0, 2).forEach((q) => {
        doNowItems.push({ question: q.question, answer: q.answer });
      });
    }
  }

  // Vocab list
  const vocab = [];
  if (qList.length > 0) {
    qList.slice(0, 6).forEach((q) => {
      vocab.push({
        term: q.answer,
        definition: q.explanation
          ? q.explanation.split('.')[0] + '.'
          : 'Key historical term for Paper 3.',
      });
    });
  } else {
    vocab.push(
      {
        term: 'Segregation',
        definition: 'The enforced separation of different racial groups in daily life.',
      },
      { term: 'Litigation', definition: 'The process of taking legal action through the courts.' },
      {
        term: 'Grassroots',
        definition: 'Ordinary people in a community acting together from the bottom up.',
      },
      {
        term: 'Direct Action',
        definition:
          'Protest action such as boycotts, marches, and sit-ins rather than negotiation.',
      },
      {
        term: 'Filibuster',
        definition:
          'A prolonged speech in the US Senate designed to obstruct legislative progress.',
      },
    );
  }

  // Narrative blocks
  const narrative_blocks = [];
  if (rawL.steps && Array.isArray(rawL.steps)) {
    rawL.steps.forEach((step, sIdx) => {
      let contentHtml = step.bodyHtml || '';
      // Sanitize paths
      contentHtml = contentHtml.replace(/assets\//g, '/units/usa/assets/');

      narrative_blocks.push({
        id: `block_${lessonId}_${sIdx + 1}`,
        title: step.title || `Part ${sIdx + 1}`,
        content: contentHtml,
        scholarly_depth: step.scholarlyDepth || null,
      });
    });
  }

  // Lived experience / Primary source
  let primary_source = null;
  if (rawL.livedExperience) {
    primary_source = {
      qNum: 'Source 1',
      title: `Eyewitness Testimony: ${rawL.livedExperience.witness}`,
      witness: rawL.livedExperience.witness,
      context: rawL.livedExperience.context,
      quote: rawL.livedExperience.quote,
      question: rawL.livedExperience.discussionQuestion,
      scaffolding:
        'Evaluate how personal experience highlights the psychological terror and physical reality of segregation.',
    };
  }

  // Teacher notes with hinge questions
  const teacher_notes = {
    primer: `This lesson investigates ${rawL.headerTitle || 'this key topic in 20th century US history'}. ${rawL.headerIntro || ''}`,
    objectives: [
      {
        objective: `Analyze the key developments, events, and individuals in ${rawL.headerTitle || 'this lesson'}.`,
        primer:
          'Guide pupils through the narrative sections, emphasizing the contrast between top-down federal action and grassroots activism.',
        question: `How did the events of this period decisively alter the balance of power between federal authority and local Southern/foreign resistance?`,
      },
      {
        objective:
          'Evaluate competing historical interpretations and causal significance for Pearson Edexcel Paper 3.',
        primer:
          'Ensure students use specific dates, percentages, and names in their 16-mark essay judgments.',
        question: `Which factor had the most enduring long-term consequence: legal litigation or direct action?`,
      },
    ],
    source_context: rawL.livedExperience
      ? `${rawL.livedExperience.context} **Hinge Question:** ${rawL.livedExperience.discussionQuestion}`
      : 'Examine historical accounts and evidence. **Hinge Question:** Why did eyewitnesses interpret these events with conflicting perspectives?',
  };

  lessons.push({
    id: lessonId,
    title: rawL.headerTitle || `Lesson ${tNum}.${sNum}`,
    enquiry: rawL.headerIntro || 'What were the consequences of these pivotal events?',
    teacher_notes: teacher_notes,
    learning_objectives: {
      overarching:
        rawL.headerIntro || 'To understand the causes and consequences of key US events, 1954-75.',
      scaffolded: [
        'Identify key historical figures, dates, and organisations.',
        'Explain the causal connections between legislation, protest, and backlash.',
        'Evaluate contrasting historical interpretations for Paper 3.',
      ],
    },
    do_now: {
      type: 'questions',
      title: 'Recall & Retrieval',
      instructions: 'Answer these questions in full sentences to activate prior knowledge.',
      items: doNowItems,
    },
    vocab: vocab,
    narrative_blocks: narrative_blocks,
    primary_source: primary_source,
    dualPerspective: rawL.dualPerspective || null,
    causalLinks: rawL.causalLinks || null,
  });
});

// Build 13 mock exam papers metadata
console.log('--- Step 4: Configuring 13 GCSE Mock Exams ---');
const mock_exams = PAST_PAPERS_DATA.map((p, idx) => {
  const isBestGuess = p.id.startsWith('mock_');
  const fileName = `usa_mock_${idx + 1}.html`;
  const msFileName = `usa_mock_${idx + 1}_mark_scheme.html`;

  return {
    id: `usa_mock_${idx + 1}`,
    rawId: p.id,
    title: p.title || `Paper 3 Exam Practice ${idx + 1}`,
    paper_reference: '1HI0/33',
    time_minutes: 80,
    total_marks: 52,
    enquiry_topic: p.enquiryTopic || '',
    url: fileName,
    mark_scheme_url: msFileName,
    has_mark_scheme: true,
    is_best_guess: isBestGuess,
    year: p.year || '2026',
  };
});

// Write units/usa/data.js
console.log('--- Step 5: Writing units/usa/data.js ---');
const unitDataObject = {
  specification_file: '/data/usa_spec.json',
  title: 'Paper 3: Conflict at Home and Abroad: the USA, 1954–75',
  enquiry_question:
    'Civil Rights and the Vietnam War: How did social and foreign crises transform the USA?',
  homepage_background: '/images/mlk_washington.jpg',
  category: 'Edexcel GCSE',
  desc: 'Paper 3 (1HI0/33)',
  icon: 'fa-flag-usa',
  color: '#2563eb',
  bg: 'rgba(37, 99, 235, 0.1)',
  yearGroup: 'Year 11',
  edition: '2026.1',
  workbooks: workbooks,
  timeline: timeline,
  key_individuals: key_individuals,
  mock_exams: mock_exams,
  lessons: lessons,
};

const dataJsContent = `// Auto-generated Paper 3 USA Unit Data
export const usa = ${JSON.stringify(unitDataObject, null, 2)};
export default usa;
`;

fs.writeFileSync(path.join(TARGET_DIR, 'data.js'), dataJsContent, 'utf8');
console.log('Successfully generated units/usa/data.js');

// Write mock HTML files and mark scheme files
console.log('--- Step 6: Generating 13 Mock HTML and Mark Scheme pages ---');

function generatePaperHtml(paper, mockMeta) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${paper.title} - Pearson Edexcel GCSE (9-1) History</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
    * { box-sizing: border-box; font-family: 'Open Sans', Arial, sans-serif; }
    body { margin: 0; padding: 0; background: #e0e0e0; color: #000; }
    .page { width: 210mm; min-height: 297mm; background: white; margin: 20mm auto; padding: 15mm; box-shadow: 0 0 15px rgba(0,0,0,0.2); position: relative; page-break-after: always; display: flex; flex-direction: column; }
    @media print { body { background: white; } .no-print { display: none !important; } .page { margin: 0; padding: 15mm; box-shadow: none; width: 100%; min-height: 100%; page-break-after: always; } }
    .cover-box { border: 3px solid #666; border-radius: 15px; padding: 15px 20px; margin-bottom: 20px; }
    .candidate-info { display: flex; gap: 15px; margin-bottom: 15px; }
    .input-box { border: 2px solid #666; border-radius: 5px; height: 35px; background: white; flex: 1; }
    .char-box { border: 2px solid #666; border-radius: 5px; height: 35px; width: 25px; display: inline-block; background: white; margin-right: 2px; }
    .edexcel-title { font-size: 26px; font-weight: 700; margin: 15px 0 5px 0; }
    .dotted-line { border-bottom: 1px dotted #888; height: 26px; margin-bottom: 2px; }
    .source-box { border: 2px solid #333; padding: 14px; margin: 15px 0; background: #fafafa; border-radius: 6px; }
    .provenance { font-style: italic; font-size: 13px; margin-bottom: 8px; color: #333; }
    .source-content { font-size: 14px; line-height: 1.5; }
    .question-title { font-weight: bold; font-size: 15px; margin-top: 15px; }
    .mark-scheme-banner { background: #1e3a8a; color: white; padding: 12px 18px; border-radius: 8px; margin-bottom: 20px; font-weight: bold; font-size: 16px; }
  </style>
</head>
<body>

  <!-- Cover Page -->
  <div class="page">
    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
      <div>
        <div style="font-size: 13px; font-weight: bold;">Candidate Number</div>
        <div style="margin-top: 4px;">
          <div class="char-box"></div><div class="char-box"></div><div class="char-box"></div><div class="char-box"></div>
        </div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 13px; font-weight: bold;">Paper Reference</div>
        <div style="font-size: 18px; font-weight: 800; margin-top: 4px;">1HI0/33</div>
      </div>
    </div>

    <div class="edexcel-title">Pearson Edexcel GCSE (9–1)</div>
    <div style="font-size: 20px; font-weight: bold; margin-bottom: 25px;">History</div>
    <div style="font-size: 16px; font-weight: bold; border-top: 2px solid #000; padding-top: 10px;">
      PAPER 3: Modern Depth Study
    </div>
    <div style="font-size: 15px; margin-bottom: 20px;">
      Option 33: The USA, 1954–75: conflict at home and abroad
    </div>

    <div class="cover-box" style="margin-top: 20px;">
      <div style="font-weight: bold; font-size: 14px; margin-bottom: 10px;">Instructions</div>
      <ul style="font-size: 13px; line-height: 1.6; margin: 0; padding-left: 20px;">
        <li>Use black ink or ball-point pen.</li>
        <li>Answer ALL questions in Section A and Section B.</li>
        <li>Time allowed: <strong>1 hour 20 minutes</strong> (52 marks + 4 SPaG = 56 marks total).</li>
      </ul>
    </div>

    <div style="margin-top: auto; text-align: right; font-weight: bold; font-size: 14px;">
      Turn over ▶
    </div>
  </div>

  <!-- SECTION A -->
  <div class="page">
    <div style="font-weight: bold; font-size: 18px; border-bottom: 2px solid #000; padding-bottom: 5px; margin-bottom: 15px;">
      SECTION A
    </div>
    <p style="font-size: 13px; font-style: italic;">Answer Question 1 and Question 2.</p>

    <!-- Question 1 -->
    <div class="question-title">
      1. Give two things you can infer from Source A about Southern resistance to civil rights. (4 marks)
    </div>

    <div class="source-box">
      <div class="provenance">Source A: ${paper.sourceA ? paper.sourceA.provenance : 'Historical source from the 1950s.'}</div>
      <div class="source-content">${paper.sourceA ? paper.sourceA.content : 'Source text content.'}</div>
    </div>

    <div style="margin-top: 10px; font-size: 13px; font-weight: bold;">(i) What I can infer:</div>
    <div class="dotted-line"></div><div class="dotted-line"></div>
    <div style="margin-top: 10px; font-size: 13px; font-weight: bold;">Details in the source that tell me this:</div>
    <div class="dotted-line"></div><div class="dotted-line"></div>

    <div style="margin-top: 15px; font-size: 13px; font-weight: bold;">(ii) What I can infer:</div>
    <div class="dotted-line"></div><div class="dotted-line"></div>
    <div style="margin-top: 10px; font-size: 13px; font-weight: bold;">Details in the source that tell me this:</div>
    <div class="dotted-line"></div><div class="dotted-line"></div>
  </div>

  <!-- Question 2 -->
  <div class="page">
    <div class="question-title">
      2. ${paper.q2 ? paper.q2.question : 'Explain why tension escalated during this period. (12 marks)'}
    </div>
    ${paper.q2 && paper.q2.stimulus ? `<div style="background: #f1f5f9; padding: 10px; border-radius: 4px; font-size: 13px; margin: 10px 0;">You may use the following in your answer: <ul>${paper.q2.stimulus.map((s) => `<li>${s}</li>`).join('')}</ul> You must also use information of your own.</div>` : ''}
    ${Array.from({ length: 24 })
      .map(() => '<div class="dotted-line"></div>')
      .join('')}
  </div>

  <!-- SECTION B -->
  <div class="page">
    <div style="font-weight: bold; font-size: 18px; border-bottom: 2px solid #000; padding-bottom: 5px; margin-bottom: 15px;">
      SECTION B
    </div>
    <p style="font-size: 13px; font-style: italic;">For an enquiry into: ${paper.enquiryTopic || 'the conflict in the USA'}</p>

    <!-- Source B & C -->
    <div class="source-box">
      <div class="provenance">Source B: ${paper.sourceB ? paper.sourceB.provenance : ''}</div>
      <div class="source-content">${paper.sourceB ? paper.sourceB.content : ''}</div>
    </div>
    <div class="source-box">
      <div class="provenance">Source C: ${paper.sourceC ? paper.sourceC.provenance : ''}</div>
      <div class="source-content">${paper.sourceC ? paper.sourceC.content : ''}</div>
    </div>

    <!-- Question 3(a) -->
    <div class="question-title">
      3 (a) ${paper.q3a ? paper.q3a.question : 'How useful are Sources B and C for an enquiry into this topic? (8 marks)'}
    </div>
    ${Array.from({ length: 12 })
      .map(() => '<div class="dotted-line"></div>')
      .join('')}
  </div>

  <!-- Interpretations 1 & 2 -->
  <div class="page">
    <div class="source-box">
      <div class="provenance">Interpretation 1: From a modern historical study.</div>
      <div class="source-content">${paper.interpretation1 ? paper.interpretation1.content : paper.q3b ? paper.q3b.question : ''}</div>
    </div>
    <div class="source-box">
      <div class="provenance">Interpretation 2: From a different historical perspective.</div>
      <div class="source-content">${paper.interpretation2 ? paper.interpretation2.content : ''}</div>
    </div>

    <!-- Question 3(b) & 3(c) -->
    <div class="question-title">
      3 (b) ${paper.q3b ? paper.q3b.question : 'Study Interpretations 1 and 2. What is the main difference between these views? (4 marks)'}
    </div>
    ${Array.from({ length: 6 })
      .map(() => '<div class="dotted-line"></div>')
      .join('')}

    <div class="question-title" style="margin-top: 15px;">
      3 (c) ${paper.q3c ? paper.q3c.question : 'Suggest one reason why Interpretations 1 and 2 give different views. (4 marks)'}
    </div>
    ${Array.from({ length: 6 })
      .map(() => '<div class="dotted-line"></div>')
      .join('')}
  </div>

  <!-- Question 3(d) 16 marks -->
  <div class="page">
    <div class="question-title">
      3 (d) ${paper.q3d ? paper.q3d.question : 'How far do you agree with Interpretation 2? (16 marks + 4 marks SPaG)'}
    </div>
    ${Array.from({ length: 24 })
      .map(() => '<div class="dotted-line"></div>')
      .join('')}
  </div>

  <script src="/scripts/exam_timer.js"></script>
</body>
</html>`;
}

function generateMarkSchemeHtml(paper, mockMeta) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Teacher Mark Scheme: ${paper.title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
    * { box-sizing: border-box; font-family: 'Open Sans', Arial, sans-serif; }
    body { margin: 0; padding: 25px; background: #f8fafc; color: #0f172a; max-width: 900px; margin: 0 auto; }
    .banner { background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); color: white; padding: 25px; border-radius: 10px; margin-bottom: 25px; }
    .q-card { background: white; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); }
    .q-title { font-weight: 800; font-size: 1.1rem; color: #1e3a8a; margin-bottom: 8px; }
    .clue-box { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 10px 14px; border-radius: 4px; font-size: 0.9rem; margin-bottom: 12px; }
    .model-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 6px; font-size: 0.95rem; line-height: 1.6; white-space: pre-wrap; }
    .print-btn { background: #0284c7; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; margin-bottom: 15px; }
    @media print { .no-print { display: none !important; } body { padding: 0; background: white; } .q-card { box-shadow: none; border: 1px solid #ccc; page-break-inside: avoid; } }
  </style>
</head>
<body>
  <div class="no-print" style="display: flex; justify-content: space-between; align-items: center;">
    <a href="/#unit=usa&view=mock-exams" style="color: #0284c7; text-decoration: none; font-weight: bold;">← Back to Mock Exams Hub</a>
    <button class="print-btn" onclick="window.print()">🖨️ Print Teacher Mark Scheme</button>
  </div>

  <div class="banner">
    <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: #93c5fd; font-weight: 700;">Pearson Edexcel GCSE (9–1) History Mark Scheme</div>
    <h1 style="margin: 6px 0 0 0; font-size: 1.6rem;">${paper.title}</h1>
    <div style="margin-top: 6px; font-size: 0.95rem; color: #cbd5e1;">Paper 3: Conflict at Home and Abroad: the USA, 1954–75 (1HI0/33)</div>
  </div>

  <!-- Question 1 -->
  <div class="q-card">
    <div class="q-title">Question 1: Inference from Source A (4 Marks)</div>
    <div class="clue-box"><strong>Target:</strong> AO3 (4 marks). Award 1 mark for each valid inference, up to 2. Award 1 mark for each corresponding quote/detail, up to 2.</div>
    <div class="model-box"><strong>Sample Acceptable Inferences:</strong>
• Inference 1: Southern officials deliberately created impossible barriers to block Black citizens from exercising their constitutional voting rights.
  - Detail from source: "Local registrars administer arbitrary 'literacy exams' that require Black applicants to interpret intricate constitutional clauses..."
• Inference 2: Black citizens faced economic reprisal and terrorism for attempting to register.
  - Detail from source: "any Black citizen attempting to register risks immediate dismissal by their employer. Intimidation is omnipresent."</div>
  </div>

  <!-- Question 2 -->
  <div class="q-card">
    <div class="q-title">Question 2: Causal Explanation (12 Marks)</div>
    <div class="clue-box"><strong>Target:</strong> AO1/AO2 (12 marks). Level 4 (10–12 marks): An analytical explanation showing a line of reasoning with clear links to the outcome, supported by accurate, detailed knowledge.</div>
    <div class="model-box">${paper.q2 && paper.q2.model ? paper.q2.model.replace(/\[\[/g, '<strong>').replace(/\]\]/g, '</strong>').replace(/\{\{/g, '<em>').replace(/\}\}/g, '</em>') : 'Level 4 model answers available in teacher pack.'}</div>
  </div>

  <!-- Question 3(a) -->
  <div class="q-card">
    <div class="q-title">Question 3(a): Source Utility (8 Marks)</div>
    <div class="clue-box"><strong>Target:</strong> AO3 (8 marks). Assess content utility, verify with contextual knowledge, and evaluate provenance reliability and limitations for BOTH sources.</div>
    <div class="model-box">${paper.q3a && paper.q3a.model ? paper.q3a.model : 'Assesses utility using content, contextual knowledge, and provenance evaluation.'}</div>
  </div>

  <!-- Question 3(b) -->
  <div class="q-card">
    <div class="q-title">Question 3(b): Difference Between Interpretations (4 Marks)</div>
    <div class="clue-box"><strong>Target:</strong> AO4 (4 marks). Identify the main difference of view, supported by details from both interpretations.</div>
    <div class="model-box">${paper.q3b && paper.q3b.model ? paper.q3b.model.replace(/\[1\[/g, '<strong>"').replace(/\]1\]/g, '"</strong>') : ''}</div>
  </div>

  <!-- Question 3(c) -->
  <div class="q-card">
    <div class="q-title">Question 3(c): Reason for Difference in Interpretations (4 Marks)</div>
    <div class="clue-box"><strong>Target:</strong> AO4 (4 marks). Explain how the historians may have relied on different sources to reach their views.</div>
    <div class="model-box">${paper.q3c && paper.q3c.model ? paper.q3c.model.replace(/\[1\[/g, '<strong>"').replace(/\]1\]/g, '"</strong>') : ''}</div>
  </div>

  <!-- Question 3(d) -->
  <div class="q-card">
    <div class="q-title">Question 3(d): Evaluation of Interpretation (16 Marks + 4 SPaG)</div>
    <div class="clue-box"><strong>Target:</strong> AO4 (16 marks) + SPaG (4 marks). Level 4 (13–16 marks): Balanced discussion analyzing both interpretations with sustained contextual knowledge, leading to a justified judgment.</div>
    <div class="model-box">${paper.q3d && paper.q3d.model ? paper.q3d.model.replace(/\[\[/g, '<strong>').replace(/\]\]/g, '</strong>').replace(/\[1\[/g, '<strong>"').replace(/\]1\]/g, '"</strong>').replace(/\{\{/g, '<em>').replace(/\}\}/g, '</em>') : ''}</div>
  </div>
</body>
</html>`;
}

PAST_PAPERS_DATA.forEach((paper, idx) => {
  const meta = mock_exams[idx];
  const paperHtml = generatePaperHtml(paper, meta);
  const msHtml = generateMarkSchemeHtml(paper, meta);

  fs.writeFileSync(path.join(PUBLIC_USA_DIR, meta.url), paperHtml, 'utf8');
  fs.writeFileSync(path.join(PUBLIC_USA_DIR, meta.mark_scheme_url), msHtml, 'utf8');
});

console.log('Generated 13 mock exam HTML papers and 13 teacher mark scheme files.');
console.log('🎉 Step 7: Complete! Ready to compile into database.json.');
