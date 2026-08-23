const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('response', response => {
        if (!response.ok()) {
            console.log('404 RESPONSE:', response.url());
        }
    });

    console.log('Navigating to dashboard...');
    await page.goto('http://localhost:51205/', { waitUntil: 'networkidle0' });
    
    console.log('Finding Launch Tour App button...');
    const buttons = await page.$$('button');
    let tourBtn = null;
    for (const btn of buttons) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text.includes('Launch Tour App')) {
            tourBtn = btn;
            break;
        }
    }
    
    if (tourBtn) {
        console.log('Clicking Launch Tour App...');
        await tourBtn.click();
        await page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {});
        console.log('New URL:', page.url());
        
        const bodyText = await page.evaluate(() => document.body.innerText);
        if (bodyText.includes('Unit Not Found')) {
            console.log('BODY CONTAINS "Unit Not Found"');
        } else {
            console.log('Body looks ok. Snapshotting...');
        }
        await page.screenshot({ path: 'puppeteer_click_test.png' });
    } else {
        console.log('Could not find Launch Tour App button.');
    }
    
    await browser.close();
})();
