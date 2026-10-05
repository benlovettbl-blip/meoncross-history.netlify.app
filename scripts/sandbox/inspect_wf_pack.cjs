const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function inspect() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  const htmlPath = path.join(
    __dirname,
    '..',
    '..',
    'public',
    'units',
    'edexcel_medicine',
    'western_front_master_retrieval_companion.html',
  );
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  const metrics = await page.evaluate(() => {
    const pages = document.querySelectorAll('.page-container');
    const out = [];
    pages.forEach((p, idx) => {
      let childrenSum = 0;
      const body = p.querySelector('.page-body-full');
      if (body) {
        Array.from(body.children).forEach((c) => {
          const style = window.getComputedStyle(c);
          childrenSum +=
            c.offsetHeight + parseFloat(style.marginTop || 0) + parseFloat(style.marginBottom || 0);
        });
      }
      out.push({
        page: idx + 1,
        id: p.id,
        containerHeight: p.offsetHeight,
        scrollHeight: p.scrollHeight,
        childrenSum: Math.round(childrenSum),
        unusedSpace: Math.max(0, p.offsetHeight - Math.round(childrenSum)),
      });
    });
    return out;
  });

  console.log('--- Western Front Page Space Metrics ---');
  metrics.forEach((m) => {
    console.log(
      `Page ${m.page} (${m.id}): Container=${m.containerHeight}px, Scroll=${m.scrollHeight}px, ChildrenSum=${m.childrenSum}px, UnusedSpace=${m.unusedSpace}px`,
    );
  });

  const screensDir = path.join(__dirname, '..', '..', 'public', 'pdfs', 'wf_review_screens');
  if (!fs.existsSync(screensDir)) fs.mkdirSync(screensDir, { recursive: true });

  const pageEls = await page.$$('.page-container');
  for (let i = 0; i < pageEls.length; i++) {
    await pageEls[i].screenshot({ path: path.join(screensDir, `page_${i + 1}.png`) });
  }
  console.log('Saved screenshots for all 12 pages to ' + screensDir);

  await browser.close();
}
inspect().catch(console.error);
