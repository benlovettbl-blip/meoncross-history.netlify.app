/**
 * Global Application State for Mr Lovett's History Hub Mega App
 */

export const state = {
  // Navigation & View Mode
  currentView: 'dashboard',         // 'dashboard' | 'interactive' | 'timeline' | 'booklet' | 'profile'
  selectedUnitId: null,             // ID of active unit (e.g. 'norman_conquest', 'great_war')
  selectedSubtopicId: null,         // Active subtopic index/ID inside the active unit
  studyLevel: 'mastery',            // 'mastery' | 'core'
  
  // Loaded Unit Data (parsed from Markdown dynamically)
  activeUnitData: {
    metadata: {},
    subtopics: [],
    timelineEvents: [],
    quizData: []
  },

  // Leitner Box / Mastery Progress State
  mastery: {},                      // { questionId: { status: 'new'|'secured'|'mastered', leitnerBox: 1..5, nextReview: timestamp } }
  bookmarks: [],                     // Array of questionIds
  dailyXp: 0,
  lastActiveDate: null,

  // Settings
  theme: 'primary',                  // 'primary' | 'desert' | 'space' | 'coral'
  soundEnabled: true,

  // Profile
  userProfile: null                 // Parsed MSAL profile { username, name, yearGroup }
};
