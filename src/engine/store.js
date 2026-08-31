/**
 * Centralized State Management Store
 * Implements a simple Pub/Sub pattern for Vanilla JS.
 */

class Store {
  constructor(initialState = {}) {
    this.state = new Proxy(initialState, {
      set: (target, key, value) => {
        target[key] = value;
        this.notify(key, value);
        return true;
      }
    });
    this.listeners = {};
  }

  // Subscribe to changes on a specific state key
  subscribe(key, callback) {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }
    this.listeners[key].push(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners[key] = this.listeners[key].filter(cb => cb !== callback);
    };
  }

  // Notify listeners when a key changes
  notify(key, value) {
    if (this.listeners[key]) {
      this.listeners[key].forEach(callback => callback(value));
    }
    // Also trigger wildcard listeners
    if (this.listeners['*']) {
      this.listeners['*'].forEach(callback => callback(key, value));
    }
  }

  // Get the current state
  getState() {
    return this.state;
  }
}

// Export a singleton instance of the store
export const appStore = new Store({
  currentView: 'dashboard',
  selectedUnitId: null,
  selectedSubtopicId: null,
  studyLevel: 'mastery',
  activeUnitData: {
    metadata: {},
    subtopics: [],
    timelineEvents: [],
    quizData: []
  },
  mastery: {},
  bookmarks: [],
  dailyXp: 0,
  lastActiveDate: null,
  theme: 'primary',
  soundEnabled: true,
  userProfile: null,
  allQuestions: [],
  examTimers: {},
  db: {}
});
