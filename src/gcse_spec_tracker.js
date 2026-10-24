/**
 * Year 11 GCSE Specification Tracker & Revision Builder
 * Platform: The History Revision Hub
 * Qualification: Pearson Edexcel GCSE (9–1) in History (1HI0)
 *
 * Strict School Anonymity & Commercial Neutrality Enforced
 * 100% Verbatim Pearson Issue 6 + August 2024 Erratum
 */

import './gcse_spec_tracker.css';
import { switchView } from './navigation.js';
import { WESTERN_FRONT_FEATURES_DATABASE } from './western_front_features_data.js';
import { BLURT_TOPICS_DATABASE } from './blurt_topics_curriculum.js';
import { BLURT_PAST_QUESTIONS_DATABASE } from './blurt_past_papers_curriculum.js';

// Unified Bank: Official Past Exam Questions (2018-2026) + Core Specification Enquiries
const ALL_BLURT_TOPICS_COMBINED = [...BLURT_PAST_QUESTIONS_DATABASE, ...BLURT_TOPICS_DATABASE];

// --- Default Configuration (2026 Verified Cohort Baseline) ---
const DEFAULT_PAPERS = [
  'paper1_11_medicine_britain',
  'paper2_b4_early_elizabethan_england',
  'paper2_p5_middle_east',
  'paper3_33_usa_conflict_home_abroad',
];

const STORAGE_KEY_PAPERS = 'gcse_spec_selected_papers_v1';
const STORAGE_KEY_RAG = 'gcse_spec_rag_audit_v2';
const STORAGE_KEY_PLANNER = 'gcse_spec_planner_tasks_v1';
const STORAGE_KEY_CONFIGURED = 'gcse_spec_onboarding_completed_v1';

// Official 2026 Pearson Edexcel GCSE History Exam Dates
const EXAM_DATES_2026 = {
  paper1: {
    date: '2026-05-18T09:00:00',
    label: 'Paper 1 (Thematic & Historic Environment)',
    time: '1h 20m',
    marks: '52 Marks (30%)',
  },
  paper2: {
    date: '2026-06-04T13:00:00',
    label: 'Paper 2 (British Depth & Period Study)',
    time: '1h 50m',
    marks: '64 Marks (40%)',
  },
  paper3: {
    date: '2026-06-09T09:00:00',
    label: 'Paper 3 (Modern Depth Study)',
    time: '1h 30m',
    marks: '52 Marks (30%)',
  },
};

// Unit ID mapping for direct lesson jumps
const OPTION_UNIT_MAP = {
  paper1_11_medicine_britain: 'edexcel_medicine',
  paper2_b4_early_elizabethan_england: 'eee',
  paper2_p5_middle_east: 'cme_new',
  paper3_33_usa_conflict_home_abroad: 'usa',
  paper3_31_weimar_nazi_germany: 'weimar_nazi_germany',
  paper2_p4_superpower_cold_war: 'cold_war',
};

// High-Yield Chronological Anchors & Tier-3 Vocabulary per Option
const OPTION_REVISION_METADATA = {
  paper1_11_medicine_britain: {
    dates:
      '1348 (Black Death), 1543 (Vesalius), 1628 (Harvey), 1665 (Great Plague), 1796 (Jenner), 1847 (Simpson chloroform), 1854 (Snow cholera), 1865 (Lister antiseptic), 1875 (Public Health Act), 1882 (Koch anthrax/TB), 1914–18 (Western Front CAS/FAP), 1928 (Fleming), 1948 (NHS).',
    vocab:
      'Miasma, Four Humours, Flagellants, Regimen Sanitatis, Anatomy, Ligatures, Spontaneous Generation, Germ Theory, Antiseptic, Aseptic, Salvarsan 606, Penicillin, Thomas Splint, Mobile X-ray, Carrel-Dakin method.',
    questions12m: [
      {
        stem: 'Explain why there was little change in ideas about the cause of disease in the period c1250–c1500.',
        stimulus: ['the Catholic Church', 'the continuing influence of Galen'],
        ownFactor: 'the lack of scientific instruments and medical printing',
      },
      {
        stem: 'Explain why there was rapid progress in disease prevention in Britain in the period c1700–c1900.',
        stimulus: ['Edward Jenner (1796)', 'the Public Health Act 1875'],
        ownFactor: 'John Snow’s Broad Street pump investigation (1854) or Edwin Chadwick’s report',
      },
      {
        stem: 'Explain why treatments for illness and infection improved so rapidly in the twentieth century.',
        stimulus: [
          'Magic bullets (Salvarsan 606 & Prontosil)',
          'the development of penicillin (Florey and Chain)',
        ],
        ownFactor:
          'government funding, mass pharmaceutical manufacturing, and the establishment of the NHS (1948)',
      },
      {
        stem: 'Explain why the Western Front presented unique medical challenges for treating wounded soldiers, 1914–18.',
        stimulus: ['gas gangrene in manured soil', 'trench foot and shell shock'],
        ownFactor:
          'difficult terrain, shell-cratered roads, and delays in the casualty evacuation chain',
      },
    ],
  },
  paper2_b4_early_elizabethan_england: {
    dates:
      '1558 (Accession), 1559 (Religious Settlement), 1568 (Mary Queen of Scots arrives), 1569 (Revolt of Northern Earls), 1570 (Papal Bull of Excommunication), 1571 (Ridolfi Plot), 1583 (Throckmorton Plot), 1585 (Treaty of Nonsuch), 1586 (Babington Plot), 1587 (Mary executed), 1588 (Spanish Armada).',
    vocab:
      'Legitimacy, Supreme Governor, Act of Uniformity, Recusants, Puritans, Papal Bull, Excommunication, Seminary priests, Walsingham’s spy network, Treaty of Joinville, Fire ships, Crescent formation.',
    questions12m: [
      {
        stem: 'Explain why the Catholic threat to Elizabeth I increased in the years 1569–1588.',
        stimulus: [
          'the Revolt of the Northern Earls (1569)',
          'the Papal Bull of Excommunication (1570)',
        ],
        ownFactor:
          'the presence of Mary, Queen of Scots in England and foreign Catholic plots (Ridolfi, Throckmorton, Babington)',
      },
      {
        stem: 'Explain why Elizabeth’s Religious Settlement of 1559 was successful in establishing religious stability.',
        stimulus: ['the Act of Supremacy', 'the Book of Common Prayer'],
        ownFactor:
          'the Middle Way (compromise) and moderate treatment of Catholic recusants in the early reign',
      },
      {
        stem: 'Explain why relations between England and Spain deteriorated between 1585 and 1588.',
        stimulus: ['the Treaty of Nonsuch (1585)', 'Francis Drake’s raid on Cadiz (1587)'],
        ownFactor:
          'religious rivalry, Philip II’s support for English Catholic plots, and privateering in the New World',
      },
    ],
  },
  paper2_p5_middle_east: {
    dates:
      '1945–47 (Jewish insurgency & King David Hotel), 1947 (UN Resolution 181 Partition), 1948 (End of Mandate & Israeli Statehood), 1948–49 (First Arab-Israeli War), 1956 (Suez Crisis), 1964 (PLO founded), 1967 (Six-Day War), 1973 (Yom Kippur War), 1978–79 (Camp David Accords), 1982 (Lebanon War), 1987 (First Intifada), 1993 (Oslo Accords).',
    vocab:
      'British Mandate, Haganah, Irgun, Nakba, Law of Return, Fedayeen, Straits of Tiran, Pre-emptive strike, Bar Lev Line, OPEC oil embargo, Shuttle diplomacy, Likud, Palestinian diaspora, West Bank, Golan Heights, Gaza.',
    questions8m: [
      {
        type: 'analytical_narrative',
        tariff: '8 MARKS',
        stem: 'Write an analytical narrative explaining the outbreak and consequences of the Six-Day War in June 1967.',
        stimulus: [
          'the closure of the Straits of Tiran (May 1967)',
          'Israel’s Operation Focus airstrike (5 June 1967)',
        ],
        ownFactor:
          'the occupation of the Sinai, West Bank, and Golan Heights, and UN Resolution 242',
      },
      {
        type: 'consequence',
        tariff: '8 MARKS',
        stem: 'Explain two consequences of the Yom Kippur War (October 1973).',
        stimulus: [
          'the OPEC oil embargo against Western nations',
          'the psychological boost for Egypt restoring Arab pride',
        ],
        ownFactor:
          'the initiation of US shuttle diplomacy (Kissinger) leading to the Camp David Accords (1978)',
      },
      {
        type: 'consequence',
        tariff: '8 MARKS',
        stem: 'Explain two consequences of the Suez Crisis (1956).',
        stimulus: [
          'the deployment of UNEF peacekeepers in the Sinai',
          'the political humiliation of Britain and France',
        ],
        ownFactor:
          'Nasser’s emergence as the undisputed hero of pan-Arab nationalism and Soviet military backing for Egypt',
      },
      {
        type: 'analytical_narrative',
        tariff: '8 MARKS',
        stem: 'Write an analytical narrative explaining the collapse of British authority in Palestine between 1945 and 1948.',
        stimulus: ['the King David Hotel bombing (July 1946)', 'UN Resolution 181 (November 1947)'],
        ownFactor:
          'the exhaustion of post-war Britain, illegal Jewish immigration (Exodus 1947), and armed Zionist insurgency (Irgun/Lehi)',
      },
    ],
  },
  paper3_33_usa_conflict_home_abroad: {
    dates:
      '1954 (Brown v. Topeka), 1955 (Emmett Till & Montgomery Bus Boycott), 1957 (Little Rock), 1960 (Greensboro sit-ins), 1961 (Freedom Rides), 1963 (Birmingham Campaign & March on Washington), 1964 (Civil Rights Act & Gulf of Tonkin), 1965 (Selma & Voting Rights Act), 1968 (Tet Offensive & MLK assassinated), 1970 (Kent State), 1973 (Paris Peace Accords), 1975 (Fall of Saigon).',
    vocab:
      'Jim Crow, Segregation, NAACP, CORE, SCLC, SNCC, Black Power, Civil Rights Act, Voting Rights Act, Vietcong, Guerrilla warfare, Domino Theory, Search and Destroy, Agent Orange, Napalm, Tet Offensive, My Lai, Vietnamization.',
    questions12m: [
      {
        stem: 'Explain why the Civil Rights movement gained significant momentum in the years 1954–1960.',
        stimulus: [
          'the Supreme Court ruling in Brown v. Topeka (1954)',
          'the Montgomery Bus Boycott (1955–56)',
        ],
        ownFactor:
          'the leadership of Martin Luther King Jr, media exposure of Southern white violence, and student direct action',
      },
      {
        stem: 'Explain why the US military failed to defeat the Vietcong between 1965 and 1968.',
        stimulus: [
          'Vietcong guerrilla tactics and tunnel networks',
          'Operation Rolling Thunder and search-and-destroy missions',
        ],
        ownFactor:
          'unfamiliar jungle terrain, lack of South Vietnamese peasant support, and supply lines via the Ho Chi Minh Trail',
      },
      {
        stem: 'Explain why domestic opposition to the Vietnam War intensified in the USA between 1968 and 1971.',
        stimulus: ['the Tet Offensive (1968)', 'the My Lai Massacre revelations'],
        ownFactor:
          'the draft lottery system, casualty numbers, media coverage, and the shooting of student protesters at Kent State (1970)',
      },
      {
        stem: 'Explain why the Civil Rights Act of 1964 was passed by the US Congress.',
        stimulus: ['the Birmingham Campaign (1963)', 'the March on Washington (August 1963)'],
        ownFactor:
          'President Lyndon B. Johnson’s legislative skill and political determination following JFK’s assassination',
      },
    ],
  },
  paper3_31_weimar_nazi_germany: {
    dates:
      '1918 (Abdication & Armistice), 1919 (Weimar Constitution & Treaty of Versailles), 1923 (Ruhr & Hyperinflation & Munich Putsch), 1924 (Dawes Plan), 1929 (Wall Street Crash & Stresemann dies), 1933 (Hitler Chancellor, Reichstag Fire, Enabling Act, Concordat), 1934 (Night of the Long Knives & Fuhrer), 1935 (Nuremberg Laws), 1938 (Kristallnacht).',
    vocab:
      'Dolchstoss, Article 48, Proportional Representation, Freikorps, Hyperinflation, Rentenmark, Dawes Plan, Gleichschaltung, Gestapo, SS, SD, Reich Church, Concordat, DAF, KDF, RAD, Nuremberg Laws, Kristallnacht.',
    questions12m: [
      {
        stem: 'Explain why the Weimar Republic experienced severe political instability in the years 1919–1923.',
        stimulus: ['the Spartacist Uprising (1919)', 'the hyperinflation crisis of 1923'],
        ownFactor:
          'the "stab in the back" myth (Dolchstoss), resentment of the Treaty of Versailles, and political assassinations',
      },
      {
        stem: 'Explain why Hitler was appointed Chancellor of Germany in January 1933.',
        stimulus: [
          'the impact of the Wall Street Crash (1929)',
          'the political scheming of Von Papen and Hindenburg',
        ],
        ownFactor:
          'Goebbels’ modern election propaganda, middle-class fear of Communism, and SA intimidation',
      },
      {
        stem: 'Explain why the Nazi regime was able to control the German population between 1933 and 1939.',
        stimulus: [
          'the Gestapo and concentration camps',
          'Nazi attempts to control religion (Concordat and Reich Church)',
        ],
        ownFactor:
          'Goebbels’ Ministry of Propaganda (press, radio, rallies) and economic recovery programs reducing unemployment',
      },
    ],
  },
  paper2_p4_superpower_cold_war: {
    dates:
      '1945 (Yalta & Potsdam, Hiroshima), 1947 (Truman Doctrine & Marshall Plan), 1948–49 (Berlin Blockade & Airlift), 1949 (NATO & Soviet A-bomb), 1955 (Warsaw Pact), 1956 (Hungarian Uprising), 1961 (Berlin Wall), 1962 (Cuban Missile Crisis), 1968 (Prague Spring & Brezhnev Doctrine), 1975 (Helsinki Accords), 1979 (Soviet invasion of Afghanistan), 1985 (Gorbachev: Glasnost & Perestroika), 1989 (Fall of Berlin Wall), 1991 (Soviet collapse).',
    vocab:
      'Containment, Iron Curtain, Satellite states, Cominform, Comecon, Brinkmanship, MAD, Checkpoint Charlie, Quarantine blockade, Detente, Strategic Arms Limitation, SDI (Star Wars), Perestroika, Glasnost.',
    questions12m: [
      {
        stem: 'Explain why tension increased between the USA and the Soviet Union in the years 1945–1947.',
        stimulus: ['disagreements at the Potsdam Conference (1945)', 'the Truman Doctrine (1947)'],
        ownFactor:
          'the creation of Soviet satellite states in Eastern Europe and the atomic bomb monopoly',
      },
      {
        stem: 'Explain why the Cuban Missile Crisis was resolved peacefully in October 1962.',
        stimulus: [
          'the US naval blockade (quarantine)',
          'the secret agreement regarding US missiles in Turkey',
        ],
        ownFactor:
          'fear of Mutually Assured Destruction (MAD) and Khrushchev’s realization of US conventional naval superiority',
      },
    ],
  },
};

// High-Yield Blurt Engine Curriculum Database (Imported from ./blurt_topics_curriculum.js)

// --- In-Memory State ---
let manifestData = null;
let activePaperIds = [];
let loadedSpecs = {};
let activeTab = 'audit'; // 'audit' | 'printable' | 'generator' | 'blurt'
let activeRagFilter = 'all'; // 'all' | 'red' | 'amber' | 'green' | 'unrated'
let activePaperFilter = 'all'; // 'all' | 'paper1' | 'paper2_bd' | 'paper2_ps' | 'paper3'
let searchQuery = '';
let ragState = {};
let sprintState = {
  active: false,
  questions: [],
  currentIndex: 0,
  score: 0,
  selectedAnswer: null,
  isFinished: false,
  results: [],
};

// Blurt Engine State
let speechRecognizer = null;
let isRecordingVoice = false;

let blurtState = {
  selectedPaper: null,
  selectedTopicId: null,
  selectedTariffFilter: 'all', // 'all' | '4' | '8' | '12' | '16' | 'curated'
  durationSeconds: 0,
  remainingSeconds: 0,
  timerInterval: null,
  isRunning: false,
  isPaused: false,
  isFinished: false,
  soundEnabled: true,
  text: '', // Single unified memory canvas text
  answers: {
    dates: '',
    vocab: '',
    mechanism: '',
  },
  checkedItems: {}, // key -> boolean
  lastSyncFeedback: null,
  ladderStep: 0, // 0 = unassisted, 1 = questions, 2 = word bank, 3 = starters
  widerCredits: 0, // number of valid extra historical details credited
};

// --- Load Manifest and Specifications ---
async function initTrackerData() {
  // Load Manifest
  if (!manifestData) {
    try {
      const res = await fetch(`/data/specifications/specifications_manifest.json?v=${Date.now()}`);
      manifestData = await res.json();
    } catch (e) {
      console.error('Failed to load specifications manifest:', e);
      return false;
    }
  }

  // Load Saved Papers or Default to 2026 Cohort
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PAPERS);
    if (saved) {
      activePaperIds = JSON.parse(saved);
    } else {
      activePaperIds = [...DEFAULT_PAPERS];
    }
  } catch (e) {
    activePaperIds = [...DEFAULT_PAPERS];
  }

  // Load Saved RAG State
  try {
    const storedRag = localStorage.getItem(STORAGE_KEY_RAG);
    if (storedRag) {
      ragState = JSON.parse(storedRag);
    } else {
      ragState = {};
    }
  } catch (e) {
    ragState = {};
  }

  // Fetch individual specification files for the 4 active papers
  for (const paperId of activePaperIds) {
    if (!loadedSpecs[paperId]) {
      try {
        const res = await fetch(`/data/specifications/${paperId}.json?v=${Date.now()}`);
        loadedSpecs[paperId] = await res.json();
      } catch (err) {
        console.error(`Failed to load specification file: ${paperId}`, err);
      }
    }
  }

  return true;
}

// --- Save Functions ---
function saveRagState() {
  try {
    localStorage.setItem(STORAGE_KEY_RAG, JSON.stringify(ragState));
  } catch (e) {
    console.error('Could not save RAG state', e);
  }
}

function saveSelectedPapers() {
  try {
    localStorage.setItem(STORAGE_KEY_PAPERS, JSON.stringify(activePaperIds));
  } catch (e) {
    console.error('Could not save selected papers', e);
  }
}

// --- RAG Rating Calculations ---
function calculateAuditStats() {
  let totalPoints = 0;
  let greenCount = 0;
  let amberCount = 0;
  let redCount = 0;
  let unratedCount = 0;

  activePaperIds.forEach((paperId) => {
    const spec = loadedSpecs[paperId];
    if (!spec || !spec.sections) return;

    spec.sections.forEach((sec) => {
      if (!sec.topics) return;
      sec.topics.forEach((topic) => {
        if (!topic.points) return;
        topic.points.forEach((_, pIdx) => {
          totalPoints++;
          const itemId = `spec-${paperId}-${sec.id}-${topic.number || 0}-${pIdx}`;
          const rating = ragState[itemId] || 'unrated';
          if (rating === 'green') greenCount++;
          else if (rating === 'amber') amberCount++;
          else if (rating === 'red') redCount++;
          else unratedCount++;
        });
      });
    });
  });

  const ratedPoints = greenCount + amberCount + redCount;
  // Readiness score gives 100% value to Green and 50% value to Amber
  const readinessPercent =
    totalPoints > 0 ? Math.round(((greenCount * 1.0 + amberCount * 0.5) / totalPoints) * 100) : 0;

  return {
    totalPoints,
    ratedPoints,
    greenCount,
    amberCount,
    redCount,
    unratedCount,
    readinessPercent,
  };
}

// --- Main View Renderer ---
export async function renderGcseSpecTracker(defaultTab = 'audit') {
  const container = document.getElementById('main-content');
  if (!container) return;

  container.innerHTML = `
    <div style="padding: 60px 20px; text-align: center;">
      <i class="fa-solid fa-spinner fa-spin fa-3x" style="color: #3b82f6;"></i>
      <h3 style="margin-top: 18px; font-family: 'Outfit', sans-serif; color: #1e3a8a;">Loading GCSE Specification Matrix &amp; Revision Engine...</h3>
      <p style="color: #64748b; font-size: 0.95rem;">Auditing Issue 6 syllabus targets and pupil revision state</p>
    </div>
  `;

  const success = await initTrackerData();
  if (!success) {
    container.innerHTML = `
      <div style="padding: 40px; text-align: center; color: #ef4444;">
        <i class="fa-solid fa-triangle-exclamation fa-3x" style="margin-bottom: 15px;"></i>
        <h2>Failed to Load GCSE Specification Repository</h2>
        <p>Please check your internet connection or server status.</p>
        <button class="btn" onclick="window.switchView('dashboard')">Return to Dashboard</button>
      </div>
    `;
    return;
  }

  if (defaultTab && ['audit', 'printable', 'generator', 'blurt'].includes(defaultTab)) {
    activeTab = defaultTab;
  } else if (!['audit', 'printable', 'generator', 'blurt'].includes(activeTab)) {
    activeTab = 'audit';
  }

  buildTrackerDom(container);

  // First-time Onboarding Check: If user hasn't confirmed papers yet, trigger the onboarding modal
  try {
    const hasConfigured = localStorage.getItem(STORAGE_KEY_CONFIGURED);
    if (!hasConfigured) {
      setTimeout(() => {
        openPathwayModal(true);
      }, 350);
    }
  } catch (e) {}
}

