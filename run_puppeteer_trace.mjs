import puppeteer from 'puppeteer';

(async () => {
  console.log("Launching browser for stack trace...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Expose function to capture unhandled rejections or window errors
  await page.exposeFunction('logErrorStackTrace', (msg, stack) => {
    console.error('PAGE UNCAUGHT ERROR:', msg);
    console.error(stack);
  });
  
  await page.evaluateOnNewDocument(() => {
    window.addEventListener('error', event => {
      window.logErrorStackTrace(event.message, event.error ? event.error.stack : 'No stack');
    });
    window.addEventListener('unhandledrejection', event => {
      window.logErrorStackTrace(event.reason.message, event.reason.stack || 'No stack');
    });
  });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  console.log("Navigating to http://localhost:3003/eee/index.html");
  await page.goto('http://localhost:3003/eee/index.html', { waitUntil: 'networkidle2' });
  
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
