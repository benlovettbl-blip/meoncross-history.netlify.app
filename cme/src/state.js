/*
   Edexcel GCSE History Paper 2 Conflict in the Middle East Mastery - Application Controller
   Handles SPA routing, progress syncing, audio synthesis, exam timing, 
   flashcard sessions, global search, and timeline assembly.
*/

// --- Global Application State ---
export const state = {
  currentView: 'dashboard',         // 'dashboard' | 'classic' | 'flashcards' | 'exam' | 'timeline' | 'bookmarks'
  selectedSubtopicId: null,         // Active sub-topic ID (e.g. 'subtopic_1_1')
  studyLevel: 'mastery',            // 'mastery' | 'core' (Level 4 Pass mode)
  selectedKeyTopicId: null,          // Active Key Topic ID (e.g. 'topic_1')
  highlightGoingBeyondId: null,      // Active Going Beyond Card to scroll and glow (e.g. 'gb-jerusalem')
  currentMode: 'lessons',           // 'lessons' | 'classic' | 'flashcards' (sub-topic study modes)
  mastery: {},                      // { questionId: boolean }
  bookmarks: [],                     // Array of questionIds
  soundEnabled: true,
  theme: 'desert',
  
  // Flashcard Session State
  flashcardSession: {
    deck: [],
    activeIndex: 0,
    originalLength: 0,
    masteredCount: 0,
    reinforcing: false,
    reinforceQuestion: null,
    wasDragged: false,
    failedCardIds: [],
    speedStudyMode: false
  },
  
  // Quiz Generator State
  examSession: {
    isActive: false,
    questions: [],
    activeIndex: 0,
    answers: {},                     // { questionId: string (written answer) }
    grades: {},                      // { questionId: boolean (self-graded correct) }
    startTime: null,
    timerInterval: null,
    timeRemaining: 0,
    timeLimit: 0,
    timeElapsed: 0,
    scope: 'all',
    length: 15
  },
  
  // Cache flattened questions list for quick access
  allQuestions: [],

  // Past Exam Session State
  pastPaperSession: {
    activePaperId: null,
    activePaperData: null,
    answers: {},                     // { questionId: string }
    completedQuestions: []           // Array of questionIds
  },

  // Crisis Hotline: 1973 Game State
  crisisGameSession: {
    currentStep: 0,
    metrics: { tension: 50, arab: 50, israel: 50, oil: 50 }
  },

  // Chronological Tug-of-War Game State
  tugGameSession: {
    score: 0,
    streak: 0,
    defcon: 5,
    currentEvent: null,
    gameEvents: []
  },

  
  // Taboo Revision Game State
  tabooGameSession: {
    teams: [
      { name: 'Team A', score: 0 },
      { name: 'Team B', score: 0 }
    ],
    currentTeamIndex: 0,
    currentCardIndex: 0,
    deck: [],
    timerLimit: 60,
    timerRemaining: 60,
    timerInterval: null,
    isPlaying: false
  },
  
  // Gamification Player Stats
  userStats: {
    xp: 0,
    level: 1,
    streak: 0,
    lastLoginDate: null,
    unlockedCards: [] // Tracks IDs of Syllabus Scumbags cards unlocked
  }
};