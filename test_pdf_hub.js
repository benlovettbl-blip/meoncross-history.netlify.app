const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3006/unit.html?id=edexcel_medicine', { waitUntil: 'networkidle2' });
  
  // Wait for the sidebar links to load
  await page.waitForSelector('.lesson-link');
  
  // Find and click the "Print & PDF Hub" link
  const links = await page.$$('.lesson-link');
  let pdfHubLink = null;
  for (const link of links) {
    const text = await page.evaluate(el => el.innerText, link);
    if (text.includes('Print & PDF Hub')) {
      pdfHubLink = link;
      break;
    }
  }
  
  if (pdfHubLink) {
    console.log("Found Print & PDF Hub link. Clicking it...");
    await pdfHubLink.click();
    
    // Wait a moment for the content area to render the hub
    await new Promise(r => setTimeout(r, 1000));
    
    // Take a screenshot of the content area
    const contentArea = await page.$('.content-area');
    if (contentArea) {
      await contentArea.screenshot({ path: 'pdf_hub_screenshot.png' });
      console.log('Saved PDF hub screenshot to pdf_hub_screenshot.png');
      
      // Also grab the HTML of the content area to verify the links
      const innerHtml = await page.evaluate(el => el.innerHTML, contentArea);
      console.log("HTML length of content area:", innerHtml.length);
      if (innerHtml.includes('Textbook PDFs') && innerHtml.includes('Interactive Web Workbooks')) {
          console.log("Content area includes expected sections!");
      } else {
          console.log("WARNING: Content area might be missing expected sections.");
      }
    } else {
      console.log('Could not find content-area element');
    }
  } else {
    console.log('Could not find Print & PDF Hub link in the sidebar');
  }
  
  await browser.close();
})();
