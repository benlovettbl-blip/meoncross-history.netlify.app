/**
 * Conflict in the Middle East (1945–1995)
 * Strategic Theater & Choke-Points Interactive Map & Teaching Presenter Mode
 *
 * Designed for Edexcel GCSE History Paper 2: Conflict in the Middle East.
 * Strictly adheres to Institutional Neutrality and Zero AI Educational Jargon.
 */

import { getAssetUrl } from './engine/assets.js';

export const CME_STRATEGIC_HOTSPOTS = [
  {
    id: 'tiran',
    title: 'Straits of Tiran & Sharm el-Sheikh',
    category: 'Maritime Choke-Point',
    theater: 'Southern Sinai / Mouth of Gulf of Aqaba',
    color: '#dc2626',
    tag: 'Casus Belli',
    mapCoords: { x: 74, y: 88 },
    examTrigger: '1956 Suez Crisis & 1967 Six-Day War Pre-emptive Strike',
    significance:
      'Controls the narrow 6-mile sea lane entering the Gulf of Aqaba, separating the Sinai Peninsula from the Saudi Arabian coast.',
    examContext:
      'Nasser blockaded the Straits to Israeli shipping in 1956 (spurring the Suez War) and again on 22 May 1967. Israel considered the 1967 blockade an explicit act of war (*casus belli*) that severed its southern oil and commercial lifeline to Asia. This move directly triggered Israel’s pre-emptive airstrikes on 5 June 1967.',
    keyEvents: [
      '1956 Suez Crisis (Israeli capture of Sharm el-Sheikh)',
      '22 May 1967 Egyptian Blockade (*Casus Belli*)',
      '5 June 1967 Operation Focus (Israeli Air Pre-emption)',
      '1979 Egyptian-Israeli Peace Treaty (Free passage guaranteed)',
    ],
  },
  {
    id: 'eilat',
    title: 'Port of Eilat & Gulf of Aqaba',
    category: 'Economic & Strategic Lifeline',
    theater: 'Southern Israel / Red Sea Gateway',
    color: '#0284c7',
    tag: 'Vital Sea Lane',
    mapCoords: { x: 80, y: 55 },
    examTrigger: 'Israeli Trade & Non-Arab Crude Oil Route',
    significance:
      'Israel’s sole southern seaport on the Gulf of Aqaba, wedged between Egyptian Sinai and Jordanian Aqaba.',
    examContext:
      'Because Egypt banned Israeli-flagged ships from using the Suez Canal from 1948 onwards, Eilat was Israel’s sole route for non-Arab oil imports (principally from Iran) and commercial exports to East Africa and Asia. A blockade at Tiran directly choked Israel’s economic life.',
    keyEvents: [
      'March 1949 Operation Uvda (Israeli capture of Eilat)',
      '1956 Opening of Gulf of Aqaba by UN Emergency Force',
      'May 1967 Closure triggers emergency Israeli coalition cabinet',
    ],
  },
  {
    id: 'suez',
    title: 'Suez Canal & Port Said',
    category: 'Global Waterway & Front Line',
    theater: 'Western Sinai / Mainland Egyptian Border',
    color: '#d97706',
    tag: 'Imperial & National Crisis',
    mapCoords: { x: 26, y: 35 },
    examTrigger: '1956 Suez War, 1967 Closure & 1973 Bar-Lev Crossing',
    significance:
      '101-mile canal linking the Mediterranean Sea to the Red Sea; primary arterial for Persian Gulf oil shipments to Western Europe.',
    examContext:
      'Nationalized by President Gamal Abdel Nasser on 26 July 1956 after Western loans for the Aswan High Dam were withdrawn. This sparked the secret Protocol of Sèvres (UK, France, Israel alliance). Closed from 1967 to 1975 following the Six-Day War. The canal formed the heavily fortified front line (Bar-Lev Line), successfully breached by Egypt on Yom Kippur 1973 (Operation Badr).',
    keyEvents: [
      '26 July 1956 Nasser Nationalises Suez Canal',
      'Oct–Nov 1956 Tripartite Invasion of Egypt',
      '1967–1970 War of Attrition Artillery Duels',
      '6 Oct 1973 Operation Badr (Egyptian Canal Crossing)',
    ],
  },
  {
    id: 'golan',
    title: 'Golan Heights & Mount Hermon',
    category: 'High-Ground Artillery Fortress',
    theater: 'South-West Syria / Upper Galilee Frontier',
    color: '#7c3aed',
    tag: 'High-Ground Vantage',
    mapCoords: { x: 83, y: 15 },
    examTrigger: 'Border Artillery Shelling & 1973 Valley of Tears',
    significance:
      'Elevated volcanic plateau rising steeply 1,000 to 3,000 ft above the Sea of Galilee and the agricultural kibbutzim of the Hula Valley.',
    examContext:
      'From 1949 to 1967, Syrian artillery used this dominating escarpment to shell Israeli farms and attempt to divert the headwaters of the Jordan River. Captured by Israeli forces on Days 5–6 of the 1967 War (9–10 June). In October 1973, Syria launched a massive armor assault here, repulsed after desperate tank battles at the Valley of Tears.',
    keyEvents: [
      '1964–1966 "Battle over Water" & Tractor Clashes',
      '9–10 June 1967 Israeli Assault up the Golan Escarpment',
      '6–9 Oct 1973 Valley of Tears Armored Clash',
      '1974 Disengagement Agreement (UNDOF Buffer Zone)',
    ],
  },
  {
    id: 'sinai_passes',
    title: 'Mitla & Gidi Strategic Passes',
    category: 'Tactical Armor Bottlenecks',
    theater: 'Central Sinai Peninsula',
    color: '#ea580c',
    tag: 'Sinai Bottleneck',
    mapCoords: { x: 42, y: 55 },
    examTrigger: 'Armored Mobility & Strategic Buffer',
    significance:
      'Narrow mountain defiles through the rugged central Sinai ranges, forming the only passable corridors for tank formations between Israel and the Suez Canal.',
    examContext:
      'In October 1956, Israeli paratroopers under Rafael Eitan dropped at the eastern entrance to Mitla Pass to simulate a deep strike. In 1967, Israeli armored columns trapped retreating Egyptian forces at the passes. Demilitarized under the 1978 Camp David Accords.',
    keyEvents: [
      '29 Oct 1956 Operation Kadesh (Mitla Drop)',
      '6–8 June 1967 Armored Interception of Retreating Columns',
      '1978–79 Camp David Accords: Complete Sinai Demilitarization',
    ],
  },
  {
    id: 'west_bank',
    title: 'West Bank & East Jerusalem',
    category: 'Occupied Territory & Strategic Depth',
    theater: 'Central Palestine / Jordanian Frontier',
    color: '#059669',
    tag: 'Territorial Depth',
    mapCoords: { x: 78, y: 38 },
    examTrigger: '1967 Six-Day War, UN Res 242 & 1993 Oslo Accords',
    significance:
      'Territory west of the Jordan River annexed by Jordan in 1950. Prior to 1967, Israel had only a 9-mile coastal waist at Netanya vulnerable to bisecting assault.',
    examContext:
      'Captured from Jordan on 5–7 June 1967 after King Hussein joined Egyptian war pact. Control of the West Bank unified Jerusalem and eliminated Israel’s narrow coastal vulnerability, but placed over 1 million Palestinians under military occupation. Central to UN Resolution 242 ("Land for Peace") and the 1993 Oslo Accords.',
    keyEvents: [
      '1948–49 Arab-Israeli War (Jordanian Annexation 1950)',
      '7 June 1967 Israeli Paratroopers enter Old City of Jerusalem',
      '22 Nov 1967 UN Security Council Resolution 242',
      '1987 Outbreak of First Intifada',
      '1993 Oslo I Accord (Creation of Palestinian Authority)',
    ],
  },
  {
    id: 'gaza',
    title: 'Gaza Strip',
    category: 'Occupied Territory & Refugee Epicenter',
    theater: 'Mediterranean Coast / Egyptian Border',
    color: '#b91c1c',
    tag: 'Fedayeen & Intifada Epicenter',
    mapCoords: { x: 62, y: 44 },
    examTrigger: 'Fedayeen Infiltration, 1967 Capture & First Intifada',
    significance:
      'Narrow 25-mile coastal strip crowded with hundreds of thousands of 1948 Palestinian refugees, administered by Egypt from 1948 to 1967.',
    examContext:
      'Used as a staging post for Fedayeen guerrilla raids into southern Israeli kibbutzim in the 1950s, prompting Israeli retaliatory strikes (e.g. 1955 Gaza Raid). Captured by Israel in June 1967. The First Intifada erupted in Gaza at Jabalia refugee camp in December 1987.',
    keyEvents: [
      '1948 War: Refugee Influx into Eight UNRWA Camps',
      'Feb 1955 Israeli Retaliatory Raid on Egyptian HQ',
      'June 1967 Israeli Occupation',
      '9 Dec 1987 Outbreak of the First Intifada (Jabalia Camp)',
    ],
  },
];

