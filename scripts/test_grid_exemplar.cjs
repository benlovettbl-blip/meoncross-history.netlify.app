const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3003/index.html?view=lessons&unit=edexcel_medicine&lesson=8', {
    waitUntil: 'networkidle2',
  });
  await new Promise((r) => setTimeout(r, 2000));

  const drawers = await page.$$('details.cme-source-drawer, details.archival-drawer');
  let sourceB = null;
  for (const d of drawers) {
    const text = await page.evaluate((el) => el.innerText, d);
    if (text.includes('SOURCE B') && text.includes('Plague Victim')) {
      sourceB = d;
      break;
    }
  }

  await page.evaluate((d) => {
    d.open = true;
  }, sourceB);
  await new Promise((r) => setTimeout(r, 600));

  // Expand
  const origBtn = await sourceB.$('.btn-think-discuss-toggle');
  if (origBtn) {
    await page.evaluate((btn) => btn.click(), origBtn);
    await new Promise((r) => setTimeout(r, 500));
  }

  // Transform into Grid Exemplar Cards below split
  await page.evaluate((d) => {
    const splitLayout = d.querySelector('.archival-source-split-layout');
    const mediaCol = d.querySelector('.archival-source-media-col');
    const exemplarPanel = d.querySelector('.think-discuss-exemplar-panel');
    const citationFooter = d.querySelector('.archival-citation-footer');

    if (citationFooter && mediaCol) {
      citationFooter.style.marginTop = '10px';
      citationFooter.style.borderTop = '1px solid rgba(255,255,255,0.12)';
      citationFooter.style.paddingTop = '8px';
      citationFooter.style.fontSize = '0.74rem';
      citationFooter.style.lineHeight = '1.35';
      citationFooter.style.color = '#94a3b8';
      mediaCol.appendChild(citationFooter);
    }

    if (exemplarPanel && splitLayout) {
      exemplarPanel.style.marginTop = '14px';
      exemplarPanel.style.width = '100%';
      exemplarPanel.style.boxSizing = 'border-box';
      const container = exemplarPanel.querySelector('div[style*=\"flex-direction: column\"]');
      if (container) {
        container.style.display = 'grid';
        container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(320px, 1fr))';
        container.style.gap = '12px';
      }
      splitLayout.parentNode.insertBefore(exemplarPanel, splitLayout.nextSibling);
    }
  }, sourceB);

  await new Promise((r) => setTimeout(r, 600));
  await sourceB.screenshot({ path: path.resolve(__dirname, '../source_b_grid_exemplar.png') });
  await browser.close();
  console.log('Saved source_b_grid_exemplar.png');
})();
