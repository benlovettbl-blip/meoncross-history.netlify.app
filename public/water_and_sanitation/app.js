// State Management
const appState = {
  currentTab: "lessonsSection",
  theme: localStorage.getItem("was_theme") || "light",
  userXP: Number(localStorage.getItem("was_user_xp")) || 0,
  timelineFilter: "all",
  timelineSearchQuery: "",
  timelineSortMode: "topic",
  isSimplifiedActive: false,
  activeLesson: 1
};

// 1. Navigation Control
function setupNavigation() {
  const tabs = document.querySelectorAll(".nav-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      
      const target = tab.getAttribute("data-target");
      appState.currentTab = target;
      
      const contents = document.querySelectorAll(".tab-content");
      contents.forEach(c => c.classList.remove("active"));
      
      const targetEl = document.getElementById(target);
      if (targetEl) targetEl.classList.add("active");
      
      // Stop read aloud when switching tabs
      if (readAloudState.isSpeaking) {
        window.speechSynthesis.cancel();
        readAloudState.isSpeaking = false;
        const btn = document.getElementById("readAloudBtn");
        if (btn) {
          btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Listen';
          btn.style.background = 'rgba(var(--primary-rgb), 0.05)';
        }
        readAloudState.blocks.forEach(b => {
          b.style.background = 'transparent';
          b.style.boxShadow = 'none';
        });
      }
      
      // Refresh worksheets preview if worksheets tab opened
      if (target === "worksheetsSection") {
        window.updateWorksheetPreview();
      }
      if (target === "tradingCardsSection" || target === "target" || target === "tradingSection") {
        window.renderTradingCards();
      }
    });
  });
}

// 2. Text Simplifier
window.toggleSimplifyText = function(event) {
  const btn = event.currentTarget || document.getElementById('simplifyTextBtn');
  if (!btn) return;
  const parent = btn.closest('.lesson-content-block');
  if (!parent) return;
  const standardBlock = parent.querySelector('.standard-narrative-block');
  const simplifiedBlock = parent.querySelector('.simplified-narrative-block');
  if (!standardBlock || !simplifiedBlock) return;

  const isSimplifiedActive = (standardBlock.style.display !== 'none');

  if (isSimplifiedActive) {
    standardBlock.style.display = 'none';
    simplifiedBlock.style.display = 'block';
    btn.innerHTML = '<i class="fa-solid fa-expand"></i> Standard Text';
    btn.style.background = 'rgba(var(--primary-rgb), 0.12)';
  } else {
    standardBlock.style.display = 'block';
    simplifiedBlock.style.display = 'none';
    btn.innerHTML = '<i class="fa-solid fa-compress"></i> Simplify Text';
    btn.style.background = 'rgba(var(--primary-rgb), 0.05)';
  }

  if (readAloudState.isSpeaking) {
    window.speechSynthesis.cancel();
    readAloudState.isSpeaking = false;
    const readBtn = parent.querySelector('.read-aloud-btn') || document.getElementById('readAloudBtn');
    if (readBtn) {
      readBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Listen';
      readBtn.style.background = 'rgba(var(--primary-rgb), 0.05)';
    }
  }
};

window.toggleLessonSentenceStarters = function(event) {
  const btn = event.currentTarget;
  const parent = btn.closest('.knowledge-card') || btn.closest('.tab-content') || document;
  const starters = parent.querySelectorAll('.sentence-starter-inline');
  const modelAnswers = parent.querySelectorAll('.model-answer-inline');
  
  const anyVisible = Array.from(starters).some(el => el.style.display !== 'none');
  starters.forEach(el => {
    el.style.display = anyVisible ? 'none' : 'block';
  });
  
  if (!anyVisible) {
    modelAnswers.forEach(el => {
      el.style.display = 'none';
    });
    const modelBtn = parent.querySelector('.model-answers-toggle-btn');
    if (modelBtn) {
      modelBtn.innerHTML = '<i class="fa-solid fa-check-double"></i> Model Answers';
      modelBtn.style.background = 'rgba(var(--primary-rgb), 0.05)';
    }
  }

  if (anyVisible) {
    btn.innerHTML = '<i class="fa-solid fa-pen-clip"></i> Sentence Starters';
    btn.style.background = 'rgba(var(--primary-rgb), 0.05)';
  } else {
    btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Hide Starters';
    btn.style.background = 'rgba(var(--primary-rgb), 0.12)';
  }
};

window.toggleLessonModelAnswersInline = function(event) {
  const btn = event.currentTarget;
  const parent = btn.closest('.knowledge-card') || btn.closest('.tab-content') || document;
  const starters = parent.querySelectorAll('.sentence-starter-inline');
  const modelAnswers = parent.querySelectorAll('.model-answer-inline');
  
  const anyVisible = Array.from(modelAnswers).some(el => el.style.display !== 'none');
  modelAnswers.forEach(el => {
    el.style.display = anyVisible ? 'none' : 'block';
  });
  
  if (!anyVisible) {
    starters.forEach(el => {
      el.style.display = 'none';
    });
    const startersBtn = parent.querySelector('.sentence-starters-toggle-btn');
    if (startersBtn) {
      startersBtn.innerHTML = '<i class="fa-solid fa-pen-clip"></i> Sentence Starters';
      startersBtn.style.background = 'rgba(var(--primary-rgb), 0.05)';
    }
  }

  if (anyVisible) {
    btn.innerHTML = '<i class="fa-solid fa-check-double"></i> Model Answers';
    btn.style.background = 'rgba(var(--primary-rgb), 0.05)';
  } else {
    btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Hide Answers';
    btn.style.background = 'rgba(var(--primary-rgb), 0.12)';
  }
};

// 3. Audio Narration (Text-to-Speech)
let readAloudState = {
  isSpeaking: false,
  currentIndex: 0,
  blocks: []
};

window.toggleReadAloud = function(event) {
  const btn = event.currentTarget || document.getElementById('readAloudBtn');
  if (!btn) return;
  const parent = btn.closest('.lesson-content-block');
  if (!parent) return;
  
  if (readAloudState.isSpeaking) {
    window.speechSynthesis.cancel();
    readAloudState.isSpeaking = false;
    btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Listen';
    btn.style.background = 'rgba(var(--primary-rgb), 0.05)';
    
    readAloudState.blocks.forEach(block => {
      block.style.background = 'transparent';
      block.style.boxShadow = 'none';
    });
  } else {
    const standardBlock = parent.querySelector('.standard-narrative-block');
    const simplifiedBlock = parent.querySelector('.simplified-narrative-block');
    const isSimplifiedActive = (standardBlock && standardBlock.style.display === 'none' && simplifiedBlock && simplifiedBlock.style.display === 'block');
    const container = isSimplifiedActive ? simplifiedBlock : standardBlock;
    if (!container) return;
    
    readAloudState.blocks = Array.from(container.querySelectorAll('.narrative-para-block'));
    if (readAloudState.blocks.length === 0) return;
    
    readAloudState.isSpeaking = true;
    readAloudState.currentIndex = 0;
    btn.innerHTML = '<i class="fa-solid fa-circle-stop"></i> Stop';
    btn.style.background = 'rgba(239, 68, 68, 0.1)';
    
    speakCurrentBlock(btn);
  }
};

function speakCurrentBlock(btn) {
  if (!readAloudState.isSpeaking || readAloudState.currentIndex >= readAloudState.blocks.length) {
    readAloudState.isSpeaking = false;
    if (btn) {
      btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Listen';
      btn.style.background = 'rgba(var(--primary-rgb), 0.05)';
    }
    readAloudState.blocks.forEach(block => {
      block.style.background = 'transparent';
      block.style.boxShadow = 'none';
    });
    return;
  }
  
  readAloudState.blocks.forEach((block, idx) => {
    if (idx === readAloudState.currentIndex) {
      block.style.background = 'rgba(234, 179, 8, 0.12)';
      block.style.boxShadow = '0 0 0 4px rgba(234, 179, 8, 0.05)';
      block.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      block.style.background = 'transparent';
      block.style.boxShadow = 'none';
    }
  });
  
  const textToSpeak = readAloudState.blocks[readAloudState.currentIndex].textContent;
  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => 
    v.name.includes('Google US English') || 
    v.name.includes('Google UK English Female') || 
    v.name.includes('Microsoft Zira') || 
    v.name.toLowerCase().includes('female')
  );
  if (preferredVoice) utterance.voice = preferredVoice;
  
  utterance.onend = function() {
    readAloudState.currentIndex++;
    speakCurrentBlock(btn);
  };
  
  utterance.onerror = function() {
    readAloudState.isSpeaking = false;
    btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Listen';
    btn.style.background = 'rgba(var(--primary-rgb), 0.05)';
    readAloudState.blocks.forEach(block => {
      block.style.background = 'transparent';
      block.style.boxShadow = 'none';
    });
  };
  
  window.speechSynthesis.speak(utterance);
}

let quickQuizState = {
  currentQuestionIndex: 0,
  selectedAnswer: null,
  isSubmitted: false,
  correctAnswersCount: 0
};

window.selectQuickQuizOption = function(optIdx) {
  if (quickQuizState.isSubmitted) return;
  quickQuizState.selectedAnswer = optIdx;
  quickQuizState.isSubmitted = true;
  
  const activeBlock = document.querySelector('.lesson-content-block[style*="display: block"]') || document.querySelector('.lesson-content-block:not([style*="display: none"])');
  const lessonQuestions = quizData.slice((appState.activeLesson - 1) * 5, appState.activeLesson * 5);
  const q = lessonQuestions[quickQuizState.currentQuestionIndex];
  if (!q) return;
  
  const options = [q.answer, ...q.distractors];
  const selectedText = options[optIdx];
  const isCorrect = (selectedText === q.answer);
  
  // Highlight buttons
  const optionBtns = activeBlock ? activeBlock.querySelectorAll('.quick-quiz-option-btn') : document.querySelectorAll('.quick-quiz-option-btn');
  optionBtns.forEach((btn, idx) => {
    const btnText = options[idx];
    if (btnText === q.answer) {
      btn.style.borderColor = 'var(--success)';
      btn.style.background = 'rgba(16, 185, 129, 0.08)';
      btn.style.color = '#15803d';
      btn.style.fontWeight = '700';
    } else if (idx === optIdx) {
      btn.style.borderColor = 'var(--error)';
      btn.style.background = 'rgba(239, 68, 68, 0.08)';
      btn.style.color = '#b91c1c';
      btn.style.fontWeight = '700';
    } else {
      btn.style.opacity = '0.5';
    }
  });
  
  if (feedbackBlock) {
    feedbackBlock.style.display = 'block';
    if (isCorrect) {
      quickQuizState.correctAnswersCount = (quickQuizState.correctAnswersCount || 0) + 1;
      feedbackBlock.style.borderColor = 'var(--success)';
      feedbackBlock.style.background = 'rgba(16, 185, 129, 0.04)';
      feedbackBlock.innerHTML = `<span style="color: var(--success); font-weight: 800;">✓ Correct!</span><p style="margin: 4px 0 0 0; font-size: 0.85rem;">${q.explanation}</p>`;
      
      appState.userXP += 50;
      localStorage.setItem("was_user_xp", appState.userXP);
      updateXPBadge();
      if (window.renderTradingCards) window.renderTradingCards();
      
      // Auto-forward after 1.5s
      setTimeout(() => {
        if (quickQuizState.currentQuestionIndex < lessonQuestions.length - 1) {
          window.nextQuickQuizQuestion();
        } else {
          // Show quiz completed
          const submitBtn = activeBlock ? activeBlock.querySelector('.quick-quiz-submit-btn') : document.getElementById('quickQuizSubmitBtn');
          if (submitBtn) {
            submitBtn.style.display = 'block';
            submitBtn.innerHTML = 'Quiz Completed! 🎉';
            submitBtn.disabled = true;
          }
          
          // Check if they got at least 3 correct
          const score = quickQuizState.correctAnswersCount || 0;
          if (score >= 3) {
            window.unlockRandomTradingCardForEra(appState.activeLesson);
          } else {
            alert(`Quiz completed. You scored ${score} out of 5. Try again to get 3+ correct and unlock a trading card!`);
          }
        }
      }, 1500);
      
    } else {
      feedbackBlock.style.borderColor = 'var(--error)';
      feedbackBlock.style.background = 'rgba(239, 68, 68, 0.04)';
      feedbackBlock.innerHTML = `<span style="color: var(--error); font-weight: 800;">✗ Incorrect.</span><p style="margin: 4px 0 0 0; font-size: 0.85rem;">The correct answer is: <strong>${q.answer}</strong>.<br>${q.explanation}</p>`;
      
      // Show next button to manually proceed since they got it wrong
      const submitBtn = activeBlock ? activeBlock.querySelector('.quick-quiz-submit-btn') : document.getElementById('quickQuizSubmitBtn');
      if (submitBtn) {
        submitBtn.style.display = 'block';
        submitBtn.disabled = false;
        if (quickQuizState.currentQuestionIndex < lessonQuestions.length - 1) {
          submitBtn.innerHTML = 'Next Question <i class="fa-solid fa-arrow-right"></i>';
          submitBtn.setAttribute('onclick', 'window.nextQuickQuizQuestion()');
        } else {
          submitBtn.innerHTML = 'Quiz Completed! 🎉';
          submitBtn.disabled = false;
          submitBtn.setAttribute('onclick', `window.finishQuizAndCheckUnlock(${appState.activeLesson})`);
        }
      }
    }
  }
};

window.submitQuickQuizAnswer = function() {
  // Deprecated - handled on-click in selectQuickQuizOption
};

window.nextQuickQuizQuestion = function() {
  quickQuizState.currentQuestionIndex++;
  quickQuizState.selectedAnswer = null;
  quickQuizState.isSubmitted = false;
  window.renderLessonQuickQuiz();
};

window.renderLessonQuickQuiz = function() {
  const container = document.querySelector('.lesson-content-block[style*="display: block"] .quick-quiz-question-container') || document.querySelector('.lesson-content-block:not([style*="display: none"]) .quick-quiz-question-container') || document.getElementById('quickQuizQuestionContainer');
  if (!container) return;
  
  const lessonQuestions = quizData.slice((appState.activeLesson - 1) * 5, appState.activeLesson * 5);
  if (lessonQuestions.length === 0) {
    container.innerHTML = `<p style="font-style: italic; color: var(--text-muted); text-align: center; margin: 1.5rem 0;">✏️ Quiz questions coming soon! Feed the quiz data when ready.</p>`;
    return;
  }
  
  const q = lessonQuestions[quickQuizState.currentQuestionIndex];
  if (!q) return;
  
  const options = [q.answer, ...q.distractors];
  
  let optionsHtml = '';
  options.forEach((opt, idx) => {
    optionsHtml += `<button class="quick-quiz-option-btn" onclick="window.selectQuickQuizOption(${idx})" style="display: block; width: 100%; text-align: left; padding: 10px 14px; margin-bottom: 8px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); background: var(--bg-surface); font-family: var(--font-body); font-size: 0.9rem; cursor: pointer; transition: all 0.2s;">
      ${opt}
    </button>`;
  });
  
  container.innerHTML = `
    <div style="font-size: 0.95rem; font-weight: 700; margin-bottom: 12px; font-family: var(--font-title);">
      Question ${quickQuizState.currentQuestionIndex + 1} of ${lessonQuestions.length}:
      <span style="font-weight: 500; font-family: var(--font-body); display: block; margin-top: 6px;">${q.question}</span>
    </div>
    
    <div style="margin-bottom: 16px;">
      ${optionsHtml}
    </div>
    
    <div class="quick-quiz-feedback" style="display: none; padding: 10px 14px; border-left: 4px solid; border-radius: var(--radius-sm); margin-bottom: 16px; font-family: var(--font-body);"></div>
    
    <button class="btn btn-primary quick-quiz-submit-btn" onclick="window.submitQuickQuizAnswer()" disabled style="width: 100%; display: none;">
      Submit Answer
    </button>`;
};

// Meoncross History Brand Quotes Configuration
const brandQuotes = {
  1: [
    "Meoncross History: Recall the structure of Roman baths and aqueducts.",
    "Revision Check: Why did public health decline after the Romans left Britain?"
  ],
  2: [
    "Meoncross History: Remember the difference between gongfermors and water sellers.",
    "Revision Check: How did medieval towns attempt to regulate waste and cleanliness?"
  ],
  3: [
    "Meoncross History: Sir John Harington invented the first flushing toilet in 1596.",
    "Revision Check: How did population growth in early modern towns affect sanitation?"
  ],
  4: [
    "Meoncross History: Learn about the impact of the 1848 Public Health Act.",
    "Revision Check: How did Edwin Chadwick's report link disease and poverty?"
  ],
  5: [
    "Meoncross History: Joseph Bazalgette designed London's massive sewer network.",
    "Revision Check: How did the Great Stink of 1858 force Parliament to act?"
  ]
};

let currentQuoteIndex = 0;
let currentQuoteLesson = 1;

window.updateChimneyQuoteForLesson = function(lessonNum) {
  currentQuoteLesson = lessonNum;
  currentQuoteIndex = 0;
  const quotes = brandQuotes[lessonNum] || brandQuotes[1];
  const quoteTextEl = document.getElementById("header-brand-quote-text");
  if (quoteTextEl) {
    quoteTextEl.textContent = quotes[currentQuoteIndex];
  }
};

window.cycleBrandQuote = function() {
  const quotes = brandQuotes[currentQuoteLesson] || brandQuotes[1];
  currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  const quoteTextEl = document.getElementById("header-brand-quote-text");
  if (quoteTextEl) {
    quoteTextEl.textContent = quotes[currentQuoteIndex];
  }
};

// 5. XP Widget
function updateXPBadge() {
  const xpBadge = document.getElementById("xpBadge");
  const xpText = document.getElementById("xpText");
  const xp = appState.userXP;
  if (xpText) xpText.innerText = `${xp} XP`;
  
  let title = "Peasant";
  if (xp >= 200) title = "Lord of the Conduits";
  else if (xp >= 100) title = "Roman Engineer";
  else if (xp >= 50) title = "Cesspit Digger";
  
  if (xpBadge) xpBadge.innerText = title;
}

// 6. Timeline Rendering
function setupTimeline() {
  renderTimeline();
  
  const filters = document.querySelectorAll(".filter-tag");
  filters.forEach(btn => {
    btn.addEventListener("click", () => {
      filters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      appState.timelineFilter = btn.getAttribute("data-filter");
      renderTimeline();
    });
  });
  
  const search = document.getElementById("timelineSearch");
  if (search) {
    search.addEventListener("input", (e) => {
      appState.timelineSearchQuery = e.target.value.toLowerCase();
      renderTimeline();
    });
  }
}

function renderTimeline() {
  const listEl = document.getElementById("timelineList");
  if (!listEl) return;
  listEl.innerHTML = "";
  
  const events = timelineData.flatMap(lesson => lesson.events);
  const filtered = events.filter(evt => {
    const matchesFilter = appState.timelineFilter === "all" || evt.tags.includes(appState.timelineFilter);
    const matchesSearch = evt.subtitle.toLowerCase().includes(appState.timelineSearchQuery) || 
                          evt.text.toLowerCase().includes(appState.timelineSearchQuery);
    return matchesFilter && matchesSearch;
  });
  
  if (filtered.length === 0) {
    listEl.innerHTML = `<div style="text-align: center; padding: 2rem; color: var(--text-muted);">No events match your criteria.</div>`;
    return;
  }
  
  filtered.forEach(evt => {
    const card = document.createElement("div");
    card.className = "timeline-card";
    card.innerHTML = `
      <div style="font-weight: 800; font-family: var(--font-title); color: var(--primary); margin-bottom: 0.35rem; font-size: 1.1rem;">
        ${evt.dates[0]} — ${evt.subtitle}
      </div>
      <p style="font-size: 0.9rem; line-height: 1.6; color: var(--text-main); margin: 0 0 0.75rem 0;">
        ${evt.text}
      </p>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        ${evt.tags.map(t => `<span class="badge badge-secondary">${t}</span>`).join("")}
      </div>
    `;
    listEl.appendChild(card);
  });
}

// 7. Figures Modal
window.showFigureModal = function(name) {
  const modal = document.getElementById("figureModal");
  const modalName = document.getElementById("figureModalName");
  const modalBody = document.getElementById("figureModalBody");
  
  if (!modal || !modalName || !modalBody) return;
  
  let content = "";
  if (name === "About Unit") {
    content = "Welcome to the 'Water and Sanitation Through Time' KS3 History Study Unit. This interactive learning dashboard guides you through 2,000 years of British public health history, from the Iron Age to the Victorian sanitation revolution and Bazalgette's sewers. Explore lessons, complete the interactive timeline, test yourself with quick quizzes to earn XP ranks, or compile and print the complete 31-page study booklet pack.";
  } else if (name === "Seneca the Younger") {
    content = "Seneca the Younger (c. 4 BC - AD 65) was a famous Roman philosopher and statesman. In his letters, he complained vividly about the noise and crowds of the public baths, proving they were social hubs.";
  } else if (name === "Roman Engineers") {
    content = "Roman engineers were master builders who transformed sanitation. They used the natural pull of gravity to transport fresh spring water over miles through stone conduits, built grand public bathhouses, and constructed flushing latrine sewers in cities and military garrisons.";
  } else if (name === "Iron Age Britons") {
    content = "Before the Roman invasion of AD 43, Iron Age farming communities lived in wood-and-thatch roundhouses. Because settlements were small and spread out, they relied on natural wells or fresh springs for water, and dug simple cesspits to collect household waste.";
  } else if (name === "Christian Monks") {
    content = "Christian monks in medieval monasteries designed advanced water systems using expensive lead and wooden pipes. They believed cleanliness brought them closer to God, using spring water for drinking and waste water to flush latrines.";
  } else if (name === "Gongfermers") {
    content = "Gongfermers were specialized laborers hired in medieval towns to clear human waste from cesspits. They worked strictly under cover of darkness (between 9 PM and 5 AM) to keep their smelly, hazardous work from disrupting the streets.";
  } else if (name === "King Edward III") {
    content = "Edward III was the King of England who famously sent a sanitation mandate letter to the Mayor of London in 1357, warning that street filth was infecting the air and causing deadly sickness, prompting clean-up efforts.";
  } else if (name === "Sir John Harington") {
    content = "Sir John Harington was a prominent Elizabethan courtier who invented the first flushing water closet in 1596 for his godmother, Queen Elizabeth I. However, it failed to catch on due to the lack of running water and street sewer networks.";
  } else if (name === "Samuel Pepys") {
    content = "Samuel Pepys was a government official and famous diarist. In 1660, he wrote about the disgusting state of London sanitation when his neighbor's cellar privy leaked directly through the walls, flooding his own basement with waste.";
  } else if (name === "Edwin Chadwick") {
    content = "Edwin Chadwick was a social reformer who published a landmark sanitation report in 1842. He argued that filth and overcrowded housing caused disease, and that providing clean water and sewers would improve public health and reduce poverty.";
  } else if (name === "Dr. John Snow") {
    content = "Dr. John Snow was a pioneering doctor who proved that cholera was spread by contaminated water during the 1854 Soho outbreak. By mapping deaths and removing the handle of the Broad Street pump, he stopped the spread and saved lives.";
  } else if (name === "Joseph Bazalgette") {
    content = "Joseph Bazalgette was the chief engineer of London's Metropolitan Board of Works. Between 1858 and 1865, he designed and constructed 1,300 miles of underground brick sewers, solving the Great Stink and saving thousands of lives.";
  } else if (name === "Louis Pasteur") {
    content = "Louis Pasteur was a French chemist who proved the Germ Theory of disease in 1860. By showing that microscopic organisms cause illness rather than bad smells (miasma), he laid the scientific foundation for clean water laws.";
  }
  
  modalName.innerText = name;
  modalBody.innerText = content;
  modal.style.display = "flex";
};

window.closeFigureModal = function() {
  const modal = document.getElementById("figureModal");
  if (modal) modal.style.display = "none";
};

window.toggleFiguresDirectory = function() {
  const content = document.getElementById("figuresDirectoryContent");
  const icon = document.getElementById("directoryToggleIcon");
  if (!content || !icon) return;
  
  if (content.style.display === "none") {
    content.style.display = "block";
    icon.innerText = "Hide Directory [Collapse]";
  } else {
    content.style.display = "none";
    icon.innerText = "Show Directory [Expand]";
  }
};

// 8. Worksheets Pack Generator
let parsedMarkdownData = null;

