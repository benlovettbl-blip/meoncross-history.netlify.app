const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function capture() {
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

  const artifactDir =
    'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\e7ef5e95-188d-421a-92d5-7160b553ca08';

  const pagesToCapture = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  for (const num of pagesToCapture) {
    const el = await page.$(`#page-${num}`);
    if (el) {
      const outPath = path.join(artifactDir, `textbook_page_${num}_verified.png`);
      await el.screenshot({ path: outPath });
      console.log(`Captured Page ${num} to ${outPath}`);
    }
  }

  await browser.close();
}

capture().catch(console.error);