// --- DOM Assembly ---
function buildTrackerDom(container) {
  const stats = calculateAuditStats();

  // Immersive Zero-Scroll Focus Mode for Active Blurt Sprint
  if (activeTab === 'blurt' && blurtState.isRunning) {
    container.innerHTML = `
      <div class="gcse-tracker-container gcse-blurt-fullscreen-sprint" style="padding: 6px 0; max-width: 1200px; margin: 0 auto;">
        ${renderBlurtTabHtml()}
      </div>
    `;
    attachTrackerEvents();
    return;
  }

  let html = `
    <div class="gcse-tracker-container">
      
      <!-- Top Hero Header Banner -->
      <div class="gcse-tracker-hero">
        <div class="gcse-tracker-hero-top">
          <div>
            <div class="gcse-tracker-pill-group">
              <span class="gcse-badge-pill"><i class="fa-solid fa-graduation-cap"></i> Pearson Edexcel GCSE (9–1) History</span>
            </div>
            <h1 class="gcse-tracker-title">Year 11 GCSE Specification Tracker</h1>
            <p class="gcse-tracker-subtitle">
              Audit your syllabus knowledge across your 4 exam papers, target priority gaps, and test memory retention with untimed free recall.
            </p>
          </div>

          <!-- Live Readiness Ring & Controls -->
          <div class="gcse-tracker-hero-right">
            <div class="gcse-readiness-widget">
              <div class="gcse-readiness-ring-wrap">
                <svg viewBox="0 0 36 36">
                  <path class="gcse-ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path class="gcse-ring-progress" stroke-dasharray="${stats.readinessPercent}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div class="gcse-ring-label">${stats.readinessPercent}%</div>
              </div>
              <div class="gcse-readiness-stats">
                <span class="gcse-readiness-stat-title">Overall Readiness</span>
                <span class="gcse-readiness-stat-sub"><strong>${stats.greenCount}</strong> Mastered &bull; <strong>${stats.redCount}</strong> Gaps</span>
              </div>
            </div>
            
            <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;">
              <button type="button" class="btn" id="btn-hero-print-a4" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: #ffffff; padding: 10px 16px; border-radius: 8px; font-weight: 700; font-size: 0.84rem; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s;" title="Print official A4 revision checklist">
                <i class="fa-solid fa-print"></i> Print A4 Checklist
              </button>
              <button type="button" class="btn" id="btn-change-papers" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: #ffffff; padding: 10px 16px; border-radius: 8px; font-weight: 700; font-size: 0.84rem; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s;">
                <i class="fa-solid fa-sliders"></i> My 4 Papers
              </button>
              <button type="button" class="btn" id="btn-quick-reset-papers" style="background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25); color: #ffffff; padding: 10px 14px; border-radius: 8px; font-weight: 700; font-size: 0.84rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s;" title="Reset back to standard 4 baseline papers (Medicine, Elizabeth, Middle East, USA)">
                <i class="fa-solid fa-rotate-left"></i> Reset
              </button>
            </div>
          </div>
        </div>

        <!-- 4 Active Papers Ribbon -->
        <div class="gcse-papers-ribbon">
          ${renderPapersRibbonHtml()}
        </div>
      </div>

      <!-- Main Navigation Tabs Strip (Streamlined 2 Core Pillars) -->
      <nav class="gcse-tracker-nav no-print" aria-label="GCSE Revision Navigation">
        <button class="gcse-tab-btn ${activeTab === 'audit' ? 'active' : ''}" data-tab="audit">
          <span class="gcse-tab-num">1</span>
          <span class="gcse-tab-label">Specification Audit</span>
          <span class="tab-badge">${stats.totalPoints} Points</span>
        </button>
        <button class="gcse-tab-btn ${activeTab === 'blurt' ? 'active' : ''}" data-tab="blurt">
          <span class="gcse-tab-num">2</span>
          <span class="gcse-tab-label">Active Recall Memory Engine</span>
          <span class="tab-badge" style="background:rgba(16,185,129,0.15);color:#059669;border:1px solid rgba(16,185,129,0.3);">🧠 Free Recall</span>
        </button>
      </nav>

      <!-- Active Tab Content Area -->
      <div id="gcse-tracker-tab-content">
        ${renderActiveTabHtml(stats)}
      </div>

    </div>
  `;

  container.innerHTML = html;
  attachTrackerEvents();
}

// --- Ribbon of 4 Selected Papers ---
function renderPapersRibbonHtml() {
  return activePaperIds
    .map((paperId) => {
      const spec = loadedSpecs[paperId];
      if (!spec) return '';
      return `
      <div class="gcse-paper-badge-card" title="${spec.title}: ${spec.subtitle}">
        <span class="gcse-paper-code-tag">${spec.code || 'Spec'}</span>
        <div class="gcse-paper-info">
          <span class="gcse-paper-info-label">${spec.paperType || spec.paper}</span>
          <span class="gcse-paper-info-title">${spec.shortTitle || spec.title}</span>
        </div>
      </div>
    `;
    })
    .join('');
}

// --- Render Selected Tab Content ---
function renderActiveTabHtml(stats) {
  if (activeTab === 'audit') {
    return renderAuditTabHtml(stats);
  } else if (activeTab === 'printable') {
    return renderPrintableTabHtml();
  } else if (activeTab === 'generator') {
    return renderGeneratorTabHtml();
  } else if (activeTab === 'blurt') {
    return renderBlurtTabHtml();
  }
  return renderAuditTabHtml(stats);
}

// ==========================================================================
// TAB 1: Specification Audit Matrix
// ==========================================================================
function renderAuditTabHtml(stats) {
  let html = `
    <!-- Audit Filter & Search Toolbar -->
    <div class="gcse-filter-toolbar">
      <div class="gcse-filter-pills">
        <button class="gcse-filter-btn ${activeRagFilter === 'all' ? 'active' : ''}" data-filter="all">
          <span>All Topics</span>
          <span style="opacity:0.8;">(${stats.totalPoints})</span>
        </button>
        <button class="gcse-filter-btn filter-red ${activeRagFilter === 'red' ? 'active' : ''}" data-filter="red">
          <i class="fa-solid fa-circle-exclamation" style="color:#ef4444;"></i>
          <span>Priority Gaps (Red)</span>
          <span style="opacity:0.8;">(${stats.redCount})</span>
        </button>
        <button class="gcse-filter-btn filter-amber ${activeRagFilter === 'amber' ? 'active' : ''}" data-filter="amber">
          <i class="fa-solid fa-triangle-exclamation" style="color:#f59e0b;"></i>
          <span>Revising (Amber)</span>
          <span style="opacity:0.8;">(${stats.amberCount})</span>
        </button>
        <button class="gcse-filter-btn filter-green ${activeRagFilter === 'green' ? 'active' : ''}" data-filter="green">
          <i class="fa-solid fa-circle-check" style="color:#10b981;"></i>
          <span>Mastered (Green)</span>
          <span style="opacity:0.8;">(${stats.greenCount})</span>
        </button>
        <button class="gcse-filter-btn ${activeRagFilter === 'unrated' ? 'active' : ''}" data-filter="unrated">
          <i class="fa-regular fa-circle" style="color:#94a3b8;"></i>
          <span>Unrated</span>
          <span style="opacity:0.8;">(${stats.unratedCount})</span>
        </button>
      </div>

      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        <div class="gcse-search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="gcse-spec-search" placeholder="Search specification bullet points..." value="${escapeHtml(searchQuery)}" />
        </div>
        <button type="button" class="btn" id="btn-audit-print-a4" style="background:#ffffff;border:1.5px solid #cbd5e1;color:#1e3a8a;padding:8px 14px;border-radius:8px;font-weight:700;font-size:0.82rem;cursor:pointer;display:inline-flex;align-items:center;gap:6px;white-space:nowrap;box-shadow:0 1px 3px rgba(0,0,0,0.05);" title="Print this specification as an A4 revision checklist">
          <i class="fa-solid fa-print"></i> Print A4 Checklist
        </button>
      </div>
    </div>

    <!-- Paper Switcher Toolbar -->
    <div class="gcse-paper-switch-bar">
      <button class="gcse-paper-tab-btn ${activePaperFilter === 'all' ? 'active' : ''}" data-paper="all">
        <i class="fa-solid fa-layer-group"></i> All 4 Papers
      </button>
  `;

  activePaperIds.forEach((paperId) => {
    const spec = loadedSpecs[paperId];
    if (!spec) return;
    const isSelected = activePaperFilter === paperId;
    html += `
      <button class="gcse-paper-tab-btn ${isSelected ? 'active' : ''}" data-paper="${paperId}">
        <span style="background:rgba(0,0,0,0.1);padding:2px 6px;border-radius:4px;font-size:0.75rem;">${spec.code}</span>
        ${spec.shortTitle || spec.title}
      </button>
    `;
  });

  html += `
    </div>

    <!-- Specification Sections Feed -->
    <div class="gcse-spec-feed">
  `;

  let visibleItemsCount = 0;

  activePaperIds.forEach((paperId) => {
    if (activePaperFilter !== 'all' && activePaperFilter !== paperId) return;

    const spec = loadedSpecs[paperId];
    if (!spec || !spec.sections) return;

    spec.sections.forEach((sec) => {
      let secItemsHtml = '';

      if (sec.topics) {
        sec.topics.forEach((topic) => {
          let topicItemsHtml = '';

          if (topic.points) {
            topic.points.forEach((point, pIdx) => {
              const itemId = `spec-${paperId}-${sec.id}-${topic.number || 0}-${pIdx}`;
              const currentRating = ragState[itemId] || 'unrated';

              // Filter checks
              if (activeRagFilter !== 'all' && currentRating !== activeRagFilter) {
                return;
              }

              // Search query check
              if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                const matched =
                  point.toLowerCase().includes(q) ||
                  (topic.title && topic.title.toLowerCase().includes(q));
                if (!matched) return;
              }

              visibleItemsCount++;

              // Calculate target lesson jump
              const unitId = OPTION_UNIT_MAP[paperId];
              let lessonActionHtml = '';
              if (unitId) {
                lessonActionHtml = `
                  <button type="button" class="gcse-spec-action-btn" data-action="jump-lesson" data-unit="${unitId}" data-topic="${topic.number || 1}" title="Open corresponding enquiry lesson in this unit">
                    <i class="fa-solid fa-book-open"></i> Lesson
                  </button>
                `;
              }

              topicItemsHtml += `
                <div class="gcse-spec-item-row status-${currentRating}" id="row-${itemId}">
                  <div class="gcse-rag-selector" title="Set your revision confidence">
                    <button type="button" class="gcse-rag-btn btn-red ${currentRating === 'red' ? 'active' : ''}" data-id="${itemId}" data-color="red" title="Priority Gap: Not understood or unrevised"></button>
                    <button type="button" class="gcse-rag-btn btn-amber ${currentRating === 'amber' ? 'active' : ''}" data-id="${itemId}" data-color="amber" title="Revising: Needs reinforcement or date anchor"></button>
                    <button type="button" class="gcse-rag-btn btn-green ${currentRating === 'green' ? 'active' : ''}" data-id="${itemId}" data-color="green" title="Mastered: Confident and successfully recalled"></button>
                  </div>
                  <div class="gcse-spec-text">
                    ${formatBold(point)}
                  </div>
                  ${lessonActionHtml}
                </div>
              `;
            });
          }

          if (topicItemsHtml) {
            secItemsHtml += `
              <div class="gcse-spec-topic-group">
                <div class="gcse-spec-topic-title">
                  <span>${topic.title}</span>
                </div>
                ${topicItemsHtml}
              </div>
            `;
          }
        });
      }

      if (secItemsHtml) {
        html += `
          <div class="gcse-spec-section-card">
            <div class="gcse-spec-section-header">
              <h3 class="gcse-spec-section-title">
                <span style="background:#1e3a8a;color:#ffffff;font-size:0.75rem;padding:2px 8px;border-radius:4px;font-family:'Outfit',sans-serif;">${spec.code}</span>
                ${sec.title}
              </h3>
              <span style="font-size:0.78rem;color:#64748b;font-weight:600;">${spec.paper} &bull; ${spec.shortTitle}</span>
            </div>
            ${secItemsHtml}
          </div>
        `;
      }
    });
  });

  if (visibleItemsCount === 0) {
    html += `
      <div style="background:#ffffff;border:1.5px dashed #cbd5e1;border-radius:12px;padding:48px 24px;text-align:center;color:#64748b;">
        <i class="fa-solid fa-filter fa-3x" style="color:#94a3b8;margin-bottom:12px;"></i>
        <h3 style="margin:0 0 6px 0;color:#1e293b;">No Specification Points Match Your Filter</h3>
        <p style="margin:0 0 16px 0;font-size:0.9rem;">Try selecting "All Topics" or clearing your search keywords.</p>
        <button class="gcse-filter-btn active" data-filter="all" style="display:inline-flex;">Reset Filter</button>
      </div>
    `;
  }

  html += `</div>`;
  return html;
}

// ==========================================================================
// TAB 2: Personalised A4 Printable Checklist (Print View / PDF)
// ==========================================================================
function renderPrintableTabHtml() {
  let html = `
    <div class="gcse-print-preview-container">
      
      <!-- Top Action Bar (Screen Only) -->
      <div class="gcse-print-exclude" style="display:flex;justify-content:space-between;align-items:center;background:#f8fafc;padding:14px 18px;border-radius:8px;border:1px solid #cbd5e1;margin-bottom:24px;">
        <div>
          <h3 style="margin:0;font-size:1.05rem;color:#0f172a;display:flex;align-items:center;gap:8px;">
            <i class="fa-solid fa-file-pdf" style="color:#ef4444;"></i> Personalised A4 GCSE Revision Checklist
          </h3>
          <p style="margin:2px 0 0;font-size:0.82rem;color:#64748b;">
            Direct upgrade of the departmental Word tick list. Tailored strictly to your 4 active papers with Pass 1–3 checkboxes, key dates, and Tier-3 vocabulary.
          </p>
        </div>
        <div style="display:flex;gap:10px;">
          <button type="button" class="btn" id="btn-back-to-audit" style="background:#ffffff;border:1.5px solid #cbd5e1;color:#334155;padding:9px 16px;border-radius:6px;font-weight:700;font-size:0.86rem;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
            <i class="fa-solid fa-arrow-left"></i> Back to Audit
          </button>
          <button type="button" class="btn" onclick="window.print()" style="background:#0f172a;color:#ffffff;padding:9px 18px;border-radius:6px;font-weight:700;font-size:0.86rem;cursor:pointer;display:inline-flex;align-items:center;gap:8px;">
            <i class="fa-solid fa-print"></i> Print / Save PDF
          </button>
        </div>
      </div>

      <!-- Formal Reprographic Document Header -->
      <div class="gcse-print-header-banner">
        <div>
          <div style="font-size:0.75rem;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#475569;margin-bottom:2px;">
            The History Revision Hub &bull; GCSE History Department
          </div>
          <h2 class="gcse-print-title">Personalised GCSE (9–1) Revision Checklist</h2>
          <div style="font-size:0.85rem;color:#334155;">
            Pearson Edexcel Qualification 1HI0 &bull; Active 2026 Examination Terminal Baseline
          </div>
        </div>
        <div style="text-align:right;font-size:0.85rem;line-height:1.6;">
          <div><strong>Candidate Name:</strong> _________________________________</div>
          <div><strong>Target Grade:</strong> [ &nbsp; ] &nbsp; <strong>Exam Year:</strong> 2026</div>
        </div>
      </div>

      <!-- Overview Box of 4 Papers -->
      <table class="gcse-print-table" style="margin-bottom:20px;">
        <thead>
          <tr>
            <th style="width:18%;">Paper Code</th>
            <th style="width:42%;">Component Title</th>
            <th style="width:20%;">Official Timing</th>
            <th style="width:20%;">Weighting &amp; Marks</th>
          </tr>
        </thead>
        <tbody>
  `;

  activePaperIds.forEach((paperId) => {
    const spec = loadedSpecs[paperId];
    if (!spec) return;
    html += `
      <tr>
        <td><strong>Option ${spec.code}</strong> (${spec.paper})</td>
        <td>${spec.title}</td>
        <td>${spec.exam_structure ? spec.exam_structure.duration_minutes + ' Mins' : 'Exam Session'}</td>
        <td>${spec.exam_structure ? spec.exam_structure.total_marks + ' Marks (' + (spec.exam_structure.weighting || '30%') + ')' : '--'}</td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>

      <!-- Detailed Section Tables for each of the 4 papers -->
  `;

  activePaperIds.forEach((paperId) => {
    const spec = loadedSpecs[paperId];
    if (!spec || !spec.sections) return;
    const meta = OPTION_REVISION_METADATA[paperId] || {
      dates: 'See timeline',
      vocab: 'Core concepts',
    };

    html += `
      <div class="gcse-paper-print-section" style="margin-bottom:28px;">
        <div style="border-left:4px solid #0f172a;padding-left:10px;margin-bottom:10px;">
          <h3 style="margin:0;font-size:1.15rem;font-family:'Playfair Display',serif;color:#0f172a;">
            Option ${spec.code}: ${spec.shortTitle || spec.title}
          </h3>
          <p style="margin:2px 0 0;font-size:0.8rem;color:#475569;">
            ${spec.paper} &bull; Issue 6 Verified &bull; ${spec.stats ? spec.stats.pointsCount + ' Specification Targets' : ''}
          </p>
        </div>

        <div style="background:#f8fafc;border:1px solid #cbd5e1;padding:8px 12px;border-radius:6px;margin-bottom:12px;font-size:0.8rem;line-height:1.5;">
          <div><strong>Key Dates &amp; Turning Points:</strong> ${meta.dates}</div>
          <div style="margin-top:4px;"><strong>Essential Tier-3 Vocabulary:</strong> ${meta.vocab}</div>
        </div>

        <table class="gcse-print-table">
          <thead>
            <tr>
              <th style="width:48%;">Specification Focus &amp; Key Content</th>
              <th style="width:15%;text-align:center;">Pass 1 &bull; 2 &bull; 3</th>
              <th style="width:17%;">Confidence Status</th>
              <th style="width:20%;">Pupil Revision Notes</th>
            </tr>
          </thead>
          <tbody>
    `;

    spec.sections.forEach((sec) => {
      if (!sec.topics) return;
      sec.topics.forEach((topic) => {
        if (!topic.points) return;
        topic.points.forEach((point, pIdx) => {
          const itemId = `spec-${paperId}-${sec.id}-${topic.number || 0}-${pIdx}`;
          const rating = ragState[itemId] || 'unrated';
          let ratingBadge = '<span style="color:#64748b;font-size:0.75rem;">Unrated</span>';
          if (rating === 'green')
            ratingBadge = '<strong style="color:#15803d;font-size:0.75rem;">🟢 Mastered</strong>';
          else if (rating === 'amber')
            ratingBadge = '<strong style="color:#b45309;font-size:0.75rem;">🟡 Revising</strong>';
          else if (rating === 'red')
            ratingBadge =
              '<strong style="color:#b91c1c;font-size:0.75rem;">🔴 Priority Gap</strong>';

          html += `
            <tr>
              <td>
                <div style="font-weight:700;font-size:0.78rem;color:#475569;margin-bottom:2px;">${sec.title} &mdash; ${topic.title}</div>
                <div>${formatBold(point)}</div>
              </td>
              <td style="text-align:center;">
                <div class="gcse-pass-checkboxes">
                  <span class="gcse-pass-box" title="Pass 1"></span>
                  <span class="gcse-pass-box" title="Pass 2"></span>
                  <span class="gcse-pass-box" title="Pass 3"></span>
                </div>
              </td>
              <td>${ratingBadge}</td>
              <td style="border-bottom:1px dashed #94a3b8;"></td>
            </tr>
          `;
        });
      });
    });

    html += `
          </tbody>
        </table>
      </div>
    `;
  });

  html += `</div>`;
  return html;
}

// ==========================================================================
// TAB 3: Targeted 12-Mark Causation Generator ("Explain Why...")
// ==========================================================================
let currentGeneratorQuestion = null;

function renderGeneratorTabHtml() {
  // Collect 12m questions for all active papers
  const availableQuestions = [];
  activePaperIds.forEach((paperId) => {
    const meta = OPTION_REVISION_METADATA[paperId];
    const spec = loadedSpecs[paperId];
    if (meta && meta.questions12m && spec) {
      meta.questions12m.forEach((q) => {
        availableQuestions.push({
          ...q,
          paperId,
          paperCode: spec.code,
          paperName: spec.shortTitle || spec.title,
          paperType: spec.paper,
        });
      });
    }
  });

  if (!currentGeneratorQuestion && availableQuestions.length > 0) {
    currentGeneratorQuestion = availableQuestions[0];
  }

  const q = currentGeneratorQuestion;
  if (!q) {
    return `<div style="padding:30px;text-align:center;">No causation questions registered for selected papers.</div>`;
  }

  return `
    <div class="gcse-generator-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:16px;">
        <div>
          <span style="background:#eff6ff;color:#1e40af;font-size:0.72rem;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;padding:3px 10px;border-radius:12px;border:1px solid #bfdbfe;">
            Edexcel Causation Engine &bull; AO1 &amp; AO2
          </span>
          <h2 style="margin:6px 0 2px 0;font-family:'Playfair Display',serif;font-size:1.5rem;color:#0f172a;">
            Targeted 12-Mark "Explain Why..." Question Generator
          </h2>
          <p style="margin:0;font-size:0.88rem;color:#64748b;">
            Causation is the central 12-mark assessment engine of Edexcel Papers 1, 2, and 3. Select any topic to generate authentic stimulus points and step-by-step PEEL paragraph structure strips.
          </p>
        </div>

        <button type="button" class="btn" id="btn-next-12m" style="background:#2563eb;color:#ffffff;padding:9px 18px;border-radius:8px;font-weight:700;font-size:0.85rem;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
          <i class="fa-solid fa-arrows-rotate"></i> Next Question
        </button>
      </div>

      <!-- Question Box -->
      <div class="gcse-exam-question-box">
        <span class="gcse-exam-tariff-badge">[12 MARKS]</span>
        <div style="font-size:0.8rem;text-transform:uppercase;font-weight:800;color:#2563eb;margin-bottom:6px;">
          Option ${q.paperCode}: ${q.paperName} &bull; ${q.paperType}
        </div>
        <h3 class="gcse-exam-stem">${q.stem}</h3>
        
        <div class="gcse-exam-stimulus-box">
          <div style="font-weight:700;margin-bottom:4px;color:#0f172a;">You may use the following in your answer:</div>
          <ul style="margin:4px 0;padding-left:20px;">
            ${q.stimulus.map((s) => `<li><strong>${s}</strong></li>`).join('')}
          </ul>
          <div style="font-style:italic;color:#64748b;margin-top:4px;">
            <i class="fa-solid fa-circle-exclamation" style="color:#ef4444;margin-right:4px;"></i>
            You must also use information of your own (Mandatory for Level 3/4).
          </div>
        </div>
      </div>

      <!-- Mark Scheme & Structural Scaffold -->
      <div style="margin-top:20px;">
        <h4 style="margin:0 0 10px 0;font-size:1.05rem;color:#0f172a;display:flex;align-items:center;gap:8px;">
          <i class="fa-solid fa-layer-group" style="color:#3b82f6;"></i>
          Step-by-Step Level 4 PEEL Paragraph Scaffold
        </h4>

        <div class="gcse-peel-strip">
          <div class="gcse-peel-step">
            <div class="gcse-peel-step-title">
              <span>Paragraph 1: Stimulus Factor 1 (${q.stimulus[0]})</span>
              <span style="font-size:0.75rem;background:#dbeafe;color:#1e40af;padding:2px 6px;border-radius:4px;">PEEL 1</span>
            </div>
            <div class="gcse-peel-step-content">
              <strong>Point Starter:</strong> "One significant factor that caused this development was the impact of ${q.stimulus[0]}..."<br>
              <strong>Evidence &amp; Analysis:</strong> Deploy precise dates and named figures. Explain directly how this factor acted as a catalyst or underlying trigger.<br>
              <strong>Causal Connector:</strong> "This led directly to... which meant that... thereby creating conditions where..."
            </div>
          </div>

          <div class="gcse-peel-step">
            <div class="gcse-peel-step-title">
              <span>Paragraph 2: Stimulus Factor 2 (${q.stimulus[1]})</span>
              <span style="font-size:0.75rem;background:#dbeafe;color:#1e40af;padding:2px 6px;border-radius:4px;">PEEL 2</span>
            </div>
            <div class="gcse-peel-step-content">
              <strong>Point Starter:</strong> "Furthermore, this outcome was accelerated by ${q.stimulus[1]}..."<br>
              <strong>Evidence &amp; Analysis:</strong> Interlink Factor 2 with Factor 1 to show that events did not occur in isolation.<br>
              <strong>Causal Connector:</strong> "Consequently, this amplified the existing tensions because..."
            </div>
          </div>

          <div class="gcse-peel-step" style="border-left-color:#10b981;">
            <div class="gcse-peel-step-title" style="color:#047857;">
              <span>Paragraph 3: Own Knowledge Beyond Stimulus (${q.ownFactor})</span>
              <span style="font-size:0.75rem;background:#d1fae5;color:#065f46;padding:2px 6px;border-radius:4px;">Level 4 Required</span>
            </div>
            <div class="gcse-peel-step-content">
              <strong>Point Starter:</strong> "However, the stimulus points alone do not fully explain this outcome; an essential additional factor was ${q.ownFactor}..."<br>
              <strong>Evidence &amp; Analysis:</strong> Provide detailed historical context not mentioned in the exam prompt.<br>
              <strong>Causal Connector:</strong> "Without this factor, the crisis/development would not have materialized in the same manner because..."
            </div>
          </div>

          <div class="gcse-peel-step" style="border-left-color:#8b5cf6;">
            <div class="gcse-peel-step-title" style="color:#6d28d9;">
              <span>Evaluative Conclusion: Relative Importance &amp; Hierarchy of Causes</span>
              <span style="font-size:0.75rem;background:#ede9fe;color:#5b21b6;padding:2px 6px;border-radius:4px;">Judgment</span>
            </div>
            <div class="gcse-peel-step-content">
              Do not simply summarize! Weigh the relative importance of the three factors (e.g. underlying long-term structural cause vs short-term catalyst).
            </div>
          </div>
        </div>

        <div style="display:flex;gap:10px;margin-top:20px;flex-wrap:wrap;">
          <button type="button" class="btn" id="btn-copy-peel" style="background:#0f172a;color:#ffffff;padding:9px 18px;border-radius:8px;font-weight:700;font-size:0.85rem;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
            <i class="fa-regular fa-copy"></i> Copy Scaffold to Clipboard
          </button>
        </div>
      </div>
    </div>
  `;
}

// ==========================================================================
// TAB 4: Timed Active Recall Blurt Engine (Structured Free Recall)
// ==========================================================================

function getAvailableBlurtTopics() {
  return ALL_BLURT_TOPICS_COMBINED.filter((t) => activePaperIds.includes(t.paperId));
}

function getCurrentBlurtTopic() {
  const available = getAvailableBlurtTopics();
  if (available.length === 0) return null;

  if (blurtState.selectedTopicId) {
    const found = available.find((t) => t.topicId === blurtState.selectedTopicId);
    if (found) {
      blurtState.selectedPaper = found.paperId;
      return found;
    }
  }

  const currentPaper = blurtState.selectedPaper || activePaperIds[0];
  const paperTopics = available.filter((t) => t.paperId === currentPaper);

  if (paperTopics.length > 0) {
    blurtState.selectedTopicId = paperTopics[0].topicId;
    blurtState.selectedPaper = paperTopics[0].paperId;
    return paperTopics[0];
  }

  blurtState.selectedTopicId = available[0].topicId;
  blurtState.selectedPaper = available[0].paperId;
  return available[0];
}

function countWords(str) {
  if (!str) return 0;
  const matches = str.trim().match(/\S+/g);
  return matches ? matches.length : 0;
}

function formatTime(totalSeconds) {
  const m = Math.floor(Math.max(0, totalSeconds) / 60);
  const s = Math.max(0, totalSeconds) % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function playBlurtTone(type = 'start') {
  if (!blurtState.soundEnabled) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'start') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'tick') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'finish') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.15);
      osc.frequency.setValueAtTime(783.99, now + 0.3);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.65);
      osc.start(now);
      osc.stop(now + 0.65);
    }
  } catch (e) {
    // Audio context may require user interaction or not supported
  }
}

