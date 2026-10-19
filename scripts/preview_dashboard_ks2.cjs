const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  await page.goto('http://localhost:3003/', { waitUntil: 'networkidle0' });

  // Wait 1s for any UI transitions
  await new Promise((r) => setTimeout(r, 1000));

  await page.screenshot({ path: 'public/dashboard_preview_ks2.png' });
  console.log('✅ Dashboard preview saved to public/dashboard_preview_ks2.png');

  await browser.close();
})();
