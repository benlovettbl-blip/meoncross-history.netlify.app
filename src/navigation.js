/**
 * Navigation & Routing Controller for Mr Lovett's History Hub Mega App
 */

import { appStore } from './engine/store.js';
import { state } from './state.js';
import {
  renderDashboard,
  renderInteractiveQuiz,
  renderTimeline,
  renderBookletView,
  renderProfileView,
  renderDecisionsView,
  renderTabooView,
  renderLessonsView,
} from './views.js';

// Subscribe to state changes to handle DOM updates independently of the router
export function initNavigationUI() {
  appStore.subscribe('currentView', (viewName) => {
    // Manage Back Button
    const backBtn = document.getElementById('header-back-btn');
    if (backBtn) {
      if (viewName === 'dashboard') {
        backBtn.style.display = 'none';
      } else {
        backBtn.style.display = 'flex';
      }
    }

    // Manage Header Right (Stats vs Logo)
    const headerRight = document.querySelector('.header-right');
    if (headerRight) {
      if (viewName !== 'dashboard') {
        headerRight.innerHTML = `<span class="school-tag"><i class="fa-solid fa-award"></i> Mr Lovett's History Hub</span>`;
        headerRight.style.flex = '';
        headerRight.style.display = '';
        headerRight.style.justifyContent = '';
        headerRight.style.alignItems = '';
      }
    }

    // Manage Breadcrumbs
    const breadcrumbs = document.getElementById('header-breadcrumbs');
    if (breadcrumbs) {
      if (viewName === 'dashboard') {
        breadcrumbs.style.display = 'none';
      } else {
        let displayName = viewName.toUpperCase();
        if (viewName === 'interactive') displayName = 'Interactive Quiz';
        if (viewName === 'timeline') displayName = 'Chronological Timeline';
        if (viewName === 'booklet') displayName = 'Printable A4 Booklet';
        if (viewName === 'profile') displayName = 'Student Profile';

        breadcrumbs.innerHTML = `
          <span data-action="switch-view" data-view="dashboard" style="cursor: pointer; text-decoration: underline; color: var(--primary);">Dashboard</span>
          <span style="opacity: 0.5;"> / </span>
          <span>${displayName}</span>
        `;
        breadcrumbs.style.display = 'inline-block';
      }
    }

    // Update active sidebar nav
    document.querySelectorAll('.sidebar-nav .nav-item').forEach((item) => {
      item.classList.remove('active');
    });
    const navItem = document.getElementById(`nav-${viewName}`);
    if (navItem) navItem.classList.add('active');
  });
}

export async function switchView(viewName, param = null, skipHistory = false) {
  // Update state; the subscriber will handle UI changes
  appStore.state.currentView = viewName;

  if (!skipHistory) {
    const url = new URL(window.location);
    url.searchParams.set('view', viewName);
    if (param) url.searchParams.set('unit', param);
    else url.searchParams.delete('unit');
    window.history.pushState({ view: viewName, unit: param }, '', url);
  }

  // Handle view rendering
  if (viewName === 'dashboard') {
    renderDashboard();
  } else if (viewName === 'profile') {
    renderProfileView();
  } else if (viewName === 'interactive') {
    if (param) await loadUnit(param);
    renderInteractiveQuiz();
  } else if (viewName === 'timeline') {
    if (param) await loadUnit(param);
    renderTimeline();
  } else if (viewName === 'booklet') {
    if (param) await loadUnit(param);
    renderBookletView();
  } else if (viewName === 'decisions') {
    if (param) await loadUnit(param);
    renderDecisionsView();
  } else if (viewName === 'taboo') {
    if (param) await loadUnit(param);
    renderTabooView();
  } else if (viewName === 'lessons') {
    if (param) await loadUnit(param);
    renderLessonsView();
  }
}

// Dynamically fetch and parse the compiled JSON for a unit
async function loadUnit(unitId) {
  const currentLessons = state.activeUnitData.lessons || state.activeUnitData.subtopics;
  if (state.selectedUnitId === unitId && currentLessons && currentLessons.length > 0) {
    return; // Already loaded
  }

  state.selectedUnitId = unitId;

  if (state.db && state.db[unitId]) {
    const unitPayload = state.db[unitId];
    state.activeUnitData = unitPayload.data || {};
  } else {
    console.error('Unit not found in database.json:', unitId);
    state.activeUnitData = {};
  }

  // Add loaded questions to general index to support Leitner status mapping
  if (!state.allQuestions) state.allQuestions = [];
  if (state.activeUnitData.quizData) {
    state.activeUnitData.quizData.forEach((q) => {
      if (!state.allQuestions.some((existing) => existing.id === q.id)) {
        state.allQuestions.push(q);
      }
    });
  }

  const navDecisions = document.getElementById('nav-decisions');
  const navTaboo = document.getElementById('nav-taboo');
  const navLessons = document.getElementById('nav-lessons');
  if (navDecisions && navTaboo && navLessons) {
    if (unitId.startsWith('gcse_') || unitId === 'edexcel_medicine' || unitId === 'eee') {
      if (unitId === 'gcse_elizabethan_england' || unitId === 'eee') {
        navDecisions.style.display = 'none';
      } else {
        navDecisions.style.display = 'flex';
      }
      navTaboo.style.display = 'flex';
      navLessons.style.display = 'flex';
      navDecisions.dataset.action = 'switch-view';
      navDecisions.dataset.view = 'decisions';
      navDecisions.dataset.unit = unitId;
      navTaboo.dataset.action = 'switch-view';
      navTaboo.dataset.view = 'taboo';
      navTaboo.dataset.unit = unitId;
      navLessons.dataset.action = 'switch-view';
      navLessons.dataset.view = 'lessons';
      navLessons.dataset.unit = unitId;
      navDecisions.onclick = () => switchView('decisions', unitId);
      navTaboo.onclick = () => switchView('taboo', unitId);
      navLessons.onclick = () => switchView('lessons', unitId);
    } else {
      navDecisions.style.display = 'none';
      navTaboo.style.display = 'none';
      navLessons.style.display = 'none';
    }
  }
}
