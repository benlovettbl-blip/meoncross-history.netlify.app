const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') console.log('BROWSER ERROR:', msg.text());
  });

  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  for (let lessonNum = 1; lessonNum <= 5; lessonNum++) {
    const url = `http://localhost:3003/index.html?view=lessons&unit=medieval_england&lesson=${lessonNum}`;
    await page.goto(url, { waitUntil: 'networkidle2' });

    const stats = await page.evaluate(() => {
      const heading = document.querySelector('h1, h2, .lesson-hero-title')?.innerText || '';
      const imgs = Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        complete: img.complete,
        naturalWidth: img.naturalWidth
      }));
      const brokenImgs = imgs.filter(img => !img.complete || img.naturalWidth === 0);
      const sourceElements = document.querySelectorAll('.source-card, .cme-source-drawer, [class*="source"]');
      const badges = document.querySelectorAll('.source-badge, .badge, [class*="badge"]');

      return {
        heading: heading.slice(0, 50),
        totalImages: imgs.length,
        brokenImages: brokenImgs.length,
        sourcesFound: sourceElements.length,
        badgesFound: badges.length
      };
    });

    console.log(`Lesson ${lessonNum} Audit:`, stats);
  }

  await browser.close();
  console.log('\n🎉 Puppeteer browser verification across all 5 lessons completed!');
})();
