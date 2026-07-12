import { terminologyData } from '../terminology_data.js';

export function initTerminologyTask(container) {
  container.innerHTML = `
    <div style="max-width: 1000px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border: 4px solid #8b5cf6;">
      <div style="text-align: center; margin-bottom: 25px;">
        <h1 style="font-family: 'Playfair Display', serif; font-size: 3rem; color: #4c1d95; margin-top: 0; margin-bottom: 10px;"><i class="fa-solid fa-spell-check"></i> Terminology Match</h1>
        <p style="font-size: 1.2rem; color: #475569;">Select a topic and drag the historical terms to their correct definitions.</p>
      </div>

      <div style="margin-bottom: 30px; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; align-items: flex-end; gap: 15px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 250px;">
          <label style="display: block; font-weight: 700; margin-bottom: 10px; color: #334155; font-size: 1.1rem;"><i class="fa-solid fa-list-ul"></i> Select Topic:</label>
          <select id="term-select" class="epz-select" style="width: 100%; padding: 14px; border-radius: 10px; border: 2px solid #cbd5e1; font-size: 1.15rem; background: #ffffff; color: #1e293b; cursor: pointer;">
            <optgroup label="Lesson Glossaries">
              ${terminologyData.map(t => `<option value="${t.id}">${t.title}</option>`).join('')}
            </optgroup>
          </select>
        </div>
        <button id="btn-focus-term" class="main-btn" style="background: #4c1d95; color: white; padding: 14px 20px; height: 55px; border-radius: 10px; font-weight: 600; display: flex; align-items: center; gap: 8px; border: none; cursor: pointer; white-space: nowrap;">
          <i class="fa-solid fa-expand"></i> Focus Mode
        </button>
      </div>

      <div style="display: grid; grid-template-columns: 300px 1fr; gap: 30px; align-items: start;" id="match-layout">
        
        <!-- Word Bank (Left) -->
        <div style="background: #f1f5f9; border-radius: 12px; padding: 20px; border: 2px dashed #94a3b8; min-height: 400px; display: flex; flex-direction: column; gap: 10px;" id="word-bank">
          <h3 style="margin-top: 0; text-align: center; color: #334155;"><i class="fa-solid fa-layer-group"></i> Word Bank</h3>
          <!-- Draggable terms go here -->
        </div>

        <!-- Definitions (Right) -->
        <div id="definitions-container" style="display: flex; flex-direction: column; gap: 15px;">
          <!-- Drop zones and definitions go here -->
        </div>

      </div>

      <div style="text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px; margin-top: 40px;">
        <div id="term-feedback" style="font-size: 1.4rem; font-weight: bold; min-height: 30px;"></div>
        <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
          <button id="btn-check-terms" class="main-btn epz-btn" style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 14px 28px; font-size: 1.2rem; border: none; border-radius: 10px; font-weight: 600;"><i class="fa-solid fa-check-double"></i> Check Matches</button>
          <button id="btn-reset-terms" class="main-btn epz-btn" style="background: #f1f5f9; color: #475569; padding: 14px 28px; font-size: 1.2rem; border: 1px solid #cbd5e1; border-radius: 10px; font-weight: 600;"><i class="fa-solid fa-arrow-rotate-left"></i> Reset Board</button>
        </div>
      </div>
    </div>
  `;

  const selectMenu = container.querySelector('#term-select');
  const wordBank = container.querySelector('#word-bank');
  const defContainer = container.querySelector('#definitions-container');
  const btnCheck = container.querySelector('#btn-check-terms');
  const btnReset = container.querySelector('#btn-reset-terms');
  const feedback = container.querySelector('#term-feedback');
  const btnFocus = container.querySelector('#btn-focus-term');

  // Focus Mode toggle
  if (btnFocus) {
    btnFocus.addEventListener('click', () => {
      document.body.classList.toggle('focus-mode');
      if (document.body.classList.contains('focus-mode')) {
        btnFocus.innerHTML = '<i class="fa-solid fa-compress"></i> Exit Focus';
      } else {
        btnFocus.innerHTML = '<i class="fa-solid fa-expand"></i> Focus Mode';
      }
    });
  }

  let currentTopic = null;
  let termsList = [];
  let defsList = [];

  function shuffleArray(array) {
    let newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  function loadTopic(id) {
    currentTopic = terminologyData.find(t => t.id === id);
    if (!currentTopic) return;
    
    termsList = shuffleArray(currentTopic.terms);
    defsList = shuffleArray(currentTopic.terms);
    
    feedback.innerHTML = '';
    renderBoard();
  }

  function renderBoard() {
    wordBank.innerHTML = '<h3 style="margin-top: 0; text-align: center; color: #334155; width: 100%;"><i class="fa-solid fa-layer-group"></i> Word Bank</h3>';
    defContainer.innerHTML = '';

    // Render terms in word bank
    termsList.forEach((item, index) => {
      const el = document.createElement('div');
      el.className = 'term-card';
      el.draggable = true;
      el.dataset.term = item.term;
      el.innerHTML = item.term;
      
      // Styling
      el.style.background = '#ffffff';
      el.style.border = '2px solid #8b5cf6';
      el.style.borderRadius = '8px';
      el.style.padding = '12px 15px';
      el.style.fontSize = '1.1rem';
      el.style.fontWeight = 'bold';
      el.style.color = '#4c1d95';
      el.style.cursor = 'grab';
      el.style.textAlign = 'center';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
      el.style.transition = 'all 0.2s';
      el.style.userSelect = 'none';

      el.addEventListener('dragstart', handleDragStart);
      el.addEventListener('dragend', handleDragEnd);

      wordBank.appendChild(el);
    });

    // Make word bank a dropzone for returning words
    wordBank.addEventListener('dragover', handleDragOver);
    wordBank.addEventListener('drop', handleBankDrop);

    // Render definitions
    defsList.forEach((item, index) => {
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.gap = '15px';
      row.style.alignItems = 'stretch';
      row.style.background = '#ffffff';
      row.style.border = '1px solid #cbd5e1';
      row.style.borderRadius = '10px';
      row.style.padding = '15px';
      row.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';

      // Drop zone
      const dropZone = document.createElement('div');
      dropZone.className = 'term-dropzone';
      dropZone.dataset.correctTerm = item.term;
      dropZone.style.width = '200px';
      dropZone.style.minHeight = '50px';
      dropZone.style.border = '2px dashed #cbd5e1';
      dropZone.style.borderRadius = '8px';
      dropZone.style.background = '#f8fafc';
      dropZone.style.display = 'flex';
      dropZone.style.alignItems = 'center';
      dropZone.style.justifyContent = 'center';
      dropZone.style.transition = 'all 0.2s';

      dropZone.addEventListener('dragover', handleDragOver);
      dropZone.addEventListener('dragenter', handleDragEnter);
      dropZone.addEventListener('dragleave', handleDragLeave);
      dropZone.addEventListener('drop', handleZoneDrop);

      // Definition text
      const defText = document.createElement('div');
      defText.style.flex = '1';
      defText.style.fontSize = '1.1rem';
      defText.style.color = '#334155';
      defText.style.display = 'flex';
      defText.style.alignItems = 'center';
      defText.innerHTML = item.definition;

      row.appendChild(dropZone);
      row.appendChild(defText);
      defContainer.appendChild(row);
    });
  }

  let dragSrcEl = null;

  function handleDragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('term', this.dataset.term);
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
    // Remove dashed styling from all dropzones
    document.querySelectorAll('.term-dropzone').forEach(dz => {
      dz.style.borderColor = '#cbd5e1';
      dz.style.background = '#f8fafc';
    });
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  function handleDragEnter(e) {
    if (this.classList.contains('term-dropzone') && !this.querySelector('.term-card')) {
      this.style.borderColor = '#8b5cf6';
      this.style.background = '#f5f3ff';
    }
  }

  function handleDragLeave(e) {
    if (this.classList.contains('term-dropzone')) {
      this.style.borderColor = '#cbd5e1';
      this.style.background = '#f8fafc';
    }
  }

  function handleZoneDrop(e) {
    e.stopPropagation();
    
    // If the dropzone already has a card, don't allow drop unless they are swapping
    if (this.querySelector('.term-card')) {
      // Swap the cards
      const existingCard = this.querySelector('.term-card');
      const sourceParent = dragSrcEl.parentNode;
      this.appendChild(dragSrcEl);
      sourceParent.appendChild(existingCard);
    } else {
      this.appendChild(dragSrcEl);
    }
    
    // Reset styling
    this.style.borderColor = '#cbd5e1';
    this.style.background = '#f8fafc';
    return false;
  }

  function handleBankDrop(e) {
    e.stopPropagation();
    if (dragSrcEl.parentNode !== wordBank) {
      wordBank.appendChild(dragSrcEl);
    }
    return false;
  }

  // Check answers
  btnCheck.addEventListener('click', () => {
    let correctCount = 0;
    const dropZones = container.querySelectorAll('.term-dropzone');
    let allFilled = true;

    dropZones.forEach(zone => {
      const card = zone.querySelector('.term-card');
      if (!card) {
        allFilled = false;
        return;
      }
      
      const isCorrect = card.dataset.term === zone.dataset.correctTerm;
      if (isCorrect) {
        correctCount++;
        card.style.borderColor = '#10b981';
        card.style.background = '#d1fae5';
        card.style.color = '#065f46';
        // Lock it
        card.draggable = false;
        card.style.cursor = 'default';
        zone.style.borderColor = '#10b981';
      } else {
        card.style.borderColor = '#ef4444';
        card.style.background = '#fee2e2';
        card.style.color = '#991b1b';
        // Pop it back to the bank after a short delay
        setTimeout(() => {
          card.style.borderColor = '#8b5cf6';
          card.style.background = '#ffffff';
          card.style.color = '#4c1d95';
          wordBank.appendChild(card);
        }, 800);
      }
    });

    if (correctCount === defsList.length) {
      feedback.style.color = '#10b981';
      feedback.innerHTML = '🎉 Perfect! You matched all the terms correctly! 🎉';
      
      // Trigger confetti if available
      if (window.confetti) {
        window.confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      }
    } else if (!allFilled) {
      feedback.style.color = '#f59e0b';
      feedback.innerHTML = 'Match all the remaining terms to check your score!';
    } else {
      feedback.style.color = '#ef4444';
      feedback.innerHTML = 'Some matches are incorrect. Try again!';
    }
  });

  // Reset
  btnReset.addEventListener('click', () => {
    if (currentTopic) loadTopic(currentTopic.id);
  });

  selectMenu.addEventListener('change', (e) => {
    loadTopic(e.target.value);
  });

  // Initialize first topic
  loadTopic(terminologyData[0].id);

  // Mobile layout adjustment
  if (window.innerWidth < 768) {
    const layout = container.querySelector('#match-layout');
    if (layout) {
      layout.style.gridTemplateColumns = '1fr';
    }
  }
}
