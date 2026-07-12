import { unitData } from './data.js';
import { initializeApp } from '../src/core_app.js';
import { initTimelineTask } from './src/timeline_task.js';

initializeApp(unitData);

// Add custom Domino Flowcharts tab for this unit
setTimeout(() => {
  const sidebarNav = document.getElementById('sidebar-nav-container');
  if (sidebarNav) {
    const link = document.createElement('a');
    link.className = 'lesson-link';
    link.innerHTML = '<i class="fa-solid fa-hourglass-half" style="margin-right: 8px;"></i> Domino Flowcharts';
    link.href = '#';
    link.onclick = (e) => {
      e.preventDefault();
      // Deselect other tabs
      document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      const contentArea = document.getElementById('content-area');
      contentArea.innerHTML = ''; // Clear current content
      initTimelineTask(contentArea);
    };
    sidebarNav.appendChild(link);
  }
}, 500);
