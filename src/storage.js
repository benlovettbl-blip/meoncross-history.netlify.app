/**
 * Storage & Progress Management for GCSE History Study & Revision Portal
 */

import { state } from './state.js';

export function initData() {
  // Load state from local storage
  try {
    const storedMastery = localStorage.getItem('history_mastery');
    if (storedMastery) {
      state.mastery = JSON.parse(storedMastery);
    }

    const storedBookmarks = localStorage.getItem('history_bookmarks');
    if (storedBookmarks) {
      state.bookmarks = JSON.parse(storedBookmarks);
    }

    const storedWeak = localStorage.getItem('history_weak_spots');
    if (storedWeak) {
      state.weakSpots = JSON.parse(storedWeak);
    } else {
      state.weakSpots = {};
    }

    const storedTheme = localStorage.getItem('history_theme');
    if (storedTheme) {
      state.theme = storedTheme;
      document.documentElement.setAttribute('data-theme', storedTheme);
    }

    const storedXp = localStorage.getItem('history_xp');
    if (storedXp) {
      state.dailyXp = parseInt(storedXp, 10);
    }
  } catch (e) {
    console.error('Error loading data from localStorage:', e);
  }
}

export function saveProgress() {
  try {
    localStorage.setItem('history_mastery', JSON.stringify(state.mastery || {}));
    localStorage.setItem('history_bookmarks', JSON.stringify(state.bookmarks || []));
    localStorage.setItem('history_weak_spots', JSON.stringify(state.weakSpots || {}));
    localStorage.setItem('history_theme', state.theme);
    localStorage.setItem('history_xp', (state.dailyXp || 0).toString());
  } catch (e) {
    console.error('LocalStorage save error:', e);
  }
}

export function getMasteryStatus(questionId) {
  const entry = state.mastery[questionId];
  if (!entry) return 'new';
  return entry.status || 'new';
}

export function updateLeitnerBox(questionId, isCorrect) {
  if (!state.mastery) state.mastery = {};

  let entry = state.mastery[questionId];
  const now = Date.now();

  if (!entry) {
    entry = {
      status: 'new',
      timestamp: now,
      leitnerBox: 1,
      nextReview: 0,
    };
  }

  if (isCorrect) {
    const currentBox = entry.leitnerBox || 1;
    const newBox = Math.min(5, currentBox + 1);

    // Spaced repetition review intervals:
    // Box 1: 4h, Box 2: 24h, Box 3: 3d, Box 4: 7d, Box 5: 14d
    const intervals = {
      1: 4 * 60 * 60 * 1000,
      2: 24 * 60 * 60 * 1000,
      3: 3 * 24 * 60 * 60 * 1000,
      4: 7 * 24 * 60 * 60 * 1000,
      5: 14 * 24 * 60 * 60 * 1000,
    };

    entry.leitnerBox = newBox;
    entry.nextReview = now + intervals[newBox];
    entry.status = newBox === 5 ? 'mastered' : 'secured';
    entry.timestamp = now;

    // Add XP
    state.dailyXp += 10;
  } else {
    // Demote to box 1 and review immediately
    entry.leitnerBox = 1;
    entry.nextReview = now;
    entry.status = 'new';
    entry.timestamp = now;
  }

  state.mastery[questionId] = entry;
  saveProgress();
}

export function toggleBookmark(questionId) {
  const index = state.bookmarks.indexOf(questionId);
  if (index === -1) {
    state.bookmarks.push(questionId);
  } else {
    state.bookmarks.splice(index, 1);
  }
  saveProgress();
}

/**
 * Deterministic hash-based unique ID generator for any lesson question/flashcard.
 */
export function generateQuestionId(unitId, source, qText) {
  const u = (unitId || 'general').toLowerCase().replace(/[^a-z0-9]/g, '_');
  const s = (source || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .slice(0, 24);
  let hash = 0;
  const str = String(qText || '')
    .trim()
    .toLowerCase();
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const cleanHash = Math.abs(hash).toString(36);
  return `${u}__${s}__${cleanHash}`;
}

/**
 * Records an answer outcome in the spaced repetition Leitner box and personal weak spots ledger.
 * - Incorrect: Marked as 'red' (active weakness) and added to targeted recall pool.
 * - Correct: If in weak spots, promoted from 'red' -> 'amber' -> graduated (removed).
 */
export function recordQuestionResult(qId, isCorrect, questionObj = null, unitId = '') {
  if (!state.weakSpots) state.weakSpots = {};
  const effectiveUnit = unitId || window.currentUnitId || 'general';

  if (!qId && questionObj) {
    qId = generateQuestionId(effectiveUnit, questionObj.source, questionObj.q);
  }
  if (!qId) return;

  const now = Date.now();

  if (!isCorrect) {
    // Demote in Leitner system
    updateLeitnerBox(qId, false);

    // Save/update weak spot snapshot
    const existing = state.weakSpots[qId];
    state.weakSpots[qId] = {
      id: qId,
      unitId: effectiveUnit,
      tier: 'red', // 'red' = needs urgent recall review, 'amber' = reviewed once correctly
      q: questionObj?.q || existing?.q || 'Question',
      a: questionObj?.a || existing?.a || 'Answer',
      options: questionObj?.options || existing?.options || null,
      img: questionObj?.img || existing?.img || null,
      source: questionObj?.source || existing?.source || '',
      explanation: questionObj?.explanation || existing?.explanation || '',
      missCount: (existing?.missCount || 0) + 1,
      correctCount: existing?.correctCount || 0,
      lastMistakeTime: now,
    };
  } else {
    // Advance in Leitner box
    updateLeitnerBox(qId, true);

    // Review promotion in weak spots
    if (state.weakSpots[qId]) {
      const entry = state.weakSpots[qId];
      if (entry.tier === 'red') {
        entry.tier = 'amber';
        entry.correctCount = (entry.correctCount || 0) + 1;
        entry.lastReviewTime = now;
      } else {
        // Mastered after repeated recall success!
        delete state.weakSpots[qId];
      }
    }
  }

  saveProgress();
}

/**
 * Returns active weak spots (Red and Amber) filtered by unit, sorted with most missed/recent first.
 */
export function getWeakSpots(unitId = null) {
  if (!state.weakSpots) {
    try {
      const stored = localStorage.getItem('history_weak_spots');
      state.weakSpots = stored ? JSON.parse(stored) : {};
    } catch (e) {
      state.weakSpots = {};
    }
  }

  const all = Object.values(state.weakSpots || {});
  let filtered = all;
  if (unitId) {
    filtered = all.filter((item) => !item.unitId || item.unitId === unitId);
  }

  // Sort: Red first, then highest missCount, then most recent mistake
  return filtered.sort((a, b) => {
    if (a.tier === 'red' && b.tier !== 'red') return -1;
    if (b.tier === 'red' && a.tier !== 'red') return 1;
    if ((b.missCount || 0) !== (a.missCount || 0)) {
      return (b.missCount || 0) - (a.missCount || 0);
    }
    return (b.lastMistakeTime || 0) - (a.lastMistakeTime || 0);
  });
}

/**
 * Clears weak spots for a specific unit or globally.
 */
export function clearWeakSpots(unitId = null) {
  if (!state.weakSpots) state.weakSpots = {};
  if (!unitId) {
    state.weakSpots = {};
  } else {
    Object.keys(state.weakSpots).forEach((k) => {
      if (!state.weakSpots[k].unitId || state.weakSpots[k].unitId === unitId) {
        delete state.weakSpots[k];
      }
    });
  }
  saveProgress();
}
