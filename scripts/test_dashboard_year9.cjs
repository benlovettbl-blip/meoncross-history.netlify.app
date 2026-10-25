const puppeteer = require('puppeteer');

(async () => {
  console.log('Testing Year 9 Dashboard with Cold War and Post-War Britain live...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 950 });

    console.log('Navigating to homepage dashboard...');
    await page.goto('http://localhost:3003/', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to Year 9 section
    const year9Block = await page.$('#block-year9');
    if (!year9Block) {
      throw new Error('#block-year9 not found on dashboard!');
    }

    await page.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'start' }), year9Block);
    await new Promise(r => setTimeout(r, 800));

    // Inspect unit cards in Year 9
    const year9Cards = await page.evaluate(() => {
      const block = document.getElementById('block-year9');
      const cards = block.querySelectorAll('.module-card');
      const inDev = block.querySelector('.fa-circle-info');
      return {
        cards: Array.from(cards).map(c => ({
          unitId: c.getAttribute('data-unit'),
          title: c.querySelector('h4')?.textContent.trim(),
          enquiry: c.querySelector('p')?.textContent.trim(),
          badge: c.querySelector('.module-card-footer span')?.textContent.trim(),
          hasImage: Boolean(c.querySelector('.module-card-img')?.style.backgroundImage)
        })),
        hasInDevStrip: Boolean(inDev)
      };
    });

    console.log('Year 9 Cards found:', JSON.stringify(year9Cards, null, 2));

    await page.screenshot({ path: 'dashboard_year9_live.png' });
    console.log('Saved screenshot to dashboard_year9_live.png');

  } finally {
    await browser.close();
  }
})();
