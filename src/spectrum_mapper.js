export function initSpectrumMapper(container, task) {
  let placedCount = 0;
  const totalItems = task.items.length;

  container.innerHTML = `
    <div style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); font-family: 'Inter', sans-serif;">
      <h3 style="color: #1e293b; margin-top: 0; font-size: 1.25rem;">${task.text || 'Map the items onto the spectrum'}</h3>
      <p style="color: #64748b; font-size: 0.95rem; margin-bottom: 20px;">Drag the historical realities from the bank and drop them onto the spectrum below to plan your argument.</p>
      
      <!-- Item Bank -->
      <div id="sm-item-bank" style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 30px; min-height: 80px; padding: 15px; background: #f8fafc; border-radius: 8px; border: 1px dashed #cbd5e1;">
        ${task.items.map(item => `
          <div class="sm-draggable" draggable="true" data-id="${item.id}" style="background: white; border: 2px solid #3b82f6; color: #1e3a8a; padding: 8px 12px; border-radius: 6px; cursor: grab; font-weight: bold; font-size: 0.9rem; box-shadow: 0 2px 4px rgba(59,130,246,0.1); max-width: 200px; text-align: center;">
            ${item.title}
            ${item.desc ? `<div style="font-size: 0.75rem; font-weight: normal; color: #64748b; margin-top: 4px;">${item.desc}</div>` : ''}
          </div>
        `).join('')}
      </div>

      <!-- Spectrum Area -->
      <div style="position: relative; margin-top: 40px; margin-bottom: 40px; padding: 20px 0;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-weight: bold; color: #475569;">
          <div style="color: #b45309;"><i class="fa-solid fa-backward-step"></i> ${task.labels && task.labels[0] ? task.labels[0] : 'Traditional'}</div>
          <div style="color: #047857;">${task.labels && task.labels[1] ? task.labels[1] : 'Modern'} <i class="fa-solid fa-forward-step"></i></div>
        </div>
        
        <!-- The Track -->
        <div id="sm-track" style="height: 12px; background: linear-gradient(90deg, #fef3c7 0%, #e2e8f0 50%, #d1fae5 100%); border-radius: 10px; position: relative; border: 1px solid #cbd5e1;">
          <!-- Dropzones overlaid on track -->
          <div style="display: flex; position: absolute; top: -40px; left: 0; width: 100%; height: 100px;">
            ${[0, 1, 2, 3, 4].map(zone => `
              <div class="sm-dropzone" data-zone="${zone}" style="flex: 1; border-right: 1px dashed rgba(203,213,225,0.4); display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding-top: 25px;"></div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Generate Button -->
      <div id="sm-generate-container" style="text-align: center; margin-top: 50px; display: none;">
        <button id="sm-generate-btn" style="background: #3b82f6; color: white; border: none; padding: 12px 25px; border-radius: 8px; font-size: 1.1rem; font-weight: bold; cursor: pointer; box-shadow: 0 4px 6px rgba(59,130,246,0.3); transition: all 0.2s;"><i class="fa-solid fa-wand-magic-sparkles"></i> Generate Essay Structure</button>
      </div>

      <!-- Result Scaffold -->
      <div id="sm-result" style="display: none; margin-top: 20px; padding: 20px; border-top: 2px dashed #e2e8f0;">
        ${task.model || ''}
      </div>
    </div>
  `;

  // Drag and drop logic
  const draggables = container.querySelectorAll('.sm-draggable');
  const dropzones = container.querySelectorAll('.sm-dropzone');
  const itemBank = container.querySelector('#sm-item-bank');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', (e) => {
      draggable.classList.add('dragging');
      draggable.style.opacity = '0.5';
      e.dataTransfer.setData('text/plain', draggable.dataset.id);
    });

    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
      draggable.style.opacity = '1';
    });
  });

  // Also make item bank a dropzone so items can be returned
  [...dropzones, itemBank].forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault(); // Allow drop
      zone.style.background = zone.id === 'sm-item-bank' ? '#f1f5f9' : 'rgba(241, 245, 249, 0.5)';
    });

    zone.addEventListener('dragleave', () => {
      zone.style.background = 'transparent';
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.style.background = 'transparent';
      const id = e.dataTransfer.getData('text/plain');
      const draggedElement = container.querySelector(`[data-id="${id}"]`);
      if (draggedElement) {
        zone.appendChild(draggedElement);
        // Adjust styling based on where it is
        if (zone.id === 'sm-item-bank') {
          draggedElement.style.transform = 'scale(1)';
          draggedElement.style.margin = '0';
        } else {
          draggedElement.style.transform = 'scale(0.85)';
          draggedElement.style.margin = '5px 0';
        }
        
        checkCompletion();
      }
    });
  });

  function checkCompletion() {
    const itemsInBank = itemBank.querySelectorAll('.sm-draggable').length;
    const generateContainer = container.querySelector('#sm-generate-container');
    if (itemsInBank === 0) {
      generateContainer.style.display = 'block';
    } else {
      generateContainer.style.display = 'none';
    }
  }

  container.querySelector('#sm-generate-btn').addEventListener('click', () => {
    const resultDiv = container.querySelector('#sm-result');
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}
