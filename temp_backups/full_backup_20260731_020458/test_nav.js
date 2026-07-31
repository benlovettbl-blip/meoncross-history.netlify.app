const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3003/unit.html?id=eee', { waitUntil: 'networkidle0' });
  
  const results = {};
  
  // Test Dyslexia Button
  await page.click('#btn-dyslexia');
  results.dyslexiaClassAdded = await page.evaluate(() => document.body.classList.contains('dyslexia-font'));
  
  // Test Sidebar Logo
  const logoHref = await page.evaluate(() => document.querySelector('.sidebar-logo').getAttribute('onclick'));
  results.logoOnClick = logoHref;

  // Test Unit Menu
  // Click first lesson
  await page.waitForSelector('.homepage-lesson-card[data-index="0"]', { visible: true, timeout: 5000 });
  await page.click('.homepage-lesson-card[data-index="0"]');
  await new Promise(r => setTimeout(r, 500));
  
  console.log("Testing Unit Menu button...");
  try {
    const unitMenuBtn = await page.$x('//button[contains(text(), "Unit Menu")]');
    if (unitMenuBtn.length > 0) {
      await unitMenuBtn[0].click();
      console.log("Clicked Unit Menu");
    } else {
      console.log("Unit Menu button not found");
      results.unitMenuClickError = 'Not found';
    }
  } catch(e) {
    console.log("Error clicking unit menu", e);
    results.unitMenuClickError = e.message;
  }
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'unit_menu_clicked.png' });
  
  // Are we back on homepage?
  results.backOnHomepage = await page.evaluate(() => document.querySelector('.homepage-lesson-card') !== null);
  console.log("Back on homepage?", results.backOnHomepage);
  
  // Click first lesson again
  console.log("Waiting for homepage lesson card again...");
  await page.waitForSelector('.homepage-lesson-card[data-index="0"]', { visible: true, timeout: 5000 });
  await page.click('.homepage-lesson-card[data-index="0"]');
  console.log("Clicked first lesson again");
  await new Promise(r => setTimeout(r, 1000));
  
  // Click Next Lesson
  console.log("Testing Next Lesson button...");
  try {
    const nextBtn = await page.$x('//button[contains(text(), "Next Lesson")]');
    if (nextBtn.length > 0) {
      await nextBtn[0].click();
      console.log("Clicked Next Lesson");
    } else {
      results.nextLessonClickError = 'Not found';
    }
  } catch(e) {
    results.nextLessonClickError = e.message;
  }
  await new Promise(r => setTimeout(r, 500));
  
  // Check if title is Lesson 2
  results.lesson2Title = await page.evaluate(() => {
    const h = document.querySelector('h4');
    return h ? h.innerText : 'Not found';
  });
  
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();
