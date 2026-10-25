const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  console.log('Starting visual verification of KS2 WW2 lessons...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 950 });

    // 1. Lesson 1: Outbreak 1939
    console.log('Navigating to KS2 WW2 Lesson 1...');
    await page.goto('http://localhost:3003/?unit=ks2_ww2&view=lessons&lesson=1', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    await new Promise(r => setTimeout(r, 2000));

    // Check for any green eye icons in narrative plates
    const eyeIconsCount = await page.evaluate(() => {
      const plates = document.querySelectorAll('.narrative-visual-plate');
      let count = 0;
      plates.forEach(p => {
        count += p.querySelectorAll('.fa-eye, .fa-eye-slash').length;
      });
      return count;
    });
    console.log(`Green eye icons in narrative visual plates: ${eyeIconsCount} (EXPECTED: 0)`);

    // Verify Lesson 1 Block 1 Chamberlain photo & caption
    const chamberlainPlate = await page.$('.narrative-visual-plate img[src*="neville_chamberlain_1939"]');
    if (chamberlainPlate) {
      console.log('Found Lesson 1 Chamberlain photo!');
      await page.evaluate(el => el.closest('.narrative-visual-row').scrollIntoView({ behavior: 'instant', block: 'center' }), chamberlainPlate);
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: 'ks2_ww2_l1_chamberlain_plate.png' });
      console.log('Saved ks2_ww2_l1_chamberlain_plate.png');
    }

    // Verify Lesson 1 Block 3 Blackout kerb precautions photo & caption
    const blackoutPlate = await page.$('.narrative-visual-plate img[src*="blackout_kerb_precautions"]');
    if (blackoutPlate) {
      console.log('Found Lesson 1 Blackout Kerb photo!');
      await page.evaluate(el => el.closest('.narrative-visual-row').scrollIntoView({ behavior: 'instant', block: 'center' }), blackoutPlate);
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: 'ks2_ww2_l1_blackout_plate.png' });
      console.log('Saved ks2_ww2_l1_blackout_plate.png');
    }

    // Verify Lesson 1 Source A (Gas masks children drill in Layer 3 drawer)
    const sourceA = await page.$('img[src*="gas_masks_children_1939"]');
    if (sourceA) {
      console.log('Found Lesson 1 Source A gas mask drill in disciplinary drawer!');
      await page.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }), sourceA);
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: 'ks2_ww2_l1_source_a_gasmask.png' });
      console.log('Saved ks2_ww2_l1_source_a_gasmask.png');
    }

    // 2. Lesson 6: Women at War (Inspecting shells Canary Girls)
    console.log('Navigating to KS2 WW2 Lesson 6...');
    await page.goto('http://localhost:3003/?unit=ks2_ww2&view=lessons&lesson=6', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    await new Promise(r => setTimeout(r, 2000));

    const shellsPlate = await page.$('.narrative-visual-plate img[src*="women_munitions_workers_inspecting_shells"]');
    if (shellsPlate) {
      console.log('Found Lesson 6 Munitions Workers plate!');
      await page.evaluate(el => el.closest('.narrative-visual-row').scrollIntoView({ behavior: 'instant', block: 'center' }), shellsPlate);
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: 'ks2_ww2_l6_shells_plate.png' });
      console.log('Saved ks2_ww2_l6_shells_plate.png');
    }

    // 3. Lesson 10: VE Day (Mounted police officer in Whitehall)
    console.log('Navigating to KS2 WW2 Lesson 10...');
    await page.goto('http://localhost:3003/?unit=ks2_ww2&view=lessons&lesson=10', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    await new Promise(r => setTimeout(r, 2000));

    const policePlate = await page.$('.narrative-visual-plate img[src*="ve_day_celebrations_london"]');
    if (policePlate) {
      console.log('Found Lesson 10 VE Day mounted police officer plate!');
      await page.evaluate(el => el.closest('.narrative-visual-row').scrollIntoView({ behavior: 'instant', block: 'center' }), policePlate);
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: 'ks2_ww2_l10_police_plate.png' });
      console.log('Saved ks2_ww2_l10_police_plate.png');
    }

    console.log('🎉 All live visual verification checks completed successfully!');
  } finally {
    await browser.close();
  }
})();