export const CME_MAP_TABS = [
  {
    id: 'chokepoints',
    title: 'Choke-Points & Sinai Tactical',
    subtitle: 'Sinai Peninsula, Suez Canal, Straits of Tiran, Eilat & Golan',
    icon: 'fa-compass',
    image: '/images/cme_sinai_peninsula_map.jpg',
    showHotspots: true,
    description:
      'Tactical cartography of the Sinai Peninsula and surrounding maritime choke-points. Hover or click any hotspot chip to inspect why the closure of the Straits of Tiran or the shelling from the Golan escarpment triggered full-scale wars.',
  },
  {
    id: 'occupied1967',
    title: '1967 Occupied Territories',
    subtitle: 'Sinai, West Bank, Gaza Strip, Golan Heights & UN Res 242',
    icon: 'fa-shield-halved',
    image: '/images/cme_1967_occupied_territories_cia_map.png',
    secondaryImage: '/images/palestine_1967_six_day_war_map.png',
    showHotspots: false,
    description:
      'Official CIA cartographic survey showing Israel’s borders before and after the June 1967 Six-Day War. The capture of the Sinai Peninsula (Egypt), Gaza Strip (Egypt), West Bank (Jordan), and Golan Heights (Syria) tripled the territory under Israeli military control and established the "Land for Peace" principle codified in UN Security Council Resolution 242.',
  },
  {
    id: 'partition1947',
    title: '1947 UN Plan vs 1949 Armistice',
    subtitle: 'Resolution 181 Partition vs 1949 Green Line Armistice',
    icon: 'fa-scale-balanced',
    splitView: true,
    leftImage: '/images/palestine_1947_map.png',
    leftTitle: '1947 UN Partition Plan (Resolution 181)',
    leftDesc:
      'Recommended terminating the British Mandate: Jewish State allocated 56% of territory (including the Negev); Arab State allocated 43%; Jerusalem established as an international zone (*Corpus Separatum*). Accepted by the Jewish Agency; rejected by the Arab Higher Committee.',
    rightImage: '/images/palestine_1949_map.png',
    rightTitle: '1949 Armistice Green Line',
    rightDesc:
      'Following the 1948–49 War: Israel expanded to hold 78% of the mandate territory. Transjordan annexed the West Bank and East Jerusalem; Egypt assumed military administration of the Gaza Strip. Created the Palestinian refugee question (*Nakba*).',
  },
  {
    id: 'tactical_theaters',
    title: 'Tactical Campaigns & Theaters',
    subtitle: '1956 Suez, 1973 Yom Kippur, Golan Relief & Lebanon 1982',
    icon: 'fa-map-location-dot',
    gallery: [
      {
        title: '1973 Yom Kippur War: Operation Badr (Suez Canal Crossing)',
        src: '/images/cme_yom_kippur_1973_map.png',
        desc: 'Egyptian assault forces cross the Suez Canal under cover of a massive Soviet-supplied SAM anti-aircraft umbrella, using high-pressure water cannons to blast breaches through the sand ramparts of the Bar-Lev Line.',
      },
      {
        title: 'Golan Heights Tactical Relief (Syrian Border & Sea of Galilee)',
        src: '/images/cme_golan_heights_relief_map_1967.jpg',
        desc: 'Topographical relief map illustrating how Syrian artillery on the high basalt plateau dominated the Israeli farms of the Hula Valley below, explaining why Israel launched an uphill assault on 9–10 June 1967.',
      },
      {
        title: '1956 Suez Crisis: Israeli Sinai Drive & Anglo-French Assault',
        src: '/images/cme_suez_1956_campaign_map.jpg',
        desc: 'The secret Protocol of Sèvres in action: Israeli paratroopers drop at Mitla Pass on 29 October 1956, providing the pretext for Britain and France to issue an ultimatum and land troops at Port Said.',
      },
      {
        title: '1982 Operation Peace for Galilee: Invasion of Lebanon',
        src: '/images/cme_lebanon_1982_campaign_map.png',
        desc: 'Israeli forces advanced past the initial 40 km buffer zone up to West Beirut to eradicate the PLO military command and expel Yasser Arafat to Tunisia.',
      },
      {
        title: '1995 Oslo II Interim Agreement: West Bank Areas A, B, and C',
        src: '/images/cme_oslo_areas_map.png',
        desc: 'The division of the West Bank into Area A (Palestinian civil & security control), Area B (Palestinian civil, joint Israeli security), and Area C (full Israeli civil and military control).',
      },
    ],
  },
];

let activeTabId = 'chokepoints';
let activeHotspotId = 'tiran';
let currentZoom = 1;

// ============================================================================
// MODAL HTML GENERATOR & OPEN / CLOSE LOGIC
// ============================================================================

