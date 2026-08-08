const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto('http://localhost:3003/unit.html?id=early_modern_world&lesson=0', {waitUntil: 'domcontentloaded'});
    
    try {
        await page.waitForSelector('#main-content', {timeout: 5000});
        await new Promise(r => setTimeout(r, 2000)); // wait for render
        
        const html = await page.evaluate(() => {
            return document.getElementById('main-content').innerHTML;
        });
        
        // Find lines containing Mehmed
        const lines = html.split('<').join('\n<').split('\n');
        lines.forEach(line => {
            if (line.includes('Mehmed')) {
                console.log("FOUND MEHMED:", line);
            }
        });
        
    } catch (e) {
        console.error("Error:", e.message);
    }
    
    await browser.close();
})();
