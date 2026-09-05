import { appStore } from './store.js';
import { renderLesson } from './lesson_renderer.js';
import { getAssetUrl } from './assets.js';

let glossaryPopover = null;
let activeVocabElement = null;

export function openCurriculumModal() {
  let modal = document.getElementById('curriculum-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'curriculum-modal';
    modal.style.cssText =
      'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center;';

    const content = document.createElement('div');
    content.style.cssText =
      'background:#ffffff;padding:30px;border-radius:12px;width:90%;max-width:500px;color:#333333;box-shadow:0 10px 25px rgba(0,0,0,0.2);';

    content.innerHTML = `
        <h2 style="margin-top:0"><i class="fa-solid fa-clock-rotate-left"></i> Prior Knowledge Setup</h2>
        <p style="opacity:0.8;font-size:0.95rem;">Select the units your class has already been taught. The app will dynamically generate "PAST TOPIC" Do Now retrieval questions from these units.</p>
        <div id="unit-checkboxes" style="display:flex;flex-direction:column;gap:12px;margin:25px 0;">
        </div>
        <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:20px;">
          <button id="close-curriculum" class="btn-pedagogy-primary">Save & Close</button>
        </div>
      `;
    modal.appendChild(content);
    document.body.appendChild(modal);

    const availableUnits = [
      { id: 'norman_conquest', title: 'The Norman Conquest' },
      { id: 'water_and_sanitation', title: 'Water & Health Through Time' },
      { id: 'change_1450_1750', title: 'Change 1450-1750 (Tudors)' },
    ];

    const container = content.querySelector('#unit-checkboxes');
    const taught = JSON.parse(localStorage.getItem('taughtUnits') || '[]');

    availableUnits.forEach((u) => {
      const label = document.createElement('label');
      label.style.display = 'flex';
      label.style.alignItems = 'center';
      label.style.gap = '10px';
      label.style.cursor = 'pointer';
      label.style.fontSize = '1.1rem';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = u.id;
      checkbox.style.width = '20px';
      checkbox.style.height = '20px';
      checkbox.checked = taught.includes(u.id);
      checkbox.addEventListener('change', () => {
        let current = JSON.parse(localStorage.getItem('taughtUnits') || '[]');
        if (checkbox.checked) current.push(u.id);
        else current = current.filter((id) => id !== u.id);
        localStorage.setItem('taughtUnits', JSON.stringify([...new Set(current)]));
      });
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(u.title));
      container.appendChild(label);
    });

    content.querySelector('#close-curriculum').addEventListener('click', () => {
      document.body.removeChild(modal);
      // Refresh page to apply new Do Nows if we are currently looking at one
      location.reload();
    });
  }
}

export function openTaskWhiteboard() {
  const modal = document.getElementById('task-whiteboard-modal');
  if (!modal) return;

  const container = document.getElementById('whiteboard-questions-container');
  container.innerHTML = '';

  const activeLesson = window.currentActiveLesson || appStore.state.activeUnitData.lessons[0];

  assignQuestionNumbers(activeLesson);

  let html = '';

  const addQuestionCard = (qNum, questionText, answerText) => {
    const finalAnswer = window.formatBold(answerText) || 'Model answer to be discussed in class.';
    const prefix =
      qNum && qNum !== '-' && qNum !== 'Do Now'
        ? `Q${qNum}. `
        : qNum === 'Do Now'
          ? '<strong>[Do Now]</strong> '
          : '';
    html += `
        <div class="wb-question-card" style="cursor:pointer;" data-action="toggle-wb-answer" title="Click to reveal answer">
          <div style="font-weight: bold;">${prefix}${questionText}</div>
          <div class="wb-answer">${finalAnswer}</div>
        </div>
      `;
  };

  if (activeLesson.do_now) {
    if (activeLesson.do_now.type === 'timeline' && activeLesson.do_now.prediction_question) {
      addQuestionCard(
        'Do Now',
        activeLesson.do_now.prediction_question,
        activeLesson.do_now.model || activeLesson.do_now.answer || '',
      );
    } else if (activeLesson.do_now.type === 'questions') {
      activeLesson.do_now.items.forEach((item) => {
        addQuestionCard('Do Now', item.question, item.answer || '');
      });
    }
  }

  if (activeLesson.primary_source && activeLesson.primary_source.question) {
    addQuestionCard(
      activeLesson.primary_source.qNum,
      activeLesson.primary_source.question,
      activeLesson.primary_source.model_answer || '',
    );
  }

  if (activeLesson.sources) {
    activeLesson.sources.forEach((source) => {
      if (source.question) addQuestionCard(source.qNum, source.question, source.model_answer || '');
    });
  }

  if (activeLesson.tasks) {
    activeLesson.tasks.forEach((task) => {
      addQuestionCard(
        task.qNum,
        task.text || task.question || '',
        task.model || task.model_answer || '',
      );
    });
  }

  if (activeLesson.historians_corner && activeLesson.historians_corner.stretch_question) {
    addQuestionCard(
      activeLesson.historians_corner.qNum,
      activeLesson.historians_corner.stretch_question,
      activeLesson.historians_corner.model_answer || '',
    );
  }

  if (activeLesson.narrative_blocks) {
    activeLesson.narrative_blocks.forEach((block) => {
      if (block.source && block.source.question) {
        addQuestionCard(block.source.qNum, block.source.question, block.source.model_answer || '');
      }
      if (block.tasks) {
        block.tasks.forEach((task) => {
          if (task.type !== 'vocab_match') {
            addQuestionCard(
              task.qNum,
              task.text || task.question || '',
              task.model || task.model_answer || '',
            );
          }
        });
      }
      if (block.hinge_question) {
        addQuestionCard(
          block.hinge_question.qNum,
          block.hinge_question.question || block.hinge_question,
          block.hinge_question.model_answer || '',
        );
      }
    });
  }

  if (activeLesson.extended && activeLesson.extended.question) {
    addQuestionCard(
      activeLesson.extended.qNum,
      activeLesson.extended.question,
      activeLesson.extended.model_answer || '',
    );
  }

  if (
    activeLesson.gcse_task &&
    (activeLesson.gcse_task.question || activeLesson.gcse_task.prompt)
  ) {
    addQuestionCard(
      activeLesson.gcse_task.qNum,
      activeLesson.gcse_task.question || activeLesson.gcse_task.prompt,
      activeLesson.gcse_task.model_answer || '',
    );
  }

  if (activeLesson.pair_share && activeLesson.pair_share.prompt) {
    addQuestionCard(
      activeLesson.pair_share.qNum,
      activeLesson.pair_share.prompt,
      'Discuss in pairs.',
    );
  }

  if (activeLesson.debate_prep) {
    addQuestionCard(
      '-',
      `Debate Prep: ${activeLesson.debate_prep.question}`,
      `<strong>Agree:</strong><ul>${activeLesson.debate_prep.arguments_for.map((a) => `<li>${a}</li>`).join('')}</ul><strong>Disagree:</strong><ul>${activeLesson.debate_prep.arguments_against.map((a) => `<li>${a}</li>`).join('')}</ul>`,
    );
  }

  container.innerHTML = html;
  modal.classList.add('visible');
}

