import { updateLeitnerBox, saveProgress } from './storage.js';

export function renderQuizZone(container, unitData) {
    if (!unitData || !unitData.quizPack || unitData.quizPack.length === 0) {
        container.innerHTML = `<div style="padding: 40px; text-align: center; color: #64748b;">No quiz data available for this unit.</div>`;
        return;
    }

    const quizPack = unitData.quizPack;
    
    // Chunk into levels of 10
    const CHUNK_SIZE = 10;
    const levels = [];
    for (let i = 0; i < quizPack.length; i += CHUNK_SIZE) {
        levels.push(quizPack.slice(i, i + CHUNK_SIZE));
    }

    // Add a Boss level (15 random questions from anywhere)
    const bossQuestions = [...quizPack].sort(() => 0.5 - Math.random()).slice(0, 15);

    let html = `
        <div style="max-width: 800px; margin: 0 auto; padding-bottom: 50px; font-family: 'Inter', sans-serif;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="font-size: 2.5rem; color: #1a237e; margin-bottom: 10px;">Knowledge Quiz Zone</h1>
                <p style="color: #64748b; font-size: 1.1rem;">Test your recall of key historical facts!</p>
                <div style="margin-top: 20px;">
                    <a href="${window.currentUnitId ? `/${window.currentUnitId}/quiz_pack.html` : 'quiz_pack.html'}" target="_blank" style="display: inline-block; background-color: #f1f5f9; color: #334155; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; border: 1px solid #cbd5e1; transition: background 0.2s;">
                        <i class="fa-solid fa-print"></i> Download A4 Printable PDF
                    </a>
                </div>
            </div>

            <div id="quiz-ui-container">
                <!-- Level Select will render here -->
            </div>
        </div>
    `;

    container.innerHTML = html;

    const uiContainer = document.getElementById('quiz-ui-container');

    function renderLevelSelect() {
        let levelHtml = `
            <h2 style="color: #0f172a; margin-bottom: 20px;">Select a Level</h2>
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

        // Boss Level
        levelHtml += `
            <div class="quiz-boss-card" style="background: linear-gradient(135deg, #1e1b4b, #312e81); border: 2px solid #4f46e5; border-radius: 12px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 15px rgba(79, 70, 229, 0.4);">
                <div style="font-size: 2rem; color: #fbbf24; margin-bottom: 10px;"><i class="fa-solid fa-crown"></i></div>
                <h3 style="margin: 0 0 5px 0; color: white;">The Ultimate Test</h3>
                <p style="margin: 0; color: #cbd5e1; font-size: 0.9rem;">15 Random Questions</p>
            </div>
        </div>`;

        uiContainer.innerHTML = levelHtml;

        // Add hover effects and listeners
        const cards = uiContainer.querySelectorAll('.quiz-level-card');
        cards.forEach(card => {
            card.addEventListener('mouseover', () => { card.style.borderColor = '#3b82f6'; card.style.transform = 'translateY(-3px)'; });
            card.addEventListener('mouseout', () => { card.style.borderColor = '#e2e8f0'; card.style.transform = 'translateY(0)'; });
            card.addEventListener('click', () => {
                const idx = parseInt(card.dataset.level);
                startQuiz(levels[idx], `Level ${idx + 1}`);
            });
        });

        const bossCard = uiContainer.querySelector('.quiz-boss-card');
        bossCard.addEventListener('mouseover', () => { bossCard.style.transform = 'translateY(-3px) scale(1.02)'; });
        bossCard.addEventListener('mouseout', () => { bossCard.style.transform = 'translateY(0) scale(1)'; });
        bossCard.addEventListener('click', () => {
            startQuiz(bossQuestions, `The Ultimate Test`);
        });
    }

    function shuffleArray(array) {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    }

    function startQuiz(questionsSet, title) {
        let currentIndex = 0;
        let score = 0;
        
        // Shuffle options for all questions in this set ahead of time to avoid reshuffling on re-render
        const sessionQuestions = questionsSet.map(q => ({
            ...q,
            shuffledOptions: shuffleArray(q.options || [q.a, "Random Option 1", "Random Option 2", "Random Option 3"])
        }));

        function renderQuestion() {
            if (currentIndex >= sessionQuestions.length) {
                renderResults();
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
                        
                        if (q.id) {
                            updateLeitnerBox(q.id, true);
                            saveProgress();
                        }
                    } else {
                        btn.style.background = '#fee2e2';
                        btn.style.borderColor = '#ef4444';
                        btn.style.color = '#991b1b';
                        
                        // Highlight correct
                        const correctBtn = Array.from(btns).find(b => b.dataset.answer === correct);
                        if (correctBtn) {
                            correctBtn.style.background = '#dcfce7';
                            correctBtn.style.borderColor = '#22c55e';
                        }
                        uiContainer.querySelector('#quiz-feedback').innerHTML = `<div style="color: #dc2626; font-weight: bold; font-size: 1.2rem;"><i class="fa-solid fa-circle-xmark"></i> Incorrect. The answer was ${correct}</div>`;
                        
                        if (q.id) {
                            updateLeitnerBox(q.id, false);
                            saveProgress();
                        }
                    }

                    const nextBtn = document.createElement('button');
                    nextBtn.innerHTML = currentIndex === sessionQuestions.length - 1 ? 'See Results <i class="fa-solid fa-arrow-right"></i>' : 'Next Question <i class="fa-solid fa-arrow-right"></i>';
                    nextBtn.style.cssText = "margin-top: 15px; background: #3b82f6; color: white; border: none; padding: 12px 25px; border-radius: 6px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: background 0.2s;";
                    nextBtn.addEventListener('mouseover', () => nextBtn.style.background = '#2563eb');
                    nextBtn.addEventListener('mouseout', () => nextBtn.style.background = '#3b82f6');
                    nextBtn.addEventListener('click', () => {
                        currentIndex++;
                        renderQuestion();
                    });
                    uiContainer.querySelector('#quiz-feedback').appendChild(nextBtn);
                });
            });
        }

        function renderResults() {
            const percentage = Math.round((score / sessionQuestions.length) * 100);
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
                    <div style="font-size: 3rem; font-weight: 800; color: ${color}; margin-bottom: 10px;">${score} / ${sessionQuestions.length}</div>
                    <p style="color: #64748b; font-size: 1.1rem; margin-bottom: 30px;">${message}</p>
                    
                    <button id="back-to-levels-btn" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 12px 25px; border-radius: 6px; font-size: 1rem; font-weight: bold; cursor: pointer; transition: background 0.2s;">
                        <i class="fa-solid fa-arrow-left"></i> Back to Levels
                    </button>
                </div>
            `;
            uiContainer.innerHTML = resHtml;

            const backBtn = uiContainer.querySelector('#back-to-levels-btn');
            backBtn.addEventListener('mouseover', () => backBtn.style.background = '#e2e8f0');
            backBtn.addEventListener('mouseout', () => backBtn.style.background = '#f1f5f9');
            backBtn.addEventListener('click', renderLevelSelect);
        }

        renderQuestion();
    }

    // Start by showing the level selection screen
    renderLevelSelect();
}
