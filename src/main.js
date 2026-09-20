/**
 * Main Application Entry Point
 * Coordinates Authentication, Storage, Layout Binding, and Navigation routing.
 */

import { initAuth } from './auth.js';
import { initData } from './storage.js';
import { bindEvents } from './layout.js';
import { switchView, initNavigationUI } from './navigation.js';
import { state } from './state.js';
import { initEventDelegation } from './engine/events.js';
import { initSpeech, cancelSpeech } from './engine/speech.js';
import './langemarck_myth.js';

function purgeGDPRHistoricalCache() {
  try {
    const PURGE_KEY = 'history_hub_gdpr_cache_purged_v2';
    if (!localStorage.getItem(PURGE_KEY)) {
      if (typeof caches !== 'undefined' && caches.keys) {
        caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
      }
      const keysToRemove = [
        'history_chess_club_v5',
        'history_chess_master_archive',
        'history_chess_backup_snapshot',
        'history_chess_active_session',
        'history_chess_export_history',
        'history_chess_teacher_auth',
        'history_chess_active_players',
      ];
      keysToRemove.forEach((k) => {
        try {
          localStorage.removeItem(k);
        } catch (e) {}
      });
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && (key.includes('chess') || key.includes('leaderboard'))) {
          try {
            localStorage.removeItem(key);
          } catch (e) {}
        }
      }
      if (typeof sessionStorage !== 'undefined') {
        try {
          sessionStorage.clear();
        } catch (e) {}
      }
      if (typeof indexedDB !== 'undefined' && indexedDB.deleteDatabase) {
        try {
          indexedDB.deleteDatabase('HistoryChessDB');
        } catch (e) {}
      }
      if ('serviceWorker' in navigator && navigator.serviceWorker.getRegistrations) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const r of registrations) r.unregister();
        });
      }
      localStorage.setItem(PURGE_KEY, 'true');
    }
  } catch (err) {
    console.warn('GDPR cache purge notice:', err);
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  // Execute GDPR cache, storage, and service worker scrub
  purgeGDPRHistoricalCache();

  // Initialize UI subscribers
  initNavigationUI();
  initEventDelegation();
  initSpeech();

  // Bind global helper routing
  window.switchView = switchView;
  window.state = state;

  initAuth();
  initData();

  try {
    const res = await fetch(`/database.json?v=${Date.now()}`);
    state.db = await res.json();
    // Keep window.db temporarily for files not yet refactored
    window.db = state.db;
  } catch (err) {
    console.error('Failed to load database.json:', err);
    state.db = {};
    window.db = {};
  }

  bindEvents();

  // Set default theme styling active button state
  const currentTheme = state.theme || 'desert';
  const themeBtn = document.querySelector(`.theme-btn[data-theme="${currentTheme}"]`);
  if (themeBtn) {
    themeBtn.classList.add('active');
  }

  // Load view based on URL or fallback to dashboard
  const urlParams = new URLSearchParams(window.location.search);
  let view = urlParams.get('view');
  let unit = urlParams.get('unit');
  const initialLesson = urlParams.get('lesson');

  if (view === 'usa' || view === 'gcse_usa' || view === 'gcse_usa_1954_1975') {
    view = 'lessons';
    unit = 'usa';
  } else if (view === 'trend-radar' || view === 'matrix' || view === 'exam-matrix') {
    view = 'mock-exams';
  } else if (!view && unit) {
    view = 'lessons';
  } else if (!view) {
    view = 'dashboard';
  }

  // Seed the initial history state so e.state is never null on popstate back to initial landing
  if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
    try {
      window.history.replaceState(
        {
          view: view,
          unit: unit,
          lessonIndex:
            initialLesson !== null && !isNaN(parseInt(initialLesson, 10))
              ? parseInt(initialLesson, 10)
              : undefined,
          scrollY: window.scrollY || 0,
        },
        '',
        window.location.href,
      );
    } catch (err) {}
  }

  // Global draft preservation flush before navigation or page unload
  const flushDraftState = () => {
    try {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.classList?.contains('student-answer-input') ||
          activeEl.classList?.contains('student-task-input') ||
          activeEl.id === 'epz-user-answer' ||
          activeEl.classList?.contains('form-control'))
      ) {
        const key = activeEl.dataset.draftKey || activeEl.id;
        if (key && activeEl.value) {
          localStorage.setItem(key, activeEl.value);
        }
      }
    } catch (err) {}
  };
  window.addEventListener('beforeunload', () => {
    cancelSpeech();
    flushDraftState();
  });

  switchView(view, unit, true).then(() => {
    if (view === 'lessons' && initialLesson !== null) {
      let targetIdx = !isNaN(parseInt(initialLesson, 10)) ? parseInt(initialLesson, 10) : -1;
      const unitDataObj =
        window.currentUnitData ||
        (window.appStore && window.appStore.state && window.appStore.state.activeUnitData);
      if (targetIdx === -1 && unitDataObj && Array.isArray(unitDataObj.lessons)) {
        targetIdx = unitDataObj.lessons.findIndex(
          (l) =>
            l.id === initialLesson ||
            (l.id && l.id.toLowerCase() === String(initialLesson).toLowerCase()) ||
            (l.title && l.title.toLowerCase().includes(String(initialLesson).toLowerCase())),
        );
      }
      if (targetIdx !== -1 && typeof window.renderLessonByIndex === 'function') {
        window.renderLessonByIndex(targetIdx, true);
      }
    }

    // Direct Fullscreen Mobile QR Quiz Experience
    const isQuizRequested =
      urlParams.get('quiz') === 'true' ||
      urlParams.get('quiz') === '1' ||
      urlParams.get('view') === 'quiz';

    if (isQuizRequested && typeof window.startQuiz === 'function') {
      const lessonIdx =
        initialLesson !== null && !isNaN(parseInt(initialLesson, 10))
          ? parseInt(initialLesson, 10)
          : 0;
      const unitData =
        window.currentUnitData ||
        (window.appStore && window.appStore.state && window.appStore.state.activeUnitData);
      const targetLesson =
        unitData && unitData.lessons ? unitData.lessons[lessonIdx] || unitData.lessons[0] : null;
      const lessonId = targetLesson ? targetLesson.id : `lesson_${lessonIdx}`;

      setTimeout(() => {
        window.startQuiz(lessonId, true);
      }, 120);
    }

    // Direct Emergency Cover Generator Modal Experience
    const isCoverRequested =
      urlParams.get('cover') === 'true' ||
      urlParams.get('cover') === '1' ||
      urlParams.get('view') === 'cover';

    if (isCoverRequested && typeof window.openEmergencyCoverModal === 'function') {
      const uId = unit || 'cme_new';
      setTimeout(() => {
        window.openEmergencyCoverModal(uId);
      }, 150);
    }

    if (window.location.hash && window.location.hash.includes('-section')) {
      setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  });

  // Intelligent Popstate Handler: URL-Aware & Scroll-Restoring
  window.addEventListener('popstate', (e) => {
    flushDraftState();

    // Check if triggered by an in-page hash jump (e.g. #year11-section)
    if (window.location.hash && window.location.hash.includes('-section')) {
      const targetEl = document.querySelector(window.location.hash);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    const currentUrlParams = new URLSearchParams(window.location.search);
    const urlView = currentUrlParams.get('view');
    const urlUnit = currentUrlParams.get('unit');
    const urlLesson = currentUrlParams.get('lesson');
    const targetScrollY = e.state && typeof e.state.scrollY === 'number' ? e.state.scrollY : 0;

    let targetView = (e.state && e.state.view) || urlView;
    let targetUnit = e.state && e.state.unit !== undefined ? e.state.unit : urlUnit;

    if (targetView === 'usa' || targetView === 'gcse_usa' || targetView === 'gcse_usa_1954_1975') {
      targetView = 'lessons';
      targetUnit = 'usa';
    } else if (
      targetView === 'trend-radar' ||
      targetView === 'matrix' ||
      targetView === 'exam-matrix'
    ) {
      targetView = 'mock-exams';
    } else if (!targetView && targetUnit) {
      targetView = 'lessons';
    } else if (!targetView) {
      targetView = 'dashboard';
    }

    switchView(targetView, targetUnit, true, { skipScrollToTop: targetScrollY > 0 }).then(() => {
      // Restore lesson view if requested
      const lessonIdx =
        e.state && e.state.lessonIndex !== undefined
          ? e.state.lessonIndex
          : urlLesson !== null && !isNaN(parseInt(urlLesson, 10))
            ? parseInt(urlLesson, 10)
            : null;

      if (targetView === 'lessons') {
        if (lessonIdx !== null && typeof window.renderLessonByIndex === 'function') {
          window.renderLessonByIndex(lessonIdx, true);
        } else if (lessonIdx === null && typeof window.renderLessonsView === 'function') {
          window.renderLessonsView();
        }
      }

      // Restore custom tab if requested
      if (e.state && e.state.customTab) {
        const links = document.querySelectorAll('.lesson-link');
        links.forEach((l) => {
          if (l.innerText.toLowerCase().includes(e.state.customTab.replace('_', ' '))) {
            l.click();
          }
        });
      }

      // Restore scroll position smoothly
      if (targetScrollY > 0) {
        setTimeout(() => {
          window.scrollTo({ top: targetScrollY, behavior: 'instant' });
          const contentArea =
            document.getElementById('content-area') || document.getElementById('main-content');
          if (contentArea && contentArea.scrollTop !== undefined) {
            contentArea.scrollTop = targetScrollY;
          }
        }, 60);
      }
    });
  });

  // Offline / Online Connectivity Indicator for Battlefield Tour
  const updateNetworkStatus = () => {
    let offlinePill = document.getElementById('offline-status-pill');
    if (!navigator.onLine) {
      if (!offlinePill) {
        offlinePill = document.createElement('div');
        offlinePill.id = 'offline-status-pill';
        offlinePill.className = 'offline-status-pill no-print';
        offlinePill.innerHTML =
          '<i class="fa-solid fa-plane-slash"></i> <span>Offline Mode · Field Guide Available</span>';
        document.body.appendChild(offlinePill);
      }
      offlinePill.style.display = 'flex';
    } else if (offlinePill) {
      offlinePill.innerHTML = '<i class="fa-solid fa-check"></i> <span>Online Reconnected</span>';
      offlinePill.style.background = '#059669';
      setTimeout(() => {
        if (offlinePill) offlinePill.style.display = 'none';
      }, 2500);
    }
  };

  window.addEventListener('online', updateNetworkStatus);
  window.addEventListener('offline', updateNetworkStatus);
  if (!navigator.onLine) updateNetworkStatus();

  // Hide the loading curtain smoothly
  setTimeout(() => {
    const curtain = document.getElementById('page-curtain');
    if (curtain) {
      curtain.classList.add('hidden');
    }
  }, 100);
});
