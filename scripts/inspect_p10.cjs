const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function inspectP10() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  const htmlPath =
    'file:///' +
    path.resolve(__dirname, '../public/units/medieval_england/textbook.html').replace(/\\/g, '/');
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });

  const info = await page.evaluate(() => {
    const p10 = document.querySelector('#page-10');
    const prose = p10.querySelector('.prose-two-column');
    const paras = Array.from(p10.querySelectorAll('.prose-p'));
    const f = p10.querySelector('.page-running-footer');
    const fTop = f.getBoundingClientRect().top;
    const pRect = p10.getBoundingClientRect();
    const proseRect = prose.getBoundingClientRect();

    return {
      pageTop: pRect.top,
      pageBottom: pRect.bottom,
      proseTop: proseRect.top,
      proseBottom: proseRect.bottom,
      footerTop: fTop,
      paras: paras.map((p) => {
        const r = p.getBoundingClientRect();
        return {
          left: Math.round(r.left - pRect.left),
          right: Math.round(r.right - pRect.left),
          top: Math.round(r.top - pRect.top),
          bottom: Math.round(r.bottom - pRect.top),
          height: Math.round(r.height),
          text: p.textContent.slice(0, 35),
        };
      }),
    };
  });

  console.log(JSON.stringify(info, null, 2));
  await browser.close();
}

inspectP10().catch(console.error);
