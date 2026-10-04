const puppeteer = require('puppeteer');
const path = require('path');
const { pathToFileURL } = require('url');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

  const htmlPath = path.resolve('public/units/cme_new/pupil_workbook_KT1.html');
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle0' });

  // Capture Page 4 (Spread 1 Left: Domino Spine)
  const page4 = await page.$('#page-4');
  if (page4) {
    await page4.screenshot({ path: 'public/images/kt1_preview_page_4_spine.png' });
    console.log('Saved public/images/kt1_preview_page_4_spine.png');
  }

  // Capture Page 5 (Spread 1 Right: Note Canvas)
  const page5 = await page.$('#page-5');
  if (page5) {
    await page5.screenshot({ path: 'public/images/kt1_preview_page_5_notes.png' });
    console.log('Saved public/images/kt1_preview_page_5_notes.png');
  }

  // Capture Page 6 (Spread 2 Left: Exam Practice)
  const page6 = await page.$('#page-6');
  if (page6) {
    await page6.screenshot({ path: 'public/images/kt1_preview_page_6_exam_plan.png' });
    console.log('Saved public/images/kt1_preview_page_6_exam_plan.png');
  }

  // Capture Page 7 (Spread 2 Right: Extended Response)
  const page7 = await page.$('#page-7');
  if (page7) {
    await page7.screenshot({ path: 'public/images/kt1_preview_page_7_essay.png' });
    console.log('Saved public/images/kt1_preview_page_7_essay.png');
  }

  await browser.close();
  console.log('Screenshots complete.');
})();