export function initGlossaryPopover() {
  if (!document.getElementById('global-glossary-popover')) {
    glossaryPopover = document.createElement('div');
    glossaryPopover.id = 'global-glossary-popover';
    document.body.appendChild(glossaryPopover);
  } else {
    glossaryPopover = document.getElementById('global-glossary-popover');
  }

  const showPopover = (e) => {
    const target = e.target.closest('.vocab-word');
    if (!target) return;

    const definition = target.getAttribute('data-definition');
    if (!definition) return;

    activeVocabElement = target;
    target.classList.add('active');
    glossaryPopover.innerHTML = `<strong style="color: #60a5fa; display: block; margin-bottom: 4px;">${target.textContent}</strong>${definition}`;
    glossaryPopover.classList.add('visible');

    // Calculate position
    const rect = target.getBoundingClientRect();
    const popoverRect = glossaryPopover.getBoundingClientRect();

    let top = rect.top - popoverRect.height - 10;
    let left = rect.left + rect.width / 2 - popoverRect.width / 2;

    // Boundary detection
    let arrowLeft = '50%';
    glossaryPopover.classList.remove('arrow-top');

    // Top boundary
    if (top < 10) {
      top = rect.bottom + 10;
      glossaryPopover.classList.add('arrow-top');
    }

    // Left boundary
    if (left < 10) {
      const overflow = 10 - left;
      left = 10;
      arrowLeft = `calc(50% - ${overflow}px)`;
    }
    // Right boundary
    else if (left + popoverRect.width > window.innerWidth - 10) {
      const overflow = left + popoverRect.width - (window.innerWidth - 10);
      left = window.innerWidth - 10 - popoverRect.width;
      arrowLeft = `calc(50% + ${overflow}px)`;
    }

    glossaryPopover.style.top = `${top}px`;
    glossaryPopover.style.left = `${left}px`;

    let arrowStyle = document.getElementById('popover-arrow-style');
    if (!arrowStyle) {
      arrowStyle = document.createElement('style');
      arrowStyle.id = 'popover-arrow-style';
      document.head.appendChild(arrowStyle);
    }
    arrowStyle.innerHTML = `#global-glossary-popover::after { left: ${arrowLeft}; }`;
  };

  const hidePopover = (e) => {
    if (glossaryPopover && glossaryPopover.classList.contains('visible')) {
      glossaryPopover.classList.remove('visible');
      if (activeVocabElement) {
        activeVocabElement.classList.remove('active');
        activeVocabElement = null;
      }
    }
  };

  document.body.addEventListener('mouseover', showPopover);
  document.body.addEventListener('mouseout', (e) => {
    if (e.target.closest('.vocab-word')) hidePopover(e);
  });

  document.body.addEventListener('click', (e) => {
    if (e.target.closest('.vocab-word')) {
      if (activeVocabElement === e.target.closest('.vocab-word')) {
        hidePopover(e);
      } else {
        hidePopover(e);
        showPopover(e);
      }
    } else {
      hidePopover(e);
    }
  });

  window.addEventListener('scroll', hidePopover, { passive: true });
  window.addEventListener('resize', hidePopover, { passive: true });
}

