const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');

async function auditPages() {
  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  const htmlPath =
    'file:///' +
    path.resolve(__dirname, '../public/units/medieval_england/textbook.html').replace(/\\/g, '/');
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });

  const metrics = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.a4-page')).map((p, idx) => {
      const pageNum = idx + 1;
      const footer = p.querySelector('.page-running-footer') || p.querySelector('.page-footer');
      const footerTop = footer ? footer.getBoundingClientRect().top : 0;

      const leafElements = Array.from(
        p.querySelectorAll(
          '.prose-p, .block-title, .block-header, .back-synopsis-card, .back-enquiries-box, .back-perspectives-box, .back-themes-strip',
        ),
      );
      const bottoms = leafElements.map((el) => el.getBoundingClientRect().bottom);
      const maxBottom = bottoms.length > 0 ? Math.max(...bottoms) : 0;
      const gap = footerTop ? footerTop - maxBottom : 0;

      const clientH = p.clientHeight;
      const scrollH = p.scrollHeight;
      const overflow = scrollH > clientH + 4 ? scrollH - clientH : 0;

      return {
        pageNum,
        gapAboveFooter: Math.round(gap),
        overflow: Math.round(overflow),
        isOptimal: gap >= 0 && gap <= 25 && overflow === 0,
      };
    });
  });

  console.log('\n--- SPREAD TUNING METRICS ---');
  metrics.forEach((m) => {
    const status = m.isOptimal
      ? '✅ OPTIMAL'
      : m.overflow > 0
        ? `❌ OVERFLOW (+${m.overflow}px)`
        : `❌ VOID (${m.gapAboveFooter}px)`;
    console.log(
      `Page ${String(m.pageNum).padStart(2, ' ')}: ${status} (gap: ${m.gapAboveFooter}px, overflow: ${m.overflow}px)`,
    );
  });

  await browser.close();
}

auditPages().catch(console.error);
