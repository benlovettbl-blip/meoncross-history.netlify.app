import puppeteer from 'puppeteer';

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.error('PAGE ERROR:', error.message));
  page.on('response', response => {
    if (!response.ok()) {
      console.log(`HTTP ${response.status()}: ${response.url()}`);
    }
  });

  console.log("Navigating to http://localhost:3003/eee/index.html");
  await page.goto('http://localhost:3003/eee/index.html', { waitUntil: 'networkidle2' });
  
  console.log("Waiting for .homepage-lesson-card");
  try {
    await page.waitForSelector('.homepage-lesson-card', { timeout: 5000 });
    console.log("Clicking the first lesson card...");
    await page.click('.homepage-lesson-card');
    await new Promise(r => setTimeout(r, 2000)); // wait 2s to see if an error happens
    console.log("Done clicking, checking if content-area updated...");
    const content = await page.$eval('#content-area', el => el.innerHTML.slice(0, 100));
    console.log("Content area starts with:", content);
  } catch (err) {
    console.error("Error during interaction:", err);
  }

  await browser.close();
})();
