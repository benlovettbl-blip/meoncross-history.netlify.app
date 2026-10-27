const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    const browser = await puppeteer.connect({
        browserURL: 'http://localhost:9222',
        defaultViewport: null
    });

    const pages = await browser.pages();
    const page = pages.find(p => p.url().includes('localhost:3003')) || pages[0];

    // Explicitly set 1440x900 viewport for testing
    await page.setViewport({ width: 1440, height: 900 });

    const results = [];

    for (let lesson = 1; lesson <= 5; lesson++) {
        const url = `http://localhost:3003/index.html?view=lessons&unit=second_british_empire&lesson=${lesson}`;
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

            const sources = Array.from(document.querySelectorAll('.archival-source-box, .gcse-source-container'));
            return {
                rowCount: rows.length,
                rowData,
                sourceCount: sources.length,
                windowWidth: window.innerWidth,
                contentWidth: Math.round(document.querySelector('#main-content')?.getBoundingClientRect().width || 0)
            };
        });

        const screenshotPath = path.join(__dirname, '..', `sbe_lesson_${lesson}_verified.png`);
        await page.screenshot({ path: screenshotPath, fullPage: false });

        results.push({
            lesson,
            ...data,
            screenshot: screenshotPath
        });
    }

    // Finally, restore the natural window size with width:0, height:0 so the user has an un-emulated browser
    try {
        const client = await page.target().createCDPSession();
        await client.send('Emulation.setDeviceMetricsOverride', {
            width: 0,
            height: 0,
            deviceScaleFactor: 0,
            mobile: false
        });
        await client.detach();
        console.log('Restored native un-emulated desktop window.');
    } catch (e) {
        console.log('Restore notice:', e.message);
    }

    console.log('RESULTS:', JSON.stringify(results, null, 2));

    await browser.disconnect();
    process.exit(0);
})();
