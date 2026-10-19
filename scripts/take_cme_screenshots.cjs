const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  const htmlPath =
    'file:///' +
    path.resolve(__dirname, '../public/units/cme_new/textbook_UNIFIED.html').replace(/\\/g, '/');
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });

  const artifactDir =
    'C:/Users/fives/.gemini/antigravity-ide/brain/9c54f6a7-31a4-4f9a-a543-dfbdde13fbae';
  const targets = [
    { id: '#page-1', name: 'cme_unified_page1_cover.png' },
    { id: '#page-2', name: 'cme_unified_page2_spine.png' },
    { id: '#page-3', name: 'cme_unified_page3_map.png' },
    { id: '#page-4', name: 'cme_unified_page4_enquiry1_verso.png' },
    { id: '#page-5', name: 'cme_unified_page5_enquiry1_recto.png' },
    { id: '#page-8', name: 'cme_unified_page8_enquiry3_verso.png' },
    { id: '#page-9', name: 'cme_unified_page9_enquiry3_recto.png' },
    { id: '#page-24', name: 'cme_unified_page24_enquiry11_verso.png' },
    { id: '#page-25', name: 'cme_unified_page25_enquiry11_recto.png' },
    { id: '#page-26', name: 'cme_unified_page26_enquiry12_verso.png' },
    { id: '#page-27', name: 'cme_unified_page27_enquiry12_recto.png' },
    { id: '#page-28', name: 'cme_unified_page28_quiz.png' },
  ];

  for (const t of targets) {
    const el = await page.$(t.id);
    if (el) {
      const out = path.join(artifactDir, t.name);
      await el.screenshot({ path: out });
      console.log('Saved ' + t.id + ' to ' + out);
    } else {
      console.error('Target not found: ' + t.id);
    }
  }
  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
