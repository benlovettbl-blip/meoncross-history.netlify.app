/**
 * GCSE History Revision Hub — Dual-Spread In-Page Digital Reader Companion
 *
 * Interactive two-page spread reader allowing pupils and teachers to read course
 * textbooks online with 1:1 reprographic fidelity matching physical printed booklets.
 *
 * Features:
 * - Authentic Dual-Spread 3D Book Mode (facing pages side-by-side) with spine cleft shadow
 * - Single-Page Focused Reading Mode (with mobile auto-detection)
 * - Auto-Fit Zoom Scaling to any viewport (laptops, interactive whiteboards, tablets)
 * - Interactive Spread Filmstrip Navigator & Key Topic Switcher (KT1, KT2, KT3)
 * - Disciplinary Text-to-Speech Audio Reader with sentence synthesis & equalizer animation
 * - Keyboard Arrow Navigation (←/→), Fullscreen toggle, and direct PDF download/print
 * - Strict School Anonymity & Pearson Edexcel GCSE Specification Compliance
 */

import { state } from './state.js';

// Curriculum Registry of Standard 12-Page Masterpiece Textbooks
export const TEXTBOOK_CATALOG = {
  cme_new: {
    unitTitle: 'Conflict in the Middle East, 1945–1995',
    unitCode: 'Option 26/27 (Paper 2)',
    badgeColor: '#0284c7',
    keyTopics: {
      KT1: {
        id: 'KT1',
        title: 'Key Topic 1: The Creation of the State of Israel (1945–56)',
        shortTitle: 'KT1: Creation of Israel',
        period: '1945–1956',
        htmlUrl: '/units/cme_new/textbook_KT1_PUBLISHER.html',
        pdfUrl: '/pdfs/cme_new_textbook_KT1_PUBLISHER.pdf',
        spreads: [
          {
            index: 0,
            pages: [1],
            label: 'Front Cover',
            subtitle: 'Course Overview & Specification Matrix',
            isCover: true,
          },
          {
            index: 1,
            pages: [2, 3],
            label: 'Enquiry 1.1',
            subtitle: 'Broken Promises & Imperial Borders (1915–1945)',
            topic: 'Ottoman Collapse, McMahon, Sykes-Picot, Balfour & 1939 White Paper',
          },
          {
            index: 2,
            pages: [4, 5],
            label: 'Enquiry 1.2',
            subtitle: 'Post-War Crisis & UN Partition (1945–1947)',
            topic: 'Jewish Insurgency, King David Hotel, SS Exodus & UN Resolution 181',
          },
          {
            index: 3,
            pages: [6, 7],
            label: 'Enquiry 1.3',
            subtitle: 'The 1948–49 War & Armistices (1948–1949)',
            topic:
              'Declaration of Independence, Five Arab Armies, UN Truce, Czech Arms & Green Line',
          },
          {
            index: 4,
            pages: [8, 9],
            label: 'Enquiry 1.4',
            subtitle: 'The Palestinian Refugee Catastrophe (1948–1950)',
            topic:
              'The Nakba (700,000 Displaced), Plan Dalet, UN Resolution 194, UNRWA & Law of Return',
          },
          {
            index: 5,
            pages: [10, 11],
            label: 'Enquiry 1.5',
            subtitle: 'The Suez Crisis & Superpowers (1955–1956)',
            topic: 'Rise of Nasser, Canal Nationalisation, Secret Tripartite Collusion & UNEF',
          },
          {
            index: 6,
            pages: [12],
            label: 'Back Cover',
            subtitle: 'Chronological Master Matrix & Tariffs',
            isBackCover: true,
          },
        ],
      },
      KT2: {
        id: 'KT2',
        title: 'Key Topic 2: The Escalating Conflict (1964–73)',
        shortTitle: 'KT2: Escalating Conflict',
        period: '1964–1973',
        htmlUrl: '/units/cme_new/textbook_KT2_PUBLISHER.html',
        pdfUrl: '/pdfs/cme_new_textbook_KT2_PUBLISHER.pdf',
        spreads: [
          {
            index: 0,
            pages: [1],
            label: 'Front Cover',
            subtitle: 'Course Overview & Specification Matrix',
            isCover: true,
          },
          {
            index: 1,
            pages: [2, 3],
            label: 'Enquiry 2.1',
            subtitle: 'Escalation to the Six-Day War (1964–1967)',
            topic:
              'Cairo Summit, Water Wars, Samu Raid, April Air Battle, UNEF Expulsion & Tiran Blockade',
          },
          {
            index: 2,
            pages: [4, 5],
            label: 'Enquiry 2.2',
            subtitle: 'The Six-Day Blitz (5–10 June 1967)',
            topic:
              'Pre-emptive Dawn Airstrike, Sinai, Gaza, West Bank, East Jerusalem & Golan Heights',
          },
          {
            index: 3,
            pages: [6, 7],
            label: 'Enquiry 2.3',
            subtitle: 'Aftermath of 1967: The Three Noes (1967–1968)',
            topic:
              'Khartoum Arab Summit, UN Resolution 242 (Land for Peace) & Strategic Buffer Settlements',
          },
          {
            index: 4,
            pages: [8, 9],
            label: 'Enquiry 2.4',
            subtitle: 'Palestinian Resistance & Terror (1968–1972)',
            topic:
              'Battle of Karameh, Dawson’s Field Hijackings, Black September in Jordan & Munich 1972',
          },
          {
            index: 5,
            pages: [10, 11],
            label: 'Enquiry 2.5',
            subtitle: 'Yom Kippur War & OPEC Embargo (1969–1973)',
            topic:
              'War of Attrition, Bar-Lev Breach, Coordinated Surprise Strike, Sharon Crossing & Oil Weapon',
          },
          {
            index: 6,
            pages: [12],
            label: 'Back Cover',
            subtitle: 'Chronological Master Matrix & Tariffs',
            isBackCover: true,
          },
        ],
      },
      KT3: {
        id: 'KT3',
        title: 'Key Topic 3: The Search for Peace (1974–95)',
        shortTitle: 'KT3: Search for Peace',
        period: '1974–1995',
        htmlUrl: '/units/cme_new/textbook_KT3_PUBLISHER.html',
        pdfUrl: '/pdfs/cme_new_textbook_KT3_PUBLISHER.pdf',
        spreads: [
          {
            index: 0,
            pages: [1],
            label: 'Front Cover',
            subtitle: 'Course Overview & Specification Matrix',
            isCover: true,
          },
          {
            index: 1,
            pages: [2, 3],
            label: 'Enquiry 3.1',
            subtitle: 'Shuttle Diplomacy to Jerusalem (1974–1978)',
            topic:
              '1973 Oil Shock, Kissinger Shuttle Diplomacy, Suez Canal Reopened & Begin Elected',
          },
          {
            index: 2,
            pages: [4, 5],
            label: 'Enquiry 3.2',
            subtitle: 'Camp David to Washington (1977–1979)',
            topic:
              'Sadat’s Knesset Speech, Carter’s Camp David Accords, Peace Treaty & Arab League Expulsion',
          },
          {
            index: 3,
            pages: [6, 7],
            label: 'Enquiry 3.3',
            subtitle: 'The Lebanon War & Sabra-Shatila (1982)',
            topic:
              'Coastal Road, Operation Peace for Galilee, Siege of Beirut, Refugee Massacres & Kahan Inquiry',
          },
          {
            index: 4,
            pages: [8, 9],
            label: 'Enquiry 3.4',
            subtitle: 'The First Intifada & Rise of Hamas (1987–1993)',
            topic: 'Gaza Incident, UNLU Civil Disobedience, IDF Iron Fist & Formation of Hamas',
          },
          {
            index: 5,
            pages: [10, 11],
            label: 'Enquiry 3.5',
            subtitle: 'Madrid to Oslo: Peace & Assassination (1988–1995)',
            topic:
              'Arafat Renounces Terror, 1991 Madrid Conference, Oslo I & II Handshake & Rabin Assassination',
          },
          {
            index: 6,
            pages: [12],
            label: 'Back Cover',
            subtitle: 'Chronological Master Matrix & Tariffs',
            isBackCover: true,
          },
        ],
      },
    },
  },
};

