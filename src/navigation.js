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
  renderMockExamsView,
  renderProfileView,
  renderDecisionsView,
  renderTabooView,
  renderLessonsView,
  renderIndividualsView,
  renderReadingView,
  renderCompetitionsView,
  renderChessHubView,
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
    updateBreadcrumbs();

    // Update active sidebar nav
    document.querySelectorAll('.sidebar-nav .nav-item').forEach((item) => {
      item.classList.remove('active');
    });
    const navItem = document.getElementById(`nav-${viewName}`);
    if (navItem) navItem.classList.add('active');

    // Update active mobile bottom nav item
    document.querySelectorAll('.mobile-bottom-nav .mob-nav-item').forEach((item) => {
      item.classList.remove('active');
    });
    let activeMobId = null;
    if (viewName === 'dashboard') activeMobId = 'mob-nav-home';
    else if (
      viewName === 'lessons' ||
      viewName === 'timeline' ||
      viewName === 'booklet' ||
      viewName === 'mock-exams' ||
      viewName === 'individuals' ||
      viewName === 'reading' ||
      viewName === 'decisions' ||
      viewName === 'taboo'
    ) {
      activeMobId = 'mob-nav-units';
    } else if (viewName === 'interactive') {
      activeMobId = 'mob-nav-quizzing';
    } else if (viewName === 'profile') {
      activeMobId = 'mob-nav-profile';
    }

    if (activeMobId) {
      const mobEl = document.getElementById(activeMobId);
      if (mobEl) mobEl.classList.add('active');
    }
  });
}

export function scrollToTop(instant = true) {
  const behavior = instant ? 'instant' : 'smooth';
  try {
    window.scrollTo({ top: 0, left: 0, behavior });
  } catch (e) {
    window.scrollTo(0, 0);
  }
  if (document.documentElement) document.documentElement.scrollTop = 0;
  if (document.body) document.body.scrollTop = 0;

  const selectors = [
    '#main-content',
    '.content-container',
    '#content-area',
    '.content-area',
    '.app-body',
    'main',
  ];
  selectors.forEach((sel) => {
    const el = document.querySelector(sel);
    if (el && el.scrollTop !== 0) {
      try {
        el.scrollTo({ top: 0, left: 0, behavior });
      } catch (e) {
        el.scrollTop = 0;
      }
    }
  });
}
window.scrollToTop = scrollToTop;

export function scrollToSection(sectionId) {
  const currentView =
    state.currentView ||
    (window.appStore && window.appStore.state && window.appStore.state.currentView) ||
    'dashboard';

  const performScroll = () => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    const headerOffset = 24;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth',
    });
    el.classList.add('section-highlight');
    setTimeout(() => el.classList.remove('section-highlight'), 1800);
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', '#' + sectionId);
    }
  };

  if (currentView !== 'dashboard') {
    switchView('dashboard').then(() => {
      setTimeout(performScroll, 150);
    });
  } else {
    performScroll();
  }
}
window.scrollToSection = scrollToSection;

