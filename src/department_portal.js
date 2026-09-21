/**
 * Department Portal & Disciplinary Operations Command Center
 * The History Revision Hub
 *
 * Houses:
 * 1. Masterplan & Unit Health Tracker Table (Visual Green/Amber/Red status)
 * 2. History Revision Hub Field Manuals (Searchable SOPs with direct PDF links)
 * 3. Pedagogical Research & Evidence Hub (Counsell, Quigley, TWR, Sweller/SEND with external links)
 * 4. Curriculum Sequences & Disciplinary Skills Progression Matrix
 * 5. Department Policies & SOWs (Marking, Feedback, Fieldwork)
 */

import { switchView } from './navigation.js';
import { DISCIPLINARY_STRANDS, YEAR_GROUPS_PROGRESSION } from './disciplinary_skills_data.js';
import { PEDAGOGY_RESEARCH_BANK } from './pedagogy_data.js';

let activePortalTab = 'tracker';
let guidanceSearchQuery = '';
let pedagogyCategoryFilter = 'all';
let pedagogySearchQuery = '';

const FIELD_MANUALS = [
  {
    id: 'guide_01',
    num: '01',
    title: 'The Tripartite Curriculum Model',
    subtitle: 'Architecture & Separation of Concerns: Textbooks, Workbooks & The Digital App',
    category: 'Curriculum Architecture',
    badgeClass: 'badge-blue',
    summary:
      'Explains the fundamental separation between the permanent classroom textbook (timeless reading), the 16-page consumable workbook (student writing), and the digital app. Details how state separation eliminated the September question numbering desynchronization crisis.',
    pdfUrl: '/history_revision_hub_guidance/Guide_01_The_Tripartite_Curriculum_Model.pdf',
    htmlUrl: '/history_revision_hub_guidance/Guide_01_The_Tripartite_Curriculum_Model.html',
    keyPoints: [
      'Textbooks NEVER contain question numbers; indexed strictly by [Act.Paragraph] and Source letters.',
      'Workbooks are the sole consumable location for student handwriting and exam practice (/26 marks).',
      'Digital App synchronizes real-time feedback with canonical workbook question IDs.',
    ],
  },
  {
    id: 'guide_02',
    num: '02',
    title: 'The Master Cover Engine & Commercial Customizer',
    subtitle: 'Standardized Cover Architecture, Specification Grid & Multi-School Branding',
    category: 'Design Systems',
    badgeClass: 'badge-purple',
    summary:
      'Technical and design documentation for renderStandardFrontCover and renderStandardBackCover. Details the 120mm landscape archival hero photo, the Pearson 3-column specification grid, and the commercial school branding customizer pattern.',
    pdfUrl: '/history_revision_hub_guidance/Guide_02_The_Master_Cover_Engine_and_Customizer.pdf',
    htmlUrl: '/history_revision_hub_guidance/Guide_02_The_Master_Cover_Engine_and_Customizer.html',
    keyPoints: [
      'data-department-name="The History Department" guarantees 100% institutional neutrality.',
      'Purchasing schools customize covers seamlessly via browser query params (?school=Name), CLI flags, or CSS.',
      'Back cover features /26 marks enquiry progress ledger, WWW/EBI handwriting lines, and 5 interactive QR codes.',
    ],
  },
  {
    id: 'guide_03',
    num: '03',
    title: 'Reprographics & Print Handbook',
    subtitle: 'Saddle-Stitch Imposition, Gutter Margins & Duplex Booklet Production',
    category: 'Print Production',
    badgeClass: 'badge-emerald',
    summary:
      'Essential operating instructions for school reprographics and print room technicians. Explains 10mm inner gutter margins, 2-up A3-to-A4 landscape folding, double spine stapling, and recommended paper stock weights to avoid highlighter bleed-through.',
    pdfUrl: '/history_revision_hub_guidance/Guide_03_Reprographics_and_Print_Handbook.pdf',
    htmlUrl: '/history_revision_hub_guidance/Guide_03_Reprographics_and_Print_Handbook.html',
    keyPoints: [
      'Original size A4 Portrait printed 2-Up on A3 Landscape (Flip on Short Edge).',
      'Rigid 16-page budget ensures 4 physical folded sheets with zero blank waste pages.',
      '120gsm silk cardstock for cover; 80–90gsm uncoated for inside writing pages.',
    ],
  },
  {
    id: 'guide_04',
    num: '04',
    title: 'Disciplinary Pedagogy & Research Evidence',
    subtitle: 'Theoretical Foundations: Counsell, Quigley, The Writing Revolution & Cognitive Load',
    category: 'Evidence-Informed Pedagogy',
    badgeClass: 'badge-amber',
    summary:
      'The theoretical research compendium grounding the platform. Synthesizes Christine Counsell’s disciplinary enquiry, Alex Quigley’s vocabulary tiers and Golden Sentences, Judith Hochman’s Writing Revolution sentence scaffolds, and John Sweller’s Cognitive Load Theory for SEND accessibility.',
    pdfUrl:
      '/history_revision_hub_guidance/Guide_04_Disciplinary_Pedagogy_and_Research_Evidence.pdf',
    htmlUrl:
      '/history_revision_hub_guidance/Guide_04_Disciplinary_Pedagogy_and_Research_Evidence.html',
    keyPoints: [
      'Christine Counsell 4-act enquiry narrative with fingertip vs. residual knowledge calibration.',
      'Alex Quigley Tier-2/3 explicit vocabulary instruction, Golden Sentences, and Odd-One-Out clustering.',
      'The Writing Revolution (TWR) sentence-level causal connectives (Because / But / So).',
      'Cognitive Load Theory: 2-column measure (50–65 chars) & margin line numbering to eliminate eye-sweep fatigue.',
    ],
  },
];

