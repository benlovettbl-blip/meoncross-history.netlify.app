const fs = require('fs');
const path = require('path');

const unitsPath = path.resolve(__dirname, '../units/cme_new/data.js');
const publicPath = path.resolve(__dirname, '../public/units/cme_new/data.js');
const tbPath = path.resolve(__dirname, 'cme_unified_textbook_data.cjs');

const tb = require(tbPath);
const pubData = require(publicPath).default || require(publicPath);
const unitData = require(unitsPath).default || require(unitsPath);

console.log('Synchronizing CME curriculum data...');

// 1. Synchronize causal_domino_spine questions across all 12 lessons
pubData.lessons.forEach((l, li) => {
  const unitL = unitData.lessons[li];
  if (l.causal_domino_spine && unitL.causal_domino_spine) {
    l.causal_domino_spine.stages.forEach((st, si) => {
      const uSt = unitL.causal_domino_spine.stages[si];
      if (st && st.question && uSt) {
        uSt.question = st.question;
      }
    });
  }
});

// Helper to bold key historical terms in text
function enrichHistoricalText(text) {
  const terms = [
    'Sykes-Picot Agreement',
    'T.E. Lawrence',
    'Arab Revolt',
    'Balfour Declaration',
    'David Lloyd George',
    'Arthur Balfour',
    'General Edmund Allenby',
    'League of Nations',
    'Transjordan',
    'Theodor Herzl',
    'Zionist Organization',
    'Jewish National Fund',
    'Kibbutzim',
    'Haganah',
    'Western Wall Riots',
    'Shaw Commission',
    'Hope Simpson Report',
    'Passfield White Paper',
    'Great Arab Revolt',
    'Arab Higher Committee',
    'Hajj Amin al-Husseini',
    'Peel Commission',
    'MacDonald White Paper',
    'White Paper',
    'Holocaust',
    'Displaced Persons',
    'Clement Attlee',
    'Ernest Bevin',
    'United Resistance Movement',
    'Aliyah Bet',
    'Irgun',
    'Menachem Begin',
    'Lehi',
    'Stern Gang',
    'King David Hotel',
    'Sergeants Affair',
    'SS Exodus',
    'UNSCOP',
    'Resolution 181',
    'Partition Plan',
    'Plan Dalet',
    'David Ben-Gurion',
    'Deir Yassin',
    'Green Line',
    'Al-Nakba',
    'UNRWA',
    'Resolution 194',
    'Absentee Property Law',
    'Law of Return',
    'Israeli Defence Forces',
    'IDF',
    'Fedayeen',
    'Unit 101',
    'Ariel Sharon',
    'Qibya massacre',
    'Gamal Abdel Nasser',
    'Czech arms deal',
    'Israeli attack on Gaza',
    'Aswan High Dam',
    'Suez Canal Company',
    'Sèvres Protocol',
    'Mitla Pass',
    'Dwight D. Eisenhower',
    'UNEF',
    'National Water Carrier',
    'Sea of Galilee',
    'Negev',
    'Cairo Summit',
    'Palestine Liberation Organisation',
    'PLO',
    'River Jordan',
    'Yasser Arafat',
    'Fatah',
    "Ba'athist coup",
    'Samu Raid',
    'King Hussein',
    'Operation Focus',
    'Mivtza Moked',
    'Sinai Peninsula',
    'Straits of Tiran',
    'Sharm el-Sheikh',
    'Golan Heights',
    'Old City of Jerusalem',
    'West Bank',
    'Gaza Strip',
    'Resolution 242',
    'Khartoum Summit',
    'Three Noes',
    'Allon Plan',
    'Gush Emunim',
    'War of Attrition',
    'Anwar Sadat',
    'Operation Badr',
    'Bar Lev Line',
    'Yom Kippur War',
    'Valley of Tears',
    'OPEC',
    'Oil Weapon',
    'Henry Kissinger',
    'Shuttle Diplomacy',
    'Sinai I',
    'Sinai II',
    'Menachem Begin',
    'Likud',
    'Camp David Accords',
    'Camp David',
    'Jimmy Carter',
    'Egypt-Israel Peace Treaty',
    'Operation Peace for Galilee',
    'Bashir Gemayel',
    'Phalangist',
    'Sabra and Shatila',
    'Kahan Commission',
    'First Intifada',
    'Unified National Leadership of the Uprising',
    'UNLU',
    'Hamas',
    'Sheikh Ahmed Yassin',
    'Oslo Accords',
    'Declaration of Principles',
    'Yitzhak Rabin',
    'Bill Clinton',
    'Palestinian Authority',
    'Oslo II',
    'Baruch Goldstein',
    'Yigal Amir',
  ];

  let res = text;
  // Sort by length descending to match longer multi-word phrases first
  terms.sort((a, b) => b.length - a.length);

  terms.forEach((term) => {
    // Avoid double bolding if already bolded
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(
      `(?<!\\*\\*)(?<!<strong>)\\b(${escaped})\\b(?!\\*\\*)(?!<\\/strong>)`,
      'g',
    );
    res = res.replace(regex, '**$1**');
  });

  return res;
}

