const fs = require('fs');
const path = require('path');

const units = [
  {
    id: 'edexcel_medicine',
    file: 'public/data/edexcel_medicine.json',
    title: 'Medicine Through Time (Paper 1)',
  },
  {
    id: 'cme_new',
    file: 'public/data/cme_new.json',
    title: 'Conflict in the Middle East (Paper 2)',
  },
  { id: 'eee', file: 'public/data/eee.json', title: 'Early Elizabethan England (Paper 2)' },
  {
    id: 'weimar_nazi_germany',
    file: 'public/data/weimar_nazi_germany.json',
    title: 'Weimar & Nazi Germany (Paper 3)',
  },
  {
    id: 'usa',
    file: 'public/data/usa.json',
    title: 'USA 1954–75: Conflict at Home and Abroad (Paper 3)',
  },
];

const results = {};

units.forEach((u) => {
  try {
    const raw = fs.readFileSync(u.file, 'utf8');
    const data = JSON.parse(raw);
    const lessons =
      data.lessons || (data.data && data.data.lessons) || (Array.isArray(data) ? data : []);

    const keyCounts = {};
    const subFeatureStats = {
      do_now_count: 0,
      do_now_types: {},
      sources_count: 0,
      sources_total: 0,
      sources_with_provenance: 0,
      sources_with_hinge_question: 0,
      key_individuals_count: 0,
      individuals_total: 0,
      guided_reading_count: 0,
      guided_reading_sections_total: 0,
      tasks_count: 0,
      tasks_total: 0,
      quizzes_count: 0,
      quizzes_questions_total: 0,
      exam_questions_count: 0,
      exam_questions_total: 0,
      exam_question_types: {},
      teacher_notes_count: 0,
      flashcards_count: 0,
      flashcards_total: 0,
      vocab_count: 0,
      vocab_total: 0,
      vocab_cloze_count: 0,
      causal_domino_count: 0,
    };

    lessons.forEach((l, idx) => {
      Object.keys(l).forEach((k) => {
        keyCounts[k] = (keyCounts[k] || 0) + 1;
      });

      // Check Do Now
      const doNow = l.do_now || l.starter || l.retrieval_starter;
      if (doNow) {
        subFeatureStats.do_now_count++;
        const type = Array.isArray(doNow) ? 'array' : typeof doNow;
        subFeatureStats.do_now_types[type] = (subFeatureStats.do_now_types[type] || 0) + 1;
      }

      // Check Sources
      const sources =
        l.sources ||
        l.primary_sources ||
        l.visual_sources ||
        (l.primary_source ? [l.primary_source] : null);
      if (sources && Array.isArray(sources) && sources.length > 0) {
        subFeatureStats.sources_count++;
        subFeatureStats.sources_total += sources.length;
        sources.forEach((s) => {
          if (s.provenance || s.caption || s.attribution) subFeatureStats.sources_with_provenance++;
          if (
            s.hinge_question ||
            (s.teacher_notes && s.teacher_notes.hinge_question) ||
            (s.source_context && s.source_context.toLowerCase().includes('hinge'))
          ) {
            subFeatureStats.sources_with_hinge_question++;
          }
        });
      }

      // Check Key Individuals
      const inds = l.key_individuals || l.individuals || l.people;
      if (inds && Array.isArray(inds) && inds.length > 0) {
        subFeatureStats.key_individuals_count++;
        subFeatureStats.individuals_total += inds.length;
      }

      // Check Guided Reading / Content Sections
      const reading =
        l.guided_reading || l.sections || l.content_blocks || l.narrative || l.narrative_blocks;
      if (reading && Array.isArray(reading) && reading.length > 0) {
        subFeatureStats.guided_reading_count++;
        subFeatureStats.guided_reading_sections_total += reading.length;
      }

      // Check Tasks / Activities
      const tasks = l.tasks || l.activities || l.learning_tasks;
      if (tasks && Array.isArray(tasks) && tasks.length > 0) {
        subFeatureStats.tasks_count++;
        subFeatureStats.tasks_total += tasks.length;
      }

      // Check Quizzes
      const quiz =
        l.quiz ||
        l.quick_quiz ||
        l.retrieval_quiz ||
        l.check_for_understanding ||
        l.knowledge_check;
      if (quiz) {
        subFeatureStats.quizzes_count++;
        const qCount = Array.isArray(quiz)
          ? quiz.length
          : quiz.questions
            ? quiz.questions.length
            : 0;
        subFeatureStats.quizzes_questions_total += qCount;
      }

      // Check Exam Questions
      const eq = l.exam_questions || l.exam_practice || l.exam || l.gcse_task;
      if (eq) {
        subFeatureStats.exam_questions_count++;
        const list = Array.isArray(eq) ? eq : eq.questions ? eq.questions.length : [eq];
        subFeatureStats.exam_questions_total += Array.isArray(list) ? list.length : 1;
        if (Array.isArray(list)) {
          list.forEach((q) => {
            const marks = q.marks || q.tariff || q.type || 'unknown';
            subFeatureStats.exam_question_types[marks] =
              (subFeatureStats.exam_question_types[marks] || 0) + 1;
          });
        }
      }

      if (l.teacher_notes) subFeatureStats.teacher_notes_count++;

      // Check Flashcards
      if (l.flashcards && Array.isArray(l.flashcards) && l.flashcards.length > 0) {
        subFeatureStats.flashcards_count++;
        subFeatureStats.flashcards_total += l.flashcards.length;
      }

      // Check Vocab
      if (l.vocab && Array.isArray(l.vocab) && l.vocab.length > 0) {
        subFeatureStats.vocab_count++;
        subFeatureStats.vocab_total += l.vocab.length;
      }

      // Check Cloze Text
      if (l.vocab_cloze_text) {
        subFeatureStats.vocab_cloze_count++;
      }

      // Check Causal Domino Spine
      if (
        l.causal_domino_spine &&
        Array.isArray(l.causal_domino_spine.stages) &&
        l.causal_domino_spine.stages.length > 0
      ) {
        subFeatureStats.causal_domino_count++;
      }
    });

    results[u.id] = {
      title: u.title,
      lessonCount: lessons.length,
      subFeatureStats,
    };
  } catch (err) {
    results[u.id] = { error: err.message };
  }
});

