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

  if (state.selectedUnitId === 'cme_new' || window.currentUnitId === 'cme_new') {
    const cmeClassroomSets = [
      {
        id: 'KT1',
        title: 'KT1: The Birth of the State of Israel (1945–63)',
        color: '#0284c7',
      },
      {
        id: 'KT2',
        title: 'KT2: The Escalating Conflict (1964–73)',
        color: '#dc2626',
      },
      {
        id: 'KT3',
        title: 'KT3: Attempts at a Solution (1974–95)',
        color: '#059669',
      },
    ];

    let cmeHubHtml = `
      <div style="background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px; border-top: 4px solid #0284c7;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px;">
          <div style="display: flex; align-items: center; gap: 15px;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.3rem;">
              <i class="fa-solid fa-print"></i>
            </div>
            <div>
              <h2 style="color: #0f172a; margin: 0; font-size: 1.35rem;">Classroom Sets &amp; 1-Click Print Previews</h2>
              <p style="color: #64748b; font-size: 0.95rem; margin: 4px 0 0 0;">Inspect interactive iframe previews and print full classroom sets of A3 Placemats, A4 Workouts, and Pocket Trifolds before your lesson.</p>
            </div>
          </div>
          <span style="font-size: 0.8rem; font-weight: 700; background: #e0f2fe; color: #0284c7; padding: 4px 12px; border-radius: 20px;">Direct In-Browser Printing</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
    `;

    cmeClassroomSets.forEach((kt) => {
      cmeHubHtml += `
        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; gap: 15px;">
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 0.75rem; font-weight: 800; background: ${kt.color}15; color: ${kt.color}; padding: 3px 8px; border-radius: 4px; border: 1px solid ${kt.color}30;">${kt.id}</span>
              <span style="font-size: 0.78rem; color: #64748b;"><i class="fa-solid fa-users"></i> Class Set</span>
            </div>
            <h3 style="margin: 0; color: #1e293b; font-size: 1.1rem; line-height: 1.3;">${kt.title}</h3>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <button type="button" class="btn" onclick="window.openTeacherPrintPreview('cme_placemat_${kt.id}', 'A3 Revision Placemat: ${kt.title}', '/pdfs/cme_new/cme_placemat_${kt.id}.pdf')" style="width: 100%; text-align: left; background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 4px solid #0284c7; padding: 10px 14px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; font-size: 0.88rem; font-weight: 600; color: #1e293b; transition: all 0.2s ease;" onmouseover="this.style.borderColor='#0284c7'; this.style.boxShadow='0 2px 6px rgba(2,132,199,0.2)';" onmouseout="this.style.borderColor='#cbd5e1'; this.style.borderLeftColor='#0284c7'; this.style.boxShadow='none';">
              <span style="display: flex; align-items: center; gap: 8px;"><i class="fa-solid fa-table-cells" style="color: #0284c7;"></i> A3 Placemat Spread</span>
              <span style="color: #0284c7; font-size: 0.8rem;"><i class="fa-solid fa-eye"></i> Preview &amp; Print</span>
            </button>

            <button type="button" class="btn" onclick="window.openTeacherPrintPreview('cme_workout_${kt.id}', 'A4 Rapid Workout: ${kt.title}', '/pdfs/cme_new/cme_workout_${kt.id}.pdf')" style="width: 100%; text-align: left; background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 4px solid #7c3aed; padding: 10px 14px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; font-size: 0.88rem; font-weight: 600; color: #1e293b; transition: all 0.2s ease;" onmouseover="this.style.borderColor='#7c3aed'; this.style.boxShadow='0 2px 6px rgba(124,58,237,0.2)';" onmouseout="this.style.borderColor='#cbd5e1'; this.style.borderLeftColor='#7c3aed'; this.style.boxShadow='none';">
              <span style="display: flex; align-items: center; gap: 8px;"><i class="fa-solid fa-dumbbell" style="color: #7c3aed;"></i> A4 Workout Spread</span>
              <span style="color: #7c3aed; font-size: 0.8rem;"><i class="fa-solid fa-eye"></i> Preview &amp; Print</span>
            </button>

            <button type="button" class="btn" onclick="window.openTeacherPrintPreview('cme_trifold_${kt.id}', 'Pocket Trifold Zine: ${kt.title}', '/pdfs/cme_new/cme_trifold_${kt.id}.pdf')" style="width: 100%; text-align: left; background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 4px solid #059669; padding: 10px 14px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; font-size: 0.88rem; font-weight: 600; color: #1e293b; transition: all 0.2s ease;" onmouseover="this.style.borderColor='#059669'; this.style.boxShadow='0 2px 6px rgba(5,150,105,0.2)';" onmouseout="this.style.borderColor='#cbd5e1'; this.style.borderLeftColor='#059669'; this.style.boxShadow='none';">
              <span style="display: flex; align-items: center; gap: 8px;"><i class="fa-solid fa-map" style="color: #059669;"></i> Pocket Trifold Zine</span>
              <span style="color: #059669; font-size: 0.8rem;"><i class="fa-solid fa-eye"></i> Preview &amp; Print</span>
            </button>
          </div>
        </div>
      `;
    });

    cmeHubHtml += `
        </div>
      </div>
    `;
    html += cmeHubHtml;
  }

  container.innerHTML = html;
}
