const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test.describe('Worksheet Print Layout Automation', () => {

  // The maximum height of an A4 page minus typical print margins.
  // A4 at 96 DPI is 794x1123 pixels.
  // With standard margins, the safe area is typically around 1050 pixels.
  const MAX_SAFE_PAGE_HEIGHT_PX = 1050;

  const styles = ['study', 'timeline', 'exam', 'quiz'];
  const answerModes = [false, true];

  // We can use a single context and load the app once to access window.generateBulkWorkbookHtml
  let appPage;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    appPage = await context.newPage();
    // Start Vite dev server if running, or just use the local build if configured in Playwright
    // Assuming Playwright is configured with a baseURL that serves the app
    await appPage.goto('/');
    
    // Wait for the app to initialize and expose generateBulkWorkbookHtml
    await appPage.waitForFunction(() => typeof window.generateBulkWorkbookHtml === 'function');
  });

  for (const style of styles) {
    for (const hasAnswers of answerModes) {
      
      const modeName = hasAnswers ? 'Teacher_Answers' : 'Student_Sheet';
      const testName = `Print Layout: ${style} (${modeName})`;
      
      test(testName, async ({ browser }) => {
        // Generate the HTML via the app's window function
        const htmlContent = await appPage.evaluate(async ({ s, a }) => {
          // Assuming density is 'comfortable' for these tests
          return await window.generateBulkWorkbookHtml(s, 'comfortable', a);
        }, { s: style, a: hasAnswers });

        // Create a new blank page to render the generated worksheet
        const printContext = await browser.newContext();
        const printPage = await printContext.newPage();
        
        // Set the content of the page
        await printPage.setContent(htmlContent, { waitUntil: 'networkidle' });
        
        // Emulate print media
        await printPage.emulateMedia({ media: 'print' });

        // Find all elements that are configured to avoid breaking inside
        // This includes questions, timeline blocks, etc.
        const elementsToVerify = await printPage.locator('[style*="page-break-inside: avoid"], .worksheet-page, .question-container, .timeline-block, table').all();
        
        for (const element of elementsToVerify) {
          const box = await element.boundingBox();
          if (box) {
            // Check if the element height exceeds the maximum safe printable height
            // If it does, it will spill across a page break awkwardly.
            expect(box.height).toBeLessThanOrEqual(MAX_SAFE_PAGE_HEIGHT_PX, `Element height ${box.height} exceeds maximum safe page height of ${MAX_SAFE_PAGE_HEIGHT_PX}`);
          }
        }

        // Generate a PDF artifact
        const resultsDir = path.join(__dirname, '..', 'test-results', 'print-layouts');
        if (!fs.existsSync(resultsDir)) {
          fs.mkdirSync(resultsDir, { recursive: true });
        }
        
        const pdfPath = path.join(resultsDir, `worksheet_${style}_${modeName}.pdf`);
        await printPage.pdf({
          path: pdfPath,
          format: 'A4',
          printBackground: true,
          margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
        });

        await printContext.close();
      });
    }
  }
});