window.openKeyInfoModal = function () {
  const info = window.currentUnitData && window.currentUnitData.key_info;
  if (!info) return;
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.style.display = 'flex';
  overlay.innerHTML = `
    <div class="modal-content" style="max-width: 500px; padding: 30px; border-radius: 12px; font-family: 'Outfit', sans-serif;">
      <h3 style="margin-top:0; color: #1e293b; font-size: 1.5rem; margin-bottom: 20px;"><i class="fa-solid fa-circle-info" style="color:#ef4444; margin-right:10px;"></i> Key Trip Information</h3>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
        <h4 style="margin: 0 0 5px 0; color: #334155; font-size: 1rem;"><i class="fa-solid fa-phone" style="width:20px; color:#64748b;"></i> Emergency Contact</h4>
        <p style="margin: 0; color: #0f172a; font-weight: 600;">${info.emergency_contact}</p>
      </div>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
        <h4 style="margin: 0 0 5px 0; color: #334155; font-size: 1rem;"><i class="fa-solid fa-hotel" style="width:20px; color:#64748b;"></i> Accommodation</h4>
        <p style="margin: 0; color: #0f172a; font-weight: 600;">${info.hotel}</p>
      </div>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 25px;">
        <h4 style="margin: 0 0 5px 0; color: #334155; font-size: 1rem;"><i class="fa-solid fa-bus" style="width:20px; color:#64748b;"></i> Transport Provider</h4>
        <p style="margin: 0; color: #0f172a; font-weight: 600;">${info.coach}</p>
      </div>
      <div style="text-align: right;">
        <button class="btn btn-secondary" data-action="close-modal">Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
};

window.openTourGuideModal = function (lessonIndex) {
  const lesson = window.currentUnitData.lessons[lessonIndex];
  if (!lesson || !lesson.tour_guide_script) return;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay no-print';
  overlay.style.cssText =
    'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(10px); justify-content: center; align-items: center; z-index: 2000; display: flex;';
  overlay.onclick = function (e) {
    if (e.target === overlay) overlay.remove();
  };

  let blocksHtml = lesson.tour_guide_script
    .map(
      (block) => `
      <div style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0;">
        <h4 style="color: #1e293b; font-size: 1.25rem; margin-bottom: 15px; border-left: 4px solid #6366f1; padding-left: 12px;">${block.theme_heading}</h4>
        <div style="font-size: 1.1rem; line-height: 1.6; color: #334155;">${block.text}</div>
      </div>
    `,
    )
    .join('');

  overlay.innerHTML = `
      <div class="modal-content" style="background: white; max-width: 800px; width: 90%; max-height: 90vh; overflow-y: auto; padding: 40px; border-radius: 12px; font-family: 'Outfit', sans-serif;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 2px solid #6366f1; padding-bottom: 15px;">
          <h3 style="margin: 0; color: #1e293b; font-size: 1.8rem;"><i class="fa-solid fa-bullhorn" style="color:#6366f1; margin-right:12px;"></i> Tour Guide Script</h3>
          <button class="btn btn-secondary" data-action="close-modal"><i class="fa-solid fa-times"></i> Close</button>
        </div>
        ${blocksHtml}
        <div style="text-align: right; margin-top: 20px;">
          <button class="btn btn-secondary" data-action="close-modal">Close Script</button>
        </div>
      </div>
    `;
  document.body.appendChild(overlay);
};
window.openAnthologyModal = async function () {
  let dossiers =
    window.currentUnitData?.poetry_dossiers ||
    (window.appStore &&
      window.appStore.state &&
      window.appStore.state.activeUnitData?.poetry_dossiers);

  if (!dossiers) {
    try {
      const mod = await import('../../units/trip_ypres/poetry_data.js');
      dossiers = mod.poetryDossiers;
    } catch (e) {
      console.warn('Failed to load poetry dossiers dynamically:', e);
    }
  }

  if (!dossiers) return;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay no-print';
  overlay.style.cssText =
    'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(10px); justify-content: center; align-items: center; z-index: 2000; display: flex;';
  overlay.onclick = function (e) {
    if (e.target === overlay) overlay.remove();
  };

  const days = [
    { title: 'Day 1: Thursday 1st October 2026', stops: dossiers.day_1 || [] },
    { title: 'Day 2: Friday 2nd October 2026', stops: dossiers.day_2 || [] },
    { title: 'Day 3: Saturday 3rd October 2026', stops: dossiers.day_3 || [] },
  ];

  let bodyHtml = '';
  days.forEach((day, dIdx) => {
    bodyHtml += `
      <div style="margin-top: ${dIdx === 0 ? '0' : '40px'}; margin-bottom: 25px;">
        <div style="background: #1e3a8a; color: white; padding: 12px 18px; border-radius: 6px; font-family: 'Playfair Display', serif; font-size: 1.25rem; font-weight: 700; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
          <span>${day.title}</span>
          <span style="font-size: 0.8rem; font-family: sans-serif; font-weight: normal; background: rgba(255,255,255,0.2); padding: 3px 10px; border-radius: 12px;">${day.stops.length} Stops</span>
        </div>
    `;

    day.stops.forEach((stop, sIdx) => {
      bodyHtml += `
        <div id="anthology-stop-${stop.site_id}" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 22px; margin-bottom: 24px; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; flex-wrap: wrap; gap: 8px;">
            <div>
              <span style="font-size: 0.72rem; font-weight: 700; color: #991b1b; text-transform: uppercase; letter-spacing: 0.05em;">Field Reading · Stop ${sIdx + 1}</span>
              <h4 style="margin: 2px 0 0 0; color: #0f172a; font-size: 1.25rem; font-family: 'Playfair Display', serif;">${stop.site_name}</h4>
            </div>
            <span style="font-size: 0.78rem; font-weight: 700; background: #f1f5f9; color: #475569; padding: 4px 10px; border-radius: 14px; border: 1px solid #e2e8f0;">${stop.stop_time}</span>
          </div>
      `;

      stop.poems.forEach((poem) => {
        bodyHtml += `
          <div style="margin-bottom: 25px; background: #fdfaf6; border: 1px solid #e7dfd5; border-radius: 8px; padding: 20px;">
            <!-- Poet Profile -->
            <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-start; margin-bottom: 16px;">
              <div style="flex: 0 0 110px; text-align: center;">
                <img src="${poem.poet.portrait}" alt="${poem.poet.name}" style="width: 110px; height: 140px; object-fit: cover; border-radius: 6px; border: 1px solid #cbd5e1; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <small style="display: block; margin-top: 4px; font-size: 0.75rem; color: #64748b; font-weight: 600;">${poem.poet.lifespan}</small>
              </div>
              <div style="flex: 1; min-width: 240px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; flex-wrap: wrap;">
                  <div>
                    <h5 style="margin: 0; color: #1e293b; font-size: 1.2rem; font-family: 'Playfair Display', serif;">${poem.poet.name}</h5>
                    <div style="font-size: 0.85rem; color: #78350f; font-weight: 600; margin-top: 2px;">${poem.poet.role}</div>
                  </div>
                  <span style="font-size: 0.75rem; font-weight: 700; background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 10px;">${poem.year}</span>
                </div>
                <p style="margin: 8px 0 0 0; color: #475569; font-size: 0.9rem; line-height: 1.55;">${poem.bio}</p>
              </div>
            </div>

            <!-- Poem Verse -->
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #991b1b; border-radius: 6px; padding: 18px 22px; margin-bottom: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 6px;">
                <strong style="font-size: 1.15rem; color: #1e3a8a; font-family: 'Playfair Display', serif; font-style: italic;">"${poem.title}"</strong>
                <span style="font-size: 0.78rem; color: #64748b;">${poem.year}</span>
              </div>
              <div style="font-family: 'Georgia', serif; font-size: 1rem; line-height: 1.8; color: #1e293b; white-space: pre-line; margin: 0;">${poem.poem_text}</div>
            </div>

            <!-- Teacher Guidance Drawer -->
            <details style="background: #eff6ff; border: 1px solid #bfdbfe; border-left: 4px solid #2563eb; border-radius: 6px; margin-bottom: 10px; overflow: hidden;">
              <summary style="padding: 10px 14px; cursor: pointer; font-weight: 700; color: #1d4ed8; font-size: 0.9rem; display: flex; align-items: center; justify-content: space-between;">
                <span><i class="fa-solid fa-bullhorn" style="margin-right: 8px; color: #2563eb;"></i> On-Site Teacher Guidance</span>
                <i class="fa-solid fa-chevron-down" style="font-size: 0.8rem; color: #60a5fa;"></i>
              </summary>
              <div style="padding: 12px 16px; border-top: 1px solid #bfdbfe; font-size: 0.92rem; line-height: 1.6; color: #1e3a8a; background: #ffffff;">
                ${poem.teacher_commentary}
              </div>
            </details>

            <!-- Pedagogical Rationale Drawer -->
            <details style="background: #fdfaf6; border: 1px solid #fed7aa; border-left: 4px solid #ea580c; border-radius: 6px; overflow: hidden;">
              <summary style="padding: 10px 14px; cursor: pointer; font-weight: 700; color: #9a3412; font-size: 0.9rem; display: flex; align-items: center; justify-content: space-between;">
                <span><i class="fa-solid fa-brain" style="margin-right: 8px; color: #ea580c;"></i> Historical Rationale &amp; Hinge Question</span>
                <i class="fa-solid fa-chevron-down" style="font-size: 0.8rem; color: #fb923c;"></i>
              </summary>
              <div style="padding: 12px 16px; border-top: 1px solid #fed7aa; font-size: 0.92rem; line-height: 1.6; color: #334155; background: #ffffff;">
                <p style="margin: 0 0 10px 0;">${poem.pedagogical_rationale.context}</p>
                <div style="background: #fff7ed; border-left: 3px solid #ea580c; padding: 10px 14px; border-radius: 4px;">
                  <strong style="color: #9a3412; display: block; margin-bottom: 3px; font-size: 0.85rem;"><i class="fa-solid fa-circle-question" style="margin-right: 5px;"></i> Class Discussion Hinge Question:</strong>
                  <span style="color: #431407; font-weight: 600; font-size: 0.95rem;">"${poem.pedagogical_rationale.hinge_question}"</span>
                </div>
              </div>
            </details>
          </div>
        `;
      });

      bodyHtml += `</div>`;
    });

    bodyHtml += `</div>`;
  });

  overlay.innerHTML = `
    <div class="modal-content" style="background: #f8fafc; max-width: 950px; width: 92%; max-height: 90vh; overflow-y: auto; padding: 35px; border-radius: 12px; font-family: 'Outfit', sans-serif;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 25px; border-bottom: 2px solid #7f1d1d; padding-bottom: 16px; flex-wrap: wrap; gap: 12px;">
        <div>
          <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; background: #fee2e2; color: #991b1b; padding: 3px 10px; border-radius: 12px;">Complete Expedition Anthology</span>
          <h2 style="margin: 6px 0 0 0; color: #7f1d1d; font-size: 1.8rem; font-family: 'Playfair Display', serif;">
            Voices &amp; Poetry of the Salient
          </h2>
          <p style="margin: 4px 0 0 0; color: #64748b; font-size: 0.95rem;">
            16 Unabridged First World War Poems Across 11 Stops of the Ypres Salient
          </p>
        </div>
        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()" style="padding: 8px 16px; font-size: 0.9rem; cursor: pointer;">
          <i class="fa-solid fa-times" style="margin-right: 5px;"></i> Close
        </button>
      </div>

      <!-- Quick Stop Navigation Bar -->
      <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px 18px; margin-bottom: 25px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
        <span style="font-size: 0.8rem; font-weight: 700; color: #475569; margin-right: 6px;">Jump to Stop:</span>
        <a href="#anthology-stop-essex_farm" style="font-size: 0.78rem; color: #1e3a8a; text-decoration: none; background: #eff6ff; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe;">1. Essex Farm</a>
        <a href="#anthology-stop-langemarck" style="font-size: 0.78rem; color: #1e3a8a; text-decoration: none; background: #eff6ff; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe;">2. Langemarck</a>
        <a href="#anthology-stop-hooge_crater" style="font-size: 0.78rem; color: #1e3a8a; text-decoration: none; background: #eff6ff; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe;">3. Hooge Crater</a>
        <a href="#anthology-stop-st_julien" style="font-size: 0.78rem; color: #1e3a8a; text-decoration: none; background: #eff6ff; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe;">4. St. Julien</a>
        <a href="#anthology-stop-sanctuary_wood" style="font-size: 0.78rem; color: #1e3a8a; text-decoration: none; background: #eff6ff; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe;">5. Sanctuary Wood</a>
        <a href="#anthology-stop-tyne_cot" style="font-size: 0.78rem; color: #1e3a8a; text-decoration: none; background: #eff6ff; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe;">6. Tyne Cot</a>
        <a href="#anthology-stop-lijssenthoek" style="font-size: 0.78rem; color: #1e3a8a; text-decoration: none; background: #eff6ff; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe;">7. Lijssenthoek</a>
        <a href="#anthology-stop-menin_gate_last_post" style="font-size: 0.78rem; color: #1e3a8a; text-decoration: none; background: #eff6ff; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe;">8. Menin Gate</a>
        <a href="#anthology-stop-ypres_ramparts" style="font-size: 0.78rem; color: #1e3a8a; text-decoration: none; background: #eff6ff; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe;">9. Ramparts</a>
        <a href="#anthology-stop-talbot_house" style="font-size: 0.78rem; color: #1e3a8a; text-decoration: none; background: #eff6ff; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe;">10. Talbot House</a>
        <a href="#anthology-stop-poperinge_death_cells" style="font-size: 0.78rem; color: #1e3a8a; text-decoration: none; background: #eff6ff; padding: 4px 10px; border-radius: 12px; border: 1px solid #bfdbfe;">11. Poperinge</a>
      </div>

      ${bodyHtml}

      <div style="text-align: right; margin-top: 30px; border-top: 1px solid #cbd5e1; padding-top: 15px;">
        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Close Anthology</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
};

