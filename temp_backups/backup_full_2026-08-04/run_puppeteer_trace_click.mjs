import puppeteer from 'puppeteer';
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3003/unit.html?id=eee', { waitUntil: 'networkidle2' });
  
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({path: 'unit_html_before_click.png'});
  console.log("Screenshot saved as unit_html_before_click.png");
  
  try {
    await page.waitForSelector('[data-index="0"]', { timeout: 5000 });
    console.log("Clicking lesson 1...");
    await page.click('[data-index="0"]');
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({path: 'unit_html_click_result.png'});
    console.log("Screenshot saved as unit_html_click_result.png.");
  } catch(err) {
    console.error("Interaction error:", err);
  }
  
  await browser.close();
})();
