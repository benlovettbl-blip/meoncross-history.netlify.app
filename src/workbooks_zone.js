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
    <!-- In-Page PDF & Document Preview Console -->
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
          <a id="btnPreviewDownload" href="#" target="_blank" title="Open compiled PDF in new tab" style="background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3); font-weight: 600; font-size: 0.76rem; padding: 5px 10px; border-radius: 6px; text-decoration: none; display: inline-flex; align-items: center; gap: 5px;">
            <i class="fa-solid fa-file-pdf"></i> Open PDF
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

/**
 * 3 Master Books Publication Catalog
 * Maps each unit to its 3 distinct publication pillars and available editions.
 */
const UNIT_PUBLICATIONS = {
  cme_new: {
    specTitle: 'Paper 2: Conflict in the Middle East, 1945–1995 (1HI0/21)',
    pillar1: {
      key: 'pillar1',
      badge: 'PILLAR 1 • MASTER TEXTBOOK',
      color: '#0284c7',
      tags: ['Reading Narrative', 'Primary Sources', '0% Writing Lines'],
      editions: [
        {
          id: 'all',
          label: 'Complete Unit (KT1–KT3 Combined)',
          title: '20-Page Specification Revision Guide & War Atlas',
          pages: '20 Pages',
          desc: '12 Specification Cheat Sheets across KT1–KT3, 4 cartographic war atlas plates, verbatim Pearson specification targets, and memory vaults.',
          readUrl: '/units/cme_new/visual_revision_guide.html',
          pdfUrl: '/pdfs/cme_revision_guide.pdf',
        },
        {
          id: 'KT1',
          label: 'Key Topic 1: Creation of Israel (1945–56)',
          title: 'KT1 Master Textbook: Creation of Israel (1945–56)',
          pages: '16 Pages',
          desc: 'Mandate collapse, Jewish insurgency, UN Partition, 1948 War, Palestinian refugees & 1956 Suez Crisis. Reading text and primary sources.',
          readUrl: '/units/cme_new/textbook_KT1_PUBLISHER.html',
          pdfUrl: '/pdfs/cme_new_textbook_KT1_FINAL_V17.pdf',
        },
        {
          id: 'KT2',
          label: 'Key Topic 2: The Escalating Conflict (1964–73)',
          title: 'KT2 Master Textbook: The Escalating Conflict (1964–73)',
          pages: '16 Pages',
          desc: 'Water Wars, Six-Day War (1967), Conquered Territories, Resolution 242, Black September, Munich & Yom Kippur War.',
          readUrl: '/units/cme_new/textbook_KT2_PUBLISHER.html',
          pdfUrl: '/pdfs/cme_new_textbook_KT2_FINAL_V17.pdf',
        },
        {
          id: 'KT3',
          label: 'Key Topic 3: The Search for Peace (1974–95)',
          title: 'KT3 Master Textbook: The Search for Peace (1974–95)',
          pages: '16 Pages',
          desc: 'Shuttle diplomacy, Camp David (1978), Lebanon & Sabra/Shatila (1982), First Intifada (1987), Oslo Accords & Rabin assassination.',
          readUrl: '/units/cme_new/textbook_KT3_PUBLISHER.html',
          pdfUrl: '/pdfs/cme_new_textbook_KT3_FINAL_V17.pdf',
        },
      ],
    },
    pillar2: {
      key: 'pillar2',
      badge: 'PILLAR 2 • PUPIL WORKBOOK',
      color: '#d97706',
      tags: ['Enquiry Spreads', 'Stepped Scaffolds', 'Photocopier Ready'],
      editions: [
        {
          id: 'all',
          label: 'Complete Unit (KT1–KT3 Combined)',
          title: '36-Page Complete Exam Practice & Assessment Mastery Pack',
          pages: '36 Pages',
          desc: 'Complete 36-page exam practice volume combining KT1, KT2, and KT3. Differentiated stepped ladder, 4-mark consequence drills, and photocopier-safe lines.',
          readUrl: '/units/cme_new/booklets/cme_mastery_FULL.html',
          pdfUrl: '/pdfs/cme_mastery_pack_FULL.pdf',
        },
        {
          id: 'KT1',
          label: 'Key Topic 1: Creation of Israel (1945–56)',
          title: 'KT1 Pupil Consumable Workbook (1945–56)',
          pages: '12 Pages',
          desc: 'Photocopier-ready classroom workbook for KT1. Guided recall, enquiry spreads, source analysis, and stepped exam ladders.',
          readUrl: '/units/cme_new/pupil_workbook_KT1.html',
          pdfUrl: '/pdfs/cme_new_pupil_workbook_KT1_FINAL_V17.pdf',
        },
        {
          id: 'KT2',
          label: 'Key Topic 2: The Escalating Conflict (1964–73)',
          title: 'KT2 Pupil Consumable Workbook (1964–73)',
          pages: '12 Pages',
          desc: 'Photocopier-ready classroom workbook for KT2. Six-Day War analysis, military tactics, Resolution 242 evaluation, and 12-mark causation scaffolds.',
          readUrl: '/units/cme_new/pupil_workbook_KT2.html',
          pdfUrl: '/pdfs/cme_new_pupil_workbook_KT2_FINAL_V17.pdf',
        },
        {
          id: 'KT3',
          label: 'Key Topic 3: The Search for Peace (1974–95)',
          title: 'KT3 Pupil Consumable Workbook (1974–95)',
          pages: '12 Pages',
          desc: 'Photocopier-ready classroom workbook for KT3. Camp David treaties, First Intifada timeline, Oslo Accords peace process, and 16-mark essays.',
          readUrl: '/units/cme_new/pupil_workbook_KT3.html',
          pdfUrl: '/pdfs/cme_new_pupil_workbook_KT3_FINAL_V17.pdf',
        },
      ],
    },
    pillar3: {
      key: 'pillar3',
      badge: 'PILLAR 3 • RETRIEVAL COMPANION',
      color: '#7c3aed',
      tags: ['128 Core Questions', 'Spaced Recall', 'Teacher Marking Bank'],
      editions: [
        {
          id: 'all',
          label: 'Complete Unit (128 Core Questions & Answers)',
          title: 'Master Knowledge Retrieval & Homework Companion (128 Core Questions)',
          pages: '24 Pages (A4)',
          desc: 'All 128 knowledge recall questions across KT1, KT2, and KT3 (100% Pearson Revision Guide aligned). Immediate Page 2 retrieval quizzing, front tracking ledger, complete Marking Bank, and Paper 2 exam strategy.',
          readUrl: '/units/cme_new/cme_master_retrieval_companion.html',
          pdfUrl: '/pdfs/Conflict_in_the_Middle_East_Master_Knowledge_Retrieval_Companion.pdf',
        },
      ],
    },
  },
  usa: {
    specTitle: 'Paper 3: USA, 1954–75: Conflict at Home and Abroad (1HI0/33)',
    pillar1: {
      key: 'pillar1',
      badge: 'PILLAR 1 • MASTER TEXTBOOK',
      color: '#1e40af',
      tags: ['Reading Spreads', 'Primary Sources', 'Paper 3 Blueprint'],
      editions: [
        {
          id: 'all',
          label: 'Complete Unit (KT1–KT4 Combined)',
          title: '36-Page Visual Revision & Exam Assessment Playbook',
          pages: '36 Pages',
          desc: '16 double-page spreads across all 4 Key Topics, complete Paper 3 specification blueprints, Q1–Q3 paragraph formulas, Grade 9 WAGOLLs, and timed models.',
          readUrl: '/units/usa/visual_revision_guide.html',
          pdfUrl: '/pdfs/usa_visual_revision_guide.pdf',
        },
        {
          id: 'KT1',
          label: 'Key Topic 1: Civil Rights Movement (1954–65)',
          title: 'KT1 Master Textbook: Civil Rights Movement (1954–65)',
          pages: '16 Pages',
          desc: 'Brown v Board, Montgomery bus boycott, Little Rock, sit-ins, Freedom Rides, March on Washington, CRA 1964, VRA 1965.',
          readUrl: '/units/usa/textbook_KT1.html',
          pdfUrl: '/pdfs/usa_textbook_KT1_FINAL_V17.pdf',
        },
        {
          id: 'KT2',
          label: 'Key Topic 2: Black Power & Civil Rights (1965–75)',
          title: 'KT2 Master Textbook: Black Power & Civil Rights (1965–75)',
          pages: '16 Pages',
          desc: 'Malcolm X, Nation of Islam, Stokely Carmichael, Black Panthers, 1968 Mexico Olympics, urban riots (Watts), MLK assassination.',
          readUrl: '/units/usa/textbook_KT2.html',
          pdfUrl: '/pdfs/usa_textbook_KT2_FINAL_V17.pdf',
        },
        {
          id: 'KT3',
          label: 'Key Topic 3: Peace Movement & Counterculture (1960–75)',
          title: 'KT3 Master Textbook: Peace Movement & Counterculture (1960–75)',
          pages: '16 Pages',
          desc: 'Student movement, SDS, anti-Vietnam War protests, Kent State, Woodstock, Women’s Liberation Movement, Roe v Wade.',
          readUrl: '/units/usa/textbook_KT3.html',
          pdfUrl: '/pdfs/usa_textbook_KT3_FINAL_V17.pdf',
        },
        {
          id: 'KT4',
          label: 'Key Topic 4: The Vietnam War (1954–75)',
          title: 'KT4 Master Textbook: The Vietnam War (1954–75)',
          pages: '16 Pages',
          desc: 'Geneva Accords, Gulf of Tonkin, guerrilla tactics, Tet Offensive (1968), My Lai, Vietnamization, and the Fall of Saigon.',
          readUrl: '/units/usa/textbook_KT4.html',
          pdfUrl: '/pdfs/usa_textbook_KT4_FINAL_V17.pdf',
        },
      ],
    },
    pillar2: {
      key: 'pillar2',
      badge: 'PILLAR 2 • PUPIL WORKBOOK',
      color: '#d97706',
      tags: ['Interpretation Drills', 'Stepped Scaffolds', 'Photocopier Ready'],
      editions: [
        {
          id: 'all',
          label: 'Complete Unit (KT1–KT4 Combined)',
          title: '48-Page Complete Unit Master Compendium (KT1–KT4 Combined)',
          pages: '48 Pages',
          desc: 'Complete 48-page compendium binding KT1, KT2, KT3, and KT4. 4 full Paper 3 exam paper simulations, 16 primary sources/interpretations, and 24 Grade 8/9 exemplars.',
          readUrl: '/units/usa/booklets/usa_mastery_FULL.html',
          pdfUrl: '/pdfs/usa_mastery_pack_FULL.pdf',
        },
        {
          id: 'KT1',
          label: 'Key Topic 1: Civil Rights (1954–65)',
          title: 'KT1 Pupil Workbook: Civil Rights (1954–65)',
          pages: '12 Pages',
          desc: 'Pupil consumable workbook for KT1 with source utility grids, stepped essay scaffolding, and retrieval tasks.',
          readUrl: '/units/usa/pupil_workbook_KT1.html',
          pdfUrl: '/pdfs/usa_pupil_workbook_KT1_FINAL_V17.pdf',
        },
        {
          id: 'KT2',
          label: 'Key Topic 2: Black Power (1965–75)',
          title: 'KT2 Pupil Workbook: Black Power (1965–75)',
          pages: '12 Pages',
          desc: 'Pupil consumable workbook for KT2 with Black Panther source analysis and 16-mark essay frameworks.',
          readUrl: '/units/usa/pupil_workbook_KT2.html',
          pdfUrl: '/pdfs/usa_pupil_workbook_KT2_FINAL_V17.pdf',
        },
        {
          id: 'KT3',
          label: 'Key Topic 3: Peace & Protest (1960–75)',
          title: 'KT3 Pupil Workbook: Peace & Protest (1960–75)',
          pages: '12 Pages',
          desc: "Pupil consumable workbook for KT3 covering counterculture, women's rights, and student demonstrations.",
          readUrl: '/units/usa/pupil_workbook_KT3.html',
          pdfUrl: '/pdfs/usa_pupil_workbook_KT3_FINAL_V17.pdf',
        },
        {
          id: 'KT4',
          label: 'Key Topic 4: The Vietnam War (1954–75)',
          title: 'KT4 Pupil Workbook: The Vietnam War (1954–75)',
          pages: '12 Pages',
          desc: 'Pupil consumable workbook for KT4 with tactical analysis grids, Tet Offensive evaluation, and exam drills.',
          readUrl: '/units/usa/pupil_workbook_KT4.html',
          pdfUrl: '/pdfs/usa_pupil_workbook_KT4_FINAL_V17.pdf',
        },
      ],
    },
    pillar3: {
      key: 'pillar3',
      badge: 'PILLAR 3 • RETRIEVAL COMPANION',
      color: '#7c3aed',
      tags: ['128 Core Questions', '28-Pt Flowchart', 'Teacher Marking Bank'],
      editions: [
        {
          id: 'all',
          label: 'Complete Unit (KT1–KT4 Combined)',
          title: 'Master Knowledge Retrieval & Homework Companion (128 Core Questions)',
          pages: '24 Pages (A4)',
          desc: '16 enquiries × 8 tiered questions with pre-anchored dates, 8.4mm handwriting lines, 28-point chronology flowchart, front tracking ledger, marking bank, and Paper 3 strategy.',
          readUrl: '/units/usa/usa_master_retrieval_companion.html',
          pdfUrl: '/pdfs/USA_1954_1975_Master_Knowledge_Retrieval_Companion.pdf',
        },
      ],
    },
  },
  edexcel_medicine: {
    specTitle: 'Paper 1: Medicine in Britain & Western Front (1HI0/11)',
    pillar1: {
      key: 'pillar1',
      badge: 'PILLAR 1 • MASTER TEXTBOOK',
      color: '#0f766e',
      tags: ['Historical Narratives', 'Primary Medical Treatises', '0% Writing Lines'],
      editions: [
        {
          id: 'all',
          label: 'Complete Course (All 5 Eras Combined)',
          title: '40-Page Visual Revision Masterclasses & Specification Playbook',
          pages: '40 Pages',
          desc: '18 double-page spreads, complete Paper 1 specification blueprints, Section A 2-mark feature guides, Q3–Q6 paragraph formulas, and 1h 15m exam timing models.',
          readUrl: '/units/edexcel_medicine/visual_revision_guide.html',
          pdfUrl: '/pdfs/edexcel_medicine_visual_revision_and_exam_guide.pdf',
        },
        {
          id: 'medieval',
          label: 'Era 1: Medieval Britain (c1250–c1500)',
          title: 'Medieval Britain Master Textbook (c1250–c1500)',
          pages: '16 Pages',
          desc: 'Four Humours, Galen & Church, medieval hospitals, pilgrimage, Black Death (1348). Core reading text and medical plates.',
          readUrl: '/units/edexcel_medicine/textbook_medieval_PUBLISHER.html',
          pdfUrl: '/pdfs/edexcel_medicine_textbook_medieval_FINAL_V17.pdf',
        },
        {
          id: 'renaissance',
          label: 'Era 2: The Medical Renaissance (c1500–c1700)',
          title: 'The Medical Renaissance Master Textbook (c1500–c1700)',
          pages: '16 Pages',
          desc: 'Humanism, printing press, Vesalius (1543), Harvey (1628), Sydenham, Great Plague (1665).',
          readUrl: '/units/edexcel_medicine/textbook_renaissance_PUBLISHER.html',
          pdfUrl: '/pdfs/edexcel_medicine_textbook_renaissance_FINAL_V17.pdf',
        },
        {
          id: '18th_19th',
          label: 'Era 3: 18th & 19th C. Britain (c1700–c1900)',
          title: '18th & 19th C. Britain Master Textbook (c1700–c1900)',
          pages: '16 Pages',
          desc: 'Jenner (smallpox), Germ Theory (Pasteur/Koch), Nightingale, Simpson, Lister, Public Health Acts.',
          readUrl: '/units/edexcel_medicine/textbook_18th_19th_PUBLISHER.html',
          pdfUrl: '/pdfs/edexcel_medicine_textbook_18th_19th_FINAL_V17.pdf',
        },
        {
          id: 'modern',
          label: 'Era 4: Modern Britain (c1900–present)',
          title: 'Modern Britain Master Textbook (c1900–present)',
          pages: '16 Pages',
          desc: 'Genetics & DNA, magic bullets, Fleming/Florey/Chain (penicillin), NHS (1948), lung cancer diagnosis and treatment.',
          readUrl: '/units/edexcel_medicine/textbook_modern_PUBLISHER.html',
          pdfUrl: '/pdfs/edexcel_medicine_textbook_modern_FINAL_V17.pdf',
        },
        {
          id: 'western_front',
          label: 'Historic Env: The Western Front (1914–18)',
          title: 'The Western Front Historic Environment Textbook (1914–18)',
          pages: '16 Pages',
          desc: 'Ypres, Somme, Arras, Cambrai; chain of evacuation (RAP, ADS/MDS, CCS); trench conditions, poison gas & surgical innovation.',
          readUrl: '/units/edexcel_medicine/textbook_western_front_PUBLISHER.html',
          pdfUrl: '/pdfs/edexcel_medicine_textbook_western_front_FINAL_V17.pdf',
        },
      ],
    },
    pillar2: {
      key: 'pillar2',
      badge: 'PILLAR 2 • PUPIL WORKBOOK',
      color: '#d97706',
      tags: ['Enquiry Spreads', 'Exam Scaffolds', 'Photocopier Ready'],
      editions: [
        {
          id: 'all',
          label: 'Complete Course (96-Page All-in-One Bound Master)',
          title: 'Paper 1: Master All-in-One Consumable Pupil Workbook (96 Pages)',
          pages: '96 Pages',
          desc: 'The definitive photocopier-ready classroom workbook binding Section A (Western Front) and all four Section B chronological eras together.',
          readUrl: '/units/edexcel_medicine/booklets/medicine_mastery_compendium_32page.html',
          pdfUrl: '/pdfs/edexcel_medicine_pupil_workbook_master_FINAL_V17.pdf',
        },
        {
          id: 'medieval',
          label: 'Era 1: Medieval Britain (c1250–c1500)',
          title: 'Medieval Britain Pupil Consumable Workbook',
          pages: '16 Pages',
          desc: 'Black Death causation grids, Four Humours enquiry tasks, and 12-mark causation essay ladders.',
          readUrl: '/units/edexcel_medicine/pupil_workbook_medieval.html',
          pdfUrl: '/pdfs/edexcel_medicine_pupil_workbook_medieval_FINAL_V17.pdf',
        },
        {
          id: 'renaissance',
          label: 'Era 2: The Medical Renaissance (c1500–c1700)',
          title: 'The Medical Renaissance Pupil Consumable Workbook',
          pages: '16 Pages',
          desc: 'Vesalius vs Galen anatomical analysis, Harvey blood circulation tasks, and similarity/difference exam drills.',
          readUrl: '/units/edexcel_medicine/pupil_workbook_renaissance.html',
          pdfUrl: '/pdfs/edexcel_medicine_pupil_workbook_renaissance_FINAL_V17.pdf',
        },
        {
          id: '18th_19th',
          label: 'Era 3: 18th & 19th C. Britain (c1700–c1900)',
          title: '18th & 19th C. Britain Pupil Consumable Workbook',
          pages: '16 Pages',
          desc: 'Germ Theory timelines, Nightingale hospital reform, Lister antiseptics, and 16-mark essay scaffolding.',
          readUrl: '/units/edexcel_medicine/pupil_workbook_18th_19th.html',
          pdfUrl: '/pdfs/edexcel_medicine_pupil_workbook_18th_19th_FINAL_V17.pdf',
        },
        {
          id: 'modern',
          label: 'Era 4: Modern Britain (c1900–present)',
          title: 'Modern Britain Pupil Consumable Workbook',
          pages: '16 Pages',
          desc: 'Penicillin discovery and mass production, NHS creation, DNA structure, and synoptic factor evaluation.',
          readUrl: '/units/edexcel_medicine/pupil_workbook_modern.html',
          pdfUrl: '/pdfs/edexcel_medicine_pupil_workbook_modern_FINAL_V17.pdf',
        },
        {
          id: 'western_front',
          label: 'Historic Env: The Western Front (1914–18)',
          title: 'The Western Front Historic Environment Pupil Workbook',
          pages: '16 Pages',
          desc: 'Evacuation chain mapping, trench conditions source analysis, and Q1/Q2 exam technique worksheets.',
          readUrl: '/units/edexcel_medicine/pupil_workbook_western_front.html',
          pdfUrl: '/pdfs/edexcel_medicine_pupil_workbook_western_front_FINAL_V17.pdf',
        },
      ],
    },
    pillar3: {
      key: 'pillar3',
      badge: 'PILLAR 3 • RETRIEVAL COMPANION',
      color: '#7c3aed',
      tags: ['380 Core Questions', '750-Year Chronology', 'Teacher Marking Bank'],
      editions: [
        {
          id: 'all',
          label: 'Complete Course (Section A & Section B Compendium)',
          title: 'Paper 1 Complete Knowledge Retrieval Compendium (380 Questions)',
          pages: '40 Pages',
          desc: 'Complete retrieval volume compiling all 380 rapid recall questions across Section A and Section B with quick-marking back banks.',
          readUrl: '/units/edexcel_medicine/med_recall_quiz_FULL.html',
          pdfUrl: '/pdfs/med_recall_quiz_pack_FULL.pdf',
        },
        {
          id: 'section_b',
          label: 'Section B: Thematic Study Retrieval Companion',
          title: 'Medicine Thematic Study Retrieval Companion (200 Questions)',
          pages: '28 Pages',
          desc: '20 lessons × 10 Qs, 750-year chronology flowchart, 6-factor matrix, marking bank, and Q3–Q6 model answers.',
          readUrl: '/units/edexcel_medicine/med_recall_quiz_FULL.html',
          pdfUrl: '/pdfs/Medicine_Thematic_Study_Master_Knowledge_Retrieval_Companion.pdf',
        },
        {
          id: 'section_a',
          label: 'Section A: Western Front Retrieval Companion',
          title: 'Western Front Historic Environment Retrieval Companion (72 Questions)',
          pages: '12 Pages',
          desc: 'Saddle-stitch companion: evacuation chain, RAMC/FANY, gas attacks, wound treatments, and Q1/Q2 follow-up strategies.',
          readUrl: '/units/edexcel_medicine/med_recall_quiz_FULL.html',
          pdfUrl: '/pdfs/Western_Front_Master_Knowledge_Retrieval_Companion.pdf',
        },
      ],
    },
  },
  eee: {
    specTitle: 'Paper 2: Early Elizabethan England, 1558–1588 (1HI0/B4)',
    pillar1: {
      key: 'pillar1',
      badge: 'PILLAR 1 • MASTER TEXTBOOK',
      color: '#b45309',
      tags: ['Reading Spreads', 'Court & Politics', '0% Writing Lines'],
      editions: [
        {
          id: 'all',
          label: 'Complete Course (KT1–KT3 Combined)',
          title: 'Complete Early Elizabethan Course Textbook (KT1–KT3 Combined)',
          pages: '48 Pages',
          desc: "Full specification coverage across the Elizabethan Religious Settlement, Mary Queen of Scots, the Spanish Armada, and Drake's exploration.",
          readUrl: '/units/eee/textbook_KT1_PUBLISHER.html',
          pdfUrl: '/pdfs/eee_textbook_KT1_FINAL_V17.pdf',
        },
        {
          id: 'KT1',
          label: 'Key Topic 1: Queen, Government & Religion (1558–69)',
          title: 'KT1 Master Textbook: Queen, Government & Religion (1558–69)',
          pages: '16 Pages',
          desc: "Elizabeth's accession, government structure, religious settlement, Puritan and Catholic challenges.",
          readUrl: '/units/eee/textbook_KT1_PUBLISHER.html',
          pdfUrl: '/pdfs/eee_textbook_KT1_FINAL_V17.pdf',
        },
        {
          id: 'KT2',
          label: 'Key Topic 2: Challenges Home & Abroad (1569–88)',
          title: 'KT2 Master Textbook: Challenges to Elizabeth at Home & Abroad (1569–88)',
          pages: '16 Pages',
          desc: 'Plots against Elizabeth (Northern Rebellion, Ridolfi, Throckmorton, Babington), execution of Mary QoS, and the Spanish Armada.',
          readUrl: '/units/eee/textbook_KT2_PUBLISHER.html',
          pdfUrl: '/pdfs/eee_textbook_KT2_FINAL_V17.pdf',
        },
        {
          id: 'KT3',
          label: 'Key Topic 3: Society, Poverty & Exploration (1558–88)',
          title: 'KT3 Master Textbook: Elizabethan Society in the Age of Exploration (1558–88)',
          pages: '16 Pages',
          desc: "Education and leisure, poverty and vagrancy, Drake's circumnavigation, and Raleigh's attempts to colonize Virginia.",
          readUrl: '/units/eee/textbook_KT3_PUBLISHER.html',
          pdfUrl: '/pdfs/eee_textbook_KT3_FINAL_V17.pdf',
        },
      ],
    },
    pillar2: {
      key: 'pillar2',
      badge: 'PILLAR 2 • PUPIL WORKBOOK',
      color: '#d97706',
      tags: ['Enquiry Spreads', 'Stepped Scaffolds', 'Photocopier Ready'],
      editions: [
        {
          id: 'all',
          label: 'Complete Course (KT1–KT3 Combined)',
          title: 'Complete Paper 2 Elizabethan Consumable Workbook Pack',
          pages: '36 Pages',
          desc: 'Comprehensive classroom pupil workbook volume combining KT1, KT2, and KT3 with 2-mark feature drills, 12-mark causation, and 16-mark essays.',
          readUrl: '/units/eee/pupil_workbook_KT1.html',
          pdfUrl: '/pdfs/eee_pupil_workbook_KT1_FINAL_V17.pdf',
        },
        {
          id: 'KT1',
          label: 'Key Topic 1: Queen, Government & Religion',
          title: 'KT1 Pupil Workbook: Queen, Government & Religion',
          pages: '12 Pages',
          desc: 'Pupil consumable workbook for KT1 with religious settlement tables and stepped writing scaffolds.',
          readUrl: '/units/eee/pupil_workbook_KT1.html',
          pdfUrl: '/pdfs/eee_pupil_workbook_KT1_FINAL_V17.pdf',
        },
        {
          id: 'KT2',
          label: 'Key Topic 2: Plots & The Spanish Armada',
          title: 'KT2 Pupil Workbook: Plots & The Spanish Armada',
          pages: '12 Pages',
          desc: 'Pupil consumable workbook for KT2 with plot comparison matrices and Armada battle analysis.',
          readUrl: '/units/eee/pupil_workbook_KT2.html',
          pdfUrl: '/pdfs/eee_pupil_workbook_KT2_FINAL_V17.pdf',
        },
        {
          id: 'KT3',
          label: 'Key Topic 3: Society, Poverty & Exploration',
          title: 'KT3 Pupil Workbook: Society, Poverty & Exploration',
          pages: '12 Pages',
          desc: 'Pupil consumable workbook for KT3 with social hierarchy tasks and Virginia voyage evaluations.',
          readUrl: '/units/eee/pupil_workbook_KT3.html',
          pdfUrl: '/pdfs/eee_pupil_workbook_KT3_FINAL_V17.pdf',
        },
      ],
    },
    pillar3: {
      key: 'pillar3',
      badge: 'PILLAR 3 • RETRIEVAL COMPANION',
      color: '#7c3aed',
      tags: ['Core Recall Questions', 'Chronology Flowcharts', 'Marking Bank'],
      editions: [
        {
          id: 'quiz_pack',
          label: 'Master 16-Page Quiz Pack (120 Questions)',
          title: 'Early Elizabethan England 16-Page Knowledge Retrieval Pack',
          pages: '16 Pages',
          desc: 'Streamlined large-font retrieval pack across all 12 lessons with dual write-in lines, 0% bloat, and marking bank at the back.',
          readUrl: '/units/eee/quiz_pack.html',
          pdfUrl: '/pdfs/Early_Elizabethan_England_Quiz_Pack.pdf',
        },
        {
          id: 'all',
          label: 'Complete Course (KT1–KT3 Combined)',
          title: 'Master Knowledge Retrieval & Assessment Companion',
          pages: '24 Pages',
          desc: 'Factual retrieval questions across KT1–KT3 with 8.4mm handwriting lines, chronology flowcharts, and marking banks.',
          readUrl: '/units/eee/mastery_pack_KT1.html',
          pdfUrl: '/pdfs/eee_mastery_pack_KT1_FINAL_V17.pdf',
        },
      ],
    },
  },
  weimar_nazi_germany: {
    specTitle: 'Paper 3: Weimar and Nazi Germany, 1918–1939 (1HI0/31)',
    pillar1: {
      key: 'pillar1',
      badge: 'PILLAR 1 • MASTER TEXTBOOK',
      color: '#7f1d1d',
      tags: ['Historical Narratives', 'Primary Source Vaults', '0% Writing Lines'],
      editions: [
        {
          id: 'all',
          label: 'Complete Course (KT1–KT4 Combined)',
          title: 'Complete Weimar & Nazi Germany Specification Guide & Textbook',
          pages: '64 Pages',
          desc: "Complete specification text across the Weimar Republic, Hitler's rise, Nazi dictatorship, and life in the Police State.",
          readUrl: '/units/weimar_nazi_germany/visual_revision_guide.html',
          pdfUrl: '/pdfs/weimar_nazi_germany_textbook_KT1_FINAL_V17.pdf',
        },
        {
          id: 'KT1',
          label: 'Key Topic 1: The Weimar Republic (1918–29)',
          title: 'KT1 Master Textbook: The Weimar Republic (1918–29)',
          pages: '16 Pages',
          desc: "Origins, Treaty of Versailles, early rebellions, hyperinflation (1923), Stresemann's Golden Years, and Weimar culture.",
          readUrl: '/units/weimar_nazi_germany/textbook_KT1_PUBLISHER.html',
          pdfUrl: '/pdfs/weimar_nazi_germany_textbook_KT1_FINAL_V17.pdf',
        },
        {
          id: 'KT2',
          label: 'Key Topic 2: Hitler’s Rise to Power (1919–33)',
          title: 'KT2 Master Textbook: Hitler’s Rise to Power (1919–33)',
          pages: '16 Pages',
          desc: 'NSDAP origins, 25-Point Programme, Munich Putsch, Lean Years, Great Depression, and appointment as Chancellor.',
          readUrl: '/units/weimar_nazi_germany/textbook_KT2_PUBLISHER.html',
          pdfUrl: '/pdfs/weimar_nazi_germany_textbook_KT2_FINAL_V17.pdf',
        },
        {
          id: 'KT3',
          label: 'Key Topic 3: Nazi Control & Dictatorship (1933–39)',
          title: 'KT3 Master Textbook: Nazi Control & Dictatorship (1933–39)',
          pages: '16 Pages',
          desc: 'Reichstag Fire, Enabling Act, Night of Long Knives, death of Hindenburg, Police State, SS/Gestapo, propaganda, and religion.',
          readUrl: '/units/weimar_nazi_germany/textbook_KT3_PUBLISHER.html',
          pdfUrl: '/pdfs/weimar_nazi_germany_textbook_KT3_FINAL_V17.pdf',
        },
        {
          id: 'KT4',
          label: 'Key Topic 4: Life in Nazi Germany (1933–39)',
          title: 'KT4 Master Textbook: Life in Nazi Germany (1933–39)',
          pages: '16 Pages',
          desc: 'Women, Hitler Youth, education, employment, standard of living, and persecution of minorities/Jews (Kristallnacht).',
          readUrl: '/units/weimar_nazi_germany/textbook_KT4_PUBLISHER.html',
          pdfUrl: '/pdfs/weimar_nazi_germany_textbook_KT4_FINAL_V17.pdf',
        },
      ],
    },
    pillar2: {
      key: 'pillar2',
      badge: 'PILLAR 2 • PUPIL WORKBOOK',
      color: '#d97706',
      tags: ['Enquiry Spreads', 'Interpretation Drills', 'Photocopier Ready'],
      editions: [
        {
          id: 'all',
          label: 'Complete Course (KT1–KT4 Combined)',
          title: 'Complete Paper 3 Weimar & Nazi Germany Consumable Workbook Pack',
          pages: '48 Pages',
          desc: 'Comprehensive pupil workbook volume combining KT1, KT2, KT3, and KT4 with Q1 inference, Q2 causation, Q3(a) utility, Q3(b/c) interpretations, and Q3(d) essays.',
          readUrl: '/units/weimar_nazi_germany/pupil_workbook_KT1.html',
          pdfUrl: '/pdfs/weimar_nazi_germany_pupil_workbook_KT1_FINAL_V17.pdf',
        },
        {
          id: 'KT1',
          label: 'Key Topic 1: The Weimar Republic (1918–29)',
          title: 'KT1 Pupil Workbook: The Weimar Republic (1918–29)',
          pages: '12 Pages',
          desc: 'Weimar Constitution analysis, hyperinflation sources, and Stresemann utility drills.',
          readUrl: '/units/weimar_nazi_germany/pupil_workbook_KT1.html',
          pdfUrl: '/pdfs/weimar_nazi_germany_pupil_workbook_KT1_FINAL_V17.pdf',
        },
        {
          id: 'KT2',
          label: 'Key Topic 2: Hitler’s Rise to Power (1919–33)',
          title: 'KT2 Pupil Workbook: Hitler’s Rise to Power (1919–33)',
          pages: '12 Pages',
          desc: 'Depression election analysis, backstairs intrigue, and 12-mark causation scaffolds.',
          readUrl: '/units/weimar_nazi_germany/pupil_workbook_KT2.html',
          pdfUrl: '/pdfs/weimar_nazi_germany_pupil_workbook_KT2_FINAL_V17.pdf',
        },
        {
          id: 'KT3',
          label: 'Key Topic 3: Nazi Control & Dictatorship (1933–39)',
          title: 'KT3 Pupil Workbook: Nazi Control & Dictatorship (1933–39)',
          pages: '12 Pages',
          desc: 'Police State sources, church opposition, and Interpretation difference questions.',
          readUrl: '/units/weimar_nazi_germany/pupil_workbook_KT3.html',
          pdfUrl: '/pdfs/weimar_nazi_germany_pupil_workbook_KT3_FINAL_V17.pdf',
        },
        {
          id: 'KT4',
          label: 'Key Topic 4: Life in Nazi Germany (1933–39)',
          title: 'KT4 Pupil Workbook: Life in Nazi Germany (1933–39)',
          pages: '12 Pages',
          desc: 'Youth and women policy comparisons, standard of living evaluations, and 16-mark essay frameworks.',
          readUrl: '/units/weimar_nazi_germany/pupil_workbook_KT4.html',
          pdfUrl: '/pdfs/weimar_nazi_germany_pupil_workbook_KT4_FINAL_V17.pdf',
        },
      ],
    },
    pillar3: {
      key: 'pillar3',
      badge: 'PILLAR 3 • RETRIEVAL COMPANION',
      color: '#7c3aed',
      tags: ['Core Recall Questions', 'Chronology Flowcharts', 'Marking Bank'],
      editions: [
        {
          id: 'all',
          label: 'Complete Course (KT1–KT4 Combined)',
          title: 'Master Knowledge Retrieval & Assessment Companion',
          pages: '24 Pages',
          desc: 'Comprehensive factual recall questions across KT1–KT4 with 8.4mm handwriting lines, chronology flowcharts, and marking banks.',
          readUrl: '/units/weimar_nazi_germany/mastery_pack_KT1.html',
          pdfUrl: '/pdfs/weimar_nazi_germany_mastery_pack_KT1_FINAL_V17.pdf',
        },
      ],
    },
  },
  great_war: {
    specTitle: 'Key Stage 3: Causes of the Great War, 1871–1914',
    pillar1: {
      key: 'pillar1',
      badge: 'PILLAR 1 • MASTER TEXTBOOK',
      color: '#0284c7',
      tags: ['Narrative Reading', 'Primary Documents', '0% Writing Lines'],
      editions: [
        {
          id: 'all',
          label: 'Complete Core Textbook (6 Lessons)',
          title: 'Complete Causes of the Great War Core Textbook',
          pages: '6 Lessons • Full Text',
          desc: 'Authentic historical narratives, primary documents, and context. Zero writing lines — ideal for reading on screens or printing class sets.',
          readUrl: '/units/great_war/textbook.html',
          pdfUrl: '/pdfs/great_war_textbook_FINAL_V17.pdf',
        },
      ],
    },
    pillar2: {
      key: 'pillar2',
      badge: 'PILLAR 2 • PUPIL WORKBOOK',
      color: '#d97706',
      tags: ['Structured Writing', 'Source Evaluation', 'Photocopier Ready'],
      editions: [
        {
          id: 'all',
          label: 'Causes of the Great War (Part 1 Workbook)',
          title: 'Complete Causes of the Great War Pupil Workbook',
          pages: 'Photocopier Ready',
          desc: 'Structured writing tasks, recall challenges, source evaluation tables, and extended writing scaffolds. Print once for the unit.',
          readUrl: '/units/great_war/pupil_workbook.html',
          pdfUrl: '/pdfs/great_war_pupil_workbook_FINAL_V17.pdf',
        },
        {
          id: 'part2',
          label: 'The Western Front (Part 2 Workbook)',
          title: 'Great War Part 2: The Western Front Pupil Workbook',
          pages: 'Photocopier Ready',
          desc: 'Trench warfare, key battles, weaponry, and the Armistice of 1918. Complete pupil consumable workbook.',
          readUrl: '/units/great_war_part2/pupil_workbook.html',
          pdfUrl: '/pdfs/great_war_part2_pupil_workbook_FINAL_V17.pdf',
        },
      ],
    },
    pillar3: {
      key: 'pillar3',
      badge: 'PILLAR 3 • RETRIEVAL COMPANION',
      color: '#7c3aed',
      tags: ['48 Core Questions', '1871–1914 Flowchart', 'Teacher Marking Bank'],
      editions: [
        {
          id: 'all',
          label: 'Complete Unit (All 6 Lessons)',
          title: 'Master Recall Quiz & Homework Companion (48 Core Questions)',
          pages: '12 Pages (A5 Booklet)',
          desc: '48 core factual questions across all 6 lessons with two handwriting lines, 1871–1914 domino flowchart, front tracking ledger, marking bank, and assessment architect.',
          readUrl: '/units/great_war/quiz_pack.html',
          pdfUrl: '/pdfs/great_war_quiz_pack_FINAL_V17.pdf',
        },
      ],
    },
  },
};

