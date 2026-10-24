const fs = require('fs');
const path = require('path');

const gcseUnits = [
  {
    id: 'edexcel_medicine',
    file: 'public/data/edexcel_medicine.json',
    paper: 'Paper 1: Thematic & Historic Environment',
  },
  {
    id: 'cme_new',
    file: 'public/data/cme_new.json',
    paper: 'Paper 2: Period Study (Conflict in Middle East)',
  },
  {
    id: 'eee',
    file: 'public/data/eee.json',
    paper: 'Paper 2: British Depth Study (Early Elizabethan England)',
  },
  {
    id: 'weimar_nazi_germany',
    file: 'public/data/weimar_nazi_germany.json',
    paper: 'Paper 3: Modern Depth Study (Weimar & Nazi Germany)',
  },
  { id: 'usa', file: 'public/data/usa.json', paper: 'Paper 3: Modern Depth Study (USA 1954–75)' },
];

const audit = {};

gcseUnits.forEach((u) => {
  const filePath = path.resolve(u.file);
  if (!fs.existsSync(filePath)) {
    audit[u.id] = { error: 'File does not exist: ' + filePath };
    return;
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  let json;
  try {
    json = JSON.parse(raw);
  } catch (e) {
    audit[u.id] = { error: 'Failed to parse JSON: ' + e.message };
    return;
  }

  const isDataWrapped = !!json.data;
  const root = isDataWrapped ? json.data : json;
  const lessons = root.lessons || [];

  const unitSummary = {
    paper: u.paper,
    title: root.title || json.title,
    isDataWrapped,
    unitLevelFeatures: {
      hasTimeline: !!(root.timeline || json.timeline),
      hasKeyIndividuals: !!(root.key_individuals || json.key_individuals || json.biographies),
      keyIndividualsCount: (root.key_individuals || json.key_individuals || json.biographies || [])
        .length,
      hasMockExams: !!(root.mock_exams || json.mock_exams),
      hasWorkbooks: !!(root.workbooks || json.workbooks),
      hasGlossary: !!(root.glossary || json.glossary),
      hasSpecFile: !!(root.specification_file || json.specification_file),
      hasDebatePrompts: !!(root.debatePrompts || json.debatePrompts),
      hasGeographicalLocations: !!(root.geographical_locations || json.geographical_locations),
    },
    lessonCount: lessons.length,
    idFormats: [],
    // Metrics across all lessons
    metrics: {
      doNow: {
        presentCount: 0,
        missingCount: 0,
        types: {},
        avgQuestions: 0,
        hasAnswersCount: 0,
      },
      enquiryQuestion: {
        presentCount: 0,
        missingCount: 0,
      },
      learningObjectives: {
        presentCount: 0,
        formats: {},
      },
      vocab: {
        presentCount: 0,
        formats: {},
        clozeCount: 0,
      },
      hookText: {
        presentCount: 0,
      },
      causalDominoSpine: {
        presentCount: 0,
      },
      narrativeBlocks: {
        presentCount: 0,
        totalBlocks: 0,
        avgBlocksPerLesson: 0,
      },
      sources: {
        presentCount: 0,
        totalSources: 0,
        avgSourcesPerLesson: 0,
        withCaption: 0,
        withProvenance: 0,
        withHingeQuestion: 0,
      },
      keyIndividualsInLesson: {
        presentCount: 0,
        formats: {},
      },
      videos: {
        presentCount: 0,
        totalVideos: 0,
      },
      quizzes: {
        quickQuizCount: 0,
        quizCount: 0,
        totalQuizQuestions: 0,
        types: {},
      },
      flashcards: {
        presentCount: 0,
        totalCards: 0,
      },
      examPractice: {
        presentCount: 0,
        missingCount: 0,
        formats: {},
        totalQuestions: 0,
        markTariffs: {},
        hasModelAnswerCount: 0,
        hasMarkSchemeCount: 0,
        hasSentenceStartersCount: 0,
      },
      teacherNotes: {
        presentCount: 0,
        hasDeliveryPlan: 0,
        hasMisconceptions: 0,
      },
      drawTasks: {
        presentCount: 0,
      },
      exitTickets: {
        presentCount: 0,
      },
      pairShare: {
        presentCount: 0,
      },
    },
    // Detailed list of lesson-by-lesson gaps
    lessonDetails: [],
  };

  let totalDoNowQuestions = 0;
  let totalQuizQuestions = 0;
  let totalExamQuestions = 0;

  lessons.forEach((l, idx) => {
    unitSummary.idFormats.push(l.id || `idx_${idx}`);

    const detail = {
      index: idx,
      id: l.id,
      title: l.title,
      hasEnquiry: !!(l.enquiry_question || l.enquiry),
      hasDoNow: !!l.do_now,
      doNowFormat: l.do_now ? (Array.isArray(l.do_now) ? 'array' : typeof l.do_now) : 'none',
      hasObjectives: !!(l.learning_objectives || l.learning_objective),
      hasVocab: !!l.vocab,
      hasVocabCloze: !!l.vocab_cloze_text,
      hasHook: !!l.hook_text,
      hasSpine: !!l.causal_domino_spine,
      narrativeCount: (l.narrative_blocks || l.guided_reading || []).length,
      sourceCount: (l.sources || []).length,
      sourcesWithHinge: (l.sources || []).filter(
        (s) => s.hinge_question || (s.teacher_notes && s.teacher_notes.hinge_question),
      ).length,
      hasKeyInd: !!(l.key_individual || l.key_individuals),
      videoCount: (l.video ? 1 : 0) + (l.extra_videos ? l.extra_videos.length : 0),
      hasQuickQuiz: !!l.quick_quiz,
      hasQuiz: !!l.quiz,
      hasFlashcards: !!l.flashcards,
      flashcardCount: Array.isArray(l.flashcards) ? l.flashcards.length : 0,
      hasExam: !!(l.exam_practice || l.gcse_task || l.exam_questions),
      examFormat: l.exam_practice
        ? 'exam_practice'
        : l.gcse_task
          ? 'gcse_task'
          : l.exam_questions
            ? 'exam_questions'
            : 'none',
      hasTeacherNotes: !!l.teacher_notes,
    };
    unitSummary.lessonDetails.push(detail);

    // Accumulate metrics
    // Do Now
    if (l.do_now) {
      unitSummary.metrics.doNow.presentCount++;
      const fmt = Array.isArray(l.do_now) ? 'array' : typeof l.do_now;
      unitSummary.metrics.doNow.types[fmt] = (unitSummary.metrics.doNow.types[fmt] || 0) + 1;
      if (Array.isArray(l.do_now)) {
        totalDoNowQuestions += l.do_now.length;
        if (l.do_now.some((q) => q.answer || q.model_answer))
          unitSummary.metrics.doNow.hasAnswersCount++;
      } else if (typeof l.do_now === 'object') {
        const questions = l.do_now.questions || l.do_now.retrieval_questions || [];
        totalDoNowQuestions += questions.length;
        if (questions.some((q) => q.answer || q.model_answer))
          unitSummary.metrics.doNow.hasAnswersCount++;
      }
    } else {
      unitSummary.metrics.doNow.missingCount++;
    }

    // Enquiry
    if (l.enquiry_question || l.enquiry) unitSummary.metrics.enquiryQuestion.presentCount++;
    else unitSummary.metrics.enquiryQuestion.missingCount++;

    // Objectives
    if (l.learning_objectives) {
      unitSummary.metrics.learningObjectives.presentCount++;
      const fmt = Array.isArray(l.learning_objectives) ? 'array' : typeof l.learning_objectives;
      unitSummary.metrics.learningObjectives.formats[fmt] =
        (unitSummary.metrics.learningObjectives.formats[fmt] || 0) + 1;
    } else if (l.learning_objective) {
      unitSummary.metrics.learningObjectives.presentCount++;
      unitSummary.metrics.learningObjectives.formats['singular_string'] =
        (unitSummary.metrics.learningObjectives.formats['singular_string'] || 0) + 1;
    }

    // Vocab
    if (l.vocab) {
      unitSummary.metrics.vocab.presentCount++;
      const fmt = Array.isArray(l.vocab) ? 'array' : typeof l.vocab;
      unitSummary.metrics.vocab.formats[fmt] = (unitSummary.metrics.vocab.formats[fmt] || 0) + 1;
    }
    if (l.vocab_cloze_text) unitSummary.metrics.vocab.clozeCount++;

    // Hook
    if (l.hook_text) unitSummary.metrics.hookText.presentCount++;

    // Spine
    if (l.causal_domino_spine) unitSummary.metrics.causalDominoSpine.presentCount++;

    // Narrative Blocks
    const nb = l.narrative_blocks || l.guided_reading || [];
    if (nb.length > 0) {
      unitSummary.metrics.narrativeBlocks.presentCount++;
      unitSummary.metrics.narrativeBlocks.totalBlocks += nb.length;
    }

    // Sources
    const srcs = l.sources || [];
    if (srcs.length > 0) {
      unitSummary.metrics.sources.presentCount++;
      unitSummary.metrics.sources.totalSources += srcs.length;
      srcs.forEach((s) => {
        if (s.caption || s.title) unitSummary.metrics.sources.withCaption++;
        if (s.provenance || s.author || s.origin) unitSummary.metrics.sources.withProvenance++;
        if (
          s.hinge_question ||
          (s.teacher_notes && s.teacher_notes.hinge_question) ||
          (s.source_context && s.source_context.toLowerCase().includes('hinge'))
        ) {
          unitSummary.metrics.sources.withHingeQuestion++;
        }
      });
    }

    // Key Individuals
    if (l.key_individual) {
      unitSummary.metrics.keyIndividualsInLesson.presentCount++;
      unitSummary.metrics.keyIndividualsInLesson.formats['singular_object'] =
        (unitSummary.metrics.keyIndividualsInLesson.formats['singular_object'] || 0) + 1;
    } else if (l.key_individuals) {
      unitSummary.metrics.keyIndividualsInLesson.presentCount++;
      unitSummary.metrics.keyIndividualsInLesson.formats['array'] =
        (unitSummary.metrics.keyIndividualsInLesson.formats['array'] || 0) + 1;
    }

    // Videos
    const vCount = (l.video ? 1 : 0) + (l.extra_videos ? l.extra_videos.length : 0);
    if (vCount > 0) {
      unitSummary.metrics.videos.presentCount++;
      unitSummary.metrics.videos.totalVideos += vCount;
    }

    // Quizzes
    if (l.quick_quiz) {
      unitSummary.metrics.quizzes.quickQuizCount++;
      const qList = Array.isArray(l.quick_quiz) ? l.quick_quiz : l.quick_quiz.questions || [];
      unitSummary.metrics.quizzes.totalQuizQuestions += qList.length;
      totalQuizQuestions += qList.length;
    }
    if (l.quiz) {
      unitSummary.metrics.quizzes.quizCount++;
      const qList = Array.isArray(l.quiz) ? l.quiz : l.quiz.questions || [];
      unitSummary.metrics.quizzes.totalQuizQuestions += qList.length;
      totalQuizQuestions += qList.length;
    }

    // Flashcards
    if (l.flashcards && Array.isArray(l.flashcards)) {
      unitSummary.metrics.flashcards.presentCount++;
      unitSummary.metrics.flashcards.totalCards += l.flashcards.length;
    }

    // Exam Practice
    const exam = l.exam_practice || l.gcse_task || l.exam_questions;
    if (exam) {
      unitSummary.metrics.examPractice.presentCount++;
      const fmt = l.exam_practice ? 'exam_practice' : l.gcse_task ? 'gcse_task' : 'exam_questions';
      unitSummary.metrics.examPractice.formats[fmt] =
        (unitSummary.metrics.examPractice.formats[fmt] || 0) + 1;

      const qList = Array.isArray(exam) ? exam : exam.questions ? exam.questions : [exam];
      totalExamQuestions += qList.length;
      unitSummary.metrics.examPractice.totalQuestions += qList.length;

      qList.forEach((q) => {
        const tariff = q.marks || q.mark || q.tariff || q.type || 'unknown';
        unitSummary.metrics.examPractice.markTariffs[tariff] =
          (unitSummary.metrics.examPractice.markTariffs[tariff] || 0) + 1;
        if (q.model_answer || q.modelAnswer || q.exemplar)
          unitSummary.metrics.examPractice.hasModelAnswerCount++;
        if (q.mark_scheme || q.rubric || q.indicative_content)
          unitSummary.metrics.examPractice.hasMarkSchemeCount++;
        if (q.sentence_starters || q.scaffolds || q.sentenceStarters)
          unitSummary.metrics.examPractice.hasSentenceStartersCount++;
      });
    } else {
      unitSummary.metrics.examPractice.missingCount++;
    }

    // Teacher Notes
    if (l.teacher_notes) {
      unitSummary.metrics.teacherNotes.presentCount++;
      if (typeof l.teacher_notes === 'object') {
        if (l.teacher_notes.delivery_plan || l.teacher_notes.plan)
          unitSummary.metrics.teacherNotes.hasDeliveryPlan++;
        if (l.teacher_notes.misconceptions || l.teacher_notes.common_misconceptions)
          unitSummary.metrics.teacherNotes.hasMisconceptions++;
      }
    }

    if (l.draw_tasks) unitSummary.metrics.drawTasks.presentCount++;
    if (l.exit_ticket) unitSummary.metrics.exitTickets.presentCount++;
    if (l.pair_share) unitSummary.metrics.pairShare.presentCount++;
  });

  if (lessons.length > 0) {
    unitSummary.metrics.doNow.avgQuestions = (
      totalDoNowQuestions / (unitSummary.metrics.doNow.presentCount || 1)
    ).toFixed(1);
    unitSummary.metrics.narrativeBlocks.avgBlocksPerLesson = (
      unitSummary.metrics.narrativeBlocks.totalBlocks / lessons.length
    ).toFixed(1);
    unitSummary.metrics.sources.avgSourcesPerLesson = (
      unitSummary.metrics.sources.totalSources / lessons.length
    ).toFixed(1);
  }

  audit[u.id] = unitSummary;
});

fs.writeFileSync('scripts/audit_gcse_detailed.json', JSON.stringify(audit, null, 2));
console.log('Detailed audit finished. File written to scripts/audit_gcse_detailed.json');
