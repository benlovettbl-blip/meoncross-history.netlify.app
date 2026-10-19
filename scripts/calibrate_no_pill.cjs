const puppeteer = require('puppeteer');
const { auditPageBudget } = require('./audit_page_budget.cjs');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

  const render = require('./render_standard_textbook_cme_unified.cjs');
  let baseHtml = render.buildCmeUnifiedHtml();

  // Strip para-pill
  baseHtml = baseHtml.replace(/<span class="para-pill">\[\d+\.\d+\]<\/span>\s*/g, '');

  // Replace symbols
  baseHtml = baseHtml.replace(
    /<span class="eq-icon">&sect;<\/span>/g,
    '<span class="eq-badge">KEY ENQUIRY QUESTION:</span>',
  );
  baseHtml = baseHtml.replace(
    /<span class="anchor-icon">&Delta;<\/span>/g,
    '<span class="anchor-badge">DECISIVE HISTORICAL MECHANISM:</span>',
  );

  const configs = [];
  for (let lh of [1.58, 1.585, 1.59, 1.595, 1.6]) {
    for (let mb of [6.0, 6.3, 6.6, 7.0]) {
      for (let nb of [9.0, 9.5, 10.0]) {
        configs.push({
          lh,
          mb,
          nb,
          css: `.prose-p { line-height: ${lh} !important; margin-bottom: ${mb}px !important; } .narrative-block { margin-bottom: ${nb}px !important; }`,
        });
      }
    }
  }

  let best = null;
  let bestScore = 999;

  for (let i = 0; i < configs.length; i++) {
    const cfg = configs[i];
    let testHtml = baseHtml.replace('</style>', `${cfg.css}\n</style>`);
    await page.setContent(testHtml, { waitUntil: 'domcontentloaded' });
    await new Promise((r) => setTimeout(r, 200));

    const audit = await auditPageBudget(page, {
      pageSelector: '.a4-page',
      maxPageHeightPx: 1123,
      underflowThresholdPx: 40,
      minUtilizationPct: 88,
      maxGapAboveFooterPx: 25,
      maxInterTaskGapPx: 35,
    });

    const issues = audit.results.filter(
      (r) => r.isVoidFooter || r.isOverflow || r.isPhantomColumnSpill || r.isVoidInternalProse,
    );
    const score = issues.length;

    if (score < bestScore) {
      bestScore = score;
      best = {
        ...cfg,
        issues: issues.map(
          (p) =>
            `P${p.pageNum}(gap:${p.gapAboveFooter},over:${p.overflow},spill:${p.isPhantomColumnSpill ? p.horizontalSpillPx : 0})`,
        ),
      };
      console.log(
        `New Best: ${28 - bestScore}/28 optimal (lh: ${cfg.lh}, mb: ${cfg.mb}, nb: ${cfg.nb})`,
      );
      if (score === 0) break;
    }
  }

  console.log('\n--- FINAL BEST ---');
  console.log('Best score:', 28 - bestScore, '/ 28');
  console.log('Params:', best);

  await browser.close();
})();
