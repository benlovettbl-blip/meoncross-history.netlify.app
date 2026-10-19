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

  const render = require('./render_standard_textbook_cme_unified.cjs');
  let html = render.buildCmeUnifiedHtml();

  // 1. Remove Crossroads of Fire -> HISTORICAL OVERVIEW • 1945–1995
  html = html.replace('CROSSROADS OF FIRE • 1945–1995', 'HISTORICAL OVERVIEW • 1945–1995');

  // 2. Remove Core Concepts strip
  html = html.replace(/<div class="cover-concept-strip">[\s\S]*?<\/div>/, '');

  // 3. Remove the two redundant headings in cover-enquiries-header
  html = html.replace(/<div class="cover-enquiries-header">[\s\S]*?<\/div>/, '');

  // 4. Inject automated font scaler for Front Cover
  const coverAutoFit = `
    function autoFitCoverEnquiries() {
      const p1 = document.querySelector('#page-1');
      const box = document.querySelector('#page-1 .cover-enquiries-box');
      const items = Array.from(document.querySelectorAll('#page-1 .cover-enquiry-item'));
      if (!p1 || !box || !items.length) return;
      
      let bestFs = 6.8;
      for (let fs = 6.8; fs <= 9.5; fs += 0.1) {
        items.forEach(it => {
          it.querySelectorAll('.cover-enquiry-title').forEach(t => t.style.fontSize = (fs + 0.6).toFixed(1) + 'pt');
          it.querySelectorAll('.cover-enquiry-question').forEach(q => { q.style.fontSize = fs.toFixed(1) + 'pt'; q.style.lineHeight = '1.25'; });
          it.querySelectorAll('.cover-enquiry-locator').forEach(l => l.style.fontSize = (fs - 0.4).toFixed(1) + 'pt');
          it.querySelectorAll('.cover-enquiry-num').forEach(n => n.style.fontSize = (fs - 0.4).toFixed(1) + 'pt');
        });
        if (p1.scrollHeight <= p1.clientHeight) {
          bestFs = fs;
        } else {
          break;
        }
      }
      items.forEach(it => {
        it.querySelectorAll('.cover-enquiry-title').forEach(t => t.style.fontSize = (bestFs + 0.6).toFixed(1) + 'pt');
        it.querySelectorAll('.cover-enquiry-question').forEach(q => { q.style.fontSize = bestFs.toFixed(1) + 'pt'; q.style.lineHeight = '1.25'; });
        it.querySelectorAll('.cover-enquiry-locator').forEach(l => l.style.fontSize = (bestFs - 0.4).toFixed(1) + 'pt');
        it.querySelectorAll('.cover-enquiry-num').forEach(n => n.style.fontSize = (bestFs - 0.4).toFixed(1) + 'pt');
      });
      return bestFs;
    }
    window.addEventListener('DOMContentLoaded', autoFitCoverEnquiries);
  `;

  html = html.replace(
    "window.addEventListener('DOMContentLoaded', autoFitKeyTopicCards);",
    `window.addEventListener('DOMContentLoaded', autoFitKeyTopicCards);\n${coverAutoFit}`,
  );

  // Also style adjustments for cover-enquiries-box: expand flex/padding to fill liberated space
  const extraCss = `
    .cover-enquiries-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 12px 16px !important;
      margin-bottom: 2mm !important;
    }
    .cover-enquiry-list {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 10px 18px !important;
      flex: 1;
      align-content: space-around;
    }
    .cover-enquiry-item {
      gap: 8px !important;
    }
    .cover-enquiry-num {
      padding: 2px 5px !important;
    }
  `;
  html = html.replace('</style>', `${extraCss}\n</style>`);

  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    if (window.autoFitCoverEnquiries) window.autoFitCoverEnquiries();
  });
  await new Promise((r) => setTimeout(r, 600));

  const p1Metrics = await page.evaluate(() => {
    const p1 = document.querySelector('#page-1');
    const firstTitle = document.querySelector('#page-1 .cover-enquiry-title');
    return {
      scrollH: p1.scrollHeight,
      clientH: p1.clientHeight,
      overflow: p1.scrollHeight - p1.clientHeight,
      titleFontSize: window.getComputedStyle(firstTitle).fontSize,
      boxH: document.querySelector('#page-1 .cover-enquiries-box').clientHeight,
    };
  });
  console.log('Page 1 Metrics:', p1Metrics);

  const el = await page.$('#page-1');
  const artifactDir =
    'C:/Users/fives/.gemini/antigravity-ide/brain/9c54f6a7-31a4-4f9a-a543-dfbdde13fbae';
  await el.screenshot({ path: path.join(artifactDir, 'test_page1_enlarged.png') });
  console.log('Saved test_page1_enlarged.png');

  await browser.close();
})();
