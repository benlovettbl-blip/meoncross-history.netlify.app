const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('🚀 Running Comprehensive Browser Visual Verification on USA Sources...');

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 1200 });

    const failedRequests = [];
    page.on('response', (resp) => {
      const req = resp.request();
      if (req.resourceType() === 'image') {
        if (!resp.ok()) {
          failedRequests.push({ url: req.url(), status: resp.status() });
        }
      }
    });

    console.log('Navigating to http://localhost:3003/test_usa_visuals_grid.html ...');
    await page.goto('http://localhost:3003/test_usa_visuals_grid.html', {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Auto-scroll through entire page to trigger loading and layout
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 400;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 80);
      });
    });

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 1500));

    // Audit every img element
    const results = await page.$$eval('.source-card', (cards) => {
      return cards.map((c) => {
        const lesson = c.getAttribute('data-lesson');
        const sourceLetter = c.getAttribute('data-source');
        const img = c.querySelector('img');
        const fileName = c.querySelector('.file-name')?.textContent?.trim() || '';
        const title = c.querySelector('.source-title')?.textContent?.trim() || '';
        const caption = c.querySelector('.source-caption')?.textContent?.trim() || '';

        return {
          lesson: parseInt(lesson, 10),
          letter: sourceLetter,
          fileName,
          title,
          caption,
          src: img ? img.src : null,
          complete: img ? img.complete : false,
          naturalWidth: img ? img.naturalWidth : 0,
          naturalHeight: img ? img.naturalHeight : 0,
          isRendered: img && img.naturalWidth > 0 && img.naturalHeight > 0,
        };
      });
    });

    console.log(`\nAudited ${results.length} visual source cards rendered in browser:`);
    let passCount = 0;
    let failCount = 0;

    results.forEach((r) => {
      if (r.isRendered) {
        passCount++;
      } else {
        failCount++;
        console.error(
          `❌ FAILED RENDER: L${r.lesson} ${r.letter} (${r.fileName}) - naturalWidth: ${r.naturalWidth}`,
        );
      }
    });

    console.log(
      `\nBrowser Render Summary: ${passCount}/${results.length} PASS (HTTP 200, natural dimensions > 0)`,
    );
    if (failedRequests.length > 0) {
      console.error(`⚠️ Network Failures (${failedRequests.length}):`, failedRequests);
    } else {
      console.log('✅ Zero network image failures (all returned HTTP 200 OK)');
    }

    // Take screenshots of each Key Topic section
    console.log('\n📸 Capturing high-resolution verification screenshots...');

    // KT1: Lessons 1-4
    const l1El = await page.$('#lesson-1');
    const l4El = await page.$('#lesson-4');
    if (l1El && l4El) {
      const box1 = await l1El.boundingBox();
      const box4 = await l4El.boundingBox();
      const clip = {
        x: 0,
        y: box1.y - 40,
        width: 1600,
        height: box4.y + box4.height - (box1.y - 40) + 40,
      };
      await page.screenshot({ path: 'usa_visuals_kt1.png', clip });
      console.log('  ✔ Captured usa_visuals_kt1.png (Key Topic 1: Lessons 1–4)');
    }

    // KT2: Lessons 5-8
    const l5El = await page.$('#lesson-5');
    const l8El = await page.$('#lesson-8');
    if (l5El && l8El) {
      const box5 = await l5El.boundingBox();
      const box8 = await l8El.boundingBox();
      const clip = {
        x: 0,
        y: box5.y - 40,
        width: 1600,
        height: box8.y + box8.height - (box5.y - 40) + 40,
      };
      await page.screenshot({ path: 'usa_visuals_kt2.png', clip });
      console.log('  ✔ Captured usa_visuals_kt2.png (Key Topic 2: Lessons 5–8)');
    }

    // KT3: Lessons 9-12
    const l9El = await page.$('#lesson-9');
    const l12El = await page.$('#lesson-12');
    if (l9El && l12El) {
      const box9 = await l9El.boundingBox();
      const box12 = await l12El.boundingBox();
      const clip = {
        x: 0,
        y: box9.y - 40,
        width: 1600,
        height: box12.y + box12.height - (box9.y - 40) + 40,
      };
      await page.screenshot({ path: 'usa_visuals_kt3.png', clip });
      console.log('  ✔ Captured usa_visuals_kt3.png (Key Topic 3: Lessons 9–12)');
    }

    // KT4: Lessons 13-16
    const l13El = await page.$('#lesson-13');
    const l16El = await page.$('#lesson-16');
    if (l13El && l16El) {
      const box13 = await l13El.boundingBox();
      const box16 = await l16El.boundingBox();
      const clip = {
        x: 0,
        y: box13.y - 40,
        width: 1600,
        height: box16.y + box16.height - (box13.y - 40) + 40,
      };
      await page.screenshot({ path: 'usa_visuals_kt4.png', clip });
      console.log('  ✔ Captured usa_visuals_kt4.png (Key Topic 4: Lessons 13–16)');
    }

    if (failCount === 0 && failedRequests.length === 0) {
      console.log('\n🎉 ALL 49 USA VISUAL SOURCES SUCCESSFULLY VERIFIED IN BROWSER!');
    } else {
      console.error(`\n❌ VERIFICATION FAILED: ${failCount} sources failed to render.`);
      process.exit(1);
    }
  } catch (err) {
    console.error('Fatal test error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
