import { state } from './state.js';
import { QUIZ_DATA, CONSEQUENCE_SKILLS_DATA, NARRATIVE_SKILLS_DATA, EXAM_SKILLS_DATA } from '../questions.js';
import { AudioEngine } from './audio.js';
import { switchView, switchSubtopicMode } from './navigation.js';
import { setMastered, toggleBookmark, getActiveProfile, getProfileStorageKey } from './storage.js';
import { Confetti } from './confetti.js';
import { LESSONS_DATA } from './lessons_data.js';
import { GLOSSARY_TERMS } from './glossary_data.js';
import { openWorkbookModal } from './lessons.js';
import { MASTERY_DATA } from './mastery_data.js';
import { DECISIONS_DATA } from './decisions_data.js';
import { MINDMAP_DATA } from './mindmap_data.js';
import { getFallbackUrl } from './image_fallback.js';
import { GOING_BEYOND_DATA } from './going_beyond_data.js';
import { KEY_TOPICS_OVERVIEWS } from './key_topics_data.js';
import { VIDEOS_DATA } from './videos_data.js';

let gamesModule = null;
let flashcardUpgrades = null;

// --- Dynamic Renders ---

export function getLevelTitle(level) {
  const titles = {
    1: "Novice Historian",
    2: "Diplomatic Envoy",
    3: "Strategic Mediator",
    4: "Coalition Commander",
    5: "Chief Peacekeeper"
  };
  return titles[level] || "Veteran Scholar";
}

export function getXpForNextLevel(level) {
  const levels = {
    1: 100,
    2: 300,
    3: 600,
    4: 1000,
    5: 2000
  };
  return levels[level] || 999999;
}

export function showToast(message, type = 'info', actionText = null, actionCallback = null) {
  let container = document.getElementById('app-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'app-toast-container';
    container.style.position = 'fixed';
    container.style.bottom = '24px';
    container.style.right = '24px';
    container.style.zIndex = '9999';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '10px';
    container.style.maxWidth = '360px';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = `app-toast toast-${type}`;
  toast.style.background = 'var(--bg-card)';
  toast.style.border = '1px solid var(--border-glass)';
  toast.style.borderRadius = 'var(--border-radius-sm)';
  toast.style.padding = '14px 18px';
  toast.style.boxShadow = 'var(--shadow-lg)';
  toast.style.display = 'flex';
  toast.style.flexDirection = 'column';
  toast.style.gap = '8px';
  toast.style.color = 'var(--text-main)';
  toast.style.fontSize = '0.88rem';
  toast.style.lineHeight = '1.4';
  toast.style.transform = 'translateY(100px)';
  toast.style.opacity = '0';
  toast.style.transition = 'all var(--transition-normal)';
  
  let leftBorderColor = 'var(--primary)';
  if (type === 'success') leftBorderColor = 'var(--success)';
  if (type === 'warning') leftBorderColor = 'var(--accent)';
  toast.style.borderLeft = `4px solid ${leftBorderColor}`;
  
  let actionHtml = '';
  if (actionText && actionCallback) {
    actionHtml = `<button class="toast-action-btn" style="background: var(--primary); border: none; color: #fff; padding: 6px 12px; font-size: 0.75rem; font-weight: bold; border-radius: 4px; cursor: pointer; align-self: flex-start; margin-top: 4px;">${actionText}</button>`;
  }
  
  toast.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
      <div style="flex: 1;">${message}</div>
      <button class="toast-close-btn" style="background: none; border: none; color: var(--text-muted); cursor: pointer; padding: 0; font-size: 0.9rem; line-height: 1;"><i class="fa-solid fa-xmark"></i></button>
    </div>
    ${actionHtml}
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  }, 10);
  
  const closeBtn = toast.querySelector('.toast-close-btn');
  closeBtn.addEventListener('click', () => {
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  });
  
  if (actionText && actionCallback) {
    const actionBtn = toast.querySelector('.toast-action-btn');
    actionBtn.addEventListener('click', () => {
      actionCallback();
      toast.remove();
    });
  }
  
  if (!actionText) {
    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
      }
    }, 5000);
  }
}

export function showWarningToast(message) {
  showToast(`<i class="fa-solid fa-triangle-exclamation" style="color: var(--accent); margin-right: 6px;"></i> ${message}`, 'warning');
}

export function showLevelUpNotification(level) {
  const title = getLevelTitle(level);
  showToast(`🎉 <strong>Level Up!</strong> You are now a <strong>Level ${level}: ${title}</strong>!`, 'success');
}

export function addXp(amount) {
  if (!state.userStats) {
    state.userStats = { xp: 0, level: 1, streak: 0, lastLoginDate: null };
  }
  state.userStats.xp += amount;
  
  // Update Live XP Counter Badge
  const headerXpEl = document.getElementById('header-xp-value');
  if (headerXpEl) {
    headerXpEl.textContent = state.userStats.xp;
  }
  const badge = document.getElementById('live-xp-counter-badge');
  if (badge) {
    badge.style.transform = 'scale(1.15)';
    badge.style.borderColor = 'var(--primary)';
    badge.style.background = 'rgba(59, 130, 246, 0.18)';
    setTimeout(() => {
      badge.style.transform = '';
      badge.style.borderColor = '';
      badge.style.background = '';
    }, 250);
  }

  let currentLevel = state.userStats.level;
  let nextXpThreshold = getXpForNextLevel(currentLevel);
  
  while (state.userStats.xp >= nextXpThreshold && currentLevel < 5) {
    currentLevel++;
    nextXpThreshold = getXpForNextLevel(currentLevel);
  }
  
  if (currentLevel > state.userStats.level) {
    state.userStats.level = currentLevel;
    setTimeout(() => {
      AudioEngine.play('cheer');
      if (typeof Confetti !== 'undefined' && typeof Confetti.spawn === 'function') {
        Confetti.spawn(100);
      }
      showLevelUpNotification(currentLevel);
    }, 500);
  }
  
  localStorage.setItem(getProfileStorageKey('edexcel_prefs_user_stats'), JSON.stringify(state.userStats));
  if (state.currentView === 'dashboard') {
    renderPlayerProfileWidget();
  }
}

export function renderPlayerProfileWidget() {
  const container = document.getElementById('dashboard-player-profile-container');
  if (!container) return;
  
  const stats = state.userStats || { xp: 0, level: 1, streak: 0, lastLoginDate: null };
  const levelTitle = getLevelTitle(stats.level);
  const nextXp = getXpForNextLevel(stats.level);
  const prevXp = stats.level === 1 ? 0 : getXpForNextLevel(stats.level - 1);
  const levelProgressPct = stats.level === 5 ? 100 : Math.round(((stats.xp - prevXp) / (nextXp - prevXp)) * 100);
  const activeProfile = getActiveProfile();
  
  container.innerHTML = `
    <div class="gamification-widget" style="padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; gap: 12px; border: 1px solid var(--border-glass); background: rgba(0, 0, 0, 0.15); border-radius: var(--border-radius-sm); height: 72px; box-sizing: border-box; cursor: pointer;">
      <div style="display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0;">
        <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--primary-glow); border: 2px solid var(--primary); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; color: var(--primary); font-weight: bold; flex-shrink: 0;" title="Level ${stats.level}">
          ${stats.level}
        </div>
        <div style="flex: 1; text-align: left; min-width: 0;">
          <div style="font-size: 0.55rem; text-transform: uppercase; font-weight: 700; color: var(--text-muted); letter-spacing: 0.5px; line-height: 1;">Level ${stats.level} Profile: ${activeProfile}</div>
          <div style="font-family: var(--font-heading); font-size: 0.85rem; font-weight: 800; color: var(--text-main); margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${levelTitle}">${levelTitle}</div>
          
          <!-- XP Progress Bar -->
          <div style="margin-top: 3px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.6rem; color: var(--text-muted); margin-bottom: 2px; line-height: 1;">
              <span>XP: ${stats.xp}/${stats.level === 5 ? 'Max' : nextXp}</span>
              <span>${levelProgressPct}%</span>
            </div>
            <div style="height: 4px; background: rgba(255,255,255,0.05); border-radius: 2px; overflow: hidden; border: 1px solid var(--border-glass);">
              <div style="height: 100%; background: var(--primary); width: ${levelProgressPct}%;"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Streak Inside Profile -->
      <div class="streak-widget-panel" style="display: flex; align-items: center; gap: 6px; background: rgba(239, 68, 68, 0.08); padding: 6px 10px; border: 1px solid rgba(239, 68, 68, 0.25); border-radius: var(--border-radius-sm); flex-shrink: 0;" title="Study Streak">
        <i class="fa-solid fa-fire" style="color: var(--accent); font-size: 1.1rem;"></i>
        <div style="text-align: left;">
          <span style="font-size: 0.55rem; text-transform: uppercase; font-weight: 700; color: var(--text-muted); display: block; line-height: 1;">Streak</span>
          <strong style="font-size: 0.85rem; color: var(--text-main); line-height: 1.1; white-space: nowrap;">${stats.streak} Days</strong>
        </div>
      </div>
    </div>
  `;

  const widget = container.querySelector('.gamification-widget');
  if (widget) {
    widget.addEventListener('click', () => {
      AudioEngine.play('click');
      switchView('leaderboard');
    });
  }
}

// 1. Sidebar sub-topic items
function renderSidebarNav() {
  const container = document.getElementById('topics-nav-list');
  container.innerHTML = '';
  
  let lessonCounter = 1;

  QUIZ_DATA.forEach(topic => {
    topic.subtopics.forEach(sub => {
      const a = document.createElement('a');
      a.className = 'nav-item';
      a.id = `nav-subtopic-${sub.id}`;
      a.title = sub.title;
      
      const subDescText = sub.title.split(':').slice(1).join(':').trim() || sub.title;
      
      // Calculate individual subtopic progress
      const subQuestions = state.allQuestions.filter(q => q.subtopicId === sub.id);
      const mastered = subQuestions.filter(q => state.mastery[q.id]);
      const pct = subQuestions.length > 0 ? Math.round((mastered.length / subQuestions.length) * 100) : 0;
      
      a.innerHTML = `
        <span class="nav-item-content" style="flex-shrink: 0; font-weight: 600;">
          Lesson ${lessonCounter++}
        </span>
        <span class="nav-item-desc" style="flex: 1; min-width: 0; margin: 0 8px; font-size: 0.72rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: left; opacity: 0.85;" title="${subDescText}">
          ${subDescText}
        </span>
        <span class="nav-item-progress" id="nav-pct-${sub.id}" style="flex-shrink: 0;">${pct}%</span>
      `;
      
      a.addEventListener('click', () => {
        AudioEngine.play('click');
        switchView('subtopic', sub.id);
      });
      
      container.appendChild(a);
    });
  });

    const wbHeader = document.createElement('div');
  wbHeader.innerHTML = '<i class="fa-solid fa-book" style="margin-right: 5px;"></i> <strong>Printable Workbooks</strong>';
  wbHeader.style.marginTop = '25px';
  wbHeader.style.color = '#334155';
  wbHeader.style.fontSize = '0.9rem';
  wbHeader.style.paddingLeft = '5px';
  wbHeader.style.textTransform = 'uppercase';
  wbHeader.style.letterSpacing = '0.5px';
  container.appendChild(wbHeader);

  for (let ktNum = 1; ktNum <= 3; ktNum++) {
    const workbookLink = document.createElement('a');
    workbookLink.className = 'nav-item';
    workbookLink.innerHTML = `
      <span class="nav-item-content" style="flex-shrink: 0; font-weight: 700; color: var(--primary);">
        <i class="fa-solid fa-book-open"></i> KT${ktNum} Workbook
      </span>
    `;
    workbookLink.href = `/cme_workbooks/workbook_KT${ktNum}.html`;
    workbookLink.target = '_blank';
    workbookLink.style.marginTop = '8px';
    workbookLink.style.border = '2px dashed var(--primary)';
    workbookLink.style.background = 'rgba(59, 130, 246, 0.05)';
    
    container.appendChild(workbookLink);
  }
  
  updateBookmarksUI();
}

function updateBookmarksUI() {
  const badge = document.getElementById('bookmarks-count-badge');
  if (badge) badge.textContent = state.bookmarks.length;
  
  const sideCount = document.getElementById('bookmarks-count-display');
  if (sideCount) sideCount.textContent = `${state.bookmarks.length} card${state.bookmarks.length === 1 ? '' : 's'} bookmarked`;
}

// 2. Global statistics calculation
function updateGlobalStats() {
  const total = state.allQuestions.length;
  const totalMastered = state.allQuestions.filter(q => state.mastery[q.id]).length;
  const overallPct = total > 0 ? Math.round((totalMastered / total) * 100) : 0;
  
  // Easy
  const easyQuestions = state.allQuestions.filter(q => q.type === 'easy');
  const easyMastered = easyQuestions.filter(q => state.mastery[q.id]).length;
  const easyPct = easyQuestions.length > 0 ? Math.round((easyMastered / easyQuestions.length) * 100) : 0;
  
  // Medium
  const mediumQuestions = state.allQuestions.filter(q => q.type === 'medium');
  const mediumMastered = mediumQuestions.filter(q => state.mastery[q.id]).length;
  const mediumPct = mediumQuestions.length > 0 ? Math.round((mediumMastered / mediumQuestions.length) * 100) : 0;
  
  // Difficult
  const difficultQuestions = state.allQuestions.filter(q => q.type === 'difficult');
  const difficultMastered = difficultQuestions.filter(q => state.mastery[q.id]).length;
  const difficultPct = difficultQuestions.length > 0 ? Math.round((difficultMastered / difficultQuestions.length) * 100) : 0;
  
  // Update DOM values
  const overallProgress = document.getElementById('stat-overall-progress');
  if (overallProgress) overallProgress.textContent = `${overallPct}%`;
  const overallProgressBar = document.getElementById('stat-overall-progress-bar');
  if (overallProgressBar) overallProgressBar.style.width = `${overallPct}%`;
  const overallFraction = document.getElementById('stat-overall-fraction');
  if (overallFraction) overallFraction.textContent = `${totalMastered} / ${total}`;

  const headerProgressVal = document.getElementById('header-progress-value');
  if (headerProgressVal) headerProgressVal.textContent = `${overallPct}%`;
  
  const easyProgress = document.getElementById('stat-easy-progress');
  if (easyProgress) easyProgress.textContent = `${easyPct}%`;
  const easyProgressBar = document.getElementById('stat-easy-progress-bar');
  if (easyProgressBar) easyProgressBar.style.width = `${easyPct}%`;
  const easyFraction = document.getElementById('stat-easy-fraction');
  if (easyFraction) easyFraction.textContent = `${easyMastered} / ${easyQuestions.length}`;
  
  const mediumProgress = document.getElementById('stat-medium-progress');
  if (mediumProgress) mediumProgress.textContent = `${mediumPct}%`;
  const mediumProgressBar = document.getElementById('stat-medium-progress-bar');
  if (mediumProgressBar) mediumProgressBar.style.width = `${mediumPct}%`;
  const mediumFraction = document.getElementById('stat-medium-fraction');
  if (mediumFraction) mediumFraction.textContent = `${mediumMastered} / ${mediumQuestions.length}`;
  
  const difficultProgress = document.getElementById('stat-difficult-progress');
  if (difficultProgress) difficultProgress.textContent = `${difficultPct}%`;
  const difficultProgressBar = document.getElementById('stat-difficult-progress-bar');
  if (difficultProgressBar) difficultProgressBar.style.width = `${difficultPct}%`;
  const difficultFraction = document.getElementById('stat-difficult-fraction');
  if (difficultFraction) difficultFraction.textContent = `${difficultMastered} / ${difficultQuestions.length}`;
  
  // Update sidebar subtopic nav percentages
  QUIZ_DATA.forEach(topic => {
    topic.subtopics.forEach(sub => {
      const subQuestions = state.allQuestions.filter(q => q.subtopicId === sub.id);
      const mastered = subQuestions.filter(q => state.mastery[q.id]);
      const pct = subQuestions.length > 0 ? Math.round((mastered.length / subQuestions.length) * 100) : 0;
      
      const badge = document.getElementById(`nav-pct-${sub.id}`);
      if (badge) badge.textContent = `${pct}%`;
    });
  });
}

// 3. Render Dashboard list
const topicInquiries = {
  'topic_1': 'How was the State of Israel created and what were the consequences of the 1948–49 war?',
  'topic_2': 'Why did the Arab-Israeli conflict escalate and what were the outcomes of the 1967 and 1973 wars?',
  'topic_3': 'How did superpowers and peace summits attempt to resolve the conflict, and why did the peace process struggle?'
};

const subtopicInquiries = {
  "subtopic_1_1": "How did the British withdrawal lead to the creation of Israel, 1945–48?",
  "subtopic_1_2": "What were the causes and consequences of the 1948–49 Arab-Israeli War?",
  "subtopic_1_3": "Why did the nationalisation of the Suez Canal spark a major international crisis in 1956?",
  "subtopic_2_1": "How did tensions escalate to cause the outbreak and swift outcome of the 1967 Six Day War?",
  "subtopic_2_2": "Why did Palestinian nationalism grow and what impact did it have on the conflict?",
  "subtopic_2_3": "Why did the Yom Kippur War break out in 1973 and how did it change the balance of power?",
  "subtopic_3_1": "How was a historic peace accord achieved between Egypt and Israel at Camp David?",
  "subtopic_3_2": "What were the causes and consequences of the Israeli invasion of Lebanon and the First Intifada?",
  "subtopic_3_3": "How did the Oslo Accords attempt to resolve the conflict, and why did they ultimately stall?"
};

function renderDashboard() {
  const container = document.getElementById('dashboard-topics-list');
  container.innerHTML = '';
  
  QUIZ_DATA.forEach(topic => {
    const card = document.createElement('div');
    card.className = 'topic-list-card';
    
    // Topic header progress
    const topicQuestions = state.allQuestions.filter(q => q.topicId === topic.id);
    const mastered = topicQuestions.filter(q => state.mastery[q.id]);
    const pct = topicQuestions.length > 0 ? Math.round((mastered.length / topicQuestions.length) * 100) : 0;
    
    let subtopicsHTML = '';
    topic.subtopics.forEach(sub => {
      const subQs = state.allQuestions.filter(q => q.subtopicId === sub.id);
      const subMastered = subQs.filter(q => state.mastery[q.id]).length;
      const subPct = subQs.length > 0 ? Math.round((subMastered / subQs.length) * 100) : 0;
      
      const cleanTitle = sub.title.replace(/^Topic (\d+\.\d+):\s*/, "KT $1: ");
      
      subtopicsHTML += `
        <div class="dashboard-subtopic-row" data-subtopic-id="${sub.id}">
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; gap: 8px;">
            <span style="color: var(--text-main); font-family: var(--font-heading); font-size: 0.82rem; font-weight: 700;">
              ${cleanTitle}
            </span>
            <span class="subtopic-pct-badge" style="font-size: 0.7rem; ${subPct === 0 ? 'background: rgba(148, 163, 184, 0.15); color: var(--text-muted);' : 'background: #ffb703; color: #0b0f19; font-weight: 800;'} padding: 2px 6px; border-radius: 10px; font-weight: 700; flex-shrink: 0;">
              ${subPct}%
            </span>
          </div>
          <div style="font-size: 0.72rem; color: var(--text-muted); line-height: 1.35; font-weight: 500; display: flex; justify-content: space-between; align-items: center; margin: 2px 0 4px 0; width: 100%;">
            <span style="font-style: italic; color: var(--text-muted); opacity: 0.95;">${subtopicInquiries[sub.id] || ''}</span>
            <span style="font-size: 0.68rem; font-weight: 600; opacity: 0.85; flex-shrink: 0; margin-left: 8px;">${subMastered}/${subQs.length} Secured</span>
          </div>
          <div class="topic-list-progress-bar" style="height: 4px; margin: 0; background: rgba(255,255,255,0.05); border-radius: 2px; overflow: hidden; width: 100%;">
            <div class="topic-list-progress-fill" style="width: ${subPct}%; height: 100%; background: var(--primary); border-radius: 2px;"></div>
          </div>
          <div style="margin-top: 8px; display: flex; justify-content: flex-end; position: relative; z-index: 20;">
            <button class="mastery-btn print-workbook-btn" data-subtopic="${sub.id}" style="background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; color: #10b981; font-size: 0.7rem; font-weight: 700; padding: 4px 8px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 4px;" onmouseover="this.style.background='rgba(16, 185, 129, 0.2)'" onmouseout="this.style.background='rgba(16, 185, 129, 0.1)'">
              <i class="fa-solid fa-print"></i> Lesson Workbook
            </button>
          </div>
        </div>
      `;
    });
    
    const inquiryText = topicInquiries[topic.id] || '';
    const mainBadgeStyle = pct === 0 
      ? 'background: rgba(148, 163, 184, 0.15); color: var(--text-muted);' 
      : 'background: #ffb703; color: #0b0f19; font-weight: 800;';

        let topicIcon = 'fa-book-open';
    if (topic.id === 'topic_1') topicIcon = 'fa-monument';
    else if (topic.id === 'topic_2') topicIcon = 'fa-jet-fighter';
    else if (topic.id === 'topic_3') topicIcon = 'fa-dove';
    
    let workbookTabHTML = '';
    let ktNumber = topic.id === 'topic_1' ? 'KT1' : topic.id === 'topic_2' ? 'KT2' : topic.id === 'topic_3' ? 'KT3' : '';
    if (ktNumber) {
      workbookTabHTML = `
      <div style="display: flex; justify-content: flex-end; margin-bottom: 0px; z-index: 10; position: relative;">
        <a href="/cme_workbooks/workbook_${ktNumber}_v2.html" target="_blank" title="Open ${ktNumber} Workbook (v2)" style="background: rgba(255,183,3,0.15); border: 1px solid var(--accent); border-bottom: 1px solid rgba(255,183,3,0.3); border-radius: 8px 0 0 0; padding: 4px 14px; font-size: 0.75rem; font-weight: 600; color: #ffb703; text-decoration: none; display: flex; align-items: center; gap: 6px; transition: all 0.2s; margin-top: -8px; margin-right: 0px;" onmouseover="this.style.background='rgba(255,183,3,0.25)'" onmouseout="this.style.background='rgba(255,183,3,0.15)'" onclick="event.stopPropagation();">
          <i class="fa-solid fa-book-open"></i> v2 Workbook
        </a>
        <a href="/cme_workbooks/workbook_${ktNumber}.html" target="_blank" title="Open ${ktNumber} Workbook (Original)" style="background: rgba(255,255,255,0.08); border: 1px solid var(--border-glass); border-bottom: 1px solid rgba(255,255,255,0.1); border-radius: 0 8px 0 0; padding: 4px 14px; font-size: 0.75rem; font-weight: 600; color: var(--accent); text-decoration: none; display: flex; align-items: center; gap: 6px; transition: all 0.2s; margin-top: -8px; margin-right: 8px;" onmouseover="this.style.background='rgba(255,255,255,0.15)'" onmouseout="this.style.background='rgba(255,255,255,0.08)'" onclick="event.stopPropagation();">
          <i class="fa-solid fa-file-pdf"></i> v1
        </a>
      </div>`;
    }

    card.innerHTML = `
      ${workbookTabHTML}
      <div class="topic-list-info" style="border-bottom: 1px solid var(--border-glass); padding-bottom: 12px; margin-bottom: 6px; display: flex; flex-direction: column; width: 100%; gap: 6px; min-height: 105px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%; gap: 10px;">
          <div style="display: flex; gap: 10px; align-items: flex-start;">
            <div style="width: 32px; height: 32px; border-radius: 8px; background: var(--primary-glow); border: 1px solid var(--border-glass); display: flex; align-items: center; justify-content: center; color: var(--primary); font-size: 1rem; flex-shrink: 0; margin-top: 2px;">
              <i class="fa-solid ${topicIcon}"></i>
            </div>
            <span class="topic-list-name" style="font-family: var(--font-heading); font-size: 1.05rem; font-weight: 700; color: var(--text-main); line-height: 1.25;">
              ${topic.title}
            </span>
          </div>
          <span class="nav-item-progress" style="font-size: 0.75rem; ${mainBadgeStyle} padding: 2px 8px; border-radius: 12px; font-weight: 700; flex-shrink: 0; margin-left: 8px;">${pct}%</span>
        </div>
        <div class="topic-list-inquiry" style="font-size: 0.78rem; color: var(--text-main); opacity: 0.8; font-style: italic; line-height: 1.3; margin-top: 4px; display: flex; align-items: flex-start; gap: 6px; width: 100%;">
          <i class="fa-solid fa-compass" style="color: var(--accent); margin-top: 2px; flex-shrink: 0; font-size: 0.85rem;"></i>
          <span>${inquiryText}</span>
        </div>
      </div>
      <div class="topic-list-progress-bar" style="height: 4px; margin-bottom: 10px; background: rgba(255,255,255,0.05);">
        <div class="topic-list-progress-fill" style="width: ${pct}%;"></div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${subtopicsHTML}
      </div>
    `;
    
    // Attach individual subtopic row clicks
    if (card.querySelectorAll) {
      card.querySelectorAll('.print-workbook-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          AudioEngine.play('click');
          const subId = btn.getAttribute('data-subtopic');
          openWorkbookModal(subId);
        });
      });

      card.querySelectorAll('.dashboard-subtopic-row').forEach(row => {
        row.addEventListener('click', (e) => {
          e.stopPropagation(); // Avoid triggering card click
          const subId = row.getAttribute('data-subtopic-id');
          AudioEngine.play('click');
          switchView('subtopic', subId);
        });
      });
    }
    
    // Clicking anywhere on topic card (except subtopics) takes user to the Key Topic Overview page
    card.addEventListener('click', (e) => {
      // Don't trigger if click was inside interactive elements or subtopic rows
      if (e.target.closest('.dashboard-subtopic-row') || e.target.closest('a') || e.target.closest('button')) return;
      AudioEngine.play('click');
      switchView('key-topic', topic.id);
    });
    
    container.appendChild(card);
  });
  renderPlayerProfileWidget();
}


function highlightCausalConnectives(text) {
  if (!text) return "";
  return text.replace(/\b(As\s+a\s+result|Consequently|This\s+led\s+to|led\s+directly\s+to|leading\s+directly\s+to|One\s+consequence\s+was|Because)\b/gi, '<strong>$1</strong>');
}



// 8. Exam Skills Practice View (SPA Integration)
// 8. Exam Skills Practice View (SPA Integration)
function renderExamSkillsView() {
  // Consequence reset
  const consSelect = document.getElementById('consequence-topic-select');
  if (consSelect) consSelect.value = "";
  document.getElementById('consequence-question-card').style.display = 'none';
  document.getElementById('consequence-input-area').style.display = 'none';
  document.getElementById('consequence-clue-box').style.display = 'none';
  document.getElementById('consequence-answer-box').style.display = 'none';
  for (let i = 1; i <= 4; i++) {
    const chk = document.getElementById(`chk-consequence-rubric-${i}`);
    if (chk) chk.checked = false;
  }

  // Narrative reset
  const narSelect = document.getElementById('narrative-topic-select');
  if (narSelect) narSelect.value = "";
  document.getElementById('narrative-question-card').style.display = 'none';
  document.getElementById('narrative-sorter-area').style.display = 'none';
  document.getElementById('narrative-input-area').style.display = 'none';
  document.getElementById('narrative-answer-box').style.display = 'none';
  document.getElementById('seq-select-1').innerHTML = '<option value="" disabled selected>-- Choose Event --</option>';
  document.getElementById('seq-select-2').innerHTML = '<option value="" disabled selected>-- Choose Event --</option>';
  document.getElementById('seq-select-3').innerHTML = '<option value="" disabled selected>-- Choose Event --</option>';
  document.getElementById('seq-row-1').className = 'sequence-item-container';
  document.getElementById('seq-row-2').className = 'sequence-item-container';
  document.getElementById('seq-row-3').className = 'sequence-item-container';
  document.getElementById('sequence-status-msg').innerHTML = "Select all three events to verify chronology.";
  document.getElementById('narrative-user-answer').value = "";
  document.querySelectorAll('.process-word').forEach(chip => chip.classList.remove('used'));
  for (let i = 1; i <= 4; i++) {
    const chk = document.getElementById(`chk-narrative-rubric-${i}`);
    if (chk) chk.checked = false;
  }

  // Importance reset
  const impSelect = document.getElementById('importance-topic-select');
  if (impSelect) impSelect.value = "";
  document.getElementById('importance-question-card').style.display = 'none';
  document.getElementById('importance-input-area').style.display = 'none';
  document.getElementById('importance-clue-box').style.display = 'none';
  document.getElementById('importance-answer-box').style.display = 'none';
  for (let i = 1; i <= 4; i++) {
    const chk = document.getElementById(`chk-importance-rubric-${i}`);
    if (chk) chk.checked = false;
  }

  // Show all exam practice panels stacked vertically
  document.querySelectorAll('.exam-panel-content').forEach(p => p.style.display = 'block');
}

export let activeClassicFilter = 'all';
export function setActiveClassicFilter(val) {
  activeClassicFilter = val;
}

