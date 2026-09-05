/**
 * Ypres Battlefield Tour Stop Navigator
 * Provides 1-tap quick jump navigation to specific field stops, cemeteries, memorials, and poetry sites.
 */

export const BATTLEFIELD_DAYS = [
  {
    id: 'day_1',
    label: 'Day 1 (Thu)',
    title: 'Day 1: Arrival & The Medical Frontline',
    subtitle: 'Calais · Essex Farm · Langemarck · Hooge Crater · Peace Village',
    stops: [
      {
        id: 'calais_salient',
        headingId: 'historical-context-the-ypres-salient',
        title: 'Entering the Salient',
        shortTitle: 'The Salient Bulge',
        time: '1:00 PM',
        icon: 'fa-map-location-dot',
        highlight: 'Paul Nash war artist source & 3-sided artillery trap',
      },
      {
        id: 'war_graves_evolution',
        headingId:
          'before-the-first-cemetery-how-war-graves-formed-the-anatomy-of-a-cwgc-headstone',
        title: 'How War Graves Formed',
        shortTitle: 'Headstone Anatomy',
        time: '2:15 PM',
        icon: 'fa-monument',
        highlight: 'Sir Fabian Ware, egalitarian Portland stone & wooden crosses',
      },
      {
        id: 'essex_farm',
        headingId: 'essex-farm-the-advanced-dressing-station',
        title: 'Essex Farm ADS',
        shortTitle: 'Essex Farm ADS',
        time: '2:30 PM',
        icon: 'fa-hospital',
        highlight: 'Lt Col John McCrae, In Flanders Fields & Valentine Strudwick (15)',
      },
      {
        id: 'langemarck',
        headingId: 'langemarck-german-war-cemetery',
        title: 'Langemarck German Cemetery',
        shortTitle: 'Langemarck',
        time: '3:15 PM',
        icon: 'fa-cross',
        highlight: 'Kameradengrab, basalt architecture & 24,917 burials',
      },
      {
        id: 'langemarck_myth',
        headingId: 'the-weaponization-of-memory-the-langemarck-myth',
        title: 'The Langemarck Myth',
        shortTitle: 'Langemarck Myth',
        time: '3:30 PM',
        icon: 'fa-scroll',
        highlight: 'OHL 1914 press release, student sacrifice & Nazi weaponization',
      },
      {
        id: 'hooge_crater',
        headingId: 'hooge-crater-trench-warfare',
        title: 'Hooge Crater & Trenches',
        shortTitle: 'Hooge Crater',
        time: '4:00 PM',
        icon: 'fa-volcano',
        highlight: 'July 1915 mine blast, close-quarters trenches & medical museum',
      },
    ],
  },
  {
    id: 'day_2',
    label: 'Day 2 (Fri)',
    title: 'Day 2: Battlefields, Tyne Cot & Last Post',
    subtitle: 'Brooding Soldier · Sanctuary Wood · Tyne Cot · Lijssenthoek · Menin Gate',
    stops: [
      {
        id: 'brooding_soldier',
        headingId: 'the-brooding-soldier-poison-gas',
        title: 'The Brooding Soldier',
        shortTitle: 'Brooding Soldier',
        time: '9:15 AM',
        icon: 'fa-person-military-pointing',
        highlight: 'St Julien Canadian memorial & April 1915 poison gas attack',
      },
      {
        id: 'sanctuary_wood',
        headingId: 'sanctuary-wood',
        title: 'Sanctuary Wood (Hill 62)',
        shortTitle: 'Sanctuary Wood',
        time: '9:45 AM',
        icon: 'fa-tree',
        highlight: 'Preserved frontline British trench systems & battlefield museum',
      },
      {
        id: 'tyne_cot',
        headingId: 'tyne-cot-cemetery',
        title: 'Tyne Cot British Cemetery',
        shortTitle: 'Tyne Cot',
        time: '1:00 PM',
        icon: 'fa-monument',
        highlight: "World's largest CWGC cemetery & 4 Stubbington village fallen",
      },
      {
        id: 'lijssenthoek',
        headingId: 'lijssenthoek-casualty-clearing-station',
        title: 'Lijssenthoek Visitors Centre',
        shortTitle: 'Lijssenthoek CCS',
        time: '2:15 PM',
        icon: 'fa-truck-medical',
        highlight: 'Casualty Clearing Station, triage railway line & Nurse Nellie Spindler',
      },
      {
        id: 'menin_gate_day2',
        headingId: 'the-menin-gate',
        title: 'Menin Gate Last Post Ceremony',
        shortTitle: 'Menin Gate Last Post',
        time: '7:00 PM',
        icon: 'fa-archway',
        highlight: 'Official 8:00 PM ceremony, wreath laying & Franklin/Ayling Panel 35',
      },
    ],
  },
  {
    id: 'day_3',
    label: 'Day 3 (Sat)',
    title: 'Day 3: Ramparts, Talbot House & The Journey Home',
    subtitle: 'Ramparts Walk · Talbot House · Poperinge Death Cells · Shot at Dawn',
    stops: [
      {
        id: 'ramparts',
        headingId: 'ypres-ramparts',
        title: 'Menin Gate & Ramparts Walk',
        shortTitle: 'Ramparts Walk',
        time: '9:15 AM',
        icon: 'fa-person-walking',
        highlight: 'Siegfried Sassoon "On Passing the New Menin Gate" & moat cemetery',
      },
      {
        id: 'talbot_house',
        headingId: 'talbot-house-every-man-s-club',
        title: 'Talbot House, Poperinge',
        shortTitle: 'Talbot House',
        time: '11:20 AM',
        icon: 'fa-mug-hot',
        highlight: 'Tubby Clayton, "Abandon Rank All Ye Who Enter Here" & upper chapel',
      },
      {
        id: 'death_cells',
        headingId: 'poperinge-death-cells-discipline',
        title: 'Poperinge Town Hall Death Cells',
        shortTitle: 'Death Cells',
        time: '1:30 PM',
        icon: 'fa-lock',
        highlight: 'Military executions, shell shock, and the wooden execution post',
      },
      {
        id: 'shot_at_dawn',
        headingId: 'the-shot-at-dawn-memorial-national-memorial-arboretum-uk',
        title: 'Shot at Dawn Memorial (UK)',
        shortTitle: 'Shot at Dawn',
        time: '2:30 PM',
        icon: 'fa-ribbon',
        highlight: 'National Memorial Arboretum, Herbert Burden & 2006 statutory pardon',
      },
    ],
  },
  {
    id: 'heroes',
    label: 'Village Fallen',
    title: 'Stubbington Fallen & The Lowry Brothers',
    subtitle: 'Crofton Parish Tablet · Menin Gate Panel 35 · Tyne Cot Panels',
    stops: [
      {
        id: 'hero_0',
        dayLessonId: 'hero_0',
        title: 'Pte Thomas John Franklin',
        shortTitle: 'Pte Franklin',
        time: 'Age 23',
        icon: 'fa-user',
        highlight: 'Menin Gate Panel 35 · 1st Bn Hampshire Regt · 2nd Ypres gas defense',
      },
      {
        id: 'hero_1',
        dayLessonId: 'hero_1',
        title: 'Pte William (Walter) Ayling',
        shortTitle: 'Pte Ayling',
        time: 'Age 20',
        icon: 'fa-user',
        highlight: 'Menin Gate Panel 35 · 1st Bn Hampshire Regt · Stubbington Baker Boy',
      },
      {
        id: 'hero_2',
        dayLessonId: 'hero_2',
        title: 'Pte Sydney Muckett',
        shortTitle: 'Pte Muckett',
        time: 'Age 21',
        icon: 'fa-user',
        highlight: 'Tyne Cot Panel 88–90 · Pompey Pals · Menin Road Ridge',
      },
      {
        id: 'hero_3',
        dayLessonId: 'hero_3',
        title: 'Pte Arthur Rye',
        shortTitle: 'Pte Rye',
        time: 'Age 21',
        icon: 'fa-user',
        highlight: 'Tyne Cot Panel 88–90 · Pompey Pals · Polygon Wood assault',
      },
      {
        id: 'hero_4',
        dayLessonId: 'hero_4',
        title: 'L/Cpl Archibald Hugh Ward',
        shortTitle: 'L/Cpl Ward',
        time: 'Age 23',
        icon: 'fa-user',
        highlight: 'Tyne Cot Panel 88–90 · Hampshire Yeomanry · 4 weeks before Armistice',
      },
      {
        id: 'hero_5',
        dayLessonId: 'hero_5',
        title: 'Pte Charles Alfred Warland',
        shortTitle: 'Pte Warland',
        time: 'Age 20',
        icon: 'fa-user',
        highlight: 'Tyne Cot Panel 14–17 · The Queens · Battle of Broodseinde',
      },
      {
        id: 'hero_lowry_william',
        dayLessonId: 'hero_lowry_william',
        title: '2nd Lt William Lowry',
        shortTitle: 'Lt W. Lowry',
        time: 'Age 25',
        icon: 'fa-star',
        highlight: 'Gallipoli (Gully Ravine) · 14th Ferozepore Sikhs · Eldest brother',
      },
      {
        id: 'hero_lowry_auriol',
        dayLessonId: 'hero_lowry_auriol',
        title: 'Lt Col Eric Lowry, DSO, MC',
        shortTitle: 'Lt Col E. Lowry',
        time: 'Age 25',
        icon: 'fa-medal',
        highlight: '2nd Bn West Yorkshires · Wounded at Westhoek · Middle brother',
      },
      {
        id: 'hero_lowry_cyril',
        dayLessonId: 'hero_lowry_cyril',
        title: 'Capt Cyril Lowry',
        shortTitle: 'Capt C. Lowry',
        time: 'Age 20',
        icon: 'fa-cross',
        highlight: 'Pozières Memorial · Fell in counter-attack before brother Eric',
      },
    ],
  },
  {
    id: 'day_0',
    label: 'Pre-Trip Pack',
    title: 'Pre-Trip Information & Logistics',
    subtitle: 'Leadership · Kit Checklist · Food & Euros · Rooming & Safety',
    stops: [
      {
        id: 'prep_leadership',
        headingId: 'joint-leadership-official-briefing-resources',
        title: 'Joint Leadership & Resources',
        shortTitle: 'Leadership',
        time: 'Staff',
        icon: 'fa-user-tie',
        highlight: 'Mr Ben Lovett, Mr James Garrett (The History Boys), Dr Kirkup, Mrs Lushey',
      },
      {
        id: 'prep_mission',
        headingId: 'the-core-mission-the-lowry-family-the-stubbington-fallen',
        title: 'The Lowry Family & Village Fallen',
        shortTitle: 'Local Mission',
        time: 'Holy Rood',
        icon: 'fa-shield-halved',
        highlight: 'Connecting Stubbington to the memorial walls of Ypres',
      },
      {
        id: 'prep_kit',
        headingId: 'essential-kit-checklist-weather-protection',
        title: 'Essential Kit Checklist',
        shortTitle: 'Kit Checklist',
        time: 'Gear',
        icon: 'fa-shirt',
        highlight: 'Broken-in walking boots, windproof waterproofs, warm evening layers',
      },
      {
        id: 'prep_catering',
        headingId: 'catering-food-spending-money-euros',
        title: 'Catering & Spending Money',
        shortTitle: 'Catering & €',
        time: 'Euros',
        icon: 'fa-euro-sign',
        highlight: '€30–€40 cash for Friday/Saturday supermarket packed lunches',
      },
      {
        id: 'prep_accommodation',
        headingId: 'accommodation-safety-rooming-allocation-timeline',
        title: 'Peace Village Hostel & Timeline',
        shortTitle: 'Base & Safety',
        time: 'Hostel',
        icon: 'fa-hotel',
        highlight: 'Kemmel base, 22:00 curfew, room checks and base emergency contact',
      },
    ],
  },
];

