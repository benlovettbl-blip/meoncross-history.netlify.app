/**
 * Global Event Delegation Controller
 * Intercepts clicks and routes them to appropriate handlers using data attributes.
 */
import { appStore } from './store.js';
import { renderNavigatorStopsHTML } from './stop_navigator.js';

export function initEventDelegation() {
  document.body.addEventListener('click', (e) => {
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
        if (window.readAloudText) {
          window.readAloudText(target);
        }
        break;

      case 'open-debate-modal':
        if (window.openDebateModal) window.openDebateModal();
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
        container.querySelectorAll('.trip-hub-tab-btn').forEach((btn) => {
          const isActive = btn.dataset.tab === selectedTab;
          btn.style.background = isActive ? '#1e3a8a' : '#f8fafc';
          btn.style.color = isActive ? '#ffffff' : '#475569';
          btn.style.borderColor = isActive ? '#1e3a8a' : '#cbd5e1';
          btn.style.boxShadow = isActive ? '0 2px 6px rgba(30, 58, 138, 0.25)' : 'none';
          btn.style.fontWeight = isActive ? '700' : '600';
          if (isActive) btn.classList.add('active');
          else btn.classList.remove('active');
        });
        const itinPanel = container.querySelector('#trip-panel-itinerary');
        const fallenPanel = container.querySelector('#trip-panel-fallen');
        if (itinPanel) itinPanel.style.display = selectedTab === 'itinerary' ? 'block' : 'none';
        if (fallenPanel) fallenPanel.style.display = selectedTab === 'fallen' ? 'block' : 'none';
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
      case 'open-stop-navigator':
        if (window.openStopNavigator) window.openStopNavigator(target.dataset.dayId);
        break;
      case 'jump-to-stop': {
        const modal = document.getElementById('stop-navigator-modal-overlay');
        if (modal) modal.remove();
        if (window.jumpToStop) {
          window.jumpToStop(target.dataset.targetId, target.dataset.dayId);
        }
        break;
      }
      case 'switch-navigator-tab': {
        const selectedDay = target.dataset.dayId;
        const container = target.closest('#stop-navigator-modal-overlay');
        if (container) {
          container.querySelectorAll('.nav-day-tab-btn').forEach((btn) => {
            const isActive = btn.dataset.dayId === selectedDay;
            btn.style.background = isActive ? '#1e3a8a' : '#ffffff';
            btn.style.color = isActive ? '#ffffff' : '#475569';
            btn.style.borderColor = isActive ? '#1e3a8a' : '#cbd5e1';
            if (isActive) btn.classList.add('active');
            else btn.classList.remove('active');
          });
          const content = container.querySelector('#navigator-tab-content');
          if (content) {
            content.innerHTML = renderNavigatorStopsHTML(selectedDay);
          }
        }
        break;
      }
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

      case 'toggle-all-answers':
        e.preventDefault();
        if (window.toggleAllAnswers) window.toggleAllAnswers(target.closest('details'));
        break;

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