function renderClassicView() {
  const container = document.getElementById('classic-list-container');
  container.innerHTML = '';
  
  const subtopicId = state.selectedSubtopicId;
  let questions = state.allQuestions.filter(q => q.subtopicId === subtopicId);
  
  // Filter questions
  if (activeClassicFilter === 'easy') {
    questions = questions.filter(q => q.type === 'easy');
  } else if (activeClassicFilter === 'medium') {
    questions = questions.filter(q => q.type === 'medium');
  } else if (activeClassicFilter === 'difficult') {
    questions = questions.filter(q => q.type === 'difficult');
  } else if (activeClassicFilter === 'unmastered') {
    questions = questions.filter(q => !state.mastery[q.id]);
  }
  
  // Update count display
  document.getElementById('subtopic-count-display').textContent = `${questions.length} question${questions.length === 1 ? '' : 's'} displayed`;
  
  if (questions.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-box-open"></i>
        <h3>No Questions Found</h3>
        <p>Try changing your filter settings or complete more study cards to populate this list.</p>
      </div>
    `;
    return;
  }
  
  questions.forEach((q, idx) => {
    const isMastered = !!state.mastery[q.id];
    const isBookmarked = state.bookmarks.includes(q.id);
    
    const details = document.createElement('details');
    details.className = 'quiz-card-details';
    details.id = `accordion-${q.id}`;
        details.innerHTML = `
      <summary class="quiz-card-summary">
        <div class="summary-content">
          <span class="summary-num">${idx + 1}</span>
          <span class="summary-text">${q.question}</span>
        </div>
        <div class="summary-badges">
          <span class="badge badge-${q.type}">${q.type.charAt(0).toUpperCase() + q.type.slice(1)}</span>
          <span class="badge badge-year">${q.year}</span>
          <div class="mastery-checkbox-container ${isMastered ? 'mastered' : ''}" data-qid="${q.id}" title="Mark as Mastered">
            <i class="fa-solid fa-check"></i>
          </div>
          <i class="fa-solid fa-chevron-down summary-arrow"></i>
        </div>
      </summary>
      <div class="details-content">
        <div class="answer-header">
          <i class="fa-solid fa-circle-check"></i> Correct Key Term / Answer
        </div>
        <div class="answer-value">${q.answer}</div>
        <div class="explanation-value">${q.explanation}</div>
      </div>
    `;
    const checkBtn = details.querySelector('.mastery-checkbox-container');
    checkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const nextState = !checkBtn.classList.contains('mastered');
      setMastered(q.id, nextState);
      checkBtn.classList.toggle('mastered', nextState);
      
      // Update checkmark UI inside
      if (nextState) {
        AudioEngine.play('success');
      } else {
        AudioEngine.play('click');
      }
    });

    details.addEventListener('toggle', () => {
      if (details.open) {
        AudioEngine.play('flip');
      }
    });
    
    container.appendChild(details);
  });
}

// 5. Flashcard View logic
// 5. Flashcard View logic
async function startFlashcardSession(subtopicId) {
  if (!flashcardUpgrades) {
    flashcardUpgrades = await import('./flashcard_upgrades.js');
  }
  const timelines = flashcardUpgrades.NARRATIVE_FRAMINGS[subtopicId];
  if (timelines && timelines.length > 0) {
    // Render Chronological Prime overview screen first
    const container = document.getElementById('view-flashcards');
    const subtopic = state.allQuestions.find(q => q.subtopicId === subtopicId);
    const subTitle = subtopic ? subtopic.subtopicTitle.replace(/^Topic \d\.\d:\s*/, "") : "Timeline Overview";
    
    let timelineStepsHtml = timelines.map((step, idx) => {
      return `
        <div class="chronology-prime-step" style="display: flex; gap: 16px; align-items: flex-start; padding: 14px; background: rgba(0,0,0,0.15); border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm); transition: transform 0.2s; margin-bottom: 10px;" onmouseover="this.style.transform='translateX(4px)'" onmouseout="this.style.transform='none'">
          <div class="prime-step-number" style="width: 28px; height: 28px; border-radius: 50%; background: var(--primary-glow); border: 1px solid var(--primary); color: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; font-size: 0.9rem;">
            ${idx + 1}
          </div>
          <div class="prime-step-text" style="font-size: 0.92rem; line-height: 1.5; color: var(--text-normal); text-align: left;">
            ${step.replace(/\*\*([^*]+)\*\*/g, '<strong style="color: var(--primary); font-weight: 700;">$1</strong>')}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="chronology-prime-container" style="max-width: 600px; margin: 0 auto; padding: 20px 10px; text-align: center; display: flex; flex-direction: column; gap: 20px; animation: fadeIn 0.4s;">
        <div class="exam-skills-header-card" style="background: var(--gradient-hero); padding: 24px; border-radius: var(--border-radius-md); border: 1px solid var(--border-glass); box-shadow: var(--shadow-md); text-align: left;">
          <div style="font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: var(--primary); letter-spacing: 0.8px; margin-bottom: 4px;">Chronological Prime</div>
          <h2 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 700; margin: 0 0 8px 0; color: var(--text-main); line-height: 1.25;">${subTitle}</h2>
          <p style="font-size: 0.88rem; line-height: 1.5; color: var(--text-muted); margin: 0;">
            Review the historical flow of events before studying the active recall deck. Building a chronological timeline anchor in your memory will improve recall score.
          </p>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 4px;">
          ${timelineStepsHtml}
        </div>

        <button class="btn-primary" id="btn-prime-continue" style="padding: 12px; font-size: 0.95rem; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px;">
          Start Active Recall Deck <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    `;

    document.getElementById('btn-prime-continue').addEventListener('click', () => {
      AudioEngine.play('click');
      addXp(5); // Reward 5 XP for reviewing prime timeline!
      
      const questions = state.allQuestions.filter(q => q.subtopicId === subtopicId);
      state.flashcardSession.deck = [...questions].sort(() => Math.random() - 0.5);
      
      // Injects synoptic synthesis challenge as final card!
      const synChallenge = flashcardUpgrades.SYNTHESIS_CHALLENGES[subtopicId];
      if (synChallenge) {
        state.flashcardSession.deck.push({
          id: `synoptic_${subtopicId}`,
          isSynoptic: true,
          question: synChallenge.front,
          answer: "Synthesis Guide Model Answer",
          explanation: synChallenge.back,
          type: 'difficult',
          year: 0
        });
      }
      
      state.flashcardSession.activeIndex = 0;
      state.flashcardSession.originalLength = state.flashcardSession.deck.length;
      state.flashcardSession.masteredCount = 0;
      state.flashcardSession.failedCardIds = [];
      
      restoreFlashcardSkeleton();
      renderFlashcard();
    });
  } else {
    const questions = state.allQuestions.filter(q => q.subtopicId === subtopicId);
    state.flashcardSession.deck = [...questions].sort(() => Math.random() - 0.5);
    
    // Injects synoptic synthesis challenge as final card!
    const synChallenge = flashcardUpgrades.SYNTHESIS_CHALLENGES[subtopicId];
    if (synChallenge) {
      state.flashcardSession.deck.push({
        id: `synoptic_${subtopicId}`,
        isSynoptic: true,
        question: synChallenge.front,
        answer: "Synthesis Guide Model Answer",
        explanation: synChallenge.back,
        type: 'difficult',
        year: 0
      });
    }
    
    state.flashcardSession.activeIndex = 0;
    state.flashcardSession.originalLength = state.flashcardSession.deck.length;
    state.flashcardSession.masteredCount = 0;
    state.flashcardSession.failedCardIds = [];
    
    restoreFlashcardSkeleton();
    renderFlashcard();
  }
}

function renderMarkdownSimple(text) {
  if (!text) return "";
  return text
    .replace(/\r?\n/g, '<br>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\* ([^\n<]+)/g, '<li>$1</li>');
}

function renderFlashcard() {
  const deck = state.flashcardSession.deck;
  const idx = state.flashcardSession.activeIndex;
  
  if (idx >= deck.length) {
    // Finished session
    showFlashcardCompletion();
    return;
  }

  // Update progress headers
  document.getElementById('flashcard-counter-text').textContent = `Card ${idx + 1} of ${deck.length}`;
  const masteryPct = deck.length > 0 ? Math.round((state.flashcardSession.masteredCount / state.flashcardSession.originalLength) * 100) : 0;
  document.getElementById('flashcard-mastery-text').textContent = `${masteryPct}% resolved this session`;
  document.getElementById('flashcard-progress-bar-fill').style.width = `${Math.min(100, Math.round(((idx) / deck.length) * 100))}%`;
  
  const q = deck[idx];
  const isBookmarked = state.bookmarks.includes(q.id);
  
  // Render Front & Back Content
  const frontBadge = document.getElementById('card-front-badge');
  frontBadge.textContent = q.isSynoptic ? 'Synoptic' : q.type.charAt(0).toUpperCase() + q.type.slice(1);
  frontBadge.className = `badge badge-${q.type}`;
  
  const backBadge = document.getElementById('card-back-badge');
  backBadge.textContent = q.isSynoptic ? 'Synoptic' : q.type.charAt(0).toUpperCase() + q.type.slice(1);
  backBadge.className = `badge badge-${q.type}`;
  
  const ktLabel = q.subtopicTitle ? q.subtopicTitle.replace(/^Topic\s+/i, "KT ") : "";
  const frontTopic = document.getElementById('card-front-topic');
  if (frontTopic) frontTopic.textContent = ktLabel;
  const backTopic = document.getElementById('card-back-topic');
  if (backTopic) backTopic.textContent = ktLabel;
  
  // Custom Render Front face (including scaffolded hint if failed previously)
  const frontBody = document.getElementById('card-front-question');
  if (q.isSynoptic) {
    frontBody.innerHTML = `
      <div style="font-family: var(--font-heading); font-size: 0.8rem; font-weight: 800; color: var(--accent); border: 1px solid rgba(244,63,94,0.25); background: rgba(244,63,94,0.06); padding: 4px 10px; border-radius: 12px; display: inline-block; margin-bottom: 12px; letter-spacing: 0.5px;">
        🧠 SYNOPTIC SYNTHESIS CHALLENGE
      </div>
      <h3 class="card-question" style="font-size: 1.15rem; line-height: 1.5; font-weight: 700; color: var(--text-main);">${q.question}</h3>
    `;
  } else {
    let hintHtml = '';
    if (state.flashcardSession.failedCardIds.includes(q.id)) {
      const hintWords = q.answer.split(' ').map(w => {
        if (w.length <= 1) return w;
        return w.charAt(0) + '&bull;'.repeat(w.length - 1);
      }).join(' ');
      hintHtml = `
        <div class="scaffolded-hint-box" style="margin-top: 14px; font-size: 0.8rem; color: var(--accent); font-weight: 600; text-align: center; padding: 6px 10px; background: rgba(244,63,94,0.05); border: 1px dashed rgba(244,63,94,0.25); border-radius: 4px; display: inline-flex; align-items: center; gap: 4px;">
          <i class="fa-solid fa-lightbulb"></i> Hint: <span style="font-family: monospace; letter-spacing: 1px;">${hintWords}</span>
        </div>
      `;
    }
    frontBody.innerHTML = `
      <h3 class="card-question">${q.question}</h3>
      ${hintHtml}
    `;
  }

  // Custom Render Back face (Double sided context/significance split, date badge)
  const backBody = document.querySelector('.flashcard-back .card-body');
  if (q.isSynoptic) {
    backBody.innerHTML = `
      <div style="font-family: var(--font-heading); font-size: 0.8rem; font-weight: 800; color: var(--accent); border: 1px solid rgba(244,63,94,0.25); background: rgba(244,63,94,0.06); padding: 4px 10px; border-radius: 12px; display: inline-block; margin-bottom: 12px; letter-spacing: 0.5px;">
        🧠 SYNOPTIC SYNTHESIS ANSWER
      </div>
      <div style="max-height: 250px; overflow-y: auto; padding-right: 6px; text-align: left;" class="synoptic-scroll-container">
        ${renderMarkdownSimple(q.explanation)}
      </div>
    `;
  } else {
    const splits = flashcardUpgrades.getFactSplit(q);
    
    backBody.innerHTML = `
      <span class="card-answer-label">Correct Key Term</span>
      <h2 class="card-answer-text" id="card-back-answer" style="font-size: 1.5rem; font-weight: 800; color: var(--success); margin: 4px 0 10px 0;">${q.answer}</h2>
      
      <div class="card-back-split-container" style="display: flex; flex-direction: column; gap: 10px; text-align: left; width: 100%;">
        <div class="card-split-section context-section" style="border-left: 3px solid var(--primary); padding-left: 10px; margin-bottom: 2px;">
          <strong style="color: var(--primary); font-size: 0.72rem; text-transform: uppercase; display: block; margin-bottom: 2px; font-weight: 700;">Context</strong>
          <p style="margin: 0; font-size: 0.82rem; line-height: 1.4; color: var(--text-normal);">${splits.context}</p>
        </div>
        <div class="card-split-section significance-section" style="border-left: 3px solid var(--accent); padding-left: 10px;">
          <strong style="color: var(--accent); font-size: 0.72rem; text-transform: uppercase; display: block; margin-bottom: 2px; font-weight: 700;">Significance / Consequence</strong>
          <p style="margin: 0; font-size: 0.82rem; line-height: 1.4; color: var(--text-normal);">${splits.significance}</p>
        </div>
      </div>

      <div class="card-date-badge-container" style="margin-top: 8px; display: flex; gap: 6px; flex-wrap: wrap;">
        <span class="badge badge-year" style="font-weight: 700; background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.25); color: var(--accent); font-size: 0.7rem; padding: 2px 8px; border-radius: 12px;">
          <i class="fa-regular fa-calendar-days"></i> ${q.year || 'Concept'}
        </span>
      </div>
    `;
  }

  updateCmeGotItButtonState();

  // Set bookmark states on flashcard faces
  const frontBkmk = document.getElementById('card-front-bookmark');
  const backBkmk = document.getElementById('card-back-bookmark');
  
  [frontBkmk, backBkmk].forEach(b => {
    b.setAttribute('data-qid', q.id);
    b.className = `bookmark-icon-container ${isBookmarked ? 'bookmarked' : ''}`;
    b.querySelector('i').className = isBookmarked ? 'fa-solid fa-star' : 'fa-regular fa-star';
  });

  // Ensure card is unflipped
  const cardEl = document.getElementById('flashcard-card');
  cardEl.classList.remove('flipped');
  cardEl.className = 'flashcard-card'; // Clear swipe animations
  
  // Hide MCQ overlay if it exists
  const overlay = document.getElementById('flashcard-mcq-overlay');
  if (overlay) {
    overlay.style.display = 'none';
    overlay.classList.remove('answered');
  }
  
  // Reset buttons
  document.getElementById('btn-flashcard-reveal').style.display = 'flex';
  document.getElementById('flashcard-self-grade-actions').style.display = 'none';
}

function getMultipleChoiceChoices(q) {
  const correct = q.answer;
  let pool = state.allQuestions
    .filter(other => other.subtopicId === q.subtopicId && other.answer !== correct)
    .map(other => other.answer);
    
  if (pool.length < 3) {
    const allPool = state.allQuestions
      .filter(other => other.answer !== correct)
      .map(other => other.answer);
    pool = pool.concat(allPool);
  }
  pool = Array.from(new Set(pool));
  
  const distractors = [];
  while (distractors.length < 3 && pool.length > 0) {
    const randIdx = Math.floor(Math.random() * pool.length);
    distractors.push(pool.splice(randIdx, 1)[0]);
  }
  
  const choices = [correct, ...distractors].sort(() => Math.random() - 0.5);
  return choices;
}

function showFlashcardMCQ(q) {
  const choices = getMultipleChoiceChoices(q);
  
  let overlay = document.getElementById('flashcard-mcq-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'flashcard-mcq-overlay';
    document.getElementById('flashcard-stage').appendChild(overlay);
  }
  
  overlay.style.display = 'flex';
  
  overlay.innerHTML = `
    <div class="mcq-overlay-content">
      <div class="mcq-header">
        <span>🎯 ACTIVE RECALL REINFORCEMENT MCQ</span>
      </div>
      <h3 class="mcq-question">
        ${q.question}
      </h3>
      <div class="mcq-choices-container">
        ${choices.map((choice, i) => `
          <button class="mcq-choice-btn" data-choice="${encodeURIComponent(choice)}">
            <span class="mcq-choice-badge">${['A', 'B', 'C', 'D'][i]}</span>
            <span class="mcq-choice-text">${choice}</span>
          </button>
        `).join('')}
      </div>
      <div id="mcq-feedback-text" class="mcq-feedback">
        Choose the correct term to reinforce memory traces!
      </div>
    </div>
  `;
  
  const buttons = overlay.querySelectorAll('.mcq-choice-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (overlay.classList.contains('answered')) return;
      overlay.classList.add('answered');
      
      const chosen = decodeURIComponent(btn.getAttribute('data-choice'));
      const isCorrect = chosen === q.answer;
      const feedbackText = document.getElementById('mcq-feedback-text');
      
      if (isCorrect) {
        btn.classList.add('correct');
        feedbackText.innerHTML = `<span class="feedback-success"><i class="fa-solid fa-circle-check"></i> Correct! Memory reinforced. (+2 XP)</span>`;
        AudioEngine.play('success');
        addXp(2);
        
        setTimeout(() => {
          overlay.style.display = 'none';
          overlay.classList.remove('answered');
          btn.classList.remove('correct');
          executeFlashcardGrade(false, q); // Still recycle it since they failed initial check
        }, 1500);
      } else {
        btn.classList.add('incorrect');
        buttons.forEach(b => {
          if (decodeURIComponent(b.getAttribute('data-choice')) === q.answer) {
            b.classList.add('correct');
          }
        });
        
        feedbackText.innerHTML = `<span class="feedback-error"><i class="fa-solid fa-circle-xmark"></i> Incorrect. Recycling card for review.</span>`;
        AudioEngine.play('fail');
        
        setTimeout(() => {
          overlay.style.display = 'none';
          overlay.classList.remove('answered');
          btn.classList.remove('incorrect');
          buttons.forEach(b => b.classList.remove('correct'));
          executeFlashcardGrade(false, q);
        }, 2500);
      }
    });
  });
}

function executeFlashcardGrade(correct, q) {
  const cardEl = document.getElementById('flashcard-card');
  if (!cardEl) return;
  
  if (correct) {
    setMastered(q.id, true);
    state.flashcardSession.masteredCount++;
    
    cardEl.classList.add('swipe-right');
    setTimeout(() => {
      state.flashcardSession.activeIndex++;
      renderFlashcard();
    }, 300);
  } else {
    // Fail: recycle card to end of deck
    cardEl.classList.add('swipe-left');
    setTimeout(() => {
      state.flashcardSession.deck.push(q);
      state.flashcardSession.activeIndex++;
      renderFlashcard();
    }, 300);
  }
}

function handleFlashcardGrade(correct) {
  if (state.flashcardSession.activeIndex >= state.flashcardSession.deck.length) return;
  
  const cardEl = document.getElementById('flashcard-card');
  if (cardEl.classList.contains('swipe-right') || cardEl.classList.contains('swipe-left')) return;
  
  const deck = state.flashcardSession.deck;
  const idx = state.flashcardSession.activeIndex;
  const q = deck[idx];
  
  if (correct) {
    // Reward XP!
    addXp(q.isSynoptic ? 15 : 5);
    executeFlashcardGrade(true, q);
  } else {
    AudioEngine.play('fail');
    if (!q.isSynoptic) {
      // Add to failed list to show scaffolded hint next time
      if (!state.flashcardSession.failedCardIds.includes(q.id)) {
        state.flashcardSession.failedCardIds.push(q.id);
      }
      showFlashcardMCQ(q);
    } else {
      executeFlashcardGrade(false, q);
    }
  }
}

function showFlashcardCompletion() {
  AudioEngine.play('cheer');
  Confetti.spawn(100);
  
  const container = document.getElementById('view-flashcards');
  container.innerHTML = `
    <div class="empty-state" style="padding: 60px 20px;">
      <div class="results-grade-circle" style="width: 90px; height: 90px; font-size: 2.2rem; margin: 0 auto 20px; animation: pulse 2s infinite;">
        <i class="fa-solid fa-flag-checkered" style="color: var(--text-inverse);"></i>
      </div>
      <h3>Study Deck Resolved!</h3>
      <p>Excellent active recall training. You finished all flashcards in this subtopic.</p>
      <div style="display: flex; gap: 16px; margin-top: 24px; justify-content: center; width: 100%; max-width: 400px; margin-left: auto; margin-right: auto;">
        <button class="btn-secondary" id="btn-fc-restart">Study Again</button>
        <button class="btn-primary" id="btn-fc-finish">Return Dashboard</button>
      </div>
    </div>
  `;
  
  document.getElementById('btn-fc-restart').addEventListener('click', () => {
    AudioEngine.play('click');
    restoreFlashcardSkeleton();
    startFlashcardSession(state.selectedSubtopicId);
  });
  
  document.getElementById('btn-fc-finish').addEventListener('click', () => {
    AudioEngine.play('click');
    restoreFlashcardSkeleton();
    switchView('dashboard');
  });
}

function restoreFlashcardSkeleton() {
  const container = document.getElementById('view-flashcards');
  container.innerHTML = `
    <div class="flashcard-view-container">
      <div class="flashcard-progress-header" style="display: flex; justify-content: space-between; align-items: center; width: 100%; flex-wrap: wrap; gap: 8px;">
        <div style="display: flex; flex-direction: column; gap: 2px;">
          <span id="flashcard-counter-text" style="font-weight: 700; color: var(--text-main);">Card 1 of 15</span>
          <span id="flashcard-mastery-text" style="font-size: 0.72rem; color: var(--text-muted);">0% resolved this session</span>
        </div>
      </div>
      <div class="flashcard-progress-bar">
        <div class="flashcard-progress-fill" id="flashcard-progress-bar-fill"></div>
      </div>
      <div class="flashcard-stage" id="flashcard-stage">
        <div class="flashcard-card" id="flashcard-card">
          <div class="flashcard-face flashcard-front">
            <div class="card-top">
              <span class="badge" id="card-front-badge">Easy</span>
              <span class="bookmark-icon-container" id="card-front-bookmark"><i class="fa-regular fa-star"></i></span>
            </div>
            <div class="card-top-topic" id="card-front-topic" style="font-size: 0.75rem; font-weight: 600; color: var(--primary); margin-top: 8px; text-align: left; width: 100%; opacity: 0.8;"></div>
            <div class="card-body"><h3 class="card-question" id="card-front-question"></h3></div>
            <div class="card-bottom"><i class="fa-solid fa-rotate"></i> Click card to flip and reveal answer</div>
          </div>
          <div class="flashcard-face flashcard-back">
            <div class="card-top">
              <span class="badge badge-easy" id="card-back-badge">Easy</span>
              <span class="bookmark-icon-container" id="card-back-bookmark"><i class="fa-regular fa-star"></i></span>
            </div>
            <div class="card-top-topic" id="card-back-topic" style="font-size: 0.75rem; font-weight: 600; color: var(--primary); margin-top: 8px; text-align: left; width: 100%; opacity: 0.8;"></div>
            <div class="card-body">
              <span class="card-answer-label">Correct Answer</span>
              <h2 class="card-answer-text" id="card-back-answer"></h2>
              <p class="card-explanation-text" id="card-back-explanation"></p>
            </div>
            <div class="card-bottom"><i class="fa-solid fa-rotate"></i> Click card to flip back</div>
          </div>
        </div>
      </div>

      <div class="flashcard-controls">
        <button class="btn-secondary" id="btn-flashcard-reveal"><i class="fa-solid fa-rotate"></i> Flip Card</button>
        <div id="flashcard-self-grade-actions" style="display: none; width: 100%; gap: 16px;">
          <button class="btn-incorrect" id="btn-flashcard-incorrect"><i class="fa-solid fa-xmark"></i> Study Again</button>
          <button class="btn-correct" id="btn-flashcard-correct"><i class="fa-solid fa-check"></i> Got It!</button>
        </div>
      </div>
    </div>
  `;
  
  // Re-attach card flip listener
  document.getElementById('flashcard-stage').addEventListener('click', flipFlashcard);
  document.getElementById('btn-flashcard-reveal').addEventListener('click', flipFlashcard);
  document.getElementById('btn-flashcard-incorrect').addEventListener('click', () => handleFlashcardGrade(false));
  document.getElementById('btn-flashcard-correct').addEventListener('click', () => handleFlashcardGrade(true));

  const bkmks = [document.getElementById('card-front-bookmark'), document.getElementById('card-back-bookmark')];
  bkmks.forEach(b => {
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleBookmark(b.getAttribute('data-qid'));
    });
  });
}

function flipFlashcard() {
  const card = document.getElementById('flashcard-card');
  if (!card) return;
  card.classList.toggle('flipped');
  AudioEngine.play('flip');
  
  const isFlipped = card.classList.contains('flipped');
  const revealBtn = document.getElementById('btn-flashcard-reveal');
  const actionBtns = document.getElementById('flashcard-self-grade-actions');
  
  if (isFlipped) {
    revealBtn.style.display = 'none';
    actionBtns.style.display = 'flex';
  } else {
    revealBtn.style.display = 'flex';
    actionBtns.style.display = 'none';
  }
}

export function updateCmeGotItButtonState() {
  const correctBtn = document.getElementById('btn-flashcard-correct');
  if (!correctBtn) return;
  correctBtn.disabled = false;
  correctBtn.style.opacity = '1';
  correctBtn.style.pointerEvents = 'auto';
  correctBtn.style.cursor = 'pointer';
}

export const activeFigures = [
  {
    key: 'david ben-gurion',
    quote: "In Israel, in order to be a realist you must believe in miracles.",
    question: "Which declaration of independence did Ben-Gurion read in Tel Aviv on 14 May 1948?",
    answer: "Declaration of the Establishment of the State of Israel"
  },
  {
    key: 'menachem begin',
    quote: "Peace is the beauty of life. It is sunshine. It is the smile of a child.",
    question: "Which right-wing political party did Menachem Begin found in 1973, which won power in 1977?",
    answer: "Likud"
  },
  {
    key: 'yitzhak rabin',
    quote: "We say to you, in a loud and clear voice: Enough of blood and tears. Enough!",
    question: "Which peace agreements did Yitzhak Rabin sign in 1993 with Yasser Arafat?",
    answer: "The Oslo I Accord"
  },
  {
    key: 'golda meir',
    quote: "Peace will come when the Arabs will love their children more than they hate us.",
    question: "Which war in October 1973 caught Israel by surprise during Golda Meir's premiership?",
    answer: "Yom Kippur War"
  },
  {
    key: 'moshe dayan',
    quote: "If you want to make peace, you don't talk to your friends. You talk to your enemies.",
    question: "Moshe Dayan served as Minister of Defence during which lightning June 1967 war?",
    answer: "The Six-Day War"
  },
  {
    key: 'ariel sharon',
    quote: "The security of Israel is the supreme goal.",
    question: "Which country did Ariel Sharon lead the invasion of in 1982 to drive out the PLO?",
    answer: "Lebanon"
  },
  {
    key: 'levi eshkol',
    quote: "The threat of war hangs over our heads.",
    question: "Which war broke out in June 1967 when Levi Eshkol was Prime Minister of Israel?",
    answer: "The Six-Day War"
  },
  {
    key: 'yitzhak shamir',
    quote: "No one can teach us about the pain of exile.",
    question: "Which international conference did Yitzhak Shamir attend in 1991 to negotiate with Arab states?",
    answer: "Madrid Peace Conference"
  },
  {
    key: 'yasser arafat',
    quote: "I come bearing an olive branch and a freedom fighter's gun. Do not let the olive branch fall from my hand.",
    question: "Which political group did Yasser Arafat lead, serving as Chairman of the PLO from 1969?",
    answer: "Fatah"
  },
  {
    key: 'george habash',
    quote: "Our goal is the liberation of all Palestine, by any means necessary.",
    question: "Which radical group did George Habash found, which carried out aircraft hijackings in 1970?",
    answer: "Popular Front for the Liberation of Palestine (PFLP)"
  },
  {
    key: 'mahmoud abbas',
    quote: "We want a peaceful resolution, a state of our own alongside Israel.",
    question: "Which agreements did Mahmoud Abbas negotiate in secret in Norway in 1993?",
    answer: "The Oslo Accords"
  },
  {
    key: 'haj amin al-husseini',
    quote: "We must defend our holy land from Zionist colonization.",
    question: "What religious title did Haj Amin al-Husseini hold as the leader of Palestinian Arabs under British Mandate?",
    answer: "Grand Mufti of Jerusalem"
  },
  {
    key: 'gamal abdel nasser',
    quote: "We will not accept any coexistence with Israel. Today the issue is not the frontier but the existence of Israel.",
    question: "Which major waterway did Nasser nationalise in July 1956, triggering the Suez Crisis?",
    answer: "The Suez Canal"
  },
  {
    key: 'anwar sadat',
    quote: "I have come to you today on solid ground, to shape a new life, to establish peace.",
    question: "Which peace accords did Anwar Sadat sign with Menachem Begin at the US presidential retreat in 1978?",
    answer: "The Camp David Accords"
  },
  {
    key: 'hosni mubarak',
    quote: "Stability is the foundation of economic progress and regional peace.",
    question: "Following whose assassination in October 1981 did Hosni Mubarak become President of Egypt?",
    answer: "Anwar Sadat"
  },
  {
    key: 'king hussein',
    quote: "Jordan has a boundary of over 600 kilometers with Israel. We are at the heart of this conflict.",
    question: "Which militant group's forces did King Hussein expel from Jordan during the 'Black September' of 1970?",
    answer: "The Palestine Liberation Organisation (PLO)"
  },
  {
    key: 'king abdullah',
    quote: "We must preserve the Arab character of Jerusalem and protect its holy sites.",
    question: "Which elite British-trained army did King Abdullah lead in the 1948 Arab-Israeli War?",
    answer: "The Arab Legion"
  },
  {
    key: 'hafez al-assad',
    quote: "Syria will never surrender its sovereign rights or its land.",
    question: "Which occupied mountain territory did Hafez al-Assad attempt to recapture from Israel in the 1973 Yom Kippur War?",
    answer: "The Golan Heights"
  },
  {
    key: 'saddam hussein',
    quote: "The road to Jerusalem lies through Kuwait.",
    question: "Which country did Saddam Hussein invade in August 1990, triggering the Gulf War?",
    answer: "Kuwait"
  },
  {
    key: 'henry kissinger',
    quote: "Shuttle diplomacy is about creating options.",
    question: "What term describes Kissinger's diplomatic method of flying back and forth between capitals in 1974?",
    answer: "Shuttle Diplomacy"
  },
  {
    key: 'jimmy carter',
    quote: "We must adapt to changing times with unchanging principles.",
    question: "Where did President Jimmy Carter host Anwar Sadat and Menachem Begin for peace talks in September 1978?",
    answer: "Camp David"
  },
  {
    key: 'bill clinton',
    quote: "The future is not a gift: it is an achievement.",
    question: "On the lawn of which building did President Bill Clinton host the Rabin-Arafat handshake in September 1993?",
    answer: "The White House"
  },
  {
    key: 'mikhail gorbachev',
    quote: "If not me, who? If not now, when?",
    question: "Which major Cold War superpower did Mikhail Gorbachev lead, which collapsed in 1991?",
    answer: "The Soviet Union (USSR)"
  },
  {
    key: 'george h.w. bush',
    quote: "A new world order is emerging.",
    question: "Which international peace conference in October 1991 did President George H.W. Bush co-sponsor with the USSR?",
    answer: "The Madrid Conference"
  },
  {
    key: 'ernest bevin',
    quote: "The Palestine problem is unworkable under the Mandate.",
    question: "Which international organization did Ernest Bevin hand the Palestine Mandate problem to in 1947?",
    answer: "The United Nations (UN)"
  },
  {
    key: 'count folke bernadotte',
    quote: "I am ready to take any risk to bring peace to this land.",
    question: "Which extremist Zionist paramilitary group assassinated Count Folke Bernadotte in Jerusalem in September 1948?",
    answer: "Lehi (also known as the Stern Gang)"
  }
];

// 6. Timeline View Assembly
export const KEY_FIGURES_BIO = {
  "david ben-gurion": {
    name: "David Ben-Gurion",
    role: "First Prime Minister of Israel & Zionist Leader",
    bio: "The indispensable leader of the Zionist movement who officially declared the creation of the State of Israel in May 1948 and served as its first Prime Minister.",
    image: "assets/sources/portraits/david_ben_gurion.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/David_Ben-Gurion"
  },
  "ben-gurion": {
    name: "David Ben-Gurion",
    role: "First Prime Minister of Israel & Zionist Leader",
    bio: "The indispensable leader of the Zionist movement who officially declared the creation of the State of Israel in May 1948 and served as its first Prime Minister.",
    image: "assets/sources/portraits/david_ben_gurion.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/David_Ben-Gurion"
  },
  "menachem begin": {
    name: "Menachem Begin",
    role: "Prime Minister of Israel (1977–1983)",
    bio: "Originally the leader of the militant Irgun group (which carried out the King David Hotel bombing and the Deir Yassin massacre), he later founded the right-wing Likud party, became Prime Minister, and signed the historic Camp David Accords and the 1979 peace treaty with Egypt.",
    image: "assets/sources/portraits/menachem_begin.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Menachem_Begin"
  },
  "begin": {
    name: "Menachem Begin",
    role: "Prime Minister of Israel (1977–1983)",
    bio: "Originally the leader of the militant Irgun group (which carried out the King David Hotel bombing and the Deir Yassin massacre), he later founded the right-wing Likud party, became Prime Minister, and signed the historic Camp David Accords and the 1979 peace treaty with Egypt.",
    image: "assets/sources/portraits/menachem_begin.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Menachem_Begin"
  },
  "yitzhak rabin": {
    name: "Yitzhak Rabin",
    role: "Prime Minister of Israel (1974–77, 1992–95)",
    bio: "A prominent IDF commander during the 1948 and 1967 wars who later served as Prime Minister. He implemented the harsh 'Iron Fist' policy during the First Intifada, but later famously shook hands with Yasser Arafat to sign the Oslo Accords in 1993, for which he won the Nobel Peace Prize. He was assassinated in 1995 by an Israeli right-wing extremist, Yigal Amir.",
    image: "assets/sources/portraits/yitzhak_rabin.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Yitzhak_Rabin"
  },
  "rabin": {
    name: "Yitzhak Rabin",
    role: "Prime Minister of Israel (1974–77, 1992–95)",
    bio: "A prominent IDF commander during the 1948 and 1967 wars who later served as Prime Minister. He implemented the harsh 'Iron Fist' policy during the First Intifada, but later famously shook hands with Yasser Arafat to sign the Oslo Accords in 1993, for which he won the Nobel Peace Prize. He was assassinated in 1995 by an Israeli right-wing extremist, Yigal Amir.",
    image: "assets/sources/portraits/yitzhak_rabin.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Yitzhak_Rabin"
  },
  "golda meir": {
    name: "Golda Meir",
    role: "Prime Minister of Israel (1969–1974)",
    bio: "Israel's first and only female Prime Minister (1969–1974), who led the country during the shock of the 1973 Yom Kippur War and subsequently ordered 'Operation Wrath of God' to hunt down the Munich Olympics terrorists.",
    image: "assets/sources/portraits/golda_meir.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Golda_Meir"
  },
  "meir": {
    name: "Golda Meir",
    role: "Prime Minister of Israel (1969–1974)",
    bio: "Israel's first and only female Prime Minister (1969–1974), who led the country during the shock of the 1973 Yom Kippur War and subsequently ordered 'Operation Wrath of God' to hunt down the Munich Olympics terrorists.",
    image: "assets/sources/portraits/golda_meir.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Golda_Meir"
  },
  "moshe dayan": {
    name: "Moshe Dayan",
    role: "Israeli Defense Minister & General",
    bio: "A highly recognizable Israeli military commander and Defense Minister (known for his eye patch) who played a pivotal role in the Suez Crisis, the Six Day War, and the Yom Kippur War.",
    image: "assets/sources/portraits/moshe_dayan.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Moshe_Dayan"
  },
  "dayan": {
    name: "Moshe Dayan",
    role: "Israeli Defense Minister & General",
    bio: "A highly recognizable Israeli military commander and Defense Minister (known for his eye patch) who played a pivotal role in the Suez Crisis, the Six Day War, and the Yom Kippur War.",
    image: "assets/sources/portraits/moshe_dayan.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Moshe_Dayan"
  },
  "ariel sharon": {
    name: "Ariel Sharon",
    role: "Israeli General & Defense Minister",
    bio: "A ruthless and controversial Israeli general and Defense Minister who spearheaded the 1982 invasion of Lebanon (Operation Peace for Galilee), driving the IDF all the way to Beirut to expel the PLO.",
    image: "assets/sources/portraits/ariel_sharon.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Ariel_Sharon"
  },
  "sharon": {
    name: "Ariel Sharon",
    role: "Israeli General & Defense Minister",
    bio: "A ruthless and controversial Israeli general and Defense Minister who spearheaded the 1982 invasion of Lebanon (Operation Peace for Galilee), driving the IDF all the way to Beirut to expel the PLO.",
    image: "assets/sources/portraits/ariel_sharon.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Ariel_Sharon"
  },
  "levi eshkol": {
    name: "Levi Eshkol",
    role: "Prime Minister of Israel (1963–1969)",
    bio: "The Israeli Prime Minister who led the country through the escalating tensions and outbreak of the 1967 Six Day War.",
    image: "assets/sources/portraits/levi_eshkol.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Levi_Eshkol"
  },
  "eshkol": {
    name: "Levi Eshkol",
    role: "Prime Minister of Israel (1963–1969)",
    bio: "The Israeli Prime Minister who led the country through the escalating tensions and outbreak of the 1967 Six Day War.",
    image: "assets/sources/portraits/levi_eshkol.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Levi_Eshkol"
  },
  "yitzhak shamir": {
    name: "Yitzhak Shamir",
    role: "Prime Minister of Israel (1983–84, 1986–92)",
    bio: "A former leader of the militant Stern Gang who later became a hardline Israeli Prime Minister during the First Intifada and the 1991 Madrid Conference.",
    image: "assets/sources/portraits/yitzhak_shamir.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Yitzhak_Shamir"
  },
  "shamir": {
    name: "Yitzhak Shamir",
    role: "Prime Minister of Israel (1983–84, 1986–92)",
    bio: "A former leader of the militant Stern Gang who later became a hardline Israeli Prime Minister during the First Intifada and the 1991 Madrid Conference.",
    image: "assets/sources/portraits/yitzhak_shamir.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Yitzhak_Shamir"
  },
  "yasser arafat": {
    name: "Yasser Arafat",
    role: "Chairman of the PLO & Fatah Founder",
    bio: "The Chairman of the Palestine Liberation Organisation (PLO) and founder of Fatah. He spoke at the UN in 1974 bearing a 'gun and an olive branch', formally renounced terrorism in 1988, and signed the 1993 Oslo Accords, becoming the head of the newly formed Palestinian National Authority.",
    image: "assets/sources/portraits/yasser_arafat.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Yasser_Arafat"
  },
  "arafat": {
    name: "Yasser Arafat",
    role: "Chairman of the PLO & Fatah Founder",
    bio: "The Chairman of the Palestine Liberation Organisation (PLO) and founder of Fatah. He spoke at the UN in 1974 bearing a 'gun and an olive branch', formally renounced terrorism in 1988, and signed the 1993 Oslo Accords, becoming the head of the newly formed Palestinian National Authority.",
    image: "assets/sources/portraits/yasser_arafat.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Yasser_Arafat"
  },
  "george habash": {
    name: "George Habash",
    role: "Founder of the PFLP",
    bio: "The founder of the Popular Front for the Liberation of Palestine (PFLP), a radical Marxist group that pioneered international terrorism, including the 1970 Dawson's Field airplane hijackings.",
    image: "assets/sources/portraits/george_habash.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/George_Habash"
  },
  "habash": {
    name: "George Habash",
    role: "Founder of the PFLP",
    bio: "The founder of the Popular Front for the Liberation of Palestine (PFLP), a radical Marxist group that pioneered international terrorism, including the 1970 Dawson's Field airplane hijackings.",
    image: "assets/sources/portraits/george_habash.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/George_Habash"
  },
  "mahmoud abbas": {
    name: "Mahmoud Abbas (Abu Mazen)",
    role: "Founding Member of Fatah & negotiator",
    bio: "A founding member of Fatah who managed the PLO's secret negotiations with Israel that led to the Oslo Accords, later becoming Prime Minister and President of the Palestinian Authority.",
    image: "assets/sources/portraits/mahmoud_abbas.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Mahmoud_Abbas"
  },
  "abu mazen": {
    name: "Mahmoud Abbas (Abu Mazen)",
    role: "Founding Member of Fatah & negotiator",
    bio: "A founding member of Fatah who managed the PLO's secret negotiations with Israel that led to the Oslo Accords, later becoming Prime Minister and President of the Palestinian Authority.",
    image: "assets/sources/portraits/mahmoud_abbas.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Mahmoud_Abbas"
  },
  "abbas": {
    name: "Mahmoud Abbas (Abu Mazen)",
    role: "Founding Member of Fatah & negotiator",
    bio: "A founding member of Fatah who managed the PLO's secret negotiations with Israel that led to the Oslo Accords, later becoming Prime Minister and President of the Palestinian Authority.",
    image: "assets/sources/portraits/mahmoud_abbas.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Mahmoud_Abbas"
  },
  "haj amin al-husseini": {
    name: "Haj Amin al-Husseini",
    role: "Grand Mufti of Jerusalem",
    bio: "The Grand Mufti of Jerusalem and leader of the Arab Higher Committee, who fiercely opposed Jewish immigration during the British Mandate.",
    image: "assets/sources/portraits/grand_mufti.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Amin_al-Husseini"
  },
  "al-husseini": {
    name: "Haj Amin al-Husseini",
    role: "Grand Mufti of Jerusalem",
    bio: "The Grand Mufti of Jerusalem and leader of the Arab Higher Committee, who fiercely opposed Jewish immigration during the British Mandate.",
    image: "assets/sources/portraits/grand_mufti.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Amin_al-Husseini"
  },
  "gamal abdel nasser": {
    name: "Gamal Abdel Nasser",
    role: "President of Egypt & Pan-Arab Champion",
    bio: "The charismatic President of Egypt and champion of Pan-Arabism. He nationalised the Suez Canal in 1956, formed the United Arab Republic, and his aggressive posturing (such as closing the Straits of Tiran) directly triggered the Six Day War.",
    image: "assets/sources/portraits/gamal_abdel_nasser.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Gamal_Abdel_Nasser"
  },
  "nasser": {
    name: "Gamal Abdel Nasser",
    role: "President of Egypt & Pan-Arab Champion",
    bio: "The charismatic President of Egypt and champion of Pan-Arabism. He nationalised the Suez Canal in 1956, formed the United Arab Republic, and his aggressive posturing (such as closing the Straits of Tiran) directly triggered the Six Day War.",
    image: "assets/sources/portraits/gamal_abdel_nasser.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Gamal_Abdel_Nasser"
  },
  "anwar sadat": {
    name: "Anwar Sadat",
    role: "President of Egypt (1970–1981)",
    bio: "Nasser's successor who launched the surprise attack on Israel in the 1973 Yom Kippur War to force diplomatic negotiations. He stunned the world by visiting the Israeli Knesset in 1977, leading to the Camp David Accords and the 1979 peace treaty, for which he won the Nobel Peace Prize.",
    image: "assets/sources/portraits/anwar_sadat.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Anwar_Sadat"
  },
  "sadat": {
    name: "Anwar Sadat",
    role: "President of Egypt (1970–1981)",
    bio: "Nasser's successor who launched the surprise attack on Israel in the 1973 Yom Kippur War to force diplomatic negotiations. He stunned the world by visiting the Israeli Knesset in 1977, leading to the Camp David Accords and the 1979 peace treaty, for which he won the Nobel Peace Prize.",
    image: "assets/sources/portraits/anwar_sadat.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Anwar_Sadat"
  },
  "hosni mubarak": {
    name: "Hosni Mubarak",
    role: "President of Egypt (1981–2011)",
    bio: "Commander of the Egyptian Air Force during the Yom Kippur War who became President of Egypt following Sadat's assassination in 1981.",
    image: "assets/sources/portraits/hosni_mubarak.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Hosni_Mubarak"
  },
  "mubarak": {
    name: "Hosni Mubarak",
    role: "President of Egypt (1981–2011)",
    bio: "Commander of the Egyptian Air Force during the Yom Kippur War who became President of Egypt following Sadat's assassination in 1981.",
    image: "assets/sources/portraits/hosni_mubarak.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Hosni_Mubarak"
  },
  "king hussein": {
    name: "King Hussein of Jordan",
    role: "King of Jordan (1952–1999)",
    bio: "Ruled Jordan for decades, fighting Israel in 1967 but later expelling the PLO from his country during the brutal 'Black September' conflict in 1970. He signed a formal peace treaty with Israel in 1994.",
    image: "assets/sources/portraits/king_hussein.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Hussein_of_Jordan"
  },
  "king abdullah": {
    name: "King Abdullah I of Transjordan",
    role: "King of Transjordan (1946–1951)",
    bio: "King Hussein's grandfather, who held secret talks with the Jewish Agency before 1948 but ultimately joined the Arab invasion, successfully capturing the West Bank and East Jerusalem with his Arab Legion forces.",
    image: "assets/sources/portraits/abdullah_i.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Abdullah_I_of_Jordan"
  },
  "abdullah i": {
    name: "King Abdullah I of Transjordan",
    role: "King of Transjordan (1946–1951)",
    bio: "King Hussein's grandfather, who held secret talks with the Jewish Agency before 1948 but ultimately joined the Arab invasion, successfully capturing the West Bank and East Jerusalem with his Arab Legion forces.",
    image: "assets/sources/portraits/abdullah_i.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Abdullah_I_of_Jordan"
  },
  "transjordan": {
    name: "King Abdullah I of Transjordan",
    role: "King of Transjordan (1946–1951)",
    bio: "King Hussein's grandfather, who held secret talks with the Jewish Agency before 1948 but ultimately joined the Arab invasion, successfully capturing the West Bank and East Jerusalem with his Arab Legion forces.",
    image: "assets/sources/portraits/abdullah_i.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Abdullah_I_of_Jordan"
  },
  "hafez al-assad": {
    name: "Hafez al-Assad",
    role: "President of Syria (1971–2000)",
    bio: "The President of Syria who coordinated the surprise two-front attack with Egypt against Israel in the 1973 Yom Kippur War.",
    image: "assets/sources/portraits/hafez_al_assad.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Hafez_al-Assad"
  },
  "assad": {
    name: "Hafez al-Assad",
    role: "President of Syria (1971–2000)",
    bio: "The President of Syria who coordinated the surprise two-front attack with Egypt against Israel in the 1973 Yom Kippur War.",
    image: "assets/sources/portraits/hafez_al_assad.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Hafez_al-Assad"
  },
  "saddam hussein": {
    name: "Saddam Hussein",
    role: "President of Iraq (1979–2003)",
    bio: "The President of Iraq. While not a direct party to the Arab-Israeli wars, his 1990 invasion of Kuwait (the Gulf War) had massive repercussions, as Yasser Arafat's decision to support him caused wealthy Arab states to cut off all funding to the PLO, forcing them to the negotiating table.",
    image: "assets/sources/portraits/saddam_hussein.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Saddam_Hussein"
  },
  "saddam": {
    name: "Saddam Hussein",
    role: "President of Iraq (1979–2003)",
    bio: "The President of Iraq. While not a direct party to the Arab-Israeli wars, his 1990 invasion of Kuwait (the Gulf War) had massive repercussions, as Yasser Arafat's decision to support him caused wealthy Arab states to cut off all funding to the PLO, forcing them to the negotiating table.",
    image: "assets/sources/portraits/saddam_hussein.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Saddam_Hussein"
  },
  "henry kissinger": {
    name: "Henry Kissinger",
    role: "US Secretary of State & Diplomat",
    bio: "The US Secretary of State famous for his exhaustive 'shuttle diplomacy' (flying back and forth between Middle Eastern capitals) to secure disengagement agreements after the 1973 Yom Kippur War.",
    image: "assets/sources/portraits/henry_kissinger.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Henry_Kissinger"
  },
  "kissinger": {
    name: "Henry Kissinger",
    role: "US Secretary of State & Diplomat",
    bio: "The US Secretary of State famous for his exhaustive 'shuttle diplomacy' (flying back and forth between Middle Eastern capitals) to secure disengagement agreements after the 1973 Yom Kippur War.",
    image: "assets/sources/portraits/henry_kissinger.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Henry_Kissinger"
  },
  "jimmy carter": {
    name: "Jimmy Carter",
    role: "39th President of the United States (1977–1981)",
    bio: "The US President who personally mediated the 13 days of secret talks between Begin and Sadat at the Camp David presidential retreat in 1978.",
    image: "assets/sources/portraits/jimmy_carter.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Jimmy_Carter"
  },
  "carter": {
    name: "Jimmy Carter",
    role: "39th President of the United States (1977–1981)",
    bio: "The US President who personally mediated the 13 days of secret talks between Begin and Sadat at the Camp David presidential retreat in 1978.",
    image: "assets/sources/portraits/jimmy_carter.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Jimmy_Carter"
  },
  "bill clinton": {
    name: "Bill Clinton",
    role: "42nd President of the United States (1993–2001)",
    bio: "The US President who hosted the historic handshake between Yitzhak Rabin and Yasser Arafat on the White House lawn during the signing of the Oslo Accords in 1993.",
    image: "assets/sources/portraits/bill_clinton.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Bill_Clinton"
  },
  "clinton": {
    name: "Bill Clinton",
    role: "42nd President of the United States (1993–2001)",
    bio: "The US President who hosted the historic handshake between Yitzhak Rabin and Yasser Arafat on the White House lawn during the signing of the Oslo Accords in 1993.",
    image: "assets/sources/portraits/bill_clinton.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Bill_Clinton"
  },
  "mikhail gorbachev": {
    name: "Mikhail Gorbachev",
    role: "Leader of the Soviet Union (1985–1991)",
    bio: "The leader of the Soviet Union whose reforms ended the Cold War, cutting off Soviet military aid to Arab states and paving the way for the 1991 Madrid Peace Conference.",
    image: "assets/sources/portraits/mikhail_gorbachev.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Mikhail_Gorbachev"
  },
  "gorbachev": {
    name: "Mikhail Gorbachev",
    role: "Leader of the Soviet Union (1985–1991)",
    bio: "The leader of the Soviet Union whose reforms ended the Cold War, cutting off Soviet military aid to Arab states and paving the way for the 1991 Madrid Peace Conference.",
    image: "assets/sources/portraits/mikhail_gorbachev.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Mikhail_Gorbachev"
  },
  "george h.w. bush": {
    name: "George H.W. Bush",
    role: "41st President of the United States (1989–1993)",
    bio: "The US President who emerged from the 1991 Gulf War as the leader of the sole remaining superpower, using this leverage to force Israel and Arab nations to negotiate at the Madrid Conference.",
    image: "assets/sources/portraits/george_h_w_bush.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/George_H._W._Bush"
  },
  "george bush": {
    name: "George H.W. Bush",
    role: "41st President of the United States (1989–1993)",
    bio: "The US President who emerged from the 1991 Gulf War as the leader of the sole remaining superpower, using this leverage to force Israel and Arab nations to negotiate at the Madrid Conference.",
    image: "assets/sources/portraits/george_h_w_bush.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/George_H._W._Bush"
  },
  "bush": {
    name: "George H.W. Bush",
    role: "41st President of the United States (1989–1993)",
    bio: "The US President who emerged from the 1991 Gulf War as the leader of the sole remaining superpower, using this leverage to force Israel and Arab nations to negotiate at the Madrid Conference.",
    image: "assets/sources/portraits/george_h_w_bush.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/George_H._W._Bush"
  },
  "ernest bevin": {
    name: "Ernest Bevin",
    role: "British Foreign Secretary (1945–1951)",
    bio: "The British Foreign Secretary who ultimately decided to hand the 'unworkable' Palestine Mandate over to the United Nations in 1947.",
    image: "assets/sources/portraits/ernest_bevin.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Ernest_Bevin"
  },
  "bevin": {
    name: "Ernest Bevin",
    role: "British Foreign Secretary (1945–1951)",
    bio: "The British Foreign Secretary who ultimately decided to hand the 'unworkable' Palestine Mandate over to the United Nations in 1947.",
    image: "assets/sources/portraits/ernest_bevin.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Ernest_Bevin"
  },
  "count folke bernadotte": {
    name: "Count Folke Bernadotte",
    role: "UN Mediator in Palestine",
    bio: "The UN mediator dispatched to negotiate a truce during the 1948 war, who was assassinated by the Jewish extremist Stern Gang.",
    image: "assets/sources/portraits/folke_bernadotte.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Folke_Bernadotte"
  },
  "bernadotte": {
    name: "Count Folke Bernadotte",
    role: "UN Mediator in Palestine",
    bio: "The UN mediator dispatched to negotiate a truce during the 1948 war, who was assassinated by the Jewish extremist Stern Gang.",
    image: "assets/sources/portraits/folke_bernadotte.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Folke_Bernadotte"
  },
  "folke bernadotte": {
    name: "Count Folke Bernadotte",
    role: "UN Mediator in Palestine",
    bio: "The UN mediator dispatched to negotiate a truce during the 1948 war, who was assassinated by the Jewish extremist Stern Gang.",
    image: "assets/sources/portraits/folke_bernadotte.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Folke_Bernadotte"
  }
};

const TIMELINE_IMAGES = [
  {
    keywords: ["partition plan", "resolution 181", "partition map"],
    imageSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="150" style="background:#090d16; border-radius:4px;"><rect width="120" height="120" fill="#0b132b" /><path d="M 40,5 L 55,5 L 62,35 L 75,60 L 68,90 L 52,112 L 44,115 L 43,90 L 41,70 L 32,50 Z" fill="#1c2541" stroke="#3a506b" stroke-width="1" /><path d="M 40,5 L 55,5 L 60,20 L 44,20 Z" fill="#ffedd5" stroke="#f97316" stroke-width="0.5" /><path d="M 41,20 L 48,20 L 48,60 L 41,70 L 32,50 Z" fill="#ffedd5" stroke="#f97316" stroke-width="0.5" /><path d="M 41,70 L 50,70 L 52,112 L 44,115 L 43,90 Z" fill="#ffedd5" stroke="#f97316" stroke-width="0.5" /><path d="M 48,20 L 62,35 L 75,60 L 58,60 L 48,45 Z" fill="#dcfce7" stroke="#22c55e" stroke-width="0.5" /><path d="M 58,60 L 75,60 L 68,90 L 50,70 Z" fill="#dcfce7" stroke="#22c55e" stroke-width="0.5" /><circle cx="51" cy="58" r="3" fill="#ef4444" /><text x="56" y="60" font-family="sans-serif" font-size="4" fill="#ef4444">UN Zone</text><text x="80" y="30" font-family="sans-serif" font-size="5" font-weight="bold" fill="#f97316">Jewish State</text><text x="80" y="40" font-family="sans-serif" font-size="5" font-weight="bold" fill="#22c55e">Arab State</text></svg>`,
    provenance: "UN Partition Plan map showing the proposed division of Palestine in November 1947."
  },
  {
    keywords: ["suez canal", "nationalise the suez", "suez crisis", "nationalised the suez"],
    imageSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="150" style="background:#090d16; border-radius:4px;"><rect width="120" height="120" fill="#0b132b" /><path d="M 50,0 Q 45,60 50,120 L 70,120 Q 75,60 70,0 Z" fill="#0284c7" opacity="0.3" /><path d="M 52,0 Q 47,60 52,120 M 68,120 Q 73,60 68,0" fill="none" stroke="#0284c7" stroke-width="1.5" /><rect x="52" y="45" width="16" height="30" rx="3" fill="#ef4444" stroke="#ffffff" stroke-width="0.5" /><polygon points="60,35 60,45 56,45" fill="#f97316" /><text x="10" y="60" font-family="sans-serif" font-size="5" font-weight="bold" fill="#0284c7">Suez Canal</text><text x="75" y="60" font-family="sans-serif" font-size="5" font-weight="bold" fill="#ef4444">Nationalised ship</text></svg>`,
    provenance: "The Suez Canal in Egypt, a strategic trade link nationalised by President Nasser in July 1956."
  },
  {
    keywords: ["yom kippur war", "bar-lev", "bar lev", "crossed the suez"],
    imageSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="150" style="background:#090d16; border-radius:4px;"><rect width="120" height="120" fill="#0b132b" /><path d="M 0,90 L 120,90 L 120,120 L 0,120 Z" fill="#0284c7" opacity="0.3" /><path d="M 0,90 L 120,90" stroke="#0284c7" stroke-width="2" /><path d="M 80,40 L 95,90 L 120,90 L 120,20 Z" fill="#eab308" opacity="0.5" /><path d="M 80,40 L 95,90" stroke="#eab308" stroke-width="3" /><path d="M 20,90 Q 50,50 82,45" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="3,3" /><text x="10" y="30" font-family="sans-serif" font-size="5" font-weight="bold" fill="#38bdf8">High-pressure Water</text><text x="85" y="30" font-family="sans-serif" font-size="5" font-weight="bold" fill="#eab308">Bar-Lev Sand Wall</text></svg>`,
    provenance: "Egyptian soldiers crossing the Suez Canal and using high-pressure water hoses to breach the Bar-Lev Line, October 1973."
  },
  {
    keywords: ["oslo accords", "oslo i", "handshake", "oslo agreement"],
    imageSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="150" style="background:#090d16; border-radius:4px;"><rect width="120" height="120" fill="#0b132b" /><circle cx="60" cy="60" r="30" fill="none" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4,4" /><path d="M 30,70 L 45,55 L 55,65 M 90,70 L 75,55 L 65,65 M 50,60 L 70,60 M 45,55 C 45,55 52,50 58,55 C 64,60 70,55 70,55" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" /><text x="35" y="25" font-family="sans-serif" font-size="5" font-weight="bold" fill="#22c55e">Oslo Peace Handshake</text><text x="45" y="105" font-family="sans-serif" font-size="4" fill="#cbd5e1">Rabin &amp; Arafat 1993</text></svg>`,
    provenance: "Historic handshake between Yitzhak Rabin and Yasser Arafat on the White House lawn, September 1993."
  },
  {
    keywords: ["ben-gurion declared", "birth of israel", "14 may 1948", "creation of the state", "creation of israel"],
    imageSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="100%" height="150" style="background:#090d16; border-radius:4px;"><rect width="120" height="120" fill="#0b132b" /><rect x="20" y="30" width="80" height="50" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.5" /><rect x="20" y="38" width="80" height="6" fill="#0038b8" /><rect x="20" y="66" width="80" height="6" fill="#0038b8" /><polygon points="60,46 64,56 54,50 66,50 56,56" stroke="#0038b8" stroke-width="1.5" fill="none" /><text x="35" y="95" font-family="sans-serif" font-size="5" font-weight="bold" fill="#0038b8">State of Israel Proclaimed</text></svg>`,
    provenance: "The proclamation of the State of Israel by David Ben-Gurion under the portrait of Theodor Herzl, Tel Aviv, 14 May 1948."
  }
];

