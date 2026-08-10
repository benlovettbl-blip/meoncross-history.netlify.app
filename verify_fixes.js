const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set viewport to simulate A4 paper size in print
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  
  // Load the early modern world workbook HTML
  const fileUrl = 'file://' + path.join(__dirname, 'public/units/early_modern_world/workbook.html').replace(/\\/g, '/');
  console.log('Loading:', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });
  
  // Take a screenshot of the top of the tracker table (Page 2)
  const trackerTable = await page.$('.grading-footer + div + div table, .source-container + div table, .task-box + div table, table');
  
  if (trackerTable) {
      await page.evaluate(el => el.scrollIntoView(), trackerTable);
      await new Promise(r => setTimeout(r, 500));
      await page.screenshot({ path: 'tracker_screenshot.png' });
      console.log('Saved tracker_screenshot.png');
  } else {
      console.log('Could not find tracker table');
      // just screenshot the whole page 2 area
      await page.evaluate(() => window.scrollBy(0, 1100));
      await page.screenshot({ path: 'tracker_screenshot.png' });
  }

  // Verify the text before image fix
  // We look for Lesson 1's Source A
  const sourceA = await page.evaluate(() => {
     // Find the text block containing "Ottoman Blockade"
     const blocks = Array.from(document.querySelectorAll('.narrative-block'));
     const blockadeBlock = blocks.find(b => b.textContent.includes('Ottoman Blockade'));
     
     if (blockadeBlock) {
         // check what comes immediately after
         let nextElem = blockadeBlock.nextElementSibling;
         let type = 'unknown';
         if (nextElem && nextElem.classList.contains('task-box')) type = 'task-box';
         if (nextElem && nextElem.classList.contains('source-container')) type = 'source-container';
         return {
             blockadeTextFound: true,
             nextElementType: type
         };
     }
     return { blockadeTextFound: false };
  });
  
  console.log('Sequence Verification Result:', sourceA);
  
  await browser.close();
})();
