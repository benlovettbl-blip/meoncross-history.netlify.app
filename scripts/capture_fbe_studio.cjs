const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function captureGallery() {
  const artifactDir = path.join('C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\efc3adb5-b930-4aa0-8eff-b383b1c606ab', '.tempmediaStorage');
  if (!fs.existsSync(artifactDir)) fs.mkdirSync(artifactDir, { recursive: true });
  const outPath = path.join(artifactDir, `fbe_studio_contact_sheet_${Date.now()}.png`);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 1800, deviceScaleFactor: 1 });
    
    // We can open the local gallery via file:// or http://localhost:3003
    // Let's test http://localhost:3003/source_visual_verification_gallery.html first, fallback to file
    let loaded = false;
    try {
      await page.goto('http://localhost:3003/source_visual_verification_gallery.html', { waitUntil: 'networkidle0', timeout: 5000 });
      loaded = true;
    } catch (e) {
      console.log('Dev server not responding on 3003, using file URL with injected data...');
    }

    if (!loaded) {
      const htmlFile = path.resolve('public/source_visual_verification_gallery.html');
      await page.goto('file:///' + htmlFile.replace(/\\/g, '/'), { waitUntil: 'domcontentloaded' });
    }

    // Select first_british_empire in filter
    await page.waitForSelector('#filter-unit');
    await page.select('#filter-unit', 'first_british_empire');
    await page.evaluate(() => {
      if (typeof renderGallery === 'function') renderGallery();
    });

    await new Promise(r => setTimeout(r, 1200));

    await page.screenshot({ path: outPath, fullPage: true });
    console.log('SAVED_CONTACT_SHEET:' + outPath);
  } finally {
    await browser.close();
  }
}

captureGallery().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
