window.initUnit = function() {
  const pages = document.querySelectorAll('.page, .page-landscape');
  const tabs = document.querySelectorAll('#engine-tabs-container .tb-tab');

  // Tab mapping to page indices (0-indexed)
  const tabMappings = {
    cover: [0],       
    timeline: [1],       
    lesson1: [2],   
    lesson2: [3],  
    lesson3: [4], 
    lesson4: [5], 
    lesson5: [6], 
    assessment: [7]
  };

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

  window.readAloud = (elementId) => {
    const elem = document.getElementById(elementId);
    if (elem && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any current speech
      const text = elem.innerText || elem.textContent;
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Initialize on "Cover & Log" Tab
  selectTab('cover');
};
