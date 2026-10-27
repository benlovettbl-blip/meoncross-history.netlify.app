const puppeteer = require('puppeteer');

(async () => {
  let browser;
  try {
    browser = await puppeteer.connect({ browserURL: 'http://localhost:9222', defaultViewport: null });
    console.log('Connected to existing browser on 9222');
  } catch (e) {
    console.log('Launching headless browser...');
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  const pages = await browser.pages();
  let page = pages.find(p => p.url().includes('localhost:3003'));
  if (!page) {
    page = await browser.newPage();
  }

  await page.setViewport({ width: 1440, height: 900 });

  // 1. Check Lesson 3 (The user's active page)
  console.log('Navigating to The Shoah Lesson 3...');
  await page.goto('http://localhost:3003/index.html?view=lessons&unit=the_shoah&lesson=3', {
    waitUntil: 'networkidle0'
  });
  await new Promise(r => setTimeout(r, 1500));

  const l3Plates = await page.evaluate(() => {
    const plates = document.querySelectorAll('.narrative-visual-plate');
    const rows = document.querySelectorAll('.narrative-visual-row');
    return {
      plateCount: plates.length,
      rowCount: rows.length,
      images: Array.from(plates).map(p => p.querySelector('img')?.src),
      reversed: Array.from(rows).map(r => r.classList.contains('row-reversed'))
    };
  });
  console.log('Lesson 3 narrative visual plates:', l3Plates);

  // Scroll to first narrative visual row in Lesson 3
  await page.evaluate(() => {
    const row = document.querySelector('.narrative-visual-row');
    if (row) row.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'public/shoah_lesson3_narrative_plate_1.png', fullPage: false });
  console.log('Saved public/shoah_lesson3_narrative_plate_1.png');

  // Scroll to second narrative visual row in Lesson 3
  await page.evaluate(() => {
    const rows = document.querySelectorAll('.narrative-visual-row');
    if (rows.length > 1) rows[1].scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'public/shoah_lesson3_narrative_plate_2.png', fullPage: false });
  console.log('Saved public/shoah_lesson3_narrative_plate_2.png');

  // 2. Check Lesson 5
  console.log('Navigating to The Shoah Lesson 5...');
  await page.goto('http://localhost:3003/index.html?view=lessons&unit=the_shoah&lesson=5', {
    waitUntil: 'networkidle0'
  });
  await new Promise(r => setTimeout(r, 1200));

  const l5Plates = await page.evaluate(() => {
    const plates = document.querySelectorAll('.narrative-visual-plate');
    const rows = document.querySelectorAll('.narrative-visual-row');
    return {
      plateCount: plates.length,
      rowCount: rows.length,
      images: Array.from(plates).map(p => p.querySelector('img')?.src),
      reversed: Array.from(rows).map(r => r.classList.contains('row-reversed'))
    };
  });
  console.log('Lesson 5 narrative visual plates:', l5Plates);

  // Scroll to first row in Lesson 5
  await page.evaluate(() => {
    const row = document.querySelector('.narrative-visual-row');
    if (row) row.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'public/shoah_lesson5_narrative_plate_1.png', fullPage: false });
  console.log('Saved public/shoah_lesson5_narrative_plate_1.png');

  process.exit(0);
})();
