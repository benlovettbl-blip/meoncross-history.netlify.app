/**
 * History Revision Hub — Master Curriculum Thematic Matrix (Single Source of Truth)
 *
 * Grounded in Christine Counsell's principles of vertical curriculum coherence.
 * Tracks 4 overarching disciplinary threads across Key Stage 3 and GCSE (Paper 1, 2 & 3).
 *
 * Dual-Compatible: Supports both Node.js (CommonJS `require`) and Vite/Browser (ESM `import`).
 */

const MASTER_DISCIPLINARY_STRANDS = [
  {
    id: 'sovereignty_state_power',
    name: 'Sovereignty, State & Power',
    color: '#1e3a8a',
    badge: 'State & Sovereignty',
    description:
      'Tracking the evolution of monarchical autocracy, constitutional friction, parliamentary settlements, and the mechanics of modern state power.',
  },
  {
    id: 'trade_technology_empire',
    name: 'Trade, Technology & Empire',
    color: '#0369a1',
    badge: 'Empire & Trade',
    description:
      'Examining commercial extraction, corporate trading monopolies, technological breakthroughs, and maritime geopolitical expansion.',
  },
  {
    id: 'ideology_faith_causation',
    name: 'Ideology, Faith & Causation',
    color: '#b91c1c',
    badge: 'Faith & Ideology',
    description:
      'Analysing religious volatility, shifting scientific worldviews, theological dogmas, and competing historical explanations.',
  },
  {
    id: 'resistance_agency_rights',
    name: 'Resistance, Agency & Rights',
    color: '#15803d',
    badge: 'Agency & Resistance',
    description:
      'Uncovering how enslaved peoples, religious minorities, working classes, and subjugated populations actively resisted power and reshaped the social contract.',
  },
];

