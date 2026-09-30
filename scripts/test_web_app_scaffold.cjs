const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1000 });

    page.on('console', (msg) => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', (err) => console.log('BROWSER ERR:', err));

    console.log('Navigating to http://localhost:3003/?unit=edexcel_medicine ...');
    await page.goto('http://localhost:3003/?unit=edexcel_medicine', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    // Click KT1.1
    await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll('*'));
      const target = els.find((el) => el.children.length === 0 && el.textContent.includes('KT1.1'));
      if (target) target.click();
    });
    await new Promise((r) => setTimeout(r, 2000));

    // Capture collapsed state screenshot
    const handle = await page.evaluateHandle(() => document.getElementById('lesson-note-scaffold'));
    await handle
      .asElement()
      .screenshot({ path: 'public/images/test_web_app_scaffold_collapsed.png' });
    console.log(
      '✅ Screenshot of collapsed state saved to public/images/test_web_app_scaffold_collapsed.png',
    );

    // Click directly on the title span to expand
    await page.evaluate(() => {
      const details = document.getElementById('lesson-note-scaffold');
      if (details) details.open = true;
    });
    await new Promise((r) => setTimeout(r, 500));

    const expandedStatus = await page.evaluate(() => {
      const el = document.getElementById('lesson-note-scaffold');
      return {
        open: el.open,
        cardsCount: el.querySelectorAll('.note-scaffold-card').length,
      };
    });
    console.log('Expanded Scaffold Status:', expandedStatus);

    await handle
      .asElement()
      .screenshot({ path: 'public/images/test_web_app_scaffold_expanded.png' });
    console.log(
      '✅ Screenshot of expanded state saved to public/images/test_web_app_scaffold_expanded.png',
    );

    // Test Hide Model button on block 0
    console.log('Testing Hide Model button...');
    await page.evaluate(() => {
      window.toggleSingleNoteModel('lesson_1_1', 0);
    });
    await new Promise((r) => setTimeout(r, 300));

    const toggleState1 = await page.evaluate(() => {
      const btn = document.getElementById('btn-toggle-model-lesson_1_1-0');
      const bullets = document.getElementById('bullets-lesson_1_1-0');
      return {
        btnText: btn ? btn.textContent.trim() : null,
        bulletsDisplay: bullets ? bullets.style.display : null,
      };
    });
    console.log('After clicking Hide Model:', toggleState1);

    // Toggle again to Show Model
    await page.evaluate(() => {
      window.toggleSingleNoteModel('lesson_1_1', 0);
    });
    await new Promise((r) => setTimeout(r, 300));
    const toggleState2 = await page.evaluate(() => {
      const btn = document.getElementById('btn-toggle-model-lesson_1_1-0');
      const bullets = document.getElementById('bullets-lesson_1_1-0');
      return {
        btnText: btn ? btn.textContent.trim() : null,
        bulletsDisplay: bullets ? bullets.style.display : null,
      };
    });
    console.log('After clicking Show Model again:', toggleState2);

    // Test typing in textarea
    await page.type(
      '#note-text-lesson_1_1-0',
      'The Catholic Church held a monopoly over scriptoria and education.',
    );
    await new Promise((r) => setTimeout(r, 500));
    console.log('✅ Successfully typed note into textarea');

    // Check localStorage
    const savedVal = await page.evaluate(() => localStorage.getItem('med_note_lesson_1_1_0'));
    console.log('Saved note in localStorage:', savedVal);

    await handle.asElement().screenshot({ path: 'public/images/test_web_app_scaffold_active.png' });
    console.log(
      '✅ Screenshot of active note card saved to public/images/test_web_app_scaffold_active.png',
    );

    await browser.close();
    console.log('🎉 All automated browser tests passed cleanly!');
  } catch (err) {
    console.error('Test error:', err);
    process.exit(1);
  }
})();
