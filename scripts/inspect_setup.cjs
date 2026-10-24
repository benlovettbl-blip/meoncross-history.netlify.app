const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 825 });
  await page.goto('http://localhost:3003/index.html?view=gcse-tracker', {
    waitUntil: 'networkidle0',
  });
  await page.click('button[data-tab="blurt"]');
  await new Promise((r) => setTimeout(r, 800));

  const text = await page.$eval('.gcse-blurt-setup-card', (el) => el.innerText);
  console.log('FULL SETUP TEXT:');
  console.log(text);

  await browser.close();
})();
