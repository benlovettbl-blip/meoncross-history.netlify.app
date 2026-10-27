const puppeteer = require('puppeteer');

async function verifyAll() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });

  const results = [];

  for (let lNum = 1; lNum <= 26; lNum++) {
    const url = `http://localhost:3003/?view=lessons&unit=edexcel_medicine&lesson=${lNum}`;
    const consoleErrors = [];
    const onConsole = msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    };
    page.on('console', onConsole);

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await new Promise(r => setTimeout(r, 1200));

      const evaluation = await page.evaluate(async () => {
        const title = document.querySelector('.lesson-title, h1, .lesson-header-title')?.innerText || '';
        const chunks = Array.from(document.querySelectorAll('.narrative-chunk')).map(c => {
          const num = c.querySelector('.para-number')?.innerText || '';
          const heading = c.querySelector('.narrative-heading')?.innerText || '';
          const text = c.querySelector('.narrative-text')?.innerText || '';
          return { num, heading, len: text.length };
        });

        const imgEls = Array.from(document.querySelectorAll('.narrative-visual-plate img'));
        await Promise.all(imgEls.map(img => {
          if (img.complete && img.naturalWidth > 0) return Promise.resolve();
          return img.decode().catch(() => {});
        }));

        const plates = imgEls.map(img => ({
          src: img.getAttribute('src'),
          loaded: img.complete && img.naturalWidth > 0,
          naturalWidth: img.naturalWidth
        }));

        const drawers = Array.from(document.querySelectorAll('.cme-source-drawer')).map(d => {
          const tag = d.querySelector('.archival-meta-tag')?.innerText || '';
          const title = d.querySelector('.archival-drawer-title')?.innerText || '';
          return { tag, title };
        });

        return { title, chunks, plates, drawers };
      });

      // Check criteria
      const issues = [];
      if (evaluation.chunks.length === 0) issues.push('Zero narrative chunks');
      evaluation.chunks.forEach((c, idx) => {
        if (!c.num) issues.push(`Chunk ${idx + 1} missing paragraph number`);
        if (!c.heading) issues.push(`Chunk ${idx + 1} missing heading`);
        if (c.len < 100) issues.push(`Chunk ${idx + 1} text too short (${c.len} chars)`);
      });

      if (evaluation.plates.length < 2) {
        issues.push(`Expected 2 visual plates, got ${evaluation.plates.length}`);
      }
      evaluation.plates.forEach((p, idx) => {
        if (!p.loaded) issues.push(`Plate ${idx + 1} (${p.src}) failed to load`);
      });

      if (evaluation.drawers.length !== 5) {
        issues.push(`Expected 5 source drawers, got ${evaluation.drawers.length}`);
      }

      const status = issues.length === 0 ? 'PASS' : 'FAIL';
      results.push({ lNum, status, issues, chunks: evaluation.chunks.length, plates: evaluation.plates.length, drawers: evaluation.drawers.length });

      if (status === 'PASS') {
        console.log(`✅ Lesson ${lNum}/26: PASS (${evaluation.chunks.length} blocks, ${evaluation.plates.length} plates, ${evaluation.drawers.length} sources)`);
      } else {
        console.log(`❌ Lesson ${lNum}/26: FAIL - ${issues.join('; ')}`);
      }
    } catch (e) {
      console.log(`❌ Lesson ${lNum}/26: ERROR - ${e.message}`);
      results.push({ lNum, status: 'ERROR', issues: [e.message] });
    } finally {
      page.off('console', onConsole);
    }
  }

  await browser.close();

  const passed = results.filter(r => r.status === 'PASS').length;
  console.log(`\n======================================================`);
  console.log(`RESULTS: ${passed}/26 lessons passed full browser verification.`);
  console.log(`======================================================`);
}

verifyAll().catch(err => {
  console.error('Execution error:', err);
  process.exit(1);
});