export function ensureCmeTheaterMapModalInDOM() {
  let modal = document.getElementById('cme-theater-map-modal');
  if (modal) return modal;

  modal = document.createElement('div');
  modal.id = 'cme-theater-map-modal';
  modal.className = 'cme-theater-map-modal';
  modal.style.cssText =
    'display: none; position: fixed; inset: 0; z-index: 99999; background: rgba(15, 23, 42, 0.88); backdrop-filter: blur(8px); align-items: center; justify-content: center; padding: 16px; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;';

  modal.innerHTML = `
    <div class="cme-map-dialog" style="background: #0f172a; border: 1.5px solid #334155; border-radius: 12px; width: 96vw; max-width: 1440px; height: 92vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7); color: #f8fafc;">
      
      <!-- Top Modal Header -->
      <div style="padding: 12px 20px; background: #0b1120; border-bottom: 1px solid #1e293b; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="background: #0284c7; color: #ffffff; width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; box-shadow: 0 2px 8px rgba(2,132,199,0.4);">
            <i class="fa-solid fa-map-location-dot"></i>
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <h3 style="margin: 0; font-size: 1.15rem; font-weight: 800; color: #ffffff; letter-spacing: -0.01em;">
                Strategic Theater & Choke-Points: Conflict in the Middle East (1945–1995)
              </h3>
              <span style="background: #0369a1; color: #e0f2fe; font-size: 0.68rem; font-weight: 800; padding: 2px 7px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Edexcel Paper 2 Cartography</span>
            </div>
            <div style="font-size: 0.75rem; color: #94a3b8; margin-top: 2px;">
              Interactive Geographic Inspector &bull; Straits of Tiran, Suez Canal, Eilat, Sinai Passes, Golan & 1967 Occupied Territories
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 6px; background: #1e293b; padding: 3px 8px; border-radius: 6px; font-size: 0.72rem; color: #94a3b8; border: 1px solid #334155;">
            <span>Shortcuts:</span>
            <kbd style="background: #0f172a; padding: 1px 5px; border-radius: 3px; border: 1px solid #475569; font-weight: 700; color: #38bdf8;">M</kbd> toggle &bull; 
            <kbd style="background: #0f172a; padding: 1px 5px; border-radius: 3px; border: 1px solid #475569; font-weight: 700; color: #e2e8f0;">Esc</kbd> close
          </div>
          <button type="button" onclick="window.closeCmeTheaterMapModal();" style="background: #1e293b; color: #cbd5e1; border: 1px solid #334155; width: 32px; height: 32px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; transition: all 0.15s ease;" onmouseover="this.style.background='#dc2626'; this.style.color='#fff';" onmouseout="this.style.background='#1e293b'; this.style.color='#cbd5e1';" title="Close Map Modal (Esc)">
            &times;
          </button>
        </div>
      </div>

      <!-- Tab Switcher Bar -->
      <div style="padding: 8px 16px; background: #1e293b; border-bottom: 1px solid #334155; display: flex; gap: 8px; overflow-x: auto; flex-shrink: 0;">
        ${CME_MAP_TABS.map(
          (t) => `
          <button type="button" class="cme-map-tab-btn" data-tab-id="${t.id}" onclick="window.switchCmeMapTab('${t.id}');" style="padding: 6px 14px; font-size: 0.8rem; font-weight: 700; border-radius: 6px; cursor: pointer; border: 1px solid transparent; display: inline-flex; align-items: center; gap: 7px; transition: all 0.15s ease; ${
            t.id === activeTabId
              ? 'background: #0284c7; color: #ffffff; border-color: #38bdf8;'
              : 'background: #0f172a; color: #94a3b8; border-color: #334155;'
          }">
            <i class="fa-solid ${t.icon}"></i> ${t.title}
          </button>
        `,
        ).join('')}
      </div>

      <!-- Main Content Split Body (Map Viewport + Inspector Drawer) -->
      <div id="cme-map-modal-body" style="flex: 1; display: flex; overflow: hidden; position: relative;">
        <!-- Injected via renderCmeMapTabContent() -->
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Close modal when clicking outside dialog
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      window.closeCmeTheaterMapModal();
    }
  });

  return modal;
}

export function openCmeTheaterMapModal(initialHotspotOrTab) {
  const modal = ensureCmeTheaterMapModalInDOM();

  if (initialHotspotOrTab) {
    if (CME_MAP_TABS.some((t) => t.id === initialHotspotOrTab)) {
      activeTabId = initialHotspotOrTab;
    } else if (CME_STRATEGIC_HOTSPOTS.some((h) => h.id === initialHotspotOrTab)) {
      activeTabId = 'chokepoints';
      activeHotspotId = initialHotspotOrTab;
    }
  }

  currentZoom = 1;
  modal.style.display = 'flex';
  renderCmeMapTabContent();
}

export function closeCmeTheaterMapModal() {
  const modal = document.getElementById('cme-theater-map-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

export function switchCmeMapTab(tabId) {
  activeTabId = tabId;
  currentZoom = 1;

  // Update tab buttons styling
  const buttons = document.querySelectorAll('.cme-map-tab-btn');
  buttons.forEach((btn) => {
    const isCurrent = btn.dataset.tabId === tabId;
    btn.style.background = isCurrent ? '#0284c7' : '#0f172a';
    btn.style.color = isCurrent ? '#ffffff' : '#94a3b8';
    btn.style.borderColor = isCurrent ? '#38bdf8' : '#334155';
  });

  renderCmeMapTabContent();
}

export function selectCmeHotspot(hotspotId) {
  activeHotspotId = hotspotId;
  const hotspot = CME_STRATEGIC_HOTSPOTS.find((h) => h.id === hotspotId);
  if (!hotspot) return;

  // Update active chip styling
  document.querySelectorAll('.cme-hotspot-chip').forEach((chip) => {
    const isCurrent = chip.dataset.hotspotId === hotspotId;
    chip.style.borderColor = isCurrent ? hotspot.color : '#334155';
    chip.style.background = isCurrent ? 'rgba(2, 132, 199, 0.18)' : '#0f172a';
    chip.style.color = isCurrent ? '#ffffff' : '#94a3b8';
  });

  // Update map pin pulse styling
  document.querySelectorAll('.cme-map-pin').forEach((pin) => {
    const isCurrent = pin.dataset.hotspotId === hotspotId;
    pin.style.transform = isCurrent
      ? 'translate(-50%, -50%) scale(1.35)'
      : 'translate(-50%, -50%) scale(1)';
    pin.style.zIndex = isCurrent ? '50' : '20';
  });

  // Update Inspector Card
  const inspectorContent = document.getElementById('cme-inspector-content');
  if (inspectorContent) {
    inspectorContent.innerHTML = renderHotspotInspectorHTML(hotspot);
  }
}

function renderHotspotInspectorHTML(h) {
  return `
    <div style="animation: fadeIn 0.2s ease;">
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px;">
        <span style="background: ${h.color}; color: #ffffff; font-size: 0.68rem; font-weight: 800; padding: 2px 7px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
          ${h.tag}
        </span>
        <span style="font-size: 0.72rem; color: #94a3b8; font-weight: 700;">
          <i class="fa-solid fa-crosshairs" style="color: ${h.color};"></i> ${h.category}
        </span>
      </div>

      <h4 style="margin: 0 0 6px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 1.15rem; color: #ffffff; line-height: 1.25;">
        ${h.title}
      </h4>

      <div style="font-size: 0.76rem; color: #38bdf8; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 5px;">
        <i class="fa-solid fa-location-dot"></i> ${h.theater}
      </div>

      <div style="background: #1e293b; border-left: 3px solid ${h.color}; padding: 10px 12px; border-radius: 0 6px 6px 0; font-size: 0.8rem; line-height: 1.5; color: #e2e8f0; margin-bottom: 12px;">
        <strong style="color: #ffffff; display: block; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 3px; letter-spacing: 0.4px;">Strategic Function:</strong>
        ${h.significance}
      </div>

      <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid #334155; padding: 10px 12px; border-radius: 6px; font-size: 0.8rem; line-height: 1.55; color: #cbd5e1; margin-bottom: 14px;">
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
          <i class="fa-solid fa-graduation-cap" style="color: #f59e0b;"></i>
          <strong style="color: #f59e0b; font-size: 0.74rem; text-transform: uppercase; letter-spacing: 0.4px;">Edexcel Paper 2 Causation Context:</strong>
        </div>
        ${h.examContext}
      </div>

      <div style="margin-top: 10px;">
        <div style="font-size: 0.72rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">
          Exam Specification Turning Points:
        </div>
        <div style="display: flex; flex-direction: column; gap: 5px;">
          ${h.keyEvents
            .map(
              (ev) => `
            <div style="display: flex; align-items: baseline; gap: 7px; font-size: 0.75rem; color: #e2e8f0; background: #1e293b; padding: 4px 8px; border-radius: 4px; border: 1px solid #334155;">
              <span style="color: ${h.color}; font-weight: 900;">&bull;</span>
              <span>${ev}</span>
            </div>
          `,
            )
            .join('')}
        </div>
      </div>
    </div>
  `;
}

export function renderCmeMapTabContent() {
  const container = document.getElementById('cme-map-modal-body');
  if (!container) return;

  const currentTab = CME_MAP_TABS.find((t) => t.id === activeTabId) || CME_MAP_TABS[0];

  if (currentTab.id === 'chokepoints') {
    const activeHotspot =
      CME_STRATEGIC_HOTSPOTS.find((h) => h.id === activeHotspotId) || CME_STRATEGIC_HOTSPOTS[0];

    container.innerHTML = `
      <!-- Left Map Viewport -->
      <div style="flex: 1; display: flex; flex-direction: column; background: #030712; position: relative; overflow: hidden;">
        <!-- Map Canvas / Controls Toolbar -->
        <div style="position: absolute; top: 12px; left: 14px; z-index: 40; display: flex; gap: 6px; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(4px); padding: 4px 8px; border-radius: 6px; border: 1px solid #334155;">
          <button type="button" onclick="window.zoomCmeMap(0.15);" style="background: #1e293b; color: #fff; border: 1px solid #475569; width: 28px; height: 28px; border-radius: 4px; cursor: pointer; font-weight: 900;" title="Zoom In">+</button>
          <button type="button" onclick="window.zoomCmeMap(-0.15);" style="background: #1e293b; color: #fff; border: 1px solid #475569; width: 28px; height: 28px; border-radius: 4px; cursor: pointer; font-weight: 900;" title="Zoom Out">&minus;</button>
          <button type="button" onclick="window.resetCmeMapZoom();" style="background: #1e293b; color: #94a3b8; border: 1px solid #475569; padding: 0 8px; height: 28px; border-radius: 4px; cursor: pointer; font-size: 0.72rem; font-weight: 700;" title="Reset Zoom">Reset</button>
        </div>

        <div style="position: absolute; top: 12px; right: 14px; z-index: 40; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(4px); padding: 4px 10px; border-radius: 6px; border: 1px solid #334155; font-size: 0.72rem; color: #94a3b8;">
          <i class="fa-solid fa-bullseye" style="color: #38bdf8; margin-right: 4px;"></i> Click hotspot pins on map to inspect
        </div>

        <!-- Pannable / Zoomable Map Container -->
        <div id="cme-map-viewport" style="flex: 1; display: flex; align-items: center; justify-content: center; position: relative; overflow: auto; padding: 20px; box-sizing: border-box;">
          <div id="cme-map-stage" style="position: relative; display: inline-block; transform: scale(${currentZoom}); transform-origin: center center; transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 10px 30px rgba(0,0,0,0.8); border-radius: 8px; overflow: hidden;">
            <img src="${getAssetUrl(currentTab.image)}" alt="Sinai Peninsula & Strategic Choke-Points Tactical Map" style="max-height: 72vh; max-width: 100%; display: block; border-radius: 8px; user-select: none;" draggable="false">

            <!-- Dynamic Hotspot Pins Overlay -->
            ${CME_STRATEGIC_HOTSPOTS.map((h) => {
              const isCurrent = h.id === activeHotspotId;
              return `
                <div class="cme-map-pin" data-hotspot-id="${h.id}" onclick="window.selectCmeHotspot('${h.id}');" style="position: absolute; left: ${h.mapCoords.x}%; top: ${h.mapCoords.y}%; transform: translate(-50%, -50%) ${isCurrent ? 'scale(1.35)' : 'scale(1)'}; z-index: ${isCurrent ? '50' : '20'}; cursor: pointer; transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                  <div style="position: relative; display: flex; align-items: center; justify-content: center;">
                    <div style="position: absolute; width: 28px; height: 28px; border-radius: 50%; background: ${h.color}; opacity: 0.4; animation: radar-pulse 2s infinite ease-out;"></div>
                    <div style="width: 22px; height: 22px; border-radius: 50%; background: ${h.color}; border: 2.5px solid #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 0.65rem; font-weight: 900;">
                      <i class="fa-solid fa-location-dot"></i>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Bottom Description Bar -->
        <div style="padding: 8px 16px; background: #0b1120; border-top: 1px solid #1e293b; font-size: 0.74rem; color: #94a3b8; display: flex; align-items: center; justify-content: space-between;">
          <span>${currentTab.description}</span>
          <span style="color: #38bdf8; font-weight: 700;">Tactical Field Record</span>
        </div>
      </div>

      <!-- Right Inspector Sidebar -->
      <div style="width: 380px; flex-shrink: 0; background: #0f172a; border-left: 1px solid #1e293b; display: flex; flex-direction: column; overflow: hidden;">
        <!-- Hotspots Chip Quick Selector -->
        <div style="padding: 12px 14px; background: #131d31; border-bottom: 1px solid #1e293b;">
          <div style="font-size: 0.68rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 8px;">
            Select Choke-Point / Theater:
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 5px;">
            ${CME_STRATEGIC_HOTSPOTS.map((h) => {
              const isCurrent = h.id === activeHotspotId;
              return `
              <button type="button" class="cme-hotspot-chip" data-hotspot-id="${h.id}" onclick="window.selectCmeHotspot('${h.id}');" style="padding: 4px 8px; font-size: 0.72rem; font-weight: 700; border-radius: 4px; cursor: pointer; border: 1px solid ${isCurrent ? h.color : '#334155'}; background: ${isCurrent ? 'rgba(2, 132, 199, 0.18)' : '#0f172a'}; color: ${isCurrent ? '#ffffff' : '#94a3b8'}; transition: all 0.15s ease;">
                ${h.title.split('&')[0].trim()}
              </button>
            `;
            }).join('')}
          </div>
        </div>

        <!-- Inspector Body -->
        <div id="cme-inspector-content" style="flex: 1; padding: 16px; overflow-y: auto;">
          ${renderHotspotInspectorHTML(activeHotspot)}
        </div>
      </div>
    `;
  } else if (currentTab.id === 'occupied1967') {
    container.innerHTML = `
      <div style="flex: 1; display: flex; background: #030712; overflow: hidden;">
        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 16px; position: relative; overflow: auto;">
          <img src="${getAssetUrl(currentTab.image)}" alt="1967 Occupied Territories CIA Official Map" style="max-height: 80vh; max-width: 95%; object-fit: contain; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); border: 1px solid #334155;">
        </div>

        <div style="width: 400px; flex-shrink: 0; background: #0f172a; border-left: 1px solid #1e293b; padding: 20px; overflow-y: auto; color: #f8fafc;">
          <span style="background: #0284c7; color: #ffffff; font-size: 0.68rem; font-weight: 800; padding: 2px 7px; border-radius: 4px; text-transform: uppercase;">
            June 1967 Six-Day War
          </span>
          <h4 style="margin: 8px 0 10px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 1.25rem; color: #ffffff;">
            The 1967 Occupied Territories
          </h4>
          <p style="font-size: 0.84rem; color: #94a3b8; line-height: 1.5; margin-bottom: 16px;">
            In 6 days of fighting (5–10 June 1967), Israel conquered four distinct territories, tripling its territorial control and creating a new strategic paradigm:
          </p>

          <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 18px;">
            <div style="background: #1e293b; border-left: 3.5px solid #dc2626; padding: 10px 12px; border-radius: 0 6px 6px 0;">
              <strong style="color: #ffffff; font-size: 0.82rem; display: block;">1. Sinai Peninsula (from Egypt)</strong>
              <div style="font-size: 0.76rem; color: #cbd5e1; margin-top: 3px;">60,000 sq km desert buffer giving strategic depth. Closed the Suez Canal and gave Israel control of Sharm el-Sheikh. Later returned to Egypt under 1978–79 Camp David Accords in return for peace and demilitarization.</div>
            </div>

            <div style="background: #1e293b; border-left: 3.5px solid #b91c1c; padding: 10px 12px; border-radius: 0 6px 6px 0;">
              <strong style="color: #ffffff; font-size: 0.82rem; display: block;">2. Gaza Strip (from Egyptian military rule)</strong>
              <div style="font-size: 0.76rem; color: #cbd5e1; margin-top: 3px;">Dense refugee strip. Brought ~350,000 Palestinians under Israeli military administration. Sparked intense underground resistance and the 1987 First Intifada.</div>
            </div>

            <div style="background: #1e293b; border-left: 3.5px solid #059669; padding: 10px 12px; border-radius: 0 6px 6px 0;">
              <strong style="color: #ffffff; font-size: 0.82rem; display: block;">3. West Bank & East Jerusalem (from Jordan)</strong>
              <div style="font-size: 0.76rem; color: #cbd5e1; margin-top: 3px;">Eliminated Israel’s 9-mile coastal waistline; reunited the Western Wall under Jewish control. Brought ~1 million Palestinians under military rule, sparking the Israeli settlement movement.</div>
            </div>

            <div style="background: #1e293b; border-left: 3.5px solid #7c3aed; padding: 10px 12px; border-radius: 0 6px 6px 0;">
              <strong style="color: #ffffff; font-size: 0.82rem; display: block;">4. Golan Heights (from Syria)</strong>
              <div style="font-size: 0.76rem; color: #cbd5e1; margin-top: 3px;">Elevated plateau commanding northern Galilee. Ended Syrian artillery bombardment of kibbutzim; placed Israeli guns within 40 miles of Damascus.</div>
            </div>
          </div>

          <div style="background: rgba(2, 132, 199, 0.12); border: 1.5px solid #0284c7; padding: 12px; border-radius: 6px; font-size: 0.78rem; line-height: 1.5; color: #e0f2fe;">
            <div style="font-weight: 800; color: #38bdf8; text-transform: uppercase; font-size: 0.72rem; margin-bottom: 4px;">
              <i class="fa-solid fa-scroll"></i> UN Security Council Resolution 242 (22 Nov 1967):
            </div>
            Codified the principle of <strong>"Land for Peace"</strong>: withdrawal of Israeli armed forces from territories occupied in the recent conflict, in exchange for termination of all claims or states of belligerency and recognition of every state’s right to live in peace within secure and recognized boundaries.
          </div>
        </div>
      </div>
    `;
  } else if (currentTab.id === 'partition1947') {
    container.innerHTML = `
      <div style="flex: 1; display: flex; background: #030712; overflow: hidden;">
        <!-- Left Side: 1947 Partition -->
        <div style="flex: 1; display: flex; flex-direction: column; border-right: 1px solid #1e293b; padding: 14px; overflow: auto; align-items: center;">
          <div style="text-align: center; margin-bottom: 8px;">
            <span style="background: #1e3a8a; color: #bfdbfe; font-size: 0.68rem; font-weight: 800; padding: 2px 7px; border-radius: 4px; text-transform: uppercase;">
              29 November 1947
            </span>
            <h4 style="margin: 4px 0; font-size: 1.05rem; color: #ffffff;">${currentTab.leftTitle}</h4>
          </div>
          <div style="flex: 1; display: flex; align-items: center; justify-content: center; width: 100%;">
            <img src="${getAssetUrl(currentTab.leftImage)}" alt="1947 UN Partition Plan Map" style="max-height: 60vh; max-width: 95%; object-fit: contain; border-radius: 6px; box-shadow: 0 4px 14px rgba(0,0,0,0.6); border: 1px solid #334155;">
          </div>
          <div style="background: #0f172a; border: 1px solid #334155; padding: 10px 12px; border-radius: 6px; font-size: 0.76rem; color: #cbd5e1; line-height: 1.5; margin-top: 10px; width: 90%;">
            ${currentTab.leftDesc}
          </div>
        </div>

        <!-- Right Side: 1949 Armistice -->
        <div style="flex: 1; display: flex; flex-direction: column; padding: 14px; overflow: auto; align-items: center;">
          <div style="text-align: center; margin-bottom: 8px;">
            <span style="background: #166534; color: #bbf7d0; font-size: 0.68rem; font-weight: 800; padding: 2px 7px; border-radius: 4px; text-transform: uppercase;">
              Spring 1949
            </span>
            <h4 style="margin: 4px 0; font-size: 1.05rem; color: #ffffff;">${currentTab.rightTitle}</h4>
          </div>
          <div style="flex: 1; display: flex; align-items: center; justify-content: center; width: 100%;">
            <img src="${getAssetUrl(currentTab.rightImage)}" alt="1949 Armistice Green Line Map" style="max-height: 60vh; max-width: 95%; object-fit: contain; border-radius: 6px; box-shadow: 0 4px 14px rgba(0,0,0,0.6); border: 1px solid #334155;">
          </div>
          <div style="background: #0f172a; border: 1px solid #334155; padding: 10px 12px; border-radius: 6px; font-size: 0.76rem; color: #cbd5e1; line-height: 1.5; margin-top: 10px; width: 90%;">
            ${currentTab.rightDesc}
          </div>
        </div>
      </div>
    `;
  } else if (currentTab.id === 'tactical_theaters') {
    const galleryItems = currentTab.gallery || [];
    container.innerHTML = `
      <div style="flex: 1; display: flex; flex-direction: column; background: #030712; padding: 16px; overflow-y: auto;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 16px;">
          ${galleryItems
            .map(
              (item) => `
            <div style="background: #0f172a; border: 1.5px solid #334155; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
              <div style="background: #030712; padding: 8px; text-align: center; height: 260px; display: flex; align-items: center; justify-content: center;">
                <img src="${getAssetUrl(item.src)}" alt="${item.title}" style="max-height: 100%; max-width: 100%; object-fit: contain; border-radius: 4px; cursor: zoom-in;" onclick="window.openEnlargedCmeMap('${getAssetUrl(item.src)}', '${item.title.replace(/'/g, "\\'")}');">
              </div>
              <div style="padding: 12px 14px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; border-top: 1px solid #1e293b;">
                <div>
                  <h5 style="margin: 0 0 6px 0; font-size: 0.88rem; font-weight: 800; color: #ffffff;">
                    ${item.title}
                  </h5>
                  <p style="margin: 0; font-size: 0.76rem; color: #94a3b8; line-height: 1.45;">
                    ${item.desc}
                  </p>
                </div>
                <div style="margin-top: 10px; padding-top: 6px; border-top: 1px dashed #334155; display: flex; justify-content: flex-end;">
                  <button type="button" onclick="window.openEnlargedCmeMap('${getAssetUrl(item.src)}', '${item.title.replace(/'/g, "\\'")}');" style="background: #1e293b; color: #38bdf8; border: 1px solid #475569; padding: 3px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 700; cursor: pointer;">
                    <i class="fa-solid fa-expand"></i> Enlarge Fullscreen
                  </button>
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
}