const UNIT_HEALTH_DATA = [
  {
    year: 'Year 7',
    ks: 'KS3',
    uid: 'water_and_sanitation',
    name: 'Water & Sanitation Through Time',
    workbookStatus: 'optimal',
    workbookText: '✅ V17 Optimal (99% Budget)',
    textbookStatus: 'optimal',
    textbookText: '✅ 2-Col Reading Anthology',
    appStatus: 'synced',
    appText: '✅ 100% Synced (6 L)',
    mapStatus: 'embedded',
    mapText: '✅ Broad Street & Roman Maps',
    workbookPdf: '/pdfs/water_and_sanitation_pupil_workbook_FINAL_V17.pdf',
    textbookPdf: '/pdfs/water_and_sanitation_textbook_FINAL_V17.pdf',
  },
  {
    year: 'Year 7',
    ks: 'KS3',
    uid: 'medieval_england',
    name: 'Medieval England (1066–1485)',
    workbookStatus: 'optimal',
    workbookText: '✅ V17 Optimal (99% Budget)',
    textbookStatus: 'optimal',
    textbookText: '✅ 2-Col Reading Anthology',
    appStatus: 'synced',
    appText: '✅ 100% Synced (9 L)',
    mapStatus: 'embedded',
    mapText: '✅ Battle of Hastings & Castles',
    workbookPdf: '/pdfs/medieval_england_pupil_workbook_FINAL_V17.pdf',
    textbookPdf: '/pdfs/medieval_england_textbook_FINAL_V17.pdf',
  },
  {
    year: 'Year 8',
    ks: 'KS3',
    uid: 'early_modern_world',
    name: 'Early Modern World (1450–1750)',
    workbookStatus: 'optimal',
    workbookText: '✅ V17 Optimal (99% Budget)',
    textbookStatus: 'optimal',
    textbookText: '✅ 2-Col Reading Anthology',
    appStatus: 'synced',
    appText: '✅ 100% Synced (9 L)',
    mapStatus: 'embedded',
    mapText: '✅ Global Trade & Exploration',
    workbookPdf: '/pdfs/early_modern_world_pupil_workbook_FINAL_V17.pdf',
    textbookPdf: '/pdfs/early_modern_world_textbook_FINAL_V17.pdf',
  },
  {
    year: 'Year 8',
    ks: 'KS3',
    uid: 'industrialisation_and_empire',
    name: 'Industrialisation & Empire (1750–1900)',
    workbookStatus: 'optimal',
    workbookText: '✅ V17 Optimal (99% Budget)',
    textbookStatus: 'optimal',
    textbookText: '✅ 2-Col Reading Anthology',
    appStatus: 'synced',
    appText: '✅ 100% Synced (8 L)',
    mapStatus: 'embedded',
    mapText: '✅ British Empire & Canal Network',
    workbookPdf: '/pdfs/industrialisation_and_empire_pupil_workbook_FINAL_V17.pdf',
    textbookPdf: '/pdfs/industrialisation_and_empire_textbook_FINAL_V17.pdf',
  },
  {
    year: 'Year 8',
    ks: 'KS3',
    uid: 'australia',
    name: 'History of Australia (Colonial & Modern)',
    workbookStatus: 'optimal',
    workbookText: '✅ V17 Optimal (99% Budget)',
    textbookStatus: 'legacy',
    textbookText: '⚠️ Legacy Continuous Flow',
    appStatus: 'synced',
    appText: '✅ 100% Synced (5 L)',
    mapStatus: 'embedded',
    mapText: '✅ First Fleet & Indigenous Territories',
    workbookPdf: '/units/australia/workbook.html',
    textbookPdf: '/units/australia/textbook.html',
  },
  {
    year: 'Year 9',
    ks: 'KS3',
    uid: 'great_war',
    name: 'The Great War 1914–1918 (Part 1)',
    workbookStatus: 'optimal',
    workbookText: '✅ V17 Optimal (99% Budget)',
    textbookStatus: 'optimal',
    textbookText: '✅ 2-Col Reading Anthology',
    appStatus: 'synced',
    appText: '✅ 100% Synced (6 L)',
    mapStatus: 'embedded',
    mapText: '✅ Western Front & Schlieffen Plan',
    workbookPdf: '/pdfs/great_war_workbook.pdf',
    textbookPdf: '/units/great_war/textbook.html',
  },
  {
    year: 'Year 9',
    ks: 'KS3',
    uid: 'great_war_part2',
    name: 'The Great War 1914–1918 (Part 2: Somme & Armistice)',
    workbookStatus: 'optimal',
    workbookText: '✅ V17 Optimal (99% Budget)',
    textbookStatus: 'optimal',
    textbookText: '✅ 2-Col Reading Anthology',
    appStatus: 'synced',
    appText: '✅ 100% Synced (7 L)',
    mapStatus: 'embedded',
    mapText: '✅ Somme & Ypres Battlegrounds',
    workbookPdf: '/units/great_war_part2/workbook.html',
    textbookPdf: '/units/great_war_part2/textbook.html',
  },
  {
    year: 'Year 9',
    ks: 'KS3',
    uid: 'the_shoah',
    name: 'The Shoah (Holocaust Education)',
    workbookStatus: 'optimal',
    workbookText: '✅ V17 Optimal (99% Budget)',
    textbookStatus: 'legacy',
    textbookText: '⚠️ Legacy Continuous Flow',
    appStatus: 'synced',
    appText: '✅ 100% Synced (7 L)',
    mapStatus: 'embedded',
    mapText: '✅ Camp Network & Resistance',
    workbookPdf: '/pdfs/the_shoah_pupil_workbook_FINAL_V17.pdf',
    textbookPdf: '/pdfs/the_shoah_textbook_FINAL_V17.pdf',
  },
  {
    year: 'Year 9',
    ks: 'KS3',
    uid: 'post_war_britain',
    name: 'Post-War Britain (1945–1990s)',
    workbookStatus: 'optimal',
    workbookText: '✅ V17 Optimal (99% Budget)',
    textbookStatus: 'legacy',
    textbookText: '⚠️ Legacy Continuous Flow',
    appStatus: 'synced',
    appText: '✅ 100% Synced (6 L)',
    mapStatus: 'embedded',
    mapText: '✅ Windrush Routes & NHS Districts',
    workbookPdf: '/pdfs/post_war_britain_pupil_workbook_FINAL_V17.pdf',
    textbookPdf: '/pdfs/post_war_britain_textbook_FINAL_V17.pdf',
  },
  {
    year: 'Year 9',
    ks: 'KS3',
    uid: 'cold_war',
    name: 'Superpower Relations & The Cold War',
    workbookStatus: 'optimal',
    workbookText: '✅ V17 Optimal (99% Budget)',
    textbookStatus: 'legacy',
    textbookText: '⚠️ Legacy Continuous Flow',
    appStatus: 'synced',
    appText: '✅ 100% Synced (7 L)',
    mapStatus: 'embedded',
    mapText: '✅ Divided Berlin & NATO/Warsaw',
    workbookPdf: '/units/cold_war/workbook.html',
    textbookPdf: '/units/cold_war/textbook.html',
  },
  {
    year: 'Year 10',
    ks: 'GCSE Paper 2',
    uid: 'cme_new',
    name: 'Conflict in the Middle East (1945–1995)',
    workbookStatus: 'optimal',
    workbookText: '✅ V17 Master Covers & Atlas (KT1–3)',
    textbookStatus: 'optimal',
    textbookText: '✅ Publisher Textbooks (KT1–3)',
    appStatus: 'synced',
    appText: '✅ 100% Synced (12 L)',
    mapStatus: 'optimal',
    mapText: '✅ 1949 Line, Suez, 1967, 1973, Oslo',
    workbookPdf: '/pdfs/cme_new_pupil_workbook_KT1_FINAL_V17.pdf',
    textbookPdf: '/pdfs/cme_new_textbook_KT1_PUBLISHER.pdf',
  },
  {
    year: 'Year 10',
    ks: 'GCSE Paper 3',
    uid: 'weimar_nazi_germany',
    name: 'Weimar & Nazi Germany (1918–1939)',
    workbookStatus: 'optimal',
    workbookText: '✅ V17 Optimal (16 L, KT1–4)',
    textbookStatus: 'legacy',
    textbookText: '⚠️ Legacy Continuous Flow',
    appStatus: 'synced',
    appText: '✅ 100% Synced (16 L)',
    mapStatus: 'embedded',
    mapText: '✅ Weimar Territory & Plebiscites',
    workbookPdf: '/pdfs/weimar_nazi_germany_pupil_workbook_KT1_FINAL_V17.pdf',
    textbookPdf: '/pdfs/weimar_nazi_germany_textbook_KT1_FINAL_V17.pdf',
  },
  {
    year: 'Year 11',
    ks: 'GCSE Paper 2',
    uid: 'eee',
    name: 'Early Elizabethan England (1558–1588)',
    workbookStatus: 'optimal',
    workbookText: '✅ V17 Optimal (KT1–3)',
    textbookStatus: 'legacy',
    textbookText: '⚠️ Legacy Continuous Flow',
    appStatus: 'synced',
    appText: '✅ 100% Synced (12 L)',
    mapStatus: 'embedded',
    mapText: '✅ Armada Route & Drake Circumnavigation',
    workbookPdf: '/units/eee/workbook_KT1.html',
    textbookPdf: '/units/eee/textbook_KT1.html',
  },
  {
    year: 'Year 11',
    ks: 'GCSE Paper 1',
    uid: 'edexcel_medicine',
    name: 'Medicine in Britain (c1250–present) & Western Front',
    workbookStatus: 'optimal',
    workbookText: '✅ V17 Optimal (26 L, Medieval to Modern)',
    textbookStatus: 'legacy',
    textbookText: '⚠️ Legacy Continuous Flow',
    appStatus: 'synced',
    appText: '✅ 100% Synced (26 L)',
    mapStatus: 'embedded',
    mapText: '✅ Western Front Casualty Evacuation',
    workbookPdf: '/units/edexcel_medicine/workbook_medieval.html',
    textbookPdf: '/units/edexcel_medicine/textbook_medieval.html',
  },
  {
    year: 'Year 11',
    ks: 'GCSE Paper 3',
    uid: 'usa',
    name: 'USA: Conflict at Home & Abroad (1954–1975)',
    workbookStatus: 'optimal',
    workbookText: '✅ V17 Optimal (KT1–4)',
    textbookStatus: 'legacy',
    textbookText: '⚠️ Legacy Continuous Flow',
    appStatus: 'synced',
    appText: '✅ 100% Synced (16 L)',
    mapStatus: 'embedded',
    mapText: '✅ Civil Rights Marches & Vietnam War',
    workbookPdf: '/pdfs/usa_pupil_workbook_KT1_FINAL_V17.pdf',
    textbookPdf: '/pdfs/usa_textbook_KT1_FINAL_V17.pdf',
  },
];

