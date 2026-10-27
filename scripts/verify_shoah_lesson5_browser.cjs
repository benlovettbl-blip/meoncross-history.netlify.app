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

  console.log('Navigating to The Shoah Lesson 5...');
  await page.goto('http://localhost:3003/index.html?view=lessons&unit=the_shoah&lesson=5', {
    waitUntil: 'networkidle0'
  });
  await new Promise(r => setTimeout(r, 1500));

  // Open all source drawers in lesson 5
  await page.evaluate(() => {
    const drawers = document.querySelectorAll('.cme-source-drawer');
    drawers.forEach(d => {
      d.open = true;
      const reveal = d.querySelector('.source-enquiry-reveal');
      if (reveal) reveal.open = true;
    });
  });

  await new Promise(r => setTimeout(r, 1000));

  // Screenshot Source A & B area
  const srcAInfo = await page.evaluate(() => {
    const drawers = document.querySelectorAll('.cme-source-drawer');
    if (drawers.length > 0) {
      drawers[0].scrollIntoView({ behavior: 'instant', block: 'center' });
      return { count: drawers.length, title0: drawers[0].innerText.slice(0, 100) };
    }
    return { count: 0 };
  });
  console.log('Source drawer info:', srcAInfo);

  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'public/shoah_lesson5_sourceA_plate.png', fullPage: false });
  console.log('Saved public/shoah_lesson5_sourceA_plate.png');

  // Screenshot Source B
  await page.evaluate(() => {
    const drawers = document.querySelectorAll('.cme-source-drawer');
    if (drawers.length > 1) {
      drawers[1].scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'public/shoah_lesson5_sourceB_plate.png', fullPage: false });
  console.log('Saved public/shoah_lesson5_sourceB_plate.png');

  // Screenshot Source E
  await page.evaluate(() => {
    const drawers = document.querySelectorAll('.cme-source-drawer');
    if (drawers.length > 4) {
      drawers[4].scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'public/shoah_lesson5_sourceE_plate.png', fullPage: false });
  console.log('Saved public/shoah_lesson5_sourceE_plate.png');

  // Also check Lesson 1 Source B & D
  console.log('Navigating to The Shoah Lesson 1...');
  await page.goto('http://localhost:3003/index.html?view=lessons&unit=the_shoah&lesson=1', {
    waitUntil: 'networkidle0'
  });
  await new Promise(r => setTimeout(r, 1200));

  await page.evaluate(() => {
    const drawers = document.querySelectorAll('.cme-source-drawer');
    if (drawers.length > 1) {
      drawers[1].open = true;
      const reveal = drawers[1].querySelector('.source-enquiry-reveal');
      if (reveal) reveal.open = true;
      drawers[1].scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'public/shoah_lesson1_sourceB_plate.png', fullPage: false });
  console.log('Saved public/shoah_lesson1_sourceB_plate.png');

  console.log('All verification screenshots captured!');
  process.exit(0);
})();
