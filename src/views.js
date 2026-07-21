/**
 * Views Renderer for Mr Lovett's History Hub Mega App
 * Handles rendering the Dashboard, Interactive Quizzes, Timelines, Printable Booklets, and Student Profiles.
 */

import { state } from './state.js';
import { getProfile, setMockUser } from './auth.js';
import { getMasteryStatus, updateLeitnerBox, toggleBookmark, saveProgress } from './storage.js';

// Unit Definitions & Target Year Groups
export const UNITS = [
  { id: 'water_and_sanitation', title: 'Water and Sanitation Through Time', category: 'Key Stage 3', yearGroup: 'Year 7', desc: 'Exploring sanitation development from prehistoric roundhouses to Roman conduits.' },
  { id: 'change_1450_1750', title: 'Change from 1450-1750', category: 'Key Stage 3', yearGroup: 'Year 8', desc: 'Exploring the Renaissance, Reformation, Civil War, and Scientific Revolution.' },
  { id: 'great_war', title: 'The Great War: Causes & Outbreak', category: 'Key Stage 3', yearGroup: 'Year 9', desc: 'New format: Accessible interactive digital app with built-in scaffolds and printable workbooks.' },
  { id: 'great_war_part2', title: 'The Great War: Experience & Aftermath (Part 2)', category: 'Key Stage 3', yearGroup: 'Year 9', desc: 'Enquiry into trench warfare, the global impact, and the flawed peace of the Treaty of Versailles.' },
  { id: 'gcse_middle_east_1945_1995_new', title: 'GCSE: Conflict in the Middle East', category: 'Edexcel GCSE', yearGroup: 'GCSE', desc: 'The brand new accessible interactive digital app format.' },
  { id: 'gcse_elizabethan_england', title: 'GCSE: Early Elizabethan England (1558-1588)', category: 'Edexcel GCSE', yearGroup: 'GCSE', desc: 'Queen, government, religion, challenges at home/abroad, and Elizabethan society.' },
  { id: 'edexcel_medicine', title: 'Edexcel GCSE: Medicine Through Time', category: 'Edexcel GCSE', yearGroup: 'GCSE', desc: 'Medicine Through Time with the British Sector of the Western Front.' }
];