export async function renderDepartmentPortal(targetTab = 'tracker') {
  activePortalTab = targetTab;
  const container = document.getElementById('main-content');
  if (!container) return;

  container.innerHTML = `
    <div class="department-portal-wrapper" style="padding: 24px 32px; max-width: 1400px; margin: 0 auto;">
      
      <!-- Top Command Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; border-bottom: 2px solid var(--border-color, #e2e8f0); padding-bottom: 18px;">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(30, 58, 138, 0.08); border: 1px solid rgba(30, 58, 138, 0.25); color: #1e3a8a; padding: 4px 12px; border-radius: 20px; font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">
            <i class="fa-solid fa-landmark"></i> Department Command Center
          </div>
          <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 2.1rem; color: var(--text-primary, #0f172a); margin: 0 0 6px 0; font-weight: 800;">
            Department Portal &amp; Disciplinary Field Manual
          </h1>
          <p style="margin: 0; color: var(--text-muted, #64748b); font-size: 0.95rem; line-height: 1.5;">
            Operational masterplans, curriculum health monitoring, research-informed pedagogy, and print publication standards.
          </p>
        </div>

        <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
          <a href="/history_revision_hub_guidance/Guide_01_The_Tripartite_Curriculum_Model.pdf" target="_blank" class="btn btn-outline-primary" style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 8px; font-size: 0.85rem; font-weight: 700; text-decoration: none; border: 1.5px solid #1e3a8a; color: #1e3a8a; background: #fff;">
            <i class="fa-solid fa-book-open"></i> Tripartite Blueprint
          </a>
          <a href="/history_revision_hub_guidance/Guide_04_Disciplinary_Pedagogy_and_Research_Evidence.pdf" target="_blank" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 8px; font-size: 0.85rem; font-weight: 700; text-decoration: none; background: #1e3a8a; color: #fff; border: 1.5px solid #1e3a8a; box-shadow: 0 2px 6px rgba(30, 58, 138, 0.2);">
            <i class="fa-solid fa-microscope"></i> Pedagogy Evidence (PDF)
          </a>
        </div>
      </div>

      <!-- High-Level KPI Summary Metrics -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 28px;">
        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 18px; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
          <div style="font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px;">
            Total Curriculum Scope
          </div>
          <div style="font-size: 1.85rem; font-weight: 900; color: #0f172a; font-family: 'Inter', sans-serif;">
            14 Units <span style="font-size: 0.95rem; font-weight: 600; color: #1e3a8a;">(Years 7–11)</span>
          </div>
          <div style="font-size: 0.82rem; color: #10b981; margin-top: 4px; font-weight: 700;">
            <i class="fa-solid fa-check-circle"></i> 100% Specification Mapped
          </div>
        </div>

        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 18px; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
          <div style="font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px;">
            Published Enquiries
          </div>
          <div style="font-size: 1.85rem; font-weight: 900; color: #0f172a; font-family: 'Inter', sans-serif;">
            136 Lessons
          </div>
          <div style="font-size: 0.82rem; color: #10b981; margin-top: 4px; font-weight: 700;">
            <i class="fa-solid fa-check-circle"></i> Christine Counsell 4-Act Framework
          </div>
        </div>

        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 18px; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
          <div style="font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px;">
            Dual-Numbering QA Gate
          </div>
          <div style="font-size: 1.85rem; font-weight: 900; color: #0f172a; font-family: 'Inter', sans-serif;">
            732 Questions
          </div>
          <div style="font-size: 0.82rem; color: #10b981; margin-top: 4px; font-weight: 700;">
            <i class="fa-solid fa-check-double"></i> 100% Print-to-App Synchronized
          </div>
        </div>

        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 18px; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
          <div style="font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px;">
            Pre-Commit Quality Shield
          </div>
          <div style="font-size: 1.85rem; font-weight: 900; color: #059669; font-family: 'Inter', sans-serif;">
            0px Overflow
          </div>
          <div style="font-size: 0.82rem; color: #059669; margin-top: 4px; font-weight: 700;">
            <i class="fa-solid fa-shield-halved"></i> 99% Space Budget Enforced
          </div>
        </div>
      </div>

      <!-- Navigation Tabs Bar -->
      <div style="display: flex; gap: 8px; border-bottom: 2px solid #cbd5e1; margin-bottom: 24px; overflow-x: auto; padding-bottom: 2px;">
        <button type="button" class="portal-nav-tab ${activePortalTab === 'tracker' ? 'active' : ''}" onclick="window.switchPortalTab('tracker')">
          <i class="fa-solid fa-chart-line"></i> Masterplan Health Tracker
        </button>
        <button type="button" class="portal-nav-tab ${activePortalTab === 'guidance' ? 'active' : ''}" onclick="window.switchPortalTab('guidance')">
          <i class="fa-solid fa-book-bookmark"></i> Revision Hub Field Manuals
        </button>
        <button type="button" class="portal-nav-tab ${activePortalTab === 'pedagogy' ? 'active' : ''}" onclick="window.switchPortalTab('pedagogy')">
          <i class="fa-solid fa-microscope"></i> Pedagogical Research Hub
        </button>
        <button type="button" class="portal-nav-tab ${activePortalTab === 'curriculum' ? 'active' : ''}" onclick="window.switchPortalTab('curriculum')">
          <i class="fa-solid fa-map-location-dot"></i> Curriculum &amp; SOWs
        </button>
        <button type="button" class="portal-nav-tab ${activePortalTab === 'policies' ? 'active' : ''}" onclick="window.switchPortalTab('policies')">
          <i class="fa-solid fa-clipboard-check"></i> Department Policies
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="portal-tab-content"></div>
    </div>
  `;

  renderActivePortalTab();
}