async function loadLessonMarkdown() {
  try {
    const response = await fetch('/content/ks3/water_and_sanitation.md');
    if (!response.ok) throw new Error('Failed to fetch markdown file');
    const text = await response.text();
    
    // Parse Do Now
    const doNow = [];
    const doNowRegex = /-\s+\*\*Q(\d+):\*\*\s+(.*?)\s+->\s+(.*)/g;
    const doNowSectionIndex = text.indexOf('### Do Now Retrieval Grid');
    const vocabSectionIndex = text.indexOf('### Vocabulary');
    if (doNowSectionIndex !== -1 && vocabSectionIndex !== -1) {
      const doNowText = text.substring(doNowSectionIndex, vocabSectionIndex);
      let match;
      while ((match = doNowRegex.exec(doNowText)) !== null) {
        doNow.push({
          num: match[1],
          question: match[2].trim(),
          answer: match[3].trim()
        });
      }
    }
    
    // Parse Vocabulary
    const vocab = [];
    const vocabRegex = /-\s+\*\*(.*?)\*\*:\s+(.*)/g;
    const vocabIdx = text.indexOf('### Vocabulary');
    const nextSectionIndex = text.indexOf('### Pupil Activities');
    if (vocabIdx !== -1 && nextSectionIndex !== -1) {
      const vocabText = text.substring(vocabIdx, nextSectionIndex);
      let vMatch;
      while ((vMatch = vocabRegex.exec(vocabText)) !== null) {
        vocab.push({
          word: vMatch[1].trim(),
          definition: vMatch[2].trim()
        });
      }
    }
    
    // Parse Pupil Activities
    const activities = [];
    const actRegex = /-\s+\*\*Q(\d+):\*\*\s+(.*?)\s+->\s+(.*)/g;
    const actSectionIndex = text.indexOf('### Pupil Activities');
    const retrievalSectionIndex = text.indexOf('### Retrieval Questions');
    if (actSectionIndex !== -1 && retrievalSectionIndex !== -1) {
      const actText = text.substring(actSectionIndex, retrievalSectionIndex);
      let aMatch;
      while ((aMatch = actRegex.exec(actText)) !== null) {
        activities.push({
          num: aMatch[1],
          question: aMatch[2].trim(),
          answer: aMatch[3].trim()
        });
      }
    }

    // Parse Core Narrative
    const paragraphs = [];
    const startIdx = text.indexOf('## 1.1 Prehistoric and Roman Sanitation');
    const endIdx = text.indexOf('> "I am surrounded');
    if (startIdx !== -1 && endIdx !== -1) {
      const narrativeText = text.substring(startIdx + '## 1.1 Prehistoric and Roman Sanitation'.length, endIdx).trim();
      const paras = narrativeText.split('\n\n');
      paras.forEach(p => {
        if (p.trim()) paragraphs.push(p.trim().replace(/\s+/g, ' '));
      });
    }

    // Parse Seneca Quote
    let senecaQuote = '';
    let senecaCite = '';
    const quoteStart = text.indexOf('> "I am surrounded');
    const quoteEnd = text.indexOf('### Do Now Retrieval Grid');
    if (quoteStart !== -1 && quoteEnd !== -1) {
      const quoteText = text.substring(quoteStart, quoteEnd).trim();
      const lines = quoteText.split('\n');
      lines.forEach(l => {
        if (l.trim().startsWith('> "') || l.trim().startsWith('>  "')) {
          senecaQuote = l.replace(/^>\s*"/, '').replace(/"\s*$/, '').trim();
        } else if (l.trim().includes('Seneca the Younger')) {
          senecaCite = l.replace(/^>\s*[—-]\s*/, '').replace(/\*/g, '').trim();
        }
      });
    }

    parsedMarkdownData = { doNow, vocab, activities, paragraphs, senecaQuote, senecaCite };
  } catch (err) {
    console.error('Error loading or parsing markdown:', err);
    // Fallback data
    parsedMarkdownData = {
      doNow: [
        { num: '1', question: 'What does the term chronology mean when we study history?', answer: 'Chronology is the arrangement of historical events in the exact order in which they occurred over time.' },
        { num: '2', question: 'What is the difference between BC and AD on a timeline?', answer: 'BC stands for "Before Christ" (counting backward from year 1), while AD stands for "Anno Domini" (in the year of our Lord, counting forward).' },
        { num: '3', question: 'If an archaeologist uncovers a Roman coin buried in a field, is it a primary source or a secondary source?', answer: 'It is a primary source because it is a physical artifact created during the actual time period under study.' },
        { num: '4', question: 'What is the name given to a professional historical detective who digs up and analyzes physical remains from the past?', answer: 'An archaeologist.' },
        { num: '5', question: 'Put these three eras in the correct chronological order, starting with the oldest: Victorian Britain, Iron Age Britain, Roman Britain.', answer: '1. Iron Age Britain, 2. Roman Britain, 3. Victorian Britain.' }
      ],
      vocab: [
        { word: 'Cesspit', definition: 'A simple hole dug in the earth used by prehistoric and later societies to collect household sewage and human waste.' },
        { word: 'Conduit', definition: 'A stone channel or pipe designed by Roman engineers to transport clean water over long distances using gravity.' },
        { word: 'Latrine', definition: 'A communal Roman public toilet block, often flushed continuously by running water to carry waste into underground sewers.' }
      ],
      paragraphs: [
        "It is easy to assume that people in the past did not care about cleanliness, but Iron Age communities developed highly practical systems that suited their way of life. Because farming roundhouses were spread out across the countryside, digging simple, temporary cesspits was a safe, hygienic, and sustainable way to manage waste without polluting nearby drinking water.",
        "This simple way of life was completely transformed in AD 43 when the Roman Empire invaded Britain. The Romans brought revolutionary sanitation technology and a strong belief that clean, flowing water was vital for keeping a society healthy. To bring vast amounts of clean water into their newly built stone towns and military outposts, such as Corbridge, Roman engineers constructed stone channels called conduits. These conduits used the natural pull of gravity to transport fresh water over miles from distant natural springs directly into urban centres.",
        "In Roman Britain, this water supplied grand public bathhouses, such as the famous complex at Bearsden. Bathhouses were bustling social spaces where citizens exercised, relaxed, and washed themselves by walking in sequence through cold rooms, warm rooms, and steaming hot chambers.",
        "Clean water also constantly flushed through communal public toilets, known as latrines. At Housesteads Fort on Hadrian's Wall, soldiers sat side-by-side on stone benches built over deep, stone-lined channels. A continuous stream of water beneath the seats swept human waste directly into underground sewers, keeping the fort clean and preventing the spread of deadly diseases. When the Romans left Britain around AD 410, this advanced engineering was abandoned, and sanitation slipped back into primitive patterns."
      ],
      senecaQuote: "I am surrounded by all kinds of noise... picture to yourself the assortment of sounds, which are strong enough to make me hate my very powers of hearing! When the gentlemen are exercising with their lead weights... I hear their groans... and next, hear the screech of a hair-plucker... and the various cries of the sausage-seller, the baker, and the sweet-seller...",
      senecaCite: "Seneca the Younger, Roman Philosopher, Letters to Lucilius, Letter 56, c. AD 62",
      activities: [
        { num: '1', question: 'Where did Iron Age families get their fresh water, and how did they dispose of their waste?', answer: 'Iron Age families collected their water from natural springs, streams, or hand-dug wells, and they disposed of their waste by digging simple cesspits in the ground, which were buried with soil when full.' },
        { num: '2', question: 'What was a Roman conduit, and how did it work?', answer: 'A Roman conduit was a stone-built channel designed to carry clean water over long distances into towns, utilizing the natural pull of gravity to move the water.' },
        { num: '3', question: 'Describe the different rooms inside a Roman public bathhouse like the one at Bearsden.', answer: 'A Roman bathhouse contained a sequence of rooms with different temperatures that bathers walked through, including unheated cold rooms, warm rooms for relaxing, and steaming hot rooms for washing.' },
        { num: '4', question: 'How did communal Roman latrines keep soldiers clean and healthy?', answer: 'Roman latrines used a continuous stream of running water underneath the seating benches to flush sewage into deep sewers, which swept the filth away and stopped diseases from spreading in crowded forts.' },
        { num: '5', question: 'Explain why the Roman invasion of AD 43 was the main cause of change for sanitation in Britain.', answer: 'The Roman invasion of AD 43 was the main cause of change because the Romans brought highly advanced engineering skills, such as building stone conduits and flushing sewers, which did not exist in Iron Age Britain and completely changed how water and waste were managed.' },
        { num: '6', question: 'Did the arrival of Roman sanitation benefit all people in Britain equally?', answer: 'No, Roman sanitation did not benefit everyone equally. While wealthy town-dwellers and Roman soldiers enjoyed the luxury of flushing public latrines and gravity-fed bathhouses, ordinary British peasants in the countryside experienced absolute continuity, continuing to rely on simple wells and earth cesspits just as their ancestors had done for centuries.' },
        { num: '7', question: 'Why is archaeology more significant for historians studying the Iron Age compared to those studying Roman Britain?', answer: 'Archaeology is incredibly significant for studying the Iron Age because there are no written documents from that period, making physical ruins and unearthed cesspits the only evidence available. In contrast, historians studying Roman Britain can use written sources alongside physical remains.' },
        { num: '8', question: 'Study the contemporary source by Seneca the Younger. What does this source tell us about what it was like to visit a Roman bathhouse?', answer: 'Seneca\'s letter shows that Roman bathhouses were busy, noisy, and highly social places. Bathers would hear the groans of people lifting weights, the cries of street food vendors like sausage-sellers and bakers hawking their goods, and the screeches of hair-pluckers, proving that the baths were about social activity and commerce as much as cleanliness.' }
      ]
    };
  }
}

window.generateWorksheetPackHtml = function(lessonNum, includeAnswers) {
  const linedSpaceHtml = includeAnswers ? '' : '<div class="page-lined-space"></div>';
  if (typeof lessonNum === 'boolean') {
    includeAnswers = lessonNum;
    lessonNum = 1;
  }
  if (!lessonNum) lessonNum = 1;

  const lessonBlock = document.getElementById(`lessonContent${lessonNum}`);
  
  let doNow = [];
  let vocab = [];
  let paragraphs = [];
  let activities = [];
  let enquiryQuestion = "";
  let sourceText = "";
  let sourceCite = "";
  let sourceTitle = "Contemporary Source Evidence";
  let discussionPrompt = "";
  let partDQuestions = [];
  let sourcesHtml = "";

  const answerStyle = includeAnswers 
    ? "display: block; color: #16a34a; font-weight: bold; margin-top: 4px;" 
    : "display: none;";

  if (lessonBlock) {
    // 1. Enquiry Question
    const h2El = lessonBlock.querySelector('h2');
    if (h2El) enquiryQuestion = h2El.textContent.trim();
    
    // 2. Do Now Questions
    const doNowAnswers = lessonBlock.querySelectorAll('.do-now-answer');
    doNowAnswers.forEach((ansSpan, idx) => {
      const parentBox = ansSpan.closest('div');
      const categoryEl = parentBox.querySelector('strong');
      const category = categoryEl ? categoryEl.textContent.trim() : 'Retrieval Grid';
      
      const questionEl = parentBox.querySelector('p');
      let question = questionEl ? questionEl.textContent.trim() : '';
      let qNum = 1;
      const match = question.match(/^Q(\d+):/i);
      if (match) {
        qNum = parseInt(match[1], 10);
        question = question.replace(/^Q\d+:\s*/i, '');
      } else if (question.startsWith('Q')) {
        const spaceIdx = question.indexOf(' ');
        if (spaceIdx !== -1) {
          const numStr = question.substring(1, spaceIdx).replace(':', '');
          qNum = parseInt(numStr, 10) || 1;
          question = question.substring(spaceIdx + 1).trim();
        }
      }
      
      doNow.push({
        num: qNum,
        category: category,
        question: question,
        answer: ansSpan.textContent.replace(/^Answer:\s*/i, '').trim()
      });
    });
    // Chronological sorting
    doNow.sort((a, b) => a.num - b.num);
    
    // 3. Key Vocabulary
    const cards = lessonBlock.querySelectorAll('.knowledge-card');
    let vocabCard = null;
    cards.forEach(card => {
      const h4 = card.querySelector('h4');
      if (h4 && h4.textContent.toLowerCase().includes('vocabulary')) {
        vocabCard = card;
      }
    });
    if (vocabCard) {
      vocabCard.querySelectorAll('ul li').forEach(li => {
        const strongEl = li.querySelector('strong');
        if (strongEl) {
          const word = strongEl.textContent.trim().replace(/^🚽\s*|^💦\s*|^🏗️\s*|^🏚️\s*|^💨\s*|^☣\s*|^🔬\s*|^👃\s*|^📜\s*|^🧹\s*|^🐴\s*/, '');
          let definition = li.textContent.replace(strongEl.textContent, '').trim();
          if (definition.startsWith(':')) definition = definition.substring(1).trim();
          const cleanWord = word.replace(/^[:\-\s\uFE0F]+/, '').trim();
          const cleanDef = definition.replace(/^[:\-\s\uFE0F]+/, '').trim();
          vocab.push({ word: cleanWord, definition: cleanDef });
        }
      });
    }
    
    // 4. Core Summary Narrative
    const standardNarrative = lessonBlock.querySelector('.standard-narrative-block');
    if (standardNarrative) {
      standardNarrative.querySelectorAll('p').forEach(p => {
        paragraphs.push(p.textContent.trim());
      });
    }
    
    // 5. Contemporary Sources (Parse all that match)
    sourcesHtml = "";
    const sourceCards = Array.from(lessonBlock.querySelectorAll('.knowledge-card')).filter(card => 
      card.querySelector('h4') && card.querySelector('h4').textContent.includes('Source')
    );
    
    sourceCards.forEach((sCard, sIdx) => {
      const h4 = sCard.querySelector('h4');
      const pQuote = sCard.querySelector('p');
      const citeEl = sCard.querySelector('cite');
      
      const sTitle = h4 ? h4.textContent.replace(/✍️|📝|📖|🗣️|👥|🔍|❓/g, '').trim() : 'Contemporary Source';
      const sText = pQuote ? pQuote.textContent.trim().replace(/^"\s*|\s*"$/g, '') : '';
      const sCite = citeEl ? citeEl.textContent.trim().replace(/^[—-\s]+/, '') : '';
      
      if (sIdx > 0) {
        sourcesHtml += `<div style="border-top: 1px dashed #cbd5e1; margin: 6px 0; padding-top: 6px;"></div>`;
      }
      
      sourcesHtml += `
        <div style="font-family: Georgia, serif;">
          <strong style="font-size: 0.76rem; color: #1e1b4b; font-family: 'Outfit', sans-serif; display: block; margin-bottom: 4px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 2px;">
            <i class="fa-solid fa-quote-left"></i> ${sTitle}
          </strong>
          <p style="font-size: 0.72rem; font-style: italic; margin: 0 0 4px 0; line-height: 1.35; text-align: justify;">
            "${sText}"
          </p>
          <cite style="display: block; text-align: right; font-size: 0.62rem; font-family: 'Outfit', sans-serif; font-weight: 700; color: #64748b;">
            — ${sCite}
          </cite>
        </div>
      `;
      
      const discEl = sCard.querySelector('div');
      if (discEl && !discussionPrompt) {
        discussionPrompt = discEl.innerHTML.replace(/🗣️.*Discussion:.*<\/strong>/i, '').trim();
      }
    });

    if (sourcesHtml === "") {
      const fallbackTitle = sourceTitle || "Contemporary Source Evidence";
      const fallbackText = sourceText || "I am surrounded by all kinds of noise...";
      const fallbackCite = sourceCite || "Seneca the Younger";
      sourcesHtml = `
        <div style="font-family: Georgia, serif;">
          <strong style="font-size: 0.76rem; color: #1e1b4b; font-family: 'Outfit', sans-serif; display: block; margin-bottom: 4px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 2px;">
            <i class="fa-solid fa-quote-left"></i> ${fallbackTitle}
          </strong>
          <p style="font-size: 0.72rem; font-style: italic; margin: 0 0 4px 0; line-height: 1.35; text-align: justify;">
            "${fallbackText}"
          </p>
          <cite style="display: block; text-align: right; font-size: 0.62rem; font-family: 'Outfit', sans-serif; font-weight: 700; color: #64748b;">
            — ${fallbackCite}
          </cite>
        </div>
      `;
    }
    
    // 6. Pupil Activities (Part A, Part B, Part C) & Model Answers
    let actBlock = null;
    cards.forEach(card => {
      const h4 = card.querySelector('h4');
      if (h4) {
        const text = h4.textContent.toLowerCase();
        if (text.includes('activities') || text.includes('writing tasks')) {
          actBlock = card;
        }
      }
    });

    if (actBlock) {
      const h5s = actBlock.querySelectorAll('h5');
      h5s.forEach(h5 => {
        const sectionTitle = h5.textContent.trim();
        const parentDiv = h5.closest('div');
        if (parentDiv) {
          const olEl = parentDiv.querySelector('ol');
          if (olEl) {
            const startVal = olEl.hasAttribute('start') ? parseInt(olEl.getAttribute('start'), 10) : 1;
            olEl.querySelectorAll('li').forEach((li, idx) => {
              const computedNum = startVal + idx;
              activities.push({
                num: computedNum,
                question: li.innerHTML.trim(),
                section: sectionTitle,
                answer: ""
              });
            });
          }
        }
      });
    }

    const modelAnswersBlock = lessonBlock.querySelector('.model-answers-block');
    if (modelAnswersBlock) {
      const strongs = modelAnswersBlock.querySelectorAll('strong');
      strongs.forEach(strongEl => {
        const qNumMatch = strongEl.textContent.match(/^Q(\d+)/i);
        if (qNumMatch) {
          const qNum = parseInt(qNumMatch[1], 10);
          const parentDiv = strongEl.closest('div');
          if (parentDiv) {
            let ansText = parentDiv.textContent.replace(strongEl.textContent, '').trim();
            ansText = ansText.replace(/^Model Answer:\s*/i, '').trim();
            const matchAct = activities.find(a => a.num === qNum);
            if (matchAct) {
              matchAct.answer = ansText;
            }
          }
        }
      });
    }

    // 7. Part D Questions
    if (actBlock) {
      const h5s = actBlock.querySelectorAll('h5');
      h5s.forEach(h5 => {
        const sectionTitle = h5.textContent.trim();
        if (sectionTitle.toLowerCase().includes('part d')) {
          const parentDiv = h5.closest('div');
          if (parentDiv) {
            const olEl = parentDiv.querySelector('ol');
            if (olEl) {
              const startVal = olEl.hasAttribute('start') ? parseInt(olEl.getAttribute('start'), 10) : 11;
              olEl.querySelectorAll('li').forEach((li, idx) => {
                const computedNum = startVal + idx;
                partDQuestions.push({
                  num: computedNum,
                  question: li.innerHTML.trim()
                });
              });
            }
          }
        }
      });
    }
  }

  // Fallbacks if DOM parsing failed or is empty
  if (doNow.length === 0) {
    doNow = [
      { num: 1, category: 'Chronology', question: 'What does the term chronology mean when we study history?', answer: 'Chronology is the arrangement of historical events in the exact order in which they occurred over time.' },
      { num: 2, category: 'Chronology', question: 'What is the difference between BC and AD on a timeline?', answer: 'BC stands for "Before Christ" (counting backward from year 1), while AD stands for "Anno Domini" (in the year of our Lord, counting forward).' },
      { num: 3, category: 'Evidence', question: 'If an archaeologist uncovers a Roman coin buried in a field, is it a primary source or a secondary source?', answer: 'It is a primary source because it is a physical artifact created during the actual time period under study.' },
      { num: 4, category: 'Evidence', question: 'What is the name given to a professional historical detective who digs up and analyzes physical remains from the past?', answer: 'An archaeologist.' },
      { num: 5, category: 'Chronology', question: 'Put these three eras in the correct chronological order, starting with the oldest: Victorian Britain, Iron Age Britain, Roman Britain.', answer: '1. Iron Age Britain, 2. Roman Britain, 3. Victorian Britain.' }
    ];
  }
  if (vocab.length === 0) {
    vocab = [
      { word: 'Cesspit', definition: 'A simple hole dug in the earth used by prehistoric and later societies to collect household sewage and human waste.' },
      { word: 'Conduit', definition: 'A stone channel or pipe designed by Roman engineers to transport clean water over long distances using gravity.' },
      { word: 'Latrine', definition: 'A communal Roman public toilet block, often flushed continuously by running water to carry waste into underground sewers.' }
    ];
  }

  let doNowHtml = '';
  doNow.forEach(q => {
    doNowHtml += `
      <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px; font-size: 0.68rem; line-height: 1.3; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; min-height: 100px;">
        <div>
          <strong style="color: #4f46e5; display: block; margin-bottom: 2px;">Q${q.num} [${q.category}]</strong>
          <span>${q.question}</span>
        </div>
        ${includeAnswers ? `<div style="color: #16a34a; font-weight: bold; margin-top: 4px;">A: ${q.answer}</div>` : `
          <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 14px;">
            <div style="border-bottom: 1.2px dashed #555555; height: 1px;"></div>
            <div style="border-bottom: 1.2px dashed #555555; height: 1px;"></div>
          </div>
        `}
      </div>
    `;
  });

  let vocabHtml = '';
  vocab.forEach(v => {
    vocabHtml += `
      <div style="font-size: 11pt; line-height: 1.3;">
        <strong>${v.word}:</strong> ${v.definition}
      </div>
    `;
  });

  let narrativeHtml = '';
  paragraphs.forEach(p => {
    narrativeHtml += `
      <p style="font-size: 12.5pt; line-height: 1.6; text-align: justify; margin: 0 0 6px 0;">
        ${p}
      </p>
    `;
  });

  const getQuestionBlock = (questionText, answerText, qIndex, lineCount = 3) => {
    const isDrawing = questionText.toLowerCase().includes('draw') || questionText.toLowerCase().includes('sketch');
    const isQ12OrQ13 = (qIndex === 12 || qIndex === 13);
    
    let answerBlock = '';
    if (includeAnswers) {
      if (isDrawing) {
        answerBlock = `<div style="color: #16a34a; font-style: italic; font-weight: 600; font-size: 0.74rem; margin-top: 2px; margin-bottom: 6px; line-height: 1.3;">A: [Student diagram / sketch illustrating: ${questionText.replace(/"/g, "'")}]</div>`;
      } else {
        answerBlock = `<div style="color: #16a34a; font-style: italic; font-weight: 600; font-size: 0.74rem; margin-top: 2px; margin-bottom: 6px; line-height: 1.3;">A: ${answerText}</div>`;
      }
    } else {
      if (isDrawing || isQ12OrQ13) {
        answerBlock = `<div style="height: 35mm; margin: 4px 0; background: #ffffff;"></div>`;
      } else {
        let rowsHtml = '';
        for (let i = 0; i < lineCount; i++) {
          rowsHtml += `<tr style="height: 20px;"><td style="border-bottom: 1.2px solid #555555; padding: 0; height: 20px;"></td></tr>`;
        }
        answerBlock = `<table style="width: 100%; height: ${lineCount * 20}px; border-collapse: collapse; margin-top: 4px; margin-bottom: 6px;">
            ${rowsHtml}
           </table>`;
      }
    }

    return `
      <div class="question-block" style="margin-bottom: 4px; font-size: 0.76rem; page-break-inside: avoid; line-height: 1.25;">
        <strong style="color: #374151; font-size: 12pt; font-weight: 700;">Q${qIndex}: ${questionText}</strong>
        ${answerBlock}
      </div>
    `;
  };

  let page2ActivitiesHtml = '<h3 style="color: #4f46e5; font-size: 0.82rem; text-transform: uppercase; font-weight: 700; margin-top: 6px; margin-bottom: 6px; border-bottom: 1px dashed #e5e7eb; padding-bottom: 2px;">Part A: Core Comprehension</h3>';
  let page3ActivitiesHtml = '<h3 style="color: #e11d48; font-size: 0.82rem; text-transform: uppercase; font-weight: 700; margin-top: 6px; margin-bottom: 6px; border-bottom: 1px dashed #e5e7eb; padding-bottom: 2px;">Part B: Conceptual Analysis</h3>';
  let page3SourceAnalysisHtml = '<h3 style="color: #10b981; font-size: 0.82rem; text-transform: uppercase; font-weight: 700; margin-top: 6px; margin-bottom: 6px; border-bottom: 1px dashed #e5e7eb; padding-bottom: 2px;">Part C: Source & Local Connection Analysis</h3>';

  activities.forEach(act => {
    let lineCount = 3;
    if (act.section.toLowerCase().includes('part a')) {
      lineCount = 3;
    } else if (act.section.toLowerCase().includes('part b')) {
      lineCount = 6;
    } else if (act.section.toLowerCase().includes('part c')) {
      lineCount = 8;
    }
    
    const qBlock = getQuestionBlock(act.question, act.answer, act.num, lineCount);
    
    if (act.section.toLowerCase().includes('part a')) {
      page2ActivitiesHtml += qBlock;
    } else if (act.section.toLowerCase().includes('part b')) {
      page3ActivitiesHtml += qBlock;
    } else if (act.section.toLowerCase().includes('part c')) {
      page3SourceAnalysisHtml += qBlock;
    }
  });

  let page4ActivitiesHtml = '<h3 style="color: #d97706; font-size: 0.82rem; text-transform: uppercase; font-weight: 700; margin-top: 6px; margin-bottom: 6px; border-bottom: 1px dashed #e5e7eb; padding-bottom: 2px;">Part D: Extension & Research Tasks</h3>';
  const filteredPartD = partDQuestions.filter(q => q.num !== 13);
  filteredPartD.forEach(q => {
    if (q.num === 12) {
      const q13 = partDQuestions.find(x => x.num === 13);
      const q12Text = q.question;
      const q13Text = q13 ? q13.question : '';
      
      let answerBlock = '';
      if (includeAnswers) {
        const matchAct12 = activities.find(a => a.num === 12);
        const matchAct13 = activities.find(a => a.num === 13);
        const ans12 = matchAct12 ? matchAct12.answer : '[Student Choice Response]';
        const ans13 = matchAct13 ? matchAct13.answer : '[Student Choice Response]';
        answerBlock = `
          <div style="color: #16a34a; font-style: italic; font-weight: 600; font-size: 0.74rem; margin-top: 2px; margin-bottom: 6px; line-height: 1.3;">
            <strong>A (Q12):</strong> ${ans12}<br>
            <strong>A (Q13):</strong> ${ans13}
          </div>
        `;
      } else {
        answerBlock = `<div style="height: 55mm; margin: 4px 0; background: #ffffff;"></div>`;
      }
      
      page4ActivitiesHtml += `
        <div class="question-block" style="margin-bottom: 4px; font-size: 0.76rem; page-break-inside: avoid; line-height: 1.25;">
          <strong style="color: #374151; font-size: 12pt; font-weight: 700; display: block; margin-bottom: 4px;">Q12 & Q13 [Choice Extension Tasks]: Complete either or both</strong>
          <div style="padding-left: 10px; border-left: 2px solid #d97706; margin-bottom: 6px;">
            <div style="margin-bottom: 3px;"><strong>Option A:</strong> ${q12Text}</div>
            <div><strong>Option B:</strong> ${q13Text}</div>
          </div>
          ${answerBlock}
        </div>
      `;
    } else {
      const matchAct = activities.find(a => a.num === q.num);
      const answerText = matchAct ? matchAct.answer : '[Student Independent Research / Practical Task]';
      const isDrawing = q.question.toLowerCase().includes('draw') || q.question.toLowerCase().includes('sketch');
      page4ActivitiesHtml += getQuestionBlock(q.question, answerText, q.num, isDrawing ? 3 : 6);
    }
  });

  const quoteVal = sourceText || "I am surrounded by all kinds of noise...";
  const citeVal = sourceCite || "Seneca the Younger";

  const plateCaptions = [
    "Source Image: A reconstruction illustration showing the steaming heated chambers and flowing water channels of a Roman public bathhouse in Roman Britain.",
    "Source Image: The Canterbury Cathedral Priory freshwater waterworks plan from the Eadwine Psalter, c. 1165 (Trinity College Cambridge Library MS R.17.1).",
    "Source Image: Sir John Harington's original 1596 woodcut diagram of his flushing water closet from 'The Metamorphosis of Ajax'.",
    "Source Image: 'A Court for King Cholera' – Original 1852 wood engraving by John Leech published in Punch Magazine, exposing urban slum contamination.",
    "Source Image: A reconstruction showing the spectacular, cathedral-like interior of Joseph Bazalgette's Crossness Pumping Station in London, opened in 1865."
  ];

  const plateImages = [
    "assets/was_roman_bathhouse.png",
    "assets/was_medieval_water_seller.png",
    "assets/was_water_closet_1596.png",
    "assets/was_industrial_street.png",
    "assets/was_cathedral_sanitation.png"
  ];

  let pages = [];

  // Lesson Page 1: Do Now, Visual Source Evidence Box, Annotation Tasks
  pages.push(`
  <div class="page">
    <div style="flex-grow: 0; width: 100%;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; border-bottom: 2px solid #4f46e5; padding-bottom: 4px;">
        <div style="max-width: 80%;">
          <span style="color: #4f46e5; font-weight: 800; font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">Meoncross School History • Unit Enquiry: Was the story of water and waste in Britain a steady climb of progress?</span>
          <h1 style="font-size: 0.92rem; font-weight: 800; margin: 0; color: #1e1b4b; line-height: 1.2;">${enquiryQuestion}</h1>
        </div>
        <span style="background: rgba(79, 70, 229, 0.1); color: #4f46e5; padding: 2px 6px; border-radius: 8px; font-weight: 700; font-size: 0.65rem;">Lesson ${lessonNum} Workbook Pack</span>
      </div>

      <div class="student-fields" style="margin-bottom: 10px;">
        <span>Name: ___________________________________</span>
        <span>Class: Year 7 (KS3)</span>
      </div>

      <div style="margin-bottom: 10px; width: 100%;">
        <div class="section-title">1. Do Now Retrieval Task</div>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; width: 100%;">
          ${doNowHtml}
        </div>
      </div>

      <div style="width: 115mm; height: 60mm; border: 1px solid #333333; margin: 8px auto 4px auto; display: flex; justify-content: center; align-items: center; background: #ffffff; box-sizing: border-box; overflow: hidden;">
        <img src="${plateImages[parseInt(lessonNum, 10) - 1] || 'assets/was_roman_bathhouse.png'}" style="max-width: 100%; max-height: 100%; object-fit: contain;" alt="Archaeological Source Photo Plate">
      </div>
      <div style="width: 115mm; margin: 0 auto 8px auto; font-size: 0.72rem; line-height: 1.35; color: #374151; text-align: left; font-family: 'Outfit', sans-serif;">
        ${plateCaptions[parseInt(lessonNum, 10) - 1] || ''}
      </div>

      <div style="margin-top: 10px; font-size: 0.82rem; line-height: 1.5;">
        <strong style="color: #4f46e5; display: block; margin-bottom: 4px; text-transform: uppercase; font-size: 0.88rem; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 2px;">Visual Source Annotation Tasks:</strong>
        <div style="display: flex; flex-direction: column; gap: 4px; color: #374151; margin-bottom: 8px;">
          <div><strong>Task 1: Identify Key Details</strong> - Draw arrows to two physical details in the visual source and label what they show.</div>
          <div><strong>Task 2: Context & Utility</strong> - Annotate how these details link to your wider knowledge, and explain how the creator's purpose affects its utility for historians.</div>
        </div>
        <div style="margin-top: 6px;">
          <strong>Write 2 complete sentences explaining what this visual source reveals about power, wealth, or public health constraints in this era.</strong>
          <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 18px; padding-bottom: 4px;">
            <div style="border-bottom: 1px solid #e2e8f0; height: 1px;"></div>
            <div style="border-bottom: 1px solid #e2e8f0; height: 1px;"></div>
            <div style="border-bottom: 1px solid #e2e8f0; height: 1px;"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- FOOTER -->
  </div>
  `);

  // Lesson Page 2: Vocabulary, Core Summary Narrative, Contemporary Source Evidence, Class Discussion Prompts
  pages.push(`
  <div class="page">
    <div style="flex-grow: 0; width: 100%;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; border-bottom: 2px solid #4f46e5; padding-bottom: 4px;">
        <div style="max-width: 80%;">
          <span style="color: #4f46e5; font-weight: 800; font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">Meoncross School History • Unit Enquiry: Was the story of water and waste in Britain a steady climb of progress?</span>
          <h1 style="font-size: 0.92rem; font-weight: 800; margin: 0; color: #1e1b4b; line-height: 1.2;">${enquiryQuestion}</h1>
        </div>
        <span style="background: rgba(79, 70, 229, 0.1); color: #4f46e5; padding: 2px 6px; border-radius: 8px; font-weight: 700; font-size: 0.65rem;">Lesson ${lessonNum} Workbook Pack</span>
      </div>

      <div style="margin-bottom: 8px;">
        <div class="section-title">2. Key Vocabulary</div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; background: rgba(79, 70, 229, 0.03); border: 1px solid #cbd5e1; padding: 8px; border-radius: 4px; font-size: 0.72rem;">
          ${vocabHtml}
        </div>
      </div>

      <div class="section-title">3. Core Summary Narrative</div>
      <div style="column-count: 2; column-gap: 15px; border-bottom: 1.5px solid #e5e7eb; padding-bottom: 4px; margin-bottom: 8px;">
        ${narrativeHtml}
      </div>

      <div style="display: grid; grid-template-columns: 1.8fr 1.2fr; gap: 12px; margin-top: 8px;">
        <div style="border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 4px; padding: 6px 10px;">
          ${sourcesHtml}
        </div>
        <div style="background: rgba(79, 70, 229, 0.03); border-left: 3px solid #4f46e5; padding: 6px 10px; border-radius: 4px; font-size: 0.7rem; line-height: 1.35;">
          <strong style="color: #4f46e5; font-size: 0.74rem; display: block; margin-bottom: 2px;">🗣️ Class Discussion Prompts:</strong>
          <ul style="margin: 0; padding-left: 10px; line-height: 1.4;">
            <li style="margin-bottom: 2px;">Why might different people in this era view this source differently?</li>
            <li style="margin-bottom: 2px;">What links can we make between this source and public sanitation?</li>
            <li>What does this tell us about contemporary attitudes?</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- FOOTER -->
  </div>
  `);

  // Lesson Page 3: Part A & Part B
  pages.push(`
  <div class="page" style="display: flex; flex-direction: column; justify-content: space-between;">
    <div class="page-content-wrapper" style="flex-grow: 0; width: 100%;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; border-bottom: 2px solid #4f46e5; padding-bottom: 4px;">
        <div style="max-width: 80%;">
          <span style="color: #4f46e5; font-weight: 800; font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">Meoncross School History • Unit Enquiry: Was the story of water and waste in Britain a steady climb of progress?</span>
          <h1 style="font-size: 0.92rem; font-weight: 800; margin: 0; color: #1e1b4b; line-height: 1.2;">${enquiryQuestion}</h1>
        </div>
        <span style="background: rgba(79, 70, 229, 0.1); color: #4f46e5; padding: 2px 6px; border-radius: 8px; font-weight: 700; font-size: 0.65rem;">Lesson ${lessonNum} Workbook Pack</span>
      </div>

      <div style="display: flex; flex-direction: column; margin-bottom: 4px;">
        ${page2ActivitiesHtml}
      </div>
      <div style="display: flex; flex-direction: column; margin-top: 6px;">
        ${page3ActivitiesHtml}
      </div>
    </div>
    <div class="was-dynamic-lines-container"></div>
    <!-- FOOTER -->
  </div>
  `);

  // Lesson Page 4: Part C & Part D (with empty sketches Q12 & Q13)
  pages.push(`
  <div class="page" style="display: flex; flex-direction: column; justify-content: space-between;">
    <div class="page-content-wrapper" style="flex-grow: 0; width: 100%;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; border-bottom: 2px solid #4f46e5; padding-bottom: 4px;">
        <div style="max-width: 80%;">
          <span style="color: #4f46e5; font-weight: 800; font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">Meoncross School History • Unit Enquiry: Was the story of water and waste in Britain a steady climb of progress?</span>
          <h1 style="font-size: 0.92rem; font-weight: 800; margin: 0; color: #1e1b4b; line-height: 1.2;">${enquiryQuestion}</h1>
        </div>
        <span style="background: rgba(79, 70, 229, 0.1); color: #4f46e5; padding: 2px 6px; border-radius: 8px; font-weight: 700; font-size: 0.65rem;">Lesson ${lessonNum} Workbook Pack</span>
      </div>

      <div style="display: flex; flex-direction: column; margin-bottom: 4px;">
        ${page3SourceAnalysisHtml}
      </div>

      <div style="display: flex; flex-direction: column; line-height: 1.2; margin-top: 6px;">
        ${page4ActivitiesHtml}
      </div>
    </div>
    <div class="was-dynamic-lines-container"></div>
    <!-- FOOTER -->
  </div>
  `);

  // Build the complete booklet HTML
  let bookletHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>KS3 Water & Sanitation Study Pack - Lesson ${lessonNum}</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Outfit', sans-serif;
      margin: 0;
      padding: 0;
      background: #f3f4f6;
      color: #374151;
      line-height: 1.5;
    }
    .page {
      width: 210mm;
      height: 297mm;
      background: #ffffff;
      margin: 10px auto;
      padding: 8mm 15mm;
      box-shadow: 0 4px 10px rgba(0,0,0,0.06);
      border: 1px solid #e5e7eb;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .page-landscape {
      width: 297mm;
      height: 210mm;
      background: #ffffff;
      margin: 10px auto;
      padding: 8mm 15mm;
      box-shadow: 0 4px 10px rgba(0,0,0,0.06);
      border: 1px solid #e5e7eb;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    h1, h2, h3, h4, h5 {
      color: #1e1b4b;
      margin-top: 0;
      margin-bottom: 4px;
    }
    .section-title {
      border-bottom: 2px solid #e5e7eb;
      padding-top: 2px;
      padding-bottom: 2px;
      margin-top: 4px;
      margin-bottom: 4px;
      font-weight: 800;
      color: #4f46e5;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .part-header, h3 {
      margin-top: 4px !important;
      margin-bottom: 4px !important;
      padding-top: 2px !important;
      padding-bottom: 2px !important;
    }
    .question-block {
      margin-top: 0px !important;
      margin-bottom: 4px !important;
      padding-top: 4px !important;
      padding-bottom: 4px !important;
    }
    .student-fields {
      border: 1.5px solid #e5e7eb;
      border-radius: 6px;
      padding: 6px 12px;
      margin-bottom: 8px;
      background: #fafafa;
      display: flex;
      gap: 20px;
    }
    .student-fields span {
      font-size: 0.72rem;
      color: #4b5563;
    }
    .page-footer {
      position: absolute;
      bottom: 10mm;
      left: 15mm;
      right: 15mm;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #e5e7eb;
      padding-top: 4px;
      font-size: 0.62rem;
      color: #9ca3af;
    }
    img {
      max-height: 110mm !important;
    }
    .was-dynamic-lines-container {
      flex-grow: 1;
      width: 100%;
      margin-top: 8px;
      margin-bottom: 8mm;
      box-sizing: border-box;
      overflow: hidden;
    }
    @media print {
      @page {
        size: A4;
        margin: 0;
      }
      @page landscape-page {
        size: A4 landscape;
        margin: 0;
      }
      body {
        background: #ffffff;
        color: #000000;
        margin: 0;
        -webkit-print-color-adjust: exact;
      }
      .page {
        margin: 0 !important;
        border: none !important;
        box-shadow: none !important;
        width: 210mm;
        height: 297mm;
        page-break-after: always;
        page-break-inside: avoid;
        padding: 10mm 15mm;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
      }
      .page-landscape {
        page: landscape-page;
        margin: 0 !important;
        border: none !important;
        box-shadow: none !important;
        width: 297mm;
        height: 210mm;
        page-break-after: always;
        page-break-inside: avoid;
        padding: 10mm 15mm;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
      }
      .page:last-child, .page-landscape:last-child {
        page-break-after: avoid;
      }
      .page-lined-space {
        flex-grow: 1;
        width: 100%;
        margin-top: 10px;
        margin-bottom: 12mm;
        background-image: linear-gradient(to bottom, transparent 23px, #cbd5e1 23px);
        background-size: 100% 24px;
        min-height: 24px;
      }
      .hint-toggle, button {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  `;

  pages.forEach((pageContent, idx) => {
    const pageNum = idx + 1;
    const footerHtml = `
      <div class="page-footer">
        <span>KS3 History Study Unit: Water and Sanitation</span>
        <span>Page ${pageNum} of ${pages.length}</span>
      </div>
    `;
    bookletHtml += pageContent.replace('<!-- FOOTER -->', footerHtml);
  });

  bookletHtml += `
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.was-dynamic-lines-container').forEach(container => {
        const remaining = container.clientHeight;
        const lineSpacing = 30.2; // 8mm in pixels
        const numLines = Math.floor(remaining / lineSpacing);
        
        if (numLines > 0) {
          let content = '';
          if (numLines > 3) {
            content += '<div style="font-style: italic; font-size: 0.72rem; color: #555555; margin-bottom: 4px; font-weight: normal; font-family: \\'Outfit\\', sans-serif;">Extension Space: Use these lines to expand your analysis with an extra piece of evidence.</div>';
          }
          for (let i = 0; i < numLines; i++) {
            content += '<div style="height: 8mm; border-bottom: 1.2px solid #555555; box-sizing: border-box; width: 100%;"></div>';
          }
          container.innerHTML = content;
        }
      });
    });
  </script>
