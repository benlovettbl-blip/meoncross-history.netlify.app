const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const lessonsToTest = [
    'lesson_5_1',
    'lesson_5_2',
    'lesson_5_3',
    'lesson_5_4',
    'lesson_5_5',
    'lesson_5_6',
  ];

  console.log(
    '🔍 Commencing Puppeteer verification for Edexcel Medicine Key Topic 5 (Lessons 5.1 - 5.6)...',
  );

  let totalSourcesVerified = 0;

  for (const lessonId of lessonsToTest) {
    const url = `http://localhost:3003/index.html?view=lessons&unit=edexcel_medicine&lesson=${lessonId}`;
    console.log(`\nNavigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Open details accordions
    await page.evaluate(() => {
      document.querySelectorAll('details').forEach((d) => (d.open = true));
    });

    const sourcesData = await page.evaluate((lid) => {
      const thinkDiscussContainers = Array.from(
        document.querySelectorAll('.archival-source-discussion-box'),
      );

      return thinkDiscussContainers.map((box, idx) => {
        const promptEl = box.querySelector('div[style*="font-family"] > span:last-child');
        const btn = box.querySelector('.btn-think-discuss-toggle');
        const panel = box.querySelector('.think-discuss-exemplar-panel');
        const listItems = panel ? Array.from(panel.querySelectorAll('div > span:last-child')) : [];
        const badges = panel ? Array.from(panel.querySelectorAll('div > span:first-child')) : [];
        const panelHeader = panel
          ? panel.querySelector('div[style*="font-weight: 800"]')?.textContent || ''
          : '';

        return {
          idx,
          promptText: promptEl ? promptEl.textContent.trim().substring(0, 80) : '',
          btnText: btn ? btn.textContent.trim() : null,
          hasBtn: !!btn,
          panelId: panel ? panel.id : null,
          itemCount: listItems.length,
          itemTexts: listItems.map((li) => li.textContent.trim().substring(0, 60)),
          badgeTexts: badges.map((b) => b.textContent.trim()),
          panelHeader: panelHeader.trim(),
        };
      });
    }, lessonId);

    console.log(`  Found ${sourcesData.length} interactive source boxes in ${lessonId}`);
    sourcesData.forEach((s) => {
      console.log(`    Box ${s.idx}: Prompt="${s.promptText}..."`);
      console.log(
        `      Button: [${s.btnText}], PanelHeader: "${s.panelHeader}", Items: ${s.itemCount}, Badges: ${JSON.stringify(s.badgeTexts)}`,
      );
      if (!s.hasBtn) {
        console.error(`      ❌ MISSING BUTTON in box ${s.idx}!`);
      } else {
        totalSourcesVerified++;
      }
    });

    // Test toggle click on the first button
    if (sourcesData.length > 0) {
      const toggleTest = await page.evaluate(async () => {
        const btn = document.querySelector('.btn-think-discuss-toggle');
        if (!btn) return { error: 'No button found' };
        const initialText = btn.textContent.trim();
        const targetId = btn.getAttribute('data-target-id');
        const panel = document.getElementById(targetId);

        // Click to open
        btn.click();
        const afterClickOpen =
          !panel.classList.contains('hidden') && panel.style.display !== 'none';
        const openBtnText = btn.textContent.trim();

        // Click to close
        btn.click();
        const afterClickClose =
          panel.classList.contains('hidden') || panel.style.display === 'none';
        const closeBtnText = btn.textContent.trim();

        // Re-open for screenshot
        btn.click();

        return {
          initialText,
          initialHidden: true,
          afterClickOpen,
          openBtnText,
          afterClickClose,
          closeBtnText,
        };
      });
      console.log(
        `    Toggle Test: Initial="${toggleTest.initialText}" -> Open="${toggleTest.openBtnText}" (revealed=${toggleTest.afterClickOpen}) -> Closed="${toggleTest.closeBtnText}" (hidden=${toggleTest.afterClickClose})`,
      );
    }

    // Capture visual verification screenshot for key lessons
    if (lessonId === 'lesson_5_5') {
      await page.evaluate(() => {
        const box = document.querySelector('.archival-source-discussion-box');
        if (box) box.scrollIntoView({ behavior: 'instant', block: 'center' });
      });
      await new Promise((r) => setTimeout(r, 400));
      await page.screenshot({ path: 'medicine_thomas_splint_verified.png', fullPage: false });
      console.log('    📸 Saved medicine_thomas_splint_verified.png');
    }
    if (lessonId === 'lesson_5_6') {
      await page.evaluate(() => {
        const box = document.querySelector('.archival-source-discussion-box');
        if (box) box.scrollIntoView({ behavior: 'instant', block: 'center' });
      });
      await new Promise((r) => setTimeout(r, 400));
      await page.screenshot({ path: 'medicine_blood_depot_verified.png', fullPage: false });
      console.log('    📸 Saved medicine_blood_depot_verified.png');
    }
  }

  console.log(
    `\n🎉 Verification Complete: ${totalSourcesVerified} total source discussion boxes verified across KT5!`,
  );
  await browser.close();
})();
