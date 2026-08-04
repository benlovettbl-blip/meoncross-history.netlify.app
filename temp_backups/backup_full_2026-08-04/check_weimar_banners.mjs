import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3003/unit.html?id=weimar_nazi_germany', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));
  
  const banners = await page.$$eval('.premium-banner-bg', els => els.map(el => el.style.backgroundImage));
  console.log("Found banners:", banners);
  
  await page.screenshot({ path: 'C:/Users/fives/.gemini/antigravity-ide/brain/ff1a9bf1-f71f-40b7-966c-387cc0985260/weimar_homepage.png' });
  await browser.close();
})();
