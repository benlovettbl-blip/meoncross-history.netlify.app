import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', (err) => console.log('PAGE ERROR:', err.message));

  console.log('Navigating to local server...');
  await page.goto('http://localhost:3006/?view=lessons&unit=industrialisation_and_empire');

  console.log('Waiting for network idle...');
  await page.waitForNetworkIdle();

  console.log('Clicking Individuals tab...');
  await page.click('#nav-individuals');

  console.log('Waiting 2 seconds...');
  await new Promise((r) => setTimeout(r, 2000));

  console.log('Fetching main-content innerHTML length...');
  const html = await page.evaluate(() => {
    const el = document.getElementById('main-content');
    return el ? el.innerHTML : '';
  });
  console.log('main-content length:', html.length);

  console.log('Taking screenshot...');
  await page.screenshot({
    path: 'C:\\Users\\fives\\.gemini\\antigravity-ide\\brain\\ee1ff3f5-cae9-4848-91eb-fd87e1936ea7\\individuals_test.png',
    fullPage: true,
  });

  await browser.close();
})();