function toggleVoiceDictation() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert(
      'Browser voice dictation is supported in Google Chrome, Microsoft Edge, and Safari. On Windows, you can also press Windows Key + H anytime to speak directly into this box.',
    );
    return;
  }

  if (isRecordingVoice && speechRecognizer) {
    try {
      speechRecognizer.stop();
    } catch (e) {}
    isRecordingVoice = false;
    updateVoiceButtonUi(false);
    return;
  }

  try {
    speechRecognizer = new SpeechRecognition();
    speechRecognizer.continuous = true;
    speechRecognizer.interimResults = true;
    speechRecognizer.lang = 'en-GB';

    speechRecognizer.onstart = () => {
      isRecordingVoice = true;
      updateVoiceButtonUi(true);
    };

    speechRecognizer.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        }
      }

      if (finalTranscript) {
        const canvas = document.getElementById('blurt-input-canvas');
        if (canvas) {
          const current = canvas.value;
          const separator =
            current.length > 0 && !current.endsWith(' ') && !current.endsWith('\n') ? ' ' : '';
          canvas.value = current + separator + finalTranscript.trim();
          blurtState.text = canvas.value;
          const tot = document.getElementById('blurt-total-words');
          if (tot) tot.textContent = countWords(blurtState.text);
        }
      }
    };

    speechRecognizer.onerror = (e) => {
      console.warn('Speech recognition error:', e.error);
      isRecordingVoice = false;
      updateVoiceButtonUi(false);
    };

    speechRecognizer.onend = () => {
      isRecordingVoice = false;
      updateVoiceButtonUi(false);
    };

    speechRecognizer.start();
  } catch (err) {
    console.error('Failed to start speech recognition:', err);
    isRecordingVoice = false;
    updateVoiceButtonUi(false);
  }
}

function updateVoiceButtonUi(recording) {
  const btnVoice = document.getElementById('btn-blurt-voice-toggle');
  const statusSpan = document.getElementById('blurt-voice-status');
  if (btnVoice) {
    if (recording) {
      btnVoice.classList.add('recording');
      btnVoice.innerHTML =
        '<i class="fa-solid fa-microphone-lines fa-beat" style="color:#ef4444;"></i> <span>Listening... (Click to Stop)</span>';
      btnVoice.style.background = '#fef2f2';
      btnVoice.style.borderColor = '#ef4444';
      btnVoice.style.color = '#b91c1c';
    } else {
      btnVoice.classList.remove('recording');
      btnVoice.innerHTML =
        '<i class="fa-solid fa-microphone"></i> <span>Speak (Voice Dictation)</span>';
      btnVoice.style.background = '#ffffff';
      btnVoice.style.borderColor = '#cbd5e1';
      btnVoice.style.color = '#1e3a8a';
    }
  }
  if (statusSpan) {
    statusSpan.textContent = recording
      ? '🎙️ Microphone listening: Speak clearly...'
      : 'Press Win+H or click Speak above';
    statusSpan.style.color = recording ? '#ef4444' : '#64748b';
  }
}

function startBlurtTimer() {
  if (blurtState.timerInterval) clearInterval(blurtState.timerInterval);
  blurtState.isRunning = true;
  blurtState.isPaused = false;
  blurtState.isFinished = false;
  blurtState.remainingSeconds = 0;

  playBlurtTone('start');

  const container = document.getElementById('main-content');
  if (container) {
    buildTrackerDom(container);
  } else {
    const contentArea = document.getElementById('gcse-tracker-tab-content');
    if (contentArea) {
      contentArea.innerHTML = renderBlurtTabHtml();
      attachTrackerEvents();
    }
  }

  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  const canvasInput = document.getElementById('blurt-input-canvas');
  if (canvasInput) canvasInput.focus({ preventScroll: true });
}

function refreshBlurtDom() {
  const container = document.getElementById('main-content');
  if (blurtState.isRunning && container) {
    buildTrackerDom(container);
    const canvas = document.getElementById('blurt-input-canvas');
    if (canvas) canvas.focus({ preventScroll: true });
    return;
  }
  const contentArea = document.getElementById('gcse-tracker-tab-content');
  if (contentArea) {
    contentArea.innerHTML = renderBlurtTabHtml();
    attachTrackerEvents();
  } else if (container) {
    buildTrackerDom(container);
  }
}

