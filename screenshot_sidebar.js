const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3006/unit.html?id=edexcel_medicine', { waitUntil: 'networkidle2' });
  
  // Wait for the sidebar links to load
  await page.waitForSelector('.lesson-link');
  
  // Get the sidebar element and take a screenshot
  const sidebar = await page.$('#sidebar');
  if (sidebar) {
    await sidebar.screenshot({ path: 'sidebar_screenshot.png' });
    console.log('Saved sidebar screenshot to sidebar_screenshot.png');
  } else {
    console.log('Could not find sidebar element');
  }
  
  await browser.close();
})();
