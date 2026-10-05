const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1697, deviceScaleFactor: 1 }); // A4 aspect ratio approx

  const htmlPath = path.resolve(__dirname, '../../public/units/cme_new/cme_master_retrieval_companion.html');
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  const pageMetrics = await page.evaluate(() => {
    const pages = document.querySelectorAll('.page-container');
    const data = [];
    pages.forEach((p, idx) => {
      const pageBody = p.querySelector('.page-body-full');
      const children = Array.from(pageBody.children);
      const totalChildHeight = children.reduce((acc, el) => acc + el.offsetHeight, 0);
      data.push({
        page: idx + 1,
        id: p.id,
        containerClientHeight: p.clientHeight,
        containerScrollHeight: p.scrollHeight,
        totalChildHeight,
        unusedSpacePx: p.clientHeight - totalChildHeight,
        bodyHeight: pageBody.clientHeight
      });
    });
    return data;
  });

  console.log('--- Page Space Metrics ---');
  pageMetrics.forEach(m => {
    console.log(`Page ${m.page} (${m.id}): Container=${m.containerClientHeight}px, Scroll=${m.containerScrollHeight}px, ChildrenSum=${m.totalChildHeight}px, UnusedSpace=${m.unusedSpacePx}px`);
  });

  const outDir = path.resolve(__dirname, '../../public/pdfs/quiz_review_screens');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const pages = await page.$$('.page-container');
  for (let i = 0; i < pages.length; i++) {
    await pages[i].screenshot({
      path: path.join(outDir, `page_${i + 1}.png`)
    });
  }
  console.log(`Saved screenshots for all ${pages.length} pages to ${outDir}`);

  await browser.close();
})();