function renderActivePortalTab() {
  const contentEl = document.getElementById('portal-tab-content');
  if (!contentEl) return;

  if (activePortalTab === 'tracker') {
    renderTrackerTab(contentEl);
  } else if (activePortalTab === 'guidance') {
    renderGuidanceTab(contentEl);
  } else if (activePortalTab === 'pedagogy') {
    renderPedagogyTab(contentEl);
  } else if (activePortalTab === 'curriculum') {
    renderCurriculumTab(contentEl);
  } else if (activePortalTab === 'policies') {
    renderPoliciesTab(contentEl);
  }
}

// -------------------------------------------------------------
// TAB 1: MASTERPLAN HEALTH TRACKER TABLE
// -------------------------------------------------------------
function renderTrackerTab(container) {
  container.innerHTML = `
    <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
      <div style="padding: 18px 24px; background: #f8fafc; border-bottom: 1.5px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <h3 style="margin: 0; font-size: 1.25rem; font-weight: 800; color: #0f172a;">
            Curriculum Unit Architecture &amp; Production Status Tracker
          </h3>
          <p style="margin: 4px 0 0 0; font-size: 0.88rem; color: #64748b;">
            Visual audit across the 14 core units. Green indicates V17 master compliance; amber flags legacy continuous-flow text.
          </p>
        </div>
        <div style="display: flex; gap: 12px; align-items: center;">
          <span style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 700; color: #059669;">
            <span style="width: 10px; height: 10px; border-radius: 50%; background: #10b981;"></span> Optimal / V17
          </span>
          <span style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 700; color: #d97706;">
            <span style="width: 10px; height: 10px; border-radius: 50%; background: #f59e0b;"></span> Legacy / Target
          </span>
          <span style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 700; color: #2563eb;">
            <span style="width: 10px; height: 10px; border-radius: 50%; background: #3b82f6;"></span> Active Priority
          </span>
        </div>
      </div>

      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.88rem;">
          <thead>
            <tr style="background: #0f172a; color: #ffffff; text-transform: uppercase; font-size: 0.72rem; letter-spacing: 0.08em;">
              <th style="padding: 12px 18px; border: none;">Year / Keystage</th>
              <th style="padding: 12px 18px; border: none;">Unit Title</th>
              <th style="padding: 12px 18px; border: none;">16-Page Pupil Workbook</th>
              <th style="padding: 12px 18px; border: none;">Companion Textbook</th>
              <th style="padding: 12px 18px; border: none;">Digital App Quizzing</th>
              <th style="padding: 12px 18px; border: none;">Cartographic Atlas</th>
              <th style="padding: 12px 18px; border: none; text-align: right;">Quick Actions</th>
            </tr>
          </thead>
          <tbody>
            ${UNIT_HEALTH_DATA.map((u, idx) => {
              const bg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
              return `
                <tr style="background: ${bg}; border-bottom: 1px solid #e2e8f0; transition: background 0.15s ease;" onmouseover="this.style.background='#f1f5f9'" onmouseout="this.style.background='${bg}'">
                  <td style="padding: 14px 18px; font-weight: 700; color: #1e3a8a; white-space: nowrap;">
                    ${u.year} <span style="font-size: 0.75rem; font-weight: 600; color: #64748b; display: block;">${u.ks}</span>
                  </td>
                  <td style="padding: 14px 18px; font-weight: 700; color: #0f172a;">
                    ${u.name}
                  </td>
                  <td style="padding: 14px 18px;">
                    <span style="font-size: 0.8rem; font-weight: 700; color: #065f46; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 4px 8px; border-radius: 6px; display: inline-block;">
                      ${u.workbookText}
                    </span>
                  </td>
                  <td style="padding: 14px 18px;">
                    <span style="font-size: 0.8rem; font-weight: 700; color: ${u.textbookStatus === 'optimal' ? '#065f46' : u.textbookStatus === 'pilot' ? '#1e40af' : '#92400e'}; background: ${u.textbookStatus === 'optimal' ? '#ecfdf5' : u.textbookStatus === 'pilot' ? '#eff6ff' : '#fef3c7'}; border: 1px solid ${u.textbookStatus === 'optimal' ? '#a7f3d0' : u.textbookStatus === 'pilot' ? '#bfdbfe' : '#fde68a'}; padding: 4px 8px; border-radius: 6px; display: inline-block;">
                      ${u.textbookText}
                    </span>
                  </td>
                  <td style="padding: 14px 18px;">
                    <span style="font-size: 0.8rem; font-weight: 700; color: #065f46;">
                      ${u.appText}
                    </span>
                  </td>
                  <td style="padding: 14px 18px; color: #334155; font-size: 0.82rem;">
                    ${u.mapText}
                  </td>
                  <td style="padding: 14px 18px; text-align: right; white-space: nowrap;">
                    <div style="display: inline-flex; gap: 6px;">
                      <a href="${u.workbookPdf}" target="_blank" title="View Workbook" style="padding: 6px 10px; background: #1e3a8a; color: #fff; border-radius: 6px; text-decoration: none; font-size: 0.75rem; font-weight: 700;">
                        <i class="fa-solid fa-book"></i> WB
                      </a>
                      <a href="${u.textbookPdf}" target="_blank" title="View Textbook" style="padding: 6px 10px; background: #475569; color: #fff; border-radius: 6px; text-decoration: none; font-size: 0.75rem; font-weight: 700;">
                        <i class="fa-solid fa-file-lines"></i> TB
                      </a>
                      <button type="button" onclick="window.switchView('lessons', '${u.uid}')" title="Launch Interactive Unit" style="padding: 6px 10px; background: #059669; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 0.75rem; font-weight: 700;">
                        <i class="fa-solid fa-play"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// TAB 2: FIELD MANUALS (WITH SEARCH BAR)
// -------------------------------------------------------------
function renderGuidanceTab(container) {
  const query = guidanceSearchQuery.toLowerCase().trim();
  const filtered = FIELD_MANUALS.filter((m) => {
    return (
      !query ||
      m.title.toLowerCase().includes(query) ||
      m.subtitle.toLowerCase().includes(query) ||
      m.summary.toLowerCase().includes(query) ||
      m.category.toLowerCase().includes(query) ||
      m.keyPoints.some((kp) => kp.toLowerCase().includes(query))
    );
  });

  container.innerHTML = `
    <!-- Search Bar & Filtering Bar -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 14px;">
      <div style="position: relative; flex: 1; max-width: 500px;">
        <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #94a3b8;"></i>
        <input type="text" id="guidance-search-input" value="${guidanceSearchQuery}" placeholder="Search guidance manuals (e.g. 'saddle stitch', 'front covers', 'sync')..." 
               oninput="window.updateGuidanceSearch(this.value)"
               style="width: 100%; padding: 12px 16px 12px 44px; border-radius: 10px; border: 1.5px solid #cbd5e1; font-size: 0.95rem; outline: none; transition: border-color 0.2s;"
               onfocus="this.style.borderColor='#1e3a8a'" onblur="this.style.borderColor='#cbd5e1'">
      </div>
      <div style="font-size: 0.85rem; color: #64748b; font-weight: 600;">
        Showing ${filtered.length} of ${FIELD_MANUALS.length} Standard Operating Procedures
      </div>
    </div>

    <!-- Manual Cards Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 20px;">
      ${filtered
        .map(
          (m) => `
        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 10px rgba(0,0,0,0.03); transition: transform 0.2s ease, box-shadow 0.2s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.08)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.03)';">
          <div style="padding: 22px 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span style="font-family: monospace; font-size: 0.8rem; font-weight: 800; background: #0f172a; color: #fff; padding: 2px 8px; border-radius: 4px;">
                SOP-${m.num}
              </span>
              <span style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #1e3a8a; background: #eff6ff; padding: 2px 8px; border-radius: 12px; border: 1px solid #bfdbfe;">
                ${m.category}
              </span>
            </div>

            <h3 style="margin: 0 0 6px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 1.25rem; font-weight: 700; color: #0f172a; line-height: 1.3;">
              ${m.title}
            </h3>
            <div style="font-size: 0.85rem; font-style: italic; color: #64748b; margin-bottom: 14px;">
              ${m.subtitle}
            </div>
            
            <p style="font-size: 0.88rem; color: #334155; line-height: 1.5; margin-bottom: 16px;">
              ${m.summary}
            </p>

            <div style="background: #f8fafc; border-left: 3px solid #1e3a8a; padding: 10px 14px; border-radius: 0 6px 6px 0; margin-bottom: 10px;">
              <strong style="display: block; font-size: 0.78rem; text-transform: uppercase; color: #1e3a8a; letter-spacing: 0.05em; margin-bottom: 4px;">Key Protocol Elements:</strong>
              <ul style="margin: 0; padding-left: 16px; font-size: 0.82rem; color: #475569; line-height: 1.45;">
                ${m.keyPoints.map((kp) => `<li style="margin-bottom: 3px;">${kp}</li>`).join('')}
              </ul>
            </div>
          </div>

          <div style="padding: 14px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; gap: 10px;">
            <a href="${m.htmlUrl}" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.82rem; font-weight: 700; color: #475569; text-decoration: none; padding: 6px 12px; border-radius: 6px; border: 1px solid #cbd5e1; background: #fff;">
              <i class="fa-solid fa-desktop"></i> Read Web Version
            </a>
            <a href="${m.pdfUrl}" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.82rem; font-weight: 700; color: #ffffff; text-decoration: none; padding: 6px 14px; border-radius: 6px; background: #1e3a8a; box-shadow: 0 2px 6px rgba(30,58,138,0.2);">
              <i class="fa-solid fa-file-pdf"></i> Download PDF
            </a>
          </div>
        </div>
      `,
        )
        .join('')}
    </div>
  `;
}

