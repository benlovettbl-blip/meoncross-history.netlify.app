const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('Starting visual verification of Cold War lessons...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 950, deviceScaleFactor: 1.5 });

  // 1. Lesson 2: Yalta to Potsdam
  console.log('Navigating to Lesson 2...');
  await page.goto('http://localhost:3003/#/cold_war/lesson_2', { waitUntil: 'networkidle2' });
  await page.waitForSelector('.narrative-visual-row', { timeout: 10000 });
  await new Promise(r => setTimeout(r, 1000));

  // Find Potsdam row
  const rowsL2 = await page.$$('.narrative-visual-row');
  console.log(`Found ${rowsL2.length} visual plate rows in Lesson 2`);
  if (rowsL2.length > 0) {
    await rowsL2[0].screenshot({ path: path.join(__dirname, 'verify_l2_potsdam.png') });
    console.log('Captured verify_l2_potsdam.png');
  }
  if (rowsL2.length > 1) {
    await rowsL2[1].screenshot({ path: path.join(__dirname, 'verify_l2_berlin_ruins.png') });
    console.log('Captured verify_l2_berlin_ruins.png');
  }

  // 2. Lesson 6: Berlin Wall & End of Cold War
  console.log('Navigating to Lesson 6...');
  await page.goto('http://localhost:3003/#/cold_war/lesson_6', { waitUntil: 'networkidle2' });
  await page.waitForSelector('.narrative-visual-row', { timeout: 10000 });
  await new Promise(r => setTimeout(r, 1000));

  const rowsL6 = await page.$$('.narrative-visual-row');
  console.log(`Found ${rowsL6.length} visual plate rows in Lesson 6`);
  if (rowsL6.length > 0) {
    await rowsL6[0].screenshot({ path: path.join(__dirname, 'verify_l6_conrad_schumann.png') });
    console.log('Captured verify_l6_conrad_schumann.png');
  }
  if (rowsL6.length > 1) {
    await rowsL6[1].screenshot({ path: path.join(__dirname, 'verify_l6_reagan_gorbachev.png') });
    console.log('Captured verify_l6_reagan_gorbachev.png');
  }

  // Capture full page section showing the alternating layout
  await page.screenshot({
    path: path.join(__dirname, 'verify_l6_layout_overview.png'),
    clip: { x: 0, y: 300, width: 1400, height: 1600 }
  });
  console.log('Captured verify_l6_layout_overview.png');

  await browser.close();
  console.log('Visual verification complete!');
})();
