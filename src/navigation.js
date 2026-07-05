/**
 * Navigation & Routing Controller for Meoncross History Mega App
 */

import { state } from './state.js';
import { parseMarkdown } from './markdown_parser.js';
import { renderDashboard, renderInteractiveQuiz, renderTimeline, renderBookletView, renderProfileView } from './views.js';

export async function switchView(viewName, param = null) {
  state.currentView = viewName;
  
  // Manage Back Button
  const backBtn = document.getElementById('header-back-btn');
  if (backBtn) {
    if (viewName === 'dashboard') {
      backBtn.style.display = 'none';
    } else {
      backBtn.style.display = 'flex';
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
        <span onclick="window.switchView('dashboard')" style="cursor: pointer; text-decoration: underline; color: var(--primary);">Dashboard</span>
        <span style="opacity: 0.5;"> / </span>
        <span>${displayName}</span>
      `;
      breadcrumbs.style.display = 'inline-block';
    }
  }

  // Update active sidebar nav
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
    item.classList.remove('active');
  });
  const navItem = document.getElementById(`nav-${viewName}`);
  if (navItem) navItem.classList.add('active');

  // Handle views
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
  }
}

// Dynamically fetch and parse the Markdown for a unit
async function loadUnit(unitId) {
  if (state.selectedUnitId === unitId && state.activeUnitData.subtopics.length > 0) {
    return; // Already loaded
  }

  state.selectedUnitId = unitId;
  const path = unitId.startsWith('gcse_') ? `content/gcse/${unitId}.md` : `content/ks3/${unitId}.md`;
  
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load ${path}`);
    }
    const mdText = await response.text();
    state.activeUnitData = parseMarkdown(mdText, unitId);
    
    // Add loaded questions to general index to support Leitner status mapping
    if (!state.allQuestions) state.allQuestions = [];
    state.activeUnitData.quizData.forEach(q => {
      if (!state.allQuestions.some(existing => existing.id === q.id)) {
        state.allQuestions.push(q);
      }
    });
  } catch (err) {
    console.error("Error loading unit:", err);
    alert(`Could not load unit: ${unitId}. Please ensure the content file exists.`);
  }
}