</body>
</html>
  `;
  
  return bookletHtml;
};

window.updateWorksheetPreview = function() {
  const iframe = document.getElementById('was-worksheet-preview-iframe');
  if (!iframe) return;
  
  const lessonSelect = document.getElementById('was-preview-lesson');
  const answersVal = document.getElementById('was-preview-answers').value;
  const includeAnswers = (answersVal === 'yes');
  
  const printBtn = document.querySelector('.btn-primary[onclick*="printWorksheetPreview"]');
  const wordBtn = document.getElementById('was-btn-preview-word');
  const answersContainer = document.getElementById('was-preview-answers') ? document.getElementById('was-preview-answers').parentNode : null;

  let html;
  if (lessonSelect && lessonSelect.value === 'all') {
    html = window.generateUnifiedBookletHtml(includeAnswers);
    if (answersContainer) answersContainer.style.display = 'flex';
    if (printBtn) printBtn.style.display = 'flex';
    if (wordBtn) wordBtn.style.display = 'flex';
  } else if (lessonSelect && lessonSelect.value === 'cloze') {
    html = window.generateClozeGameHtml();
    if (answersContainer) answersContainer.style.display = 'none';
    if (printBtn) printBtn.style.display = 'none';
    if (wordBtn) wordBtn.style.display = 'none';
  } else if (lessonSelect && lessonSelect.value === 'timeline-game') {
    html = window.generateTimelineGameHtml();
    if (answersContainer) answersContainer.style.display = 'none';
    if (printBtn) printBtn.style.display = 'none';
    if (wordBtn) wordBtn.style.display = 'none';
  } else {
    const lessonNum = lessonSelect ? parseInt(lessonSelect.value, 10) : 1;
    html = window.generateWorksheetPackHtml(lessonNum, includeAnswers);
    if (answersContainer) answersContainer.style.display = 'flex';
    if (printBtn) printBtn.style.display = 'flex';
    if (wordBtn) wordBtn.style.display = 'flex';
  }
  iframe.srcdoc = html;
};

window.printWorksheetPreview = function() {
  let html;
  try {
    const lessonSelect = document.getElementById('was-preview-lesson');
    const answersVal = document.getElementById('was-preview-answers').value;
    const includeAnswers = (answersVal === 'yes');
    
    if (lessonSelect && lessonSelect.value === 'all') {
      window.printUnifiedBooklet();
      return;
    }
    
    const lessonNum = lessonSelect ? parseInt(lessonSelect.value, 10) : 1;
    html = window.generateWorksheetPackHtml(lessonNum, includeAnswers);

    if (window.location.protocol === 'file:') {
      fallbackPrintWindow(html, null);
      return;
    }

    const iframe = document.getElementById('was-worksheet-preview-iframe');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } else {
      fallbackPrintWindow(html, null);
    }
  } catch (err) {
    console.error("Printing failed, attempting fallback:", err);
    if (html) {
      fallbackPrintWindow(html, null);
    } else {
      alert("Printing was blocked by browser security restrictions. Please run a local web server (npm run dev) or allow popups to print.");
    }
  }
};

window.printUnifiedBooklet = function() {
  let iframe;
  let html;
  try {
    const answersVal = document.getElementById('was-preview-answers').value;
    const includeAnswers = (answersVal === 'yes');
    
    html = window.generateUnifiedBookletHtml(includeAnswers);
    
    if (window.location.protocol === 'file:') {
      fallbackPrintWindow(html, null);
      return;
    }
    
    // Create temporary hidden iframe
    iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);
    
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();
    
    iframe.onload = function() {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        setTimeout(() => {
          if (iframe && iframe.parentNode) {
            document.body.removeChild(iframe);
          }
        }, 1000);
      } catch (innerErr) {
        fallbackPrintWindow(html, iframe);
      }
    };
  } catch (err) {
    console.error("Printing booklet failed, attempting fallback:", err);
    if (html) {
      fallbackPrintWindow(html, iframe);
    } else {
      alert("Printing was blocked by local file system security restrictions. Please allow popups or run from a local server.");
    }
  }
};

function fallbackPrintWindow(html, iframe) {
  try {
    if (iframe && iframe.parentNode) {
      document.body.removeChild(iframe);
    }
    const printWin = window.open('', '_blank');
    if (printWin) {
      printWin.document.open();
      printWin.document.write(html);
      printWin.document.close();
      
      printWin.onload = function() {
        printWin.focus();
        printWin.print();
      };
      
      // Secondary fallback in case onload isn't fired in file:// windows
      setTimeout(() => {
        try {
          printWin.focus();
          printWin.print();
        } catch (e) {}
      }, 500);
    } else {
      alert("Popup blocker prevented opening the print window. Please allow popups in your browser settings to print.");
    }
  } catch (e) {
    console.error("Fallback printing failed:", e);
    alert("Printing was blocked by local security restrictions. Please run a local web server (npm run dev) to print.");
  }
}

window.generateUnifiedBookletHtml = function(includeAnswers) {
  const linedSpaceHtml = includeAnswers ? '' : '<div class="page-lined-space"></div>';
  const lessonEnquiries = [];
  for (let l = 1; l <= 5; l++) {
    const lb = document.getElementById(`lessonContent${l}`);
    let title = `Lesson ${l} Enquiry`;
    if (lb) {
      const h2El = lb.querySelector('h2');
      if (h2El) title = h2El.textContent.trim();
    }
    lessonEnquiries.push(title);
  }


  const recallQuestions = [
    // Lesson 1 (1-10)
    { num: 1, text: "Why was digging cesspits in the Iron Age a safe and hygienic waste method?", answer: "Settlements were spread out and temporary pits kept waste away from springs" },
    { num: 2, text: "What circular wooden homes did Iron Age Britons live in, as discovered at Silchester?", answer: "Roundhouses" },
    { num: 3, text: "Which field of study relies on physical clues unearthed from the ground?", answer: "Archaeology" },
    { num: 4, text: "In what year did the Roman Empire invade Britain, bringing sanitation tech?", answer: "AD 43" },
    { num: 5, text: "What name is given to the stone channels Roman engineers built to transport water?", answer: "Conduits" },
    { num: 6, text: "Which famous public bathhouse complex in Roman Britain was used for washing?", answer: "Bearsden" },
    { num: 7, text: "At which Roman fort on Hadrian's Wall sat soldiers over flushed latrines?", answer: "Housesteads Fort" },
    { num: 8, text: "What did Roman soldiers use to wipe themselves in communal latrines?", answer: "A wet sponge attached to a shared wooden stick" },
    { num: 9, text: "In what year did the Romans withdraw from Britain, causing decline?", answer: "AD 410" },
    { num: 10, text: "What material did the Romans use to make water pipes that was expensive?", answer: "Lead" },
    // Lesson 2 (11-20)
    { num: 11, text: "Which rural village in Yorkshire has archaeology of peasant outhouses?", answer: "Wharram Percy" },
    { num: 12, text: "What natural material did medieval peasants use as toilet paper?", answer: "Wild moss" },
    { num: 13, text: "On Canterbury Priory's 1165 plan, what did green pipes represent?", answer: "Pipes bringing fresh water in" },
    { num: 14, text: "What did red pipes on the Canterbury Priory plan carry away?", answer: "Dirty waste water" },
    { num: 15, text: "Which nearby abbey diverted water from the River Meon to flush latrines?", answer: "Titchfield Abbey" },
    { num: 16, text: "How did poorer citizens in medieval towns get water if they had no wells?", answer: "Bought it from water sellers who hauled river water in barrels" },
    { num: 17, text: "What was the name of the specialized night-laborers who emptied cesspits?", answer: "Gongfermers" },
    { num: 18, text: "Why did gongfermers work exclusively under cover of night?", answer: "To avoid disrupting crowded streets with bad smells and waste carts" },
    { num: 19, text: "Which English king wrote to London's Mayor in 1357 ordering cleanup?", answer: "King Edward III" },
    { num: 20, text: "What was the fine in pence introduced by London for street waste dumping?", answer: "Forty pence" },
    // Lesson 3 (21-30)
    { num: 21, text: "What happened to London's population during the Tudor/Stuart era?", answer: "Grew rapidly / population explosion" },
    { num: 22, text: "Which diarist wrote in 1660 about stepping into neighbor's toilet waste?", answer: "Samuel Pepys" },
    { num: 23, text: "Who invented the first flushing toilet in Britain in 1596?", answer: "Sir John Harington" },
    { num: 24, text: "For which English queen was the first flushing toilet built?", answer: "Queen Elizabeth I" },
    { num: 25, text: "Why did Sir John Harington's flushing toilet fail to be used by public?", answer: "Houses lacked running piped water and sewer connections" },
    { num: 26, text: "What did early modern water sellers haul in barrels on horseback?", answer: "River water" },
    { num: 27, text: "What did John Moore introduce to pipe water to wealthy residents?", answer: "Subscription water network" },
    { num: 28, text: "What gas in cesspits could explode if lit by a candle?", answer: "Methane / foul air" },
    { num: 29, text: "How did early modern families dispose of waste water without sinks?", answer: "Threw it into street gutters or backyard cesspits" },
    { num: 30, text: "Which epidemic disease struck London repeatedly in the 17th century?", answer: "The Plague" },
    // Lesson 4 (31-40)
    { num: 31, text: "By how much did Britain's population grow between 1750 and 1850?", answer: "Skyrocketed from 6 million to 21 million" },
    { num: 32, text: "What style of cheap housing was built back-to-back in industrial cities?", answer: "Back-to-back terraces" },
    { num: 33, text: "Where did dozens of industrial families share a single cesspit?", answer: "Shared courtyards" },
    { num: 34, text: "In what year did cholera first strike Britain, causing terror?", answer: "1831" },
    { num: 35, text: "Which official published the famous 1842 Sanitary Report?", answer: "Edwin Chadwick" },
    { num: 36, text: "What did Edwin Chadwick argue was the primary cause of poverty?", answer: "Disease and bad sanitation" },
    { num: 37, text: "What French term describes the government policy of non-interference?", answer: "Laissez-faire" },
    { num: 38, text: "Which Act in 1848 encouraged towns to build water systems?", answer: "1848 Public Health Act" },
    { num: 39, text: "What did Sanitarian reformers believe spread cholera before Germ Theory?", answer: "Miasma / bad smells" },
    { num: 40, text: "Why were cesspits under industrial houses rarely emptied by landlords?", answer: "Emptying cesspits was expensive and eat into landlords' profits" },
    // Lesson 5 (41-50)
    { num: 41, text: "Which British doctor proved cholera was waterborne in 1854?", answer: "Dr. John Snow" },
    { num: 42, text: "On which London street was the contaminated pump mapped by Snow?", answer: "Broad Street" },
    { num: 43, text: "What action did John Snow take in 1854 to stop the Soho cholera outbreak?", answer: "Removed the Broad Street pump handle" },
    { num: 44, text: "What name was given to the hot summer of 1858 when the Thames smelled?", answer: "The Great Stink" },
    { num: 45, text: "Who constructed London's massive brick sewage system by 1865?", answer: "Joseph Bazalgette" },
    { num: 46, text: "How many miles of brick sewers did Joseph Bazalgette build?", answer: "1,300 miles" },
    { num: 47, text: "Which French scientist published Germ Theory in 1861?", answer: "Louis Pasteur" },
    { num: 48, text: "Which Public Health Act made it compulsory to provide sewers?", answer: "1875 Public Health Act" },
    { num: 49, text: "What color of earthenware pipes replaced porous brick drains?", answer: "Blue / brown glazed earthenware" },
    { num: 50, text: "Which Hampshire town built a new public reservoir in 1886?", answer: "Fareham" }
  ];

  const pages = [];

  // --- Page 1: Cover Page ---
  pages.push(`
  <div class="page" style="padding: 0; display: flex; flex-direction: column; justify-content: space-between; border: 4px solid #1e3a8a;">
    <div style="background: #1e3a8a; height: 90mm; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 0 20px; box-sizing: border-box; text-align: center; width: 100%;">
      <h3 style="color: #ffffff; font-size: 1.25rem; text-transform: uppercase; font-weight: 800; letter-spacing: 0.15em; margin: 0 0 15px 0;">MEONCROSS SCHOOL | HISTORY DEPARTMENT</h3>
      <h1 style="font-size: 2.6rem; font-weight: 800; color: #ffffff; line-height: 1.2; margin: 0 0 10px 0;">Water and Sanitation Through Time</h1>
      <h2 style="font-size: 1.2rem; font-weight: 600; color: #93c5fd; margin: 0;">Key Stage 3 Year 7 Complete Unit Study Booklet</h2>
    </div>

    <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 15px 20px;">
      <!-- Student Info Box positioned above Unit Enquiry Question -->
      <div style="width: 85%; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 10px 15px; background: #fafafa; display: flex; justify-content: space-between; align-items: center; box-sizing: border-box; font-size: 0.82rem; margin-bottom: 20px;">
        <span><strong>Student Name:</strong> _____________________</span>
        <span><strong>Class Group:</strong> Year 7 (KS3)</span>
        <span><strong>Teacher Name:</strong> ______________________</span>
      </div>

      <div style="width: 85%; border: 3px solid #1e3a8a; border-radius: 8px; padding: 20px 24px; background: #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.05); box-sizing: border-box;">
        <span style="display: block; text-transform: uppercase; font-size: 0.8rem; font-weight: 800; color: #1e3a8a; letter-spacing: 0.15em; margin-bottom: 8px; text-align: center;">Unit Enquiry Question</span>
        <h2 style="font-size: 24pt; font-weight: 800; color: #0f172a; text-align: center; margin: 0; line-height: 1.35;">
          "Was the story of water and waste in Britain a steady climb of progress?"
        </h2>
      </div>
      <p style="width: 80%; margin: 20px auto 0 auto; font-size: 0.9rem; line-height: 1.5; color: #475569; text-align: center;">
        This unified study booklet contains all lesson study guides, primary sources, local history connections, worksheet activities, and the final summative writing assessment with its companion planning tools.
      </p>
    </div>

    <div style="height: 15mm;"></div>
    <!-- FOOTER -->
  </div>
  `);

  // --- Page 2: Inside Front Cover ---
  pages.push(`
  <div class="page">
    <div style="display: flex; justify-content: space-between; align-items: center; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 10px 15px; margin-bottom: 15px; background: #fafafa; font-size: 0.85rem; font-weight: 700; color: #1e1b4b;">
      <span>My History Minimum Target Grade: [_______]</span>
      <span>Student Name: [_______________________]</span>
    </div>

    <h2 class="section-title">Unit Completion & Self-Check Log</h2>
    <p style="font-size: 0.78rem; line-height: 1.5; margin: 0 0 12px 0; color: #4b5563; text-align: justify;">
      Use this checklist and score log to track your progress through the unit. Verify your completed lessons, vocabulary mastery, and recording of Do Now retrieval scores.
    </p>

    <table style="width: 100%; border-collapse: collapse; font-size: 0.74rem; line-height: 1.4; text-align: left; border: 1px solid #cbd5e1;">
      <thead>
        <tr style="background: #1e3a8a; color: white;">
          <th style="padding: 8px 12px; width: 50%; font-weight: 800; border: 1px solid #cbd5e1;">Lesson Number & Enquiry Title</th>
          <th style="padding: 8px 12px; width: 15%; font-weight: 800; border: 1px solid #cbd5e1; text-align: center;">Completed? (☐)</th>
          <th style="padding: 8px 12px; width: 18%; font-weight: 800; border: 1px solid #cbd5e1; text-align: center;">Vocab Mastered? (☐)</th>
          <th style="padding: 8px 12px; width: 17%; font-weight: 800; border: 1px solid #cbd5e1; text-align: center; background: #f5f5f5; color: #1e1b4b;">Do Now Score (___ / 5)</th>
        </tr>
      </thead>
      <tbody>
        ${[1, 2, 3, 4, 5].map(i => `
        <tr style="border-bottom: 1px solid #cbd5e1; background: ${i % 2 === 0 ? '#f8fafc' : '#ffffff'};">
          <td style="padding: 8px 12px; font-weight: 600; border: 1px solid #cbd5e1; line-height: 1.3;">Lesson ${i}: ${lessonEnquiries[i - 1]}</td>
          <td style="padding: 8px 12px; border: 1px solid #cbd5e1; text-align: center;">
            <span style="display: inline-block; width: 14px; height: 14px; border: 1.5px solid #cbd5e1; border-radius: 3px; background: #ffffff; vertical-align: middle;"></span>
          </td>
          <td style="padding: 8px 12px; border: 1px solid #cbd5e1; text-align: center;">
            <span style="display: inline-block; width: 14px; height: 14px; border: 1.5px solid #cbd5e1; border-radius: 3px; background: #ffffff; vertical-align: middle;"></span>
          </td>
          <td style="padding: 8px 12px; border: 1px solid #cbd5e1; text-align: center; background: #f5f5f5; font-weight: bold; color: #1e1b4b;">_____ / 5</td>
        </tr>
        `).join('')}
        <tr style="border-bottom: 1px solid #cbd5e1; font-weight: 700;">
          <td colspan="3" style="padding: 8px 12px; border: 1px solid #cbd5e1;">Total Unit Retrieval Score</td>
          <td style="padding: 8px 12px; border: 1px solid #cbd5e1; text-align: center; background: #f5f5f5; color: #1e1b4b;">[_______] / 25</td>
        </tr>
        <tr style="font-weight: 700;">
          <td colspan="3" style="padding: 8px 12px; border: 1px solid #cbd5e1;">End of Unit Assessment</td>
          <td style="padding: 8px 12px; border: 1px solid #cbd5e1; text-align: center; background: #f5f5f5; color: #1e1b4b;">My Pathway: [_______]</td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 15px; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 12px; background: #ffffff; font-size: 0.74rem;">
      <strong style="color: #1e1b4b; display: block; margin-bottom: 8px; font-size: 0.85rem;">Teacher Feedback Key</strong>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; line-height: 1.4;">
        <div><strong>Sp:</strong> Spelling error (Correct the highlighted word 3 times in your D.I.R.T. block).</div>
        <div><strong>//:</strong> New Paragraph (Restructure your writing to introduce a clear break or new idea).</div>
        <div><strong>!:</strong> Check Detail (Expand your description or check if the fact is historically accurate).</div>
      </div>
    </div>
    <!-- FOOTER -->
  </div>
  `);

  const plateCaptions = [
    "Source Image: A reconstruction illustration showing the steaming heated chambers and flowing water channels of a Roman public bathhouse in Roman Britain.",
    "Source Image: The Canterbury Cathedral Priory freshwater waterworks plan from the Eadwine Psalter, c. 1165 (Trinity College Cambridge Library MS R.17.1).",
    "Source Image: Sir John Harington's original 1596 woodcut diagram of his flushing water closet from 'The Metamorphosis of Ajax'.",
    "Source Image: 'A Court for King Cholera' – Original 1852 wood engraving by John Leech published in Punch Magazine, exposing urban slum contamination.",
    "Source Image: A reconstruction showing the spectacular, cathedral-like interior of Joseph Bazalgette's Crossness Pumping Station in London, opened in 1865."
  ];

  const plateImages = [
    "assets/was_roman_bathhouse.png",
    "assets/was_medieval_water_seller.png",
    "assets/was_water_closet_1596.png",
    "assets/was_industrial_street.png",
    "assets/was_cathedral_sanitation.png"
  ];

  // --- Page 3: Chronological Big Picture Timeline ---
  pages.push(`
  <div class="page page-landscape" style="page-break-before: always; display: flex; flex-direction: column; justify-content: space-between;">
    <div style="flex-grow: 0; width: 100%;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; border-bottom: 2px solid #1e3a8a; padding-bottom: 4px;">
        <div>
          <span style="color: #1e3a8a; font-weight: 800; font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">Meoncross School History • Key Stage 3 Year 7 Unit Overview</span>
          <h1 style="font-size: 0.92rem; font-weight: 800; margin: 0; color: #0c2340; line-height: 1.2;">Chronological Big Picture Timeline</h1>
        </div>
        <span style="background: rgba(12, 35, 64, 0.1); color: #0c2340; padding: 2px 6px; border-radius: 8px; font-weight: 700; font-size: 0.65rem;">Unit Overview</span>
      </div>

      <h2 class="section-title" style="margin-top: 6px; margin-bottom: 12px; font-size: 1.1rem; font-weight: 800;">2,000 Years of British Water & Sanitation</h2>
      <p style="font-size: 0.74rem; line-height: 1.45; color: #475569; margin: 0 0 15px 0; text-align: justify;">
        Below is the chronological overview of the five historical eras we will investigate in this unit. Study the progression of public health conditions, technologies, and social contexts.
      </p>

      <!-- Horizontal Timeline Container -->
      <div style="display: flex; justify-content: space-between; align-items: stretch; gap: 10px; margin-bottom: 20px; position: relative; padding-top: 15px; width: 100%;">
        <!-- Connector Line behind cards -->
        <div style="position: absolute; top: 48px; left: 30px; right: 30px; height: 4px; background: #d4af37; z-index: 1;"></div>
        
        <!-- Era 1 -->
        <div style="flex: 1; min-width: 0; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 8px; box-sizing: border-box; text-align: center; position: relative; z-index: 2; display: flex; flex-direction: column; justify-content: space-between; height: 110mm; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div>
            <div style="background: #0c2340; color: #ffffff; border-radius: 50%; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: bold; margin: 0 auto 4px auto; border: 2px solid #d4af37;">1</div>
            <strong style="font-size: 0.74rem; color: #0c2340; display: block; margin-bottom: 2px; line-height: 1.1;">Roman Britain</strong>
            <span style="font-size: 0.58rem; color: #64748b; font-weight: bold; display: block; margin-bottom: 4px;">Prehistoric - c. 410</span>
          </div>
          <div style="width: 50mm; height: 50mm; border: 1px solid #e2e8f0; border-radius: 4px; overflow: hidden; margin: 6px auto; background: #f8fafc; display: flex; align-items: center; justify-content: center;">
            <img src="assets/was_roman_bathhouse.png" style="max-width: 100%; max-height: 100%; object-fit: contain;">
          </div>
          <span style="font-size: 0.62rem; color: #475569; line-height: 1.25; display: block; padding: 0 2px;">Aqueducts, public bathhouses, and sewers for military centers.</span>
        </div>

        <!-- Era 2 -->
        <div style="flex: 1; min-width: 0; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 8px; box-sizing: border-box; text-align: center; position: relative; z-index: 2; display: flex; flex-direction: column; justify-content: space-between; height: 110mm; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div>
            <div style="background: #0c2340; color: #ffffff; border-radius: 50%; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: bold; margin: 0 auto 4px auto; border: 2px solid #d4af37;">2</div>
            <strong style="font-size: 0.74rem; color: #0c2340; display: block; margin-bottom: 2px; line-height: 1.1;">Medieval Britain</strong>
            <span style="font-size: 0.58rem; color: #64748b; font-weight: bold; display: block; margin-bottom: 4px;">c. 410 - c. 1500</span>
          </div>
          <div style="width: 50mm; height: 50mm; border: 1px solid #e2e8f0; border-radius: 4px; overflow: hidden; margin: 6px auto; background: #f8fafc; display: flex; align-items: center; justify-content: center;">
            <img src="assets/was_medieval_water_seller.png" style="max-width: 100%; max-height: 100%; object-fit: contain;">
          </div>
          <span style="font-size: 0.62rem; color: #475569; line-height: 1.25; display: block; padding: 0 2px;">Pipes for monasteries; wells and muddy cesspits for towns.</span>
        </div>

        <!-- Era 3 -->
        <div style="flex: 1; min-width: 0; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 8px; box-sizing: border-box; text-align: center; position: relative; z-index: 2; display: flex; flex-direction: column; justify-content: space-between; height: 110mm; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div>
            <div style="background: #0c2340; color: #ffffff; border-radius: 50%; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: bold; margin: 0 auto 4px auto; border: 2px solid #d4af37;">3</div>
            <strong style="font-size: 0.74rem; color: #0c2340; display: block; margin-bottom: 2px; line-height: 1.1;">Early Modern London</strong>
            <span style="font-size: 0.58rem; color: #64748b; font-weight: bold; display: block; margin-bottom: 4px;">c. 1500 - c. 1750</span>
          </div>
          <div style="width: 50mm; height: 50mm; border: 1px solid #e2e8f0; border-radius: 4px; overflow: hidden; margin: 6px auto; background: #f8fafc; display: flex; align-items: center; justify-content: center;">
            <img src="assets/was_water_closet_1596.png" style="max-width: 100%; max-height: 100%; object-fit: contain;">
          </div>
          <span style="font-size: 0.62rem; color: #475569; line-height: 1.25; display: block; padding: 0 2px;">Harington's toilet; private networks and water carriers.</span>
        </div>

        <!-- Era 4 -->
        <div style="flex: 1; min-width: 0; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 8px; box-sizing: border-box; text-align: center; position: relative; z-index: 2; display: flex; flex-direction: column; justify-content: space-between; height: 110mm; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div>
            <div style="background: #0c2340; color: #ffffff; border-radius: 50%; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: bold; margin: 0 auto 4px auto; border: 2px solid #d4af37;">4</div>
            <strong style="font-size: 0.74rem; color: #0c2340; display: block; margin-bottom: 2px; line-height: 1.1;">Industrial Revolution</strong>
            <span style="font-size: 0.58rem; color: #64748b; font-weight: bold; display: block; margin-bottom: 4px;">c. 1750 - c. 1850</span>
          </div>
          <div style="width: 50mm; height: 50mm; border: 1px solid #e2e8f0; border-radius: 4px; overflow: hidden; margin: 6px auto; background: #f8fafc; display: flex; align-items: center; justify-content: center;">
            <img src="assets/was_industrial_street.png" style="max-width: 100%; max-height: 100%; object-fit: contain;">
          </div>
          <span style="font-size: 0.62rem; color: #475569; line-height: 1.25; display: block; padding: 0 2px;">Slums, cholera epidemics, contaminated pumps, and miasma theory.</span>
        </div>

        <!-- Era 5 -->
        <div style="flex: 1; min-width: 0; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 8px; box-sizing: border-box; text-align: center; position: relative; z-index: 2; display: flex; flex-direction: column; justify-content: space-between; height: 110mm; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div>
            <div style="background: #0c2340; color: #ffffff; border-radius: 50%; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: bold; margin: 0 auto 4px auto; border: 2px solid #d4af37;">5</div>
            <strong style="font-size: 0.74rem; color: #0c2340; display: block; margin-bottom: 2px; line-height: 1.1;">Victorian Clean Up</strong>
            <span style="font-size: 0.58rem; color: #64748b; font-weight: bold; display: block; margin-bottom: 4px;">c. 1850 - c. 1900</span>
          </div>
          <div style="width: 50mm; height: 50mm; border: 1px solid #e2e8f0; border-radius: 4px; overflow: hidden; margin: 6px auto; background: #f8fafc; display: flex; align-items: center; justify-content: center;">
            <img src="assets/was_cathedral_sanitation.png" style="max-width: 100%; max-height: 100%; object-fit: contain;">
          </div>
          <span style="font-size: 0.62rem; color: #475569; line-height: 1.25; display: block; padding: 0 2px;">Bazalgette sewers, public health laws, and urban sanitation reform.</span>
        </div>
      </div>

      <!-- Active Prediction Prompt -->
      <div style="margin-top: 10px; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 12px; background: #ffffff;">
        <strong style="font-size: 11pt; color: #0c2340; display: block; margin-bottom: 6px;">🔮 Active Inquiry Prediction Prompt</strong>
        <p style="font-size: 0.72rem; color: #475569; margin: 0 0 12px 0; line-height: 1.45;">
          Based on the timeline above, which of these five eras do you predict represents the most significant turning point in sanitation history, and why? Consider the change in government policy, scientific understanding, or scale of impact.
        </p>
        <div style="display: flex; flex-direction: column; gap: 18px; margin-top: 8px;">
          <div style="border-bottom: 1.2px solid #555555; height: 1px;"></div>
          <div style="border-bottom: 1.2px solid #555555; height: 1px;"></div>
          <div style="border-bottom: 1.2px solid #555555; height: 1px;"></div>
        </div>
      </div>
    </div>
    <!-- FOOTER -->
  </div>
  `);

  // Loop through all 5 lessons
  for (let lessonNum = 1; lessonNum <= 5; lessonNum++) {
    const lessonBlock = document.getElementById(`lessonContent${lessonNum}`);
    if (!lessonBlock) continue;

    let enquiryQuestion = "";
    const h2El = lessonBlock.querySelector('h2');
    if (h2El) enquiryQuestion = h2El.textContent.trim();

    let sourceText = "";
    let sourceCite = "";
    let sourceTitle = "Contemporary Source Evidence";

    let doNow = [];
    const doNowAnswers = lessonBlock.querySelectorAll('.do-now-answer');
    doNowAnswers.forEach((ansSpan, idx) => {
      const parentBox = ansSpan.closest('div');
      const categoryEl = parentBox.querySelector('strong');
      const category = categoryEl ? categoryEl.textContent.trim() : 'Retrieval Grid';
      const questionEl = parentBox.querySelector('p');
      let question = questionEl ? questionEl.textContent.trim() : '';
      let qNum = 1;
      const match = question.match(/^Q(\d+)/i);
      if (match) {
        qNum = parseInt(match[1], 10);
        question = question.replace(/^Q\d+:\s*/i, '');
      } else if (question.startsWith('Q')) {
        const spaceIdx = question.indexOf(' ');
        if (spaceIdx !== -1) {
          const numStr = question.substring(1, spaceIdx).replace(':', '');
          qNum = parseInt(numStr, 10) || 1;
          question = question.substring(spaceIdx + 1).trim();
        }
      }
      doNow.push({
        num: qNum,
        category: category,
        question: question,
        answer: ansSpan.textContent.replace(/^Answer:\s*/i, '').trim()
      });
    });
    doNow.sort((a, b) => a.num - b.num);

    let sourceImgSrc = "";
    let sourceImgCaption = "";
    const imgEl = lessonBlock.querySelector('.knowledge-card img');
    if (imgEl) {
      sourceImgSrc = imgEl.getAttribute('src');
      const pEl = imgEl.nextElementSibling;
      if (pEl && pEl.tagName.toLowerCase() === 'p') {
        sourceImgCaption = pEl.textContent.trim();
      }
    }

    let vocab = [];
    const cards = lessonBlock.querySelectorAll('.knowledge-card');
    let vocabCard = null;
    cards.forEach(card => {
      const h4 = card.querySelector('h4');
      if (h4 && h4.textContent.toLowerCase().includes('vocabulary')) {
        vocabCard = card;
      }
    });
    if (vocabCard) {
      const vocabItems = vocabCard.querySelectorAll('ul li');
      vocabItems.forEach(li => {
        const strongEl = li.querySelector('strong');
        if (strongEl) {
          let defText = li.textContent.replace(strongEl.textContent, '').trim();
          if (defText.startsWith(':')) defText = defText.slice(1).trim();
          vocab.push({
            word: strongEl.textContent.trim().replace(/^🧹\s*|^🚽\s*|^🐴\s*|^🏚️\s*|^💨\s*|^☣️\s*|^🔬\s*|^👃\s*|^📜\s*|^💦\s*|^🏗️\s*/g, ''),
            definition: defText
          });
        }
      });
    }

    let paragraphs = [];
    const pEls = lessonBlock.querySelectorAll('.standard-narrative-block p');
    pEls.forEach(p => {
      paragraphs.push(p.innerHTML.trim());
    });

    let activities = [];
    let actBlock = null;
    cards.forEach(card => {
      const h4 = card.querySelector('h4');
      if (h4) {
        const text = h4.textContent.toLowerCase();
        if (text.includes('activities') || text.includes('writing tasks')) {
          actBlock = card;
        }
      }
    });

    if (actBlock) {
      const h5s = actBlock.querySelectorAll('h5');
      h5s.forEach(h5 => {
        const sectionTitle = h5.textContent.trim();
        const parentDiv = h5.closest('div');
        if (parentDiv) {
          const olEl = parentDiv.querySelector('ol');
          if (olEl) {
            const startVal = olEl.hasAttribute('start') ? parseInt(olEl.getAttribute('start'), 10) : 1;
            olEl.querySelectorAll('li').forEach((li, idx) => {
              const computedNum = startVal + idx;
              
              // Clone list item to strip inline helpers from question text
              const tempLi = li.cloneNode(true);
              const inlineStarter = tempLi.querySelector('.sentence-starter-inline');
              if (inlineStarter) inlineStarter.remove();
              const inlineModel = tempLi.querySelector('.model-answer-inline');
              if (inlineModel) inlineModel.remove();
              
              const questionText = tempLi.innerHTML.trim();
              
              // Extract model answer directly from inline block
              let ansText = "";
              const modelEl = li.querySelector('.model-answer-inline');
              if (modelEl) {
                ansText = modelEl.textContent.replace(/^Model Answer:\s*/i, '').trim();
              }
              
              activities.push({
                num: computedNum,
                question: questionText,
                section: sectionTitle,
                answer: ansText
              });
            });
          }
        }
      });
    }

    // 5. Contemporary Sources (Parse all that match)
    let sourcesHtml = "";
    const sourceCards = Array.from(lessonBlock.querySelectorAll('.knowledge-card')).filter(card => 
      card.querySelector('h4') && card.querySelector('h4').textContent.includes('Source')
    );
    
    sourceCards.forEach((sCard, sIdx) => {
      const h4 = sCard.querySelector('h4');
      const pQuote = sCard.querySelector('p');
      const citeEl = sCard.querySelector('cite');
      
      const sTitle = h4 ? h4.textContent.replace(/✍️|📝|📖|🗣️|👥|🔍|❓/g, '').trim() : 'Contemporary Source';
      const sText = pQuote ? pQuote.textContent.trim().replace(/^"\s*|\s*"$/g, '') : '';
      const sCite = citeEl ? citeEl.textContent.trim().replace(/^[—-\s]+/, '') : '';
      
      if (sIdx > 0) {
        sourcesHtml += `<div style="border-top: 1px dashed #cbd5e1; margin: 6px 0; padding-top: 6px;"></div>`;
      }
      
      sourcesHtml += `
        <div style="font-family: Georgia, serif;">
          <strong style="font-size: 0.76rem; color: #1e1b4b; font-family: 'Outfit', sans-serif; display: block; margin-bottom: 4px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 2px;">
            <i class="fa-solid fa-quote-left"></i> ${sTitle}
          </strong>
          <p style="font-size: 0.72rem; font-style: italic; margin: 0 0 4px 0; line-height: 1.35; text-align: justify;">
            "${sText}"
          </p>
          <cite style="display: block; text-align: right; font-size: 0.62rem; font-family: 'Outfit', sans-serif; font-weight: 700; color: #64748b;">
            — ${sCite}
          </cite>
        </div>
      `;
    });

    if (sourcesHtml === "") {
      const fallbackTitle = sourceTitle || "Contemporary Source Evidence";
      const fallbackText = sourceText || "I am surrounded by all kinds of noise...";
      const fallbackCite = sourceCite || "Seneca the Younger";
      sourcesHtml = `
        <div style="font-family: Georgia, serif;">
          <strong style="font-size: 0.76rem; color: #1e1b4b; font-family: 'Outfit', sans-serif; display: block; margin-bottom: 4px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 2px;">
            <i class="fa-solid fa-quote-left"></i> ${fallbackTitle}
          </strong>
          <p style="font-size: 0.72rem; font-style: italic; margin: 0 0 4px 0; line-height: 1.35; text-align: justify;">
            "${fallbackText}"
          </p>
          <cite style="display: block; text-align: right; font-size: 0.62rem; font-family: 'Outfit', sans-serif; font-weight: 700; color: #64748b;">
            — ${fallbackCite}
          </cite>
        </div>
      `;
    }

    let partDQuestions = [];
    if (actBlock) {
      const h5s = actBlock.querySelectorAll('h5');
      h5s.forEach(h5 => {
        const sectionTitle = h5.textContent.trim();
        if (sectionTitle.toLowerCase().includes('part d')) {
          const parentDiv = h5.closest('div');
          if (parentDiv) {
            const olEl = parentDiv.querySelector('ol');
            if (olEl) {
              const startVal = olEl.hasAttribute('start') ? parseInt(olEl.getAttribute('start'), 10) : 11;
              olEl.querySelectorAll('li').forEach((li, idx) => {
                const computedNum = startVal + idx;
                const tempLi = li.cloneNode(true);
                const inlineStarter = tempLi.querySelector('.sentence-starter-inline');
                if (inlineStarter) inlineStarter.remove();
                const inlineModel = tempLi.querySelector('.model-answer-inline');
                if (inlineModel) inlineModel.remove();
                
                partDQuestions.push({
                  num: computedNum,
                  question: tempLi.innerHTML.trim()
                });
              });
            }
          }
        }
      });
    }

    const answerStyle = includeAnswers 
      ? "display: block; color: #16a34a; font-weight: bold; margin-top: 4px;" 
      : "display: none;";

    let doNowHtml = '';
    doNow.forEach(q => {
      doNowHtml += `
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px; font-size: 0.68rem; line-height: 1.3; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; min-height: 100px;">
          <div>
            <strong style="color: #4f46e5; display: block; margin-bottom: 2px;">Q${q.num} [${q.category}]</strong>
            <span>${q.question}</span>
          </div>
          ${includeAnswers ? `<div style="color: #16a34a; font-weight: bold; margin-top: 4px;">A: ${q.answer}</div>` : `
            <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 14px;">
              <div style="border-bottom: 1.2px dashed #555555; height: 1px;"></div>
              <div style="border-bottom: 1.2px dashed #555555; height: 1px;"></div>
            </div>
          `}
        </div>
      `;
    });

    let vocabHtml = '';
    vocab.forEach(v => {
      vocabHtml += `
        <div style="font-size: 11pt; line-height: 1.3;">
          <strong>${v.word}:</strong> ${v.definition}
        </div>
      `;
    });

    let narrativeHtml = '';
    paragraphs.forEach(p => {
      narrativeHtml += `
        <p style="font-size: 12.5pt; line-height: 1.6; text-align: justify; margin: 0 0 6px 0;">
          ${p}
        </p>
      `;
    });

    let narrativeSectionHtml = '';
    if (lessonNum === 2) {
      // Prepend Misconception Buster
      narrativeSectionHtml += `
        <!-- Historical Misconception Buster Panel -->
        <div class="misconception-panel" style="display: grid; grid-template-columns: 45px 1fr; border: 1.5px solid #4f46e5; border-radius: 6px; overflow: hidden; margin-bottom: 8px; background: #ffffff; font-family: 'Outfit', sans-serif; box-sizing: border-box; width: 100%;">
          <div style="background: #4f46e5; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: #ffffff;">
            💡
          </div>
          <div style="padding: 6px 8px;">
            <h4 style="margin: 0 0 2px 0; font-family: 'Outfit', sans-serif; font-weight: 800; color: #4f46e5; font-size: 0.78rem;">
              Historical Misconception Buster: The Medieval Filth Myth
            </h4>
            <p style="margin: 0; font-size: 0.68rem; line-height: 1.35; color: #374151; text-align: justify;">
              <strong>The Myth:</strong> People in the Middle Ages were dirty, ignorant of hygiene, and happy to live in piles of rubbish.<br>
              <strong>The Reality:</strong> Medieval people understood that fresh water was vital and desperately wanted to live in clean environments. While they lacked the massive central funding of the Roman Empire for public aqueducts, town councils introduced laws fining citizens who threw waste in streets, hired public scavengers ("rakers"), and engineered complex stone conduits to pipe fresh spring water directly into town centers.
            </p>
          </div>
        </div>
      `;
    }

    narrativeSectionHtml += `
      <div style="column-count: 2; column-gap: 15px; border-bottom: 1.5px solid #e5e7eb; padding-bottom: 4px; margin-bottom: 8px;">
        ${narrativeHtml}
      </div>
    `;

    if (lessonNum === 2) {
      // Append Gongfermer Story & Highlighter Challenge
      narrativeSectionHtml += `
        <!-- Gongfermer Storytelling Container -->
        <div style="background-color: #f8fafc; border-left: 4px solid #4f46e5; padding: 8px 10px; border-radius: 4px; margin-top: 6px; margin-bottom: 6px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); font-family: 'Outfit', sans-serif; width: 100%; box-sizing: border-box;">
          <h4 style="margin: 0 0 3px 0; font-family: 'Outfit', sans-serif; font-weight: 800; color: #4f46e5; font-size: 0.85rem;">
            📜 Historical Storytelling: A Night in the Life of a Gongfermer
          </h4>
          <p style="font-family: Georgia, serif; font-size: 0.74rem; line-height: 1.45; color: #374151; font-style: italic; margin: 0; text-align: justify;">
            As the curfew bell tolling nine at night echoed over the dark roofs of London, Thomas tightened his leather apron and lit his small candle lantern. By order of the Common Council, he and his partner could not begin their grim labor until the streets were cleared of daytime traffic. Crawling down a wooden ladder into the dark cesspit beneath a wealthy merchant's stone house, the suffocating, heavy stench of human waste immediately filled his lungs. With his heavy iron shovel, Thomas began scooping the thick, foul night-soil into large wooden tubs, his muscles aching with the constant, repetitive lifting. Outside, his partner hauled the loaded tubs up by a thick hemp rope to empty them into a wooden cart, taking care not to spill waste onto the public cobblestones, which would result in a massive fine of forty pence. Working strictly before the five-o'clock morning bell, they would haul the cart outside the city walls to the fields of Finsbury, where farmers paid good silver coins to buy the waste as fertilizer. It was hazardous, exhausting work, but the high wages—nearly triple that of an ordinary laborer—made the nightly misery worthwhile.
          </p>
        </div>

        <!-- Highlighter Challenge Task Box -->
        <div class="task-box" style="background-color: rgba(79, 70, 229, 0.02); border: 1.2px dashed #cbd5e1; padding: 6px 8px; border-radius: 4px; margin-bottom: 6px; width: 100%; box-sizing: border-box;">
          <h5 style="margin: 0 0 2px 0; font-family: 'Outfit', sans-serif; font-weight: 700; color: #4f46e5; font-size: 0.72rem;">
            ✏️ The Dual-Color Literacy Challenge
          </h5>
          <p style="margin: 0; font-size: 0.7rem; line-height: 1.3; color: #374151;">
            <strong>The Dual-Color Literacy Challenge:</strong> Use a yellow highlighter to isolate sensory details of physical labor, and a green highlighter to mark legal or economic rules mentioned in the text.
          </p>
        </div>
      `;
    }

    const getQuestionBlock = (questionText, answerText, qIndex, lineCount = 3) => {
      const isDrawing = questionText.toLowerCase().includes('draw') || questionText.toLowerCase().includes('sketch');
      const isQ12OrQ13 = (qIndex === 12 || qIndex === 13);
      
      let answerBlock = '';
      if (includeAnswers) {
        if (isDrawing) {
          answerBlock = `<div style="color: #16a34a; font-style: italic; font-weight: 600; font-size: 0.74rem; margin-top: 2px; margin-bottom: 6px; line-height: 1.3;">A: [Student diagram / sketch illustrating: ${questionText.replace(/"/g, "'")}]</div>`;
        } else {
          answerBlock = `<div style="color: #16a34a; font-style: italic; font-weight: 600; font-size: 0.74rem; margin-top: 2px; margin-bottom: 6px; line-height: 1.3;">A: ${answerText}</div>`;
        }
      } else {
        if (isDrawing || isQ12OrQ13) {
          answerBlock = `<div style="height: 35mm; margin: 4px 0; background: #ffffff;"></div>`;
        } else {
          let rowsHtml = '';
          for (let i = 0; i < lineCount; i++) {
            rowsHtml += `<tr style="height: 20px;"><td style="border-bottom: 1.2px solid #555555; padding: 0; height: 20px;"></td></tr>`;
          }
          answerBlock = `<table style="width: 100%; height: ${lineCount * 20}px; border-collapse: collapse; margin-top: 4px; margin-bottom: 6px;">
              ${rowsHtml}
             </table>`;
        }
      }

      return `
        <div class="question-block" style="margin-bottom: 4px; font-size: 0.76rem; page-break-inside: avoid; line-height: 1.25;">
          <strong style="color: #374151; font-size: 12pt; font-weight: 700;">Q${qIndex}: ${questionText}</strong>
          ${answerBlock}
        </div>
      `;
    };

    let page2ActivitiesHtml = '<h3 style="color: #4f46e5; font-size: 0.82rem; text-transform: uppercase; font-weight: 700; margin-top: 6px; margin-bottom: 6px; border-bottom: 1px dashed #e5e7eb; padding-bottom: 2px;">Part A: Core Comprehension</h3>';
    let page3ActivitiesHtml = '<h3 style="color: #e11d48; font-size: 0.82rem; text-transform: uppercase; font-weight: 700; margin-top: 6px; margin-bottom: 6px; border-bottom: 1px dashed #e5e7eb; padding-bottom: 2px;">Part B: Conceptual Analysis</h3>';
    let page3SourceAnalysisHtml = '<h3 style="color: #10b981; font-size: 0.82rem; text-transform: uppercase; font-weight: 700; margin-top: 6px; margin-bottom: 6px; border-bottom: 1px dashed #e5e7eb; padding-bottom: 2px;">Part C: Source & Local Connection Analysis</h3>';

    activities.forEach(act => {
      let lineCount = 3;
      if (act.section.toLowerCase().includes('part a')) {
        lineCount = 3;
      } else if (act.section.toLowerCase().includes('part b')) {
        lineCount = 6;
      } else if (act.section.toLowerCase().includes('part c')) {
        lineCount = 8;
      }
      
      const qBlock = getQuestionBlock(act.question, act.answer, act.num, lineCount);
      if (act.section.toLowerCase().includes('part a')) {
        page2ActivitiesHtml += qBlock;
      } else if (act.section.toLowerCase().includes('part b')) {
        page3ActivitiesHtml += qBlock;
      } else if (act.section.toLowerCase().includes('part c')) {
        page3SourceAnalysisHtml += qBlock;
      }
    });

    let page4ActivitiesHtml = '<h3 style="color: #d97706; font-size: 0.82rem; text-transform: uppercase; font-weight: 700; margin-top: 6px; margin-bottom: 6px; border-bottom: 1px dashed #e5e7eb; padding-bottom: 2px;">Part D: Extension & Research Tasks</h3>';
    const filteredPartD = partDQuestions.filter(q => q.num !== 13);
    filteredPartD.forEach(q => {
      if (q.num === 12) {
        const q13 = partDQuestions.find(x => x.num === 13);
        const q12Text = q.question;
        const q13Text = q13 ? q13.question : '';
        
        let answerBlock = '';
        if (includeAnswers) {
          const matchAct12 = activities.find(a => a.num === 12);
          const matchAct13 = activities.find(a => a.num === 13);
          const ans12 = matchAct12 ? matchAct12.answer : '[Student Choice Response]';
          const ans13 = matchAct13 ? matchAct13.answer : '[Student Choice Response]';
          answerBlock = `
            <div style="color: #16a34a; font-style: italic; font-weight: 600; font-size: 0.74rem; margin-top: 2px; margin-bottom: 6px; line-height: 1.3;">
              <strong>A (Q12):</strong> ${ans12}<br>
              <strong>A (Q13):</strong> ${ans13}
            </div>
          `;
        } else {
          answerBlock = `<div style="height: 55mm; margin: 4px 0; background: #ffffff;"></div>`;
        }
        
        page4ActivitiesHtml += `
          <div class="question-block" style="margin-bottom: 4px; font-size: 0.76rem; page-break-inside: avoid; line-height: 1.25;">
            <strong style="color: #374151; font-size: 12pt; font-weight: 700; display: block; margin-bottom: 4px;">Q12 & Q13 [Choice Extension Tasks]: Complete either or both</strong>
            <div style="padding-left: 10px; border-left: 2px solid #d97706; margin-bottom: 6px;">
              <div style="margin-bottom: 3px;"><strong>Option A:</strong> ${q12Text}</div>
              <div><strong>Option B:</strong> ${q13Text}</div>
            </div>
            ${answerBlock}
          </div>
        `;
      } else {
        const matchAct = activities.find(a => a.num === q.num);
        const answerText = matchAct ? matchAct.answer : '[Student Independent Research / Practical Task]';
        const isDrawing = q.question.toLowerCase().includes('draw') || q.question.toLowerCase().includes('sketch');
        page4ActivitiesHtml += getQuestionBlock(q.question, answerText, q.num, isDrawing ? 3 : 6);
      }
    });

    const quoteVal = sourceText || "I am surrounded by all kinds of noise...";
    const citeVal = sourceCite || "Seneca the Younger";

    // Lesson Page 1: Do Now, Visual Source Evidence Box, Annotation Tasks
    pages.push(`
    <div class="page" style="page-break-before: always;">
      <div style="flex-grow: 0; width: 100%;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; border-bottom: 2px solid #4f46e5; padding-bottom: 4px;">
          <div style="max-width: 80%;">
            <span style="color: #4f46e5; font-weight: 800; font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">Meoncross School History • Unit Enquiry: Was the story of water and waste in Britain a steady climb of progress?</span>
            <h1 style="font-size: 0.92rem; font-weight: 800; margin: 0; color: #1e1b4b; line-height: 1.2;">${enquiryQuestion}</h1>
          </div>
          <span style="background: rgba(79, 70, 229, 0.1); color: #4f46e5; padding: 2px 6px; border-radius: 8px; font-weight: 700; font-size: 0.65rem;">Lesson ${lessonNum} Workbook Pack</span>
        </div>

        <div style="margin-bottom: 10px; width: 100%;">
          <div class="section-title">1. Do Now Retrieval Task</div>
          <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; width: 100%;">
            ${doNowHtml}
          </div>
        </div>

        <div style="width: 115mm; height: 60mm; border: 1px solid #333333; margin: 8px auto 4px auto; display: flex; justify-content: center; align-items: center; background: #ffffff; box-sizing: border-box; overflow: hidden;">
          <img src="${plateImages[lessonNum - 1] || 'assets/was_roman_bathhouse.png'}" style="max-width: 100%; max-height: 100%; object-fit: contain;" alt="Archaeological Source Photo Plate">
        </div>
        <div style="width: 115mm; margin: 0 auto 8px auto; font-size: 0.72rem; line-height: 1.35; color: #374151; text-align: left; font-family: 'Outfit', sans-serif;">
          ${plateCaptions[lessonNum - 1] || ''}
        </div>

        <div style="margin-top: 10px; font-size: 0.82rem; line-height: 1.5;">
          <strong style="color: #4f46e5; display: block; margin-bottom: 4px; text-transform: uppercase; font-size: 0.88rem; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 2px;">Visual Source Annotation Tasks:</strong>
          <div style="display: flex; flex-direction: column; gap: 4px; color: #374151; margin-bottom: 8px;">
            <div><strong>Task 1: Identify Key Details</strong> - Draw arrows to two physical details in the visual source and label what they show.</div>
            <div><strong>Task 2: Context & Utility</strong> - Annotate how these details link to your wider knowledge, and explain how the creator's purpose affects its utility for historians.</div>
          </div>
          <div style="margin-top: 6px;">
            <strong>Write 2 complete sentences explaining what this visual source reveals about power, wealth, or public health constraints in this era.</strong>
            <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 18px; padding-bottom: 4px;">
              <div style="border-bottom: 1px solid #e2e8f0; height: 1px;"></div>
              <div style="border-bottom: 1px solid #e2e8f0; height: 1px;"></div>
              <div style="border-bottom: 1px solid #e2e8f0; height: 1px;"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- FOOTER -->
    </div>
    `);

    // Lesson Page 2: Vocabulary, Core Summary Narrative, Contemporary Source Evidence, Class Discussion Prompts
    pages.push(`
    <div class="page" style="page-break-before: always;">
      <div style="flex-grow: 0; width: 100%;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; border-bottom: 2px solid #4f46e5; padding-bottom: 4px;">
          <div style="max-width: 80%;">
            <span style="color: #4f46e5; font-weight: 800; font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">Meoncross School History • Unit Enquiry: Was the story of water and waste in Britain a steady climb of progress?</span>
            <h1 style="font-size: 0.92rem; font-weight: 800; margin: 0; color: #1e1b4b; line-height: 1.2;">${enquiryQuestion}</h1>
          </div>
          <span style="background: rgba(79, 70, 229, 0.1); color: #4f46e5; padding: 2px 6px; border-radius: 8px; font-weight: 700; font-size: 0.65rem;">Lesson ${lessonNum} Workbook Pack</span>
        </div>

        <div style="margin-bottom: 8px;">
          <div class="section-title">2. Key Vocabulary</div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; background: rgba(79, 70, 229, 0.03); border: 1px solid #cbd5e1; padding: 8px; border-radius: 4px; font-size: 0.72rem;">
            ${vocabHtml}
          </div>
        </div>

        <div class="section-title">3. Core Summary Narrative</div>
        ${narrativeSectionHtml}

        <div style="display: grid; grid-template-columns: 1.8fr 1.2fr; gap: 12px; margin-top: 8px;">
          <div style="border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 4px; padding: 6px 10px;">
            ${sourcesHtml}
          </div>
          <div style="background: rgba(79, 70, 229, 0.03); border-left: 3px solid #4f46e5; padding: 6px 10px; border-radius: 4px; font-size: 0.7rem; line-height: 1.35;">
            <strong style="color: #4f46e5; font-size: 0.74rem; display: block; margin-bottom: 2px;">🗣️ Class Discussion Prompts:</strong>
            <ul style="margin: 0; padding-left: 10px; line-height: 1.4;">
              <li style="margin-bottom: 2px;">Why might different people in this era view this source differently?</li>
              <li style="margin-bottom: 2px;">What links can we make between this source and public sanitation?</li>
              <li>What does this tell us about contemporary attitudes?</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- FOOTER -->
    </div>
    `);

    if (lessonNum === 5) {
      // Build Vault Page 1 (Q1 to Q25)
      let vault1Col1Html = '';
      let vault1Col2Html = '';
      for (let i = 0; i < 25; i++) {
        const q = recallQuestions[i];
        const charcoalLoop = `<span style="display: inline-block; width: 26px; height: 11px; border-bottom: 1.2px solid #555555; border-left: 1.2px solid #555555; border-right: 1.2px solid #555555; border-radius: 0 0 9px 9px; margin-right: 5px; vertical-align: bottom; background: #ffffff;"></span>`;
        const ansText = includeAnswers ? `<span style="color: #16a34a; font-weight: bold; margin-left: 2px;">[Ans: ${q.answer}]</span>` : '';
        const qBlock = `
          <div style="margin-bottom: 4px; font-size: 0.65rem; line-height: 1.25; display: flex; align-items: flex-start; page-break-inside: avoid;">
            ${charcoalLoop}
            <div style="flex-grow: 1;">
              <strong>Q${q.num}:</strong> ${q.text} ${ansText}
            </div>
          </div>
        `;
        if (i < 13) {
          vault1Col1Html += qBlock;
        } else {
          vault1Col2Html += qBlock;
        }
      }

      // Build Vault Page 2 (Q26 to Q50)
      let vault2Col1Html = '';
      let vault2Col2Html = '';
      for (let i = 25; i < 50; i++) {
        const q = recallQuestions[i];
        const charcoalLoop = `<span style="display: inline-block; width: 26px; height: 11px; border-bottom: 1.2px solid #555555; border-left: 1.2px solid #555555; border-right: 1.2px solid #555555; border-radius: 0 0 9px 9px; margin-right: 5px; vertical-align: bottom; background: #ffffff;"></span>`;
        const ansText = includeAnswers ? `<span style="color: #16a34a; font-weight: bold; margin-left: 2px;">[Ans: ${q.answer}]</span>` : '';
        const qBlock = `
          <div style="margin-bottom: 4px; font-size: 0.65rem; line-height: 1.25; display: flex; align-items: flex-start; page-break-inside: avoid;">
            ${charcoalLoop}
            <div style="flex-grow: 1;">
              <strong>Q${q.num}:</strong> ${q.text} ${ansText}
            </div>
          </div>
        `;
        if (i < 38) {
          vault2Col1Html += qBlock;
        } else {
          vault2Col2Html += qBlock;
        }
      }

      // Push Vault Page 1 (Page 22)
      pages.push(`
      <div class="page" style="page-break-before: always; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="flex-grow: 0; width: 100%;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; border-bottom: 2px solid #4f46e5; padding-bottom: 4px;">
            <div style="max-width: 80%;">
              <span style="color: #4f46e5; font-weight: 800; font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">Meoncross School History • Unit Active Recall Suite</span>
              <h1 style="font-size: 0.92rem; font-weight: 800; margin: 0; color: #1e1b4b; line-height: 1.2;">Master Knowledge Recall Vault (Part 1)</h1>
            </div>
            <span style="background: rgba(79, 70, 229, 0.1); color: #4f46e5; padding: 2px 6px; border-radius: 8px; font-weight: 700; font-size: 0.65rem;">Recall Vault</span>
          </div>

          <h2 class="section-title" style="margin-top: 4px; margin-bottom: 8px; font-size: 1.05rem; font-weight: 800;">50-Question Master Recall: Questions 1-25</h2>
          <p style="font-size: 0.72rem; line-height: 1.4; color: #4b5563; margin: 0 0 10px 0; text-align: justify;">
            Test your long-term memory of the unit. Write the correct short answer in the U-shaped loop next to each question.
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px 15px;">
            <div style="display: flex; flex-direction: column; gap: 6px;">
              \${vault1Col1Html}
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              \${vault1Col2Html}
            </div>
          </div>
        </div>
        <!-- FOOTER -->
      </div>
      `);

      // Push Vault Page 2 (Page 23)
      pages.push(`
      <div class="page" style="page-break-before: always; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="flex-grow: 0; width: 100%;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; border-bottom: 2px solid #4f46e5; padding-bottom: 4px;">
            <div style="max-width: 80%;">
              <span style="color: #4f46e5; font-weight: 800; font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">Meoncross School History • Unit Active Recall Suite</span>
              <h1 style="font-size: 0.92rem; font-weight: 800; margin: 0; color: #1e1b4b; line-height: 1.2;">Master Knowledge Recall Vault (Part 2)</h1>
            </div>
            <span style="background: rgba(79, 70, 229, 0.1); color: #4f46e5; padding: 2px 6px; border-radius: 8px; font-weight: 700; font-size: 0.65rem;">Recall Vault</span>
          </div>

          <h2 class="section-title" style="margin-top: 4px; margin-bottom: 8px; font-size: 1.05rem; font-weight: 800;">50-Question Master Recall: Questions 26-50</h2>
          <p style="font-size: 0.72rem; line-height: 1.4; color: #4b5563; margin: 0 0 10px 0; text-align: justify;">
            Test your long-term memory of the unit. Write the correct short answer in the U-shaped loop next to each question.
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px 15px;">
            <div style="display: flex; flex-direction: column; gap: 6px;">
              \${vault2Col1Html}
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              \${vault2Col2Html}
            </div>
          </div>
        </div>
        <!-- FOOTER -->
      </div>
      `);
    }

    // Lesson Page 3: Part A & Part B
    pages.push(`
    <div class="page" style="page-break-before: always; display: flex; flex-direction: column; justify-content: space-between;">
      <div class="page-content-wrapper" style="flex-grow: 0; width: 100%;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; border-bottom: 2px solid #4f46e5; padding-bottom: 4px;">
          <div style="max-width: 80%;">
            <span style="color: #4f46e5; font-weight: 800; font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">Meoncross School History • Unit Enquiry: Was the story of water and waste in Britain a steady climb of progress?</span>
            <h1 style="font-size: 0.92rem; font-weight: 800; margin: 0; color: #1e1b4b; line-height: 1.2;">${enquiryQuestion}</h1>
          </div>
          <span style="background: rgba(79, 70, 229, 0.1); color: #4f46e5; padding: 2px 6px; border-radius: 8px; font-weight: 700; font-size: 0.65rem;">Lesson ${lessonNum} Workbook Pack</span>
        </div>

        <div style="display: flex; flex-direction: column; margin-bottom: 4px;">
          ${page2ActivitiesHtml}
        </div>
        <div style="display: flex; flex-direction: column; margin-top: 6px;">
          ${page3ActivitiesHtml}
        </div>
      </div>
      <div class="was-dynamic-lines-container"></div>
      <!-- Unit Enquiry Judgment Meter -->
      <div style="margin-top: 4px; border-top: 1px solid #cbd5e1; padding-top: 4px; font-family: 'Outfit', sans-serif; box-sizing: border-box; width: 100%; margin-bottom: 2px;">
        <span style="font-size: 0.62rem; font-weight: 700; color: #1e1b4b; text-transform: uppercase; letter-spacing: 0.03em; display: block; margin-bottom: 2px; text-align: center;">
          Unit Enquiry Judgment Meter: Place an 'X' on the line to rank this era
        </span>
        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.62rem; color: #475569; font-weight: 600; padding: 0 10px; position: relative;">
          <span style="width: 25%; text-align: left;">[ Regression</span>
          <div style="flex-grow: 1; height: 1.5px; background: #cbd5e1; margin: 0 10px; position: relative; display: flex; align-items: center; justify-content: space-between;">
            <span style="width: 4px; height: 4px; border-radius: 50%; background: #4f46e5;"></span>
            <span style="font-weight: 700; color: #4f46e5; font-size: 0.55rem; background: #ffffff; padding: 0 4px; transform: translateY(-1px); border: 1px solid #cbd5e1; border-radius: 3px;">Stagnation / Continuity</span>
            <span style="width: 4px; height: 4px; border-radius: 50%; background: #4f46e5;"></span>
          </div>
          <span style="width: 25%; text-align: right;">Steady Progress ]</span>
        </div>
      </div>
      <!-- FOOTER -->
    </div>
    `);

    // Lesson Page 4: Part C & Part D (with empty sketches Q12 & Q13)
    pages.push(`
    <div class="page" style="page-break-before: always; display: flex; flex-direction: column; justify-content: space-between;">
      <div class="page-content-wrapper" style="flex-grow: 0; width: 100%;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; border-bottom: 2px solid #4f46e5; padding-bottom: 4px;">
          <div style="max-width: 80%;">
            <span style="color: #4f46e5; font-weight: 800; font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">Meoncross School History • Unit Enquiry: Was the story of water and waste in Britain a steady climb of progress?</span>
            <h1 style="font-size: 0.92rem; font-weight: 800; margin: 0; color: #1e1b4b; line-height: 1.2;">${enquiryQuestion}</h1>
          </div>
          <span style="background: rgba(79, 70, 229, 0.1); color: #4f46e5; padding: 2px 6px; border-radius: 8px; font-weight: 700; font-size: 0.65rem;">Lesson ${lessonNum} Workbook Pack</span>
        </div>

        <div style="display: flex; flex-direction: column; margin-bottom: 4px;">
          ${page3SourceAnalysisHtml}
        </div>

        <div style="display: flex; flex-direction: column; line-height: 1.2; margin-top: 6px;">
          ${page4ActivitiesHtml}
        </div>
      </div>
      <div class="was-dynamic-lines-container"></div>
      <!-- Unit Enquiry Judgment Meter -->
      <div style="margin-top: 4px; border-top: 1px solid #cbd5e1; padding-top: 4px; font-family: 'Outfit', sans-serif; box-sizing: border-box; width: 100%; margin-bottom: 2px;">
        <span style="font-size: 0.62rem; font-weight: 700; color: #1e1b4b; text-transform: uppercase; letter-spacing: 0.03em; display: block; margin-bottom: 2px; text-align: center;">
          Unit Enquiry Judgment Meter: Place an 'X' on the line to rank this era
        </span>
        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.62rem; color: #475569; font-weight: 600; padding: 0 10px; position: relative;">
          <span style="width: 25%; text-align: left;">[ Regression</span>
          <div style="flex-grow: 1; height: 1.5px; background: #cbd5e1; margin: 0 10px; position: relative; display: flex; align-items: center; justify-content: space-between;">
            <span style="width: 4px; height: 4px; border-radius: 50%; background: #4f46e5;"></span>
            <span style="font-weight: 700; color: #4f46e5; font-size: 0.55rem; background: #ffffff; padding: 0 4px; transform: translateY(-1px); border: 1px solid #cbd5e1; border-radius: 3px;">Stagnation / Continuity</span>
            <span style="width: 4px; height: 4px; border-radius: 50%; background: #4f46e5;"></span>
          </div>
          <span style="width: 25%; text-align: right;">Steady Progress ]</span>
        </div>
      </div>
      <!-- FOOTER -->
    </div>
    `);
  }
  // --- Page 26: The Dual-Pass Active Glossary ---
  pages.push(`
  <div class="page" style="page-break-before: always; display: flex; flex-direction: column; justify-content: space-between;">
    <div style="flex-grow: 0; width: 100%;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; border-bottom: 2px solid #1e3a8a; padding-bottom: 4px;">
        <div>
          <span style="color: #1e3a8a; font-weight: 800; font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">Meoncross School History • Unit Active Recall Tools</span>
          <h1 style="font-size: 0.92rem; font-weight: 800; margin: 0; color: #0c2340; line-height: 1.2;">The Dual-Pass Active Glossary</h1>
        </div>
        <span style="background: rgba(12, 35, 64, 0.1); color: #0c2340; padding: 2px 6px; border-radius: 8px; font-weight: 700; font-size: 0.65rem;">Active Glossary</span>
      </div>

      <h2 class="section-title" style="margin-top: 6px; margin-bottom: 10px; font-size: 1.1rem; font-weight: 800;">Key Terms & Retrieval Testing</h2>
      <p style="font-size: 0.74rem; line-height: 1.4; color: #475569; margin: 0 0 15px 0; text-align: justify;">
        Test your recall of key unit terms. In the definition column, a critical keyword has been blanked out. Read the definition and write the missing word in the blank space provided.
      </p>

      <table style="width: 100%; border-collapse: collapse; font-size: 0.76rem; border: 1px solid #cbd5e1;">
        <thead>
          <tr style="background: #0c2340; color: #ffffff;">
            <th style="padding: 8px 12px; border: 1px solid #cbd5e1; width: 28%; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">Key Historical Term</th>
            <th style="padding: 8px 12px; border: 1px solid #cbd5e1; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">Active Retrieval Definition</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px 12px; border: 1px solid #cbd5e1; font-weight: bold; color: #0c2340; background: #f8fafc;">Gongfermer</td>
            <td style="padding: 10px 12px; border: 1px solid #cbd5e1; line-height: 1.45;">
              A specialized medieval laborer paid to empty human waste from town cesspits, working exclusively under the cover of <strong>______________________</strong>.
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border: 1px solid #cbd5e1; font-weight: bold; color: #0c2340; background: #f8fafc;">Conduit</td>
            <td style="padding: 10px 12px; border: 1px solid #cbd5e1; line-height: 1.45;">
              A pipe or channel (often made of lead or wood) designed to transport fresh drinking water from rural springs into medieval <strong>______________________</strong>.
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border: 1px solid #cbd5e1; font-weight: bold; color: #0c2340; background: #f8fafc;">Miasma Theory</td>
            <td style="padding: 10px 12px; border: 1px solid #cbd5e1; line-height: 1.45;">
              The false medical belief that diseases like cholera and the plague were spread by bad <strong>______________________</strong> and foul odors in the air.
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border: 1px solid #cbd5e1; font-weight: bold; color: #0c2340; background: #f8fafc;">Laissez-faire</td>
            <td style="padding: 10px 12px; border: 1px solid #cbd5e1; line-height: 1.45;">
              A French term describing a government policy of <strong>______________________</strong> in public health matters, leaving citizens to manage alone.
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border: 1px solid #cbd5e1; font-weight: bold; color: #0c2340; background: #f8fafc;">Cholera</td>
            <td style="padding: 10px 12px; border: 1px solid #cbd5e1; line-height: 1.45;">
              A water-borne epidemic disease that causes severe diarrhea and dehydration, caused by drinking water contaminated with <strong>______________________</strong>.
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border: 1px solid #cbd5e1; font-weight: bold; color: #0c2340; background: #f8fafc;">Sanitarian</td>
            <td style="padding: 10px 12px; border: 1px solid #cbd5e1; line-height: 1.45;">
              A social reformer (such as Edwin Chadwick) who argued that cleaning the urban environment was necessary to reduce disease and <strong>______________________</strong>.
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border: 1px solid #cbd5e1; font-weight: bold; color: #0c2340; background: #f8fafc;">Germ Theory</td>
            <td style="padding: 10px 12px; border: 1px solid #cbd5e1; line-height: 1.45;">
              Louis Pasteur's scientific discovery (1861) that microscopic organisms, rather than bad air, cause infection and spread <strong>______________________</strong>.
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border: 1px solid #cbd5e1; font-weight: bold; color: #0c2340; background: #f8fafc;">Aqueduct</td>
            <td style="padding: 10px 12px; border: 1px solid #cbd5e1; line-height: 1.45;">
              A massive stone bridge structure engineered by the Romans to transport fresh spring water across valleys using <strong>______________________</strong>.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- FOOTER -->
  </div>
  `);

  // --- Page 27: Expanded Curator's Shop & Architecture ---
  pages.push(`
  <div class="page" style="page-break-before: always; display: flex; flex-direction: column; justify-content: space-between;">
    <div style="flex-grow: 1; width: 100%;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; border-bottom: 2px solid #1e3a8a; padding-bottom: 4px;">
        <div>
          <span style="color: #1e3a8a; font-weight: 800; font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">Meoncross School History • Unit Exhibition Project</span>
          <h1 style="font-size: 0.92rem; font-weight: 800; margin: 0; color: #0c2340; line-height: 1.2;">The Curator's Market & Gallery Blueprint</h1>
        </div>
        <span style="background: rgba(12, 35, 64, 0.1); color: #0c2340; padding: 2px 6px; border-radius: 8px; font-weight: 700; font-size: 0.65rem;">Exhibition Planner</span>
      </div>

      <!-- Top: Curator's Market -->
      <div style="border: 1.5px solid #0c2340; border-radius: 6px; padding: 10px; background: #fafafa; margin-bottom: 12px; box-sizing: border-box;">
        <strong style="font-size: 0.82rem; color: #0c2340; display: block; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 2px;">
          🛒 The Curator's Market & Artifact Vault
        </strong>
        <p style="font-size: 0.7rem; color: #475569; margin: 0 0 8px 0; line-height: 1.35;">
          <strong>Instructions:</strong> Calculate your budget using your <strong>Total Retrieval Score</strong> from Page 2. Select 3–4 items from the vault below to place in your exhibition gallery, staying within your point budget.
        </p>

        <!-- Grid of Tiers -->
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; font-size: 0.62rem; line-height: 1.35;">
          <!-- Free Tier -->
          <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px;">
            <strong style="color: #64748b; display: block; margin-bottom: 2px; border-bottom: 1px dashed #cbd5e1;">Free Tier (0pts)</strong>
            <ul style="margin: 0; padding-left: 8px;">
              <li>Wooden Scraping Stick</li>
              <li>Thames Water Bucket</li>
            </ul>
          </div>
          <!-- Extras Tier -->
          <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px;">
            <strong style="color: #b45309; display: block; margin-bottom: 2px; border-bottom: 1px dashed #cbd5e1;">Extras Tier (1pt)</strong>
            <ul style="margin: 0; padding-left: 8px;">
              <li>Water Cart Model</li>
              <li>Scavenger Shovel</li>
              <li>Contaminated Sample</li>
            </ul>
          </div>
          <!-- Common Tier -->
          <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px;">
            <strong style="color: #059669; display: block; margin-bottom: 2px; border-bottom: 1px dashed #cbd5e1;">Common Tier (2pts)</strong>
            <ul style="margin: 0; padding-left: 8px;">
              <li>Roman Sponge-stick</li>
              <li>Medieval Moss Pouch</li>
              <li>Broad Street Handle</li>
            </ul>
          </div>
          <!-- Rare Tier -->
          <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px;">
            <strong style="color: #2563eb; display: block; margin-bottom: 2px; border-bottom: 1px dashed #cbd5e1;">Rare Tier (3pts)</strong>
            <ul style="margin: 0; padding-left: 8px;">
              <li>Eadwine Schematic</li>
              <li>Lead Pipe Joint</li>
              <li>Harington Valve</li>
              <li>Merchant's Silver Basin</li>
            </ul>
          </div>
          <!-- Epic Tier -->
          <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px;">
            <strong style="color: #7c3aed; display: block; margin-bottom: 2px; border-bottom: 1px dashed #cbd5e1;">Epic Tier (5pts)</strong>
            <ul style="margin: 0; padding-left: 8px;">
              <li>Fareham Red Pipe</li>
              <li>Pasteur Flask</li>
              <li>Crossness Girder</li>
              <li>Subscription Token</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom: Isometric Floor Plan Box -->
      <div style="border: 1.5px solid #0c2340; border-radius: 6px; padding: 12px; background: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.02); box-sizing: border-box; flex-grow: 1; display: flex; flex-direction: column;">
        <strong style="font-size: 0.82rem; color: #0c2340; display: block; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 4px;">
          📐 My Exhibition Gallery Blueprint
        </strong>
        <p style="font-size: 0.72rem; color: #475569; margin: 0 0 10px 0; line-height: 1.45;">
          Sketch your exhibition layout from above. Allocate your selected artifacts into the three designated chambers based on how they represent setbacks, class privileges, or public progress.
        </p>

        <!-- Blueprint Layout Grid (Isometric-style layout box) -->
        <div style="flex-grow: 1; border: 2px dashed #0c2340; border-radius: 6px; padding: 10px; background: #fafafa; position: relative; min-height: 100mm; display: grid; grid-template-columns: 1fr 1.2fr 1fr; gap: 15px; box-sizing: border-box;">
          
          <!-- Room 1 -->
          <div style="border: 2px solid #555555; border-radius: 4px; background: #ffffff; padding: 10px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: inset 0 0 8px rgba(0,0,0,0.03);">
            <div>
              <span style="font-size: 0.65rem; color: #64748b; font-weight: bold; text-transform: uppercase;">Exhibition Wing A</span>
              <h3 style="font-size: 0.8rem; color: #0c2340; margin: 2px 0 0 0; font-weight: bold; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">Room 1: Setbacks & Stagnation</h3>
            </div>
            <div style="border: 1px dashed #cbd5e1; flex-grow: 1; margin: 10px 0; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 0.58rem; color: #94a3b8; font-style: italic;">
              [Draw your objects representing cholera, mud wells, or plague here]
            </div>
            <span style="font-size: 0.58rem; color: #64748b;">Focus: Iron Age, Medieval Towns, Industrial Slums</span>
          </div>

          <!-- Room 2 -->
          <div style="border: 2px solid #555555; border-radius: 4px; background: #ffffff; padding: 10px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: inset 0 0 8px rgba(0,0,0,0.03);">
            <div>
              <span style="font-size: 0.65rem; color: #64748b; font-weight: bold; text-transform: uppercase;">Exhibition Wing B</span>
              <h3 style="font-size: 0.8rem; color: #0c2340; margin: 2px 0 0 0; font-weight: bold; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">Room 2: Wealth & Privilege</h3>
            </div>
            <div style="border: 1px dashed #cbd5e1; flex-grow: 1; margin: 10px 0; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 0.58rem; color: #94a3b8; font-style: italic;">
              [Draw your objects representing Roman bathhouses, monasteries, or silver basins]
            </div>
            <span style="font-size: 0.58rem; color: #64748b;">Focus: Monastic networks, Private reservoirs, Noble estates</span>
          </div>

          <!-- Room 3 -->
          <div style="border: 2px solid #555555; border-radius: 4px; background: #ffffff; padding: 10px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: inset 0 0 8px rgba(0,0,0,0.03);">
            <div>
              <span style="font-size: 0.65rem; color: #64748b; font-weight: bold; text-transform: uppercase;">Exhibition Wing C</span>
              <h3 style="font-size: 0.8rem; color: #0c2340; margin: 2px 0 0 0; font-weight: bold; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">Room 3: Democratic Progress</h3>
            </div>
            <div style="border: 1px dashed #cbd5e1; flex-grow: 1; margin: 10px 0; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 0.58rem; color: #94a3b8; font-style: italic;">
              [Draw your objects representing Bazalgette sewers, Pasteur flasks, or Public Health acts]
            </div>
            <span style="font-size: 0.58rem; color: #64748b;">Focus: State sewers, Pasteur germ science, Public Health laws</span>
          </div>

        </div>
      </div>
    </div>
    <!-- FOOTER -->
  </div>
  `);

  // --- Page 28: The Gallery Canvas & Placards ---
  pages.push(`
  <div class="page" style="page-break-before: always; display: flex; flex-direction: column; justify-content: space-between;">
    <div style="flex-grow: 1; width: 100%; display: flex; flex-direction: column;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; border-bottom: 2px solid #1e3a8a; padding-bottom: 4px;">
        <div>
          <span style="color: #1e3a8a; font-weight: 800; font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">Meoncross School History • Exhibition Gallery Canvas</span>
          <h1 style="font-size: 0.92rem; font-weight: 800; margin: 0; color: #0c2340; line-height: 1.2;">My Physical Exhibit & Curator Labels</h1>
        </div>
        <span style="background: rgba(12, 35, 64, 0.1); color: #0c2340; padding: 2px 6px; border-radius: 8px; font-weight: 700; font-size: 0.65rem;">Gallery Canvas</span>
      </div>

      <!-- Top half: Physical Exhibit Drawing Block -->
      <div style="border: 1.5px solid #0c2340; border-radius: 6px; padding: 10px; background: #ffffff; margin-bottom: 12px; display: flex; flex-direction: column; height: 80mm; box-sizing: border-box;">
        <strong style="font-size: 0.82rem; color: #0c2340; display: block; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 2px;">
          🖼️ My Physical Exhibit Layout & Display Case Sketch
        </strong>
        <p style="font-size: 0.68rem; color: #475569; margin: 0 0 6px 0; line-height: 1.35;">
          Draw a 3D sketch of your gallery stand or display case, showing how visitors will view your primary artifact and supporting material culture.
        </p>
        <div style="flex-grow: 1; border: 1.5px dashed #cbd5e1; border-radius: 4px; background: #fafafa; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; color: #94a3b8; font-style: italic;">
          [Sketch your display case layout, lighting, and object mounts here]
        </div>
      </div>

      <!-- Bottom half: Two Museum Placard Templates -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; flex-grow: 1; box-sizing: border-box;">
        
        <!-- Placard 1 -->
        <div style="border: 2px solid #0c2340; border-radius: 6px; padding: 10px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 2px 2px 5px rgba(0,0,0,0.05); box-sizing: border-box;">
          <div>
            <strong style="font-size: 0.8rem; color: #0c2340; display: block; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.05em; text-align: center; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 2px;">
              🏛️ Official Curator Display Label
            </strong>
            <div style="font-size: 0.65rem; color: #374151; display: flex; flex-direction: column; gap: 4px;">
              <div><strong>Artifact Catalog ID:</strong> _______________________</div>
              <div><strong>Chosen Placement Room:</strong> _________________</div>
              <div style="font-size: 0.58rem; color: #64748b; margin-top: 2px;">
                <strong>Progress Judgment:</strong> [ Steady Climb / Continuity / Regression ]
              </div>
            </div>
          </div>
          
          <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 14px; flex-grow: 1; justify-content: flex-end; padding-bottom: 4px;">
            <div style="font-size: 0.58rem; color: #64748b; font-style: italic; margin-bottom: -4px;">Significance & Historical Narrative:</div>
            <div style="border-bottom: 1.2px solid #555555; height: 1px;"></div>
            <div style="border-bottom: 1.2px solid #555555; height: 1px;"></div>
            <div style="border-bottom: 1.2px solid #555555; height: 1px;"></div>
            <div style="border-bottom: 1.2px solid #555555; height: 1px;"></div>
            <div style="border-bottom: 1.2px solid #555555; height: 1px;"></div>
          </div>
        </div>

        <!-- Placard 2 -->
        <div style="border: 2px solid #0c2340; border-radius: 6px; padding: 10px; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 2px 2px 5px rgba(0,0,0,0.05); box-sizing: border-box;">
          <div>
            <strong style="font-size: 0.8rem; color: #0c2340; display: block; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.05em; text-align: center; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 2px;">
              🏛️ Official Curator Display Label
            </strong>
            <div style="font-size: 0.65rem; color: #374151; display: flex; flex-direction: column; gap: 4px;">
              <div><strong>Artifact Catalog ID:</strong> _______________________</div>
              <div><strong>Chosen Placement Room:</strong> _________________</div>
              <div style="font-size: 0.58rem; color: #64748b; margin-top: 2px;">
                <strong>Progress Judgment:</strong> [ Steady Climb / Continuity / Regression ]
              </div>
            </div>
          </div>
          
          <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 14px; flex-grow: 1; justify-content: flex-end; padding-bottom: 4px;">
            <div style="font-size: 0.58rem; color: #64748b; font-style: italic; margin-bottom: -4px;">Significance & Historical Narrative:</div>
            <div style="border-bottom: 1.2px solid #555555; height: 1px;"></div>
            <div style="border-bottom: 1.2px solid #555555; height: 1px;"></div>
            <div style="border-bottom: 1.2px solid #555555; height: 1px;"></div>
            <div style="border-bottom: 1.2px solid #555555; height: 1px;"></div>
            <div style="border-bottom: 1.2px solid #555555; height: 1px;"></div>
          </div>
        </div>

      </div>
    </div>
    <!-- FOOTER -->
  `);

  // Build the complete booklet HTML
  let bookletHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>KS3 Water & Sanitation Complete Unit Booklet</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Outfit', sans-serif;
      margin: 0;
      padding: 0;
      background: #f3f4f6;
      color: #374151;
      line-height: 1.5;
    }
    .page {
      width: 210mm;
      height: 297mm;
      background: #ffffff;
      margin: 10px auto;
      padding: 8mm 15mm;
      box-shadow: 0 4px 10px rgba(0,0,0,0.06);
      border: 1px solid #e5e7eb;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .page-landscape {
      width: 297mm;
      height: 210mm;
      background: #ffffff;
      margin: 10px auto;
      padding: 8mm 15mm;
      box-shadow: 0 4px 10px rgba(0,0,0,0.06);
      border: 1px solid #e5e7eb;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    h1, h2, h3, h4, h5 {
      color: #1e1b4b;
      margin-top: 0;
      margin-bottom: 4px;
    }
    .section-title {
      border-bottom: 2px solid #e5e7eb;
      padding-top: 2px;
      padding-bottom: 2px;
      margin-top: 4px;
      margin-bottom: 4px;
      font-weight: 800;
      color: #4f46e5;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .part-header, h3 {
      margin-top: 4px !important;
      margin-bottom: 4px !important;
      padding-top: 2px !important;
      padding-bottom: 2px !important;
    }
    .question-block {
      margin-top: 0px !important;
      margin-bottom: 4px !important;
      padding-top: 4px !important;
      padding-bottom: 4px !important;
    }
    .student-fields {
      border: 1.5px solid #e5e7eb;
      border-radius: 6px;
      padding: 6px 12px;
      margin-bottom: 8px;
      background: #fafafa;
      display: flex;
      gap: 20px;
    }
    .student-fields span {
      font-size: 0.72rem;
      color: #4b5563;
    }
    .page-footer {
      position: absolute;
      bottom: 10mm;
      left: 15mm;
      right: 15mm;
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #e5e7eb;
      padding-top: 4px;
      font-size: 0.62rem;
      color: #9ca3af;
    }
    img {
      max-height: 110mm !important;
    }
    .was-dynamic-lines-container {
      flex-grow: 1;
      width: 100%;
      margin-top: 8px;
      margin-bottom: 8mm;
      box-sizing: border-box;
      overflow: hidden;
    }
    @media print {
      @page {
        size: A4;
        margin: 0;
      }
      @page landscape-page {
        size: A4 landscape;
        margin: 0;
      }
      body {
        background: #ffffff;
        color: #000000;
        margin: 0;
        -webkit-print-color-adjust: exact;
      }
      .page {
        margin: 0 !important;
        border: none !important;
        box-shadow: none !important;
        width: 210mm;
        height: 297mm;
        page-break-after: always;
        page-break-inside: avoid;
        padding: 10mm 15mm;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
      }
      .page-landscape {
        page: landscape-page;
        margin: 0 !important;
        border: none !important;
        box-shadow: none !important;
        width: 297mm;
        height: 210mm;
        page-break-after: always;
        page-break-inside: avoid;
        padding: 10mm 15mm;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
      }
      .page:last-child, .page-landscape:last-child {
        page-break-after: avoid;
      }
      .page-lined-space {
        flex-grow: 1;
        width: 100%;
        margin-top: 10px;
        margin-bottom: 12mm;
        background-image: linear-gradient(to bottom, transparent 23px, #cbd5e1 23px);
        background-size: 100% 24px;
        min-height: 24px;
      }
      .hint-toggle, button {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  `;

  const totalPageCount = pages.length;
  pages.forEach((pageContent, idx) => {
    const pageNum = idx + 1;
    const footerHtml = `
      <div class="page-footer">
        <span>KS3 History Study Unit: Water and Sanitation</span>
        <span>Page ${pageNum} of ${totalPageCount}</span>
      </div>
    `;
    bookletHtml += pageContent.replace('<!-- FOOTER -->', footerHtml);
  });

  bookletHtml += `
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.was-dynamic-lines-container').forEach(container => {
        const remaining = container.clientHeight;
        const lineSpacing = 30.2; // 8mm in pixels
        const numLines = Math.floor(remaining / lineSpacing);
        
        if (numLines > 0) {
          let content = '';
          if (numLines > 3) {
            content += '<div style="font-style: italic; font-size: 0.72rem; color: #555555; margin-bottom: 4px; font-weight: normal; font-family: \\'Outfit\\', sans-serif;">Extension Space: Use these lines to expand your analysis with an extra piece of evidence.</div>';
          }
          for (let i = 0; i < numLines; i++) {
            content += '<div style="height: 8mm; border-bottom: 1.2px solid #555555; box-sizing: border-box; width: 100%;"></div>';
          }
          container.innerHTML = content;
        }
      });
    });
  </script>
