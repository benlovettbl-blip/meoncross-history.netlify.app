const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 950 });

    console.log('Navigating to Visual Source Studio...');
    await page.goto('http://localhost:3003/source_visual_verification_gallery.html', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    await new Promise(r => setTimeout(r, 2000));

    // Type in search box: "Botany Bay"
    const searchInput = await page.$('#search-input');
    if (searchInput) {
      await searchInput.type('Botany Bay');
      await new Promise(r => setTimeout(r, 800));
    }

    // Find card with "Chart of Botany Bay"
    const cards = await page.$$('.source-card');
    console.log(`Found ${cards.length} cards matching search.`);
    for (const card of cards) {
      const text = await page.evaluate(el => el.textContent, card);
      if (text.includes('Chart of Botany Bay')) {
        await page.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }), card);
        await new Promise(r => setTimeout(r, 600));
        await page.screenshot({ path: 'botany_bay_verified_studio.png' });
        console.log('Saved botany_bay_verified_studio.png');
        break;
      }
    }
  } finally {
    await browser.close();
  }
})();