/**
 * Returns HTML for the in-lesson horizontal quick-jump ribbon.
 */
export function renderStopQuickBar(currentLesson) {
  if (!currentLesson) return '';
  const currentId = currentLesson.id || '';

  // Find matching day config or default to Day 1
  let dayConfig = BATTLEFIELD_DAYS.find((d) => d.id === currentId);
  if (!dayConfig && currentId.startsWith('hero_')) {
    dayConfig = BATTLEFIELD_DAYS.find((d) => d.id === 'heroes');
  }

  const stops = dayConfig ? dayConfig.stops : [];
  if (!stops || stops.length === 0) return '';

  return `
    <div class="stop-quick-jump-bar no-print">
      <div class="stop-quick-label">
        <i class="fa-solid fa-location-dot"></i>
        <span>Stops:</span>
      </div>
      <div class="stop-quick-chips">
        ${stops
          .map(
            (stop, idx) => `
          <button class="stop-chip" data-action="jump-to-stop" data-target-id="${stop.headingId || ''}" data-day-id="${stop.dayLessonId || dayConfig.id}" data-stop-id="${stop.id}" title="${stop.title}">
            <span class="stop-chip-num">${idx + 1}</span>
            <span class="stop-chip-title">${stop.shortTitle || stop.title}</span>
            ${stop.time ? `<span class="stop-chip-time">${stop.time}</span>` : ''}
          </button>
        `,
          )
          .join('')}
        <button class="stop-chip stop-chip-all" data-action="open-stop-navigator" title="View all stops across all 3 days">
          <i class="fa-solid fa-compass"></i>
          <span>All Tour Stops ▾</span>
        </button>
      </div>
    </div>
  `;
}