export function zoomCmeMap(delta) {
  currentZoom = Math.min(Math.max(0.6, currentZoom + delta), 2.5);
  const stage = document.getElementById('cme-map-stage');
  if (stage) {
    stage.style.transform = `scale(${currentZoom})`;
  }
}

export function resetCmeMapZoom() {
  currentZoom = 1;
  const stage = document.getElementById('cme-map-stage');
  if (stage) {
    stage.style.transform = `scale(1)`;
  }
}

export function openEnlargedCmeMap(src, title) {
  let overlay = document.getElementById('cme-map-enlarge-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'cme-map-enlarge-overlay';
    overlay.style.cssText =
      'position: fixed; inset: 0; z-index: 100000; background: rgba(0, 0, 0, 0.95); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;';
    overlay.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; max-width: 1400px; margin-bottom: 10px; color: #ffffff;">
        <h4 id="cme-enlarge-title" style="margin: 0; font-size: 1.1rem; font-weight: 700;"></h4>
        <button type="button" onclick="document.getElementById('cme-map-enlarge-overlay').style.display='none';" style="background: #334155; color: #fff; border: none; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-weight: 700;">Close &times;</button>
      </div>
      <img id="cme-enlarge-img" src="" alt="Enlarged Map" style="max-height: 85vh; max-width: 95vw; object-fit: contain; border-radius: 6px; box-shadow: 0 10px 40px rgba(0,0,0,0.9);">
    `;
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.style.display = 'none';
    });
    document.body.appendChild(overlay);
  }
  overlay.querySelector('#cme-enlarge-img').src = src;
  overlay.querySelector('#cme-enlarge-title').textContent = title || 'Historical Map';
  overlay.style.display = 'flex';
}

// ============================================================================
// FLOATING TRIGGER BUTTON (Pill at bottom-right of viewport)
// ============================================================================

export function renderFloatingCmeMapButton() {
  const existing = document.getElementById('cme-floating-theater-map-btn');
  const unitId = window.currentUnitId;

  if (unitId !== 'cme_new') {
    if (existing) existing.remove();
    return;
  }

  if (existing) return;

  const btn = document.createElement('button');
  btn.id = 'cme-floating-theater-map-btn';
  btn.type = 'button';
  btn.className = 'cme-floating-theater-map-btn no-print';
  btn.setAttribute('aria-label', 'Open Middle East Strategic Theater Map');
  btn.style.cssText =
    'position: fixed; bottom: 24px; right: 24px; z-index: 9990; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; border: 1.5px solid #38bdf8; border-radius: 30px; padding: 9px 16px; font-size: 0.82rem; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.45); transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); user-select: none; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;';

  btn.innerHTML = `
    <i class="fa-solid fa-map-location-dot" style="font-size: 0.95rem;"></i>
    <span>Theater Map <kbd style="background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.3); border-radius: 3px; padding: 1px 4px; font-size: 0.65rem; margin-left: 2px;">M</kbd></span>
  `;

  btn.onmouseover = () => {
    btn.style.transform = 'translateY(-2px) scale(1.03)';
    btn.style.boxShadow = '0 6px 20px rgba(2, 132, 199, 0.6)';
  };
  btn.onmouseout = () => {
    btn.style.transform = 'translateY(0) scale(1)';
    btn.style.boxShadow = '0 4px 14px rgba(2, 132, 199, 0.45)';
  };
  btn.onclick = () => {
    window.openCmeTheaterMapModal();
  };

  document.body.appendChild(btn);
}

// ============================================================================
// KEYBOARD SHORTCUTS (M to toggle map, Escape to close)
// ============================================================================

export function initCmeMapHotkeys() {
  if (window._cmeHotkeysAttached) return;
  window._cmeHotkeysAttached = true;

  window.addEventListener('keydown', (e) => {
    // Ignore when typing in inputs/textareas
    const active = document.activeElement;
    if (
      active &&
      (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)
    ) {
      return;
    }

    // Toggle Theater Map with 'M' or 'm'
    if (e.key === 'm' || e.key === 'M') {
      const modal = document.getElementById('cme-theater-map-modal');
      const isVisible = modal && modal.style.display === 'flex';
      if (isVisible) {
        window.closeCmeTheaterMapModal();
      } else {
        window.openCmeTheaterMapModal();
      }
      return;
    }

    // Presenter Focus Hotkeys (when Presenter Mode is active)
    if (window._cmePresenterActive) {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        window.stepCmePresenterStage(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        window.stepCmePresenterStage(-1);
      } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
        e.preventDefault();
        window.setCmePresenterStage(parseInt(e.key, 10) - 1);
      } else if (e.key === 'Escape') {
        const modal = document.getElementById('cme-theater-map-modal');
        if (modal && modal.style.display === 'flex') {
          window.closeCmeTheaterMapModal();
        } else {
          window.toggleCmePresenterMode();
        }
      }
    } else if (e.key === 'Escape') {
      const modal = document.getElementById('cme-theater-map-modal');
      if (modal && modal.style.display === 'flex') {
        window.closeCmeTheaterMapModal();
      }
    }
  });
}

// ============================================================================
// TEACHING / 5-STAGE FOCUS VIEW ("PRESENTER MODE") ENGINE
// ============================================================================

window._cmePresenterActive = false;
window._cmePresenterStageIndex = 0;
window._cmePresenterLayoutMode = 'spotlight'; // 'spotlight' or 'panoramic'

export function toggleCmePresenterMode() {
  const spine = document.getElementById('lesson-chronology-spine');
  if (!spine) return;

  window._cmePresenterActive = !window._cmePresenterActive;
  const isActive = window._cmePresenterActive;

  const btn = document.getElementById('btn-cme-presenter-focus');
  const label = document.getElementById('cme-presenter-label');
  const foldedBanner = document.getElementById('cme-presenter-folded-banner');
  const proseContent = document.getElementById('cme-narrative-prose-content');

  if (isActive) {
    spine.classList.add('cme-presenter-active');
    spine.open = true;

    if (btn) {
      btn.style.background = '#0284c7';
      btn.style.color = '#ffffff';
      btn.style.borderColor = '#0369a1';
    }
    if (label) {
      label.innerHTML = '<i class="fa-solid fa-person-chalkboard"></i> Presenter Active (Exit)';
    }

    // Fold prose narrative
    if (foldedBanner) foldedBanner.style.display = 'block';
    if (proseContent) proseContent.style.display = 'none';

    // Inject Presenter Toolbar and Stage Focus View
    renderCmePresenterUI(spine);

    // Smoothly scroll spine to top of viewport for smartboard presentation
    spine.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    spine.classList.remove('cme-presenter-active');

    if (btn) {
      btn.style.background = '#f0fdf4';
      btn.style.color = '#166534';
      btn.style.borderColor = '#86efac';
    }
    if (label) {
      label.innerHTML = '<i class="fa-solid fa-person-chalkboard"></i> Presenter Focus View';
    }

    // Unfold prose narrative
    if (foldedBanner) foldedBanner.style.display = 'none';
    if (proseContent) proseContent.style.display = 'block';

    // Remove Presenter UI
    const toolbar = document.getElementById('cme-presenter-toolbar');
    if (toolbar) toolbar.remove();

    const spotlightBox = document.getElementById('cme-presenter-spotlight-box');
    if (spotlightBox) spotlightBox.remove();

    // Restore normal grid display
    const grid = spine.querySelector('.cme-chronology-spine-grid');
    if (grid) {
      grid.style.display = 'grid';
      grid.querySelectorAll('.cme-spine-card').forEach((c) => {
        c.style.display = 'flex';
      });
    }
  }
}

export function renderCmePresenterUI(spine) {
  // Extract stages from card elements
  const cards = Array.from(spine.querySelectorAll('.cme-spine-card'));
  if (cards.length === 0) return;

  const stageData = cards.map((c, idx) => {
    const stageNum = idx + 1;
    const date = c.querySelector('[data-stage] span[title]')?.textContent || '';
    const tag = c.querySelector('div[title*="•"] strong')?.textContent || '';
    const title = c.querySelector('h5')?.textContent?.trim() || `Stage ${stageNum}`;
    const desc = c.querySelector('.cme-spine-desc')?.textContent?.trim() || '';
    const because =
      c
        .querySelector('.cme-quiz-target[data-quiz-type="motive"] .cme-quiz-content')
        ?.textContent?.trim() || '';
    const therefore =
      c
        .querySelector('.cme-quiz-target[data-quiz-type="result"] .cme-quiz-content')
        ?.textContent?.trim() || '';
    const connective = c.querySelector('.cme-domino-bridge')?.getAttribute('title') || '';

    return { stageNum, date, tag, title, desc, because, therefore, connective };
  });

  // Ensure toolbar exists
  let toolbar = document.getElementById('cme-presenter-toolbar');
  if (!toolbar) {
    toolbar = document.createElement('div');
    toolbar.id = 'cme-presenter-toolbar';
    toolbar.className = 'cme-presenter-toolbar';
    toolbar.style.cssText =
      'background: #0f172a; border-bottom: 2px solid #0284c7; padding: 12px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; color: #ffffff;';

    const summary = spine.querySelector('summary');
    if (summary && summary.nextSibling) {
      spine.insertBefore(toolbar, summary.nextSibling);
    } else {
      spine.prepend(toolbar);
    }
  }

  // Render Toolbar HTML
  toolbar.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
      <span style="background: #0284c7; color: #ffffff; font-size: 0.72rem; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
        <i class="fa-solid fa-person-chalkboard"></i> Whole-Class Focus
      </span>
      
      <!-- Stage Selector Pills -->
      <div style="display: flex; gap: 4px; flex-wrap: wrap;">
        ${stageData
          .map(
            (s, idx) => `
          <button type="button" class="cme-presenter-pill" onclick="window.setCmePresenterStage(${idx});" style="padding: 4px 10px; font-size: 0.76rem; font-weight: 700; border-radius: 4px; cursor: pointer; transition: all 0.15s ease; ${
            idx === window._cmePresenterStageIndex
              ? 'background: #38bdf8; color: #0f172a; border: 1px solid #7dd3fc; font-weight: 900;'
              : 'background: #1e293b; color: #94a3b8; border: 1px solid #334155;'
          }">
            Stage ${s.stageNum}
          </button>
        `,
          )
          .join('')}
      </div>

      <!-- Prev / Next Steppers -->
      <div style="display: flex; gap: 4px;">
        <button type="button" onclick="window.stepCmePresenterStage(-1);" style="padding: 4px 9px; font-size: 0.74rem; font-weight: 700; background: #1e293b; color: #e2e8f0; border: 1px solid #334155; border-radius: 4px; cursor: pointer;" title="Previous Stage (Left Arrow)">
          &larr; Prev
        </button>
        <button type="button" onclick="window.stepCmePresenterStage(1);" style="padding: 4px 9px; font-size: 0.74rem; font-weight: 700; background: #1e293b; color: #e2e8f0; border: 1px solid #334155; border-radius: 4px; cursor: pointer;" title="Next Stage (Right Arrow)">
          Next &rarr;
        </button>
      </div>
    </div>

    <!-- Right Controls: Map Launcher & Exit -->
    <div style="display: flex; align-items: center; gap: 8px;">
      <button type="button" onclick="window.openCmeTheaterMapModal();" style="padding: 4px 11px; font-size: 0.76rem; font-weight: 700; background: #0369a1; color: #ffffff; border: 1px solid #38bdf8; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" title="Open Strategic Theater Map (M)">
        <i class="fa-solid fa-map-location-dot"></i> Theater Map
      </button>
      <button type="button" onclick="window.toggleCmePresenterMode();" style="padding: 4px 10px; font-size: 0.76rem; font-weight: 700; background: #334155; color: #cbd5e1; border: 1px solid #475569; border-radius: 4px; cursor: pointer;" title="Exit Presenter Focus (Esc)">
        Exit Focus
      </button>
    </div>
  `;

  // Render Spotlight Stage Box
  let spotlightBox = document.getElementById('cme-presenter-spotlight-box');
  if (!spotlightBox) {
    spotlightBox = document.createElement('div');
    spotlightBox.id = 'cme-presenter-spotlight-box';
    spotlightBox.className = 'cme-presenter-spotlight-box';
    spotlightBox.style.cssText =
      'padding: 24px; background: #ffffff; border-bottom: 2px solid #e2e8f0;';

    const grid = spine.querySelector('.cme-chronology-spine-grid');
    if (grid) {
      grid.style.display = 'none'; // Hide cramped multi-column grid during focus
      spine.insertBefore(spotlightBox, grid);
    }
  }

  const activeStage = stageData[window._cmePresenterStageIndex] || stageData[0];
  const isLast = activeStage.stageNum === stageData.length;

  spotlightBox.innerHTML = `
    <div style="max-width: 1080px; margin: 0 auto; animation: fadeIn 0.25s ease;">
      
      <!-- Stage Banner & Meta -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="background: #0f172a; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 0.82rem; font-weight: 900; padding: 3px 10px; border-radius: 5px; letter-spacing: 0.6px;">
            STAGE ${activeStage.stageNum} OF ${stageData.length}
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 1.05rem; font-weight: 800; color: #0284c7;">
            ${activeStage.date}
          </span>
        </div>
        ${
          activeStage.tag
            ? `
          <span style="font-size: 0.82rem; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; background: #f1f5f9; padding: 3px 10px; border-radius: 4px; border: 1px solid #cbd5e1;">
            Actor: <strong style="color: #0f172a;">${activeStage.tag}</strong>
          </span>
        `
            : ''
        }
      </div>

      <!-- Stage Title -->
      <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.85rem; font-weight: 800; color: #0f172a; margin: 0 0 14px 0; line-height: 1.25;">
        ${activeStage.title}
      </h3>

      <!-- Trigger Description -->
      <div style="font-size: 1.12rem; line-height: 1.65; color: #1e293b; background: #f8fafc; border-left: 4px solid #0284c7; padding: 14px 18px; border-radius: 0 8px 8px 0; margin-bottom: 22px;">
        ${activeStage.desc}
      </div>

      <!-- Side-by-Side Motive & Consequence Presentation Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; margin-bottom: 22px;">
        
        <!-- Motive Card -->
        <div style="background: #fefce8; border: 1.5px solid #fef08a; border-top: 4px solid #ca8a04; border-radius: 8px; padding: 16px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <i class="fa-solid fa-lightbulb" style="color: #ca8a04; font-size: 1rem;"></i>
            <span style="font-weight: 800; font-size: 0.82rem; text-transform: uppercase; color: #854d0e; letter-spacing: 0.5px;">
              Motive & Underlying Cause (Why did they act?)
            </span>
          </div>
          <div style="font-size: 0.98rem; line-height: 1.55; color: #713f12;">
            ${activeStage.because || 'Historical actors acted in response to rising geopolitical pressure and regional strategic imperatives.'}
          </div>
        </div>

        <!-- Consequence Card -->
        <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-top: 4px solid #16a34a; border-radius: 8px; padding: 16px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <i class="fa-solid fa-arrow-trend-up" style="color: #16a34a; font-size: 1rem;"></i>
            <span style="font-weight: 800; font-size: 0.82rem; text-transform: uppercase; color: #166534; letter-spacing: 0.5px;">
              Direct Consequence & Spark for Next Stage
            </span>
          </div>
          <div style="font-size: 0.98rem; line-height: 1.55; color: #14532d;">
            ${activeStage.therefore || 'Directly catalyzed the subsequent military or political maneuver in the causal sequence.'}
          </div>
        </div>
      </div>

      <!-- Domino Bridge to Next Stage -->
      ${
        !isLast
          ? `
        <div style="background: #eff6ff; border: 1.5px dashed #93c5fd; border-radius: 8px; padding: 12px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="background: #1d4ed8; color: #ffffff; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 0.85rem;">
              &darr;
            </span>
            <span style="font-size: 0.92rem; color: #1e40af; font-weight: 700;">
              <strong>Causal Domino Spark:</strong> How Stage ${activeStage.stageNum} forces Stage ${activeStage.stageNum + 1}
            </span>
          </div>
          <button type="button" onclick="window.stepCmePresenterStage(1);" style="padding: 6px 14px; font-size: 0.82rem; font-weight: 800; background: #1d4ed8; color: #ffffff; border: none; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 6px rgba(29, 78, 216, 0.3);">
            Advance to Stage ${activeStage.stageNum + 1} &rarr;
          </button>
        </div>
      `
          : `
        <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 8px; padding: 12px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fa-solid fa-flag-checkered" style="color: #16a34a; font-size: 1.2rem;"></i>
            <span style="font-size: 0.92rem; color: #166534; font-weight: 700;">
              <strong>Causal Spine Complete:</strong> Pupils now have the complete 5-stage causal narrative to tackle Edexcel 8-mark and 16-mark explanations.
            </span>
          </div>
          <button type="button" onclick="window.toggleCmePresenterMode();" style="padding: 6px 14px; font-size: 0.82rem; font-weight: 800; background: #166534; color: #ffffff; border: none; border-radius: 6px; cursor: pointer;">
            Return to Full Lesson Text &darr;
          </button>
        </div>
      `
      }
    </div>
  `;
}

