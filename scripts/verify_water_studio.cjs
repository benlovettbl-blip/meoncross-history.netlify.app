const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 1200 });

    console.log('Navigating to Visual Source Studio for Water & Sanitation...');
    await page.goto('http://localhost:3003/source_visual_verification_gallery.html', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    await new Promise(r => setTimeout(r, 2000));

    // Filter to Water and Sanitation unit
    await page.select('#filter-unit', 'water_and_sanitation');
    await new Promise(r => setTimeout(r, 1000));

    await page.screenshot({ path: 'water_sanitation_verified_studio_full.png', fullPage: true });
    console.log('Saved water_sanitation_verified_studio_full.png');
  } finally {
    await browser.close();
  }
})();
