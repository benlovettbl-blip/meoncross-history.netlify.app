const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'quiz_zone.js');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Add groupedFlashcardLevels
code = code.replace(
    'let groupedLevels = {};',
    'let groupedLevels = {};\n    let groupedFlashcardLevels = {};'
);

code = code.replace(
    'if (!groupedLevels[topicKey]) {\n                groupedLevels[topicKey] = { title: topicKey, questions: [] };\n            }',
    'if (!groupedLevels[topicKey]) {\n                groupedLevels[topicKey] = { title: topicKey, questions: [] };\n            }\n            if (!groupedFlashcardLevels[topicKey]) {\n                groupedFlashcardLevels[topicKey] = { title: topicKey, questions: [] };\n            }'
);

// 2. Add addFlashcard and replace the masterBank pushing block
const oldVocabBlock = `            // For Vocab and Flashcards (masterBank)
            if (l.vocab) {
                l.vocab.forEach(v => {
                    vocabBank.push({ term: v.term, definition: v.definition });
                    masterBank.push({
                        q: \`What is the definition of "\${v.term}"?\`,
                        a: v.definition,
                        source: l.title
                    });
                    masterBank.push({
                        q: \`Which term matches this definition: "\${v.definition}"?\`,
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
            }`;

const newVocabBlock = `            // For Vocab and Flashcards (masterBank)
            const addFlashcard = (q, a) => {
                const questionObj = { q, a, source: l.title };
                masterBank.push(questionObj);
                groupedFlashcardLevels[topicKey].questions.push(questionObj);
            };

            if (l.vocab) {
                l.vocab.forEach(v => {
                    vocabBank.push({ term: v.term, definition: v.definition });
                    addFlashcard(\`What is the definition of "\${v.term}"?\`, v.definition);
                    addFlashcard(\`Which term matches this definition: "\${v.definition}"?\`, v.term);
                });
            }
            if (l.do_now && l.do_now.type === "questions") {
                l.do_now.items.forEach(item => {
                    addFlashcard(item.question, item.answer);
                });
            }
            if (l.knowledge_check) {
                l.knowledge_check.forEach(item => {
                    addFlashcard(item.question, item.answer);
                });
            }`;

code = code.replace(oldVocabBlock, newVocabBlock);