function showFigureBioModal(figureKey) {
  const figure = KEY_FIGURES_BIO[figureKey];
  if (!figure) return;

  AudioEngine.play('flip');

  let modal = document.getElementById('timeline-bio-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'timeline-bio-modal';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 10000; padding: 20px; box-sizing: border-box;';
    document.body.appendChild(modal);
  }

  // Parse initials from name
  const parenMatch = figure.name.match(/\(([^)]+)\)/);
  let initials = '';
  if (parenMatch) {
    initials = parenMatch[1].toUpperCase();
  } else {
    const cleanName = figure.name.replace(/Jr\.|Chief Justice|General|Dr\./gi, '').trim();
    const parts = cleanName.split(/\s+/).filter(p => p.length > 0);
    if (parts.length >= 3) {
      initials = (parts[0][0] + parts[1][0] + parts[2][0]).toUpperCase();
    } else if (parts.length === 2) {
      initials = (parts[0][0] + parts[1][0]).toUpperCase();
    } else if (parts.length === 1) {
      initials = parts[0].substring(0, 2).toUpperCase();
    }
  }
  initials = initials.substring(0, 3);

  modal.innerHTML = `
    <div class="bio-modal-card" style="background: var(--bg-sidebar); border: 2px solid var(--accent); border-radius: var(--border-radius-lg); width: 100%; max-width: 480px; padding: 24px; box-shadow: var(--shadow-lg); animation: scaleIn 0.3s ease-out; position: relative; color: var(--text-main); box-sizing: border-box;">
      <button id="btn-close-bio-modal" style="position: absolute; top: 12px; right: 12px; background: none; border: none; color: var(--text-muted); font-size: 1.2rem; cursor: pointer; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; transition: color 0.2s;"><i class="fa-solid fa-xmark"></i></button>
      
      <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px;">
        <div style="width: 70px; height: 70px; border-radius: 50%; border: 2px solid var(--accent); flex-shrink: 0; overflow: hidden; display: flex; align-items: center; justify-content: center; background: var(--gradient-primary); box-shadow: var(--shadow-sm);">
          ${figure.image ? `
            <img src="${figure.image}" alt="${figure.name}" style="width: 100%; height: 100%; object-fit: cover;" 
              onerror="const fallback = '${getFallbackUrl(figure.image) || ''}'; if (fallback && this.src !== fallback) { this.referrerPolicy = 'no-referrer'; this.src = fallback; } else { this.style.display='none'; this.nextElementSibling.style.display='flex'; }">
            <span style="display: none; font-size: 1.4rem; font-weight: 800; color: #fff; font-family: var(--font-heading); text-shadow: 0 1px 3px rgba(0,0,0,0.3);">${initials}</span>
          ` : `
            <span style="font-size: 1.4rem; font-weight: 800; color: #fff; font-family: var(--font-heading); text-shadow: 0 1px 3px rgba(0,0,0,0.3);">${initials}</span>
          `}
        </div>
        <div>
          <h3 style="margin: 0; font-family: var(--font-heading); color: var(--text-main); font-size: 1.25rem; font-weight: 700; letter-spacing: -0.2px;">${figure.name}</h3>
          <span style="font-size: 0.82rem; color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: inline-block; margin-top: 2px;">${figure.role}</span>
          ${figure.sourceUrl ? `
            <div style="margin-top: 4px;">
              <a href="${figure.sourceUrl}" target="_blank" style="font-size: 0.72rem; color: var(--primary); text-decoration: underline; display: inline-flex; align-items: center; gap: 4px;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Portrait Source</a>
            </div>
          ` : ''}
        </div>
      </div>
      
      <div style="font-size: 0.95rem; line-height: 1.6; color: var(--text-main); margin-bottom: 24px; border-top: 1px solid var(--border-glass); padding-top: 16px; box-sizing: border-box;">
        <strong style="color: var(--accent); display: block; margin-bottom: 8px; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px;">GCSE Biography & Significance:</strong>
        <p style="margin: 0; font-style: normal; color: var(--text-main); font-weight: 400; line-height: 1.6;">${figure.bio}</p>
      </div>
      
      <button id="btn-ok-bio-modal" class="mastery-btn" style="width: 100%; justify-content: center; background: var(--gradient-primary); border: none; color: white; padding: 12px; font-weight: bold; border-radius: var(--border-radius-sm); cursor: pointer; transition: transform 0.2s, opacity 0.2s;">Got it!</button>
    </div>
  `;

  if (!document.getElementById('bio-modal-styles')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'bio-modal-styles';
    styleEl.textContent = `
      @keyframes scaleIn {
        from { transform: scale(0.9); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      #btn-close-bio-modal:hover {
        color: var(--accent) !important;
      }
      #btn-ok-bio-modal:hover {
        opacity: 0.9;
        transform: translateY(-1px);
      }
    `;
    document.head.appendChild(styleEl);
  }

  modal.style.display = 'flex';

  const close = () => {
    modal.style.display = 'none';
  };

  document.getElementById('btn-close-bio-modal').addEventListener('click', close);
  document.getElementById('btn-ok-bio-modal').addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
}

