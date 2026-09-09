import { appStore } from './store.js';
import { renderLesson, assignQuestionNumbers } from './lesson_renderer.js';
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
  let modal = document.getElementById('task-whiteboard-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'task-whiteboard-modal';
    modal.innerHTML = `
      <div class="whiteboard-header">
        <div>
          <h2 style="margin: 0; font-family: 'Playfair Display', serif; color: #0f172a; font-size: 1.8rem;">
            <i class="fa-solid fa-person-chalkboard" style="color: #0284c7; margin-right: 10px;"></i> Task Whiteboard · Live Marking
          </h2>
          <p style="margin: 4px 0 0 0; color: #64748b; font-size: 0.95rem;">
            Click or tap any question card to reveal the model answer for whole-class review.
          </p>
        </div>
        <div style="display: flex; gap: 10px; align-items: center;">
          <button class="btn" data-action="reveal-all-wb-answers" id="wb-reveal-all-btn" style="padding: 8px 16px; font-size: 0.9rem; font-weight: 600; cursor: pointer; background: #0284c7; color: white; border: none; border-radius: 6px; box-shadow: 0 2px 4px rgba(2, 132, 199, 0.25); display: inline-flex; align-items: center; gap: 7px; transition: all 0.2s ease;">
            <i class="fa-solid fa-eye"></i> Reveal All Answers <span style="background: rgba(255,255,255,0.25); padding: 1px 6px; border-radius: 4px; font-size: 0.75rem; font-family: monospace;">A</span>
          </button>
          <button class="btn btn-secondary" data-action="close-task-whiteboard" style="padding: 8px 16px; font-size: 0.9rem; cursor: pointer;">
            <i class="fa-solid fa-times"></i> Close
          </button>
        </div>
      </div>
      <div class="whiteboard-content" id="whiteboard-questions-container"></div>
    `;
    document.body.appendChild(modal);
  }

  const container = document.getElementById('whiteboard-questions-container');
  container.innerHTML = '';

  const activeLesson = window.currentActiveLesson || appStore.state.activeUnitData.lessons[0];
  const unitId =
    (activeLesson && activeLesson.unitId) ||
    window.currentUnitId ||
    (appStore && appStore.state && appStore.state.selectedUnitId) ||
    (appStore &&
      appStore.state &&
      appStore.state.activeUnitData &&
      appStore.state.activeUnitData.id);

  assignQuestionNumbers(activeLesson, unitId);

  let html = '';
  const cards = [];

  const addQuestionCard = (qNum, questionText, answerText) => {
    if (typeof questionText === 'object' && questionText !== null) {
      questionText = questionText.text || questionText.question || questionText.prompt || '';
    }
    if (typeof questionText !== 'string' || !questionText.trim()) return;
    cards.push({ qNum, questionText: questionText.trim(), answerText: answerText || '' });
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
      if (source.question && source.qNum) {
        addQuestionCard(source.qNum, source.question, source.model_answer || '');
      }
    });
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
        const hq = block.hinge_question;
        const qText = typeof hq === 'string' ? hq : hq.text || hq.question || hq.prompt || '';
        if (qText) {
          let aText = hq.model_answer || hq.model || hq.answer || '';
          if (!aText && Array.isArray(hq.options)) {
            const cIdx =
              typeof hq.correct_index === 'number'
                ? hq.correct_index
                : typeof hq.answer === 'number'
                  ? hq.answer
                  : -1;
            if (cIdx >= 0 && hq.options[cIdx]) {
              aText = `<strong>Correct Answer:</strong> Option ${String.fromCharCode(65 + cIdx)}: ${hq.options[cIdx]}`;
              if (hq.explanation) {
                aText += `<br><br><strong>Explanation:</strong> ${hq.explanation}`;
              }
            }
          }
          addQuestionCard(
            hq.qNum || 'Hinge Question',
            qText,
            aText || 'Formative checkpoint question for class discussion.',
          );
        }
      }
    });
  }

  if (activeLesson.pair_share && activeLesson.pair_share.prompt) {
    addQuestionCard(
      activeLesson.pair_share.qNum,
      activeLesson.pair_share.prompt,
      'Discuss in pairs.',
    );
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

  if (activeLesson.debate_prep) {
    addQuestionCard(
      '-',
      `Debate Prep: ${activeLesson.debate_prep.question}`,
      `<strong>Agree:</strong><ul>${activeLesson.debate_prep.arguments_for.map((a) => `<li>${a}</li>`).join('')}</ul><strong>Disagree:</strong><ul>${activeLesson.debate_prep.arguments_against.map((a) => `<li>${a}</li>`).join('')}</ul>`,
    );
  }

  // Sort cards: Do Now first, then numerically by assigned qNum, then unnumbered
  cards.sort((a, b) => {
    if (a.qNum === 'Do Now') return -1;
    if (b.qNum === 'Do Now') return 1;
    if (typeof a.qNum === 'number' && typeof b.qNum === 'number') return a.qNum - b.qNum;
    if (typeof a.qNum === 'number') return -1;
    if (typeof b.qNum === 'number') return 1;
    return 0;
  });

  cards.forEach(({ qNum, questionText, answerText }) => {
    const finalAnswer =
      (typeof window.formatBold === 'function' ? window.formatBold(answerText) : answerText) ||
      'Model answer to be discussed in class.';
    const prefix =
      typeof qNum === 'number'
        ? `Q${qNum}. `
        : qNum === 'Do Now'
          ? '<strong>[Do Now]</strong> '
          : qNum === 'Hinge Question'
            ? '<strong>[Hinge Question]</strong> '
            : qNum && qNum !== '-'
              ? `<strong>[${qNum}]</strong> `
              : '';
    html += `
        <div class="wb-question-card" style="cursor:pointer;" data-action="toggle-wb-answer" title="Click to reveal answer">
          <div style="font-weight: bold;">${prefix}${questionText}</div>
          <div class="wb-answer">${finalAnswer}</div>
        </div>
      `;
  });

  container.innerHTML = html;
  modal.classList.add('visible');

  // Teacher Quick-Toggle keyboard shortcuts: 'A' to toggle all answers, 'Escape' to close
  if (!window._wbKeyHandlerAttached) {
    window._wbKeyHandlerAttached = true;
    window.addEventListener('keydown', (e) => {
      const wbModal = document.getElementById('task-whiteboard-modal');
      if (!wbModal || !wbModal.classList.contains('visible')) return;
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.key === 'a' || e.key === 'A') {
        const toggleBtn = wbModal.querySelector('[data-action="reveal-all-wb-answers"]');
        if (toggleBtn) toggleBtn.click();
      } else if (e.key === 'Escape') {
        wbModal.classList.remove('visible');
      }
    });
  }
}

window.openTaskWhiteboard = openTaskWhiteboard;

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

// --- Historical Figures Popover Cards ---
let figurePopover = null;
let activeFigureElement = null;

const KNOWN_HISTORICAL_FIGURES = {
  niccolo_barbaro: {
    name: 'Niccolò Barbaro',
    role: 'Venetian Doctor & Merchant',
    lifespan: 'c. 1420 – 1494',
    bio: 'A Venetian eyewitness who kept a detailed daily diary during the 1453 Ottoman siege of Constantinople.',
    image: '/images/individuals/niccol_barbaro.jpg',
  },
  barbaro: {
    name: 'Niccolò Barbaro',
    role: 'Venetian Doctor & Merchant',
    lifespan: 'c. 1420 – 1494',
    bio: 'A Venetian eyewitness who kept a detailed daily diary during the 1453 Ottoman siege of Constantinople.',
    image: '/images/individuals/niccol_barbaro.jpg',
  },
  mehmed_ii: {
    name: 'Sultan Mehmed II',
    role: 'Ottoman Sultan',
    lifespan: '1432 – 1481',
    bio: 'The 21-year-old Ottoman conqueror who captured Constantinople in 1453, transforming it into Istanbul.',
    image: '/images/individuals/sultan_mehmed_ii.jpg',
  },
  sultan_mehmed_ii: {
    name: 'Sultan Mehmed II',
    role: 'Ottoman Sultan',
    lifespan: '1432 – 1481',
    bio: 'The 21-year-old Ottoman conqueror who captured Constantinople in 1453, transforming it into Istanbul.',
    image: '/images/individuals/sultan_mehmed_ii.jpg',
  },
  queen_nanny: {
    name: 'Queen Nanny',
    role: 'Jamaican Maroon Military Leader',
    lifespan: 'c. 1686 – c. 1755',
    bio: 'A brilliant military strategist who led the Maroons in guerrilla warfare, forcing the British to sign a peace treaty in 1739.',
    image: '/images/individuals/queen_nanny_nanny_of_the_maroons.jpg',
  },
  nanny: {
    name: 'Queen Nanny',
    role: 'Jamaican Maroon Military Leader',
    lifespan: 'c. 1686 – c. 1755',
    bio: 'A brilliant military strategist who led the Maroons in guerrilla warfare, forcing the British to sign a peace treaty in 1739.',
    image: '/images/individuals/queen_nanny_nanny_of_the_maroons.jpg',
  },
  mansa_musa: {
    name: 'Mansa Musa',
    role: 'Emperor of Mali',
    lifespan: 'c. 1280 – 1337',
    bio: 'The wealthy ruler of Mali whose 1324 pilgrimage to Mecca displayed West Africa’s colossal gold wealth.',
    image: '/images/individuals/mansa_musa.jpg',
  },
  william_wilberforce: {
    name: 'William Wilberforce',
    role: 'British Politician & Abolitionist',
    lifespan: '1759 – 1833',
    bio: 'A British MP who led the parliamentary campaign to abolish the transatlantic slave trade (1807).',
    image: '/images/william_wilberforce.jpg',
  },
  olaudah_equiano: {
    name: 'Olaudah Equiano',
    role: 'Freed Slave, Author & Abolitionist',
    lifespan: 'c. 1745 – 1797',
    bio: 'A formerly enslaved African whose bestselling 1789 autobiography exposed the horrors of the Middle Passage.',
    image: '/images/equiano.jpg',
  },
};