// Internal Cache for Parsed Textbook Documents
const parsedBookCache = new Map();

// Active Reader State
let currentReader = {
  unitId: 'cme_new',
  ktId: 'KT1',
  spreadIndex: 1, // Default to Enquiry 1.1 (pp. 2-3)
  viewMode: 'dual', // 'dual' | 'single'
  singlePageIndex: 2, // 1-indexed page number
  zoomLevel: 1.0,
  isAudioPlaying: false,
  isAudioPaused: false,
  audioUtterance: null,
  iframeLoaded: false,
};

/**
 * Fetch and extract pages and CSS styles from a published standard textbook HTML file.
 */
async function loadTextbookData(unitId, ktId) {
  const cacheKey = `${unitId}_${ktId}`;
  if (parsedBookCache.has(cacheKey)) {
    return parsedBookCache.get(cacheKey);
  }

  const unitConfig = TEXTBOOK_CATALOG[unitId];
  if (!unitConfig || !unitConfig.keyTopics[ktId]) {
    throw new Error(`Textbook configuration not found for ${unitId} ${ktId}`);
  }

  const ktData = unitConfig.keyTopics[ktId];
  const response = await fetch(ktData.htmlUrl);
  if (!response.ok) {
    throw new Error(`Failed to load textbook HTML (${response.status}) from ${ktData.htmlUrl}`);
  }

  const htmlText = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, 'text/html');

  // Extract font links and styles
  const fontLinks = Array.from(
    doc.querySelectorAll('link[rel="stylesheet"], link[rel="preconnect"]'),
  )
    .map((el) => el.outerHTML)
    .join('\n');

  const styleContents = Array.from(doc.querySelectorAll('style'))
    .map((el) => el.textContent)
    .join('\n');

  // Extract all 12 .textbook-page elements
  const rawPages = Array.from(doc.querySelectorAll('.textbook-page'));
  const pagesHtml = rawPages.map((pageEl) => {
    // Return clean inner content
    return pageEl.innerHTML;
  });

  const bundle = {
    unitId,
    ktId,
    fontLinks,
    styleContents,
    pagesHtml,
    pageCount: pagesHtml.length,
    ktData,
  };

  parsedBookCache.set(cacheKey, bundle);
  return bundle;
}

/**
 * Primary View Renderer for the Dual-Spread Digital Reader
 */