function renderTimelineView() {
  const wrapper = document.getElementById('timeline-items-wrapper');
  wrapper.innerHTML = '';
  
  const eraFilter = document.getElementById('timeline-era-select').value;
  const searchInputEl = document.getElementById('timeline-search-input');
  const searchQuery = searchInputEl ? searchInputEl.value.trim().toLowerCase() : '';
  const filterPeopleBtn = document.getElementById('btn-timeline-filter-people');
  const peopleOnlyActive = filterPeopleBtn ? filterPeopleBtn.classList.contains('active') : false;

  let questions = [...state.allQuestions];
  
  // 1. Era filter
  if (eraFilter !== 'all') {
    questions = questions.filter(q => q.topicId === eraFilter);
  }

  // 2. Search Query filter
  if (searchQuery) {
    questions = questions.filter(q => {
      const yearStr = (q.year || '').toString();
      const questionText = (q.question || '').toLowerCase();
      const answerText = (q.answer || '').toLowerCase();
      const explanationText = (q.explanation || '').toLowerCase();
      return yearStr.includes(searchQuery) ||
             questionText.includes(searchQuery) ||
             answerText.includes(searchQuery) ||
             explanationText.includes(searchQuery);
    });
  }

  // 3. People Only filter
  if (peopleOnlyActive) {
    const figureKeys = Object.keys(KEY_FIGURES_BIO);
    questions = questions.filter(q => {
      const textToSearch = `${q.question} ${q.answer} ${q.explanation || ''}`.toLowerCase();
      return figureKeys.some(key => textToSearch.includes(key));
    });
  }
  
  // Sort chronologically by year ascending
  questions.sort((a, b) => a.year - b.year);
  
  document.getElementById('timeline-count-display').textContent = `${questions.length} chronological milestone${questions.length === 1 ? '' : 's'} mapped`;
  
  if (questions.length === 0) {
    wrapper.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-timeline"></i>
        <h3>No milestones found</h3>
      </div>
    `;
    return;
  }

  // Clear matched visual states
  TIMELINE_IMAGES.forEach(ti => ti.used = false);
  
  questions.forEach(q => {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.setAttribute('data-subtopic', q.subtopicId);
    
    let topicName = "Key Topic 1";
    if (q.topicId === 'topic_2') topicName = "Key Topic 2";
    if (q.topicId === 'topic_3') topicName = "Key Topic 3";

    const textToSearch = `${q.question} ${q.answer} ${q.explanation || ''}`.toLowerCase();

    // Check for timeline visual source
    let visualHtml = '';
    const matchedImg = TIMELINE_IMAGES.find(ti => !ti.used && ti.keywords.some(kw => textToSearch.includes(kw)));
    if (matchedImg) {
      matchedImg.used = true;
      const base64Svg = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(matchedImg.imageSvg)));
      visualHtml = `
        <div class="timeline-image-wrapper" style="margin-top: 10px; margin-bottom: 8px; border-radius: var(--border-radius-sm); overflow: hidden; background: #000; max-height: 200px; display: flex; align-items: center; justify-content: center;">
          <img src="${base64Svg}" alt="Visual Source" style="max-width: 100%; max-height: 200px; object-fit: contain; opacity: 0.9;">
        </div>
        <div class="timeline-image-provenance" style="font-size: 0.75rem; color: #cbd5e1; font-weight: 500; background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); padding: 8px 10px; border-radius: 4px; margin-bottom: 10px; line-height: 1.4; box-sizing: border-box;">
          <strong style="color: inherit;">Source Provenance:</strong> ${matchedImg.provenance}
        </div>
      `;
    }

    // Check for key figures
    let figureButtonsHtml = '';
    const figureKeys = Object.keys(KEY_FIGURES_BIO);
    const matchedFigures = new Set();
    
    figureKeys.forEach(key => {
      if (textToSearch.includes(key)) {
        matchedFigures.add(KEY_FIGURES_BIO[key].name);
      }
    });

    let buttons = '';
    if (matchedFigures.size > 0) {
      buttons = Array.from(matchedFigures).map(name => {
        const key = figureKeys.find(k => KEY_FIGURES_BIO[k].name === name);
        const fig = KEY_FIGURES_BIO[key];
        const initials = name.split(/\s+/).map(n => n[0]).join('').substring(0, 2).toUpperCase();
        return `
          <button class="timeline-bio-btn" data-figure="${key}" style="margin-right: 6px; margin-top: 6px; padding: 2px 10px 2px 4px; font-size: 0.72rem; border-radius: 16px; background: rgba(245, 158, 11, 0.1); border: 1px solid var(--accent); color: var(--accent); font-weight: bold; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
            <div style="width: 20px; height: 20px; border-radius: 50%; overflow: hidden; display: flex; align-items: center; justify-content: center; background: var(--gradient-primary); border: 1px solid var(--accent); flex-shrink: 0;">
              ${fig.image ? `
                <img src="${fig.image}" alt="${name}" style="width: 100%; height: 100%; object-fit: cover;" 
                  onerror="const fallback = '${getFallbackUrl(fig.image) || ''}'; if (fallback && this.src !== fallback) { this.referrerPolicy = 'no-referrer'; this.src = fallback; } else { this.style.display='none'; this.nextElementSibling.style.display='flex'; }">
                <span style="display: none; font-size: 0.5rem; font-weight: 800; color: #fff;">${initials}</span>
              ` : `
                <span style="font-size: 0.5rem; font-weight: 800; color: #fff;">${initials}</span>
              `}
            </div>
            <span>Figure: ${name}</span>
          </button>
        `;
      }).join('');
    }
    
    const lessonButton = `<button class="timeline-lesson-btn" data-subtopic="${q.subtopicId}" style="margin-right: 6px; margin-top: 6px; padding: 4px 10px; font-size: 0.72rem; border-radius: 12px; background: rgba(59, 130, 246, 0.1); border: 1px solid var(--primary); color: var(--primary); font-weight: bold; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;"><i class="fa-solid fa-book-open"></i> Go to Lesson</button>`;
    const combinedButtonsHtml = `<div class="timeline-buttons-row" style="margin-top: 8px; display: flex; flex-wrap: wrap;">${lessonButton}${buttons}</div>`;
    
    item.innerHTML = `
      <div class="timeline-marker"></div>
      <div class="timeline-year">${q.year}</div>
      <div class="timeline-content-card" style="cursor: pointer;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px;">
          <span style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">${topicName}</span>
          <span class="badge ${q.type === 'standard' ? 'badge-standard' : 'badge-depth'}">${q.type === 'standard' ? 'Standard' : 'Top Tier Trivia'}</span>
        </div>
        <div class="timeline-q-title" style="font-weight: bold; line-height: 1.4;">${q.question}</div>
        
        <div class="timeline-reveal-panel">
          ${visualHtml}
          <div class="timeline-a-box" style="margin-top: 8px;">
            <div class="timeline-a-text" style="color: var(--primary); font-weight: bold;">${q.answer}</div>
            <p class="timeline-exp" style="margin-top: 4px; font-size: 0.85rem; color: var(--text-muted); line-height: 1.4;">${q.explanation}</p>
          </div>
        </div>
        ${combinedButtonsHtml}
      </div>
    `;
    
    const card = item.querySelector('.timeline-content-card');
    card.addEventListener('click', (e) => {
      if (e.target.closest('.timeline-bio-btn') || e.target.closest('.timeline-lesson-btn')) return;
      AudioEngine.play('click');
      card.classList.toggle('revealed');
    });

    const bioBtns = item.querySelectorAll('.timeline-bio-btn');
    bioBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const figKey = btn.getAttribute('data-figure');
        showFigureBioModal(figKey);
      });
    });

    const lessonBtns = item.querySelectorAll('.timeline-lesson-btn');
    lessonBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        AudioEngine.play('click');
        const subtopicId = btn.getAttribute('data-subtopic');
        state.currentMode = 'lessons';
        switchView('subtopic', subtopicId);
      });
    });
    
    wrapper.appendChild(item);
  });
}


function evaluateStudentAnswer(type, questionObj, userAnswer) {
  const cleanAns = (userAnswer || "").trim().toLowerCase();
  
  // Base checks
  const wordCount = cleanAns.split(/\s+/).filter(w => w.length > 0).length;
  const hasMinLength = wordCount >= 10;
  
  // Check for causal connectives
  const connectives = ["led to", "resulted in", "caused", "forced", "provoked", "as a result", "consequently", "because", "this meant", "this caused", "therefore"];
  const matchedConnectives = connectives.filter(c => cleanAns.includes(c));
  const hasCausal = matchedConnectives.length > 0;
  
  // Extract or get key historical nouns/dates
  let keywords = [];
  if (questionObj.keywords && questionObj.keywords.length > 0) {
    keywords = questionObj.keywords;
  } else {
    const answerText = questionObj.answer || questionObj.model || "";
    const modelWords = answerText.replace(/<[^>]*>/g, '').split(/\s+/);
    modelWords.forEach(w => {
      const cleanW = w.replace(/[^a-zA-Z0-9]/g, '');
      if (cleanW.length > 2) {
        const isNum = !isNaN(cleanW);
        const isCap = cleanW[0] === cleanW[0].toUpperCase() && cleanW[0] !== cleanW[0].toLowerCase();
        if (isNum || isCap) {
          const lower = cleanW.toLowerCase();
          // Skip common words
          const skip = ["the", "and", "one", "this", "that", "was", "for", "with", "from", "after", "israel", "palestine", "arab", "jewish", "egypt", "jordan", "syria", "zionist"];
          if (!skip.includes(lower) && !keywords.includes(cleanW)) {
            keywords.push(cleanW);
          }
        }
      }
    });
  }

  const matchedKeywords = keywords.filter(kw => cleanAns.includes(kw.toLowerCase()));
  const hasKeywords = matchedKeywords.length >= (type === 'consequence' ? 1 : 2);

  // Structural checks
  let scoreRules = [false, false, false, false];
  let feedbackHtml = "";

  if (type === 'consequence') {
    scoreRules[0] = wordCount >= 8;
    scoreRules[1] = hasKeywords;
    scoreRules[2] = hasCausal;
    scoreRules[3] = wordCount >= 30 && matchedConnectives.length >= 1;

    const missed = [];
    if (!scoreRules[0]) missed.push("State a clear, direct consequence at the beginning.");
    if (!scoreRules[1]) missed.push(`Include more specific historical details (e.g., matching keywords like: ${keywords.slice(0, 4).join(', ')})`);
    if (!scoreRules[2]) missed.push("Use causal connectives (e.g., 'resulted in', 'led to', 'consequently') to link your points.");
    if (!scoreRules[3]) missed.push("Expand your explanation to trace the full cause-and-effect chain (aim for at least 30-40 words).");

    if (missed.length === 0) {
      feedbackHtml = `<span style="color: var(--success); font-weight: bold;"><i class="fa-solid fa-circle-check"></i> Excellent Critique!</span> Your response meets all mark scheme criteria. It is well-structured, detailed, and utilizes causal links.`;
    } else {
      feedbackHtml = `<strong style="color: var(--accent); display: block; margin-bottom: 6px;"><i class="fa-solid fa-triangle-exclamation"></i> Examiner Feedback & Recommendations:</strong>
      <ul style="margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 4px;">
        ${missed.map(m => `<li>${m}</li>`).join('')}
      </ul>`;
    }
  } else if (type === 'narrative') {
    scoreRules[0] = wordCount >= 30;
    scoreRules[1] = matchedConnectives.length >= 2;
    scoreRules[2] = matchedKeywords.length >= 3;
    
    const processWords = ["forced", "provoked", "led to", "caused", "resulted in"];
    const matchedProcess = processWords.filter(pw => cleanAns.includes(pw));
    scoreRules[3] = matchedProcess.length >= 1;

    const missed = [];
    if (!scoreRules[0]) missed.push("Expand your narrative to fully cover the chronological sequence of events.");
    if (!scoreRules[1]) missed.push("Clearly link the events using transitional connectives showing how one event triggered the next.");
    if (!scoreRules[2]) missed.push(`Add more precise historical facts (e.g. key terms like: ${keywords.slice(0, 5).join(', ')})`);
    if (!scoreRules[3]) missed.push("Integrate at least one core Edexcel process word (e.g., 'forced', 'provoked', 'resulted in') to elevate your academic tone.");

    if (missed.length === 0) {
      feedbackHtml = `<span style="color: var(--success); font-weight: bold;"><i class="fa-solid fa-circle-check"></i> Excellent Critique!</span> Your narrative account effectively links events chronologically and uses solid analytical process terminology.`;
    } else {
      feedbackHtml = `<strong style="color: var(--accent); display: block; margin-bottom: 6px;"><i class="fa-solid fa-triangle-exclamation"></i> Examiner Feedback & Recommendations:</strong>
      <ul style="margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 4px;">
        ${missed.map(m => `<li>${m}</li>`).join('')}
      </ul>`;
    }
  } else if (type === 'importance') {
    const paragraphs = userAnswer.split(/\n+/).map(p => p.trim()).filter(p => p.length > 20);
    scoreRules[0] = paragraphs.length >= 2;
    scoreRules[1] = matchedKeywords.length >= 3;
    scoreRules[2] = wordCount >= 50 && hasCausal;
    scoreRules[3] = matchedConnectives.length >= 2;

    const missed = [];
    if (!scoreRules[0]) missed.push("Structure your answer into two distinct paragraphs (use double-enter to separate them), each dealing with a different aspect of importance.");
    if (!scoreRules[1]) missed.push(`Include more specific historical facts (e.g., keywords like: ${keywords.slice(0, 5).join(', ')})`);
    if (!scoreRules[2]) missed.push("Explicitly explain the outcomes and 'what difference the event made' rather than just describing the event itself.");
    if (!scoreRules[3]) missed.push("Use multiple analytical connectives (e.g., 'this meant that', 'consequently') to clearly outline the long-term impact.");

    if (missed.length === 0) {
      feedbackHtml = `<span style="color: var(--success); font-weight: bold;"><i class="fa-solid fa-circle-check"></i> Excellent Critique!</span> Your response is well-structured in two distinct paragraphs and highlights the historical significance of the event with precise detail.`;
    } else {
      feedbackHtml = `<strong style="color: var(--accent); display: block; margin-bottom: 6px;"><i class="fa-solid fa-triangle-exclamation"></i> Examiner Feedback & Recommendations:</strong>
      <ul style="margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 4px;">
        ${missed.map(m => `<li>${m}</li>`).join('')}
      </ul>`;
    }
  }

  return { scores: scoreRules, feedback: feedbackHtml, keywords: keywords, matchedKeywords: matchedKeywords };
}

// 7. Bookmarks Deck Rendering
function renderBookmarksView() {
  const container = document.getElementById('bookmarks-list-container');
  container.innerHTML = '';
  
  const bookmarkedQs = state.allQuestions.filter(q => state.bookmarks.includes(q.id));
  
  if (bookmarkedQs.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-star" style="color: var(--scrollbar-thumb);"></i>
        <h3>No bookmarked cards</h3>
        <p>Click the star icon in Accordions or Flashcards to compile a custom deck of hard questions here.</p>
      </div>
    `;
    return;
  }
  
  bookmarkedQs.forEach((q, idx) => {
    const isMastered = !!state.mastery[q.id];
    
    const details = document.createElement('details');
    details.className = 'quiz-card-details';
    
    details.innerHTML = `
      <summary class="quiz-card-summary">
        <div class="summary-content">
          <span class="summary-num">${idx + 1}</span>
          <span class="summary-text">${q.question}</span>
        </div>
        <div class="summary-badges">
          <span class="badge ${q.type === 'standard' ? 'badge-standard' : 'badge-depth'}">${q.type === 'standard' ? 'Standard' : 'Top Tier Trivia'}</span>
          <span class="badge badge-year">${q.year}</span>
          <div class="bookmark-icon-container bookmarked" data-qid="${q.id}" title="Remove Bookmark">
            <i class="fa-solid fa-star"></i>
          </div>
          <div class="mastery-checkbox-container ${isMastered ? 'mastered' : ''}" data-qid="${q.id}" title="Mark as Mastered">
            <i class="fa-solid fa-check"></i>
          </div>
          <i class="fa-solid fa-chevron-down summary-arrow"></i>
        </div>
      </summary>
      <div class="details-content">
        <div class="answer-header">
          <i class="fa-solid fa-circle-check"></i> Correct Key Term
        </div>
        <div class="answer-value">${q.answer}</div>
        <div class="explanation-value">${q.explanation}</div>
      </div>
    `;
    
    details.querySelector('.bookmark-icon-container').addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleBookmark(q.id);
      renderBookmarksView(); // Refresh layout immediately
    });
    
    const checkBtn = details.querySelector('.mastery-checkbox-container');
    checkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const nextState = !checkBtn.classList.contains('mastered');
      setMastered(q.id, nextState);
      checkBtn.classList.toggle('mastered', nextState);
      if (nextState) AudioEngine.play('success');
      else AudioEngine.play('click');
    });

    details.addEventListener('toggle', () => {
      if (details.open) {
        AudioEngine.play('flip');
      }
    });
    
    container.appendChild(details);
  });
}

function openVideoModal(src, title) {
  const modal = document.getElementById('video-modal-overlay');
  const iframe = document.getElementById('video-modal-iframe');
  const modalTitle = document.getElementById('video-modal-title');
  const externalLink = document.getElementById('video-modal-external-link');
  
  if (!modal || !iframe || !modalTitle) return;
  
  modalTitle.textContent = title;
  
  let embedUrl = src;
  let watchUrl = src;
  let videoId = '';
  
  try {
    if (src.includes('youtube.com/watch')) {
      const url = new URL(src);
      videoId = url.searchParams.get('v');
    } else if (src.includes('youtu.be/')) {
      const parts = src.split('youtu.be/');
      videoId = parts[1]?.split('?')[0];
    } else if (src.includes('youtube.com/embed/')) {
      const parts = src.split('youtube.com/embed/');
      videoId = parts[1]?.split('?')[0];
    } else if (src.includes('youtube-nocookie.com/embed/')) {
      const parts = src.split('youtube-nocookie.com/embed/');
      videoId = parts[1]?.split('?')[0];
    }
    
    if (videoId) {
      // Build standard youtube embed URL
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
      // Standard watch URL for fallback link
      watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
      
      // Append origin parameters for security check if running on web server
      const currentOrigin = window.location.origin;
      const params = ['rel=0'];
      
      if (currentOrigin && currentOrigin !== 'null' && !currentOrigin.startsWith('file:')) {
        params.push(`origin=${encodeURIComponent(currentOrigin)}`);
      }
      
      embedUrl = `${embedUrl}?${params.join('&')}`;
    }
  } catch (e) {
    console.error("Failed to parse video URL:", e);
  }
  
  iframe.src = embedUrl;
  if (externalLink) {
    externalLink.href = watchUrl;
  }
  
  modal.style.display = 'flex';
  AudioEngine.play('click');
}

function closeVideoModal() {
  const modal = document.getElementById('video-modal-overlay');
  const iframe = document.getElementById('video-modal-iframe');
  
  if (!modal || !iframe) return;
  
  iframe.src = '';
  modal.style.display = 'none';
  AudioEngine.play('click');
}


// ==========================================
// PORTED REVISION GAMES HUB IMPLEMENTATION
// ==========================================

export const GOOGLE_SHEET_WEBAPP_URL = "";

// --- Spaced Repetition / Missed Terms Helpers ---
function getMissedTerms() {
  try {
    const list = localStorage.getItem(getProfileStorageKey('antigravity_mastery_missed_terms'));
    return list ? JSON.parse(list) : [];
  } catch (e) {
    return [];
  }
}

function recordMissedTerm(term) {
  try {
    const list = getMissedTerms();
    if (!list.includes(term)) {
      list.push(term);
      localStorage.setItem(getProfileStorageKey('antigravity_mastery_missed_terms'), JSON.stringify(list));
    }
  } catch (e) {}
}

function resolveMissedTerm(term) {
  try {
    let list = getMissedTerms();
    list = list.filter(t => t !== term);
    localStorage.setItem(getProfileStorageKey('antigravity_mastery_missed_terms'), JSON.stringify(list));
  } catch (e) {}
}

// --- Game States ---
let chronoState = {
  selectedEvents: [],
  shuffledEvents: [],
  placedEvents: [null, null, null, null, null],
  score: 0,
  hasChecked: false
};

let masteryState = {
  unitId: null,
  items: [],
  selectedTermCard: null,
  selectedDefCard: null,
  score: 0,
  timerVal: 60,
  timerInterval: null,
  isSpeedRun: false,
  matchedCount: 0
};

let mindmapState = {
  subtopicId: null,
  nodes: [],
  shuffledNodes: [],
  placedCount: 0,
  score: 0,
  timerVal: 60,
  timerInterval: null,
  isSpeedRun: false
};

// --- Chronology Challenge Data & Generator ---
const CHRONOLOGY_EVENTS = {};

function populateChronologyEvents() {
  if (Object.keys(CHRONOLOGY_EVENTS).length > 0) return;

  QUIZ_DATA.forEach(topic => {
    const topicId = topic.id;
    CHRONOLOGY_EVENTS[topicId] = [];

    topic.subtopics.forEach(sub => {
      const subtopicId = sub.id;
      CHRONOLOGY_EVENTS[subtopicId] = [];

      const subQuestions = [
        ...(sub.standard || []),
        ...(sub.depth || [])
      ].filter(q => q.year && q.answer && q.question);

      subQuestions.forEach(q => {
        const ev = {
          id: `chrono_${q.id}`,
          year: q.year,
          answer: q.answer,
          question: q.question
        };
        CHRONOLOGY_EVENTS[subtopicId].push(ev);
        CHRONOLOGY_EVENTS[topicId].push(ev);
      });
    });
  });
}

// --- Causal Link Builder ---
function playCausalGame(subtopicId) {
  const container = document.getElementById('causal-game-play-area');
  if (!container) return;

  const data = LESSONS_DATA[subtopicId];
  if (!data || !data.causalLinks) return;

  const causalLinks = data.causalLinks;
  const totalFactors = causalLinks.factors.length;
  const linkedFactors = new Set();
  const pooledLinks = causalLinks.factors.map(factor => factor.linkageText);

  let factorsHtml = '';
  causalLinks.factors.forEach((f, idx) => {
    const correctIdx = pooledLinks.indexOf(f.linkageText);
    const optionsMarkup = pooledLinks.map((linkText, lIdx) => {
      return `<option value="${lIdx}">${linkText}</option>`;
    }).join('');

    factorsHtml += `
      <div class="causal-factor-card" id="causal-game-factor-card-${f.id}" style="padding: 16px; background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm); margin-bottom: 16px; transition: all 0.3s;">
        <div class="causal-factor-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <span style="font-weight: 600; font-size: 0.95rem; color: var(--text-main);">Factor ${idx + 1}: ${f.title}</span>
          <span class="causal-status-badge" id="causal-game-status-${f.id}" style="font-size: 0.7rem; font-weight: 700; padding: 4px 8px; border-radius: 4px; background: rgba(239, 68, 68, 0.1); color: #f87171;">UNLINKED</span>
        </div>
        <div class="causal-select-wrapper" id="causal-game-select-wrapper-${f.id}">
          <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 6px;">Select the correct analytical consequence / evidence link:</label>
          <select class="causal-select" id="causal-game-select-${f.id}" data-factor-id="${f.id}" data-correct="${correctIdx}" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.3); border: 1px solid var(--border-glass); border-radius: 4px; color: var(--text-main); font-size: 0.88rem; outline: none; cursor: pointer;">
            <option value="" disabled selected>-- Match the consequence link --</option>
            ${optionsMarkup}
          </select>
        </div>
        <div class="causal-link-result" id="causal-game-result-${f.id}" style="display: none; margin-top: 10px; padding: 10px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; border-radius: 0 4px 4px 0; font-size: 0.88rem; color: #a7f3d0; line-height: 1.4;">
          <strong>✓ Consequence Link:</strong> ${f.linkageText}
        </div>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="causal-connector-container" style="background: var(--bg-card); padding: 24px; border: 1px solid var(--border-glass); border-radius: var(--border-radius-md); box-shadow: var(--shadow-md);">
      <h3 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-top: 0; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
        <i class="fa-solid fa-link" style="color: var(--primary);"></i> Causal Link Builder
      </h3>
      <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; margin: 0 0 16px 0;">
        Revision essays require you to link specific factors to their historical consequences. Select the correct link for each factor.
      </p>
      <div class="causal-question" style="background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.2); padding: 16px; border-radius: var(--border-radius-sm); margin-bottom: 20px; font-size: 0.92rem; line-height: 1.5; color: var(--text-main);">
        <strong style="color: var(--primary);">Essay Question:</strong> &nbsp;${causalLinks.question}
      </div>
      <div class="causal-factors-grid">
        ${factorsHtml}
      </div>
      <div class="causal-success-panel" id="causal-game-success-panel" style="display: none; text-align: center; margin-top: 24px; padding: 24px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: var(--border-radius-md); transition: all 0.3s;">
        <h4 style="font-family: var(--font-heading); font-size: 1.3rem; font-weight: 700; color: #34d399; margin: 0 0 8px 0; display: flex; align-items: center; justify-content: center; gap: 8px;">
          <i class="fa-solid fa-trophy"></i> Causation Mastered!
        </h4>
        <p style="font-size: 0.92rem; line-height: 1.5; color: #a7f3d0; margin: 0;">${causalLinks.successText}</p>
      </div>
    </div>
  `;

  causalLinks.factors.forEach(f => {
    const select = document.getElementById(`causal-game-select-${f.id}`);
    if (select) {
      select.addEventListener('change', (e) => {
        const selectedVal = parseInt(e.target.value);
        const correctVal = parseInt(select.getAttribute('data-correct'));
        const card = document.getElementById(`causal-game-factor-card-${f.id}`);
        const status = document.getElementById(`causal-game-status-${f.id}`);
        const result = document.getElementById(`causal-game-result-${f.id}`);
        const wrapper = document.getElementById(`causal-game-select-wrapper-${f.id}`);

        if (selectedVal === correctVal) {
          AudioEngine.play('success');
          card.style.borderColor = 'rgba(16, 185, 129, 0.4)';
          card.style.background = 'rgba(16, 185, 129, 0.03)';
          status.textContent = "LINKED!";
          status.style.background = 'rgba(16, 185, 129, 0.15)';
          status.style.color = '#34d399';
          wrapper.style.display = 'none';
          result.style.display = 'block';
          linkedFactors.add(f.id);

          if (linkedFactors.size === totalFactors) {
            AudioEngine.play('cheer');
            Confetti.spawn();
            const panel = document.getElementById('causal-game-success-panel');
            if (panel) panel.style.display = 'block';
          }
        } else {
          AudioEngine.play('fail');
          card.style.transform = 'translateX(-6px)';
          setTimeout(() => card.style.transform = 'translateX(6px)', 60);
          setTimeout(() => card.style.transform = 'translateX(-4px)', 120);
          setTimeout(() => card.style.transform = 'translateX(4px)', 180);
          setTimeout(() => card.style.transform = 'translateX(0)', 240);
          select.value = "";
        }
      });
    }
  });
}

// --- Chronology Challenge ---
function initChronologyGame() {
  populateChronologyEvents();
  const container = document.getElementById('chronology-game-play-area');
  if (!container) return;

  const topicSelect = document.getElementById('chrono-game-topic-select');
  const topicId = topicSelect ? topicSelect.value : 'topic_1';
  
  const pool = CHRONOLOGY_EVENTS[topicId] || [];
  if (pool.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="text-align: center; padding: 40px 20px;">
        <i class="fa-solid fa-hourglass-empty" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 12px;"></i>
        <h3 style="color: var(--text-main); margin-bottom: 8px;">No Chronological Events Found</h3>
        <p style="color: var(--text-muted); font-size: 0.88rem;">Try selecting a different topic unit from the dropdown above.</p>
      </div>
    `;
    return;
  }

  // Randomly select 5 unique events
  const selected = [...pool].sort(() => 0.5 - Math.random()).slice(0, 5);

  // Sort them chronologically to get the correct sequence
  chronoState.selectedEvents = [...selected].sort((a, b) => a.year - b.year);
  
  // Shuffle events for option cards
  chronoState.shuffledEvents = [...selected].sort(() => 0.5 - Math.random());
  chronoState.placedEvents = [null, null, null, null, null];
  chronoState.hasChecked = false;

  renderChronologyGameUI();
}

function renderChronologyGameUI() {
  const container = document.getElementById('chronology-game-play-area');
  if (!container) return;

  // Generate Slots HTML
  let slotsHtml = '';
  chronoState.placedEvents.forEach((placedEvent, idx) => {
    if (idx > 0) {
      slotsHtml += `
        <div class="mindmap-arrow" id="chrono-arrow-${idx}" style="opacity: 0.25; display: flex; align-items: center; justify-content: center;">
          <i class="fa-solid fa-arrow-right horizontal-arrow" style="color: var(--primary); font-size: 1.1rem;"></i>
          <i class="fa-solid fa-arrow-down vertical-arrow" style="color: var(--primary); font-size: 1.1rem; margin: 4px 0;"></i>
        </div>
      `;
    }
    
    if (placedEvent) {
      slotsHtml += `
        <div class="chrono-slot filled" id="chrono-slot-${idx}" data-index="${idx}">
          <span class="chrono-slot-label">Step ${idx + 1}</span>
          <div class="chrono-card-content">
            <strong>${placedEvent.answer}</strong>
            <p>${placedEvent.question}</p>
          </div>
        </div>
      `;
    } else {
      slotsHtml += `
        <div class="chrono-slot" id="chrono-slot-${idx}" data-index="${idx}">
          <span class="chrono-slot-label">Step ${idx + 1}</span>
          <div class="chrono-slot-placeholder-text">Empty Slot</div>
        </div>
      `;
    }
  });

  // Generate Shuffled Option Cards HTML
  let optionsHtml = chronoState.shuffledEvents.map((q) => {
    const isPlaced = chronoState.placedEvents.some(p => p && p.id === q.id);
    const cleanId = `chrono-opt-${q.id}`;
    return `
      <div class="chrono-option-card ${isPlaced ? 'placed' : ''}" id="${cleanId}" data-qid="${q.id}">
        <strong style="color: var(--primary); font-size: 0.88rem; display: block; margin-bottom: 2px; line-height: 1.25;">${q.answer}</strong>
        <p style="font-size: 0.72rem; line-height: 1.35; color: var(--text-muted); margin: 0; font-style: italic;">Clue: ${q.question}</p>
      </div>
    `;
  }).join('');

  const isAllFilled = chronoState.placedEvents.every(p => p !== null);

  container.innerHTML = `
    <div class="causal-connector-container" style="background: var(--bg-card); padding: 24px; border: 1px solid var(--border-glass); border-radius: var(--border-radius-md); box-shadow: var(--shadow-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h3 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin: 0; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-hourglass-half" style="color: var(--primary);"></i> Chronology Challenge
        </h3>
        <span style="font-weight: 700; font-size: 0.95rem; color: var(--success);" id="chrono-score-display">Score: ${chronoState.score}</span>
      </div>
      <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; margin: 0 0 20px 0;">
        Chronological sequence is vital. Tap option cards below to place them in the timeline. Tapping a placed event removes it back to the options. Arrange all 5 in the correct chronological sequence (earliest to latest) and verify!
      </p>

      <!-- Chronology slots panel (Top viewport) -->
      <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">Chronology Timeline</div>
      <div class="chrono-slots-container">
        ${slotsHtml}
      </div>

      <!-- Success panel placed right underneath the timeline slots -->
      <div class="causal-success-panel" id="chrono-success-panel" style="display: none; text-align: center; margin-top: 16px; padding: 20px; background: rgba(16, 185, 129, 0.05); border: 1px solid var(--success); border-radius: var(--border-radius-md);">
        <h4 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: var(--success); margin: 0 0 8px 0; display: flex; align-items: center; justify-content: center; gap: 8px;">
          <i class="fa-solid fa-medal"></i> Chronology Mastered!
        </h4>
        <p style="font-size: 0.9rem; line-height: 1.5; color: var(--text-main); margin-bottom: 16px;">
          Outstanding work! You successfully ordered all 5 milestones in their correct chronological sequence.
        </p>
        <div id="chrono-narrative-container" style="margin-bottom: 20px;"></div>
        <button class="btn-primary" id="btn-chrono-play-again" style="padding: 10px 20px; font-weight: 600; font-size: 0.9rem; border-radius: 4px; cursor: pointer;">
          <i class="fa-solid fa-rotate-right"></i> Play Again (New Events)
        </button>
      </div>

      <div id="chrono-play-controls-area">
        <!-- Shuffled event cards shelf (Bottom viewport) -->
        <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">Timeline Event Options</div>
        <div class="chrono-options-container">
          ${optionsHtml}
        </div>

        <!-- Clue Feedback box -->
        <div id="chrono-feedback-message" style="display: none; font-size: 0.82rem; line-height: 1.45; padding: 10px 14px; border-radius: var(--border-radius-sm); margin-top: 16px; font-weight: 600; text-align: center;"></div>

        <!-- Action buttons -->
        <div style="display: flex; gap: 12px; margin-top: 24px; justify-content: center; align-items: center; flex-wrap: wrap;">
          <button class="btn-primary" id="btn-chrono-check" ${isAllFilled ? '' : 'disabled'} style="padding: 10px 20px; font-weight: 600; font-size: 0.9rem; border-radius: 4px; cursor: ${isAllFilled ? 'pointer' : 'not-allowed'}; opacity: ${isAllFilled ? '1' : '0.5'}; display: ${chronoState.hasChecked ? 'none' : 'inline-flex'}; align-items: center; gap: 6px;">
            <i class="fa-solid fa-clipboard-check"></i> Verify Sequence
          </button>
          <button class="btn-secondary" id="btn-chrono-reset" style="padding: 10px 20px; font-weight: 600; font-size: 0.9rem; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-arrow-rotate-left"></i> Clear All
          </button>
        </div>
      </div>
    </div>
  `;

  bindChronologyEvents();
}

function bindChronologyEvents() {
  const container = document.getElementById('game-chronology-container');
  if (!container) return;

  // Shelf cards
  container.querySelectorAll('.chrono-option-card').forEach(card => {
    card.addEventListener('click', () => {
      if (chronoState.hasChecked) return;
      
      const qid = card.getAttribute('data-qid');
      const eventObj = chronoState.shuffledEvents.find(e => e.id === qid);
      if (!eventObj) return;

      // Find first empty slot
      const emptyIdx = chronoState.placedEvents.indexOf(null);
      if (emptyIdx > -1) {
        AudioEngine.play('click');
        chronoState.placedEvents[emptyIdx] = eventObj;
        renderChronologyGameUI();
      }
    });
  });

  // Placed slots
  container.querySelectorAll('.chrono-slot.filled').forEach(slot => {
    slot.addEventListener('click', () => {
      const idx = parseInt(slot.getAttribute('data-index'));
      
      AudioEngine.play('click');
      chronoState.placedEvents[idx] = null;
      chronoState.hasChecked = false; // Reset checked status
      renderChronologyGameUI();
    });
  });

  // Check button
  const checkBtn = document.getElementById('btn-chrono-check');
  if (checkBtn) {
    checkBtn.addEventListener('click', () => {
      verifyChronologySequence();
    });
  }

  // Reset button
  const resetBtn = document.getElementById('btn-chrono-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      AudioEngine.play('click');
      chronoState.placedEvents = [null, null, null, null, null];
      chronoState.hasChecked = false;
      renderChronologyGameUI();
    });
  }

  // Success panel Play Again button
  const playAgainBtn = document.getElementById('btn-chrono-play-again');
  if (playAgainBtn) {
    playAgainBtn.addEventListener('click', () => {
      AudioEngine.play('click');
      initChronologyGame();
    });
  }
}

function generateChronoNarrativeParagraph(events) {
  const parts = events.map((e, idx) => {
    const qText = e.question.trim();
    const ansText = e.answer.trim();
    
    if (idx === 0) {
      return `In <strong>${e.year}</strong>, the <strong>${ansText}</strong> occurred (${qText})`;
    } else if (idx === 1) {
      return `this was followed in <strong>${e.year}</strong> by the <strong>${ansText}</strong> (${qText})`;
    } else if (idx === 2) {
      return `subsequently, in <strong>${e.year}</strong>, the <strong>${ansText}</strong> took place (${qText})`;
    } else if (idx === 3) {
      return `next, in <strong>${e.year}</strong>, the <strong>${ansText}</strong> happened (${qText})`;
    } else {
      return `and finally, in <strong>${e.year}</strong>, this story culminated in the <strong>${ansText}</strong> (${qText})`;
    }
  });

  let narrative = parts.join("; ");
  narrative = narrative.charAt(0).toUpperCase() + narrative.slice(1);
  if (!narrative.endsWith('.')) {
    narrative += '.';
  }

  return `
    <div style="text-align: left; background: rgba(16, 185, 129, 0.05); border-left: 4px solid var(--success); padding: 14px 18px; border-radius: var(--border-radius-sm); margin-top: 16px;">
      <strong style="color: var(--success); display: block; margin-bottom: 6px; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px;">
        <i class="fa-solid fa-book-open"></i> Historical Narrative:
      </strong>
      <p style="font-size: 0.88rem; line-height: 1.6; color: var(--text-main); margin: 0; font-style: italic;">
        ${narrative}
      </p>
    </div>
`;
}

function getChronologyClue() {
  const incorrectIndices = [];
  chronoState.placedEvents.forEach((event, idx) => {
    const expectedEvent = chronoState.selectedEvents[idx];
    if (!event || event.id !== expectedEvent.id) {
      incorrectIndices.push(idx);
    }
  });

  if (incorrectIndices.length === 0) return "";

  const firstWrongIdx = incorrectIndices[0];
  const expectedEvent = chronoState.selectedEvents[firstWrongIdx];
  return `Consider the timing of **${expectedEvent.answer}**. It belongs in the sequence at **Step ${firstWrongIdx + 1}**! Check your order and try again.`;
}

function verifyChronologySequence() {
  const container = document.getElementById('chronology-game-play-area');
  if (!container) return;

  chronoState.hasChecked = true;
  let allCorrect = true;

  // Check sequence correctness
  chronoState.placedEvents.forEach((event, idx) => {
    const expectedEvent = chronoState.selectedEvents[idx];
    const slot = document.getElementById(`chrono-slot-${idx}`);
    if (!slot) return;

    if (event && event.id === expectedEvent.id) {
      slot.classList.remove('incorrect');
      slot.classList.add('correct');
    } else {
      slot.classList.remove('correct');
      slot.classList.add('incorrect');
      allCorrect = false;
    }
  });

  if (allCorrect) {
    AudioEngine.play('cheer');
    if (typeof Confetti !== 'undefined' && typeof Confetti.spawn === 'function') {
      Confetti.spawn(100);
    }
    
    chronoState.score += 20;
    const scoreDisplay = document.getElementById('chrono-score-display');
    if (scoreDisplay) scoreDisplay.textContent = `Score: ${chronoState.score}`;

    // Reveal years in slots
    chronoState.placedEvents.forEach((event, idx) => {
      const slot = document.getElementById(`chrono-slot-${idx}`);
      if (slot) {
        const content = slot.querySelector('.chrono-card-content');
        if (content) {
          content.innerHTML = `
            <div class="chrono-slot-year-badge">${event.year}</div>
            <strong>${event.answer}</strong>
            <p>${event.question}</p>
          `;
        }
      }
    });

    const successPanel = document.getElementById('chrono-success-panel');
    if (successPanel) {
      successPanel.style.display = 'block';
    }

    const narrativeContainer = document.getElementById('chrono-narrative-container');
    if (narrativeContainer) {
      narrativeContainer.innerHTML = generateChronoNarrativeParagraph(chronoState.placedEvents);
    }

    const feedbackMsg = document.getElementById('chrono-feedback-message');
    if (feedbackMsg) {
      feedbackMsg.style.display = 'none';
    }
    
    const checkBtn = document.getElementById('btn-chrono-check');
    if (checkBtn) checkBtn.style.display = 'none';

    const playControls = document.getElementById('chrono-play-controls-area');
    if (playControls) playControls.style.display = 'none';
  } else {
    AudioEngine.play('fail');
    chronoState.score = Math.max(0, chronoState.score - 5);
    const scoreDisplay = document.getElementById('chrono-score-display');
    if (scoreDisplay) scoreDisplay.textContent = `Score: ${chronoState.score}`;

    const feedbackMsg = document.getElementById('chrono-feedback-message');
    if (feedbackMsg) {
      feedbackMsg.style.display = 'block';
      feedbackMsg.style.background = 'rgba(239, 68, 68, 0.1)';
      feedbackMsg.style.color = 'var(--accent)';
      feedbackMsg.style.borderLeft = '3px solid var(--accent)';
      feedbackMsg.innerHTML = `<i class="fa-solid fa-lightbulb"></i> ${getChronologyClue()}`;
    }
  }
}

// Highscore & Leaderboard Helpers for Mastery Match and Concept Connector
function getHighScores(unitId) {
  const key = `mastery_highscores_${unitId}`;
  let scores = localStorage.getItem(key);
  if (!scores) {
    scores = [
      { name: "Alex", yearGroup: "Year 9", score: 45, date: "2026-05-28" },
      { name: "Sarah", yearGroup: "Year 10", score: 40, date: "2026-05-29" },
      { name: "James", yearGroup: "Year 8", score: 35, date: "2026-05-27" },
      { name: "Emily", yearGroup: "Year 11", score: 25, date: "2026-05-29" },
      { name: "Thomas", yearGroup: "Year 7", score: 15, date: "2026-05-26" }
    ];
    localStorage.setItem(key, JSON.stringify(scores));
  } else {
    scores = JSON.parse(scores);
  }
  return scores.sort((a, b) => b.score - a.score).slice(0, 5);
}

function saveHighScoreLocal(unitId, name, yearGroup, score) {
  const scores = getHighScores(unitId);
  const dateStr = new Date().toISOString().split('T')[0];
  scores.push({ name: name || "Anonymous", yearGroup: yearGroup || "", score: score, date: dateStr });
  scores.sort((a, b) => b.score - a.score);
  localStorage.setItem(`mastery_highscores_${unitId}`, JSON.stringify(scores.slice(0, 5)));
}

function renderMasteryLeaderboard(unitId) {
  const container = document.getElementById('mastery-leaderboard-container');
  if (!container) return;

  const localScores = getHighScores(unitId);
  renderTable(localScores);

  if (GOOGLE_SHEET_WEBAPP_URL) {
    fetch(`${GOOGLE_SHEET_WEBAPP_URL}?type=mastery&unitId=${unitId}`)
      .then(res => res.json())
      .then(scores => {
        if (Array.isArray(scores)) {
          renderTable(scores);
        }
      })
      .catch(err => console.error("Error loading remote mastery leaderboard:", err));
  }

  function renderTable(scoresList) {
    let rowsHtml = scoresList.map((s, idx) => {
      let medal = '';
      if (idx === 0) medal = '🥇 ';
      else if (idx === 1) medal = '🥈 ';
      else if (idx === 2) medal = '🥉 ';
      
      const yrText = s.yearGroup ? ` <span style="font-size: 0.72rem; color: var(--text-muted);">(${s.yearGroup})</span>` : '';
      return `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.82rem;">
          <td style="padding: 8px 4px; font-weight: bold; color: var(--primary);">${medal}${idx + 1}</td>
          <td style="padding: 8px 4px; color: var(--text-main);">${s.name}${yrText}</td>
          <td style="padding: 8px 4px; font-weight: 700; color: var(--success); text-align: right;">${s.score} pts</td>
          <td class="desktop-only" style="padding: 8px 4px; color: var(--text-muted); text-align: right; font-size: 0.72rem;">${s.date}</td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--border-glass);">
        <h4 style="font-family: var(--font-heading); font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin: 0 0 12px 0; display: flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-ranking-star" style="color: var(--accent);"></i> Top High Scores (Unit Leaderboard)
        </h4>
        <table class="leaderboard-table" style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-glass); color: var(--text-muted); font-size: 0.72rem; text-transform: uppercase;">
              <th style="padding: 4px; font-weight: 600;">Rank</th>
              <th style="padding: 4px; font-weight: 600;">Student</th>
              <th style="padding: 4px; font-weight: 600; text-align: right;">Score</th>
              <th class="desktop-only" style="padding: 4px; font-weight: 600; text-align: right;">Date</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
  }
}