export function initHistoricalFigurePopover() {
  if (typeof document === 'undefined') return;
  if (!document.getElementById('global-figure-popover')) {
    figurePopover = document.createElement('div');
    figurePopover.id = 'global-figure-popover';
    document.body.appendChild(figurePopover);
  } else {
    figurePopover = document.getElementById('global-figure-popover');
  }

  const showFigurePopover = (e) => {
    const target = e.target.closest('.historical-figure');
    if (!target) return;

    const personKey = (target.getAttribute('data-person') || '').toLowerCase().trim();
    let name = target.getAttribute('data-name') || target.textContent.trim();
    let role = target.getAttribute('data-role') || 'Historical Figure';
    let lifespan = target.getAttribute('data-dates') || target.getAttribute('data-lifespan') || '';
    let bio = target.getAttribute('data-bio') || '';
    let image = target.getAttribute('data-image') || '';

    if (!bio || !image) {
      if (personKey && KNOWN_HISTORICAL_FIGURES[personKey]) {
        const known = KNOWN_HISTORICAL_FIGURES[personKey];
        name = name || known.name;
        role = role !== 'Historical Figure' ? role : known.role;
        lifespan = lifespan || known.lifespan;
        bio = bio || known.bio;
        image = image || known.image;
      } else {
        let unitIndividuals = null;
        if (window.appStore?.state?.activeUnitData?.key_individuals) {
          unitIndividuals = window.appStore.state.activeUnitData.key_individuals;
        } else if (window.db && window.currentUnitId && window.db[window.currentUnitId]) {
          const u = window.db[window.currentUnitId].data || window.db[window.currentUnitId];
          unitIndividuals = u?.key_individuals || u?.biographies;
        }
        if (unitIndividuals) {
          const match = unitIndividuals.find(
            (p) =>
              (personKey && p.id === personKey) ||
              (p.name && p.name.toLowerCase() === name.toLowerCase()) ||
              (personKey && p.name && p.name.toLowerCase().includes(personKey.replace(/_/g, ' '))),
          );
          if (match) {
            name = match.name || name;
            role = match.role || role;
            lifespan = match.lifespan || lifespan;
            bio = match.bio || bio;
            image = match.image || match.img || image;
          }
        }
      }
    }

    if (!bio) {
      bio = `${name} is an influential historical figure studied in this enquiry.`;
    }

    activeFigureElement = target;
    target.classList.add('active');

    const imageHtml = image
      ? `<img src="${image}" alt="${name}" style="width: 52px; height: 52px; border-radius: 8px; object-fit: cover; border: 1.5px solid #a855f7; flex-shrink: 0; box-shadow: 0 2px 6px rgba(0,0,0,0.3);" onerror="this.style.display='none'" />`
      : `<div style="width: 52px; height: 52px; border-radius: 8px; background: rgba(168,85,247,0.2); border: 1.5px solid #a855f7; display: flex; align-items: center; justify-content: center; color: #d8b4fe; font-size: 1.3rem; flex-shrink: 0;"><i class="fa-solid fa-user"></i></div>`;

    figurePopover.innerHTML = `
      <div style="display: flex; gap: 12px; align-items: flex-start; text-align: left;">
        ${imageHtml}
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 2px;">
            <strong style="color: #f5f3ff; font-size: 0.95rem; line-height: 1.25; font-weight: 700;">${name}</strong>
            <span style="background: rgba(168, 85, 247, 0.25); color: #e9d5ff; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; padding: 2px 6px; border-radius: 6px; border: 1px solid rgba(168,85,247,0.4); white-space: nowrap;">Key Figure</span>
          </div>
          <div style="font-size: 0.74rem; color: #c084fc; margin-bottom: 5px; font-weight: 600;">${role}${lifespan ? ' · ' + lifespan : ''}</div>
          <div style="font-size: 0.82rem; color: #e2e8f0; line-height: 1.4;">${bio}</div>
        </div>
      </div>
    `;
    figurePopover.classList.add('visible');

    // Calculate position
    const rect = target.getBoundingClientRect();
    const popoverRect = figurePopover.getBoundingClientRect();

    let top = rect.top - popoverRect.height - 10;
    let left = rect.left + rect.width / 2 - popoverRect.width / 2;

    let arrowLeft = '50%';
    figurePopover.classList.remove('arrow-top');

    if (top < 10) {
      top = rect.bottom + 10;
      figurePopover.classList.add('arrow-top');
    }

    if (left < 10) {
      const overflow = 10 - left;
      left = 10;
      arrowLeft = `calc(50% - ${overflow}px)`;
    } else if (left + popoverRect.width > window.innerWidth - 10) {
      const overflow = left + popoverRect.width - (window.innerWidth - 10);
      left = window.innerWidth - 10 - popoverRect.width;
      arrowLeft = `calc(50% + ${overflow}px)`;
    }

    figurePopover.style.top = `${top}px`;
    figurePopover.style.left = `${left}px`;

    let arrowStyle = document.getElementById('figure-popover-arrow-style');
    if (!arrowStyle) {
      arrowStyle = document.createElement('style');
      arrowStyle.id = 'figure-popover-arrow-style';
      document.head.appendChild(arrowStyle);
    }
    arrowStyle.innerHTML = `#global-figure-popover::after { left: ${arrowLeft}; }`;
  };

  const hideFigurePopover = () => {
    if (figurePopover && figurePopover.classList.contains('visible')) {
      figurePopover.classList.remove('visible');
      if (activeFigureElement) {
        activeFigureElement.classList.remove('active');
        activeFigureElement = null;
      }
    }
  };

  document.body.addEventListener('mouseover', showFigurePopover);
  document.body.addEventListener('mouseout', (e) => {
    if (e.target.closest('.historical-figure')) hideFigurePopover();
  });

  document.body.addEventListener('click', (e) => {
    const target = e.target.closest('.historical-figure');
    if (target) {
      if (activeFigureElement === target) {
        hideFigurePopover();
      } else {
        hideFigurePopover();
        showFigurePopover(e);
      }
    } else {
      hideFigurePopover();
    }
  });

  window.addEventListener('scroll', hideFigurePopover, { passive: true });
  window.addEventListener('resize', hideFigurePopover, { passive: true });
}

