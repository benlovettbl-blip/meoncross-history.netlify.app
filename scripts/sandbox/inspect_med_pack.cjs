const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..', '..');
const OUT_DIR = path.join(ROOT_DIR, 'public', 'pdfs', 'med_review_screens');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const { buildHtml } = require('../generate_medicine_thematic_quiz_booklet.cjs');

async function inspect() {
  const html = buildHtml();
  const tempHtml = path.join(OUT_DIR, 'temp_inspect.html');
  fs.writeFileSync(tempHtml, html, 'utf8');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1240, height: 1754, deviceScaleFactor: 1 });
  await page.goto('file:///' + tempHtml.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  const metrics = await page.evaluate(() => {
    const pages = Array.from(document.querySelectorAll('.page-container'));
    return pages.map((p, idx) => {
      const body = p.querySelector('.page-body-full');
      let contentH = 0;
      if (body) {
        Array.from(body.children).forEach((c) => (contentH += c.offsetHeight));
      }
      return {
        page: idx + 1,
        containerClientH: p.clientHeight,
        containerScrollH: p.scrollHeight,
        contentHeight: contentH,
        overflow: p.scrollHeight - p.clientHeight,
        deadSpace: Math.max(0, p.clientHeight - contentH),
      };
    });
  });

  console.log('--- Page Space & Overflow Metrics ---');
  metrics.forEach((m) => {
    const util = ((m.contentHeight / m.containerClientH) * 100).toFixed(1);
    console.log(
      `P${m.page.toString().padStart(2, '0')}: Content=${m.contentHeight}px / ${m.containerClientH}px (${util}%) | Over=${m.overflow}px | Dead=${m.deadSpace}px`,
    );
  });

  // Take screenshots of sample key pages: P1, P2, P3, P10, P15, P23, P27, P28
  const samplePages = [1, 2, 3, 10, 15, 23, 27, 28];
  for (const pNum of samplePages) {
    const pageEl = await page.$(`#page-${pNum}`);
    if (pageEl) {
      const outImg = path.join(OUT_DIR, `page_${pNum}.png`);
      await pageEl.screenshot({ path: outImg });
      console.log(`Captured screenshot: ${outImg}`);
    }
  }

  await browser.close();
  if (fs.existsSync(tempHtml)) fs.unlinkSync(tempHtml);
}

inspect().catch(console.error);