function renderResultsLeaderboard(unitId) {
  const container = document.getElementById('mastery-results-leaderboard');
  if (!container) return;
  
  const localScores = getHighScores(unitId);
  renderResults(localScores);

  if (GOOGLE_SHEET_WEBAPP_URL) {
    fetch(`${GOOGLE_SHEET_WEBAPP_URL}?type=mastery&unitId=${unitId}`)
      .then(res => res.json())
      .then(scores => {
        if (Array.isArray(scores)) {
          renderResults(scores);
        }
      })
      .catch(err => console.error("Error loading remote mastery results leaderboard:", err));
  }

  function renderResults(scoresList) {
    let rowsHtml = scoresList.map((s, idx) => {
      let medal = '';
      if (idx === 0) medal = '🥇 ';
      else if (idx === 1) medal = '🥈 ';
      else if (idx === 2) medal = '🥉 ';
      const yrText = s.yearGroup ? ` <span style="font-size: 0.72rem; color: var(--text-muted);">(${s.yearGroup})</span>` : '';
      return `
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.03);">
          <span style="color: var(--primary); font-weight: bold;">${medal}${idx + 1}. ${s.name}${yrText}</span>
          <span style="color: var(--success); font-weight: 700;">${s.score} pts</span>
        </div>
      `;
    }).join('');
    container.innerHTML = `
      <h4 style="font-family: var(--font-heading); font-size: 0.88rem; margin: 12px 0 8px; color: var(--text-main); text-align: left;">
        <i class="fa-solid fa-ranking-star" style="color: var(--accent);"></i> Leaderboard Rankings:
      </h4>
      <div style="text-align: left; background: rgba(0,0,0,0.1); padding: 8px 12px; border-radius: 4px; border: 1px solid var(--border-glass);">
        ${rowsHtml}
      </div>
    `;
  }
}

function getMindMapHighScores(subtopicId) {
  const key = `mindmap_highscores_${subtopicId}`;
  let scores = localStorage.getItem(key);
  if (!scores) {
    scores = [
      { name: "Alex", yearGroup: "Year 9", score: 45, date: "2026-05-28" },
      { name: "Sarah", yearGroup: "Year 10", score: 40, date: "2026-05-29" },
      { name: "James", yearGroup: "Year 8", score: 35, date: "2026-05-27" },
      { name: "Emily", yearGroup: "Year 11", score: 25, date: "2026-05-29" },
      { name: "Thomas", yearGroup: "Year 7", score: 15, date: "2026-05-26" }
    ];
    localStorage.setItem(key, JSON.stringify(scores));
  } else {
    scores = JSON.parse(scores);
  }
  return scores.sort((a, b) => b.score - a.score).slice(0, 5);
}

function saveMindMapHighScoreLocal(subtopicId, name, yearGroup, score) {
  const scores = getMindMapHighScores(subtopicId);
  const dateStr = new Date().toISOString().split('T')[0];
  scores.push({ name: name || "Anonymous", yearGroup: yearGroup || "", score: score, date: dateStr });
  scores.sort((a, b) => b.score - a.score);
  localStorage.setItem(`mindmap_highscores_${subtopicId}`, JSON.stringify(scores.slice(0, 5)));
}

function renderMindMapLeaderboard(subtopicId) {
  const container = document.getElementById('mindmap-leaderboard-container');
  if (!container) return;

  const localScores = getMindMapHighScores(subtopicId);
  renderTable(localScores);

  if (GOOGLE_SHEET_WEBAPP_URL) {
    fetch(`${GOOGLE_SHEET_WEBAPP_URL}?type=mindmap&subtopicId=${subtopicId}`)
      .then(res => res.json())
      .then(scores => {
        if (Array.isArray(scores)) {
          renderTable(scores);
        }
      })
      .catch(err => console.error("Error loading remote mindmap leaderboard:", err));
  }

  function renderTable(scoresList) {
    let rowsHtml = scoresList.map((s, idx) => {
      let medal = '';
      if (idx === 0) medal = '🥇 ';
      else if (idx === 1) medal = '🥈 ';
      else if (idx === 2) medal = '🥉 ';
      
      const yrText = s.yearGroup ? ` <span style="font-size: 0.72rem; color: var(--text-muted);">(${s.yearGroup})</span>` : '';
      return `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.82rem;">
          <td style="padding: 8px 4px; font-weight: bold; color: var(--primary);">${medal}${idx + 1}</td>
          <td style="padding: 8px 4px; color: var(--text-main);">${s.name}${yrText}</td>
          <td style="padding: 8px 4px; font-weight: 700; color: var(--success); text-align: right;">${s.score} pts</td>
          <td class="desktop-only" style="padding: 8px 4px; color: var(--text-muted); text-align: right; font-size: 0.72rem;">${s.date}</td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid var(--border-glass);">
        <h4 style="font-family: var(--font-heading); font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin: 0 0 12px 0; display: flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-ranking-star" style="color: var(--accent);"></i> Top High Scores (Topic Leaderboard)
        </h4>
        <table class="leaderboard-table" style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-glass); color: var(--text-muted); font-size: 0.72rem; text-transform: uppercase;">
              <th style="padding: 4px; font-weight: 600;">Rank</th>
              <th style="padding: 4px; font-weight: 600;">Student</th>
              <th style="padding: 4px; font-weight: 600; text-align: right;">Score</th>
              <th class="desktop-only" style="padding: 4px; font-weight: 600; text-align: right;">Date</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
  }
}

function renderMindMapResultsLeaderboard(subtopicId) {
  const container = document.getElementById('mindmap-results-leaderboard');
  if (!container) return;
  
  const localScores = getMindMapHighScores(subtopicId);
  renderResults(localScores);

  if (GOOGLE_SHEET_WEBAPP_URL) {
    fetch(`${GOOGLE_SHEET_WEBAPP_URL}?type=mindmap&subtopicId=${subtopicId}`)
      .then(res => res.json())
      .then(scores => {
        if (Array.isArray(scores)) {
          renderResults(scores);
        }
      })
      .catch(err => console.error("Error loading remote mindmap results leaderboard:", err));
  }

  function renderResults(scoresList) {
    let rowsHtml = scoresList.map((s, idx) => {
      let medal = '';
      if (idx === 0) medal = '🥇 ';
      else if (idx === 1) medal = '🥈 ';
      else if (idx === 2) medal = '🥉 ';
      const yrText = s.yearGroup ? ` <span style="font-size: 0.72rem; color: var(--text-muted);">(${s.yearGroup})</span>` : '';
      return `
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.03);">
          <span style="color: var(--primary); font-weight: bold;">${medal}${idx + 1}. ${s.name}${yrText}</span>
          <span style="color: var(--success); font-weight: 700;">${s.score} pts</span>
        </div>
      `;
    }).join('');
    container.innerHTML = `
      <h4 style="font-family: var(--font-heading); font-size: 0.88rem; margin: 12px 0 8px; color: var(--text-main); text-align: left;">
        <i class="fa-solid fa-ranking-star" style="color: var(--accent);"></i> Leaderboard Rankings:
      </h4>
      <div style="text-align: left; background: rgba(0,0,0,0.1); padding: 8px 12px; border-radius: 4px; border: 1px solid var(--border-glass);">
        ${rowsHtml}
      </div>
    `;
  }
}

// --- Mastery Match ---
function initMasteryMatchGame() {
  const container = document.getElementById('mastery-game-play-area');
  if (!container) return;

  let optionsHtml = '';
  Object.keys(MASTERY_DATA).forEach(unitId => {
    optionsHtml += `<option value="${unitId}">${MASTERY_DATA[unitId].title}</option>`;
  });

  container.innerHTML = `
    <div class="causal-connector-container" style="background: var(--bg-card); padding: 24px; border: 1px solid var(--border-glass); border-radius: var(--border-radius-md); box-shadow: var(--shadow-md);">
      <h3 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-top: 0; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
        <i class="fa-solid fa-trophy" style="color: var(--primary);"></i> Mastery Match
      </h3>
      <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; margin: 0 0 20px 0;">
        Match specification-level terms to their definitions. Correct pairings trigger a quick "Defend" bonus question!
      </p>

      <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
        <div class="form-group" style="display: flex; flex-direction: column; gap: 6px;">
          <label style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted);">Select Topic Unit</label>
          <select class="select-input" id="mastery-setup-unit" style="width: 100%; padding: 12px 16px; background: rgba(0, 0, 0, 0.2); border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm); color: var(--text-main); font-size: 0.95rem; outline: none; cursor: pointer;">
            ${optionsHtml}
          </select>
        </div>

        <div style="display: flex; align-items: center; gap: 10px; padding: 10px 0;">
          <input type="checkbox" id="mastery-setup-speedrun" checked style="width: 18px; height: 18px; cursor: pointer; accent-color: var(--primary);">
          <label for="mastery-setup-speedrun" style="font-size: 0.88rem; font-weight: 500; cursor: pointer; color: var(--text-main);">
            Enable Speed Run Mode (60-second Timer)
          </label>
        </div>
      </div>

      <button class="btn-primary" id="btn-mastery-start" style="width: 100%; padding: 12px; font-weight: 700; font-size: 1rem; border-radius: var(--border-radius-sm); cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
        <i class="fa-solid fa-play"></i> Start Matching
      </button>

      <!-- Leaderboard Container -->
      <div id="mastery-leaderboard-container"></div>
    </div>
  `;

  const unitSelect = document.getElementById('mastery-setup-unit');
  if (unitSelect) {
    renderMasteryLeaderboard(unitSelect.value);
    unitSelect.addEventListener('change', () => {
      renderMasteryLeaderboard(unitSelect.value);
    });
  }

  document.getElementById('btn-mastery-start').addEventListener('click', () => {
    AudioEngine.play('click');
    const unitId = document.getElementById('mastery-setup-unit').value;
    const isSpeedRun = document.getElementById('mastery-setup-speedrun').checked;
    startMasteryMatch(unitId, isSpeedRun);
  });
}

function startMasteryMatch(unitId, isSpeedRun) {
  const container = document.getElementById('mastery-game-play-area');
  if (!container) return;

  const data = MASTERY_DATA[unitId];
  if (!data) return;

  if (masteryState.timerInterval) clearInterval(masteryState.timerInterval);

  masteryState.unitId = unitId;
  masteryState.score = 0;
  masteryState.isSpeedRun = isSpeedRun;
  masteryState.timerVal = 60;
  masteryState.matchedCount = 0;
  masteryState.selectedTermCard = null;
  masteryState.selectedDefCard = null;

  const missed = getMissedTerms();
  const allItems = [...data.items];
  allItems.sort((a, b) => {
    const aMissed = missed.includes(a.term) ? 1 : 0;
    const bMissed = missed.includes(b.term) ? 1 : 0;
    return bMissed - aMissed;
  });

  const roundItems = allItems.slice(0, 5);
  masteryState.items = roundItems;

  const shuffledTerms = [...roundItems].sort(() => Math.random() - 0.5);
  const shuffledDefs = [...roundItems].sort(() => Math.random() - 0.5);

  let timerHtml = '';
  if (isSpeedRun) {
    timerHtml = `
      <div style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">
          <span>Time Remaining</span>
          <span id="mastery-timer-text">60s</span>
        </div>
        <div style="height: 6px; background: rgba(255, 255, 255, 0.05); border-radius: 3px; overflow: hidden;">
          <div id="mastery-timer-fill" style="height: 100%; width: 100%; background: var(--gradient-main); transition: width 1s linear;"></div>
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="causal-connector-container" style="background: var(--bg-card); padding: 24px; border: 1px solid var(--border-glass); border-radius: var(--border-radius-md); box-shadow: var(--shadow-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--primary); letter-spacing: 0.5px;">Mastery Match: ${data.title}</span>
        <span style="font-weight: 700; font-size: 0.95rem; color: var(--success);" id="mastery-score-display">Score: 0</span>
      </div>

      ${timerHtml}

      <div class="mastery-match-grid">
        <!-- Terms Column -->
        <div class="mastery-column">
          <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 4px;">Terms</div>
          ${shuffledTerms.map(item => `
            <div class="mastery-match-card" data-type="term" data-term="${item.term.replace(/"/g, '&quot;')}" id="mastery-term-${item.term.replace(/\s+/g, '-').replace(/[^\w-]/g, '')}">
              ${item.term}
            </div>
          `).join('')}
        </div>

        <!-- Definitions Column -->
        <div class="mastery-column">
          <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 4px;">Definitions</div>
          ${shuffledDefs.map(item => `
            <div class="mastery-match-card" data-type="def" data-def="${item.definition.replace(/"/g, '&quot;')}" id="mastery-def-${item.term.replace(/\s+/g, '-').replace(/[^\w-]/g, '')}">
              ${item.definition}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    
    <div id="mastery-defend-overlay" class="defend-overlay" style="display: none;"></div>
  `;

  container.querySelectorAll('.mastery-match-card').forEach(card => {
    card.addEventListener('click', () => {
      handleMasteryCardClick(card);
    });
  });

  if (isSpeedRun) {
    masteryState.timerInterval = setInterval(() => {
      masteryState.timerVal--;
      const text = document.getElementById('mastery-timer-text');
      const fill = document.getElementById('mastery-timer-fill');
      if (text) text.textContent = `${masteryState.timerVal}s`;
      if (fill) fill.style.width = `${(masteryState.timerVal / 60) * 100}%`;

      if (masteryState.timerVal <= 0) {
        clearInterval(masteryState.timerInterval);
        endMasteryGame(false);
      }
    }, 1000);
  }
}

function handleMasteryCardClick(card) {
  if (card.classList.contains('matched')) return;

  AudioEngine.play('click');
  const type = card.getAttribute('data-type');

  if (type === 'term') {
    if (masteryState.selectedTermCard) {
      masteryState.selectedTermCard.classList.remove('selected');
    }
    
    if (masteryState.selectedTermCard === card) {
      masteryState.selectedTermCard = null;
    } else {
      masteryState.selectedTermCard = card;
      card.classList.add('selected');
    }
  } else {
    if (masteryState.selectedDefCard) {
      masteryState.selectedDefCard.classList.remove('selected');
    }

    if (masteryState.selectedDefCard === card) {
      masteryState.selectedDefCard = null;
    } else {
      masteryState.selectedDefCard = card;
      card.classList.add('selected');
    }
  }

  if (masteryState.selectedTermCard && masteryState.selectedDefCard) {
    const selectedTerm = masteryState.selectedTermCard.getAttribute('data-term');
    const selectedDef = masteryState.selectedDefCard.getAttribute('data-def');

    const matchedItem = masteryState.items.find(item => item.term === selectedTerm);

    if (matchedItem && matchedItem.definition === selectedDef) {
      const termCard = masteryState.selectedTermCard;
      const defCard = masteryState.selectedDefCard;
      
      termCard.classList.remove('selected');
      defCard.classList.remove('selected');
      
      termCard.classList.add('matched');
      defCard.classList.add('matched');

      masteryState.selectedTermCard = null;
      masteryState.selectedDefCard = null;

      triggerDefendTwist(matchedItem, termCard, defCard);
    } else {
      AudioEngine.play('fail');
      
      recordMissedTerm(selectedTerm);
      if (matchedItem) {
        recordMissedTerm(matchedItem.term);
      }

      const termCard = masteryState.selectedTermCard;
      const defCard = masteryState.selectedDefCard;

      termCard.classList.remove('selected');
      defCard.classList.remove('selected');
      
      [termCard, defCard].forEach(c => {
        c.style.transform = 'translateX(-6px)';
        setTimeout(() => c.style.transform = 'translateX(6px)', 60);
        setTimeout(() => c.style.transform = 'translateX(-4px)', 120);
        setTimeout(() => c.style.transform = 'translateX(4px)', 180);
        setTimeout(() => c.style.transform = 'translateX(0)', 240);
      });

      masteryState.selectedTermCard = null;
      masteryState.selectedDefCard = null;
    }
  }
}

function triggerDefendTwist(item, termCard, defCard) {
  const overlay = document.getElementById('mastery-defend-overlay');
  if (!overlay) return;

  const shuffledOptions = [...item.defendOptions].sort(() => Math.random() - 0.5);

  overlay.innerHTML = `
    <div class="defend-content">
      <div class="defend-header">
        <i class="fa-solid fa-shield-halved"></i> DEFEND YOUR MATCH!
      </div>
      <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">
        Match confirmed: <strong>${item.term}</strong>
      </div>
      <div class="defend-question">${item.defendQuestion}</div>
      <div class="defend-options-list">
        ${shuffledOptions.map(opt => `
          <button class="defend-option-btn" data-value="${opt.replace(/"/g, '&quot;')}">${opt}</button>
        `).join('')}
      </div>
    </div>
  `;

  overlay.style.display = 'flex';

  overlay.querySelectorAll('.defend-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedVal = btn.getAttribute('data-value');
      const correctVal = item.defendAnswer;

      overlay.querySelectorAll('.defend-option-btn').forEach(b => b.disabled = true);

      if (selectedVal === correctVal) {
        AudioEngine.play('success');
        btn.classList.add('correct');
        masteryState.score += 10;
        document.getElementById('mastery-score-display').textContent = `Score: ${masteryState.score}`;
        
        resolveMissedTerm(item.term);

        setTimeout(() => {
          overlay.style.display = 'none';
          checkMasteryRoundStatus();
        }, 1000);
      } else {
        AudioEngine.play('fail');
        btn.classList.add('incorrect');
        
        overlay.querySelectorAll('.defend-option-btn').forEach(b => {
          if (b.getAttribute('data-value') === correctVal) {
            b.classList.add('correct');
          }
        });

        masteryState.score = Math.max(0, masteryState.score - 5);
        document.getElementById('mastery-score-display').textContent = `Score: ${masteryState.score}`;
        recordMissedTerm(item.term);

        setTimeout(() => {
          overlay.style.display = 'none';
          checkMasteryRoundStatus();
        }, 1800);
      }
    });
  });
}

function checkMasteryRoundStatus() {
  masteryState.matchedCount++;
  if (masteryState.matchedCount === 5) {
    if (masteryState.timerInterval) clearInterval(masteryState.timerInterval);
    endMasteryGame(true);
  }
}

function endMasteryGame(success) {
  const container = document.getElementById('mastery-game-play-area');
  if (!container) return;

  if (success) {
    AudioEngine.play('cheer');
    Confetti.spawn(100);
  } else {
    AudioEngine.play('fail');
  }

  let grade = "Novice";
  let gradeColor = "var(--text-muted)";
  if (masteryState.score >= 40) {
    grade = "Historical Master";
    gradeColor = "var(--success)";
  } else if (masteryState.score >= 25) {
    grade = "Scholar";
    gradeColor = "var(--primary)";
  }

  container.innerHTML = `
    <div class="causal-connector-container" style="background: var(--bg-card); padding: 32px; border: 1px solid var(--border-glass); border-radius: var(--border-radius-md); box-shadow: var(--shadow-md); text-align: center;">
      <div class="results-grade-circle" style="width: 80px; height: 80px; font-size: 2.2rem; margin: 0 auto 20px; background: ${success ? 'var(--success-glow)' : 'var(--accent-glow)'}; display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 2px solid ${success ? 'var(--success)' : 'var(--accent)'};">
        <i class="${success ? 'fa-solid fa-trophy' : 'fa-solid fa-hourglass-end'}" style="color: ${success ? 'var(--success)' : 'var(--accent)'};"></i>
      </div>

      <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">
        ${success ? 'Mastery Match Completed!' : 'Speed Run Timed Out!'}
      </h3>
      <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin: 0 0 24px 0;">
        ${success ? 'Excellent job! You successfully matched all specification terms and defended your pairings.' : 'Time ran out before you could match and defend all active key terms.'}
      </p>

      <div style="display: grid; grid-template-columns: 1fr; gap: 16px; margin: 0 auto 24px; max-width: 180px;">
        <div style="background: rgba(0,0,0,0.15); padding: 12px; border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm);">
          <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 4px;">Rank</span>
          <span style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; color: ${gradeColor}; line-height: 1.5;">${grade}</span>
        </div>
      </div>

      <div id="mastery-highscore-input-box" style="margin-bottom: 24px; padding: 16px; background: rgba(0,0,0,0.15); border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm); max-width: 380px; margin-left: auto; margin-right: auto; text-align: center;">
        <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 12px;">Save your score to the topic leaderboard!</label>
        <div style="display: flex; gap: 8px; justify-content: center; align-items: center; flex-wrap: wrap;">
          <input type="text" id="mastery-highscore-initials" placeholder="AAA" maxlength="3" style="padding: 8px; font-size: 0.85rem; border: 1px solid var(--border-glass); border-radius: 4px; background: rgba(0,0,0,0.3); color: var(--text-main); width: 68px; text-align: center; text-transform: uppercase; outline: none;" required>
          
          <select id="mastery-highscore-year" style="padding: 8px; font-size: 0.85rem; border: 1px solid var(--border-glass); border-radius: 4px; background: rgba(0,0,0,0.3); color: var(--text-main); outline: none; cursor: pointer;" required>
            <option value="" disabled selected>Year</option>
            <option value="Year 7">Year 7</option>
            <option value="Year 8">Year 8</option>
            <option value="Year 9">Year 9</option>
            <option value="Year 10">Year 10</option>
            <option value="Year 11">Year 11</option>
          </select>
          
          <button class="btn-primary" id="btn-submit-highscore" style="padding: 8px 16px; font-size: 0.85rem; border-radius: 4px;">Submit</button>
        </div>
      </div>
      
      <div id="mastery-results-leaderboard" style="max-width: 360px; margin: 0 auto 24px;"></div>

      <div style="display: flex; gap: 12px; justify-content: center;">
        <button class="btn-secondary" id="btn-mastery-return" style="padding: 10px 20px; font-weight: 600; font-size: 0.9rem; border-radius: 4px; cursor: pointer;">
          <i class="fa-solid fa-rotate-left"></i> Setup Screen
        </button>
        <button class="btn-primary" id="btn-mastery-play-again" style="padding: 10px 20px; font-weight: 600; font-size: 0.9rem; border-radius: 4px; cursor: pointer;">
          <i class="fa-solid fa-rotate-right"></i> Play Again (Same Topic)
        </button>
      </div>
    </div>
  `;

  renderResultsLeaderboard(masteryState.unitId);

  const submitBtn = document.getElementById('btn-submit-highscore');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const initialsInput = document.getElementById('mastery-highscore-initials');
      const yearInput = document.getElementById('mastery-highscore-year');
      
      let initials = initialsInput ? initialsInput.value.trim().toUpperCase() : "";
      let yearGroup = yearInput ? yearInput.value : "";
      
      const val = validateScoreBoardInitials(initials);
      if (!val.valid) {
        showWarningToast(val.message);
        return;
      }
      if (!yearGroup) {
        showWarningToast("Please select your Year Group.");
        return;
      }
      
      const name = initials;
      saveHighScoreLocal(masteryState.unitId, name, yearGroup, masteryState.score);
      AudioEngine.play('success');
      
      if (GOOGLE_SHEET_WEBAPP_URL) {
        const payload = {
          type: "mastery",
          unitId: masteryState.unitId,
          name: name,
          yearGroup: yearGroup,
          score: masteryState.score,
          date: new Date().toISOString().split('T')[0]
        };
        
        fetch(GOOGLE_SHEET_WEBAPP_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }).catch(err => console.error("Error saving remote mastery score:", err));
      }
      
      const inputBox = document.getElementById('mastery-highscore-input-box');
      if (inputBox) inputBox.style.display = 'none';
      
      renderResultsLeaderboard(masteryState.unitId);
      renderMasteryLeaderboard(masteryState.unitId);
    });
  }

  document.getElementById('btn-mastery-return').addEventListener('click', () => {
    AudioEngine.play('click');
    initMasteryMatchGame();
  });

  document.getElementById('btn-mastery-play-again').addEventListener('click', () => {
    AudioEngine.play('click');
    startMasteryMatch(masteryState.unitId, masteryState.isSpeedRun);
  });
}

// --- Concept Connector ---
function initMindMapGame() {
  const container = document.getElementById('mindmap-game-play-area');
  if (!container) return;

  let optionsHtml = '';
  Object.keys(MINDMAP_DATA).forEach(subtopicId => {
    const match = subtopicId.match(/subtopic_(\d)_(\d)/);
    let friendlyName = MINDMAP_DATA[subtopicId].title;
    if (friendlyName.length > 55) {
      friendlyName = friendlyName.slice(0, 52) + "...";
    }
    if (match) {
      friendlyName = `Topic ${match[1]}.${match[2]}: ${friendlyName}`;
    }
    optionsHtml += `<option value="${subtopicId}">${friendlyName}</option>`;
  });

  container.innerHTML = `
    <div class="causal-connector-container" style="background: var(--bg-card); padding: 24px; border: 1px solid var(--border-glass); border-radius: var(--border-radius-md); box-shadow: var(--shadow-md);">
      <h3 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-top: 0; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
        <i class="fa-solid fa-network-wired" style="color: var(--primary);"></i> Concept Connector
      </h3>
      <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; margin: 0 0 20px 0;">
        Reassemble the historical cause-and-effect flowcharts in chronological sequence. Tap options from the bottom card shelf to assign them into place!
      </p>

      <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
        <div class="form-group" style="display: flex; flex-direction: column; gap: 6px;">
          <label style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted);">Select Flowchart Topic</label>
          <select class="select-input" id="mindmap-setup-topic" style="width: 100%; padding: 12px 16px; background: rgba(0, 0, 0, 0.2); border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm); color: var(--text-main); font-size: 0.95rem; outline: none; cursor: pointer;">
            ${optionsHtml}
          </select>
        </div>

        <div style="display: flex; align-items: center; gap: 10px; padding: 10px 0;">
          <input type="checkbox" id="mindmap-setup-speedrun" checked style="width: 18px; height: 18px; cursor: pointer; accent-color: var(--primary);">
          <label for="mindmap-setup-speedrun" style="font-size: 0.88rem; font-weight: 500; cursor: pointer; color: var(--text-main);">
            Enable Speed Run Mode (60-second Timer)
          </label>
        </div>
      </div>

      <button class="btn-primary" id="btn-mindmap-start" style="width: 100%; padding: 12px; font-weight: 700; font-size: 1rem; border-radius: var(--border-radius-sm); cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
        <i class="fa-solid fa-play"></i> Start Linking
      </button>

      <!-- Leaderboard Container -->
      <div id="mindmap-leaderboard-container"></div>
    </div>
  `;

  const topicSelect = document.getElementById('mindmap-setup-topic');
  if (topicSelect) {
    renderMindMapLeaderboard(topicSelect.value);
    topicSelect.addEventListener('change', () => {
      renderMindMapLeaderboard(topicSelect.value);
    });
  }

  document.getElementById('btn-mindmap-start').addEventListener('click', () => {
    AudioEngine.play('click');
    const subtopicId = document.getElementById('mindmap-setup-topic').value;
    const isSpeedRun = document.getElementById('mindmap-setup-speedrun').checked;
    startMindMapGame(subtopicId, isSpeedRun);
  });
}