export function renderDashboard() {
  const container = document.getElementById('main-content');
  const profile = getProfile();
  
  // Calculate general stats
  const totalQuestions = state.allQuestions ? state.allQuestions.length : 0;
  let masteredCount = 0;
  let securedCount = 0;
  const boxes = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  
  if (state.mastery) {
    Object.values(state.mastery).forEach(entry => {
      if (entry.status === 'mastered') masteredCount++;
      else if (entry.status === 'secured') securedCount++;
      const b = entry.leitnerBox || 1;
      if (boxes[b] !== undefined) boxes[b]++;
    });
  }

  let html = `
    <!-- Onboarding Banner -->
    <div class="dashboard-hero">
      <div class="hero-text">
        <h2>Welcome back, ${profile ? profile.name : 'Student'}!</h2>
        <p>Current Year Group assignment: <strong>${profile ? profile.yearGroup : 'None'}</strong></p>
      </div>
      <div class="hero-actions">
        <button class="btn btn-primary" onclick="window.switchView('profile')">
          <i class="fa-solid fa-user-gear"></i> Manage Profile
        </button>
      </div>
    </div>

    <!-- Quick Stats Grid -->
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-title">Daily XP</span>
        <span class="stat-val"><i class="fa-solid fa-fire text-primary"></i> ${state.dailyXp}</span>
      </div>
      <div class="stat-card">
        <span class="stat-title">Mastery Level</span>
        <span class="stat-val"><i class="fa-solid fa-graduation-cap text-success"></i> ${masteredCount}</span>
      </div>
      <div class="stat-card">
        <span class="stat-title">Secured Questions</span>
        <span class="stat-val"><i class="fa-solid fa-shield-halved text-info"></i> ${securedCount}</span>
      </div>
    </div>

    <!-- Leitner Box spaced repetition distribution -->
    <div class="card leitner-card">
      <h3><i class="fa-solid fa-brain"></i> Memory Spaced Repetition Distribution</h3>
      <div class="leitner-distribution">
        <div class="leitner-bar-wrapper">
          <span class="bar-label">Box 1 (New)</span>
          <div class="bar-container"><div class="bar-fill bg-danger" style="width: ${totalQuestions ? (boxes[1]/totalQuestions)*100 : 0}%"></div></div>
          <span class="bar-count">${boxes[1]}</span>
        </div>
        <div class="leitner-bar-wrapper">
          <span class="bar-label">Box 2 (Learning)</span>
          <div class="bar-container"><div class="bar-fill bg-warning" style="width: ${totalQuestions ? (boxes[2]/totalQuestions)*100 : 0}%"></div></div>
          <span class="bar-count">${boxes[2]}</span>
        </div>
        <div class="leitner-bar-wrapper">
          <span class="bar-label">Box 3 (Securing)</span>
          <div class="bar-container"><div class="bar-fill bg-info" style="width: ${totalQuestions ? (boxes[3]/totalQuestions)*100 : 0}%"></div></div>
          <span class="bar-count">${boxes[3]}</span>
        </div>
        <div class="leitner-bar-wrapper">
          <span class="bar-label">Box 4 (Retained)</span>
          <div class="bar-container"><div class="bar-fill bg-primary" style="width: ${totalQuestions ? (boxes[4]/totalQuestions)*100 : 0}%"></div></div>
          <span class="bar-count">${boxes[4]}</span>
        </div>
        <div class="leitner-bar-wrapper">
          <span class="bar-label">Box 5 (Mastered)</span>
          <div class="bar-container"><div class="bar-fill bg-success" style="width: ${totalQuestions ? (boxes[5]/totalQuestions)*100 : 0}%"></div></div>
          <span class="bar-count">${boxes[5]}</span>
        </div>
      </div>
    </div>

    <!-- Historical Content Modules -->
    <h3 class="section-title">Historical Study Enquiries</h3>
    <div class="modules-grid">
  `;

  const UNIT_ICONS = {
    water_and_sanitation: { icon: 'fa-faucet-drip', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
    norman_conquest: { icon: 'fa-shield-halved', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
    change_1450_1750: { icon: 'fa-flask', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
    great_war: { icon: 'fa-helmet-safety', color: '#b45309', bg: 'rgba(180, 83, 9, 0.1)' },
    great_war_part2: { icon: 'fa-globe', color: '#0369a1', bg: 'rgba(3, 105, 161, 0.1)' },
    great_war_v2: { icon: 'fa-star', color: '#eab308', bg: 'rgba(234, 179, 8, 0.1)' },
    gcse_usa_1954_1975: { icon: 'fa-monument', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' },
    gcse_middle_east_1945_1995: { icon: 'fa-dove', color: '#0d9488', bg: 'rgba(13, 148, 136, 0.1)' },
    gcse_middle_east_1945_1995_new: { icon: 'fa-star', color: '#0ea5e9', bg: 'rgba(14, 165, 233, 0.1)' },
    gcse_elizabethan_england: { icon: 'fa-crown', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
    edexcel_medicine: { icon: 'fa-staff-snake', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' }
  };

  UNITS.forEach(unit => {
    const isUnlocked = true; // Unlocked all topics for developer/admin preview
    const iconData = UNIT_ICONS[unit.id] || { icon: 'fa-book-open', color: 'var(--primary)', bg: 'var(--border-glass)' };
    
    html += `
      <div class="module-card ${isUnlocked ? '' : 'locked'}">
        <div>
          <div class="module-header" style="margin-bottom: 12px;">
            <span class="category-badge">${unit.category}</span>
            <span class="year-badge">${unit.yearGroup}</span>
          </div>
          <div style="display: flex; gap: 14px; align-items: flex-start;">
            <div style="font-size: 1.3rem; color: ${iconData.color}; background: ${iconData.bg}; padding: 10px; border-radius: var(--border-radius-sm); display: flex; align-items: center; justify-content: center; width: 42px; height: 42px; flex-shrink: 0; border: 1px solid rgba(255,255,255,0.05);">
              <i class="fa-solid ${iconData.icon}"></i>
            </div>
            <div style="flex-grow: 1; min-width: 0;">
              <h4 style="margin: 0 0 6px 0; font-size: 1.1rem; font-weight: 700; line-height: 1.3;">${unit.title}</h4>
              <p style="margin: 0; font-size: 0.85rem; line-height: 1.45; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">${unit.desc}</p>
            </div>
          </div>
        </div>
        
        ${isUnlocked ? `
          <div class="module-actions" style="margin-top: 14px;">
            ${unit.id.startsWith('gcse_') || unit.id === 'water_and_sanitation' || unit.id === 'great_war' || unit.id === 'great_war_part2' || unit.id === 'great_war_v2' || unit.id === 'norman_conquest' || unit.id === 'change_1450_1750' ? `
              <button class="btn btn-sm btn-primary w-full" onclick="window.launchSubApp('${unit.id}')">
                <i class="fa-solid fa-circle-play"></i> Launch Study App
              </button>
            ` : `
              <button class="btn btn-sm btn-primary" onclick="window.switchView('interactive', '${unit.id}')">
                <i class="fa-solid fa-gamepad"></i> Interactive Study
              </button>
              <button class="btn btn-sm btn-secondary" onclick="window.switchView('timeline', '${unit.id}')">
                <i class="fa-solid fa-timeline"></i> Timeline
              </button>
              <button class="btn btn-sm btn-outline" onclick="window.switchView('booklet', '${unit.id}')">
                <i class="fa-solid fa-print"></i> PDF/A4 Booklet
              </button>
            `}
          </div>
        ` : `
          <div class="locked-indicator">
            <i class="fa-solid fa-lock"></i> Locked (Target: ${unit.yearGroup})
          </div>
        `}
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

export function renderProfileView() {
  const container = document.getElementById('main-content');
  const profile = getProfile();

  container.innerHTML = `
    <div class="card max-w-md mx-auto">
      <h3><i class="fa-solid fa-user-circle"></i> Microsoft SSO Student Profile</h3>
      <p class="text-muted">Simulated tenant environment: <strong>history-app.local</strong></p>
      
      <div class="profile-details">
        <div class="form-group">
          <label>Microsoft Account Email</label>
          <input type="text" class="form-control" value="${profile ? profile.username : ''}" disabled />
        </div>
        <div class="form-group">
          <label>Display Name</label>
          <input type="text" class="form-control" value="${profile ? profile.name : ''}" disabled />
        </div>
        <div class="form-group">
          <label>Assigned Year Group unit authorization</label>
          <select id="profile-year-group" class="form-control" onchange="window.updateProfileYearGroup(this.value)">
            <option value="Year 7" ${profile && profile.yearGroup === 'Year 7' ? 'selected' : ''}>Year 7 (Norman Conquest)</option>
            <option value="Year 8" ${profile && profile.yearGroup === 'Year 8' ? 'selected' : ''}>Year 8 (Changes 1450-1750)</option>
            <option value="Year 9" ${profile && profile.yearGroup === 'Year 9' ? 'selected' : ''}>Year 9 (Great War)</option>
            <option value="GCSE" ${profile && profile.yearGroup === 'GCSE' ? 'selected' : ''}>GCSE (USA 1954-1975)</option>
            <option value="Admin" ${profile && profile.yearGroup === 'Admin' ? 'selected' : ''}>Admin (Unlock All Modules)</option>
          </select>
        </div>
      </div>
      
      <div style="margin-top: 24px;">
        <button class="btn btn-secondary w-full" onclick="window.switchView('dashboard')">Save and Return</button>
      </div>
    </div>
  `;
}

// Global update function bound to window
window.updateProfileYearGroup = function(val) {
  setMockUser(val);
  renderDashboard();
};

window.launchSubApp = function(subAppName) {
  if (subAppName === 'gcse_middle_east_1945_1995') {
    window.location.href = '/cme/';
    return;
  }
  if (subAppName === 'gcse_usa_1954_1975') {
    window.location.href = '/usa/';
    return;
  }

  let mappedName = subAppName;
  if (subAppName === 'gcse_middle_east_1945_1995_new') mappedName = 'cme_new';
  if (subAppName === 'gcse_elizabethan_england') mappedName = 'eee';
  if (subAppName === 'great_war_v2') mappedName = 'great_war';
  
  window.location.href = `/unit.html?id=${mappedName}`;
};

export function renderInteractiveQuiz() {
  const container = document.getElementById('main-content');
  const data = state.activeUnitData;

  if (!data || !data.quizData || data.quizData.length === 0) {
    container.innerHTML = `
      <div class="card text-center">
        <p>No quiz questions available for this unit.</p>
        <button class="btn btn-primary" onclick="window.switchView('dashboard')">Back to Dashboard</button>
      </div>
    `;
    return;
  }

  // Choose a random question or Leitner review question
  const questions = data.quizData;
  const randomIndex = Math.floor(Math.random() * questions.length);
  const q = questions[randomIndex];
  
  // Scramble options
  const options = [q.answer, ...q.distractors].sort(() => Math.random() - 0.5);

  container.innerHTML = `
    <div class="card max-w-lg mx-auto quiz-container">
      <div class="quiz-header">
        <span class="quiz-badge">Interactive Recall Quiz</span>
        <button class="btn btn-outline btn-sm" onclick="window.toggleBookmarkQuestion('${q.id}')">
          <i class="${state.bookmarks.includes(q.id) ? 'fa-solid' : 'fa-regular'} fa-bookmark"></i>
        </button>
      </div>
      <h3 class="quiz-question">${q.question}</h3>
      <div class="quiz-options">
        ${options.map(opt => `
          <button class="btn btn-block btn-quiz-opt" onclick="window.submitQuizAnswer('${q.id}', '${opt.replace(/'/g, "\\'")}', this)">
            ${opt}
          </button>
        `).join('')}
      </div>
      <div id="quiz-feedback" class="quiz-feedback hidden"></div>
      <div style="margin-top: 24px; display: flex; justify-content: space-between;">
        <button class="btn btn-secondary" onclick="window.switchView('dashboard')">Exit Quiz</button>
        <button class="btn btn-primary" onclick="window.switchView('interactive', '${state.selectedUnitId}')">Next Question &rarr;</button>
      </div>
    </div>
  `;
}

window.toggleBookmarkQuestion = function(qid) {
  toggleBookmark(qid);
  renderInteractiveQuiz();
};

window.submitQuizAnswer = function(qid, chosen, btnElement) {
  const data = state.activeUnitData;
  const q = data.quizData.find(item => item.id === qid);
  if (!q) return;

  const isCorrect = chosen === q.answer;
  updateLeitnerBox(qid, isCorrect);

  // Disable all options
  document.querySelectorAll('.btn-quiz-opt').forEach(btn => {
    btn.disabled = true;
    if (btn.innerText.trim() === q.answer) {
      btn.classList.add('btn-success');
    } else if (btn === btnElement && !isCorrect) {
      btn.classList.add('btn-danger');
    }
  });

  const feedback = document.getElementById('quiz-feedback');
  feedback.innerHTML = `
    <strong>${isCorrect ? '✅ Correct Answer!' : '❌ Incorrect.'}</strong>
    <p>${q.explanation}</p>
  `;
  feedback.classList.remove('hidden');
};

export function renderTimeline() {
  const container = document.getElementById('main-content');
  const events = state.activeUnitData.timelineEvents;

  if (!events || events.length === 0) {
    container.innerHTML = `
      <div class="card text-center">
        <h3><i class="fa-solid fa-timeline"></i> Timeline</h3>
        <p>No historical events listed in this module's timeline.</p>
        <button class="btn btn-primary" onclick="window.switchView('dashboard')">Back to Dashboard</button>
      </div>
    `;
    return;
  }

  // Sort chronological order
  const sortedEvents = [...events].sort((a, b) => parseInt(a.year, 10) - parseInt(b.year, 10));

  container.innerHTML = `
    <div class="card">
      <h3 style="margin-bottom: 24px;"><i class="fa-solid fa-timeline text-primary"></i> Interactive Chronology Timeline</h3>
      <div class="timeline-wrapper">
        ${sortedEvents.map((evt, idx) => `
          <div class="timeline-item ${idx % 2 === 0 ? 'left' : 'right'}">
            <div class="timeline-badge">${evt.year}</div>
            <div class="timeline-panel">
              <h4>${evt.year}</h4>
              <p>${evt.text}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function renderBookletView() {
  const container = document.getElementById('main-content');
  const data = state.activeUnitData;

  container.innerHTML = `
    <div class="no-print" style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h3>Workbook & Booklet Preview</h3>
        <p class="text-muted">Printable A4 classroom layout generated dynamically from master Markdown files.</p>
      </div>
      <button class="btn btn-primary" onclick="window.printBooklet()">
        <i class="fa-solid fa-print"></i> Print / Save as PDF
      </button>
    </div>

    <!-- Printable A4 Wrapper -->
    <div class="print-booklet-a4" id="booklet-a4-content">
      <div class="booklet-header">
        <span class="school-title">MR LOVETT'S HISTORY HUB</span>
        <span class="unit-title">${data.metadata.title}</span>
      </div>
      
      <h1 class="booklet-main-title">${data.metadata.title}</h1>
      <p class="booklet-subtitle">Classroom Recall Study Pack — target: ${data.metadata.year_group}</p>
      
      <hr />

      ${data.subtopics.map(sub => `
        <div class="booklet-section">
          <h2>${sub.title}</h2>
          <div class="booklet-body-text">
            ${sub.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />')}
          </div>
          
          ${sub.part2.length > 0 ? `
            <div class="booklet-vocab-block">
              <h3>Vocabulary & Key Terms</h3>
              <table class="booklet-table">
                <thead>
                  <tr>
                    <th>Term</th>
                    <th>Definition</th>
                  </tr>
                </thead>
                <tbody>
                  ${sub.part2.map(v => `
                    <tr>
                      <td><strong>${v.term}</strong></td>
                      <td>${v.def}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          ` : ''}
          
          ${sub.part3.length > 0 ? `
            <div class="booklet-tf-block">
              <h3>Core recall Statements (True / False)</h3>
              <ul>
                ${sub.part3.map(item => `
                  <li>[ &nbsp; &nbsp; ] &nbsp; ${item.text} </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

window.printBooklet = function() {
  window.print();
};

export async function renderDecisionsView() {
  const container = document.getElementById('main-content');
  const unitId = state.selectedUnitId || 'gcse_usa_1954_1975';
  
  let decisionsData = [];
  if (unitId === 'gcse_middle_east_1945_1995') {
    const mod = await import('./data/cme/decisions_data.js');
    decisionsData = mod.DECISIONS_DATA;
  } else if (unitId === 'gcse_usa_1954_1975') {
    const mod = await import('./decisions_data.js');
    decisionsData = mod.DECISIONS_DATA;
  }

  if (decisionsData.length === 0) {
    container.innerHTML = `
      <div class="card text-center">
        <h3><i class="fa-solid fa-phone-volume"></i> Decision Simulator</h3>
        <p>No decision scenarios available for this unit.</p>
        <button class="btn btn-primary" onclick="window.switchView('dashboard')">Back to Dashboard</button>
      </div>
    `;
    return;
  }

  window.playDecisionsScenario = function(gameId) {
    const g = decisionsData.find(x => x.id === gameId);
    if (!g) return;

    container.innerHTML = `
      <div class="card max-w-lg mx-auto quiz-container">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
          <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--primary);">Phase 1: Initial Response</span>
          <button class="btn btn-secondary btn-sm" onclick="window.switchView('decisions', '${unitId}')">
            <i class="fa-solid fa-arrow-left"></i> Scenario Menu
          </button>
        </div>

        <h2 style="font-size: 1.4rem; font-weight: 800; margin: 10px 0 0 0;">${g.title}</h2>
        <div style="font-size: 0.9rem; margin-bottom: 14px; font-weight: 600; opacity: 0.8;">Active Role: ${g.role}</div>

        <div style="background-color: var(--bg-app); border: 1px solid var(--border-glass); padding: 18px; border-radius: var(--border-radius-sm); margin-bottom: 20px;">
          <strong>THE CRISIS:</strong><br />
          ${g.crisis}
        </div>

        <div class="quiz-options">
          <button class="btn btn-block btn-quiz-opt" onclick="window.playDecisionsPhase2('${g.id}', 'A')">
            <strong>Choice A:</strong> ${g.phase1.choiceA.text}
          </button>
          <button class="btn btn-block btn-quiz-opt" onclick="window.playDecisionsPhase2('${g.id}', 'B')">
            <strong>Choice B:</strong> ${g.phase1.choiceB.text}
          </button>
        </div>
      </div>
    `;
  };

  window.playDecisionsPhase2 = function(gameId, choiceLetter) {
    const g = decisionsData.find(x => x.id === gameId);
    if (!g) return;

    const selectedChoice = choiceLetter === 'A' ? g.phase1.choiceA : g.phase1.choiceB;

    container.innerHTML = `
      <div class="card max-w-lg mx-auto quiz-container">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
          <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--primary);">Phase 2: The Fallout</span>
          <button class="btn btn-secondary btn-sm" onclick="window.switchView('decisions', '${unitId}')">
            <i class="fa-solid fa-arrow-left"></i> Scenario Menu
          </button>
        </div>

        <h2 style="font-size: 1.4rem; font-weight: 800; margin: 10px 0 0 0;">${g.title}</h2>
        
        <div style="border: 1px solid var(--border-glass); padding: 12px; border-radius: var(--border-radius-sm); font-size: 0.9rem; color: var(--text-muted);">
          <strong>Your Choice:</strong> ${selectedChoice.text}
        </div>

        <div style="background-color: var(--bg-app); border: 1px solid var(--border-glass); padding: 18px; border-radius: var(--border-radius-sm); margin-bottom: 20px; border-left: 4px solid var(--accent);">
          <strong>THE FALLOUT:</strong><br />
          ${selectedChoice.fallout}
        </div>

        <div class="quiz-options">
          <button class="btn btn-block btn-quiz-opt" onclick="window.playDecisionsPhase3('${g.id}', '${choiceLetter}', '1')">
            <strong>Choice ${choiceLetter}1:</strong> ${selectedChoice.choice1.text}
          </button>
          <button class="btn btn-block btn-quiz-opt" onclick="window.playDecisionsPhase3('${g.id}', '${choiceLetter}', '2')">
            <strong>Choice ${choiceLetter}2:</strong> ${selectedChoice.choice2.text}
          </button>
        </div>
      </div>
    `;
  };

  window.playDecisionsPhase3 = function(gameId, choiceLetter, subChoice) {
    const g = decisionsData.find(x => x.id === gameId);
    if (!g) return;

    const selectedChoice = choiceLetter === 'A' ? g.phase1.choiceA : g.phase1.choiceB;
    const selectedSubChoice = subChoice === '1' ? selectedChoice.choice1 : selectedChoice.choice2;

    container.innerHTML = `
      <div class="card max-w-lg mx-auto quiz-container">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
          <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--primary);">Phase 3: The Verdict</span>
          <button class="btn btn-secondary btn-sm" onclick="window.switchView('decisions', '${unitId}')">
            <i class="fa-solid fa-arrow-left"></i> Scenario Menu
          </button>
        </div>

        <h2 style="font-size: 1.4rem; font-weight: 800; margin: 10px 0 0 0;">${g.title}</h2>
        
        <div style="background-color: var(--bg-app); border: 1px solid var(--border-glass); padding: 18px; border-radius: var(--border-radius-sm); margin-bottom: 20px; border-left: 4px solid ${selectedSubChoice.isHistorical ? 'var(--primary)' : 'var(--accent)'};">
          <h4 style="margin-bottom: 8px;">${selectedSubChoice.isHistorical ? '🏆 Historical Path Followed' : '⚠️ Deviated from History'}</h4>
          ${selectedSubChoice.verdict}
        </div>

        <div style="display: flex; justify-content: space-between;">
          <button class="btn btn-secondary" onclick="window.switchView('decisions', '${unitId}')">Another Scenario</button>
          <button class="btn btn-primary" onclick="window.switchView('dashboard')">Exit Simulator</button>
        </div>
      </div>
    `;
  };

  // Render scenarios menu list
  container.innerHTML = `
    <div class="card">
      <h3 style="margin-bottom: 8px;"><i class="fa-solid fa-phone-volume text-primary"></i> Decision-Making Simulation</h3>
      <p class="text-muted" style="margin-bottom: 24px;">Put yourself in the shoes of historical figures facing critical turning points.</p>
      
      <div class="modules-grid">
        ${decisionsData.map(g => `
          <div class="module-card">
            <div class="module-header">
              <span class="category-badge">${g.series}</span>
              <i class="${g.icon}" style="color: var(--primary);"></i>
            </div>
            <h4>${g.title}</h4>
            <p style="font-size: 0.85rem;"><strong>Role:</strong> ${g.role}</p>
            <button class="btn btn-sm btn-primary w-full" onclick="window.playDecisionsScenario('${g.id}')">
              Start Simulation
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export async function renderTabooView() {
  const container = document.getElementById('main-content');
  const unitId = state.selectedUnitId || 'gcse_usa_1954_1975';
  
  let tabooCards = [];
  if (unitId === 'gcse_middle_east_1945_1995') {
    const mod = await import('./data/cme/taboo_data');
    tabooCards = mod.TABOO_CARDS;
  } else if (unitId === 'gcse_usa_1954_1975') {
    const mod = await import('./taboo_data.js');
    Object.keys(mod.TABOO_CARDS).forEach(cat => {
      mod.TABOO_CARDS[cat].forEach(card => {
        tabooCards.push({
          id: `taboo_usa_${card.target.replace(/\s+/g, '_')}`,
          topic: cat,
          target: card.target.toUpperCase(),
          taboo: card.taboo,
          hint: `Recall this key ${cat} from the GCSE USA History course.`
        });
      });
    });
  } else if (unitId === 'gcse_elizabethan_england') {
    const mod = await import('./data/elizabethan/data.js');
    const timelineData = mod.timelineData;
    let cardCount = 1;
    timelineData.forEach(topic => {
      topic.events.forEach(evt => {
        if (evt.subtitle && evt.text) {
          const target = evt.subtitle.toUpperCase();
          const taboo = [...(evt.names || []), ...(evt.stats || [])]
            .slice(0, 5)
            .map(s => s.replace(/\(.*?\)/g, '').trim())
            .filter(Boolean);
          const hint = evt.text.split('.')[0] + '.';
          if (taboo.length >= 2) {
            tabooCards.push({
              id: `taboo_eee_${cardCount++}`,
              topic: topic.title,
              target: target,
              taboo: taboo,
              hint: hint
            });
          }
        }
      });
    });
  }

  if (tabooCards.length === 0) {
    container.innerHTML = `
      <div class="card text-center">
        <h3><i class="fa-solid fa-tags"></i> Taboo Recall</h3>
        <p>No Taboo recall cards available for this unit.</p>
        <button class="btn btn-primary" onclick="window.switchView('dashboard')">Back to Dashboard</button>
      </div>
    `;
    return;
  }

  window.showTabooCard = function(index) {
    const card = tabooCards[index];
    container.innerHTML = `
      <div class="card max-w-md mx-auto text-center" style="display: flex; flex-direction: column; gap: 20px; border: 2px solid var(--primary); padding: 32px;">
        <span style="font-size: 0.8rem; text-transform: uppercase; font-weight: 700; color: var(--primary);">${card.topic}</span>
        
        <div style="background-color: var(--bg-app); border: 2px solid var(--border-glass); border-radius: var(--border-radius-md); padding: 24px; box-shadow: var(--shadow-sm);">
          <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--primary); letter-spacing: 0.5px;">${card.target}</h2>
        </div>

        <div style="border-top: 1px solid var(--border-glass); border-bottom: 1px solid var(--border-glass); padding: 18px 0;">
          <h4 style="text-transform: uppercase; font-size: 0.85rem; color: var(--accent); margin-bottom: 12px; letter-spacing: 1px;">Forbidden Taboo Words:</h4>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${card.taboo.map(w => `<span style="font-size: 1.1rem; font-weight: 700; text-decoration: line-through; opacity: 0.85;">${w}</span>`).join('')}
          </div>
        </div>

        <div id="taboo-hint-box" style="display: none; background-color: var(--bg-app); padding: 12px; border-radius: var(--border-radius-sm); font-size: 0.85rem; text-align: left;">
          <strong>Context Hint:</strong> ${card.hint}
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px;">
          <button class="btn btn-outline" id="btn-show-hint" onclick="document.getElementById('taboo-hint-box').style.display='block'; this.style.display='none';">Show Context Hint</button>
          <div style="display: flex; gap: 10px; justify-content: center; margin-top: 10px;">
            <button class="btn btn-secondary" onclick="window.switchView('dashboard')">Exit Game</button>
            <button class="btn btn-primary" onclick="window.showRandomTabooCard()">Next Card &rarr;</button>
          </div>
        </div>
      </div>
    `;
  };

  window.showRandomTabooCard = function() {
    const randomIndex = Math.floor(Math.random() * tabooCards.length);
    window.showTabooCard(randomIndex);
  };

  window.showRandomTabooCard();
}

export async function renderLessonsView() {
  const container = document.getElementById('main-content');
  const unitId = state.selectedUnitId || 'gcse_usa_1954_1975';
  const data = state.activeUnitData;

  if (!data || !data.subtopics || data.subtopics.length === 0) {
    container.innerHTML = `
      <div class="card text-center">
        <h3><i class="fa-solid fa-book-open"></i> Lessons Study Guide</h3>
        <p>No lessons available for this unit.</p>
        <button class="btn btn-primary" onclick="window.switchView('dashboard')">Back to Dashboard</button>
      </div>
    `;
    return;
  }

  window.viewLessonDetail = function(index) {
    const sub = data.subtopics[index];
    
    // Parse content lines and render beautifully
    let bodyHtml = sub.content.split('\n').map(line => {
      let l = line.trim();
      if (!l) return '';
      
      // Simple markdown conversions for textbook slides
      if (l.startsWith('- **') && l.includes('**:')) {
        return l.replace(/^-\s*\*\*(.*?)\*\*:\s*(.*)/, '<p style="margin: 8px 0; padding-left: 20px;"><strong>&bull; $1</strong>: $2</p>');
      }
      if (l.startsWith('- ')) {
        return `<p style="margin: 6px 0; padding-left: 20px;">&bull; ${l.substring(2)}</p>`;
      }
      if (l.startsWith('### ')) {
        return `<h4 style="font-size: 1.15rem; font-weight: 700; color: var(--secondary); margin: 24px 0 12px 0; border-bottom: 1px solid var(--border-glass); padding-bottom: 6px;">${l.substring(4)}</h4>`;
      }
      if (l.includes('<span class="tip-icon">')) {
        return ''; 
      }
      if (l.includes('**Examiner Tip:**')) {
        return `<div style="background-color: var(--bg-app); border-left: 4px solid var(--accent); padding: 14px; border-radius: var(--border-radius-sm); margin: 18px 0;">
          <strong>💡 Examiner Tip:</strong> ${l.replace('**Examiner Tip:**', '').replace(/\*\*/g, '').trim()}
        </div>`;
      }
      if (l.includes('📝 Source ')) {
        return `<div style="background-color: var(--bg-app); border: 1px solid var(--border-glass); border-top: 3px solid var(--primary); padding: 16px; border-radius: var(--border-radius-sm); margin: 20px 0; font-family: Georgia, serif;">
          <strong style="display: block; margin-bottom: 8px; color: var(--primary); font-family: var(--font-heading);">${l.replace(/[\*#_]/g, '')}</strong>`;
      }
      if (l.startsWith('"') && l.endsWith('"')) {
        return `<p style="font-style: italic; margin: 0; line-height: 1.5; color: var(--text-muted);">${l.replace(/"/g, '')}</p></div>`;
      }
      
      return `<p style="line-height: 1.6; margin: 12px 0;">${l.replace(/\*\*/g, '<strong>').replace(/\*\*/g, '</strong>')}</p>`;
    }).join('\n');

    container.innerHTML = `
      <div class="card max-w-2xl mx-auto" style="animation: fadeInUp 0.3s ease-out;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 16px; margin-bottom: 20px;">
          <button class="btn btn-secondary btn-sm" onclick="window.switchView('lessons', '${unitId}')">
            <i class="fa-solid fa-arrow-left"></i> Lessons Menu
          </button>
          <span style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--primary);">${data.title}</span>
        </div>

        <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--text-main); margin-bottom: 20px; line-height: 1.3;">${sub.title}</h2>
        
        <div class="lesson-content-body" style="font-size: 0.95rem; color: var(--text-main); line-height: 1.6;">
          ${bodyHtml}
        </div>

        <div style="border-top: 1px solid var(--border-glass); padding-top: 20px; margin-top: 30px; display: flex; justify-content: space-between; gap: 12px;">
          ${index > 0 ? `<button class="btn btn-secondary" onclick="window.viewLessonDetail(${index - 1})">&larr; Previous Lesson</button>` : '<span></span>'}
          ${index < data.subtopics.length - 1 ? `<button class="btn btn-primary" onclick="window.viewLessonDetail(${index + 1})">Next Lesson &rarr;</button>` : `<button class="btn btn-primary" onclick="window.switchView('interactive', '${unitId}')">Take Lesson Quiz &rarr;</button>`}
        </div>
      </div>
    `;
  };

  container.innerHTML = `
    <div class="card" style="animation: fadeInUp 0.3s ease-out;">
      <h3 style="margin-bottom: 8px;"><i class="fa-solid fa-book-open text-primary"></i> ${data.title} - Study Guide</h3>
      <p class="text-muted" style="margin-bottom: 24px;">Read through the core steps, historical sources, and examiner tips for each lesson before testing yourself.</p>
      
      <div class="modules-grid">
        ${data.subtopics.map((sub, idx) => {
          const descLine = sub.content.split('\n').find(line => line.trim().length > 30 && !line.includes('#') && !line.includes('*') && !line.includes('<')) || 'Study this historical topic.';
          return `
            <div class="module-card" style="cursor: pointer;" onclick="window.viewLessonDetail(${idx})">
              <div class="module-header">
                <span class="category-badge">Lesson ${idx + 1}</span>
                <i class="fa-solid fa-book-open" style="color: var(--primary);"></i>
              </div>
              <h4 style="margin: 10px 0;">${sub.title}</h4>
              <p style="font-size: 0.85rem; line-height: 1.4; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                ${descLine}
              </p>
              <button class="btn btn-sm btn-primary w-full" style="margin-top: 12px;">
                Read Lesson
              </button>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