export async function renderDigitalReaderView(param, targetContainer = null) {
  const contentArea = targetContainer || document.getElementById('main-content');
  if (!contentArea) return;

  // Parse param: e.g. "cme_new:KT1:1" or "cme_new:KT2" or "cme_new"
  let initialUnit = 'cme_new';
  let initialKT = 'KT1';
  let initialSpread = 1;

  if (param) {
    const parts = String(param).split(':');
    if (parts[0] && TEXTBOOK_CATALOG[parts[0]]) {
      initialUnit = parts[0];
    }
    if (parts[1] && (parts[1] === 'KT1' || parts[1] === 'KT2' || parts[1] === 'KT3')) {
      initialKT = parts[1];
    }
    if (parts[2] !== undefined && !isNaN(parseInt(parts[2], 10))) {
      initialSpread = parseInt(parts[2], 10);
    }
  } else if (state.selectedUnitId && TEXTBOOK_CATALOG[state.selectedUnitId]) {
    initialUnit = state.selectedUnitId;
  }

  currentReader.unitId = initialUnit;
  currentReader.ktId = initialKT;
  currentReader.spreadIndex = initialSpread;
  currentReader.singlePageIndex = initialSpread === 0 ? 1 : initialSpread * 2;
  currentReader.zoomLevel = 1.0;

  // Auto-switch to single page mode on narrow screens (< 900px)
  if (window.innerWidth < 900) {
    currentReader.viewMode = 'single';
  } else {
    currentReader.viewMode = 'dual';
  }

  // Render Reader Shell with Rich Aesthetics
  contentArea.innerHTML = `
    <div id="digital-reader-root" style="display: flex; flex-direction: column; width: 100%; height: calc(100vh - 65px); max-height: calc(100vh - 65px); background: #090d16; color: #f8fafc; font-family: 'Inter', system-ui, -apple-system, sans-serif; position: relative; overflow: hidden; box-sizing: border-box;">
      
      <!-- Top Archival Navigation & Toolstrip -->
      <header style="background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding: 8px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; z-index: 40; box-shadow: 0 4px 20px rgba(0,0,0,0.4); flex-shrink: 0;">
        
        <!-- Left: Back Button & Topic Selector -->
        <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
          <button id="reader-btn-exit" type="button" style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); color: #cbd5e1; border-radius: 6px; padding: 6px 12px; font-size: 0.78rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s ease;" title="Exit Reader & Return to Booklets">
            <i class="fa-solid fa-arrow-left"></i> Booklets
          </button>

          <div style="height: 24px; width: 1px; background: rgba(255, 255, 255, 0.15);"></div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 0.65rem; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; background: rgba(2, 132, 199, 0.2); color: #38bdf8; padding: 2px 7px; border-radius: 4px; border: 1px solid rgba(56, 189, 248, 0.35);">
              DUAL-SPREAD DIGITAL READER
            </span>

            <!-- Key Topic Selector Pills -->
            <div id="reader-topic-pills" style="display: flex; align-items: center; background: rgba(0, 0, 0, 0.35); padding: 3px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.08); gap: 4px;">
              ${['KT1', 'KT2', 'KT3']
                .map(
                  (kt) => `
                <button type="button" data-kt="${kt}" class="reader-kt-pill" style="background: ${currentReader.ktId === kt ? '#0284c7' : 'transparent'}; color: ${currentReader.ktId === kt ? '#ffffff' : '#94a3b8'}; border: none; border-radius: 4px; padding: 4px 10px; font-size: 0.75rem; font-weight: 800; cursor: pointer; transition: all 0.15s ease;">
                  ${kt}
                </button>
              `,
                )
                .join('')}
            </div>
          </div>
        </div>

        <!-- Center: Current Spread Title & Pagination -->
        <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
          <div id="reader-spread-badge" style="font-size: 0.72rem; font-weight: 800; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.04em;">
            Loading Textbook...
          </div>
          <div id="reader-spread-title" style="font-size: 0.92rem; font-weight: 800; color: #ffffff; letter-spacing: -0.01em; max-width: 500px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            Preparing Archival Spread...
          </div>
        </div>

        <!-- Right: Audio, View Mode, Zoom & PDF Tools -->
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          
          <!-- Audio Read-Aloud Button -->
          <button id="reader-btn-audio" type="button" style="background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.35); color: #fbbf24; border-radius: 6px; padding: 6px 12px; font-size: 0.76rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s ease;" title="Read Active Spread Aloud">
            <i class="fa-solid fa-volume-high"></i> <span id="reader-audio-label">Read Spread</span>
          </button>

          <!-- Mode Switcher (Dual vs Single) -->
          <div style="display: flex; align-items: center; background: rgba(0, 0, 0, 0.35); padding: 3px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.08); gap: 2px;">
            <button id="reader-btn-mode-dual" type="button" style="background: ${currentReader.viewMode === 'dual' ? '#334155' : 'transparent'}; color: ${currentReader.viewMode === 'dual' ? '#ffffff' : '#94a3b8'}; border: none; border-radius: 4px; padding: 4px 8px; font-size: 0.72rem; font-weight: 700; cursor: pointer;" title="Two-Page Spread Mode">
              <i class="fa-solid fa-book-open"></i> Spread
            </button>
            <button id="reader-btn-mode-single" type="button" style="background: ${currentReader.viewMode === 'single' ? '#334155' : 'transparent'}; color: ${currentReader.viewMode === 'single' ? '#ffffff' : '#94a3b8'}; border: none; border-radius: 4px; padding: 4px 8px; font-size: 0.72rem; font-weight: 700; cursor: pointer;" title="Single Page Mode">
              <i class="fa-solid fa-file"></i> Page
            </button>
          </div>

          <!-- Zoom Controls -->
          <div style="display: flex; align-items: center; background: rgba(0, 0, 0, 0.35); padding: 3px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.08); gap: 4px;">
            <button id="reader-btn-zoom-out" type="button" style="background: transparent; border: none; color: #cbd5e1; padding: 4px 8px; cursor: pointer; font-size: 0.8rem;" title="Zoom Out">-</button>
            <button id="reader-btn-zoom-fit" type="button" style="background: transparent; border: none; color: #38bdf8; padding: 2px 6px; cursor: pointer; font-size: 0.72rem; font-weight: 800;" title="Reset Zoom to Fit">FIT</button>
            <button id="reader-btn-zoom-in" type="button" style="background: transparent; border: none; color: #cbd5e1; padding: 4px 8px; cursor: pointer; font-size: 0.8rem;" title="Zoom In">+</button>
          </div>

          <!-- Direct Print & PDF Downloads -->
          <button id="reader-btn-print" type="button" style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); color: #cbd5e1; border-radius: 6px; padding: 6px 10px; font-size: 0.76rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 5px;" title="Print Active Spread">
            <i class="fa-solid fa-print"></i>
          </button>
          
          <a id="reader-btn-download" href="#" target="_blank" download style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.35); color: #34d399; border-radius: 6px; padding: 6px 12px; font-size: 0.76rem; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;" title="Download Official High-Res 12-Page PDF">
            <i class="fa-solid fa-file-arrow-down"></i> PDF
          </a>

          <!-- Fullscreen Toggle -->
          <button id="reader-btn-fullscreen" type="button" style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); color: #cbd5e1; border-radius: 6px; width: 32px; height: 32px; font-size: 0.82rem; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="Toggle Fullscreen">
            <i class="fa-solid fa-expand"></i>
          </button>

        </div>
      </header>

      <!-- Main Stage Viewport (Iframe Sandbox with Responsive Auto-Fit Scaling) -->
      <main id="reader-viewport" style="flex: 1; min-height: 0; position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at center, #131d31 0%, #080c14 100%); overflow: hidden;">
        
        <!-- Loading Spinner -->
        <div id="reader-loader" style="position: absolute; display: flex; flex-direction: column; align-items: center; gap: 14px; color: #94a3b8; font-size: 0.95rem; font-weight: 600; z-index: 10;">
          <div style="width: 44px; height: 44px; border: 3px solid rgba(56, 189, 248, 0.2); border-top-color: #38bdf8; border-radius: 50%; animation: readerSpin 0.8s linear infinite;"></div>
          <span>Loading Publisher Standard Textbook...</span>
        </div>

        <!-- Floating Left Navigation Arrow -->
        <button id="reader-arrow-prev" type="button" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); width: 48px; height: 48px; border-radius: 50%; background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.15); color: #ffffff; font-size: 1.25rem; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 30; transition: all 0.2s ease; box-shadow: 0 4px 16px rgba(0,0,0,0.5);" title="Previous Spread (Left Arrow)">
          <i class="fa-solid fa-chevron-left"></i>
        </button>

        <!-- Floating Right Navigation Arrow -->
        <button id="reader-arrow-next" type="button" style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); width: 48px; height: 48px; border-radius: 50%; background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.15); color: #ffffff; font-size: 1.25rem; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 30; transition: all 0.2s ease; box-shadow: 0 4px 16px rgba(0,0,0,0.5);" title="Next Spread (Right Arrow)">
          <i class="fa-solid fa-chevron-right"></i>
        </button>

        <!-- Isolated Reprographic Display Iframe -->
        <iframe id="readerStageIframe" src="about:blank" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; background: transparent; opacity: 0; transition: opacity 0.25s ease; z-index: 5;"></iframe>

      </main>

      <!-- Bottom Filmstrip / Thumbnails Strip -->
      <footer style="background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-top: 1px solid rgba(255, 255, 255, 0.1); padding: 8px 16px; display: flex; align-items: center; justify-content: center; z-index: 40; box-shadow: 0 -4px 20px rgba(0,0,0,0.3); flex-shrink: 0;">

        <div id="reader-filmstrip" style="display: flex; align-items: center; gap: 8px; overflow-x: auto; max-width: 100%; padding: 4px 2px; scrollbar-width: thin;">
          <!-- Spread Pills injected dynamically -->
        </div>
      </footer>

      <!-- CSS Animation Helpers -->
      <style>
        @keyframes readerSpin {
          to { transform: rotate(360deg); }
        }
        .reader-kt-pill:hover {
          color: #ffffff !important;
          background: rgba(255, 255, 255, 0.1) !important;
        }
        .reader-filmstrip-tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 6px 12px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #94a3b8;
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s ease;
          white-space: nowrap;
          user-select: none;
        }
        .reader-filmstrip-tab:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #f8fafc;
          border-color: rgba(255, 255, 255, 0.2);
        }
        .reader-filmstrip-tab.active {
          background: #0284c7;
          border-color: #38bdf8;
          color: #ffffff;
          box-shadow: 0 2px 10px rgba(2, 132, 199, 0.4);
        }
        .reader-filmstrip-tab.active span.badge {
          background: #ffffff;
          color: #0369a1;
        }
        #reader-arrow-prev:hover, #reader-arrow-next:hover {
          background: #0284c7 !important;
          border-color: #38bdf8 !important;
          transform: translateY(-50%) scale(1.08) !important;
        }
        @keyframes pulseEqualizer {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.04); }
        }
        .audio-playing {
          animation: pulseEqualizer 1.5s ease-in-out infinite;
          background: #d97706 !important;
          color: #ffffff !important;
          border-color: #f59e0b !important;
        }
      </style>

    </div>
  `;

  // Attach Event Handlers & Initialize Reader Stage
  attachReaderEvents();
  await loadAndDisplaySpread();
}

