const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('http://localhost:3003/unit.html?id=early_modern_world', {waitUntil: 'networkidle2'});
    
    await new Promise(r => setTimeout(r, 2000));
    
    // Save screenshot
    await page.screenshot({ path: 'C:/Users/fives/.gemini/antigravity-ide/brain/da21a9c4-d056-4566-b977-f2025ba36822/puppeteer_screenshot.png' });
    
    await browser.close();
    console.log("Saved screenshot.");
})();
