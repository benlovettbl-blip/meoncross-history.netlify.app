const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600 });

  const artifactDir =
    'C:/Users/fives/.gemini/antigravity-ide/brain/bae02740-08c1-47cc-87b5-576004dc7db3';

  // Medieval Page 2
  const medHtml = path.resolve('public/units/medieval_england/textbook_PUBLISHER.html');
  await page.goto('file:///' + medHtml.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  const p2 = await page.$('.textbook-page[data-page="2"]');
  if (p2) {
    await p2.screenshot({ path: path.join(artifactDir, 'preview_medieval_p2.png') });
    console.log('Saved preview_medieval_p2.png');
  }

  // Early Modern Page 10 (Enquiry 5 with New Model Army Agitator)
  const emHtml = path.resolve('public/units/early_modern_world/textbook_PUBLISHER.html');
  await page.goto('file:///' + emHtml.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  const p10 = await page.$('.textbook-page[data-page="10"]');
  if (p10) {
    await p10.screenshot({ path: path.join(artifactDir, 'preview_early_modern_p10.png') });
    console.log('Saved preview_early_modern_p10.png');
  }
  const kf10 = await page.$('.textbook-page[data-page="10"] .key-figure-box');
  if (kf10) {
    await kf10.screenshot({ path: path.join(artifactDir, 'preview_kf_monogram_p10.png') });
    console.log('Saved preview_kf_monogram_p10.png');
  }

  // Early Modern Page 18 (Enquiry 9 with Enclosure Freeholder)
  const p18 = await page.$('.textbook-page[data-page="18"]');
  if (p18) {
    await p18.screenshot({ path: path.join(artifactDir, 'preview_early_modern_p18.png') });
    console.log('Saved preview_early_modern_p18.png');
  }
  const kf18 = await page.$('.textbook-page[data-page="18"] .key-figure-box');
  if (kf18) {
    await kf18.screenshot({ path: path.join(artifactDir, 'preview_kf_monogram_p18.png') });
    console.log('Saved preview_kf_monogram_p18.png');
  }

  await browser.close();
})();
