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
  renderIndividualsView,
  renderReadingView,
} from './views.js'; // Trigger HMR
import { renderCurriculumMap } from './curriculum_map.js';

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
        if (viewName === 'interactive') displayName = 'Interactive Quizzing & Spaced Recall';
        if (viewName === 'timeline') displayName = 'Chronological Timeline';
        if (viewName === 'booklet') displayName = 'Printable A4 Booklet';
        if (viewName === 'profile') displayName = 'Student Profile';
        if (viewName === 'curriculum') displayName = 'Curriculum Overview';

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
    url.searchParams.delete('lesson');
    window.history.pushState({ view: viewName, unit: param }, '', url);
  }

  // Clean up unit-specific sidebar navigation on global views
  if (viewName === 'dashboard' || viewName === 'profile' || viewName === 'curriculum') {
    [
      'nav-lessons',
      'nav-interactive',
      'nav-timeline',
      'nav-booklet',
      'nav-decisions',
      'nav-taboo',
      'nav-individuals',
      'nav-reading',
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
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
  } else if (viewName === 'individuals') {
    if (param) await loadUnit(param);
    renderIndividualsView();
  } else if (viewName === 'reading') {
    if (param) await loadUnit(param);
    renderReadingView();
  } else if (viewName === 'curriculum') {
    await renderCurriculumMap();
  }
}

