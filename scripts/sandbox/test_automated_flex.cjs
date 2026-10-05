const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

  const htmlPath = path.resolve(__dirname, '../../public/units/cme_new/pupil_workbook_KT1.html');
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  // Test Automated Flex Justification (Original Unenriched Bullets, but font scaled & flex space-between)
  await page.evaluate(() => {
    const specBox = document.querySelector('#page-1 .page-body-full').children[4];
    const subtopics = specBox.querySelector('div:nth-child(2)');
    Array.from(subtopics.children).forEach((col) => {
      col.style.display = 'flex';
      col.style.flexDirection = 'column';
      col.style.height = '100%';

      const strong = col.querySelector('strong');
      if (strong) {
        strong.style.fontSize = '8.6pt';
        strong.style.marginBottom = '6px';
        strong.style.paddingBottom = '3px';
      }
      const itemsDiv = col.querySelector('div');
      if (itemsDiv) {
        itemsDiv.style.flex = '1';
        itemsDiv.style.display = 'flex';
        itemsDiv.style.flexDirection = 'column';
        itemsDiv.style.justifyContent = 'space-between';
        itemsDiv.style.fontSize = '8.0pt';
        itemsDiv.style.lineHeight = '1.38';
        Array.from(itemsDiv.children).forEach((item) => {
          item.style.marginBottom = '0px';
        });
      }
    });
  });

  const p1 = await page.$('#page-1');
  await p1.screenshot({
    path: path.resolve(__dirname, '../../public/pdfs/test_automated_flex_original_text.png'),
  });
  console.log('Saved test_automated_flex_original_text.png');

  // Test Automated Flex Justification WITH Contextualized Bullets
  await page.evaluate(() => {
    const specBox = document.querySelector('#page-1 .page-body-full').children[4];
    const subtopics = specBox.querySelector('div:nth-child(2)');

    const enrichedData = [
      {
        title: '1. The British Withdrawal & Israel',
        items: [
          '<strong>Conflicting Mandate Demands:</strong> Conflicting national claims of Palestinian Arabs and Jewish Zionists; British immigration White Papers vs post-Holocaust survivor influx.',
          '<strong>Insurgency & UN Partition:</strong> Jewish paramilitary campaigns, the Irgun bombing of the King David Hotel (July 1946), and UN Resolution 181 partition plan (Nov 1947).',
          '<strong>The First Arab-Israeli War (1948–49):</strong> 14 May proclamation of Israel, five Arab army invasions, Czech arms supplies, and 1949 Green Line armistice borders.',
        ],
      },
      {
        title: '2. Aftermath of the 1948–49 War',
        items: [
          '<strong>Territorial Division:</strong> Israeli control expanding to 78% of Mandate Palestine, Transjordan annexing the West Bank, and Egyptian administration of Gaza.',
          '<strong>The Palestinian Refugee Crisis (Al-Nakba):</strong> Permanent displacement of 700,000 Palestinian Arabs into exile and creation of UNRWA relief camps.',
          '<strong>State Security & Immigration:</strong> Formation of the Israeli Defence Forces (IDF) and the 1950 Law of Return absorbing 680,000 Jewish refugees.',
          '<strong>Superpower Alliances:</strong> Early United States financial and diplomatic support establishing a strategic partnership.',
          '<strong>Border Skirmishes:</strong> Cross-border fedayeen raids from Gaza and fierce Israeli military reprisals escalating border instability.',
        ],
      },
      {
        title: '3. Increased Tension, 1955–63',
        items: [
          '<strong>Pan-Arab Leadership:</strong> Gamal Abdel Nasser assumes Egyptian presidency, championing Arab nationalism, anti-imperialism, and PLO formation.',
          '<strong>Escalating Military Clashes:</strong> The Israeli Gaza raid (Feb 1955) prompting the Soviet-Czech arms deal, and the Oct 1956 Sinai invasion.',
          '<strong>The Suez Crisis (1956):</strong> Nationalisation of the Suez Canal, secret Protocol of Sèvres, US financial ultimatums forcing withdrawal, and the 1958 UAR.',
        ],
      },
    ];

    subtopics.innerHTML = enrichedData
      .map((sub, idx) => {
        const isLast = idx === enrichedData.length - 1;
        const borderStyle = isLast ? '' : 'border-right: 1.2px solid #e2e8f0; padding-right: 10px;';
        const itemsHtml = sub.items.map((item) => `<div>&bull; ${item}</div>`).join('');
        return `
        <div style="${borderStyle} display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
          <strong style="font-size: 8.6pt; text-transform: uppercase; color: #000; border-bottom: 1.2px solid #000; padding-bottom: 3px; margin-bottom: 6px; display: block; letter-spacing: 0.3px;">
            ${sub.title}
          </strong>
          <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; font-size: 7.8pt; line-height: 1.34; color: #111;">
            ${itemsHtml}
          </div>
        </div>
      `;
      })
      .join('');
  });

  await p1.screenshot({
    path: path.resolve(__dirname, '../../public/pdfs/test_automated_flex_contextualized.png'),
  });
  console.log('Saved test_automated_flex_contextualized.png');

  await browser.close();
})();
