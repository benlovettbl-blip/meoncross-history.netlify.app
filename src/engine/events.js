/**
 * Global Event Delegation Controller
 * Intercepts clicks and routes them to appropriate handlers using data attributes.
 */
import { appStore } from './store.js';
import { readAloudText } from './speech.js';

export function initEventDelegation() {
  // Vocabulary Matching Game State
  let selectedTermIdx = null;
  let selectedTermEl = null;
  let selectedDefIdx = null;
  let selectedDefEl = null;

  const resetVocabSelection = () => {
    if (selectedTermEl && !selectedTermEl.disabled) {
      selectedTermEl.style.borderColor = '#cbd5e1';
      selectedTermEl.style.background = '';
      selectedTermEl.style.boxShadow = '';
    }
    if (selectedDefEl && !selectedDefEl.disabled) {
      selectedDefEl.style.borderColor = '#cbd5e1';
      selectedDefEl.style.background = '';
      selectedDefEl.style.boxShadow = '';
    }
    selectedTermIdx = null;
    selectedTermEl = null;
    selectedDefIdx = null;
    selectedDefEl = null;
  };
  window.resetVocabSelection = resetVocabSelection;

  document.body.addEventListener('click', (e) => {
    // 1. Vocabulary Matching Game Handlers
    const termBtn = e.target.closest('.match-term-btn');
    const defBtn = e.target.closest('.match-def-btn');

    if (termBtn && !termBtn.disabled) {
      // If a definition was already selected, check if they match!
      if (selectedDefIdx !== null && selectedDefEl) {
        if (termBtn.dataset.idx === selectedDefIdx) {
          // Match found!
          termBtn.style.background = '#10b981';
          termBtn.style.color = '#fff';
          termBtn.style.borderColor = '#059669';
          termBtn.disabled = true;
          termBtn.style.cursor = 'default';
          termBtn.style.boxShadow = 'none';

          selectedDefEl.style.background = '#10b981';
          selectedDefEl.style.color = '#fff';
          selectedDefEl.style.borderColor = '#059669';
          selectedDefEl.disabled = true;
          selectedDefEl.style.cursor = 'default';
          selectedDefEl.style.boxShadow = 'none';

          resetVocabSelection();
          window.vocabMatchesFound = (window.vocabMatchesFound || 0) + 1;

          const container = termBtn.closest('#vocab-match-game');
          const totalTerms = container
            ? container.querySelectorAll('.match-term-btn').length
            : document.querySelectorAll('.match-term-btn').length;
          if (window.vocabMatchesFound >= totalTerms) {
            const successMsg =
              (container && container.parentElement.querySelector('#unlock-success')) ||
              document.getElementById('unlock-success');
            if (successMsg) successMsg.style.display = 'block';

            const lockedSec = document.getElementById('locked-content');
            if (lockedSec) {
              lockedSec.style.opacity = '1';
              lockedSec.style.pointerEvents = 'auto';
              lockedSec.style.filter = 'none';
            }
          }
        } else {
          // Wrong match
          termBtn.style.borderColor = '#ef4444';
          termBtn.style.background = '#fef2f2';
          setTimeout(() => {
            if (!termBtn.disabled) {
              termBtn.style.borderColor = '#cbd5e1';
              termBtn.style.background = '';
            }
          }, 500);
        }
        return;
      }

      // No definition was selected: toggle or select this term
      if (selectedTermEl === termBtn) {
        resetVocabSelection();
        return;
      }

      resetVocabSelection();

      termBtn.style.borderColor = '#3b82f6';
      termBtn.style.background = '#eff6ff';
      termBtn.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.2)';
      selectedTermIdx = termBtn.dataset.idx;
      selectedTermEl = termBtn;
      return;
    }

    if (defBtn && !defBtn.disabled) {
      // If a term was already selected, check if they match!
      if (selectedTermIdx !== null && selectedTermEl) {
        if (defBtn.dataset.idx === selectedTermIdx) {
          // Match found!
          defBtn.style.background = '#10b981';
          defBtn.style.color = '#fff';
          defBtn.style.borderColor = '#059669';
          defBtn.disabled = true;
          defBtn.style.cursor = 'default';
          defBtn.style.boxShadow = 'none';

          selectedTermEl.style.background = '#10b981';
          selectedTermEl.style.color = '#fff';
          selectedTermEl.style.borderColor = '#059669';
          selectedTermEl.disabled = true;
          selectedTermEl.style.cursor = 'default';
          selectedTermEl.style.boxShadow = 'none';

          resetVocabSelection();
          window.vocabMatchesFound = (window.vocabMatchesFound || 0) + 1;

          const container = defBtn.closest('#vocab-match-game');
          const totalTerms = container
            ? container.querySelectorAll('.match-term-btn').length
            : document.querySelectorAll('.match-term-btn').length;
          if (window.vocabMatchesFound >= totalTerms) {
            const successMsg =
              (container && container.parentElement.querySelector('#unlock-success')) ||
              document.getElementById('unlock-success');
            if (successMsg) successMsg.style.display = 'block';

            const lockedSec = document.getElementById('locked-content');
            if (lockedSec) {
              lockedSec.style.opacity = '1';
              lockedSec.style.pointerEvents = 'auto';
              lockedSec.style.filter = 'none';
            }
          }
        } else {
          // Wrong match
          defBtn.style.borderColor = '#ef4444';
          defBtn.style.background = '#fef2f2';
          setTimeout(() => {
            if (!defBtn.disabled) {
              defBtn.style.borderColor = '#cbd5e1';
              defBtn.style.background = '';
            }
          }, 500);
        }
        return;
      }

      // No term was selected: toggle or select this definition
      if (selectedDefEl === defBtn) {
        resetVocabSelection();
        return;
      }

      resetVocabSelection();

      defBtn.style.borderColor = '#3b82f6';
      defBtn.style.background = '#eff6ff';
      defBtn.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.2)';
      selectedDefIdx = defBtn.dataset.idx;
      selectedDefEl = defBtn;
      return;
    }

    const target = e.target.closest('[data-action]');

    // Auto-detect zoomable images with cursor: zoom-in across the app
    if (!target) {
      const zoomImg =
        e.target.tagName === 'IMG'
          ? e.target
          : e.target
              .closest('[style*="cursor: zoom-in"], [style*="cursor:zoom-in"]')
              ?.querySelector('img') || e.target.closest('img');

      if (zoomImg) {
        const computedCursor = window.getComputedStyle(zoomImg).cursor;
        const inlineCursor = zoomImg.style.cursor;
        const parentCursor = zoomImg.parentElement
          ? window.getComputedStyle(zoomImg.parentElement).cursor
          : '';

        if (
          computedCursor === 'zoom-in' ||
          inlineCursor === 'zoom-in' ||
          parentCursor === 'zoom-in'
        ) {
          const imgSrc = zoomImg.dataset.src || zoomImg.getAttribute('src') || zoomImg.src;
          if (imgSrc && window.openModal) {
            e.preventDefault();
            window.openModal(imgSrc);
            return;
          }
        }
      }
      return;
    }

    const action = target.dataset.action;

    switch (action) {
      case 'switch-view':
        if (window.switchView) {
          window.switchView(target.dataset.view, target.dataset.unit);
        }
        break;

      case 'open-modal': {
        if (window.openModal) {
          const imgSrc =
            target.dataset.src ||
            target.getAttribute('src') ||
            target.src ||
            e.target.dataset.src ||
            e.target.getAttribute('src') ||
            e.target.src ||
            target.querySelector('img')?.getAttribute('data-src') ||
            target.querySelector('img')?.getAttribute('src') ||
            target.querySelector('img')?.src;

          if (imgSrc) {
            window.openModal(imgSrc);
          }
        }
        break;
      }

      case 'toggle-element':
        const targetId = target.dataset.targetId || target.getAttribute('data-target-id');
        const el = document.getElementById(targetId);
        if (el) {
          const currentComputed = window.getComputedStyle(el).display;
          const isCurrentlyHidden = currentComputed === 'none' || el.style.display === 'none';

          if (isCurrentlyHidden) {
            el.classList.add('revealed');
            el.style.display = 'block';
          } else {
            el.classList.remove('revealed');
            el.style.display = 'none';
          }
        } else if (window.toggleElement) {
          window.toggleElement(targetId);
        }
        break;

      case 'render-lesson':
        if (window.renderLessonByIndex) {
          window.renderLessonByIndex(parseInt(target.dataset.index, 10));
        }
        break;

      case 'read-aloud':
        if (typeof readAloudText === 'function') {
          readAloudText(target);
        } else if (window.readAloudText) {
          window.readAloudText(target);
        }
        break;

      case 'open-debate-modal':
        if (window.openDebateModal) window.openDebateModal();
        break;
      case 'open-task-whiteboard':
        if (window.openTaskWhiteboard) window.openTaskWhiteboard();
        break;
      case 'open-tour-guide-modal':
        if (window.openTourGuideModal)
          window.openTourGuideModal(parseInt(target.dataset.index, 10));
        break;
      case 'open-anthology-modal':
        if (window.openAnthologyModal) {
          window.openAnthologyModal();
        }
        break;
      case 'open-parent-briefing-modal':
        if (window.openParentBriefingModal) {
          window.openParentBriefingModal();
        }
        break;
      case 'switch-trip-hub-tab': {
        const selectedTab = target.dataset.tab;
        const container = target.closest('#trip-hub-container') || document;

        // Tactile button click feedback animation
        target.style.transform = 'scale(0.96)';
        setTimeout(() => {
          target.style.transform = '';
        }, 140);

        container.querySelectorAll('.trip-hub-tab-btn').forEach((btn) => {
          const isActive = btn.dataset.tab === selectedTab;
          btn.style.background = isActive ? '#1e3a8a' : '#f8fafc';
          btn.style.color = isActive ? '#ffffff' : '#475569';
          btn.style.borderColor = isActive ? '#1e3a8a' : '#cbd5e1';
          btn.style.boxShadow = isActive ? '0 2px 6px rgba(30, 58, 138, 0.25)' : 'none';
          btn.style.fontWeight = isActive ? '700' : '600';
          if (isActive) btn.classList.add('active');
          else btn.classList.remove('active');

          const badge = btn.querySelector('.tab-badge');
          if (badge) {
            badge.style.background = isActive ? 'rgba(255, 255, 255, 0.25)' : '#e2e8f0';
            badge.style.color = isActive ? '#ffffff' : '#475569';
          }
        });

        const itinPanel = container.querySelector('#trip-panel-itinerary');
        const fallenPanel = container.querySelector('#trip-panel-fallen');
        const crummackPanel = container.querySelector('#trip-panel-crummack');
        if (itinPanel) itinPanel.style.display = selectedTab === 'itinerary' ? 'block' : 'none';
        if (fallenPanel) fallenPanel.style.display = selectedTab === 'fallen' ? 'block' : 'none';
        if (crummackPanel)
          crummackPanel.style.display = selectedTab === 'crummack' ? 'block' : 'none';

        // Provide immediate visual feedback: smooth scroll to the selected content
        if (selectedTab === 'itinerary') {
          const targetSection =
            container.querySelector('#trip-daily-itinerary-section') || itinPanel;
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else if (selectedTab === 'fallen') {
          if (fallenPanel) {
            fallenPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else if (selectedTab === 'crummack') {
          if (crummackPanel) {
            crummackPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
        break;
      }
      case 'switch-poet-tab': {
        const poetTargetId = target.dataset.targetPoet;
        const cardContainer = target.closest('.poetry-dossier-card');
        if (cardContainer) {
          cardContainer.querySelectorAll('.poet-tab-btn').forEach((btn) => {
            const isActive = btn.dataset.targetPoet === poetTargetId;
            btn.style.background = isActive ? '#7f1d1d' : '#ffffff';
            btn.style.color = isActive ? '#ffffff' : '#475569';
            btn.style.borderColor = isActive ? '#7f1d1d' : '#cbd5e1';
            btn.style.fontWeight = isActive ? '700' : '600';
          });
          cardContainer.querySelectorAll('.poet-view-pane').forEach((pane) => {
            pane.style.display = pane.id === poetTargetId ? 'block' : 'none';
          });
        }
        break;
      }
      case 'open-video-modal':
        const youtubeId = target.dataset.youtube;
        if (youtubeId) {
          const overlay = document.createElement('div');
          overlay.className = 'modal-overlay no-print';
          overlay.style.cssText =
            'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(10px); justify-content: center; align-items: center; z-index: 2000; display: flex;';
          overlay.onclick = function (e) {
            if (e.target === overlay) overlay.remove();
          };
          overlay.innerHTML = `
            <div class="modal-content" style="background: transparent; width: 90%; max-width: 900px; position: relative;">
              <button onclick="this.closest('.modal-overlay').remove()" style="position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 2rem; cursor: pointer;">&times;</button>
              <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
                <iframe src="https://www.youtube.com/embed/${youtubeId}?autoplay=1" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allow="autoplay; encrypted-media" allowfullscreen></iframe>
              </div>
            </div>
          `;
          document.body.appendChild(overlay);
        }
        break;
      case 'jump-to-key-individual':
        if (window.jumpToKeyIndividual) window.jumpToKeyIndividual(target.dataset.name);
        break;
      case 'toggle-map':
        if (window.toggleMap) window.toggleMap(target);
        break;
      case 'open-gallery':
        if (window.openGallery)
          window.openGallery(target.dataset.gallery, parseInt(target.dataset.index, 10));
        break;
      case 'check-debate':
        if (window.checkDebate) window.checkDebate(target.dataset.id);
        break;
      case 'next-quiz-question':
        if (window.nextQuizQuestion) window.nextQuizQuestion();
        break;
      case 'start-tps-timer':
        if (window.startTPSTimer) window.startTPSTimer(target, 60);
        break;
      case 'scroll-to-para':
        if (window.scrollToPara) window.scrollToPara(target.dataset.target);
        break;

      case 'toggle-caption-blur':
        target.classList.toggle('blurred');
        const i = target.querySelector('i');
        if (target.classList.contains('blurred')) {
          i.classList.replace('fa-eye', 'fa-eye-slash');
          i.style.color = '#94a3b8';
          target.title = 'Click to reveal caption';
        } else {
          i.classList.replace('fa-eye-slash', 'fa-eye');
          i.style.color = '#10b981';
          target.title = 'Click to hide caption';
        }
        break;

      case 'flip-card':
        const inner = target.querySelector('.flip-card-inner');
        if (inner) {
          inner.style.transform =
            inner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
        }
        break;

      case 'flip-card-wrapper':
        target.classList.toggle('flipped');
        break;

      case 'toggle-all-answers': {
        e.preventDefault();
        e.stopPropagation();

        const details = target.closest('details');
        const container =
          details || target.closest('.phase-card') || target.closest('.do-now-box') || document;

        // If inside a details element, ensure it is open so answers can be seen
        if (details && !details.open) {
          details.open = true;
        }

        const answers = container.querySelectorAll('.answer');
        if (answers && answers.length > 0) {
          const anyHidden = Array.from(answers).some((a) => {
            const currentDisp = window.getComputedStyle(a).display;
            return currentDisp === 'none' || a.style.display === 'none';
          });

          answers.forEach((a) => {
            if (anyHidden) {
              a.style.display = 'block';
              a.classList.add('revealed');
            } else {
              a.style.display = 'none';
              a.classList.remove('revealed');
            }
          });

          target.innerHTML = anyHidden
            ? '<i class="fa-solid fa-eye-slash"></i> Hide All'
            : '<i class="fa-solid fa-eye"></i> Reveal All';
        }
        break;
      }

      case 'reveal-all-models':
        target
          .closest('.phase-card')
          .querySelectorAll('.model-box, .answer')
          .forEach((c) => {
            const isCurrentlyHidden =
              window.getComputedStyle(c).display === 'none' || c.style.display === 'none';
            if (isCurrentlyHidden) {
              c.classList.add('revealed');
              c.style.display = 'block';
            } else {
              c.classList.remove('revealed');
              c.style.display = 'none';
            }
          });
        break;

      case 'reveal-hinge':
        const hingeContent = document.getElementById(target.dataset.target);
        if (hingeContent) hingeContent.style.display = 'block';
        target.style.display = 'none';
        break;

      case 'hinge-mcq-select':
        const parent = target.parentElement;
        const explanation = parent.nextElementSibling;
        const correctIndex = parseInt(target.dataset.correct, 10);
        for (let child of parent.children) {
          child.style.pointerEvents = 'none';
          if (parseInt(child.dataset.index, 10) === correctIndex) {
            child.style.backgroundColor = '#dcfce7';
            child.style.borderColor = '#22c55e';
            child.style.color = '#166534';
          } else if (child === target && parseInt(child.dataset.index, 10) !== correctIndex) {
            child.style.backgroundColor = '#fee2e2';
            child.style.borderColor = '#ef4444';
            child.style.color = '#991b1b';
          }
        }
        if (explanation) explanation.style.display = 'block';
        break;

      case 'toggle-chevron':
        const content = target.nextElementSibling;
        const icon = target.querySelector('.chevron-icon');
        if (content.style.display === 'none') {
          content.style.display = 'block';
          if (icon) icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        } else {
          content.style.display = 'none';
          if (icon) icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
        break;

      case 'close-modal':
        const overlay = target.closest('.modal-overlay');
        if (overlay) overlay.remove();
        break;

      case 'close-modal-overlay':
        if (e.target === target) target.remove();
        break;

      case 'toggle-wb-answer':
        const ans = target.querySelector('.wb-answer');
        if (ans) ans.classList.toggle('revealed');
        break;

      case 'close-task-whiteboard':
        const wbModal = document.getElementById('task-whiteboard-modal');
        if (wbModal) wbModal.classList.remove('visible');
        break;

      case 'reveal-all-wb-answers':
        const allWbAnswers = document.querySelectorAll(
          '#whiteboard-questions-container .wb-answer',
        );
        const anyHidden = Array.from(allWbAnswers).some((a) => !a.classList.contains('revealed'));
        allWbAnswers.forEach((a) => a.classList.toggle('revealed', anyHidden));
        if (target) {
          target.innerHTML = anyHidden
            ? '<i class="fa-solid fa-eye-slash"></i> Hide All Answers <span style="background: rgba(255,255,255,0.25); padding: 1px 6px; border-radius: 4px; font-size: 0.75rem; font-family: monospace;">A</span>'
            : '<i class="fa-solid fa-eye"></i> Reveal All Answers <span style="background: rgba(255,255,255,0.25); padding: 1px 6px; border-radius: 4px; font-size: 0.75rem; font-family: monospace;">A</span>';
        }
        break;

      case 'close-milestone-overlay':
        if (e.target === target && window.closeMilestoneModal) window.closeMilestoneModal();
        break;

      case 'close-milestone':
        if (window.closeMilestoneModal) window.closeMilestoneModal();
        break;

      case 'close-quiz-overlay':
        if (e.target === target && window.closeQuizModal) window.closeQuizModal();
        break;

      case 'close-quiz':
        if (window.closeQuizModal) window.closeQuizModal();
        break;

      case 'check-quiz-answer':
        if (window.checkQuizAnswer)
          window.checkQuizAnswer(target, parseInt(target.dataset.idx, 10));
        break;

      case 'reveal-quiz-answer':
        if (target.nextElementSibling) target.nextElementSibling.style.display = 'block';
        target.style.display = 'none';
        const nextBtn = document.getElementById('quiz-next-btn');
        if (nextBtn) nextBtn.style.display = 'block';
        break;

      case 'launch-subapp':
        if (window.launchSubApp) window.launchSubApp(target.dataset.unit);
        break;

      case 'open-link':
        window.open(target.dataset.url, '_blank');
        break;

      case 'open-teacher-preview':
        if (window.openTeacherPrintPreview) {
          window.openTeacherPrintPreview(
            target.dataset.file,
            target.dataset.title,
            target.dataset.pdf,
          );
        }
        break;

      case 'toggle-bookmark':
        if (window.toggleBookmarkQuestion) window.toggleBookmarkQuestion(target.dataset.id);
        break;

      case 'submit-quiz-answer':
        if (window.submitQuizAnswer)
          window.submitQuizAnswer(target.dataset.id, target.dataset.opt, target);
        break;

      case 'print-booklet':
        if (window.printBooklet) window.printBooklet();
        break;

      case 'view-lesson-detail':
        if (window.viewLessonDetail) window.viewLessonDetail(parseInt(target.dataset.index, 10));
        break;

      case 'reveal-taboo-hint':
        const hintBox = document.getElementById('taboo-hint-box');
        if (hintBox) hintBox.style.display = 'block';
        target.style.display = 'none';
        break;

      case 'next-taboo-card':
        if (window.showRandomTabooCard) window.showRandomTabooCard();
        break;

      case 'play-decisions-scenario':
        if (window.playDecisionsScenario) window.playDecisionsScenario(target.dataset.id);
        break;

      case 'play-decisions-phase2':
        if (window.playDecisionsPhase2)
          window.playDecisionsPhase2(target.dataset.id, target.dataset.choice);
        break;

      case 'play-decisions-phase3':
        if (window.playDecisionsPhase3)
          window.playDecisionsPhase3(
            target.dataset.id,
            target.dataset.choice,
            target.dataset.phase,
          );
        break;

      case 'quiz-zone-back':
        const modeSelect = document.getElementById('mode-select-container');
        const quizUi = document.getElementById('quiz-ui-container');
        if (modeSelect) modeSelect.style.display = 'block';
        if (quizUi) quizUi.style.display = 'none';
        break;

      case 'set-spec-rag':
        if (window.setSpecRag) window.setSpecRag(target.dataset.id, target.dataset.color);
        break;

      case 'open-timeline-lesson':
        if (window.openTimelineLesson) window.openTimelineLesson(target.dataset.id);
        break;

      // Final default fallback
      default:
        console.warn('Unhandled data-action:', action);
    }
  });
}

export function toggleAllAnswers(btnOrContainer) {
  let container;
  let btn;
  if (btnOrContainer instanceof HTMLElement) {
    if (
      btnOrContainer.tagName === 'BUTTON' ||
      btnOrContainer.dataset?.action === 'toggle-all-answers'
    ) {
      btn = btnOrContainer;
      container =
        btn.closest('details') ||
        btn.closest('.phase-card') ||
        btn.closest('.do-now-box') ||
        document;
    } else {
      container = btnOrContainer.closest?.('details') || btnOrContainer;
      btn = container?.querySelector?.('[data-action="toggle-all-answers"]');
    }
  } else {
    container = document.querySelector('details:has(.do-now-card)') || document;
    btn = container?.querySelector?.('[data-action="toggle-all-answers"]');
  }
  if (!container) return;
  if (container.tagName === 'DETAILS' && !container.open) container.open = true;
  const answers = container.querySelectorAll('.answer');
  if (!answers || answers.length === 0) return;
  const anyHidden = Array.from(answers).some((a) => {
    return window.getComputedStyle(a).display === 'none' || a.style.display === 'none';
  });
  answers.forEach((a) => {
    if (anyHidden) {
      a.style.display = 'block';
      a.classList.add('revealed');
    } else {
      a.style.display = 'none';
      a.classList.remove('revealed');
    }
  });
  if (btn) {
    btn.innerHTML = anyHidden
      ? '<i class="fa-solid fa-eye-slash"></i> Hide All'
      : '<i class="fa-solid fa-eye"></i> Reveal All';
  }
}

export function toggleMap(btn) {
  const container = btn.closest('.interactive-map-container');
  if (!container) return;

  // Update buttons
  container.querySelectorAll('.map-toggle-btn').forEach((b) => {
    b.classList.remove('active-map-btn');
    b.style.backgroundColor = '#f1f5f9';
    b.style.color = '#334155';
    b.style.borderColor = '#cbd5e1';
  });
  btn.classList.add('active-map-btn');
  btn.style.backgroundColor = '#1e40af';
  btn.style.color = '#ffffff';
  btn.style.borderColor = '#1e40af';

  // Update images
  const targetId = btn.getAttribute('data-map-id');
  container.querySelectorAll('img[id^="map-img-"]').forEach((img) => {
    img.style.opacity = '0';
    img.style.pointerEvents = 'none';
  });
  const targetImg = container.querySelector('#map-img-' + targetId);
  if (targetImg) {
    targetImg.style.opacity = '1';
    targetImg.style.pointerEvents = 'auto';
  }

  // Update caption
  const captionDisplay = container.querySelector('#map-caption-display');
  if (captionDisplay) {
    captionDisplay.innerHTML = btn.getAttribute('data-caption') || '';
  }
}

if (typeof window !== 'undefined') {
  window.toggleAllAnswers = toggleAllAnswers;
  window.toggleMap = toggleMap;
}