window.openDebateModal = function () {
  window.injectDebateModalIfNeeded();
  const modal = document.getElementById('debateModal');
  modal.style.display = 'flex';
  // Trigger reflow
  void modal.offsetWidth;
  modal.style.opacity = '1';
  modal.querySelector('.modal-content').style.transform = 'scale(1)';
  window.renderDebatePrompt();
};

window.closeDebateModal = function () {
  const modal = document.getElementById('debateModal');
  if (modal) {
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'scale(0.95)';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
};

window.renderDebatePrompt = function () {
  if (
    !window.currentUnitData ||
    !window.currentUnitData.debatePrompts ||
    window.currentUnitData.debatePrompts.length === 0
  ) {
    document.getElementById('debateTopicSubtitle').innerText = 'No prompts available';
    document.getElementById('debateModalContent').innerHTML =
      'No debate prompts found for this unit.';
    document.getElementById('btn-show-starter').style.display = 'none';
    return;
  }
  const prompts = window.currentUnitData.debatePrompts;
  const promptData = prompts[window.currentDebateIndex];
  document.getElementById('debateTopicSubtitle').innerText = promptData.title;
  document.getElementById('debateModalContent').innerHTML = promptData.prompt;

  const starterContainer = document.getElementById('debateSentenceStarterContainer');
  const starterBtn = document.getElementById('btn-show-starter');

  // Hide starter by default when changing prompts
  if (starterContainer) starterContainer.style.display = 'none';

  if (promptData.sentence_starter && starterBtn) {
    starterBtn.style.display = 'inline-block';
    starterBtn.innerText = 'Show Hint';
    document.getElementById('debateSentenceStarterText').innerText = promptData.sentence_starter;
  } else if (starterBtn) {
    starterBtn.style.display = 'none';
  }
};

window.toggleDebateStarter = function () {
  const container = document.getElementById('debateSentenceStarterContainer');
  const btn = document.getElementById('btn-show-starter');
  if (container.style.display === 'none') {
    container.style.display = 'block';
    btn.innerText = 'Hide Hint';
  } else {
    container.style.display = 'none';
    btn.innerText = 'Show Hint';
  }
};

window.cycleDebatePrompt = function (direction) {
  if (!window.currentUnitData || !window.currentUnitData.debatePrompts) return;
  const prompts = window.currentUnitData.debatePrompts;
  window.currentDebateIndex += direction;
  if (window.currentDebateIndex < 0) window.currentDebateIndex = prompts.length - 1;
  if (window.currentDebateIndex >= prompts.length) window.currentDebateIndex = 0;
  window.renderDebatePrompt();
};

window.injectMilestoneModalIfNeeded = function () {
  if (document.getElementById('milestoneModal')) return;
  const html = `
  <div id="milestoneModal" class="modal-overlay no-print" style="display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(8px); justify-content: center; align-items: center; z-index: 1000; opacity: 0; transition: opacity 0.3s ease;" data-action="close-milestone-overlay">
    <div class="modal-content" style="background: var(--navy); border: 2.5px solid var(--gold); border-radius: 12px; padding: 25px; max-width: 500px; width: 90%; color: #ffffff; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.5); transform: scale(0.95); transition: transform 0.3s ease;">
      <button class="modal-close-btn" data-action="close-milestone" style="position: absolute; top: 15px; right: 15px; background: transparent; border: none; color: #ffffff; font-size: 16pt; cursor: pointer; transition: color 0.2s;"><i class="fa-solid fa-xmark"></i></button>
      <div id="modalMilestoneContent">
        <!-- Content dynamically populated via showMilestoneModal -->
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
};

window.showMilestoneModal = function (id) {
  window.injectMilestoneModalIfNeeded();
  if (!window.currentUnitData || !window.currentUnitData.milestones) return;
  const data = window.currentUnitData.milestones[id];
  if (!data) return;

  const contentBox = document.getElementById('modalMilestoneContent');
  if (contentBox) {
    contentBox.innerHTML = `
      <div style="font-size: 11pt; font-weight: bold; color: var(--gold); text-transform: uppercase; margin-bottom: 5px;">Milestone ${id}: ${data.year}</div>
      <h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-top: 0; margin-bottom: 15px; border-bottom: 1.5px solid var(--gold); padding-bottom: 5px; color: #ffffff;">${data.title}</h3>
      <img src="${getAssetUrl(data.img)}" alt="${data.title}" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 6px; border: 1.5px solid var(--gold); margin-bottom: 15px;">
      <p style="font-size: 10.5pt; line-height: 1.5; color: #e2e8f0; margin-bottom: 15px; text-align: justify;">${data.desc}</p>
      <div style="background: rgba(255,255,255,0.06); padding: 12px; border-radius: 6px; border-left: 3px solid var(--gold);">
        <strong style="display: block; font-size: 9pt; text-transform: uppercase; color: var(--gold); margin-bottom: 4px;"><i class="fa-solid fa-circle-question"></i> Retrieval Challenge</strong>
        <span style="font-size: 9.5pt; line-height: 1.4; color: #f8fafc;">${data.trivia}</span>
      </div>
    `;
  }

  const modal = document.getElementById('milestoneModal');
  if (modal) {
    modal.style.display = 'flex';
    // Trigger reflow
    void modal.offsetWidth;
    modal.style.opacity = '1';
    modal.querySelector('.modal-content').style.transform = 'scale(1)';
  }
};

window.closeMilestoneModal = function () {
  const modal = document.getElementById('milestoneModal');
  if (modal) {
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'scale(0.95)';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
};

window.injectQuizModalIfNeeded = function () {
  if (document.getElementById('quizModal')) return;
  const html = `
  <div id="quizModal" class="modal-overlay no-print" style="display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(8px); justify-content: center; align-items: center; z-index: 1000; opacity: 0; transition: opacity 0.3s ease;" data-action="close-quiz-overlay">
    <div class="modal-content" style="background: #ffffff; border-radius: 12px; padding: 30px; max-width: 600px; width: 90%; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.5); transform: scale(0.95); transition: transform 0.3s ease;">
      <button class="modal-close-btn" data-action="close-quiz" style="position: absolute; top: 15px; right: 15px; background: transparent; border: none; color: #64748b; font-size: 16pt; cursor: pointer; transition: color 0.2s;"><i class="fa-solid fa-xmark"></i></button>
      
      <div style="display: flex; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px;">
        <i class="fa-solid fa-clipboard-check" style="font-size: 2rem; color: #3b82f6; margin-right: 15px;"></i>
        <div>
          <h2 style="margin: 0; color: #1e293b; font-size: 1.5rem;">Knowledge Check</h2>
          <p style="margin: 0; color: #64748b; font-size: 0.95rem;">Question <span id="quiz-progress">1 / 4</span></p>
        </div>
      </div>
      
      <div id="quiz-question-container">
        <!-- Populated dynamically -->
      </div>
      
      <div style="display: flex; justify-content: space-between; margin-top: 25px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
        <div id="quiz-feedback" style="font-weight: bold; padding-top: 8px;"></div>
        <button id="quiz-next-btn" class="btn-pedagogy-primary" style="display: none;" data-action="next-quiz-question">Next Question <i class="fa-solid fa-arrow-right"></i></button>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
};

window.startQuiz = function (lessonId) {
  window.injectQuizModalIfNeeded();
  if (!window.currentUnitData || !window.currentUnitData.lessons) return;
  const lesson = window.currentUnitData.lessons.find((l) => l.id === lessonId);
  if (!lesson || !lesson.quiz || lesson.quiz.length === 0) return;

  window.currentQuizData = lesson.quiz.map((q) => {
    if (!q.options && q.distractors && q.distractors.length > 0) {
      let opts = [q.answer || q.a, ...q.distractors];
      opts = opts.sort(() => Math.random() - 0.5);
      const correctIdx = opts.indexOf(q.answer || q.a);
      return { ...q, options: opts, answer: correctIdx };
    } else if (q.options && typeof (q.answer || q.a) === 'string') {
      let opts = [...q.options];
      opts = opts.sort(() => Math.random() - 0.5);
      return { ...q, options: opts, answer: opts.indexOf(q.answer || q.a) };
    }
    return q;
  });
  window.currentQuizIndex = 0;
  window.currentQuizLessonId = lessonId;

  window.renderQuizQuestion();

  const modal = document.getElementById('quizModal');
  modal.style.display = 'flex';
  void modal.offsetWidth; // Trigger reflow
  modal.style.opacity = '1';
  modal.querySelector('.modal-content').style.transform = 'scale(1)';
};

window.renderQuizQuestion = function () {
  const qData = window.currentQuizData[window.currentQuizIndex];
  document.getElementById('quiz-progress').innerText =
    `${window.currentQuizIndex + 1} / ${window.currentQuizData.length}`;

  let optionsHtml = '';
  if (qData.options) {
    qData.options.forEach((opt, idx) => {
      optionsHtml += `
        <button class="btn-quiz-option quiz-option-btn" data-idx="${idx}" data-action="check-quiz-answer">
          <span style="display: inline-block; width: 30px; height: 30px; line-height: 30px; text-align: center; background: #e2e8f0; border-radius: 50%; margin-right: 15px; font-weight: bold; color: #64748b;">${String.fromCharCode(65 + idx)}</span>
          ${opt}
        </button>
      `;
    });
  } else {
    optionsHtml = `
      <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 15px;">
         <button class="btn btn-secondary" data-action="reveal-quiz-answer">Reveal Answer</button>
         <div style="display: none; font-size: 1.15rem; color: #059669; font-weight: bold; padding: 10px;">${qData.a || qData.answer || ''}</div>
      </div>
    `;
  }

  document.getElementById('quiz-question-container').innerHTML = `
    <h3 style="font-size: 1.3rem; color: #0f172a; margin-bottom: 20px; line-height: 1.4;">${qData.question || qData.q}</h3>
    ${optionsHtml}
  `;

  document.getElementById('quiz-feedback').innerHTML = '';

  const nextBtn = document.getElementById('quiz-next-btn');
  if (!qData.options) {
    nextBtn.style.display = 'none'; // Will be revealed when answer is shown
  } else {
    nextBtn.style.display = 'none';
  }

  if (window.currentQuizIndex >= window.currentQuizData.length - 1) {
    nextBtn.innerHTML = 'Finish <i class="fa-solid fa-check"></i>';
    nextBtn.onclick = window.closeQuizModal;
  } else {
    nextBtn.innerHTML = 'Next Question <i class="fa-solid fa-arrow-right"></i>';
    nextBtn.onclick = window.nextQuizQuestion;
  }
};

window.checkQuizAnswer = function (btnEl, selectedIdx) {
  const qData = window.currentQuizData[window.currentQuizIndex];
  const isCorrect = selectedIdx === qData.answer;

  // Disable all buttons
  const allBtns = document
    .getElementById('quiz-question-container')
    .querySelectorAll('.quiz-option-btn');
  allBtns.forEach((btn) => {
    btn.disabled = true;
    btn.style.cursor = 'default';
    if (parseInt(btn.dataset.idx) === qData.answer) {
      btn.style.borderColor = '#22c55e';
      btn.style.background = '#f0fdf4';
      btn.style.color = '#15803d';
      btn.innerHTML = '<i class="fa-solid fa-check-circle"></i> ' + btn.innerHTML;
    }
  });

  const feedbackEl = document.getElementById('quiz-feedback');
  if (isCorrect) {
    feedbackEl.innerHTML =
      '<span style="color: #22c55e;"><i class="fa-solid fa-star"></i> Correct!</span>';
  } else {
    btnEl.style.borderColor = '#ef4444';
    btnEl.style.background = '#fef2f2';
    btnEl.style.color = '#b91c1c';
    btnEl.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> ' + btnEl.innerHTML;
    feedbackEl.innerHTML =
      '<span style="color: #ef4444;">Incorrect. Review the answer above.</span>';
  }

  if (window.currentQuizIndex < window.currentQuizData.length - 1) {
    document.getElementById('quiz-next-btn').innerHTML =
      'Next Question <i class="fa-solid fa-arrow-right"></i>';
    document.getElementById('quiz-next-btn').style.display = 'block';
    document.getElementById('quiz-next-btn').onclick = window.nextQuizQuestion;
  } else {
    document.getElementById('quiz-next-btn').innerHTML =
      'Finish Quiz <i class="fa-solid fa-flag-checkered"></i>';
    document.getElementById('quiz-next-btn').style.display = 'block';
    document.getElementById('quiz-next-btn').onclick = function () {
      document.getElementById('quiz-question-container').innerHTML =
        '<h3 style="text-align:center; color: #15803d;"><i class="fa-solid fa-trophy"></i> Quiz Complete!</h3>';
      document.getElementById('quiz-feedback').innerHTML = '';
      document.getElementById('quiz-next-btn').style.display = 'none';
    };
  }
};

window.nextQuizQuestion = function () {
  window.currentQuizIndex++;
  window.renderQuizQuestion();
};

window.closeQuizModal = function () {
  const modal = document.getElementById('quizModal');
  if (modal) {
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'scale(0.95)';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }
};

window.openModal = function (src) {
  if (
    !src ||
    typeof src !== 'string' ||
    src.trim() === '' ||
    src === 'undefined' ||
    src === 'null'
  ) {
    console.warn('[openModal] Blocked attempt to open modal with invalid image src:', src);
    return;
  }

  // Remove any previously open image modal to prevent duplicates
  const existing = document.getElementById('global-image-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'global-image-modal';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.backgroundColor = 'rgba(0,0,0,0.88)';
  modal.style.backdropFilter = 'blur(4px)';
  modal.style.zIndex = '999999';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.cursor = 'default';

  const cleanupAndClose = () => {
    window.removeEventListener('keydown', onKeyDown);
    modal.remove();
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      cleanupAndClose();
    }
  };
  window.addEventListener('keydown', onKeyDown);

  // Close Button
  const closeBtn = document.createElement('button');
  closeBtn.setAttribute('aria-label', 'Close Image');
  closeBtn.title = 'Close (Esc)';
  closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '20px';
  closeBtn.style.right = '25px';
  closeBtn.style.background = 'rgba(255,255,255,0.2)';
  closeBtn.style.border = '1px solid rgba(255,255,255,0.4)';
  closeBtn.style.borderRadius = '50%';
  closeBtn.style.width = '44px';
  closeBtn.style.height = '44px';
  closeBtn.style.color = '#ffffff';
  closeBtn.style.fontSize = '1.3rem';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.display = 'flex';
  closeBtn.style.justifyContent = 'center';
  closeBtn.style.alignItems = 'center';
  closeBtn.style.zIndex = '1000000';
  closeBtn.style.transition = 'all 0.2s ease';
  closeBtn.onmouseover = () => {
    closeBtn.style.background = 'rgba(239, 68, 68, 0.85)';
    closeBtn.style.borderColor = '#ef4444';
  };
  closeBtn.onmouseout = () => {
    closeBtn.style.background = 'rgba(255,255,255,0.2)';
    closeBtn.style.borderColor = 'rgba(255,255,255,0.4)';
  };
  closeBtn.onclick = (e) => {
    e.stopPropagation();
    cleanupAndClose();
  };
  modal.appendChild(closeBtn);

  // Bottom Helper Hint
  const hint = document.createElement('div');
  hint.innerText = 'Click anywhere or press Esc to close · Scroll to zoom';
  hint.style.position = 'absolute';
  hint.style.bottom = '20px';
  hint.style.left = '50%';
  hint.style.transform = 'translateX(-50%)';
  hint.style.color = 'rgba(255,255,255,0.75)';
  hint.style.background = 'rgba(0,0,0,0.5)';
  hint.style.padding = '6px 14px';
  hint.style.borderRadius = '20px';
  hint.style.fontSize = '0.82rem';
  hint.style.letterSpacing = '0.03em';
  hint.style.pointerEvents = 'none';
  hint.style.zIndex = '1000000';
  modal.appendChild(hint);

  const img = document.createElement('img');
  img.src = src;
  img.style.maxWidth = '90%';
  img.style.maxHeight = '88%';
  img.style.objectFit = 'contain';
  img.style.borderRadius = '8px';
  img.style.boxShadow = '0 10px 30px rgba(0,0,0,0.6)';
  img.style.transition = 'transform 0.1s ease';
  img.style.cursor = 'zoom-in';

  img.onerror = () => {
    img.style.display = 'none';
    const errBox = document.createElement('div');
    errBox.style.background = '#ffffff';
    errBox.style.padding = '30px';
    errBox.style.borderRadius = '12px';
    errBox.style.textAlign = 'center';
    errBox.style.maxWidth = '420px';
    errBox.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    errBox.innerHTML = `
      <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.5rem; color: #ef4444; margin-bottom: 12px; display: block;"></i>
      <h3 style="margin: 0 0 8px 0; color: #0f172a; font-family: 'Playfair Display', serif;">Photograph Unavailable</h3>
      <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 20px; line-height: 1.4;">The high-resolution photograph could not be loaded (${src}).</p>
      <button style="background: #1e3a8a; color: white; border: none; padding: 8px 18px; border-radius: 6px; cursor: pointer; font-weight: 600;">Close</button>
    `;
    errBox.querySelector('button').onclick = (e) => {
      e.stopPropagation();
      cleanupAndClose();
    };
    modal.appendChild(errBox);
  };

  let scale = 1;
  modal.addEventListener('wheel', (e) => {
    e.preventDefault();
    scale += e.deltaY * -0.005;
    scale = Math.min(Math.max(1, scale), 5);
    const rect = img.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    if (scale === 1) {
      img.style.transformOrigin = 'center center';
      img.style.cursor = 'zoom-in';
    } else if (e.deltaY < 0) {
      img.style.transformOrigin = `${x}% ${y}%`;
      img.style.cursor = 'zoom-out';
    }
    img.style.transform = `scale(${scale})`;
  });

  modal.onclick = (e) => {
    if (e.target === closeBtn || closeBtn.contains(e.target)) return;
    if (scale > 1) {
      scale = 1;
      img.style.transform = `scale(1)`;
      img.style.cursor = 'zoom-in';
    } else {
      cleanupAndClose();
    }
  };

  modal.appendChild(img);
  document.body.appendChild(modal);
};

window.openGallery = function (encodedData, startIndex) {
  const images = JSON.parse(decodeURIComponent(encodedData));
  let currentIndex = startIndex;

  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
  modal.style.zIndex = '999999';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '20px';
  closeBtn.style.right = '20px';
  closeBtn.style.background = 'none';
  closeBtn.style.border = 'none';
  closeBtn.style.color = 'white';
  closeBtn.style.fontSize = '2rem';
  closeBtn.style.cursor = 'pointer';
  closeBtn.onclick = () => modal.remove();
  modal.appendChild(closeBtn);

  const imgContainer = document.createElement('div');
  imgContainer.style.position = 'relative';
  imgContainer.style.width = '80%';
  imgContainer.style.height = '80%';
  imgContainer.style.display = 'flex';
  imgContainer.style.flexDirection = 'column';
  imgContainer.style.justifyContent = 'center';
  imgContainer.style.alignItems = 'center';

  const img = document.createElement('img');
  img.style.maxWidth = '100%';
  img.style.maxHeight = '90%';
  img.style.objectFit = 'contain';
  img.style.borderRadius = '8px';
  img.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
  img.style.transition = 'transform 0.1s ease';
  img.style.cursor = 'zoom-in';
  imgContainer.appendChild(img);

  const caption = document.createElement('div');
  caption.style.color = 'white';
  caption.style.marginTop = '15px';
  caption.style.fontSize = '1.1rem';
  caption.style.textAlign = 'center';
  imgContainer.appendChild(caption);

  modal.appendChild(imgContainer);

  let scale = 1;
  imgContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    scale += e.deltaY * -0.005;
    scale = Math.min(Math.max(1, scale), 5);
    const rect = img.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    if (scale === 1) {
      img.style.transformOrigin = 'center center';
      img.style.cursor = 'zoom-in';
    } else if (e.deltaY < 0) {
      img.style.transformOrigin = `${x}% ${y}%`;
      img.style.cursor = 'zoom-out';
    }
    img.style.transform = `scale(${scale})`;
  });

  imgContainer.onclick = (e) => {
    if (scale > 1) {
      scale = 1;
      img.style.transform = `scale(1)`;
      img.style.cursor = 'zoom-in';
    }
  };

  const prevBtn = document.createElement('button');
  prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
  prevBtn.style.position = 'absolute';
  prevBtn.style.left = '5%';
  prevBtn.style.top = '50%';
  prevBtn.style.transform = 'translateY(-50%)';
  prevBtn.style.background = 'rgba(255,255,255,0.2)';
  prevBtn.style.border = 'none';
  prevBtn.style.color = 'white';
  prevBtn.style.fontSize = '2rem';
  prevBtn.style.width = '60px';
  prevBtn.style.height = '60px';
  prevBtn.style.borderRadius = '50%';
  prevBtn.style.cursor = 'pointer';
  prevBtn.style.display = 'flex';
  prevBtn.style.justifyContent = 'center';
  prevBtn.style.alignItems = 'center';
  prevBtn.onclick = (e) => {
    e.stopPropagation();
    scale = 1;
    img.style.transform = 'scale(1)';
    if (currentIndex > 0) {
      currentIndex--;
      updateImage();
    }
  };
  modal.appendChild(prevBtn);

  const nextBtn = document.createElement('button');
  nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
  nextBtn.style.position = 'absolute';
  nextBtn.style.right = '5%';
  nextBtn.style.top = '50%';
  nextBtn.style.transform = 'translateY(-50%)';
  nextBtn.style.background = 'rgba(255,255,255,0.2)';
  nextBtn.style.border = 'none';
  nextBtn.style.color = 'white';
  nextBtn.style.fontSize = '2rem';
  nextBtn.style.width = '60px';
  nextBtn.style.height = '60px';
  nextBtn.style.borderRadius = '50%';
  nextBtn.style.cursor = 'pointer';
  nextBtn.style.display = 'flex';
  nextBtn.style.justifyContent = 'center';
  nextBtn.style.alignItems = 'center';
  nextBtn.onclick = (e) => {
    e.stopPropagation();
    scale = 1;
    img.style.transform = 'scale(1)';
    if (currentIndex < images.length - 1) {
      currentIndex++;
      updateImage();
    }
  };
  modal.appendChild(nextBtn);

  const updateImage = () => {
    img.src = images[currentIndex].src;
    caption.innerHTML = images[currentIndex].alt || '';
    prevBtn.style.display = currentIndex > 0 ? 'flex' : 'none';
    nextBtn.style.display = currentIndex < images.length - 1 ? 'flex' : 'none';
  };

  modal.onclick = (e) => {
    if (e.target === modal || e.target === imgContainer) modal.remove();
  };

  const keyHandler = (e) => {
    if (!document.body.contains(modal)) {
      document.removeEventListener('keydown', keyHandler);
      return;
    }
    if (e.key === 'Escape') modal.remove();
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      currentIndex--;
      updateImage();
    }
    if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
      currentIndex++;
      updateImage();
    }
  };
  document.addEventListener('keydown', keyHandler);

  updateImage();
  document.body.appendChild(modal);
};

