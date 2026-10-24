const fs = require('fs');
const path = require('path');

const conciseModularTopics = [
  {
    ktNum: 1,
    ktTitle: 'The Birth of the State of Israel, 1945–63',
    topics: [
      {
        code: 'KT 1.1',
        title: 'The British Withdrawal and the Creation of Israel',
        spreads: 'Spreads 1–2 • pp. 4–7',
        blurb:
          "Post-war violence exposed the **conflicting interests and demands of Jews and Arabs within the British Mandate**. The Irgun's **bombing of the King David Hotel** hastened Britain’s departure, prompting **UN Resolution 181** for **partition and the creation of Israel**. As the **end of the British Mandate** arrived in May 1948, five Arab armies invaded, launching the **key events of the Arab-Israeli war (1948–49)**.",
      },
      {
        code: 'KT 1.2',
        title: 'Aftermath of the 1948–49 War',
        spreads: 'Spread 3 • pp. 8–9',
        blurb:
          'The 1949 armistices brought sweeping **territorial changes and their impact**, entrenching the permanent **refugee status of Palestinian Arabs**. Israel ensured survival through **the creation of the Israeli Defence Forces** and the 1950 **Law of Return** for Jewish immigrants, bolstered by vital **US aid to Israel**, while border friction and blockades poisoned **Israel’s relations with Egypt**.',
      },
      {
        code: 'KT 1.3',
        title: 'Increased Tension, 1955–63',
        spreads: 'Spread 4 • pp. 10–11',
        blurb:
          'Gamal Abdel Nasser secured **Nasser and Egypt’s leadership of the Arab world** through anti-Western defiance. Escalating skirmishes, including the **Israeli attacks on Gaza in 1955** and **Sinai in 1956**, culminated in the **events and significance of the Suez Crisis (1956)**. Despite military retreat, Nasser triumphed politically, cementing prestige in the **formation of the UAR in 1958**.',
      },
    ],
  },
  {
    ktNum: 2,
    ktTitle: 'The Escalating Conflict, 1964–73',
    topics: [
      {
        code: 'KT 2.1',
        title: 'The Six Day War, 1967',
        spreads: 'Spread 5 • pp. 12–13',
        blurb:
          'Arab summits underscored **the significance of the Cairo Conference (1964)**. **Escalating tension between Israel, Syria and Jordan** flared through **Syria’s support for Fatah**, **Israel’s raid on Samu**, and dogfights in the **events of 7 April 1967**. Driven by **the actions of the USSR, Nasser and the USA in the period leading to war**, Israel struck pre-emptively on 5 June, dominating the **key events of the war** in six days.',
      },
      {
        code: 'KT 2.2',
        title: 'Aftermath of the 1967 War',
        spreads: 'Spreads 6–7 • pp. 14–17',
        blurb:
          'Conquest generated new **Palestinian refugees and the significance of the occupied territories: Golan Heights, Gaza Strip, West Bank, Sinai and East Jerusalem**. **UN Resolution 242** failed to resolve the **continued dispute over the Suez Canal**. In response, guerrilla factions escalated **the use of terrorism, Israel’s response and international attitudes towards the Palestine issue**, including the **PFLP airplane hijacks of 1970**, the **expulsion of the PLO from Jordan (1970)**, and **Black September and the Munich Olympics**.',
      },
      {
        code: 'KT 2.3',
        title: 'Israel and Egypt, 1967–73',
        spreads: 'Spreads 8–9 • pp. 18–21',
        blurb:
          'President Sadat reshaped **Egyptian relations with Israel, the USA, the USSR and other Arab states**, preparing to challenge **Israel’s consolidation of control of the occupied territories**. On 6 October 1973, Arab armies launched a surprise assault on the Bar-Lev Line, sparking the **key events of the Yom Kippur War (1973) and its aftermath**, ending Israeli invulnerability.',
      },
    ],
  },
  {
    ktNum: 3,
    ktTitle: 'Attempts at a Solution, 1974–95',
    topics: [
      {
        code: 'KT 3.1',
        title: 'Diplomatic Negotiations',
        spreads: 'Spread 10 • pp. 22–23',
        blurb:
          'Global fallout highlighted **the significance of the oil crisis and the involvement of the USA and the USSR**. Henry **Kissinger** pursued **‘shuttle diplomacy’** enabling **the reopening of the Suez Canal**. Bilateral diplomacy flourished through **Sadat’s visit to Israel (1977)** and **Begin’s visit to Egypt (1977)**, mediated by **US President Carter and Camp David (1978)** to achieve the historic **Treaty of Washington (1979)**.',
      },
      {
        code: 'KT 3.2',
        title: 'The Palestinian Issue',
        spreads: 'Spread 11 • pp. 24–25',
        blurb:
          'Global attention surged after **Arafat’s speech to the UN (1974)**. However, **the significance of PLO activities in Lebanon** provoked sharp **Israeli reprisals, the invasion of Lebanon (1982) and the results**, forcing guerrilla evacuation. Frustration within the **Israeli occupied territories** eventually exploded in December 1987 into the stone-throwing civil disobedience of the **First Palestinian Intifada (1987–93)**.',
      },
      {
        code: 'KT 3.3',
        title: 'Attempts at a Solution',
        spreads: 'Spread 12 • pp. 26–27',
        blurb:
          'Diplomatic momentum accelerated following **the significance of Arafat’s renunciation of terrorism in a speech at the UN (1988)**. Spurred by **changing superpower policies in the Middle East: US involvement in the Gulf War (1991), and the end of the Cold War**, historic negotiations produced **Arafat, Rabin and the Oslo Accords (1993)**, the **setting up of the Palestinian National Authority**, the **Israel-Jordan peace treaty (1994)**, and **Oslo II (1995)**.',
      },
    ],
  },
];

// Check spec points
const specPath = path.join(
  __dirname,
  '..',
  'public',
  'data',
  'specifications',
  'paper2_p5_middle_east.json',
);
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));

let fullText = '';
conciseModularTopics.forEach((g) => {
  g.topics.forEach((t) => {
    fullText += ' ' + t.title + ' ' + t.blurb;
  });
});

let totalPoints = 0;
let missing = [];

spec.sections.forEach((sec) => {
  sec.topics.forEach((top) => {
    top.points.forEach((pt, idx) => {
      totalPoints++;
      const words = pt
        .replace(/[().,;:—–\-\/‘'’"“”]/g, ' ')
        .split(/\s+/)
        .map((w) => w.trim())
        .filter(
          (w) =>
            w.length > 2 &&
            ![
              'and',
              'the',
              'for',
              'with',
              'from',
              'this',
              'that',
              'into',
              'including',
              'between',
              'during',
              'their',
              'towards',
              'over',
              'its',
            ].includes(w.toLowerCase()),
        );

      const missingWords = words.filter(
        (w) => !new RegExp('\\b' + w + '\\b', 'i').test(fullText.replace(/[‘'’"“”]/g, ' ')),
      );
      if (missingWords.length > 0) {
        missing.push({ pt, missingWords });
      }
    });
  });
});

console.log(`Spec check: ${totalPoints - missing.length} / ${totalPoints} verified.`);
if (missing.length > 0) {
  console.log('Missing:', JSON.stringify(missing, null, 2));
}

module.exports = { conciseModularTopics };
