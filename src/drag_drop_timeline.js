export function initDragDropTimeline(container, taskData) {
  // taskData.items is assumed to be in the correct chronological order
  const originalItems = taskData.items;
  let shuffledItems = [...originalItems].sort(() => Math.random() - 0.5);

  container.innerHTML = `
    <div style="background: #ffffff; padding: 25px; border-radius: 12px; border: 2px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-bottom: 20px;">
      <h3 style="margin-top: 0; color: var(--navy);"><i class="fa-solid fa-timeline"></i> ${taskData.title}</h3>
      <p style="color: #475569; font-size: 1.05rem;">${taskData.instruction}</p>
      
      <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 20px;">
        
        <!-- Dropzones -->
        <div style="flex: 1; min-width: 300px; display: flex; flex-direction: column; gap: 10px;" id="timeline-dropzones">
          ${originalItems.map((_, i) => `
            <div style="display: flex; align-items: center; gap: 15px;">
              <div style="font-weight: bold; color: #64748b; font-size: 1.2rem; width: 30px; text-align: center;">${i + 1}</div>
              <div class="dd-dropzone" data-index="${i}" style="flex: 1; background: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 8px; min-height: 60px; padding: 10px; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
                <span style="color: #94a3b8; font-style: italic;">Drop event here</span>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Draggables Bank -->
        <div style="flex: 1; min-width: 300px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;" id="timeline-bank">
          <h4 style="margin-top: 0; text-align: center; color: #334155;">Events Bank</h4>
          <div style="display: flex; flex-direction: column; gap: 10px;" id="timeline-draggable-container">
            ${shuffledItems.map(item => `
              <div class="dd-draggable" draggable="true" data-id="${item.id}" style="background: white; border: 2px solid #3b82f6; border-radius: 6px; padding: 12px; cursor: grab; font-weight: 500; color: #1e293b; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <i class="fa-solid fa-grip-vertical" style="color: #94a3b8; margin-right: 8px;"></i> ${item.text}
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div style="text-align: center; margin-top: 25px;">
        <button id="btn-check-timeline" class="btn btn-primary" style="padding: 12px 24px; font-size: 1.1rem; border-radius: 8px; background: #10b981; border: none;"><i class="fa-solid fa-check"></i> Check Timeline</button>
        <button id="btn-reset-timeline" class="btn btn-secondary" style="padding: 12px 24px; font-size: 1.1rem; border-radius: 8px; margin-left: 10px;"><i class="fa-solid fa-rotate-left"></i> Reset</button>
      </div>
      
      <div id="timeline-feedback" style="margin-top: 20px; text-align: center; font-size: 1.2rem; font-weight: bold; min-height: 30px;"></div>
    </div>
  `;

  // Drag and Drop Logic
  let draggedEl = null;

  const draggables = container.querySelectorAll('.dd-draggable');
  const dropzones = container.querySelectorAll('.dd-dropzone');
  const bank = container.querySelector('#timeline-draggable-container');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', (e) => {
      draggedEl = draggable;
      draggable.style.opacity = '0.5';
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', draggable.dataset.id);
    });

    draggable.addEventListener('dragend', () => {
      draggable.style.opacity = '1';
      draggedEl = null;
    });
  });

  dropzones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      zone.style.borderColor = '#3b82f6';
      zone.style.background = '#eff6ff';
    });

    zone.addEventListener('dragleave', () => {
      zone.style.borderColor = '#cbd5e1';
      zone.style.background = '#f1f5f9';
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.style.borderColor = '#cbd5e1';
      zone.style.background = '#f1f5f9';
      
      if (draggedEl) {
        // If there's already an item in the dropzone, move it back to bank
        const existing = zone.querySelector('.dd-draggable');
        if (existing) {
          bank.appendChild(existing);
        }
        
        zone.innerHTML = '';
        zone.appendChild(draggedEl);
      }
    });
  });

  // Allow dropping back into the bank
  bank.addEventListener('dragover', (e) => {
    e.preventDefault();
  });
  bank.addEventListener('drop', (e) => {
    e.preventDefault();
    if (draggedEl) {
      bank.appendChild(draggedEl);
    }
  });

  // Check logic
  const checkBtn = container.querySelector('#btn-check-timeline');
  const resetBtn = container.querySelector('#btn-reset-timeline');
  const feedback = container.querySelector('#timeline-feedback');

  checkBtn.addEventListener('click', () => {
    let allCorrect = true;
    let allFilled = true;

    dropzones.forEach((zone, index) => {
      const item = zone.querySelector('.dd-draggable');
      if (!item) {
        allFilled = false;
        allCorrect = false;
        zone.style.borderColor = '#ef4444';
      } else {
        const expectedId = originalItems[index].id;
        if (item.dataset.id === expectedId) {
          zone.style.borderColor = '#22c55e';
          zone.style.background = '#f0fdf4';
        } else {
          allCorrect = false;
          zone.style.borderColor = '#ef4444';
          zone.style.background = '#fef2f2';
        }
      }
    });

    if (allCorrect) {
      feedback.style.color = '#10b981';
      feedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Excellent! Chronological order is correct. ${taskData.secret_code ? 'Secret Code: <span style="background: #fbbf24; padding: 4px 8px; border-radius: 4px; color: #78350f;">' + taskData.secret_code + '</span>' : ''}`;
    } else if (!allFilled) {
      feedback.style.color = '#f59e0b';
      feedback.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Please place an event in every slot.`;
    } else {
      feedback.style.color = '#ef4444';
      feedback.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Some events are out of order. Try again!`;
    }
  });

  resetBtn.addEventListener('click', () => {
    dropzones.forEach(zone => {
      zone.innerHTML = '<span style="color: #94a3b8; font-style: italic;">Drop event here</span>';
      zone.style.borderColor = '#cbd5e1';
      zone.style.background = '#f1f5f9';
    });
    
    // Reshuffle bank
    shuffledItems = [...originalItems].sort(() => Math.random() - 0.5);
    bank.innerHTML = shuffledItems.map(item => `
      <div class="dd-draggable" draggable="true" data-id="${item.id}" style="background: white; border: 2px solid #3b82f6; border-radius: 6px; padding: 12px; cursor: grab; font-weight: 500; color: #1e293b; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
        <i class="fa-solid fa-grip-vertical" style="color: #94a3b8; margin-right: 8px;"></i> ${item.text}
      </div>
    `).join('');

    // Reattach drag events to new bank items
    container.querySelectorAll('.dd-draggable').forEach(draggable => {
      draggable.addEventListener('dragstart', (e) => {
        draggedEl = draggable;
        draggable.style.opacity = '0.5';
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', draggable.dataset.id);
      });
      draggable.addEventListener('dragend', () => {
        draggable.style.opacity = '1';
        draggedEl = null;
      });
    });

    feedback.innerHTML = '';
  });
}
