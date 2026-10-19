const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

  const DATA = require('./cme_unified_textbook_data.cjs');
  const render = require('./render_standard_textbook_cme_unified.cjs');
  let html = render.buildCmeUnifiedHtml();

  // 1. Remove Crossroads of Fire -> HISTORICAL OVERVIEW • 1945–1995
  html = html.replace('CROSSROADS OF FIRE • 1945–1995', 'HISTORICAL OVERVIEW • 1945–1995');

  // 2. Remove Core Concepts strip
  html = html.replace(/<div class="cover-concept-strip">[\s\S]*?<\/div>/, '');

  // 3. Build 3-column spec cards with page locators for the cover
  const coverCardsHtml = (DATA.THEATER_MAP_CONFIG.specBlueprint || [])
    .map((kt, kIdx) => {
      // Map units to enquiries and page ranges
      // KT 1: Enquiries 1-4 (pp. 4-11)
      // KT 2: Enquiries 5-8 (pp. 12-19)
      // KT 3: Enquiries 9-12 (pp. 20-27)
      return `
      <div class="cover-spec-card" style="border-top-color: ${kt.borderTop}">
        <div class="cover-spec-header">
          <span class="cover-spec-badge" style="background: ${kt.badgeBg}">${kt.topicNum}</span>
          <span class="cover-spec-date">${kt.dateRange}</span>
        </div>
        <div class="cover-spec-title" style="color: ${kt.color}">${kt.title}</div>
        <div class="cover-spec-units">
          ${kt.units
            .map(
              (u) => `
            <div class="cover-spec-unit">
              <div class="cover-unit-code">${u.code}: ${u.title}</div>
              <div class="cover-unit-desc">${u.desc}</div>
            </div>
          `,
            )
            .join('')}
        </div>
        <div class="cover-spec-geo">
          <strong>Key Borders:</strong> ${kt.territorialSummary}
        </div>
      </div>
    `;
    })
    .join('');

  const coverCardsBox = `
    <div class="cover-spec-blueprint-grid">
      ${coverCardsHtml}
    </div>
  `;

  // Replace cover-enquiries-box with cover-spec-blueprint-grid
  html = html.replace(
    /<div class="cover-enquiries-box">[\s\S]*?<\/div>\s*<\/div>/,
    `${coverCardsBox}\n    </div>`,
  );

  const extraCss = `
    .cover-spec-blueprint-grid {
      display: grid !important;
      grid-template-columns: 1fr 1fr 1fr !important;
      gap: 3.5mm !important;
      flex: 1;
      margin-bottom: 2mm !important;
    }
    .cover-spec-card {
      background: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-top: 3.5px solid #2563eb;
      border-radius: 4px;
      padding: 6px 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #0f172a;
    }
    .cover-spec-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
      margin-bottom: 3px;
    }
    .cover-spec-badge {
      font-family: var(--font-sans);
      font-size: 6.6pt;
      font-weight: 800;
      color: #ffffff;
      padding: 1.5px 5px;
      border-radius: 2px;
      letter-spacing: 0.05em;
    }
    .cover-spec-date {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 700;
      color: #64748b;
    }
    .cover-spec-title {
      font-family: var(--font-display);
      font-size: 9.8pt;
      font-weight: 800;
      line-height: 1.15;
      margin-bottom: 3px;
    }
    .cover-spec-units {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }
    .cover-spec-unit {
      background: #f8fafc;
      border-left: 2px solid #cbd5e1;
      padding: 2.5px 5px;
      border-radius: 2px;
    }
    .cover-unit-code {
      font-family: var(--font-sans);
      font-size: 7.2pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 1px;
    }
    .cover-unit-desc {
      font-family: var(--font-body);
      font-size: 7.8pt;
      line-height: 1.25;
      color: #334155;
    }
    .cover-spec-geo {
      background: #f1f5f9;
      border: 1px dashed #cbd5e1;
      border-radius: 2px;
      padding: 3px 5px;
      font-family: var(--font-sans);
      font-size: 6.6pt;
      line-height: 1.22;
      color: #475569;
      margin-top: 3px;
    }
  `;
  html = html.replace('</style>', `${extraCss}\n</style>`);

  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 600));

  const p1Metrics = await page.evaluate(() => {
    const p1 = document.querySelector('#page-1');
    return {
      scrollH: p1.scrollHeight,
      clientH: p1.clientHeight,
      overflow: p1.scrollHeight - p1.clientHeight,
    };
  });
  console.log('Page 1 with 3-col spec cards:', p1Metrics);

  const el = await page.$('#page-1');
  const artifactDir =
    'C:/Users/fives/.gemini/antigravity-ide/brain/9c54f6a7-31a4-4f9a-a543-dfbdde13fbae';
  await el.screenshot({ path: path.join(artifactDir, 'test_page1_with_spec_cards.png') });
  console.log('Saved test_page1_with_spec_cards.png');

  await browser.close();
})();
