const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    let browser;
    try {
        browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
    } catch (e) {
        console.log('Connecting to existing browser failed, launching new instance...');
        browser = await puppeteer.launch({ headless: 'new' });
    }

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    const results = [];

    for (let lesson = 1; lesson <= 5; lesson++) {
        const url = `http://localhost:3003/index.html?view=lessons&unit=industrialisation_and_empire&lesson=${lesson}`;
        console.log(`Navigating to Lesson ${lesson}: ${url}`);
        await page.goto(url, { waitUntil: 'networkidle0' });
        await new Promise(r => setTimeout(r, 1200));

        // Evaluate plates and images
        const data = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('.narrative-visual-row'));
            const rowData = rows.map((r, idx) => {
                const img = r.querySelector('img');
                const title = r.querySelector('.plate-title')?.innerText || '';
                const tag = r.querySelector('.plate-tag')?.innerText || '';
                const isReversed = r.classList.contains('row-reversed');
                return {
                    idx,
                    title,
                    tag,
                    isReversed,
                    src: img?.getAttribute('src'),
                    naturalWidth: img?.naturalWidth || 0,
                    naturalHeight: img?.naturalHeight || 0
                };
            });

            // Check primary sources
            const sources = Array.from(document.querySelectorAll('.archival-source-box, .gcse-source-container'));
            return {
                rowCount: rows.length,
                rowData,
                sourceCount: sources.length
            };
        });

        const screenshotPath = path.join(__dirname, '..', `iae_lesson_${lesson}_verified.png`);
        await page.screenshot({ path: screenshotPath, fullPage: false });

        results.push({
            lesson,
            ...data,
            screenshot: screenshotPath
        });
    }

    console.log('RESULTS:', JSON.stringify(results, null, 2));

    await page.close();
    process.exit(0);
})();
