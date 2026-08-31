const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));

  await page.goto('http://localhost:3003/unit.html?id=trip_ypres', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));
  
  const beforeContent = await page.\('#content-area', el => el.innerHTML.substring(0, 50));
  console.log('BEFORE CLICK:', beforeContent);
  
  await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('.lesson-link'));
    const day1 = links.find(l => l.textContent.includes('Day 1'));
    if (day1) day1.click();
  });
  
  await new Promise(r => setTimeout(r, 2000));
  
  const afterContent = await page.\('#content-area', el => el.innerHTML.substring(0, 50));
  console.log('AFTER CLICK:', afterContent);
  
  await browser.close();
})();