// Auto-initialize figure popover
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHistoricalFigurePopover);
  } else {
    initHistoricalFigurePopover();
  }
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
              Meoncross School History Department &amp; The History Boys · Led jointly by <strong>Mr Ben Lovett</strong> &amp; <strong>Mr James Garrett</strong> · Accompanied by <strong>Two Meoncross Staff</strong>
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
              <p style="margin: 3px 0 0 0; font-size: 0.8rem; color: #475569; line-height: 1.35;">06:15 departure from school. Essex Farm ADS (John McCrae's bunker), Yorkshire Trench, Langemarck German Cemetery. Peace Village Hostel check-in &amp; 2-course dinner on-site.</p>
            </div>

            <div style="margin-bottom: 12px; padding: 10px; background: #f8fafc; border-radius: 6px; border-left: 3px solid #b45309;">
              <strong style="color: #0f172a; font-size: 0.85rem;">Day 2 (Fri 2 Oct): Passchendaele &amp; Menin Gate</strong>
              <p style="margin: 3px 0 0 0; font-size: 0.8rem; color: #475569; line-height: 1.35;">Vancouver Corner, Hooge Crater preserved trenches, Sanctuary Wood, supermarket lunch stop, Tyne Cot Cemetery (finding our village fallen). 2-course dinner on-site at Peace Village, followed by the solemn <strong>8:00 PM Last Post Ceremony</strong> with school wreath laying.</p>
            </div>

            <div style="margin-bottom: 12px; padding: 10px; background: #f8fafc; border-radius: 6px; border-left: 3px solid #0f766e;">
              <strong style="color: #0f172a; font-size: 0.85rem;">Day 3 (Sat 3 Oct): Ypres Town &amp; Journey Home</strong>
              <p style="margin: 3px 0 0 0; font-size: 0.8rem; color: #475569; line-height: 1.35;">In Flanders Fields Museum (Cloth Hall), Ypres Ramparts walk, supermarket lunch stop, Talbot House (Poperinge). Return to Meoncross approx. 20:30.</p>
            </div>

            <div style="background: #fefce8; border: 1px solid #fef08a; padding: 10px 12px; border-radius: 6px;">
              <strong style="color: #92400e; font-size: 0.82rem; display: block; margin-bottom: 2px;">🕊️ The Local Heritage Hook:</strong>
              <span style="font-size: 0.78rem; color: #78350f; line-height: 1.35;"><em>"How did three sons from one coastal Hampshire family answer the call across Gallipoli, Arras, and the Somme—and how did six young men from our quiet village come to rest upon the ramparts and mud of Flanders?"</em> Pupils will touch the carved names of our village fallen on Tyne Cot and Menin Gate.</span>
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
                <li><strong>Thursday Day 1:</strong> Pupils <strong>must bring a packed lunch</strong> &amp; travel snacks from home for coach/crossing.</li>
                <li><strong>Included Meals:</strong> Buffet breakfasts at hostel (Fri &amp; Sat mornings); 2-course evening group dinners on-site at Peace Village (Thu &amp; Fri).</li>
                <li><strong>Days 2 &amp; 3 Lunches:</strong> Supermarket packed lunch stops in Belgium.</li>
              </ul>
            </div>

            <div style="margin-bottom: 14px; background: #fffbeb; border: 1px solid #fde68a; padding: 10px 12px; border-radius: 6px;">
              <strong style="color: #92400e; font-size: 0.88rem; display: block; margin-bottom: 4px;">💶 Spending Money (€30–€40 Euros Cash):</strong>
              <p style="margin: 0; font-size: 0.82rem; color: #78350f; line-height: 1.4;">
                Pupils require <strong>€30 to €40 in cash (Euros)</strong>. Covers fresh supermarket lunches on Friday and Saturday, plus Belgian chocolates or small souvenirs.
              </p>
            </div>

            <div>
              <strong style="color: #0f172a; font-size: 0.88rem; display: block; margin-bottom: 4px;">🏨 Peace Village Hostel &amp; Rooming:</strong>
              <p style="margin: 0 0 6px 0; font-size: 0.82rem; color: #334155; line-height: 1.4;">
                Rural educational centre in Heuvelland with secure keycards and en-suite rooms (typically 4–7 pupils with bunk beds).
              </p>
              <div style="background: #f1f5f9; border-left: 3px solid #0284c7; padding: 8px 10px; border-radius: 4px; font-size: 0.78rem; color: #0369a1; line-height: 1.35;">
                <strong>Rooming &amp; Dietary Timeline:</strong> Friend preference requests and dietary requirements (e.g. vegetarian evening meals) gathered in school in approx. <strong>two weeks' time</strong> (medical allergies already on record).
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
              <strong style="color: #0f172a; font-size: 0.88rem; display: block; margin-bottom: 4px;">🥾 Practical Clothing &amp; Kit:</strong>
              <ul style="margin: 0; padding-left: 16px; font-size: 0.82rem; color: #334155; line-height: 1.4;">
                <li><strong>Sturdy Walking Boots:</strong> Waterproof &amp; broken-in. Ground and duckboards can be slippery.</li>
                <li><strong>Waterproof Raincoat:</strong> Windproof with hood.</li>
                <li><strong>Warm Hat &amp; Gloves:</strong> Mandatory for standing at 8pm Menin Gate ceremony.</li>
                <li><strong>Casual Clothes:</strong> Comfortable clothing for hostel downtime (no formal dress needed).</li>
              </ul>
            </div>

            <div style="margin-bottom: 14px;">
              <strong style="color: #0f172a; font-size: 0.88rem; display: block; margin-bottom: 4px;">📄 Travel Documents &amp; Mobiles:</strong>
              <ul style="margin: 0; padding-left: 16px; font-size: 0.82rem; color: #334155; line-height: 1.4;">
                <li><strong>Passports &amp; GHIC/EHIC:</strong> Collected in advance tonight at briefing (or this week).</li>
                <li><strong>European 2-Pin Adapter:</strong> For charging devices.</li>
                <li><strong>Mobile Phone Bag:</strong> Handed in each evening at curfew/bedtime for a restful night.</li>
              </ul>
            </div>

            <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 10px 12px; border-radius: 6px;">
              <strong style="color: #991b1b; font-size: 0.82rem; display: block; margin-bottom: 2px;">⚠️ Action Checklist:</strong>
              <span style="font-size: 0.78rem; color: #7f1d1d; line-height: 1.35;">Return signed <strong>Code of Conduct Agreement Form</strong> by <strong>Friday 25th September</strong>. Ensure passport &amp; GHIC are handed in.</span>
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

window.openTeacherPrintPreview = function (fileBaseName, title, pdfUrl) {
  let htmlUrl = fileBaseName;
  if (!htmlUrl.startsWith('/') && !htmlUrl.startsWith('http')) {
    if (fileBaseName.includes('mastery')) {
      const normalized = fileBaseName.replace('cme_mastery_pack_', 'cme_mastery_');
      htmlUrl = `/units/cme_new/booklets/${normalized}.html`;
    } else {
      htmlUrl = `/units/cme_new/printables/${fileBaseName}.html`;
    }
  }

  if (!pdfUrl) {
    const pdfBase = fileBaseName
      .replace('/units/cme_new/booklets/', '')
      .replace('.html', '')
      .replace('cme_mastery_', 'cme_mastery_pack_');
    pdfUrl = `/pdfs/cme_new/${pdfBase}.pdf`;
  }

  // Remove existing modal if any
  const existing = document.getElementById('teacherPrintPreviewModal');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'teacherPrintPreviewModal';
  overlay.className = 'modal-overlay no-print';
  overlay.style.cssText =
    'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(8px); z-index: 99999; display: flex; justify-content: center; align-items: center; opacity: 0; transition: opacity 0.25s ease;';

  overlay.innerHTML = `
    <div class="modal-content" style="background: #0f172a; border: 1px solid #334155; border-radius: 12px; width: 94vw; max-width: 1350px; height: 92vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7); transform: scale(0.97); transition: transform 0.25s ease; font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;">
      
      <!-- Modal Header -->
      <div style="background: #1e293b; border-bottom: 1px solid #334155; padding: 14px 22px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="width: 38px; height: 38px; border-radius: 8px; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 1.15rem; box-shadow: 0 2px 8px rgba(2,132,199,0.35);">
            <i class="fa-solid fa-print"></i>
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; background: rgba(14, 165, 233, 0.2); color: #38bdf8; padding: 2px 8px; border-radius: 4px; border: 1px solid rgba(56, 189, 248, 0.3);">Teacher Planning Hub</span>
              <span style="font-size: 0.7rem; font-weight: 600; color: #94a3b8;">Classroom Set Print Preview</span>
            </div>
            <h3 style="margin: 2px 0 0 0; color: #f8fafc; font-size: 1.25rem; font-weight: 700; letter-spacing: -0.01em;">${title || 'Classroom Print Preview'}</h3>
          </div>
        </div>

        <!-- Action Controls -->
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <button id="teacherPrintModalTrigger" style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #ffffff; border: none; font-weight: 700; font-size: 0.9rem; padding: 9px 18px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 14px rgba(37,99,235,0.4); transition: all 0.2s ease;">
            <i class="fa-solid fa-print"></i> Print Class Set
          </button>
          
          <a href="${pdfUrl}" target="_blank" download style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3); font-weight: 600; font-size: 0.88rem; padding: 8px 14px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s ease;">
            <i class="fa-solid fa-file-pdf"></i> High-Res PDF
          </a>

          <a href="${htmlUrl}" target="_blank" style="background: rgba(255, 255, 255, 0.08); color: #e2e8f0; border: 1px solid rgba(255, 255, 255, 0.15); font-weight: 600; font-size: 0.88rem; padding: 8px 14px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s ease;">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Full Tab
          </a>

          <button id="teacherPrintModalClose" style="background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.1); color: #94a3b8; font-size: 1.1rem; width: 36px; height: 36px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease;">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      <!-- Iframe Container with Loading Indicator -->
      <div style="flex: 1; position: relative; background: #334155; overflow: hidden; display: flex; align-items: center; justify-content: center;">
        <div id="teacherIframeLoader" style="position: absolute; display: flex; flex-direction: column; align-items: center; gap: 12px; color: #94a3b8; font-size: 0.95rem; z-index: 1;">
          <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 2rem; color: #38bdf8;"></i>
          <span>Rendering high-fidelity print layout...</span>
        </div>
        <iframe id="teacherPreviewIframe" src="${htmlUrl}" style="width: 100%; height: 100%; border: none; background: #ffffff; position: relative; z-index: 2; opacity: 0; transition: opacity 0.2s ease;"></iframe>
      </div>

      <!-- Footer Bar with Teacher Print Instructions -->
      <div style="background: #1e293b; border-top: 1px solid #334155; padding: 10px 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; font-size: 0.82rem; color: #94a3b8;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-lightbulb" style="color: #facc15;"></i>
          <span><strong>Teacher Tip:</strong> The print stylesheet automatically handles page sizing (A3 Landscape for Placemats, A4 Portrait for Workouts, A4 Landscape for Trifolds). Ensure <em>"Background graphics"</em> is checked in your browser's print dialog.</span>
        </div>
        <div style="color: #64748b; font-size: 0.78rem;">
          Press <kbd style="background: #334155; color: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace;">Esc</kbd> to close
        </div>
      </div>

    </div>
  `;

  document.body.appendChild(overlay);

  const iframe = overlay.querySelector('#teacherPreviewIframe');
  const loader = overlay.querySelector('#teacherIframeLoader');
  const modalContent = overlay.querySelector('.modal-content');

  iframe.onload = () => {
    iframe.style.opacity = '1';
    if (loader) loader.style.display = 'none';
  };

  const closeModal = () => {
    window.removeEventListener('keydown', handleKeyDown);
    overlay.style.opacity = '0';
    modalContent.style.transform = 'scale(0.97)';
    setTimeout(() => overlay.remove(), 250);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeModal();
  };
  window.addEventListener('keydown', handleKeyDown);

  const closeBtn = overlay.querySelector('#teacherPrintModalClose');
  if (closeBtn) closeBtn.onclick = closeModal;

  overlay.onclick = (e) => {
    if (e.target === overlay) closeModal();
  };

  const printBtn = overlay.querySelector('#teacherPrintModalTrigger');
  if (printBtn) {
    printBtn.onclick = () => {
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      }
    };
  }

  // Animate in
  void overlay.offsetWidth;
  overlay.style.opacity = '1';
  modalContent.style.transform = 'scale(1)';
};

