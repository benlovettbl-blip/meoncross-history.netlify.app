/**
 * STAGE QUESTION & CAUSAL DOMINO SCHEMA
 * Canonical single source of truth for the 5-Stage Chronological Inquiry Spine.
 * Enforces uniform schema standards between printed pupil workbooks and digital web app lessons.
 */

/**
 * Validates a single stage object against the canonical 5-stage schema.
 * @param {Object} stage
 * @param {string|number} lessonId
 * @param {number} stageIndex
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateStageObject(stage, lessonId = '', stageIndex = 0) {
  const errors = [];
  if (!stage || typeof stage !== 'object') {
    return { valid: false, errors: ['Stage is not an object'] };
  }

  // 1. Step number validation
  const expectedStep = stageIndex + 1;
  if (typeof stage.step !== 'number' || stage.step < 1 || stage.step > 5) {
    errors.push(`Invalid stage step: ${stage.step} (expected 1..5)`);
  } else if (stage.step !== expectedStep) {
    errors.push(`Stage step mismatch: got ${stage.step}, expected ${expectedStep}`);
  }

  // 2. Date validation
  if (!stage.date || typeof stage.date !== 'string' || stage.date.trim().length === 0) {
    errors.push('Stage date is missing or empty');
  }

  // 3. Question validation (must be non-empty, end with ?, and have sufficient depth)
  if (!stage.question || typeof stage.question !== 'string') {
    errors.push('Stage question is missing or not a string');
  } else {
    const qTrimmed = stage.question.trim();
    if (qTrimmed.length < 10) {
      errors.push(`Stage question too short (${qTrimmed.length} chars): "${qTrimmed}"`);
    }
    if (!qTrimmed.endsWith('?')) {
      errors.push(`Stage question does not end with question mark: "${qTrimmed}"`);
    }
    // Check for prohibited corporate AI filler
    const prohibited = [/specification mastery/i, /disciplinary synthesis/i, /holistic framework/i];
    prohibited.forEach((pattern) => {
      if (pattern.test(qTrimmed)) {
        errors.push(`Stage question contains prohibited jargon: "${qTrimmed}"`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validates all stages in a lesson's causal domino spine.
 * @param {Object} lesson
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateLessonStages(lesson) {
  const errors = [];
  const lessonId = lesson?.id || 'unknown';

  if (!lesson || !lesson.causal_domino_spine) {
    return { valid: true, errors: [] }; // Lessons without spines are skipped
  }

  const spine = lesson.causal_domino_spine;
  if (!Array.isArray(spine.stages)) {
    return { valid: false, errors: [`${lessonId}: causal_domino_spine.stages is not an array`] };
  }

  if (spine.stages.length !== 5) {
    errors.push(
      `${lessonId}: Expected exactly 5 stages in causal_domino_spine, got ${spine.stages.length}`,
    );
  }

  spine.stages.forEach((st, idx) => {
    const res = validateStageObject(st, lessonId, idx);
    if (!res.valid) {
      res.errors.forEach((e) => errors.push(`${lessonId} [Stage ${idx + 1}]: ${e}`));
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Authoritative Workbook-to-App Mapping Directory for Conflict in the Middle East.
 * Details which 24-page pupil workbook spread maps to each canonical lesson.
 */