const UNIT_THEMATIC_STRANDS = {
  // -------------------------------------------------------------
  // KEY STAGE 3 UNITS
  // -------------------------------------------------------------
  early_modern_world: [
    {
      id: 'sovereignty_state_power',
      title: 'Sovereignty & Power',
      color: '#1e3a8a',
      trajectory: 'Divine Right Absolutism → Civil War, Regicide & 1689 Settlement (L4–L6)',
      lessonsCovered: [4, 5, 6],
    },
    {
      id: 'trade_technology_empire',
      title: 'Exploration & Trade',
      color: '#0369a1',
      trajectory: 'Ottoman fall → Tordesillas → East India Co & Mughal trade (L1–L3)',
      lessonsCovered: [1, 2, 3],
    },
    {
      id: 'ideology_faith_causation',
      title: 'Religious Volatility',
      color: '#b91c1c',
      trajectory: 'Reformation zeal → Gunpowder Plot & Jacobean Puritan state (L2, L4, L5)',
      lessonsCovered: [2, 4, 5],
    },
    {
      id: 'resistance_agency_rights',
      title: 'Enslaved Resistance',
      color: '#15803d',
      trajectory: 'Triangular Trade → The Brookes → Jamaican Maroons & Nanny (L7, L8)',
      lessonsCovered: [7, 8],
    },
  ],

  water_and_sanitation: [
    {
      id: 'sovereignty_state_power',
      title: 'Public Health & State Power',
      color: '#1e3a8a',
      trajectory:
        'Roman civic governance → Medieval municipal neglect → 1848 Public Health Act (L1, L2, L4)',
      lessonsCovered: [1, 2, 4],
    },
    {
      id: 'trade_technology_empire',
      title: 'Sanitary Engineering & Tech',
      color: '#0369a1',
      trajectory: 'Roman aqueducts → Lead piping → Bazalgette’s brick sewer network (L1, L6)',
      lessonsCovered: [1, 6],
    },
    {
      id: 'ideology_faith_causation',
      title: 'Etiology & Scientific Empiricism',
      color: '#b91c1c',
      trajectory: 'Divine retribution & Miasma → John Snow’s Broad St map → Germ Theory (L3, L5)',
      lessonsCovered: [3, 5],
    },
    {
      id: 'resistance_agency_rights',
      title: 'Working-Class Activism & Rights',
      color: '#15803d',
      trajectory:
        'Polluted town riots → Water rate strikes → Public demand for health infrastructure (L2, L4)',
      lessonsCovered: [2, 4],
    },
  ],

  great_war: [
    {
      id: 'sovereignty_state_power',
      title: 'Imperial Alliances & State Control',
      color: '#1e3a8a',
      trajectory: 'Balance of power collapse → DORA censorship & munitions acts → Imperial fall',
      lessonsCovered: [1, 2, 5],
    },
    {
      id: 'trade_technology_empire',
      title: 'Industrialised Warfare',
      color: '#0369a1',
      trajectory: 'Artillery barrages → Trench networks & machine guns → Tanks & aerial combat',
      lessonsCovered: [2, 3, 4],
    },
    {
      id: 'ideology_faith_causation',
      title: 'Militarism, Propaganda & Mindset',
      color: '#b91c1c',
      trajectory: 'Jingoistic recruitment → Attrition psychology → Shell shock & disillusionment',
      lessonsCovered: [1, 4, 6],
    },
    {
      id: 'resistance_agency_rights',
      title: 'Dissent, Conscience & Revolution',
      color: '#15803d',
      trajectory: 'Conscientious objectors → Munitions strikes → Naval mutinies & 1918 Armistice',
      lessonsCovered: [5, 6],
    },
  ],

  great_war_part2: [
    {
      id: 'sovereignty_state_power',
      title: 'State Control, Conscription & Versailles',
      color: '#1e3a8a',
      trajectory:
        'Voluntary enlistment → DORA autocracy & 1916 conscription → 1919 Versailles breakdown (L1, L2, L4, L5)',
      lessonsCovered: [1, 2, 4, 5],
    },
    {
      id: 'trade_technology_empire',
      title: 'Industrialised Slaughter & Global Resources',
      color: '#0369a1',
      trajectory:
        'Trench engineering & Maxim guns → Munitions Shell Crisis → Imperial logistics & 1918 tanks (L2, L3, L4, L7)',
      lessonsCovered: [2, 3, 4, 7],
    },
    {
      id: 'ideology_faith_causation',
      title: 'Propaganda, War Guilt & Haig Revisionism',
      color: '#b91c1c',
      trajectory:
        'Kitchener jingoism → Attrition mindset & Haig debate → Article 231 War Guilt Clause (L1, L2, L5)',
      lessonsCovered: [1, 2, 5],
    },
    {
      id: 'resistance_agency_rights',
      title: 'Conscientious Dissent, Munitions & Colonial Agency',
      color: '#15803d',
      trajectory:
        'Sepoy battlefield agency → Canary Girls industrial mobilization → Taranto mutiny & objectors (L3, L4, L6)',
      lessonsCovered: [3, 4, 6],
    },
  ],

  // -------------------------------------------------------------
  // KEY STAGE 4 / GCSE SPECIFICATION UNITS
  // -------------------------------------------------------------
  medicine_through_time: [
    {
      id: 'sovereignty_state_power',
      title: 'State Intervention in Healthcare',
      color: '#1e3a8a',
      trajectory: 'Medieval royal neglect → Chadwick & 1875 Public Health Act → 1948 NHS Formation',
      lessonsCovered: [1, 3, 4],
    },
    {
      id: 'trade_technology_empire',
      title: 'Scientific & Surgical Innovation',
      color: '#0369a1',
      trajectory:
        'Pare’s cautery needles → Lister’s carbolic antisepsis → Fleming’s mass penicillin',
      lessonsCovered: [2, 3, 4],
    },
    {
      id: 'ideology_faith_causation',
      title: 'Beliefs about Cause & Disease',
      color: '#b91c1c',
      trajectory: 'Galenic Four Humours → Vesalian anatomy & Harvey → Koch’s bacteriology & DNA',
      lessonsCovered: [1, 2, 3, 4],
    },
    {
      id: 'resistance_agency_rights',
      title: 'Popular Demand & Universal Welfare',
      color: '#15803d',
      trajectory:
        'Anti-vaccination leagues → Cholera panic & civic revolt → Beveridge post-war consensus',
      lessonsCovered: [3, 4],
    },
  ],

  conflict_middle_east: [
    {
      id: 'sovereignty_state_power',
      title: 'Sovereignty, Mandates & Borders',
      color: '#1e3a8a',
      trajectory: '1947 UN Partition → 1948 Statehood → 1967 Territorial Occupation & Settlements',
      lessonsCovered: [1, 2, 4],
    },
    {
      id: 'trade_technology_empire',
      title: 'Cold War Proxies & Oil Hegemony',
      color: '#0369a1',
      trajectory: 'Suez 1956 nationalisation → Superpower arming → 1973 OPEC oil shock diplomacy',
      lessonsCovered: [2, 3, 5],
    },
    {
      id: 'ideology_faith_causation',
      title: 'Zionism, Pan-Arabism & Identity',
      color: '#b91c1c',
      trajectory:
        'Post-Holocaust national refuge vs Nasser’s pan-Arab nationalism & religious holy sites',
      lessonsCovered: [1, 2, 4],
    },
    {
      id: 'resistance_agency_rights',
      title: 'Refugee Agency, Insurgency & Peace',
      color: '#15803d',
      trajectory:
        '1948 Palestinian Nakba displacement → PLO Fedayeen guerrilla action → First Intifada & Oslo',
      lessonsCovered: [2, 3, 6],
    },
  ],

  weimar_nazi_germany: [
    {
      id: 'sovereignty_state_power',
      title: 'Democracy vs Authoritarian State',
      color: '#1e3a8a',
      trajectory:
        '1919 Weimar Constitution → Article 48 abuse → Reichstag Fire & Enabling Act autocracy',
      lessonsCovered: [1, 2, 3],
    },
    {
      id: 'trade_technology_empire',
      title: 'Economic Shocks & War Production',
      color: '#0369a1',
      trajectory:
        '1923 Hyperinflation → 1929 Wall St crash → Schacht’s New Plan & Four-Year War Economy',
      lessonsCovered: [1, 2, 4],
    },
    {
      id: 'ideology_faith_causation',
      title: 'Totalitarian Ideology & Indoctrination',
      color: '#b91c1c',
      trajectory:
        'Dolchstoß myth → Racial antisemitism → Goebbels propaganda, Hitler Youth & Church control',
      lessonsCovered: [1, 3, 4],
    },
    {
      id: 'resistance_agency_rights',
      title: 'Repression vs Covert Resistance',
      color: '#15803d',
      trajectory:
        'SA terror & Dachau → Edelweiss Pirates & White Rose → July 1944 Stauffenberg bomb plot',
      lessonsCovered: [3, 4],
    },
  ],
};

