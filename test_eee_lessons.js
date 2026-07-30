const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3003/unit.html?id=eee', { waitUntil: 'networkidle0' });
  
  const results = {};
  
  // Get all lesson links in the sidebar
  const lessonLinksCount = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.lesson-link')).filter(l => l.innerText.startsWith('L')).length;
  });
  
  results.totalLessons = lessonLinksCount;
  results.errors = [];
  
  for (let i = 0; i < lessonLinksCount; i++) {
    try {
      // Find the i-th lesson link in the sidebar
      await page.evaluate((idx) => {
        const links = Array.from(document.querySelectorAll('.lesson-link')).filter(l => l.innerText.startsWith('L'));
        if (links[idx]) {
          links[idx].click();
        }
      }, i);
      
      await new Promise(r => setTimeout(r, 200));
      
      // Check if it rendered by looking for the lesson-content wrapper
      const isRendered = await page.evaluate(() => {
        return document.querySelector('.lesson-content') !== null;
      });
      
      if (!isRendered) {
        results.errors.push(`Lesson ${i} failed to render (lesson-content not found)`);
      }
      
      // Check console errors
    } catch(e) {
      results.errors.push(`Lesson ${i} threw error: ${e.message}`);
    }
  }
  
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