// -------------------------------------------------------------
// TAB 3: PEDAGOGICAL RESEARCH & EVIDENCE HUB (DYNAMIC RESEARCH BANK)
// -------------------------------------------------------------
function renderPedagogyTab(container) {
  const query = (pedagogySearchQuery || '').toLowerCase().trim();
  const selectedCat = pedagogyCategoryFilter || 'all';

  const categories = [
    { id: 'all', label: 'All Briefings', icon: 'fa-layer-group' },
    { id: 'Disciplinary History', label: 'Disciplinary History', icon: 'fa-landmark' },
    { id: 'Vocabulary & Literacy', label: 'Vocabulary & Literacy', icon: 'fa-spell-check' },
    { id: 'Syntactic Writing', label: 'Syntactic Writing (TWR)', icon: 'fa-pen-nib' },
    { id: 'Cognitive Science', label: 'Cognitive Science', icon: 'fa-brain' },
    { id: 'SEND & Inclusion', label: 'SEND & Inclusion', icon: 'fa-universal-access' },
    { id: 'Retrieval & Instruction', label: 'Retrieval & Rosenshine', icon: 'fa-arrows-rotate' },
    { id: 'Formative Assessment', label: 'Formative Assessment', icon: 'fa-clipboard-check' },
  ];

  const filtered = PEDAGOGY_RESEARCH_BANK.filter((item) => {
    const matchesCat =
      selectedCat === 'all' || item.category.toLowerCase() === selectedCat.toLowerCase();
    if (!matchesCat) return false;

    if (!query) return true;
    return (
      item.title.toLowerCase().includes(query) ||
      item.subtitle.toLowerCase().includes(query) ||
      item.author.toLowerCase().includes(query) ||
      item.affiliation.toLowerCase().includes(query) ||
      (item.overview && item.overview.toLowerCase().includes(query)) ||
      (item.analysisText && item.analysisText.toLowerCase().includes(query)) ||
      (item.evidenceText && item.evidenceText.toLowerCase().includes(query)) ||
      item.implementation.some((imp) => imp.toLowerCase().includes(query)) ||
      item.teacherProtocols.some((p) => p.toLowerCase().includes(query))
    );
  });

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 24px;">
      
      <!-- Top Action & Intro Card -->
      <div style="background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); color: #ffffff; border-radius: 12px; padding: 26px 32px; box-shadow: 0 6px 18px rgba(15,23,42,0.18); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
        <div style="flex: 1; min-width: 320px;">
          <div style="display: inline-block; background: rgba(255,255,255,0.15); color: #93c5fd; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; padding: 3px 10px; border-radius: 20px; margin-bottom: 10px;">
            Evidence-Informed Practice &bull; Teacher Research Hub
          </div>
          <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.85rem; margin: 0 0 8px 0; font-weight: 800; line-height: 1.2;">
            The Pedagogical Research &amp; Disciplinary Evidence Hub
          </h2>
          <p style="margin: 0; max-width: 820px; font-size: 0.95rem; line-height: 1.6; color: #e2e8f0;">
            A pragmatic, growing resource bank synthesizing cognitive science, disciplinary history, explicit literacy, and SEND accessibility. Designed for history departments, instructional coaching, and multi-school collaboration.
          </p>
        </div>
        <div>
          <a href="/history_revision_hub_guidance/Guide_04_Disciplinary_Pedagogy_and_Research_Evidence.pdf" target="_blank" 
             style="display: inline-flex; align-items: center; gap: 10px; padding: 12px 20px; background: #f59e0b; color: #0f172a; text-decoration: none; border-radius: 8px; font-weight: 800; font-size: 0.9rem; box-shadow: 0 4px 12px rgba(245,158,11,0.3); transition: transform 0.15s ease;"
             onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
            <i class="fa-solid fa-file-pdf" style="font-size: 1.1rem;"></i>
            <span>Download Field Manual Guide 04 (PDF)</span>
          </a>
        </div>
      </div>

      <!-- Search & Category Filters Toolbar -->
      <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.02); display: flex; flex-direction: column; gap: 14px;">
        
        <!-- Search Input Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div style="position: relative; flex: 1; max-width: 520px;">
            <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #94a3b8;"></i>
            <input type="text" id="pedagogy-search-input" value="${pedagogySearchQuery}" 
                   placeholder="Search pedagogy (e.g. 'SEND', 'vocabulary', 'smartboard', 'conjunctions', 'Rosenshine')..." 
                   oninput="window.updatePedagogySearch(this.value)"
                   style="width: 100%; padding: 10px 14px 10px 40px; border-radius: 8px; border: 1.5px solid #cbd5e1; font-size: 0.9rem; outline: none; transition: border-color 0.2s;"
                   onfocus="this.style.borderColor='#1e3a8a'" onblur="this.style.borderColor='#cbd5e1'">
          </div>
          <div style="font-size: 0.85rem; color: #64748b; font-weight: 600;">
            Showing <strong>${filtered.length}</strong> of <strong>${PEDAGOGY_RESEARCH_BANK.length}</strong> evidence briefings
          </div>
        </div>

        <!-- Filter Pills Bar -->
        <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
          <span style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; color: #64748b; margin-right: 4px;">
            Filter Strand:
          </span>
          ${categories
            .map((cat) => {
              const isActive = selectedCat === cat.id;
              return `
              <button type="button" onclick="window.setPedagogyCategoryFilter('${cat.id}')"
                      style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; cursor: pointer; border: 1.5px solid ${isActive ? '#1e3a8a' : '#e2e8f0'}; background: ${isActive ? '#eff6ff' : '#ffffff'}; color: ${isActive ? '#1e3a8a' : '#475569'}; transition: all 0.15s ease;">
                <i class="fa-solid ${cat.icon}"></i>
                <span>${cat.label}</span>
              </button>
            `;
            })
            .join('')}
        </div>
      </div>

      <!-- Research Cards Feed -->
      <div style="display: flex; flex-direction: column; gap: 24px;">
        ${
          filtered.length === 0
            ? `
          <div style="background: #ffffff; border: 1.5px dashed #cbd5e1; border-radius: 12px; padding: 40px; text-align: center; color: #64748b;">
            <i class="fa-solid fa-magnifying-glass" style="font-size: 2rem; color: #94a3b8; margin-bottom: 12px;"></i>
            <h4 style="margin: 0 0 6px 0; color: #1e293b; font-size: 1.1rem;">No matching pedagogy briefings found</h4>
            <p style="margin: 0; font-size: 0.9rem;">Try adjusting your search query or reset the strand filter to "All Briefings".</p>
          </div>
        `
            : filtered
                .map(
                  (b) => `
          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 3px 10px rgba(0,0,0,0.03);">
            
            <!-- Card Header -->
            <div style="padding: 20px 26px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                  <span style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; padding: 3px 8px; border-radius: 4px; background: #1e3a8a; color: #ffffff;">
                    ${b.category}
                  </span>
                  <span style="font-size: 0.82rem; font-weight: 700; color: #0f172a;">
                    ${b.author}
                  </span>
                  <span style="font-size: 0.78rem; color: #64748b;">
                    &bull; ${b.affiliation}
                  </span>
                </div>
                <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.35rem; font-weight: 800; color: #0f172a; margin: 0 0 4px 0; line-height: 1.3;">
                  ${b.title}
                </h3>
                <div style="font-size: 0.88rem; font-style: italic; color: #64748b;">
                  ${b.subtitle}
                </div>
              </div>
            </div>

            <!-- Card Body: Structured Diagnostic & Implementation Details -->
            <div style="padding: 24px; display: flex; flex-direction: column; gap: 18px;">
              
              <!-- Overview Narrative -->
              <div style="font-size: 0.9rem; line-height: 1.6; color: #334155; border-bottom: 1px solid #f1f5f9; padding-bottom: 14px;">
                ${b.overview}
              </div>

              <!-- Two-Column Context & Cognitive Grounding -->
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px;">
                
                <!-- Pedagogical Challenge -->
                <div style="background: #fffbeb; border: 1px solid #fef3c7; border-left: 3.5px solid #d97706; border-radius: 6px; padding: 14px 16px;">
                  <strong style="display: block; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.06em; color: #92400e; margin-bottom: 6px;">
                    ${b.analysisHeading || 'Curricular Challenge'}
                  </strong>
                  <p style="margin: 0; font-size: 0.86rem; color: #78350f; line-height: 1.5;">
                    ${b.analysisText || b.problem || ''}
                  </p>
                </div>

                <!-- Empirical / Disciplinary Evidence -->
                <div style="background: #eff6ff; border: 1px solid #dbeafe; border-left: 3.5px solid #2563eb; border-radius: 6px; padding: 14px 16px;">
                  <strong style="display: block; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.06em; color: #1e40af; margin-bottom: 6px;">
                    ${b.evidenceHeading || 'Evidence & Cognitive Grounding'}
                  </strong>
                  <p style="margin: 0; font-size: 0.86rem; color: #1e3a8a; line-height: 1.5;">
                    ${b.evidenceText || b.evidence || ''}
                  </p>
                </div>

              </div>

              <!-- Platform Implementation -->
              <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 3.5px solid #059669; border-radius: 6px; padding: 16px;">
                <strong style="display: block; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.06em; color: #065f46; margin-bottom: 8px;">
                  ${b.applicationHeading || 'Departmental & Platform Implementation'}
                </strong>
                <ul style="margin: 0; padding-left: 18px; font-size: 0.85rem; color: #166534; line-height: 1.55;">
                  ${b.implementation.map((imp) => `<li style="margin-bottom: 4px;">${imp}</li>`).join('')}
                </ul>
              </div>

              <!-- Practical Classroom Protocol -->
              <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 3.5px solid #0f172a; border-radius: 6px; padding: 16px;">
                <strong style="display: block; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.06em; color: #0f172a; margin-bottom: 8px;">
                  ${b.protocolHeading || 'Classroom Protocol for History Teachers'}
                </strong>
                <ul style="margin: 0; padding-left: 18px; font-size: 0.85rem; color: #334155; line-height: 1.55;">
                  ${b.teacherProtocols.map((p) => `<li style="margin-bottom: 4px;">${p}</li>`).join('')}
                </ul>
              </div>

              <!-- Academic Citations & Verified Web Links -->
              <div style="border-top: 1px dashed #cbd5e1; padding-top: 12px; display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; font-size: 0.82rem;">
                <div style="flex: 1; min-width: 280px;">
                  <span style="font-weight: 700; color: #64748b; display: block; margin-bottom: 2px;">Academic Citations:</span>
                  <ul style="margin: 0; padding-left: 16px; color: #475569; line-height: 1.4;">
                    ${b.citations.map((c) => `<li>${c}</li>`).join('')}
                  </ul>
                </div>
                <div>
                  <span style="font-weight: 700; color: #64748b; display: block; margin-bottom: 4px;">External Research Hub Links:</span>
                  <div style="display: flex; flex-direction: column; gap: 4px;">
                    ${b.links
                      .map(
                        (l) => `
                      <a href="${l.url}" target="_blank" style="color: #2563eb; text-decoration: none; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;"
                         onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">
                        <span>${l.title}</span>
                        <span style="color: #94a3b8; font-weight: 400; font-size: 0.75rem;">(${l.displayText})</span>
                      </a>
                    `,
                      )
                      .join('')}
                  </div>
                </div>
              </div>

            </div>
          </div>
        `,
                )
                .join('')
        }
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// TAB 4: CURRICULUM MAPPING & SOWs
// -------------------------------------------------------------
function renderCurriculumTab(container) {
  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <!-- SOW PDF Direct Download Bar -->
      <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
        <div>
          <h3 style="margin: 0 0 4px 0; font-size: 1.15rem; color: #0f172a; font-weight: 800;">
            Downloadable Schemes of Work &amp; Whole-School Overviews
          </h3>
          <p style="margin: 0; font-size: 0.85rem; color: #64748b;">
            Official curriculum documentation for department inspections and curriculum leaders.
          </p>
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <a href="/pdfs/whole_school_curriculum_overview.pdf" target="_blank" class="btn btn-sm" style="padding: 7px 12px; background: #0f172a; color: #fff; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 0.78rem;">
            <i class="fa-solid fa-file-pdf"></i> Whole School Overview
          </a>
          <a href="/pdfs/year_7_sow.pdf" target="_blank" class="btn btn-sm" style="padding: 7px 12px; background: #1b365d; color: #fff; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 0.78rem;">Year 7 SOW</a>
          <a href="/pdfs/year_8_sow.pdf" target="_blank" class="btn btn-sm" style="padding: 7px 12px; background: #1b4332; color: #fff; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 0.78rem;">Year 8 SOW</a>
          <a href="/pdfs/year_9_sow.pdf" target="_blank" class="btn btn-sm" style="padding: 7px 12px; background: #4c1d95; color: #fff; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 0.78rem;">Year 9 SOW</a>
          <a href="/pdfs/year_10_sow.pdf" target="_blank" class="btn btn-sm" style="padding: 7px 12px; background: #7c2d12; color: #fff; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 0.78rem;">Year 10 SOW</a>
          <a href="/pdfs/year_11_sow.pdf" target="_blank" class="btn btn-sm" style="padding: 7px 12px; background: #1e1b4b; color: #fff; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 0.78rem;">Year 11 SOW</a>
        </div>
      </div>

      <!-- Skills Matrix Overview -->
      <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
        <h3 style="margin: 0 0 16px 0; font-size: 1.25rem; font-weight: 800; color: #0f172a;">
          Disciplinary Skills Progression Matrix (Years 7–11)
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          ${Object.entries(DISCIPLINARY_STRANDS)
            .map(
              ([key, strand]) => `
            <div style="border: 1px solid #cbd5e1; border-left: 4px solid #1e3a8a; border-radius: 8px; padding: 14px; background: #f8fafc;">
              <div style="font-weight: 800; font-size: 0.95rem; color: #1e3a8a; margin-bottom: 4px;">
                ${strand.label}
              </div>
              <p style="margin: 0 0 8px 0; font-size: 0.82rem; color: #475569; line-height: 1.4;">
                ${strand.description}
              </p>
              <div style="font-size: 0.75rem; color: #64748b; font-style: italic;">
                Progression tracked across: ${strand.levels ? Object.keys(strand.levels).join(' &bull; ') : 'Y7–Y11'}
              </div>
            </div>
          `,
            )
            .join('')}
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// TAB 5: DEPARTMENT POLICIES
// -------------------------------------------------------------
function renderPoliciesTab(container) {
  container.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 20px;">
      
      <!-- Marking Policy -->
      <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #1e3a8a; background: #eff6ff; padding: 2px 8px; border-radius: 4px;">
            Department Policy 01
          </span>
          <a href="/pdfs/history_marking_and_feedback_policy_v2.pdf" target="_blank" style="font-size: 0.8rem; font-weight: 700; color: #2563eb; text-decoration: none;">
            <i class="fa-solid fa-file-pdf"></i> Download PDF
          </a>
        </div>
        <h3 style="font-family: 'Playfair Display', serif; font-size: 1.3rem; margin: 0 0 10px 0; color: #0f172a;">
          History Marking &amp; Formative Feedback Policy (v2)
        </h3>
        <p style="font-size: 0.88rem; color: #475569; line-height: 1.5; margin-bottom: 14px;">
          Establishes workload-efficient, high-impact feedback routines. Eliminates excessive margin scribbling in favour of structured WWW/EBI formative grids and whole-class feedback debriefs.
        </p>
        <ul style="margin: 0; padding-left: 18px; font-size: 0.82rem; color: #334155; line-height: 1.5;">
          <li>Formal formative assessment on every 16-page workbook back cover (/26 marks).</li>
          <li>Live marking using yellow highlighter for vocabulary precision.</li>
          <li>Dedicated pupil DIRT (Dedicated Improvement &amp; Reflection Time) routines.</li>
        </ul>
      </div>

      <!-- Fieldwork & Educational Visits -->
      <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #065f46; background: #ecfdf5; padding: 2px 8px; border-radius: 4px;">
            Department Policy 02
          </span>
          <a href="/pdfs/Ypres trip 2026 Code of Conduct.pdf" target="_blank" style="font-size: 0.8rem; font-weight: 700; color: #059669; text-decoration: none;">
            <i class="fa-solid fa-file-pdf"></i> Download PDF
          </a>
        </div>
        <h3 style="font-family: 'Playfair Display', serif; font-size: 1.3rem; margin: 0 0 10px 0; color: #0f172a;">
          Fieldwork, Primary Archives &amp; Visits Protocol
        </h3>
        <p style="font-size: 0.88rem; color: #475569; line-height: 1.5; margin-bottom: 14px;">
          Governs on-site primary archival fieldwork, battlefield study visits (such as the Ypres Salient Field Guide), local history heritage enquiries, and student safety.
        </p>
        <ul style="margin: 0; padding-left: 18px; font-size: 0.82rem; color: #334155; line-height: 1.5;">
          <li>Primary source handling protocols in local archives.</li>
          <li>Fieldwork companion packs and respectful memorial conduct.</li>
          <li>Integration of local soldier archives into the curriculum.</li>
        </ul>
      </div>

    </div>
  `;
}

// Global window hooks for tab switching & search
if (typeof window !== 'undefined') {
  window.switchPortalTab = function (tab) {
    activePortalTab = tab;
    document.querySelectorAll('.portal-nav-tab').forEach((t) => t.classList.remove('active'));
    renderActivePortalTab();
  };

  window.updateGuidanceSearch = function (q) {
    guidanceSearchQuery = q;
    const contentEl = document.getElementById('portal-tab-content');
    if (contentEl && activePortalTab === 'guidance') {
      renderGuidanceTab(contentEl);
      // Keep input focused
      const input = document.getElementById('guidance-search-input');
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    }
  };

  window.updatePedagogySearch = function (q) {
    pedagogySearchQuery = q;
    const contentEl = document.getElementById('portal-tab-content');
    if (contentEl && activePortalTab === 'pedagogy') {
      renderPedagogyTab(contentEl);
      // Keep input focused
      const input = document.getElementById('pedagogy-search-input');
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    }
  };

  window.setPedagogyCategoryFilter = function (cat) {
    pedagogyCategoryFilter = cat;
    const contentEl = document.getElementById('portal-tab-content');
    if (contentEl && activePortalTab === 'pedagogy') {
      renderPedagogyTab(contentEl);
    }
  };
}