/**
 * Fallback generator for generic KS3 units
 */
function getGenericUnitPublications(unitId, unitData) {
  const title = (unitData && unitData.title) || unitId;
  return {
    specTitle: `Key Stage 3 Curriculum: ${title}`,
    pillar1: {
      key: 'pillar1',
      badge: 'PILLAR 1 • MASTER TEXTBOOK',
      color: '#0284c7',
      tags: ['Class Set Reading', 'Primary Extracts', '0% Writing Lines'],
      editions: [
        {
          id: 'all',
          label: 'Complete Core Textbook',
          title: `${title} — Complete Core Textbook`,
          pages: 'Complete Volume',
          desc: 'Photocopier-ready and digital class set reading text with authentic historical narratives, primary source extracts, and enquiry questions.',
          readUrl: `/units/${unitId}/textbook.html`,
          pdfUrl: `/pdfs/${unitId}_textbook_FINAL_V17.pdf`,
        },
      ],
    },
    pillar2: {
      key: 'pillar2',
      badge: 'PILLAR 2 • PUPIL WORKBOOK',
      color: '#d97706',
      tags: ['Enquiry Spreads', 'Writing Scaffolds', 'Photocopier Ready'],
      editions: [
        {
          id: 'all',
          label: 'Pupil Consumable Workbook',
          title: `${title} — Pupil Consumable Workbook`,
          pages: 'Photocopier Ready',
          desc: 'Structured writing spaces, enquiry challenges, source evaluation tables, and extended writing scaffolds for every lesson in the unit.',
          readUrl: `/units/${unitId}/pupil_workbook.html`,
          pdfUrl: `/pdfs/${unitId}_pupil_workbook_FINAL_V17.pdf`,
        },
      ],
    },
    pillar3: {
      key: 'pillar3',
      badge: 'PILLAR 3 • RETRIEVAL COMPANION',
      color: '#7c3aed',
      tags: ['Knowledge Retrieval', 'Stepped Assessment', 'Marking Bank'],
      editions: [
        {
          id: 'all',
          label: 'Mastery Pack & Assessment',
          title: `${title} — Mastery Pack & Assessment`,
          pages: 'Deep Revision Pack',
          desc: 'Deep knowledge retrieval, stepped ladder tasks, essay frameworks, and synoptic assessment challenges.',
          readUrl: `/units/${unitId}/mastery_pack_full.html`,
          pdfUrl: `/pdfs/${unitId}_mastery_pack_full_FINAL_V17.pdf`,
        },
      ],
    },
  };
}