function startMindMapGame(subtopicId, isSpeedRun) {
  const container = document.getElementById('mindmap-game-play-area');
  if (!container) return;

  const data = MINDMAP_DATA[subtopicId];
  if (!data) return;

  if (mindmapState.timerInterval) clearInterval(mindmapState.timerInterval);

  mindmapState.subtopicId = subtopicId;
  mindmapState.score = 0;
  mindmapState.isSpeedRun = isSpeedRun;
  mindmapState.timerVal = 60;
  mindmapState.placedCount = 0;
  mindmapState.nodes = [...data.nodes];
  
  mindmapState.shuffledNodes = [...data.nodes].sort(() => Math.random() - 0.5);

  let timerHtml = '';
  if (isSpeedRun) {
    timerHtml = `
      <div style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); margin-bottom: 6px;">
          <span>Time Remaining</span>
          <span id="mindmap-timer-text">60s</span>
        </div>
        <div style="height: 6px; background: rgba(255, 255, 255, 0.05); border-radius: 3px; overflow: hidden;">
          <div id="mindmap-timer-fill" style="height: 100%; width: 100%; background: var(--gradient-main); transition: width 1s linear;"></div>
        </div>
      </div>
    `;
  }

  let slotsHtml = '';
  mindmapState.nodes.forEach((nodeText, idx) => {
    if (idx > 0) {
      slotsHtml += `
        <div class="mindmap-arrow" id="mindmap-arrow-${idx}" style="opacity: 0.15; transition: opacity 0.3s ease;">
          <i class="fa-solid fa-arrow-right horizontal-arrow"></i>
          <i class="fa-solid fa-arrow-down vertical-arrow"></i>
        </div>
      `;
    }
    slotsHtml += `
      <div class="mindmap-slot ${idx === 0 ? 'active-target' : ''}" id="mindmap-slot-${idx}" data-index="${idx}">
        <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Step ${idx + 1}</span>
      </div>
    `;
  });

  let optionsHtml = mindmapState.shuffledNodes.map((nodeText, idx) => {
    const safeId = `mindmap-opt-${idx}`;
    return `
      <div class="mindmap-option-card" id="${safeId}" data-text="${nodeText.replace(/"/g, '&quot;')}">
        ${nodeText}
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="causal-connector-container" style="background: var(--bg-card); padding: 24px; border: 1px solid var(--border-glass); border-radius: var(--border-radius-md); box-shadow: var(--shadow-md);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--primary); letter-spacing: 0.5px;">Concept Connector: ${data.title}</span>
        <span style="font-weight: 700; font-size: 0.95rem; color: var(--success);" id="mindmap-score-display">Score: 0</span>
      </div>

      ${timerHtml}

      <!-- Flowchart slots panel (Top viewport) -->
      <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">Flowchart Chain</div>
      <div class="mindmap-slots-container">
        ${slotsHtml}
      </div>

      <!-- Shuffled option cards shelf (Bottom viewport, lower third for thumb ergonomics) -->
      <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">Card Options Shelf (Tap correct event in sequence)</div>
      <div class="mindmap-options-container">
        ${optionsHtml}
      </div>
    </div>
  `;

  if (isSpeedRun) {
    mindmapState.timerInterval = setInterval(() => {
      mindmapState.timerVal--;
      const text = document.getElementById('mindmap-timer-text');
      const fill = document.getElementById('mindmap-timer-fill');
      if (text) text.textContent = `${mindmapState.timerVal}s`;
      if (fill) fill.style.width = `${(mindmapState.timerVal / 60) * 100}%`;

      if (mindmapState.timerVal <= 0) {
        clearInterval(mindmapState.timerInterval);
        endMindMapGame(false);
      }
    }, 1000);
  }

  container.querySelectorAll('.mindmap-option-card').forEach(card => {
    card.addEventListener('click', () => {
      handleMindMapCardClick(card);
    });
  });
}

function handleMindMapCardClick(card) {
  if (card.classList.contains('correct-placed') || card.classList.contains('incorrect')) return;

  const text = card.getAttribute('data-text');
  
  const nextExpectedIndex = mindmapState.placedCount;
  const expectedText = mindmapState.nodes[nextExpectedIndex];

  if (text === expectedText) {
    AudioEngine.play('success');
    
    mindmapState.score += 10;
    const scoreDisplay = document.getElementById('mindmap-score-display');
    if (scoreDisplay) scoreDisplay.textContent = `Score: ${mindmapState.score}`;

    card.classList.add('correct-placed');

    const slot = document.getElementById(`mindmap-slot-${nextExpectedIndex}`);
    if (slot) {
      slot.classList.remove('active-target');
      slot.classList.add('filled');
      slot.innerHTML = `
        <div style="font-family: var(--font-heading); font-weight: 700; color: var(--primary); margin-bottom: 4px; font-size: 0.72rem;">STEP ${nextExpectedIndex + 1}</div>
        <div style="font-size: 0.82rem; line-height: 1.3;">${text}</div>
      `;
    }

    if (nextExpectedIndex > 0) {
      const arrow = document.getElementById(`mindmap-arrow-${nextExpectedIndex}`);
      if (arrow) arrow.style.opacity = '1';
    }

    mindmapState.placedCount++;

    if (mindmapState.placedCount < mindmapState.nodes.length) {
      const nextSlot = document.getElementById(`mindmap-slot-${mindmapState.placedCount}`);
      if (nextSlot) nextSlot.classList.add('active-target');
    } else {
      if (mindmapState.timerInterval) clearInterval(mindmapState.timerInterval);
      setTimeout(() => endMindMapGame(true), 600);
    }
  } else {
    AudioEngine.play('fail');
    
    mindmapState.score = Math.max(0, mindmapState.score - 5);
    const scoreDisplay = document.getElementById('mindmap-score-display');
    if (scoreDisplay) scoreDisplay.textContent = `Score: ${mindmapState.score}`;

    card.classList.add('incorrect');
    setTimeout(() => {
      card.classList.remove('incorrect');
    }, 450);
  }
}

function endMindMapGame(success) {
  const container = document.getElementById('mindmap-game-play-area');
  if (!container) return;

  if (success) {
    AudioEngine.play('cheer');
    Confetti.spawn(100);
  } else {
    AudioEngine.play('fail');
  }

  let grade = "Novice";
  let gradeColor = "var(--text-muted)";
  if (mindmapState.score >= 40) {
    grade = "Historical Master";
    gradeColor = "var(--success)";
  } else if (mindmapState.score >= 25) {
    grade = "Scholar";
    gradeColor = "var(--primary)";
  }

  container.innerHTML = `
    <div class="causal-connector-container" style="background: var(--bg-card); padding: 32px; border: 1px solid var(--border-glass); border-radius: var(--border-radius-md); box-shadow: var(--shadow-md); text-align: center;">
      <div class="results-grade-circle" style="width: 80px; height: 80px; font-size: 2.2rem; margin: 0 auto 20px; background: ${success ? 'var(--success-glow)' : 'var(--accent-glow)'}; display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 2px solid ${success ? 'var(--success)' : 'var(--accent)'};">
        <i class="${success ? 'fa-solid fa-trophy' : 'fa-solid fa-hourglass-end'}" style="color: ${success ? 'var(--success)' : 'var(--accent)'};"></i>
      </div>

      <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">
        ${success ? 'Flowchart Sequenced Successfully!' : 'Speed Run Timed Out!'}
      </h3>
      <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin: 0 0 24px 0;">
        ${success ? 'Outstanding! You correctly connected the cause-and-effect mind map nodes in historical order.' : 'Time ran out before you could sequence the flowchart. Keep reviewing your key topics!'}
      </p>

      <div style="display: grid; grid-template-columns: 1fr; gap: 16px; margin: 0 auto 24px; max-width: 180px;">
        <div style="background: rgba(0,0,0,0.15); padding: 12px; border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm);">
          <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 4px;">Rank</span>
          <span style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; color: ${gradeColor}; line-height: 1.5;">${grade}</span>
        </div>
      </div>


      <!-- High Score Input Box -->
      <div id="mindmap-highscore-input-box" style="margin-bottom: 24px; padding: 16px; background: rgba(0,0,0,0.15); border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm); max-width: 380px; margin-left: auto; margin-right: auto; text-align: center;">
        <label style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 12px;">Save your score to the topic leaderboard!</label>
        <div style="display: flex; gap: 8px; justify-content: center; align-items: center; flex-wrap: wrap;">
          <input type="text" id="mindmap-highscore-initials" placeholder="AAA" maxlength="3" style="padding: 8px; font-size: 0.85rem; border: 1px solid var(--border-glass); border-radius: 4px; background: rgba(0,0,0,0.3); color: var(--text-main); width: 68px; text-align: center; text-transform: uppercase; outline: none;" required>
          
          <select id="mindmap-highscore-year" style="padding: 8px; font-size: 0.85rem; border: 1px solid var(--border-glass); border-radius: 4px; background: rgba(0,0,0,0.3); color: var(--text-main); outline: none; cursor: pointer;" required>
            <option value="" disabled selected>Year</option>
            <option value="Year 7">Year 7</option>
            <option value="Year 8">Year 8</option>
            <option value="Year 9">Year 9</option>
            <option value="Year 10">Year 10</option>
            <option value="Year 11">Year 11</option>
          </select>
          
          <button class="btn-primary" id="btn-submit-mindmap-highscore" style="padding: 8px 16px; font-size: 0.85rem; border-radius: 4px;">Submit</button>
        </div>
      </div>
      
      <!-- Results Leaderboard Rankings -->
      <div id="mindmap-results-leaderboard" style="max-width: 360px; margin: 0 auto 24px;"></div>

      <div style="display: flex; gap: 12px; justify-content: center;">
        <button class="btn-secondary" id="btn-mindmap-return" style="padding: 10px 20px; font-weight: 600; font-size: 0.9rem; border-radius: 4px; cursor: pointer;">
          <i class="fa-solid fa-rotate-left"></i> Setup Screen
        </button>
        <button class="btn-primary" id="btn-mindmap-play-again" style="padding: 10px 20px; font-weight: 600; font-size: 0.9rem; border-radius: 4px; cursor: pointer;">
          <i class="fa-solid fa-rotate-right"></i> Play Again (Same Topic)
        </button>
      </div>
    </div>
  `;

  renderMindMapResultsLeaderboard(mindmapState.subtopicId);

  const submitBtn = document.getElementById('btn-submit-mindmap-highscore');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const initialsInput = document.getElementById('mindmap-highscore-initials');
      const yearInput = document.getElementById('mindmap-highscore-year');
      
      let initials = initialsInput ? initialsInput.value.trim().toUpperCase() : "";
      let yearGroup = yearInput ? yearInput.value : "";
      
      const val = validateScoreBoardInitials(initials);
      if (!val.valid) {
        showWarningToast(val.message);
        return;
      }
      if (!yearGroup) {
        showWarningToast("Please select your Year Group.");
        return;
      }
      
      const name = initials;
      saveMindMapHighScoreLocal(mindmapState.subtopicId, name, yearGroup, mindmapState.score);
      AudioEngine.play('success');
      
      if (GOOGLE_SHEET_WEBAPP_URL) {
        const payload = {
          type: "mindmap",
          subtopicId: mindmapState.subtopicId,
          name: name,
          yearGroup: yearGroup,
          score: mindmapState.score,
          date: new Date().toISOString().split('T')[0]
        };
        
        fetch(GOOGLE_SHEET_WEBAPP_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }).catch(err => console.error("Error saving remote mindmap score:", err));
      }
      
      const inputBox = document.getElementById('mindmap-highscore-input-box');
      if (inputBox) inputBox.style.display = 'none';
      
      renderMindMapResultsLeaderboard(mindmapState.subtopicId);
    });
  }

  document.getElementById('btn-mindmap-return').addEventListener('click', () => {
    AudioEngine.play('click');
    initMindMapGame();
  });

  document.getElementById('btn-mindmap-play-again').addEventListener('click', () => {
    AudioEngine.play('click');
    startMindMapGame(mindmapState.subtopicId, mindmapState.isSpeedRun);
  });
}

// --- Decision Simulator ---
function initDecisionsGame() {
  const container = document.getElementById('decisions-game-play-area');
  if (!container) return;

  const hotlineGames = DECISIONS_DATA.filter(g => g.series === "Diplomatic Hotline");

  const makeCard = (g) => `
    <div class="decision-card" id="dec-card-${g.id}">
      <div class="decision-card-header">
        <span class="decision-card-topic">${g.topic}</span>
        <i class="${g.icon}" style="font-size: 1.1rem; color: var(--primary);"></i>
      </div>
      <h4 class="decision-card-title">${g.title}</h4>
      <div class="decision-card-role"><strong>Role:</strong> ${g.role}</div>
      <p style="font-size: 0.8rem; line-height: 1.4; color: var(--text-muted); margin: 6px 0 0 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">
        ${g.crisis}
      </p>
    </div>
  `;

  container.innerHTML = `
    <div class="causal-connector-container" style="background: var(--bg-card); padding: 24px; border: 1px solid var(--border-glass); border-radius: var(--border-radius-md); box-shadow: var(--shadow-md); margin-bottom: 24px;">
      <h3 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-top: 0; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
        <i class="fa-solid fa-phone-volume" style="color: var(--primary);"></i> Decision Simulator
      </h3>
      <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; margin: 0 0 20px 0;">
        Put yourself in the shoes of historical figures. Face critical crises and decide which path to take!
      </p>
      
      <h4 style="font-family: var(--font-heading); font-size: 1.05rem; font-weight: 700; color: var(--accent); margin: 20px 0 10px 0;">
        📞 The 'Diplomatic Hotline' Series
      </h4>
      <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0 0 12px 0;">Oval Office and Cabinet decisions during major Middle East turning points.</p>
      <div class="decisions-grid">
        ${hotlineGames.map(makeCard).join('')}
      </div>
    </div>
  `;

  DECISIONS_DATA.forEach(g => {
    const card = document.getElementById(`dec-card-${g.id}`);
    if (card) {
      card.addEventListener('click', () => {
        AudioEngine.play('click');
        playDecisionsScenario(g.id);
      });
    }
  });
}

function playDecisionsScenario(gameId) {
  const container = document.getElementById('decisions-game-play-area');
  if (!container) return;

  const g = DECISIONS_DATA.find(x => x.id === gameId);
  if (!g) return;

  container.innerHTML = `
    <div class="decision-play-pane">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
        <span style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: var(--primary); letter-spacing: 0.5px;">Phase 1: Initial Response</span>
        <button class="btn-secondary" id="btn-dec-back" style="padding: 6px 12px; font-size: 0.75rem; border-radius: 4px;">
          <i class="fa-solid fa-arrow-left"></i> Scenario Menu
        </button>
      </div>

      <h2 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; color: var(--text-main); margin: 10px 0 0 0;">
        ${g.title}
      </h2>
      
      <div class="decision-role-banner">
        <strong>Active Role:</strong> ${g.role}
      </div>

      <div class="decision-crisis-box">
        <h4 style="font-family: var(--font-heading); font-size: 1rem; font-weight: 700; color: var(--accent); margin-top: 0; margin-bottom: 8px;">
          🚨 THE CRISIS:
        </h4>
        ${g.crisis}
      </div>

      <div style="margin-top: 10px;">
        <h4 style="font-family: var(--font-heading); font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin-bottom: 12px;">
          Select Your Response:
        </h4>
        <div class="decision-options-container">
          <button class="btn-decision" id="btn-dec-choice-a">
            <span class="btn-decision-label">Choice A</span>
            <span>${g.phase1.choiceA.text}</span>
          </button>
          <button class="btn-decision" id="btn-dec-choice-b">
            <span class="btn-decision-label">Choice B</span>
            <span>${g.phase1.choiceB.text}</span>
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('btn-dec-back').addEventListener('click', () => {
    AudioEngine.play('click');
    initDecisionsGame();
  });

  document.getElementById('btn-dec-choice-a').addEventListener('click', () => {
    AudioEngine.play('click');
    playDecisionsPhase2(gameId, 'A');
  });

  document.getElementById('btn-dec-choice-b').addEventListener('click', () => {
    AudioEngine.play('click');
    playDecisionsPhase2(gameId, 'B');
  });
}

function playDecisionsPhase2(gameId, choiceLetter) {
  const container = document.getElementById('decisions-game-play-area');
  if (!container) return;

  const g = DECISIONS_DATA.find(x => x.id === gameId);
  if (!g) return;

  const selectedChoice = choiceLetter === 'A' ? g.phase1.choiceA : g.phase1.choiceB;

  container.innerHTML = `
    <div class="decision-play-pane">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
        <span style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: var(--primary); letter-spacing: 0.5px;">Phase 2: The Fallout</span>
        <button class="btn-secondary" id="btn-dec-back" style="padding: 6px 12px; font-size: 0.75rem; border-radius: 4px;">
          <i class="fa-solid fa-arrow-left"></i> Scenario Menu
        </button>
      </div>

      <h2 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; color: var(--text-main); margin: 10px 0 0 0;">
        ${g.title}
      </h2>
      
      <div class="decision-role-banner">
        <strong>Active Role:</strong> ${g.role}
      </div>

      <div style="background: rgba(0,0,0,0.12); border: 1px solid var(--border-glass); padding: 12px; border-radius: var(--border-radius-sm); font-size: 0.88rem; color: var(--text-muted); line-height: 1.45;">
        <strong>Your Choice:</strong> ${selectedChoice.text}
      </div>

      <div class="decision-crisis-box" style="border-left-color: var(--secondary);">
        <h4 style="font-family: var(--font-heading); font-size: 1rem; font-weight: 700; color: var(--secondary); margin-top: 0; margin-bottom: 8px;">
          🌪️ THE FALLOUT:
        </h4>
        ${selectedChoice.fallout}
      </div>

      <div style="margin-top: 10px;">
        <h4 style="font-family: var(--font-heading); font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin-bottom: 12px;">
          Select Your Next Step:
        </h4>
        <div class="decision-options-container">
          <button class="btn-decision" id="btn-dec-subchoice-1">
            <span class="btn-decision-label">Choice ${choiceLetter}1</span>
            <span>${selectedChoice.choice1.text}</span>
          </button>
          <button class="btn-decision" id="btn-dec-subchoice-2">
            <span class="btn-decision-label">Choice ${choiceLetter}2</span>
            <span>${selectedChoice.choice2.text}</span>
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('btn-dec-back').addEventListener('click', () => {
    AudioEngine.play('click');
    initDecisionsGame();
  });

  document.getElementById('btn-dec-subchoice-1').addEventListener('click', () => {
    playDecisionsPhase3(gameId, choiceLetter, '1');
  });

  document.getElementById('btn-dec-subchoice-2').addEventListener('click', () => {
    playDecisionsPhase3(gameId, choiceLetter, '2');
  });
}

function playDecisionsPhase3(gameId, choiceLetter, subChoice) {
  const container = document.getElementById('decisions-game-play-area');
  if (!container) return;

  const g = DECISIONS_DATA.find(x => x.id === gameId);
  if (!g) return;

  const selectedChoice = choiceLetter === 'A' ? g.phase1.choiceA : g.phase1.choiceB;
  const finalChoice = subChoice === '1' ? selectedChoice.choice1 : selectedChoice.choice2;

  if (finalChoice.isHistorical) {
    AudioEngine.play('success');
    Confetti.spawn(60);
  } else {
    AudioEngine.play('fail');
  }

  const bgCol = finalChoice.isHistorical ? 'rgba(16, 185, 129, 0.05)' : 'rgba(244, 63, 94, 0.05)';
  const borderCol = finalChoice.isHistorical ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)';
  const pillCol = finalChoice.isHistorical ? 'var(--success)' : 'var(--accent)';
  const pillText = finalChoice.isHistorical ? '✅ ACTUAL HISTORY' : '❌ ALTERNATE HISTORY';

  container.innerHTML = `
    <div class="decision-play-pane" style="background: ${bgCol}; border-color: ${borderCol};">
      <div style="border-bottom: 1px solid var(--border-glass); padding-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
        <span class="decision-outcome-pill" style="background: ${pillCol}; color: #fff; margin: 0; font-weight: 800; font-size: 0.75rem; letter-spacing: 0.5px; border-radius: 4px; padding: 4px 8px;">
          ${pillText}
        </span>
        <span style="font-size: 0.8rem; color: var(--text-muted); font-style: italic;">Role: ${g.role}</span>
      </div>

      <h2 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; color: var(--text-main); margin-top: 10px; margin-bottom: 6px;">
        ${g.title}
      </h2>

      <div style="background: rgba(0,0,0,0.12); border: 1px solid var(--border-glass); padding: 14px; border-radius: var(--border-radius-sm); font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; display: flex; flex-direction: column; gap: 8px;">
        <div><strong>Phase 1 Decision:</strong> ${selectedChoice.text}</div>
        <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 8px;"><strong>Phase 2 Response:</strong> ${finalChoice.text}</div>
      </div>

      <div class="decision-consequence-card" style="border: 1px solid ${borderCol}; background: rgba(0,0,0,0.18); margin: 0; padding: 20px;">
        <h4 style="font-family: var(--font-heading); font-size: 1.05rem; font-weight: 700; color: ${finalChoice.isHistorical ? 'var(--success)' : 'var(--accent)'}; margin-top: 0; margin-bottom: 8px;">
          <i class="${finalChoice.isHistorical ? 'fa-solid fa-circle-check' : 'fa-solid fa-code-fork'}"></i> The Final Verdict:
        </h4>
        <p style="font-size: 0.98rem; line-height: 1.6; color: var(--text-main); margin: 0;">
          ${finalChoice.verdict}
        </p>
      </div>

      <div style="display: flex; gap: 12px; justify-content: center; border-top: 1px solid var(--border-glass); padding-top: 18px;">
        <button class="btn-secondary" id="btn-dec-menu" style="padding: 10px 20px; font-weight: 600; font-size: 0.9rem; border-radius: 4px; cursor: pointer;">
          <i class="fa-solid fa-rotate-left"></i> Scenario Menu
        </button>
        <button class="btn-primary" id="btn-dec-retry" style="padding: 10px 20px; font-weight: 600; font-size: 0.9rem; border-radius: 4px; cursor: pointer;">
          <i class="fa-solid fa-rotate-right"></i> Try Alternative Path
        </button>
      </div>
    </div>
  `;

  document.getElementById('btn-dec-menu').addEventListener('click', () => {
    AudioEngine.play('click');
    initDecisionsGame();
  });

  document.getElementById('btn-dec-retry').addEventListener('click', () => {
    AudioEngine.play('click');
    playDecisionsScenario(gameId);
  });
}

// --- Dynamic Games Hub Tab Switcher View ---
function renderGamesView() {
  const causalSelect = document.getElementById('causal-game-topic-select');
  if (!causalSelect) return;

  // 1. Setup Causal Game subtopics list if not already populated
  if (causalSelect.children.length <= 1) {
    let optionsHtml = '<option value="" disabled selected>-- Select a Topic --</option>';
    QUIZ_DATA.forEach(topic => {
      topic.subtopics.forEach(sub => {
        if (LESSONS_DATA[sub.id] && LESSONS_DATA[sub.id].causalLinks) {
          const numCode = sub.title.match(/Topic\s(\d\.\d)/);
          const name = numCode ? `Topic ${numCode[1]}: ${sub.title.replace(/^Topic \d\.\d:\s*/, "")}` : sub.title;
          optionsHtml += `<option value="${sub.id}">${name}</option>`;
        }
      });
    });
    causalSelect.innerHTML = optionsHtml;

    causalSelect.addEventListener('change', (e) => {
      AudioEngine.play('click');
      playCausalGame(e.target.value);
    });
  }

  // 1b. Bind Chronology Game topic select if not already populated
  const chronoSelect = document.getElementById('chrono-game-topic-select');
  if (chronoSelect && chronoSelect.children.length <= 1) {
    let optionsHtml = '<option value="" disabled selected>-- Select a Topic --</option>';
    QUIZ_DATA.forEach(topic => {
      const cleanTitle = topic.title.replace(/^Key Topic \d:\s*/, "");
      optionsHtml += `<optgroup label="Key Topic ${topic.id.replace('topic_', '')}: ${cleanTitle}">`;
      optionsHtml += `<option value="${topic.id}">Full Key Topic ${topic.id.replace('topic_', '')}</option>`;
      
      topic.subtopics.forEach(sub => {
        const cleanSubTitle = sub.title.replace(/^Topic \d\.\d:\s*/, "");
        optionsHtml += `<option value="${sub.id}">${cleanSubTitle}</option>`;
      });
      optionsHtml += `</optgroup>`;
    });
    chronoSelect.innerHTML = optionsHtml;
    const firstOption = chronoSelect.querySelector('option[value^="topic_"]');
    if (firstOption) {
      firstOption.selected = true;
    }

    chronoSelect.addEventListener('change', () => {
      AudioEngine.play('click');
      initChronologyGame();
    });
  }

  // 2. Setup game tab switching
  const tabs = {
    causal: document.getElementById('btn-tab-game-causal'),
    chronology: document.getElementById('btn-tab-game-chronology'),
    mastery: document.getElementById('btn-tab-game-mastery'),
    mindmap: document.getElementById('btn-tab-game-mindmap'),
    decisions: document.getElementById('btn-tab-game-decisions'),
    crisis: document.getElementById('btn-tab-game-crisis'),
    tug: document.getElementById('btn-tab-game-tug'),
    taboo: document.getElementById('btn-tab-game-taboo'),
    meSim: document.getElementById('btn-tab-game-me-sim'),
    parser: document.getElementById('btn-tab-game-parser'),
    parserJaffa: document.getElementById('btn-tab-game-parser-jaffa'),
    individuals: document.getElementById('btn-tab-game-individuals')
  };

  const panes = {
    causal: document.getElementById('game-causal-container'),
    chronology: document.getElementById('game-chronology-container'),
    mastery: document.getElementById('game-mastery-container'),
    mindmap: document.getElementById('game-mindmap-container'),
    decisions: document.getElementById('game-decisions-container'),
    crisis: document.getElementById('game-crisis-container'),
    tug: document.getElementById('game-tug-container'),
    taboo: document.getElementById('game-taboo-container'),
    meSim: document.getElementById('game-me-sim-container'),
    parser: document.getElementById('game-parser-container'),
    parserJaffa: document.getElementById('game-parser-jaffa-container'),
    individuals: document.getElementById('game-individuals-container')
  };

  const cleanUpGames = () => {
    if (state.tugGameSession && state.tugGameSession.timeoutId) {
      clearTimeout(state.tugGameSession.timeoutId);
      state.tugGameSession.timeoutId = null;
    }
    if (state.tabooGameSession && state.tabooGameSession.timerInterval) {
      clearInterval(state.tabooGameSession.timerInterval);
      state.tabooGameSession.timerInterval = null;
    }
    if (masteryState.timerInterval) {
      clearInterval(masteryState.timerInterval);
      masteryState.timerInterval = null;
    }
    if (mindmapState.timerInterval) {
      clearInterval(mindmapState.timerInterval);
      mindmapState.timerInterval = null;
    }
  };

  const showTab = async (tabName) => {
    cleanUpGames();

    Object.keys(tabs).forEach(name => {
      const t = tabs[name];
      if (!t) return;
      if (name === tabName) {
        t.classList.add('active');
        t.style.borderColor = 'var(--primary)';
        t.style.color = 'var(--primary)';
        t.style.background = 'rgba(59, 130, 246, 0.1)';
      } else {
        t.classList.remove('active');
        t.style.borderColor = 'var(--border-glass)';
        t.style.color = 'var(--text-muted)';
        t.style.background = 'rgba(255, 255, 255, 0.03)';
      }
    });

    Object.keys(panes).forEach(name => {
      const p = panes[name];
      if (p) {
        p.style.display = name === tabName ? 'block' : 'none';
      }
    });

    if (tabName === 'causal') {
      const val = causalSelect.value;
      if (val) playCausalGame(val);
    } else if (tabName === 'chronology') {
      initChronologyGame();
    } else if (tabName === 'mastery') {
      initMasteryMatchGame();
    } else if (tabName === 'mindmap') {
      initMindMapGame();
    } else if (tabName === 'decisions') {
      initDecisionsGame();
    } else if (tabName === 'individuals') {
      const indGameMod = await import('./individuals_game.js');
      indGameMod.initIndividualsGame();
    } else {
      if (!gamesModule) {
        gamesModule = await import('./games.js');
      }
      if (tabName === 'crisis') {
        gamesModule.initCrisisGame();
      } else if (tabName === 'tug') {
        gamesModule.initTugGame();
      } else if (tabName === 'taboo') {
        gamesModule.initTabooGame();
      } else if (tabName === 'meSim') {
        gamesModule.initMeSimGame();
      } else if (tabName === 'parser') {
        gamesModule.initParserGame();
      } else if (tabName === 'parserJaffa') {
        gamesModule.initJaffaParserGame();
      }
    }
  };

  Object.keys(tabs).forEach(name => {
    const t = tabs[name];
    if (t) {
      t.addEventListener('click', (e) => {
        e.preventDefault();
        AudioEngine.play('click');
        showTab(name);
      });
    }
  });

  const activeTab = Object.keys(tabs).find(name => tabs[name] && tabs[name].classList.contains('active'));
  showTab(activeTab || 'causal');
}

// Spaced Repetition / Highscore Helpers for Exam/Recall Challenge
function getExamHighScores(scope) {
  const key = `exam_highscores_${scope}`;
  let scores = localStorage.getItem(key);
  if (!scores) return [];
  try {
    return JSON.parse(scores);
  } catch (e) {
    return [];
  }
}

function saveExamHighScoreLocal(scope, name, yearGroup, score) {
  const scores = getExamHighScores(scope);
  scores.push({
    name: name,
    yearGroup: yearGroup,
    score: score,
    date: new Date().toISOString().split('T')[0]
  });
  scores.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  localStorage.setItem(`exam_highscores_${scope}`, JSON.stringify(scores.slice(0, 5)));
}

function renderExamResultsLeaderboard(scope) {
  const container = document.getElementById('exam-results-leaderboard');
  if (!container) return;

  const localScores = getExamHighScores(scope);
  renderResults(localScores);

  if (GOOGLE_SHEET_WEBAPP_URL) {
    fetch(`${GOOGLE_SHEET_WEBAPP_URL}?type=exam&subtopicId=${scope}`)
      .then(res => res.json())
      .then(scores => {
        if (Array.isArray(scores)) {
          renderResults(scores);
        }
      })
      .catch(err => console.error("Error loading remote exam results leaderboard:", err));
  }

  function renderResults(scoresList) {
    let rowsHtml = scoresList.map((s, idx) => {
      let medal = '';
      if (idx === 0) medal = '🥇 ';
      else if (idx === 1) medal = '🥈 ';
      else if (idx === 2) medal = '🥉 ';
      const yrText = s.yearGroup ? ` <span style="font-size: 0.72rem; color: var(--text-muted);">(${s.yearGroup})</span>` : '';
      return `
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.03);">
          <span style="color: var(--primary); font-weight: bold;">${medal}${idx + 1}. ${s.name}${yrText}</span>
          <span style="color: var(--success); font-weight: 700;">${s.score} pts</span>
        </div>
      `;
    }).join('');
    container.innerHTML = `
      <h4 style="font-family: var(--font-heading); font-size: 0.88rem; margin: 12px 0 8px; color: var(--text-main); text-align: left;">
        <i class="fa-solid fa-ranking-star" style="color: var(--accent);"></i> Leaderboard Rankings:
      </h4>
      <div style="text-align: left; background: rgba(0,0,0,0.1); padding: 8px 12px; border-radius: 4px; border: 1px solid var(--border-glass);">
        ${rowsHtml || '<div style="font-size: 0.8rem; color: var(--text-muted); text-align: center; padding: 4px 0;">No scores submitted yet. Be the first!</div>'}
      </div>
    `;
  }
}

function initExamLeaderboard(scope, pct) {
  const points = Math.round(pct * 10);
  
  // Show input form
  const inputBox = document.getElementById('exam-highscore-input-box');
  if (inputBox) {
    inputBox.style.display = 'block';
  }

  // Clear previous inputs
  const initialsInput = document.getElementById('exam-highscore-initials');
  const yearInput = document.getElementById('exam-highscore-year');
  if (initialsInput) {
    initialsInput.value = '';
  }
  if (yearInput) {
    yearInput.selectedIndex = 0;
  }

  // Render leaderboard on results immediately
  renderExamResultsLeaderboard(scope);

  const submitBtn = document.getElementById('btn-submit-exam-highscore');
  if (submitBtn) {
    const newSubmitBtn = submitBtn.cloneNode(true);
    submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);

    newSubmitBtn.addEventListener('click', () => {
      const initials = (initialsInput.value || '').trim().toUpperCase();
      const yearGroup = yearInput.value;

      const val = validateScoreBoardInitials(initials);
      if (!val.valid) {
        showWarningToast(val.message);
        return;
      }
      if (!yearGroup) {
        showWarningToast("Please select your Year Group.");
        return;
      }

      saveExamHighScoreLocal(scope, initials, yearGroup, points);
      AudioEngine.play('success');

      if (GOOGLE_SHEET_WEBAPP_URL) {
        const payload = {
          type: "exam",
          subtopicId: scope,
          name: initials,
          yearGroup: yearGroup,
          score: points,
          date: new Date().toISOString().split('T')[0]
        };

        fetch(GOOGLE_SHEET_WEBAPP_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }).catch(err => console.error("Error saving remote exam score:", err));
      }

      if (inputBox) inputBox.style.display = 'none';
      renderExamResultsLeaderboard(scope);
    });
  }
}