</body>
</html>
  `;
  
  return bookletHtml;
};

// 8.5 Toggle Do Now Answers & Pupil Activity Model Answers
window.toggleDoNowAnswers = function(event) {
  const btn = event.currentTarget;
  const parent = btn.closest('.lesson-content-block') || btn.closest('.knowledge-card') || document;
  const answers = parent.querySelectorAll('.do-now-answer');
  if (answers.length === 0) return;
  const isHidden = (answers[0].style.display === 'none');
  
  answers.forEach(ans => {
    ans.style.display = isHidden ? 'inline' : 'none';
  });
  
  if (isHidden) {
    btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Hide Do Now Answers';
  } else {
    btn.innerHTML = '<i class="fa-solid fa-eye"></i> Reveal Do Now Answers';
  }
};

window.toggleModelAnswers = function(event) {
  // Deprecated - replaced by inline toggleModelAnswersInline
};

// 9. Theme toggle & Initializer
window.setupTheme = function() {
  const toggleBtn = document.getElementById("themeToggleBtn");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const nextTheme = appState.theme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", nextTheme);
      appState.theme = nextTheme;
      localStorage.setItem("was_theme", nextTheme);
    });
  }
};

window.switchLesson = function(lessonNum) {
  appState.activeLesson = lessonNum;
  
  // Reset quick quiz state for this lesson
  quickQuizState.currentQuestionIndex = 0;
  quickQuizState.selectedAnswer = null;
  quickQuizState.isSubmitted = false;
  quickQuizState.correctAnswersCount = 0;

  // Hide all lesson content blocks
  const blocks = document.querySelectorAll(".lesson-content-block");
  blocks.forEach(b => {
    b.style.display = "none";
  });
  
  // Show target lesson block
  const target = document.getElementById(`lessonContent${lessonNum}`);
  if (target) {
    target.style.display = "block";
  }
  
  // Reset active state for all buttons in selector
  const buttons = document.querySelectorAll(".btn-lesson");
  buttons.forEach(btn => {
    btn.classList.remove("active");
    btn.style.background = "";
    btn.style.color = "";
    btn.style.borderColor = "";
  });
  
  // Activate selected button
  const activeBtn = document.getElementById(`btnLesson${lessonNum}`);
  if (activeBtn) {
    activeBtn.classList.add("active");
    activeBtn.style.background = "";
    activeBtn.style.color = "";
    activeBtn.style.borderColor = "";
  }

  // Stop read aloud when switching lessons
  if (typeof readAloudState !== 'undefined' && readAloudState.isSpeaking) {
    window.speechSynthesis.cancel();
    readAloudState.isSpeaking = false;
    const btn = document.getElementById("readAloudBtn");
    if (btn) {
      btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Listen';
      btn.style.background = 'rgba(var(--primary-rgb), 0.05)';
    }
    readAloudState.blocks.forEach(b => {
      b.style.background = 'transparent';
      b.style.boxShadow = 'none';
    });
  }

  // Render the quiz for the active lesson
  window.renderLessonQuickQuiz();

  // Update brand quote for the active lesson
  if (window.updateChimneyQuoteForLesson) {
    window.updateChimneyQuoteForLesson(lessonNum);
  }
};

// Flashcard Data Deck
const flashcardsData = [
  { lesson: "Lesson 1", word: "Cesspit", definition: "A simple hole dug in the earth used by prehistoric and later societies to collect household sewage and human waste." },
  { lesson: "Lesson 1", word: "Conduit", definition: "A stone channel or pipe designed by Roman engineers to transport clean water over long distances using gravity." },
  { lesson: "Lesson 1", word: "Latrine", definition: "A communal Roman public toilet block, often flushed continuously by running water to carry waste into underground sewers." },
  { lesson: "Lesson 2", word: "Gongfermer", definition: "A specialized medieval laborer paid to empty human waste from town cesspits, working exclusively under the cover of night." },
  { lesson: "Lesson 2", word: "Privy", definition: "A small outdoor wooden toilet built over a cesspit, often shared by multiple families in medieval towns." },
  { lesson: "Lesson 2", word: "Water Seller", definition: "A medieval merchant who transported fresh water from local rivers or conduits in large barrels on horseback to sell to townspeople." },
  { lesson: "Lesson 3", word: "House of Easement", definition: "An Early Modern indoor or outdoor toilet built over a cesspit or cellar, used to collect human waste." },
  { lesson: "Lesson 3", word: "Water Closet", definition: "An early form of the flushing toilet, invented in 1596, which used a tank of water to wash waste down a pipe." },
  { lesson: "Lesson 3", word: "Infrastructure", definition: "The basic physical systems—such as water pipes, roads, and sewers—that a city or country needs to function effectively." },
  { lesson: "Lesson 4", word: "Terraced Houses", definition: "Rows of identical brick houses built back-to-back with shared walls, constructed quickly to house factory workers in expanding industrial cities." },
  { lesson: "Lesson 4", word: "Miasma", definition: "A widely believed scientific theory in the nineteenth century that diseases like cholera were caused by breathing in noxious 'bad air' or smells from decaying matter." },
  { lesson: "Lesson 4", word: "Cholera Epidemic", definition: "A rapid, widespread outbreak of a highly infectious waterborne disease that causes extreme dehydration and can kill victims within hours." },
  { lesson: "Lesson 5", word: "Germ Theory", definition: "The scientific breakthrough proved by Louis Pasteur in 1860 that microscopic organisms (germs), rather than bad smells, cause infectious diseases." },
  { lesson: "Lesson 5", word: "The Great Stink", definition: "The hot summer of 1858 when the smell of raw sewage in the River Thames became so intense that it forced Parliament to fund a new London sewer system." },
  { lesson: "Lesson 5", word: "Public Health Act of 1875", definition: "A landmark British law that forced local councils to take full responsibility for providing clean piped water and proper sewer connections to all homes." }
];

let flashcardIndex = 0;
let isFlashcardFlipped = false;

function setupFlashcards() {
  const flashcardContainer = document.getElementById("flashcard-container");
  const flashcardInner = document.getElementById("flashcard-inner");
  const wordEl = document.getElementById("flashcard-word");
  const lessonEl = document.getElementById("flashcard-lesson");
  const definitionEl = document.getElementById("flashcard-definition");
  const counterEl = document.getElementById("flashcard-counter");
  const prevBtn = document.getElementById("flashcard-prev-btn");
  const nextBtn = document.getElementById("flashcard-next-btn");

  if (!flashcardContainer || !flashcardInner || !wordEl || !definitionEl || !counterEl || !prevBtn || !nextBtn) {
    return;
  }

  function updateCard() {
    const card = flashcardsData[flashcardIndex];
    lessonEl.textContent = card.lesson.toUpperCase();
    wordEl.textContent = card.word;
    definitionEl.textContent = card.definition;
    counterEl.textContent = `${flashcardIndex + 1} / ${flashcardsData.length}`;
    
    isFlashcardFlipped = false;
    flashcardInner.style.transform = "rotateY(0deg)";
  }

  flashcardContainer.addEventListener("click", () => {
    isFlashcardFlipped = !isFlashcardFlipped;
    flashcardInner.style.transform = isFlashcardFlipped ? "rotateY(180deg)" : "rotateY(0deg)";
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    flashcardIndex = (flashcardIndex - 1 + flashcardsData.length) % flashcardsData.length;
    updateCard();
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    flashcardIndex = (flashcardIndex + 1) % flashcardsData.length;
    updateCard();
  });

  updateCard();

  document.addEventListener("keydown", (e) => {
    if (appState.currentTab === "flashcardsSection") {
      if (e.key === "ArrowLeft") {
        prevBtn.click();
      } else if (e.key === "ArrowRight") {
        nextBtn.click();
      }
    }
  });
}

window.renderTradingCards = function() {
  const grid = document.getElementById("trading-cards-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const userXP = appState.userXP;
  const unlockedIds = JSON.parse(localStorage.getItem("was_unlocked_cards") || "[]");

  tradingCardsData.forEach(card => {
    const isUnlocked = (userXP >= card.unlockedAtXP) || unlockedIds.includes(card.id);

    const wrapper = document.createElement("div");
    wrapper.className = "scumbag-card-container";

    const inner = document.createElement("div");
    inner.className = "scumbag-flip-card-inner";

    const front = document.createElement("div");
    front.className = "scumbag-flip-card-front";

    if (isUnlocked) {
      front.className += " scumbag-card-unlocked";
      front.style.background = card.color;
      const mediaHtml = card.image 
        ? `<div style="width: 90%; height: 210px; margin-top: 12px; margin-bottom: 8px; border-radius: 8px; overflow: hidden; border: 3px solid rgba(255,255,255,0.4); box-shadow: 0 4px 8px rgba(0,0,0,0.3); background: #ffffff;">
            <img src="${card.image}" style="width: 100%; height: 100%; object-fit: cover;" alt="${card.name}">
           </div>`
        : `<div style="font-size: 5rem; height: 210px; display: flex; align-items: center; justify-content: center; margin-top: 12px; margin-bottom: 8px;">${card.emoji}</div>`;
      front.innerHTML = `
        ${mediaHtml}
        <h3 style="margin: 0; font-family: var(--font-title); font-size: 1.25rem; font-weight: 800;">${card.name}</h3>
        <span style="font-size: 0.72rem; text-transform: uppercase; font-weight: 800; opacity: 0.8; margin-top: 2px;">${card.era}</span>
        <span style="font-size: 0.65rem; margin-top: 10px; opacity: 0.7; font-family: var(--font-title); font-weight: 600;"><i class="fa-solid fa-rotate"></i> Click to Flip</span>
      `;
    } else {
      front.className += " scumbag-card-locked";
      front.style.position = "relative";
      front.innerHTML = `
        <div class="foil-pack-body" style="position: absolute; inset: 0; background-image: linear-gradient(rgba(10, 10, 15, 0.82), rgba(10, 10, 15, 0.82)), url('assets/mr_lovett_wrapper.png'); background-size: cover; background-position: center; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 12px; padding: 20px; border: 3px solid #cbd5e1; box-shadow: inset 0 0 20px rgba(0,0,0,0.8); text-align: center; color: white;">
          <i class="fa-solid fa-lock" style="font-size: 2.2rem; margin-bottom: 12px; color: #eab308; text-shadow: 0 2px 4px rgba(0,0,0,0.6);"></i>
          <h4 style="margin: 0 0 6px 0; color: #ffffff; font-size: 1.1rem; font-family: var(--font-title); font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">Locked Pack</h4>
          <p style="margin: 0; font-size: 0.76rem; color: #cbd5e1; text-shadow: 0 1px 2px rgba(0,0,0,0.8);">Unlock at <strong>${card.unlockedAtXP} XP</strong></p>
        </div>
      `;
    }

    const back = document.createElement("div");
    back.className = "scumbag-flip-card-back";

    if (isUnlocked) {
      back.innerHTML = `
        <div style="font-weight: 800; font-size: 0.95rem; color: var(--primary); margin-bottom: 2px;">${card.name}</div>
        <div style="font-size: 0.65rem; text-transform: uppercase; font-weight: 800; color: var(--text-muted); margin-bottom: 6px;">${card.era} Era</div>
        <div style="font-size: 0.75rem; line-height: 1.35; color: var(--text-main); margin-bottom: 6px; flex-grow: 1; overflow-y: auto;">${card.bio}</div>
        <div style="font-size: 0.72rem; font-style: italic; border-left: 2px solid var(--primary); padding-left: 6px; color: var(--text-muted); margin-bottom: 8px; line-height: 1.3;">"${card.quote}"</div>
        
        <div style="border-top: 1px dashed var(--border-color); padding-top: 6px;">
          <div class="scumbag-stat-row">
            <span class="scumbag-stat-label">Hygiene Care</span>
            <span class="scumbag-stat-value">${card.stats.hygiene}</span>
            <div class="scumbag-stat-bar-container">
              <div class="scumbag-stat-bar" style="width: ${card.stats.hygiene}%;"></div>
            </div>
          </div>
          <div class="scumbag-stat-row">
            <span class="scumbag-stat-label">Engineering</span>
            <span class="scumbag-stat-value">${card.stats.engineering}</span>
            <div class="scumbag-stat-bar-container">
              <div class="scumbag-stat-bar" style="width: ${card.stats.engineering}%; background: #3b82f6;"></div>
            </div>
          </div>
          <div class="scumbag-stat-row">
            <span class="scumbag-stat-label">Legacy</span>
            <span class="scumbag-stat-value">${card.stats.legacy}</span>
            <div class="scumbag-stat-bar-container">
              <div class="scumbag-stat-bar" style="width: ${card.stats.legacy}%; background: #10b981;"></div>
            </div>
          </div>
          <div class="scumbag-stat-row">
            <span class="scumbag-stat-label">Democracy</span>
            <span class="scumbag-stat-value">${card.stats.democracy}</span>
            <div class="scumbag-stat-bar-container">
              <div class="scumbag-stat-bar" style="width: ${card.stats.democracy}%; background: #f59e0b;"></div>
            </div>
          </div>
        </div>
      `;
    } else {
      back.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: var(--text-muted);">
          <i class="fa-solid fa-question" style="font-size: 2.5rem; opacity: 0.15;"></i>
        </div>
      `;
    }

    inner.appendChild(front);
    inner.appendChild(back);
    wrapper.appendChild(inner);

    if (isUnlocked) {
      wrapper.addEventListener("click", () => {
        wrapper.classList.toggle("flipped");
      });
    }

    grid.appendChild(wrapper);
  });
};

