const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('BROWSER ERROR:', msg.text());
  });
  
  await page.goto('http://localhost:3003/unit.html?id=edexcel_medicine', { waitUntil: 'networkidle0' });
  
  const links = await page.$$('.lesson-link');
  let lesson1Link = null;
  for (let l of links) {
    const text = await page.evaluate(el => el.textContent, l);
    if (text.includes('1.1')) lesson1Link = l;
  }
  
  if (lesson1Link) {
    console.log('Clicking KT1.1 link...');
    await lesson1Link.click();
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: 'screenshot.png' });
    console.log('Screenshot saved.');
  } else {
    console.log('KT1.1 link not found.');
  }
  
  await browser.close();
})();
