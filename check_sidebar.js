const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3006/unit.html?id=edexcel_medicine');
  await page.waitForSelector('.lesson-link');
  
  const links = await page.$$eval('.lesson-link', els => els.map(e => e.innerText));
  console.log("LINKS IN SIDEBAR:");
  links.forEach(l => console.log(l));
  
  await browser.close();
})();