/**
 * Returns the 4 Thematic Strands for any unit, falling back to Early Modern World defaults.
 */
function getThematicStrandsForUnit(unitId) {
  if (UNIT_THEMATIC_STRANDS[unitId]) {
    return UNIT_THEMATIC_STRANDS[unitId];
  }
  return [
    {
      id: 'sovereignty_state_power',
      title: 'Sovereignty & Power',
      color: '#1e3a8a',
      trajectory: 'State institutions, governance, authority and constitutional development',
      lessonsCovered: [],
    },
    {
      id: 'trade_technology_empire',
      title: 'Trade & Technology',
      color: '#0369a1',
      trajectory: 'Economic engines, technical innovations and overseas geopolitical interactions',
      lessonsCovered: [],
    },
    {
      id: 'ideology_faith_causation',
      title: 'Ideology & Causation',
      color: '#b91c1c',
      trajectory: 'Religious beliefs, philosophical movements and drivers of historical change',
      lessonsCovered: [],
    },
    {
      id: 'resistance_agency_rights',
      title: 'Resistance & Agency',
      color: '#15803d',
      trajectory: 'Popular protest, social struggle, rights development and civilian agency',
      lessonsCovered: [],
    },
  ];
}

/**
 * Returns vertical progression across Key Stage 3 and GCSE for a specific strand.
 */
function getVerticalProgression(strandId) {
  const result = [];
  for (const [unitId, strands] of Object.entries(UNIT_THEMATIC_STRANDS)) {
    const match = strands.find((s) => s.id === strandId);
    if (match) {
      result.push({ unitId, ...match });
    }
  }
  return result;
}

// Universal Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MASTER_DISCIPLINARY_STRANDS,
    UNIT_THEMATIC_STRANDS,
    getThematicStrandsForUnit,
    getVerticalProgression,
  };
}

if (typeof window !== 'undefined') {
  window.CurriculumStrands = {
    MASTER_DISCIPLINARY_STRANDS,
    UNIT_THEMATIC_STRANDS,
    getThematicStrandsForUnit,
    getVerticalProgression,
  };
}