window.unlockRandomTradingCardForEra = function(lessonNum) {
  let eras = [];
  if (lessonNum === 1) eras = ["Prehistoric", "Roman"];
  else if (lessonNum === 2) eras = ["Medieval"];
  else if (lessonNum === 3) eras = ["Early Modern"];
  else if (lessonNum === 4) eras = ["Industrial"];
  else if (lessonNum === 5) eras = ["Modern"];
  
  let unlockedIds = JSON.parse(localStorage.getItem("was_unlocked_cards") || "[]");
  
  const eligibleCards = tradingCardsData.filter(card => 
    eras.includes(card.era) && 
    !unlockedIds.includes(card.id) && 
    appState.userXP < card.unlockedAtXP
  );
  
  if (eligibleCards.length > 0) {
    const randomCard = eligibleCards[Math.floor(Math.random() * eligibleCards.length)];
    unlockedIds.push(randomCard.id);
    localStorage.setItem("was_unlocked_cards", JSON.stringify(unlockedIds));
    
    alert(`🎉 Quiz Master! You scored 3+ correct answers. Unwrapped new trading card: "${randomCard.name}" from the ${randomCard.era} era!`);
    
    if (window.renderTradingCards) window.renderTradingCards();
  }
};

window.finishQuizAndCheckUnlock = function(lessonNum) {
  const score = quickQuizState.correctAnswersCount || 0;
  if (score >= 3) {
    window.unlockRandomTradingCardForEra(lessonNum);
  } else {
    alert(`Quiz completed. You scored ${score} out of 5. Try again to get 3+ correct and unlock a trading card!`);
  }
  
  const submitBtn = document.getElementById('quickQuizSubmitBtn') || document.querySelector('.lesson-content-block[style*="display: block"] .quick-quiz-submit-btn') || document.querySelector('.lesson-content-block:not([style*="display: none"]) .quick-quiz-submit-btn');
  if (submitBtn) {
    submitBtn.innerHTML = 'Quiz Completed! 🎉';
    submitBtn.disabled = true;
  }
};

