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

  // Remove sidebar completely
  if (sidebar) sidebar.style.display = 'none';

  function renderLesson(lesson) {
    let html = `<div class="lesson-content">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
        <h2>${lesson.title}</h2>
        <button class="btn btn-secondary" onclick="window.location.href='../index.html'"><i class="fa-solid fa-house"></i> Back to Dashboard</button>
      </div>
    `;

    // Primary Source
    if (lesson.primary_source) {
      let src = lesson.primary_source.src.startsWith('../') ? lesson.primary_source.src : `../great_war/${lesson.primary_source.src}`;
      html += `
        <div class="primary-source-card">
          ${lesson.primary_source.question ? `<h3 style="color:#1a237e; margin-bottom:10px;"><i class="fa-solid fa-magnifying-glass"></i> ${lesson.primary_source.question}</h3>` : ''}
          ${lesson.primary_source.title ? `<h4>${lesson.primary_source.title}</h4>` : ''}
          <img src="${src}" alt="Primary Source">
          ${lesson.primary_source.caption ? `<p class="source-caption">${lesson.primary_source.caption}</p>` : ''}
        </div>
      `;
    }

    // Do Now
    if (lesson.do_now) {
      if (lesson.do_now.type === "timeline") {
        html += `<div class="tasks-section do-now-section">
          <h3><i class="fa-solid fa-clock-rotate-left"></i> Chronological Big Picture</h3>
          <div class="timeline-container">`;
        lesson.do_now.events.forEach(ev => {
          let src = ev.img.startsWith('../') ? ev.img : `../great_war/${ev.img}`;
          html += `
            <div class="timeline-event">
              <img src="${src}" alt="${ev.title}">
              <div class="timeline-info">
                <strong>${ev.year}</strong><br>${ev.title}<br><em>${ev.detail}</em>
              </div>
            </div>`;
        });
        html += `</div>
          ${lesson.do_now.prediction_question ? `<div style="margin-top:15px; padding:10px; background:#fff; border-left:4px solid #1a237e;"><strong>${lesson.do_now.prediction_question}</strong></div>` : ''}
        </div>`;
      } else if (lesson.do_now.type === "questions") {
        html += `<div class="tasks-section do-now-section">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1rem;">
            <h3><i class="fa-solid fa-brain"></i> Do Now Activity</h3>
            <button class="btn btn-reveal" onclick="document.querySelectorAll('.do-now-answer').forEach(el => el.style.opacity = '1')">
              <i class="fa-solid fa-eye"></i> Reveal Answers
            </button>
          </div>
        `;
        lesson.do_now.items.forEach((item, idx) => {
          html += `
            <div class="do-now-item">
              <strong>${item.question}</strong>
              <div class="do-now-answer" style="opacity: 0; transition: opacity 0.3s; color: #d32f2f; margin-top: 5px; font-weight: 500;">
                <i class="fa-solid fa-arrow-turn-up fa-rotate-90"></i> ${item.answer}
              </div>
            </div>
          `;
        });
        html += `</div>`;
      }
    }

    // Narrative
    if (lesson.narrative && lesson.narrative.length > 0) {
      lesson.narrative.forEach(para => {
        if(para.startsWith('"')) {
           html += `<div class="narrative-quote"><i class="fa-solid fa-quote-left"></i> ${para.replace(/"/g, '')}</div>`;
        } else {
           html += `<p class="narrative-block">${para}</p>`;
        }
      });
    }

    // Sources (remaining)
    if (lesson.sources && lesson.sources.length > 0) {
      html += `<div class="sources-grid">`;
      lesson.sources.forEach(source => {
        if(source.src) {
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

    // Tasks (Knowledge Check)
    if (lesson.tasks && lesson.tasks.length > 0) {
      html += `<div class="tasks-section">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1rem;">
          <h3><i class="fa-solid fa-pen-to-square"></i> Knowledge Check Tasks</h3>
          <button class="btn btn-scaffold" onclick="document.querySelectorAll('.scaffold-box.model').forEach(el => el.style.display = 'block')">
            <i class="fa-solid fa-check-double"></i> Reveal Model Answers
          </button>
        </div>
      `;
      lesson.tasks.forEach((task, tIdx) => {
        html += `<div class="task-item">
          <div class="task-text">${task.text}</div>
          <div id="scaffold-model-${tIdx}" class="scaffold-box model" style="display:none; margin-top:10px;">
            <i class="fa-solid fa-star"></i> <strong>Model Answer:</strong> ${task.model}
          </div>
        </div>`;
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
    renderLesson(unitData.lessons[0]);
  }
});
