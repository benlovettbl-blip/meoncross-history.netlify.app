import { state } from './state.js';
export function renderWorkbooksZone(container, unitData) {
  let html = `
    <div class="welcome-banner" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 32px 36px; border-radius: 12px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; box-shadow: 0 10px 25px -5px rgba(2, 132, 199, 0.3);">
      <div style="flex: 1; min-width: 280px;">
        <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.18); padding: 3px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; color: #ffffff; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">
          <i class="fa-solid fa-graduation-cap"></i> Teacher Planning Hub
        </div>
        <h1 class="welcome-title" style="color: #ffffff; margin-top: 0; margin-bottom: 8px; font-size: 1.85rem; font-weight: 800; letter-spacing: -0.02em;">Print &amp; PDF Hub</h1>
        <p class="welcome-subtitle" style="color: #e0f2fe; font-size: 1.05rem; margin: 0; max-width: 620px; line-height: 1.4;">Download reading materials, pupil workbooks, mastery packs, or generate last-minute emergency cover sheets with scannable QR codes.</p>
      </div>
      <div>
        <button id="btnOpenEmergencyCover" style="background: linear-gradient(135deg, #e11d48 0%, #be123c 100%); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 10px; padding: 12px 22px; font-size: 0.98rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 10px; box-shadow: 0 4px 16px rgba(225, 29, 72, 0.4); transition: all 0.2s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 22px rgba(225, 29, 72, 0.5)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 16px rgba(225, 29, 72, 0.4)';">
          <i class="fa-solid fa-truck-medical" style="font-size: 1.15rem;"></i>
          <span>Emergency Cover Generator</span>
        </button>
      </div>
    </div>

    <!-- Quick Unit Filter Navigation -->
    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; padding: 12px 18px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
      <span style="font-size: 0.8rem; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-right: 4px;">Jump to Unit:</span>
      <button type="button" onclick="window.switchView('booklet', 'cme_new')" style="background: ${state.selectedUnitId === 'cme_new' || window.currentUnitId === 'cme_new' ? '#0284c7' : '#f0f9ff'}; color: ${state.selectedUnitId === 'cme_new' || window.currentUnitId === 'cme_new' ? '#ffffff' : '#0369a1'}; border: 1px solid #bae6fd; font-size: 0.82rem; font-weight: 700; padding: 6px 14px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s ease;">
        <i class="fa-solid fa-dove"></i> ⭐ Middle East (Paper 2)
      </button>
      <button type="button" onclick="window.switchView('booklet', 'usa')" style="background: ${state.selectedUnitId === 'usa' || window.currentUnitId === 'usa' ? '#1e40af' : '#eff6ff'}; color: ${state.selectedUnitId === 'usa' || window.currentUnitId === 'usa' ? '#ffffff' : '#1e40af'}; border: 1px solid #bfdbfe; font-size: 0.82rem; font-weight: 700; padding: 6px 14px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s ease;">
        <i class="fa-solid fa-flag-usa"></i> USA 1954–75 (Paper 3)
      </button>
      <button type="button" onclick="window.switchView('booklet', 'edexcel_medicine')" style="background: ${state.selectedUnitId === 'edexcel_medicine' || window.currentUnitId === 'edexcel_medicine' ? '#0f766e' : '#f0fdfa'}; color: ${state.selectedUnitId === 'edexcel_medicine' || window.currentUnitId === 'edexcel_medicine' ? '#ffffff' : '#0f766e'}; border: 1px solid #99f6e4; font-size: 0.82rem; font-weight: 700; padding: 6px 14px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s ease;">
        <i class="fa-solid fa-notes-medical"></i> Medicine (Paper 1)
      </button>
      <button type="button" onclick="window.switchView('booklet', 'eee')" style="background: ${state.selectedUnitId === 'eee' || window.currentUnitId === 'eee' ? '#b45309' : '#fffbeb'}; color: ${state.selectedUnitId === 'eee' || window.currentUnitId === 'eee' ? '#ffffff' : '#b45309'}; border: 1px solid #fde68a; font-size: 0.82rem; font-weight: 700; padding: 6px 14px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s ease;">
        <i class="fa-solid fa-crown"></i> Early Elizabethan (Paper 2)
      </button>
      <button type="button" onclick="window.switchView('booklet', 'weimar_nazi_germany')" style="background: ${state.selectedUnitId === 'weimar_nazi_germany' || window.currentUnitId === 'weimar_nazi_germany' ? '#7f1d1d' : '#fef2f2'}; color: ${state.selectedUnitId === 'weimar_nazi_germany' || window.currentUnitId === 'weimar_nazi_germany' ? '#ffffff' : '#991b1b'}; border: 1px solid #fecaca; font-size: 0.82rem; font-weight: 700; padding: 6px 14px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s ease;">
        <i class="fa-solid fa-landmark"></i> Weimar Germany (Paper 3)
      </button>
      <button type="button" onclick="window.switchView('booklet')" style="background: ${!state.selectedUnitId && !window.currentUnitId ? '#0f172a' : '#f8fafc'}; color: ${!state.selectedUnitId && !window.currentUnitId ? '#ffffff' : '#475569'}; border: 1px solid #cbd5e1; font-size: 0.82rem; font-weight: 700; padding: 6px 14px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s ease;">
        <i class="fa-solid fa-layer-group"></i> All Curriculum Units &amp; KS3
      </button>
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

    // 4. Interactive Digital Mastery Packs & Flashcards (Skip for CME to keep print hub clean and unified)
    const isCmeUnit = state.selectedUnitId === 'cme_new' || window.currentUnitId === 'cme_new';
    if (!isCmeUnit) {
      const digitalMasteryItems = unitData.workbooks.map((wb) => {
        const uId = state.selectedUnitId || window.currentUnitId || 'great_war';
        const isFull = wb.name === 'full' || wb.id === 'full';
        const filename = isFull
          ? 'mastery_pack_full.html'
          : `mastery_pack_${wb.name || wb.id}.html`;
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
  }

  const activeUnit = state.selectedUnitId || window.currentUnitId;
  const showCme = !activeUnit || activeUnit === 'cme_new' || activeUnit === 'all';
  const showMed = !activeUnit || activeUnit === 'edexcel_medicine' || activeUnit === 'all';
  const showUsa = !activeUnit || activeUnit === 'usa' || activeUnit === 'all';

  if (showCme) {
    const cmeBooklets = [
      {
        id: 'PILLAR_1',
        title: '36-Page Visual Revision Masterclasses & Complete Specification Guide',
        pages: '36 Pages',
        badge: 'Pillar 1 • Revision Guide',
        color: '#0284c7',
        desc: 'The complete visual revision master volume: 12 double-page spreads across all 3 Key Topics, 4 full-page dedicated cartographic war atlases, word-for-word official Pearson specification checklist, 4 deep case studies per spread, causal pathways, GCSE word banks, and primary archival evidence.',
        fileBase: '/units/cme_new/revision_guide.html',
        pdfUrl: '/pdfs/cme_revision_guide.pdf',
      },
      {
        id: 'PILLAR_2',
        title: '36-Page Complete Exam Practice & Assessment Mastery Pack',
        pages: '36 Pages',
        badge: 'Pillar 2 • Exam Practice',
        color: '#1e3a8a',
        desc: 'The complete 36-page exam practice volume combining KT1, KT2, and KT3 together. Differentiated stepped ladder, dual-track question breakdowns, authentic exam simulations, and photocopier-safe response lines.',
        fileBase: '/units/cme_new/booklets/cme_mastery_FULL.html',
        pdfUrl: '/pdfs/cme_mastery_pack_FULL.pdf',
        digitalUnit: 'cme_new',
      },
      {
        id: 'PILLAR_3',
        title: 'Complete Unit Master Recall Quiz & Vault (All 200 Crucial Questions)',
        pages: '44 Pages',
        badge: 'Pillar 3 • Recall Quizzing',
        color: '#7c3aed',
        desc: 'The complete retrieval volume compiling all 200 knowledge recall questions across all 3 Key Topics. Includes memory hacking rules, RAG threat-level checkboxes, and complete Vault self-marking answer keys.',
        fileBase: '/units/cme_new/mastery_pack_full.html',
        pdfUrl: '/pdfs/cme_recall_quiz_FULL.pdf',
      },
    ];

    let cmeHubHtml = `
      <!-- CME Three Pillars Revision Suite -->
      <div style="background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px; border-top: 4px solid #0284c7;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px;">
          <div style="display: flex; align-items: center; gap: 15px;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: linear-gradient(135deg, #0284c7 0%, #0f172a 100%); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.3rem;">
              <i class="fa-solid fa-book-open"></i>
            </div>
            <div>
              <h2 style="color: #0f172a; margin: 0; font-size: 1.35rem;">Conflict in the Middle East — The Three Pillars Revision Suite</h2>
              <p style="color: #64748b; font-size: 0.95rem; margin: 4px 0 0 0;">Strictly 3 master volumes for Pearson Edexcel GCSE Paper 2 (Option P5): 1 Revision Guide, 1 Exam Mastery Pack, and 1 Recall Quiz Compendium.</p>
            </div>
          </div>
          <span style="font-size: 0.8rem; font-weight: 700; background: #e0f2fe; color: #0369a1; padding: 4px 12px; border-radius: 20px;">The Three Pillars Standard</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
    `;

    cmeBooklets.forEach((b) => {
      cmeHubHtml += `
        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; gap: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.03);">
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 0.75rem; font-weight: 800; background: ${b.color}15; color: ${b.color}; padding: 3px 8px; border-radius: 4px; border: 1px solid ${b.color}30;">${b.badge}</span>
              <span style="font-size: 0.78rem; font-weight: 700; color: #475569;"><i class="fa-solid fa-file-pdf" style="color: ${b.color}; margin-right: 4px;"></i>${b.pages}</span>
            </div>
            <h3 style="margin: 0 0 8px 0; color: #1e293b; font-size: 1.05rem; line-height: 1.35;">${b.title}</h3>
            <p style="margin: 0; font-size: 0.82rem; color: #64748b; line-height: 1.4;">${b.desc}</p>
          </div>

          <div style="display: flex; gap: 8px; margin-top: 5px; flex-wrap: wrap;">
            <button type="button" class="btn" onclick="window.openTeacherPrintPreview('${b.fileBase}', '${b.title}', '${b.pdfUrl}')" style="flex: 1; min-width: 110px; text-align: center; background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 4px solid ${b.color}; padding: 10px 8px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 0.85rem; font-weight: 600; color: #1e293b; transition: all 0.2s ease;" onmouseover="this.style.borderColor='${b.color}'; this.style.boxShadow='0 2px 6px rgba(0,0,0,0.1)';" onmouseout="this.style.borderColor='#cbd5e1'; this.style.borderLeftColor='${b.color}'; this.style.boxShadow='none';">
              <i class="fa-solid fa-eye" style="color: ${b.color};"></i> Preview &amp; Print
            </button>

            <a href="${b.pdfUrl}" target="_blank" download style="background: ${b.color}; color: #ffffff; padding: 10px 14px; border-radius: 6px; text-decoration: none; font-size: 0.85rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; transition: opacity 0.2s ease;" onmouseover="this.style.opacity='0.9';" onmouseout="this.style.opacity='1';">
              <i class="fa-solid fa-download"></i> PDF
            </a>

            <a href="${b.fileBase}" target="_blank" style="background: #0f172a; color: #ffffff; padding: 10px 12px; border-radius: 6px; text-decoration: none; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; transition: background 0.2s ease;" onmouseover="this.style.background='#1e293b';" onmouseout="this.style.background='#0f172a';" title="Open master booklet in a full browser tab">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Open in Tab
            </a>
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

  if (showMed) {
    const medBooklets = [
      {
        id: 'PILLAR_1',
        title: '40-Page Visual Revision Masterclasses & Complete Specification Playbook',
        pages: '40 Pages',
        badge: 'Pillar 1 • Revision Guide',
        color: '#2563eb',
        desc: 'The complete visual revision volume: 18 double-page spreads, complete Paper 1 specification blueprints, Q1–Q6 step-by-step paragraph formulas, Grade 9 examiner WAGOLLs, trigger phrase toolkits, and 1h 20m exam timing models.',
        fileBase: '/units/edexcel_medicine/visual_revision_guide.html',
        pdfUrl: '/pdfs/edexcel_medicine_visual_revision_and_exam_guide.pdf',
      },
      {
        id: 'PILLAR_2',
        title: '32-Page Complete Exam Practice & Assessment Compendium',
        pages: '32 Pages',
        badge: 'Pillar 2 • Exam Practice',
        color: '#0f766e',
        desc: 'The complete 32-page master volume binding Section A (Western Front: 4 complete sets for Somme, Ypres, Arras, Cambrai) and Section B (Thematic Study: Medieval, Renaissance, 18th/19th C Surgery & Public Health, Modern Britain & 21st C Science). Includes Source Typology Matrix, 2026 Senior Examiner Masterclass, and Specification Audit.',
        fileBase: '/units/edexcel_medicine/booklets/medicine_mastery_compendium_32page.html',
        pdfUrl: '/pdfs/med_mastery_pack_FULL.pdf',
        digitalUnit: 'edexcel_medicine',
      },
      {
        id: 'PILLAR_3',
        title: 'Paper 1 Complete Knowledge Retrieval Compendium (380 Recall Questions)',
        pages: '16 Pages',
        badge: 'Pillar 3 • Recall Quizzing',
        color: '#7c3aed',
        desc: 'The complete 16-page retrieval volume compiling all 380 rapid recall questions across Section A (Western Front) and Section B (Medieval, Renaissance, Industrial, Modern) with micro-checkboxes and quick-marking back banks.',
        fileBase: '/units/edexcel_medicine/med_recall_quiz_FULL.html',
        pdfUrl: '/pdfs/med_recall_quiz_pack_FULL.pdf',
      },
    ];

    let medHubHtml = `
      <div style="background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px; border-top: 4px solid #1e3a8a;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px;">
          <div style="display: flex; align-items: center; gap: 15px;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.3rem;">
              <i class="fa-solid fa-notes-medical"></i>
            </div>
            <div>
              <h2 style="color: #0f172a; margin: 0; font-size: 1.35rem;">Medicine Through Time — The Three Pillars Revision Suite</h2>
              <p style="color: #64748b; font-size: 0.95rem; margin: 4px 0 0 0;">Strictly 3 master volumes for Pearson Edexcel GCSE Paper 1 (1HI0/11): 1 Revision Guide, 1 Exam Mastery Pack, and 1 Recall Quiz Compendium.</p>
            </div>
          </div>
          <span style="font-size: 0.8rem; font-weight: 700; background: #e0e7ff; color: #1e3a8a; padding: 4px 12px; border-radius: 20px;">The Three Pillars Standard</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
    `;

    medBooklets.forEach((b) => {
      medHubHtml += `
        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; gap: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.03);">
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 0.75rem; font-weight: 800; background: ${b.color}15; color: ${b.color}; padding: 3px 8px; border-radius: 4px; border: 1px solid ${b.color}30;">${b.badge}</span>
              <span style="font-size: 0.78rem; font-weight: 700; color: #475569;"><i class="fa-solid fa-file-pdf" style="color: ${b.color}; margin-right: 4px;"></i>${b.pages}</span>
            </div>
            <h3 style="margin: 0 0 8px 0; color: #1e293b; font-size: 1.05rem; line-height: 1.35;">${b.title}</h3>
            <p style="margin: 0; font-size: 0.82rem; color: #64748b; line-height: 1.4;">${b.desc}</p>
          </div>

          <div style="display: flex; gap: 8px; margin-top: 5px; flex-wrap: wrap;">
            <button type="button" class="btn" onclick="window.openTeacherPrintPreview('${b.fileBase}', '${b.title}', '${b.pdfUrl}')" style="flex: 1; min-width: 110px; text-align: center; background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 4px solid ${b.color}; padding: 10px 8px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 0.85rem; font-weight: 600; color: #1e293b; transition: all 0.2s ease;" onmouseover="this.style.borderColor='${b.color}'; this.style.boxShadow='0 2px 6px rgba(0,0,0,0.1)';" onmouseout="this.style.borderColor='#cbd5e1'; this.style.borderLeftColor='${b.color}'; this.style.boxShadow='none';">
              <i class="fa-solid fa-eye" style="color: ${b.color};"></i> Preview &amp; Print
            </button>

            <a href="${b.pdfUrl}" target="_blank" download style="background: ${b.color}; color: #ffffff; padding: 10px 14px; border-radius: 6px; text-decoration: none; font-size: 0.85rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; transition: opacity 0.2s ease;" onmouseover="this.style.opacity='0.9';" onmouseout="this.style.opacity='1';">
              <i class="fa-solid fa-download"></i> PDF
            </a>

            <a href="${b.fileBase}" target="_blank" style="background: #0f172a; color: #ffffff; padding: 10px 12px; border-radius: 6px; text-decoration: none; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; transition: background 0.2s ease;" onmouseover="this.style.background='#1e293b';" onmouseout="this.style.background='#0f172a';" title="Open master booklet in a full browser tab">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Open in Tab
            </a>
          </div>
        </div>
      `;
    });

    medHubHtml += `
        </div>
      </div>
    `;
    html += medHubHtml;
  }

  if (showUsa) {
    const usaBooklets = [
      {
        id: 'PILLAR_1',
        title: '36-Page Visual Revision & Exam Assessment Playbook',
        pages: '36 Pages',
        badge: 'Pillar 1 • Revision Guide',
        color: '#1e40af',
        desc: 'The complete visual revision volume: 16 double-page spreads across all 4 Key Topics, complete Paper 3 specification blueprints, Q1–Q3 step-by-step paragraph formulas, Grade 9 examiner WAGOLLs, and full 1h 20m timed exam models.',
        fileBase: '/units/usa/visual_revision_guide.html',
        pdfUrl: '/pdfs/usa_visual_revision_guide.pdf',
      },
      {
        id: 'PILLAR_2',
        title: '48-Page Complete Unit Master Compendium (All 4 Key Topics Combined)',
        pages: '48 Pages',
        badge: 'Pillar 2 • Exam Practice',
        color: '#1e3a8a',
        desc: 'The complete 48-page revision compendium binding KT1, KT2, KT3, and KT4 together. Features 4 full Paper 3 exam paper simulations, 16 primary sources/interpretations, 4 specification boosters, and 24 Grade 8/9 exemplars. Photocopier-ready 12-sheet booklet!',
        fileBase: '/units/usa/booklets/usa_mastery_FULL.html',
        pdfUrl: '/pdfs/usa_mastery_pack_FULL.pdf',
      },
      {
        id: 'PILLAR_3',
        title: 'Complete Unit Master Recall Quiz (All 320 Crucial Questions)',
        pages: '54 Pages',
        badge: 'Pillar 3 • Recall Quizzing',
        color: '#7c3aed',
        desc: 'The master retrieval volume compiling all 320 knowledge recall questions across all 4 Key Topics. Includes memory hacking rules, RAG trackers, and complete Vault solutions. Print once for the entire year!',
        fileBase: '/units/usa/mastery_pack_full.html',
        pdfUrl: '/pdfs/usa_recall_quiz_FULL.pdf',
      },
    ];

    let usaHubHtml = `
      <div style="background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px; border-top: 4px solid #1e40af;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px;">
          <div style="display: flex; align-items: center; gap: 15px;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: linear-gradient(135deg, #1e40af 0%, #0f172a 100%); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.3rem;">
              <i class="fa-solid fa-flag-usa"></i>
            </div>
            <div>
              <h2 style="color: #0f172a; margin: 0; font-size: 1.35rem;">USA 1954–75 — The Three Pillars Revision Suite</h2>
              <p style="color: #64748b; font-size: 0.95rem; margin: 4px 0 0 0;">Strictly 3 master volumes for Pearson Edexcel GCSE Paper 3 (1HI0/33): 1 Revision Guide, 1 Exam Mastery Pack, and 1 Recall Quiz Compendium.</p>
            </div>
          </div>
          <span style="font-size: 0.8rem; font-weight: 700; background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 20px;">The Three Pillars Standard</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
    `;

    usaBooklets.forEach((b) => {
      usaHubHtml += `
        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; gap: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.03);">
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 0.75rem; font-weight: 800; background: ${b.color}15; color: ${b.color}; padding: 3px 8px; border-radius: 4px; border: 1px solid ${b.color}30;">${b.badge}</span>
              <span style="font-size: 0.78rem; font-weight: 700; color: #475569;"><i class="fa-solid fa-file-pdf" style="color: ${b.color}; margin-right: 4px;"></i>${b.pages}</span>
            </div>
            <h3 style="margin: 0 0 8px 0; color: #1e293b; font-size: 1.05rem; line-height: 1.35;">${b.title}</h3>
            <p style="margin: 0; font-size: 0.82rem; color: #64748b; line-height: 1.4;">${b.desc}</p>
          </div>

          <div style="display: flex; gap: 8px; margin-top: 5px; flex-wrap: wrap;">
            <button type="button" class="btn" onclick="window.openTeacherPrintPreview('${b.fileBase}', '${b.title}', '${b.pdfUrl}')" style="flex: 1; min-width: 110px; text-align: center; background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 4px solid ${b.color}; padding: 10px 8px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 0.85rem; font-weight: 600; color: #1e293b; transition: all 0.2s ease;" onmouseover="this.style.borderColor='${b.color}'; this.style.boxShadow='0 2px 6px rgba(0,0,0,0.1)';" onmouseout="this.style.borderColor='#cbd5e1'; this.style.borderLeftColor='${b.color}'; this.style.boxShadow='none';">
              <i class="fa-solid fa-eye" style="color: ${b.color};"></i> Preview &amp; Print
            </button>

            <a href="${b.pdfUrl}" target="_blank" download style="background: ${b.color}; color: #ffffff; padding: 10px 14px; border-radius: 6px; text-decoration: none; font-size: 0.85rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; transition: opacity 0.2s ease;" onmouseover="this.style.opacity='0.9';" onmouseout="this.style.opacity='1';">
              <i class="fa-solid fa-download"></i> PDF
            </a>

            ${
              b.id === 'PILLAR_2'
                ? `
            <a href="${b.fileBase}" target="_blank" class="btn" style="background: #0f172a; color: #ffffff; padding: 10px 14px; border-radius: 6px; text-decoration: none; font-size: 0.85rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; transition: background 0.2s ease; border: 1.5px solid #334155;" onmouseover="this.style.background='#1e293b';" onmouseout="this.style.background='#0f172a';" title="Launch interactive 48-page compendium with live 1h 20m exam clock and pupil typing mode">
              <i class="fa-solid fa-stopwatch" style="color: #38bdf8;"></i> Digital Twin (1h 20m)
            </a>
            `
                : `
            <a href="${b.fileBase}" target="_blank" style="background: #0f172a; color: #ffffff; padding: 10px 12px; border-radius: 6px; text-decoration: none; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; transition: background 0.2s ease;" onmouseover="this.style.background='#1e293b';" onmouseout="this.style.background='#0f172a';" title="Open master booklet in a full browser tab">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Open in Tab
            </a>
            `
            }
          </div>
        </div>
      `;
    });

    usaHubHtml += `
        </div>
      </div>
    `;
    html += usaHubHtml;
  }

  if (unitData.mock_exams && Array.isArray(unitData.mock_exams) && unitData.mock_exams.length > 0) {
    const unitId = state.selectedUnitId || window.currentUnitId || 'cme_new';

    let specTitle = 'Edexcel GCSE (9–1) History';
    let themeColor = '#ef4444';
    let defaultTime = '1 Hour 20 Mins';
    let defaultMarks = '52 Marks';

    if (unitId === 'cme_new') {
      specTitle = 'Paper 2: Conflict in the Middle East, 1945–1995 (1HI0/21)';
      themeColor = '#0284c7';
      defaultTime = '55 Mins';
      defaultMarks = '32 Marks';
    } else if (unitId === 'weimar_nazi_germany') {
      specTitle = 'Paper 3: Weimar and Nazi Germany, 1918–1939 (1HI0/31)';
      themeColor = '#7f1d1d';
      defaultTime = '1 Hour 20 Mins';
      defaultMarks = '52 Marks + 4 SPaG';
    } else if (unitId === 'eee') {
      specTitle = 'Paper 2: Early Elizabethan England, 1558–1588 (1HI0/B4)';
      themeColor = '#b45309';
      defaultTime = '55 Mins';
      defaultMarks = '32 Marks';
    } else if (unitId === 'edexcel_medicine') {
      specTitle = 'Paper 1: Medicine in Britain & Western Front (1HI0/11)';
      themeColor = '#0f766e';
      defaultTime = '1 Hour 15 Mins';
      defaultMarks = '52 Marks + 4 SPaG';
    } else if (unitId === 'usa') {
      specTitle = 'Paper 3: Conflict at Home and Abroad: the USA, 1954–75 (1HI0/33)';
      themeColor = '#1e40af';
      defaultTime = '1 Hour 20 Mins';
      defaultMarks = '52 Marks + 4 SPaG';
    }

    let mocksHubHtml = `
      <div style="background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 30px; border-top: 4px solid ${themeColor};">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px;">
          <div style="display: flex; align-items: center; gap: 15px;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: linear-gradient(135deg, ${themeColor} 0%, #0f172a 100%); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.3rem;">
              <i class="fa-solid fa-file-signature"></i>
            </div>
            <div>
              <h2 style="color: #0f172a; margin: 0; font-size: 1.35rem;">GCSE Mock Examination Papers</h2>
              <p style="color: #64748b; font-size: 0.95rem; margin: 4px 0 0 0;">Authentic Pearson Edexcel GCSE (9–1) past-paper format replicas featuring full source booklets, question papers, and comprehensive teacher mark schemes formatted for A4 printing.</p>
            </div>
          </div>
          <span style="font-size: 0.8rem; font-weight: 700; background: #fee2e2; color: #991b1b; padding: 4px 12px; border-radius: 20px;">
            ${unitData.mock_exams.length} Exam Papers Ready
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
    `;

    unitData.mock_exams.forEach((mock, idx) => {
      const paperUrl = mock.url || `${mock.id}.html`;
      const fullPaperUrl = paperUrl.startsWith('/') ? paperUrl : `/units/${unitId}/${paperUrl}`;
      const hasMs = Boolean(
        mock.has_mark_scheme ||
        mock.mark_scheme_url ||
        unitId === 'weimar_nazi_germany' ||
        unitId === 'eee' ||
        unitId === 'usa' ||
        (unitId === 'edexcel_medicine' && mock.id !== 'mock_2025_clone'),
      );
      const msFileName =
        mock.mark_scheme_url || `${paperUrl.replace(/\.html$/, '')}_mark_scheme.html`;
      const fullMsUrl = msFileName.startsWith('/') ? msFileName : `/units/${unitId}/${msFileName}`;
      const badgeText = mock.title.includes('NotebookLM')
        ? 'Prediction Model'
        : `Mock Paper ${idx + 1}`;

      mocksHubHtml += `
        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; gap: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.03);">
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 0.75rem; font-weight: 800; background: ${themeColor}15; color: ${themeColor}; padding: 3px 8px; border-radius: 4px; border: 1px solid ${themeColor}30;">
                ${badgeText}
              </span>
              <span style="font-size: 0.78rem; font-weight: 700; color: #475569;">
                <i class="fa-regular fa-clock" style="color: ${themeColor}; margin-right: 4px;"></i>${mock.time_minutes ? mock.time_minutes + ' mins' : defaultTime}
              </span>
            </div>
            <h3 style="margin: 0 0 8px 0; color: #1e293b; font-size: 1.05rem; line-height: 1.35;">${mock.title}</h3>
            <p style="margin: 0; font-size: 0.82rem; color: #64748b; line-height: 1.4;">
              ${mock.paper_reference || specTitle} · ${mock.total_marks ? mock.total_marks + ' marks' : defaultMarks} · Authentic exam booklet layout with line-spaced answer registers.
            </p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 5px;">
            <a href="${fullPaperUrl}" target="_blank" style="text-align: center; text-decoration: none; background: linear-gradient(135deg, ${themeColor} 0%, #0f172a 100%); color: #ffffff; padding: 9px 12px; border-radius: 6px; font-size: 0.85rem; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 6px; transition: opacity 0.2s ease;" onmouseover="this.style.opacity='0.92';" onmouseout="this.style.opacity='1';">
              <i class="fa-solid fa-file-pdf"></i> Open Question Paper
            </a>

            ${
              hasMs
                ? `
              <a href="${fullMsUrl}" target="_blank" style="text-align: center; text-decoration: none; background: #ffffff; color: #1e293b; border: 1.5px solid #cbd5e1; border-left: 3px solid ${themeColor}; padding: 8px 12px; border-radius: 6px; font-size: 0.82rem; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.2s ease;" onmouseover="this.style.background='#f1f5f9'; this.style.borderColor='#94a3b8';" onmouseout="this.style.background='#ffffff'; this.style.borderColor='#cbd5e1'; this.style.borderLeftColor='${themeColor}';">
                <i class="fa-solid fa-chalkboard-user" style="color: ${themeColor};"></i> Teacher Mark Scheme
              </a>
            `
                : `
              <div style="font-size: 0.75rem; color: #94a3b8; text-align: center; font-style: italic; padding: 3px 0;">
                Model answers integrated in study bank
              </div>
            `
            }
          </div>
        </div>
      `;
    });

    mocksHubHtml += `
        </div>
      </div>
    `;
    html += mocksHubHtml;
  }

  container.innerHTML = html;

  const coverBtn = container.querySelector('#btnOpenEmergencyCover');
  if (coverBtn) {
    coverBtn.onclick = () => {
      const uId = state.selectedUnitId || window.currentUnitId || 'cme_new';
      if (window.openEmergencyCoverModal) {
        window.openEmergencyCoverModal(uId, unitData);
      }
    };
  }
}