window.updateScaffoldingLevel = function() {
  const selector = document.getElementById("was-scaffolding-selector");
  if (!selector) return;
  const level = selector.value;
  const wordBank = document.getElementById("was-scaffold-wordbank");
  const identifyText = document.getElementById("was-plan-identify");
  const descText = document.getElementById("was-plan-description");
  const explainText = document.getElementById("was-plan-explanation");
  const analysisText = document.getElementById("was-plan-analysis");
  
  if (level === "supported") {
    if (wordBank) wordBank.style.display = "block";
    if (identifyText) identifyText.placeholder = "Starter: One turning point in sanitation history that shows progress/regression is... (e.g. the Industrial Revolution)";
    if (descText) descText.placeholder = "Starter: During this era, people lived in... and their waste was... Clean water was sourced from...";
    if (explainText) explainText.placeholder = "Starter: This happened because the government believed in laissez-faire... and doctors believed in miasma theory...";
    if (analysisText) analysisText.placeholder = "Starter: Consequently, this era represents progress/regression because bazalgette sewers or Harington water closet...";
  } else if (level === "advanced") {
    if (wordBank) wordBank.style.display = "none";
    if (identifyText) identifyText.placeholder = "Identify the era and construct a nuanced thesis evaluating the extent to which it represents a clean break from previous sanitation practices.";
    if (descText) descText.placeholder = "Detail the structural conditions. Contrast the experiences of different social classes (wealthy vs. poor) or regions (rural lag vs. urban).";
    if (explainText) explainText.placeholder = "Analyze the complex web of causation. How did scientific transitions (miasma to germ theory), economic forces, and political will intersect?";
    if (analysisText) analysisText.placeholder = "Synthesize your argument. Address counter-claims: did this era lay foundations for future progress despite immediate limitations?";
  } else {
    if (wordBank) wordBank.style.display = "none";
    if (identifyText) identifyText.placeholder = "Identify the era and directly state if it shows progress, continuity, or regression...";
    if (descText) descText.placeholder = "List the specific technologies, names, dates, and terms you will deploy...";
    if (explainText) explainText.placeholder = "Explain the root causes behind these conditions (government policies, science, class, wealth)...";
    if (analysisText) analysisText.placeholder = "Link back to the big enquiry question. Evaluate the scope of change and who it affected...";
  }
};

