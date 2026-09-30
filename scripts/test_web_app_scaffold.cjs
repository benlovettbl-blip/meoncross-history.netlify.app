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

    // Find element containing KT1.1 and click it to open the lesson
    const clicked = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll('*'));
      const target = els.find((el) => el.children.length === 0 && el.textContent.includes('KT1.1'));
      if (target) {
        target.click();
        return true;
      }
      return false;
    });
    console.log('Clicked KT1.1 lesson card:', clicked);
    await new Promise((r) => setTimeout(r, 2000));

    // Check if #lesson-note-scaffold exists
    const scaffoldExists = await page.evaluate(() => {
      const el = document.getElementById('lesson-note-scaffold');
      if (!el) return null;
      return {
        id: el.id,
        cardsCount: el.querySelectorAll('.note-scaffold-card').length,
        title: el.querySelector('h4') ? el.querySelector('h4').textContent : '',
      };
    });
    console.log('Scaffold details in DOM:', scaffoldExists);

    if (scaffoldExists) {
      const handle = await page.evaluateHandle(() =>
        document.getElementById('lesson-note-scaffold'),
      );
      await handle.asElement().screenshot({ path: 'public/images/test_web_app_note_scaffold.png' });
      console.log('✅ Screenshot saved to public/images/test_web_app_note_scaffold.png');

      // Test typing into textarea
      await page.type(
        '#note-text-lesson_1_1-0',
        'Test student note: Medieval people believed disease was punishment from God.',
      );
      console.log('✅ Successfully typed note into textarea');

      // Test Self-Quiz toggle
      await page.click('#btn-note-scaffold-quiz-mode');
      console.log('✅ Successfully toggled Self-Quiz Mode');
      await handle.asElement().screenshot({ path: 'public/images/test_web_app_quiz_mode.png' });
      console.log('✅ Saved quiz mode screenshot to public/images/test_web_app_quiz_mode.png');
    }

    await browser.close();
    console.log('🎉 Puppeteer test finished cleanly!');
  } catch (err) {
    console.error('❌ Error during verification:', err);
    process.exit(1);
  }
})();