export function setCmePresenterStage(idx) {
  window._cmePresenterStageIndex = idx;
  const spine = document.getElementById('lesson-chronology-spine');
  if (spine) {
    renderCmePresenterUI(spine);
  }
}

export function stepCmePresenterStage(delta) {
  const spine = document.getElementById('lesson-chronology-spine');
  if (!spine) return;
  const cards = spine.querySelectorAll('.cme-spine-card');
  const maxIdx = Math.max(0, cards.length - 1);
  const nextIdx = Math.min(Math.max(0, window._cmePresenterStageIndex + delta), maxIdx);
  setCmePresenterStage(nextIdx);
}

export function toggleCmeNarrativeFold() {
  const content = document.getElementById('cme-narrative-prose-content');
  const banner = document.getElementById('cme-presenter-folded-banner');
  if (!content) return;

  const isHidden = content.style.display === 'none';
  content.style.display = isHidden ? 'block' : 'none';
  if (banner) {
    banner.innerHTML = isHidden
      ? `
      <span style="font-weight: 800; color: #0369a1; font-size: 0.95rem;">
        <i class="fa-solid fa-eye-slash"></i> Full Lesson Narrative & Primary Sources (Expanded &bull; Click to re-fold)
      </span>
    `
      : `
      <span style="font-weight: 800; color: #0369a1; font-size: 0.95rem;">
        <i class="fa-solid fa-book-open"></i> Full Lesson Narrative & Primary Sources (Folded for Presenter Focus &bull; Click to expand)
      </span>
    `;
  }
}

// Global window registrations
window.openCmeTheaterMapModal = openCmeTheaterMapModal;
window.closeCmeTheaterMapModal = closeCmeTheaterMapModal;
window.switchCmeMapTab = switchCmeMapTab;
window.selectCmeHotspot = selectCmeHotspot;
window.zoomCmeMap = zoomCmeMap;
window.resetCmeMapZoom = resetCmeMapZoom;
window.openEnlargedCmeMap = openEnlargedCmeMap;
window.toggleCmePresenterMode = toggleCmePresenterMode;
window.setCmePresenterStage = setCmePresenterStage;
window.stepCmePresenterStage = stepCmePresenterStage;
window.toggleCmeNarrativeFold = toggleCmeNarrativeFold;
