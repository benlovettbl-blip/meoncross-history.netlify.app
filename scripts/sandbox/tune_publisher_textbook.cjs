const puppeteer = require('puppeteer');
const path = require('path');

async function testTrialCss2() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

  const fileUrl =
    'file://' + path.resolve('public/units/water_and_sanitation/textbook_PUBLISHER.html');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  // Inject trial overrides
  await page.addStyleTag({
    content: `
      body {
        font-size: 9.80pt !important;
        line-height: 1.44 !important;
      }
      .narrative-p {
        margin: 0 0 4.5px 0 !important;
      }
      .fieldwork-image {
        height: 84px !important;
      }
      .fieldwork-analysis-grid {
        padding: 2.5px 4.5px !important;
        gap: 1.5px !important;
      }
      .fieldwork-row {
        font-size: 7.7pt !important;
        line-height: 1.28 !important;
      }
      .fw-label, .fw-desc {
        font-size: 7.7pt !important;
      }
      .fieldwork-hinge-box {
        font-size: 7.6pt !important;
        line-height: 1.28 !important;
        padding: 2px 4.5px !important;
      }
      .kf-actions-list {
        font-size: 7.5pt !important;
        line-height: 1.26 !important;
      }
      .kf-significance {
        font-size: 8.0pt !important;
        line-height: 1.30 !important;
      }
      .csb-body {
        font-size: 8.0pt !important;
        line-height: 1.30 !important;
      }
      .csb-takeaway {
        padding: 2px 4.5px !important;
        font-size: 7.6pt !important;
        line-height: 1.26 !important;
      }
      .archival-body {
        font-size: 8.3pt !important;
        line-height: 1.36 !important;
      }
      .archival-context-text, .archival-hinge-q {
        font-size: 7.6pt !important;
        line-height: 1.32 !important;
      }
      .cover-hero-img {
        max-height: 100mm !important;
        height: 100mm !important;
      }
      .back-section-title {
        margin: 1.8mm 0 1.5mm 0 !important;
      }
      .back-header-strip {
        margin-bottom: 2mm !important;
        padding-bottom: 1.5mm !important;
      }
      .bqr-code-box {
        width: 44px !important;
        height: 44px !important;
      }
    `,
  });

  const p1 = await page.evaluate(() => {
    const p = document.querySelectorAll('.textbook-page')[0];
    const pageInner = p.querySelector('.cover-container');
    const footer = p.querySelector('.cover-footer');
    let lastContentBottom = 0;
    for (const el of pageInner.children) {
      if (el === footer) continue;
      const r = el.getBoundingClientRect();
      if (r.bottom > lastContentBottom) lastContentBottom = r.bottom;
    }
    const footerTop = footer.getBoundingClientRect().top;
    return {
      pageOverflow: pageInner.scrollHeight - pageInner.clientHeight,
      gapBeforeFooter: Math.round(footerTop - lastContentBottom),
    };
  });

  console.log('Page 1 with 100mm hero plate:', JSON.stringify(p1, null, 2));
  await browser.close();
}

testTrialCss2().catch(console.error);
