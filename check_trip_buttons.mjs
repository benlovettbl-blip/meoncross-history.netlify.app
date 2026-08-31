import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', msg => {
        console.log('BROWSER_LOG:', msg.text());
    });
    
    page.on('pageerror', err => {
        console.log('BROWSER_ERROR:', err.message);
    });

    try {
        console.log('Navigating...');
        await page.goto('http://localhost:3006/unit?id=trip_ypres', { waitUntil: 'networkidle2' });
        
        console.log('Clicking day link...');
        await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('.lesson-link'));
            const dayLink = links.find(l => l.innerText.includes('Day 1') || l.innerText.includes('Day 2'));
            if (dayLink) dayLink.click();
            else console.log('Could not find Day link');
        });
        
        await new Promise(r => setTimeout(r, 2000));
        console.log('Clicking local hero link...');
        
        await page.evaluate(() => {
            const fallen = Array.from(document.querySelectorAll('.lesson-link')).find(l => l.innerText.includes('The Fallen'));
            if (fallen) fallen.click();
            const subLinks = Array.from(document.querySelectorAll('.sub-link'));
            if (subLinks.length > 0) subLinks[0].click();
            else console.log('Could not find Hero link');
        });
        
        await new Promise(r => setTimeout(r, 2000));
        
    } catch (e) {
        console.error('SCRIPT_ERROR', e);
    } finally {
        await browser.close();
    }
})();
