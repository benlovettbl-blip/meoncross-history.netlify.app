const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1600 });
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    
    await page.goto('http://localhost:3003/unit.html?id=early_modern_world&lesson=0', {waitUntil: 'domcontentloaded'});
    
    try {
        await page.waitForSelector('#content-area', {timeout: 5000});
        await new Promise(r => setTimeout(r, 2000)); // wait for render
        
        await page.screenshot({ path: 'C:/Users/fives/.gemini/antigravity-ide/brain/da21a9c4-d056-4566-b977-f2025ba36822/puppeteer_screenshot_lesson0_direct.png', fullPage: true });
        console.log("Saved full page screenshot.");
    } catch (e) {
        console.error("Error:", e.message);
    }
    
    await browser.close();
})();
