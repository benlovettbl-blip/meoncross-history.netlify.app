export function initTimelineTask(container, timelineData) {
  // Build the UI wrapper
  container.innerHTML = `
    <div style="max-width: 900px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border: 4px solid #3b82f6;">
      <div style="text-align: center; margin-bottom: 25px;">
        <h1 style="font-family: 'Playfair Display', serif; font-size: 3rem; color: #1e3a8a; margin-top: 0; margin-bottom: 10px;"><i class="fa-solid fa-hourglass-half"></i> Domino Flowcharts</h1>
        <p style="font-size: 1.2rem; color: #475569;">Select a topic and drag the events into the correct chronological sequence to build your flowchart!</p>
      </div>

      <div style="margin-bottom: 30px; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; align-items: flex-end; gap: 15px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 250px;">
          <label style="display: block; font-weight: 700; margin-bottom: 10px; color: #334155; font-size: 1.1rem;"><i class="fa-solid fa-list-ul"></i> Select Timeline:</label>
          <select id="timeline-select" class="epz-select" style="width: 100%; padding: 14px; border-radius: 10px; border: 2px solid #cbd5e1; font-size: 1.15rem; background: #ffffff; color: #1e293b; cursor: pointer;">
            <optgroup label="Lesson Overviews">
              ${timelineData.filter(t => t.id.startsWith('lesson')).map(t => `<option value="${t.id}">${t.title}</option>`).join('')}
            </optgroup>
            <optgroup label="Specific Wars (Deep Dive)">
              ${timelineData.filter(t => t.id.startsWith('war')).map(t => `<option value="${t.id}">⚔️ ${t.title}</option>`).join('')}
            </optgroup>
          </select>
        </div>
        <button id="btn-focus" class="main-btn" style="background: #1e3a8a; color: white; padding: 14px 20px; height: 55px; border-radius: 10px; font-weight: 600; display: flex; align-items: center; gap: 8px; border: none; cursor: pointer; white-space: nowrap;">
          <i class="fa-solid fa-expand"></i> Focus Mode
        </button>
      </div>

      <div id="timeline-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px; margin-bottom: 30px;">
        <!-- Draggable items go here -->
      </div>

      <div style="text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px;">
        <div id="timeline-feedback" style="font-size: 1.4rem; font-weight: bold; min-height: 30px;"></div>
        <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
          <button id="btn-check" class="main-btn epz-btn" style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 14px 28px; font-size: 1.2rem; border: none; border-radius: 10px; font-weight: 600;"><i class="fa-solid fa-check-double"></i> Check Sequence</button>
          <button id="btn-reset" class="main-btn epz-btn" style="background: #f1f5f9; color: #475569; padding: 14px 28px; font-size: 1.2rem; border: 1px solid #cbd5e1; border-radius: 10px; font-weight: 600;"><i class="fa-solid fa-arrow-rotate-left"></i> Reset Shuffled</button>
        </div>
      </div>
    </div>
  `;

  // Logic
  const selectMenu = container.querySelector('#timeline-select');
  const tContainer = container.querySelector('#timeline-container');
  const btnCheck = container.querySelector('#btn-check');
  const btnReset = container.querySelector('#btn-reset');
  const feedback = container.querySelector('#timeline-feedback');
  const btnFocus = container.querySelector('#btn-focus');

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

  let currentTimeline = null;
  let activeItems = []; // Array of objects {id, text}

  // Shuffle helper
  function shuffleArray(array) {
    let newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  function loadTimeline(id) {
    currentTimeline = timelineData.find(t => t.id === id);
    if (!currentTimeline) return;
    
    // Shuffle the events initially
    activeItems = shuffleArray(currentTimeline.events);
    
    feedback.innerHTML = '';
    renderItems();
  }

  function renderItems() {
    tContainer.innerHTML = '';
    
    activeItems.forEach((item, index) => {
      const el = document.createElement('div');
      el.className = 'timeline-item';
      el.draggable = true;
      el.dataset.index = index;
      el.dataset.id = item.id;
      
      // Styling
      el.style.background = '#ffffff';
      el.style.border = '2px solid #cbd5e1';
      el.style.borderRadius = '10px';
      el.style.padding = '20px';
      el.style.fontSize = '1.15rem';
      el.style.color = '#1e293b';
      el.style.cursor = 'grab';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.gap = '15px';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
      el.style.transition = 'all 0.2s';
      
      el.innerHTML = `
        <div style="color: #94a3b8; font-size: 1.5rem;"><i class="fa-solid fa-grip-lines"></i></div>
        <div style="flex: 1;">${item.text}</div>
      `;

      // Drag events
      el.addEventListener('dragstart', handleDragStart);
      el.addEventListener('dragover', handleDragOver);
      el.addEventListener('drop', handleDrop);
      el.addEventListener('dragenter', handleDragEnter);
      el.addEventListener('dragleave', handleDragLeave);
      el.addEventListener('dragend', handleDragEnd);

      tContainer.appendChild(el);
    });
  }

  // Drag and Drop Logic
  let dragSrcEl = null;

  function handleDragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    e.dataTransfer.setData('sourceIndex', this.dataset.index);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }
    e.dataTransfer.dropEffect = 'move';  
    return false;
  }

  function handleDragEnter(e) {
    this.style.borderStyle = 'dashed';
    this.style.borderColor = '#3b82f6';
    this.style.background = '#eff6ff';
  }

  function handleDragLeave(e) {
    this.style.borderStyle = 'solid';
    this.style.borderColor = '#cbd5e1';
    this.style.background = '#ffffff';
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); 
    }
    
    const sourceIndex = parseInt(e.dataTransfer.getData('sourceIndex'));
    const targetIndex = parseInt(this.dataset.index);

    if (sourceIndex !== targetIndex) {
      // Reorder the array
      const itemToMove = activeItems[sourceIndex];
      activeItems.splice(sourceIndex, 1);
      activeItems.splice(targetIndex, 0, itemToMove);
      
      // Re-render
      feedback.innerHTML = ''; // clear feedback on move
      renderItems();
    }
    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
    const items = tContainer.querySelectorAll('.timeline-item');
    items.forEach(item => {
      item.style.borderStyle = 'solid';
      item.style.borderColor = '#cbd5e1';
      item.style.background = '#ffffff';
    });
  }

  function checkSequence() {
    if (!currentTimeline) return;
    
    let correctCount = 0;
    const items = tContainer.querySelectorAll('.timeline-item');
    
    // The original currentTimeline.events is already in perfect chronological order.
    // So activeItems[i].id should equal currentTimeline.events[i].id
    
    items.forEach((itemNode, index) => {
      const currentItemId = activeItems[index].id;
      const expectedId = currentTimeline.events[index].id;
      
      if (currentItemId === expectedId) {
        itemNode.style.borderColor = '#10b981';
        itemNode.style.background = '#ecfdf5';
        correctCount++;
      } else {
        itemNode.style.borderColor = '#ef4444';
        itemNode.style.background = '#fef2f2';
      }
    });

    if (correctCount === activeItems.length) {
      feedback.style.color = '#10b981';
      feedback.innerHTML = '<i class="fa-solid fa-trophy"></i> Perfect Sequence! Outstanding Historical Knowledge!';
    } else {
      feedback.style.color = '#ef4444';
      
      // Generate a smart hint by finding two adjacent items that are chronologically reversed
      let hintHTML = '';
      for (let i = 0; i < activeItems.length - 1; i++) {
        const trueIndexA = currentTimeline.events.findIndex(e => e.id === activeItems[i].id);
        const trueIndexB = currentTimeline.events.findIndex(e => e.id === activeItems[i+1].id);
        
        if (trueIndexA > trueIndexB) {
          // Inversion found! A happened AFTER B, but the user placed A BEFORE B.
          const textA = activeItems[i].text.substring(0, 45).trim() + "...";
          const textB = activeItems[i+1].text.substring(0, 45).trim() + "...";
          
          hintHTML = `<div style="font-size: 1.1rem; color: #b91c1c; margin-top: 15px; background: #fee2e2; padding: 12px 18px; border-radius: 8px; border: 1px solid #fca5a5;">
            <strong><i class="fa-solid fa-lightbulb"></i> Hint:</strong> Look closely at your sequence. Did <em>"${textA}"</em> really happen <strong>before</strong> <em>"${textB}"</em>?
          </div>`;
          break; // Only show one hint at a time
        }
      }
      
      feedback.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Not quite! ${correctCount} out of ${activeItems.length} are in the exact correct position. ${hintHTML}`;
    }
  }

  // Bindings
  selectMenu.addEventListener('change', (e) => {
    loadTimeline(e.target.value);
  });

  btnCheck.addEventListener('click', checkSequence);
  
  btnReset.addEventListener('click', () => {
    loadTimeline(selectMenu.value);
  });

  // Init first load
  loadTimeline(selectMenu.value);
}