/**
 * Wire up all toolbar, hotkey, and navigation interactions
 */
function attachReaderEvents() {
  // Exit Button -> Back to Booklets View
  const btnExit = document.getElementById('reader-btn-exit');
  if (btnExit) {
    btnExit.onclick = () => {
      stopAudioNarration();
      if (window.switchView) {
        window.switchView('booklet', currentReader.unitId);
      }
    };
  }

  // Key Topic Switcher Pills
  const topicPills = document.querySelectorAll('.reader-kt-pill');
  topicPills.forEach((pill) => {
    pill.onclick = async () => {
      const kt = pill.dataset.kt;
      if (kt && kt !== currentReader.ktId) {
        stopAudioNarration();
        currentReader.ktId = kt;
        currentReader.spreadIndex = 1; // Default to Enquiry X.1
        currentReader.singlePageIndex = 2;
        updateTopicPillsUI();
        await loadAndDisplaySpread();
      }
    };
  });

  // Prev / Next Arrows
  const btnPrev = document.getElementById('reader-arrow-prev');
  const btnNext = document.getElementById('reader-arrow-next');
  if (btnPrev) btnPrev.onclick = () => navigateSpread(-1);
  if (btnNext) btnNext.onclick = () => navigateSpread(1);

  // View Mode: Dual vs Single
  const btnDual = document.getElementById('reader-btn-mode-dual');
  const btnSingle = document.getElementById('reader-btn-mode-single');
  if (btnDual) {
    btnDual.onclick = () => {
      if (currentReader.viewMode !== 'dual') {
        currentReader.viewMode = 'dual';
        btnDual.style.background = '#334155';
        btnDual.style.color = '#ffffff';
        if (btnSingle) {
          btnSingle.style.background = 'transparent';
          btnSingle.style.color = '#94a3b8';
        }
        renderSpreadInIframe();
      }
    };
  }
  if (btnSingle) {
    btnSingle.onclick = () => {
      if (currentReader.viewMode !== 'single') {
        currentReader.viewMode = 'single';
        btnSingle.style.background = '#334155';
        btnSingle.style.color = '#ffffff';
        if (btnDual) {
          btnDual.style.background = 'transparent';
          btnDual.style.color = '#94a3b8';
        }
        renderSpreadInIframe();
      }
    };
  }

  // Zoom Controls
  const btnZoomIn = document.getElementById('reader-btn-zoom-in');
  const btnZoomOut = document.getElementById('reader-btn-zoom-out');
  const btnZoomFit = document.getElementById('reader-btn-zoom-fit');

  if (btnZoomIn) {
    btnZoomIn.onclick = () => {
      currentReader.zoomLevel = Math.min(currentReader.zoomLevel + 0.15, 2.0);
      applyIframeZoom();
    };
  }
  if (btnZoomOut) {
    btnZoomOut.onclick = () => {
      currentReader.zoomLevel = Math.max(currentReader.zoomLevel - 0.15, 0.4);
      applyIframeZoom();
    };
  }
  if (btnZoomFit) {
    btnZoomFit.onclick = () => {
      currentReader.zoomLevel = 1.0;
      applyIframeZoom(true);
    };
  }

  // Audio Read-Aloud Toggle
  const btnAudio = document.getElementById('reader-btn-audio');
  if (btnAudio) {
    btnAudio.onclick = () => toggleAudioNarration();
  }

  // Print Spread
  const btnPrint = document.getElementById('reader-btn-print');
  if (btnPrint) {
    btnPrint.onclick = () => {
      const iframe = document.getElementById('readerStageIframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      }
    };
  }

  // Fullscreen Toggle
  const btnFullscreen = document.getElementById('reader-btn-fullscreen');
  if (btnFullscreen) {
    btnFullscreen.onclick = () => {
      const root = document.getElementById('digital-reader-root');
      if (!document.fullscreenElement) {
        if (root && root.requestFullscreen) root.requestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    };
  }

  // Keyboard Shortcuts
  window.onkeydown = (e) => {
    // Only capture when reader is active in DOM
    if (!document.getElementById('digital-reader-root')) return;

    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      e.preventDefault();
      navigateSpread(1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      navigateSpread(-1);
    } else if (e.key === ' ' && !e.target.matches('input, textarea')) {
      e.preventDefault();
      navigateSpread(1);
    } else if (e.key === 'f' || e.key === 'F') {
      if (btnFullscreen) btnFullscreen.click();
    } else if (e.key === 'Escape' && document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  // Window Resize -> Re-scale iframe to fit
  window.onresize = () => {
    applyIframeZoom(true);
  };
}

/**
 * Update Key Topic pills active visual state
 */
function updateTopicPillsUI() {
  const topicPills = document.querySelectorAll('.reader-kt-pill');
  topicPills.forEach((pill) => {
    const isTarget = pill.dataset.kt === currentReader.ktId;
    pill.style.background = isTarget ? '#0284c7' : 'transparent';
    pill.style.color = isTarget ? '#ffffff' : '#94a3b8';
  });
}

/**
 * Navigate to next or previous spread
 */
function navigateSpread(direction) {
  stopAudioNarration();

  const unitConfig = TEXTBOOK_CATALOG[currentReader.unitId];
  const ktData = unitConfig.keyTopics[currentReader.ktId];
  const maxSpread = ktData.spreads.length - 1;

  if (currentReader.viewMode === 'single') {
    // Single page step
    const newPage = currentReader.singlePageIndex + direction;
    if (newPage >= 1 && newPage <= 12) {
      currentReader.singlePageIndex = newPage;
      // Also update spreadIndex to match
      if (newPage === 1) currentReader.spreadIndex = 0;
      else if (newPage === 12) currentReader.spreadIndex = maxSpread;
      else currentReader.spreadIndex = Math.floor(newPage / 2);
      renderSpreadInIframe();
    }
  } else {
    // Dual spread step
    const newSpread = currentReader.spreadIndex + direction;
    if (newSpread >= 0 && newSpread <= maxSpread) {
      currentReader.spreadIndex = newSpread;
      currentReader.singlePageIndex = newSpread === 0 ? 1 : newSpread * 2;
      renderSpreadInIframe();
    }
  }
}

/**
 * Load textbook bundle and trigger iframe rendering
 */
async function loadAndDisplaySpread() {
  const loader = document.getElementById('reader-loader');
  const iframe = document.getElementById('readerStageIframe');
  if (loader) loader.style.display = 'flex';
  if (iframe) iframe.style.opacity = '0';

  try {
    const bundle = await loadTextbookData(currentReader.unitId, currentReader.ktId);

    // Update PDF download link
    const btnDownload = document.getElementById('reader-btn-download');
    if (btnDownload) {
      btnDownload.href = bundle.ktData.pdfUrl;
      btnDownload.download = `${currentReader.unitId}_textbook_${currentReader.ktId}_PUBLISHER.pdf`;
    }

    // Build bottom filmstrip
    renderFilmstrip(bundle.ktData);

    // Render active spread inside iframe
    renderSpreadInIframe(bundle);
  } catch (err) {
    console.error('Failed to render textbook spread:', err);
    if (loader) {
      loader.innerHTML = `
        <i class="fa-solid fa-triangle-exclamation" style="color: #ef4444; font-size: 2rem;"></i>
        <span style="color: #f87171;">Failed to load textbook: ${err.message}</span>
        <button type="button" onclick="window.renderDigitalReaderView('${currentReader.unitId}:${currentReader.ktId}')" style="background: #0284c7; color: #fff; border: none; padding: 6px 14px; border-radius: 4px; font-weight: 700; cursor: pointer;">
          Retry Loading
        </button>
      `;
    }
  }
}

/**
 * Render the bottom filmstrip navigation tabs
 */
function renderFilmstrip(ktData) {
  const filmstrip = document.getElementById('reader-filmstrip');
  if (!filmstrip) return;

  filmstrip.innerHTML = ktData.spreads
    .map((spread) => {
      const isActive = spread.index === currentReader.spreadIndex;
      const pageLabel =
        spread.pages.length === 1
          ? `p. ${spread.pages[0]}`
          : `pp. ${spread.pages[0]}–${spread.pages[1]}`;

      return `
      <div class="reader-filmstrip-tab ${isActive ? 'active' : ''}" data-index="${spread.index}" onclick="window.jumpToSpread(${spread.index})">
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
          <span style="font-size: 0.62rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em;">${spread.label}</span>
          <span class="badge" style="font-size: 0.6rem; font-weight: 800; padding: 1px 4px; border-radius: 2px; background: rgba(255, 255, 255, 0.15); color: inherit;">
            ${pageLabel}
          </span>
        </div>
        <span style="font-size: 0.68rem; opacity: 0.85; max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${spread.subtitle}
        </span>
      </div>
    `;
    })
    .join('');
}

/**
 * Jump to a specific spread from the filmstrip
 */
window.jumpToSpread = function (index) {
  stopAudioNarration();
  currentReader.spreadIndex = index;
  currentReader.singlePageIndex = index === 0 ? 1 : index * 2;
  renderSpreadInIframe();
};

/**
 * Write the spread HTML into the stage iframe with exact A4 proportions & 3D styling
 */
function renderSpreadInIframe(preloadedBundle = null) {
  const cacheKey = `${currentReader.unitId}_${currentReader.ktId}`;
  const bundle = preloadedBundle || parsedBookCache.get(cacheKey);
  if (!bundle) return;

  const iframe = document.getElementById('readerStageIframe');
  const loader = document.getElementById('reader-loader');
  const spreadTitleEl = document.getElementById('reader-spread-title');
  const spreadBadgeEl = document.getElementById('reader-spread-badge');
  const btnPrev = document.getElementById('reader-arrow-prev');
  const btnNext = document.getElementById('reader-arrow-next');

  if (!iframe) return;

  const ktData = bundle.ktData;
  const currentSpread = ktData.spreads[currentReader.spreadIndex] || ktData.spreads[1];

  // Update Toolbar Header Info
  if (spreadBadgeEl) {
    spreadBadgeEl.textContent = `${bundle.ktData.shortTitle} • Spread ${currentSpread.index} of ${ktData.spreads.length - 1} (${currentSpread.pages.length === 1 ? `Page ${currentSpread.pages[0]}` : `Pages ${currentSpread.pages[0]}–${currentSpread.pages[1]}`})`;
  }
  if (spreadTitleEl) {
    spreadTitleEl.textContent = currentSpread.subtitle;
  }

  // Update Prev / Next Arrow States
  if (btnPrev) {
    const isFirst =
      currentReader.viewMode === 'single'
        ? currentReader.singlePageIndex <= 1
        : currentReader.spreadIndex <= 0;
    btnPrev.style.opacity = isFirst ? '0.3' : '1';
    btnPrev.style.pointerEvents = isFirst ? 'none' : 'auto';
  }
  if (btnNext) {
    const isLast =
      currentReader.viewMode === 'single'
        ? currentReader.singlePageIndex >= 12
        : currentReader.spreadIndex >= ktData.spreads.length - 1;
    btnNext.style.opacity = isLast ? '0.3' : '1';
    btnNext.style.pointerEvents = isLast ? 'none' : 'auto';
  }

  // Update active state in bottom filmstrip tabs
  const tabs = document.querySelectorAll('.reader-filmstrip-tab');
  tabs.forEach((tab) => {
    const idx = parseInt(tab.dataset.index, 10);
    if (idx === currentReader.spreadIndex) tab.classList.add('active');
    else tab.classList.remove('active');
  });

  // Determine pages to display
  let leftPageContent = '';
  let rightPageContent = '';
  let isSingleCover = false;

  if (currentReader.viewMode === 'single') {
    // Single page mode: show singlePageIndex (1 to 12)
    const pIndex = currentReader.singlePageIndex - 1;
    rightPageContent = bundle.pagesHtml[pIndex] || '';
    isSingleCover = true;
  } else {
    // Dual spread mode
    if (currentSpread.isCover) {
      // Front Cover (Page 1) centered alone
      rightPageContent = bundle.pagesHtml[0] || '';
      isSingleCover = true;
    } else if (currentSpread.isBackCover) {
      // Back Cover (Page 12) centered alone
      rightPageContent = bundle.pagesHtml[11] || '';
      isSingleCover = true;
    } else {
      // Enquiry Spreads: Left page (e.g. 2, 4, 6) and Right page (e.g. 3, 5, 7)
      const leftPageNum = currentSpread.pages[0];
      const rightPageNum = currentSpread.pages[1];
      leftPageContent = bundle.pagesHtml[leftPageNum - 1] || '';
      rightPageContent = bundle.pagesHtml[rightPageNum - 1] || '';
      isSingleCover = false;
    }
  }

  // Assemble full isolated HTML document for the iframe
  const iframeDocHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      ${bundle.fontLinks}
      <style>
        ${bundle.styleContents}

        /* Digital Reader Viewport Styling */
        *, *:before, *:after { box-sizing: border-box; }

        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          user-select: text;
        }

        #spread-scaler-stage {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          transform-origin: center center;
          transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* 3D Physical Book Page Card with Reprographic Standard A4 Boundaries */
        .page-card {
          width: 210mm;
          height: 297mm;
          max-height: 297mm;
          background: #ffffff;
          padding: 12mm 14mm 12mm 14mm;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
          box-sizing: border-box;
        }

        /* Authentic 3D Book Page Shadow & Spine Cleft Gradient */
        .page-card.left-page {
          box-shadow: -12px 20px 45px rgba(0, 0, 0, 0.55), inset -20px 0 30px -10px rgba(0, 0, 0, 0.10);
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
        }

        .page-card.right-page {
          box-shadow: 12px 20px 45px rgba(0, 0, 0, 0.55), inset 20px 0 30px -10px rgba(0, 0, 0, 0.10);
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          border-top-left-radius: 2px;
          border-bottom-left-radius: 2px;
        }

        .page-card.single-page {
          box-shadow: 0 25px 55px rgba(0, 0, 0, 0.65);
          border-radius: 6px;
        }

        /* Override print breaks so page containers flex naturally inside card */
        .textbook-page {
          width: 100% !important;
          height: 100% !important;
          max-height: 100% !important;
          margin: 0 !important;
          page-break-after: unset !important;
          break-after: unset !important;
        }
      </style>
    </head>
    <body>
      <div id="spread-scaler-stage">
        ${
          leftPageContent
            ? `
          <div class="page-card left-page">
            <div class="textbook-page">
              ${leftPageContent}
            </div>
          </div>
        `
            : ''
        }

        ${
          rightPageContent
            ? `
          <div class="page-card ${isSingleCover ? 'single-page' : 'right-page'}">
            <div class="textbook-page">
              ${rightPageContent}
            </div>
          </div>
        `
            : ''
        }
      </div>
    </body>
    </html>
  `;

  // Write into iframe
  iframe.srcdoc = iframeDocHtml;

  iframe.onload = () => {
    if (loader) loader.style.display = 'none';
    iframe.style.opacity = '1';
    currentReader.iframeLoaded = true;
    applyIframeZoom(true);
  };
}

/**
 * Calculate and apply dynamic scale transform to fit the spread perfectly into viewport
 */
function applyIframeZoom(isAutoFit = false) {
  const iframe = document.getElementById('readerStageIframe');
  if (!iframe || !iframe.contentDocument) return;

  const stage = iframe.contentDocument.getElementById('spread-scaler-stage');
  if (!stage) return;

  const viewport = document.getElementById('reader-viewport');
  if (!viewport) return;

  const viewportWidth = viewport.clientWidth;
  const viewportHeight = viewport.clientHeight;

  // Compute millimeter to pixel dimensions at 96 DPI (3.7795 px/mm)
  const pxPerMm = 3.779527559;
  const singlePageWidthPx = 210 * pxPerMm; // ~793.7px
  const pageHeightPx = 297 * pxPerMm; // ~1122.5px

  let naturalSpreadWidth = singlePageWidthPx;
  if (
    currentReader.viewMode === 'dual' &&
    currentReader.spreadIndex > 0 &&
    currentReader.spreadIndex < 6
  ) {
    naturalSpreadWidth = singlePageWidthPx * 2 + 12; // Two pages + 12px gutter
  }

  // Auto-fit scale factor with comfortable safety padding
  const paddingX = 80; // Margin from edges & floating arrows
  const paddingY = 40;
  const fitScaleX = (viewportWidth - paddingX) / naturalSpreadWidth;
  const fitScaleY = (viewportHeight - paddingY) / pageHeightPx;
  const baseFitScale = Math.min(fitScaleX, fitScaleY, 1.25);

  const finalScale = isAutoFit ? baseFitScale : baseFitScale * currentReader.zoomLevel;

  stage.style.transform = `scale(${finalScale.toFixed(3)})`;
}

/**
 * Disciplinary Audio Narration Engine (Web SpeechSynthesis API)
 */
function toggleAudioNarration() {
  const btnAudio = document.getElementById('reader-btn-audio');
  const audioLabel = document.getElementById('reader-audio-label');

  if (!('speechSynthesis' in window)) {
    alert('Audio read-aloud is not supported on this web browser.');
    return;
  }

  if (currentReader.isAudioPlaying) {
    if (currentReader.isAudioPaused) {
      // Resume
      window.speechSynthesis.resume();
      currentReader.isAudioPaused = false;
      if (audioLabel) audioLabel.textContent = 'Reading...';
      if (btnAudio) btnAudio.classList.add('audio-playing');
    } else {
      // Pause
      window.speechSynthesis.pause();
      currentReader.isAudioPaused = true;
      if (audioLabel) audioLabel.textContent = 'Paused';
      if (btnAudio) btnAudio.classList.remove('audio-playing');
    }
    return;
  }

  // Start fresh narration of active spread
  const iframe = document.getElementById('readerStageIframe');
  if (!iframe || !iframe.contentDocument) return;

  const doc = iframe.contentDocument;
  const title = doc.querySelector('.lesson-title')?.textContent?.trim() || '';
  const specAnchor = doc.querySelector('.lesson-spec-anchor')?.textContent?.trim() || '';

  // Collect all paragraph text
  const paras = Array.from(
    doc.querySelectorAll('.numbered-para, .section-title, .archival-title, .archival-body'),
  )
    .map((el) => el.textContent.trim())
    .filter((txt) => txt.length > 0);

  const speechQueue = [];
  if (title) speechQueue.push(`Enquiry Lesson Title: ${title}`);
  if (specAnchor) speechQueue.push(specAnchor);
  speechQueue.push(...paras);

  const fullText = speechQueue.join('. ');
  if (!fullText) {
    alert('No readable text found on this page.');
    return;
  }

  window.speechSynthesis.cancel(); // Stop any pending speech

  const utterance = new SpeechSynthesisUtterance(fullText);
  utterance.rate = 0.95; // Clear, measured pedagogical reading pace
  utterance.pitch = 1.0;

  // Pick a natural British English voice if available
  const voices = window.speechSynthesis.getVoices();
  const gbVoice = voices.find((v) => v.lang.includes('en-GB') || v.lang.includes('en_GB'));
  if (gbVoice) utterance.voice = gbVoice;

  utterance.onstart = () => {
    currentReader.isAudioPlaying = true;
    currentReader.isAudioPaused = false;
    if (btnAudio) btnAudio.classList.add('audio-playing');
    if (audioLabel) audioLabel.textContent = 'Reading...';
  };

  utterance.onend = () => {
    stopAudioNarration();
  };

  utterance.onerror = () => {
    stopAudioNarration();
  };

  currentReader.audioUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

/**
 * Stop active audio narration and reset UI
 */
function stopAudioNarration() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  currentReader.isAudioPlaying = false;
  currentReader.isAudioPaused = false;
  currentReader.audioUtterance = null;

  const btnAudio = document.getElementById('reader-btn-audio');
  const audioLabel = document.getElementById('reader-audio-label');
  if (btnAudio) btnAudio.classList.remove('audio-playing');
  if (audioLabel) audioLabel.textContent = 'Read Spread';
}

/**
 * Global Helper to Open the Reader from anywhere in the application
 */
export function openDigitalTextbookReader(unitId = 'cme_new', ktId = 'KT1', spreadIndex = 1) {
  if (window.switchView) {
    window.switchView('reader', `${unitId}:${ktId}:${spreadIndex}`);
  }
}

// Attach to window for global inline onclick handler access
if (typeof window !== 'undefined') {
  window.openDigitalReader = openDigitalTextbookReader;
  window.openDigitalTextbookReader = openDigitalTextbookReader;
}
