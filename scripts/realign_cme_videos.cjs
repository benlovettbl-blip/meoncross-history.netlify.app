const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'units', 'cme_new', 'data.js');
let content = fs.readFileSync(dataPath, 'utf8');

// Vetted videos for each lesson of CME (0 to 11)
const vettedVideos = [
  // L1: KT 1.0 Broken Promises & Imperial Borders
  [
    {
      url: 'https://www.youtube.com/watch?v=iRYZjOuUnlU',
      title: '[STARTER HOOK] The Sykes-Picot Agreement & The Partition of the Ottoman Empire',
      duration: '5 mins 30 secs',
      teacher_guidance:
        'Explores how Britain and France secretly carved up the Middle East in 1916, creating artificial borders and conflicting promises to Arab leaders and Zionist pioneers.',
    },
    {
      url: 'https://www.youtube.com/watch?v=kbdvn8QHyX8',
      title:
        '[ENQUIRY EVIDENCE] The Balfour Declaration: Historical Context & British Motives (1917)',
      duration: '8 mins 3 secs',
      teacher_guidance:
        'In-depth examination of the 67-word Balfour Declaration and the British imperial strategy to secure the Suez Canal and influence American and Russian Jewish opinion.',
    },
  ],

  // L2: KT 1.1 End of British Mandate & Creation of Israel
  [
    {
      url: 'https://www.youtube.com/watch?v=PgnQeDoypO8',
      title: '[STARTER HOOK] GCSE Rapid Revision: Creation of the State of Israel (1945–1949)',
      duration: '2 mins 0 secs',
      teacher_guidance:
        'Fast-paced specification summary covering the end of the British Mandate, the King David Hotel bombing, UN Resolution 181, and Ben-Gurion’s 1948 declaration.',
    },
    {
      url: 'https://www.youtube.com/watch?v=2yBolHdMejM',
      title: '[ENQUIRY EVIDENCE] Post-War Jewish Immigration & The Exodus 1947 Affair',
      duration: '7 mins 57 secs',
      teacher_guidance:
        'Focuses on Holocaust survivors attempting to reach British-controlled Palestine, the interception of the SS Exodus, and the international outcry that forced Britain to hand Palestine to the UN.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/14-israel-and-the-arab-states-twentieth-century-history/',
      title:
        '[EXAM EXTENSION] 20th Century History: Israel and the Arab States – The 1948 War (BBC)',
      duration: '20 mins 7 secs',
      teacher_guidance:
        '⏱️ Watch Window: 00:00–08:30. In-depth BBC documentary covering the end of the British Mandate, the declaration of Israeli statehood, and the immediate outbreak of the 1948 Arab-Israeli War.',
    },
  ],

  // L3: KT 1.2 Aftermath of 1948–49 War & Palestinian Refugee Crisis
  [
    {
      url: 'https://www.youtube.com/watch?v=fXk_n_ww6GU',
      title: '[STARTER HOOK] GCSE Revision: The Reshaping of the Middle East (1948–1949)',
      duration: '2 mins 0 secs',
      teacher_guidance:
        'Concise recap of the 1949 armistice agreements: Israel expanding to 79% of mandatory Palestine, Jordan annexing the West Bank, and Egypt controlling the Gaza Strip.',
    },
    {
      url: 'https://www.youtube.com/watch?v=eTMRMX7Pw5U',
      title: '[PRIMARY EVIDENCE] The 1948 Arab-Israeli War & Al-Nakba ("The Catastrophe")',
      duration: '5 mins 29 secs',
      teacher_guidance:
        'Detailed exploration of the displacement of 700,000+ Palestinian Arabs, the controversy surrounding Plan Dalet, Deir Yassin, and the creation of permanent refugee camps.',
    },
    {
      url: 'https://www.youtube.com/watch?v=wjysy7ONisA',
      title: "[ENQUIRY PERSPECTIVE] 1948: Israel's War of Independence & Defence of Statehood",
      duration: '6 mins 58 secs',
      teacher_guidance:
        'Analyzes the Israeli perspective on the 1948 war: fighting a multi-front invasion by five Arab armies, Hagana mobilization, and Czechoslovak arms shipments.',
    },
  ],

  // L4: KT 1.3 Nasser & The 1956 Suez Crisis
  [
    {
      url: 'https://www.youtube.com/watch?v=PnZ2tG_PYpc',
      title: '[STARTER HOOK] GCSE Revision: President Nasser & The 1956 Suez Crisis',
      duration: '2 mins 0 secs',
      teacher_guidance:
        'High-speed overview of Gamal Abdel Nasser, the nationalisation of the Suez Canal Company, the secret British-French-Israeli collusion, and US diplomatic intervention.',
    },
    {
      url: 'https://www.youtube.com/watch?v=fwRFhmcfHgg',
      title:
        '[ENQUIRY EVIDENCE] The 1956 Suez Crisis: Secret Anglo-French Collusion & Superpower Pressure',
      duration: '4 mins 12 secs',
      teacher_guidance:
        "Explores the covert British, French, and Israeli secret agreement, Eisenhower's economic threats to crash sterling, and Britain's permanent imperial decline.",
    },
  ],

  // L5: KT 2.1 Road to the Six-Day War (1964–1967)
  [
    {
      url: 'https://www.youtube.com/watch?v=W7KFi6ZmZdU',
      title: '[STARTER HOOK] GCSE Revision: Escalation to the Six-Day War (1964–1967)',
      duration: '2 mins 0 secs',
      teacher_guidance:
        'Concise summary of the trigger factors: Syrian water diversion disputes, Samu raid, Egyptian troop massing in Sinai, and the closure of the Straits of Tiran.',
    },
    {
      url: 'https://era.org.uk/streaming-service-resource/s3e6-battle-for-the-holy-city-the-six-day-war-days-that-shook-the-world/',
      title: '[DOCUMENTARY EXTENSION] Days That Shook the World: The Six-Day War (BBC)',
      duration: '59 mins 2 secs',
      teacher_guidance:
        '⏱️ Watch Window: 00:00–09:15. Dramatic BBC reconstruction of the diplomatic brinkmanship in May 1967: Nasser expelling UNEF peacekeepers, blockading Sharm el-Sheikh, and Soviet false intelligence.',
    },
  ],

  // L6: KT 2.2 The Six-Day War (June 1967)
  [
    {
      url: 'https://www.youtube.com/watch?v=B60O6Kcijso',
      title: '[STARTER HOOK] The Pre-emptive Israeli Air Strike (5 June 1967)',
      duration: '6 mins 45 secs',
      teacher_guidance:
        'Tactical reconstruction of the surprise morning strike destroying the Egyptian Air Force on the runway in 3 hours, ensuring total Israeli air supremacy.',
    },
    {
      url: 'https://www.youtube.com/watch?v=F4GGpOxJW7I',
      title: '[ENQUIRY EVIDENCE] GCSE Revision: The Six-Day War Combat Timeline & Three Fronts',
      duration: '2 mins 0 secs',
      teacher_guidance:
        'Swift tactical timeline tracking the collapse of Egyptian forces in Sinai, Jordanian retreat from the West Bank/Old City of Jerusalem, and capture of the Golan Heights.',
    },
  ],

  // L7: KT 2.3 Conquered Territories & UN Resolution 242
  [
    {
      url: 'https://www.youtube.com/watch?v=hMOIIdnkrDY',
      title: '[STARTER HOOK] GCSE Revision: Conquered Territories & UN Resolution 242',
      duration: '2 mins 0 secs',
      teacher_guidance:
        'Clear summary of the new geopolitical reality: Israel occupying Sinai, Gaza, West Bank, East Jerusalem, and Golan Heights; the Khartoum Summit ("Three Noes"); and UN Resolution 242.',
    },
    {
      url: 'https://www.youtube.com/watch?v=s7zFGaUPGUA',
      title: '[ENQUIRY EVIDENCE] UN Resolution 242 & The "Land for Peace" Formula',
      duration: '5 mins 10 secs',
      teacher_guidance:
        'Analysis of the diplomatic ambiguity of Resolution 242: English ("withdrawal from territories") vs French ("withdrawal from the territories"), and the beginning of Jewish settlements.',
    },
  ],

  // L8: KT 2.4 Palestinian Resistance: PLO, Black September & Munich
  [
    {
      url: 'https://era.org.uk/streaming-service-resource/s1e8-black-september-hijackings-days-that-shook-the-world/',
      title: "[ENQUIRY EVIDENCE] Days That Shook the World: Black September & Dawson's Field (BBC)",
      duration: '29 mins 30 secs',
      teacher_guidance:
        '⏱️ Watch Window: 00:00–08:45. BBC reconstruction of the September 1970 Dawson’s Field hijackings by the PFLP, King Hussein’s crackdown in Jordan, and the expulsion of the PLO to Lebanon.',
    },
    {
      url: 'https://www.youtube.com/watch?v=SOLg_p4ScAU',
      title: '[PRIMARY ARCHIVE] The Munich 1972 Olympics Attack: Black September Hostage Crisis',
      duration: '8 mins 20 secs',
      teacher_guidance:
        'Archival news coverage and analysis of the Black September attack on Israeli athletes at the 1972 Munich Olympic Games and its global impact on counter-terrorism and aviation security.',
    },
  ],

  // L9: KT 2.5 War of Attrition & Yom Kippur War (1969–1973)
  [
    {
      url: 'https://www.youtube.com/watch?v=iK729p_-ZRg',
      title: '[STARTER HOOK] GCSE Revision: The Yom Kippur War (October 1973)',
      duration: '2 mins 0 secs',
      teacher_guidance:
        'Fast-paced summary of Sadat and Assad’s coordinated surprise offensive on Yom Kippur, the breaching of the Bar Lev Line, the Golan tank battles, and the OPEC oil embargo.',
    },
    {
      url: 'https://www.youtube.com/watch?v=1sBdLja2aVs',
      title:
        '[ENQUIRY EVIDENCE] The Yom Kippur War: Coordinated Arab Offensive & The Israeli Counter-Strike',
      duration: '7 mins 15 secs',
      teacher_guidance:
        "Examines Egypt's water cannon breach of the sand ramparts, Soviet SAM missile umbrellas, Sharon's counter-crossing of the Suez Canal, and US-Soviet nuclear alert escalation.",
    },
  ],

  // L10: KT 3.1 Shuttle Diplomacy to Camp David (1974–1979)
  [
    {
      url: 'https://www.youtube.com/watch?v=-XkX1UUe7HQ',
      title: '[STARTER HOOK] GCSE Revision: Shuttle Diplomacy to Camp David (1974–1979)',
      duration: '2 mins 0 secs',
      teacher_guidance:
        "Summary of Henry Kissinger's shuttle diplomacy, Anwar Sadat’s historic 1977 visit to Jerusalem, the 1978 Camp David summit with Jimmy Carter and Menachem Begin, and the 1979 Treaty.",
    },
    {
      url: 'https://www.youtube.com/watch?v=LYhJOjv0Yc8',
      title:
        '[ENQUIRY EVIDENCE] Anwar Sadat in Jerusalem: The Speech to the Knesset (November 1977)',
      duration: '6 mins 30 secs',
      teacher_guidance:
        'Archival footage and historical significance of an Arab head of state visiting Israel for the first time, addressing the Knesset, and breaking psychological barriers to peace.',
    },
    {
      url: 'https://www.youtube.com/watch?v=mbc9ElB5vfQ',
      title: '[PRIMARY ARCHIVE] The Camp David Accords (1978): Begin, Sadat & Jimmy Carter',
      duration: '8 mins 45 secs',
      teacher_guidance:
        'Documentary inside the 13 days of intense negotiation at Camp David, leading to Israel returning the Sinai Peninsula and Egypt becoming the first Arab nation to recognize Israel.',
    },
  ],

  // L11: KT 3.2 Lebanon, Sabra-Shatila & First Intifada (1974–1993)
  [
    {
      url: 'https://www.youtube.com/watch?v=nXddsCeaCDw',
      title: '[STARTER HOOK] GCSE Revision: The 1982 Lebanon War & The First Intifada',
      duration: '2 mins 0 secs',
      teacher_guidance:
        'Quick revision overview of Operation Peace for Galilee (1982), the siege of Beirut, the Kahan Commission, and the outbreak of the First Intifada in Gaza and the West Bank (1987).',
    },
    {
      url: 'https://www.youtube.com/watch?v=try3LAQxSAE',
      title: '[ENQUIRY EVIDENCE] The 1982 Lebanon War & The Sabra-Shatila Massacres',
      duration: '9 mins 15 secs',
      teacher_guidance:
        'Investigation into the Israeli invasion of Lebanon under Ariel Sharon, Phalangist militia massacres in the refugee camps, and the 400,000-strong peace protest in Tel Aviv.',
    },
    {
      url: 'https://www.youtube.com/watch?v=Azud40CQ3IE',
      title: '[PRIMARY ARCHIVE] The First Intifada (1987–1993): The Stone-Throwing Uprising',
      duration: '7 mins 40 secs',
      teacher_guidance:
        'Eyewitness footage of the grassroots Palestinian uprising: general strikes, tax resistance, youth throwing stones at IDF tanks, and the shift of political initiative from Tunis to the Territories.',
    },
  ],

  // L12: KT 3.3 Oslo Accords to Oslo II (1988–1995)
  [
    {
      url: 'https://www.youtube.com/watch?v=TgFWEVQTeHM',
      title: '[ENQUIRY EVIDENCE] The 1993 Oslo Accords: Secret Talks & The White House Handshake',
      duration: '6 mins 50 secs',
      teacher_guidance:
        'How secret backchannel talks in Norway between Israeli academics and the PLO led to the Declaration of Principles, mutual recognition, and the iconic Rabin-Arafat handshake in Washington.',
    },
    {
      url: 'https://www.youtube.com/watch?v=5SIAW4cX62I',
      title:
        '[PRIMARY EVIDENCE] The Assassination of Yitzhak Rabin (1995) & The Fragility of Peace',
      duration: '5 mins 40 secs',
      teacher_guidance:
        'Examines the fierce right-wing Israeli opposition to Oslo, the 4 November 1995 Tel Aviv peace rally, Rabin’s assassination by Yigal Amir, and the subsequent derailing of the peace process.',
    },
  ],
];

function formatVideoBlock(videoList) {
  let out = '      video: [\n';
  videoList.forEach((v) => {
    out += '        {\n';
    out += `          url: '${v.url}',\n`;
    out += `          title: '${v.title.replace(/'/g, "\\'")}',\n`;
    out += `          duration: '${v.duration}',\n`;
    out += `          teacher_guidance:\n            '${v.teacher_guidance.replace(/'/g, "\\'")}',\n`;
    out += '        },\n';
  });
  out += '      ],';
  return out;
}

const matches = [...content.matchAll(/video:\s*\[([\s\S]*?)\]\s*,/g)];
if (matches.length !== 12) {
  console.error(`Expected 12 video blocks, found ${matches.length}`);
  process.exit(1);
}

for (let i = matches.length - 1; i >= 0; i--) {
  const match = matches[i];
  const replacement = formatVideoBlock(vettedVideos[i]);
  content =
    content.slice(0, match.index) + replacement + content.slice(match.index + match[0].length);
}

fs.writeFileSync(dataPath, content, 'utf8');
console.log('🎉 Successfully realigned all 12 lesson video blocks in units/cme_new/data.js!');
