const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set viewport to simulate a wide desktop
  await page.setViewport({ width: 1600, height: 1200 });
  
const unitId = process.argv[2] || 'water_and_sanitation';
  console.log(`Navigating to http://localhost:3001/unit.html?id=${unitId}...`);
  await page.goto(`http://localhost:3001/unit.html?id=${unitId}`, { waitUntil: 'domcontentloaded' });
  
  // Wait for React/scripts to render
  await new Promise(r => setTimeout(r, 2000));
  
  console.log('Page loaded. Running overflow detection...');
  
  const overflows = await page.evaluate(() => {
    const issues = [];
    
    // Force all pages to be visible for checking
    const allPages = document.querySelectorAll('.page, .page-landscape');
    allPages.forEach(p => { 
      p.style.display = 'flex'; 
    });
    
    // Wait a tiny bit for layout to settle (though synchronously is usually fine after display:flex)
    allPages.forEach(p => {
      const pageBounds = p.getBoundingClientRect();
      const pageId = p.id || 'unknown-page';
      
      // We check all elements inside the page
      const elements = p.querySelectorAll('*');
      elements.forEach(el => {
        // Ignore hidden elements, empty containers, scripts, styles
        if (el.style.display === 'none' || el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return;
        
        const bounds = el.getBoundingClientRect();
        
        // Skip elements with 0 width/height
        if (bounds.width === 0 || bounds.height === 0) return;
        
        // Check if element spills out of the bottom of the page
        // Tolerance of 10px to avoid false positives with borders/shadows
        if (bounds.bottom > pageBounds.bottom + 10) {
           issues.push({
             page: pageId,
             element: el.tagName,
             classes: el.className,
             text: el.textContent.substring(0, 50).trim().replace(/\n/g, ' '),
             overflowBottom: Math.round(bounds.bottom - pageBounds.bottom)
           });
        }
      });
    });
    
    return issues;
  });
  
  console.log('\n--- Overflow Report ---');
  if (overflows.length === 0) {
    console.log('✅ All pages fit perfectly! No overflows detected.');
  } else {
    console.log(`❌ Found ${overflows.length} elements spilling off their pages:\n`);
    
    // De-duplicate issues (since a parent spilling might cause children to spill)
    // We group by page to make it readable
    const issuesByPage = {};
    overflows.forEach(o => {
      if (!issuesByPage[o.page]) issuesByPage[o.page] = [];
      issuesByPage[o.page].push(o);
    });
    
    for (const [pageId, issues] of Object.entries(issuesByPage)) {
       console.log(`\nPage ID: ${pageId}`);
       issues.forEach(i => {
          console.log(`  - <${i.element} class="${i.classes}"> "${i.text}" (Spills by ${i.overflowBottom}px)`);
       });
    }
  }
  console.log('-----------------------\n');
  
  await browser.close();
})();