window.openTeacherGuideModal = function () {
  if (document.getElementById('teacherGuideModal')) return;
  const html = `
    <div id="teacherGuideModal" class="modal-overlay no-print" style="display: flex; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(10px); justify-content: center; align-items: center; z-index: 2000; opacity: 0; transition: opacity 0.3s ease;" data-action="close-modal-overlay">
      <div class="modal-content" style="background: white; border-radius: 12px; padding: 40px; max-width: 800px; width: 90%; max-height: 90vh; overflow-y: auto; color: #1e293b; position: relative; font-family: 'Outfit', sans-serif;">
        <button data-action="close-modal" style="position: absolute; top: 20px; right: 20px; background: transparent; border: none; color: #64748b; font-size: 18pt; cursor: pointer;"><i class="fa-solid fa-xmark"></i></button>
        
        <h2 style="font-family: 'Playfair Display', serif; color: #4f46e5; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; font-size: 2rem;">
          <i class="fa-solid fa-chalkboard-user"></i> Teacher & Tour Guide Instructions
        </h2>
        
        <p style="font-size: 1.1rem; line-height: 1.6;">Welcome to the Meoncross Battlefield Tour App! This app is designed with a "Dual Interface" to keep pupils engaged while giving you, the teacher, all the information you need.</p>
        
        <h3 style="color: #334155; margin-top: 30px;"><i class="fa-solid fa-mobile-screen"></i> 1. The Pupil View vs. Teacher View</h3>
        <p style="font-size: 1.05rem; line-height: 1.6;">By default, the app is in <strong>Pupil Mode</strong>. They will see the timeline, photos, and interactive maps. However, they do NOT see the historical script or the answers to questions.</p>
        <p style="font-size: 1.05rem; line-height: 1.6;">As a teacher, you have access to the <strong>Tour Guide Script</strong>. On any day's page, click the blue button with the megaphone icon at the top. This opens your script, complete with timelines, key facts, and historical sources to read out loud to the pupils.</p>

        <h3 style="color: #334155; margin-top: 30px;"><i class="fa-solid fa-location-dot"></i> 2. Geo-Fenced "Missions" (Padlocks)</h3>
        <p style="font-size: 1.05rem; line-height: 1.6;">To prevent pupils from just scrolling through the entire trip while bored on the coach, many historical sites are <strong>Geo-Fenced</strong>. You will see a <i class="fa-solid fa-lock"></i> padlock icon next to these sites.</p>
        <p style="font-size: 1.05rem; line-height: 1.6;"><strong>How it works:</strong> When the pupils physically step off the coach and enter the boundaries of the cemetery or memorial, the app uses their phone's GPS to automatically unlock the site. This reveals a specific interactive "Mission" they must complete there (e.g., finding a specific grave, using their compass to find the direction of a gas attack).</p>
        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-top: 10px; border-radius: 4px;">
          <strong>Teacher's Fail-Safe:</strong> If a pupil's GPS is broken or offline, they can manually unlock their mission task. To do this, simply instruct the pupil to <strong>tap the padlock icon 4 times in quick succession</strong>. This will act as a secret override.
        </div>

        <h3 style="color: #334155; margin-top: 30px;"><i class="fa-solid fa-users"></i> 3. The Oral Storytelling Task (Tyne Cot & Langemarck)</h3>
        <p style="font-size: 1.05rem; line-height: 1.6;">At massive cemeteries like Tyne Cot, pupils can easily be overwhelmed by the numbers. To build empathy, the app assigns each pupil one specific, well-documented soldier to find (e.g., a Victoria Cross winner or a local Stubbington hero).</p>
        <p style="font-size: 1.05rem; line-height: 1.6;"><strong>Your Role:</strong> Let the pupils spread out to find their assigned graves and read the biography on their phones. At the end of the visit, gather them together and ask them to orally tell the rest of the group the story of "their" soldier.</p>
        
        <div style="margin-top: 40px; text-align: center;">
          <button class="btn-pedagogy-primary" data-action="close-modal" style="background: #4f46e5; color: white; padding: 10px 30px; font-size: 1.1rem; border-radius: 8px; border: none; cursor: pointer;">Got it!</button>
        </div>
      </div>
    </div>
    `;
  document.body.insertAdjacentHTML('beforeend', html);
  const modal = document.getElementById('teacherGuideModal');
  // Trigger reflow for animation
  void modal.offsetWidth;
  modal.style.opacity = '1';
};

