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
    subtitle:
      'Brooding Soldier · Sanctuary Wood · Tyne Cot · Lijssenthoek · Passchendaele Museum · Menin Gate',
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
        id: 'passchendaele_museum',
        headingId: 'passchendaele-museum-underground-dugouts',
        title: 'Passchendaele Museum 1917',
        shortTitle: 'Passchendaele Museum',
        time: '3:45 PM',
        icon: 'fa-landmark-dome',
        highlight: 'Zonnebeke Chateau, deep 20ft dugout system & reconstructed frontline trenches',
      },
      {
        id: 'menin_gate_day2',
        headingId: 'the-menin-gate',
        title: 'Menin Gate Last Post Ceremony',
        shortTitle: 'Menin Gate Last Post',
        time: '7:00 PM',
        icon: 'fa-archway',
        highlight: 'Official 8:00 PM ceremony, wreath laying & Sgt. Frank Rogers Panel 35',
      },
    ],
  },
  {
    id: 'day_3',
    label: 'Day 3 (Sat)',
    title: 'Day 3: Ramparts, Talbot House & The Journey Home',
    subtitle:
      'Ramparts Walk · Chocolate Shop · Talbot House · Poperinge Death Cells · Journey Home',
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
        id: 'de_grootes_chocolate',
        headingId: 'de-groote-s-chocolatier-civilian-rebirth',
        title: 'De Groote’s Chocolatier',
        shortTitle: 'Belgian Chocolates',
        time: '10:30 AM',
        icon: 'fa-cookie-bite',
        highlight: 'Artisanal Belgian chocolate gifts on Grote Markt & €30–€40 cash handling',
      },
      {
        id: 'talbot_house',
        headingId: 'talbot-house-every-man-s-club',
        title: 'Talbot House, Poperinge',
        shortTitle: 'Talbot House',
        time: '11:20 AM',
        icon: 'fa-mug-hot',
        highlight: 'Tubby Clayton, "All rank abandon ye who enter here" & upper chapel',
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
        id: 'journey_home_calais',
        headingId: 'the-shot-at-dawn-memorial-national-memorial-arboretum-uk',
        title: 'Coach Departure to Calais & National Reflection',
        shortTitle: 'Journey Home (Calais)',
        time: '2:30 PM',
        icon: 'fa-bus',
        highlight:
          'Depart Poperinge for Eurotunnel Le Shuttle & UK Shot at Dawn Memorial reflection',
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
  return '';
}

/**
 * Smoothly scrolls to a target stop if requested.
 */
export function jumpToStop(targetId, dayLessonId = null) {
  if (!targetId) return;
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Removes the floating "Jump to Stop" action button.
 */
export function ensureFloatingJumpButton() {
  const existing = document.getElementById('floating-stop-navigator-btn');
  if (existing) existing.remove();
}

/**
 * Deprecated / removed Stop Navigator modal.
 */
export function openStopNavigatorModal(defaultDayId = null) {
  const existing = document.getElementById('stop-navigator-modal-overlay');
  if (existing) existing.remove();
}

export function renderNavigatorStopsHTML(dayId) {
  return '';
}

// Clean up any lingering navigator elements immediately
if (typeof document !== 'undefined') {
  const existingBtn = document.getElementById('floating-stop-navigator-btn');
  if (existingBtn) existingBtn.remove();
  const existingModal = document.getElementById('stop-navigator-modal-overlay');
  if (existingModal) existingModal.remove();
}

if (typeof window !== 'undefined') {
  window.jumpToStop = jumpToStop;
  window.openStopNavigator = openStopNavigatorModal;
}