/**
 * Universal dynamic edition change handler
 */
window.onPillarEditionChange = function (selectEl, unitId, pillarKey) {
  const selectedId = selectEl.value;
  const unitPubs = UNIT_PUBLICATIONS[unitId] || window.currentGenericUnitPublications;
  if (!unitPubs || !unitPubs[pillarKey]) return;
  const pillar = unitPubs[pillarKey];
  const edition = pillar.editions.find((e) => e.id === selectedId) || pillar.editions[0];

  const cardEl = selectEl.closest('.master-pillar-card');
  if (!cardEl) return;

  const titleEl = cardEl.querySelector('.pillar-dynamic-title');
  const pagesEl = cardEl.querySelector('.pillar-dynamic-pages');
  const descEl = cardEl.querySelector('.pillar-dynamic-desc');
  const btnRead = cardEl.querySelector('.pillar-btn-read');
  const btnPdf = cardEl.querySelector('.pillar-btn-pdf');

  if (titleEl) titleEl.textContent = edition.title;
  if (pagesEl) {
    pagesEl.innerHTML = `<i class="fa-solid fa-file-pdf" style="color: ${pillar.color}; margin-right: 4px;"></i>${edition.pages}`;
  }
  if (descEl) descEl.textContent = edition.desc;
  if (btnPdf) {
    btnPdf.href = edition.pdfUrl;
    btnPdf.title = `Open ${edition.title} PDF in new tab`;
  }
  if (btnRead) {
    const cleanTitle = (edition.title || '').replace(/'/g, "\\'");
    btnRead.onclick = () => {
      window.openInPagePreview(edition.readUrl, cleanTitle, edition.pdfUrl, {
        badge: pillar.badge,
      });
    };
  }
};

/**
 * Helper to render an individual master pillar card
 */
function renderMasterPillarCard(unitId, pillar) {
  const defaultEdition = pillar.editions[0];
  const cleanTitle = (defaultEdition.title || '').replace(/'/g, "\\'");
  const hasMultipleEditions = pillar.editions.length > 1;

  return `
    <div class="master-pillar-card" data-pillar-key="${pillar.key}" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-top: 4px solid ${pillar.color}; border-radius: 10px; padding: 16px 18px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 12px rgba(0,0,0,0.04); min-height: 290px; box-sizing: border-box; transition: transform 0.15s ease, box-shadow 0.15s ease;">
      <div>
        <!-- Top Badge + Page Budget -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <span style="font-size: 0.68rem; font-weight: 800; background: ${pillar.color}15; color: ${pillar.color}; padding: 3px 8px; border-radius: 4px; letter-spacing: 0.4px; text-transform: uppercase; border: 1px solid ${pillar.color}30;">
            ${pillar.badge}
          </span>
          <span class="pillar-dynamic-pages" style="font-size: 0.72rem; font-weight: 700; color: #64748b; background: #f8fafc; padding: 2px 7px; border-radius: 4px; border: 1px solid #e2e8f0;">
            <i class="fa-solid fa-file-pdf" style="color: ${pillar.color}; margin-right: 4px;"></i>${defaultEdition.pages}
          </span>
        </div>

        <!-- Edition / Module Dropdown -->
        <div style="margin-bottom: 12px;">
          <label style="display: block; font-size: 0.68rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">
            <i class="fa-solid fa-layer-group" style="margin-right: 4px;"></i>Course Edition / Topic:
          </label>
          <select class="pillar-edition-select" onchange="window.onPillarEditionChange(this, '${unitId}', '${pillar.key}')" ${hasMultipleEditions ? '' : 'disabled title="Complete single-volume edition"'} style="width: 100%; font-size: 0.78rem; font-weight: 700; color: #0f172a; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 6px 10px; cursor: ${hasMultipleEditions ? 'pointer' : 'default'}; outline: none; transition: border-color 0.15s ease;">
            ${pillar.editions.map((e) => `<option value="${e.id}">${e.label}</option>`).join('')}
          </select>
        </div>

        <!-- Title & Description -->
        <h3 class="pillar-dynamic-title" style="margin: 0 0 6px 0; color: #0f172a; font-size: 0.94rem; font-weight: 800; line-height: 1.3;">
          ${defaultEdition.title}
        </h3>
        <p class="pillar-dynamic-desc" style="margin: 0 0 12px 0; font-size: 0.76rem; color: #475569; line-height: 1.45; min-height: 48px;">
          ${defaultEdition.desc}
        </p>

        <!-- Key Pedagogical Tags -->
        <div class="pillar-feature-tags" style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 14px;">
          ${(pillar.tags || [])
            .map(
              (t) => `
            <span style="font-size: 0.66rem; font-weight: 700; background: #f1f5f9; color: #475569; padding: 2px 7px; border-radius: 4px;">
              <i class="fa-solid fa-check" style="color: ${pillar.color}; margin-right: 3px;"></i>${t}
            </span>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Strictly 2 Primary Actions -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: auto; padding-top: 12px; border-top: 1px solid #f1f5f9;">
        <button type="button" class="pillar-btn-read" onclick="window.openInPagePreview('${defaultEdition.readUrl}', '${cleanTitle}', '${defaultEdition.pdfUrl}', { badge: '${pillar.badge}' })" style="background: #ffffff; color: #0f172a; border: 1.5px solid #cbd5e1; border-left: 3.5px solid ${pillar.color}; padding: 8px 10px; border-radius: 6px; font-size: 0.78rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.15s ease;" onmouseover="this.style.borderColor='${pillar.color}'; this.style.boxShadow='0 2px 6px rgba(0,0,0,0.06)';" onmouseout="this.style.borderColor='#cbd5e1'; this.style.borderLeftColor='${pillar.color}'; this.style.boxShadow='none';">
          <i class="fa-solid fa-book-open-reader" style="color: ${pillar.color};"></i> Read Online
        </button>
        <a href="${defaultEdition.pdfUrl}" target="_blank" class="pillar-btn-pdf" title="Open ${cleanTitle} PDF in new tab" style="background: ${pillar.color}; color: #ffffff; border: 1.5px solid ${pillar.color}; padding: 8px 10px; border-radius: 6px; font-size: 0.78rem; font-weight: 800; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.15s ease; box-shadow: 0 2px 6px ${pillar.color}40;" onmouseover="this.style.opacity='0.92';" onmouseout="this.style.opacity='1';">
          <i class="fa-solid fa-file-pdf"></i> Download PDF
        </a>
      </div>
    </div>
  `;
}

/**
 * Main Workbooks Zone Entry Point
 */
export function renderWorkbooksZone(container, unitData) {
  unitData = unitData || state.activeUnitData || {};
  const activeUnitId = state.selectedUnitId || window.currentUnitId;

  // Ultra-clean top bar: Institutional neutrality & zero visual alarm
  let html = `
    <div style="background: #0f172a; padding: 8px 16px; border-radius: 8px; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
      <div style="display: flex; align-items: center; gap: 10px;">
        <i class="fa-solid fa-book-bookmark" style="color: #38bdf8; font-size: 1.1rem;"></i>
        <div>
          <span style="color: #ffffff; font-size: 0.98rem; font-weight: 800; letter-spacing: -0.01em;">Print &amp; PDF Hub</span>
          <span style="display: inline-block; width: 1px; height: 12px; background: rgba(255,255,255,0.25); margin: 0 6px; vertical-align: middle;"></span>
          <span style="color: #94a3b8; font-size: 0.76rem; font-weight: 500;">Master Textbooks, Pupil Workbooks &amp; Retrieval Companions</span>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 0.72rem; color: #94a3b8; font-weight: 600;">
          <i class="fa-solid fa-circle-check" style="color: #10b981; margin-right: 4px;"></i>Publisher-Grade Formats
        </span>
        <button id="btnOpenEmergencyCover" type="button" style="background: rgba(255,255,255,0.08); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.18); border-radius: 5px; padding: 4px 10px; font-size: 0.72rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s ease;" title="Generate quick emergency replacement covers">
          <i class="fa-solid fa-file-shield" style="color: #38bdf8;"></i>
          <span>Cover Customizer</span>
        </button>
      </div>
    </div>

    <!-- Specification Unit Switcher Tabs -->
    <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; padding: 6px 10px; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px;">
      <button type="button" onclick="window.switchView('booklet', 'all')" style="background: ${!activeUnitId || activeUnitId === 'all' ? '#0f172a' : '#ffffff'}; color: ${!activeUnitId || activeUnitId === 'all' ? '#ffffff' : '#334155'}; border: 1px solid ${!activeUnitId || activeUnitId === 'all' ? '#0f172a' : '#cbd5e1'}; font-size: 0.74rem; font-weight: 700; padding: 4px 10px; border-radius: 5px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; transition: all 0.15s ease;">
        <i class="fa-solid fa-layer-group"></i> All Units Directory
      </button>

      <span style="font-size: 0.68rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 4px;">GCSE:</span>
      
      <button type="button" onclick="window.switchView('booklet', 'edexcel_medicine')" style="background: ${activeUnitId === 'edexcel_medicine' ? '#0f766e' : '#ffffff'}; color: ${activeUnitId === 'edexcel_medicine' ? '#ffffff' : '#0f766e'}; border: 1px solid ${activeUnitId === 'edexcel_medicine' ? '#0f766e' : '#99f6e4'}; font-size: 0.72rem; font-weight: 700; padding: 4px 8px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.15s ease; box-shadow: ${activeUnitId === 'edexcel_medicine' ? '0 1px 3px rgba(15,118,110,0.25)' : 'none'};">
        <i class="fa-solid fa-notes-medical"></i> Medicine (P1)
      </button>

      <button type="button" onclick="window.switchView('booklet', 'cme_new')" style="background: ${activeUnitId === 'cme_new' ? '#0284c7' : '#ffffff'}; color: ${activeUnitId === 'cme_new' ? '#ffffff' : '#0369a1'}; border: 1px solid ${activeUnitId === 'cme_new' ? '#0284c7' : '#bae6fd'}; font-size: 0.72rem; font-weight: 700; padding: 4px 8px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.15s ease; box-shadow: ${activeUnitId === 'cme_new' ? '0 1px 3px rgba(2,132,199,0.25)' : 'none'};">
        <i class="fa-solid fa-dove"></i> Middle East (P2)
      </button>

      <button type="button" onclick="window.switchView('booklet', 'eee')" style="background: ${activeUnitId === 'eee' ? '#b45309' : '#ffffff'}; color: ${activeUnitId === 'eee' ? '#ffffff' : '#b45309'}; border: 1px solid ${activeUnitId === 'eee' ? '#b45309' : '#fde68a'}; font-size: 0.72rem; font-weight: 700; padding: 4px 8px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.15s ease; box-shadow: ${activeUnitId === 'eee' ? '0 1px 3px rgba(180,83,9,0.25)' : 'none'};">
        <i class="fa-solid fa-crown"></i> Elizabethan (P2)
      </button>

      <button type="button" onclick="window.switchView('booklet', 'weimar_nazi_germany')" style="background: ${activeUnitId === 'weimar_nazi_germany' ? '#7f1d1d' : '#ffffff'}; color: ${activeUnitId === 'weimar_nazi_germany' ? '#ffffff' : '#991b1b'}; border: 1px solid ${activeUnitId === 'weimar_nazi_germany' ? '#7f1d1d' : '#fecaca'}; font-size: 0.72rem; font-weight: 700; padding: 4px 8px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.15s ease; box-shadow: ${activeUnitId === 'weimar_nazi_germany' ? '0 1px 3px rgba(127,29,29,0.25)' : 'none'};">
        <i class="fa-solid fa-landmark"></i> Weimar (P3)
      </button>

      <button type="button" onclick="window.switchView('booklet', 'usa')" style="background: ${activeUnitId === 'usa' ? '#1e40af' : '#ffffff'}; color: ${activeUnitId === 'usa' ? '#ffffff' : '#1e40af'}; border: 1px solid ${activeUnitId === 'usa' ? '#1e40af' : '#bfdbfe'}; font-size: 0.72rem; font-weight: 700; padding: 4px 8px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.15s ease; box-shadow: ${activeUnitId === 'usa' ? '0 1px 3px rgba(30,64,175,0.25)' : 'none'};">
        <i class="fa-solid fa-flag-usa"></i> USA 1954–75 (P3)
      </button>

      <span style="font-size: 0.68rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 4px;">KS3:</span>

      <button type="button" onclick="window.switchView('booklet', 'water_and_sanitation')" style="background: ${activeUnitId === 'water_and_sanitation' ? '#0369a1' : '#ffffff'}; color: ${activeUnitId === 'water_and_sanitation' ? '#ffffff' : '#0369a1'}; border: 1px solid ${activeUnitId === 'water_and_sanitation' ? '#0369a1' : '#bae6fd'}; font-size: 0.72rem; font-weight: 700; padding: 4px 8px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.15s ease;">
        <i class="fa-solid fa-faucet-drip"></i> Water (Y7)
      </button>

      <button type="button" onclick="window.switchView('booklet', 'medieval_england')" style="background: ${activeUnitId === 'medieval_england' ? '#7c2d12' : '#ffffff'}; color: ${activeUnitId === 'medieval_england' ? '#ffffff' : '#7c2d12'}; border: 1px solid ${activeUnitId === 'medieval_england' ? '#7c2d12' : '#fed7aa'}; font-size: 0.72rem; font-weight: 700; padding: 4px 8px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.15s ease;">
        <i class="fa-solid fa-chess-rook"></i> Medieval (Y7)
      </button>

      <button type="button" onclick="window.switchView('booklet', 'early_modern_world')" style="background: ${activeUnitId === 'early_modern_world' ? '#047857' : '#ffffff'}; color: ${activeUnitId === 'early_modern_world' ? '#ffffff' : '#047857'}; border: 1px solid ${activeUnitId === 'early_modern_world' ? '#047857' : '#a7f3d0'}; font-size: 0.72rem; font-weight: 700; padding: 4px 8px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.15s ease;">
        <i class="fa-solid fa-compass"></i> Early Modern (Y8)
      </button>

      <button type="button" onclick="window.switchView('booklet', 'industrialisation_and_empire')" style="background: ${activeUnitId === 'industrialisation_and_empire' ? '#475569' : '#ffffff'}; color: ${activeUnitId === 'industrialisation_and_empire' ? '#ffffff' : '#475569'}; border: 1px solid ${activeUnitId === 'industrialisation_and_empire' ? '#475569' : '#cbd5e1'}; font-size: 0.72rem; font-weight: 700; padding: 4px 8px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.15s ease;">
        <i class="fa-solid fa-industry"></i> Industry (Y8)
      </button>

      <button type="button" onclick="window.switchView('booklet', 'great_war')" style="background: ${activeUnitId === 'great_war' ? '#4338ca' : '#ffffff'}; color: ${activeUnitId === 'great_war' ? '#ffffff' : '#4338ca'}; border: 1px solid ${activeUnitId === 'great_war' ? '#4338ca' : '#c7d2fe'}; font-size: 0.72rem; font-weight: 700; padding: 4px 8px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.15s ease; box-shadow: ${activeUnitId === 'great_war' ? '0 1px 3px rgba(67,56,202,0.25)' : 'none'};">
        <i class="fa-solid fa-shield-halved"></i> Great War (Y9)
      </button>
    </div>
  `;

  // Check if unit is in catalog or is generic KS3
  const isAllUnits = !activeUnitId || activeUnitId === 'all';
  const unitPubs = isAllUnits
    ? null
    : UNIT_PUBLICATIONS[activeUnitId] || getGenericUnitPublications(activeUnitId, unitData);

  if (unitPubs) {
    window.currentGenericUnitPublications = unitPubs;

    // Render the 3 Master Books Grid
    html += `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; margin-bottom: 12px;">
        ${renderMasterPillarCard(activeUnitId, unitPubs.pillar1)}
        ${renderMasterPillarCard(activeUnitId, unitPubs.pillar2)}
        ${renderMasterPillarCard(activeUnitId, unitPubs.pillar3)}
      </div>
    `;

    // Specialized Great War Teacher Packs toolbar
    if (activeUnitId === 'great_war') {
      html += `
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 12px;">
          <span style="font-size: 0.74rem; font-weight: 800; color: #475569; text-transform: uppercase;">
            <i class="fa-solid fa-paperclip" style="color: #0284c7; margin-right: 4px;"></i>Specialized Great War Teacher &amp; Revision Packs:
          </span>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <a href="/pdfs/great_war_guided_reading_workbook_FINAL_V17.pdf" target="_blank" title="Open Guided Reading Workbook PDF in new tab" style="background: #ffffff; color: #0284c7; border: 1px solid #bae6fd; padding: 5px 10px; border-radius: 4px; font-size: 0.72rem; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 5px;">
              <i class="fa-solid fa-file-pdf"></i> Guided Reading (PDF)
            </a>
            <a href="/pdfs/great_war_answer_key_FINAL_V17.pdf" target="_blank" title="Open Teacher Answer Key PDF in new tab" style="background: #ffffff; color: #16a34a; border: 1px solid #bbf7d0; padding: 5px 10px; border-radius: 4px; font-size: 0.72rem; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 5px;">
              <i class="fa-solid fa-file-pdf"></i> Teacher Answer Key (PDF)
            </a>
            <a href="/pdfs/great_war_cheat_sheet_FINAL_V17.pdf" target="_blank" title="Open Revision Cheat Sheet PDF in new tab" style="background: #ffffff; color: #d97706; border: 1px solid #fde68a; padding: 5px 10px; border-radius: 4px; font-size: 0.72rem; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 5px;">
              <i class="fa-solid fa-file-pdf"></i> Revision Cheat Sheet (PDF)
            </a>
          </div>
        </div>
      `;
    }

    // Dedicated Cross-Reference to GCSE Exam Practice Hub (declutters this page completely)
    const isGcseUnit = [
      'cme_new',
      'usa',
      'edexcel_medicine',
      'eee',
      'weimar_nazi_germany',
    ].includes(activeUnitId);
    if (isGcseUnit) {
      html += `
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 8px; padding: 12px 18px; margin-top: 10px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; border: 1px solid #334155; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 36px; height: 36px; border-radius: 6px; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); display: flex; align-items: center; justify-content: center; color: #38bdf8; font-size: 1.05rem;">
              <i class="fa-solid fa-file-signature"></i>
            </div>
            <div>
              <div style="color: #ffffff; font-size: 0.90rem; font-weight: 800;">Looking for Timed GCSE Mock Papers &amp; Mark Schemes?</div>
              <div style="color: #94a3b8; font-size: 0.74rem;">Full authentic Edexcel examination papers, student answer booklets, and examiner mark schemes are organized in the Exam Practice Hub.</div>
            </div>
          </div>
          <button type="button" onclick="window.switchView('mock-exams', '${activeUnitId}')" style="background: #2563eb; color: #ffffff; border: none; font-weight: 700; font-size: 0.78rem; padding: 8px 16px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all 0.15s ease;" onmouseover="this.style.background='#1d4ed8';" onmouseout="this.style.background='#2563eb';">
            <span>Open GCSE Exam Practice Hub</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      `;
    }

    // In-page preview console docked below
    html += renderInPagePreviewConsole();
  }
  // Directory of all units (when "All Units Directory" is selected)
  else {
    const gcseUnits = [
      {
        id: 'edexcel_medicine',
        name: 'Medicine in Britain & Western Front',
        spec: 'Paper 1 • Option 11',
        icon: 'fa-notes-medical',
        color: '#0f766e',
      },
      {
        id: 'cme_new',
        name: 'Conflict in the Middle East (1945–95)',
        spec: 'Paper 2 • Option P5',
        icon: 'fa-dove',
        color: '#0284c7',
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
      {
        id: 'usa',
        name: 'USA: Conflict at Home & Abroad (1954–75)',
        spec: 'Paper 3 • Option 33',
        icon: 'fa-flag-usa',
        color: '#1e40af',
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
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
        <!-- GCSE Column -->
        <div style="background: #ffffff; border: 1.5px solid #000000; border-radius: 8px; padding: 14px 16px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1.5px solid #000000;">
            <span style="font-size: 0.78rem; font-weight: 900; text-transform: uppercase; color: #000000;">
              <i class="fa-solid fa-graduation-cap"></i> Edexcel GCSE History Master Suites (Years 10–11)
            </span>
            <span style="font-size: 0.68rem; font-weight: 800; background: #000000; color: #ffffff; padding: 2px 6px; border-radius: 2px;">5 Units</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${gcseUnits
              .map(
                (u) => `
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3.5px solid ${u.color}; border-radius: 6px; padding: 8px 12px; display: flex; align-items: center; justify-content: space-between; transition: all 0.15s ease;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <i class="fa-solid ${u.icon}" style="color: ${u.color}; font-size: 0.95rem;"></i>
                  <div>
                    <strong style="color: #0f172a; font-size: 0.82rem; display: block; line-height: 1.2;">${u.name}</strong>
                    <span style="color: #64748b; font-size: 0.70rem;">${u.spec}</span>
                  </div>
                </div>
                <button type="button" onclick="window.switchView('booklet', '${u.id}')" style="background: #0f172a; color: #ffffff; border: none; padding: 5px 10px; border-radius: 4px; font-size: 0.72rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 5px;">
                  <span>Open 3 Pillars</span>
                  <i class="fa-solid fa-arrow-right" style="font-size: 0.65rem;"></i>
                </button>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>

        <!-- KS3 Column -->
        <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px 16px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #e2e8f0;">
            <span style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; color: #1e293b;">
              <i class="fa-solid fa-book-bookmark"></i> Key Stage 3 Curriculum Units (Years 7–9)
            </span>
            <span style="font-size: 0.68rem; font-weight: 700; background: #e2e8f0; color: #334155; padding: 2px 6px; border-radius: 2px;">10 Units</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            ${ks3Units
              .map(
                (u) => `
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 10px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; transition: all 0.15s ease;" onclick="window.switchView('booklet', '${u.id}')" onmouseover="this.style.background='#ffffff'; this.style.borderColor='#0284c7';" onmouseout="this.style.background='#f8fafc'; this.style.borderColor='#e2e8f0';">
                <div style="display: flex; align-items: center; gap: 8px; overflow: hidden;">
                  <i class="fa-solid ${u.icon}" style="color: #64748b; font-size: 0.85rem; flex-shrink: 0;"></i>
                  <div style="overflow: hidden;">
                    <div style="color: #0f172a; font-size: 0.74rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${u.name}</div>
                    <span style="color: #94a3b8; font-size: 0.66rem;">${u.year}</span>
                  </div>
                </div>
                <i class="fa-solid fa-angle-right" style="color: #94a3b8; font-size: 0.72rem; margin-left: 4px;"></i>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>
      </div>
    `;
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