export function updateBreadcrumbs(customTrail = null) {
  const breadcrumbs = document.getElementById('header-breadcrumbs');
  if (!breadcrumbs) return;

  const viewName = appStore.state.currentView || state.currentView || 'dashboard';
  const unitId = appStore.state.selectedUnitId || state.selectedUnitId;
  const unitData = appStore.state.activeUnitData || state.activeUnitData || {};

  if (viewName === 'dashboard') {
    breadcrumbs.style.display = 'none';
    breadcrumbs.innerHTML = '';
    return;
  }

  let trail = [];

  const getUnitName = (id) => {
    if (!id) return '';
    if (unitData && unitData.title) {
      const clean = unitData.title
        .split(':')[0]
        .replace(/^(?:Paper \d+:?|KS3:?)\s*/i, '')
        .trim();
      if (clean) return clean;
    }
    if (id === 'cme_new') return 'Middle East (1945–95)';
    if (id === 'edexcel_medicine') return 'Medicine (c1250–present)';
    if (id === 'eee') return 'Elizabethan England';
    if (id === 'weimar_nazi_germany') return 'Weimar & Nazi Germany';
    if (id === 'usa') return 'USA (1954–75)';
    if (id === 'trip_ypres') return 'Ypres Expedition';
    if (id === 'great_war') return 'The Great War';
    return id.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

  if (Array.isArray(customTrail) && customTrail.length > 0) {
    trail = [...customTrail];
  } else {
    trail.push({ label: 'Dashboard', view: 'dashboard' });

    if (
      unitId &&
      (viewName === 'lessons' ||
        viewName === 'interactive' ||
        viewName === 'timeline' ||
        viewName === 'booklet' ||
        viewName === 'mock-exams' ||
        viewName === 'decisions' ||
        viewName === 'taboo' ||
        viewName === 'individuals' ||
        viewName === 'reading')
    ) {
      trail.push({ label: getUnitName(unitId), view: 'lessons', unit: unitId });
    }

    let currentSectionLabel = '';
    if (viewName === 'interactive') currentSectionLabel = 'Interactive Quizzing';
    else if (viewName === 'timeline') currentSectionLabel = 'Chronological Timeline';
    else if (viewName === 'booklet') currentSectionLabel = 'Printable Booklet';
    else if (viewName === 'mock-exams') currentSectionLabel = 'GCSE Mock Exams';
    else if (viewName === 'profile') currentSectionLabel = 'Student Profile';
    else if (viewName === 'curriculum') currentSectionLabel = 'Curriculum Map';
    else if (viewName === 'competitions') currentSectionLabel = 'Competitions & Awards';
    else if (viewName === 'chess') currentSectionLabel = 'Meoncross Chess Club';
    else if (viewName === 'decisions') currentSectionLabel = 'Decisions Game';
    else if (viewName === 'taboo') currentSectionLabel = 'Taboo Recall';
    else if (viewName === 'individuals') currentSectionLabel = 'Key Individuals';
    else if (viewName === 'reading') currentSectionLabel = 'Guided Reading';

    if (currentSectionLabel) {
      trail.push({ label: currentSectionLabel });
    }
  }

  // Guarantee 'Dashboard' is root
  if (trail.length === 0 || trail[0].label !== 'Dashboard') {
    trail.unshift({ label: 'Dashboard', view: 'dashboard' });
  }

  let html = '';
  trail.forEach((item, idx) => {
    const isLast = idx === trail.length - 1;
    if (idx > 0) {
      html += `<span class="breadcrumb-separator"><i class="fa-solid fa-chevron-right"></i></span>`;
    }
    if (isLast) {
      html += `<span class="breadcrumb-item active" title="${item.label}">${item.label}</span>`;
    } else {
      if (item.action) {
        html += `<span class="breadcrumb-item clickable" onclick="(${item.action.toString()})()">${item.label}</span>`;
      } else if (item.view) {
        const uParam = item.unit ? `'${item.unit}'` : 'null';
        html += `<span class="breadcrumb-item clickable" onclick="window.switchView('${item.view}', ${uParam})">${item.label}</span>`;
      } else {
        html += `<span class="breadcrumb-item">${item.label}</span>`;
      }
    }
  });

  breadcrumbs.innerHTML = html;
  breadcrumbs.style.display = 'inline-flex';
}
window.updateBreadcrumbs = updateBreadcrumbs;

export function initDraftPreservation(container = document, scopeKey = 'global') {
  if (!container) return;
  const inputs = container.querySelectorAll(
    '.student-answer-input, .student-task-input, #epz-user-answer, .form-control',
  );
  inputs.forEach((input, idx) => {
    const fieldId = input.id || input.name || `field_${idx}`;
    const storageKey = `hh_draft_${scopeKey}_${fieldId}`;
    input.dataset.draftKey = storageKey;

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved && saved.trim()) {
        input.value = saved;
        let badge = input.parentElement?.querySelector('.draft-restored-badge');
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'draft-restored-badge';
          badge.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Draft restored';
          input.parentElement?.insertBefore(badge, input.nextSibling);
        }
      }
    } catch (err) {}

    let saveTimeout = null;
    input.addEventListener('input', () => {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        try {
          if (input.value && input.value.trim()) {
            localStorage.setItem(storageKey, input.value);
            let badge = input.parentElement?.querySelector('.draft-restored-badge');
            if (badge) {
              badge.innerHTML = '<i class="fa-solid fa-check"></i> Auto-saved';
            }
          } else {
            localStorage.removeItem(storageKey);
          }
        } catch (err) {}
      }, 300);
    });
  });
}
window.initDraftPreservation = initDraftPreservation;

