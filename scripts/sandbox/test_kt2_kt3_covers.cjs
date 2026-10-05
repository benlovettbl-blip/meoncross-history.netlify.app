const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

  // Test KT2
  const htmlPath2 = path.resolve(__dirname, '../../public/units/cme_new/pupil_workbook_KT2.html');
  await page.goto('file:///' + htmlPath2.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  await page.evaluate(() => {
    const specBox = document.querySelector('#page-1 .page-body-full').children[4];
    const subtopics = specBox.querySelector('div:nth-child(2)');

    const kt2Data = [
      {
        title: '1. The Six Day War, 1967',
        items: [
          '<strong>Cairo Conference &amp; PLO (1964):</strong> Arab League water dispute over the National Water Carrier and the creation of the PLO and armed fedayeen factions.',
          '<strong>Border Clashes &amp; Radicalisation:</strong> Syrian support for Fatah guerrillas, the Israeli Samu raid (Nov 1966), and dogfights over the Golan (April 1967).',
          '<strong>Drift to War (May–June 1967):</strong> Soviet disinformation, Nasser expelling UNEF from Sinai, blockading the Straits of Tiran, and mobilising Arab forces.',
          '<strong>Operation Focus &amp; Mobile Victory:</strong> Pre-emptive airstrike destroying the Egyptian Air Force, capturing Sinai, Gaza, West Bank, Jerusalem, and Golan.',
        ],
      },
      {
        title: '2. Aftermath of the 1967 War',
        items: [
          '<strong>UN Resolution 242 (Nov 1967):</strong> The "Land for Peace" formula, Arab Khartoum Summit "Three Noes", and the closed Suez Canal.',
          '<strong>Refugees &amp; Occupied Lands:</strong> 1 million Palestinians under Israeli military administration; establishment of religious settlements and fresh refugee exiles.',
          "<strong>International Fedayeen Campaigns:</strong> PFLP aircraft hijackings at Dawson's Field (1970) and the Black September hostage massacre at Munich (1972).",
          '<strong>Expulsion from Jordan (1970):</strong> King Hussein’s military crushes Palestinian militia strongholds in Black September, forcing the PLO into Lebanon.',
        ],
      },
      {
        title: '3. Israel &amp; Egypt, 1967–73',
        items: [
          '<strong>War of Attrition &amp; Cold War Diplomacy:</strong> Artillery duels along Suez, Soviet air-defence umbrellas, and Sadat’s 1972 expulsion of 15,000 Soviet advisors.',
          '<strong>Fortification &amp; The Conceptia:</strong> Construction of the fortified Bar-Lev Line along Suez and Israeli overconfidence in military superiority.',
          '<strong>The Yom Kippur War (Oct 1973):</strong> Egyptian surprise canal crossing using water cannons, Syrian assault in Golan, and emergency US resupply airlifts.',
          "<strong>Diplomatic &amp; Economic Fallout:</strong> Sharon’s counter-crossing, Kissinger's shuttle diplomacy, and the OPEC oil embargo quadrupling global fuel prices.",
        ],
      },
    ];

    subtopics.innerHTML = kt2Data
      .map((sub, idx) => {
        const isLast = idx === kt2Data.length - 1;
        const borderStyle = isLast ? '' : 'border-right: 1.2px solid #e2e8f0; padding-right: 10px;';
        const itemsHtml = sub.items
          .map((item) => `<div style="margin-bottom: 5px;">&bull; ${item}</div>`)
          .join('');
        return `
        <div style="${borderStyle} display: flex; flex-direction: column; justify-content: flex-start; height: 100%;">
          <strong style="font-size: 8.4pt; text-transform: uppercase; color: #000; border-bottom: 1.2px solid #000; padding-bottom: 2.5px; margin-bottom: 6px; display: block; letter-spacing: 0.3px;">
            ${sub.title}
          </strong>
          <div style="font-size: 7.7pt; line-height: 1.34; color: #111;">
            ${itemsHtml}
          </div>
        </div>
      `;
      })
      .join('');
  });

  const p1_kt2 = await page.$('#page-1');
  await p1_kt2.screenshot({
    path: path.resolve(__dirname, '../../public/pdfs/test_kt2_contextualized.png'),
  });
  console.log('Saved test_kt2_contextualized.png');

  // Test KT3
  const htmlPath3 = path.resolve(__dirname, '../../public/units/cme_new/pupil_workbook_KT3.html');
  await page.goto('file:///' + htmlPath3.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  await page.evaluate(() => {
    const specBox = document.querySelector('#page-1 .page-body-full').children[4];
    const subtopics = specBox.querySelector('div:nth-child(2)');

    const kt3Data = [
      {
        title: '1. Diplomatic Negotiations, 1974–79',
        items: [
          '<strong>Superpower Shuttle Diplomacy:</strong> Henry Kissinger negotiates disengagement accords following the 1973 war and the OPEC oil embargo.',
          '<strong>Sadat’s Jerusalem Initiative (1977):</strong> Historic flight to Ben Gurion Airport and address to the Israeli Knesset: "No more war, no more bloodshed."',
          '<strong>Camp David Accords (1978):</strong> 13 days of secluded talks hosted by Jimmy Carter, brokering bilateral peace frameworks between Sadat and Begin.',
          '<strong>Treaty of Washington (1979):</strong> Demilitarisation and return of Sinai, demolition of Yamit, Arab League boycott, and Sadat’s assassination (1981).',
        ],
      },
      {
        title: '2. The Palestinian Issue, 1974–93',
        items: [
          '<strong>PLO Diplomacy &amp; "Fatahland":</strong> Arafat’s UN "gun and olive branch" address (1974) and guerrilla cross-border rocket strikes from southern Lebanon.',
          '<strong>Lebanon Invasion &amp; Siege of Beirut (1982):</strong> Operation Peace for Galilee driving 60 miles north; 10-week siege and PLO evacuation to Tunis.',
          '<strong>Sabra-Shatila &amp; Political Repercussions:</strong> Phalangist massacre of Palestinian refugees; Israeli Kahan Commission forces Sharon’s resignation.',
          '<strong>The First Intifada (1987–93):</strong> Jabalia camp spark, civil strikes, Rabin’s "Iron Fist" policy, and the founding of militant Islamist rival Hamas.',
        ],
      },
      {
        title: '3. Attempts at a Solution, 1988–95',
        items: [
          '<strong>Renunciation of Terrorism (1988):</strong> Arafat’s Geneva address recognising Israel’s right to exist, opening direct US diplomatic dialogue.',
          '<strong>Madrid Conference &amp; Rabin Election:</strong> Impact of Gulf War and Soviet collapse; 1992 election of Labour leader Yitzhak Rabin promising peace.',
          '<strong>Oslo Accords &amp; Jordan Treaty (1993–94):</strong> Secret Norwegian backchannel, White House lawn handshake, and 1994 Israel-Jordan peace treaty.',
          '<strong>Extremist Backlash &amp; Oslo II (1995):</strong> Baruch Goldstein Hebron massacre, Hamas suicide bombings, West Bank division (Areas A/B/C), and Rabin’s assassination.',
        ],
      },
    ];

    subtopics.innerHTML = kt3Data
      .map((sub, idx) => {
        const isLast = idx === kt3Data.length - 1;
        const borderStyle = isLast ? '' : 'border-right: 1.2px solid #e2e8f0; padding-right: 10px;';
        const itemsHtml = sub.items
          .map((item) => `<div style="margin-bottom: 5px;">&bull; ${item}</div>`)
          .join('');
        return `
        <div style="${borderStyle} display: flex; flex-direction: column; justify-content: flex-start; height: 100%;">
          <strong style="font-size: 8.4pt; text-transform: uppercase; color: #000; border-bottom: 1.2px solid #000; padding-bottom: 2.5px; margin-bottom: 6px; display: block; letter-spacing: 0.3px;">
            ${sub.title}
          </strong>
          <div style="font-size: 7.7pt; line-height: 1.34; color: #111;">
            ${itemsHtml}
          </div>
        </div>
      `;
      })
      .join('');
  });

  const p1_kt3 = await page.$('#page-1');
  await p1_kt3.screenshot({
    path: path.resolve(__dirname, '../../public/pdfs/test_kt3_contextualized.png'),
  });
  console.log('Saved test_kt3_contextualized.png');

  await browser.close();
})();
