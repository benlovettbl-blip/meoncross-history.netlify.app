/**
 * Inject Key Individual objects into Key Topic 1 and Key Topic 3 in units/cme_new/data.js
 * and public/units/cme_new/data.js.
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');

const KT1_KT3_KEY_INDIVIDUALS = {
  lesson_1: {
    name: 'Arthur Balfour',
    role: 'British Foreign Secretary (1916–1919)',
    lifespan: '1848–1930',
    image: '/units/cme_new/assets/card_balfour.png',
    strategic_actions: [
      'Authored the historic 67-word Balfour Declaration in November 1917, pledging British support for a Jewish national home in Palestine.',
      'Secured League of Nations approval for the British Mandate framework, entrenching British imperial governance.',
      'Created contradictory diplomatic commitments between Zionist national aspirations and indigenous Arab self-determination.',
    ],
    significance:
      "Balfour's 1917 letter established official British imperial sponsorship for Zionist aspirations. By creating irreconcilable promises to Jewish immigrants and Arab residents, Balfour laid the structural foundations for modern Arab-Israeli conflict.",
  },
  lesson_2: {
    name: 'David Ben-Gurion',
    role: 'First Prime Minister of Israel (1948–1954, 1955–1963)',
    lifespan: '1886–1973',
    image: '/units/cme_new/assets/card_bengurion.png',
    strategic_actions: [
      'Endorsed the 1947 UN Partition Plan (Resolution 181), accepting sovereign statehood despite contentious borders.',
      'Proclaimed the Declaration of the Establishment of the State of Israel in Tel Aviv on 14 May 1948.',
      'Disbanded underground paramilitaries (Haganah, Irgun, Lehi), consolidating them into the unified Israel Defense Forces (IDF).',
    ],
    significance:
      "As Israel's paramount founding father, Ben-Gurion declared independence in defiance of international hesitation and coordinated invasions by five Arab armies, securing the state's survival through the 1948–49 War.",
  },
  lesson_3: {
    name: 'King Hussein of Jordan',
    role: 'King of the Hashemite Kingdom of Jordan (1952–1999)',
    lifespan: '1935–1999',
    image: '/units/cme_new/assets/card_hussein.png',
    strategic_actions: [
      'Governed the annexed West Bank and East Jerusalem, formally granting Jordanian citizenship to over 400,000 Palestinian refugees.',
      'Attempted to contain cross-border fedayeen guerrilla attacks into Israel to prevent devastating IDF retaliatory reprisals.',
      'Maintained secret back-channel communication with Israeli diplomats while navigating intense Arab League nationalist pressure.',
    ],
    significance:
      'Hussein steered Jordan through the catastrophic demographic and geopolitical fallout of the 1948 War, absorbing the largest concentration of Palestinian refugees while fighting to ensure the survival of the Hashemite crown.',
  },
  lesson_4: {
    name: 'Anthony Eden',
    role: 'Prime Minister of the United Kingdom (1955–1957)',
    lifespan: '1897–1977',
    image: '/units/cme_new/assets/card_eden.png',
    strategic_actions: [
      "Viewed Gamal Abdel Nasser's nationalization of the Suez Canal as an existential threat to the British Empire and global trade.",
      'Orchestrated the secret tripartite Protocol of Sèvres with France and Israel to fabricate a pretext for military intervention.',
      'Ordered British forces to invade Port Said, but was forced into a humiliating withdrawal under severe US financial pressure.',
    ],
    significance:
      "Eden's disastrous handling of the 1956 Suez Crisis marked the definitive end of Britain as an independent global superpower, shattered European imperial hegemony in the Middle East, and led directly to his resignation.",
  },
  lesson_11: {
    name: 'Menachem Begin',
    role: 'Prime Minister of Israel (1977–1983)',
    lifespan: '1913–1992',
    image: '/units/cme_new/assets/card_begin.png',
    strategic_actions: [
      'Welcomed Egyptian President Anwar Sadat to Jerusalem in November 1977, hosting his historic address to the Knesset.',
      'Negotiated the Camp David Accords with President Jimmy Carter and Sadat during twelve grueling days in September 1978.',
      'Signed the 1979 Egypt-Israel Peace Treaty, returning the entire oil-rich Sinai Peninsula and dismantling Israeli settlements.',
    ],
    significance:
      "Despite leading the nationalist Likud party, Begin proved that a right-wing Israeli leader could make profound territorial concessions, delivering Israel's first formal peace treaty with an Arab neighbour and breaking the Arab rejectionist front.",
  },
  lesson_12: {
    name: 'Ariel Sharon',
    role: 'Israeli Minister of Defence (1981–1983)',
    lifespan: '1928–2014',
    image: '/units/cme_new/assets/card_sharon.png',
    strategic_actions: [
      'Engineered Operation Peace for Galilee in June 1982, pushing IDF armored forces beyond southern Lebanon all the way to Beirut.',
      'Encircled the PLO leadership in West Beirut, forcing Yasser Arafat and 14,000 fighters to evacuate by sea to Tunisia.',
      'Resigned as Defence Minister in 1983 after the independent Kahan Commission found him personally and indirectly responsible for Sabra and Shatila.',
    ],
    significance:
      "Known as 'The Bulldozer', Sharon sought to militarily eliminate Palestinian nationalism in Lebanon, but the resulting bloodshed and moral outcry sparked massive anti-war protests in Israel and deeply polarized public opinion.",
  },
  lesson_13: {
    name: 'Yitzhak Rabin',
    role: 'Prime Minister of Israel (1974–1977, 1992–1995)',
    lifespan: '1922–1995',
    image: '/units/cme_new/assets/card_rabin.png',
    strategic_actions: [
      'Authorized back-channel secret negotiations in Norway that yielded mutual diplomatic recognition between Israel and the PLO.',
      'Signed the Declaration of Principles (Oslo I) on the White House lawn in September 1993, famously shaking hands with Yasser Arafat.',
      'Signed the 1995 Oslo II interim agreement transferring civil administration of Palestinian urban population centers to the PA.',
    ],
    significance:
      "A decorated warrior and former Chief of Staff who had enforced the 'Iron Fist' during the First Intifada, Rabin came to believe military force alone could not solve the conflict. His courageous pursuit of peace ended tragically when an extremist Israeli assassin shot him in November 1995.",
  },
};

function formatKiObject(ki) {
  const jsonStr = JSON.stringify(ki, null, 6);
  // indent with 6 spaces
  const lines = jsonStr.split('\n');
  const formattedLines = lines.map((l, idx) => {
    if (idx === 0) return 'key_individual: {';
    return '      ' + l;
  });
  return formattedLines.join('\n') + ',';
}

function processDataFile(filePath) {
  console.log(`Processing ${filePath}...`);
  let content = fs.readFileSync(filePath, 'utf8');

  for (const [lessonId, ki] of Object.entries(KT1_KT3_KEY_INDIVIDUALS)) {
    // Check if key_individual already exists for this lesson
    const idPattern = new RegExp(`id:\\s*['"]${lessonId}['"],`);
    const match = content.match(idPattern);
    if (!match) {
      console.warn(`[WARN] Could not find ${lessonId} in ${filePath}`);
      continue;
    }

    const lessonSnippet = content.substring(match.index, match.index + 500);
    if (lessonSnippet.includes('key_individual:')) {
      console.log(`[SKIP] ${lessonId} already has key_individual`);
      continue;
    }

    const replacement = `${match[0]}\n      ${formatKiObject(ki)}`;
    content = content.replace(match[0], replacement);
    console.log(`[INJECTED] Added key_individual to ${lessonId}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Saved ${filePath}`);
}

const targetFiles = [
  path.join(ROOT_DIR, 'units', 'cme_new', 'data.js'),
  path.join(ROOT_DIR, 'public', 'units', 'cme_new', 'data.js'),
];

for (const f of targetFiles) {
  if (fs.existsSync(f)) {
    processDataFile(f);
  } else {
    console.error(`File not found: ${f}`);
  }
}

console.log('Injection completed successfully.');
