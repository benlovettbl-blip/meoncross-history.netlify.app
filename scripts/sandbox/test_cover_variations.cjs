const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// We will load the actual KT1 html and test different CSS / HTML modifications inside Puppeteer
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

  const htmlPath = path.resolve(__dirname, '../../public/units/cme_new/pupil_workbook_KT1.html');
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  // Variation 1: Increase Font Size & Spacing Only
  await page.evaluate(() => {
    const specBox = document.querySelector('#page-1 .page-body-full').children[4];
    const subtopics = specBox.querySelector('div:nth-child(2)');
    Array.from(subtopics.children).forEach((col) => {
      const strong = col.querySelector('strong');
      if (strong) {
        strong.style.fontSize = '8.8pt';
        strong.style.marginBottom = '8px';
        strong.style.paddingBottom = '3px';
      }
      const itemsDiv = col.querySelector('div');
      if (itemsDiv) {
        itemsDiv.style.fontSize = '8.4pt';
        itemsDiv.style.lineHeight = '1.45';
        Array.from(itemsDiv.children).forEach((item) => {
          item.style.marginBottom = '8px';
        });
      }
    });
  });

  const p1 = await page.$('#page-1');
  await p1.screenshot({
    path: path.resolve(__dirname, '../../public/pdfs/test_variation1_font_only.png'),
  });
  console.log('Saved variation 1 (font only)');

  // Variation 2: Contextualized Bullets + Enriched Detail + Professional Font
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
        const itemsHtml = sub.items
          .map((item) => `<div style="margin-bottom: 6px;">&bull; ${item}</div>`)
          .join('');
        return `
        <div style="${borderStyle} display: flex; flex-direction: column; justify-content: flex-start; height: 100%;">
          <strong style="font-size: 8.8pt; text-transform: uppercase; color: #000; border-bottom: 1.2px solid #000; padding-bottom: 3px; margin-bottom: 7px; display: block; letter-spacing: 0.3px;">
            ${sub.title}
          </strong>
          <div style="font-size: 8.0pt; line-height: 1.38; color: #111;">
            ${itemsHtml}
          </div>
        </div>
      `;
      })
      .join('');
  });

  await p1.screenshot({
    path: path.resolve(__dirname, '../../public/pdfs/test_variation2_contextualized.png'),
  });
  console.log('Saved variation 2 (contextualized)');

  // Variation 3: Contextualized + Docked Exam Architecture Bar at Bottom of Box
  await page.evaluate(() => {
    const specBox = document.querySelector('#page-1 .page-body-full').children[4];

    // Check if bottom bar already exists
    let bottomBar = specBox.querySelector('.spec-exam-bar');
    if (!bottomBar) {
      bottomBar = document.createElement('div');
      bottomBar.className = 'spec-exam-bar';
      bottomBar.style.cssText =
        'background: #f8fafc; border-top: 1.2px solid #000; padding: 4px 10px; display: flex; justify-content: space-between; align-items: center; font-family: Inter, sans-serif; font-size: 6.8pt;';
      bottomBar.innerHTML = `
        <div>
          <strong style="text-transform: uppercase; letter-spacing: 0.4px; color: #000;">Edexcel Paper 2 Assessment Architecture:</strong>
          <span style="color: #333; margin-left: 4px;">Q1(a) Feature [2m] &bull; Q1(b) Feature [2m] &bull; Q2 Consequence [4m] &bull; Q3 Explain Why [8m] &bull; Q4 Extended Essay [16m]</span>
        </div>
        <div>
          <strong style="text-transform: uppercase; letter-spacing: 0.4px; color: #000;">Historical Skills:</strong>
          <span style="color: #333; margin-left: 4px;">Causal Turning Points &amp; Consequence Analysis</span>
        </div>
      `;
      specBox.appendChild(bottomBar);
    }
  });

  await p1.screenshot({
    path: path.resolve(__dirname, '../../public/pdfs/test_variation3_context_plus_exam_bar.png'),
  });
  console.log('Saved variation 3 (contextualized + exam bar)');

  await browser.close();
})();
