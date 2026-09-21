const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  await page.goto('file://' + path.resolve('public/units/cme_new/textbook_KT2_PUBLISHER.html'), {
    waitUntil: 'networkidle0',
  });

  const artifactDir =
    'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\12de0527-a7b2-4ab8-b8ae-673122685716';
  const pages = await page.$$('.textbook-page');

  await pages[1].screenshot({ path: path.join(artifactDir, 'kt2_p2_vocab.png') });
  await pages[2].screenshot({ path: path.join(artifactDir, 'kt2_p3_enquiry.png') });

  await browser.close();
  console.log('Saved screenshots of KT2 P2 and P3');
})();