/**
 * Smoothly scrolls to a stop and applies a glowing pulse animation.
 */
export function jumpToStop(targetId, dayLessonId = null) {
  // If a day was requested and it is not currently loaded, switch day first!
  const currentLesson = window.currentActiveLesson;
  if (dayLessonId && currentLesson && currentLesson.id !== dayLessonId) {
    const allLessons =
      (window.currentUnitData && window.currentUnitData.lessons) ||
      (window.appStore &&
        window.appStore.state.activeUnitData &&
        window.appStore.state.activeUnitData.lessons) ||
      [];
    const targetIdx = allLessons.findIndex((l) => l.id === dayLessonId);
    if (targetIdx >= 0 && window.viewLessonDetail) {
      window.viewLessonDetail(targetIdx, targetId);
      return;
    }
  }

  // Look for target element
  let targetEl = null;
  if (targetId) {
    targetEl = document.getElementById(targetId);
  }

  // Fallback: search for headings or cards containing matching text or data attribute
  if (!targetEl && targetId) {
    targetEl =
      document.querySelector(`[data-stop-id="${targetId}"]`) ||
      document.querySelector(`h4#${targetId}`) ||
      document.querySelector(`[id*="${targetId}"]`);
  }

  if (targetEl) {
    const headerOffset = 80;
    const elementPosition = targetEl.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth',
    });

    // Pulse highlight target
    const highlightTarget =
      targetEl.closest('.phase-card') ||
      targetEl.closest('.narrative-chunk') ||
      targetEl.closest('.poetry-dossier-card') ||
      targetEl;

    highlightTarget.classList.remove('jump-highlight-pulse');
    // Force reflow
    void highlightTarget.offsetWidth;
    highlightTarget.classList.add('jump-highlight-pulse');

    setTimeout(() => {
      highlightTarget.classList.remove('jump-highlight-pulse');
    }, 2400);
  } else {
    // If element not found directly on page, scroll smoothly to content
    const content =
      document.getElementById('content-area') || document.querySelector('.lesson-content');
    if (content) {
      window.scrollTo({ top: content.offsetTop - 60, behavior: 'smooth' });
    }
  }
}

