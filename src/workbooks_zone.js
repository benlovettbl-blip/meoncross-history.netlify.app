import { state } from './state.js';

let currentPreviewState = {
  activeTab: 'qp',
  qpUrl: null,
  msUrl: null,
  title: '',
  pdfUrl: null,
  url: '',
  isMockPaper: false,
};

window.openInPagePreview = function (url, title, pdfUrl, options = {}) {
  const consoleEl = document.getElementById('inpage-preview-console');
  const iframe = document.getElementById('inpagePreviewIframe');
  const titleEl = document.getElementById('previewConsoleTitle');
  const docTypeEl = document.getElementById('previewConsoleDocType');
  const tabsEl = document.getElementById('previewConsoleTabs');
  const downloadBtn = document.getElementById('btnPreviewDownload');
  const fullTabBtn = document.getElementById('btnPreviewFullTab');

  if (!consoleEl || !iframe) {
    if (window.openTeacherPrintPreview) {
      window.openTeacherPrintPreview(url, title, pdfUrl);
    }
    return;
  }

  currentPreviewState = {
    activeTab: options.activeTab || 'qp',
    qpUrl: options.qpUrl || (options.isMockPaper ? url : null),
    msUrl: options.msUrl || null,
    title: options.title || title,
    pdfUrl: pdfUrl || url,
    url: url,
    isMockPaper: Boolean(options.isMockPaper),
  };

  if (titleEl) titleEl.textContent = title || 'Document Preview';
  if (docTypeEl) {
    docTypeEl.textContent = options.isMockPaper
      ? 'Mock Examination Paper'
      : options.badge || 'Document Viewer';
  }

  if (options.isMockPaper && options.qpUrl && options.msUrl) {
    if (tabsEl) tabsEl.style.display = 'inline-flex';
    window.updatePreviewConsoleTabs(options.activeTab || 'qp');
  } else {
    if (tabsEl) tabsEl.style.display = 'none';
  }

  if (downloadBtn) {
    downloadBtn.href = pdfUrl || url;
    downloadBtn.style.display = 'inline-flex';
  }

  if (fullTabBtn) {
    fullTabBtn.href = url;
  }

  const bustUrl = (u) => {
    if (!u) return u;
    const sep = u.includes('?') ? '&' : '?';
    return `${u}${sep}v=${Date.now()}`;
  };

  iframe.src = bustUrl(url);

  consoleEl.style.display = 'flex';
  setTimeout(() => {
    consoleEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 50);
};

window.switchPreviewConsoleTab = function (tab) {
  if (!currentPreviewState) return;
  const iframe = document.getElementById('inpagePreviewIframe');
  const titleEl = document.getElementById('previewConsoleTitle');
  const fullTabBtn = document.getElementById('btnPreviewFullTab');

  const bustUrl = (u) => {
    if (!u) return u;
    const sep = u.includes('?') ? '&' : '?';
    return `${u}${sep}v=${Date.now()}`;
  };

  if (tab === 'qp' && currentPreviewState.qpUrl) {
    currentPreviewState.activeTab = 'qp';
    if (iframe) iframe.src = bustUrl(currentPreviewState.qpUrl);
    if (titleEl) titleEl.textContent = currentPreviewState.title + ' (Question Paper)';
    if (fullTabBtn) fullTabBtn.href = currentPreviewState.qpUrl;
    window.updatePreviewConsoleTabs('qp');
  } else if (tab === 'ms' && currentPreviewState.msUrl) {
    currentPreviewState.activeTab = 'ms';
    if (iframe) iframe.src = bustUrl(currentPreviewState.msUrl);
    if (titleEl) titleEl.textContent = currentPreviewState.title + ' (Mark Scheme)';
    if (fullTabBtn) fullTabBtn.href = currentPreviewState.msUrl;
    window.updatePreviewConsoleTabs('ms');
  }
};

window.updatePreviewConsoleTabs = function (activeTab) {
  const btnQP = document.getElementById('btnTabQP');
  const btnMS = document.getElementById('btnTabMS');
  if (!btnQP || !btnMS) return;
  if (activeTab === 'qp') {
    btnQP.style.background = '#2563eb';
    btnQP.style.color = '#ffffff';
    btnMS.style.background = 'transparent';
    btnMS.style.color = '#94a3b8';
  } else {
    btnMS.style.background = '#16a34a';
    btnMS.style.color = '#ffffff';
    btnQP.style.background = 'transparent';
    btnQP.style.color = '#94a3b8';
  }
};

window.printInPagePreview = function () {
  const iframe = document.getElementById('inpagePreviewIframe');
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  }
};

window.closeInPagePreview = function () {
  const consoleEl = document.getElementById('inpage-preview-console');
  const iframe = document.getElementById('inpagePreviewIframe');
  if (consoleEl) {
    consoleEl.style.display = 'none';
  }
  if (iframe) {
    iframe.src = 'about:blank';
  }
};

function renderInPagePreviewConsole() {
  return `
    <!-- In-Page PDF & Document Preview Console (Solution 2) -->
    <div id="inpage-preview-console" style="display: none; background: #0f172a; border: 1.5px solid #334155; border-radius: 8px; margin-top: 14px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5); flex-direction: column;">
      
      <!-- Top Console Header Strip -->
      <div style="background: #1e293b; border-bottom: 1px solid #334155; padding: 10px 16px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        
        <!-- Left: Document Identity -->
        <div style="display: flex; align-items: center; gap: 12px; min-width: 260px;">
          <div id="previewConsoleIcon" style="width: 34px; height: 34px; border-radius: 6px; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 1rem; box-shadow: 0 2px 6px rgba(2,132,199,0.35);">
            <i class="fa-solid fa-book-open-reader"></i>
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; background: rgba(14, 165, 233, 0.2); color: #38bdf8; padding: 1px 6px; border-radius: 3px; border: 1px solid rgba(56, 189, 248, 0.3);">In-Page Preview</span>
              <span id="previewConsoleDocType" style="font-size: 0.68rem; font-weight: 600; color: #94a3b8;">Document Viewer</span>
            </div>
            <h3 id="previewConsoleTitle" style="margin: 2px 0 0 0; color: #f8fafc; font-size: 1.02rem; font-weight: 700; letter-spacing: -0.01em;">Classroom Preview</h3>
          </div>
        </div>

        <!-- Center: Mock Exam QP vs MS Tab Switcher -->
        <div id="previewConsoleTabs" style="display: none; align-items: center; background: #0f172a; padding: 3px; border-radius: 6px; border: 1px solid #334155; gap: 4px;">
          <button id="btnTabQP" type="button" onclick="window.switchPreviewConsoleTab('qp')" style="background: #2563eb; color: #ffffff; border: none; border-radius: 4px; padding: 5px 12px; font-size: 0.74rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s ease;">
            <i class="fa-solid fa-file-lines"></i> Question Paper
          </button>
          <button id="btnTabMS" type="button" onclick="window.switchPreviewConsoleTab('ms')" style="background: transparent; color: #94a3b8; border: none; border-radius: 4px; padding: 5px 12px; font-size: 0.74rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s ease;">
            <i class="fa-solid fa-check-double"></i> Mark Scheme
          </button>
        </div>

        <!-- Right: Action Controls -->
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <button id="btnPreviewPrint" type="button" onclick="window.printInPagePreview()" style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #ffffff; border: none; font-weight: 700; font-size: 0.76rem; padding: 6px 12px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 8px rgba(37,99,235,0.35);">
            <i class="fa-solid fa-print"></i> Print
          </button>
          <a id="btnPreviewDownload" href="#" download style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3); font-weight: 600; font-size: 0.76rem; padding: 5px 10px; border-radius: 6px; text-decoration: none; display: inline-flex; align-items: center; gap: 5px;">
            <i class="fa-solid fa-file-arrow-down"></i> Download PDF
          </a>
          <a id="btnPreviewFullTab" href="#" target="_blank" style="background: rgba(255, 255, 255, 0.08); color: #e2e8f0; border: 1px solid rgba(255, 255, 255, 0.15); font-weight: 600; font-size: 0.76rem; padding: 5px 10px; border-radius: 6px; text-decoration: none; display: inline-flex; align-items: center; gap: 5px;">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Full Tab
          </a>
          <button id="btnPreviewClose" type="button" onclick="window.closeInPagePreview()" style="background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.1); color: #94a3b8; font-size: 0.9rem; width: 30px; height: 30px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="Close In-Page Preview">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

      </div>

      <!-- Iframe Display Body -->
      <div style="position: relative; width: 100%; height: 750px; background: #0b1120;">
        <iframe id="inpagePreviewIframe" src="about:blank" style="width: 100%; height: 100%; border: none; background: #ffffff;"></iframe>
      </div>
    </div>
  `;
}