function renderGoingBeyond() {
  const container = document.getElementById('going-beyond-container');
  if (!container) return;
  
  container.innerHTML = '';
  
  const filterGroup = document.createElement('div');
  filterGroup.className = 'gb-filters';
  filterGroup.style.display = 'flex';
  filterGroup.style.gap = '12px';
  filterGroup.style.marginBottom = '24px';
  filterGroup.style.flexWrap = 'wrap';
  
  const categories = [
    { name: 'All Topics', filter: 'all', count: GOING_BEYOND_DATA.length },
    { name: 'Syllabus Links', filter: 'Syllabus Links', count: GOING_BEYOND_DATA.filter(d => d.category === 'Syllabus Links').length },
    { name: 'Structural Realities (2026)', filter: 'Structural Realities', count: GOING_BEYOND_DATA.filter(d => d.category === 'Structural Realities').length }
  ];
  
  let activeFilter = 'all';
  
  function drawFilterButtons() {
    filterGroup.innerHTML = '';
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `filter-btn ${activeFilter === cat.filter ? 'active' : ''}`;
      btn.innerHTML = `${cat.name} <span class="badge badge-year" style="margin-left: 6px; background: rgba(0,0,0,0.15);">${cat.count}</span>`;
      btn.style.padding = '8px 16px';
      btn.style.borderRadius = '24px';
      btn.style.border = '1px solid var(--border-glass)';
      btn.style.background = activeFilter === cat.filter ? 'var(--primary)' : 'var(--bg-card)';
      btn.style.color = activeFilter === cat.filter ? 'var(--text-inverse)' : 'var(--text-main)';
      btn.style.fontWeight = '600';
      btn.style.fontSize = '0.85rem';
      btn.style.cursor = 'pointer';
      btn.style.transition = 'all var(--transition-fast)';
      
      btn.addEventListener('click', () => {
        AudioEngine.play('click');
        activeFilter = cat.filter;
        drawFilterButtons();
        drawAspectCards();
      });
      filterGroup.appendChild(btn);
    });
  }
  
  const cardsWrapper = document.createElement('div');
  cardsWrapper.className = 'gb-cards-wrapper';
  cardsWrapper.style.display = 'flex';
  cardsWrapper.style.flexDirection = 'column';
  cardsWrapper.style.gap = '24px';
  
  const cardSubTabs = {};
  const cardExpanded = {};
  GOING_BEYOND_DATA.forEach(d => {
    cardSubTabs[d.id] = 'syllabus-modern';
    cardExpanded[d.id] = false;
  });
  
  function drawAspectCards() {
    cardsWrapper.innerHTML = '';
    
    const filteredData = activeFilter === 'all' 
      ? GOING_BEYOND_DATA 
      : GOING_BEYOND_DATA.filter(d => d.category === activeFilter);
      
    filteredData.forEach(d => {
      const card = document.createElement('div');
      card.className = 'gb-card';
      card.id = `gb-card-${d.id}`;
      card.style.background = 'var(--bg-card)';
      card.style.border = '1px solid var(--border-glass)';
      card.style.borderRadius = 'var(--border-radius-md)';
      card.style.padding = '24px';
      card.style.boxShadow = 'var(--shadow-sm)';
      card.style.transition = 'all var(--transition-normal)';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.gap = '16px';
      
      card.addEventListener('mouseenter', () => {
        card.style.borderColor = 'var(--border-active)';
        card.style.transform = 'translateY(-2px)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.borderColor = 'var(--border-glass)';
        card.style.transform = 'none';
      });
      
      const header = document.createElement('div');
      header.className = 'gb-card-header';
      header.style.display = 'flex';
      header.style.justifyContent = 'space-between';
      header.style.alignItems = 'center';
      header.style.flexWrap = 'wrap';
      header.style.gap = '12px';
      header.style.cursor = 'pointer';
      header.style.userSelect = 'none';
      header.style.transition = 'padding var(--transition-normal)';
      
      const titleWrapper = document.createElement('div');
      titleWrapper.style.display = 'flex';
      titleWrapper.style.alignItems = 'center';
      titleWrapper.style.gap = '12px';
      
      const iconBox = document.createElement('div');
      iconBox.className = 'gb-icon-box';
      iconBox.innerHTML = `<i class="fa-solid ${d.icon}"></i>`;
      iconBox.style.width = '40px';
      iconBox.style.height = '40px';
      iconBox.style.borderRadius = 'var(--border-radius-sm)';
      iconBox.style.background = 'var(--primary-glow)';
      iconBox.style.color = 'var(--primary)';
      iconBox.style.display = 'flex';
      iconBox.style.alignItems = 'center';
      iconBox.style.justifyContent = 'center';
      iconBox.style.fontSize = '1.2rem';
      
      const titleText = document.createElement('div');
      titleText.innerHTML = `
        <h3 style="margin: 0; font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; color: var(--text-main);">${d.title}</h3>
        <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">${d.category}</span>
      `;
      
      const chevron = document.createElement('i');
      chevron.className = 'fa-solid fa-chevron-down';
      chevron.style.fontSize = '0.9rem';
      chevron.style.color = 'var(--text-muted)';
      chevron.style.transition = 'transform var(--transition-normal)';
      
      titleWrapper.appendChild(iconBox);
      titleWrapper.appendChild(titleText);
      titleWrapper.appendChild(chevron);
      
      const subTabGroup = document.createElement('div');
      subTabGroup.className = 'gb-subtab-group';
      subTabGroup.style.display = 'flex';
      subTabGroup.style.background = 'rgba(0,0,0,0.15)';
      subTabGroup.style.padding = '4px';
      subTabGroup.style.borderRadius = '20px';
      subTabGroup.style.gap = '2px';
      
      const subTabs = [
        { id: 'syllabus-modern', name: 'Analysis', icon: 'fa-chart-simple' },
        { id: 'archive', name: 'The Archive', icon: 'fa-book-open' },
        { id: 'debate', name: 'Roundtable', icon: 'fa-users-rectangle' }
      ];
      
      const currentActiveSubTab = cardSubTabs[d.id];
      
      subTabs.forEach(st => {
        const tabBtn = document.createElement('button');
        tabBtn.className = `gb-subtab-btn ${currentActiveSubTab === st.id ? 'active' : ''}`;
        tabBtn.innerHTML = `<i class="fa-solid ${st.icon}" style="font-size: 0.75rem; margin-right: 6px;"></i><span class="desktop-only" style="font-size: 0.75rem;">${st.name}</span>`;
        tabBtn.style.padding = '6px 12px';
        tabBtn.style.border = 'none';
        tabBtn.style.borderRadius = '16px';
        tabBtn.style.cursor = 'pointer';
        tabBtn.style.fontWeight = '600';
        tabBtn.style.background = currentActiveSubTab === st.id ? 'var(--gradient-main)' : 'transparent';
        tabBtn.style.color = currentActiveSubTab === st.id ? 'var(--text-inverse)' : 'var(--text-muted)';
        tabBtn.style.transition = 'all var(--transition-fast)';
        tabBtn.style.display = 'flex';
        tabBtn.style.alignItems = 'center';
        
        tabBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          AudioEngine.play('click');
          cardSubTabs[d.id] = st.id;
          drawCardContentPane();
          subTabGroup.querySelectorAll('button').forEach((btn, idx) => {
            const matches = subTabs[idx].id === st.id;
            btn.style.background = matches ? 'var(--gradient-main)' : 'transparent';
            btn.style.color = matches ? 'var(--text-inverse)' : 'var(--text-muted)';
          });
        });
        subTabGroup.appendChild(tabBtn);
      });
      
      header.appendChild(titleWrapper);
      header.appendChild(subTabGroup);
      card.appendChild(header);
      
      const contentPane = document.createElement('div');
      contentPane.className = 'gb-card-content-pane';
      card.appendChild(contentPane);
      
      function updateCardVisuals() {
        const isExpanded = cardExpanded[d.id];
        chevron.style.transform = isExpanded ? 'rotate(180deg)' : 'none';
        subTabGroup.style.display = isExpanded ? 'flex' : 'none';
        contentPane.style.display = isExpanded ? 'block' : 'none';
        header.style.borderBottom = isExpanded ? '1px solid var(--border-glass)' : 'none';
        header.style.paddingBottom = isExpanded ? '16px' : '0';
        card.style.padding = isExpanded ? '24px' : '16px 24px';
      }
      
      header.addEventListener('click', (e) => {
        if (e.target.closest('.gb-subtab-group')) return;
        AudioEngine.play('click');
        cardExpanded[d.id] = !cardExpanded[d.id];
        updateCardVisuals();
      });
      
      function drawCardContentPane() {
        contentPane.innerHTML = '';
        const activeTab = cardSubTabs[d.id];
        
        if (activeTab === 'syllabus-modern') {
          const grid = document.createElement('div');
          grid.style.display = 'grid';
          grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
          grid.style.gap = '20px';
          grid.style.marginTop = '8px';
          
          const historyCol = document.createElement('div');
          historyCol.style.display = 'flex';
          historyCol.style.flexDirection = 'column';
          historyCol.style.gap = '10px';
          historyCol.style.background = 'rgba(255,255,255,0.02)';
          historyCol.style.padding = '16px';
          historyCol.style.borderRadius = 'var(--border-radius-sm)';
          historyCol.style.border = '1px dashed var(--border-glass)';
          
          historyCol.innerHTML = `
            <div style="font-size: 0.72rem; color: var(--primary); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-clock-rotate-left"></i> Historical Bedrock
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; margin: 0;">${d.syllabusLink}</p>
            <p style="font-size: 0.85rem; color: var(--text-main); line-height: 1.6; margin: 4px 0 0 0;">${d.deepDive.split('.')[0]}. ${d.deepDive.split('.')[1] || ''}.</p>
          `;
          
          const modernCol = document.createElement('div');
          modernCol.style.display = 'flex';
          modernCol.style.flexDirection = 'column';
          modernCol.style.gap = '10px';
          modernCol.style.background = 'var(--accent-glow)';
          modernCol.style.padding = '16px';
          modernCol.style.borderRadius = 'var(--border-radius-sm)';
          modernCol.style.border = '1px solid rgba(244, 63, 94, 0.15)';
          
          modernCol.innerHTML = `
            <div style="font-size: 0.72rem; color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-globe"></i> Modern Geopolitical Reality (2026)
            </div>
            <p style="font-size: 0.85rem; color: var(--text-main); line-height: 1.6; margin: 0; font-weight: 500;">${d.modernResonance}</p>
            <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.6; margin: 4px 0 0 0;">${d.deepDive.split('.').slice(2).join('.')}</p>
          `;
          
          grid.appendChild(historyCol);
          grid.appendChild(modernCol);
          contentPane.appendChild(grid);
          
        } else if (activeTab === 'archive') {
          const sourceContainer = document.createElement('div');
          sourceContainer.style.marginTop = '8px';
          sourceContainer.style.display = 'flex';
          sourceContainer.style.flexDirection = 'column';
          sourceContainer.style.gap = '12px';
          
          const label = document.createElement('div');
          label.innerHTML = `<span style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: var(--secondary); letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-file-invoice"></i> Primary Document Archive</span>`;
          
          const sourceBox = document.createElement('div');
          sourceBox.className = 'gb-source-box';
          sourceBox.style.padding = '18px';
          sourceBox.style.background = 'rgba(0, 0, 0, 0.2)';
          sourceBox.style.borderLeft = '4px solid var(--secondary)';
          sourceBox.style.borderRadius = '4px';
          sourceBox.style.fontStyle = 'italic';
          sourceBox.style.lineHeight = '1.6';
          sourceBox.style.color = 'var(--text-main)';
          sourceBox.style.fontSize = '0.9rem';
          sourceBox.innerHTML = `"${d.primarySource.text}"`;
          
          const meta = document.createElement('div');
          meta.style.fontSize = '0.75rem';
          meta.style.color = 'var(--text-muted)';
          meta.style.display = 'flex';
          meta.style.justifyContent = 'space-between';
          meta.style.flexWrap = 'wrap';
          meta.style.gap = '8px';
          meta.style.marginTop = '4px';
          meta.innerHTML = `
            <span><strong>Source:</strong> ${d.primarySource.title}</span>
            <span><strong>Date:</strong> ${d.primarySource.citation}</span>
          `;
          
          sourceContainer.appendChild(label);
          sourceContainer.appendChild(sourceBox);
          sourceContainer.appendChild(meta);
          contentPane.appendChild(sourceContainer);
          
        } else if (activeTab === 'debate') {
          const roundtable = document.createElement('div');
          roundtable.style.marginTop = '8px';
          roundtable.style.display = 'flex';
          roundtable.style.flexDirection = 'column';
          roundtable.style.gap = '16px';
          
          const label = document.createElement('div');
          label.innerHTML = `<span style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: var(--primary); letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-comments"></i> Historiographical Roundtable</span>`;
          roundtable.appendChild(label);
          
          const dialogGrid = document.createElement('div');
          dialogGrid.style.display = 'grid';
          dialogGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
          dialogGrid.style.gap = '16px';
          
          d.historianDebate.forEach((hist, hIdx) => {
            const speechCard = document.createElement('div');
            speechCard.style.padding = '16px';
            speechCard.style.background = 'rgba(255,255,255,0.015)';
            speechCard.style.border = '1px solid var(--border-glass)';
            speechCard.style.borderRadius = 'var(--border-radius-sm)';
            speechCard.style.display = 'flex';
            speechCard.style.flexDirection = 'column';
            speechCard.style.gap = '10px';
            
            const initials = hist.historian.split(' ').map(n => n.replace('.', ''))
              .filter(n => n.length > 0).map(n => n[0]).join('').substring(0, 2);
              
            const avatarBg = hIdx === 0 ? 'var(--primary-glow)' : 'var(--secondary-glow)';
            const avatarColor = hIdx === 0 ? 'var(--primary)' : 'var(--secondary)';
            
            speechCard.innerHTML = `
              <div style="display: flex; align-items: center; gap: 10px; border-bottom: 1px solid var(--border-glass); padding-bottom: 8px;">
                <div style="width: 32px; height: 32px; border-radius: 50%; background: ${avatarBg}; color: ${avatarColor}; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700;">
                  ${initials}
                </div>
                <div>
                  <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-main);">${hist.historian}</div>
                  <div style="font-size: 0.7rem; color: var(--text-muted); font-style: italic;">${hist.work} (${hist.perspective})</div>
                </div>
              </div>
              <blockquote style="margin: 0; font-size: 0.82rem; line-height: 1.6; color: var(--text-muted); font-style: italic; overflow-wrap: break-word;">
                "${hist.quote}"
              </blockquote>
            `;
            dialogGrid.appendChild(speechCard);
          });
          
          roundtable.appendChild(dialogGrid);
          contentPane.appendChild(roundtable);
        }
      }
      
      drawCardContentPane();
      updateCardVisuals();
      cardsWrapper.appendChild(card);
    });
  }
  
  container.appendChild(filterGroup);
  container.appendChild(cardsWrapper);
  
  drawFilterButtons();
  drawAspectCards();

  if (state.highlightGoingBeyondId) {
    const targetId = state.highlightGoingBeyondId;
    cardExpanded[targetId] = true;
    state.highlightGoingBeyondId = null;
    
    activeFilter = 'all';
    drawFilterButtons();
    drawAspectCards();
    
    setTimeout(() => {
      const targetCard = document.getElementById(`gb-card-${targetId}`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetCard.classList.add('highlighted-pulse');
        setTimeout(() => {
          targetCard.classList.remove('highlighted-pulse');
        }, 3000);
      }
    }, 100);
  }
}

function formatSubtopicIdToKT(subtopicId) {
  if (!subtopicId) return '';
  const match = subtopicId.match(/subtopic_(\d+)_(\d+)/);
  return match ? `KT ${match[1]}.${match[2]}` : '';
}

function renderKeyTopicOverview(topicId) {
  const data = KEY_TOPICS_OVERVIEWS[topicId];
  if (!data) return;

  const container = document.getElementById('key-topic-content-container');
  if (!container) return;

  // Calculate Key Topic Progress
  const quizTopic = QUIZ_DATA.find(t => t.id === topicId);
  const subtopics = quizTopic ? quizTopic.subtopics : [];
  
  let totalQs = 0;
  let totalMastered = 0;
  subtopics.forEach(sub => {
    const subQs = state.allQuestions.filter(q => q.subtopicId === sub.id);
    totalQs += subQs.length;
    totalMastered += subQs.filter(q => state.mastery[q.id]).length;
  });
  const overallPct = totalQs > 0 ? Math.round((totalMastered / totalQs) * 100) : 0;

  // Build Subtopics Portal HTML
  let subtopicsHtml = '';
  subtopics.forEach(sub => {
    const subQs = state.allQuestions.filter(q => q.subtopicId === sub.id);
    const subMastered = subQs.filter(q => state.mastery[q.id]).length;
    const pct = subQs.length > 0 ? Math.round((subMastered / subQs.length) * 100) : 0;
    const cleanTitle = sub.title.replace(/^Topic \d\.\d:\s*/, "");
    const subNum = sub.title.match(/Topic\s(\d\.\d)/)?.[1] || "";
    
    subtopicsHtml += `
      <div class="key-topic-subtopic-card" style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--border-radius-md); padding: 16px; display: flex; flex-direction: column; justify-content: space-between; gap: 12px; transition: all var(--transition-normal); cursor: pointer;" onclick="window.switchView('subtopic', '${sub.id}')">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-family: var(--font-heading); font-size: 0.75rem; font-weight: 700; color: var(--primary); letter-spacing: 0.5px;">LESSON ${subNum}</span>
            <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted);">${pct}% Mastered</span>
          </div>
          <h3 style="font-size: 0.95rem; font-weight: 600; margin: 0; line-height: 1.3; color: var(--text-main); text-align: left;">${cleanTitle}</h3>
        </div>
        <div style="display: flex; align-items: center; gap: 4px; font-size: 0.8rem; font-weight: 600; color: var(--primary); align-self: flex-end;">
          Study Lesson <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    `;
  });

  if (data.timeline) {
    // Build Timeline Nodes HTML
    let timelineNodesHtml = '';
    data.timeline.forEach((event, idx) => {
      timelineNodesHtml += `
        <div class="timeline-node-item" data-event-index="${idx}" style="position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
          <div class="timeline-node-circle" style="width: 20px; height: 20px; border-radius: 50%; background: var(--bg-card); border: 3px solid var(--primary); box-shadow: var(--shadow-sm); transition: all var(--transition-fast); display: flex; align-items: center; justify-content: center; color: var(--primary); font-size: 0.5rem;">
            <i class="fa-solid fa-circle" style="opacity: 0; transition: opacity var(--transition-fast);"></i>
          </div>
          <div class="timeline-node-label" style="margin-top: 8px; text-align: center; display: flex; flex-direction: column; align-items: center;">
            <span class="timeline-node-year" style="font-family: var(--font-heading); font-size: 0.85rem; font-weight: 700; color: var(--primary);">${event.year}</span>
            <span class="timeline-node-title" style="font-size: 0.72rem; color: var(--text-muted); max-width: 110px; line-height: 1.2; font-weight: 600;">${event.title}</span>
          </div>
        </div>
      `;
    });

    // Build Sliders HTML
    let slidersHtml = '';
    data.sliders.forEach(slider => {
      slidersHtml += `
        <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border-glass); border-radius: var(--border-radius-sm); padding: 14px; display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-main); display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid ${slider.icon}" style="color: var(--primary); font-size: 0.9rem;"></i> ${slider.label}
            </span>
            <span id="slider-badge-${slider.id}" style="font-family: var(--font-heading); font-size: 0.85rem; font-weight: 700; color: var(--primary);">50%</span>
          </div>
          <input type="range" class="key-topic-slider" id="input-slider-${slider.id}" min="0" max="100" value="50" style="width: 100%; cursor: pointer;">
          <div id="slider-tip-${slider.id}" style="font-size: 0.78rem; line-height: 1.4; color: var(--text-muted); min-height: 38px; border-top: 1px dashed var(--border-glass); padding-top: 6px; margin-top: 4px; text-align: left;">
            <!-- Injected by dynamic logic -->
          </div>
        </div>
      `;
    });

    container.innerHTML = `
      <!-- Top Progress Banner -->
      <div style="background: var(--gradient-hero); padding: 24px; border-radius: var(--border-radius-md); border: 1px solid var(--border-glass); margin-bottom: 24px; box-shadow: var(--shadow-md); position: relative; overflow: hidden; display: flex; flex-direction: column; gap: 12px;">
        <h2 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 700; color: var(--text-main); margin: 0; line-height: 1.3; text-align: left;">
          ${data.title}
        </h2>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px;">
          <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted);">Key Topic Progress: ${overallPct}% Complete</span>
          <div style="background: rgba(255,255,255,0.05); border-radius: 12px; height: 10px; width: 150px; overflow: hidden;">
            <div style="background: var(--gradient-main); height: 100%; width: ${overallPct}%;"></div>
          </div>
        </div>
      </div>

      <!-- Historical Context Overview (Full Width) -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--border-radius-md); padding: 20px; box-shadow: var(--shadow-sm); margin-bottom: 24px;">
        <h3 style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 600; color: var(--text-main); margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px; text-align: left;">
          <i class="fa-solid fa-book-open"></i> Historical Context Overview
        </h3>
        <p style="font-size: 0.92rem; line-height: 1.6; color: var(--text-muted); margin: 0; text-align: justify;">
          ${data.overview}
        </p>
      </div>

      <!-- Component A: Responsive timeline (Full Width) -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--border-radius-md); padding: 24px 30px; box-shadow: var(--shadow-sm); position: relative; margin-bottom: 24px;">
        <h3 style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 600; color: var(--text-main); margin: 0 0 20px 0; display: flex; align-items: center; gap: 8px; text-align: left;">
          <i class="fa-solid fa-timeline"></i> Mental Map Timeline, ${data.title.split(', ').pop()}
        </h3>
        <div class="key-topic-timeline" style="position: relative; margin: 30px 0;">
          ${timelineNodesHtml}
        </div>
        <div style="text-align: center; font-size: 0.72rem; color: var(--text-muted); margin-top: 12px; border-top: 1px dashed var(--border-glass); padding-top: 8px;">
          <i class="fa-solid fa-circle-info"></i> Click or tap any year to reveal historical details & sources.
        </div>
      </div>

      <!-- Lower Content Columns -->
      <div class="key-topic-columns" style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; align-items: start;">
        <!-- Left Column: Key Topic Lessons -->
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <div>
            <h3 style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 600; color: var(--text-main); margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px; text-align: left;">
              <i class="fa-solid fa-graduation-cap"></i> Key Topic Lessons
            </h3>
            <div style="display: grid; grid-template-columns: 1fr; gap: 16px;">
              ${subtopicsHtml}
            </div>
          </div>
        </div>

        <!-- Right Column: Revision Flashcards & Sliders -->
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <!-- Component B: Dynamic Flashcard Revision Widget -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--border-radius-md); padding: 20px; box-shadow: var(--shadow-sm);">
            <h3 style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 600; color: var(--text-main); margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px; text-align: left;">
              <i class="fa-solid fa-layer-group"></i> Key Topic Revision Flashcards
            </h3>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0 0 16px 0; line-height: 1.4; text-align: left;">
              Toggle subtopics to customize your study pool, click the card to flip, and test your mastery:
            </p>
            <div id="overview-subtopic-toggles" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;"></div>
            <div id="overview-flashcard-stage-container"></div>
          </div>

          <!-- Component C: Weighing Sliders -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: var(--border-radius-md); padding: 20px; box-shadow: var(--shadow-sm);">
            <h3 style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 600; color: var(--text-main); margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px; text-align: left;">
              <i class="fa-solid fa-sliders"></i> Analytical Weighting: What Drove Progress?
            </h3>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0 0 16px 0; line-height: 1.4; text-align: left;">
              Adjust the sliders below to weigh the relative influence of these historical factors. Drag any slider to review its context tip:
            </p>
            <div style="display: flex; flex-direction: column; gap: 16px;">
              ${slidersHtml}
            </div>
          </div>
        </div>
      </div>

      <!-- Timeline Modal Overlay (glassmorphism details card) -->
      <div id="timeline-modal-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.65); backdrop-filter: blur(4px); z-index: 1000; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease;">
        <div id="timeline-modal-content" style="background: var(--bg-card); border: 1px solid var(--border-active); border-radius: var(--border-radius-md); padding: 24px; max-width: 500px; width: 90%; box-shadow: var(--shadow-lg); position: relative; transform: scale(0.9); transition: transform 0.3s ease; display: flex; flex-direction: column; gap: 16px;">
          <button id="btn-timeline-modal-close" style="position: absolute; top: 12px; right: 12px; background: none; border: none; font-size: 1.2rem; color: var(--text-muted); cursor: pointer; transition: color var(--transition-fast);"><i class="fa-solid fa-xmark"></i></button>
          <div>
            <span id="timeline-modal-year" style="font-family: var(--font-heading); font-size: 0.85rem; font-weight: 700; color: var(--primary); letter-spacing: 0.5px; text-transform: uppercase;">1954</span>
            <h3 id="timeline-modal-title" style="margin: 4px 0 0 0; font-size: 1.2rem; font-weight: 600; color: var(--text-main); line-height: 1.3; text-align: left;">Event Title</h3>
          </div>
          <ul id="timeline-modal-bullets" style="padding-left: 20px; font-size: 0.85rem; line-height: 1.5; color: var(--text-normal); margin: 0; display: flex; flex-direction: column; gap: 8px; text-align: left;"></ul>
          <div style="background: rgba(230, 92, 0, 0.05); border-left: 3px solid var(--primary); padding: 12px; border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0; font-size: 0.82rem; line-height: 1.4; color: var(--text-muted); font-style: italic; text-align: left;">
            "<span id="timeline-modal-quote"></span>"
            <div id="timeline-modal-author" style="text-align: right; font-size: 0.72rem; font-weight: 600; margin-top: 6px; font-style: normal; color: var(--text-normal);"></div>
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted); border-top: 1px dashed var(--border-glass); padding-top: 10px; text-align: left;">
            <strong>Key Figures:</strong> <span id="timeline-modal-figures" style="color: var(--text-normal); font-weight: 600;"></span>
          </div>
        </div>
      </div>
    `;

    // Modal logic
    const overlay = document.getElementById('timeline-modal-overlay');
    const modalContent = document.getElementById('timeline-modal-content');
    const closeBtn = document.getElementById('btn-timeline-modal-close');
    const nodes = container.querySelectorAll('.timeline-node-item');

    function openModal(idx) {
      const event = data.timeline[idx];
      if (!event) return;
      AudioEngine.play('click');
      
      document.getElementById('timeline-modal-year').textContent = event.year;
      document.getElementById('timeline-modal-title').textContent = event.title;
      document.getElementById('timeline-modal-quote').textContent = event.quote;
      document.getElementById('timeline-modal-author').textContent = event.author;
      document.getElementById('timeline-modal-figures').textContent = event.figures.join(', ');
      
      const bulletsUl = document.getElementById('timeline-modal-bullets');
      bulletsUl.innerHTML = '';
      event.bullets.forEach(b => {
        const li = document.createElement('li');
        li.textContent = b;
        bulletsUl.appendChild(li);
      });
      
      overlay.style.display = 'flex';
      setTimeout(() => {
        overlay.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
      }, 20);
    }

    function closeModal() {
      overlay.style.opacity = '0';
      modalContent.style.transform = 'scale(0.9)';
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 300);
    }

    nodes.forEach(n => {
      n.addEventListener('click', () => {
        const idx = parseInt(n.getAttribute('data-event-index'));
        openModal(idx);
      });
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    // Overview Flashcard Session Logic
    let activeSubtopicIds = subtopics.map(sub => sub.id);
    let currentQuestion = null;
    let reinforcing = false;
    let reinforceMcq = null;

    function getFilteredPool() {
      return state.allQuestions.filter(q => activeSubtopicIds.includes(q.subtopicId));
    }

    function selectNewRandomCard() {
      const pool = getFilteredPool();
      if (pool.length === 0) {
        currentQuestion = null;
        return;
      }
      let nextQ = currentQuestion;
      let attempts = 0;
      while ((nextQ === currentQuestion || !nextQ) && attempts < 10 && pool.length > 1) {
        nextQ = pool[Math.floor(Math.random() * pool.length)];
        attempts++;
      }
      if (pool.length === 1 || attempts >= 10) {
        nextQ = pool[Math.floor(Math.random() * pool.length)];
      }
      currentQuestion = nextQ;
      reinforcing = false;
      reinforceMcq = null;
    }

    function renderToggles() {
      const togglesContainer = document.getElementById('overview-subtopic-toggles');
      if (!togglesContainer) return;
      togglesContainer.innerHTML = '';
      
      subtopics.forEach(sub => {
        const subNum = sub.title.match(/Topic\s(\d\.\d)/)?.[1] || sub.title;
        const isActive = activeSubtopicIds.includes(sub.id);
        
        const btn = document.createElement('button');
        btn.className = `btn-subtopic-toggle ${isActive ? 'active' : ''}`;
        btn.textContent = `Lesson ${subNum}`;
        btn.title = sub.title.replace(/^Topic \d\.\d:\s*/, "");
        
        btn.style.padding = '6px 12px';
        btn.style.fontSize = '0.8rem';
        btn.style.borderRadius = '20px';
        btn.style.fontWeight = '600';
        btn.style.cursor = 'pointer';
        btn.style.transition = 'all var(--transition-fast)';
        btn.style.border = isActive ? '1px solid var(--primary)' : '1px solid var(--border-glass)';
        btn.style.background = isActive ? 'var(--primary)' : 'rgba(255, 255, 255, 0.03)';
        btn.style.color = isActive ? '#fff' : 'var(--text-muted)';
        
        btn.addEventListener('click', () => {
          AudioEngine.play('click');
          if (isActive) {
            if (activeSubtopicIds.length > 1) {
              activeSubtopicIds = activeSubtopicIds.filter(id => id !== sub.id);
            } else {
              btn.style.animation = 'shake 0.4s ease-in-out';
              setTimeout(() => btn.style.animation = '', 400);
              return;
            }
          } else {
            activeSubtopicIds.push(sub.id);
          }
          renderToggles();
          selectNewRandomCard();
          renderCard();
        });
        togglesContainer.appendChild(btn);
      });
    }

    function renderCard() {
      const stageContainer = document.getElementById('overview-flashcard-stage-container');
      if (!stageContainer) return;
      
      if (!currentQuestion) {
        stageContainer.innerHTML = `
          <div style="background: rgba(255,255,255,0.01); border: 1px dashed var(--border-glass); border-radius: var(--border-radius-md); padding: 40px; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
            <i class="fa-solid fa-face-frown" style="font-size: 2rem; color: var(--primary); margin-bottom: 12px; display: block;"></i>
            No flashcards available. Please enable at least one subtopic lesson.
          </div>
        `;
        return;
      }

      const q = currentQuestion;
      const isBookmarked = state.bookmarks.includes(q.id);
      const ktLabel = formatSubtopicIdToKT(q.subtopicId);

      stageContainer.innerHTML = `
        <div class="overview-flashcard-stage" style="perspective: 1000px; position: relative; width: 100%; height: 260px; margin-bottom: 16px;">
          <div class="flashcard-card" id="overview-flashcard-card" style="cursor: pointer; position: absolute; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); border-radius: var(--border-radius-lg); box-shadow: var(--shadow-lg);">
            <!-- Front Face -->
            <div class="flashcard-face flashcard-front" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: var(--border-radius-lg); border: 1px solid var(--border-glass); padding: 20px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; background-color: var(--bg-card); background-image: radial-gradient(circle at 10% 20%, rgba(168, 85, 247, 0.05) 0%, transparent 40%);">
              <div class="card-top" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <span class="badge ${q.type === 'standard' ? 'badge-standard' : 'badge-depth'}">${q.type === 'standard' ? 'Standard' : 'Top Tier Trivia'}</span>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 0.82rem; font-weight: 700; color: var(--primary);">${ktLabel}</span>
                  <span class="bookmark-icon-container ${isBookmarked ? 'bookmarked' : ''}" data-qid="${q.id}" style="cursor: pointer;"><i class="${isBookmarked ? 'fa-solid' : 'fa-regular'} fa-star" style="color: var(--primary);"></i></span>
                </div>
              </div>
              <div class="card-body" style="flex: 1; display: flex; align-items: center; justify-content: center; padding: 10px 0;">
                <h3 class="card-question" style="font-size: 0.95rem; font-weight: 600; line-height: 1.4; text-align: center; margin: 0; color: var(--text-main); max-width: 90%;">${q.question}</h3>
              </div>
              <div class="card-bottom" style="text-align: center; font-size: 0.72rem; color: var(--text-muted); font-weight: 500;"><i class="fa-solid fa-rotate"></i> Click card to flip and reveal answer</div>
            </div>
            <!-- Back Face -->
            <div class="flashcard-face flashcard-back" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: var(--border-radius-lg); border: 1px solid var(--border-active); padding: 20px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; background-color: var(--bg-card-hover); background-image: radial-gradient(circle at 90% 80%, rgba(6, 182, 212, 0.05) 0%, transparent 40%); transform: rotateY(180deg);">
              <div class="card-top" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <span class="badge ${q.type === 'standard' ? 'badge-standard' : 'badge-depth'}">${q.type === 'standard' ? 'Standard' : 'Top Tier Trivia'}</span>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 0.82rem; font-weight: 700; color: var(--primary);">${ktLabel}</span>
                  <span class="bookmark-icon-container ${isBookmarked ? 'bookmarked' : ''}" data-qid="${q.id}" style="cursor: pointer;"><i class="${isBookmarked ? 'fa-solid' : 'fa-regular'} fa-star" style="color: var(--primary);"></i></span>
                </div>
              </div>
              
              <div id="overview-flashcard-back-standard-body" style="display: flex; flex-direction: column; flex: 1; padding: 10px 0; overflow-y: auto; text-align: center; justify-content: center; gap: 4px;">
                <span class="card-answer-label" style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); font-weight: 700; margin-bottom: 2px;">Correct Answer</span>
                <h2 class="card-answer-text" style="font-size: 1.15rem; font-weight: 700; color: var(--text-main); margin: 0 0 6px 0; line-height: 1.2;">${q.answer}</h2>
                <p class="card-explanation-text" style="font-size: 0.78rem; line-height: 1.45; color: var(--text-muted); margin: 0; max-height: 160px; overflow-y: auto;">${q.explanation}</p>
              </div>
              
              <div class="card-bottom" style="text-align: center; font-size: 0.72rem; color: var(--text-muted); font-weight: 500;"><i class="fa-solid fa-rotate"></i> Click card to flip back</div>
            </div>
          </div>
        </div>
        
        <div class="overview-flashcard-controls" style="display: flex; justify-content: center; gap: 12px; margin-top: 12px; height: 38px; align-items: center;">
          <button class="btn-secondary" id="overview-btn-flashcard-reveal" style="padding: 8px 16px; font-size: 0.82rem; border-radius: 4px; font-weight: 600; cursor: pointer; transition: all var(--transition-fast); display: flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-rotate"></i> Flip Card
          </button>
          <div id="overview-flashcard-self-grade-actions" style="display: none; width: 100%; gap: 12px; justify-content: center;">
            <button class="btn-incorrect" id="overview-btn-flashcard-incorrect" style="padding: 8px 14px; font-size: 0.8rem; border-radius: 4px; font-weight: 600; cursor: pointer; transition: all var(--transition-fast); display: flex; align-items: center; gap: 6px; border: 1px solid var(--danger); background: rgba(239, 68, 68, 0.05); color: var(--danger);">
              <i class="fa-solid fa-xmark"></i> Study Again
            </button>
            <button class="btn-correct" id="overview-btn-flashcard-correct" style="padding: 8px 14px; font-size: 0.8rem; border-radius: 4px; font-weight: 600; cursor: pointer; transition: all var(--transition-fast); display: flex; align-items: center; gap: 6px; border: 1px solid var(--success); background: rgba(16, 185, 129, 0.05); color: var(--success);">
              <i class="fa-solid fa-check"></i> Got It!
            </button>
          </div>
        </div>
      `;

      const cardEl = document.getElementById('overview-flashcard-card');
      const revealBtn = document.getElementById('overview-btn-flashcard-reveal');
      const gradeActions = document.getElementById('overview-flashcard-self-grade-actions');

      cardEl.addEventListener('click', (e) => {
        if (e.target.closest('button') || e.target.closest('.bookmark-icon-container')) {
          return;
        }
        cardEl.classList.toggle('flipped');
        AudioEngine.play('flip');
        updateControlsVisibility();
      });

      revealBtn.addEventListener('click', () => {
        cardEl.classList.add('flipped');
        AudioEngine.play('flip');
        updateControlsVisibility();
      });

      function updateControlsVisibility() {
        const isFlipped = cardEl.classList.contains('flipped');
        if (isFlipped) {
          revealBtn.style.display = 'none';
          gradeActions.style.display = 'flex';
        } else {
          revealBtn.style.display = 'flex';
          gradeActions.style.display = 'none';
        }
      }

      updateControlsVisibility();

      document.getElementById('overview-btn-flashcard-incorrect').addEventListener('click', () => {
        AudioEngine.play('fail');
        setMastered(q.id, false);
        cardEl.className = 'flashcard-card flipped swipe-left';
        setTimeout(() => {
          selectNewRandomCard();
          renderCard();
        }, 300);
      });

      document.getElementById('overview-btn-flashcard-correct').addEventListener('click', () => {
        AudioEngine.play('success');
        setMastered(q.id, true);
        cardEl.className = 'flashcard-card flipped swipe-right';
        setTimeout(() => {
          selectNewRandomCard();
          renderCard();
        }, 300);
      });

      // Attach bookmarks listeners
      const bkmkBtns = stageContainer.querySelectorAll('.bookmark-icon-container');
      bkmkBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const qid = btn.getAttribute('data-qid');
          toggleBookmark(qid);
          const isNowBookmarked = state.bookmarks.includes(qid);
          bkmkBtns.forEach(b => {
            b.className = `bookmark-icon-container ${isNowBookmarked ? 'bookmarked' : ''}`;
            b.querySelector('i').className = isNowBookmarked ? 'fa-solid fa-star' : 'fa-regular fa-star';
          });
        });
      });
    }

    selectNewRandomCard();
    renderToggles();
    renderCard();

    // Weighing sliders logic
    data.sliders.forEach(slider => {
      const input = document.getElementById(`input-slider-${slider.id}`);
      const badge = document.getElementById(`slider-badge-${slider.id}`);
      
      const updateFn = (value) => {
        badge.textContent = `${value}%`;
        
        // Choose context tip index
        let tipIdx = 0;
        if (value > 33 && value <= 66) tipIdx = 1;
        else if (value > 66) tipIdx = 2;
        
        const tipContainer = document.getElementById(`slider-tip-${slider.id}`);
        if (tipContainer) {
          tipContainer.innerHTML = `<strong>Analysis (${value}%):</strong> ${slider.tips[tipIdx]}`;
        }
      };

      // Initial update
      updateFn(50);

      input.addEventListener('input', (e) => {
        updateFn(e.target.value);
      });
    });
  }
}

