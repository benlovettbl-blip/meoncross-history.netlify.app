import { state } from './state.js';
import { CARDS_DATA } from './cards_data.js';
import { QUIZ_DATA } from '../questions.js';
import { updateSoundBtnUI } from './layout.js';
import { updateGlobalStats, updateBookmarksUI } from './views.js';
import { AudioEngine } from './audio.js';
import { Confetti } from './confetti.js';

export function getActiveProfile() {
  return localStorage.getItem('edexcel_active_profile') || 'Default';
}

export function setActiveProfile(name) {
  localStorage.setItem('edexcel_active_profile', name);
}

export function getProfileStorageKey(key) {
  const active = getActiveProfile();
  if (active === 'Default') {
    return key;
  }
  return `${key}_profile_${active}`;
}

export function getProfilesList() {
  try {
    const list = localStorage.getItem('edexcel_profiles_list');
    return list ? JSON.parse(list) : ['Default'];
  } catch (e) {
    return ['Default'];
  }
}

export function createProfile(name) {
  name = name.trim();
  if (!name) return false;
  const list = getProfilesList();
  if (list.includes(name)) return false;
  list.push(name);
  localStorage.setItem('edexcel_profiles_list', JSON.stringify(list));
  return true;
}

export function deleteProfile(name) {
  if (name === 'Default') return false;
  let list = getProfilesList();
  list = list.filter(p => p !== name);
  localStorage.setItem('edexcel_profiles_list', JSON.stringify(list));
  
  // Clean up localStorage keys for this profile
  const prefix = `_profile_${name}`;
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.endsWith(prefix)) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach(k => localStorage.removeItem(k));
  
  if (getActiveProfile() === name) {
    setActiveProfile('Default');
  }
  return true;
}

export function exportActiveProfileData() {
  const active = getActiveProfile();
  const backup = {
    profileName: active,
    timestamp: Date.now(),
    userStats: state.userStats,
    mastery: state.mastery,
    bookmarks: state.bookmarks,
    pastPaperAnswers: state.pastPaperSession.answers,
    pastPaperCompleted: state.pastPaperSession.completedQuestions,
    specChecklist: JSON.parse(localStorage.getItem(getProfileStorageKey('edexcel_spec_checklist')) || 'null'),
    missedTerms: JSON.parse(localStorage.getItem(getProfileStorageKey('antigravity_mastery_missed_terms')) || 'null')
  };
  
  try {
    const jsonStr = JSON.stringify(backup);
    return btoa(encodeURIComponent(jsonStr));
  } catch (e) {
    console.error("Failed to export profile data:", e);
    return null;
  }
}

export function importProfileData(base64Str) {
  try {
    const jsonStr = decodeURIComponent(atob(base64Str));
    const backup = JSON.parse(jsonStr);
    
    if (!backup || typeof backup !== 'object') {
      return { success: false, error: 'Invalid data format' };
    }
    
    const profileName = backup.profileName || 'ImportedProfile';
    const list = getProfilesList();
    if (!list.includes(profileName)) {
      createProfile(profileName);
    }
    
    const getImportKey = (key) => {
      if (profileName === 'Default') return key;
      return `${key}_profile_${profileName}`;
    };
    
    if (backup.userStats) localStorage.setItem(getImportKey('edexcel_prefs_user_stats'), JSON.stringify(backup.userStats));
    if (backup.mastery) localStorage.setItem(getImportKey('edexcel_mastery'), JSON.stringify(backup.mastery));
    if (backup.bookmarks) localStorage.setItem(getImportKey('edexcel_bookmarks'), JSON.stringify(backup.bookmarks));
    if (backup.pastPaperAnswers) localStorage.setItem(getImportKey('edexcel_past_answers'), JSON.stringify(backup.pastPaperAnswers));
    if (backup.pastPaperCompleted) localStorage.setItem(getImportKey('edexcel_past_completed'), JSON.stringify(backup.pastPaperCompleted));
    if (backup.specChecklist) localStorage.setItem(getImportKey('edexcel_spec_checklist'), JSON.stringify(backup.specChecklist));
    if (backup.missedTerms) localStorage.setItem(getImportKey('antigravity_mastery_missed_terms'), JSON.stringify(backup.missedTerms));
    
    setActiveProfile(profileName);
    return { success: true, profileName };
  } catch (e) {
    console.error("Failed to import profile data:", e);
    return { success: false, error: e.message };
  }
}

