const puppeteer = require('puppeteer');
const path = require('path');
const artDir =
  'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\3b75670c-9387-4315-9357-c389708737ef';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Studio view showing Archive Tray
  console.log('1. Capturing Studio view with Archive Tray...');
  await page.goto('http://localhost:3003/?view=masterpiece', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    const el = document.querySelector('.masterpiece-archive-tray');
    if (el) el.scrollIntoView({ block: 'center' });
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(artDir, 'snap_archive_tray_scrolled.png') });

  // 2. Select Delacroix and launch Projector
  console.log('2. Selecting Delacroix and launching Projector...');
  await page.click(
    '.masterpiece-archive-card[data-masterpiece-id="delacroix_liberty_leading_people"]',
  );
  await new Promise((r) => setTimeout(r, 600));
  await page.click('#masterpiece-launch-projector-btn');
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artDir, 'snap_projector_delacroix.png') });

  // 3. Activate Loupe and move pointer over Delacroix Marianne
  console.log('3. Capturing 2.5x Magnifier Loupe...');
  await page.click('#projector-loupe-btn');
  await new Promise((r) => setTimeout(r, 300));
  const box = await page.$eval('#projector-canvas-container', (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  });
  await page.mouse.move(box.x + box.width * 0.52, box.y + box.height * 0.32);
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(artDir, 'snap_projector_loupe.png') });

  // 4. Activate Spotter Marker and drop 2 pins
  console.log('4. Capturing Smartboard Spotter Marker Pins...');
  await page.click('#projector-spotter-btn');
  await new Promise((r) => setTimeout(r, 300));
  await page.mouse.click(box.x + box.width * 0.52, box.y + box.height * 0.25); // Pin 1: Phrygian Cap / Marianne
  await new Promise((r) => setTimeout(r, 300));
  await page.mouse.click(box.x + box.width * 0.72, box.y + box.height * 0.45); // Pin 2: Gavroche boy with pistols
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: path.join(artDir, 'snap_projector_spotter_pins.png') });

  await browser.close();
  console.log('Visual verification screenshots saved successfully.');
})();
