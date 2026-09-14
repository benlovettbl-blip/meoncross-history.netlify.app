const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function testGoldenTriangle() {
  console.log('Launching headless browser with Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const screenshotDir = path.join(__dirname, '..', 'temp_screenshots');
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

  console.log('Navigating to http://localhost:3004/?unit=medieval_england&lesson=0 ...');
  await page.goto('http://localhost:3004/?unit=medieval_england&lesson=0', {
    waitUntil: 'networkidle2',
  });
  await new Promise((r) => setTimeout(r, 2000));

  await page.screenshot({
    path: path.join(screenshotDir, 'app_medieval_lesson1.png'),
    fullPage: false,
  });
  console.log('Saved temp_screenshots/app_medieval_lesson1.png');

  const lessonDetails = await page.evaluate(() => {
    const titleEl = document.querySelector('h1, h2, .lesson-title, .enquiry-title');
    const subtitleEl = document.querySelector('.lesson-subtitle, .lead');
    const tabs = Array.from(
      document.querySelectorAll('.lesson-tab, .tab-btn, .nav-tab, [data-tab]'),
    ).map((t) => t.innerText.trim());

    // Check for 4 Acts in text
    const acts = Array.from(document.querySelectorAll('*'))
      .filter((el) => {
        const t = el.innerText || '';
        return (
          (t.includes('Act 1') ||
            t.includes('Act 2') ||
            t.includes('Act 3') ||
            t.includes('Act 4')) &&
          el.children.length === 0
        );
      })
      .map((el) => el.innerText.trim());

    // Check for Paragraph numbers [1.1], [2.1], etc.
    const paras = Array.from(document.querySelectorAll('.para-ref, span, p'))
      .map((p) => p.innerText.trim())
      .filter((t) => /^\[\d+\.\d+\]/.test(t));

    // Check for Do Now
    const doNow = document.querySelector(
      '.do-now, .retrieval-grid, [data-view="do-now"], .spaced-retrieval',
    );

    // Check for Sources
    const sources = Array.from(
      document.querySelectorAll('.source-box, .archival-source, [data-source], .source-card'),
    ).map((s) => s.innerText.substring(0, 80));

    // Check for Workbook links / page references
    const wbLinks = Array.from(document.querySelectorAll('a, button, span, div'))
      .filter((el) => {
        const t = el.innerText || '';
        return t.toLowerCase().includes('workbook') || t.toLowerCase().includes('page 4');
      })
      .map((el) => el.innerText.trim())
      .filter((t) => t.length < 80);

    return {
      title: titleEl?.innerText?.trim(),
      subtitle: subtitleEl?.innerText?.trim(),
      tabs,
      acts: [...new Set(acts)].slice(0, 10),
      paraRefs: [...new Set(paras)].slice(0, 10),
      hasDoNow: !!doNow,
      doNowSnippet: doNow ? doNow.innerText.substring(0, 120) : null,
      sourcesCount: sources.length,
      sourceSnippets: sources.slice(0, 5),
      wbReferences: [...new Set(wbLinks)].slice(0, 10),
    };
  });

  console.log('Lesson 1 Inspection:', JSON.stringify(lessonDetails, null, 2));

  // Now test unit.html?id=medieval_england
  console.log('\nNavigating to http://localhost:3004/unit.html?id=medieval_england ...');
  await page.goto('http://localhost:3004/unit.html?id=medieval_england', {
    waitUntil: 'networkidle2',
  });
  await new Promise((r) => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(screenshotDir, 'app_unit_html_medieval.png') });
  console.log('Saved temp_screenshots/app_unit_html_medieval.png');

  const unitHtmlDetails = await page.evaluate(() => {
    return {
      title: document.title,
      h1: document.querySelector('h1')?.innerText?.trim(),
      sidebarLinks: Array.from(document.querySelectorAll('.lesson-link, .sidebar-link, a'))
        .map((a) => a.innerText.trim())
        .filter((t) => t.length > 0 && t.length < 60)
        .slice(0, 15),
      hasContent: document.body.innerText.length > 100,
    };
  });

  console.log('Unit.html Inspection:', JSON.stringify(unitHtmlDetails, null, 2));

  await browser.close();
}

testGoldenTriangle().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