function finishBlurtSession() {
  if (blurtState.timerInterval) clearInterval(blurtState.timerInterval);
  if (isRecordingVoice && speechRecognizer) {
    try {
      speechRecognizer.stop();
    } catch (e) {}
    isRecordingVoice = false;
  }
  blurtState.isRunning = false;
  blurtState.isPaused = false;
  blurtState.isFinished = true;
  playBlurtTone('finish');

  const topic = getCurrentBlurtTopic();
  if (topic) {
    const rawText = (blurtState.text || '').toLowerCase();

    topic.benchmark.dates.forEach((d, idx) => {
      const key = `date_${idx}`;
      if (blurtState.checkedItems[key] === undefined) {
        blurtState.checkedItems[key] = rawText.includes(d.date.toLowerCase());
      }
    });

    topic.benchmark.vocab.forEach((v, idx) => {
      const key = `vocab_${idx}`;
      if (blurtState.checkedItems[key] === undefined) {
        const termClean = v.term.toLowerCase();
        const termFirstWord = v.term
          .split(' ')[0]
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '');
        blurtState.checkedItems[key] =
          rawText.includes(termClean) ||
          (termFirstWord.length > 2 && rawText.includes(termFirstWord));
      }
    });

    // Auto-check official indicative points for past paper questions
    if (topic.indicativeContent && topic.indicativeContent.length > 0) {
      topic.indicativeContent.forEach((item, idx) => {
        const key = `indicative_${idx}`;
        if (blurtState.checkedItems[key] === undefined) {
          const words = item
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .split(/\s+/)
            .filter((w) => w.length > 4);
          const matchCount = words.filter((w) => rawText.includes(w)).length;
          blurtState.checkedItems[key] = matchCount >= 2;
        }
      });
    }

    // Evaluate Thematic Causation Clusters (Automated Semantic Scan)
    if (topic.thematicClusters && topic.thematicClusters.length > 0) {
      blurtState.clusterResults = topic.thematicClusters.map((cluster) => {
        const matched = cluster.keywords.some((kw) => rawText.includes(kw.toLowerCase()));
        return {
          ...cluster,
          matched,
        };
      });
    } else {
      blurtState.clusterResults = [];
    }
  }

  const container = document.getElementById('main-content');
  if (container) {
    buildTrackerDom(container);
  } else {
    const contentArea = document.getElementById('gcse-tracker-tab-content');
    if (contentArea) {
      contentArea.innerHTML = renderBlurtTabHtml();
      attachTrackerEvents();
    }
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetBlurtSession() {
  if (blurtState.timerInterval) clearInterval(blurtState.timerInterval);
  if (isRecordingVoice && speechRecognizer) {
    try {
      speechRecognizer.stop();
    } catch (e) {}
    isRecordingVoice = false;
  }
  blurtState.isRunning = false;
  blurtState.isPaused = false;
  blurtState.isFinished = false;
  blurtState.remainingSeconds = blurtState.durationSeconds > 0 ? blurtState.durationSeconds : 180;
  blurtState.text = '';
  blurtState.answers = { dates: '', vocab: '', mechanism: '' };
  blurtState.checkedItems = {};
  blurtState.lastSyncFeedback = null;
  blurtState.ladderStep = 0;
  blurtState.widerCredits = 0;
  blurtState.clusterResults = [];

  const container = document.getElementById('main-content');
  if (container) {
    buildTrackerDom(container);
  } else {
    const contentArea = document.getElementById('gcse-tracker-tab-content');
    if (contentArea) {
      contentArea.innerHTML = renderBlurtTabHtml();
      attachTrackerEvents();
    }
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function syncBlurtToRag(color) {
  const topic = getCurrentBlurtTopic();
  if (!topic) return;

  let pointsCount = 0;
  activePaperIds.forEach((paperId) => {
    const spec = loadedSpecs[paperId];
    if (!spec || !spec.sections) return;
    spec.sections.forEach((sec) => {
      if (!sec.topics) return;
      sec.topics.forEach((top) => {
        if (!top.points) return;
        top.points.forEach((_, pIdx) => {
          const itemId = `spec-${paperId}-${sec.id}-${top.number || 0}-${pIdx}`;
          if (topic.specItemSyncPrefix && itemId.includes(topic.specItemSyncPrefix.split('-')[2])) {
            ragState[itemId] = color;
            pointsCount++;
          }
        });
      });
    });
  });

  ragState[topic.topicId] = color;
  saveRagState();

  const stats = calculateAuditStats();

  const ring = document.querySelector('.gcse-ring-progress');
  const ringLabel = document.querySelector('.gcse-ring-label');
  const sub = document.querySelector('.gcse-readiness-stat-sub');
  if (ring) ring.setAttribute('stroke-dasharray', `${stats.readinessPercent}, 100`);
  if (ringLabel) ringLabel.textContent = `${stats.readinessPercent}%`;
  if (sub)
    sub.innerHTML = `<strong>${stats.greenCount}</strong> Mastered &bull; <strong>${stats.redCount}</strong> Gaps`;

  blurtState.lastSyncFeedback = {
    color,
    readiness: stats.readinessPercent,
    pointsCount: Math.max(1, pointsCount),
  };

  refreshBlurtDom();
}

function renderBlurtTabHtml() {
  const availableTopics = getAvailableBlurtTopics();
  const topic = getCurrentBlurtTopic();

  if (!topic) {
    return `
      <div style="background:#ffffff;border-radius:12px;padding:40px;text-align:center;">
        <i class="fa-solid fa-circle-exclamation fa-3x" style="color:#d97706;margin-bottom:12px;"></i>
        <h3>No Blurt Topics Registered for Current Selection</h3>
        <p>Please select your 4 GCSE papers to load authentic revision topics.</p>
        <button class="btn" id="btn-change-papers">Configure Papers</button>
      </div>
    `;
  }

  const spec = loadedSpecs[topic.paperId];

  if (blurtState.isRunning) {
    return renderBlurtActiveSprintHtml(topic, spec);
  }

  if (blurtState.isFinished) {
    return renderBlurtFinishedHtml(topic, spec);
  }

  return renderBlurtSetupHtml(availableTopics, topic, spec);
}

function renderBlurtSetupHtml(availableTopics, topic, spec) {
  const wordsDates = countWords(blurtState.answers.dates);
  const wordsVocab = countWords(blurtState.answers.vocab);
  const wordsMech = countWords(blurtState.answers.mechanism);
  const totalWords = wordsDates + wordsVocab + wordsMech;

  const currentPaperId = topic.paperId;
  const pastForPaper = BLURT_PAST_QUESTIONS_DATABASE.filter((q) => q.paperId === currentPaperId);
  const curatedForPaper = BLURT_TOPICS_DATABASE.filter((c) => c.paperId === currentPaperId);

  // Compute available unique tariffs for this paper
  const uniqueTariffs = Array.from(new Set(pastForPaper.map((q) => q.tariff).filter(Boolean))).sort(
    (a, b) => a - b,
  );

  let filteredPast = pastForPaper;
  if (
    blurtState.selectedTariffFilter &&
    blurtState.selectedTariffFilter !== 'all' &&
    blurtState.selectedTariffFilter !== 'curated'
  ) {
    const tNum = parseInt(blurtState.selectedTariffFilter, 10);
    filteredPast = pastForPaper.filter((q) => q.tariff === tNum);
  }

  return `
    <div class="gcse-blurt-container">
      
      <!-- Top Setup Card -->
      <div class="gcse-blurt-setup-card">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:16px;">
          <div>
            <div class="gcse-badge-pill" style="background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;">
              <i class="fa-solid fa-brain"></i> Cognitive Science &bull; Active Free Recall Practice
            </div>
            <h2 style="margin:8px 0 4px;font-family:'Playfair Display',serif;font-size:1.6rem;color:#0f172a;">
              Active Recall Memory Engine
            </h2>
            <p style="margin:0;font-size:0.9rem;color:#64748b;max-width:760px;line-height:1.5;">
              Overcome blank page paralysis with structured free recall. Retrieve key chronological turning points, Tier-3 technical terminology, and decisive causal explanations from memory at your own pace—then verify your recall against verbatim Pearson Edexcel benchmarks.
            </p>
          </div>

          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button type="button" class="btn" id="btn-blurt-direct-print" style="background:#ffffff;color:#1e3a8a;border:1.5px solid #1e3a8a;padding:8px 16px;border-radius:8px;font-size:0.82rem;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
              <i class="fa-solid fa-print"></i> Print 1-Page Workout
            </button>
          </div>
        </div>

        <!-- Topic & Paper Selector Strip -->
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px;margin-bottom:20px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px;">
            <span style="font-size:0.78rem;font-weight:800;text-transform:uppercase;color:#475569;letter-spacing:0.05em;">
              1. Select Examination Paper:
            </span>
            <span style="font-size:0.78rem;color:#2563eb;font-weight:700;">
              <strong>${pastForPaper.length}</strong> Official Exam Questions &bull; <strong>${curatedForPaper.length}</strong> Core Enquiries
            </span>
          </div>

          <!-- Paper Tabs -->
          <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:6px;margin-bottom:12px;">
            ${activePaperIds
              .map((pId) => {
                const pSpec = loadedSpecs[pId];
                const isSelected = topic.paperId === pId;
                return `
                <button type="button" class="btn gcse-blurt-paper-tab ${isSelected ? 'active' : ''}" data-paper="${pId}" style="padding:6px 14px;border-radius:6px;font-size:0.8rem;font-weight:700;cursor:pointer;border:1px solid ${isSelected ? '#1e3a8a' : '#cbd5e1'};background:${isSelected ? '#1e3a8a' : '#ffffff'};color:${isSelected ? '#ffffff' : '#475569'};white-space:nowrap;">
                  ${pSpec ? pSpec.shortTitle || pSpec.title : pId}
                </button>
              `;
              })
              .join('')}
          </div>

          <!-- Question Tariff Filter Pills -->
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:12px;flex-wrap:wrap;">
            <span style="font-size:0.74rem;font-weight:800;text-transform:uppercase;color:#64748b;letter-spacing:0.04em;margin-right:2px;">
              <i class="fa-solid fa-filter" style="color:#3b82f6;"></i> Tariff Filter:
            </span>
            <button type="button" class="btn gcse-blurt-tariff-filter ${blurtState.selectedTariffFilter === 'all' ? 'active' : ''}" data-tariff="all">
              All (${pastForPaper.length + curatedForPaper.length})
            </button>
            ${uniqueTariffs
              .map((t) => {
                const count = pastForPaper.filter((q) => q.tariff === t).length;
                return `
                <button type="button" class="btn gcse-blurt-tariff-filter ${blurtState.selectedTariffFilter === String(t) ? 'active' : ''}" data-tariff="${t}">
                  ${t} Marks (${count})
                </button>
              `;
              })
              .join('')}
            <button type="button" class="btn gcse-blurt-tariff-filter ${blurtState.selectedTariffFilter === 'curated' ? 'active' : ''}" data-tariff="curated">
              Core Enquiries (${curatedForPaper.length})
            </button>
          </div>

          <!-- Topic & Exam Question Dropdown -->
          <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
            <div style="flex:1;min-width:280px;">
              <label for="select-blurt-topic" style="display:block;font-size:0.75rem;font-weight:800;text-transform:uppercase;color:#475569;margin-bottom:4px;letter-spacing:0.04em;">
                2. Select Real Exam Question or Core Enquiry:
              </label>
              <select id="select-blurt-topic" style="width:100%;padding:10px 12px;border-radius:8px;border:1.5px solid #cbd5e1;font-size:0.92rem;font-weight:600;background:#ffffff;color:#0f172a;">
                ${
                  filteredPast.length > 0 && blurtState.selectedTariffFilter !== 'curated'
                    ? `
                  <optgroup label="📝 Official Pearson Past Exam Questions (2018–2025) — ${filteredPast.length} Questions">
                    ${filteredPast
                      .map(
                        (q) => `
                      <option value="${q.topicId}" ${q.topicId === topic.topicId ? 'selected' : ''}>
                        ${q.series} ${q.qNumber} [${q.tariff}m ${q.questionType ? q.questionType.toUpperCase() : ''}] • ${escapeHtml(q.topicName || q.title)}
                      </option>
                    `,
                      )
                      .join('')}
                  </optgroup>
                `
                    : ''
                }
                ${
                  blurtState.selectedTariffFilter === 'all' ||
                  blurtState.selectedTariffFilter === 'curated'
                    ? `
                  <optgroup label="📚 Core Specification Revision Enquiries (${curatedForPaper.length} Modules)">
                    ${curatedForPaper
                      .map(
                        (c) => `
                      <option value="${c.topicId}" ${c.topicId === topic.topicId ? 'selected' : ''}>
                        ${c.specCode} • ${escapeHtml(c.title)}
                      </option>
                    `,
                      )
                      .join('')}
                  </optgroup>
                `
                    : ''
                }
              </select>
            </div>
            ${
              topic.relatedLesson
                ? `
              <button type="button" class="btn" id="btn-blurt-jump-lesson" data-unit="${topic.relatedLesson.unit}" data-index="${topic.relatedLesson.index}" style="background:#eff6ff;color:#1e40af;border:1px solid #bfdbfe;padding:9px 14px;border-radius:8px;font-size:0.82rem;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:6px;align-self:flex-end;">
                <i class="fa-solid fa-book-open"></i> View Enquiry Lesson
              </button>
            `
                : ''
            }
          </div>
        </div>

        <!-- Target Exam Question for this Session -->
        <div style="background:linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%);border-radius:10px;padding:16px 20px;margin-bottom:16px;color:#ffffff;box-shadow:0 4px 14px rgba(15,23,42,0.12);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;gap:8px;">
            <span style="font-size:0.75rem;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;color:#93c5fd;display:inline-flex;align-items:center;gap:6px;">
              <i class="fa-solid fa-bullseye"></i> ${topic.isPastPaperQuestion ? `Official Past Exam Question (${topic.series} ${topic.qNumber} • ${topic.tariff} Marks)` : 'Target Exam Question for this Recall Session'}:
            </span>
            <span style="font-size:0.72rem;font-weight:700;color:#cbd5e1;background:rgba(255,255,255,0.1);padding:2px 8px;border-radius:10px;">
              ${topic.isPastPaperQuestion ? `Pearson Edexcel Past Paper (${topic.tariff}m)` : 'Pearson Edexcel Specification Target'}
            </span>
          </div>
          <h3 style="margin:2px 0 6px 0;font-family:'Lora',serif;font-size:1.22rem;font-weight:700;color:#ffffff;line-height:1.4;">
            "${topic.drivingQuestion || topic.title}"
          </h3>
          ${
            topic.stimulus
              ? `
            <div style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);border-radius:6px;padding:8px 12px;margin:8px 0;font-size:0.84rem;color:#e2e8f0;">
              <strong style="display:block;margin-bottom:3px;font-size:0.72rem;text-transform:uppercase;letter-spacing:0.04em;color:#93c5fd;">
                <i class="fa-solid fa-lightbulb"></i> Official Exam Stimulus Points Provided:
              </strong>
              <div style="white-space:pre-line;line-height:1.45;">${escapeHtml(topic.stimulus)}</div>
            </div>
          `
              : ''
          }
          <p style="margin:0;font-size:0.86rem;color:#cbd5e1;line-height:1.45;">
            <i class="fa-solid fa-compass" style="color:#60a5fa;margin-right:4px;"></i>
            <strong>Recall Focus:</strong> ${topic.pupilPromptCue || topic.prompt}
          </p>
        </div>

        <!-- Distinct Exam Paper Mission Guidance Banner -->
        ${renderExamMissionBanner(topic)}

        <!-- Western Front Section A Master Features Callout Banner -->
        ${
          topic.paperId === 'paper1_11_medicine_britain'
            ? `
          <div style="background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:10px;padding:14px 18px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
            <div>
              <div style="font-weight:800;font-size:0.86rem;color:#1e40af;display:flex;align-items:center;gap:6px;margin-bottom:2px;">
                <i class="fa-solid fa-book-medical"></i> Paper 1 Section A Historic Environment: Master 2-Mark Features Bank
              </div>
              <p style="margin:0;font-size:0.82rem;color:#334155;line-height:1.4;">
                Access all 40 official 2-mark features for Q1a/Q1b across Battles, Trench Architecture, Conditions &amp; Trauma, Evacuation Chain, and Surgery.
              </p>
            </div>
            <button type="button" class="btn" id="btn-open-wf-modal-setup" style="background:#1e3a8a;color:#ffffff;border:none;padding:9px 16px;border-radius:6px;font-size:0.82rem;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 2px 6px rgba(30,58,138,0.25);">
              <i class="fa-solid fa-list-check"></i> Browse All 40 Features
            </button>
          </div>
        `
            : ''
        }

        <!-- Launch Button -->
        <div style="text-align:center;margin:24px 0 12px;">
          <button type="button" class="btn" id="btn-start-blurt" style="background:linear-gradient(135deg, #10b981 0%, #059669 100%);color:#ffffff;padding:15px 44px;border-radius:10px;font-size:1.05rem;font-weight:800;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:10px;box-shadow:0 6px 20px rgba(16,185,129,0.35);transition:all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
            <i class="fa-solid fa-brain"></i> Start Active Recall Practice
          </button>
        </div>

      </div>

      <!-- Printable 1-Page Workout Template (Rendered for Print) -->
      ${renderBlurtPrintWorkoutHtml(topic, spec)}

    </div>
  `;
}

// ==========================================================================
// Pearson Edexcel Exam Mission Banners & 3-Step Scaffold Ladder
// ==========================================================================

function renderExamMissionBanner(topic) {
  if (!topic) return '';

  let bannerClass = 'banner-paper1-b';
  let badgeText = 'PEARSON EDEXCEL SPECIFICATION TARGET';
  let bannerTitle = topic.title;
  let missionStatement = topic.examMission || topic.subtitle || '';

  if (topic.isPastPaperQuestion) {
    bannerClass = topic.paperId.includes('paper1')
      ? 'banner-paper1-b'
      : topic.paperId.includes('paper2_b4')
        ? 'banner-paper2-depth'
        : topic.paperId.includes('paper2_p5')
          ? 'banner-paper2-period'
          : 'banner-paper3-modern';
    badgeText = `PEARSON EDEXCEL ${topic.series ? topic.series.toUpperCase() : 'PAST PAPER'} • ${topic.qNumber} [${topic.tariff} MARKS]`;
    bannerTitle = topic.topicName || topic.title;
    missionStatement = `${topic.specTopic ? topic.specTopic + ' &bull; ' : ''}${topic.examinerTips || 'Demonstrate precise historical knowledge and structure your answer to meet the demands of this official question tariff.'}`;
  } else if (topic.paperType === 'paper1_sec_a') {
    bannerClass = 'banner-paper1-a';
    badgeText = 'PEARSON EDEXCEL PAPER 1 SECTION A • 2-MARK FEATURES ENGINE';
    bannerTitle =
      'Question 1: "Describe one feature of..." (Tested Twice: Q1a & Q1b [2+2 = 4 Marks])';
    missionStatement =
      '1 Mark for Valid Historical Identification + 1 Mark for Specific Operational Context (dates, measurements, locations, personnel, or clinical methods).';
  } else if (topic.paperType === 'paper1_thematic') {
    bannerClass = 'banner-paper1-b';
    badgeText = 'PEARSON EDEXCEL PAPER 1 SECTION B • THEMATIC SYNTHESIS & CONTINUITY';
    bannerTitle = 'Thematic Analysis & Driving Factors across Eras (c1250–Present)';
    missionStatement =
      topic.examMission ||
      'Identify causal mechanisms, continuity vs change drivers (Church, Government, Science/Tech, Individuals), and institutional impact.';
  } else if (topic.paperType === 'paper2_depth') {
    bannerClass = 'banner-paper2-depth';
    badgeText = 'PEARSON EDEXCEL PAPER 2 (BOOKLET B) • BRITISH DEPTH STUDY';
    bannerTitle = 'Early Elizabethan England (1558–88): Threats, Motives & Crown Response';
    missionStatement =
      topic.examMission ||
      'Explain political intrigue, religious settlement compromise, Mary Queen of Scots conspiracies, and naval/foreign confrontations.';
  } else if (topic.paperType === 'paper2_period') {
    bannerClass = 'banner-paper2-period';
    badgeText = 'PEARSON EDEXCEL PAPER 2 (BOOKLET P) • PERIOD STUDY ANALYTICAL CHAIN';
    bannerTitle = '3-Stage Analytical Narrative Chain & Direct Consequences';
    missionStatement =
      topic.examMission ||
      'Construct sequential causal connections showing how one event directly triggered the next across borders and decades.';
  } else if (topic.paperType === 'paper3_modern') {
    bannerClass = 'banner-paper3-modern';
    badgeText = 'PEARSON EDEXCEL PAPER 3 • MODERN DEPTH STUDY & INTERPRETATIONS';
    bannerTitle = 'Multi-Factor Causation & Historical Interpretations';
    missionStatement =
      topic.examMission ||
      'Synthesize competing domestic and geopolitical pressures, grass-roots activism vs state reactions, and contested viewpoints.';
  }

  const isPaper1SecA = topic.paperType === 'paper1_sec_a' || topic.topicId?.includes('_wf_');

  return `
    <div class="gcse-blurt-mission-banner ${bannerClass}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;">
        <span class="mission-tag"><i class="fa-solid fa-bullseye"></i> ${badgeText}</span>
        ${
          isPaper1SecA
            ? `
          <button type="button" class="btn" id="btn-open-wf-modal-banner" style="background:#0f172a;color:#ffffff;border:none;padding:5px 12px;border-radius:6px;font-size:0.75rem;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 2px 6px rgba(0,0,0,0.15);">
            <i class="fa-solid fa-list-check"></i> Browse All 40 Western Front Features
          </button>
        `
            : ''
        }
      </div>
      <div class="mission-title">${bannerTitle}</div>
      <div class="mission-desc">${missionStatement}</div>
    </div>
  `;
}

function renderScaffoldLadderHtml(topic) {
  if (!topic || !topic.scaffoldLadder) return '';

  const ladder = topic.scaffoldLadder;
  const currentStep = blurtState.ladderStep; // 0 = independent, 1 = questions, 2 = wordbank, 3 = starters

  let stepLabel = 'Independent Recall (Gold Standard)';
  let stepTagClass = 'ladder-gold';
  let stepIcon = 'fa-solid fa-medal';

  if (currentStep === 1) {
    stepLabel = 'Step 1: Thematic Focus Questions';
    stepTagClass = 'ladder-blue';
    stepIcon = 'fa-solid fa-lightbulb';
  } else if (currentStep === 2) {
    stepLabel = 'Step 2: Word Bank & Chronology Anchors';
    stepTagClass = 'ladder-amber';
    stepIcon = 'fa-solid fa-puzzle-piece';
  } else if (currentStep === 3) {
    stepLabel = 'Step 3: Sentence Starters & Causal Frames';
    stepTagClass = 'ladder-emerald';
    stepIcon = 'fa-solid fa-pen-ruler';
  }

  return `
    <div class="gcse-scaffold-ladder-wrap">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
        <!-- Scaffold Toggle Button -->
        <button type="button" class="gcse-ladder-btn ${currentStep > 0 ? 'step-active' : ''}" id="btn-blurt-ladder-toggle" title="Cycle through progressive retrieval scaffolding">
          <i class="fa-solid fa-stairs"></i>
          <span>${currentStep === 0 ? '🪜 Need a Hint? (Scaffold Ladder)' : '🪜 Scaffold Ladder Active'}</span>
        </button>

        <!-- Progressive Ladder Pips -->
        <div class="gcse-ladder-step-indicator">
          <button type="button" class="gcse-ladder-pip ${currentStep === 0 ? 'active' : ''}" data-step="0" title="Step 0: 100% Independent (Gold Standard)">0</button>
          <button type="button" class="gcse-ladder-pip ${currentStep === 1 ? 'active' : ''}" data-step="1" title="Step 1: Thematic Focus Questions">1</button>
          <button type="button" class="gcse-ladder-pip ${currentStep === 2 ? 'active' : ''}" data-step="2" title="Step 2: Key Word Bank">2</button>
          <button type="button" class="gcse-ladder-pip ${currentStep === 3 ? 'active' : ''}" data-step="3" title="Step 3: Structured Sentence Starters">3</button>
          <span class="gcse-ladder-tag ${stepTagClass}">
            <i class="${stepIcon}"></i> ${stepLabel}
          </span>
        </div>
      </div>

      <!-- Active Scaffold Drawer Content -->
      ${
        currentStep > 0
          ? `
        <div class="gcse-ladder-drawer">
          <div class="gcse-ladder-drawer-header">
            <div class="gcse-ladder-drawer-title">
              <i class="${stepIcon}" style="color:#2563eb;"></i>
              <span>${stepLabel}</span>
            </div>
            <div style="display:flex;gap:6px;">
              <button type="button" class="btn" id="btn-ladder-next-step" style="background:#eff6ff;color:#1e40af;border:1px solid #bfdbfe;padding:4px 10px;border-radius:6px;font-size:0.75rem;font-weight:700;cursor:pointer;">
                ${currentStep < 3 ? `Advance to Step ${currentStep + 1} <i class="fa-solid fa-arrow-right"></i>` : 'Reset to Independent (0)'}
              </button>
              <button type="button" class="btn" id="btn-ladder-close" style="background:#f8fafc;color:#64748b;border:1px solid #cbd5e1;padding:4px 8px;border-radius:6px;font-size:0.75rem;font-weight:700;cursor:pointer;">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>

          <div class="gcse-ladder-drawer-body">
            <!-- Step 1: Thematic Focus Questions -->
            <div style="margin-bottom:${currentStep > 1 ? '12px' : '0'};">
              <strong style="color:#1e3a8a;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.04em;display:block;margin-bottom:4px;">
                <i class="fa-solid fa-compass"></i> Structural Focus Questions:
              </strong>
              <ul style="margin:0;padding-left:18px;color:#334155;">
                ${ladder.step1_questions.map((q) => `<li style="margin-bottom:4px;">${q}</li>`).join('')}
              </ul>
            </div>

            <!-- Step 2: Word Bank & Chronology Chips -->
            ${
              currentStep >= 2
                ? `
              <div style="margin-bottom:${currentStep > 2 ? '12px' : '0'};padding-top:10px;border-top:1px dashed #e2e8f0;">
                <strong style="color:#92400e;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.04em;display:block;margin-bottom:6px;">
                  <i class="fa-solid fa-puzzle-piece"></i> Key Vocabulary &amp; Chronology Anchors (Click to copy/insert into canvas):
                </strong>
                <div style="display:flex;flex-wrap:wrap;gap:6px;">
                  ${ladder.step2_wordbank
                    .map(
                      (chip) => `
                    <button type="button" class="btn gcse-ladder-chip" data-chip="${escapeHtml(chip)}" style="background:#fffbeb;border:1px solid #fde68a;color:#92400e;padding:3px 8px;border-radius:4px;font-size:0.78rem;font-weight:700;cursor:pointer;">
                      + ${chip}
                    </button>
                  `,
                    )
                    .join('')}
                </div>
              </div>
            `
                : ''
            }

            <!-- Step 3: Sentence Starters & Causal Frames -->
            ${
              currentStep >= 3
                ? `
              <div style="padding-top:10px;border-top:1px dashed #e2e8f0;">
                <strong style="color:#065f46;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.04em;display:block;margin-bottom:6px;">
                  <i class="fa-solid fa-pen-ruler"></i> Structured Historical Sentence Starters:
                </strong>
                <div style="display:flex;flex-direction:column;gap:6px;">
                  ${ladder.step3_starters
                    .map(
                      (starter) => `
                    <div style="display:flex;justify-content:space-between;align-items:center;background:#ecfdf5;border:1px solid #a7f3d0;padding:6px 10px;border-radius:6px;font-size:0.82rem;color:#065f46;">
                      <span>"${starter}"</span>
                      <button type="button" class="btn gcse-ladder-insert-starter" data-starter="${escapeHtml(starter)}" style="background:#059669;color:#ffffff;border:none;padding:2px 8px;border-radius:4px;font-size:0.72rem;font-weight:700;cursor:pointer;white-space:nowrap;margin-left:8px;">
                        Insert
                      </button>
                    </div>
                  `,
                    )
                    .join('')}
                </div>
              </div>
            `
                : ''
            }
          </div>
        </div>
      `
          : ''
      }
    </div>
  `;
}

function renderBlurtActiveSprintHtml(topic, spec) {
  const wordsTotal = countWords(blurtState.text);

  return `
    <div class="gcse-blurt-container gcse-blurt-sprint-active">
      
      <!-- Compact Control Bar (Zero Scroll, Sticky) -->
      <div class="gcse-blurt-timer-bar gcse-blurt-timer-compact">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <span class="gcse-badge-pill" style="background:#1e3a8a;color:#ffffff;border:none;font-size:0.75rem;padding:4px 10px;">
            ${spec ? spec.code : 'Spec'} &bull; ${topic.specCode}
          </span>
          <span style="font-weight:800;font-size:0.95rem;color:#0f172a;">
            ${topic.title}
          </span>
        </div>

        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <!-- Session Mode Pill -->
          <div class="gcse-blurt-mode-pill" style="display:inline-flex;align-items:center;gap:6px;background:#ecfdf5;color:#047857;border:1.5px solid #a7f3d0;padding:5px 12px;border-radius:20px;font-size:0.78rem;font-weight:700;">
            <i class="fa-solid fa-brain"></i> Free Recall Practice &bull; Untimed
          </div>

          <!-- Native Voice Dictation Button -->
          <button type="button" class="btn gcse-blurt-voice-btn" id="btn-blurt-voice-toggle" title="Click to speak aloud into your laptop" style="padding:6px 12px;font-size:0.8rem;">
            <i class="fa-solid fa-microphone"></i>
            <span>Speak</span>
          </button>

          <!-- Exit Practice Button -->
          <button type="button" class="btn" id="btn-blurt-cancel" title="Exit session and return to setup" style="background:#f1f5f9;color:#475569;border:1px solid #cbd5e1;padding:6px 12px;border-radius:6px;font-size:0.8rem;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
            <i class="fa-solid fa-arrow-left"></i> Exit Practice
          </button>

          <!-- Finish Button -->
          <button type="button" class="btn" id="btn-blurt-finish" style="background:linear-gradient(135deg, #10b981 0%, #059669 100%);color:#ffffff;padding:7px 18px;border-radius:6px;font-size:0.84rem;font-weight:700;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 3px 10px rgba(16,185,129,0.3);">
            <i class="fa-solid fa-check-double"></i> Finish &amp; Benchmark Recall
          </button>
        </div>
      </div>

      <!-- Prominent Driving Exam Question Card -->
      <div class="gcse-blurt-question-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;gap:8px;">
          <span style="font-size:0.74rem;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;color:#2563eb;display:inline-flex;align-items:center;gap:6px;">
            <i class="fa-solid fa-bullseye"></i> Target Exam Question:
          </span>
          <div style="display:flex;align-items:center;gap:8px;">
            <button type="button" class="btn" id="btn-blurt-read-question" title="Listen to question read aloud in English" style="background:#ffffff;border:1px solid #bfdbfe;color:#1e40af;padding:2px 8px;border-radius:6px;font-size:0.72rem;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
              <i class="fa-solid fa-volume-high"></i> Read Aloud
            </button>
            <span style="font-size:0.72rem;font-weight:700;color:#047857;background:#ecfdf5;border:1px solid #a7f3d0;padding:2px 8px;border-radius:10px;">
              Active Free Recall
            </span>
          </div>
        </div>
        <h2 class="gcse-blurt-driving-question">
          "${topic.drivingQuestion || topic.title}"
        </h2>
        ${
          topic.stimulus
            ? `
          <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:8px 12px;margin:8px 0;font-size:0.84rem;color:#1e3a8a;">
            <strong style="display:block;margin-bottom:3px;font-size:0.72rem;text-transform:uppercase;letter-spacing:0.04em;color:#2563eb;">
              <i class="fa-solid fa-lightbulb"></i> Official Exam Stimulus Points:
            </strong>
            <div style="white-space:pre-line;line-height:1.45;color:#334155;">${escapeHtml(topic.stimulus)}</div>
          </div>
        `
            : ''
        }
        <div class="gcse-blurt-question-subcue">
          <i class="fa-solid fa-compass" style="color:#3b82f6;margin-right:4px;"></i>
          <strong>Recall Target:</strong> ${topic.pupilPromptCue || topic.prompt}
        </div>
      </div>

      <!-- 3-Step Scaffold Ladder ("🪜 Need a Hint?") -->
      ${renderScaffoldLadderHtml(topic)}

      <!-- Single Unified Memory Canvas (Zero Scroll) -->
      <div class="gcse-blurt-canvas-wrap">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:7px 14px;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-size:0.8rem;color:#64748b;">
          <span><i class="fa-solid fa-pen-nib" style="color:#2563eb;margin-right:5px;"></i><strong>Your Answer Stream:</strong> Free recall from memory</span>
          <div style="display:flex;align-items:center;gap:12px;">
            <span id="blurt-voice-status" style="font-size:0.76rem;color:#64748b;background:#ffffff;padding:2px 8px;border-radius:4px;border:1px solid #e2e8f0;">
              <i class="fa-solid fa-keyboard"></i> Type freely or click Speak
            </span>
            <span id="blurt-canvas-word-count" style="font-weight:800;color:#0f172a;background:#e2e8f0;padding:2px 8px;border-radius:12px;">${wordsTotal} words</span>
          </div>
        </div>

        <!-- One-Click Sentence Starter Pills for Lower-Attaining & Dyslexic Pupils -->
        <div style="display:flex;align-items:center;gap:6px;padding:6px 14px;background:#f1f5f9;border-bottom:1px solid #e2e8f0;flex-wrap:wrap;font-size:0.75rem;">
          <span style="font-weight:800;color:#475569;text-transform:uppercase;letter-spacing:0.04em;">
            <i class="fa-solid fa-wand-magic-sparkles" style="color:#2563eb;"></i> Quick Starters:
          </span>
          ${(
            topic.scaffoldLadder?.step3_starters || [
              'One major factor was',
              'Furthermore, key individuals like',
              'Consequently, this led directly to',
            ]
          )
            .map((starter) => {
              const clean = starter.replace(/\.\.\.$/, '').trim();
              return `
              <button type="button" class="btn gcse-starter-pill" data-starter="${escapeHtml(clean)}" style="background:#ffffff;border:1px solid #cbd5e1;color:#1e3a8a;padding:2px 8px;border-radius:4px;font-size:0.74rem;font-weight:700;cursor:pointer;">
                + "${escapeHtml(clean)}..."
              </button>
            `;
            })
            .join('')}
        </div>
        <textarea id="blurt-input-canvas" class="gcse-blurt-canvas-textarea" placeholder="Start typing your answer to the question above from memory... (or click Speak above for voice dictation).

Include:
• Key dates, named individuals, specific locations
• Essential technical and historical vocabulary
• Causal explanations (why did events occur, what were the consequences?)">${escapeHtml(blurtState.text)}</textarea>
      </div>

    </div>
  `;
}

function renderBlurtFinishedHtml(topic, spec) {
  const totalWords = countWords(blurtState.text);

  const totalDates = topic.benchmark?.dates?.length || 0;
  const totalVocab = topic.benchmark?.vocab?.length || 0;
  const totalIndicative = topic.indicativeContent?.length || 0;

  let totalItems = 0;
  let verifiedTargets = 0;

  if (topic.isPastPaperQuestion && totalIndicative > 0) {
    totalItems = totalIndicative;
    topic.indicativeContent.forEach((_, idx) => {
      if (blurtState.checkedItems[`indicative_${idx}`]) verifiedTargets++;
    });
  } else {
    totalItems = totalDates + totalVocab;
    topic.benchmark?.dates?.forEach((_, idx) => {
      if (blurtState.checkedItems[`date_${idx}`]) verifiedTargets++;
    });
    topic.benchmark?.vocab?.forEach((_, idx) => {
      if (blurtState.checkedItems[`vocab_${idx}`]) verifiedTargets++;
    });
  }

  const recalledCount = verifiedTargets + (blurtState.widerCredits || 0);
  const retrievalPercent =
    totalItems > 0 ? Math.min(100, Math.round((recalledCount / totalItems) * 100)) : 0;

  let scoreColor = '#ef4444';
  if (retrievalPercent >= 80) {
    scoreColor = '#10b981';
  } else if (retrievalPercent >= 40) {
    scoreColor = '#f59e0b';
  }

  // Assistance Level Tag
  let assistanceBadge =
    '<span class="gcse-badge-pill" style="background:rgba(16,185,129,0.2);border:1px solid rgba(52,211,153,0.4);color:#6ee7b7;"><i class="fa-solid fa-medal"></i> 100% Independent (Gold Standard)</span>';
  if (blurtState.ladderStep === 1) {
    assistanceBadge =
      '<span class="gcse-badge-pill" style="background:rgba(59,130,246,0.2);border:1px solid rgba(96,165,250,0.4);color:#93c5fd;"><i class="fa-solid fa-lightbulb"></i> Step 1: Questions Guided</span>';
  } else if (blurtState.ladderStep === 2) {
    assistanceBadge =
      '<span class="gcse-badge-pill" style="background:rgba(245,158,11,0.2);border:1px solid rgba(251,191,36,0.4);color:#fde68a;"><i class="fa-solid fa-puzzle-piece"></i> Step 2: Word Bank Supported</span>';
  } else if (blurtState.ladderStep === 3) {
    assistanceBadge =
      '<span class="gcse-badge-pill" style="background:rgba(168,85,247,0.2);border:1px solid rgba(192,132,252,0.4);color:#e9d5ff;"><i class="fa-solid fa-pen-ruler"></i> Step 3: Sentence Starters Supported</span>';
  }

  const isPaper1SecA = topic.paperType === 'paper1_sec_a' || topic.topicId?.includes('_wf_');

  return `
    <div class="gcse-blurt-container">
      
      <!-- Top Success & Stats Banner -->
      <div style="background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%);border-radius:12px;padding:20px 24px;color:#ffffff;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
        <div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;">
            <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(16,185,129,0.2);border:1px solid rgba(52,211,153,0.4);color:#6ee7b7;padding:3px 10px;border-radius:20px;font-size:0.75rem;font-weight:800;text-transform:uppercase;">
              <i class="fa-solid fa-circle-check"></i> Active Free Recall Complete
            </div>
            ${assistanceBadge}
          </div>
          <h2 style="margin:4px 0 2px;font-family:'Playfair Display',serif;font-size:1.6rem;color:#ffffff;">
            ${topic.title}
          </h2>
          <span style="font-size:0.85rem;color:#94a3b8;">
            ${spec ? spec.shortTitle : ''} &bull; ${topic.specCode} &bull; <strong>${totalWords}</strong> words retrieved
          </span>
        </div>

        <!-- Live Retrieval Score Pill -->
        <div style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:10px;padding:12px 18px;text-align:right;">
          <div style="font-size:0.72rem;text-transform:uppercase;color:#cbd5e1;font-weight:700;">Retrieval Accuracy Score</div>
          <div style="font-size:1.6rem;font-weight:900;color:${scoreColor};font-family:'Outfit',sans-serif;" id="blurt-score-percentage">
            ${retrievalPercent}%
          </div>
          <div style="font-size:0.78rem;color:#cbd5e1;" id="blurt-score-counter">
            <strong>${recalledCount}</strong> of <strong>${totalItems}</strong> targets verified
            ${blurtState.widerCredits > 0 ? `<span style="display:block;color:#6ee7b7;font-size:0.72rem;font-weight:700;">(+${blurtState.widerCredits} wider knowledge credited)</span>` : ''}
          </div>
        </div>
      </div>

      <!-- Sync to Specification Tracker Card -->
      <div class="gcse-blurt-sync-card" style="background:#ffffff;border:1.5px solid #cbd5e1;border-radius:12px;padding:18px 20px;margin-bottom:20px;box-shadow:0 4px 15px rgba(0,0,0,0.04);">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
          <div>
            <div style="font-size:0.78rem;font-weight:800;text-transform:uppercase;color:#1e3a8a;margin-bottom:2px;letter-spacing:0.05em;">
              One-Click Specification Tracker Synchronization:
            </div>
            <p style="margin:0;font-size:0.88rem;color:#475569;">
              Based on your self-assessment, update this topic's status in your Master Specification Tracker:
            </p>
          </div>

          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <button type="button" class="btn" id="btn-blurt-sync-green" style="background:#10b981;color:#ffffff;padding:9px 16px;border-radius:8px;font-weight:700;font-size:0.84rem;cursor:pointer;border:none;display:inline-flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(16,185,129,0.3);">
              <i class="fa-solid fa-circle-check"></i> Mastered (Green)
            </button>
            <button type="button" class="btn" id="btn-blurt-sync-amber" style="background:#f59e0b;color:#ffffff;padding:9px 16px;border-radius:8px;font-weight:700;font-size:0.84rem;cursor:pointer;border:none;display:inline-flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(245,158,11,0.3);">
              <i class="fa-solid fa-triangle-exclamation"></i> Revising (Amber)
            </button>
            <button type="button" class="btn" id="btn-blurt-sync-red" style="background:#ef4444;color:#ffffff;padding:9px 16px;border-radius:8px;font-weight:700;font-size:0.84rem;cursor:pointer;border:none;display:inline-flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(239,68,68,0.3);">
              <i class="fa-solid fa-circle-exclamation"></i> Priority Gap (Red)
            </button>
          </div>
        </div>

        ${
          blurtState.lastSyncFeedback
            ? `
          <div style="margin-top:12px;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:6px;padding:8px 12px;font-size:0.84rem;color:#065f46;display:flex;align-items:center;gap:8px;">
            <i class="fa-solid fa-check-circle"></i>
            <span><strong>Specification Tracker Updated:</strong> Marked as <strong>${blurtState.lastSyncFeedback.color.toUpperCase()}</strong>! Overall GCSE readiness updated to <strong>${blurtState.lastSyncFeedback.readiness}%</strong>.</span>
          </div>
        `
            : ''
        }
      </div>

      <!-- Driving Exam Question Evaluated -->
      <div style="background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:10px;padding:14px 18px;margin-bottom:16px;">
        <div style="font-size:0.75rem;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;color:#1e40af;margin-bottom:4px;display:flex;align-items:center;gap:6px;">
          <i class="fa-solid fa-bullseye"></i> Exam Question Evaluated:
        </div>
        <div style="font-family:'Lora',serif;font-size:1.15rem;font-weight:700;color:#0f172a;line-height:1.4;">
          "${topic.drivingQuestion || topic.title}"
        </div>
      </div>

      <!-- Distinct Exam Paper Mission Guidance Banner -->
      ${renderExamMissionBanner(topic)}

      <!-- Thematic Causation Clusters Section (Automated Semantic Scan) -->
      ${
        blurtState.clusterResults && blurtState.clusterResults.length > 0
          ? `
        <div class="gcse-clusters-section">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;flex-wrap:wrap;gap:8px;">
            <h4 style="margin:0;font-size:0.95rem;color:#0f172a;display:flex;align-items:center;gap:8px;">
              <i class="fa-solid fa-network-wired" style="color:#2563eb;"></i>
              Thematic Causation Clusters (Automated Semantic Scan)
            </h4>
            <span style="font-size:0.75rem;background:#eff6ff;color:#1e40af;padding:2px 8px;border-radius:12px;font-weight:800;">
              ${blurtState.clusterResults.filter((c) => c.matched).length} of ${blurtState.clusterResults.length} Dimensions Evidenced
            </span>
          </div>
          <p style="margin:0 0 12px 0;font-size:0.82rem;color:#64748b;line-height:1.45;">
            Pearson Edexcel examiners award top marks for multi-causal historical analysis. These thematic clusters evaluate whether your memory sprint touched upon the key structural dimensions:
          </p>
          <div class="gcse-clusters-grid">
            ${blurtState.clusterResults
              .map(
                (cluster) => `
              <div class="gcse-cluster-card ${cluster.matched ? 'credited' : 'uncredited'}">
                <div class="gcse-cluster-title">
                  <span>${cluster.name}</span>
                  <span style="font-size:0.72rem;padding:2px 8px;border-radius:4px;font-weight:800;background:${cluster.matched ? '#d1fae5' : '#f1f5f9'};color:${cluster.matched ? '#065f46' : '#64748b'};">
                    ${cluster.matched ? '✓ Factor Credited' : '○ Not Evidenced'}
                  </span>
                </div>
                <div class="gcse-cluster-desc">${cluster.description}</div>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>
      `
          : ''
      }

      <!-- Valid Historical Knowledge Beyond the Standard Checklist -->
      <div class="gcse-wider-knowledge-card">
        <div class="gcse-wider-header">
          <div style="flex:1;min-width:280px;">
            <div style="font-size:0.78rem;font-weight:800;text-transform:uppercase;color:#2563eb;letter-spacing:0.05em;margin-bottom:2px;">
              <i class="fa-solid fa-graduation-cap"></i> Credit Valid Wider Historical Knowledge
            </div>
            <p style="margin:0;font-size:0.86rem;color:#334155;line-height:1.45;">
              Did you retrieve accurate historical facts, statistics, or named figures not in the checklist above? Edexcel examiners credit <strong>any valid, accurate historical evidence</strong>.
            </p>
            ${
              topic.widerKnowledgeExamples
                ? `
              <div style="margin-top:6px;font-size:0.78rem;color:#475569;background:#f8fafc;padding:6px 10px;border-radius:6px;border:1px solid #e2e8f0;">
                <strong>Examples of Valid Wider Knowledge:</strong> ${topic.widerKnowledgeExamples}
              </div>
            `
                : ''
            }
          </div>

          <div style="display:flex;align-items:center;gap:10px;">
            <button type="button" class="gcse-extra-credit-btn" id="btn-add-wider-credit">
              <i class="fa-solid fa-plus-circle"></i> + Credit 1 Wider Detail
            </button>
            ${
              blurtState.widerCredits > 0
                ? `
              <button type="button" class="btn" id="btn-reset-wider-credit" style="background:#f1f5f9;color:#64748b;border:1px solid #cbd5e1;padding:7px 12px;border-radius:6px;font-size:0.78rem;font-weight:700;cursor:pointer;">
                Reset (+${blurtState.widerCredits})
              </button>
            `
                : ''
            }
          </div>
        </div>

        ${
          blurtState.widerCredits > 0
            ? `
          <div class="gcse-wider-active-pill">
            <i class="fa-solid fa-circle-check" style="color:#2563eb;"></i>
            <span><strong>${blurtState.widerCredits} Additional Historical Detail${blurtState.widerCredits > 1 ? 's' : ''} Credited!</strong> Score adjusted automatically in real time.</span>
          </div>
        `
            : ''
        }
      </div>

      <!-- Side-by-Side Dual Column Grid -->
      <div class="gcse-blurt-compare-grid">
        
        <!-- Left Column: What You Retrieved -->
        <div class="gcse-blurt-student-col">
          <div class="gcse-blurt-col-header" style="justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:8px;">
              <i class="fa-solid fa-user-pen" style="color:#2563eb;"></i>
              <h3>What You Retrieved (${totalWords} words)</h3>
            </div>
            <span style="font-size:0.75rem;background:#eff6ff;color:#1e40af;padding:2px 8px;border-radius:4px;font-weight:700;">Raw Memory Stream</span>
          </div>

          <div class="gcse-blurt-retrieved-box" style="border-left:4px solid #2563eb;min-height:360px;background:#ffffff;padding:16px;">
            <div class="gcse-blurt-retrieved-content" style="font-family:'Lora',serif;font-size:1rem;color:#0f172a;line-height:1.7;white-space:pre-wrap;">${blurtState.text.trim() ? escapeHtml(blurtState.text) : '<em style="color:#94a3b8;">Nothing written or recorded during this sprint.</em>'}</div>
          </div>
        </div>

        <!-- Right Column: Pearson Verbatim Benchmark Model -->
        <div class="gcse-blurt-benchmark-col">
          <div class="gcse-blurt-col-header" style="justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:8px;">
              <i class="fa-solid fa-award" style="color:#10b981;"></i>
              <h3>${topic.isPastPaperQuestion ? 'Official Pearson Mark Scheme Model' : 'Pearson Verbatim Benchmark Model'}</h3>
            </div>
            <span style="font-size:0.75rem;color:#64748b;font-weight:600;">Tick items you recalled</span>
          </div>

          ${
            topic.indicativeContent && topic.indicativeContent.length > 0
              ? `
            <!-- Official Pearson Mark Scheme Indicative Content Checklist -->
            <div class="gcse-blurt-model-box" style="border-left:4px solid #10b981;background:#f0fdf4;border-color:#bbf7d0;">
              <div class="gcse-blurt-model-title" style="color:#065f46;display:flex;justify-content:space-between;align-items:center;">
                <span><i class="fa-solid fa-list-check"></i> Official Mark Scheme Indicative Content (${topic.indicativeContent.length} Targets)</span>
                <span style="font-size:0.72rem;background:#d1fae5;color:#047857;padding:2px 8px;border-radius:4px;font-weight:700;">
                  ${topic.tariff ? topic.tariff + ' Marks' : 'Official Mark Scheme'}
                </span>
              </div>
              <p style="margin:4px 0 10px 0;font-size:0.8rem;color:#065f46;line-height:1.4;">
                Pearson examiners award marks for accurate historical knowledge and reasoning matching the indicative content below:
              </p>
              <div class="gcse-blurt-checklist">
                ${topic.indicativeContent
                  .map((point, idx) => {
                    const key = `indicative_${idx}`;
                    const isChecked = !!blurtState.checkedItems[key];
                    return `
                    <label class="gcse-blurt-check-item ${isChecked ? 'checked' : ''}" data-key="${key}" style="background:#ffffff;border:1px solid ${isChecked ? '#10b981' : '#dcfce7'};margin-bottom:6px;">
                      <input type="checkbox" class="blurt-check-input" data-key="${key}" ${isChecked ? 'checked' : ''}>
                      <div style="font-size:0.88rem;color:#1e293b;line-height:1.45;">
                        <strong style="color:#047857;">Point ${idx + 1}:</strong> ${escapeHtml(point)}
                      </div>
                    </label>
                  `;
                  })
                  .join('')}
              </div>
            </div>
          `
              : ''
          }

          ${
            topic.examinerTips
              ? `
            <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:12px;margin-bottom:12px;">
              <div style="font-weight:800;font-size:0.82rem;color:#92400e;display:flex;align-items:center;gap:6px;margin-bottom:4px;">
                <i class="fa-solid fa-graduation-cap"></i> Official Examiner Guidance &amp; Tips
              </div>
              <p style="margin:0;font-size:0.82rem;color:#78350f;line-height:1.45;">
                ${escapeHtml(topic.examinerTips)}
              </p>
            </div>
          `
              : ''
          }

          ${
            topic.benchmark?.dates?.length > 0
              ? `
            <!-- Section 1: Dates & Turning Points Checklist -->
            <div class="gcse-blurt-model-box">
              <div class="gcse-blurt-model-title">
                <span>📅 Chronological Milestones to Verify (${topic.benchmark.dates.length} Targets)</span>
              </div>
              <div class="gcse-blurt-checklist">
                ${topic.benchmark.dates
                  .map((d, idx) => {
                    const key = `date_${idx}`;
                    const isChecked = !!blurtState.checkedItems[key];
                    return `
                    <label class="gcse-blurt-check-item ${isChecked ? 'checked' : ''}" data-key="${key}">
                      <input type="checkbox" class="blurt-check-input" data-key="${key}" ${isChecked ? 'checked' : ''}>
                      <div>
                        <strong style="color:#b45309;font-size:0.9rem;">${d.date}</strong> &bull; ${d.label}
                      </div>
                    </label>
                  `;
                  })
                  .join('')}
              </div>
            </div>
          `
              : ''
          }

          ${
            topic.benchmark?.vocab?.length > 0
              ? `
            <!-- Section 2: Technical Vocabulary & Figures Checklist -->
            <div class="gcse-blurt-model-box">
              <div class="gcse-blurt-model-title">
                <span>🏷️ Tier-3 Terms &amp; Key Figures (${topic.benchmark.vocab.length} Targets)</span>
              </div>
              <div class="gcse-blurt-checklist">
                ${topic.benchmark.vocab
                  .map((v, idx) => {
                    const key = `vocab_${idx}`;
                    const isChecked = !!blurtState.checkedItems[key];
                    return `
                    <label class="gcse-blurt-check-item ${isChecked ? 'checked' : ''}" data-key="${key}">
                      <input type="checkbox" class="blurt-check-input" data-key="${key}" ${isChecked ? 'checked' : ''}>
                      <div>
                        <strong style="color:#047857;font-size:0.9rem;">${v.term}:</strong> ${v.meaning}
                      </div>
                    </label>
                  `;
                  })
                  .join('')}
              </div>
            </div>
          `
              : ''
          }

          ${
            topic.benchmark?.mechanisms?.length > 0
              ? `
            <!-- Section 3: Core Causal Mechanisms -->
            <div class="gcse-blurt-model-box" style="border-left:4px solid #6366f1;">
              <div class="gcse-blurt-model-title" style="color:#4338ca;">
                <i class="fa-solid fa-gears"></i> Core Causal Mechanisms (Why &amp; How)
              </div>
              <ul style="margin:6px 0;padding-left:18px;font-size:0.85rem;color:#334155;line-height:1.5;">
                ${topic.benchmark.mechanisms
                  .map(
                    (m) => `
                  <li style="margin-bottom:6px;">${m}</li>
                `,
                  )
                  .join('')}
              </ul>
            </div>
          `
              : ''
          }

          ${
            topic.benchmark?.examinerTip && !topic.examinerTips
              ? `
            <!-- Section 4: Examiner Trap & Grade 9 Nuance Callout -->
            <div style="background:#fff1f2;border:1px solid #fecdd3;border-radius:8px;padding:12px;margin-top:12px;">
              <div style="font-weight:800;font-size:0.82rem;color:#be123c;display:flex;align-items:center;gap:6px;margin-bottom:4px;">
                <i class="fa-solid fa-triangle-exclamation"></i> Examiner Distinction Note &amp; Common Trap
              </div>
              <p style="margin:0;font-size:0.82rem;color:#9f1239;line-height:1.45;">
                ${topic.benchmark.examinerTip}
              </p>
            </div>
          `
              : ''
          }

        </div>

      </div>

      <!-- Action Footer -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:24px;flex-wrap:wrap;gap:10px;">
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button type="button" class="btn" id="btn-blurt-restart" style="background:#f1f5f9;color:#334155;border:1px solid #cbd5e1;padding:10px 18px;border-radius:8px;font-weight:700;font-size:0.86rem;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
            <i class="fa-solid fa-rotate-left"></i> Re-Blurt This Topic
          </button>
          <button type="button" class="btn" id="btn-blurt-change-topic" style="background:#ffffff;color:#1e3a8a;border:1.5px solid #93c5fd;padding:10px 18px;border-radius:8px;font-weight:700;font-size:0.86rem;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
            <i class="fa-solid fa-layer-group"></i> Change Paper / Topic
          </button>
          ${
            isPaper1SecA
              ? `
            <button type="button" class="btn" id="btn-open-wf-modal-footer" style="background:#0f172a;color:#ffffff;border:none;padding:10px 18px;border-radius:8px;font-weight:700;font-size:0.86rem;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
              <i class="fa-solid fa-book-medical"></i> Browse All 40 Western Front Features
            </button>
          `
              : ''
          }
        </div>

        <div style="display:flex;gap:10px;">
          <button type="button" class="btn" id="btn-blurt-print" style="background:#ffffff;color:#1e3a8a;border:1.5px solid #1e3a8a;padding:10px 18px;border-radius:8px;font-weight:700;font-size:0.86rem;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
            <i class="fa-solid fa-print"></i> Print 1-Page Workout
          </button>
          <button type="button" class="btn" id="btn-blurt-next-topic" style="background:#2563eb;color:#ffffff;padding:10px 22px;border-radius:8px;font-weight:700;font-size:0.86rem;cursor:pointer;border:none;display:inline-flex;align-items:center;gap:6px;box-shadow:0 4px 12px rgba(37,99,235,0.3);">
            Next Topic <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <!-- Printable 1-Page Workout Template (Rendered for Print) -->
      ${renderBlurtPrintWorkoutHtml(topic, spec)}

    </div>
  `;
}

function renderBlurtPrintWorkoutHtml(topic, spec) {
  return `
    <div class="gcse-print-only gcse-blurt-print-workout">
      
      <!-- Top Reprographic Header -->
      <div class="gcse-blurt-print-header">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #0f172a;padding-bottom:6px;margin-bottom:8px;">
          <div>
            <div style="font-size:12pt;font-weight:900;color:#1e3a8a;letter-spacing:0.04em;">THE HISTORY REVISION HUB</div>
            <div style="font-size:8.5pt;font-weight:700;color:#64748b;">Pearson Edexcel GCSE (9–1) in History &bull; Active Recall Practice Sheet</div>
          </div>
          <div style="text-align:right;">
            <span style="font-size:8pt;font-weight:800;background:#e2e8f0;padding:2px 8px;border-radius:4px;color:#0f172a;">
              ACTIVE RECALL WORKOUT &bull; UNTIMED PRACTICE
            </span>
          </div>
        </div>

        <h1 style="font-size:15pt;margin:4px 0 2px;font-family:'Playfair Display',serif;color:#0f172a;">
          ${topic.title}
        </h1>
        <div style="font-size:8.5pt;color:#334155;margin-bottom:8px;">
          <strong>Paper:</strong> ${spec ? spec.shortTitle : ''} &bull; <strong>Specification Reference:</strong> ${topic.specCode}
        </div>

        <!-- Student Identification Meta Box -->
        <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:12px;background:#f8fafc;border:1px solid #cbd5e1;padding:5px 10px;font-size:8.5pt;margin-bottom:10px;">
          <div><strong>Candidate Name:</strong> ____________________________________</div>
          <div><strong>Class/Set:</strong> _____________</div>
          <div><strong>Date:</strong> _________________</div>
        </div>
      </div>

      <!-- Focus Prompt Ribbon -->
      <div style="background:#f1f5f9;border:1px solid #cbd5e1;border-radius:6px;padding:5px 10px;font-size:8pt;margin-bottom:8px;display:flex;justify-content:space-between;">
        <span><strong>MEMORY FOCUS:</strong> 📅 Dates &amp; Turning Points</span>
        <span>🏷️ Key Figures &amp; Tier-3 Vocab</span>
        <span>⚙️ Causes, Impact &amp; Why/How</span>
      </div>

      <!-- Single Unified Ruled Writing Canvas -->
      <div style="margin-bottom:10px;border:1.5px solid #0f172a;border-radius:6px;padding:8px 10px;">
        <div style="font-weight:800;font-size:8.5pt;color:#0f172a;margin-bottom:6px;display:flex;justify-content:space-between;">
          <span>ACTIVE RECALL MEMORY STREAM (UNCONSTRAINED BLURT)</span>
          <span>Target: 50+ Key Words</span>
        </div>
        <div style="height:340px;background-image:linear-gradient(#cbd5e1 1px, transparent 1px);background-size:100% 20px;line-height:20px;"></div>
      </div>

      <!-- Marking & Self-Assessment Rubric -->
      <div style="border:1px solid #94a3b8;border-radius:6px;padding:6px 8px;font-size:8pt;background:#f8fafc;">
        <div style="font-weight:800;color:#0f172a;margin-bottom:4px;display:flex;justify-content:space-between;">
          <span>PEARSON BENCHMARK VERIFICATION TARGETS:</span>
          <span>RETRIEVAL SCORE: _____ / ${topic.benchmark.dates.length + topic.benchmark.vocab.length} (____%)</span>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:4px;">
          <div>
            <strong>Target Dates:</strong> ${topic.benchmark.dates.map((d) => d.date).join(', ')}
          </div>
          <div>
            <strong>Target Vocab:</strong> ${topic.benchmark.vocab.map((v) => v.term).join(', ')}
          </div>
        </div>
        <div style="border-top:1px dashed #cbd5e1;padding-top:4px;display:flex;justify-content:space-between;align-items:center;">
          <span><strong>RAG Outcome:</strong> [ ] 🟢 Mastered (80%+) &nbsp; [ ] 🟡 Revising (40–79%) &nbsp; [ ] 🔴 Priority Gap (&lt;40%)</span>
          <span>Sign-off: ________________________</span>
        </div>
      </div>

    </div>
  `;
}

// ==========================================================================
// Western Front 40-Features Master Database Modal
// ==========================================================================
let wfModalState = {
  activeCategory: 'all',
  searchQuery: '',
};

function openWesternFrontModal() {
  const existing = document.getElementById('gcse-wf-modal');
  if (existing) existing.remove();

  const categories = [
    { label: 'All (40)', key: 'all' },
    { label: 'Battles & Topography', key: 'Battles & Topography' },
    { label: 'Trench Architecture', key: 'Trench Architecture' },
    { label: 'Conditions & Trauma', key: 'Conditions & Battlefield Trauma' },
    { label: 'Evacuation Chain', key: 'Evacuation Chain & Transport' },
    { label: 'Surgery & Innovations', key: 'Surgery & Medical Innovations' },
  ];

  const modalHtml = `
    <div class="gcse-wf-modal-backdrop" id="gcse-wf-modal">
      <div class="gcse-wf-modal-content">
        <div class="gcse-wf-modal-header">
          <div>
            <div style="font-size:0.75rem;font-weight:800;text-transform:uppercase;color:#93c5fd;letter-spacing:0.06em;">
              Pearson Edexcel GCSE History &bull; Paper 1 Section A Historic Environment
            </div>
            <h3 style="margin:2px 0 0;font-family:'Playfair Display',serif;font-size:1.35rem;color:#ffffff;">
              Master 2-Mark Features Database (40 Essential Topics)
            </h3>
            <p style="margin:2px 0 0;font-size:0.82rem;color:#cbd5e1;">
              Exam Stem: <em>"Describe one feature of [Topic]..."</em> [2 marks] &bull; Award 1 mark for valid feature + 1 mark for specific factual detail.
            </p>
          </div>
          <button type="button" id="btn-close-wf-modal" style="background:none;border:none;font-size:1.4rem;color:#cbd5e1;cursor:pointer;">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div style="background:#f1f5f9;border-bottom:1px solid #e2e8f0;padding:12px 24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
          <!-- Category Tabs -->
          <div style="display:flex;gap:6px;flex-wrap:wrap;" id="wf-modal-cats">
            ${categories
              .map((cat) => {
                const isActive = wfModalState.activeCategory === cat.key;
                return `
                <button type="button" class="btn gcse-wf-cat-btn" data-cat="${cat.key}" style="padding:5px 10px;border-radius:6px;font-size:0.75rem;font-weight:700;cursor:pointer;border:1px solid ${isActive ? '#1e3a8a' : '#cbd5e1'};background:${isActive ? '#1e3a8a' : '#ffffff'};color:${isActive ? '#ffffff' : '#334155'};">
                  ${cat.label}
                </button>
              `;
              })
              .join('')}
          </div>

          <!-- Search Input -->
          <div style="min-width:240px;position:relative;">
            <i class="fa-solid fa-magnifying-glass" style="position:absolute;left:10px;top:50%;transform:translateY(-50%);color:#94a3b8;font-size:0.8rem;"></i>
            <input type="text" id="wf-features-search" placeholder="Search 40 features (e.g. Thomas Splint, Arras, Gangrene)..." value="${escapeHtml(wfModalState.searchQuery)}" style="width:100%;padding:6px 10px 6px 30px;border-radius:6px;border:1px solid #cbd5e1;font-size:0.82rem;background:#ffffff;">
          </div>
        </div>

        <div class="gcse-wf-modal-body" id="wf-modal-features-list">
          ${renderWfFeaturesListHtml()}
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  // Bind close events
  const modal = document.getElementById('gcse-wf-modal');
  const closeModal = () => modal && modal.remove();
  const btnClose = document.getElementById('btn-close-wf-modal');
  if (btnClose) btnClose.onclick = closeModal;
  if (modal) {
    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };
  }

  // Category filter
  modal.querySelectorAll('.gcse-wf-cat-btn').forEach((btn) => {
    btn.onclick = () => {
      wfModalState.activeCategory = btn.getAttribute('data-cat');
      modal.querySelectorAll('.gcse-wf-cat-btn').forEach((b) => {
        const isAct = b.getAttribute('data-cat') === wfModalState.activeCategory;
        b.style.background = isAct ? '#1e3a8a' : '#ffffff';
        b.style.color = isAct ? '#ffffff' : '#334155';
        b.style.borderColor = isAct ? '#1e3a8a' : '#cbd5e1';
      });
      const listEl = document.getElementById('wf-modal-features-list');
      if (listEl) listEl.innerHTML = renderWfFeaturesListHtml();
      bindWfFeatureCardActions(closeModal);
    };
  });

  // Search filter
  const searchInput = document.getElementById('wf-features-search');
  if (searchInput) {
    searchInput.oninput = (e) => {
      wfModalState.searchQuery = e.target.value.toLowerCase();
      const listEl = document.getElementById('wf-modal-features-list');
      if (listEl) listEl.innerHTML = renderWfFeaturesListHtml();
      bindWfFeatureCardActions(closeModal);
    };
  }

  bindWfFeatureCardActions(closeModal);
}

function renderWfFeaturesListHtml() {
  const filtered = WESTERN_FRONT_FEATURES_DATABASE.filter((item) => {
    const matchCat =
      wfModalState.activeCategory === 'all' || item.category === wfModalState.activeCategory;
    if (!matchCat) return false;

    if (!wfModalState.searchQuery) return true;
    const q = wfModalState.searchQuery;
    return (
      item.topic.toLowerCase().includes(q) ||
      item.feature1.text.toLowerCase().includes(q) ||
      item.feature1.heading.toLowerCase().includes(q) ||
      item.feature2.text.toLowerCase().includes(q) ||
      item.feature2.heading.toLowerCase().includes(q) ||
      (item.keywords && item.keywords.some((k) => k.toLowerCase().includes(q)))
    );
  });

  if (filtered.length === 0) {
    return `
      <div style="text-align:center;padding:40px;color:#64748b;">
        <i class="fa-solid fa-circle-question fa-2x" style="color:#94a3b8;margin-bottom:8px;"></i>
        <p style="margin:0;font-size:0.92rem;">No Western Front features matching your search or category filter.</p>
      </div>
    `;
  }

  return filtered
    .map(
      (item) => `
    <div class="gcse-wf-feature-card" data-wf-id="${item.id}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;flex-wrap:wrap;gap:8px;">
        <div>
          <span style="font-size:0.72rem;background:#e0e7ff;color:#3730a3;padding:2px 8px;border-radius:4px;font-weight:800;text-transform:uppercase;">
            ${item.category}
          </span>
          <h4 style="margin:4px 0 0;font-size:1.05rem;color:#0f172a;font-family:'Playfair Display',serif;">
            ${item.topic}
          </h4>
        </div>
        <button type="button" class="btn btn-wf-practice" data-id="${item.id}" style="background:#eff6ff;color:#1e40af;border:1px solid #bfdbfe;padding:4px 10px;border-radius:6px;font-size:0.75rem;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
          <i class="fa-solid fa-pen-nib"></i> Practice in Blurt Engine
        </button>
      </div>

      <div style="font-size:0.8rem;color:#64748b;margin-bottom:10px;background:#ffffff;padding:6px 10px;border-radius:6px;border:1px solid #e2e8f0;">
        <strong>Official Pearson Question Stem:</strong> <em>"${item.question}"</em> [2 marks]
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <!-- Feature 1 -->
        <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;padding:10px 12px;border-left:3px solid #2563eb;">
          <div style="font-weight:800;font-size:0.78rem;color:#1e3a8a;margin-bottom:4px;display:flex;justify-content:space-between;">
            <span>FEATURE 1: ${item.feature1.heading}</span>
            <span style="background:#eff6ff;color:#1e40af;padding:1px 6px;border-radius:3px;font-size:0.7rem;">2 Marks</span>
          </div>
          <div style="font-size:0.82rem;color:#334155;line-height:1.45;">
            ${item.feature1.text}
          </div>
        </div>

        <!-- Feature 2 -->
        <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:6px;padding:10px 12px;border-left:3px solid #10b981;">
          <div style="font-weight:800;font-size:0.78rem;color:#065f46;margin-bottom:4px;display:flex;justify-content:space-between;">
            <span>FEATURE 2: ${item.feature2.heading}</span>
            <span style="background:#ecfdf5;color:#047857;padding:1px 6px;border-radius:3px;font-size:0.7rem;">2 Marks</span>
          </div>
          <div style="font-size:0.82rem;color:#334155;line-height:1.45;">
            ${item.feature2.text}
          </div>
        </div>
      </div>
    </div>
  `,
    )
    .join('');
}

function bindWfFeatureCardActions(closeModal) {
  document.querySelectorAll('.btn-wf-practice').forEach((btn) => {
    btn.onclick = () => {
      closeModal();
      blurtState.selectedPaper = 'paper1_11_medicine_britain';
      blurtState.selectedTopicId = 'med_wf_q1_battles_terrain';
      resetBlurtSession();
    };
  });
}

// ==========================================================================
// TAB 5: Diagnostic Retrieval Sprint (Rapid-Fire Quiz)
// ==========================================================================
function renderSprintTabHtml() {
  if (!sprintState.active && !sprintState.isFinished) {
    return `
      <div class="gcse-sprint-container">
        <div class="gcse-sprint-card" style="text-align:center;">
          <div style="display:inline-flex;align-items:center;justify-content:center;width:64px;height:64px;border-radius:50%;background:#eff6ff;color:#2563eb;font-size:1.8rem;margin-bottom:14px;">
            <i class="fa-solid fa-bolt"></i>
          </div>
          <h2 style="font-family:'Playfair Display',serif;margin:0 0 8px 0;font-size:1.6rem;color:#0f172a;">
            Diagnostic Retrieval Sprint
          </h2>
          <p style="color:#64748b;font-size:0.95rem;max-width:560px;margin:0 auto 24px;line-height:1.5;">
            Rapid-fire 10-question spaced retrieval drill. Tests high-yield facts, dates, individuals, and causal mechanisms across your 4 GCSE papers, prioritizing topics you have audited as Red or Amber.
          </p>

          <div style="display:inline-flex;gap:12px;margin-bottom:24px;">
            <button type="button" class="btn" id="btn-start-sprint" style="background:#2563eb;color:#ffffff;padding:12px 28px;border-radius:8px;font-weight:700;font-size:0.95rem;cursor:pointer;display:inline-flex;align-items:center;gap:8px;box-shadow:0 4px 12px rgba(37,99,235,0.3);">
              <i class="fa-solid fa-play"></i> Start 10-Question Sprint
            </button>
          </div>
        </div>
      </div>
    `;
  }

  if (sprintState.isFinished) {
    const pct = Math.round((sprintState.score / sprintState.questions.length) * 100);
    return `
      <div class="gcse-sprint-container">
        <div class="gcse-sprint-card" style="text-align:center;">
          <div style="display:inline-flex;align-items:center;justify-content:center;width:72px;height:72px;border-radius:50%;background:${pct >= 70 ? '#ecfdf5' : '#fffbeb'};color:${pct >= 70 ? '#10b981' : '#f59e0b'};font-size:2rem;margin-bottom:14px;">
            <i class="fa-solid ${pct >= 70 ? 'fa-award' : 'fa-chart-line'}"></i>
          </div>
          <h2 style="font-family:'Playfair Display',serif;margin:0 0 8px 0;font-size:1.6rem;color:#0f172a;">
            Sprint Complete!
          </h2>
          <div style="font-size:2.4rem;font-weight:800;color:#0f172a;margin-bottom:4px;">
            ${sprintState.score} / ${sprintState.questions.length}
          </div>
          <div style="font-size:1rem;font-weight:700;color:${pct >= 70 ? '#059669' : '#d97706'};margin-bottom:20px;">
            ${pct}% &bull; ${pct >= 80 ? 'Grade 8/9 Examiner Standard' : pct >= 60 ? 'Grade 6/7 Strong Standard' : 'Reinforcement Needed'}
          </div>

          <div style="display:flex;justify-content:center;gap:12px;margin-bottom:28px;">
            <button type="button" class="btn" id="btn-restart-sprint" style="background:#2563eb;color:#ffffff;padding:10px 20px;border-radius:8px;font-weight:700;font-size:0.9rem;cursor:pointer;">
              <i class="fa-solid fa-rotate-right"></i> Sprint Again
            </button>
            <button type="button" class="btn" id="btn-return-audit" style="background:#f1f5f9;color:#334155;border:1px solid #cbd5e1;padding:10px 20px;border-radius:8px;font-weight:700;font-size:0.9rem;cursor:pointer;">
              Back to Audit Matrix
            </button>
          </div>

          <div style="text-align:left;border-top:1.5px solid #e2e8f0;padding-top:20px;">
            <h4 style="margin:0 0 12px 0;color:#0f172a;">Question Review &amp; Retrieval Anchors:</h4>
            ${sprintState.results
              .map(
                (r, i) => `
              <div style="background:#f8fafc;border:1px solid ${r.isCorrect ? '#a7f3d0' : '#fecaca'};border-radius:8px;padding:10px 14px;margin-bottom:8px;font-size:0.86rem;">
                <div style="display:flex;justify-content:space-between;font-weight:700;margin-bottom:4px;">
                  <span>Q${i + 1}: ${r.question}</span>
                  <span style="color:${r.isCorrect ? '#059669' : '#dc2626'};">${r.isCorrect ? '✓ Correct' : '✕ Incorrect'}</span>
                </div>
                <div style="color:#475569;">${r.explanation}</div>
              </div>
            `,
              )
              .join('')}
          </div>
        </div>
      </div>
    `;
  }

  // Active Question View
  const currQ = sprintState.questions[sprintState.currentIndex];
  const progressPct = Math.round((sprintState.currentIndex / sprintState.questions.length) * 100);

  return `
    <div class="gcse-sprint-container">
      <div class="gcse-sprint-card">
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.82rem;font-weight:700;color:#64748b;margin-bottom:8px;">
          <span>Question ${sprintState.currentIndex + 1} of ${sprintState.questions.length}</span>
          <span>Score: ${sprintState.score}</span>
        </div>

        <div class="gcse-sprint-progress-bar">
          <div class="gcse-sprint-progress-fill" style="width:${progressPct}%;"></div>
        </div>

        <span style="font-size:0.75rem;background:#eff6ff;color:#1e40af;padding:2px 8px;border-radius:4px;font-weight:800;text-transform:uppercase;">
          ${currQ.paperLabel || 'GCSE History'}
        </span>
        <h3 style="font-family:'Playfair Display',serif;font-size:1.25rem;color:#0f172a;margin:10px 0 16px 0;line-height:1.4;">
          ${currQ.question}
        </h3>

        <div class="gcse-sprint-options-grid">
          ${currQ.options
            .map((opt, idx) => {
              let stateClass = '';
              if (sprintState.selectedAnswer !== null) {
                if (opt === currQ.answer) stateClass = 'correct';
                else if (opt === sprintState.selectedAnswer) stateClass = 'incorrect';
              }
              return `
              <button type="button" class="gcse-sprint-option-btn ${stateClass}" data-opt="${escapeHtml(opt)}" ${sprintState.selectedAnswer !== null ? 'disabled' : ''}>
                <span style="font-weight:800;opacity:0.6;">${String.fromCharCode(65 + idx)}.</span>
                <span>${opt}</span>
              </button>
            `;
            })
            .join('')}
        </div>

        ${
          sprintState.selectedAnswer !== null
            ? `
          <div style="margin-top:20px;padding:12px 16px;border-radius:8px;background:${sprintState.selectedAnswer === currQ.answer ? '#ecfdf5' : '#fef2f2'};border:1px solid ${sprintState.selectedAnswer === currQ.answer ? '#a7f3d0' : '#fecaca'};font-size:0.88rem;color:#334155;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
            <div>
              <strong>${sprintState.selectedAnswer === currQ.answer ? '✓ Correct!' : '✕ Needs Revision:'}</strong> ${currQ.explanation}
            </div>
            <button type="button" class="btn" id="btn-next-sprint-q" style="background:#0f172a;color:#ffffff;padding:8px 18px;border-radius:6px;font-weight:700;font-size:0.84rem;cursor:pointer;">
              ${sprintState.currentIndex + 1 === sprintState.questions.length ? 'View Final Results' : 'Next Question →'}
            </button>
          </div>
        `
            : ''
        }
      </div>
    </div>
  `;
}

// ==========================================================================
// TAB 5: 6-Week GCSE Exam Countdown Revision Planner
// ==========================================================================
function renderCountdownTabHtml() {
  const now = new Date();
  const getDaysRemaining = (targetDateStr) => {
    const target = new Date(targetDateStr);
    const diffTime = target - now;
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  const p1Days = getDaysRemaining(EXAM_DATES_2026.paper1.date);
  const p2Days = getDaysRemaining(EXAM_DATES_2026.paper2.date);
  const p3Days = getDaysRemaining(EXAM_DATES_2026.paper3.date);

  // Load planner task states
  let plannerTasks = {};
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PLANNER);
    if (saved) plannerTasks = JSON.parse(saved);
  } catch (e) {}

  const weeksPlan = [
    {
      weekNum: 1,
      title: 'Week 1 (6 Weeks Out): Paper 1 Thematic Foundations & Chronological Shifts',
      focus:
        'c1250–c1700 Medicine (Medieval & Renaissance), Galen, Four Humours, Harvey, Vesalius, Great Plague.',
      targets: [
        'Review 1348 Black Death vs 1665 Great Plague',
        'Galen vs Harvey cardiovascular anatomy',
        'Complete 1x 4-mark similarity/difference drill',
      ],
    },
    {
      weekNum: 2,
      title: 'Week 2 (5 Weeks Out): Paper 1 Industrial/Modern Medicine & Western Front',
      focus:
        'Germ Theory (Pasteur & Koch), 1875 Public Health Act, Penicillin, CAS & Dressing Stations on Western Front.',
      targets: [
        'Jenner smallpox vs Pasteur vaccination',
        'Western Front evacuation chain (RAP to Base Hospital)',
        'Practice 1x Western Front 8-mark utility question',
      ],
    },
    {
      weekNum: 3,
      title: 'Week 3 (4 Weeks Out): Paper 2 British Depth (Early Elizabethan England)',
      focus:
        'Religious Settlement 1559, Catholic Plots (Ridolfi, Throckmorton, Babington), Mary Queen of Scots, Spanish Armada.',
      targets: [
        'Memorize 1559 Act of Supremacy & Uniformity terms',
        'Causal chain: Treaty of Nonsuch to Armada 1588',
        'Complete 1x 12-mark Explain Why question',
      ],
    },
    {
      weekNum: 4,
      title: 'Week 4 (3 Weeks Out): Paper 2 Period Study (Middle East Conflict / Cold War)',
      focus:
        'UN Partition 1947, 1948 War, Suez 1956, Six-Day War 1967, Yom Kippur 1973, Camp David 1978.',
      targets: [
        'Timeline drill: 1948 to 1993 Oslo Accords',
        'Consequences of 1967 Six-Day War (Sinai, West Bank, Golan)',
        'Complete 1x 8-mark analytical narrative',
      ],
    },
    {
      weekNum: 5,
      title: 'Week 5 (2 Weeks Out): Paper 3 Modern Depth (USA 1954–75 / Weimar Germany)',
      focus:
        'Civil Rights Movement (Brown, Montgomery, Little Rock, 1964 Act), Vietnam War (Tet, My Lai, Kent State).',
      targets: [
        'Brown v. Board vs Little Rock 1957',
        'Why guerrilla warfare baffled US military technology',
        'Practice 1x Section B historical interpretations pair',
      ],
    },
    {
      weekNum: 6,
      title: 'Week 6 (Exam Rehearsal): High-Yield 12-Mark Causation Drills & Final Formulas',
      focus:
        'Timed question rehearsals, key date anchoring, memory vaults, and PEEL causal structure strips.',
      targets: [
        'Complete 2x timed 12-mark causation essays',
        'Review personal Red Priority Gaps in Audit Matrix',
        'Lock in 1h 20m, 1h 50m, and 1h 30m pacing blueprints',
      ],
    },
  ];

  return `
    <div style="max-width:980px;margin:0 auto;">
      
      <!-- Countdown Cards Grid -->
      <div class="gcse-countdown-grid">
        <div class="gcse-countdown-card">
          <div class="gcse-countdown-days-box" style="background:#1e3a8a;">
            <span class="gcse-countdown-days-number">${p1Days}</span>
            <span class="gcse-countdown-days-unit">Days</span>
          </div>
          <div>
            <div style="font-size:0.75rem;font-weight:800;text-transform:uppercase;color:#2563eb;">Monday 18 May 2026</div>
            <h4 style="margin:2px 0;font-size:0.95rem;color:#0f172a;">Paper 1: Thematic &amp; Western Front</h4>
            <div style="font-size:0.78rem;color:#64748b;">1h 20m &bull; 52 Marks (30%)</div>
          </div>
        </div>

        <div class="gcse-countdown-card">
          <div class="gcse-countdown-days-box" style="background:#0f766e;">
            <span class="gcse-countdown-days-number">${p2Days}</span>
            <span class="gcse-countdown-days-unit">Days</span>
          </div>
          <div>
            <div style="font-size:0.75rem;font-weight:800;text-transform:uppercase;color:#0d9488;">Thursday 4 June 2026</div>
            <h4 style="margin:2px 0;font-size:0.95rem;color:#0f172a;">Paper 2: British Depth &amp; Period Study</h4>
            <div style="font-size:0.78rem;color:#64748b;">1h 50m &bull; 64 Marks (40%)</div>
          </div>
        </div>

        <div class="gcse-countdown-card">
          <div class="gcse-countdown-days-box" style="background:#4338ca;">
            <span class="gcse-countdown-days-number">${p3Days}</span>
            <span class="gcse-countdown-days-unit">Days</span>
          </div>
          <div>
            <div style="font-size:0.75rem;font-weight:800;text-transform:uppercase;color:#6366f1;">Tuesday 9 June 2026</div>
            <h4 style="margin:2px 0;font-size:0.95rem;color:#0f172a;">Paper 3: Modern Depth Study</h4>
            <div style="font-size:0.78rem;color:#64748b;">1h 30m &bull; 52 Marks (30%)</div>
          </div>
        </div>
      </div>

      <!-- Weekly Structured Schedule -->
      <div style="margin-top:20px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <div>
            <h3 style="margin:0;font-family:'Playfair Display',serif;font-size:1.3rem;color:#0f172a;">
              6-Week Revision Timetable &amp; Milestone Roadmap
            </h3>
            <p style="margin:2px 0 0;font-size:0.84rem;color:#64748b;">
              Evenly balances your 4 papers leading directly up to the terminal examinations.
            </p>
          </div>
          <button type="button" class="btn" onclick="window.print()" style="background:#f1f5f9;color:#334155;border:1px solid #cbd5e1;padding:8px 14px;border-radius:6px;font-weight:700;font-size:0.82rem;cursor:pointer;">
            <i class="fa-solid fa-print"></i> Print Schedule
          </button>
        </div>

        ${weeksPlan
          .map(
            (w) => `
          <div class="gcse-week-card">
            <div class="gcse-week-header">
              <h4 style="margin:0;font-size:0.95rem;font-weight:700;color:#0f172a;">${w.title}</h4>
              <span style="font-size:0.75rem;background:#e2e8f0;color:#334155;padding:2px 8px;border-radius:12px;font-weight:700;">Week ${w.weekNum}</span>
            </div>
            <div style="padding:14px 18px;">
              <p style="margin:0 0 10px 0;font-size:0.88rem;color:#475569;line-height:1.45;">
                <strong>Primary Syllabus Target:</strong> ${w.focus}
              </p>
              <div style="display:flex;flex-direction:column;gap:6px;">
                ${w.targets
                  .map((t, tIdx) => {
                    const taskId = `task-w${w.weekNum}-${tIdx}`;
                    const isChecked = !!plannerTasks[taskId];
                    return `
                    <label style="display:flex;align-items:center;gap:10px;font-size:0.86rem;color:#1e293b;cursor:pointer;">
                      <input type="checkbox" class="gcse-planner-checkbox" data-task="${taskId}" ${isChecked ? 'checked' : ''} style="width:16px;height:16px;accent-color:#2563eb;cursor:pointer;" />
                      <span style="${isChecked ? 'text-decoration:line-through;opacity:0.6;' : ''}">${t}</span>
                    </label>
                  `;
                  })
                  .join('')}
              </div>
            </div>
          </div>
        `,
          )
          .join('')}
      </div>

    </div>
  `;
}

// ==========================================================================
// EVENT HANDLERS & MODAL BINDINGS
// ==========================================================================
function attachTrackerEvents() {
  const container = document.querySelector('.gcse-tracker-container');
  if (!container) return;

  // Tab switching
  container.querySelectorAll('.gcse-tab-btn').forEach((btn) => {
    btn.onclick = () => {
      activeTab = btn.getAttribute('data-tab');
      renderGcseSpecTracker(activeTab);
    };
  });

  // Filter pills
  container.querySelectorAll('.gcse-filter-btn').forEach((btn) => {
    btn.onclick = () => {
      activeRagFilter = btn.getAttribute('data-filter');
      renderGcseSpecTracker(activeTab);
    };
  });

  // Paper switcher tabs
  container.querySelectorAll('.gcse-paper-tab-btn').forEach((btn) => {
    btn.onclick = () => {
      activePaperFilter = btn.getAttribute('data-paper');
      renderGcseSpecTracker(activeTab);
    };
  });

  // Search input with debounce
  const searchInput = document.getElementById('gcse-spec-search');
  if (searchInput) {
    let debounceTimer = null;
    searchInput.oninput = (e) => {
      clearTimeout(debounceTimer);
      searchQuery = e.target.value;
      debounceTimer = setTimeout(() => {
        const contentArea = document.getElementById('gcse-tracker-tab-content');
        if (contentArea && activeTab === 'audit') {
          contentArea.innerHTML = renderActiveTabHtml(calculateAuditStats());
          attachTrackerEvents();
        }
      }, 250);
    };
  }

  // RAG Pill Buttons
  container.querySelectorAll('.gcse-rag-btn').forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const color = btn.getAttribute('data-color');

      // Update in memory and storage
      ragState[id] = color;
      saveRagState();

      // Visual update in DOM
      const parentRow = document.getElementById(`row-${id}`);
      if (parentRow) {
        parentRow.className = `gcse-spec-item-row status-${color}`;
        parentRow.querySelectorAll('.gcse-rag-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
      }

      // Update hero readiness widget
      const stats = calculateAuditStats();
      const ring = document.querySelector('.gcse-ring-progress');
      const ringLabel = document.querySelector('.gcse-ring-label');
      const sub = document.querySelector('.gcse-readiness-stat-sub');
      if (ring) ring.setAttribute('stroke-dasharray', `${stats.readinessPercent}, 100`);
      if (ringLabel) ringLabel.textContent = `${stats.readinessPercent}%`;
      if (sub)
        sub.innerHTML = `<strong>${stats.greenCount}</strong> Mastered &bull; <strong>${stats.redCount}</strong> Gaps`;
    };
  });

  // Jump to Lesson Button
  container.querySelectorAll('[data-action="jump-lesson"]').forEach((btn) => {
    btn.onclick = () => {
      const unit = btn.getAttribute('data-unit');
      const topicNum = parseInt(btn.getAttribute('data-topic') || '1', 10);
      window.switchView('lessons', unit, false, { lessonIndex: Math.max(0, topicNum - 1) });
    };
  });

  // Western Front 40 Features Hero Button
  const btnHeroWfModal = document.getElementById('btn-hero-wf-modal');
  if (btnHeroWfModal) {
    btnHeroWfModal.onclick = () => openWesternFrontModal();
  }

  // Change Papers Modal Trigger
  const btnChangePapers = document.getElementById('btn-change-papers');
  if (btnChangePapers) {
    btnChangePapers.onclick = () => openPathwayModal(false);
  }

  // Quick Reset Papers Trigger
  const btnQuickReset = document.getElementById('btn-quick-reset-papers');
  if (btnQuickReset) {
    btnQuickReset.onclick = async () => {
      activePaperIds = [...DEFAULT_PAPERS];
      saveSelectedPapers();
      await renderGcseSpecTracker(activeTab);
    };
  }

  // Print A4 Checklist from Hero or Audit Toolbar
  const btnHeroPrintA4 = document.getElementById('btn-hero-print-a4');
  if (btnHeroPrintA4) {
    btnHeroPrintA4.onclick = () => {
      activeTab = 'printable';
      renderGcseSpecTracker('printable');
    };
  }

  const btnAuditPrintA4 = document.getElementById('btn-audit-print-a4');
  if (btnAuditPrintA4) {
    btnAuditPrintA4.onclick = () => {
      activeTab = 'printable';
      renderGcseSpecTracker('printable');
    };
  }

  // Back to Audit Button on Printable Page
  const btnBackToAudit = document.getElementById('btn-back-to-audit');
  if (btnBackToAudit) {
    btnBackToAudit.onclick = () => {
      activeTab = 'audit';
      renderGcseSpecTracker('audit');
    };
  }

  // 12-Mark Next Question
  const btnNext12m = document.getElementById('btn-next-12m');
  if (btnNext12m) {
    btnNext12m.onclick = () => {
      const allQ = [];
      activePaperIds.forEach((paperId) => {
        const meta = OPTION_REVISION_METADATA[paperId];
        const spec = loadedSpecs[paperId];
        if (meta && meta.questions12m && spec) {
          meta.questions12m.forEach((q) => {
            allQ.push({
              ...q,
              paperId,
              paperCode: spec.code,
              paperName: spec.shortTitle || spec.title,
              paperType: spec.paper,
            });
          });
        }
      });
      if (allQ.length > 1) {
        const filtered = allQ.filter((q) => q.stem !== currentGeneratorQuestion?.stem);
        currentGeneratorQuestion = filtered[Math.floor(Math.random() * filtered.length)];
        const contentArea = document.getElementById('gcse-tracker-tab-content');
        if (contentArea) {
          contentArea.innerHTML = renderGeneratorTabHtml();
          attachTrackerEvents();
        }
      }
    };
  }

  // Copy PEEL Scaffold
  const btnCopyPeel = document.getElementById('btn-copy-peel');
  if (btnCopyPeel && currentGeneratorQuestion) {
    btnCopyPeel.onclick = () => {
      const q = currentGeneratorQuestion;
      const text = `EDEXCEL GCSE HISTORY 12-MARK ESSAY PLAN\nQuestion: ${q.stem} [12 marks]\n\nPARAGRAPH 1 (Stimulus: ${q.stimulus[0]}):\nPoint: One significant factor was ${q.stimulus[0]}...\nEvidence & Analysis: ...\n\nPARAGRAPH 2 (Stimulus: ${q.stimulus[1]}):\nPoint: Furthermore, this was accelerated by ${q.stimulus[1]}...\nEvidence & Analysis: ...\n\nPARAGRAPH 3 (Own Knowledge: ${q.ownFactor}):\nPoint: Crucially, an essential factor beyond the stimulus was ${q.ownFactor}...\nEvidence & Analysis: ...\n\nEVALUATIVE CONCLUSION:\nRelative weight of short-term triggers vs long-term structural causes...`;
      navigator.clipboard.writeText(text).then(() => {
        btnCopyPeel.innerHTML = '<i class="fa-solid fa-check"></i> Copied to Clipboard!';
        setTimeout(() => {
          btnCopyPeel.innerHTML = '<i class="fa-regular fa-copy"></i> Copy Scaffold to Clipboard';
        }, 2000);
      });
    };
  }

  // ==========================================================================
  // Blurt Engine Event Bindings
  // ==========================================================================

  // Paper Selector Tabs in Blurt Setup
  container.querySelectorAll('.gcse-blurt-paper-tab').forEach((btn) => {
    btn.onclick = () => {
      const paperId = btn.getAttribute('data-paper');
      blurtState.selectedPaper = paperId;
      const pastForPaper = BLURT_PAST_QUESTIONS_DATABASE.filter((q) => q.paperId === paperId);
      const curatedForPaper = BLURT_TOPICS_DATABASE.filter((c) => c.paperId === paperId);
      let targetList = [];
      if (blurtState.selectedTariffFilter === 'curated') {
        targetList = curatedForPaper;
      } else if (blurtState.selectedTariffFilter && blurtState.selectedTariffFilter !== 'all') {
        const tNum = parseInt(blurtState.selectedTariffFilter, 10);
        targetList = pastForPaper.filter((q) => q.tariff === tNum);
      } else {
        targetList = [...pastForPaper, ...curatedForPaper];
      }

      if (targetList.length > 0) {
        blurtState.selectedTopicId = targetList[0].topicId;
      } else if (pastForPaper.length > 0) {
        blurtState.selectedTariffFilter = 'all';
        blurtState.selectedTopicId = pastForPaper[0].topicId;
      } else if (curatedForPaper.length > 0) {
        blurtState.selectedTariffFilter = 'all';
        blurtState.selectedTopicId = curatedForPaper[0].topicId;
      }

      blurtState.answers = { dates: '', vocab: '', mechanism: '' };
      blurtState.text = '';
      blurtState.checkedItems = {};
      blurtState.lastSyncFeedback = null;
      blurtState.widerCredits = 0;
      refreshBlurtDom();
    };
  });

  // Tariff Filter Buttons in Blurt Setup
  container.querySelectorAll('.gcse-blurt-tariff-filter').forEach((btn) => {
    btn.onclick = () => {
      const tariff = btn.getAttribute('data-tariff');
      blurtState.selectedTariffFilter = tariff;
      const paperId = blurtState.selectedPaper || activePaperIds[0];
      const pastForPaper = BLURT_PAST_QUESTIONS_DATABASE.filter((q) => q.paperId === paperId);
      const curatedForPaper = BLURT_TOPICS_DATABASE.filter((c) => c.paperId === paperId);
      let targetList = [];
      if (tariff === 'curated') {
        targetList = curatedForPaper;
      } else if (tariff !== 'all') {
        const tNum = parseInt(tariff, 10);
        targetList = pastForPaper.filter((q) => q.tariff === tNum);
      } else {
        targetList = [...pastForPaper, ...curatedForPaper];
      }

      if (targetList.length > 0) {
        blurtState.selectedTopicId = targetList[0].topicId;
      }
      blurtState.answers = { dates: '', vocab: '', mechanism: '' };
      blurtState.text = '';
      blurtState.checkedItems = {};
      blurtState.lastSyncFeedback = null;
      blurtState.widerCredits = 0;
      refreshBlurtDom();
    };
  });

  // Topic Dropdown Selector
  const selectTopic = document.getElementById('select-blurt-topic');
  if (selectTopic) {
    selectTopic.onchange = (e) => {
      blurtState.selectedTopicId = e.target.value;
      blurtState.answers = { dates: '', vocab: '', mechanism: '' };
      blurtState.text = '';
      blurtState.checkedItems = {};
      blurtState.lastSyncFeedback = null;
      blurtState.widerCredits = 0;
      refreshBlurtDom();
    };
  }

  // Jump to Lesson from Blurt
  const btnBlurtLesson = document.getElementById('btn-blurt-jump-lesson');
  if (btnBlurtLesson) {
    btnBlurtLesson.onclick = () => {
      const unit = btnBlurtLesson.getAttribute('data-unit');
      const index = parseInt(btnBlurtLesson.getAttribute('data-index') || '0', 10);
      window.switchView('lessons', unit, false, { lessonIndex: index });
    };
  }

  // Scaffold Ladder Controls
  const btnLadderToggle = document.getElementById('btn-blurt-ladder-toggle');
  if (btnLadderToggle) {
    btnLadderToggle.onclick = () => {
      blurtState.ladderStep = (blurtState.ladderStep + 1) % 4;
      refreshBlurtDom();
    };
  }

  container.querySelectorAll('.gcse-ladder-pip').forEach((pip) => {
    pip.onclick = () => {
      blurtState.ladderStep = parseInt(pip.getAttribute('data-step') || '0', 10);
      refreshBlurtDom();
    };
  });

  const btnLadderNext = document.getElementById('btn-ladder-next-step');
  if (btnLadderNext) {
    btnLadderNext.onclick = () => {
      blurtState.ladderStep = (blurtState.ladderStep + 1) % 4;
      refreshBlurtDom();
    };
  }

  const btnLadderClose = document.getElementById('btn-ladder-close');
  if (btnLadderClose) {
    btnLadderClose.onclick = () => {
      blurtState.ladderStep = 0;
      refreshBlurtDom();
    };
  }

  // Ladder Word Bank Chip Click (Insert into Canvas)
  container.querySelectorAll('.gcse-ladder-chip').forEach((chipBtn) => {
    chipBtn.onclick = () => {
      const chipText = chipBtn.getAttribute('data-chip');
      const canvas = document.getElementById('blurt-input-canvas');
      if (canvas && chipText) {
        const curr = canvas.value;
        const separator = curr.length > 0 && !curr.endsWith(' ') && !curr.endsWith('\n') ? ' ' : '';
        canvas.value = curr + separator + chipText;
        blurtState.text = canvas.value;
        const tot = document.getElementById('blurt-total-words');
        if (tot) tot.textContent = countWords(blurtState.text);
        const wCount = document.getElementById('blurt-canvas-word-count');
        if (wCount) wCount.textContent = `${countWords(blurtState.text)} words`;
        chipBtn.style.opacity = '0.4';
        chipBtn.disabled = true;
      }
    };
  });

  // Ladder Sentence Starter Click (Insert into Canvas)
  container.querySelectorAll('.gcse-ladder-insert-starter').forEach((starterBtn) => {
    starterBtn.onclick = () => {
      const starterText = starterBtn.getAttribute('data-starter');
      const canvas = document.getElementById('blurt-input-canvas');
      if (canvas && starterText) {
        const curr = canvas.value;
        const separator = curr.length > 0 && !curr.endsWith('\n') ? '\n\n' : '';
        canvas.value = curr + separator + starterText + ' ';
        blurtState.text = canvas.value;
        canvas.focus();
        const tot = document.getElementById('blurt-total-words');
        if (tot) tot.textContent = countWords(blurtState.text);
        const wCount = document.getElementById('blurt-canvas-word-count');
        if (wCount) wCount.textContent = `${countWords(blurtState.text)} words`;
        starterBtn.textContent = 'Inserted ✓';
        starterBtn.disabled = true;
      }
    };
  });

  // One-Click Quick Sentence Starter Pills (Direct Canvas Insert)
  container.querySelectorAll('.gcse-starter-pill').forEach((pillBtn) => {
    pillBtn.onclick = () => {
      const starterText = pillBtn.getAttribute('data-starter');
      const canvas = document.getElementById('blurt-input-canvas');
      if (canvas && starterText) {
        const curr = canvas.value;
        const separator = curr.length > 0 && !curr.endsWith('\n') ? '\n\n' : '';
        canvas.value = curr + separator + starterText + ' ';
        blurtState.text = canvas.value;
        canvas.focus();
        const tot = document.getElementById('blurt-total-words');
        if (tot) tot.textContent = countWords(blurtState.text);
        const wCount = document.getElementById('blurt-canvas-word-count');
        if (wCount) wCount.textContent = `${countWords(blurtState.text)} words`;
        pillBtn.style.opacity = '0.5';
        pillBtn.disabled = true;
      }
    };
  });

  // Read Aloud Driving Exam Question (Accessible Text-to-Speech)
  const btnReadQ = document.getElementById('btn-blurt-read-question');
  if (btnReadQ) {
    btnReadQ.onclick = () => {
      const topic = getCurrentBlurtTopic();
      if (!topic || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const questionText = topic.drivingQuestion || topic.title;
      const cueText = topic.pupilPromptCue || topic.prompt || '';
      const utterance = new SpeechSynthesisUtterance(`${questionText}. Focus: ${cueText}`);
      utterance.lang = 'en-GB';
      utterance.rate = 0.92; // Slightly measured pace for pupils
      btnReadQ.innerHTML =
        '<i class="fa-solid fa-volume-high fa-beat" style="color:#ef4444;"></i> Playing...';
      utterance.onend = () => {
        btnReadQ.innerHTML = '<i class="fa-solid fa-volume-high"></i> Read Aloud';
      };
      utterance.onerror = () => {
        btnReadQ.innerHTML = '<i class="fa-solid fa-volume-high"></i> Read Aloud';
      };
      window.speechSynthesis.speak(utterance);
    };
  }

  // Western Front 40 Features Modal Openers
  const btnOpenWfBanner = document.getElementById('btn-open-wf-modal-banner');
  if (btnOpenWfBanner) {
    btnOpenWfBanner.onclick = () => openWesternFrontModal();
  }
  const btnOpenWfSetup = document.getElementById('btn-open-wf-modal-setup');
  if (btnOpenWfSetup) {
    btnOpenWfSetup.onclick = () => openWesternFrontModal();
  }
  const btnOpenWfFooter = document.getElementById('btn-open-wf-modal-footer');
  if (btnOpenWfFooter) {
    btnOpenWfFooter.onclick = () => openWesternFrontModal();
  }

  // Sound Alert Toggle
  const btnBlurtSound = document.getElementById('btn-blurt-sound-toggle');
  if (btnBlurtSound) {
    btnBlurtSound.onclick = () => {
      blurtState.soundEnabled = !blurtState.soundEnabled;
      btnBlurtSound.innerHTML = `
        <i class="fa-solid ${blurtState.soundEnabled ? 'fa-volume-high' : 'fa-volume-xmark'}"></i>
        <span>${blurtState.soundEnabled ? 'Sound Alerts On' : 'Sound Muted'}</span>
      `;
    };
  }

  // Start Timed Blurt Button
  const btnStartBlurt = document.getElementById('btn-start-blurt');
  if (btnStartBlurt) {
    btnStartBlurt.onclick = () => {
      blurtState.answers = { dates: '', vocab: '', mechanism: '' };
      blurtState.text = '';
      blurtState.checkedItems = {};
      blurtState.lastSyncFeedback = null;
      blurtState.widerCredits = 0;
      blurtState.clusterResults = [];
      startBlurtTimer();
    };
  }

  // Direct Print Buttons
  const btnBlurtDirectPrint = document.getElementById('btn-blurt-direct-print');
  if (btnBlurtDirectPrint) {
    btnBlurtDirectPrint.onclick = () => window.print();
  }
  const btnBlurtPrint = document.getElementById('btn-blurt-print');
  if (btnBlurtPrint) {
    btnBlurtPrint.onclick = () => window.print();
  }

  // Finish Sprint Buttons
  const btnBlurtFinish = document.getElementById('btn-blurt-finish');
  if (btnBlurtFinish) {
    btnBlurtFinish.onclick = () => finishBlurtSession();
  }
  const btnBlurtFinishBottom = document.getElementById('btn-blurt-finish-bottom');
  if (btnBlurtFinishBottom) {
    btnBlurtFinishBottom.onclick = () => finishBlurtSession();
  }

  // Exit Sprint / Cancel Button
  const btnBlurtCancel = document.getElementById('btn-blurt-cancel');
  if (btnBlurtCancel) {
    btnBlurtCancel.onclick = () => resetBlurtSession();
  }

  // Voice Dictation Toggle Button
  const btnBlurtVoiceToggle = document.getElementById('btn-blurt-voice-toggle');
  if (btnBlurtVoiceToggle) {
    btnBlurtVoiceToggle.onclick = () => toggleVoiceDictation();
  }

  // Unified Blurt Memory Canvas Live Word Counting
  const inputCanvas = document.getElementById('blurt-input-canvas');
  if (inputCanvas) {
    inputCanvas.oninput = (e) => {
      blurtState.text = e.target.value;
      const words = countWords(e.target.value);
      const wElem = document.getElementById('blurt-canvas-word-count');
      if (wElem) wElem.textContent = `${words} words`;
      const totElem = document.getElementById('blurt-total-words');
      if (totElem) totElem.textContent = words;
    };
  }

  // Wider Historical Knowledge Credit Buttons
  const btnAddWiderCredit = document.getElementById('btn-add-wider-credit');
  if (btnAddWiderCredit) {
    btnAddWiderCredit.onclick = () => {
      blurtState.widerCredits = (blurtState.widerCredits || 0) + 1;
      refreshBlurtDom();
    };
  }

  const btnResetWiderCredit = document.getElementById('btn-reset-wider-credit');
  if (btnResetWiderCredit) {
    btnResetWiderCredit.onclick = () => {
      blurtState.widerCredits = 0;
      refreshBlurtDom();
    };
  }

  // Benchmark Interactive Checkboxes & Score Recalculation
  container.querySelectorAll('.blurt-check-input').forEach((cb) => {
    cb.onchange = (e) => {
      const key = cb.getAttribute('data-key');
      blurtState.checkedItems[key] = cb.checked;
      const parentLabel = cb.closest('.gcse-blurt-check-item');
      if (parentLabel) {
        if (cb.checked) parentLabel.classList.add('checked');
        else parentLabel.classList.remove('checked');
      }

      const topic = getCurrentBlurtTopic();
      if (topic) {
        let totalItems = 0;
        let verifiedTargets = 0;

        if (
          topic.isPastPaperQuestion &&
          topic.indicativeContent &&
          topic.indicativeContent.length > 0
        ) {
          totalItems = topic.indicativeContent.length;
          topic.indicativeContent.forEach((_, idx) => {
            if (blurtState.checkedItems[`indicative_${idx}`]) verifiedTargets++;
          });
        } else {
          totalItems =
            (topic.benchmark?.dates?.length || 0) + (topic.benchmark?.vocab?.length || 0);
          topic.benchmark?.dates?.forEach((_, idx) => {
            if (blurtState.checkedItems[`date_${idx}`]) verifiedTargets++;
          });
          topic.benchmark?.vocab?.forEach((_, idx) => {
            if (blurtState.checkedItems[`vocab_${idx}`]) verifiedTargets++;
          });
        }

        const recalled = verifiedTargets + (blurtState.widerCredits || 0);
        const pct = totalItems > 0 ? Math.min(100, Math.round((recalled / totalItems) * 100)) : 0;
        const scoreElem = document.getElementById('blurt-score-percentage');
        const counterElem = document.getElementById('blurt-score-counter');
        if (scoreElem) {
          scoreElem.textContent = `${pct}%`;
          scoreElem.style.color = pct >= 80 ? '#10b981' : pct >= 40 ? '#f59e0b' : '#ef4444';
        }
        if (counterElem) {
          counterElem.innerHTML = `<strong>${recalled}</strong> of <strong>${totalItems}</strong> targets verified ${blurtState.widerCredits > 0 ? `<span style="display:block;color:#6ee7b7;font-size:0.72rem;font-weight:700;">(+${blurtState.widerCredits} wider knowledge credited)</span>` : ''}`;
        }
      }
    };
  });

  // 1-Click RAG Sync Buttons
  const btnSyncGreen = document.getElementById('btn-blurt-sync-green');
  if (btnSyncGreen) {
    btnSyncGreen.onclick = () => syncBlurtToRag('green');
  }

  const btnSyncAmber = document.getElementById('btn-blurt-sync-amber');
  if (btnSyncAmber) {
    btnSyncAmber.onclick = () => syncBlurtToRag('amber');
  }

  const btnSyncRed = document.getElementById('btn-blurt-sync-red');
  if (btnSyncRed) {
    btnSyncRed.onclick = () => syncBlurtToRag('red');
  }

  // Re-Blurt / Restart
  const btnBlurtRestart = document.getElementById('btn-blurt-restart');
  if (btnBlurtRestart) {
    btnBlurtRestart.onclick = () => resetBlurtSession();
  }

  const btnBlurtChange = document.getElementById('btn-blurt-change-topic');
  if (btnBlurtChange) {
    btnBlurtChange.onclick = () => resetBlurtSession();
  }

  // Next Topic Button
  const btnBlurtNext = document.getElementById('btn-blurt-next-topic');
  if (btnBlurtNext) {
    btnBlurtNext.onclick = () => {
      const available = getAvailableBlurtTopics();
      const currIndex = available.findIndex((t) => t.topicId === blurtState.selectedTopicId);
      const nextTopic = available[(currIndex + 1) % available.length];
      blurtState.selectedTopicId = nextTopic.topicId;
      blurtState.selectedPaper = nextTopic.paperId;
      resetBlurtSession();
    };
  }

  // Diagnostic Sprint Start Button
  const btnStartSprint = document.getElementById('btn-start-sprint');
  if (btnStartSprint) {
    btnStartSprint.onclick = () => startDiagnosticSprint();
  }

  // Sprint Option Click
  container.querySelectorAll('.gcse-sprint-option-btn').forEach((btn) => {
    btn.onclick = () => {
      if (sprintState.selectedAnswer !== null) return;
      const chosen = btn.getAttribute('data-opt');
      sprintState.selectedAnswer = chosen;
      const currQ = sprintState.questions[sprintState.currentIndex];
      const isCorrect = chosen === currQ.answer;
      if (isCorrect) sprintState.score++;
      sprintState.results.push({
        question: currQ.question,
        chosen,
        answer: currQ.answer,
        isCorrect,
        explanation: currQ.explanation,
      });

      const contentArea = document.getElementById('gcse-tracker-tab-content');
      if (contentArea) {
        contentArea.innerHTML = renderSprintTabHtml();
        attachTrackerEvents();
      }
    };
  });

  // Sprint Next Question Button
  const btnNextSprintQ = document.getElementById('btn-next-sprint-q');
  if (btnNextSprintQ) {
    btnNextSprintQ.onclick = () => {
      if (sprintState.currentIndex + 1 >= sprintState.questions.length) {
        sprintState.isFinished = true;
      } else {
        sprintState.currentIndex++;
        sprintState.selectedAnswer = null;
      }
      const contentArea = document.getElementById('gcse-tracker-tab-content');
      if (contentArea) {
        contentArea.innerHTML = renderSprintTabHtml();
        attachTrackerEvents();
      }
    };
  }

  // Sprint Restart Button
  const btnRestartSprint = document.getElementById('btn-restart-sprint');
  if (btnRestartSprint) {
    btnRestartSprint.onclick = () => startDiagnosticSprint();
  }

  const btnReturnAudit = document.getElementById('btn-return-audit');
  if (btnReturnAudit) {
    btnReturnAudit.onclick = () => {
      activeTab = 'audit';
      renderGcseSpecTracker('audit');
    };
  }

  // Planner Checkboxes
  container.querySelectorAll('.gcse-planner-checkbox').forEach((cb) => {
    cb.onchange = () => {
      const taskId = cb.getAttribute('data-task');
      let tasks = {};
      try {
        const stored = localStorage.getItem(STORAGE_KEY_PLANNER);
        if (stored) tasks = JSON.parse(stored);
      } catch (e) {}
      tasks[taskId] = cb.checked;
      try {
        localStorage.setItem(STORAGE_KEY_PLANNER, JSON.stringify(tasks));
      } catch (e) {}

      const label = cb.parentElement?.querySelector('span');
      if (label) {
        if (cb.checked) {
          label.style.textDecoration = 'line-through';
          label.style.opacity = '0.6';
        } else {
          label.style.textDecoration = 'none';
          label.style.opacity = '1';
        }
      }
    };
  });
}

