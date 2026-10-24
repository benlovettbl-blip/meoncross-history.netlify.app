const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    // 1. Test Great War Part 2 Lesson 1 (Women of Britain Say GO! poster)
    console.log('Navigating to Great War Part 2 Lesson 1...');
    await page.goto('http://localhost:3003/index.html?view=lessons&unit=great_war_part2&lesson=1', {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });
    await new Promise((r) => setTimeout(r, 2000));

    // Look for think-discuss toggle button
    const toggles = await page.$$('.btn-think-discuss-toggle');
    console.log(`Found ${toggles.length} think-discuss buttons in Great War Part 2 Lesson 1.`);

    if (toggles.length > 0) {
      await toggles[0].click();
      await new Promise((r) => setTimeout(r, 500));
      await page.screenshot({ path: 'gw2_lesson1_verified.png' });
      console.log('✅ Captured gw2_lesson1_verified.png');
    }

    // 2. Test CME Lesson 1 (Sykes-Picot)
    console.log('Navigating to CME Lesson 1...');
    await page.goto('http://localhost:3003/index.html?view=lessons&unit=cme_new&lesson=1', {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });
    await new Promise((r) => setTimeout(r, 2000));
    const cmeToggles = await page.$$('.btn-think-discuss-toggle');
    console.log(`Found ${cmeToggles.length} think-discuss buttons in CME Lesson 1.`);
    if (cmeToggles.length > 0) {
      await cmeToggles[0].click();
      await new Promise((r) => setTimeout(r, 500));
      await page.screenshot({ path: 'cme_lesson1_verified.png' });
      console.log('✅ Captured cme_lesson1_verified.png');
    }

    console.log('🎉 Browser verification finished successfully!');
  } catch (err) {
    console.error('Browser verification failed:', err);
  } finally {
    await browser.close();
  }
})();
