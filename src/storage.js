/**
 * Storage & Progress Management for Meoncross History Mega App
 */

import { state } from './state.js';

export function initData() {
  // Load state from local storage
  try {
    const storedMastery = localStorage.getItem('meoncross_mastery');
    if (storedMastery) {
      state.mastery = JSON.parse(storedMastery);
    }
    
    const storedBookmarks = localStorage.getItem('meoncross_bookmarks');
    if (storedBookmarks) {
      state.bookmarks = JSON.parse(storedBookmarks);
    }

    const storedTheme = localStorage.getItem('meoncross_theme');
    if (storedTheme) {
      state.theme = storedTheme;
      document.documentElement.setAttribute('data-theme', storedTheme);
    }

    const storedXp = localStorage.getItem('meoncross_xp');
    if (storedXp) {
      state.dailyXp = parseInt(storedXp, 10);
    }
  } catch (e) {
    console.error('Error loading data from localStorage:', e);
  }
}

export function saveProgress() {
  try {
    localStorage.setItem('meoncross_mastery', JSON.stringify(state.mastery));
    localStorage.setItem('meoncross_bookmarks', JSON.stringify(state.bookmarks));
    localStorage.setItem('meoncross_theme', state.theme);
    localStorage.setItem('meoncross_xp', state.dailyXp.toString());
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
      nextReview: 0
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
      5: 14 * 24 * 60 * 60 * 1000
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