fs.writeFileSync('scripts/audit_gcse_results.json', JSON.stringify(results, null, 2));

console.log(
  '\n========================================================================================',
);
console.log('              GCSE UNITS FEATURE PARITY & ALIGNMENT MATRIX AUDIT');
console.log(
  '========================================================================================',
);
console.log(
  'Unit'.padEnd(25) +
    'Lessons'.padStart(8) +
    'DoNow'.padStart(8) +
    'Quiz'.padStart(8) +
    'ExamQ'.padStart(8) +
    'Flashcards'.padStart(12) +
    'Vocab'.padStart(8) +
    'Cloze'.padStart(8) +
    'Domino'.padStart(8),
);
console.log('-'.repeat(93));

units.forEach((u) => {
  const r = results[u.id];
  if (r.error) {
    console.log(`${u.id.padEnd(25)} ERROR: ${r.error}`);
    return;
  }
  const s = r.subFeatureStats;
  const lCount = r.lessonCount;
  const doNowStr = `${s.do_now_count}/${lCount}`;
  const quizStr = `${s.quizzes_count}/${lCount}`;
  const examStr = `${s.exam_questions_count}/${lCount}`;
  const fcStr = `${s.flashcards_count}/${lCount} (${s.flashcards_total})`;
  const vocabStr = `${s.vocab_count}/${lCount}`;
  const clozeStr = `${s.vocab_cloze_count}/${lCount}`;
  const dominoStr = `${s.causal_domino_count}/${lCount}`;

  console.log(
    u.id.padEnd(25) +
      String(lCount).padStart(8) +
      doNowStr.padStart(8) +
      quizStr.padStart(8) +
      examStr.padStart(8) +
      fcStr.padStart(12) +
      vocabStr.padStart(8) +
      clozeStr.padStart(8) +
      dominoStr.padStart(8),
  );
});
console.log(
  '========================================================================================\n',
);
