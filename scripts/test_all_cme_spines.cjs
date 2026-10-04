const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  const lessonIndices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  console.log('Testing all 12 CME lessons on localhost:3003...');

  for (const idx of lessonIndices) {
    const url = `http://localhost:3003/?unit=cme_new&lesson=${idx}`;
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 800));

    const result = await page.evaluate(() => {
      const spine = document.querySelector('#lesson-chronology-spine');
      if (!spine) return { found: false };
      const cards = document.querySelectorAll('.cme-spine-card');
      const jumpBtn = document.querySelector('.btn-causal-spine-jump');
      const stageTitles = Array.from(cards).map((c) => {
        const titleEl = c.querySelector('h5');
        const motiveEl = c.querySelector(
          '.cme-quiz-target[data-quiz-type="motive"] .cme-quiz-content',
        );
        const resultEl = c.querySelector(
          '.cme-quiz-target[data-quiz-type="result"] .cme-quiz-content',
        );
        return {
          title: titleEl ? titleEl.textContent.trim() : '',
          hasMotive: !!motiveEl && motiveEl.textContent.trim().length > 0,
          hasResult: !!resultEl && resultEl.textContent.trim().length > 0,
        };
      });

      return {
        found: true,
        cardsCount: cards.length,
        hasJumpBtn: !!jumpBtn,
        jumpBtnText: jumpBtn ? jumpBtn.innerText.trim() : '',
        stages: stageTitles,
      };
    });

    console.log(
      `Lesson ${idx}: Spine Found=${result.found}, Cards=${result.cardsCount}, JumpBtn=${result.hasJumpBtn} (${result.jumpBtnText})`,
    );
    if (result.stages) {
      const validStages = result.stages.filter((s) => s.title && s.hasMotive && s.hasResult);
      console.log(`   Stages valid: ${validStages.length}/${result.stages.length}`);
      if (validStages.length !== 5) {
        console.warn(`   WARNING: Stages issue in lesson ${idx}!`, result.stages);
      }
    }
  }

  await browser.close();
  console.log('Testing complete.');
})();
