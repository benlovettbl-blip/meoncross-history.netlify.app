import { updateLeitnerBox, saveProgress } from './storage.js';

export function renderQuizZone(container, unitData) {
    // --- 1. DATA PREPARATION ---
    let quizPack = unitData.quizPack || [];
    let masterBank = [];
    let vocabBank = [];

    // Dynamically build banks
    if (unitData.lessons) {
        unitData.lessons.forEach(l => {
            // For quizPack (structured quizzes)
            if (l.quiz && Array.isArray(l.quiz)) {
                l.quiz.forEach(q => {
                    quizPack.push({
                        q: q.question || q.q,
                        a: q.options ? q.options[q.answer] : q.a,
                        options: q.options
                    });
                });
            } else if (l.do_now && l.do_now.type === 'questions' && l.do_now.items) {
                l.do_now.items.forEach(item => {
                    quizPack.push({
                        q: item.question,
                        a: item.answer,
                        source: l.title
                    });
                });
            }

            // For Vocab and Flashcards (masterBank)
            if (l.vocab) {
                l.vocab.forEach(v => {
                    vocabBank.push({ term: v.term, definition: v.definition });
                    masterBank.push({
                        q: `What is the definition of "${v.term}"?`,
                        a: v.definition,
                        source: l.title
                    });
                    masterBank.push({
                        q: `Which term matches this definition: "${v.definition}"?`,
                        a: v.term,
                        source: l.title
                    });
                });
            }
            if (l.do_now && l.do_now.type === "questions") {
                l.do_now.items.forEach(item => {
                    masterBank.push({ q: item.question, a: item.answer, source: l.title });
                });
            }
            if (l.knowledge_check) {
                l.knowledge_check.forEach(item => {
                    masterBank.push({ q: item.question, a: item.answer, source: l.title });
                });
            }
        });
    }

    // Deduplicate
    masterBank = masterBank.filter((v, i, a) => a.findIndex(t => (t.q === v.q)) === i);
    vocabBank = vocabBank.filter((v, i, a) => a.findIndex(t => (t.term === v.term)) === i);

    if (quizPack.length === 0 && masterBank.length === 0) {
        container.innerHTML = `<div style="padding: 40px; text-align: center; color: #64748b;">No quiz or revision data available for this unit.</div>`;
        return;
    }

    // Level setup
    const CHUNK_SIZE = 10;
    const levels = [];
    for (let i = 0; i < quizPack.length; i += CHUNK_SIZE) {
        levels.push(quizPack.slice(i, i + CHUNK_SIZE));
    }
    const bossQuestions = [...quizPack].sort(() => 0.5 - Math.random()).slice(0, 15);

    // --- 2. UI SHELL ---
    container.innerHTML = `
        <div style="max-width: 800px; margin: 0 auto; padding-bottom: 50px; font-family: 'Inter', sans-serif;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="font-size: 2.5rem; color: #1a237e; margin-bottom: 10px;"><i class="fa-solid fa-gamepad"></i> Interactive Revision Hub</h1>
                <p style="color: #64748b; font-size: 1.1rem;">Test your recall of key historical facts!</p>
                <div style="margin-top: 20px;">
                    <a href="${window.currentUnitId ? `/${window.currentUnitId}/quiz_pack.html` : 'quiz_pack.html'}" target="_blank" style="display: inline-block; background-color: #f1f5f9; color: #334155; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; border: 1px solid #cbd5e1; transition: background 0.2s;">
                        <i class="fa-solid fa-print"></i> Download A4 Printable PDF
                    </a>
                </div>
            </div>

            <!-- MODE SELECT MENU -->
            <div id="mode-select-container">
                <p style="font-size: 1.2rem; color: #475569; margin-bottom: 30px; text-align: center;">Select a game mode to test your knowledge!</p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                    <div style="border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; text-align: center; cursor: pointer; transition: 0.2s;" onmouseover="this.style.borderColor='#1e3a8a'; this.style.background='#f8fafc';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='white';" id="btn-mode-levels">
                        <i class="fa-solid fa-layer-group" style="font-size: 3rem; color: #3b82f6; margin-bottom: 15px;"></i>
                        <h3 style="margin:0 0 10px 0; color: #1e3a8a; font-size: 1.5rem;">Levelled Quizzes</h3>
                        <p style="color: #64748b; margin:0;">Tracked, structured quizzes mapped to the A4 pack.</p>
                    </div>
                    <div style="border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; text-align: center; cursor: pointer; transition: 0.2s;" onmouseover="this.style.borderColor='#1e3a8a'; this.style.background='#f8fafc';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='white';" id="btn-mode-flashcard">
                        <i class="fa-solid fa-bolt" style="font-size: 3rem; color: #f59e0b; margin-bottom: 15px;"></i>
                        <h3 style="margin:0 0 10px 0; color: #1e3a8a; font-size: 1.5rem;">Flashcard Frenzy</h3>
                        <p style="color: #64748b; margin:0;">10 random quick-fire questions. ${masterBank.length} questions available.</p>
                    </div>
                    <div style="border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; text-align: center; cursor: pointer; transition: 0.2s;" onmouseover="this.style.borderColor='#1e3a8a'; this.style.background='#f8fafc';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.background='white';" id="btn-mode-vocab">
                        <i class="fa-solid fa-link" style="font-size: 3rem; color: #10b981; margin-bottom: 15px;"></i>
                        <h3 style="margin:0 0 10px 0; color: #1e3a8a; font-size: 1.5rem;">Vocab Match-Up</h3>
                        <p style="color: #64748b; margin:0;">Drag and drop to match 5 key terms to their definitions.</p>
                    </div>
                </div>
            </div>

            <!-- SHARED GAME CONTAINER -->
            <div id="quiz-ui-container" style="display: none; margin-top: 20px;"></div>
        </div>
    `;

    // References
    const modeSelect = container.querySelector('#mode-select-container');
    const uiContainer = container.querySelector('#quiz-ui-container');
    let activeMode = null;

    // Menu Navigation
    container.querySelector('#btn-mode-levels').addEventListener('click', () => {
        activeMode = 'levels';
        modeSelect.style.display = 'none';
        uiContainer.style.display = 'block';
        renderLevelSelect();
    });

    container.querySelector('#btn-mode-flashcard').addEventListener('click', () => {
        activeMode = 'flashcard';
        modeSelect.style.display = 'none';
        uiContainer.style.display = 'block';
        startFlashcardFrenzy();
    });

    container.querySelector('#btn-mode-vocab').addEventListener('click', () => {
        activeMode = 'vocab';
        modeSelect.style.display = 'none';
        uiContainer.style.display = 'block';
        startVocabMatchUp();
    });

    function shuffleArray(array) {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    }

    // ==========================================
    // 1. LEVELLED QUIZZES LOGIC
    // ==========================================
    function renderLevelSelect() {
        let levelHtml = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="color: #0f172a; margin: 0;">Select a Level</h2>
                <button id="btn-back-main" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 8px 15px; border-radius: 6px; cursor: pointer;"><i class="fa-solid fa-arrow-left"></i> Back</button>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
        `;

        levels.forEach((lvl, index) => {
            levelHtml += `
                <div class="quiz-level-card" data-level="${index}" style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <div style="font-size: 2rem; color: #3b82f6; margin-bottom: 10px;"><i class="fa-solid fa-unlock-keyhole"></i></div>
                    <h3 style="margin: 0 0 5px 0; color: #1e293b;">Level ${index + 1}</h3>
                    <p style="margin: 0; color: #64748b; font-size: 0.9rem;">Questions ${(index * CHUNK_SIZE) + 1} - ${(index * CHUNK_SIZE) + lvl.length}</p>
                </div>
            `;
        });

        levelHtml += `
            <div class="quiz-boss-card" style="background: linear-gradient(135deg, #1e1b4b, #312e81); border: 2px solid #4f46e5; border-radius: 12px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4);">
                <div style="font-size: 2rem; color: #fbbf24; margin-bottom: 10px;"><i class="fa-solid fa-crown"></i></div>
                <h3 style="margin: 0 0 5px 0; color: white;">The Ultimate Test</h3>
                <p style="margin: 0; color: #cbd5e1; font-size: 0.9rem;">15 Random Questions</p>
            </div>
        </div>`;

        uiContainer.innerHTML = levelHtml;

        uiContainer.querySelector('#btn-back-main').addEventListener('click', () => {
            uiContainer.style.display = 'none';
            modeSelect.style.display = 'block';
        });

        const cards = uiContainer.querySelectorAll('.quiz-level-card');
        cards.forEach(card => {
            card.addEventListener('mouseover', () => { card.style.borderColor = '#3b82f6'; card.style.transform = 'translateY(-3px)'; });
            card.addEventListener('mouseout', () => { card.style.borderColor = '#e2e8f0'; card.style.transform = 'translateY(0)'; });
            card.addEventListener('click', () => {
                const idx = parseInt(card.dataset.level);
                startQuiz(levels[idx], `Level ${idx + 1}`, true);
            });
        });

        const bossCard = uiContainer.querySelector('.quiz-boss-card');
        bossCard.addEventListener('mouseover', () => { bossCard.style.transform = 'translateY(-3px) scale(1.02)'; });
        bossCard.addEventListener('mouseout', () => { bossCard.style.transform = 'translateY(0) scale(1)'; });
        bossCard.addEventListener('click', () => {
            startQuiz(bossQuestions, `The Ultimate Test`, true);
        });
    }

    function startQuiz(questionsSet, title, trackProgress) {
        let currentIndex = 0;
        let score = 0;
        
        const allAnswers = questionsSet.map(q => q.a);
        const sessionQuestions = questionsSet.map(q => {
            let options = q.options;
            if (!options) {
                const wrongAnswers = allAnswers.filter(a => a !== q.a).sort(() => 0.5 - Math.random()).slice(0, 3);
                while (wrongAnswers.length < 3) wrongAnswers.push("Incorrect Option");
                options = [q.a, ...wrongAnswers];
            }
            return { ...q, shuffledOptions: shuffleArray(options) };
        });

        function renderQuestion() {
            if (currentIndex >= sessionQuestions.length) {
                renderResults(score, sessionQuestions.length, trackProgress);
                return;
            }

            const q = sessionQuestions[currentIndex];

            let qHtml = `
                <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); text-align: center;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; color: #64748b; font-size: 0.9rem;">
                        <span><strong>${title}</strong></span>
                        <span>Question ${currentIndex + 1} of ${sessionQuestions.length}</span>
                    </div>
                    <h2 style="font-size: 1.5rem; color: #0f172a; margin-bottom: 30px;">${q.q}</h2>
                    <div id="quiz-options" style="display: flex; flex-direction: column; gap: 10px; max-width: 500px; margin: 0 auto;">
                        ${q.shuffledOptions.map((opt, i) => `
                            <button class="quiz-option-btn" data-answer="${opt.replace(/"/g, '&quot;')}" style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; padding: 15px; font-size: 1.1rem; color: #334155; cursor: pointer; transition: all 0.2s; text-align: left; position: relative;">
                                <span style="display: inline-block; width: 30px; height: 30px; line-height: 30px; text-align: center; background: #e2e8f0; border-radius: 50%; margin-right: 15px; font-weight: bold; color: #64748b;">${String.fromCharCode(65 + i)}</span>
                                ${opt}
                            </button>
                        `).join('')}
                    </div>
                    <div id="quiz-feedback" style="margin-top: 25px; min-height: 50px;"></div>
                </div>
            `;

            uiContainer.innerHTML = qHtml;

            const btns = uiContainer.querySelectorAll('.quiz-option-btn');
            btns.forEach(btn => {
                btn.addEventListener('mouseover', () => { if(!btn.disabled) { btn.style.background = '#eff6ff'; btn.style.borderColor = '#bfdbfe'; }});
                btn.addEventListener('mouseout', () => { if(!btn.disabled) { btn.style.background = '#f8fafc'; btn.style.borderColor = '#e2e8f0'; }});
                btn.addEventListener('click', () => {
                    if (btn.disabled) return;
                    btns.forEach(b => b.disabled = true); // Lock all

                    const selected = btn.dataset.answer;
                    const correct = q.a;

                    if (selected === correct) {
                        btn.style.background = '#dcfce7';
                        btn.style.borderColor = '#22c55e';
                        btn.style.color = '#166534';
                        score++;
                        uiContainer.querySelector('#quiz-feedback').innerHTML = `<div style="color: #16a34a; font-weight: bold; font-size: 1.2rem;"><i class="fa-solid fa-circle-check"></i> Correct!</div>`;
                        
                        if (trackProgress && q.id) {
                            updateLeitnerBox(q.id, true);
                            saveProgress();
                        }
                    } else {
                        btn.style.background = '#fee2e2';
                        btn.style.borderColor = '#ef4444';
                        btn.style.color = '#991b1b';
                        
                        const correctBtn = Array.from(btns).find(b => b.dataset.answer === correct);
                        if (correctBtn) {
                            correctBtn.style.background = '#dcfce7';
                            correctBtn.style.borderColor = '#22c55e';
                        }
                        uiContainer.querySelector('#quiz-feedback').innerHTML = `<div style="color: #dc2626; font-weight: bold; font-size: 1.2rem;"><i class="fa-solid fa-circle-xmark"></i> Incorrect. The answer was ${correct}</div>`;
                        
                        if (trackProgress && q.id) {
                            updateLeitnerBox(q.id, false);
                            saveProgress();
                        }
                    }

                    const nextBtn = document.createElement('button');
                    nextBtn.innerHTML = currentIndex === sessionQuestions.length - 1 ? 'See Results <i class="fa-solid fa-arrow-right"></i>' : 'Next Question <i class="fa-solid fa-arrow-right"></i>';
                    nextBtn.style.cssText = "margin-top: 15px; background: #3b82f6; color: white; border: none; padding: 12px 25px; border-radius: 6px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: background 0.2s;";
                    nextBtn.addEventListener('click', () => {
                        currentIndex++;
                        renderQuestion();
                    });
                    uiContainer.querySelector('#quiz-feedback').appendChild(nextBtn);
                });
            });
        }
        renderQuestion();
    }

    function renderResults(score, total, fromLevels) {
        const percentage = Math.round((score / total) * 100);
        let message = '';
        let color = '';
        let icon = '';

        if (percentage >= 80) {
            message = "Excellent work! You have a great historical memory.";
            color = "#16a34a"; // green
            icon = "fa-trophy";
        } else if (percentage >= 50) {
            message = "Good effort! A little more revision and you'll master it.";
            color = "#ca8a04"; // yellow
            icon = "fa-star";
        } else {
            message = "Keep practicing! Review your notes and try again.";
            color = "#dc2626"; // red
            icon = "fa-book-open";
        }

        let resHtml = `
            <div style="background: white; border-radius: 12px; padding: 40px 30px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); text-align: center;">
                <div style="font-size: 4rem; color: ${color}; margin-bottom: 10px;"><i class="fa-solid ${icon}"></i></div>
                <h2 style="font-size: 2rem; color: #0f172a; margin-bottom: 10px;">Quiz Complete!</h2>
                <div style="font-size: 3rem; font-weight: 800; color: ${color}; margin-bottom: 10px;">${score} / ${total}</div>
                <p style="color: #64748b; font-size: 1.1rem; margin-bottom: 30px;">${message}</p>
                
                <button id="back-to-menu-btn" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 12px 25px; border-radius: 6px; font-size: 1rem; font-weight: bold; cursor: pointer; margin-right: 10px;">
                    <i class="fa-solid fa-list"></i> Main Menu
                </button>
                ${fromLevels ? `
                <button id="back-to-levels-btn" style="background: #3b82f6; color: white; border: none; padding: 12px 25px; border-radius: 6px; font-size: 1rem; font-weight: bold; cursor: pointer;">
                    <i class="fa-solid fa-arrow-left"></i> Back to Levels
                </button>` : ''}
            </div>
        `;
        uiContainer.innerHTML = resHtml;

        uiContainer.querySelector('#back-to-menu-btn').addEventListener('click', () => {
            uiContainer.style.display = 'none';
            modeSelect.style.display = 'block';
        });
        if (fromLevels) {
            uiContainer.querySelector('#back-to-levels-btn').addEventListener('click', renderLevelSelect);
        }
    }


    // ==========================================
    // 2. FLASHCARD FRENZY LOGIC
    // ==========================================
    function startFlashcardFrenzy() {
        if (masterBank.length === 0) {
            uiContainer.innerHTML = `<div style="text-align: center; padding: 30px;">No flashcard data available.</div><button onclick="document.getElementById('mode-select-container').style.display='block'; document.getElementById('quiz-ui-container').style.display='none';" style="padding: 10px; cursor: pointer;">Back</button>`;
            return;
        }
        const sessionQs = shuffleArray([...masterBank]).slice(0, 10);
        startQuiz(sessionQs, "Flashcard Frenzy", false);
    }

    // ==========================================
    // 3. VOCAB MATCH-UP LOGIC
    // ==========================================
    function startVocabMatchUp() {
        if (vocabBank.length < 5) {
            uiContainer.innerHTML = `<div style="text-align: center; padding: 30px;">Not enough vocabulary data available for match-up (needs 5).</div><button onclick="document.getElementById('mode-select-container').style.display='block'; document.getElementById('quiz-ui-container').style.display='none';" style="padding: 10px; cursor: pointer;">Back</button>`;
            return;
        }

        let shuffledVocab = shuffleArray([...vocabBank]).slice(0, 5);
        let terms = shuffleArray([...shuffledVocab]);
        let defs = shuffleArray([...shuffledVocab]);

        // Global functions for drag and drop
        window.dragVocab = function(ev) { ev.dataTransfer.setData("text", ev.target.id); };
        window.allowDropVocab = function(ev) { ev.preventDefault(); };
        window.dropVocab = function(ev) {
            ev.preventDefault();
            const data = ev.dataTransfer.getData("text");
            const draggedEl = document.getElementById(data);
            let target = ev.target;
            while (target && !target.classList.contains('vocab-dropzone')) target = target.parentElement;
            if (target && draggedEl) {
                if (target.children.length > 0) document.getElementById('vocab-terms-column').appendChild(target.children[0]);
                target.appendChild(draggedEl);
            }
        };

        let html = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="color: #0f172a; margin: 0;">Vocab Match-Up</h2>
                <button id="btn-back-main-vocab" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 8px 15px; border-radius: 6px; cursor: pointer;"><i class="fa-solid fa-arrow-left"></i> Back</button>
            </div>
            <p style="text-align:center; margin-bottom: 20px; color: #475569;">Drag the Terms on the left to the correct Definitions on the right.</p>
            <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 20px; margin-bottom: 20px;">
                <div id="vocab-terms-column" style="display:flex; flex-direction: column; gap:15px; border-right: 2px dashed #cbd5e1; padding-right: 20px;">
                    ${terms.map((v, i) => `<div id="vocab-term-${i}" data-term="${v.term.replace(/"/g, '&quot;')}" class="vocab-term-card" draggable="true" ondragstart="window.dragVocab(event)" style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 8px; padding: 15px; font-weight: bold; cursor: grab; text-align: center;">${v.term}</div>`).join('')}
                </div>
                <div id="vocab-defs-column" style="display:flex; flex-direction: column; gap:15px;">
                    ${defs.map(v => `
                        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; display: flex; align-items: stretch; min-height: 60px;">
                            <div class="vocab-dropzone" data-def="${v.term.replace(/"/g, '&quot;')}" ondragover="window.allowDropVocab(event)" ondrop="window.dropVocab(event)" style="flex: 0 0 150px; border-right: 2px dashed #94a3b8; background: white; border-top-left-radius: 8px; border-bottom-left-radius: 8px; padding: 10px; display:flex; align-items:center; justify-content:center;"></div>
                            <div style="padding: 15px; flex: 1; display:flex; align-items:center;">${v.definition}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div style="text-align: center;">
                <button id="btn-check-vocab" style="background: #3b82f6; color: white; border: none; font-size: 1.2rem; padding: 12px 30px; border-radius: 6px; font-weight: bold; cursor: pointer;">Check Answers</button>
                <div id="vocab-feedback" style="margin-top: 15px; font-weight: bold; font-size: 1.2rem; min-height: 2em;"></div>
            </div>
        `;

        uiContainer.innerHTML = html;

        uiContainer.querySelector('#btn-back-main-vocab').addEventListener('click', () => {
            uiContainer.style.display = 'none';
            modeSelect.style.display = 'block';
        });

        uiContainer.querySelector('#btn-check-vocab').addEventListener('click', () => {
            let correct = 0;
            const dropzones = uiContainer.querySelectorAll('.vocab-dropzone');
            let allFilled = true;

            dropzones.forEach(dz => {
                dz.style.background = 'white';
                if (dz.children.length === 0) {
                    allFilled = false;
                    return;
                }
                const termEl = dz.children[0];
                if (termEl.getAttribute('data-term') === dz.getAttribute('data-def')) {
                    correct++;
                    dz.style.background = '#dcfce7';
                    termEl.style.borderColor = '#16a34a';
                } else {
                    dz.style.background = '#fee2e2';
                    termEl.style.borderColor = '#dc2626';
                }
            });

            const feedback = uiContainer.querySelector('#vocab-feedback');
            if (!allFilled) {
                feedback.style.color = '#d97706';
                feedback.innerText = "Please match all terms before checking!";
                return;
            }

            if (correct === 5) {
                feedback.style.color = '#16a34a';
                feedback.innerText = "Perfect! 5/5 Correct.";
                setTimeout(() => renderResults(5, 5, false), 2000);
            } else {
                feedback.style.color = '#dc2626';
                feedback.innerText = `You got ${correct}/5 correct. Check the red boxes and try again!`;
            }
        });
    }

}
