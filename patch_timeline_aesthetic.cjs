const fs = require('fs');
let code = fs.readFileSync('cme_new/src/timeline_task.js', 'utf8');

// 1. Change timeline-container style
code = code.replace(
  'id="timeline-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px; margin-bottom: 30px;"',
  'id="timeline-container" style="display: flex; flex-direction: column; align-items: center; gap: 0; margin-bottom: 30px; padding: 20px 0;"'
);

// 2. Change renderItems
const renderItemsStr = `
  function renderItems() {
    tContainer.innerHTML = '';
    
    activeItems.forEach((item, index) => {
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.flexDirection = 'column';
      wrapper.style.alignItems = 'center';
      wrapper.style.width = '100%';
      wrapper.style.maxWidth = '650px';

      const el = document.createElement('div');
      el.className = 'timeline-item';
      el.draggable = true;
      el.dataset.index = index;
      el.dataset.id = item.id;
      
      // Modern Domino Card Styling
      el.style.background = 'linear-gradient(to right, #ffffff, #f8fafc)';
      el.style.border = '1px solid #cbd5e1';
      el.style.borderRadius = '12px';
      el.style.fontSize = '1.15rem';
      el.style.color = '#1e293b';
      el.style.cursor = 'grab';
      el.style.display = 'flex';
      el.style.alignItems = 'stretch';
      el.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)';
      el.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
      el.style.width = '100%';
      el.style.overflow = 'hidden';
      
      el.innerHTML = \`
        <div style="background: #e2e8f0; color: #64748b; padding: 20px 15px; display: flex; align-items: center; justify-content: center; border-right: 1px solid #cbd5e1;">
          <i class="fa-solid fa-grip-vertical"></i>
        </div>
        <div style="padding: 20px; flex: 1; line-height: 1.5;">\${item.text}</div>
      \`;

      // Drag events
      el.addEventListener('dragstart', handleDragStart);
      el.addEventListener('dragover', handleDragOver);
      el.addEventListener('drop', handleDrop);
      el.addEventListener('dragenter', handleDragEnter);
      el.addEventListener('dragleave', handleDragLeave);
      el.addEventListener('dragend', handleDragEnd);
      
      // Hover effects
      el.addEventListener('mouseenter', () => {
        el.style.transform = 'translateY(-2px)';
        el.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)';
      });

      wrapper.appendChild(el);

      // Add connector arrow if not the last item
      if (index < activeItems.length - 1) {
        const arrow = document.createElement('div');
        arrow.style.color = '#cbd5e1';
        arrow.style.fontSize = '1.5rem';
        arrow.style.padding = '10px 0';
        arrow.innerHTML = '<i class="fa-solid fa-arrow-down"></i>';
        wrapper.appendChild(arrow);
      }

      tContainer.appendChild(wrapper);
    });
  }
`;

// Replace the existing renderItems function
const startIdx = code.indexOf('function renderItems() {');
const endIdx = code.indexOf('// Drag and Drop Logic');
if (startIdx !== -1 && endIdx !== -1) {
  code = code.substring(0, startIdx) + renderItemsStr + '\n  ' + code.substring(endIdx);
}

fs.writeFileSync('cme_new/src/timeline_task.js', code, 'utf8');
console.log('Successfully patched timeline_task.js');
