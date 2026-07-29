export default class StateAdapter {
  constructor() {
    this.storageKey = 'history_app_state';
    this.state = this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Failed to load local state", e);
    }
    return {
      userXP: 0,
      unlockedLessons: []
    };
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.warn("Failed to save local state", e);
    }
  }

  updateXP(amount) {
    this.state.userXP += amount;
    this.saveState();
  }
}
