import fs from 'fs';

const filePath = 'c:/Projects/meoncross-history.netlify.app/src/core_app.js';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Inject Vocab Phase + Start Locked Content
const phaseHookStr = '// PHASE: Core Information & Sources';
const phaseInjectStr = `
    // PHASE: Vocabulary Unlock (Tier 3)
    const hasVocab = lesson.vocab && lesson.vocab.length > 0;
    if (hasVocab) {
      html += \`
        <div class="phase-card" id="phase-\${phaseNum}">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; margin-bottom: 20px; padding-bottom: 10px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0; color: #b45309;">Phase \${phaseNum++}: Vocabulary Unlock</div>
          </div>
          <p style="color: #475569; margin-bottom: 20px; font-size: 1.1rem;"><i class="fa-solid fa-lock" style="color: #ef4444;"></i> <strong>The lesson is locked!</strong> Tap a term on the left, then tap its matching definition on the right to unlock the historical narrative.</p>
          
          <div id="vocab-match-game" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="match-terms" style="display: flex; flex-direction: column; gap: 10px;">
      \`;
      
      lesson.vocab.forEach((v, idx) => {
        html += \`<button class="btn btn-secondary match-term-btn" data-idx="\${idx}" style="text-align: left; padding: 15px; font-weight: bold; border-width: 2px; transition: all 0.2s;">\${v.term}</button>\`;
      });
      
      html += \`</div><div class="match-defs" style="display: flex; flex-direction: column; gap: 10px;">\`;
      
      let defs = lesson.vocab.map((v, idx) => ({ def: v.definition, idx: idx }));
      defs.sort(() => Math.random() - 0.5);
      
      defs.forEach(d => {
        html += \`<button class="btn btn-secondary match-def-btn" data-idx="\${d.idx}" style="text-align: left; padding: 15px; font-weight: normal; border-width: 2px; transition: all 0.2s;">\${d.def}</button>\`;
      });
      
      html += \`
            </div>
          </div>
          <div id="unlock-success" style="display: none; margin-top: 20px; padding: 15px; background: #ecfdf5; border: 2px solid #10b981; border-radius: 8px; color: #047857; font-weight: bold; text-align: center; font-size: 1.2rem;">
            <i class="fa-solid fa-lock-open"></i> Vocabulary Unlocked! Proceed to the narrative.
          </div>
        </div>
        <div id="locked-content" style="opacity: 0.15; pointer-events: none; filter: blur(4px); transition: all 0.8s ease;">
      \`;
    }

    // PHASE: Core Information & Sources`;

content = content.replace(phaseHookStr, phaseInjectStr);

// 2. End Locked Content
const endHookStr = 'contentArea.innerHTML = html;';
const endInjectStr = `
    if (hasVocab) {
      html += \`</div>\`; // End locked-content
    }
    contentArea.innerHTML = html;
    window.vocabMatchesFound = 0; // reset for new lesson
`;
content = content.replace(endHookStr, endInjectStr);


// 3. Inject JS Logic for matching game
const initHookStr = `  // Initialize`;
const jsInjectStr = `
  // Matching Game Logic
  let selectedTermIdx = null;
  let selectedTermEl = null;
  window.vocabMatchesFound = 0;

  document.addEventListener('click', (e) => {
    const termBtn = e.target.closest('.match-term-btn');
    const defBtn = e.target.closest('.match-def-btn');

    if (termBtn && !termBtn.disabled) {
      document.querySelectorAll('.match-term-btn').forEach(b => {
        if (!b.disabled) b.style.borderColor = '#cbd5e1';
      });
      termBtn.style.borderColor = '#3b82f6';
      selectedTermIdx = termBtn.dataset.idx;
      selectedTermEl = termBtn;
    }

    if (defBtn && !defBtn.disabled && selectedTermIdx !== null) {
      if (defBtn.dataset.idx === selectedTermIdx) {
        // Match found!
        defBtn.style.background = '#10b981';
        defBtn.style.color = '#fff';
        defBtn.style.borderColor = '#059669';
        defBtn.disabled = true;

        selectedTermEl.style.background = '#10b981';
        selectedTermEl.style.color = '#fff';
        selectedTermEl.style.borderColor = '#059669';
        selectedTermEl.disabled = true;

        selectedTermIdx = null;
        selectedTermEl = null;
        window.vocabMatchesFound++;

        const totalTerms = document.querySelectorAll('.match-term-btn').length;
        if (window.vocabMatchesFound >= totalTerms) {
           const successMsg = document.getElementById('unlock-success');
           if (successMsg) successMsg.style.display = 'block';
           
           const lockedSec = document.getElementById('locked-content');
           if (lockedSec) {
             lockedSec.style.opacity = '1';
             lockedSec.style.pointerEvents = 'auto';
             lockedSec.style.filter = 'none';
           }
        }
      } else {
        // Wrong match
        defBtn.style.borderColor = '#ef4444';
        setTimeout(() => {
          if (!defBtn.disabled) defBtn.style.borderColor = '#cbd5e1';
        }, 500);
      }
    }
  });

  // Initialize`;
content = content.replace(initHookStr, jsInjectStr);


fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully added Vocabulary Unlock phase.");