function renderAiVideosView() {
  const container = document.getElementById('video-revision-grid');
  if (!container) return;
  container.innerHTML = '';

  const subtopicIds = Object.keys(VIDEOS_DATA).sort();

  subtopicIds.forEach(subtopicId => {
    const video = VIDEOS_DATA[subtopicId];
    if (!video || !video.primary) return;

    const subtopicData = QUIZ_DATA.flatMap(t => t.subtopics).find(s => s.id === subtopicId);
    const lessonTitle = subtopicData ? subtopicData.title : subtopicId;
    const formattedKT = formatSubtopicIdToKT(subtopicId);

    const card = document.createElement('div');
    card.className = 'mastery-card';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.justifyContent = 'space-between';
    card.style.height = '100%';
    card.style.padding = '20px';
    card.style.border = '1px solid var(--border-glass)';
    card.style.background = 'rgba(255, 255, 255, 0.01)';
    card.style.transition = 'transform 0.2s, box-shadow 0.2s, background-color 0.2s';
    card.style.borderRadius = 'var(--border-radius-md)';
    card.style.cursor = 'pointer';

    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-2px)';
      card.style.background = 'rgba(255, 255, 255, 0.03)';
      card.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.background = 'rgba(255, 255, 255, 0.01)';
      card.style.boxShadow = 'none';
    });

    const header = `
      <div style="margin-bottom: 12px;">
        <span style="font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--accent); background: var(--accent-glow); border: 1px solid rgba(244, 63, 94, 0.2); padding: 2px 8px; border-radius: 4px; font-family: var(--font-heading); display: inline-block; margin-bottom: 6px;">${formattedKT}</span>
        <h3 style="font-size: 0.95rem; font-weight: 700; margin: 0; line-height: 1.3; color: var(--text-main);">${lessonTitle.split(':').slice(1).join(':').trim() || lessonTitle}</h3>
      </div>
    `;

    const videoId = video.primary.youtube_url.split('v=')[1];
    const thumbnail = `
      <div class="video-thumbnail-container" style="position: relative; width: 100%; aspect-ratio: 16/9; background: #000; border-radius: var(--border-radius-sm); border: 1px solid var(--border-glass); margin-bottom: 14px; overflow: hidden; display: flex; align-items: center; justify-content: center;">
        <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="${video.primary.video_title}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.65; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='0.65'">
        <div style="position: absolute; width: 50px; height: 50px; border-radius: 50%; background: var(--primary); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4); transition: transform 0.2s;" class="play-btn">
          <i class="fa-solid fa-play" style="margin-left: 3px;"></i>
        </div>
        <span style="position: absolute; bottom: 8px; right: 8px; font-size: 0.7rem; font-weight: 700; background: rgba(0,0,0,0.8); color: #fff; padding: 2px 6px; border-radius: 4px; font-family: var(--font-heading);">${video.primary.duration} mins</span>
      </div>
    `;

    const body = `
      <p style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.45; margin: 0 0 16px 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
        Watch the quick 2-minute overview covering: ${video.questions.map(q => q.replace(/\?$/, "")).join(', ')}.
      </p>
    `;

    const actions = document.createElement('div');
    actions.style.display = 'flex';
    actions.style.gap = '8px';
    actions.style.marginTop = 'auto';

    const playBtn = document.createElement('button');
    playBtn.className = 'mastery-btn';
    playBtn.style.flex = '1';
    playBtn.style.padding = '8px';
    playBtn.style.fontSize = '0.78rem';
    playBtn.style.fontWeight = 'bold';
    playBtn.style.background = 'var(--primary)';
    playBtn.style.color = '#fff';
    playBtn.style.display = 'inline-flex';
    playBtn.style.alignItems = 'center';
    playBtn.style.justifyContent = 'center';
    playBtn.style.gap = '6px';
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i> Watch`;
    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      AudioEngine.play('click');
      openVideoModal(video.primary.youtube_url, video.primary.video_title);
    });

    const studyBtn = document.createElement('button');
    studyBtn.className = 'mastery-btn';
    studyBtn.style.padding = '8px';
    studyBtn.style.fontSize = '0.78rem';
    studyBtn.style.fontWeight = 'bold';
    studyBtn.style.background = 'rgba(255,255,255,0.05)';
    studyBtn.style.border = '1px solid var(--border-glass)';
    studyBtn.style.color = 'var(--text-main)';
    studyBtn.innerHTML = `Study Lesson`;
    studyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      AudioEngine.play('click');
      switchView('subtopic', subtopicId);
    });

    actions.appendChild(playBtn);
    actions.appendChild(studyBtn);

    card.innerHTML = header + thumbnail + body;
    card.appendChild(actions);

    card.addEventListener('click', () => {
      AudioEngine.play('click');
      openVideoModal(video.primary.youtube_url, video.primary.video_title);
    });

    container.appendChild(card);
  });
}

// Add Streak Leaderboard functions
function triggerAngrySweepAnimation() {
  const logos = document.querySelectorAll('.brand-icon, .brand-subheader-logo');
  logos.forEach(logo => {
    logo.classList.add('angry');
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'soot-particle';
      particle.style.background = '#1a1a1a';
      particle.style.width = `${Math.random() * 8 + 4}px`;
      particle.style.height = particle.style.width;
      particle.style.borderRadius = '50%';
      particle.style.position = 'fixed';
      particle.style.zIndex = '99999';
      const rect = logo.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 80 + 40;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - 60;
      document.body.appendChild(particle);
      let start = null;
      function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / 1000;
        particle.style.transform = `translate(${vx * progress}px, ${vy * progress}px) scale(${1 - progress})`;
        particle.style.opacity = `${1 - progress}`;
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          particle.remove();
        }
      }
      requestAnimationFrame(animate);
    }
    setTimeout(() => {
      logo.classList.remove('angry');
    }, 1200);
  });
}

function triggerChimneyAnger() {
  AudioEngine.play('fail');
  triggerAngrySweepAnimation();
}

function validateScoreBoardInitials(initials) {
  if (!/^[A-Z]{3}$/.test(initials)) {
    AudioEngine.play('fail');
    triggerAngrySweepAnimation();
    return { valid: false, message: "Please enter exactly 3 letters for your initials." };
  }
  const profane = new Set([
    'ASS', 'WTF', 'FUC', 'SHI', 'CNT', 'CUM', 'FAG', 'DIK', 'KYS', 'KKK', 'SEX', 
    'NIG', 'TIT', 'FAP', 'WOP', 'PIS', 'HEL', 'DAM', 'SOB', 'PEE', 'POO', 'DIE', 
    'GAY', 'PNS', 'VAG', 'KOK', 'FUK', 'FCK', 'BCH', 'MLF', 'DCK', 'BUM', 'FUG',
    'SHT', 'XXX', 'SUK', 'HOE', 'SLT', 'WHR', 'NOB', 'KNO', 'COK', 'TAD', 'PUB',
    'NGR', 'BXT'
  ]);
  if (profane.has(initials)) {
    triggerChimneyAnger();
    return { valid: false, message: "Initials cannot contain inappropriate language." };
  }
  return { valid: true };
}

function getStreakLeaderboard() {
  const key = 'edexcel_streak_leaderboard';
  let board = localStorage.getItem(key);
  if (!board) {
    board = [
      { name: "BEN", yearGroup: "Year 11", streak: 12, xp: 450, level: 3, date: "2026-06-05" },
      { name: "LUC", yearGroup: "Year 10", streak: 8, xp: 320, level: 2, date: "2026-06-06" },
      { name: "SAM", yearGroup: "Year 9", streak: 5, xp: 180, level: 1, date: "2026-06-04" },
      { name: "JON", yearGroup: "Year 11", streak: 4, xp: 510, level: 3, date: "2026-06-03" },
      { name: "EMM", yearGroup: "Year 8", streak: 3, xp: 90, level: 1, date: "2026-06-06" }
    ];
    localStorage.setItem(key, JSON.stringify(board));
  } else {
    board = JSON.parse(board);
  }
  return board.sort((a, b) => {
    if (b.streak !== a.streak) return b.streak - a.streak;
    if (b.xp !== a.xp) return b.xp - a.xp;
    if (b.level !== a.level) return b.level - a.level;
    return new Date(b.date) - new Date(a.date);
  }).slice(0, 10);
}

function saveStreakHighScoreLocal(name, yearGroup) {
  const stats = state.userStats || { xp: 0, level: 1, streak: 0, lastLoginDate: null };
  const board = getStreakLeaderboard();
  const dateStr = new Date().toISOString().split('T')[0];
  const existing = board.find(x => x.name.toUpperCase() === name.toUpperCase() && x.yearGroup === yearGroup);
  if (existing) {
    if (stats.streak > existing.streak || (stats.streak === existing.streak && stats.xp > existing.xp)) {
      existing.streak = stats.streak;
      existing.xp = stats.xp;
      existing.level = stats.level;
      existing.date = dateStr;
    }
  } else {
    board.push({
      name: name.toUpperCase(),
      yearGroup: yearGroup,
      streak: stats.streak,
      xp: stats.xp,
      level: stats.level,
      date: dateStr
    });
  }
  board.sort((a, b) => {
    if (b.streak !== a.streak) return b.streak - a.streak;
    if (b.xp !== a.xp) return b.xp - a.xp;
    if (b.level !== a.level) return b.level - a.level;
    return new Date(b.date) - new Date(a.date);
  });
  localStorage.setItem('edexcel_streak_leaderboard', JSON.stringify(board.slice(0, 10)));
}

export function renderStreakLeaderboardList() {
  const container = document.getElementById('streak-leaderboard-list-container');
  if (!container) return;
  const scores = getStreakLeaderboard();
  let rowsHtml = scores.map((s, idx) => {
    let medal = '';
    let rowClass = '';
    if (idx === 0) { medal = '🥇 '; rowClass = 'rank-gold'; }
    else if (idx === 1) { medal = '🥈 '; rowClass = 'rank-silver'; }
    else if (idx === 2) { medal = '🥉 '; rowClass = 'rank-bronze'; }
    const yrText = s.yearGroup ? ` <span style="font-size: 0.72rem; color: var(--text-muted);">(${s.yearGroup})</span>` : '';
    return `
      <tr class="${rowClass}" style="border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.85rem;">
        <td style="padding: 10px 6px; font-weight: bold; color: var(--primary);">${medal}${idx + 1}</td>
        <td style="padding: 10px 6px; font-weight: 700; color: var(--text-main);">${s.name}${yrText}</td>
        <td style="padding: 10px 6px; font-weight: 800; color: var(--accent); text-align: center;">🔥 ${s.streak} Days</td>
        <td style="padding: 10px 6px; text-align: center;">
          <span style="font-size: 0.72rem; background: rgba(6,182,212,0.1); color: #06b6d4; border: 1px solid rgba(6,182,212,0.2); padding: 2px 8px; border-radius: 12px; font-weight: bold;">
            Lvl ${s.level}
          </span>
        </td>
        <td style="padding: 10px 6px; font-weight: 700; color: var(--success); text-align: right;">${s.xp} XP</td>
        <td class="desktop-only" style="padding: 10px 6px; color: var(--text-muted); text-align: right; font-size: 0.72rem;">${s.date}</td>
      </tr>
    `;
  }).join('');
  container.innerHTML = `
    <table class="leaderboard-table" style="width: 100%; border-collapse: collapse; text-align: left;">
      <thead>
        <tr style="border-bottom: 1px solid var(--border-glass); color: var(--text-muted); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px;">
          <th style="padding: 6px; font-weight: 700;">Rank</th>
          <th style="padding: 6px; font-weight: 700;">Student</th>
          <th style="padding: 6px; font-weight: 700; text-align: center;">Streak</th>
          <th style="padding: 6px; font-weight: 700; text-align: center;">Level</th>
          <th style="padding: 6px; font-weight: 700; text-align: right;">Total XP</th>
          <th class="desktop-only" style="padding: 6px; font-weight: 700; text-align: right;">Date</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>
  `;
}

export function openStreakLeaderboard() {
  renderStreakLeaderboardList();
  const submitBtn = document.getElementById('btn-submit-leaderboard');
  const initialsInput = document.getElementById('leaderboard-initials');
  const yearSelect = document.getElementById('leaderboard-year');
  if (submitBtn && initialsInput && yearSelect) {
    const newSubmitBtn = submitBtn.cloneNode(true);
    submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
    newSubmitBtn.addEventListener('click', () => {
      const name = initialsInput.value.trim().toUpperCase();
      const year = yearSelect.value;
      const val = validateScoreBoardInitials(name);
      if (!val.valid) {
        showWarningToast(val.message);
        return;
      }
      if (!year) {
        AudioEngine.play('fail');
        showWarningToast("Please select a Year Group!");
        return;
      }
      AudioEngine.play('cheer');
      Confetti.spawn(60);
      saveStreakHighScoreLocal(name, year);
      renderStreakLeaderboardList();
      initialsInput.value = '';
      yearSelect.value = '';
      showToast("Score successfully posted to the Streak Leaderboard!", "success");
    });
  }
}

function renderKeyIndividualsView() {
  const container = document.getElementById('key-individuals-grid');
  if (!container) return;
  container.innerHTML = '';

  activeFigures.forEach(item => {
    const figure = KEY_FIGURES_BIO[item.key];
    if (!figure) return;

    // Generate initials for initials fallback
    const cleanName = figure.name.replace(/Jr\.|Chief Justice|General|Dr\./gi, '').trim();
    const nameParts = cleanName.split(/\s+/).filter(p => p.length > 0);
    let initials = '';
    if (nameParts.length >= 3) {
      initials = (nameParts[0][0] + nameParts[1][0] + nameParts[2][0]).toUpperCase();
    } else if (nameParts.length === 2) {
      initials = (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    } else if (nameParts.length === 1) {
      initials = nameParts[0].substring(0, 2).toUpperCase();
    }
    initials = initials.substring(0, 3);

    const cardContainer = document.createElement('div');
    cardContainer.className = 'individual-card-container';
    cardContainer.style.cssText = 'perspective: 1000px; height: 380px;';

    const quoteHtml = item.quote ? `
      <blockquote style="margin: 8px 0 12px 0; font-style: italic; font-size: 0.85rem; color: var(--text-main); line-height: 1.4; font-family: Georgia, serif; margin: 0 0 10px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; border-left: 3px solid var(--accent); padding-left: 8px; text-align: left;">
        "${item.quote}"
      </blockquote>
    ` : '<p style="font-size: 0.8rem; color: var(--text-muted); margin: 0 0 10px 0;">GCSE Key Individual</p>';

    cardContainer.innerHTML = `
      <div class="individual-card" style="position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer;">
        <!-- FRONT OF CARD -->
        <div class="individual-card-face front" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: var(--border-radius-md); border: 2px solid var(--border-glass); background: var(--bg-card); display: flex; flex-direction: column; overflow: hidden; padding: 20px; box-sizing: border-box; justify-content: space-between;">
          <!-- Top header -->
          <div style="display: flex; flex-direction: column; gap: 4px; text-align: left;">
            <span style="font-size: 0.68rem; font-weight: 700; text-transform: uppercase; color: var(--accent); letter-spacing: 0.5px;">${figure.role}</span>
            <h3 style="margin: 4px 0 0 0; font-family: var(--font-heading); font-size: 1.35rem; font-weight: 800; color: var(--text-main);">${figure.name}</h3>
          </div>
          
          <!-- Portrait Image -->
          <div style="flex-grow: 1; display: flex; align-items: center; justify-content: center; margin: 10px 0;">
            <div style="width: 130px; height: 130px; border-radius: 50%; border: 3px solid var(--accent); overflow: hidden; display: flex; align-items: center; justify-content: center; background: var(--gradient-primary); box-shadow: var(--shadow-sm); position: relative; transition: transform 0.3s ease;">
              ${figure.image ? `
                <img src="${figure.image}" alt="${figure.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <span style="display: none; font-size: 2.2rem; font-weight: 800; color: #fff; font-family: var(--font-heading); text-shadow: 0 1px 3px rgba(0,0,0,0.3);">${initials}</span>
              ` : `
                <span style="font-size: 2.2rem; font-weight: 800; color: #fff; font-family: var(--font-heading); text-shadow: 0 1px 3px rgba(0,0,0,0.3);">${initials}</span>
              `}
            </div>
          </div>
          
          <!-- Bottom info -->
          <div style="text-align: center;">
            ${quoteHtml}
            <span style="font-size: 0.72rem; color: var(--primary); font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 4px;">
              <i class="fa-solid fa-rotate"></i> Click Card to Flip
            </span>
          </div>
        </div>
        
        <!-- BACK OF CARD -->
        <div class="individual-card-face back" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: var(--border-radius-md); border: 2px solid var(--accent); background: var(--bg-sidebar); display: flex; flex-direction: column; padding: 20px; box-sizing: border-box; justify-content: space-between; transform: rotateY(180deg);">
          <div style="text-align: left; display: flex; flex-direction: column; gap: 10px; height: 100%; overflow-y: auto; padding-right: 4px;">
            <!-- Header -->
            <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid var(--border-glass); padding-bottom: 6px;">
              <h4 style="margin: 0; font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; color: var(--text-main);">${figure.name}</h4>
              <span style="font-size: 0.65rem; text-transform: uppercase; color: var(--accent); font-weight: 700; letter-spacing: 0.5px;">GCSE Bio</span>
            </div>
            
            <!-- Biography -->
            <p style="font-size: 0.82rem; line-height: 1.45; color: var(--text-muted); margin: 0;">
              ${figure.bio}
            </p>
            
            <!-- GCSE Practice Challenge -->
            <div style="background: rgba(37, 99, 235, 0.05); border: 1px dashed var(--primary); border-radius: var(--border-radius-sm); padding: 10px 12px; margin-top: auto; box-sizing: border-box;">
              <strong style="font-size: 0.72rem; color: var(--primary); text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">
                💡 Quick Recall Question:
              </strong>
              <p style="font-size: 0.8rem; line-height: 1.35; color: var(--text-main); font-weight: 600; margin: 0 0 8px 0;">
                ${item.question}
              </p>
              <div class="answer-box-container">
                <button class="btn-reveal-answer" style="background: var(--primary); border: none; color: #fff; padding: 5px 10px; font-size: 0.7rem; font-weight: 700; border-radius: var(--border-radius-sm); cursor: pointer; transition: background 0.2s;">
                  Reveal Answer
                </button>
              </div>
            </div>
          </div>
          
          <!-- Flip back helper -->
          <div style="text-align: center; margin-top: 6px; border-top: 1px dashed var(--border-glass); padding-top: 6px;">
            <span style="font-size: 0.72rem; color: var(--text-muted); display: flex; align-items: center; justify-content: center; gap: 4px;">
              <i class="fa-solid fa-rotate"></i> Click to Flip Back
            </span>
          </div>
        </div>
      </div>
    `;

    const cardInner = cardContainer.querySelector('.individual-card');
    cardInner.addEventListener('click', (e) => {
      if (e.target.closest('.btn-reveal-answer') || e.target.closest('.reveal-answer-text')) return;
      cardInner.classList.toggle('flipped');
      AudioEngine.play('flip');
    });

    const revealBtn = cardContainer.querySelector('.btn-reveal-answer');
    revealBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      AudioEngine.play('success');
      const containerBox = revealBtn.parentElement;
      containerBox.innerHTML = `
        <div class="reveal-answer-text" style="font-size: 0.8rem; font-weight: 700; color: var(--success); padding: 4px 0; animation: fadeIn 0.3s ease;">
          <i class="fa-solid fa-circle-check"></i> Answer: ${item.answer}
        </div>
      `;
    });

    container.appendChild(cardContainer);
  });
}

export {
  renderSidebarNav,
  updateBookmarksUI,
  updateGlobalStats,
  renderDashboard,
  highlightCausalConnectives,
  renderExamSkillsView,
  renderClassicView,
  startFlashcardSession,
  renderFlashcard,
  handleFlashcardGrade,
  showFlashcardCompletion,
  restoreFlashcardSkeleton,
  flipFlashcard,
  renderTimelineView,
  evaluateStudentAnswer,
  renderBookmarksView,
  openVideoModal,
  closeVideoModal,
  renderGamesView,
  initChronologyGame,
  initMasteryMatchGame,
  initMindMapGame,
  initDecisionsGame,
  initExamLeaderboard,
  renderGoingBeyond,
  formatSubtopicIdToKT,
  renderKeyTopicOverview,
  renderAiVideosView,
  saveStreakHighScoreLocal,
  validateScoreBoardInitials,
  renderKeyIndividualsView
};
// End of file 

import { CARDS_DATA } from './cards_data.js';

export function renderScumbagBinder() {
  const container = document.getElementById("scumbag-binder-grid");
  if (!container) return;
  container.innerHTML = "";

  const totalXP = (window.state && window.state.userStats && window.state.userStats.xp) || 0;
  const unlockedCards = (window.state && window.state.userStats && window.state.userStats.unlockedCards) || [];

  CARDS_DATA.forEach((card, index) => {
    const requiredXP = (index + 1) * 200;
    const hasEnoughXP = totalXP >= requiredXP;
    const isOpened = unlockedCards.includes(card.id);

    const wrapperEl = document.createElement("div");
    wrapperEl.className = "scumbag-card-container scumbag-flippable";

    const innerEl = document.createElement("div");
    innerEl.className = "scumbag-flip-card-inner";

    // Front Face
    const frontEl = document.createElement("div");
    frontEl.className = "scumbag-flip-card-front";
    if (hasEnoughXP && isOpened) {
      frontEl.className += " scumbag-card-unlocked";
      frontEl.style.backgroundImage = `url('${card.image}')`;
      frontEl.innerHTML = '<div class="hologram"></div>';
    } else if (hasEnoughXP && !isOpened) {
      frontEl.className += " scumbag-card-ready";
      frontEl.innerHTML = `
        <div class="foil-pack-body" style="position: absolute; inset: 0; background-image: url('assets/mr_lovett_wrapper.png?v=2'); background-size: cover; background-position: center; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding: 20px; color: white; text-align: center; border: 2px solid #facc15; box-shadow: 0 0 15px rgba(250, 204, 21, 0.5); animation: pulse 2s infinite; border-radius: 12px; overflow: hidden; cursor: pointer;">
          <div style="background: rgba(0,0,0,0.8); padding: 15px; border-radius: 8px; width: 100%; border: 1px solid #facc15;">
            <i class="fa-solid fa-gift" style="font-size: 2rem; margin-bottom: 10px; color: #facc15; animation: bounce 1s infinite;"></i>
            <h3 style="margin-bottom: 5px; color: #facc15; text-transform: uppercase;">Tap to Open!</h3>
          </div>
        </div>
      `;
      frontEl.onclick = () => {
        if (window.triggerPackOpening) window.triggerPackOpening(card.id);
      };
    } else {
      frontEl.className += " scumbag-card-locked";
      frontEl.innerHTML = `
        <div class="foil-pack-body" style="position: absolute; inset: 0; background-image: linear-gradient(rgba(10, 10, 15, 0.85), rgba(10, 10, 15, 0.85)), url('assets/mr_lovett_wrapper.png?v=2'); background-size: cover; background-position: center; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding: 20px; color: white; text-align: center; border-radius: 12px; overflow: hidden;">
          <i class="fa-solid fa-lock" style="font-size: 2rem; color: #facc15; margin-bottom: 10px;"></i>
          <h3 style="margin-bottom: 5px;">Locked Pack</h3>
          <p style="font-size: 0.85rem;">Reach ${requiredXP} XP to unlock</p>
        </div>
      `;
    }

    // Back Face
    const backEl = document.createElement("div");
    backEl.className = "scumbag-flip-card-back";
    
    if (hasEnoughXP && isOpened && card.stats) {
      backEl.innerHTML = `
        <div class="scumbag-back-content">
          <div class="scumbag-back-header">
            <h4>${card.name}</h4>
          </div>
          <div class="scumbag-bio">${card.bio}</div>
          <div class="scumbag-stats-box">
            <div class="scumbag-stat-row">
              <span class="stat-label">Audacity</span>
              <span class="scumbag-stat-value">
                <div class="scumbag-stat-bar" style="width: ${card.stats.audacity}%"></div>
                ${card.stats.audacity}
              </span>
            </div>
            <div class="scumbag-stat-row">
              <span class="stat-label">Sneakiness</span>
              <span class="scumbag-stat-value">
                <div class="scumbag-stat-bar" style="width: ${card.stats.diplomaticSneakiness}%"></div>
                ${card.stats.diplomaticSneakiness}
              </span>
            </div>
            <div class="scumbag-stat-row">
              <span class="stat-label">Military</span>
              <span class="scumbag-stat-value">
                <div class="scumbag-stat-bar" style="width: ${card.stats.militaryMight}%"></div>
                ${card.stats.militaryMight}
              </span>
            </div>
            <div class="scumbag-stat-row">
              <span class="stat-label">Legacy</span>
              <span class="scumbag-stat-value">
                <div class="scumbag-stat-bar" style="width: ${card.stats.legacyScore}%"></div>
                ${card.stats.legacyScore}
              </span>
            </div>
          </div>
        </div>
      `;
    } else {
      backEl.innerHTML = `<div class="scumbag-back-content"><i class="fa-solid fa-question" style="font-size: 3rem; opacity: 0.1;"></i></div>`;
    }

    innerEl.appendChild(frontEl);
    innerEl.appendChild(backEl);
    wrapperEl.appendChild(innerEl);

    if (hasEnoughXP && isOpened) {
      wrapperEl.onclick = () => {
        AudioEngine.play('cardFlip');
        innerEl.classList.toggle('flipped');
      };
    }

    container.appendChild(wrapperEl);
  });
}
window.renderScumbagBinder = renderScumbagBinder;

export function triggerPackOpening(cardId) {
  const matchedCard = CARDS_DATA.find(c => c.id === cardId);
  if (!matchedCard) return;

  // Add to unlocked cards
  if (window.state && window.state.userStats) {
    if (!window.state.userStats.unlockedCards) {
      window.state.userStats.unlockedCards = [];
    }
    if (!window.state.userStats.unlockedCards.includes(cardId)) {
      window.state.userStats.unlockedCards.push(cardId);
      try {
        localStorage.setItem('edexcel_prefs_user_stats', JSON.stringify(window.state.userStats));
      } catch(e) {}
    }
  }

  const overlay = document.getElementById('pack-opening-overlay');
  const cardImg = document.getElementById('pack-opening-card-image');
  const foilPack = document.getElementById('foil-pack-element');
  const revealedContainer = document.getElementById('revealed-card-container');
  const closeBtn = document.getElementById('btn-close-pack-opening');
  
  if (overlay && cardImg && foilPack && revealedContainer) {
    // Reset states
    foilPack.classList.remove('tearing');
    foilPack.style.display = 'flex';
    revealedContainer.classList.remove('popped');
    closeBtn.style.opacity = '0';
    
    cardImg.style.backgroundImage = `url('${matchedCard.image}')`;
    overlay.classList.add('active');
    
    foilPack.onclick = () => {
      AudioEngine.play('click');
      foilPack.classList.add('tearing');
      
      setTimeout(() => {
        foilPack.style.display = 'none';
        AudioEngine.play('cheer');
        revealedContainer.classList.add('popped');
        
        // Spawn special pack confetti
        for(let i=0; i<30; i++) {
          const conf = document.createElement('div');
          conf.className = 'pack-confetti';
          conf.style.left = Math.random() * 100 + '%';
          conf.style.background = ['#ffb703', '#fb8500', '#8ecae6', '#219ebc', '#023047'][Math.floor(Math.random()*5)];
          conf.style.animationDelay = (Math.random() * 0.5) + 's';
          document.getElementById('pack-confetti-container').appendChild(conf);
          setTimeout(() => conf.remove(), 2500);
        }

        closeBtn.style.opacity = '1';
      }, 1000);
    };

    closeBtn.onclick = () => {
      overlay.classList.remove('active');
      // Ensure the binder visually updates with the new card
      if (window.renderScumbagBinder) {
        window.renderScumbagBinder();
      }
      // Scroll to the binder
      const binderSec = document.getElementById('scumbag-binder-section');
      if (binderSec) {
        binderSec.scrollIntoView({ behavior: 'smooth' });
      }
    };
  }
}
window.triggerPackOpening = triggerPackOpening;

export function renderGlossaryView() {
  const container = document.getElementById('main-content');
  if (!container) return;

  let html = `<div class="study-tools-header">
    <h2><i class="fa-solid fa-book-atlas"></i> Interactive Glossary (Tier 3 Words)</h2>
    <p style="color: var(--text-muted);">Master the key vocabulary essential for GCSE History.</p>
  </div>
  <div class="glossary-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; padding: 16px;">`;

  GLOSSARY_TERMS.forEach((term, index) => {
    html += `  <div class="flashcard" style="background: var(--bg-card); border: 1px solid var(--border-glass); border-radius: 8px; padding: 16px; cursor: pointer; transition: transform 0.2s;" onclick="this.classList.toggle('flipped');">
        <div class="flashcard-inner" style="position: relative; width: 100%; height: 100%;">
          <h3 style="color: var(--primary); margin-bottom: 8px;"></h3>
          <p style="font-size: 0.95rem; line-height: 1.4; margin-bottom: 12px;"></p>
          <div style="background: rgba(255,255,255,0.05); padding: 8px; border-radius: 4px; border-left: 3px solid var(--accent);">
            <small style="color: var(--text-muted); font-style: italic;">e.g., </small>
          </div>
        </div>
      </div>  `;
  });

  html += '</div>';
  container.innerHTML = html;
}
