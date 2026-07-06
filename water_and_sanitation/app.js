// State Management
const appState = {
  currentTab: "lessonsSection",
  theme: localStorage.getItem("was_theme") || "light",
  userXP: Number(localStorage.getItem("was_user_xp")) || 0,
  timelineFilter: "all",
  timelineSearchQuery: "",
  timelineSortMode: "topic",
  isSimplifiedActive: false
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
    });
  });
}

// 2. Text Simplifier
window.toggleSimplifyText = function(event) {
  const btn = event.currentTarget || document.getElementById('simplifyTextBtn');
  const standardBlock = document.getElementById('standardNarrativeBlock');
  const simplifiedBlock = document.getElementById('simplifiedNarrativeBlock');
  if (!btn || !standardBlock || !simplifiedBlock) return;

  appState.isSimplifiedActive = !appState.isSimplifiedActive;

  if (appState.isSimplifiedActive) {
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
    const readBtn = document.getElementById('readAloudBtn');
    if (readBtn) {
      readBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Listen';
      readBtn.style.background = 'rgba(var(--primary-rgb), 0.05)';
    }
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
    const activeBlockId = appState.isSimplifiedActive ? 'simplifiedNarrativeBlock' : 'standardNarrativeBlock';
    const container = document.getElementById(activeBlockId);
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

// 4. Quick Quiz Logic
let quickQuizState = {
  currentQuestionIndex: 0,
  selectedAnswer: null,
  isSubmitted: false
};

window.selectQuickQuizOption = function(optIdx) {
  if (quickQuizState.isSubmitted) return;
  quickQuizState.selectedAnswer = optIdx;
  
  const optionBtns = document.querySelectorAll('.quick-quiz-option-btn');
  optionBtns.forEach((btn, idx) => {
    if (idx === optIdx) {
      btn.style.borderColor = 'var(--primary)';
      btn.style.background = 'rgba(var(--primary-rgb), 0.04)';
    } else {
      btn.style.borderColor = 'var(--border-color)';
      btn.style.background = 'var(--bg-surface)';
    }
  });
  
  const submitBtn = document.getElementById('quickQuizSubmitBtn');
  if (submitBtn) submitBtn.disabled = false;
};

window.submitQuickQuizAnswer = function() {
  if (quickQuizState.isSubmitted || quickQuizState.selectedAnswer === null) return;
  quickQuizState.isSubmitted = true;
  
  const q = quizData[quickQuizState.currentQuestionIndex];
  const options = [q.answer, ...q.distractors];
  const selectedText = options[quickQuizState.selectedAnswer];
  const isCorrect = (selectedText === q.answer);
  
  const feedbackBlock = document.getElementById('quickQuizFeedback');
  feedbackBlock.style.display = 'block';
  if (isCorrect) {
    feedbackBlock.style.borderColor = 'var(--success)';
    feedbackBlock.style.background = 'rgba(16, 185, 129, 0.04)';
    feedbackBlock.innerHTML = `<span style="color: var(--success); font-weight: 800;">✓ Correct!</span><p style="margin: 4px 0 0 0; font-size: 0.85rem;">${q.explanation}</p>`;
    
    appState.userXP += 50;
    localStorage.setItem("was_user_xp", appState.userXP);
    updateXPBadge();
  } else {
    feedbackBlock.style.borderColor = 'var(--error)';
    feedbackBlock.style.background = 'rgba(239, 68, 68, 0.04)';
    feedbackBlock.innerHTML = `<span style="color: var(--error); font-weight: 800;">✗ Incorrect.</span><p style="margin: 4px 0 0 0; font-size: 0.85rem;">The correct answer is: <strong>${q.answer}</strong>.<br>${q.explanation}</p>`;
  }
  
  const submitBtn = document.getElementById('quickQuizSubmitBtn');
  if (quickQuizState.currentQuestionIndex < quizData.length - 1) {
    submitBtn.innerHTML = 'Next Question <i class="fa-solid fa-arrow-right"></i>';
    submitBtn.setAttribute('onclick', 'window.nextQuickQuizQuestion()');
  } else {
    submitBtn.innerHTML = 'Quiz Completed! 🎉';
    submitBtn.disabled = true;
  }
};

window.nextQuickQuizQuestion = function() {
  quickQuizState.currentQuestionIndex++;
  quickQuizState.selectedAnswer = null;
  quickQuizState.isSubmitted = false;
  window.renderLessonQuickQuiz();
};

window.renderLessonQuickQuiz = function() {
  const container = document.getElementById('quickQuizQuestionContainer');
  if (!container) return;
  
  const q = quizData[quickQuizState.currentQuestionIndex];
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
      Question ${quickQuizState.currentQuestionIndex + 1} of ${quizData.length}:
      <span style="font-weight: 500; font-family: var(--font-body); display: block; margin-top: 6px;">${q.question}</span>
    </div>
    
    <div style="margin-bottom: 16px;">
      ${optionsHtml}
    </div>
    
    <div id="quickQuizFeedback" style="display: none; padding: 10px 14px; border-left: 4px solid; border-radius: var(--radius-sm); margin-bottom: 16px; font-family: var(--font-body);"></div>
    
    <button class="btn btn-primary" id="quickQuizSubmitBtn" onclick="window.submitQuickQuizAnswer()" disabled style="width: 100%;">
      Submit Answer
    </button>`;
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
  
  const events = timelineData[0].events;
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
  if (name === "Seneca the Younger") {
    content = "Seneca the Younger (c. 4 BC - AD 65) was a famous Roman philosopher and statesman. In his letters, he complained vividly about the assortment of groans, screeches, and street vendor cries surrounding the public baths, showing how noisy and social Roman sanitation spaces were.";
  } else if (name === "Roman Engineers") {
    content = "Roman engineers were master builders who transformed sanitation. They used the natural pull of gravity to transport fresh spring water over miles through stone conduits, built grand public bathhouses, and constructed flushing latrine sewers in cities and military garrisons.";
  } else if (name === "Iron Age Britons") {
    content = "Before the Roman invasion of AD 43, Iron Age farming communities lived in wood-and-thatch roundhouses. Because settlements were small and spread out, they relied on natural wells or fresh springs for water, and dug simple cesspits to collect household waste.";
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

window.generateWorksheetPackHtml = function(includeAnswers) {
  const data = parsedMarkdownData || { doNow: [], vocab: [], paragraphs: [], activities: [], senecaQuote: '', senecaCite: '' };
  const extraLinesTable = includeAnswers 
    ? '' 
    : `<div style="margin-top: 15px; margin-bottom: 5px;">
        <span style="font-size: 0.65rem; color: #9ca3af; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">Extra Writing Space:</span>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="height: 40px;"><td style="border-bottom: 1px solid #cccccc; padding: 0; height: 40px;"></td></tr>
          <tr style="height: 40px;"><td style="border-bottom: 1px solid #cccccc; padding: 0; height: 40px;"></td></tr>
          <tr style="height: 40px;"><td style="border-bottom: 1px solid #cccccc; padding: 0; height: 40px;"></td></tr>
          <tr style="height: 40px;"><td style="border-bottom: 1px solid #cccccc; padding: 0; height: 40px;"></td></tr>
          <tr style="height: 40px;"><td style="border-bottom: 1px solid #cccccc; padding: 0; height: 40px;"></td></tr>
        </table>
       </div>`;

  // Condense Do Now grid layout
  let doNowHtml = '';
  (data.doNow || []).forEach((q, idx) => {
    doNowHtml += `
      <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 4px; padding: 6px 10px; font-size: 0.74rem; line-height: 1.25;">
        <strong style="color: #4f46e5; display: block; margin-bottom: 2px;">Q${idx + 1}: ${q.question}</strong>
        <div style="${answerStyle}">A: ${q.answer}</div>
        ${includeAnswers ? '' : '<div style="border-bottom: 1px dashed #9ca3af; height: 14px; margin-top: 2px;"></div>'}
      </div>
    `;
  });

  let vocabHtml = '';
  (data.vocab || []).forEach(v => {
    vocabHtml += `
      <div style="font-size: 0.74rem; line-height: 1.3;">
        <strong>${v.word}:</strong> ${v.definition}
      </div>
    `;
  });

  let narrativeHtml = '';
  (data.paragraphs || []).forEach(p => {
    narrativeHtml += `
      <p style="font-size: 0.76rem; line-height: 1.35; text-align: justify; margin: 0 0 6px 0;">
        ${p}
      </p>
    `;
  });

  const activitiesList = data.activities || [];
  
  const getQuestionBlock = (questionText, answerText, qIndex, lineCount) => {
    const answerBlock = includeAnswers 
      ? `<div style="color: #16a34a; font-style: italic; font-weight: 600; font-size: 0.74rem; margin-top: 2px; margin-bottom: 6px; line-height: 1.3;">A: ${answerText}</div>`
      : `<table style="width: 100%; height: 120px; border-collapse: collapse; margin-top: 4px; margin-bottom: 8px;">
          <tr style="height: 40px;"><td style="border-bottom: 1px solid #cccccc; padding: 0; height: 40px;"></td></tr>
          <tr style="height: 40px;"><td style="border-bottom: 1px solid #cccccc; padding: 0; height: 40px;"></td></tr>
          <tr style="height: 40px;"><td style="border-bottom: 1px solid #cccccc; padding: 0; height: 40px;"></td></tr>
         </table>`;

    return `
      <div style="margin-bottom: 6px; font-size: 0.76rem; page-break-inside: avoid; line-height: 1.25;">
        <strong style="color: #374151;">Q${qIndex}: ${questionText}</strong>
        ${answerBlock}
      </div>
    `;
  };

  // Page 2: Part A (Q1-Q4)
  let page2ActivitiesHtml = '<h3 style="color: #4f46e5; font-size: 0.82rem; text-transform: uppercase; font-weight: 700; margin-top: 6px; margin-bottom: 6px; border-bottom: 1px dashed #e5e7eb; padding-bottom: 2px;">Part A: Core Comprehension</h3>';
  if (activitiesList[0]) page2ActivitiesHtml += getQuestionBlock(activitiesList[0].question, activitiesList[0].answer, 1, 3);
  if (activitiesList[1]) page2ActivitiesHtml += getQuestionBlock(activitiesList[1].question, activitiesList[1].answer, 2, 3);
  if (activitiesList[2]) page2ActivitiesHtml += getQuestionBlock(activitiesList[2].question, activitiesList[2].answer, 3, 4);
  if (activitiesList[3]) page2ActivitiesHtml += getQuestionBlock(activitiesList[3].question, activitiesList[3].answer, 4, 4);

  // Page 3: Part B (Q5-Q7)
  let page3ActivitiesHtml = '<h3 style="color: #e11d48; font-size: 0.82rem; text-transform: uppercase; font-weight: 700; margin-top: 6px; margin-bottom: 6px; border-bottom: 1px dashed #e5e7eb; padding-bottom: 2px;">Part B: Conceptual Analysis</h3>';
  if (activitiesList[4]) page3ActivitiesHtml += getQuestionBlock(activitiesList[4].question, activitiesList[4].answer, 5, 4);
  if (activitiesList[5]) page3ActivitiesHtml += getQuestionBlock(activitiesList[5].question, activitiesList[5].answer, 6, 4);
  if (activitiesList[6]) page3ActivitiesHtml += getQuestionBlock(activitiesList[6].question, activitiesList[6].answer, 7, 4);

  // Page 3 Bottom: Part C (Q8 & Q9)
  let page3SourceAnalysisHtml = '<h3 style="color: #10b981; font-size: 0.82rem; text-transform: uppercase; font-weight: 700; margin-top: 6px; margin-bottom: 6px; border-bottom: 1px dashed #e5e7eb; padding-bottom: 2px;">Part C: Source Analysis</h3>';
  if (activitiesList[7]) {
    page3SourceAnalysisHtml += getQuestionBlock(activitiesList[7].question, activitiesList[7].answer, 8, 4);
  }
  page3SourceAnalysisHtml += getQuestionBlock(
    'Study Source B (Frontinus) and Source C (South Shields Inscription). What do these sources tell us about the purpose and Roman attitudes towards aqueducts?',
    'Frontinus (Source B) shows that Romans took great pride in their aqueducts, viewing them as superior to the idle Pyramids of Egypt. The South Shields Inscription (Source C) shows that aqueducts had the vital practical purpose of bringing fresh water to military forts to resolve water scarcity for soldiers.',
    9,
    4
  );

  // Page 4: Part D (Q10-Q12)
  let page4ActivitiesHtml = '<h3 style="color: #d97706; font-size: 0.82rem; text-transform: uppercase; font-weight: 700; margin-top: 6px; margin-bottom: 6px; border-bottom: 1px dashed #e5e7eb; padding-bottom: 2px;">Part D: Extension & Research Tasks</h3>';
  page4ActivitiesHtml += getQuestionBlock(
    'Search for "Silchester Roman Town excavation" and write down two structures discovered.',
    'Archaeologists excavated a large forum-basilica, public bathhouses, a temple precinct, and an amphitheatre just outside the town walls.',
    10,
    4
  );

  const q11DrawingBox = includeAnswers
    ? `<div style="color: #16a34a; font-style: italic; font-weight: 600; font-size: 0.74rem; margin-top: 2px; margin-bottom: 6px; line-height: 1.3;">A: [Student diagram showing parallel stone benches built over deep, running-water sewers with a shallow freshwater channel in front for washing sponges.]</div>`
    : `<div style="height: 60mm; border: 1.5px dashed #ccc; margin: 6px 0; background: #fafafa; border-radius: 4px;"></div>`;

  page4ActivitiesHtml += `
    <div style="margin-bottom: 6px; font-size: 0.76rem; page-break-inside: avoid; line-height: 1.25;">
      <strong style="color: #374151;">Q11: Draw a diagram of "Housesteads Roman Fort latrines reconstruction".</strong>
      ${q11DrawingBox}
    </div>
  `;

  page4ActivitiesHtml += getQuestionBlock(
    'Research "Bearsden Roman Bath House" and write a short travel guide.',
    'Welcome to Bearsden Bath House! Visit the cold room (frigidarium), warm room (tepidarium), and hot room (caldarium). See the underfloor hypocaust pillars and the ancient latrine block used by Roman soldiers c. AD 140.',
    12,
    4
  );

  const quoteVal = data.senecaQuote || "I am surrounded by all kinds of noise...";
  const citeVal = data.senecaCite || "Seneca the Younger";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>KS3 Water & Sanitation Study Pack</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Outfit', sans-serif;
      margin: 0;
      padding: 0;
      background: #f3f4f6;
      color: #374151;
      line-height: 1.35;
    }
    .page {
      width: 210mm;
      height: 297mm;
      background: #ffffff;
      margin: 10px auto;
      padding: 10mm 15mm;
      box-shadow: 0 4px 10px rgba(0,0,0,0.06);
      border: 1px solid #e5e7eb;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
    }
    h1, h2, h3 {
      color: #1e1b4b;
      margin-top: 0;
      margin-bottom: 4px;
    }
    .section-title {
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 2px;
      margin-bottom: 6px;
      font-weight: 800;
      color: #4f46e5;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
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
    @media print {
      @page {
        size: A4;
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
      }
      .page:last-child {
        page-break-after: avoid;
      }
    }
    .writing-lines {
      background-image: repeating-linear-gradient(transparent, transparent 30px, #ccc 30px, #ccc 31px);
      background-size: 100% 31px;
      border-left: 2px solid #fca5a5;
      padding-left: 8px;
      margin-top: 4px;
      margin-bottom: 8px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  </style>
</head>
<body>

  <!-- Page 1: Do Now, Vocab, Core Summary Narrative, Seneca Quote -->
  <div class="page">
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; border-bottom: 2px solid #4f46e5; padding-bottom: 4px;">
      <div style="max-width: 80%;">
        <span style="color: #4f46e5; font-weight: 800; font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">Meoncross School History • Unit Enquiry: Was the story of water and waste in Britain a steady climb of progress?</span>
        <h1 style="font-size: 0.92rem; font-weight: 800; margin: 0; color: #1e1b4b; line-height: 1.2;">Lesson 1 Enquiry: Did Roman engineering revolutionise public health for everyone in Britain?</h1>
      </div>
      <span style="background: rgba(79, 70, 229, 0.1); color: #4f46e5; padding: 2px 6px; border-radius: 8px; font-weight: 700; font-size: 0.65rem;">Lesson 1 Workbook Pack</span>
    </div>

    <div class="student-fields">
      <span><strong>Name:</strong> ___________________________________</span>
      <span><strong>Class:</strong> Year 7 (KS3)</span>
      <span><strong>Date:</strong> __________________</span>
    </div>

    <h2 class="section-title">1. Do Now: Retrieval Practice</h2>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 8px;">
      ${doNowHtml}
    </div>

    <h2 class="section-title">2. Key Vocabulary</h2>
    <div style="background: #fafafa; border: 1.5px solid #e5e7eb; border-radius: 6px; padding: 6px 12px; margin-bottom: 8px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
      ${vocabHtml}
    </div>

    <h2 class="section-title">3. Core Summary Narrative</h2>
    <div style="width: 100%; margin-bottom: 8px;">
      ${narrativeHtml}
    </div>

    <h2 class="section-title">4. Contemporary Source Evidence (Source A)</h2>
    <div style="background: #fffcf4; border-left: 3px solid #8b5cf6; padding: 6px 12px; border-radius: 4px; font-family: Georgia, serif; font-size: 0.72rem; color: #4b5563; margin-bottom: 6px; line-height: 1.3;">
      <strong style="color: #4f46e5; display: block; margin-bottom: 2px; font-family: sans-serif;">Source A: Seneca the Younger, Letters to Lucilius, c. AD 62</strong>
      "${quoteVal}"
      <div style="text-align: right; font-size: 0.68rem; margin-top: 2px; font-weight: bold; font-family: sans-serif; color: #374151;">
        — ${citeVal}
      </div>
    </div>

    <div style="background: rgba(79, 70, 229, 0.03); border-left: 3.5px solid #4f46e5; padding: 6px 10px; border-radius: 0 4px 4px 0; font-size: 0.7rem; line-height: 1.25;">
      <strong style="color: #4f46e5;">Class Discussion Prompt:</strong> Why might Seneca hate the noise of the bathhouse, while ordinary citizens enjoyed it? Does this show public baths were about cleanliness, or social and business meetings?
    </div>

    <div class="page-footer">
      <span>KS3 History Study Unit: Water and Sanitation</span>
      <span>Page 1</span>
    </div>
  </div>

  <!-- Page 2: Pupil Activities (Part A) -->
  <div class="page">
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; border-bottom: 2px solid #4f46e5; padding-bottom: 4px;">
      <div style="max-width: 80%;">
        <span style="color: #4f46e5; font-weight: 800; font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">Meoncross School History • Unit Enquiry: Was the story of water and waste in Britain a steady climb of progress?</span>
        <h1 style="font-size: 0.92rem; font-weight: 800; margin: 0; color: #1e1b4b; line-height: 1.2;">Lesson 1 Enquiry: Did Roman engineering revolutionise public health for everyone in Britain?</h1>
      </div>
      <span style="background: rgba(79, 70, 229, 0.1); color: #4f46e5; padding: 2px 6px; border-radius: 8px; font-weight: 700; font-size: 0.65rem;">Lesson 1 Workbook Pack</span>
    </div>

    <h2 class="section-title">5. Pupil Activities & Writing Tasks</h2>
    <div style="display: flex; flex-direction: column;">
      ${page2ActivitiesHtml}
    </div>
    ${extraLinesTable}

    <div class="page-footer">
      <span>KS3 History Study Unit: Water and Sanitation</span>
      <span>Page 2</span>
    </div>
  </div>

  <!-- Page 3: Pupil Activities (Part B), Written Sources, Part C -->
  <div class="page">
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; border-bottom: 2px solid #4f46e5; padding-bottom: 4px;">
      <div style="max-width: 80%;">
        <span style="color: #4f46e5; font-weight: 800; font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">Meoncross School History • Unit Enquiry: Was the story of water and waste in Britain a steady climb of progress?</span>
        <h1 style="font-size: 0.92rem; font-weight: 800; margin: 0; color: #1e1b4b; line-height: 1.2;">Lesson 1 Enquiry: Did Roman engineering revolutionise public health for everyone in Britain?</h1>
      </div>
      <span style="background: rgba(79, 70, 229, 0.1); color: #4f46e5; padding: 2px 6px; border-radius: 8px; font-weight: 700; font-size: 0.65rem;">Lesson 1 Workbook Pack</span>
    </div>

    <div style="display: flex; flex-direction: column; margin-bottom: 4px;">
      ${page3ActivitiesHtml}
    </div>

    <h2 class="section-title">6. Further Written Sources (Sources B & C)</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 6px; page-break-inside: avoid;">
      <div style="background: #fafafa; border: 1px solid #e5e7eb; border-radius: 4px; padding: 6px 10px; font-size: 0.68rem; line-height: 1.35;">
        <strong style="color: #4f46e5; display: block; margin-bottom: 3px;">Source B: Frontinus, Curator Aquarum, c. AD 97</strong>
        "With such an array of indispensable structures carrying so much water, compare, if you will, the idle Pyramids or the useless, though famous, works of the Greeks!"
      </div>
      <div style="background: #fafafa; border: 1px solid #e5e7eb; border-radius: 4px; padding: 6px 10px; font-size: 0.68rem; line-height: 1.35;">
        <strong style="color: #4f46e5; display: block; margin-bottom: 3px;">Source C: South Shields Inscription, c. AD 222</strong>
        "For the soldiers of the Cohort... under the command of Marcellus... they built this aqueduct to bring fresh water to the fort which had previously suffered from water scarcity."
      </div>
    </div>

    <div style="display: flex; flex-direction: column;">
      ${page3SourceAnalysisHtml}
    </div>

    <div class="page-footer">
      <span>KS3 History Study Unit: Water and Sanitation</span>
      <span>Page 3</span>
    </div>
  </div>

  <!-- Page 4: Pupil Activities (Part D) -->
  <div class="page">
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; border-bottom: 2px solid #4f46e5; padding-bottom: 4px;">
      <div style="max-width: 80%;">
        <span style="color: #4f46e5; font-weight: 800; font-size: 0.58rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">Meoncross School History • Unit Enquiry: Was the story of water and waste in Britain a steady climb of progress?</span>
        <h1 style="font-size: 0.92rem; font-weight: 800; margin: 0; color: #1e1b4b; line-height: 1.2;">Lesson 1 Enquiry: Did Roman engineering revolutionise public health for everyone in Britain?</h1>
      </div>
      <span style="background: rgba(79, 70, 229, 0.1); color: #4f46e5; padding: 2px 6px; border-radius: 8px; font-weight: 700; font-size: 0.65rem;">Lesson 1 Workbook Pack</span>
    </div>

    <div style="display: flex; flex-direction: column;">
      ${page4ActivitiesHtml}
    </div>
    ${extraLinesTable}

    <div class="page-footer">
      <span>KS3 History Study Unit: Water and Sanitation</span>
      <span>Page 4</span>
    </div>
  </div>

</body>
</html>
  `;
};

window.updateWorksheetPreview = function() {
  const iframe = document.getElementById('was-worksheet-preview-iframe');
  if (!iframe) return;
  
  const answersVal = document.getElementById('was-preview-answers').value;
  const includeAnswers = (answersVal === 'yes');
  
  const html = window.generateWorksheetPackHtml(includeAnswers);
  iframe.srcdoc = html;
};

window.printWorksheetPreview = function() {
  const iframe = document.getElementById('was-worksheet-preview-iframe');
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  }
};

// 8.5 Toggle Do Now Answers & Pupil Activity Model Answers
window.toggleDoNowAnswers = function(event) {
  const btn = event.currentTarget;
  const answers = document.querySelectorAll('.do-now-answer');
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
  const btn = event.currentTarget;
  const block = document.getElementById('modelAnswersBlock');
  if (!block) return;
  
  const isHidden = (block.style.display === 'none');
  if (isHidden) {
    block.style.display = 'block';
    btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Hide Model Answers & Marking Guide';
  } else {
    block.style.display = 'none';
    btn.innerHTML = '<i class="fa-solid fa-eye"></i> Show Model Answers & Marking Guide';
  }
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
    btn.style.background = "var(--bg-surface)";
    btn.style.color = "var(--text-main)";
    btn.style.borderColor = "var(--border-color)";
  });
  
  // Activate selected button
  const activeBtn = document.getElementById(`btnLesson${lessonNum}`);
  if (activeBtn) {
    activeBtn.classList.add("active");
    activeBtn.style.background = "var(--primary)";
    activeBtn.style.color = "#ffffff";
    activeBtn.style.borderColor = "var(--primary)";
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
};

window.addEventListener("DOMContentLoaded", async () => {
  setupTheme();
  setupNavigation();
  setupTimeline();
  renderLessonQuickQuiz();
  updateXPBadge();
  
  await loadLessonMarkdown();
  
  // Activate default lessons tab
  const lessonsTab = document.querySelector('.nav-tab[data-target="lessonsSection"]');
  if (lessonsTab) lessonsTab.click();
});
