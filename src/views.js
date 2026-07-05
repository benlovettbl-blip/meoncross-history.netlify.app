/**
 * Views Renderer for Meoncross History Mega App
 * Handles rendering the Dashboard, Interactive Quizzes, Timelines, Printable Booklets, and Student Profiles.
 */

import { state } from './state.js';
import { getProfile, setMockUser } from './auth.js';
import { getMasteryStatus, updateLeitnerBox, toggleBookmark, saveProgress } from './storage.js';

// Unit Definitions & Target Year Groups
export const UNITS = [
  { id: 'norman_conquest', title: 'The Norman Conquest (1066)', category: 'Key Stage 3', yearGroup: 'Year 7', desc: 'Enquiry into the succession crisis, battles of 1066, and Norman control.' },
  { id: 'change_1450_1750', title: 'Change from 1450-1750', category: 'Key Stage 3', yearGroup: 'Year 8', desc: 'Exploring the Renaissance, Reformation, Civil War, and Scientific Revolution.' },
  { id: 'great_war', title: 'The Great War (1914-1918)', category: 'Key Stage 3', yearGroup: 'Year 9', desc: 'Enquiry into the causes, trench warfare, and global impact of WWI.' },
  { id: 'gcse_usa_1954_1975', title: 'GCSE: USA (1954-1975)', category: 'Edexcel GCSE', yearGroup: 'GCSE', desc: 'Conflict at home and abroad: Civil Rights Movement and Vietnam War.' },
  { id: 'gcse_middle_east_1945_1995', title: 'GCSE: Conflict in the Middle East (1945-1995)', category: 'Edexcel GCSE', yearGroup: 'GCSE', desc: 'The birth of Israel, Suez Crisis, Six-Day War, Yom Kippur War, and peace process.' },
  { id: 'gcse_elizabethan_england', title: 'GCSE: Early Elizabethan England (1558-1588)', category: 'Edexcel GCSE', yearGroup: 'GCSE', desc: 'Queen, government, religion, challenges at home/abroad, and Elizabethan society.' }
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

  UNITS.forEach(unit => {
    const isUnlocked = !profile || profile.yearGroup === 'Admin' || unit.yearGroup === profile.yearGroup;
    
    html += `
      <div class="module-card ${isUnlocked ? '' : 'locked'}">
        <div class="module-header">
          <span class="category-badge">${unit.category}</span>
          <span class="year-badge">${unit.yearGroup}</span>
        </div>
        <h4>${unit.title}</h4>
        <p>${unit.desc}</p>
        
        ${isUnlocked ? `
          <div class="module-actions">
            <button class="btn btn-sm btn-primary" onclick="window.switchView('interactive', '${unit.id}')">
              <i class="fa-solid fa-gamepad"></i> Interactive Study
            </button>
            <button class="btn btn-sm btn-secondary" onclick="window.switchView('timeline', '${unit.id}')">
              <i class="fa-solid fa-timeline"></i> Timeline
            </button>
            <button class="btn btn-sm btn-outline" onclick="window.switchView('booklet', '${unit.id}')">
              <i class="fa-solid fa-print"></i> PDF/A4 Booklet
            </button>
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
      <p class="text-muted">Simulated tenant environment: <strong>meoncross.co.uk</strong></p>
      
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
        <span class="school-title">MEONCROSS SCHOOL HISTORY DEPT</span>
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
