const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    console.log('Navigating to Cold War Lesson 3...');
    await page.goto('http://localhost:3003/?unit=cold_war&view=lessons&lesson=3', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    await new Promise(r => setTimeout(r, 2000));

    // Open the first source drawer if it is closed
    const firstDrawer = await page.$('.cme-source-drawer');
    if (firstDrawer) {
      const isOpen = await page.evaluate(el => el.hasAttribute('open'), firstDrawer);
      if (!isOpen) {
        console.log('Opening first source drawer...');
        const summary = await firstDrawer.$('summary');
        if (summary) await summary.click();
        await new Promise(r => setTimeout(r, 500));
      }
    }

    // Locate the first source-enquiry-reveal details element
    const enquiryReveal = await page.$('.source-enquiry-reveal');
    if (!enquiryReveal) {
      console.error('Could not find .source-enquiry-reveal');
      return;
    }

    // Scroll to the source container
    await page.evaluate(el => {
      el.closest('.cme-source-drawer').scrollIntoView({ behavior: 'instant', block: 'center' });
    }, enquiryReveal);

    await new Promise(r => setTimeout(r, 600));

    // Screenshot 1: Collapsed question bar with pill
    console.log('Capturing collapsed question state...');
    await page.screenshot({ path: 'cold_war_question_collapsed.png' });

    // Now click the question summary to open number 4!
    console.log('Clicking question summary (Number 3)...');
    const summaryBtn = await enquiryReveal.$('summary');
    await summaryBtn.click();

    await new Promise(r => setTimeout(r, 600));

    // Screenshot 2: Expanded answer state (Number 4 opened)
    console.log('Capturing expanded answer state...');
    await page.screenshot({ path: 'cold_war_answer_expanded.png' });

    // Now click the question summary again to close number 4!
    console.log('Clicking question summary again to close...');
    await summaryBtn.click();
    await new Promise(r => setTimeout(r, 400));
    const isDetailsClosed = await page.evaluate(el => !el.hasAttribute('open'), enquiryReveal);
    console.log('Is details successfully closed after second click?', isDetailsClosed);
  } catch (err) {
    console.error('Error during test:', err);
  } finally {
    await browser.close();
  }
})();
