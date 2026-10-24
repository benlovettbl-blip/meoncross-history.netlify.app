const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Test lesson_1_1
  console.log('Navigating to EEE Lesson 1.1...');
  await page.goto('http://localhost:3003/?view=lessons&unit=eee&lesson=lesson_1_1', {
    waitUntil: 'networkidle2',
  });
  await new Promise((r) => setTimeout(r, 1200));

  // Open all details and click the think-discuss toggle button
  const results1 = await page.evaluate(() => {
    document.querySelectorAll('details').forEach((d) => (d.open = true));
    const boxes = document.querySelectorAll('.archival-source-discussion-box');
    const buttons = document.querySelectorAll('.btn-think-discuss-toggle');
    buttons.forEach((b) => b.click());
    return {
      boxesCount: boxes.length,
      buttonsCount: buttons.length,
      buttonTexts: Array.from(buttons).map((b) => b.textContent.trim()),
    };
  });
  console.log('Lesson 1.1 Results:', results1);

  await new Promise((r) => setTimeout(r, 600));

  // Scroll to first box
  await page.evaluate(() => {
    const box = document.querySelector('.archival-source-discussion-box');
    if (box) box.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: 'eee_coronation_verified.png' });
  console.log('Captured eee_coronation_verified.png');

  // 2. Test lesson_2_4 (Armada)
  console.log('\nNavigating to EEE Lesson 2.4 (Armada)...');
  await page.goto('http://localhost:3003/?view=lessons&unit=eee&lesson=lesson_2_4', {
    waitUntil: 'networkidle2',
  });
  await new Promise((r) => setTimeout(r, 1200));

  const results2 = await page.evaluate(() => {
    document.querySelectorAll('details').forEach((d) => (d.open = true));
    const boxes = document.querySelectorAll('.archival-source-discussion-box');
    const buttons = document.querySelectorAll('.btn-think-discuss-toggle');
    buttons.forEach((b) => b.click());
    return {
      boxesCount: boxes.length,
      buttonsCount: buttons.length,
      buttonTexts: Array.from(buttons).map((b) => b.textContent.trim()),
    };
  });
  console.log('Lesson 2.4 Results:', results2);

  await new Promise((r) => setTimeout(r, 600));

  await page.evaluate(() => {
    const boxes = document.querySelectorAll('.archival-source-discussion-box');
    if (boxes.length > 1) boxes[1].scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: 'eee_armada_portrait_verified.png' });
  console.log('Captured eee_armada_portrait_verified.png');

  await browser.close();
  console.log('✅ EEE verification completed successfully!');
})().catch((err) => {
  console.error('❌ Error during EEE verification:', err);
  process.exit(1);
});
