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

    console.log('Navigating to Cold War Lesson 1 on localhost:3003...');
    await page.goto('http://localhost:3003/?unit=cold_war&view=lessons&lesson=1', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    await new Promise(r => setTimeout(r, 2000));

    // Scroll to Block 3 (Molotov-Ribbentrop photo)
    const block3Img = await page.$('img[src*="molotov_ribbentrop_pact"]');
    if (block3Img) {
      console.log('Found Block 3 narrative image!');
      await page.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }), block3Img);
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: 'cold_war_l1_block3_embedded.png' });
      console.log('Saved cold_war_l1_block3_embedded.png');
    }

    // Scroll to Block 4 (Hiroshima mushroom cloud)
    const block4Img = await page.$('img[src*="hiroshima_atomic_cloud"]');
    if (block4Img) {
      console.log('Found Block 4 narrative image!');
      await page.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }), block4Img);
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: 'cold_war_l1_block4_embedded.png' });
      console.log('Saved cold_war_l1_block4_embedded.png');
    }

    // Scroll to Block 5 (Reichstag flag)
    const block5Img = await page.$('img[src*="reichstag_soviet_flag"]');
    if (block5Img) {
      console.log('Found Block 5 narrative image!');
      await page.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }), block5Img);
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: 'cold_war_l1_block5_embedded.png' });
      console.log('Saved cold_war_l1_block5_embedded.png');
    }

  } catch (err) {
    console.error('Error during test:', err);
  } finally {
    await browser.close();
  }
})();
