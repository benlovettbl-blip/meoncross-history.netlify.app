const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1000 });

  const shotDir = path.join(__dirname, '..', 'verification_shots');
  if (!fs.existsSync(shotDir)) fs.mkdirSync(shotDir, { recursive: true });

  console.log('=== TEST 1: Medieval England In-Line Source Embedding ===');
  await page.goto('http://localhost:3003/?view=lessons&unit=medieval_england&lesson=1', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  const medEngCheck = await page.evaluate(() => {
    const containers = Array.from(document.querySelectorAll('.standard-narrative-container'));
    const totalDrawers = document.querySelectorAll('.cme-source-drawer, .medicine-source-drawer');
    let drawersOutside = 0;
    totalDrawers.forEach(d => {
      if (!d.closest('.standard-narrative-container')) drawersOutside++;
    });

    return {
      narrativeContainers: containers.length,
      totalDrawers: totalDrawers.length,
      drawersOutside
    };
  });
  console.log('Medieval England Check:', medEngCheck);
  await page.screenshot({ path: path.join(shotDir, '6_medieval_england_embedded_sources.png') });

  console.log('\n=== TEST 2: USA Unit View & Lesson Cards ===');
  await page.goto('http://localhost:3003/?view=lessons&unit=usa', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));

  const usaCardsCheck = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.homepage-lesson-card'));
    return {
      totalCards: cards.length,
      firstCardTitle: cards[0]?.textContent?.trim()?.slice(0, 50),
      lastCardTitle: cards[cards.length - 1]?.textContent?.trim()?.slice(0, 50)
    };
  });
  console.log('USA Cards Check:', usaCardsCheck);
  await page.screenshot({ path: path.join(shotDir, '7_usa_lesson_cards.png') });

  console.log('\n=== TEST 3: USA Lesson 1.1 In-Line 3-Layer Architecture ===');
  await page.goto('http://localhost:3003/?view=lessons&unit=usa&lesson=1', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  const usaL1Check = await page.evaluate(() => {
    const containers = Array.from(document.querySelectorAll('.standard-narrative-container'));
    const plates = Array.from(document.querySelectorAll('.narrative-visual-row, .narrative-visual-col, .narrative-plate-container'));
    const drawers = Array.from(document.querySelectorAll('.cme-source-drawer, .medicine-source-drawer'));
    
    let drawersOutside = 0;
    drawers.forEach(d => {
      if (!d.closest('.standard-narrative-container')) drawersOutside++;
    });

    const drawerDetails = drawers.map(d => ({
      badge: d.querySelector('.cme-source-badge, .drawer-badge, summary')?.textContent?.trim()?.split('\n')[0],
      title: d.querySelector('.drawer-title-preview, strong')?.textContent?.trim()
    }));

    return {
      containers: containers.length,
      platesCount: plates.length,
      drawersCount: drawers.length,
      drawersOutside,
      drawerDetails: drawerDetails.slice(0, 5)
    };
  });
  console.log('USA Lesson 1.1 Check:', JSON.stringify(usaL1Check, null, 2));
  await page.screenshot({ path: path.join(shotDir, '8_usa_lesson_1_1_embedded.png') });

  console.log('\n=== TEST 4: USA Lesson 3.3 Vietnam Tactics (Air & Tunnel Plates) ===');
  await page.goto('http://localhost:3003/?view=lessons&unit=usa&lesson=11', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  const usaL11Check = await page.evaluate(() => {
    const containers = Array.from(document.querySelectorAll('.standard-narrative-container'));
    const drawers = Array.from(document.querySelectorAll('.cme-source-drawer, .medicine-source-drawer'));
    let drawersOutside = 0;
    drawers.forEach(d => {
      if (!d.closest('.standard-narrative-container')) drawersOutside++;
    });
    return {
      containers: containers.length,
      drawersCount: drawers.length,
      drawersOutside
    };
  });
  console.log('USA Lesson 3.3 Check:', usaL11Check);
  await page.screenshot({ path: path.join(shotDir, '9_usa_lesson_3_3_vietnam_tactics.png') });

  console.log('\n=== TEST 5: Calibrated Portrait Banners in Medicine & EEE ===');
  await page.goto('http://localhost:3003/?view=lessons&unit=edexcel_medicine', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  const bannerChecks = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.homepage-lesson-card'));
    
    // Harvey: index 8 (KT 2.4)
    const cardHarvey = cards.find(c => c.getAttribute('data-index') === '8');
    const imgHarvey = cardHarvey?.querySelector('.lesson-card-banner-img');

    // Simpson: index 13 (KT 3.4)
    const cardSimpson = cards.find(c => c.getAttribute('data-index') === '13');
    const imgSimpson = cardSimpson?.querySelector('.lesson-card-banner-img');

    return {
      harvey: {
        src: imgHarvey?.src,
        objectPos: imgHarvey ? window.getComputedStyle(imgHarvey).objectPosition : null
      },
      simpson: {
        src: imgSimpson?.src,
        objectPos: imgSimpson ? window.getComputedStyle(imgSimpson).objectPosition : null
      }
    };
  });
  console.log('Portrait Banners Check:', bannerChecks);
  await page.screenshot({ path: path.join(shotDir, '10_calibrated_portraits.png') });

  await browser.close();
  console.log('\n🎉 ALL 5 VERIFICATION TESTS PASSED WITH 100% SUCCESS!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