// 2. Build uniform 4-block architecture for Lessons 0, 1, 2, 3
const ACT_TITLES = [
  'Context & Catalyst',
  'Escalation & Conflict',
  'Forensic Evidence & Turning Point',
  'Historical Verdict & Assessment',
];

// Configuration of visual plates for Lessons 0-3
const LESSON_PLATES = [
  // Lesson 0 (lesson_1)
  {
    plate1: {
      image: '/images/cme_allenby_jerusalem_1917.jpg',
      image_alt: 'General Allenby entering Jerusalem on foot through the Jaffa Gate, December 1917',
      caption:
        'General Allenby Enters Jerusalem (December 1917): Disclosing British military conquest of Ottoman Palestine, entering on foot out of respect for the holy city.',
      isReversed: false,
    },
    plate2: {
      image: '/images/cme_middle_east_mandates_1921_map.jpg',
      image_alt: 'League of Nations Mandates Map of the Middle East, 1921',
      caption:
        'League of Nations Mandates (1921): Carving the collapsed Ottoman Empire into British (Palestine, Transjordan, Iraq) and French (Syria, Lebanon) administrative zones.',
      isReversed: true,
    },
  },
  // Lesson 1 (lesson_2)
  {
    plate1: {
      image: '/units/cme_new/assets/king_david_ruins.png',
      image_alt:
        'The devastated southwestern wing of the King David Hotel in Jerusalem following the Irgun bombing in July 1946',
      caption:
        "The King David Hotel Bombing (22 July 1946): Menachem Begin's Irgun destroyed British military headquarters, killing 91 people and shattering British resolve.",
      isReversed: false,
    },
    plate2: {
      image: '/images/cme_1948_arab_invasion_map.png',
      image_alt:
        'Map of the 1948 Arab-Israeli War showing invading armies from Egypt, Transjordan, Syria, Iraq, and Lebanon',
      caption:
        'The 1948 Arab-Israeli War: Egypt, Jordan, Syria, Iraq, and Lebanon invaded the fledgling state immediately following the termination of the British Mandate.',
      isReversed: true,
    },
  },
  // Lesson 2 (lesson_3)
  {
    plate1: {
      image: '/images/cme_palestinian_refugees_1948.jpg',
      image_alt: 'Displaced Palestinian refugees carrying possessions along rural roads in 1948',
      caption:
        "The Nakba ('The Catastrophe', 1948): Over 700,000 Palestinian Arabs were expelled or fled from their homes during the military campaigns of 1948.",
      isReversed: false,
    },
    plate2: {
      image: '/images/cme_palestinian_refugees_leaving_gaza.webp',
      image_alt: 'Stateless Palestinian refugees gathered in emergency encampments in Gaza, 1949',
      caption:
        'Refugee Dispersal (1949): Stateless Palestinian populations concentrated in sprawling camps across Gaza, the West Bank, Jordan, Syria, and Lebanon.',
      isReversed: true,
    },
  },
  // Lesson 3 (lesson_4)
  {
    plate1: {
      image: '/images/cme_port_said_british_troops_1956.jpg',
      image_alt:
        'British troops patrolling the streets of Port Said during the Anglo-French Suez operation in November 1956',
      caption:
        'Anglo-French Invasion at Port Said (November 1956): British and French troops deployed under the secret Sèvres Protocol to seize the nationalised Suez Canal.',
      isReversed: false,
    },
    plate2: {
      image: '/images/cme_port_said_from_air.jpg',
      image_alt:
        'Aerial photograph of Port Said harbour with sunken ships blocking the Suez Canal waterway',
      caption:
        "Air Reconnaissance over Port Said: Demonstrating the physical destruction of harbour infrastructure and Egypt's defensive scuttling of canal shipping.",
      isReversed: true,
    },
  },
];

