import { appStore } from './store.js';
import { renderLesson } from './lesson_renderer.js';
import { renderKeyTopicLessonsHTML } from '../lesson_cards.js';
import { renderCoverSourcesHTML } from '../cover_sources.js';
import { getAssetUrl } from './assets.js';
import { renderExamPracticeZone } from '../exam_practice_zone.js';
import { renderQuizZone } from '../quiz_zone.js';
import {
  sectionAGuide,
  sectionBGuide,
  middleEastGuide,
  weimarGuide,
  elizabethGuide,
} from '../exam_guide_content.js';

export function renderHomepage() {
  const unitData = appStore.state.activeUnitData;
  let lessonsHTML = renderKeyTopicLessonsHTML(
    unitData,
    window.currentUnitId,
    window.currentUnitData,
  );

  let topSectionHTML = '';

  if (appStore.state.activeUnitData.type === 'trip') {
    const coverImage = appStore.state.activeUnitData.cover_image
      ? getAssetUrl(appStore.state.activeUnitData.cover_image)
      : '';

    let prepLessonIndex = -1;
    let prepLesson = null;
    if (appStore.state.activeUnitData.lessons) {
      appStore.state.activeUnitData.lessons.forEach((l, i) => {
        if (l.id === 'day_0') {
          prepLessonIndex = i;
          prepLesson = l;
        }
      });
    }

    topSectionHTML = `
        <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: stretch;">
          <div style="flex: 1.2; min-width: 300px; padding: 40px;">
            <h1 style="font-family: 'Playfair Display', serif; font-size: 2.8rem; color: #1a237e; margin: 0 0 10px 0; line-height: 1.1;">
              ${appStore.state.activeUnitData.title || 'Featured Battlefield Tour'}
            </h1>
            <h2 style="font-size: 1.3rem; color: #64748b; font-weight: 400; margin: 0 0 30px 0;">
              ${appStore.state.activeUnitData.enquiry_question || appStore.state.activeUnitData.enquiry || 'Join the expedition'}
            </h2>
            
            ${
              prepLesson
                ? `
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 25px; margin-top: 20px;">
              <h3 style="margin: 0 0 10px 0; color: #334155; font-size: 1.2rem; display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-suitcase-rolling" style="color: #f59e0b;"></i> Final Preparations
              </h3>
              <p style="margin: 0 0 15px 0; color: #475569; font-size: 0.95rem;">
                ${prepLesson.enquiry || 'What to Pack & Logistics'}
              </p>
              <button class="btn-pedagogy-primary" data-action="render-lesson" data-index="${prepLessonIndex}" style="background: #2563eb; color: white; padding: 10px 20px; border-radius: 6px; font-weight: 600; border: none; cursor: pointer; transition: background 0.2s; box-shadow: 0 4px 6px rgba(37,99,235,0.2);" onmouseover="this.style.background='#1d4ed8'" onmouseout="this.style.background='#2563eb'">
                View Prep Pack
              </button>
            </div>
            `
                : ''
            }

          </div>
          
          <!-- Right Column -->
          <div style="flex: 1; min-width: 300px; padding: 20px;">
             <div style="width: 100%; height: 100%; min-height: 300px; background-image: url('${coverImage}'); background-size: cover; background-position: center; border-radius: 12px; box-shadow: 0 8px 25px rgba(0,0,0,0.15);"></div>
          </div>
        </div>
      `;
  } else {
    let heroImage =
      appStore.state.activeUnitData.homepage_background ||
      (typeof appStore.state.activeUnitData.cover_image === 'string'
        ? appStore.state.activeUnitData.cover_image
        : null);

    let heroImageUrl = '';
    if (heroImage) {
      heroImageUrl = getAssetUrl(heroImage);
    } else if (
      Array.isArray(appStore.state.activeUnitData.cover_image) &&
      appStore.state.activeUnitData.cover_image.length > 0
    ) {
      heroImageUrl = getAssetUrl(appStore.state.activeUnitData.cover_image[0]);
    } else if (
      appStore.state.activeUnitData.cover_sources &&
      appStore.state.activeUnitData.cover_sources.length > 0
    ) {
      heroImageUrl = getAssetUrl(appStore.state.activeUnitData.cover_sources[0].image);
    }

    if (heroImageUrl) {
      topSectionHTML = `
          <div class="hero-container" style="background: linear-gradient(to bottom, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.1) 100%), url('${heroImageUrl}') center/cover no-repeat;">
            <h1 class="hero-title">${appStore.state.activeUnitData.enquiry_question || appStore.state.activeUnitData.enquiry || 'Unit Enquiry'}</h1>
            <h2 class="hero-subtitle">
              ${appStore.state.activeUnitData.title}
            </h2>
            ${appStore.state.activeUnitData.cover_caption ? `<p class="hero-caption">${appStore.state.activeUnitData.cover_caption}</p>` : ''}
          </div>
          <div style="padding: 20px 30px 0 30px; background: white;">
            ${renderCoverSourcesHTML(appStore.state.activeUnitData, true)}
          </div>
        `;
    } else {
      topSectionHTML = `
          <div style="text-align: center; padding-bottom: 50px;">
            <h1 class="enquiry-title" style="font-family: 'Playfair Display', serif; font-size: clamp(1.65rem, 5.2vw, 2.7rem); line-height: 1.25; color: #1a237e; margin-bottom: 12px; hyphens: none; -webkit-hyphens: none; word-break: normal; overflow-wrap: normal; text-wrap: balance;">${appStore.state.activeUnitData.enquiry_question || appStore.state.activeUnitData.enquiry || 'Unit Enquiry'}</h1>
            <h2 style="font-size: clamp(1.05rem, 3.5vw, 1.35rem); color: #475569; font-weight: 500; margin-top: 0; margin-bottom: 24px;">
              ${appStore.state.activeUnitData.title}
            </h2>
            
            ${renderCoverSourcesHTML(appStore.state.activeUnitData)}
            
            ${appStore.state.activeUnitData.cover_caption ? `<p style="margin-top: 5px; margin-bottom: 20px; font-style: italic; color: #64748b; font-size: 0.95rem; text-align: center; max-width: 800px; margin-left: auto; margin-right: auto;">${appStore.state.activeUnitData.cover_caption}</p>` : ''}
          </div>
        `;
    }
  }

  const isTripUnit =
    appStore.state.activeUnitData.type === 'trip' ||
    window.currentUnitId === 'trip_ypres' ||
    (unitData && unitData.type === 'trip');

  let medicineVisualGuideBannerHTML = '';
  if (window.currentUnitId === 'edexcel_medicine') {
    medicineVisualGuideBannerHTML = `
      <div class="med-visual-guide-hub-card" style="margin: 28px 0 20px 0; background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #172554 100%); border-radius: 14px; padding: 24px 28px; color: #ffffff; box-shadow: 0 10px 30px -5px rgba(30, 58, 138, 0.4); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; border: 1.5px solid rgba(255,255,255,0.15); position: relative; overflow: hidden;">
        <div style="position: absolute; right: -20px; top: -30px; font-size: 13rem; color: rgba(255, 255, 255, 0.03); pointer-events: none; z-index: 0;">
          <i class="fa-solid fa-book-open"></i>
        </div>
        <div style="flex: 1; min-width: 290px; position: relative; z-index: 1;">
          <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(59, 130, 246, 0.25); border: 1px solid rgba(147, 197, 253, 0.4); padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px; color: #93c5fd;">
            <i class="fa-solid fa-star"></i> Featured Revision Masterclass &bull; 40 Pages
          </div>
          <h3 style="margin: 0 0 6px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 1.6rem; font-weight: 800; color: #ffffff; line-height: 1.25;">
            40-Page Visual Revision &amp; Exam Assessment Playbook
          </h3>
          <p style="margin: 0 0 12px 0; color: #cbd5e1; font-size: 0.94rem; line-height: 1.45; max-width: 680px;">
            Complete Paper 1 companion: 18 double-page spreads covering Medieval, Renaissance, Industrial, Modern &amp; Western Front, step-by-step paragraph formulas for Q1&ndash;Q6, Grade 9 examiner WAGOLLs, and official 1h 20m exam timing models.
          </p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; font-size: 0.76rem;">
            <span style="background: rgba(255,255,255,0.12); padding: 3px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.18);"><i class="fa-regular fa-clock" style="color: #38bdf8;"></i> 1h 20m Pacing Blueprint</span>
            <span style="background: rgba(255,255,255,0.12); padding: 3px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.18);"><i class="fa-solid fa-award" style="color: #fbbf24;"></i> Grade 7&ndash;9 Examiner Toolkit</span>
            <span style="background: rgba(255,255,255,0.12); padding: 3px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.18);"><i class="fa-solid fa-print" style="color: #a78bfa;"></i> Photocopier Ready</span>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px; flex-shrink: 0; position: relative; z-index: 1;">
          <a href="/units/edexcel_medicine/visual_revision_guide.html" target="_blank" class="btn" style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: #ffffff; padding: 12px 22px; border-radius: 8px; font-weight: 700; font-size: 0.95rem; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)';" onmouseout="this.style.transform='none';">
            <i class="fa-solid fa-book-open"></i> Launch Interactive Playbook
          </a>
          <a href="/pdfs/edexcel_medicine_visual_revision_and_exam_guide.pdf" target="_blank" class="btn" style="background: rgba(255,255,255,0.12); color: #ffffff; border: 1px solid rgba(255,255,255,0.25); padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 0.9rem; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.12)'">
            <i class="fa-solid fa-file-pdf"></i> Download PDF (40 Pages)
          </a>
        </div>
      </div>
    `;
  }

  contentArea.innerHTML = `
      <div>
        ${topSectionHTML}
        ${medicineVisualGuideBannerHTML}
        ${isTripUnit ? '' : `<h2 style="margin-top: 40px; text-align: left; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Key Topic Lessons</h2>`}
        ${lessonsHTML}
      </div>
    `;

  // Add click listeners to cards
  const cards = contentArea.querySelectorAll('.homepage-lesson-card');
  cards.forEach((card) => {
    card.addEventListener('mouseover', () => {
      card.style.transform = 'translateY(-3px)';
      card.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)';
    });
    card.addEventListener('mouseout', () => {
      card.style.transform = 'none';
      card.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
    });
    card.addEventListener('click', () => {
      if (!card.hasAttribute('data-index')) return;
      const idx = parseInt(card.dataset.index);
      document.querySelectorAll('.lesson-link').forEach((l) => l.classList.remove('active'));
      renderLesson(appStore.state.activeUnitData.lessons[idx]);
      (document.getElementById('content-area') || window).scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

export function renderSidebar() {
  const navContainer = document.getElementById('sidebar-nav-container') || sidebar;
  const unitData = appStore.state.activeUnitData;
  navContainer.innerHTML = '';

  // Unit Homepage Tab
  const homeLink = document.createElement('a');
  homeLink.className = 'lesson-link active';
  homeLink.innerHTML = '<i class="fa-solid fa-home" style="margin-right: 8px;"></i> Unit Homepage';
  homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.lesson-link').forEach((l) => l.classList.remove('active'));
    homeLink.classList.add('active');
    renderHomepage();
    (document.getElementById('content-area') || window).scrollTo({ top: 0, behavior: 'smooth' });
  });
  navContainer.appendChild(homeLink);

  // Trip Days Sidebar Tabs
  if (appStore.state.activeUnitData.type === 'trip') {
    let prepPack = null;
    const days = [];

    appStore.state.activeUnitData.lessons.forEach((lesson, index) => {
      if (lesson.id === 'day_0') prepPack = { lesson, index };
      else if (lesson.id === 'day_1' || lesson.id === 'day_2' || lesson.id === 'day_3')
        days.push({ lesson, index });
    });

    if (prepPack) {
      const prepLink = document.createElement('a');
      prepLink.className = 'lesson-link';
      prepLink.innerHTML =
        '<i class="fa-solid fa-suitcase-rolling" style="margin-right: 8px; color: #0284c7;"></i> Pre-Trip Information';
      prepLink.href = '#';
      prepLink.onclick = (e) => {
        e.preventDefault();
        document.querySelectorAll('.lesson-link').forEach((l) => l.classList.remove('active'));
        prepLink.classList.add('active');
        window.renderLessonByIndex(prepPack.index);
      };
      navContainer.appendChild(prepLink);
    }

    days.forEach((d) => {
      const dayLink = document.createElement('a');
      dayLink.className = 'lesson-link';
      dayLink.innerHTML =
        '<i class="fa-solid fa-map-location-dot" style="margin-right: 8px;"></i> ' +
        (d.lesson.title.split(':')[0] || d.lesson.title);
      dayLink.href = '#';
      dayLink.onclick = (e) => {
        e.preventDefault();
        document.querySelectorAll('.lesson-link').forEach((l) => l.classList.remove('active'));
        dayLink.classList.add('active');
        window.renderLessonByIndex(d.index);
      };
      navContainer.appendChild(dayLink);
    });
  }

  // The Fallen / Local Heroes Sidebar Accordion (Trips only) - Removed per user request

  // Exam Specification Tab
  if (appStore.state.activeUnitData.specification_file) {
    const specLink = document.createElement('a');
    specLink.className = 'lesson-link';
    const specTitle =
      appStore.state.activeUnitData.title && appStore.state.activeUnitData.title.includes('KS3')
        ? 'Curriculum Overview'
        : 'Exam Specification';
    specLink.innerHTML = `<i class="fa-solid fa-list-check" style="margin-right: 8px;"></i> ${specTitle}`;
    specLink.href = appStore.state.activeUnitData.specification_file;
    specLink.onclick = (e) => {
      e.preventDefault();
      document.querySelectorAll('.lesson-link').forEach((l) => l.classList.remove('active'));
      specLink.classList.add('active');
      const contentArea = document.getElementById('content-area');
      contentArea.innerHTML = '';
      import('/src/spec_viewer.js').then((module) => {
        module.initSpecViewer(contentArea, appStore.state.activeUnitData.specification_file);
      });
    };
    navContainer.appendChild(specLink);
  }

  // Exam Masterclass Guide Tab - ONLY for KS4 units
  if (
    appStore.state.activeUnitData.type !== 'trip' &&
    (!appStore.state.activeUnitData.title || !appStore.state.activeUnitData.title.includes('KS3'))
  ) {
    const guideLink = document.createElement('a');
    guideLink.className = 'lesson-link';
    guideLink.innerHTML =
      '<i class="fa-solid fa-graduation-cap" style="margin-right: 8px;"></i> Exam Masterclass Guide';
    guideLink.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.lesson-link').forEach((l) => l.classList.remove('active'));
      guideLink.classList.add('active');
      renderExamGuide();
      (document.getElementById('content-area') || window).scrollTo({ top: 0, behavior: 'smooth' });
    });
    navContainer.appendChild(guideLink);
  }

  // Thematic Matrix Tab (Change & Continuity) - Only for Medicine
  if (window.currentUnitId === 'edexcel_medicine') {
    const thematicLink = document.createElement('a');
    thematicLink.className = 'lesson-link';
    thematicLink.innerHTML =
      '<i class="fa-solid fa-timeline" style="margin-right: 8px;"></i> Thematic Matrix (Change & Continuity)';
    thematicLink.style.background = 'rgba(56, 189, 248, 0.1)';
    thematicLink.style.borderLeft = '3px solid #38bdf8';
    thematicLink.addEventListener('click', async (e) => {
      e.preventDefault();
      document.querySelectorAll('.lesson-link').forEach((l) => l.classList.remove('active'));
      thematicLink.classList.add('active');

      const { renderThematicMatrix } = await import('../thematic_matrix.js');
      const contentArea = document.getElementById('content-area');
      renderThematicMatrix(contentArea, unitData);

      (document.getElementById('content-area') || window).scrollTo({ top: 0, behavior: 'smooth' });
    });
    navContainer.appendChild(thematicLink);

    // Visual Revision Masterclass (40-Page Guide) Link
    const masterclassLink = document.createElement('a');
    masterclassLink.className = 'lesson-link';
    masterclassLink.innerHTML =
      '<i class="fa-solid fa-book-open" style="margin-right: 8px; color: #3b82f6;"></i> 📖 Visual Revision Masterclass (40 Pages)';
    masterclassLink.style.background = 'rgba(59, 130, 246, 0.1)';
    masterclassLink.style.borderLeft = '3px solid #3b82f6';
    masterclassLink.style.fontWeight = '600';
    masterclassLink.href = '/units/edexcel_medicine/visual_revision_guide.html';
    masterclassLink.target = '_blank';
    masterclassLink.title = 'Open the 40-Page Visual Revision & Exam Assessment Masterclass Guide';
    navContainer.appendChild(masterclassLink);
  }

  if (
    appStore.state.activeUnitData.type !== 'trip' &&
    window.currentUnitId !== 'medieval_england' &&
    window.currentUnitId !== 'early_modern_world' &&
    window.currentUnitId !== 'industrialisation_and_empire' &&
    window.currentUnitId !== 'australia'
  ) {
    const examPracticeLink = document.createElement('a');
    examPracticeLink.className = 'lesson-link';
    examPracticeLink.innerHTML =
      appStore.state.activeUnitData.title && appStore.state.activeUnitData.title.includes('KS3')
        ? '✍️ Assessments'
        : '✍️ Assessments & Exam Practice';
    examPracticeLink.style.marginTop = '15px';
    examPracticeLink.style.color = '#60a5fa'; // Blue-400
    examPracticeLink.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.lesson-link').forEach((l) => l.classList.remove('active'));
      examPracticeLink.classList.add('active');
      const contentArea = document.getElementById('content-area');
      contentArea.innerHTML = ''; // clear
      renderExamPracticeZone(contentArea, unitData);
      (document.getElementById('content-area') || window).scrollTo({ top: 0, behavior: 'smooth' });
    });
    navContainer.appendChild(examPracticeLink);
  }

  if (
    appStore.state.activeUnitData.type !== 'trip' &&
    unitData.mock_exams &&
    Array.isArray(unitData.mock_exams) &&
    unitData.mock_exams.length > 0
  ) {
    const mockExamsLink = document.createElement('a');
    mockExamsLink.className = 'lesson-link';
    mockExamsLink.innerHTML =
      '<i class="fa-solid fa-file-signature" style="margin-right: 8px; color: #ef4444;"></i> GCSE Mock Exams';
    mockExamsLink.style.marginTop = '15px';
    mockExamsLink.style.color = '#f87171'; // Red-400
    mockExamsLink.addEventListener('click', async (e) => {
      e.preventDefault();
      document.querySelectorAll('.lesson-link').forEach((l) => l.classList.remove('active'));
      mockExamsLink.classList.add('active');
      if (window.switchView) {
        window.switchView('mock-exams', window.currentUnitId);
      } else {
        const { renderMockExamsView } = await import('../views.js');
        renderMockExamsView();
      }
      (document.getElementById('content-area') || window).scrollTo({ top: 0, behavior: 'smooth' });
    });
    navContainer.appendChild(mockExamsLink);
  }

  if (appStore.state.activeUnitData.type !== 'trip') {
    const quizPackLink = document.createElement('a');
    quizPackLink.id = 'quiz-zone-link';
    quizPackLink.className = 'lesson-link';
    quizPackLink.innerHTML = '<i class="fa-solid fa-layer-group"></i> Interactive Revision Hub';
    quizPackLink.style.marginTop = '15px';
    quizPackLink.style.color = '#34d399'; // Emerald-400
    quizPackLink.style.cursor = 'pointer';
    quizPackLink.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.lesson-link').forEach((l) => l.classList.remove('active'));
      quizPackLink.classList.add('active');
      const contentArea = document.getElementById('content-area');
      contentArea.innerHTML = '';
      renderQuizZone(contentArea, unitData);
      (document.getElementById('content-area') || window).scrollTo({ top: 0, behavior: 'smooth' });
    });
    navContainer.appendChild(quizPackLink);
  }

  if (
    appStore.state.activeUnitData.type !== 'trip' &&
    window.currentUnitId !== 'medieval_england' &&
    window.currentUnitId !== 'water_and_sanitation' &&
    window.currentUnitId !== 'early_modern_world' &&
    window.currentUnitId !== 'edexcel_medicine' &&
    window.currentUnitId !== 'great_war' &&
    window.currentUnitId !== 'great_war_part2' &&
    window.currentUnitId !== 'industrialisation_and_empire' &&
    window.currentUnitId !== 'australia'
  ) {
    const cheatSheetLink = document.createElement('a');
    cheatSheetLink.className = 'lesson-link';
    cheatSheetLink.innerHTML = '<i class="fa-solid fa-file-invoice"></i> Revision Cheat Sheet';
    cheatSheetLink.href = window.currentUnitId
      ? `/units/${window.currentUnitId}/cheat_sheet.html`
      : 'cheat_sheet.html';
    cheatSheetLink.target = '_blank';
    cheatSheetLink.style.marginTop = '15px';

    navContainer.appendChild(cheatSheetLink);
  }

  if (window.currentUnitId === 'usa') {
    const tradingLink = document.createElement('a');
    tradingLink.className = 'lesson-link';
    tradingLink.innerHTML =
      '<i class="fa-solid fa-layer-group" style="color: #facc15; margin-right: 8px;"></i> Historical Hooligans (Top Trumps)';
    tradingLink.href = '/units/usa/trading_cards.html';
    tradingLink.target = '_blank';
    tradingLink.style.marginTop = '12px';
    navContainer.appendChild(tradingLink);

    const arcadeLink = document.createElement('a');
    arcadeLink.className = 'lesson-link';
    arcadeLink.innerHTML =
      '<i class="fa-solid fa-gamepad" style="color: #06b6d4; margin-right: 8px;"></i> Falling Blocks Arcade';
    arcadeLink.href = '/units/usa/falling_blocks.html';
    arcadeLink.target = '_blank';
    arcadeLink.style.marginTop = '8px';
    navContainer.appendChild(arcadeLink);

    const worksheetLink = document.createElement('a');
    worksheetLink.className = 'lesson-link';
    worksheetLink.innerHTML =
      '<i class="fa-solid fa-file-pen" style="color: #3b82f6; margin-right: 8px;"></i> Civil Rights Revision Worksheet';
    worksheetLink.href = '/units/usa/revision_worksheet_civil_rights.html';
    worksheetLink.target = '_blank';
    worksheetLink.style.marginTop = '8px';
    navContainer.appendChild(worksheetLink);
  }

  if (appStore.state.activeUnitData.guided_reading) {
    const grLink = document.createElement('a');
    grLink.className = 'lesson-link';
    grLink.innerHTML =
      '<i class="fa-solid fa-book-open-reader" style="margin-right: 8px;"></i> Guided Reading';
    grLink.style.marginTop = '15px';
    grLink.style.color = '#10b981'; // Emerald-500
    grLink.href = '#';
    grLink.addEventListener('click', async (e) => {
      e.preventDefault();

      if (e.isTrusted !== false) {
        const url = new URL(window.location);
        url.searchParams.set('tab', 'guided_reading');
        history.pushState({ customTab: 'guided_reading' }, '', url);
      }

      document.querySelectorAll('.lesson-link').forEach((l) => l.classList.remove('active'));
      grLink.classList.add('active');

      const { initGuidedReadingTask } = await import('../guided_reading.js');
      const contentArea = document.getElementById('content-area');
      contentArea.innerHTML = '';
      initGuidedReadingTask(contentArea, appStore.state.activeUnitData.guided_reading);
      (document.getElementById('content-area') || window).scrollTo({ top: 0, behavior: 'smooth' });
    });
    navContainer.appendChild(grLink);
  }

  // Attach Pupil Workbooks dynamically as a single Zone
  if (
    appStore.state.activeUnitData.type !== 'trip' &&
    appStore.state.activeUnitData.workbooks &&
    appStore.state.activeUnitData.workbooks.length > 0
  ) {
    const wbLink = document.createElement('a');
    wbLink.className = 'lesson-link';
    wbLink.innerHTML = `<i class="fa-solid fa-print"></i> Print & PDF Hub`;
    wbLink.style.marginTop = '15px';
    wbLink.style.color = '#8b5cf6'; // Purple icon/text focus
    wbLink.addEventListener('click', async (e) => {
      e.preventDefault();
      document.querySelectorAll('.lesson-link').forEach((l) => l.classList.remove('active'));
      wbLink.classList.add('active');
      const contentArea = document.getElementById('content-area');
      contentArea.innerHTML = '';
      const { renderWorkbooksZone } = await import('../workbooks_zone.js');
      renderWorkbooksZone(contentArea, appStore.state.activeUnitData);
      (document.getElementById('content-area') || window).scrollTo({ top: 0, behavior: 'smooth' });
    });
    navContainer.appendChild(wbLink);
  }
}

export function renderExamGuide() {
  const contentArea = document.getElementById('content-area');
  contentArea.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'dashboard-container';

  let contentHtml = '';
  if (
    appStore.state.activeUnitData.title &&
    appStore.state.activeUnitData.title.toLowerCase().includes('medicine')
  ) {
    contentHtml = `
        <div class="welcome-banner" style="background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%); padding: 40px; border-radius: 8px; margin-bottom: 20px;">
          <div>
            <h1 class="welcome-title" style="color: #ffffff; margin-top: 0; margin-bottom: 10px;">Exam Masterclass Guide</h1>
            <p class="welcome-subtitle" style="color: #e2e8f0; font-size: 1.15rem; margin: 0;">The Pearson Edexcel GCSE (9-1) History Paper 1</p>
          </div>
        </div>
        <div style="background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px;">
          ${typeof sectionAGuide !== 'undefined' ? sectionAGuide : ''}
          ${typeof sectionBGuide !== 'undefined' ? sectionBGuide : ''}
        </div>
      `;
  } else if (
    appStore.state.activeUnitData.title &&
    appStore.state.activeUnitData.title.toLowerCase().includes('middle east')
  ) {
    contentHtml = `
        <div class="welcome-banner" style="background: linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%); padding: 40px; border-radius: 8px; margin-bottom: 20px;">
          <div>
            <h1 class="welcome-title" style="color: #ffffff; margin-top: 0; margin-bottom: 10px;">Exam Masterclass Guide</h1>
            <p class="welcome-subtitle" style="color: #fecaca; font-size: 1.15rem; margin: 0;">The Pearson Edexcel GCSE (9-1) History Paper 2</p>
          </div>
        </div>
        <div style="background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px;">
          ${typeof middleEastGuide !== 'undefined' ? middleEastGuide : ''}
        </div>
      `;
  } else if (
    appStore.state.activeUnitData.title &&
    (appStore.state.activeUnitData.title.toLowerCase().includes('weimar') ||
      appStore.state.activeUnitData.title.toLowerCase().includes('germany'))
  ) {
    contentHtml = `
        <div class="welcome-banner" style="background: linear-gradient(135deg, #334155 0%, #0f172a 100%); padding: 40px; border-radius: 8px; margin-bottom: 20px;">
          <div>
            <h1 class="welcome-title" style="color: #ffffff; margin-top: 0; margin-bottom: 10px;">Exam Masterclass Guide</h1>
            <p class="welcome-subtitle" style="color: #cbd5e1; font-size: 1.15rem; margin: 0;">The Pearson Edexcel GCSE (9-1) History Paper 3</p>
          </div>
        </div>
        <div style="background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px;">
          ${typeof weimarGuide !== 'undefined' ? weimarGuide : ''}
        </div>
      `;
  } else if (
    appStore.state.activeUnitData.title &&
    (appStore.state.activeUnitData.title.toLowerCase().includes('elizabeth') ||
      appStore.state.activeUnitData.title.toLowerCase().includes('armada'))
  ) {
    contentHtml = `
        <div class="welcome-banner" style="background: linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%); padding: 40px; border-radius: 8px; margin-bottom: 20px;">
          <div>
            <h1 class="welcome-title" style="color: #ffffff; margin-top: 0; margin-bottom: 10px;">Exam Masterclass Guide</h1>
            <p class="welcome-subtitle" style="color: #ddd6fe; font-size: 1.15rem; margin: 0;">The Pearson Edexcel GCSE (9-1) History Paper 2</p>
          </div>
        </div>
        <div style="background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px;">
          ${typeof elizabethGuide !== 'undefined' ? elizabethGuide : ''}
        </div>
      `;
  } else {
    contentHtml = `
        <div class="welcome-banner" style="background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%); padding: 40px; border-radius: 8px; margin-bottom: 20px;">
          <div>
            <h1 class="welcome-title" style="color: #ffffff; margin-top: 0; margin-bottom: 10px;">Exam Masterclass Guide</h1>
            <p class="welcome-subtitle" style="color: #e2e8f0; font-size: 1.15rem; margin: 0;">Revision strategies for this unit</p>
          </div>
        </div>
        <div style="background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px;">
          <p>No specific exam guidance is available for this unit yet.</p>
        </div>
      `;
  }

  container.innerHTML = contentHtml;
  contentArea.appendChild(container);
}