export const CME_WORKBOOK_STAGE_REGISTRY = {
  // Key Topic 1 Booklet (cme_new_pupil_workbook_KT1.pdf)
  lesson_1: {
    lessonTitle:
      'KT 1.0: Broken Promises & Imperial Borders: Why Was Conflict in the Middle East Inevitable?',
    workbook: 'cme_new_pupil_workbook_KT1.pdf',
    bookletTitle: 'Key Topic 1 Pupil Workbook (1915–1956)',
    enquirySpread: 'Enquiry 1: Broken Promises & Imperial Borders (Pages 4–5)',
    examSpread: 'Pages 6–7',
    enquiryIndex: 0,
    stageCount: 5,
  },
  lesson_2: {
    lessonTitle: 'KT 1.1: The End of the British Mandate and the Creation of Israel, 1945–1949',
    workbook: 'cme_new_pupil_workbook_KT1.pdf',
    bookletTitle: 'Key Topic 1 Pupil Workbook (1915–1956)',
    enquirySpread: 'Enquiry 2: Collapse of the Mandate & UN Partition (Pages 8–9)',
    examSpread: 'Pages 10–11',
    enquiryIndex: 1,
    stageCount: 5,
  },
  lesson_3: {
    lessonTitle: 'KT 1.2: The Aftermath of the 1948–49 War & The Palestinian Refugee Crisis',
    workbook: 'cme_new_pupil_workbook_KT1.pdf',
    bookletTitle: 'Key Topic 1 Pupil Workbook (1915–1956)',
    enquirySpread: 'Enquiries 3 & 4: The 1948–49 War & Refugee Settlement (Pages 12–15)',
    examSpread: 'Pages 16–19',
    enquiryIndex: 2,
    stageCount: 5,
  },
  lesson_4: {
    lessonTitle: 'KT 1.3: Increased Tension, Nasser, and the Suez Crisis, 1955–1963',
    workbook: 'cme_new_pupil_workbook_KT1.pdf',
    bookletTitle: 'Key Topic 1 Pupil Workbook (1915–1956)',
    enquirySpread: 'Enquiry 5: The Suez Crisis & Cold War Confrontation (Pages 20–21)',
    examSpread: 'Pages 22–23',
    enquiryIndex: 4,
    stageCount: 5,
  },

  // Key Topic 2 Booklet (cme_new_pupil_workbook_KT2.pdf) - 100% 1-to-1 Parity
  lesson_6: {
    lessonTitle:
      'KT 2.1 Enquiry: How Did Water, Border Raids, and Rhetoric Make a Second Arab-Israeli War Inevitable? (1964–1967)',
    workbook: 'cme_new_pupil_workbook_KT2.pdf',
    bookletTitle: 'Key Topic 2 Pupil Workbook (1964–1973)',
    enquirySpread: 'Enquiry 1: Escalation to War (Pages 4–5)',
    examSpread: 'Pages 6–7',
    enquiryIndex: 0,
    stageCount: 5,
  },
  lesson_7: {
    lessonTitle:
      'KT 2.2 Enquiry: Why Was the Six-Day War Decided in Three Hours, and Did Nasser Intend to Fight? (May–June 1967)',
    workbook: 'cme_new_pupil_workbook_KT2.pdf',
    bookletTitle: 'Key Topic 2 Pupil Workbook (1964–1973)',
    enquirySpread: 'Enquiry 2: The Six-Day War (Pages 8–9)',
    examSpread: 'Pages 10–11',
    enquiryIndex: 1,
    stageCount: 5,
  },
  lesson_8: {
    lessonTitle:
      'KT 2.3 Enquiry: "Land for Peace" or Permanent Stalemate: How Did the 1967 Conquered Territories Transform the Conflict?',
    workbook: 'cme_new_pupil_workbook_KT2.pdf',
    bookletTitle: 'Key Topic 2 Pupil Workbook (1964–1973)',
    enquirySpread: 'Enquiry 3: The Conquered Territories & Resolution 242 (Pages 12–13)',
    examSpread: 'Pages 14–15',
    enquiryIndex: 2,
    stageCount: 5,
  },
  lesson_9: {
    lessonTitle:
      'KT 2.4: The Rise of Palestinian Resistance: The PLO, Black September & Munich (1968–1972)',
    workbook: 'cme_new_pupil_workbook_KT2.pdf',
    bookletTitle: 'Key Topic 2 Pupil Workbook (1964–1973)',
    enquirySpread: 'Enquiry 4: Palestinian Nationalism & The PLO (Pages 16–17)',
    examSpread: 'Pages 18–19',
    enquiryIndex: 3,
    stageCount: 5,
  },
  lesson_10: {
    lessonTitle: 'KT 2.5: The War of Attrition & The Yom Kippur War (1969–1973)',
    workbook: 'cme_new_pupil_workbook_KT2.pdf',
    bookletTitle: 'Key Topic 2 Pupil Workbook (1964–1973)',
    enquirySpread: 'Enquiry 5: The Yom Kippur War & Oil Shock (Pages 20–21)',
    examSpread: 'Pages 22–23',
    enquiryIndex: 4,
    stageCount: 5,
  },

  // Key Topic 3 Booklet (cme_new_pupil_workbook_KT3.pdf)
  lesson_11: {
    lessonTitle: 'KT 3.1: Diplomatic Negotiations: From Shuttle Diplomacy to Camp David, 1974–1979',
    workbook: 'cme_new_pupil_workbook_KT3.pdf',
    bookletTitle: 'Key Topic 3 Pupil Workbook (1973–1995)',
    enquirySpread: 'Enquiries 1 & 2: Shuttle Diplomacy, Camp David & 1979 Treaty (Pages 4–11)',
    examSpread: 'Pages 10–11',
    enquiryIndex: 0,
    stageCount: 5,
  },
  lesson_12: {
    lessonTitle:
      'KT 3.2: The Palestinian Issue: Lebanon, Sabra & Shatila, and the First Intifada, 1974–1993',
    workbook: 'cme_new_pupil_workbook_KT3.pdf',
    bookletTitle: 'Key Topic 3 Pupil Workbook (1973–1995)',
    enquirySpread: 'Enquiries 3 & 4: Lebanon War, Kahan Commission & First Intifada (Pages 12–19)',
    examSpread: 'Pages 18–19',
    enquiryIndex: 2,
    stageCount: 5,
  },
  lesson_13: {
    lessonTitle: 'KT 3.3: Attempts at a Solution: From the Oslo Accords to Oslo II, 1988–1995',
    workbook: 'cme_new_pupil_workbook_KT3.pdf',
    bookletTitle: 'Key Topic 3 Pupil Workbook (1973–1995)',
    enquirySpread: 'Enquiry 5: Oslo Accords, Peace with Jordan & Oslo II (Pages 20–21)',
    examSpread: 'Pages 22–23',
    enquiryIndex: 4,
    stageCount: 5,
  },
};
