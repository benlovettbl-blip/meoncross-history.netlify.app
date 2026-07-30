import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.error('PAGE ERROR:', error.stack));
  
  console.log("Navigating to http://localhost:3003/unit.html?id=eee");
  await page.goto('http://localhost:3003/unit.html?id=eee', { waitUntil: 'networkidle2' });
  
  const cards = await page.$$('.homepage-lesson-card');
  for (let i = 0; i < cards.length; i++) {
      const text = await page.evaluate(el => el.textContent, cards[i]);
      if (text.includes('3.1')) {
          console.log("Clicking on lesson 3.1...");
          await cards[i].click();
          await new Promise(r => setTimeout(r, 1000));
          break;
      }
  }
  
  await browser.close();
})();
