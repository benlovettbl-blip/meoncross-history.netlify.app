document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.page, .page-landscape');
  const tabs = document.querySelectorAll('#workbookTabs .tb-tab');

  // 1. Dynamically generate page footers for printing
  pages.forEach((page, index) => {
    const pageNum = index + 1;
    const footer = document.createElement('div');
    footer.className = 'page-footer';
    footer.innerHTML = `
      <div class="footer-left" style="font-weight: 600;">${pageNum}/${pages.length}</div>
    `;
    page.appendChild(footer);
  });

  // Tab mapping to page indices (0-indexed)
  const tabMappings = {
    cover: [0, 1, 2],       // Pages 1, 2, 2A
    timeline: [3],       // Page 3 (Road to WWI)
    lesson1: [4, 5, 6, 7, 8],   // Pages 4-8
    lesson2: [9, 10, 11, 12, 13],  // Pages 9-13
    lesson3: [14, 15, 16, 17, 18], // Pages 14-18
    lesson4: [19, 20, 21, 22, 23], // Pages 19-23
    lesson5: [24, 25, 26, 27, 28, 29], // Pages 24-28 (including 25a)
    assessment: [30, 32, 33],    // Page 29 (L5B), Pages 30A, 30B (Vault)
    glossary: [31, 34],  // Page 30 (Glossary), Page 31A (Post-War Map)
    exhibition: [35, 36], // Pages 31, 32 (Curator's Market & Placards)
    games: [37],          // Page 33 (Interactive Revision Games)
    cards: [38]           // Page 34 (Historical Trading Cards)
  };

  // 2. Dynamic Line Generation for visible pages
  function adjustWorksheetLines() {
    // Handled by pure CSS flex-grow now
  }

  // 3. Tab switching action
  function selectTab(tabKey) {
    const activeIndices = tabMappings[tabKey] || [0];
    
    // Toggle active classes on pages
    pages.forEach((page, index) => {
      if (activeIndices.includes(index)) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });

    // Toggle active state on tab buttons
    tabs.forEach(tab => {
      if (tab.getAttribute('data-tab') === tabKey) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Recalculate dynamic worksheet lines
    adjustWorksheetLines();
  }

  // Bind tab click events
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const tabKey = e.target.getAttribute('data-tab');
      selectTab(tabKey);
    });
  });

  window.printWorkbook = function() {
    window.print();
  };

  window.toggleDoNow = function(lessonNum) {
    const grid = document.getElementById(`doNowGrid${lessonNum}`);
    if (grid) {
      const cells = grid.querySelectorAll('.do-now-cell');
      const firstCell = cells[0];
      const isRevealed = firstCell ? firstCell.classList.contains('answers-revealed') : false;
      
      cells.forEach(cell => {
        if (isRevealed) {
          cell.classList.remove('answers-revealed');
        } else {
          cell.classList.add('answers-revealed');
        }
      });
      
      // Update button text
      const ev = window.event;
      if (ev && ev.target) {
        const btn = ev.target.closest('button');
        if (btn) {
          btn.innerHTML = isRevealed 
            ? '<i class="fa-solid fa-eye"></i> Reveal Do Now Answers' 
            : '<i class="fa-solid fa-eye-slash"></i> Hide Do Now Answers';
        }
      }
    }
  };

  let currentUtterance = null;
  window.speakLesson = function(lessonNum) {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      const btns = document.querySelectorAll('.speak-btn');
      btns.forEach(btn => {
        btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Listen';
      });
      if (currentUtterance && currentUtterance.lessonNum === lessonNum) {
        currentUtterance = null;
        return;
      }
    }
    
    // Find reading content text to speak (we look for narrative-col elements on current active pages)
    const activePages = document.querySelectorAll('.page.active, .page-landscape.active');
    let textToRead = "";
    activePages.forEach(page => {
      const paragraphs = page.querySelectorAll('.narrative-col, p');
      paragraphs.forEach(p => {
        // Skip metadata/headers to only read the actual lesson content
        if (!p.closest('.do-now-grid') && !p.closest('.vocabulary-box') && !p.closest('.glossary-table')) {
          textToRead += p.innerText + " ";
        }
      });
    });
    
    if (!textToRead.trim()) return;
    
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lessonNum = lessonNum;
    currentUtterance = utterance;
    
    const ev = window.event;
    const btn = ev ? ev.target.closest('button') : null;
    if (btn) {
      btn.innerHTML = '<i class="fa-solid fa-stop"></i> Stop';
    }
    
    utterance.onend = function() {
      if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Listen';
      }
      currentUtterance = null;
    };
    
    window.speechSynthesis.speak(utterance);
  };

  // Interactive Timeline Milestones Data
  const milestoneData = {
    1: {
      year: "1871",
      title: "The Unification of Germany",
      desc: "Following victory in the Franco-Prussian War, the German states unified into the German Empire. The unification ceremony was deliberately held in the Hall of Mirrors at Versailles, France's historic royal palace. This created long-term French resentment and a desire for revenge (revanche).",
      img: "assets/was_germany_unification.png",
      trivia: "Which strategic border territory did France lose to Germany as a result of this war?"
    },
    2: {
      year: "1897",
      title: "Imperial Rivalries & 'Place in the Sun'",
      desc: "Kaiser Wilhelm II declared Germany would pursue a 'World Policy' (Weltpolitik) to secure its 'place in the sun'-meaning colonial territory overseas. This directly challenged the existing global empires of Great Britain and France, sparking rivalries in Africa.",
      img: "assets/was_greedy_boy.png",
      trivia: "What message was the British cartoonist trying to send by showing the Kaiser biting into the globe?"
    },
    3: {
      year: "1906",
      title: "The Naval Arms Race",
      desc: "Great Britain launched the revolutionary battleship HMS Dreadnought in 1906. With steam turbine engines and ten 12-inch guns, it made all older battleships obsolete overnight. Germany responded by building its own Dreadnoughts, setting off a dangerous shipbuilding race.",
      img: "assets/was_dreadnought_blueprint.png",
      trivia: "How many heavy guns did HMS Dreadnought carry?"
    },
    4: {
      year: "1907",
      title: "Encirclement & The Alliance System",
      desc: "In response to Germany's growing military and naval power, Great Britain, France, and Russia joined together to form the Triple Entente in 1907. This completed a rival alliance system opposite the Triple Alliance (Germany, Austria-Hungary, Italy), making Germany feel surrounded.",
      img: "assets/was_military_matrix.png",
      trivia: "Which three nations belonged to the rival Triple Entente?"
    },
    5: {
      year: "June 1914",
      title: "The Spark in Sarajevo",
      desc: "Archduke Franz Ferdinand, heir to the Austro-Hungarian throne, was assassinated in Sarajevo by Gavrilo Princip, a member of the Serbian nationalist group 'Black Hand'. This short-term spark triggered the July Crisis, dragging Europe's allied empires into war.",
      img: "assets/was_boiling_point.png",
      trivia: "What was the name of the group that planned the assassination?"
    }
  };

  window.showMilestoneModal = function(id) {
    const data = milestoneData[id];
    if (!data) return;
    
    const contentBox = document.getElementById('modalMilestoneContent');
    if (contentBox) {
      contentBox.innerHTML = `
        <div style="font-size: 11pt; font-weight: bold; color: var(--gold); text-transform: uppercase; margin-bottom: 5px;">Milestone ${id}: ${data.year}</div>
        <h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-top: 0; margin-bottom: 15px; border-bottom: 1.5px solid var(--gold); padding-bottom: 5px; color: #ffffff;">${data.title}</h3>
        <img src="${data.img}" alt="${data.title}" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 6px; border: 1.5px solid var(--gold); margin-bottom: 15px;">
        <p style="font-size: 10.5pt; line-height: 1.5; color: #e2e8f0; margin-bottom: 15px; text-align: justify;">${data.desc}</p>
        <div style="background: rgba(255,255,255,0.06); padding: 12px; border-radius: 6px; border-left: 3px solid var(--gold);">
          <strong style="display: block; font-size: 9pt; text-transform: uppercase; color: var(--gold); margin-bottom: 4px;"><i class="fa-solid fa-circle-question"></i> Retrieval Challenge</strong>
          <span style="font-size: 9.5pt; line-height: 1.4; color: #f8fafc;">${data.trivia}</span>
        </div>
      `;
    }
    
    const modal = document.getElementById('milestoneModal');
    if (modal) {
      modal.style.display = 'flex';
    }
  };

  window.closeMilestoneModal = function() {
    const modal = document.getElementById('milestoneModal');
    if (modal) {
      modal.style.display = 'none';
    }
  };

  window.toggleSimplifyText = function(pageId) {
    const page = document.getElementById(pageId);
    if (page) {
      const isSimplified = page.classList.contains('text-simplified');
      if (isSimplified) {
        page.classList.remove('text-simplified');
      } else {
        page.classList.add('text-simplified');
      }
      
      // Update toggle button label
      const ev = window.event;
      if (ev && ev.target) {
        const btn = ev.target.closest('button');
        if (btn) {
          btn.innerHTML = isSimplified
            ? '<i class="fa-solid fa-compress"></i> Simplify Text'
            : '<i class="fa-solid fa-expand"></i> Show Academic Text';
        }
      }
      
      // Re-trigger layout calculations to adjust writing lines
      adjustWorksheetLines();
    }
  };

  // Re-run line calculations on window resize
  window.addEventListener('resize', adjustWorksheetLines);

  window.toggleLessonSentenceStarters = function(event) {
    const btn = event.currentTarget;
    const page = btn.closest('.page');
    if (!page) return;
    
    const starters = page.querySelectorAll('.sentence-starter-inline');
    const answers = page.querySelectorAll('.model-answer-inline');
    
    const anyVisible = Array.from(starters).some(el => el.style.display !== 'none' && el.style.display !== '');
    starters.forEach(el => {
      el.style.display = anyVisible ? 'none' : 'block';
    });
    
    if (!anyVisible) {
      answers.forEach(el => {
        el.style.display = 'none';
      });
      const modelBtn = page.querySelector('.model-answers-toggle-btn');
      if (modelBtn) {
        modelBtn.innerHTML = '<i class="fa-solid fa-check-double"></i> Model Answers';
        modelBtn.classList.remove('active-btn');
      }
    }
    
    btn.innerHTML = anyVisible 
      ? '<i class="fa-solid fa-pen-clip"></i> Sentence Starters' 
      : '<i class="fa-solid fa-eye-slash"></i> Hide Starters';
      
    if (anyVisible) {
      btn.classList.remove('active-btn');
    } else {
      btn.classList.add('active-btn');
    }
    
    adjustWorksheetLines();
  };

  window.toggleLessonModelAnswersInline = function(event) {
    const btn = event.currentTarget;
    const page = btn.closest('.page');
    if (!page) return;
    
    const starters = page.querySelectorAll('.sentence-starter-inline');
    const answers = page.querySelectorAll('.model-answer-inline');
    
    const anyVisible = Array.from(answers).some(el => el.style.display !== 'none' && el.style.display !== '');
    answers.forEach(el => {
      el.style.display = anyVisible ? 'none' : 'block';
    });
    
    if (!anyVisible) {
      starters.forEach(el => {
        el.style.display = 'none';
      });
      const startersBtn = page.querySelector('.sentence-starters-toggle-btn');
      if (startersBtn) {
        startersBtn.innerHTML = '<i class="fa-solid fa-pen-clip"></i> Sentence Starters';
        startersBtn.classList.remove('active-btn');
      }
    }
    
    btn.innerHTML = anyVisible 
      ? '<i class="fa-solid fa-check-double"></i> Model Answers' 
      : '<i class="fa-solid fa-eye-slash"></i> Hide Answers';
      
    if (anyVisible) {
      btn.classList.remove('active-btn');
    } else {
      btn.classList.add('active-btn');
    }
    
    adjustWorksheetLines();
  };

  // Dynamic creation of transparent textareas for student answer input over writing lines
  const lineBoxes = document.querySelectorAll('.writing-lines-box');
  lineBoxes.forEach((box) => {
    if (!box.querySelector('textarea')) {
      const textarea = document.createElement('textarea');
      textarea.className = 'student-textarea no-print';
      textarea.placeholder = 'Type your answer here for on-screen entry...';
      textarea.style.width = '100%';
      textarea.style.height = '100%';
      textarea.style.position = 'absolute';
      textarea.style.top = '0';
      textarea.style.left = '0';
      textarea.style.border = 'none';
      textarea.style.background = 'transparent';
      textarea.style.resize = 'none';
      textarea.style.fontFamily = 'inherit';
      textarea.style.fontSize = '11.5pt';
      textarea.style.lineHeight = '8mm';
      textarea.style.padding = '0 6px';
      textarea.style.boxSizing = 'border-box';
      textarea.style.outline = 'none';
      textarea.style.color = '#1a1a1a';
      textarea.style.overflow = 'hidden';
      
      box.style.position = 'relative';
      box.appendChild(textarea);
    }
  });

  // Global bridge for copying lesson answers to OneNote
  window.copyAnswersToOneNote = function(pageId) {
    const page = document.getElementById(pageId);
    if (!page) return;
    
    const textareas = page.querySelectorAll('textarea');
    let copyText = "";
    
    // Find all questions on the page
    const questions = page.querySelectorAll('.task-question, .task-annotation-box label');
    
    textareas.forEach((ta, idx) => {
      const qText = questions[idx] ? questions[idx].innerText.trim() : `Question ${idx + 1}`;
      const aText = ta.value.trim();
      if (aText) {
        copyText += `${qText}\nAnswer: ${aText}\n\n`;
      }
    });
    
    if (!copyText.trim()) {
      alert("Please type some answers in the on-screen boxes first!");
      return;
    }
    
    navigator.clipboard.writeText(copyText).then(() => {
      const ev = window.event || window.Event;
      let targetBtn = null;
      if (ev && ev.target) {
        targetBtn = ev.target.closest('button');
      } else {
        // Fallback: search for active element or the button on the page
        targetBtn = page.querySelector('button[onclick*="copyAnswersToOneNote"]');
      }
      
      if (targetBtn) {
        const originalText = targetBtn.innerHTML;
        targetBtn.innerHTML = "✓ Copied! Open OneNote and Press Ctrl+V";
        targetBtn.style.backgroundColor = "#16a34a";
        targetBtn.style.color = "#ffffff";
        setTimeout(() => {
          targetBtn.innerHTML = originalText;
          targetBtn.style.backgroundColor = "";
          targetBtn.style.color = "";
        }, 4000);
      }
    }).catch(err => {
      console.error("Failed to copy answers: ", err);
      alert("Copy failed. Please copy manually.");
    });
  };

  // Interactive WWI Cloze Passage Game checking logic
  window.checkClozeWWI = function() {
    const answers = {
      "ww1-gap1": "Franco-Prussian War",
      "ww1-gap2": "Alsace-Lorraine",
      "ww1-gap3": "Weltpolitik",
      "ww1-gap4": "place in the sun",
      "ww1-gap5": "Agadir Crisis",
      "ww1-gap6": "Dreadnought",
      "ww1-gap7": "Two-Power Standard",
      "ww1-gap8": "Triple Entente",
      "ww1-gap9": "encirclement",
      "ww1-gap10": "Gavrilo Princip",
      "ww1-gap11": "Treaty of London (1839)"
    };

    let correct = 0;
    const total = Object.keys(answers).length;

    for (let gapId in answers) {
      const select = document.getElementById(gapId);
      if (!select) continue;
      if (select.value === answers[gapId]) {
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

    const feedback = document.getElementById("clozeFeedback");
    if (feedback) {
      feedback.style.display = "block";
      if (correct === total) {
        feedback.className = "feedback-box success";
        feedback.innerHTML = "🎉 Excellent! You got 11/11 correct! You have mastered the core origins of WWI!";
      } else {
        feedback.className = "feedback-box error";
        feedback.innerHTML = `❌ You got ${correct} out of ${total} correct. Please adjust the red selections and try again!`;
      }
    }
  };

  // Interactive WWI Timeline Matcher checking logic
  window.checkTimelineWWI = function() {
    const answers = {
      "ww1-time1": "1871",
      "ww1-time2": "1897",
      "ww1-time3": "1906",
      "ww1-time4": "1907",
      "ww1-time5": "1911",
      "ww1-time6": "June 1914",
      "ww1-time7": "August 1914"
    };

    let correct = 0;
    const total = Object.keys(answers).length;

    for (let id in answers) {
      const select = document.getElementById(id);
      if (!select) continue;
      if (select.value === answers[id]) {
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

    const feedback = document.getElementById("timelineFeedback");
    if (feedback) {
      feedback.style.display = "block";
      if (correct === total) {
        feedback.className = "feedback-box success";
        feedback.innerHTML = "🎉 Chronology Master! You matched all 7 major events to their correct dates!";
      } else {
        feedback.className = "feedback-box error";
        feedback.innerHTML = `❌ You got ${correct} out of ${total} correct. Check the red selections and try again!`;
      }
    }
  };

  // GCSE Paper 3 Assessment Scaffolding Selector
  const scaffoldGuides = {
    supported: `
      <strong>💡 Supported Level Guide:</strong><br>
      • <strong>Word Bank:</strong> Encirclement, Weltpolitik, Dreadnought, Schlieffen Plan, Triple Entente, Blank Cheque, Sarajevo, Gavrilo Princip.<br>
      • <strong>Sentence Starters:</strong><br>
      &nbsp;&nbsp; - <em>Question 3a:</em> Source A is useful because it shows the German view that they were being... Source B is useful because it reveals that Britain felt trapped by... Together they show...<br>
      &nbsp;&nbsp; - <em>Question 3b:</em> Interpretation 1 argues that Germany is to blame because... In contrast, Interpretation 2 argues that no single power...<br>
      &nbsp;&nbsp; - <em>Question 3c:</em> The interpretations differ because they rely on different evidence. Interpretation 1 focuses on... while Interpretation 2 focuses on...
    `,
    standard: `
      <strong>💡 Standard Level Guide:</strong><br>
      • <strong>Sentence Stems:</strong><br>
      &nbsp;&nbsp; - <em>Question 3a:</em> Both Source A and Source B are highly useful. Source A reveals the German belief in "encirclement" and the necessity of... while Source B illustrates the British attempt to...<br>
      &nbsp;&nbsp; - <em>Question 3b:</em> The main difference is that Hastings (Interpretation 1) places primary blame on Germany's deliberate aggression, whereas MacMillan (Interpretation 2) argues that...<br>
      &nbsp;&nbsp; - <em>Question 3c:</em> These differing views arise because Hastings emphasizes... whereas MacMillan takes a systemic view, arguing that...
    `,
    advanced: `
      <strong>💡 Advanced Level (Exam-Ready Guide):</strong><br>
      • <strong>PEEL structure:</strong> Point, Evidence, Explanation, Link.<br>
      • <strong>Guidance:</strong> Compare the internal motivations of Germany (Source A) against the external systemic constraints of alliances (Source B). Focus on how Hastings emphasizes individual agency, while MacMillan emphasizes systemic structural pressures. No sentence starters provided.
    `
  };

  window.setPaper3Scaffold = function(level) {
    const box = document.getElementById("paper3-scaffold-box");
    if (!box) return;
    box.innerHTML = scaffoldGuides[level] || "";
    
    // Toggle active class on buttons
    const btnIds = ["scaffold-supported-btn", "scaffold-standard-btn", "scaffold-advanced-btn"];
    btnIds.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        if (id.includes(level)) {
          btn.classList.add("active-scaffold-btn");
          btn.style.backgroundColor = "var(--navy)";
          btn.style.color = "#ffffff";
        } else {
          btn.classList.remove("active-scaffold-btn");
          btn.style.backgroundColor = "";
          btn.style.color = "";
        }
      }
    });
  };

  // Populate initial scaffold level
  setPaper3Scaffold("supported");

  // Initialize on "Cover & Log" Tab
  selectTab('cover');
});