/**
 * Ensures the floating "Jump to Stop" action button exists on the screen for the trip unit.
 */
export function ensureFloatingJumpButton() {
  const existing = document.getElementById('floating-stop-navigator-btn');
  const isTrip =
    window.currentUnitId === 'trip_ypres' ||
    (window.currentUnitData && window.currentUnitData.type === 'trip');

  if (!isTrip) {
    if (existing) existing.remove();
    return;
  }

  if (!existing) {
    const btn = document.createElement('button');
    btn.id = 'floating-stop-navigator-btn';
    btn.className = 'floating-stop-jump-btn no-print';
    btn.setAttribute('data-action', 'open-stop-navigator');
    btn.setAttribute('title', 'Quick Jump to Battlefield Stop');
    btn.innerHTML = `
      <i class="fa-solid fa-location-crosshairs"></i>
      <span class="btn-text">Jump to Stop</span>
    `;
    document.body.appendChild(btn);
  }
}

/**
 * Opens the interactive Battlefield Tour Stop Navigator Modal.
 */
export function openStopNavigatorModal(defaultDayId = null) {
  // Remove existing modal if any
  const existing = document.getElementById('stop-navigator-modal-overlay');
  if (existing) existing.remove();

  const currentLessonId = (window.currentActiveLesson && window.currentActiveLesson.id) || 'day_1';
  const activeDay =
    defaultDayId ||
    (BATTLEFIELD_DAYS.some((d) => d.id === currentLessonId) ? currentLessonId : 'day_1');

  const overlay = document.createElement('div');
  overlay.id = 'stop-navigator-modal-overlay';
  overlay.className = 'modal-overlay no-print';
  overlay.style.cssText =
    'position: fixed; inset: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); justify-content: center; align-items: center; z-index: 2500; display: flex; padding: 15px; box-sizing: border-box;';

  overlay.onclick = function (e) {
    if (e.target === overlay) overlay.remove();
  };

  overlay.innerHTML = `
    <div class="stop-navigator-dialog" style="background: #ffffff; width: 100%; max-width: 820px; max-height: 88vh; border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 20px 40px rgba(0,0,0,0.4); border: 1.5px solid #cbd5e1; animation: fadeInUp 0.25s ease-out;">
      
      <!-- Header -->
      <div style="background: #0f172a; color: white; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #1e3a8a; flex-shrink: 0;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="background: #1e3a8a; width: 38px; height: 38px; border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 1px solid #3b82f6; flex-shrink: 0;">
            <i class="fa-solid fa-compass" style="color: #60a5fa; font-size: 1.2rem;"></i>
          </div>
          <div>
            <h3 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 1.25rem; color: #f8fafc; line-height: 1.2;">
              Battlefield Tour Stop Navigator
            </h3>
            <p style="margin: 2px 0 0 0; font-size: 0.82rem; color: #94a3b8; line-height: 1.3;">
              Tap any stop to jump directly to on-site notes, history &amp; poetry readings.
            </p>
          </div>
        </div>
        <button onclick="document.getElementById('stop-navigator-modal-overlay').remove()" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; font-size: 1.2rem; cursor: pointer; border-radius: 6px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s;">&times;</button>
      </div>

      <!-- Navigation Tabs -->
      <div style="display: flex; gap: 8px; padding: 10px 16px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; overflow-x: auto; -webkit-overflow-scrolling: touch; flex-shrink: 0; min-height: 52px; align-items: center; box-sizing: border-box;">
        ${BATTLEFIELD_DAYS.map((day) => {
          const isSelected = day.id === activeDay;
          return `
            <button class="nav-day-tab-btn ${isSelected ? 'active' : ''}" data-action="switch-navigator-tab" data-day-id="${day.id}" style="padding: 7px 14px; font-size: 0.85rem; font-weight: 700; border-radius: 20px; border: 1.5px solid ${isSelected ? '#1e3a8a' : '#cbd5e1'}; background: ${isSelected ? '#1e3a8a' : '#ffffff'}; color: ${isSelected ? '#ffffff' : '#475569'}; cursor: pointer; white-space: nowrap; flex-shrink: 0; transition: all 0.2s;">
              ${day.label}
            </button>
          `;
        }).join('')}
      </div>

      <!-- Stops Content Area -->
      <div id="navigator-tab-content" style="padding: 16px 20px; overflow-y: auto; flex: 1 1 auto; -webkit-overflow-scrolling: touch; box-sizing: border-box;">
        ${renderNavigatorStopsHTML(activeDay)}
      </div>

      <!-- Footer Quick Info -->
      <div style="background: #f1f5f9; padding: 12px 20px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; flex-shrink: 0;">
        <span style="font-size: 0.82rem; color: #64748b; display: inline-flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-satellite-dish" style="color: #059669;"></i> Works 100% offline during coach travel in Belgium
        </span>
        <button onclick="document.getElementById('stop-navigator-modal-overlay').remove()" class="btn btn-secondary" style="padding: 6px 16px; font-size: 0.85rem; font-weight: 600; border-radius: 6px; cursor: pointer;">
          Close
        </button>
      </div>

    </div>
  `;

  document.body.appendChild(overlay);
}