export function initData() {
  state.allQuestions = [];
  QUIZ_DATA.forEach(topic => {
    topic.subtopics.forEach(subtopic => {
      ['easy', 'medium', 'difficult'].forEach(difficultyType => {
        if (subtopic[difficultyType]) {
          subtopic[difficultyType].forEach(q => {
            state.allQuestions.push({
              ...q,
              type: difficultyType,
              topicId: topic.id,
              topicTitle: topic.title,
              subtopicId: subtopic.id,
              subtopicTitle: subtopic.title
            });
          });
        }
      });
    });
  });

  try {
    const storedMastery = localStorage.getItem(getProfileStorageKey('edexcel_mastery')) || 
      (getActiveProfile() === 'Default' ? localStorage.getItem('firefly_mastery') : null);
    const storedBookmarks = localStorage.getItem(getProfileStorageKey('edexcel_bookmarks')) || 
      (getActiveProfile() === 'Default' ? localStorage.getItem('firefly_bookmarks') : null);
    const storedSound = localStorage.getItem('edexcel_sound') || localStorage.getItem('firefly_sound');
    const storedTheme = localStorage.getItem('edexcel_theme') || localStorage.getItem('firefly_theme');
    const storedPastAnswers = localStorage.getItem(getProfileStorageKey('edexcel_past_answers'));
    const storedPastCompleted = localStorage.getItem(getProfileStorageKey('edexcel_past_completed'));
    const storedUserStats = localStorage.getItem(getProfileStorageKey('edexcel_prefs_user_stats'));
    
    state.mastery = storedMastery ? JSON.parse(storedMastery) : {};
    state.bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];
    
    if (storedSound) state.soundEnabled = JSON.parse(storedSound);
    if (storedTheme) state.theme = storedTheme;
    
    state.pastPaperSession = state.pastPaperSession || {};
    state.pastPaperSession.answers = storedPastAnswers ? JSON.parse(storedPastAnswers) : {};
    state.pastPaperSession.completedQuestions = storedPastCompleted ? JSON.parse(storedPastCompleted) : [];
    
    state.userStats = storedUserStats ? JSON.parse(storedUserStats) : { xp: 0, level: 1, streak: 0, lastLoginDate: null };
    if (!state.userStats.unlockedCards) {
      state.userStats.unlockedCards = [];
    }
  } catch (e) {
    console.error("LocalStorage load error:", e);
  }
  
  document.documentElement.setAttribute('data-theme', state.theme);
  const themeSelector = document.getElementById('theme-selector');
  if (themeSelector) themeSelector.value = state.theme;
  
  const headerXpEl = document.getElementById('header-xp-value');
  if (headerXpEl && state.userStats) {
    headerXpEl.textContent = state.userStats.xp;
  }
  
  updateSoundBtnUI();
}

export function saveProgress() {
  try {
    localStorage.setItem(getProfileStorageKey('edexcel_mastery'), JSON.stringify(state.mastery));
    localStorage.setItem(getProfileStorageKey('edexcel_bookmarks'), JSON.stringify(state.bookmarks));
    localStorage.setItem(getProfileStorageKey('edexcel_past_answers'), JSON.stringify(state.pastPaperSession.answers));
    localStorage.setItem(getProfileStorageKey('edexcel_past_completed'), JSON.stringify(state.pastPaperSession.completedQuestions));
    localStorage.setItem(getProfileStorageKey('edexcel_prefs_user_stats'), JSON.stringify(state.userStats));
  } catch (e) {
    console.error("LocalStorage save error:", e);
  }
  updateGlobalStats();
}

export function setMastered(questionId, isMastered) {
  const previousStatus = !!state.mastery[questionId];
  if (previousStatus === isMastered) return;
  
  state.mastery[questionId] = isMastered;
  saveProgress();

  if (isMastered) {
    const question = state.allQuestions.find(q => q.id === questionId);
    if (question) {
      const subtopicQuestions = state.allQuestions.filter(q => q.subtopicId === question.subtopicId);
      const masteredInSubtopic = subtopicQuestions.filter(q => state.mastery[q.id]);
      
      
      if (masteredInSubtopic.length === subtopicQuestions.length) {
        AudioEngine.play('cheer');
        Confetti.spawn(100);


      }

    }
  }
}

export function toggleBookmark(questionId) {
  const idx = state.bookmarks.indexOf(questionId);
  if (idx > -1) {
    state.bookmarks.splice(idx, 1);
  } else {
    state.bookmarks.push(questionId);
  }
  saveProgress();
  updateBookmarksUI();
  AudioEngine.play('click');
}