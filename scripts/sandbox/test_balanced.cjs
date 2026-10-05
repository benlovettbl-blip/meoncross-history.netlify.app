const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

  const htmlPath = path.resolve(__dirname, '../../public/units/cme_new/pupil_workbook_KT1.html');
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  const measurements = await page.evaluate(() => {
    const specBox = document.querySelector('#page-1 .page-body-full').children[4];
    const subtopics = specBox.querySelector('div:nth-child(2)');

    const balancedKT1Data = [
      {
        title: '1. The British Withdrawal & Israel',
        items: [
          '<strong>Mandate Nationalist Rivalry:</strong> Conflicting demands of Palestinian Arabs and Zionists; British White Paper immigration quotas vs post-Holocaust survivor influx.',
          '<strong>Zionist Insurgency (1945–47):</strong> Armed campaigns by Irgun and Lehi targeting British administration, culminating in the King David Hotel bombing (July 1946).',
          '<strong>UN Partition Plan (1947):</strong> UN Resolution 181 voting to divide Palestine (56% Jewish / 43% Arab), accepted by Jewish Agency and rejected by Arab states.',
          '<strong>The First Arab-Israeli War (1948–49):</strong> Proclamation of Israel, five Arab army invasions, Czech arms supplies, and the 1949 Green Line armistices.',
        ],
      },
      {
        title: '2. Aftermath of the 1948–49 War',
        items: [
          '<strong>Territorial Division:</strong> Israeli control expanding to 78% of Mandate Palestine, Transjordan annexing the West Bank, and Egyptian military rule in Gaza.',
          '<strong>The Palestinian Refugee Crisis (Al-Nakba):</strong> Permanent displacement of 700,000 Palestinian Arabs into exile and establishment of UNRWA relief camps.',
          '<strong>State Security & Immigration:</strong> Formation of the Israeli Defence Forces (IDF) and the 1950 Law of Return absorbing over 680,000 Jewish refugees.',
          '<strong>Superpower Alliances:</strong> Early United States financial aid and diplomatic recognition establishing a enduring strategic partnership.',
          '<strong>Cross-Border Skirmishes:</strong> Infiltration of Palestinian fedayeen from Gaza and fierce Israeli military reprisals escalating border volatility.',
        ],
      },
      {
        title: '3. Increased Tension, 1955–63',
        items: [
          '<strong>Pan-Arab Leadership:</strong> Gamal Abdel Nasser assumes Egyptian presidency, championing Arab nationalism, anti-colonialism, and regional unity.',
          '<strong>Gaza Raid & Arms Deal (1955):</strong> Israeli retaliatory strike in Gaza prompting Nasser to secure large-scale modern Soviet-Czech weaponry.',
          '<strong>The Suez Crisis (1956):</strong> Nasser nationalises the Suez Canal; secret Protocol of Sèvres between Britain, France, and Israel leads to the Sinai invasion.',
          '<strong>Crisis Aftermath (1957–63):</strong> US financial ultimatums force humiliating European withdrawal, UNEF deployed in Sinai, and creation of the UAR (1958).',
        ],
      },
    ];

    subtopics.innerHTML = balancedKT1Data
      .map((sub, idx) => {
        const isLast = idx === balancedKT1Data.length - 1;
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
    const heights = Array.from(subtopics.children).map((col, i) => ({
      col: i,
      colHeight: col.offsetHeight,
      itemsHeight: col.querySelector('div').offsetHeight,
    }));
    console.log('Balanced Heights:', JSON.stringify(heights));
    return heights;
  });
  console.log('DOM heights:', JSON.stringify(measurements));

  const p1 = await page.$('#page-1');
  await p1.screenshot({
    path: path.resolve(__dirname, '../../public/pdfs/test_balanced_4_items_per_col.png'),
  });
  console.log('Saved test_balanced_4_items_per_col.png');

  await browser.close();
})();