/**
 * Generates the cards list for the active day inside the navigator modal.
 */
export function renderNavigatorStopsHTML(dayId) {
  const day = BATTLEFIELD_DAYS.find((d) => d.id === dayId) || BATTLEFIELD_DAYS[0];
  if (!day) return '';

  return `
    <div style="margin-bottom: 16px;">
      <h4 style="margin: 0 0 4px 0; color: #0f172a; font-family: 'Playfair Display', serif; font-size: 1.25rem;">
        ${day.title}
      </h4>
      <p style="margin: 0; font-size: 0.88rem; color: #64748b;">
        ${day.subtitle}
      </p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr)); gap: 14px;">
      ${day.stops
        .map(
          (stop, sIdx) => `
        <div class="navigator-stop-card" data-action="jump-to-stop" data-target-id="${stop.headingId || ''}" data-day-id="${stop.dayLessonId || day.id}" data-stop-id="${stop.id}" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 14px 16px; cursor: pointer; transition: all 0.2s; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 5px rgba(0,0,0,0.03);">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; background: #eff6ff; color: #1e3a8a; padding: 3px 8px; border-radius: 12px; display: inline-flex; align-items: center; gap: 4px;">
                <i class="fa-solid ${stop.icon || 'fa-location-dot'}"></i> Stop ${sIdx + 1}
              </span>
              ${stop.time ? `<span style="font-size: 0.78rem; font-weight: 700; background: #f8fafc; color: #64748b; padding: 2px 8px; border-radius: 10px; border: 1px solid #e2e8f0;">${stop.time}</span>` : ''}
            </div>
            <h5 style="margin: 0 0 6px 0; color: #0f172a; font-size: 1.05rem; font-family: 'Playfair Display', serif; font-weight: 700;">
              ${stop.title}
            </h5>
            <p style="margin: 0; font-size: 0.85rem; color: #475569; line-height: 1.45;">
              ${stop.highlight}
            </p>
          </div>
          <div style="margin-top: 12px; padding-top: 8px; border-top: 1px dashed #e2e8f0; display: flex; justify-content: flex-end; align-items: center; gap: 4px; color: #1d4ed8; font-size: 0.82rem; font-weight: 700;">
            <span>Jump to Stop</span>
            <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      `,
        )
        .join('')}
    </div>
  `;
}

// Bind globally so events and inline handlers can invoke them
if (typeof window !== 'undefined') {
  window.jumpToStop = jumpToStop;
  window.openStopNavigator = openStopNavigatorModal;
}