window.generateClozeGameHtml = function() {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Digital Cloze Passage Summary</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: 'Outfit', sans-serif;
        padding: 20px;
        background: #f8fafc;
        color: #1e293b;
        margin: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        padding: 24px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        border: 1px solid #e2e8f0;
      }
      h2 {
        color: #1e3a8a;
        margin-top: 0;
        font-size: 1.4rem;
        border-bottom: 2px solid #3b82f6;
        padding-bottom: 8px;
      }
      .instructions {
        font-size: 0.88rem;
        color: #64748b;
        margin-bottom: 20px;
        line-height: 1.4;
      }
      .lesson-section {
        background: #f1f5f9;
        border-radius: 6px;
        padding: 16px;
        margin-bottom: 20px;
        border-left: 4px solid #3b82f6;
      }
      h4 {
        margin: 0 0 10px 0;
        color: #1e293b;
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .cloze-text {
        font-size: 0.98rem;
        line-height: 1.8;
        margin-bottom: 12px;
      }
      select {
        padding: 4px 8px;
        border-radius: 4px;
        border: 1.5px solid #3b82f6;
        background: #eff6ff;
        font-weight: bold;
        color: #1e40af;
        cursor: pointer;
        font-family: 'Outfit', sans-serif;
      }
      .btn {
        background: #1e3a8a;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
        font-size: 0.95rem;
        width: 100%;
        display: block;
        margin-top: 10px;
      }
      .btn:hover {
        background: #2563eb;
      }
      .feedback {
        margin-top: 15px;
        padding: 12px;
        border-radius: 6px;
        font-weight: bold;
        display: none;
        font-size: 0.9rem;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>✍️ Digital Cloze Passage Summary</h2>
      <div class="instructions">
        Select the correct historical vocabulary term for each gap to review key concepts. Submit when finished to test your understanding!
      </div>
      
      <div class="lesson-section">
        <h4>Lesson 1: Prehistoric & Roman</h4>
        <div class="cloze-text">
          Iron Age Britons lived in scattered roundhouses and kept waste local. When the Romans arrived, they constructed grand public 
          <select id="gap1">
            <option value="">-- select --</option>
            <option value="bathhouses">bathhouses</option>
            <option value="conduits">conduits</option>
            <option value="latrines">latrines</option>
          </select> 
          for hygiene and social hubs. Roman engineers built gravity-fed stone 
          <select id="gap2">
            <option value="">-- select --</option>
            <option value="bathhouses">bathhouses</option>
            <option value="conduits">conduits</option>
            <option value="latrines">latrines</option>
          </select> 
          to transport clean water, and continuous flush public 
          <select id="gap3">
            <option value="">-- select --</option>
            <option value="bathhouses">bathhouses</option>
            <option value="conduits">conduits</option>
            <option value="latrines">latrines</option>
          </select>.
        </div>
      </div>

      <div class="lesson-section">
        <h4>Lesson 2: Medieval</h4>
        <div class="cloze-text">
          During the Medieval era, towns drowned in filth, but Christian 
          <select id="gap4">
            <option value="">-- select --</option>
            <option value="monks">monks</option>
            <option value="cesspits">cesspits</option>
          </select> 
          engineered sophisticated water piping systems. To keep town streets clean, night-laborers called gongfermers cleared human waste from domestic 
          <select id="gap5">
            <option value="">-- select --</option>
            <option value="monks">monks</option>
            <option value="cesspits">cesspits</option>
          </select> 
          under the cover of darkness.
        </div>
      </div>

      <div class="lesson-section">
        <h4>Lesson 3: Early Modern</h4>
        <div class="cloze-text">
          In 1596, Sir John Harington designed the first flushing 
          <select id="gap6">
            <option value="">-- select --</option>
            <option value="water closet">water closet</option>
            <option value="infrastructure">infrastructure</option>
          </select> 
          for Queen Elizabeth I. However, Londoners still bought water from water-bearers in 1700 due to a complete lack of centralized 
          <select id="gap7">
            <option value="">-- select --</option>
            <option value="water closet">water closet</option>
            <option value="infrastructure">infrastructure</option>
          </select>.
        </div>
      </div>

      <div class="lesson-section">
        <h4>Lesson 4 & 5: Industrial & Modern</h4>
        <div class="cloze-text">
          Overcrowded industrial cities faced deadly epidemics of water-borne 
          <select id="gap8">
            <option value="">-- select --</option>
            <option value="cholera">cholera</option>
            <option value="laissez-faire">laissez-faire</option>
            <option value="sewers">sewers</option>
          </select> 
          because the government maintained a hands-off 
          <select id="gap9">
            <option value="">-- select --</option>
            <option value="cholera">cholera</option>
            <option value="laissez-faire">laissez-faire</option>
            <option value="sewers">sewers</option>
          </select> 
          policy. Finally, Joseph Bazalgette built massive underground brick 
          <select id="gap10">
            <option value="">-- select --</option>
            <option value="cholera">cholera</option>
            <option value="laissez-faire">laissez-faire</option>
            <option value="sewers">sewers</option>
          </select> 
          to redirect London's waste and clean up the River Thames.
        </div>
      </div>

      <button class="btn" onclick="checkAnswers()">Submit Answers & Earn XP</button>
      <div id="feedback" class="feedback"></div>
    </div>

    <script>
      function checkAnswers() {
        const answers = {
          gap1: "bathhouses",
          gap2: "conduits",
          gap3: "latrines",
          gap4: "monks",
          gap5: "cesspits",
          gap6: "water closet",
          gap7: "infrastructure",
          gap8: "cholera",
          gap9: "laissez-faire",
          gap10: "sewers"
        };

        let correct = 0;
        let total = Object.keys(answers).length;

        for (let key in answers) {
          const select = document.getElementById(key);
          if (select.value === answers[key]) {
            correct++;
            select.style.borderColor = "#10b981";
            select.style.background = "#ecfdf5";
            select.style.color = "#065f46";
          } else {
            select.style.borderColor = "#ef4444";
            select.style.background = "#fef2f2";
            select.style.color = "#991b1b";
          }
        }

        const feedback = document.getElementById("feedback");
        feedback.style.display = "block";

        if (correct === total) {
          feedback.className = "feedback success";
          feedback.innerHTML = "🎉 Perfect! You got 10/10 correct! You earned +100 XP and unlocked card boosters!";
          if (window.parent && window.parent.appState) {
            window.parent.appState.userXP += 100;
            if (window.parent.updateXPBadge) window.parent.updateXPBadge();
            if (window.parent.renderTradingCards) window.parent.renderTradingCards();
          }
        } else {
          feedback.className = "feedback error";
          feedback.innerHTML = "❌ You scored " + correct + " out of " + total + ". Check the highlighted red selections and try again!";
        }
      }
    </script>
  </body>
  </html>
  `;
};

window.generateTimelineGameHtml = function() {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Digital Timeline Matching Game</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap" rel="stylesheet">
    <style>
      body {
        font-family: 'Outfit', sans-serif;
        padding: 20px;
        background: #f8fafc;
        color: #1e293b;
        margin: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        padding: 24px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        border: 1px solid #e2e8f0;
      }
      h2 {
        color: #10b981;
        margin-top: 0;
        font-size: 1.4rem;
        border-bottom: 2px solid #10b981;
        padding-bottom: 8px;
      }
      .instructions {
        font-size: 0.88rem;
        color: #64748b;
        margin-bottom: 20px;
        line-height: 1.4;
      }
      .matching-row {
        background: #f8fafc;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        padding: 12px;
        margin-bottom: 12px;
        display: grid;
        grid-template-columns: 1fr 180px;
        gap: 12px;
        align-items: center;
      }
      .matching-row p {
        margin: 0;
        font-size: 0.9rem;
        line-height: 1.4;
      }
      select {
        padding: 6px;
        border-radius: 4px;
        border: 1.5px solid #10b981;
        background: #ecfdf5;
        font-weight: bold;
        color: #065f46;
        cursor: pointer;
        font-family: 'Outfit', sans-serif;
        width: 100%;
        outline: none;
      }
      .btn {
        background: #10b981;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
        font-size: 0.95rem;
        width: 100%;
        display: block;
        margin-top: 15px;
      }
      .btn:hover {
        background: #059669;
      }
      .feedback {
        margin-top: 15px;
        padding: 12px;
        border-radius: 6px;
        font-weight: bold;
        display: none;
        font-size: 0.9rem;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>⏳ Digital Timeline Matching Game</h2>
      <div class="instructions">
        Match each historical event or sanitary description to the correct chronological era. Match all 5 correctly to earn XP!
      </div>

      <div class="matching-row">
        <p>Local cesspits dug near scattered roundhouses; waste disposal is low-density and clean water is abundant.</p>
        <select id="t1">
          <option value="">-- select era --</option>
          <option value="prehistoric">Prehistoric Britain</option>
          <option value="roman">Roman Britain</option>
          <option value="medieval">Medieval Britain</option>
          <option value="early-modern">Early Modern Britain</option>
          <option value="industrial">Industrial Britain</option>
        </select>
      </div>

      <div class="matching-row">
        <p>Introduction of communal public bathhouses, gravity-fed stone conduits, and sewers continuously flushed by water channels.</p>
        <select id="t2">
          <option value="">-- select era --</option>
          <option value="prehistoric">Prehistoric Britain</option>
          <option value="roman">Roman Britain</option>
          <option value="medieval">Medieval Britain</option>
          <option value="early-modern">Early Modern Britain</option>
          <option value="industrial">Industrial Britain</option>
        </select>
      </div>

      <div class="matching-row">
        <p>Monasteries install lead and wooden piping networks; towns employ gongfermers to clear domestic cesspits strictly by night.</p>
        <select id="t3">
          <option value="">-- select era --</option>
          <option value="prehistoric">Prehistoric Britain</option>
          <option value="roman">Roman Britain</option>
          <option value="medieval">Medieval Britain</option>
          <option value="early-modern">Early Modern Britain</option>
          <option value="industrial">Industrial Britain</option>
        </select>
      </div>

      <div class="matching-row">
        <p>Sir John Harington invents the first flushing toilet for Queen Elizabeth, but water carriers still sell drinking water from barrels.</p>
        <select id="t4">
          <option value="">-- select era --</option>
          <option value="prehistoric">Prehistoric Britain</option>
          <option value="roman">Roman Britain</option>
          <option value="medieval">Medieval Britain</option>
          <option value="early-modern">Early Modern Britain</option>
          <option value="industrial">Industrial Britain</option>
        </select>
      </div>

      <div class="matching-row">
        <p>Overcrowded terraced streets, shared yard pumps contaminated by sewage, cholera outbreaks, and Joseph Bazalgette's massive brick sewers.</p>
        <select id="t5">
          <option value="">-- select era --</option>
          <option value="prehistoric">Prehistoric Britain</option>
          <option value="roman">Roman Britain</option>
          <option value="medieval">Medieval Britain</option>
          <option value="early-modern">Early Modern Britain</option>
          <option value="industrial">Industrial Britain</option>
        </select>
      </div>

      <button class="btn" onclick="checkTimeline()">Check Timeline & Earn XP</button>
      <div id="feedback" class="feedback"></div>
    </div>

    <script>
      function checkTimeline() {
        const answers = {
          t1: "prehistoric",
          t2: "roman",
          t3: "medieval",
          t4: "early-modern",
          t5: "industrial"
        };

        let correct = 0;
        let total = Object.keys(answers).length;

        for (let key in answers) {
          const select = document.getElementById(key);
          if (select.value === answers[key]) {
            correct++;
            select.style.borderColor = "#10b981";
            select.style.background = "#ecfdf5";
            select.style.color = "#065f46";
          } else {
            select.style.borderColor = "#ef4444";
            select.style.background = "#fef2f2";
            select.style.color = "#991b1b";
          }
        }

        const feedback = document.getElementById("feedback");
        feedback.style.display = "block";

        if (correct === total) {
          feedback.className = "feedback success";
          feedback.innerHTML = "⏳ Chronology Master! You matched all eras correctly! You earned +100 XP!";
          if (window.parent && window.parent.appState) {
            window.parent.appState.userXP += 100;
            if (window.parent.updateXPBadge) window.parent.updateXPBadge();
            if (window.parent.renderTradingCards) window.parent.renderTradingCards();
          }
        } else {
          feedback.className = "feedback error";
          feedback.innerHTML = "❌ You got " + correct + " out of " + total + " correct. Adjust the red selections and try again!";
        }
      }
    </script>
  </body>
  </html>
  `;
};


function setupTradingCards() {
  window.renderTradingCards();
}

function setupWorksheetGallery() {
  const cards = document.querySelectorAll(".was-gallery-card");
  const gallery = document.getElementById("was-worksheet-gallery");
  const previewArea = document.getElementById("was-worksheet-preview-area");
  const lessonSelect = document.getElementById("was-preview-lesson");
  const backBtn = document.getElementById("was-btn-preview-back");
  const wordBtn = document.getElementById("was-btn-preview-word");
  const iframe = document.getElementById("was-worksheet-preview-iframe");

  if (!cards.length || !gallery || !previewArea || !lessonSelect || !backBtn) return;

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const lessonVal = card.getAttribute("data-lesson");
      lessonSelect.value = lessonVal;
      
      gallery.style.display = "none";
      previewArea.style.display = "block";
      
      window.updateWorksheetPreview();
    });
  });

  backBtn.addEventListener("click", () => {
    gallery.style.display = "block";
    previewArea.style.display = "none";
    if (iframe) iframe.srcdoc = "";
  });

  if (wordBtn) {
    wordBtn.addEventListener("click", () => {
      const lessonVal = lessonSelect.value;
      const answersVal = document.getElementById("was-preview-answers").value;
      const includeAnswers = (answersVal === 'yes');
      
      let html;
      let filename;
      if (lessonVal === 'all') {
        html = window.generateUnifiedBookletHtml(includeAnswers);
        filename = `Complete_Unit_Study_Booklet_${includeAnswers ? 'Teacher' : 'Student'}.doc`;
      } else {
        html = window.generateWorksheetPackHtml(parseInt(lessonVal, 10), includeAnswers);
        filename = `Lesson_${lessonVal}_Workbook_${includeAnswers ? 'Teacher' : 'Student'}.doc`;
      }
      
      downloadHtmlAsWord(filename, html);
    });
  }
}

