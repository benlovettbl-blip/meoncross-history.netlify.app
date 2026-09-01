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

    if (
      heroImage &&
      !appStore.state.activeUnitData.cover_sources &&
      !Array.isArray(appStore.state.activeUnitData.cover_image)
    ) {
      let imgUrl = getAssetUrl(heroImage);
      topSectionHTML = `
          <div class="hero-container" style="background: linear-gradient(to bottom, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.1) 100%), url('${imgUrl}') center/cover no-repeat;">
            <h1 class="hero-title">${appStore.state.activeUnitData.enquiry_question || appStore.state.activeUnitData.enquiry || 'Unit Enquiry'}</h1>
            <h2 class="hero-subtitle">
              ${appStore.state.activeUnitData.title}
            </h2>
            ${appStore.state.activeUnitData.cover_caption ? `<p class="hero-caption">${appStore.state.activeUnitData.cover_caption}</p>` : ''}
          </div>
        `;
    } else {
      topSectionHTML = `
          <div style="text-align: center; padding-bottom: 50px;">
            <h1 style="font-family: 'Playfair Display', serif; font-size: 2.8rem; color: #1a237e; margin-bottom: 10px; line-height: 1.2;">${appStore.state.activeUnitData.enquiry_question || appStore.state.activeUnitData.enquiry || 'Unit Enquiry'}</h1>
            <h2 style="font-size: 1.4rem; color: #475569; font-weight: 500; margin-top: 0; margin-bottom: 30px;">
              ${appStore.state.activeUnitData.title}
            </h2>
            
            ${renderCoverSourcesHTML(unitData, getAssetUrl)}
            
            ${appStore.state.activeUnitData.cover_caption ? `<p style="margin-top: 5px; margin-bottom: 20px; font-style: italic; color: #64748b; font-size: 0.95rem; text-align: center; max-width: 800px; margin-left: auto; margin-right: auto;">${appStore.state.activeUnitData.cover_caption}</p>` : ''}
          </div>
        `;
    }
  }

  const contentArea = document.getElementById('content-area');
  contentArea.innerHTML = `
      <div>
        ${topSectionHTML}
        
        <h2 style="margin-top: 40px; text-align: left; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">${appStore.state.activeUnitData.type === 'trip' ? 'Tour Itinerary' : 'Key Topic Lessons'}</h2>
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
    const days = [];
    appStore.state.activeUnitData.lessons.forEach((lesson, index) => {
      if (lesson.id && lesson.id.startsWith('day_')) days.push({ lesson, index });
    });
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