/**
 * ============================================================================
 * Emergency Cover Generator Modal (Teacher Planning Hub)
 * Allows the teacher to instantly generate a 1-period or 2-period cover plan
 * with scannable QR codes, exact workbook page references or paper-only tasks,
 * printable A4 sheet, and one-click copy text for email/VLE.
 * ============================================================================
 */
window.openEmergencyCoverModal = async function (initialUnitId, initialUnitData) {
  const existing = document.getElementById('emergencyCoverModal');
  if (existing) existing.remove();

  // Fetch or retrieve database
  let db = window.cachedDatabase;
  if (!db) {
    try {
      const res = await fetch('/database.json');
      db = await res.json();
      window.cachedDatabase = db;
    } catch (e) {
      console.warn('Could not fetch database.json, fallback to activeUnitData:', e);
      db = {};
    }
  }

  const unitGroups = [
    {
      label: 'Year 7 (Key Stage 3)',
      units: [
        {
          id: 'water_and_sanitation',
          name: 'Water & Sanitation Through Time',
          year: 'Year 7',
          spec: 'KS3 Thematic Enquiry',
        },
        {
          id: 'medieval_england',
          name: 'Medieval England & The Struggle for Power (1066–1485)',
          year: 'Year 7',
          spec: 'KS3 History',
        },
      ],
    },
    {
      label: 'Year 8 (Key Stage 3)',
      units: [
        {
          id: 'early_modern_world',
          name: 'The Early Modern World & Global Encounters (1450–1750)',
          year: 'Year 8',
          spec: 'KS3 History',
        },
        {
          id: 'industrialisation_and_empire',
          name: 'Industrialisation, Empire & Power (1750–1900)',
          year: 'Year 8',
          spec: 'KS3 History',
        },
        {
          id: 'australia',
          name: 'History of Australia & First Nations',
          year: 'Year 8',
          spec: 'KS3 History',
        },
      ],
    },
    {
      label: 'Year 9 (Key Stage 3)',
      units: [
        {
          id: 'great_war',
          name: 'Causes of the Great War (1914–1916)',
          year: 'Year 9',
          spec: 'KS3 History',
        },
        {
          id: 'great_war_part2',
          name: 'The Great War (1917–1919)',
          year: 'Year 9',
          spec: 'KS3 History',
        },
        {
          id: 'the_shoah',
          name: 'The Shoah (Holocaust Education)',
          year: 'Year 9',
          spec: 'KS3 Enquiry',
        },
        { id: 'cold_war', name: 'The Cold War (1945–1991)', year: 'Year 9', spec: 'KS3 History' },
        {
          id: 'post_war_britain',
          name: 'Rights, Protest & Post-War Britain (1900–Present)',
          year: 'Year 9',
          spec: 'KS3 History',
        },
      ],
    },
    {
      label: 'Year 10 (Edexcel GCSE)',
      units: [
        {
          id: 'cme_new',
          name: 'Conflict in the Middle East (1915–1949)',
          year: 'Year 10',
          spec: 'Edexcel GCSE Paper 2',
        },
        {
          id: 'weimar_nazi_germany',
          name: 'Weimar & Nazi Germany (1918–1939)',
          year: 'Year 10',
          spec: 'Edexcel GCSE Paper 3',
        },
      ],
    },
    {
      label: 'Year 11 (Edexcel GCSE)',
      units: [
        {
          id: 'edexcel_medicine',
          name: 'Medicine Through Time (c1250–present)',
          year: 'Year 11',
          spec: 'Edexcel GCSE Paper 1',
        },
        {
          id: 'eee',
          name: 'Early Elizabethan England (1558–1588)',
          year: 'Year 11',
          spec: 'Edexcel GCSE Paper 2',
        },
        {
          id: 'usa',
          name: 'The USA: Conflict at Home & Abroad (1954–1975)',
          year: 'Year 11',
          spec: 'Edexcel GCSE Paper 3',
        },
      ],
    },
    {
      label: 'Battlefield Tour',
      units: [
        {
          id: 'trip_ypres',
          name: 'Battlefield Tour: Ypres & The Somme',
          year: 'Field Trip',
          spec: 'Digital Educational Tour',
        },
      ],
    },
  ];

  const availableUnits = unitGroups.flatMap((g) => g.units);

  let currentUnitId =
    initialUnitId || (state && state.selectedUnitId) || window.currentUnitId || 'cme_new';
  if (!availableUnits.some((u) => u.id === currentUnitId)) {
    currentUnitId = 'cme_new';
  }

  let periodType = 'double'; // 'single' or 'double'
  let resourceMode = currentUnitId === 'cme_new' ? 'paper' : 'workbooks'; // 'workbooks' or 'paper'
  let lesson1Idx = 0;
  let lesson2Idx = 1;
  let supervisorNotes = 'Pupils should sit in their normal seating plan. Silent independent work.';
  let activeTab = 'preview'; // 'preview' or 'text'

  const getUnitData = (uId) => {
    if (uId === (state && state.selectedUnitId) && initialUnitData && initialUnitData.lessons) {
      return initialUnitData;
    }
    if (db && db[uId] && db[uId].data) {
      return db[uId].data;
    }
    if (db && db[uId] && db[uId].lessons) {
      return db[uId];
    }
    return { title: 'History Unit', lessons: [] };
  };

  const overlay = document.createElement('div');
  overlay.id = 'emergencyCoverModal';
  overlay.className = 'modal-overlay no-print';
  overlay.style.cssText =
    'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.88); backdrop-filter: blur(8px); z-index: 99999; display: flex; justify-content: center; align-items: center; opacity: 0; transition: opacity 0.22s ease; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;';

  overlay.innerHTML = `
    <div class="modal-content" style="background: #0f172a; border: 1px solid #334155; border-radius: 12px; width: 95vw; max-width: 1400px; height: 93vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.85); transform: scale(0.98); transition: transform 0.22s ease;">
      
      <!-- Top Modal Header -->
      <div style="background: #1e293b; border-bottom: 1px solid #334155; padding: 12px 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 38px; height: 38px; border-radius: 8px; background: linear-gradient(135deg, #e11d48 0%, #be123c 100%); display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 1.15rem; box-shadow: 0 2px 10px rgba(225,29,72,0.4);">
            <i class="fa-solid fa-truck-medical"></i>
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; background: rgba(225, 29, 72, 0.2); color: #fb7185; padding: 2px 8px; border-radius: 4px; border: 1px solid rgba(225, 29, 72, 0.3);">Teacher Planning Hub</span>
              <span style="font-size: 0.72rem; font-weight: 600; color: #94a3b8;">Emergency Cover Engine</span>
            </div>
            <h3 style="margin: 2px 0 0 0; color: #f8fafc; font-size: 1.2rem; font-weight: 700; letter-spacing: -0.01em;">Automated Cover Lesson Generator</h3>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <button id="coverTabPreviewBtn" style="background: #334155; color: #ffffff; border: 1px solid #475569; font-weight: 700; font-size: 0.85rem; padding: 7px 14px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s ease;">
            <i class="fa-solid fa-file-lines"></i> Sheet Preview
          </button>
          <button id="coverTabTextBtn" style="background: transparent; color: #94a3b8; border: 1px solid transparent; font-weight: 600; font-size: 0.85rem; padding: 7px 14px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s ease;">
            <i class="fa-solid fa-envelope"></i> Email / VLE Text
          </button>
          <div style="width: 1px; height: 24px; background: #334155; margin: 0 4px;"></div>
          <button id="coverCopyVleBtn" style="background: linear-gradient(135deg, #059669 0%, #047857 100%); color: #ffffff; border: none; font-weight: 700; font-size: 0.88rem; padding: 8px 16px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 2px 10px rgba(5,150,105,0.3); transition: all 0.2s ease;">
            <i class="fa-solid fa-copy"></i> Copy Email / VLE Text
          </button>
          <button id="coverPrintTriggerBtn" style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #ffffff; border: none; font-weight: 700; font-size: 0.88rem; padding: 8px 16px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 2px 10px rgba(37,99,235,0.35); transition: all 0.2s ease;">
            <i class="fa-solid fa-print"></i> Print / Save PDF
          </button>
          <button id="coverCloseBtn" style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.12); color: #94a3b8; font-size: 1.1rem; width: 34px; height: 34px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease;">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      <!-- Main Body: Split Settings and Preview -->
      <div style="flex: 1; display: flex; overflow: hidden; background: #0b1329;">
        
        <!-- Left Sidebar: Controls -->
        <div style="width: 360px; min-width: 320px; background: #111c35; border-right: 1px solid #1e293b; padding: 18px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px;">
          
          <!-- Unit Selector -->
          <div>
            <label style="display: block; font-size: 0.76rem; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em; margin-bottom: 6px;">
              <i class="fa-solid fa-book" style="color: #38bdf8; margin-right: 5px;"></i> Teaching Unit
            </label>
            <select id="coverUnitSelect" style="width: 100%; background: #1e293b; border: 1px solid #334155; border-radius: 6px; color: #f8fafc; padding: 8px 10px; font-size: 0.88rem; outline: none; cursor: pointer;">
              ${unitGroups
                .map(
                  (g) => `
                <optgroup label="${g.label}">
                  ${g.units.map((u) => `<option value="${u.id}" ${u.id === currentUnitId ? 'selected' : ''}>${u.name}</option>`).join('')}
                </optgroup>
              `,
                )
                .join('')}
            </select>
          </div>

          <!-- Period Format Toggle -->
          <div>
            <label style="display: block; font-size: 0.76rem; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em; margin-bottom: 6px;">
              <i class="fa-solid fa-clock" style="color: #f59e0b; margin-right: 5px;"></i> Duration / Periods
            </label>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <button id="coverBtnPeriodSingle" type="button" style="background: #1e293b; color: #94a3b8; border: 1px solid #334155; padding: 8px 10px; border-radius: 6px; font-size: 0.82rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
                <i class="fa-regular fa-clock"></i> Single (55m)
              </button>
              <button id="coverBtnPeriodDouble" type="button" style="background: rgba(225, 29, 72, 0.2); color: #fb7185; border: 1px solid #e11d48; padding: 8px 10px; border-radius: 6px; font-size: 0.82rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
                <i class="fa-solid fa-hourglass-half"></i> Double (110m)
              </button>
            </div>
          </div>

          <!-- Lesson Pickers -->
          <div id="coverLessonSelectorsContainer" style="display: flex; flex-direction: column; gap: 12px;">
            <div>
              <label style="display: block; font-size: 0.76rem; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em; margin-bottom: 6px;">
                <span id="coverLesson1Label">Period 1 Lesson:</span>
              </label>
              <select id="coverLesson1Select" style="width: 100%; background: #1e293b; border: 1px solid #334155; border-radius: 6px; color: #f8fafc; padding: 8px 10px; font-size: 0.84rem; outline: none; cursor: pointer;"></select>
            </div>

            <div id="coverLesson2Wrapper">
              <label style="display: block; font-size: 0.76rem; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em; margin-bottom: 6px;">
                Period 2 Lesson:
              </label>
              <select id="coverLesson2Select" style="width: 100%; background: #1e293b; border: 1px solid #334155; border-radius: 6px; color: #f8fafc; padding: 8px 10px; font-size: 0.84rem; outline: none; cursor: pointer;"></select>
            </div>
          </div>

          <!-- Resource Setting Mode -->
          <div>
            <label style="display: block; font-size: 0.76rem; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em; margin-bottom: 6px;">
              <i class="fa-solid fa-boxes-stacked" style="color: #10b981; margin-right: 5px;"></i> Classroom Setting Mode
            </label>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div id="coverModeWorkbooks" style="background: ${resourceMode === 'workbooks' ? 'rgba(16, 185, 129, 0.15)' : '#1e293b'}; border: 1px solid ${resourceMode === 'workbooks' ? '#10b981' : '#334155'}; border-radius: 6px; padding: 10px; cursor: pointer;">
                <div style="display: flex; align-items: center; gap: 8px; font-size: 0.84rem; font-weight: 700; color: ${resourceMode === 'workbooks' ? '#34d399' : '#e2e8f0'};">
                  <i class="fa-solid fa-book-open"></i> Printed Physical Workbooks
                </div>
                <div style="font-size: 0.74rem; color: #94a3b8; margin-top: 3px; line-height: 1.3;">
                  Pupils have their printed physical course booklets in class. Exact page numbers will be referenced.
                </div>
              </div>

              <div id="coverModePaper" style="background: ${resourceMode === 'paper' ? 'rgba(245, 158, 11, 0.15)' : '#1e293b'}; border: 1px solid ${resourceMode === 'paper' ? '#f59e0b' : '#334155'}; border-radius: 6px; padding: 10px; cursor: pointer;">
                <div style="display: flex; align-items: center; gap: 8px; font-size: 0.84rem; font-weight: 700; color: ${resourceMode === 'paper' ? '#fbbf24' : '#e2e8f0'};">
                  <i class="fa-regular fa-file"></i> Paper Only (No Workbooks in School)
                </div>
                <div style="font-size: 0.74rem; color: #94a3b8; margin-top: 3px; line-height: 1.3;">
                  Pupils use blank/lined A4 paper. Generates structured dual-perspective maps, flowcharts, or timelines.
                </div>
              </div>
            </div>
          </div>

          <!-- Supervisor Custom Notes -->
          <div>
            <label style="display: block; font-size: 0.76rem; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em; margin-bottom: 6px;">
              <i class="fa-solid fa-pencil" style="color: #cbd5e1; margin-right: 5px;"></i> Supervisor Instructions / Room
            </label>
            <textarea id="coverSupervisorInput" rows="2" style="width: 100%; background: #1e293b; border: 1px solid #334155; border-radius: 6px; color: #f8fafc; padding: 8px; font-size: 0.82rem; outline: none; resize: vertical;">${supervisorNotes}</textarea>
          </div>

          <!-- Info Box -->
          <div style="background: rgba(2, 132, 199, 0.1); border-left: 3px solid #0284c7; padding: 8px 10px; border-radius: 0 4px 4px 0; font-size: 0.74rem; color: #bae6fd; line-height: 1.35;">
            <strong>💡 Zero-Friction:</strong> Pupils do NOT need logins. Links and QR codes open directly in browser on any device.
          </div>

        </div>

        <!-- Right Main: Preview or Text -->
        <div style="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #334155; position: relative;">
          
          <!-- Sheet Preview View -->
          <div id="coverPreviewContainer" style="flex: 1; overflow-y: auto; padding: 25px; display: flex; justify-content: center; background: #475569;">
            <div id="coverPaperSheet" style="background: #ffffff; width: 210mm; min-height: 297mm; padding: 10mm 14mm; box-shadow: 0 10px 30px rgba(0,0,0,0.3); border-radius: 2px; color: #1e293b; font-size: 8.8pt; line-height: 1.32; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <!-- Dynamic Sheet Content Injected Here -->
            </div>
          </div>

          <!-- Plain Text View -->
          <div id="coverTextContainer" style="flex: 1; overflow-y: auto; padding: 25px; display: none; background: #0f172a;">
            <div style="max-width: 850px; margin: 0 auto; display: flex; flex-direction: column; gap: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.85rem; font-weight: 700; color: #94a3b8; text-transform: uppercase;">
                  Formatted for Outlook, Gmail, or Google Classroom:
                </span>
                <button id="coverCopyTextInnerBtn" style="background: #059669; color: white; border: none; padding: 6px 14px; border-radius: 4px; font-size: 0.82rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px;">
                  <i class="fa-solid fa-copy"></i> Copy Text
                </button>
              </div>
              <textarea id="coverPlainTextArea" readonly style="width: 100%; height: 70vh; background: #1e293b; border: 1px solid #334155; border-radius: 6px; color: #f1f5f9; padding: 14px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 0.82rem; line-height: 1.5; resize: none;"></textarea>
            </div>
          </div>

        </div>

      </div>

    </div>
  `;

  document.body.appendChild(overlay);

  // References
  const unitSelect = overlay.querySelector('#coverUnitSelect');
  const btnPeriodSingle = overlay.querySelector('#coverBtnPeriodSingle');
  const btnPeriodDouble = overlay.querySelector('#coverBtnPeriodDouble');
  const lesson1Select = overlay.querySelector('#coverLesson1Select');
  const lesson2Select = overlay.querySelector('#coverLesson2Select');
  const lesson2Wrapper = overlay.querySelector('#coverLesson2Wrapper');
  const modeWorkbooks = overlay.querySelector('#coverModeWorkbooks');
  const modePaper = overlay.querySelector('#coverModePaper');
  const supervisorInput = overlay.querySelector('#coverSupervisorInput');
  const tabPreviewBtn = overlay.querySelector('#coverTabPreviewBtn');
  const tabTextBtn = overlay.querySelector('#coverTabTextBtn');
  const previewContainer = overlay.querySelector('#coverPreviewContainer');
  const textContainer = overlay.querySelector('#coverTextContainer');
  const paperSheet = overlay.querySelector('#coverPaperSheet');
  const plainTextArea = overlay.querySelector('#coverPlainTextArea');
  const copyBtn = overlay.querySelector('#coverCopyVleBtn');
  const copyInnerBtn = overlay.querySelector('#coverCopyTextInnerBtn');
  const printBtn = overlay.querySelector('#coverPrintTriggerBtn');
  const closeBtn = overlay.querySelector('#coverCloseBtn');
  const modalContent = overlay.querySelector('.modal-content');

  // Populate lessons for current unit
  const populateLessons = () => {
    const uData = getUnitData(currentUnitId);
    const lessons = uData.lessons || [];

    lesson1Select.innerHTML = '';
    lesson2Select.innerHTML = '';

    if (lessons.length === 0) {
      lesson1Select.innerHTML = '<option value="0">Lesson 1 (General Overview)</option>';
      lesson2Select.innerHTML = '<option value="0">Lesson 2 (Application & Review)</option>';
      return;
    }

    lessons.forEach((l, idx) => {
      const opt1 = document.createElement('option');
      opt1.value = idx;
      opt1.textContent = `${idx + 1}. ${l.title || 'Lesson ' + (idx + 1)}`;
      if (idx === lesson1Idx) opt1.selected = true;
      lesson1Select.appendChild(opt1);

      const opt2 = document.createElement('option');
      opt2.value = idx;
      opt2.textContent = `${idx + 1}. ${l.title || 'Lesson ' + (idx + 1)}`;
      if (idx === lesson2Idx) opt2.selected = true;
      lesson2Select.appendChild(opt2);
    });

    if (lesson1Idx >= lessons.length) lesson1Idx = 0;
    if (lesson2Idx >= lessons.length) lesson2Idx = Math.min(1, lessons.length - 1);
  };

  // Helper to map page numbers for workbooks
  const getPageReferences = (uId, lessonIdx) => {
    if (uId === 'edexcel_medicine') {
      if (lessonIdx === 0)
        return { wb: 'Pages 3–6', tb: 'Pages 3–7', doNow: 'Page 3', vocab: 'Page 4' };
      if (lessonIdx === 1)
        return { wb: 'Pages 18–21', tb: 'Pages 8–11', doNow: 'Page 18', vocab: 'Page 19' };
      if (lessonIdx === 2)
        return { wb: 'Pages 33–37', tb: 'Pages 12–15', doNow: 'Page 33', vocab: 'Page 34' };
      const wbStart = 3 + lessonIdx * 15;
      const tbStart = 3 + lessonIdx * 5;
      return {
        wb: `Pages ${wbStart}–${wbStart + 3}`,
        tb: `Pages ${tbStart}–${tbStart + 4}`,
        doNow: `Page ${wbStart}`,
        vocab: `Page ${wbStart + 1}`,
      };
    }
    const wbStart = 3 + lessonIdx * 8;
    return {
      wb: `Pages ${wbStart}–${wbStart + 3}`,
      tb: `Pages ${3 + lessonIdx * 4}–${6 + lessonIdx * 4}`,
      doNow: `Page ${wbStart}`,
      vocab: `Page ${wbStart + 1}`,
    };
  };

  // Render Cover HTML and Plain Text
  const updateCover = () => {
    const uData = getUnitData(currentUnitId);
    const unitMeta = availableUnits.find((u) => u.id === currentUnitId) || {
      name: uData.title || currentUnitId,
      year: 'Year 10/11',
      spec: 'Edexcel GCSE',
    };
    const lessons = uData.lessons || [];

    const l1 = lessons[lesson1Idx] || { id: 'lesson_1', title: 'Lesson 1' };
    const l2 = lessons[lesson2Idx] || { id: 'lesson_2', title: 'Lesson 2' };

    const l1Url = `https://meoncross-history.netlify.app/?view=lessons&unit=${currentUnitId}&lesson=${l1.id || 'lesson_' + (lesson1Idx + 1)}`;
    const l2Url = `https://meoncross-history.netlify.app/?view=lessons&unit=${currentUnitId}&lesson=${l2.id || 'lesson_' + (lesson2Idx + 1)}`;

    const l1Qr = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&margin=2&data=${encodeURIComponent(l1Url)}`;
    const l2Qr = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&margin=2&data=${encodeURIComponent(l2Url)}`;

    const p1Refs = getPageReferences(currentUnitId, lesson1Idx);
    const p2Refs = getPageReferences(currentUnitId, lesson2Idx);

    // Build Sheet HTML
    let sheetHtml = `
      <!-- ==================== PERIOD 1 ==================== -->
      <div style="border-bottom: 2px solid #881337; padding-bottom: 5px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center;">
        <div style="flex: 1;">
          <span style="display: inline-block; background: #881337; color: white; font-size: 6.8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; padding: 2px 7px; border-radius: 4px; margin-bottom: 2px;">
            Mr Lovett's History Hub • ${unitMeta.spec} (${unitMeta.year})
          </span>
          <h1 style="font-size: 13pt; margin: 0 0 2px 0; color: #0f172a; font-weight: 800; line-height: 1.2;">
            ${uData.title || unitMeta.name}
          </h1>
          <div style="font-size: 8.5pt; color: #475569; font-weight: 600; margin-bottom: 3px;">
            Period 1 Cover Task • ${l1.title}
          </div>
          <div style="font-size: 7.4pt; color: #881337; background: #fff1f2; padding: 2px 7px; border-radius: 4px; border: 1px solid #fecdd3; display: inline-block;">
            🌐 <strong>Digital App Link:</strong> <a href="${l1Url}" target="_blank" style="color: #be123c; text-decoration: underline; font-weight: 700;">${l1Url}</a>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; text-align: center; background: #fff1f2; border: 1px solid #fecdd3; border-radius: 6px; padding: 3px 6px; margin-left: 10px;">
          <img src="${l1Qr}" alt="QR" style="width: 48px; height: 48px; display: block;">
          <span style="font-size: 5.6pt; font-weight: 700; color: #881337; margin-top: 1px;">LAPTOP CAM QR</span>
        </div>
      </div>

      <div style="background: #fff7ed; border-left: 3.5px solid #ea580c; padding: 4px 8px; border-radius: 0 4px 4px 0; margin-bottom: 6px; font-size: 8pt; line-height: 1.35;">
        <strong>📋 CLASS INSTRUCTIONS (Period 1):</strong> 
        ${
          resourceMode === 'workbooks'
            ? `You have your <strong>printed Course Textbook (${p1Refs.tb})</strong> and <strong>printed Pupil Workbook (${p1Refs.wb})</strong>. Complete all workbook activities in neat pen. Access the digital app for interactive flashcards and visual sources.`
            : `You will complete your tasks on <strong>1 blank sheet of A4 paper</strong>. Use your laptop/tablet to access the core narrative and visual sources at the link/QR above.`
        }
        ${supervisorNotes ? `<br><em>Note: ${supervisorNotes}</em>` : ''}
      </div>

      <div style="font-size: 9.2pt; font-weight: 800; color: #881337; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 2px; margin: 4px 0 5px 0; display: flex; align-items: center; gap: 6px;">
        <span style="background: #be123c; color: white; font-size: 6.6pt; font-weight: 700; padding: 1px 5px; border-radius: 3px; text-transform: uppercase;">Period 1</span>
        <span>${l1.title}</span>
      </div>

      <!-- Period 1 Tasks -->
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 5px; padding: 6px 9px; margin-bottom: 6px;">
        <div style="font-weight: 700; color: #0f172a; font-size: 8.5pt; margin-bottom: 3px; display: flex; justify-content: space-between;">
          <span>Task 1: Retrieval Starter & Vocabulary</span>
          <span style="font-size: 6.8pt; font-weight: 700; background: #e2e8f0; color: #334155; padding: 1px 5px; border-radius: 3px;">
            ${resourceMode === 'workbooks' ? 'Workbook: ' + p1Refs.doNow : 'Blank Paper'}
          </span>
        </div>
        <ol style="margin: 2px 0 3px 16px; padding: 0; font-size: 8.2pt;">
          ${
            resourceMode === 'workbooks'
              ? `<li><strong>Do Now Recall:</strong> Turn to <strong>${p1Refs.doNow}</strong> in your workbook. Complete the 10 retrieval questions testing recall from previous lessons.</li>
               <li><strong>Key Vocabulary:</strong> On <strong>${p1Refs.vocab}</strong>, complete the vocabulary activity (fill-in-the-blank summary or term mapping).</li>`
              : `<li><strong>Recall Starter (5 mins):</strong> Open the digital lesson. Answer the 5 quick recall starter questions at the top of the blank sheet.</li>
               <li><strong>Key Terms:</strong> Define 3 essential historical concepts from today's enquiry in full sentences.</li>`
          }
        </ol>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 5px; padding: 6px 9px; margin-bottom: 6px;">
        <div style="font-weight: 700; color: #0f172a; font-size: 8.5pt; margin-bottom: 3px; display: flex; justify-content: space-between;">
          <span>Task 2: Core Historical Narrative Reading</span>
          <span style="font-size: 6.8pt; font-weight: 700; background: #e2e8f0; color: #334155; padding: 1px 5px; border-radius: 3px;">
            ${resourceMode === 'workbooks' ? 'Textbook: ' + p1Refs.tb : 'Digital App Narrative'}
          </span>
        </div>
        <p style="margin: 1px 0 3px 0; font-size: 8pt; color: #334155;">
          ${
            resourceMode === 'workbooks'
              ? `Read through <strong>${p1Refs.tb}</strong> in your textbook or read the <strong>Core Historical Narrative</strong> on the app.`
              : `Read through the <strong>Core Historical Narrative</strong> on your screen, examining the contemporary sources and maps.`
          }
        </p>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 5px; padding: 6px 9px; margin-bottom: 6px;">
        <div style="font-weight: 700; color: #0f172a; font-size: 8.5pt; margin-bottom: 3px; display: flex; justify-content: space-between;">
          <span>Task 3: Deep Application Enquiry</span>
          <span style="font-size: 6.8pt; font-weight: 700; background: #e2e8f0; color: #334155; padding: 1px 5px; border-radius: 3px;">
            ${resourceMode === 'workbooks' ? 'Workbook: ' + p1Refs.wb : 'A4 Blank Paper Task'}
          </span>
        </div>
        ${
          resourceMode === 'workbooks'
            ? `<ol style="margin: 2px 0 3px 16px; padding: 0; font-size: 8.2pt;">
              <li>Complete the structured enquiry comprehension tasks in your workbook on <strong>${p1Refs.wb}</strong>.</li>
              <li>Ensure all sentences are written in academic historical prose with precise names, dates, and factors.</li>
            </ol>`
            : `<p style="margin: 1px 0 3px 0; font-size: 8pt;">
              ${
                currentUnitId === 'cme_new'
                  ? `<strong>Dual-Perspective Strategic Map Activity:</strong> Sketch the outline of Mandate Palestine. Clearly shade the proposed Jewish state vs Arab state under the 1947 UN Partition Plan (Resolution 181). Around the margins, annotate 3 reasons why Jewish leaders accepted the plan and 3 reasons why Arab leaders rejected it.`
                  : `<strong>Analytical Concept Matrix:</strong> Divide your blank paper into two columns comparing the core competing historical factors (e.g. Supernatural vs Rational, or Change vs Continuity). Annotate 4 specific pieces of historical evidence in each column.`
              }
            </p>`
        }
      </div>

      <div style="background: #fff1f2; border: 1px solid #fecdd3; border-radius: 5px; padding: 6px 9px; margin-bottom: 0;">
        <div style="font-weight: 700; color: #881337; font-size: 8.5pt; margin-bottom: 2px; display: flex; justify-content: space-between;">
          <span>Task 4: Interactive Quizzing & Plenary Check</span>
          <span style="font-size: 6.8pt; font-weight: 700; background: #be123c; color: white; padding: 1px 5px; border-radius: 3px;">Digital App</span>
        </div>
        <p style="margin: 0; font-size: 7.8pt; color: #4c0519;">
          Open the <strong>Interactive Quiz Zone</strong> on the lesson app page. Complete the quick-fire questions to check your mastery before Period 2!
        </p>
      </div>

      <div style="margin-top: 8px; padding-top: 3px; border-top: 1px solid #e2e8f0; font-size: 6.8pt; color: #64748b; display: flex; justify-content: space-between;">
        <span>Meoncross History • Mr Lovett</span>
        <span>${periodType === 'double' ? 'Period 1 Complete — See Next Page for Period 2' : 'Ensure all work is kept safe for review next lesson.'}</span>
      </div>
    `;

    if (periodType === 'double') {
      sheetHtml += `
        <!-- ==================== PERIOD 2 (PAGE BREAK) ==================== -->
        <div style="page-break-before: always; break-before: page; margin-top: 15mm;"></div>

        <div style="border-bottom: 2px solid #881337; padding-bottom: 5px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center;">
          <div style="flex: 1;">
            <span style="display: inline-block; background: #881337; color: white; font-size: 6.8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; padding: 2px 7px; border-radius: 4px; margin-bottom: 2px;">
              Mr Lovett's History Hub • ${unitMeta.spec} (${unitMeta.year})
            </span>
            <h1 style="font-size: 13pt; margin: 0 0 2px 0; color: #0f172a; font-weight: 800; line-height: 1.2;">
              ${uData.title || unitMeta.name}
            </h1>
            <div style="font-size: 8.5pt; color: #475569; font-weight: 600; margin-bottom: 3px;">
              Period 2 Cover Task • ${l2.title}
            </div>
            <div style="font-size: 7.4pt; color: #881337; background: #fff1f2; padding: 2px 7px; border-radius: 4px; border: 1px solid #fecdd3; display: inline-block;">
              🌐 <strong>Digital App Link:</strong> <a href="${l2Url}" target="_blank" style="color: #be123c; text-decoration: underline; font-weight: 700;">${l2Url}</a>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; text-align: center; background: #fff1f2; border: 1px solid #fecdd3; border-radius: 6px; padding: 3px 6px; margin-left: 10px;">
            <img src="${l2Qr}" alt="QR" style="width: 48px; height: 48px; display: block;">
            <span style="font-size: 5.6pt; font-weight: 700; color: #881337; margin-top: 1px;">LAPTOP CAM QR</span>
          </div>
        </div>

        <div style="background: #fff7ed; border-left: 3.5px solid #ea580c; padding: 4px 8px; border-radius: 0 4px 4px 0; margin-bottom: 6px; font-size: 8pt; line-height: 1.35;">
          <strong>📋 CLASS INSTRUCTIONS (Period 2):</strong> 
          ${
            resourceMode === 'workbooks'
              ? `Turn to <strong>Lesson 2 in your printed textbook (${p2Refs.tb})</strong> and your <strong>printed workbook (${p2Refs.wb})</strong>. Complete all activities before the end of the double period.`
              : `You will complete Period 2 on <strong>1 lined sheet of A4 paper</strong>. Access the digital app for sources and context.`
          }
          ${supervisorNotes ? `<br><em>Note: ${supervisorNotes}</em>` : ''}
        </div>

        <div style="font-size: 9.2pt; font-weight: 800; color: #881337; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 2px; margin: 4px 0 5px 0; display: flex; align-items: center; gap: 6px;">
          <span style="background: #be123c; color: white; font-size: 6.6pt; font-weight: 700; padding: 1px 5px; border-radius: 3px; text-transform: uppercase;">Period 2</span>
          <span>${l2.title}</span>
        </div>

        <!-- Period 2 Tasks -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 5px; padding: 6px 9px; margin-bottom: 6px;">
          <div style="font-weight: 700; color: #0f172a; font-size: 8.5pt; margin-bottom: 3px; display: flex; justify-content: space-between;">
            <span>Task 1: Recall Starter & Vocabulary</span>
            <span style="font-size: 6.8pt; font-weight: 700; background: #e2e8f0; color: #334155; padding: 1px 5px; border-radius: 3px;">
              ${resourceMode === 'workbooks' ? 'Workbook: ' + p2Refs.doNow : 'Lined Paper'}
            </span>
          </div>
          <ol style="margin: 2px 0 3px 16px; padding: 0; font-size: 8.2pt;">
            ${
              resourceMode === 'workbooks'
                ? `<li><strong>Do Now Retrieval:</strong> Turn to <strong>${p2Refs.doNow}</strong> in your workbook. Complete the 10 recall questions on previous topics.</li>
                 <li><strong>Vocabulary Mapping:</strong> On <strong>${p2Refs.vocab}</strong>, complete the key terms linking sentence or grid.</li>`
                : `<li><strong>Retrieval Quick 5:</strong> Write 5 recall starter answers at the top of your lined paper.</li>
                 <li><strong>Concept Check:</strong> Write down 2 key historical developments from Period 1 that connect directly to Period 2.</li>`
            }
          </ol>
        </div>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 5px; padding: 6px 9px; margin-bottom: 6px;">
          <div style="font-weight: 700; color: #0f172a; font-size: 8.5pt; margin-bottom: 3px; display: flex; justify-content: space-between;">
            <span>Task 2: Core Reading & Case Study Analysis</span>
            <span style="font-size: 6.8pt; font-weight: 700; background: #e2e8f0; color: #334155; padding: 1px 5px; border-radius: 3px;">
              ${resourceMode === 'workbooks' ? 'Textbook: ' + p2Refs.tb : 'Digital App Narrative'}
            </span>
          </div>
          <p style="margin: 1px 0 3px 0; font-size: 8pt; color: #334155;">
            Read through ${resourceMode === 'workbooks' ? `<strong>${p2Refs.tb}</strong> in your textbook` : 'the core narrative on your screen'}, focusing on key individuals, government decisions, and consequences.
          </p>
        </div>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 5px; padding: 6px 9px; margin-bottom: 6px;">
          <div style="font-weight: 700; color: #0f172a; font-size: 8.5pt; margin-bottom: 3px; display: flex; justify-content: space-between;">
            <span>Task 3: Synthesis & Application Task</span>
            <span style="font-size: 6.8pt; font-weight: 700; background: #e2e8f0; color: #334155; padding: 1px 5px; border-radius: 3px;">
              ${resourceMode === 'workbooks' ? 'Workbook: ' + p2Refs.wb : 'Lined Paper Timeline / Essay'}
            </span>
          </div>
          ${
            resourceMode === 'workbooks'
              ? `<ol style="margin: 2px 0 3px 16px; padding: 0; font-size: 8.2pt;">
                <li>In your workbook (<strong>${p2Refs.wb}</strong>), complete the comparison activities and source evaluation tables.</li>
                <li>Write a high-grade conclusion paragraph answering the lesson enquiry question using historical criteria.</li>
              </ol>`
              : `<p style="margin: 1px 0 3px 0; font-size: 8pt;">
                ${
                  currentUnitId === 'cme_new'
                    ? `<strong>12-Point Chronological Milestone Timeline:</strong> On lined paper, construct a detailed timeline (1915–1949). For each event (McMahon, Balfour, Arab Revolt, Exodus, 1948 War, 1949 Armistice), write 2 bullet points: (1) What happened, and (2) Why it escalated conflict.`
                    : `<strong>Chronological Milestone Flowchart:</strong> Construct an annotated timeline or cause-consequence chain of 8 key events from the narrative on your lined paper. Explain the significance of each event.`
                }
              </p>`
          }
        </div>

        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 5px; padding: 6px 9px; margin-bottom: 0;">
          <div style="font-weight: 700; color: #166534; font-size: 8.5pt; margin-bottom: 2px; display: flex; justify-content: space-between;">
            <span>Task 4: Lesson Mastery Check (Final 10 Mins)</span>
            <span style="font-size: 6.8pt; font-weight: 700; background: #15803d; color: white; padding: 1px 5px; border-radius: 3px;">Digital App</span>
          </div>
          <p style="margin: 0; font-size: 7.8pt; color: #14532d;">
            Complete the <strong>Lesson Mastery Quiz</strong> on the digital app to lock in your retrieval score. Ensure all work is neatly titled and dated.
          </p>
        </div>

        <div style="margin-top: 8px; padding-top: 3px; border-top: 1px solid #e2e8f0; font-size: 6.8pt; color: #64748b; display: flex; justify-content: space-between;">
          <span>Meoncross School • Department of History • Mr Lovett</span>
          <span>Ensure workbooks / paper sheets are handed in or stored safely in student folders.</span>
        </div>
      `;
    }

    paperSheet.innerHTML = sheetHtml;

    // Build Plain Text VLE / Email string
    let plainText = `SUBJECT: GCSE History — ${unitMeta.year} Cover Work (${periodType === 'double' ? 'Double Period' : 'Single Period'})\n`;
    plainText += `TOPIC: ${uData.title || unitMeta.name}\n`;
    plainText += `RESOURCES: ${resourceMode === 'workbooks' ? `Pupils have their printed physical Course Textbook and Pupil Workbook.` : `1 sheet of blank A4 paper (Period 1) and 1 sheet of lined A4 paper (Period 2) per pupil.`}\n`;
    if (supervisorNotes) plainText += `SUPERVISOR NOTE: ${supervisorNotes}\n`;
    plainText += `\n=========================================\n`;
    plainText += `PERIOD 1 — ${l1.title}\n`;
    plainText += `🌐 Digital App: ${l1Url}\n`;
    if (resourceMode === 'workbooks') {
      plainText += `1. DO NOW & VOCAB: Open workbook to ${p1Refs.doNow}. Complete the 10 retrieval questions and vocabulary activity on ${p1Refs.vocab}.\n`;
      plainText += `2. READING: Read textbook ${p1Refs.tb} or the core historical narrative on the app.\n`;
      plainText += `3. WORKBOOK ENQUIRY: In workbook (${p1Refs.wb}), complete the core enquiry tasks in neat pen.\n`;
      plainText += `4. CHECK: Complete the 10-question retrieval check on the digital app.\n`;
    } else {
      plainText += `1. STARTER: On blank A4 paper, answer the 5 recall starter questions from the top of the lesson app.\n`;
      plainText += `2. READING: Read the core historical narrative and examine the maps/sources on screen.\n`;
      plainText += `3. APPLICATION: ${currentUnitId === 'cme_new' ? 'Complete the Dual-Perspective Partition Map Activity on blank paper (sketch Palestine, shade Jewish/Arab zones, annotate 3 reasons for accept/reject).' : 'Complete the Analytical Factor Matrix comparing competing historical arguments on blank paper.'}\n`;
      plainText += `4. CHECK: Complete the quick digital quiz on the app.\n`;
    }

    if (periodType === 'double') {
      plainText += `\n=========================================\n`;
      plainText += `PERIOD 2 — ${l2.title}\n`;
      plainText += `🌐 Digital App: ${l2Url}\n`;
      if (resourceMode === 'workbooks') {
        plainText += `1. DO NOW & VOCAB: Open workbook to ${p2Refs.doNow} (10 recall questions) and ${p2Refs.vocab} (vocab mapping).\n`;
        plainText += `2. READING: Read textbook ${p2Refs.tb} or the core narrative on the app.\n`;
        plainText += `3. WORKBOOK ENQUIRY: In workbook (${p2Refs.wb}), complete the comparison grid and evaluation tasks.\n`;
        plainText += `4. PLENARY: Complete the Lesson Mastery Quiz on the digital app before the end of the double period.\n`;
      } else {
        plainText += `1. RECALL: On lined A4 paper, complete the 5 recall starter questions.\n`;
        plainText += `2. READING: Read the core narrative for Period 2 on your screen.\n`;
        plainText += `3. SYNTHESIS: ${currentUnitId === 'cme_new' ? 'Construct a 12-point chronological timeline (1915–1949) on lined paper with 2 bullet points per event (what happened + impact).' : 'Construct an 8-event cause-and-consequence milestone flowchart on lined paper.'}\n`;
        plainText += `4. PLENARY: Complete the digital multiple-choice mastery quiz on the app. All paper handed in.\n`;
      }
    }

    plainTextArea.value = plainText;
  };

  // Event Handlers
  unitSelect.onchange = () => {
    currentUnitId = unitSelect.value;
    lesson1Idx = 0;
    lesson2Idx = 1;
    if (currentUnitId === 'cme_new') {
      resourceMode = 'paper';
    } else {
      resourceMode = 'workbooks';
    }
    modeWorkbooks.style.background =
      resourceMode === 'workbooks' ? 'rgba(16, 185, 129, 0.15)' : '#1e293b';
    modeWorkbooks.style.borderColor = resourceMode === 'workbooks' ? '#10b981' : '#334155';
    modePaper.style.background = resourceMode === 'paper' ? 'rgba(245, 158, 11, 0.15)' : '#1e293b';
    modePaper.style.borderColor = resourceMode === 'paper' ? '#f59e0b' : '#334155';
    populateLessons();
    updateCover();
  };

  btnPeriodSingle.onclick = () => {
    periodType = 'single';
    btnPeriodSingle.style.background = 'rgba(225, 29, 72, 0.2)';
    btnPeriodSingle.style.color = '#fb7185';
    btnPeriodSingle.style.borderColor = '#e11d48';

    btnPeriodDouble.style.background = '#1e293b';
    btnPeriodDouble.style.color = '#94a3b8';
    btnPeriodDouble.style.borderColor = '#334155';

    lesson2Wrapper.style.display = 'none';
    updateCover();
  };

  btnPeriodDouble.onclick = () => {
    periodType = 'double';
    btnPeriodDouble.style.background = 'rgba(225, 29, 72, 0.2)';
    btnPeriodDouble.style.color = '#fb7185';
    btnPeriodDouble.style.borderColor = '#e11d48';

    btnPeriodSingle.style.background = '#1e293b';
    btnPeriodSingle.style.color = '#94a3b8';
    btnPeriodSingle.style.borderColor = '#334155';

    lesson2Wrapper.style.display = 'block';
    updateCover();
  };

  lesson1Select.onchange = () => {
    lesson1Idx = parseInt(lesson1Select.value, 10) || 0;
    if (lesson2Idx <= lesson1Idx) {
      lesson2Idx = Math.min(lesson1Idx + 1, lesson2Select.options.length - 1);
      lesson2Select.value = lesson2Idx;
    }
    updateCover();
  };

  lesson2Select.onchange = () => {
    lesson2Idx = parseInt(lesson2Select.value, 10) || 0;
    updateCover();
  };

  modeWorkbooks.onclick = () => {
    resourceMode = 'workbooks';
    modeWorkbooks.style.background = 'rgba(16, 185, 129, 0.15)';
    modeWorkbooks.style.borderColor = '#10b981';
    modePaper.style.background = '#1e293b';
    modePaper.style.borderColor = '#334155';
    updateCover();
  };

  modePaper.onclick = () => {
    resourceMode = 'paper';
    modePaper.style.background = 'rgba(245, 158, 11, 0.15)';
    modePaper.style.borderColor = '#f59e0b';
    modeWorkbooks.style.background = '#1e293b';
    modeWorkbooks.style.borderColor = '#334155';
    updateCover();
  };

  supervisorInput.oninput = () => {
    supervisorNotes = supervisorInput.value;
    updateCover();
  };

  // Tab switching
  tabPreviewBtn.onclick = () => {
    activeTab = 'preview';
    tabPreviewBtn.style.background = '#334155';
    tabPreviewBtn.style.color = '#ffffff';
    tabPreviewBtn.style.borderColor = '#475569';
    tabTextBtn.style.background = 'transparent';
    tabTextBtn.style.color = '#94a3b8';
    tabTextBtn.style.borderColor = 'transparent';

    previewContainer.style.display = 'flex';
    textContainer.style.display = 'none';
  };

  tabTextBtn.onclick = () => {
    activeTab = 'text';
    tabTextBtn.style.background = '#334155';
    tabTextBtn.style.color = '#ffffff';
    tabTextBtn.style.borderColor = '#475569';
    tabPreviewBtn.style.background = 'transparent';
    tabPreviewBtn.style.color = '#94a3b8';
    tabPreviewBtn.style.borderColor = 'transparent';

    textContainer.style.display = 'flex';
    previewContainer.style.display = 'none';
  };

  // Copy plain text handler
  const handleCopy = () => {
    navigator.clipboard
      .writeText(plainTextArea.value)
      .then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied to Clipboard!';
        copyBtn.style.background = '#10b981';
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
          copyBtn.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)';
        }, 2500);

        if (copyInnerBtn) {
          copyInnerBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
          setTimeout(() => {
            copyInnerBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copy Text';
          }, 2500);
        }
      })
      .catch((err) => {
        console.error('Clipboard copy failed:', err);
        alert('Could not copy automatically. Please select all in the text box and press Ctrl+C.');
      });
  };

  copyBtn.onclick = handleCopy;
  copyInnerBtn.onclick = handleCopy;

  // Print handler
  printBtn.onclick = () => {
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'fixed';
    printFrame.style.top = '-9999px';
    printFrame.style.left = '-9999px';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = 'none';
    document.body.appendChild(printFrame);

    const frameDoc = printFrame.contentDocument || printFrame.contentWindow.document;
    frameDoc.open();
    frameDoc.write(`<!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Cover Lesson - ${currentUnitId}</title>
        <style>
          @page { size: A4; margin: 8mm 12mm 8mm 12mm; }
          * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #1e293b; margin: 0; padding: 0; font-size: 8.8pt; line-height: 1.32; background: #ffffff; }
          .page-break { page-break-before: always; break-before: page; }
          a { text-decoration: underline; color: #be123c; }
        </style>
      </head>
      <body>
        ${paperSheet.innerHTML}
      </body>
      </html>
    `);
    frameDoc.close();

    setTimeout(() => {
      printFrame.contentWindow.focus();
      printFrame.contentWindow.print();
      setTimeout(() => printFrame.remove(), 2000);
    }, 400);
  };

  // Close handler
  const closeModal = () => {
    window.removeEventListener('keydown', handleEsc);
    overlay.style.opacity = '0';
    modalContent.style.transform = 'scale(0.98)';
    setTimeout(() => overlay.remove(), 220);
  };

  const handleEsc = (e) => {
    if (e.key === 'Escape') closeModal();
  };
  window.addEventListener('keydown', handleEsc);

  closeBtn.onclick = closeModal;
  overlay.onclick = (e) => {
    if (e.target === overlay) closeModal();
  };

  // Initial population
  populateLessons();
  updateCover();

  // Animate in
  void overlay.offsetWidth;
  overlay.style.opacity = '1';
  modalContent.style.transform = 'scale(1)';
};