export async function switchView(viewName, param = null, skipHistory = false, options = {}) {
  // Snapshot current scroll position into the current state before leaving if history exists
  if (!skipHistory && typeof window !== 'undefined' && window.history) {
    const currentScroll = window.scrollY || document.documentElement.scrollTop || 0;
    const currentState = window.history.state || {};
    try {
      window.history.replaceState(
        { ...currentState, scrollY: currentScroll },
        '',
        window.location.href,
      );
    } catch (e) {}
  }

  // Only reset scroll if not skipping scroll reset (e.g. restoring on popstate)
  if (!options.skipScrollToTop) {
    scrollToTop(true);
  }

  // Update state; the subscriber will handle UI changes
  appStore.state.currentView = viewName;

  if (!skipHistory) {
    const url = new URL(window.location);
    url.searchParams.set('view', viewName);
    if (param) url.searchParams.set('unit', param);
    else url.searchParams.delete('unit');
    url.searchParams.delete('lesson');
    try {
      window.history.pushState({ view: viewName, unit: param, scrollY: 0 }, '', url);
    } catch (e) {}
  }

  // Clean up unit-specific sidebar navigation on global views
  if (
    viewName === 'dashboard' ||
    viewName === 'profile' ||
    viewName === 'curriculum' ||
    viewName === 'competitions' ||
    viewName === 'chess'
  ) {
    [
      'nav-lessons',
      'nav-interactive',
      'nav-timeline',
      'nav-booklet',
      'nav-mock-exams',
      'nav-decisions',
      'nav-taboo',
      'nav-individuals',
      'nav-reading',
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
  }

  // Map direct unit view aliases
  if (viewName === 'usa' || viewName === 'gcse_usa' || viewName === 'gcse_usa_1954_1975') {
    viewName = 'lessons';
    param = 'usa';
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
  } else if (viewName === 'mock-exams') {
    if (param) await loadUnit(param);
    renderMockExamsView();
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
  } else if (viewName === 'competitions') {
    renderCompetitionsView();
  } else if (viewName === 'chess') {
    renderChessHubView();
  }

  // Update dynamic breadcrumbs
  updateBreadcrumbs();

  // Attach safe draft preservation to newly rendered container
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    initDraftPreservation(mainContent, `${param || viewName}`);
  }

  // Secondary tick to ensure newly injected DOM content stays at top if not restoring scroll
  if (!options.skipScrollToTop) {
    requestAnimationFrame(() => scrollToTop(true));
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
        text: t.detail || t.description || t.text || '',
        title: t.title || t.event || '',
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
  const navMockExams = document.getElementById('nav-mock-exams');
  const navIndividuals = document.getElementById('nav-individuals');
  const navReading = document.getElementById('nav-reading');

  const isTrip = unitId === 'trip_ypres' || unitData.type === 'trip';

  if (isTrip) {
    // Battlefield Tour Unit: Configure Tour Itinerary tab and Pupil Family Hero tab
    if (navLessons) {
      navLessons.style.display = 'flex';
      navLessons.dataset.action = 'switch-view';
      navLessons.dataset.view = 'lessons';
      navLessons.dataset.unit = unitId;
      navLessons.innerHTML =
        '<i class="fa-solid fa-map-location-dot"></i><span>Tour Itinerary</span>';
      navLessons.onclick = () => switchView('lessons', unitId);
    }
    if (navIndividuals) {
      navIndividuals.style.display = 'flex';
      navIndividuals.dataset.action = 'switch-view';
      navIndividuals.dataset.view = 'lessons';
      navIndividuals.dataset.unit = unitId;
      navIndividuals.innerHTML =
        '<i class="fa-solid fa-medal" style="color: #f59e0b;"></i><span>Family Hero: 2nd Lt Crummack</span>';
      navIndividuals.onclick = () => {
        const uData =
          state.db && state.db[unitId] ? state.db[unitId] : state.activeUnitData || unitData;
        const idx = (uData.lessons || []).findIndex((l) => l.id === 'hero_crummack');
        if (idx !== -1 && typeof window.renderLessonByIndex === 'function') {
          window.renderLessonByIndex(idx);
        } else {
          switchView('lessons', unitId);
        }
      };
    }
    if (navInteractive) navInteractive.style.display = 'none';
    if (navTimeline) navTimeline.style.display = 'none';
    if (navBooklet) navBooklet.style.display = 'none';
    if (navMockExams) navMockExams.style.display = 'none';
    if (navDecisions) navDecisions.style.display = 'none';
    if (navTaboo) navTaboo.style.display = 'none';
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

  const hasMasteryRecall = !isTrip;
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

  const hasMockExams = Boolean(
    unitData.mock_exams && Array.isArray(unitData.mock_exams) && unitData.mock_exams.length > 0,
  );
  if (navMockExams && hasMockExams) {
    navMockExams.style.display = 'flex';
    navMockExams.dataset.action = 'switch-view';
    navMockExams.dataset.view = 'mock-exams';
    navMockExams.dataset.unit = unitId;
    navMockExams.onclick = () => switchView('mock-exams', unitId);
  } else if (navMockExams) {
    navMockExams.style.display = 'none';
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
      unitId === 'cme_new' ||
      unitId === 'weimar_nazi_germany' ||
      unitId === 'usa'
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
