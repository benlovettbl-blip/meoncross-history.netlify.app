const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Homepage
  console.log('Capturing homepage...');
  await page.goto('http://localhost:3003/?unit=ks2_ww2', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1000));
  const heroEl = await page.$('.hero-container');
  if (heroEl) {
    await heroEl.screenshot({ path: 'public/images/capture_home_hero.png' });
    console.log('Saved capture_home_hero.png');
  }

  // 2. Each lesson banner and first source
  for (let i = 1; i <= 10; i++) {
    console.log(`Capturing Lesson ${i}...`);
    await page.goto(`http://localhost:3003/?view=lessons&unit=ks2_ww2&lesson=${i}`, {
      waitUntil: 'networkidle2',
    });
    await new Promise((r) => setTimeout(r, 1000));

    const lessonHero = await page.$('.lesson-hero');
    if (lessonHero) {
      await lessonHero.screenshot({ path: `public/images/capture_lesson_${i}_hero.png` });
      console.log(`Saved capture_lesson_${i}_hero.png`);
    }

    const firstSource =
      (await page.$('.archival-source-viewer')) ||
      (await page.$('.evidence-container')) ||
      (await page.$('.source-card'));
    if (firstSource) {
      await firstSource.screenshot({ path: `public/images/capture_lesson_${i}_source.png` });
      console.log(`Saved capture_lesson_${i}_source.png`);
    }
  }

  await browser.close();
  console.log('Done capturing banners!');
})();
