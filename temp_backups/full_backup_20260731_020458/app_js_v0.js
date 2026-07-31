import { unitData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const contentArea = document.getElementById('content-area');
  const btnDyslexia = document.getElementById('btn-dyslexia');

  // Toggle Dyslexia Mode
  btnDyslexia.addEventListener('click', () => {
    document.body.classList.toggle('sen-mode');
    const isSen = document.body.classList.contains('sen-mode');
    btnDyslexia.innerHTML = isSen 
      ? '<i class="fa-solid fa-check"></i> Standard Mode' 
      : '<i class="fa-solid fa-glasses"></i> SEN / Dyslexia Mode';
  });

  // Render Sidebar
  function renderSidebar() {
    sidebar.innerHTML = '';
    unitData.lessons.forEach((lesson, index) => {
      const link = document.createElement('a');
      link.className = 'lesson-link';
      if (index === 0) link.classList.add('active');
      link.textContent = lesson.title;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.lesson-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        renderLesson(lesson);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      sidebar.appendChild(link);
    });
  }

  // Render Lesson Content
  function renderLesson(lesson) {
    let html = `<div class="lesson-content">
      <h2>${lesson.title}</h2>
    `;

    // Narrative
    if (lesson.narrative && lesson.narrative.length > 0) {
      lesson.narrative.forEach(para => {
        if(para.startsWith('"')) {
           html += `<div class="task-item"><i class="fa-solid fa-clipboard-question"></i> ${para.replace(/"/g, '')}</div>`;
        } else {
           html += `<p class="narrative-block">${para}</p>`;
        }
      });
    }

    // Sources
    if (lesson.sources && lesson.sources.length > 0) {
      html += `<div class="sources-grid">`;
      lesson.sources.forEach(source => {
        if(source.src) {
           // Fix relative paths for v2 folder
           let src = source.src.startsWith('../') ? source.src : `../great_war/${source.src}`;
           html += `
             <div class="source-card">
               ${source.title ? `<h4>${source.title}</h4>` : ''}
               <img src="${src}" alt="Source Image">
               ${source.caption ? `<p class="source-caption">${source.caption}</p>` : ''}
             </div>
           `;
        }
      });
      html += `</div>`;
    }

    // Tasks
    if (lesson.tasks && lesson.tasks.length > 0) {
      html += `<div class="tasks-section">
        <h3><i class="fa-solid fa-pen-to-square"></i> Knowledge Check Tasks</h3>
      `;
      lesson.tasks.forEach(task => {
        html += `<div class="task-item">${task.text}</div>`;
      });
      html += `</div>`;
    }

    // Extended Reading
    if (lesson.extended && lesson.extended.paragraphs) {
      html += `
        <div class="extended-reading">
          <h3><i class="fa-solid fa-graduation-cap"></i> ${lesson.extended.title}</h3>
      `;
      lesson.extended.paragraphs.forEach(para => {
        html += `<p class="narrative-block">${para}</p>`;
      });
      html += `</div>`;
    }

    html += `</div>`;
    contentArea.innerHTML = html;
  }

  // Initialize
  if (unitData.lessons.length > 0) {
    renderSidebar();
    renderLesson(unitData.lessons[0]);
  } else {
    contentArea.innerHTML = "<h2>No lessons found in data.js</h2>";
  }
});
