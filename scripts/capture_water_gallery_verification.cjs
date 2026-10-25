const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function capture() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1600,2400']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 2400, deviceScaleFactor: 1 });

  console.log('Navigating to visual verification gallery...');
  await page.goto('http://localhost:3003/source_visual_verification_gallery.html', { waitUntil: 'networkidle0', timeout: 30000 });

  // Select Water and Sanitation in the unit dropdown
  console.log('Selecting water_and_sanitation unit...');
  await page.select('#filter-unit', 'water_and_sanitation');
  await new Promise(r => setTimeout(r, 1000));

  const outPath1 = path.resolve('public/images/water_sanitation_studio_verified_part1.png');
  const outPath2 = path.resolve('public/images/water_sanitation_studio_verified_part2.png');
  const outPath3 = path.resolve('public/images/water_sanitation_studio_verified_part3.png');

  // Scroll and capture parts
  console.log('Capturing Part 1 (Lessons 1-3)...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: outPath1, clip: { x: 0, y: 0, width: 1600, height: 1600 } });

  console.log('Capturing Part 2 (Lessons 4-5)...');
  await page.evaluate(() => window.scrollTo(0, 1400));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: outPath2, clip: { x: 0, y: 1400, width: 1600, height: 1600 } });

  console.log('Capturing Part 3 (Lessons 6-7)...');
  await page.evaluate(() => window.scrollTo(0, 2800));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: outPath3, clip: { x: 0, y: 2800, width: 1600, height: 1600 } });

  await browser.close();
  console.log('Screenshots captured successfully:');
  console.log('  ' + outPath1);
  console.log('  ' + outPath2);
  console.log('  ' + outPath3);
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