export function renderWorkbooksZone(container, unitData) {
  unitData = unitData || state.activeUnitData || {};
  const activeUnitId = state.selectedUnitId || window.currentUnitId;

  // Ultra-compact top bar (Height: ~40px)
  let html = `
    <div style="background: #0f172a; padding: 7px 14px; border-radius: 8px; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
      <div style="display: flex; align-items: center; gap: 8px;">
        <i class="fa-solid fa-graduation-cap" style="color: #38bdf8; font-size: 1.05rem;"></i>
        <span style="color: #ffffff; font-size: 0.96rem; font-weight: 800; letter-spacing: -0.01em;">Print &amp; PDF Hub</span>
        <span style="display: inline-block; width: 1px; height: 14px; background: rgba(255,255,255,0.2); margin: 0 4px;"></span>
        <span style="color: #94a3b8; font-size: 0.74rem; font-weight: 500;">Master Revision Guides, Pupil Workbooks &amp; Exam Assessment Packs</span>
      </div>
      <div>
        <button id="btnOpenEmergencyCover" type="button" style="background: #e11d48; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 5px; padding: 5px 12px; font-size: 0.76rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s ease;" onmouseover="this.style.background='#be123c';" onmouseout="this.style.background='#e11d48';">
          <i class="fa-solid fa-truck-medical"></i>
          <span>Emergency Cover Generator</span>
        </button>
      </div>
    </div>

    <!-- Compact Navigation Tabs (Height: ~30px) -->
    <div style="display: flex; align-items: center; gap: 4px; flex-wrap: wrap; margin-bottom: 8px; padding: 3px 6px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;">
      <span style="font-size: 0.7rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-right: 2px; padding-left: 2px;">Unit:</span>
      
      <button type="button" onclick="window.switchView('booklet', 'cme_new')" style="background: ${activeUnitId === 'cme_new' ? '#0284c7' : '#ffffff'}; color: ${activeUnitId === 'cme_new' ? '#ffffff' : '#0369a1'}; border: 1px solid ${activeUnitId === 'cme_new' ? '#0284c7' : '#bae6fd'}; font-size: 0.72rem; font-weight: 700; padding: 3px 7px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.15s ease; box-shadow: ${activeUnitId === 'cme_new' ? '0 1px 3px rgba(2,132,199,0.25)' : 'none'};">
        <i class="fa-solid fa-dove"></i> ⭐ Middle East (P2)
      </button>

      <button type="button" onclick="window.switchView('booklet', 'usa')" style="background: ${activeUnitId === 'usa' ? '#1e40af' : '#ffffff'}; color: ${activeUnitId === 'usa' ? '#ffffff' : '#1e40af'}; border: 1px solid ${activeUnitId === 'usa' ? '#1e40af' : '#bfdbfe'}; font-size: 0.72rem; font-weight: 700; padding: 3px 7px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.15s ease; box-shadow: ${activeUnitId === 'usa' ? '0 1px 3px rgba(30,64,175,0.25)' : 'none'};">
        <i class="fa-solid fa-flag-usa"></i> USA 1954–75 (P3)
      </button>

      <button type="button" onclick="window.switchView('booklet', 'edexcel_medicine')" style="background: ${activeUnitId === 'edexcel_medicine' ? '#0f766e' : '#ffffff'}; color: ${activeUnitId === 'edexcel_medicine' ? '#ffffff' : '#0f766e'}; border: 1px solid ${activeUnitId === 'edexcel_medicine' ? '#0f766e' : '#99f6e4'}; font-size: 0.72rem; font-weight: 700; padding: 3px 7px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.15s ease; box-shadow: ${activeUnitId === 'edexcel_medicine' ? '0 1px 3px rgba(15,118,110,0.25)' : 'none'};">
        <i class="fa-solid fa-notes-medical"></i> Medicine (P1)
      </button>

      <button type="button" onclick="window.switchView('booklet', 'eee')" style="background: ${activeUnitId === 'eee' ? '#b45309' : '#ffffff'}; color: ${activeUnitId === 'eee' ? '#ffffff' : '#b45309'}; border: 1px solid ${activeUnitId === 'eee' ? '#b45309' : '#fde68a'}; font-size: 0.72rem; font-weight: 700; padding: 3px 7px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.15s ease; box-shadow: ${activeUnitId === 'eee' ? '0 1px 3px rgba(180,83,9,0.25)' : 'none'};">
        <i class="fa-solid fa-crown"></i> Elizabethan (P2)
      </button>

      <button type="button" onclick="window.switchView('booklet', 'weimar_nazi_germany')" style="background: ${activeUnitId === 'weimar_nazi_germany' ? '#7f1d1d' : '#ffffff'}; color: ${activeUnitId === 'weimar_nazi_germany' ? '#ffffff' : '#991b1b'}; border: 1px solid ${activeUnitId === 'weimar_nazi_germany' ? '#7f1d1d' : '#fecaca'}; font-size: 0.72rem; font-weight: 700; padding: 3px 7px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.15s ease; box-shadow: ${activeUnitId === 'weimar_nazi_germany' ? '0 1px 3px rgba(127,29,29,0.25)' : 'none'};">
        <i class="fa-solid fa-landmark"></i> Weimar (P3)
      </button>

      <button type="button" onclick="window.switchView('booklet', 'great_war')" style="background: ${activeUnitId === 'great_war' ? '#4338ca' : '#ffffff'}; color: ${activeUnitId === 'great_war' ? '#ffffff' : '#4338ca'}; border: 1px solid ${activeUnitId === 'great_war' ? '#4338ca' : '#c7d2fe'}; font-size: 0.72rem; font-weight: 700; padding: 3px 7px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.15s ease; box-shadow: ${activeUnitId === 'great_war' ? '0 1px 3px rgba(67,56,202,0.25)' : 'none'};">
        <i class="fa-solid fa-shield-halved"></i> Great War (KS3)
      </button>

      <button type="button" onclick="window.switchView('booklet', 'all')" style="background: ${!activeUnitId || activeUnitId === 'all' ? '#0f172a' : '#ffffff'}; color: ${!activeUnitId || activeUnitId === 'all' ? '#ffffff' : '#475569'}; border: 1px solid ${!activeUnitId || activeUnitId === 'all' ? '#0f172a' : '#cbd5e1'}; font-size: 0.72rem; font-weight: 700; padding: 3px 7px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.15s ease;">
        <i class="fa-solid fa-layer-group"></i> All Units Directory
      </button>
    </div>
  `;

  // Helper to render Three Pillars cards (Compact: ~170px height)
  const renderThreePillarsGrid = (booklets) => {
    let gridHtml = `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 10px;">
    `;

    booklets.forEach((b) => {
      const cleanTitle = (b.title || '').replace(/'/g, "\\'");
      gridHtml += `
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-top: 3.5px solid ${b.color}; border-radius: 7px; padding: 12px 14px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 4px rgba(0,0,0,0.03); min-height: 168px; box-sizing: border-box;">
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 0.68rem; font-weight: 800; background: ${b.color}15; color: ${b.color}; padding: 2px 6px; border-radius: 3px; border: 1px solid ${b.color}30; letter-spacing: 0.3px;">
                ${b.badge}
              </span>
              <span style="font-size: 0.72rem; font-weight: 700; color: #64748b;">
                <i class="fa-solid fa-file-pdf" style="color: ${b.color}; margin-right: 3px;"></i>${b.pages}
              </span>
            </div>
            <h3 style="margin: 0 0 3px 0; color: #0f172a; font-size: 0.88rem; font-weight: 800; line-height: 1.25; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;" title="${b.title}">
              ${b.title}
            </h3>
            <p style="margin: 0; font-size: 0.72rem; color: #64748b; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              ${b.desc}
            </p>
          </div>

          <div style="display: flex; gap: 5px; margin-top: 8px;">
            <button type="button" class="btn" onclick="window.openInPagePreview('${b.fileBase}', '${cleanTitle}', '${b.pdfUrl}', { badge: '${b.badge}' })" style="flex: 1; text-align: center; background: #ffffff; border: 1px solid #cbd5e1; border-left: 3px solid ${b.color}; padding: 5px 6px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px; font-size: 0.74rem; font-weight: 700; color: #1e293b; transition: all 0.15s ease;" onmouseover="this.style.borderColor='${b.color}'; this.style.boxShadow='0 1px 4px rgba(0,0,0,0.1)';" onmouseout="this.style.borderColor='#cbd5e1'; this.style.borderLeftColor='${b.color}'; this.style.boxShadow='none';">
              <i class="fa-solid fa-eye" style="color: ${b.color};"></i> Preview
            </button>

            <a href="${b.pdfUrl}" target="_blank" download style="background: ${b.color}; color: #ffffff; padding: 5px 9px; border-radius: 4px; text-decoration: none; font-size: 0.74rem; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; transition: opacity 0.15s ease;" onmouseover="this.style.opacity='0.9';" onmouseout="this.style.opacity='1';" title="Download Master PDF">
              <i class="fa-solid fa-download"></i> PDF
            </a>

            <a href="${b.fileBase}" target="_blank" style="background: #0f172a; color: #ffffff; padding: 5px 8px; border-radius: 4px; text-decoration: none; font-size: 0.72rem; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; transition: background 0.15s ease;" onmouseover="this.style.background='#1e293b';" onmouseout="this.style.background='#0f172a';" title="Open master booklet in a full browser tab">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Web
            </a>
          </div>
        </div>
      `;
    });

    gridHtml += `</div>`;
    return gridHtml;
  };

  // Helper to render Mock Exams section (Compact: ~150px height)
  const renderMockExamsRow = (unitId, mockExams) => {
    if (!mockExams || !Array.isArray(mockExams) || mockExams.length === 0) return '';

    let specTitle = 'Edexcel GCSE (9–1) History';
    let defaultTime = '1 Hour 20 Mins';
    let defaultMarks = '52 Marks';

    if (unitId === 'cme_new') {
      specTitle = 'Paper 2: Conflict in the Middle East, 1945–1995 (1HI0/21)';
      defaultTime = '55 Mins';
      defaultMarks = '32 Marks';
    } else if (unitId === 'weimar_nazi_germany') {
      specTitle = 'Paper 3: Weimar and Nazi Germany, 1918–1939 (1HI0/31)';
      defaultTime = '1 Hour 20 Mins';
      defaultMarks = '52 Marks + 4 SPaG';
    } else if (unitId === 'eee') {
      specTitle = 'Paper 2: Early Elizabethan England, 1558–1588 (1HI0/B4)';
      defaultTime = '55 Mins';
      defaultMarks = '32 Marks';
    } else if (unitId === 'edexcel_medicine') {
      specTitle = 'Paper 1: Medicine in Britain & Western Front (1HI0/11)';
      defaultTime = '1 Hour 15 Mins';
      defaultMarks = '52 Marks + 4 SPaG';
    } else if (unitId === 'usa') {
      specTitle = 'Paper 3: Conflict at Home and Abroad: the USA, 1954–75 (1HI0/33)';
      defaultTime = '1 Hour 20 Mins';
      defaultMarks = '52 Marks + 4 SPaG';
    }

    let mocksHtml = `
      <div style="background: #ffffff; padding: 10px 14px; border-radius: 7px; border: 1.5px solid #000000; box-shadow: 0 1px 4px rgba(0,0,0,0.03);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1.5px solid #000000;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 0.7rem; font-weight: 900; letter-spacing: 0.5px; text-transform: uppercase; color: #000000;">
              <i class="fa-solid fa-file-signature"></i> GCSE Mock Examination Papers &amp; Mark Schemes
            </span>
            <span style="font-size: 0.68rem; color: #4b5563;">&bull; ${specTitle}</span>
          </div>
          <span style="font-size: 0.68rem; font-weight: 800; background: #000000; color: #ffffff; padding: 2px 7px; border-radius: 3px; text-transform: uppercase;">
            ${mockExams.length} Papers Ready
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 6px; max-height: 195px; overflow-y: auto; padding-right: 4px;">
    `;

    mockExams.forEach((mock, idx) => {
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
      const badgeText = mock.title.includes('Prediction') ? 'PREDICTION' : `MOCK PAPER ${idx + 1}`;
      const cleanMockTitle = (mock.title || '').replace(/'/g, "\\'");

      mocksHtml += `
        <div style="background: #ffffff; border: 1px solid #d1d5db; border-radius: 5px; padding: 6px 8px; display: flex; flex-direction: column; justify-content: space-between; gap: 4px;">
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px;">
              <span style="font-size: 0.64rem; font-weight: 800; background: #000000; color: #ffffff; padding: 1px 5px; border-radius: 2px; text-transform: uppercase;">
                ${badgeText}
              </span>
              <span style="font-size: 0.68rem; font-weight: 800; color: #000000;">
                ${mock.time_minutes ? mock.time_minutes + ' mins' : defaultTime}
              </span>
            </div>
            <h4 style="margin: 2px 0; color: #000000; font-size: 0.82rem; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${mock.title}">
              ${mock.title}
            </h4>
            <div style="font-size: 0.68rem; color: #4b5563;">
              ${mock.total_marks ? mock.total_marks + ' marks' : defaultMarks} &bull; Authentic exam layout
            </div>
          </div>

          <div style="display: flex; gap: 5px; margin-top: 4px;">
            <button type="button" onclick="window.openInPagePreview('${fullPaperUrl}', '${cleanMockTitle} (Question Paper)', null, { isMockPaper: true, qpUrl: '${fullPaperUrl}', msUrl: '${hasMs ? fullMsUrl : ''}', activeTab: 'qp', title: '${cleanMockTitle}' })" style="flex: 1; text-align: center; background: #000000; color: #ffffff; border: 1px solid #000000; padding: 4px 6px; border-radius: 3px; font-size: 0.72rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 4px; transition: opacity 0.15s ease;" onmouseover="this.style.opacity='0.85';" onmouseout="this.style.opacity='1';">
              <i class="fa-solid fa-file-lines"></i> Question Paper
            </button>

            ${
              hasMs
                ? `
              <button type="button" onclick="window.openInPagePreview('${fullMsUrl}', '${cleanMockTitle} (Mark Scheme)', null, { isMockPaper: true, qpUrl: '${fullPaperUrl}', msUrl: '${fullMsUrl}', activeTab: 'ms', title: '${cleanMockTitle}' })" style="flex: 1; text-align: center; background: #ffffff; color: #000000; border: 1px solid #000000; padding: 4px 6px; border-radius: 3px; font-size: 0.72rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 4px; transition: background 0.15s ease;" onmouseover="this.style.background='#f3f4f6';" onmouseout="this.style.background='#ffffff';">
                <i class="fa-solid fa-check"></i> Mark Scheme
              </button>
            `
                : `
              <div style="font-size: 0.65rem; color: #6b7280; text-align: center; font-style: italic; padding: 4px;">
                Answers in study bank
              </div>
            `
            }
          </div>
        </div>
      `;
    });

    mocksHtml += `
        </div>
      </div>
    `;
    return mocksHtml;
  };

  // 1. Conflict in the Middle East (`cme_new`)
  if (activeUnitId === 'cme_new') {
    const cmeBooklets = [
      {
        id: 'PILLAR_1',
        title: '36-Page Visual Revision Masterclasses & Specification Guide',
        pages: '36 Pages',
        badge: 'PILLAR 1 • REVISION GUIDE',
        color: '#0284c7',
        desc: '12 double-page spreads across all 3 Key Topics, 4 full-page cartographic war atlases, word-for-word Pearson specification checklist, and primary archival evidence.',
        fileBase: '/units/cme_new/revision_guide.html',
        pdfUrl: '/pdfs/cme_revision_guide.pdf',
      },
      {
        id: 'PILLAR_2',
        title: '36-Page Complete Exam Practice & Assessment Mastery Pack',
        pages: '36 Pages',
        badge: 'PILLAR 2 • EXAM PRACTICE',
        color: '#1e3a8a',
        desc: 'Complete 36-page exam practice volume combining KT1, KT2, and KT3. Differentiated stepped ladder, 4-mark consequence drills, and photocopier-safe lines.',
        fileBase: '/units/cme_new/booklets/cme_mastery_FULL.html',
        pdfUrl: '/pdfs/cme_mastery_pack_FULL.pdf',
      },
      {
        id: 'PILLAR_3',
        title: 'Complete Master Recall Quiz & Vault (All 200 Crucial Questions)',
        pages: '44 Pages',
        badge: 'PILLAR 3 • RECALL QUIZZING',
        color: '#7c3aed',
        desc: 'All 200 knowledge recall questions across KT1, KT2, and KT3. Memory hacking rules, RAG threat-level checkboxes, and complete Vault self-marking answer keys.',
        fileBase: '/units/cme_new/mastery_pack_full.html',
        pdfUrl: '/pdfs/cme_recall_quiz_FULL.pdf',
      },
    ];

    html += renderThreePillarsGrid(cmeBooklets);

    const cmeCards = [
      {
        id: 'KT1',
        title: 'KT1: Creation of Israel (1945–56)',
        desc: 'Mandate collapse, Jewish insurgency, UN Partition, 1948 War, Palestinian refugees & 1956 Suez Crisis.',
      },
      {
        id: 'KT2',
        title: 'KT2: The Escalating Conflict (1964–73)',
        desc: 'Water Wars, Six-Day War (1967), Conquered Territories, Resolution 242, Black September, Munich & Yom Kippur War.',
      },
      {
        id: 'KT3',
        title: 'KT3: The Search for Peace (1974–95)',
        desc: 'Shuttle diplomacy, Camp David (1978), Lebanon & Sabra/Shatila (1982), First Intifada (1987), Oslo Accords & Rabin assassination.',
      },
    ];

    html += `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 10px; margin-top: 10px;">
    `;

    cmeCards.forEach((kt) => {
      html += `
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-top: 3.5px solid #0284c7; border-radius: 7px; padding: 12px 14px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 4px rgba(0,0,0,0.03); min-height: 168px; box-sizing: border-box;">
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 0.68rem; font-weight: 800; background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 3px; border: 1px solid #bae6fd;">
                ${kt.id} • PAPER 2 (26/27)
              </span>
              <span style="font-size: 0.72rem; font-weight: 700; color: #64748b;">
                <i class="fa-solid fa-file-pdf" style="color: #0284c7; margin-right: 3px;"></i>Publisher Suite
              </span>
            </div>
            <h3 style="margin: 0 0 4px 0; color: #0f172a; font-size: 0.88rem; font-weight: 800; line-height: 1.25;">
              ${kt.title}
            </h3>
            <p style="margin: 0; font-size: 0.72rem; color: #64748b; line-height: 1.3;">
              ${kt.desc}
            </p>
          </div>

          <!-- Dual-Spread Digital Reader Interactive Action -->
          <button type="button" onclick="window.openDigitalReader('cme_new', '${kt.id}')" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; border: none; padding: 7px 12px; border-radius: 5px; font-size: 0.76rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 7px; box-shadow: 0 2px 6px rgba(2, 132, 199, 0.35); margin-top: 10px; transition: all 0.15s ease;" onmouseover="this.style.filter='brightness(1.1)';" onmouseout="this.style.filter='brightness(1)';">
            <i class="fa-solid fa-book-open-reader"></i> 📖 Read Dual-Spread Online
          </button>

          <div style="display: flex; gap: 5px; margin-top: 8px;">
            <a href="/pdfs/cme_new_textbook_${kt.id}_PUBLISHER.pdf" target="_blank" download style="flex: 1; text-align: center; background: #ffffff; border: 1px solid #cbd5e1; border-left: 3px solid #0284c7; padding: 5px 4px; border-radius: 4px; font-size: 0.72rem; font-weight: 700; color: #0f172a; text-decoration: none;">
              <i class="fa-solid fa-book-open"></i> Text
            </a>
            <a href="/pdfs/cme_new_pupil_workbook_${kt.id}_FINAL_V17.pdf" target="_blank" download style="flex: 1; text-align: center; background: #ffffff; border: 1px solid #cbd5e1; border-left: 3px solid #d97706; padding: 5px 4px; border-radius: 4px; font-size: 0.72rem; font-weight: 700; color: #0f172a; text-decoration: none;">
              <i class="fa-solid fa-user-pen"></i> Work
            </a>
            <a href="/pdfs/cme_new_mastery_pack_${kt.id}_FINAL_V17.pdf" target="_blank" download style="flex: 1; text-align: center; background: #ffffff; border: 1px solid #cbd5e1; border-left: 3px solid #b91c1c; padding: 5px 4px; border-radius: 4px; font-size: 0.72rem; font-weight: 700; color: #0f172a; text-decoration: none;">
              <i class="fa-solid fa-shield-halved"></i> Master
            </a>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    html += renderMockExamsRow(
      'cme_new',
      unitData.mock_exams || [
        {
          id: 'mock_2024_prediction',
          title: '2024 Prediction Mock Examination Paper',
          time_minutes: 55,
          total_marks: 32,
        },
        {
          id: 'mock_2025_specimen',
          title: '2025 Specimen Exam Simulation Paper',
          time_minutes: 55,
          total_marks: 32,
        },
      ],
    );
  }
  // 2. USA 1954–75 (`usa`)
  else if (activeUnitId === 'usa') {
    const usaBooklets = [
      {
        id: 'PILLAR_1',
        title: '36-Page Visual Revision & Exam Assessment Playbook',
        pages: '36 Pages',
        badge: 'PILLAR 1 • REVISION GUIDE',
        color: '#1e40af',
        desc: '16 double-page spreads across all 4 Key Topics, complete Paper 3 specification blueprints, Q1–Q3 paragraph formulas, Grade 9 WAGOLLs, and 1h 20m timed models.',
        fileBase: '/units/usa/visual_revision_guide.html',
        pdfUrl: '/pdfs/usa_visual_revision_guide.pdf',
      },
      {
        id: 'PILLAR_2',
        title: '48-Page Complete Unit Master Compendium (KT1–KT4 Combined)',
        pages: '48 Pages',
        badge: 'PILLAR 2 • EXAM PRACTICE',
        color: '#1e3a8a',
        desc: 'Complete 48-page compendium binding KT1, KT2, KT3, and KT4. 4 full Paper 3 exam paper simulations, 16 primary sources/interpretations, and 24 Grade 8/9 exemplars.',
        fileBase: '/units/usa/booklets/usa_mastery_FULL.html',
        pdfUrl: '/pdfs/usa_mastery_pack_FULL.pdf',
      },
      {
        id: 'PILLAR_3',
        title: 'Complete Unit Master Recall Quiz (All 320 Crucial Questions)',
        pages: '54 Pages',
        badge: 'PILLAR 3 • RECALL QUIZZING',
        color: '#7c3aed',
        desc: 'Master retrieval volume compiling all 320 knowledge recall questions across all 4 Key Topics. Includes memory hacking rules, RAG trackers, and complete Vault solutions.',
        fileBase: '/units/usa/mastery_pack_full.html',
        pdfUrl: '/pdfs/usa_recall_quiz_FULL.pdf',
      },
    ];

    html += renderThreePillarsGrid(usaBooklets);
    html += renderMockExamsRow(
      'usa',
      unitData.mock_exams || [
        {
          id: 'mock_paper3_sim',
          title: 'Paper 3: USA 1954–75 Official Mock Examination',
          time_minutes: 80,
          total_marks: 52,
        },
      ],
    );
  }
  // 3. Medicine Through Time (`edexcel_medicine`)
  else if (activeUnitId === 'edexcel_medicine') {
    const medBooklets = [
      {
        id: 'PILLAR_1',
        title: '40-Page Visual Revision Masterclasses & Specification Playbook',
        pages: '40 Pages',
        badge: 'PILLAR 1 • REVISION GUIDE',
        color: '#0f766e',
        desc: '18 double-page spreads, complete Paper 1 specification blueprints, Section A 2-mark feature guides, Q3–Q6 paragraph formulas, and 1h 15m exam timing models.',
        fileBase: '/units/edexcel_medicine/visual_revision_guide.html',
        pdfUrl: '/pdfs/edexcel_medicine_visual_revision_and_exam_guide.pdf',
      },
      {
        id: 'PILLAR_2',
        title: '32-Page Complete Exam Practice & Assessment Compendium',
        pages: '32 Pages',
        badge: 'PILLAR 2 • EXAM PRACTICE',
        color: '#1e3a8a',
        desc: 'Section A (Western Front: Somme, Ypres, Arras, Cambrai) and Section B (Medieval, Renaissance, 18th/19th C Surgery, Modern Britain). Source Typology Matrix.',
        fileBase: '/units/edexcel_medicine/booklets/medicine_mastery_compendium_32page.html',
        pdfUrl: '/pdfs/med_mastery_pack_FULL.pdf',
      },
      {
        id: 'PILLAR_3',
        title: 'Paper 1 Complete Knowledge Retrieval Compendium (380 Questions)',
        pages: '16 Pages',
        badge: 'PILLAR 3 • RECALL QUIZZING',
        color: '#7c3aed',
        desc: 'Complete retrieval volume compiling all 380 rapid recall questions across Section A and Section B with micro-checkboxes and quick-marking back banks.',
        fileBase: '/units/edexcel_medicine/med_recall_quiz_FULL.html',
        pdfUrl: '/pdfs/med_recall_quiz_pack_FULL.pdf',
      },
    ];

    html += renderThreePillarsGrid(medBooklets);
    html += renderMockExamsRow(
      'edexcel_medicine',
      unitData.mock_exams || [
        {
          id: 'mock_paper1_medicine',
          title: 'Paper 1: Medicine in Britain & Western Front Mock Exam',
          time_minutes: 75,
          total_marks: 52,
        },
      ],
    );
  }
  // 4. Causes of the Great War (`great_war`)
  else if (activeUnitId === 'great_war') {
    const gwCards = [
      {
        title: 'Complete Core Textbook',
        badge: 'READING MATERIAL',
        color: '#0284c7',
        pages: '6 Lessons • Full Text',
        desc: 'Authentic historical narratives, primary documents, and context. Zero writing lines — ideal for reading on screens or printing class sets.',
        pdfUrl: '/pdfs/great_war_textbook_FINAL_V17.pdf',
        webUrl: '/units/great_war/textbook.html',
      },
      {
        title: 'Complete Pupil Workbook',
        badge: 'PUPIL WORKBOOK',
        color: '#d97706',
        pages: 'Photocopier Ready',
        desc: 'Structured writing tasks, recall challenges, source evaluation tables, and extended writing scaffolds. Print once for the unit.',
        pdfUrl: '/pdfs/great_war_pupil_workbook_FINAL_V17.pdf',
        webUrl: '/units/great_war/pupil_workbook.html',
      },
      {
        title: 'Mastery Pack & Revision',
        badge: 'MASTERY ASSESSMENT',
        color: '#b91c1c',
        pages: 'Assessed Tasks',
        desc: 'Deep knowledge retrieval, stepped ladder tasks, essay frameworks, and historiographical debates (Fraser vs. Edwards).',
        pdfUrl: '/pdfs/great_war_mastery_pack_full_FINAL_V17.pdf',
        webUrl: '/units/great_war/mastery_pack_full.html',
      },
      {
        title: 'Master Recall Quiz & Homework Companion',
        badge: 'RETRIEVAL & HOMEWORK',
        color: '#7c3aed',
        pages: '12 Pages (A5 Booklet)',
        desc: '48 core factual questions across all 6 lessons with two handwriting lines, 1871–1914 domino flowchart, front tracking ledger, marking bank, and assessment architect.',
        pdfUrl: '/pdfs/great_war_recall_quiz_FULL.pdf',
        webUrl: '/units/great_war/quiz_pack.html',
      },
    ];

    html += `
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 10px;">
    `;

    gwCards.forEach((c) => {
      const cleanTitle = (c.title || '').replace(/'/g, "\\'");
      html += `
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-top: 3.5px solid ${c.color}; border-radius: 7px; padding: 12px 14px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 4px rgba(0,0,0,0.03); min-height: 168px; box-sizing: border-box;">
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 4px; margin-bottom: 4px;">
              <span style="font-size: 0.64rem; font-weight: 800; background: ${c.color}15; color: ${c.color}; padding: 2px 5px; border-radius: 3px; border: 1px solid ${c.color}30; letter-spacing: 0.2px; white-space: nowrap;">
                ${c.badge}
              </span>
              <span style="font-size: 0.68rem; font-weight: 700; color: #64748b; white-space: nowrap;">
                <i class="fa-solid fa-file-pdf" style="color: ${c.color}; margin-right: 3px;"></i>${c.pages}
              </span>
            </div>
            <h3 style="margin: 0 0 3px 0; color: #0f172a; font-size: 0.88rem; font-weight: 800; line-height: 1.25;">
              ${c.title}
            </h3>
            <p style="margin: 0; font-size: 0.72rem; color: #64748b; line-height: 1.3;">
              ${c.desc}
            </p>
          </div>

          <div style="display: flex; gap: 5px; margin-top: 8px;">
            <button type="button" class="btn" onclick="window.openInPagePreview('${c.webUrl}', '${cleanTitle}', '${c.pdfUrl}', { badge: '${c.badge}' })" style="flex: 1; text-align: center; background: #ffffff; border: 1px solid #cbd5e1; border-left: 3px solid ${c.color}; padding: 5px 6px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; font-size: 0.74rem; font-weight: 700; color: #1e293b; transition: all 0.15s ease;" onmouseover="this.style.borderColor='${c.color}';" onmouseout="this.style.borderColor='#cbd5e1';">
              <i class="fa-solid fa-eye" style="color: ${c.color};"></i> Preview
            </button>

            <a href="${c.pdfUrl}" target="_blank" download style="background: ${c.color}; color: #ffffff; padding: 5px 9px; border-radius: 4px; text-decoration: none; font-size: 0.74rem; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; transition: opacity 0.15s ease;" onmouseover="this.style.opacity='0.9';" onmouseout="this.style.opacity='1';" title="Download Master PDF">
              <i class="fa-solid fa-download"></i> PDF
            </a>

            <a href="${c.webUrl}" target="_blank" style="background: #0f172a; color: #ffffff; padding: 5px 8px; border-radius: 4px; text-decoration: none; font-size: 0.72rem; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; transition: background 0.15s ease;" onmouseover="this.style.background='#1e293b';" onmouseout="this.style.background='#0f172a';" title="Open interactive version">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Web
            </a>
          </div>
        </div>
      `;
    });

    html += `</div>`;

    // Auxiliary toolbar for secondary PDFs (Height: ~38px)
    html += `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 12px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
        <span style="font-size: 0.74rem; font-weight: 800; color: #475569; text-transform: uppercase;">
          <i class="fa-solid fa-paperclip"></i> Specialized Great War Teacher Packs:
        </span>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <a href="/pdfs/great_war_guided_reading_workbook_FINAL_V17.pdf" target="_blank" download style="background: #ffffff; color: #0284c7; border: 1px solid #bae6fd; padding: 4px 9px; border-radius: 4px; font-size: 0.72rem; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
            <i class="fa-solid fa-book-reader"></i> Guided Reading (PDF)
          </a>
          <a href="/pdfs/great_war_answer_key_FINAL_V17.pdf" target="_blank" download style="background: #ffffff; color: #16a34a; border: 1px solid #bbf7d0; padding: 4px 9px; border-radius: 4px; font-size: 0.72rem; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
            <i class="fa-solid fa-key"></i> Teacher Answer Key (PDF)
          </a>
          <a href="/pdfs/great_war_cheat_sheet_FINAL_V17.pdf" target="_blank" download style="background: #ffffff; color: #d97706; border: 1px solid #fde68a; padding: 4px 9px; border-radius: 4px; font-size: 0.72rem; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
            <i class="fa-solid fa-bolt"></i> Revision Cheat Sheet (PDF)
          </a>
        </div>
      </div>
    `;
  }
  // 5. Early Elizabethan England (`eee`)
  else if (activeUnitId === 'eee') {
    const ktCards = [
      {
        id: 'KT1',
        title: 'KT1: Queen, Government & Religion (1558–69)',
        desc: 'Elizabethan settlement, religious divisions, virgin queen succession.',
      },
      {
        id: 'KT2',
        title: 'KT2: Challenges to Elizabeth at Home & Abroad (1569–88)',
        desc: 'Plots (Northern Rebellion, Ridolfi, Throckmorton, Babington), Mary QoS, Armada.',
      },
      {
        id: 'KT3',
        title: 'KT3: Elizabethan Society in the Age of Exploration (1558–88)',
        desc: 'Education, leisure, poverty, Drake circumnavigation, Virginia colony.',
      },
    ];

    html += `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 10px;">
    `;

    ktCards.forEach((kt) => {
      html += `
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-top: 3.5px solid #b45309; border-radius: 7px; padding: 12px 14px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 4px rgba(0,0,0,0.03); min-height: 168px; box-sizing: border-box;">
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 0.68rem; font-weight: 800; background: #fffbeb; color: #b45309; padding: 2px 6px; border-radius: 3px; border: 1px solid #fde68a;">
                ${kt.id} • PAPER 2 (B4)
              </span>
              <span style="font-size: 0.72rem; font-weight: 700; color: #64748b;">
                <i class="fa-solid fa-file-pdf" style="color: #b45309; margin-right: 3px;"></i>Complete Suite
              </span>
            </div>
            <h3 style="margin: 0 0 4px 0; color: #0f172a; font-size: 0.88rem; font-weight: 800; line-height: 1.25;">
              ${kt.title}
            </h3>
            <p style="margin: 0; font-size: 0.72rem; color: #64748b; line-height: 1.3;">
              ${kt.desc}
            </p>
          </div>

          <div style="display: flex; gap: 5px; margin-top: 8px;">
            <a href="/pdfs/eee_textbook_${kt.id}_FINAL_V17.pdf" target="_blank" download style="flex: 1; text-align: center; background: #ffffff; border: 1px solid #cbd5e1; border-left: 3px solid #0284c7; padding: 5px 4px; border-radius: 4px; font-size: 0.72rem; font-weight: 700; color: #0f172a; text-decoration: none;">
              <i class="fa-solid fa-book-open"></i> Text
            </a>
            <a href="/pdfs/eee_pupil_workbook_${kt.id}_FINAL_V17.pdf" target="_blank" download style="flex: 1; text-align: center; background: #ffffff; border: 1px solid #cbd5e1; border-left: 3px solid #d97706; padding: 5px 4px; border-radius: 4px; font-size: 0.72rem; font-weight: 700; color: #0f172a; text-decoration: none;">
              <i class="fa-solid fa-user-pen"></i> Work
            </a>
            <a href="/pdfs/eee_mastery_pack_${kt.id}_FINAL_V17.pdf" target="_blank" download style="flex: 1; text-align: center; background: #ffffff; border: 1px solid #cbd5e1; border-left: 3px solid #b91c1c; padding: 5px 4px; border-radius: 4px; font-size: 0.72rem; font-weight: 700; color: #0f172a; text-decoration: none;">
              <i class="fa-solid fa-shield-halved"></i> Master
            </a>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    html += renderMockExamsRow(
      'eee',
      unitData.mock_exams || [
        {
          id: 'mock_paper2_elizabethan',
          title: 'Paper 2: Early Elizabethan England Exam Paper',
          time_minutes: 55,
          total_marks: 32,
        },
      ],
    );
  }
  // 6. Weimar and Nazi Germany (`weimar_nazi_germany`)
  else if (activeUnitId === 'weimar_nazi_germany') {
    const weimarCards = [
      {
        id: 'KT1',
        title: 'KT1: The Weimar Republic (1918–29)',
        desc: 'Origins, Golden Age (Stresemann), culture & early crises.',
      },
      {
        id: 'KT2',
        title: 'KT2: Hitler’s Rise to Power (1919–33)',
        desc: 'Early NSDAP, Munich Putsch, Lean Years, Great Depression.',
      },
      {
        id: 'KT3',
        title: 'KT3: Nazi Control & Dictatorship (1933–39)',
        desc: 'Reichstag fire, Enabling Act, Night of Long Knives, Police State.',
      },
      {
        id: 'KT4',
        title: 'KT4: Life in Nazi Germany (1933–39)',
        desc: 'Women, youth, employment, standard of living, persecution of minorities.',
      },
    ];

    html += `
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 10px;">
    `;

    weimarCards.forEach((kt) => {
      html += `
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-top: 3.5px solid #7f1d1d; border-radius: 7px; padding: 10px 12px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 4px rgba(0,0,0,0.03); min-height: 165px; box-sizing: border-box;">
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 3px;">
              <span style="font-size: 0.65rem; font-weight: 800; background: #fef2f2; color: #991b1b; padding: 2px 5px; border-radius: 3px; border: 1px solid #fecaca;">
                ${kt.id} • PAPER 3
              </span>
              <span style="font-size: 0.68rem; font-weight: 700; color: #64748b;">Complete</span>
            </div>
            <h4 style="margin: 0 0 3px 0; color: #0f172a; font-size: 0.82rem; font-weight: 800; line-height: 1.25;">
              ${kt.title}
            </h4>
            <p style="margin: 0; font-size: 0.7rem; color: #64748b; line-height: 1.3;">
              ${kt.desc}
            </p>
          </div>

          <div style="display: flex; gap: 4px; margin-top: 6px;">
            <a href="/pdfs/weimar_nazi_germany_textbook_${kt.id}_FINAL_V17.pdf" target="_blank" download style="flex: 1; text-align: center; background: #ffffff; border: 1px solid #cbd5e1; border-left: 2.5px solid #0284c7; padding: 4px 2px; border-radius: 3px; font-size: 0.7rem; font-weight: 700; color: #0f172a; text-decoration: none;">
              Text
            </a>
            <a href="/pdfs/weimar_nazi_germany_pupil_workbook_${kt.id}_FINAL_V17.pdf" target="_blank" download style="flex: 1; text-align: center; background: #ffffff; border: 1px solid #cbd5e1; border-left: 2.5px solid #d97706; padding: 4px 2px; border-radius: 3px; font-size: 0.7rem; font-weight: 700; color: #0f172a; text-decoration: none;">
              Work
            </a>
            <a href="/pdfs/weimar_nazi_germany_mastery_pack_${kt.id}_FINAL_V17.pdf" target="_blank" download style="flex: 1; text-align: center; background: #ffffff; border: 1px solid #cbd5e1; border-left: 2.5px solid #b91c1c; padding: 4px 2px; border-radius: 3px; font-size: 0.7rem; font-weight: 700; color: #0f172a; text-decoration: none;">
              Master
            </a>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    html += renderMockExamsRow(
      'weimar_nazi_germany',
      unitData.mock_exams || [
        {
          id: 'mock_paper3_weimar',
          title: 'Paper 3: Weimar and Nazi Germany Mock Exam Paper',
          time_minutes: 80,
          total_marks: 52,
        },
      ],
    );
  }
  // 7. Generic Unit with Workbooks (e.g. Medieval England, Shoah, Industrialisation, Australia, etc.)
  else if (
    unitData.workbooks &&
    Array.isArray(unitData.workbooks) &&
    unitData.workbooks.length > 0
  ) {
    const uId = activeUnitId;
    const title = unitData.title || uId;

    const cleanUnitTitle = (title || uId).replace(/'/g, "\\'");
    html += `
      <div style="background: #ffffff; padding: 14px 18px; border-radius: 7px; border: 1px solid #e2e8f0; box-shadow: 0 1px 4px rgba(0,0,0,0.03); margin-bottom: 10px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #e2e8f0;">
          <div>
            <h3 style="margin: 0; color: #0f172a; font-size: 1.05rem; font-weight: 800;">${title} — Printable Master Booklets</h3>
            <p style="margin: 2px 0 0 0; color: #64748b; font-size: 0.78rem;">Photocopier-ready classroom sets, pupil workbooks, and deep revision packs.</p>
          </div>
          <span style="font-size: 0.72rem; font-weight: 700; background: #f1f5f9; color: #475569; padding: 3px 8px; border-radius: 4px;">
            KS3 / Curriculum Unit
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px;">
          <!-- 1. Textbook PDF -->
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-top: 3px solid #0284c7; border-radius: 6px; padding: 10px 12px; display: flex; flex-direction: column; justify-content: space-between; min-height: 140px;">
            <div>
              <span style="font-size: 0.65rem; font-weight: 800; background: #e0f2fe; color: #0369a1; padding: 2px 5px; border-radius: 2px;">READING MATERIAL</span>
              <h4 style="margin: 4px 0 2px 0; color: #0f172a; font-size: 0.85rem; font-weight: 800;">Complete Core Textbook</h4>
              <p style="margin: 0; font-size: 0.72rem; color: #64748b;">Class set reading materials and primary extracts.</p>
            </div>
            <div style="display: flex; gap: 5px; margin-top: 8px;">
              <button type="button" class="btn" onclick="window.openInPagePreview('/units/${uId}/textbook.html', '${cleanUnitTitle} Core Textbook', '/pdfs/${uId}_textbook_FINAL_V17.pdf', { badge: 'TEXTBOOK' })" style="flex: 1; text-align: center; background: #ffffff; border: 1px solid #cbd5e1; border-left: 3px solid #0284c7; padding: 5px 6px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; font-size: 0.74rem; font-weight: 700; color: #1e293b; transition: all 0.15s ease;" onmouseover="this.style.borderColor='#0284c7';" onmouseout="this.style.borderColor='#cbd5e1';">
                <i class="fa-solid fa-eye" style="color: #0284c7;"></i> Preview
              </button>
              <a href="/pdfs/${uId}_textbook_FINAL_V17.pdf" target="_blank" download style="background: #0284c7; color: #ffffff; padding: 5px 9px; border-radius: 4px; text-decoration: none; font-size: 0.74rem; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; transition: opacity 0.15s ease;" onmouseover="this.style.opacity='0.9';" onmouseout="this.style.opacity='1';" title="Download Textbook PDF">
                <i class="fa-solid fa-download"></i> PDF
              </a>
            </div>
          </div>

          <!-- 2. Pupil Workbook PDF -->
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-top: 3px solid #d97706; border-radius: 6px; padding: 10px 12px; display: flex; flex-direction: column; justify-content: space-between; min-height: 140px;">
            <div>
              <span style="font-size: 0.65rem; font-weight: 800; background: #fef3c7; color: #b45309; padding: 2px 5px; border-radius: 2px;">WRITING TASKS</span>
              <h4 style="margin: 4px 0 2px 0; color: #0f172a; font-size: 0.85rem; font-weight: 800;">Pupil Workbook</h4>
              <p style="margin: 0; font-size: 0.72rem; color: #64748b;">Writing spaces, source evaluation, and pupil tasks.</p>
            </div>
            <div style="display: flex; gap: 5px; margin-top: 8px;">
              <button type="button" class="btn" onclick="window.openInPagePreview('/units/${uId}/pupil_workbook.html', '${cleanUnitTitle} Pupil Workbook', '/pdfs/${uId}_pupil_workbook_FINAL_V17.pdf', { badge: 'WORKBOOK' })" style="flex: 1; text-align: center; background: #ffffff; border: 1px solid #cbd5e1; border-left: 3px solid #d97706; padding: 5px 6px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; font-size: 0.74rem; font-weight: 700; color: #1e293b; transition: all 0.15s ease;" onmouseover="this.style.borderColor='#d97706';" onmouseout="this.style.borderColor='#cbd5e1';">
                <i class="fa-solid fa-eye" style="color: #d97706;"></i> Preview
              </button>
              <a href="/pdfs/${uId}_pupil_workbook_FINAL_V17.pdf" target="_blank" download style="background: #d97706; color: #ffffff; padding: 5px 9px; border-radius: 4px; text-decoration: none; font-size: 0.74rem; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; transition: opacity 0.15s ease;" onmouseover="this.style.opacity='0.9';" onmouseout="this.style.opacity='1';" title="Download Workbook PDF">
                <i class="fa-solid fa-download"></i> PDF
              </a>
            </div>
          </div>

          <!-- 3. Mastery Pack PDF -->
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-top: 3px solid #b91c1c; border-radius: 6px; padding: 10px 12px; display: flex; flex-direction: column; justify-content: space-between; min-height: 140px;">
            <div>
              <span style="font-size: 0.65rem; font-weight: 800; background: #fee2e2; color: #b91c1c; padding: 2px 5px; border-radius: 2px;">REVISION &amp; MASTERY</span>
              <h4 style="margin: 4px 0 2px 0; color: #0f172a; font-size: 0.85rem; font-weight: 800;">Mastery Pack</h4>
              <p style="margin: 0; font-size: 0.72rem; color: #64748b;">Extended writing, retrieval, and assessment tasks.</p>
            </div>
            <div style="display: flex; gap: 5px; margin-top: 8px;">
              <button type="button" class="btn" onclick="window.openInPagePreview('/units/${uId}/mastery_pack_full.html', '${cleanUnitTitle} Mastery Pack', '/pdfs/${uId}_mastery_pack_full_FINAL_V17.pdf', { badge: 'MASTERY' })" style="flex: 1; text-align: center; background: #ffffff; border: 1px solid #cbd5e1; border-left: 3px solid #b91c1c; padding: 5px 6px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; font-size: 0.74rem; font-weight: 700; color: #1e293b; transition: all 0.15s ease;" onmouseover="this.style.borderColor='#b91c1c';" onmouseout="this.style.borderColor='#cbd5e1';">
                <i class="fa-solid fa-eye" style="color: #b91c1c;"></i> Preview
              </button>
              <a href="/pdfs/${uId}_mastery_pack_full_FINAL_V17.pdf" target="_blank" download style="background: #b91c1c; color: #ffffff; padding: 5px 9px; border-radius: 4px; text-decoration: none; font-size: 0.74rem; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; transition: opacity 0.15s ease;" onmouseover="this.style.opacity='0.9';" onmouseout="this.style.opacity='1';" title="Download Mastery PDF">
                <i class="fa-solid fa-download"></i> PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    if (unitData.mock_exams && unitData.mock_exams.length > 0) {
      html += renderMockExamsRow(uId, unitData.mock_exams);
    }
  }
  // 8. All Curriculum Units & KS3 Directory (`all`)
  else {
    const gcseUnits = [
      {
        id: 'cme_new',
        name: 'Conflict in the Middle East (1945–95)',
        spec: 'Paper 2 • Option P5',
        icon: 'fa-dove',
        color: '#0284c7',
      },
      {
        id: 'usa',
        name: 'USA: Conflict at Home & Abroad (1954–75)',
        spec: 'Paper 3 • Option 33',
        icon: 'fa-flag-usa',
        color: '#1e40af',
      },
      {
        id: 'edexcel_medicine',
        name: 'Medicine in Britain & Western Front',
        spec: 'Paper 1 • Option 11',
        icon: 'fa-notes-medical',
        color: '#0f766e',
      },
      {
        id: 'eee',
        name: 'Early Elizabethan England (1558–88)',
        spec: 'Paper 2 • Option B4',
        icon: 'fa-crown',
        color: '#b45309',
      },
      {
        id: 'weimar_nazi_germany',
        name: 'Weimar & Nazi Germany (1918–39)',
        spec: 'Paper 3 • Option 31',
        icon: 'fa-landmark',
        color: '#7f1d1d',
      },
    ];

    const ks3Units = [
      {
        id: 'great_war',
        name: 'Causes of the Great War',
        year: 'Year 9',
        icon: 'fa-shield-halved',
      },
      {
        id: 'medieval_england',
        name: 'Medieval England (1066–1485)',
        year: 'Year 7',
        icon: 'fa-chess-rook',
      },
      {
        id: 'industrialisation_and_empire',
        name: 'Industrialisation & Empire',
        year: 'Year 8',
        icon: 'fa-industry',
      },
      {
        id: 'the_shoah',
        name: 'The Shoah (The Holocaust)',
        year: 'Year 9',
        icon: 'fa-star-of-david',
      },
      {
        id: 'australia',
        name: 'Indigenous Australia & Colony',
        year: 'Year 8',
        icon: 'fa-earth-oceania',
      },
      {
        id: 'water_and_sanitation',
        name: 'Water & Sanitation Through Time',
        year: 'Year 7',
        icon: 'fa-faucet-drip',
      },
      {
        id: 'cold_war',
        name: 'Superpower Relations & Cold War',
        year: 'KS3 / GCSE Prep',
        icon: 'fa-person-military-pointing',
      },
      {
        id: 'post_war_britain',
        name: 'Post-War Britain & Windrush',
        year: 'Year 9',
        icon: 'fa-city',
      },
      {
        id: 'early_modern_world',
        name: 'The Early Modern World',
        year: 'Year 8',
        icon: 'fa-compass',
      },
      {
        id: 'trip_ypres',
        name: 'Ypres Battlefield Tour Field Companion',
        year: 'Field Trip',
        icon: 'fa-map-location-dot',
      },
    ];

    html += `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <!-- GCSE Column -->
        <div style="background: #ffffff; border: 1.5px solid #000000; border-radius: 7px; padding: 12px 14px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1.5px solid #000000;">
            <span style="font-size: 0.76rem; font-weight: 900; text-transform: uppercase; color: #000000;">
              <i class="fa-solid fa-graduation-cap"></i> Edexcel GCSE History Suites (Years 10–11)
            </span>
            <span style="font-size: 0.68rem; font-weight: 800; background: #000000; color: #ffffff; padding: 2px 6px; border-radius: 2px;">5 Units</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${gcseUnits
              .map(
                (u) => `
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid ${u.color}; border-radius: 5px; padding: 6px 10px; display: flex; align-items: center; justify-content: space-between; transition: all 0.15s ease;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <i class="fa-solid ${u.icon}" style="color: ${u.color}; font-size: 0.88rem;"></i>
                  <div>
                    <strong style="color: #0f172a; font-size: 0.78rem; display: block; line-height: 1.2;">${u.name}</strong>
                    <span style="color: #64748b; font-size: 0.68rem;">${u.spec}</span>
                  </div>
                </div>
                <button type="button" onclick="window.switchView('booklet', '${u.id}')" style="background: #0f172a; color: #ffffff; border: none; padding: 4px 9px; border-radius: 4px; font-size: 0.7rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
                  Open PDFs <i class="fa-solid fa-arrow-right" style="font-size: 0.65rem;"></i>
                </button>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- KS3 Column -->
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 7px; padding: 12px 14px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid #e2e8f0;">
            <span style="font-size: 0.76rem; font-weight: 800; text-transform: uppercase; color: #1e293b;">
              <i class="fa-solid fa-book-bookmark"></i> Key Stage 3 Curriculum Units (Years 7–9)
            </span>
            <span style="font-size: 0.68rem; font-weight: 700; background: #e2e8f0; color: #334155; padding: 2px 6px; border-radius: 2px;">10 Units</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
            ${ks3Units
              .map(
                (u) => `
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 5px; padding: 6px 8px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; transition: all 0.15s ease;" onclick="window.switchView('booklet', '${u.id}')" onmouseover="this.style.background='#ffffff'; this.style.borderColor='#0284c7';" onmouseout="this.style.background='#f8fafc'; this.style.borderColor='#e2e8f0';">
                <div style="display: flex; align-items: center; gap: 6px; overflow: hidden;">
                  <i class="fa-solid ${u.icon}" style="color: #64748b; font-size: 0.8rem; flex-shrink: 0;"></i>
                  <div style="overflow: hidden;">
                    <div style="color: #0f172a; font-size: 0.72rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${u.name}</div>
                    <span style="color: #94a3b8; font-size: 0.64rem;">${u.year}</span>
                  </div>
                </div>
                <i class="fa-solid fa-angle-right" style="color: #94a3b8; font-size: 0.7rem; margin-left: 4px;"></i>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>
      </div>
    `;
  }

  // Render docked in-page preview console for all units except all-units directory
  if (activeUnitId && activeUnitId !== 'all') {
    html += renderInPagePreviewConsole();
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
