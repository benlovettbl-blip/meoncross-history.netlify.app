import { state } from './state.js';
export function renderWorkbooksZone(container, unitData) {
  let html = `
    <div class="welcome-banner" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 40px; border-radius: 8px; margin-bottom: 20px;">
      <div>
        <h1 class="welcome-title" style="color: #ffffff; margin-top: 0; margin-bottom: 10px;">Print & PDF Hub</h1>
        <p class="welcome-subtitle" style="color: #e0f2fe; font-size: 1.15rem; margin: 0;">Download or print reading materials and workbooks for this unit.</p>
      </div>
    </div>
  `;

  const renderSection = (title, icon, description, color, items) => {
    let sectionHtml = `
      <div style="background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px;">
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
          <i class="fa-solid ${icon}" style="font-size: 1.5rem; color: ${color};"></i>
          <div>
            <h2 style="color: #0f172a; margin: 0;">${title}</h2>
            <p style="color: #64748b; font-size: 0.95rem; margin: 5px 0 0 0;">${description}</p>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 20px; text-align: left;">
    `;

    items.forEach((item) => {
      sectionHtml += `
        <div class="homepage-lesson-card" style="background: #f8fafc; border: 2px dashed ${color}; border-radius: 8px; padding: 25px 15px; text-align: center; cursor: pointer; transition: all 0.3s ease; display: flex; flex-direction: column; justify-content: center; align-items: center;" data-action="open-link" data-url="${item.url}" onmouseover="this.style.background='white'; this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 15px rgba(0,0,0,0.1)';" onmouseout="this.style.background='#f8fafc'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
           <i class="fa-solid ${icon}" style="font-size: 2.5rem; color: ${color}; margin-bottom: 15px;"></i>
           <h3 style="margin: 0; color: #334155; font-size: 1.1rem;">${item.title}</h3>
        </div>
      `;
    });

    sectionHtml += `
        </div>
      </div>
    `;
    return sectionHtml;
  };

  const getPdfUrl = (type, wbId) => {
    const isFull = wbId === 'full';
    const suffix = isFull ? type : `${type}_${wbId}`;
    return state.selectedUnitId || window.currentUnitId
      ? `/pdfs/${state.selectedUnitId || window.currentUnitId}_${suffix}_FINAL_V17.pdf`
      : `/pdfs/unknown_${suffix}_FINAL_V17.pdf`;
  };

  const getHtmlUrl = (wbId) => {
    const filename = wbId === 'full' ? 'pupil_workbook.html' : `pupil_workbook_${wbId}.html`;
    return state.selectedUnitId || window.currentUnitId
      ? `/units/${state.selectedUnitId || window.currentUnitId}/${filename}`
      : filename;
  };

  if (unitData.timeline && unitData.timeline.length > 0) {
    const timelineItems = [
      {
        title: 'Full Unit Timeline',
        url:
          state.selectedUnitId || window.currentUnitId
            ? `/pdfs/${state.selectedUnitId || window.currentUnitId}_timeline.pdf`
            : `/pdfs/unknown_timeline.pdf`,
      },
    ];
    html += renderSection(
      'Printable Timelines',
      'fa-clock-rotate-left',
      'A chronological overview of all key events in this unit, formatted for easy printing and revision.',
      '#14b8a6',
      timelineItems,
    );
  }

  if (unitData.workbooks && unitData.workbooks.length > 0) {
    const isSplit = unitData.workbooks[0].name !== 'full';

    // 1. Textbook PDFs
    const textbookItems = unitData.workbooks.map((wb) => ({
      title: wb.title || wb.name,
      url: getPdfUrl('textbook', wb.name || wb.id),
    }));
    html += renderSection(
      'Textbook PDFs',
      'fa-book-open',
      'Reading material only (no blank writing lines or tasks). Perfect for reading on a screen or printing as a class set of reading books.',
      '#3b82f6',
      textbookItems,
    );

    // 2. Pupil Workbook PDFs
    const pupilItems = unitData.workbooks.map((wb) => ({
      title: wb.title || wb.name,
      url: getPdfUrl('pupil_workbook', wb.name || wb.id),
    }));
    html += renderSection(
      'Pupil Workbook PDFs',
      'fa-user-pen',
      'Writing tasks only. Contains just the questions and blank spaces (assumes the student already has access to the Textbook).',
      '#f59e0b',
      pupilItems,
    );

    // 3. Mastery Pack PDFs
    const masteryPdfItems = unitData.workbooks.map((wb) => ({
      title: wb.title || wb.name,
      url:
        state.selectedUnitId || window.currentUnitId
          ? `/pdfs/${state.selectedUnitId || window.currentUnitId}_mastery_pack_${wb.name || wb.id}_FINAL_V17.pdf`
          : `/pdfs/unknown_mastery_pack_${wb.name || wb.id}_FINAL_V17.pdf`,
    }));
    html += renderSection(
      'Mastery Pack PDFs',
      'fa-shield-halved',
      'Comprehensive revision and mastery tasks designed to test deep knowledge retrieval.',
      '#d32f2f',
      masteryPdfItems,
    );

    // 4. Interactive Digital Mastery Packs & Flashcards
    const digitalMasteryItems = unitData.workbooks.map((wb) => {
      const uId = state.selectedUnitId || window.currentUnitId || 'great_war';
      const isFull = wb.name === 'full' || wb.id === 'full';
      const filename = isFull ? 'mastery_pack_full.html' : `mastery_pack_${wb.name || wb.id}.html`;
      return {
        title: `${wb.title || wb.name} (Interactive Web App)`,
        url: `/units/${uId}/${filename}`,
      };
    });
    html += renderSection(
      'Interactive Mastery Packs (Web & Flashcards)',
      'fa-bolt-lightning',
      'Launch the interactive mastery pack directly in your browser — featuring Leitner 3-box flashcards, Teacher Presentation Mode, and self-marking Vaults.',
      '#d97706',
      digitalMasteryItems,
    );
  }

  container.innerHTML = html;
}