[0, 1, 2, 3].forEach((lIdx) => {
  const l = unitData.lessons[lIdx];
  const tbEnq = tb.ENQUIRIES[lIdx];
  const plates = LESSON_PLATES[lIdx];
  const sources = l.sources || [];

  const newBlocks = [];
  const blockKeys = ['block1', 'block2', 'block3', 'block4'];

  blockKeys.forEach((bk, bIdx) => {
    const rawBlock = tbEnq[bk];
    const actNum = bIdx + 1;
    const actTitle = `${ACT_TITLES[bIdx]} — ${rawBlock.title}`;

    const paras = rawBlock.paras.map((p, pIdx) => {
      const enriched = enrichHistoricalText(p);
      return `<span class="para-ref">[${actNum}.${pIdx + 1}]</span> ${enriched}`;
    });

    const blockObj = {
      title: rawBlock.title,
      paragraphs: paras,
      act: actNum,
      act_title: actTitle,
      text: paras.join('\n\n'),
    };

    // Attach alternating visual plates (Plate 1 on Block 0, Plate 2 on Block 2)
    if (bIdx === 0 && plates.plate1) {
      blockObj.image = plates.plate1.image;
      blockObj.image_alt = plates.plate1.image_alt;
      blockObj.caption = plates.plate1.caption;
      blockObj.isReversed = plates.plate1.isReversed;
    } else if (bIdx === 2 && plates.plate2) {
      blockObj.image = plates.plate2.image;
      blockObj.image_alt = plates.plate2.image_alt;
      blockObj.caption = plates.plate2.caption;
      blockObj.isReversed = plates.plate2.isReversed;
    }

    // Attach primary sources: [1, 1, 1, 2]
    if (bIdx === 0) {
      blockObj.sources = sources.slice(0, 1);
    } else if (bIdx === 1) {
      blockObj.sources = sources.slice(1, 2);
    } else if (bIdx === 2) {
      blockObj.sources = sources.slice(2, 3);
    } else if (bIdx === 3) {
      blockObj.sources = sources.slice(3, 5);
    }

    newBlocks.push(blockObj);
  });

  l.narrative_blocks = newBlocks;
  // Sync to pubData as well
  pubData.lessons[lIdx].narrative_blocks = newBlocks;
});

// Also ensure pubData lessons 0-11 have causal_domino_spine questions synced
unitData.lessons.forEach((l, li) => {
  pubData.lessons[li].causal_domino_spine = l.causal_domino_spine;
});

// Helper to write data.js file
function writeDataFile(filePath, dataObj) {
  const content = `const cme_new_data = ${JSON.stringify(dataObj, null, 2)};\n\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = cme_new_data;\n}\n\nexport default cme_new_data;\n`;
  fs.writeFileSync(filePath, content, 'utf8');
}

writeDataFile(unitsPath, unitData);
writeDataFile(publicPath, pubData);

console.log('✅ Successfully synced units/cme_new/data.js and public/units/cme_new/data.js');
