const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3003/unit.html?id=early_modern_world', {waitUntil: 'networkidle2'});
    
    // Wait for the lesson content to render
    await new Promise(r => setTimeout(r, 2000));
    
    // Click Lesson 1
    await page.evaluate(() => {
        const lessonTitles = Array.from(document.querySelectorAll('.lesson-title'));
        if (lessonTitles.length > 0) {
            lessonTitles[0].click();
        }
    });
    
    await new Promise(r => setTimeout(r, 2000));
    
    // Get the HTML of the first lesson content
    const html = await page.evaluate(() => {
        const content = document.querySelector('#lesson-content');
        return content ? content.innerHTML : 'No content found';
    });
    
    // Filter for Mehmed
    const mehmedHtml = html.split('\n').filter(line => line.includes('Mehmed')).join('\n');
    console.log("HTML containing Mehmed:");
    console.log(mehmedHtml);
    
    await browser.close();
})();