// --- Sprint Question Generator ---
function startDiagnosticSprint() {
  const allSprintQuestions = [
    // Paper 1 Medicine
    {
      paperLabel: 'Paper 1: Medicine in Britain',
      question: 'Which ancient Greek physician created the Theory of the Four Humours?',
      options: ['Hippocrates', 'Galen', 'Aristotle', 'Vesalius'],
      answer: 'Hippocrates',
      explanation:
        'Hippocrates originated the Four Humours (Blood, Phlegm, Yellow Bile, Black Bile); Galen later expanded it with the Theory of Opposites.',
    },
    {
      paperLabel: 'Paper 1: Medicine in Britain',
      question:
        'In which year did Edward Jenner publish his findings on vaccination against smallpox?',
      options: ['1796', '1854', '1865', '1928'],
      answer: '1796',
      explanation:
        'Jenner inoculated James Phipps with cowpox matter in 1796 and published his findings in 1798.',
    },
    {
      paperLabel: 'Paper 1: Western Front',
      question:
        'What medical innovation reduced fracture mortality on the Western Front from 80% to 20%?',
      options: [
        'The Thomas Splint',
        'Mobile X-ray units',
        'The Carrel-Dakin method',
        'Stored blood transfusions',
      ],
      answer: 'The Thomas Splint',
      explanation:
        'Hugh Owen Thomas’s splint stabilized compound femur fractures, preventing blood vessel tearing and shock.',
    },
    // Paper 2 Elizabeth
    {
      paperLabel: 'Paper 2: Early Elizabethan England',
      question:
        'Which parliamentary act in 1559 declared Elizabeth I "Supreme Governor" of the Church of England?',
      options: [
        'The Act of Supremacy',
        'The Act of Uniformity',
        'The Royal Injunctions',
        'The Thirty-Nine Articles',
      ],
      answer: 'The Act of Supremacy',
      explanation:
        'The Act of Supremacy used the title "Supreme Governor" rather than "Supreme Head" to appease moderate Catholics and Puritans.',
    },
    {
      paperLabel: 'Paper 2: Early Elizabethan England',
      question:
        'In which year did Pope Pius V issue the Papal Bull Regnans in Excelsis excommunicating Elizabeth I?',
      options: ['1570', '1569', '1585', '1588'],
      answer: '1570',
      explanation:
        'The 1570 Papal Bull released English Catholics from obedience to the Queen, escalating treason fears.',
    },
    // Paper 2 Middle East
    {
      paperLabel: 'Paper 2: Middle East',
      question:
        'Which United Nations resolution in November 1947 proposed partitioning Palestine into separate Arab and Jewish states?',
      options: ['Resolution 181', 'Resolution 242', 'Resolution 338', 'Resolution 194'],
      answer: 'Resolution 181',
      explanation:
        'UN Resolution 181 voted to end the British Mandate and create independent Jewish and Arab states, with Jerusalem under international control.',
    },
    {
      paperLabel: 'Paper 2: Middle East',
      question:
        'What Israeli military operation destroyed over 300 Egyptian aircraft on 5 June 1967?',
      options: [
        'Operation Focus (Moked)',
        'Operation Kadesh',
        'Operation Entebbe',
        'Operation Badr',
      ],
      answer: 'Operation Focus (Moked)',
      explanation:
        'Operation Focus was the pre-emptive airstrike that destroyed Egyptian air capabilities in the opening hours of the Six-Day War.',
    },
    // Paper 3 USA
    {
      paperLabel: 'Paper 3: USA 1954–75',
      question:
        'Which landmark 1954 Supreme Court ruling declared racial segregation in public schools unconstitutional?',
      options: [
        'Brown v. Board of Education of Topeka',
        'Plessy v. Ferguson',
        'Loving v. Virginia',
        'Roe v. Wade',
      ],
      answer: 'Brown v. Board of Education of Topeka',
      explanation:
        'Chief Justice Earl Warren ruled that "separate educational facilities are inherently unequal," overturning Plessy v. Ferguson.',
    },
    {
      paperLabel: 'Paper 3: USA 1954–75',
      question:
        'In which year did the North Vietnamese Army and Vietcong launch the nationwide Tet Offensive?',
      options: ['1968', '1964', '1965', '1970'],
      answer: '1968',
      explanation:
        'The January 1968 Tet Offensive proved to the American public that the war was far from won, creating a severe credibility gap.',
    },
    {
      paperLabel: 'Paper 3: USA 1954–75',
      question: 'Which 1965 march led directly to the passage of the Voting Rights Act?',
      options: [
        'The Selma to Montgomery March',
        'The March on Washington',
        'The Albany Movement',
        'The Birmingham Children’s Crusade',
      ],
      answer: 'The Selma to Montgomery March',
      explanation:
        'State police brutality on "Bloody Sunday" in Selma shocked the nation and compelled President Johnson to pass the Voting Rights Act of 1965.',
    },
  ];

  // Shuffle and pick 10
  const shuffled = [...allSprintQuestions].sort(() => 0.5 - Math.random()).slice(0, 10);

  sprintState = {
    active: true,
    questions: shuffled,
    currentIndex: 0,
    score: 0,
    selectedAnswer: null,
    isFinished: false,
    results: [],
  };

  const contentArea = document.getElementById('gcse-tracker-tab-content');
  if (contentArea) {
    contentArea.innerHTML = renderSprintTabHtml();
    attachTrackerEvents();
  }
}