// Dynamically fetch and parse the compiled JSON for a unit
async function loadUnit(unitId) {
  const currentLessons = state.activeUnitData.lessons || state.activeUnitData.subtopics;
  const isAlreadyLoaded =
    state.selectedUnitId === unitId && currentLessons && currentLessons.length > 0;

  if (!isAlreadyLoaded) {
    state.selectedUnitId = unitId;

    if (state.db && state.db[unitId]) {
      const unitPayload = state.db[unitId];
      state.activeUnitData = unitPayload.data || {};
      window.currentUnitData = state.activeUnitData;
      window.currentUnitId = unitId;
      if (appStore && appStore.state) {
        appStore.state.activeUnitData = state.activeUnitData;
        appStore.state.selectedUnitId = unitId;
      }
    } else {
      console.error('Unit not found in database.json:', unitId);
      state.activeUnitData = {};
    }

    // Fallback: Dynamically generate quizData from lesson do_now quizzes if missing
    if (!state.activeUnitData.quizData) {
      const extractedQuizData = [];
      const lessonsList = state.activeUnitData.lessons || state.activeUnitData.subtopics || [];
      lessonsList.forEach((lesson, lIdx) => {
        const baseId = lesson.id || `lesson_${lIdx}`;
        if (lesson.quiz && Array.isArray(lesson.quiz)) {
          lesson.quiz.forEach((q, idx) => {
            const prompt = q.question || q.q;
            const ans = q.answer || q.a;
            if (prompt && ans && q.options && Array.isArray(q.options)) {
              extractedQuizData.push({
                id: `q_${baseId}_${idx}`,
                question: prompt,
                options: q.options,
                answer: ans,
                distractors: q.options.filter((opt) => opt !== ans),
                explanation:
                  q.explanation || `Core recall question from ${lesson.title || baseId}.`,
              });
            }
          });
        }
        if (lesson.do_now && lesson.do_now.type === 'quiz' && lesson.do_now.questions) {
          lesson.do_now.questions.forEach((q, idx) => {
            extractedQuizData.push({
              id: `q_${baseId}_${idx}`,
              question: q.question,
              options: q.options,
              answer: q.options[q.answer],
              distractors: q.options.filter((opt, i) => i !== q.answer),
              explanation: q.explanation || 'No further explanation provided.',
            });
          });
        }
        if (lesson.part3 && Array.isArray(lesson.part3)) {
          lesson.part3.forEach((stmt, idx) => {
            extractedQuizData.push({
              id: `q_${baseId}_p3_${idx}`,
              question: `True or False: ${stmt.text}`,
              options: ['True', 'False'],
              answer: 'True', // Historically they are all correct core statements
              distractors: ['False'],
              explanation: 'This is a core historical statement from the lesson.',
            });
          });
        }
      });
      if (extractedQuizData.length > 0) {
        state.activeUnitData.quizData = extractedQuizData;
      }
    }

    // Fallback: Map 'timeline' array to 'timelineEvents' if missing but 'timeline' exists
    if (
      !state.activeUnitData.timelineEvents &&
      state.activeUnitData.timeline &&
      Array.isArray(state.activeUnitData.timeline)
    ) {
      state.activeUnitData.timelineEvents = state.activeUnitData.timeline.map((t) => ({
        year: t.date || t.year,
        text: t.description || t.text,
        title: t.title || '',
      }));
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
  }

  updateSidebarForUnit(unitId, state.activeUnitData);
}

function updateSidebarForUnit(unitId, unitData = {}) {
  const navDecisions = document.getElementById('nav-decisions');
  const navTaboo = document.getElementById('nav-taboo');
  const navLessons = document.getElementById('nav-lessons');
  const navInteractive = document.getElementById('nav-interactive');
  const navTimeline = document.getElementById('nav-timeline');
  const navBooklet = document.getElementById('nav-booklet');
  const navIndividuals = document.getElementById('nav-individuals');
  const navReading = document.getElementById('nav-reading');

  const isTrip = unitId === 'trip_ypres' || unitData.type === 'trip';

  if (isTrip) {
    // Battlefield Tour Unit: Only show Tour Itinerary tab
    if (navLessons) {
      navLessons.style.display = 'flex';
      navLessons.dataset.action = 'switch-view';
      navLessons.dataset.view = 'lessons';
      navLessons.dataset.unit = unitId;
      navLessons.innerHTML =
        '<i class="fa-solid fa-map-location-dot"></i><span>Tour Itinerary</span>';
      navLessons.onclick = () => switchView('lessons', unitId);
    }
    if (navInteractive) navInteractive.style.display = 'none';
    if (navTimeline) navTimeline.style.display = 'none';
    if (navBooklet) navBooklet.style.display = 'none';
    if (navDecisions) navDecisions.style.display = 'none';
    if (navTaboo) navTaboo.style.display = 'none';
    if (navIndividuals) navIndividuals.style.display = 'none';
    if (navReading) navReading.style.display = 'none';
    return;
  }

  // Standard Curriculum Unit: Configure applicable tabs
  if (navLessons) {
    navLessons.style.display = 'flex';
    navLessons.dataset.action = 'switch-view';
    navLessons.dataset.view = 'lessons';
    navLessons.dataset.unit = unitId;
    navLessons.innerHTML = '<i class="fa-solid fa-book-open"></i><span>Study Lessons</span>';
    navLessons.onclick = () => switchView('lessons', unitId);
  }

  const hasMasteryRecall =
    !isTrip &&
    ((unitData.lessons && unitData.lessons.length > 0) ||
      (unitData.workbooks && unitData.workbooks.length > 0) ||
      (unitData.quizData && unitData.quizData.length > 0));
  if (navInteractive && hasMasteryRecall) {
    navInteractive.style.display = 'flex';
    navInteractive.dataset.action = 'switch-view';
    navInteractive.dataset.view = 'interactive';
    navInteractive.dataset.unit = unitId;
    navInteractive.innerHTML =
      '<i class="fa-solid fa-circle-question" style="color: #f59e0b;"></i><span>Interactive Quizzing</span>';
    navInteractive.onclick = () => switchView('interactive', unitId);
  } else if (navInteractive) {
    navInteractive.style.display = 'none';
  }

  const hasTimeline =
    (unitData.timelineEvents && unitData.timelineEvents.length > 0) ||
    (unitData.timeline && unitData.timeline.length > 0);
  if (navTimeline && hasTimeline) {
    navTimeline.style.display = 'flex';
    navTimeline.dataset.action = 'switch-view';
    navTimeline.dataset.view = 'timeline';
    navTimeline.dataset.unit = unitId;
    navTimeline.onclick = () => switchView('timeline', unitId);
  } else if (navTimeline) {
    navTimeline.style.display = 'none';
  }

  if (navBooklet) {
    navBooklet.style.display = 'flex';
    navBooklet.dataset.action = 'switch-view';
    navBooklet.dataset.view = 'booklet';
    navBooklet.dataset.unit = unitId;
    navBooklet.onclick = () => switchView('booklet', unitId);
  }

  const keyIndividualsData = unitData.key_individuals || unitData.biographies;
  if (navIndividuals && keyIndividualsData && keyIndividualsData.length > 0) {
    navIndividuals.style.display = 'flex';
    navIndividuals.dataset.action = 'switch-view';
    navIndividuals.dataset.view = 'individuals';
    navIndividuals.dataset.unit = unitId;
    navIndividuals.onclick = () => switchView('individuals', unitId);
  } else if (navIndividuals) {
    navIndividuals.style.display = 'none';
  }

  if (navReading && unitData.guided_reading && unitData.guided_reading.length > 0) {
    navReading.style.display = 'flex';
    navReading.dataset.action = 'switch-view';
    navReading.dataset.view = 'reading';
    navReading.dataset.unit = unitId;
    navReading.onclick = () => switchView('reading', unitId);
  } else if (navReading) {
    navReading.style.display = 'none';
  }

  if (navDecisions && navTaboo) {
    if (
      unitId.startsWith('gcse_') ||
      unitId === 'edexcel_medicine' ||
      unitId === 'eee' ||
      unitId === 'cme_new'
    ) {
      if (unitId === 'gcse_elizabethan_england' || unitId === 'eee') {
        navDecisions.style.display = 'none';
      } else {
        navDecisions.style.display = 'flex';
        navDecisions.dataset.action = 'switch-view';
        navDecisions.dataset.view = 'decisions';
        navDecisions.dataset.unit = unitId;
        navDecisions.onclick = () => switchView('decisions', unitId);
      }
      navTaboo.style.display = 'flex';
      navTaboo.dataset.action = 'switch-view';
      navTaboo.dataset.view = 'taboo';
      navTaboo.dataset.unit = unitId;
      navTaboo.onclick = () => switchView('taboo', unitId);
    } else {
      navDecisions.style.display = 'none';
      navTaboo.style.display = 'none';
    }
  }
}