window.openParentBriefingModal = function () {
  if (document.getElementById('parentBriefingModal')) return;

  const html = `
    <div id="parentBriefingModal" class="modal-overlay no-print" style="display: flex; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.92); backdrop-filter: blur(8px); justify-content: center; align-items: center; z-index: 999999; opacity: 0; transition: opacity 0.3s ease;">
      <div class="modal-content" style="background: #f8fafc; border-radius: 12px; width: 95vw; max-width: 1280px; max-height: 94vh; overflow-y: auto; color: #1e293b; position: relative; font-family: 'Outfit', sans-serif; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); border: 1px solid #cbd5e1; display: flex; flex-direction: column;">
        
        <!-- Header Banner -->
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); color: #ffffff; padding: 18px 24px; border-radius: 11px 11px 0 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px; border-bottom: 3px solid #d97706;">
          <div>
            <div style="font-size: 0.85rem; font-weight: 700; color: #fbbf24; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 2px;">
              Parent &amp; Pupil Expedition Briefing · Thursday 10th September (16:15)
            </div>
            <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 1.6rem; color: #ffffff; letter-spacing: 0.02em;">
              YPRES 1914–1918: REMEMBRANCE, SACRIFICE &amp; LOCAL HERITAGE
            </h2>
            <div style="font-size: 0.9rem; color: #cbd5e1; margin-top: 4px;">
              Meoncross School History Department &amp; The History Boys · Led jointly by <strong>Mr Ben Lovett</strong> &amp; <strong>Mr James Garrett</strong>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <a href="/pdfs/ypres_2026_parent_information_pack.pdf" target="_blank" style="background: #fefce8; color: #b45309; border: 1.5px solid #fde047; padding: 7px 14px; border-radius: 6px; font-weight: 700; font-size: 0.82rem; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <i class="fa-solid fa-file-pdf" style="color: #dc2626;"></i> PDF Handout
            </a>
            <a href="/briefings/ypres_2026_parent_briefing.pptx" download style="background: #f0fdf4; color: #166534; border: 1.5px solid #bbf7d0; padding: 7px 14px; border-radius: 6px; font-weight: 700; font-size: 0.82rem; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <i class="fa-solid fa-file-powerpoint" style="color: #ea580c;"></i> Slides (.pptx)
            </a>
            <button id="closeParentBriefingBtn" style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); color: #ffffff; width: 36px; height: 36px; border-radius: 50%; font-size: 1.1rem; cursor: pointer; display: flex; justify-content: center; align-items: center; transition: all 0.2s;">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        <!-- 3-Column Executive Presentation Slide -->
        <div style="padding: 22px; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 18px; flex: 1;">
          
          <!-- Column 1: Itinerary & Local Mission -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-top: 4px solid #1e3a8a; border-radius: 8px; padding: 18px; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <span style="background: #eff6ff; color: #1e3a8a; width: 28px; height: 28px; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: 800; font-size: 0.85rem;">1</span>
              <h3 style="margin: 0; color: #1e3a8a; font-size: 1.1rem; font-family: 'Playfair Display', serif;">3-Day Itinerary &amp; Mission</h3>
            </div>
            
            <div style="margin-bottom: 12px; padding: 10px; background: #f8fafc; border-radius: 6px; border-left: 3px solid #1e3a8a;">
              <strong style="color: #0f172a; font-size: 0.85rem;">Day 1 (Thu 1 Oct): North Salient &amp; Medical Care</strong>
              <p style="margin: 3px 0 0 0; font-size: 0.8rem; color: #475569; line-height: 1.35;">06:15 departure from school. Essex Farm ADS (John McCrae's bunker), Yorkshire Trench, Langemarck German Cemetery. Peace Village Hostel check-in &amp; 2-course dinner.</p>
            </div>

            <div style="margin-bottom: 12px; padding: 10px; background: #f8fafc; border-radius: 6px; border-left: 3px solid #b45309;">
              <strong style="color: #0f172a; font-size: 0.85rem;">Day 2 (Fri 2 Oct): Passchendaele &amp; Menin Gate</strong>
              <p style="margin: 3px 0 0 0; font-size: 0.8rem; color: #475569; line-height: 1.35;">Vancouver Corner, Hooge Crater preserved trenches, Sanctuary Wood, Tyne Cot Cemetery (finding our village fallen). Evening: <strong>8:00 PM Last Post Ceremony</strong> with school wreath laying.</p>
            </div>

            <div style="margin-bottom: 12px; padding: 10px; background: #f8fafc; border-radius: 6px; border-left: 3px solid #0f766e;">
              <strong style="color: #0f172a; font-size: 0.85rem;">Day 3 (Sat 3 Oct): Ypres Town &amp; Journey Home</strong>
              <p style="margin: 3px 0 0 0; font-size: 0.8rem; color: #475569; line-height: 1.35;">In Flanders Fields Museum (Cloth Hall), Ypres Ramparts walk, Talbot House (Poperinge). Supermarket lunch &amp; return to Meoncross approx. 20:30.</p>
            </div>

            <div style="background: #fefce8; border: 1px solid #fef08a; padding: 10px 12px; border-radius: 6px;">
              <strong style="color: #92400e; font-size: 0.82rem; display: block; margin-bottom: 2px;">🕊️ The Local Heritage Hook:</strong>
              <span style="font-size: 0.78rem; color: #78350f; line-height: 1.35;">Pupils will locate our Stubbington village dead—including the three Lowry brothers from Manor Way Grange and the six Salient fallen on Holy Rood's parish tablet.</span>
            </div>
          </div>

          <!-- Column 2: Food, Money & Rooming -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-top: 4px solid #b45309; border-radius: 8px; padding: 18px; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <span style="background: #fef3c7; color: #b45309; width: 28px; height: 28px; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: 800; font-size: 0.85rem;">2</span>
              <h3 style="margin: 0; color: #b45309; font-size: 1.1rem; font-family: 'Playfair Display', serif;">Food, Money &amp; Accommodation</h3>
            </div>

            <div style="margin-bottom: 14px;">
              <strong style="color: #0f172a; font-size: 0.88rem; display: block; margin-bottom: 4px;">🍽️ Catering Arrangements:</strong>
              <ul style="margin: 0; padding-left: 16px; font-size: 0.82rem; color: #334155; line-height: 1.4;">
                <li><strong>Thursday Day 1:</strong> Pupils <strong>must bring a packed lunch</strong> &amp; travel snacks from home for the coach/crossing.</li>
                <li><strong>Included Meals:</strong> Full hot breakfasts at hostel (Fri &amp; Sat mornings); 2-course evening group dinners in Ypres (Thu &amp; Fri).</li>
              </ul>
            </div>

            <div style="margin-bottom: 14px; background: #fffbeb; border: 1px solid #fde68a; padding: 10px 12px; border-radius: 6px;">
              <strong style="color: #92400e; font-size: 0.88rem; display: block; margin-bottom: 4px;">💶 Spending Money (Euros in Cash):</strong>
              <p style="margin: 0; font-size: 0.82rem; color: #78350f; line-height: 1.4;">
                Pupils require <strong>€20 to €30 in cash (Euros)</strong>. On Friday and Saturday, we stop at Belgian supermarkets for fresh sandwiches, drinks, and fruit. Any small remaining change can be used for postcards/souvenirs.
              </p>
            </div>

            <div>
              <strong style="color: #0f172a; font-size: 0.88rem; display: block; margin-bottom: 4px;">🏨 Peace Village Hostel &amp; Rooming:</strong>
              <p style="margin: 0 0 6px 0; font-size: 0.82rem; color: #334155; line-height: 1.4;">
                Purpose-built educational hostel in Heuvelland with secure keycard access and en-suite rooms (3–4 pupils per room).
              </p>
              <div style="background: #f1f5f9; border-left: 3px solid #0284c7; padding: 8px 10px; border-radius: 4px; font-size: 0.78rem; color: #0369a1; line-height: 1.35;">
                <strong>Rooming Timeline:</strong> Preference slips issued in <strong>two weeks' time</strong> in school. All groupings reviewed by Mr Lovett to ensure every pupil is happily paired.
              </div>
            </div>
          </div>

          <!-- Column 3: Essential Kit & Forms -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-top: 4px solid #15803d; border-radius: 8px; padding: 18px; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <span style="background: #dcfce7; color: #15803d; width: 28px; height: 28px; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: 800; font-size: 0.85rem;">3</span>
              <h3 style="margin: 0; color: #15803d; font-size: 1.1rem; font-family: 'Playfair Display', serif;">Essential Kit &amp; Next Steps</h3>
            </div>

            <div style="margin-bottom: 14px;">
              <strong style="color: #0f172a; font-size: 0.88rem; display: block; margin-bottom: 4px;">🥾 Weather Kit (Autumn in Flanders):</strong>
              <ul style="margin: 0; padding-left: 16px; font-size: 0.82rem; color: #334155; line-height: 1.4;">
                <li><strong>Sturdy Walking Boots:</strong> Waterproof &amp; broken-in. Ground and duckboards can be muddy and slippery.</li>
                <li><strong>Waterproof Raincoat:</strong> Windproof with hood.</li>
                <li><strong>Warm Winter Hat &amp; Gloves:</strong> Mandatory! Standing still at 8pm Menin Gate ceremony gets very cold.</li>
                <li><strong>Luggage:</strong> 1 medium holdall for coach hold + 1 small daypack for coach seat.</li>
              </ul>
            </div>

            <div style="margin-bottom: 14px;">
              <strong style="color: #0f172a; font-size: 0.88rem; display: block; margin-bottom: 4px;">📄 Travel Documents &amp; Tech:</strong>
              <ul style="margin: 0; padding-left: 16px; font-size: 0.82rem; color: #334155; line-height: 1.4;">
                <li><strong>Valid UK Passport:</strong> Must have at least 3 months validity beyond Oct 2026.</li>
                <li><strong>GHIC / EHIC Card:</strong> Reciprocal healthcare in Belgium.</li>
                <li><strong>European 2-Pin Adapter:</strong> For charging phones.</li>
              </ul>
            </div>

            <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 10px 12px; border-radius: 6px;">
              <strong style="color: #991b1b; font-size: 0.82rem; display: block; margin-bottom: 2px;">⚠️ Forms Return Deadline:</strong>
              <span style="font-size: 0.78rem; color: #7f1d1d; line-height: 1.35;">Code of Conduct Agreement Form and Medical/Dietary confirmation form must be signed and returned by <strong>Friday 25th September</strong>.</span>
            </div>
          </div>

        </div>

        <!-- Footer Bar -->
        <div style="background: #0f172a; color: #ffffff; padding: 12px 24px; border-radius: 0 0 11px 11px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; font-size: 0.82rem;">
          <div>
            <span style="color: #38bdf8; font-weight: 700;">🌐 Web App:</span> meoncross-history.netlify.app &nbsp;|&nbsp;
            <span style="color: #fbbf24; font-weight: 700;">24/7 School Base:</span> +44 (0)1329 288339
          </div>
          <div style="color: #94a3b8; font-size: 0.78rem;">
            Press <strong>Esc</strong> or click anywhere outside to close this briefing slide
          </div>
        </div>

      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);
  const modal = document.getElementById('parentBriefingModal');

  const closeBtn = document.getElementById('closeParentBriefingBtn');
  const closeModal = () => {
    window.removeEventListener('keydown', keyHandler);
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 250);
  };

  const keyHandler = (e) => {
    if (e.key === 'Escape') closeModal();
  };
  window.addEventListener('keydown', keyHandler);

  if (closeBtn) closeBtn.onclick = closeModal;
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };

  // Trigger reflow & fade in
  void modal.offsetWidth;
  modal.style.opacity = '1';
};
