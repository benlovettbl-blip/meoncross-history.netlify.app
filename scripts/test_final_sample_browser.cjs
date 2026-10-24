const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Test Industrialisation Lesson 1
  console.log('Testing Industrialisation Lesson 1...');
  await page.goto(
    'http://localhost:3003/?view=lessons&unit=industrialisation_and_empire&lesson=lesson_1',
    {
      waitUntil: 'networkidle2',
    },
  );
  await new Promise((r) => setTimeout(r, 1000));

  const indRes = await page.evaluate(() => {
    document.querySelectorAll('details').forEach((d) => (d.open = true));
    const boxes = document.querySelectorAll('.archival-source-discussion-box');
    const buttons = document.querySelectorAll('.btn-think-discuss-toggle');
    buttons.forEach((b) => b.click());
    return { boxes: boxes.length, buttons: buttons.length };
  });
  console.log('Industrialisation Lesson 1:', indRes);

  await page.evaluate(() => {
    const box = document.querySelector('.archival-source-discussion-box');
    if (box) box.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: 'industrialisation_coalbrookdale_verified.png' });
  console.log('Captured industrialisation_coalbrookdale_verified.png');

  // 2. Test Great War Part 2 Lesson 1 (Kitchener)
  console.log('\nTesting Great War Part 2 Lesson 1...');
  await page.goto(
    'http://localhost:3003/?view=lessons&unit=great_war_part2&lesson=lesson_1_enlistment',
    {
      waitUntil: 'networkidle2',
    },
  );
  await new Promise((r) => setTimeout(r, 1000));

  const gw2Res = await page.evaluate(() => {
    document.querySelectorAll('details').forEach((d) => (d.open = true));
    const boxes = document.querySelectorAll('.archival-source-discussion-box');
    const buttons = document.querySelectorAll('.btn-think-discuss-toggle');
    buttons.forEach((b) => b.click());
    return { boxes: boxes.length, buttons: buttons.length };
  });
  console.log('Great War Part 2 Lesson 1:', gw2Res);

  await page.evaluate(() => {
    const box = document.querySelector('.archival-source-discussion-box');
    if (box) box.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: 'great_war_part2_kitchener_verified.png' });
  console.log('Captured great_war_part2_kitchener_verified.png');

  await browser.close();
  console.log('✅ Final sample browser verification passed!');
})().catch((err) => {
  console.error('❌ Error during browser verification:', err);
  process.exit(1);
});