function downloadHtmlAsWord(filename, htmlContent) {
  let processedHtml = htmlContent;
  processedHtml = processedHtml.replace(/class="page"/g, 'class="page" style="page-break-after: always; mso-special-character: line-break; clear: both;"');
  let finalHtml = "";
  const trimmed = processedHtml.trim().toLowerCase();
  if (trimmed.startsWith("<!doctype html") || trimmed.startsWith("<html")) {
    finalHtml = "\uFEFF" + processedHtml;
  } else {
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <title>Export HTML to Word</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page {
      size: 21cm 29.7cm; /* A4 */
      margin: 2cm 2cm 2cm 2cm;
    }
    body {
      font-family: 'Arial', sans-serif;
    }
  </style>
</head>
<body>
  ${processedHtml}
</body>
</html>`;
    finalHtml = "\uFEFF" + header;
  }
  
  const blob = new Blob([finalHtml], {
    type: "application/msword;charset=utf-8"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function setupInteractiveHints() {
  const hints = {
    // Lesson 1
    " AD 43 ": "Focus on the transition from prehistoric organic roundhouses to stone aqueducts and sewage pipelines described in the Roman Britain narrative.",
    " benefit all ": "Contrast the municipal facilities inside Roman towns (like York and Lincoln) with the countryside roundhouses where peasants lived.",
    " archaeology ": "Focus on the lack of surviving written documents from Celtic Britain before Roman colonization, requiring physical objects to reconstruct history.",
    " Seneca ": "Look at Seneca's descriptions of weightlifters, food vendors, and social chatter in his letter.",
    
    // Lesson 2
    " monasteries ": "Look at the Canterbury Priory plan showing lead pipes and separate freshwater systems.",
    " townspeople ": "Read the narrative lines describing the lack of government sewers and the reliance on night-soil gongfermers.",
    " merchant ": "Focus on the role of wealthy merchant guilds funding city pipes to boost their own prestige.",
    " green and red ": "Examine the medieval blueprint showing green and red lines representing fresh and waste water.",
    
    // Lesson 3
    " Harington ": "Read the narrative about Sir John Harington's 1596 water closet and why only Queen Elizabeth could afford one.",
    " 1665 ": "Look at the 1665 orders that focused on removing bad smells (miasma) and stray animals rather than clean water.",
    " Rebuilding ": "Read the text about the rebuilding of London and the introduction of wooden water pipes by private companies.",
    " woodcut ": "Look at Harington's 1596 woodcut diagram showing the overhead cistern, valve, and waste pipe.",
    
    // Lesson 4
    " industrial slums ": "Focus on the rapid population boom and back-to-back terraced houses built next to open privies.",
    " Cholera ": "Read about the water-borne nature of cholera and why miasma theory delayed effective sanitation reform.",
    " Chadwick ": "Focus on the 1842 Report on Sanitary Conditions and the laissez-faire attitude of the government.",
    " King Cholera ": "Examine 'A Court for King Cholera' exposing the lack of drains and heap of rubbish in urban slums.",
    
    // Lesson 5
    " Bazalgette ": "Focus on the 82 miles of brick main sewers built after the Great Stink of 1858.",
    " 1875 ": "Read about the compulsory rules requiring local councils to provide clean water and street lighting.",
    " clean break ": "Compare the conditions of industrial slums before 1850 with the state-funded municipal sanitation after 1875.",
    " Crossness ": "Look at the illustration of the grand cathedral-like engines lifting waste away from London."
  };

  const sections = document.querySelectorAll('.lesson-content-block div');
  sections.forEach(sec => {
    const h5 = sec.querySelector('h5');
    if (!h5) return;
    const isPartBOrC = h5.textContent.toLowerCase().includes('part b') || h5.textContent.toLowerCase().includes('part c');
    if (!isPartBOrC) return;

    sec.querySelectorAll('li, p').forEach(el => {
      if (el.tagName === 'H5') return;
      
      const text = el.textContent;
      let matchedKey = null;
      Object.keys(hints).forEach(key => {
        if (text.toLowerCase().includes(key.toLowerCase())) {
          matchedKey = key;
        }
      });
      
      if (matchedKey) {
        const step1 = hints[matchedKey];
        
        if (el.querySelector('.hint-toggle')) return;
        
        const hintBtn = document.createElement('button');
        hintBtn.className = 'btn btn-secondary';
        hintBtn.style.padding = '2px 8px';
        hintBtn.style.fontSize = '0.72rem';
        hintBtn.style.marginLeft = '8px';
        hintBtn.style.display = 'inline-flex';
        hintBtn.style.alignItems = 'center';
        hintBtn.style.gap = '4px';
        hintBtn.style.verticalAlign = 'middle';
        hintBtn.innerHTML = '💡 Hint';
        
        const hintToggle = document.createElement('div');
        hintToggle.className = 'hint-toggle';
        hintToggle.style.display = 'none';
        hintToggle.style.marginTop = '6px';
        hintToggle.style.padding = '8px 12px';
        hintToggle.style.background = 'rgba(79, 70, 229, 0.04)';
        hintToggle.style.borderLeft = '3px solid #4f46e5';
        hintToggle.style.borderRadius = '4px';
        hintToggle.style.fontSize = '0.8rem';
        hintToggle.style.lineHeight = '1.4';
        
        hintToggle.innerHTML = `
          <div style="margin-bottom: 4px; font-weight: 700; color: #4f46e5;">💡 Active Inquiry Clue:</div>
          <div>${step1}</div>
        `;
        
        hintBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (hintToggle.style.display === 'none') {
            hintToggle.style.display = 'block';
            hintBtn.innerHTML = '💡 Hide';
          } else {
            hintToggle.style.display = 'none';
            hintBtn.innerHTML = '💡 Hint';
          }
        });
        
        const firstStrong = el.querySelector('strong');
        if (firstStrong) {
          firstStrong.after(hintBtn);
        } else {
          el.appendChild(hintBtn);
        }
        el.appendChild(hintToggle);
      }
    });
  });
}

window.addEventListener("DOMContentLoaded", async () => {
  setupTheme();
  setupNavigation();
  setupTimeline();
  setupFlashcards();
  if (typeof setupTradingCards !== 'undefined') setupTradingCards();
  setupWorksheetGallery();
  renderLessonQuickQuiz();
  updateXPBadge();
  
  if (window.updateChimneyQuoteForLesson) {
    window.updateChimneyQuoteForLesson(1);
  }
  
  await loadLessonMarkdown();
  
  setupInteractiveHints();
  if (window.setupOneNoteTextareas) window.setupOneNoteTextareas();
  
  // Activate default lessons tab
  const lessonsTab = document.querySelector('.nav-tab[data-target="lessonsSection"]');
  if (lessonsTab) lessonsTab.click();
});

// ==========================================
// RECIPIENT UPGRADES & INTERACTIVE WIDGETS
// ==========================================

window.awardXP = function(amount) {
  appState.userXP += amount;
  localStorage.setItem("was_user_xp", appState.userXP);
  updateXPBadge();
  if (window.renderTradingCards) window.renderTradingCards();
};

window.checkVocab = function(lessonNum, gapIds, answers) {
  let correctCount = 0;
  gapIds.forEach((id, idx) => {
    const el = document.getElementById(id);
    if (!el) return;
    const selected = el.value.trim().toLowerCase();
    const correct = answers[idx].trim().toLowerCase();
    if (selected === correct) {
      el.style.borderColor = "var(--accent-green)";
      el.style.backgroundColor = "rgba(22, 163, 74, 0.1)";
      correctCount++;
    } else {
      el.style.borderColor = "red";
      el.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
    }
  });

  const feedback = document.getElementById(`vocab-feedback-${lessonNum}`);
  if (feedback) {
    feedback.style.display = "block";
    if (correctCount === gapIds.length) {
      feedback.style.color = "var(--accent-green)";
      feedback.innerHTML = `🎉 Perfect! ${correctCount}/${gapIds.length} correct! +50 XP`;
      window.awardXP(50);
    } else {
      feedback.style.color = "red";
      feedback.innerHTML = `❌ You got ${correctCount}/${gapIds.length} correct. Try again!`;
    }
  }
};

const sourceScaffolds = {
  1: {
    supported: `
      <strong>💡 Supported Level Guide:</strong><br>
      • <strong>Word Bank:</strong> Communes, Seneca, Loud, Noise, Bathhouse, Housesteads, Gravity, Aqueduct.<br>
      • <strong>Sentence Starters:</strong><br>
      &nbsp;&nbsp; - <em>Question 9:</em> According to Seneca, visiting a Roman bathhouse was extremely noisy because he describes...<br>
      &nbsp;&nbsp; - <em>Question 10:</em> The physical remains of Housesteads Fort support this by showing that the latrines had no...
    `,
    standard: `
      <strong>💡 Standard Level Guide:</strong><br>
      • <strong>Sentence Stems:</strong><br>
      &nbsp;&nbsp; - <em>Question 9:</em> Seneca's letter provides vivid detail that bathhouses were busy, noisy commercial hubs. He describes the sounds of...<br>
      &nbsp;&nbsp; - <em>Question 10:</em> Archaeological remains at Housesteads support this by proving that public hygiene was a communal activity. The physical layout shows...
    `,
    advanced: `
      <strong>💡 Advanced Level Guide:</strong><br>
      • <strong>PEEL structure:</strong> Point, Evidence, Explanation, Link.<br>
      • <strong>Guidance:</strong> Contrast the subjective tone of Seneca's complain-focused letter with the objective physical evidence of Roman public architecture. Explain how the scale of Housesteads' sewers proves a systematic, state-sponsored approach to urban sanitation.
    `
  },
  2: {
    supported: `
      <strong>💡 Supported Level Guide:</strong><br>
      • <strong>Word Bank:</strong> Royal Decree, Filth, Infection, Cleanliness, Titchfield Abbey, Peasantry, Crofton.<br>
      • <strong>Sentence Starters:</strong><br>
      &nbsp;&nbsp; - <em>Question 8:</em> Edward III's letter tells us that London's streets were filled with... and he was worried about...<br>
      &nbsp;&nbsp; - <em>Question 9:</em> The monks of Titchfield enjoyed clean water because they diverted the... while Crofton peasants had to...
    `,
    standard: `
      <strong>💡 Standard Level Guide:</strong><br>
      • <strong>Sentence Stems:</strong><br>
      &nbsp;&nbsp; - <em>Question 8:</em> King Edward's command shows he felt a direct duty to maintain public health, explicitly stating that filth was...<br>
      &nbsp;&nbsp; - <em>Question 9:</em> The contrast between the Abbey and Crofton demonstrates that monastic wealth and literacy enabled advanced water engineering, whereas local peasants...
    `,
    advanced: `
      <strong>💡 Advanced Level Guide:</strong><br>
      • <strong>PEEL structure:</strong> Point, Evidence, Explanation, Link.<br>
      • <strong>Guidance:</strong> Analyze King Edward's letter to assess the crown's authority during the Black Death crisis. Connect the monastic plumbing layout at Titchfield directly to the religious rule of cleanliness and collective capital investment.
    `
  },
  3: {
    supported: `
      <strong>💡 Supported Level Guide:</strong><br>
      • <strong>Word Bank:</strong> Cellar, Seepage, Samuel Pepys, Harington, Flushing, New River, Infrastructure.<br>
      • <strong>Sentence Starters:</strong><br>
      &nbsp;&nbsp; - <em>Question 8:</em> Pepys' diary entry reveals that early modern homes had toilets built over... which could leak and...<br>
      &nbsp;&nbsp; - <em>Question 9:</em> Pepys' experience shows that even if you were wealthy, you still suffered from sanitation problems because...
    `,
    standard: `
      <strong>💡 Standard Level Guide:</strong><br>
      • <strong>Sentence Stems:</strong><br>
      &nbsp;&nbsp; - <em>Question 8:</em> Pepys' description reveals that the lack of public sewers meant cellars were used as cesspools, leading to neighbor disputes over...<br>
      &nbsp;&nbsp; - <em>Question 9:</em> The fact that a high-ranking official like Pepys suffered sewage flooding shows that private wealth could not isolate individuals from urban filth without public sewage systems.
    `,
    advanced: `
      <strong>💡 Advanced Level Guide:</strong><br>
      • <strong>PEEL structure:</strong> Point, Evidence, Explanation, Link.<br>
      • <strong>Guidance:</strong> Use Pepys' diary to explain how rapid building density outpaced Early Modern waste solutions. Critique the idea of "laissez-faire" by showing how individual wealth was powerless against shared wall seepage.
    `
  },
  4: {
    supported: `
      <strong>💡 Supported Level Guide:</strong><br>
      • <strong>Word Bank:</strong> Epidemics, Atmospheric Impurities, Miasma, Glazed Clay, Fareham Bricks, Drainage.<br>
      • <strong>Sentence Starters:</strong><br>
      &nbsp;&nbsp; - <em>Question 8:</em> According to Chadwick, the main cause of working-class disease was...<br>
      &nbsp;&nbsp; - <em>Question 9:</em> Local brickworks in Fareham were significant because they manufactured the... used to build...
    `,
    standard: `
      <strong>💡 Standard Level Guide:</strong><br>
      • <strong>Sentence Stems:</strong><br>
      &nbsp;&nbsp; - <em>Question 8:</em> Chadwick identifies "atmospheric impurities" and overcrowding as the primary vectors, arguing that sanitation reform would save money by...<br>
      &nbsp;&nbsp; - <em>Question 9:</em> The Fareham brickworks provided the essential materials needed to construct the South Coast's new glazed pipe networks, linking local industry directly to...
    `,
    advanced: `
      <strong>💡 Advanced Level Guide:</strong><br>
      • <strong>PEEL structure:</strong> Point, Evidence, Explanation, Link.<br>
      • <strong>Guidance:</strong> Analyze how Chadwick uses economic arguments to convince a laissez-faire government. Assess how the presence of natural clay resources in Hampshire facilitated the practical execution of these sanitary recommendations.
    `
  },
  5: {
    supported: `
      <strong>💡 Supported Level Guide:</strong><br>
      • <strong>Word Bank:</strong> Individual Freedom, Inspection, Resisted, Stubbington, Rural Lag, Piped Mains.<br>
      • <strong>Sentence Starters:</strong><br>
      &nbsp;&nbsp; - <em>Question 8:</em> The Times source tells us that Victorians resisted plans because they would rather risk... than be...<br>
      &nbsp;&nbsp; - <em>Question 9:</em> Stubbington families still drank from wells in 1900 because private companies...
    `,
    standard: `
      <strong>💡 Standard Level Guide:</strong><br>
      • <strong>Sentence Stems:</strong><br>
      &nbsp;&nbsp; - <em>Question 8:</em> The Times editorial reveals a deep-seated ideology of individual liberty, where citizens preferred the risk of cholera over government intrusion into...<br>
      &nbsp;&nbsp; - <em>Question 9:</em> Stubbington's rural lag was caused by commercial factors; private water companies focused on dense cities like Portsmouth for profit, neglecting...
    `,
    advanced: `
      <strong>💡 Advanced Level Guide:</strong><br>
      • <strong>PEEL structure:</strong> Point, Evidence, Explanation, Link.<br>
      • <strong>Guidance:</strong> Evaluate the conflict between Victorian individual liberty and public sanitary collectivism. Explain how rural lag illustrates the uneven geographic distribution of public health reform due to market forces.
    `
  }
};

window.setSourceScaffold = function(lessonNum, level) {
  const box = document.getElementById(`source-scaffold-box-${lessonNum}`);
  if (!box) return;
  box.style.display = "block";
  box.innerHTML = sourceScaffolds[lessonNum][level];
};

window.setupOneNoteTextareas = function() {
  const lessonBlocks = document.querySelectorAll('.lesson-content-block');
  lessonBlocks.forEach((block, blockIdx) => {
    // Find all lists in the activities
    const questionLists = block.querySelectorAll('div[style*="border-left"] ol');
    questionLists.forEach(list => {
      const lis = list.querySelectorAll('li');
      lis.forEach((li, liIdx) => {
        if (li.querySelector('.student-answer-input')) return; // Avoid duplicate injection
        // Create textarea
        const ta = document.createElement('textarea');
        ta.className = 'student-answer-input';
        ta.placeholder = 'Type your answer here...';
        ta.style.width = '100%';
        ta.style.height = '60px';
        ta.style.marginTop = '8px';
        ta.style.marginBottom = '12px';
        ta.style.padding = '8px';
        ta.style.borderRadius = 'var(--radius-sm)';
        ta.style.border = '1px solid var(--border-color)';
        ta.style.background = 'var(--bg-surface)';
        ta.style.color = 'var(--text-main)';
        ta.style.fontFamily = 'var(--font-body)';
        ta.style.fontSize = '0.9rem';
        ta.style.display = 'block';
        ta.style.resize = 'vertical';
        ta.style.boxSizing = 'border-box';
        
        // Append it
        li.appendChild(ta);
      });
    });
  });
};

window.copyLessonAnswersToOneNote = function(lessonNum) {
  const block = document.getElementById(`lessonContent${lessonNum}`);
  if (!block) return;
  
  let formattedText = `=== WATER & SANITATION THROUGH TIME: LESSON ${lessonNum} MY ANSWERS ===\n\n`;
  const questionLists = block.querySelectorAll('div[style*="border-left"]');
  
  questionLists.forEach(partDiv => {
    const titleEl = partDiv.querySelector('h5');
    if (!titleEl) return;
    const partTitle = titleEl.innerText.trim();
    formattedText += `--- ${partTitle} ---\n`;
    
    const lis = partDiv.querySelectorAll('ol > li');
    lis.forEach((li, idx) => {
      const liClone = li.cloneNode(true);
      const elementsToRemove = liClone.querySelectorAll('.sentence-starter-inline, .model-answer-inline, textarea, button');
      elementsToRemove.forEach(el => el.remove());
      
      const questionText = liClone.innerText.trim();
      const ta = li.querySelector('textarea');
      const studentAnswer = ta ? ta.value.trim() : "";
      
      formattedText += `${idx + 1}. Question: ${questionText}\n`;
      formattedText += `   My Answer: ${studentAnswer || "(No answer typed)"}\n\n`;
    });
  });
  
  navigator.clipboard.writeText(formattedText).then(() => {
    alert(`Success! Lesson ${lessonNum} answers copied to clipboard. You can now paste (Ctrl+V) directly into OneNote!`);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
    alert('Oops, something went wrong copying the answers. Please select and copy them manually.');
  });
};

const vaultAnswers = [
  /* 1 */ ["roundhouse"],
  /* 2 */ ["spring", "river", "stream", "well"],
  /* 3 */ ["cesspit", "cesspool", "dung heap", "dungheap"],
  /* 4 */ ["roman"],
  /* 5 */ ["conduit", "aqueduct"],
  /* 6 */ ["bearsden"],
  /* 7 */ ["caldarium"],
  /* 8 */ ["frigidarium"],
  /* 9 */ ["sponge", "xylospongium"],
  /* 10 */ ["housesteads"],
  /* 11 */ ["urban"],
  /* 12 */ ["privy", "garette"],
  /* 13 */ ["gongfermer", "gong fermer", "gong-fermer"],
  /* 14 */ ["night soil", "nightsoil", "manure"],
  /* 15 */ ["thames"],
  /* 16 */ ["edward iii", "edward the third", "king edward iii"],
  /* 17 */ ["monaster", "abbey", "monk"],
  /* 18 */ ["titchfield"],
  /* 19 */ ["meon"],
  /* 20 */ ["water seller", "water-seller"],
  /* 21 */ ["harington"],
  /* 22 */ ["elizabeth"],
  /* 23 */ ["infrastructure", "sewer", "plumbing", "water"],
  /* 24 */ ["pepys"],
  /* 25 */ ["waste", "sewage", "feces", "poop", "dung", "filth"],
  /* 26 */ ["new river"],
  /* 27 */ ["hertford", "chadwell", "amwell"],
  /* 28 */ ["miasma", "bad air"],
  /* 29 */ ["house of easement", "cellar privy", "privy"],
  /* 30 */ ["1666"],
  /* 31 */ ["industrial revolution"],
  /* 32 */ ["terraced", "back-to-back", "back to back"],
  /* 33 */ ["cholera"],
  /* 34 */ ["1831"],
  /* 35 */ ["chadwick"],
  /* 36 */ ["clay", "glazed clay"],
  /* 37 */ ["miasma", "bad air", "atmospheric impurities"],
  /* 38 */ ["laissez-faire", "laissez faire"],
  /* 39 */ ["fareham"],
  /* 40 */ ["decreased", "lower", "dropped", "fell", "shortened", "worse", "poor", "bad", "low"],
  /* 41 */ ["john snow", "dr john snow", "dr. john snow"],
  /* 42 */ ["broad street", "broad st"],
  /* 43 */ ["handle", "pump handle"],
  /* 44 */ ["great stink"],
  /* 45 */ ["bazalgette"],
  /* 46 */ ["1300", "1,300"],
  /* 47 */ ["crossness"],
  /* 48 */ ["pasteur"],
  /* 49 */ ["public health act", "public health act of 1875", "1875 public health act"],
  /* 50 */ ["rural lag"]
];

window.checkMasterVault = function() {
  let correctCount = 0;
  for (let i = 1; i <= 50; i++) {
    const input = document.getElementById(`was-v${i}`);
    if (!input) continue;
    const val = input.value.trim().toLowerCase();
    const correctOptions = vaultAnswers[i - 1];
    
    let isCorrect = false;
    if (val !== "") {
      for (let opt of correctOptions) {
        if (val.includes(opt.toLowerCase())) {
          isCorrect = true;
          break;
        }
      }
    }
    
    if (isCorrect) {
      input.style.borderColor = "var(--accent-green)";
      input.style.backgroundColor = "rgba(22, 163, 74, 0.1)";
      correctCount++;
    } else {
      input.style.borderColor = "red";
      input.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
    }
  }
  
  const feedback = document.getElementById("vaultFeedback");
  if (feedback) {
    feedback.style.display = "block";
    if (correctCount === 50) {
      feedback.style.backgroundColor = "rgba(22, 163, 74, 0.1)";
      feedback.style.color = "var(--accent-green)";
      feedback.style.border = "1px solid var(--accent-green)";
      feedback.innerHTML = `🏆 PERFECT! 50/50! You have fully unlocked the Chronology Vault and proved your Mastery! +250 XP awarded!`;
      window.awardXP(250);
    } else if (correctCount >= 40) {
      feedback.style.backgroundColor = "rgba(245, 158, 11, 0.1)";
      feedback.style.color = "var(--accent-gold)";
      feedback.style.border = "1px solid var(--accent-gold)";
      feedback.innerHTML = `⭐ Great Job! You got ${correctCount}/50 correct. Double check the red fields to get 50/50! +100 XP awarded!`;
      window.awardXP(100);
    } else {
      feedback.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
      feedback.style.color = "red";
      feedback.style.border = "1px solid red";
      feedback.innerHTML = `📝 You scored ${correctCount}/50. Review the course material and correct the red fields!`;
    }
  }
};