// ==========================================================================
// PATHWAY SELECTOR MODAL ("Change My 4 GCSE Papers")
// ==========================================================================
function openPathwayModal(isFirstTime = false) {
  const existing = document.getElementById('gcse-pathway-modal');
  if (existing) existing.remove();

  if (!manifestData || !manifestData.options) return;

  const p1Options = manifestData.options.filter((o) => o.paper.includes('Paper 1'));
  const p2BdOptions = manifestData.options.filter((o) => o.paper.includes('British Depth'));
  const p2PsOptions = manifestData.options.filter((o) => o.paper.includes('Period Study'));
  const p3Options = manifestData.options.filter((o) => o.paper.includes('Paper 3'));

  const modalHtml = `
    <div class="gcse-modal-backdrop" id="gcse-pathway-modal" style="display:flex;align-items:center;justify-content:center;position:fixed;inset:0;background:rgba(15,23,42,0.75);backdrop-filter:blur(4px);z-index:99999;padding:20px;overflow-y:auto;">
      <div class="gcse-modal-content" style="background:#ffffff;border-radius:14px;max-width:680px;width:100%;padding:26px;box-shadow:0 20px 40px rgba(0,0,0,0.3);border:1px solid #cbd5e1;position:relative;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;border-bottom:1.5px solid #e2e8f0;padding-bottom:14px;">
          <div>
            ${
              isFirstTime
                ? `
              <div style="display:inline-flex;align-items:center;gap:6px;background:#eff6ff;color:#1e40af;border:1px solid #bfdbfe;padding:3px 10px;border-radius:20px;font-size:0.75rem;font-weight:800;text-transform:uppercase;margin-bottom:6px;">
                <i class="fa-solid fa-sparkles" style="color:#2563eb;"></i> Welcome Setup &bull; First-Time Personalisation
              </div>
              <h3 style="margin:0;font-family:'Playfair Display',serif;font-size:1.45rem;color:#0f172a;">
                Confirm Your 4 GCSE Examination Papers
              </h3>
              <p style="margin:4px 0 0;font-size:0.86rem;color:#475569;line-height:1.45;">
                The History Revision Hub supports <strong>all 17 Pearson Edexcel (9–1) options</strong>. The 4 standard baseline papers are pre-selected below. If your class is studying different options (e.g. Cold War or Weimar Germany), choose them below or click <strong>Confirm &amp; Start Revising</strong>:
              </p>
            `
                : `
              <h3 style="margin:0;font-family:'Playfair Display',serif;font-size:1.4rem;color:#0f172a;">
                Configure My 4 GCSE Papers
              </h3>
              <p style="margin:2px 0 0;font-size:0.84rem;color:#64748b;">
                Pearson Edexcel GCSE (9–1) in History &bull; Select 1 option per examination category
              </p>
            `
            }
          </div>
          <button type="button" id="btn-close-modal" style="background:none;border:none;font-size:1.3rem;color:#64748b;cursor:pointer;padding:4px;" title="Close">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Presets & Quick Reset Ribbon -->
        <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:12px 14px;margin-bottom:18px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:6px;">
            <span style="font-size:0.75rem;font-weight:800;text-transform:uppercase;color:#475569;letter-spacing:0.04em;">
              Quick Presets &amp; Reset:
            </span>
            <button type="button" class="btn" id="btn-reset-default-papers" style="background:#fff1f2;border:1.5px solid #fecdd3;color:#be123c;padding:3px 10px;border-radius:6px;font-size:0.75rem;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;gap:5px;">
              <i class="fa-solid fa-rotate-left"></i> Reset to Default 4 Papers
            </button>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button type="button" class="btn" id="btn-preset-2026" style="background:#1e3a8a;color:#ffffff;padding:6px 12px;border-radius:6px;font-size:0.78rem;font-weight:700;cursor:pointer;">
              ★ Standard Entry (Medicine + Elizabeth + Middle East + USA)
            </button>
            <button type="button" class="btn" id="btn-preset-alt" style="background:#f1f5f9;color:#334155;border:1px solid #cbd5e1;padding:6px 12px;border-radius:6px;font-size:0.78rem;font-weight:700;cursor:pointer;">
              Alternate: Cold War &amp; Germany
            </button>
          </div>
          <div id="pathway-preset-feedback" style="margin-top:6px;"></div>
        </div>

        <form id="gcse-pathway-form">
          <!-- Paper 1 -->
          <div style="margin-bottom:14px;">
            <label for="select-p1" style="display:block;font-size:0.8rem;font-weight:800;text-transform:uppercase;color:#1e3a8a;margin-bottom:4px;">
              Paper 1: Thematic Study &amp; Historic Environment
            </label>
            <select id="select-p1" style="width:100%;padding:8px 10px;border-radius:6px;border:1.5px solid #cbd5e1;font-size:0.88rem;background:#ffffff;color:#0f172a;">
              ${p1Options
                .map(
                  (o) => `
                <option value="${o.id}" ${activePaperIds.includes(o.id) ? 'selected' : ''}>
                  Option ${o.code}: ${o.title}
                </option>
              `,
                )
                .join('')}
            </select>
          </div>

          <!-- Paper 2 BD -->
          <div style="margin-bottom:14px;">
            <label for="select-p2bd" style="display:block;font-size:0.8rem;font-weight:800;text-transform:uppercase;color:#0d9488;margin-bottom:4px;">
              Paper 2 (Booklet B): British Depth Study
            </label>
            <select id="select-p2bd" style="width:100%;padding:8px 10px;border-radius:6px;border:1.5px solid #cbd5e1;font-size:0.88rem;background:#ffffff;color:#0f172a;">
              ${p2BdOptions
                .map(
                  (o) => `
                <option value="${o.id}" ${activePaperIds.includes(o.id) ? 'selected' : ''}>
                  Option ${o.code}: ${o.title}
                </option>
              `,
                )
                .join('')}
            </select>
          </div>

          <!-- Paper 2 PS -->
          <div style="margin-bottom:14px;">
            <label for="select-p2ps" style="display:block;font-size:0.8rem;font-weight:800;text-transform:uppercase;color:#d97706;margin-bottom:4px;">
              Paper 2 (Booklet P): Period Study
            </label>
            <select id="select-p2ps" style="width:100%;padding:8px 10px;border-radius:6px;border:1.5px solid #cbd5e1;font-size:0.88rem;background:#ffffff;color:#0f172a;">
              ${p2PsOptions
                .map(
                  (o) => `
                <option value="${o.id}" ${activePaperIds.includes(o.id) ? 'selected' : ''}>
                  Option ${o.code}: ${o.title}
                </option>
              `,
                )
                .join('')}
            </select>
          </div>

          <!-- Paper 3 -->
          <div style="margin-bottom:20px;">
            <label for="select-p3" style="display:block;font-size:0.8rem;font-weight:800;text-transform:uppercase;color:#6366f1;margin-bottom:4px;">
              Paper 3: Modern Depth Study
            </label>
            <select id="select-p3" style="width:100%;padding:8px 10px;border-radius:6px;border:1.5px solid #cbd5e1;font-size:0.88rem;background:#ffffff;color:#0f172a;">
              ${p3Options
                .map(
                  (o) => `
                <option value="${o.id}" ${activePaperIds.includes(o.id) ? 'selected' : ''}>
                  Option ${o.code}: ${o.title}
                </option>
              `,
                )
                .join('')}
            </select>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;border-top:1.5px solid #e2e8f0;padding-top:14px;flex-wrap:wrap;gap:10px;">
            <button type="button" class="btn" id="btn-modal-reset-bottom" style="background:#fff1f2;border:1px solid #fecdd3;color:#be123c;padding:8px 14px;border-radius:6px;font-size:0.82rem;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
              <i class="fa-solid fa-rotate-left"></i> Reset Defaults
            </button>

            <div style="display:flex;gap:10px;">
              <button type="button" class="btn" id="btn-cancel-modal" style="background:#f1f5f9;color:#475569;padding:9px 16px;border-radius:6px;font-size:0.85rem;font-weight:700;cursor:pointer;">
                ${isFirstTime ? 'Keep Defaults &amp; Continue' : 'Cancel'}
              </button>
              <button type="submit" class="btn" style="background:#1e3a8a;color:#ffffff;padding:9px 22px;border-radius:6px;font-size:0.86rem;font-weight:800;cursor:pointer;box-shadow:0 3px 10px rgba(30,58,138,0.25);">
                ${isFirstTime ? '<i class="fa-solid fa-circle-check"></i> Confirm &amp; Start Revising' : '<i class="fa-solid fa-floppy-disk"></i> Save &amp; Update Tracker'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = document.getElementById('gcse-pathway-modal');
  const closeModal = () => {
    try {
      localStorage.setItem(STORAGE_KEY_CONFIGURED, 'true');
    } catch (e) {}
    if (modal) modal.remove();
  };

  document.getElementById('btn-close-modal').onclick = closeModal;
  document.getElementById('btn-cancel-modal').onclick = closeModal;

  const resetToDefaults = () => {
    document.getElementById('select-p1').value = DEFAULT_PAPERS[0];
    document.getElementById('select-p2bd').value = DEFAULT_PAPERS[1];
    document.getElementById('select-p2ps').value = DEFAULT_PAPERS[2];
    document.getElementById('select-p3').value = DEFAULT_PAPERS[3];
    const notice = document.getElementById('pathway-preset-feedback');
    if (notice) {
      notice.innerHTML =
        '<span style="color:#059669;font-size:0.78rem;font-weight:700;"><i class="fa-solid fa-circle-check"></i> Reset to standard 4 baseline papers! Click Confirm/Save below to apply.</span>';
    }
  };

  const btnResetTop = document.getElementById('btn-reset-default-papers');
  if (btnResetTop) btnResetTop.onclick = resetToDefaults;

  const btnResetBottom = document.getElementById('btn-modal-reset-bottom');
  if (btnResetBottom) btnResetBottom.onclick = resetToDefaults;

  // Preset 2026
  document.getElementById('btn-preset-2026').onclick = () => {
    resetToDefaults();
  };

  // Preset Alternate
  document.getElementById('btn-preset-alt').onclick = () => {
    document.getElementById('select-p1').value = 'paper1_11_medicine_britain';
    document.getElementById('select-p2bd').value = 'paper2_b4_early_elizabethan_england';
    document.getElementById('select-p2ps').value = 'paper2_p4_superpower_cold_war';
    document.getElementById('select-p3').value = 'paper3_31_weimar_nazi_germany';
    const notice = document.getElementById('pathway-preset-feedback');
    if (notice) {
      notice.innerHTML =
        '<span style="color:#2563eb;font-size:0.78rem;font-weight:700;"><i class="fa-solid fa-sliders"></i> Switched to Alternate (Cold War &amp; Germany). Click Confirm/Save below to apply.</span>';
    }
  };

  // Form Submit
  document.getElementById('gcse-pathway-form').onsubmit = async (e) => {
    e.preventDefault();
    const p1 = document.getElementById('select-p1').value;
    const p2bd = document.getElementById('select-p2bd').value;
    const p2ps = document.getElementById('select-p2ps').value;
    const p3 = document.getElementById('select-p3').value;

    activePaperIds = [p1, p2bd, p2ps, p3];
    saveSelectedPapers();
    try {
      localStorage.setItem(STORAGE_KEY_CONFIGURED, 'true');
    } catch (e) {}
    closeModal();

    // Re-render
    await renderGcseSpecTracker(activeTab);
  };
}

// --- Utility Helpers ---
function formatBold(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