// 3. Replace renderLevelSelect
const oldRenderLevelSelectRegex = /function renderLevelSelect\(\) \{[\s\S]*?function startQuiz/m;

const newRenderLevelSelect = `function renderLevelSelect(isFlashcard = false) {
        let currentLevels = isFlashcard ? Object.values(groupedFlashcardLevels).filter(lvl => lvl.questions.length > 0) : levels;
        
        let levelHtml = \`
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="color: #0f172a; margin: 0;">Select a \${isFlashcard ? 'Flashcard Deck' : 'Level'}</h2>
                <button id="btn-back-main" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 8px 15px; border-radius: 6px; cursor: pointer;"><i class="fa-solid fa-arrow-left"></i> Back</button>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
        \`;

        currentLevels.forEach((lvl, index) => {
            levelHtml += \`
                <div class="quiz-level-card" data-level="\${index}" style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <div style="font-size: 2rem; color: \${isFlashcard ? '#f59e0b' : '#3b82f6'}; margin-bottom: 10px;"><i class="fa-solid \${isFlashcard ? 'fa-bolt' : 'fa-unlock-keyhole'}"></i></div>
                    <h3 style="margin: 0 0 5px 0; color: #1e293b; font-size: 1.1rem; line-height: 1.3;">\${lvl.title}</h3>
                    <p style="margin: 0; color: #64748b; font-size: 0.9rem; margin-top: 8px;">\${lvl.questions.length} \${isFlashcard ? 'Cards' : 'Questions'}</p>
                </div>
            \`;
        });

        if (!isFlashcard) {
            levelHtml += \`
                <div class="quiz-boss-card" style="background: linear-gradient(135deg, #1e1b4b, #312e81); border: 2px solid #4f46e5; border-radius: 12px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4);">
                    <div style="font-size: 2rem; color: #fbbf24; margin-bottom: 10px;"><i class="fa-solid fa-crown"></i></div>
                    <h3 style="margin: 0 0 5px 0; color: white;">The Ultimate Test</h3>
                    <p style="margin: 0; color: #cbd5e1; font-size: 0.9rem;">15 Random Questions</p>
                </div>\`;
        }
        levelHtml += \`</div>\`;
        
        uiContainer.innerHTML = levelHtml;

        uiContainer.querySelector('#btn-back-main').addEventListener('click', () => {
            uiContainer.style.display = 'none';
            modeSelect.style.display = 'block';
        });

        const cards = uiContainer.querySelectorAll('.quiz-level-card');
        cards.forEach(card => {
            card.addEventListener('mouseover', () => { card.style.borderColor = isFlashcard ? '#f59e0b' : '#3b82f6'; card.style.transform = 'translateY(-3px)'; });
            card.addEventListener('mouseout', () => { card.style.borderColor = '#e2e8f0'; card.style.transform = 'translateY(0)'; });
            card.addEventListener('click', () => {
                const idx = parseInt(card.dataset.level);
                if (isFlashcard) {
                    startFlashcardUI(currentLevels[idx].questions, currentLevels[idx].title);
                } else {
                    startQuiz(currentLevels[idx].questions, currentLevels[idx].title, true);
                }
            });
        });

        if (!isFlashcard) {
            const bossCard = uiContainer.querySelector('.quiz-boss-card');
            bossCard.addEventListener('mouseover', () => { bossCard.style.transform = 'translateY(-3px) scale(1.02)'; });
            bossCard.addEventListener('mouseout', () => { bossCard.style.transform = 'translateY(0) scale(1)'; });
            bossCard.addEventListener('click', () => {
                startQuiz(bossQuestions, \`The Ultimate Test\`, true);
            });
        }
    }

    function startQuiz`;

code = code.replace(oldRenderLevelSelectRegex, newRenderLevelSelect);

// Fix event listener for renderLevelSelect in renderResults
code = code.replace(
    "uiContainer.querySelector('#back-to-levels-btn').addEventListener('click', renderLevelSelect);",
    "uiContainer.querySelector('#back-to-levels-btn').addEventListener('click', () => renderLevelSelect(false));"
);

// Fix btn-mode-levels event listener to pass false explicitly just in case (though it defaults to false)
code = code.replace(
    "renderLevelSelect();",
    "renderLevelSelect(false);"
);

// 4. Update startFlashcardFrenzy
const oldStartFlashcardFrenzy = `    function startFlashcardFrenzy() {
        if (masterBank.length === 0) {
            uiContainer.innerHTML = \`<div style="text-align: center; padding: 30px;">No flashcard data available.</div><button onclick="document.getElementById('mode-select-container').style.display='block'; document.getElementById('quiz-ui-container').style.display='none';" style="padding: 10px; cursor: pointer;">Back</button>\`;
            return;
        }
        const sessionQs = shuffleArray([...masterBank]).slice(0, 10);
        startQuiz(sessionQs, "Flashcard Frenzy", false);
    }`;

const newStartFlashcardFrenzy = `    function startFlashcardFrenzy() {
        if (Object.keys(groupedFlashcardLevels).length === 0) {
            uiContainer.innerHTML = \`<div style="text-align: center; padding: 30px;">No flashcard data available.</div><button onclick="document.getElementById('mode-select-container').style.display='block'; document.getElementById('quiz-ui-container').style.display='none';" style="padding: 10px; cursor: pointer;">Back</button>\`;
            return;
        }
        renderLevelSelect(true);
    }

    function startFlashcardUI(questionsSet, title) {
        let currentIndex = 0;
        const sessionQuestions = shuffleArray([...questionsSet]); // Shuffle the deck

        function renderCard() {
            if (currentIndex >= sessionQuestions.length) {
                renderFlashcardResults();
                return;
            }

            const q = sessionQuestions[currentIndex];

            let qHtml = \`
                <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); text-align: center; position: relative;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; color: #64748b; font-size: 0.9rem;">
                        <span><strong>\${title}</strong></span>
                        <span>Card \${currentIndex + 1} of \${sessionQuestions.length}</span>
                    </div>
                    
                    <div id="flashcard-container" style="perspective: 1000px; width: 100%; max-width: 600px; margin: 0 auto; height: 300px; cursor: pointer;">
                        <div id="flashcard-inner" style="width: 100%; height: 100%; transition: transform 0.6s; transform-style: preserve-3d; position: relative;">
                            
                            <!-- Front of card -->
                            <div style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; display: flex; align-items: center; justify-content: center; padding: 20px; flex-direction: column;">
                                <h2 style="font-size: 1.5rem; color: #0f172a; margin: 0;">\${q.q}</h2>
                                <p style="color: #64748b; margin-top: 20px; font-size: 0.9rem;"><i class="fa-solid fa-hand-pointer"></i> Click to flip</p>
                            </div>

                            <!-- Back of card -->
                            <div style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; display: flex; align-items: center; justify-content: center; padding: 20px; transform: rotateY(180deg); flex-direction: column;">
                                <h2 style="font-size: 1.5rem; color: #1e3a8a; margin: 0;">\${q.a}</h2>
                            </div>

                        </div>
                    </div>

                    <div id="flashcard-actions" style="margin-top: 30px; display: none; justify-content: center; gap: 20px;">
                        <button id="btn-wrong" style="background: #fee2e2; color: #b91c1c; border: 2px solid #fca5a5; padding: 12px 25px; border-radius: 8px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: all 0.2s;"><i class="fa-solid fa-xmark"></i> I was wrong</button>
                        <button id="btn-right" style="background: #dcfce7; color: #15803d; border: 2px solid #86efac; padding: 12px 25px; border-radius: 8px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: all 0.2s;"><i class="fa-solid fa-check"></i> I got it right!</button>
                    </div>
                </div>
            \`;

            uiContainer.innerHTML = qHtml;

            const flashcardInner = uiContainer.querySelector('#flashcard-inner');
            const flashcardContainer = uiContainer.querySelector('#flashcard-container');
            const actions = uiContainer.querySelector('#flashcard-actions');
            let flipped = false;

            flashcardContainer.addEventListener('click', () => {
                if (!flipped) {
                    flashcardInner.style.transform = 'rotateY(180deg)';
                    actions.style.display = 'flex';
                    flipped = true;
                }
            });

            uiContainer.querySelector('#btn-wrong').addEventListener('click', (e) => {
                e.stopPropagation(); // prevent triggering the container flip click if overlapping
                if (q.id) {
                    updateLeitnerBox(q.id, false);
                    saveProgress();
                }
                currentIndex++;
                renderCard();
            });

            uiContainer.querySelector('#btn-right').addEventListener('click', (e) => {
                e.stopPropagation();
                if (q.id) {
                    updateLeitnerBox(q.id, true);
                    saveProgress();
                }
                currentIndex++;
                renderCard();
            });
        }

        function renderFlashcardResults() {
            let resHtml = \`
                <div style="background: white; border-radius: 12px; padding: 40px 30px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); text-align: center;">
                    <div style="font-size: 4rem; color: #f59e0b; margin-bottom: 10px;"><i class="fa-solid fa-bolt"></i></div>
                    <h2 style="font-size: 2rem; color: #0f172a; margin-bottom: 10px;">Deck Complete!</h2>
                    <p style="color: #64748b; font-size: 1.1rem; margin-bottom: 30px;">You've reviewed all cards in this topic.</p>
                    
                    <button id="back-to-menu-btn" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 12px 25px; border-radius: 6px; font-size: 1rem; font-weight: bold; cursor: pointer; margin-right: 10px;">
                        <i class="fa-solid fa-list"></i> Main Menu
                    </button>
                    <button id="back-to-levels-btn" style="background: #f59e0b; color: white; border: none; padding: 12px 25px; border-radius: 6px; font-size: 1rem; font-weight: bold; cursor: pointer;">
                        <i class="fa-solid fa-arrow-left"></i> Back to Decks
                    </button>
                </div>
            \`;
            uiContainer.innerHTML = resHtml;

            uiContainer.querySelector('#back-to-menu-btn').addEventListener('click', () => {
                uiContainer.style.display = 'none';
                modeSelect.style.display = 'block';
            });
            uiContainer.querySelector('#back-to-levels-btn').addEventListener('click', () => renderLevelSelect(true));
        }

        renderCard();
    }`;

code = code.replace(oldStartFlashcardFrenzy, newStartFlashcardFrenzy);

fs.writeFileSync(filePath, code);
console.log("Successfully rewrote quiz_zone.js");
