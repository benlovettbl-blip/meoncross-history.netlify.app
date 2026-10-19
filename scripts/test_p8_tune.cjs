const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function testP8() {
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

  // Test adding words to page 8
  const res = await page.evaluate(() => {
    const p8 = document.querySelector('#page-8');
    const prose = p8.querySelector('.prose-two-column');
    const p = p8.querySelectorAll('.prose-p')[5]; // last paragraph

    // Add 22 words to Page 8
    p.innerHTML +=
      ' Suspicion turned to terror as John demanded noble sons as hostages to guarantee their parents’ unwavering loyalty to his increasingly erratic crown.';

    const footer = p8.querySelector('.page-running-footer');
    const footerTop = footer.getBoundingClientRect().top;
    const leaves = Array.from(prose.querySelectorAll('.prose-p, .block-header'));
    const bottoms = leaves.map((el) => el.getBoundingClientRect().bottom);
    const rights = leaves.map((el) => el.getBoundingClientRect().right);
    const pRect = p8.getBoundingClientRect();

    const maxRight = Math.max(...rights);
    const rightSpill = maxRight > pRect.right ? Math.round(maxRight - pRect.right) : 0;
    const maxBottom = Math.max(...bottoms);
    const gap = Math.round(footerTop - maxBottom);
    const words = p8.innerText.split(/\s+/).length;

    return { words, gap, rightSpill };
  });

  console.log('Page 8 tuned:', res);

  const res10 = await page.evaluate(() => {
    const p10 = document.querySelector('#page-10');
    const prose = p10.querySelector('.prose-two-column');
    const p = p10.querySelectorAll('.prose-p')[5]; // last paragraph

    // Add 12 words to Page 10
    p.innerHTML +=
      ' Rural discontent smouldered as royal courts imposed harsh fines on villages sheltering runaway bonded serfs.';

    const footer = p10.querySelector('.page-running-footer');
    const footerTop = footer.getBoundingClientRect().top;
    const leaves = Array.from(prose.querySelectorAll('.prose-p, .block-header'));
    const bottoms = leaves.map((el) => el.getBoundingClientRect().bottom);
    const rights = leaves.map((el) => el.getBoundingClientRect().right);
    const pRect = p10.getBoundingClientRect();

    const maxRight = Math.max(...rights);
    const rightSpill = maxRight > pRect.right ? Math.round(maxRight - pRect.right) : 0;
    const maxBottom = Math.max(...bottoms);
    const gap = Math.round(footerTop - maxBottom);
    const words = p10.innerText.split(/\s+/).length;

    return { words, gap, rightSpill };
  });

  console.log('Page 10 tuned:', res10);
  await browser.close();
}

testP8().catch(console.error);
