const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function renderPdfToImages() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1800, deviceScaleFactor: 2 });

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
  </head>
  <body style="margin:0; background: #fff;">
    <div id="container"></div>
    <script>
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      
      async function loadPdf(base64Data) {
        const loadingTask = pdfjsLib.getDocument({ data: atob(base64Data) });
        const pdf = await loadingTask.promise;
        
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const p = await pdf.getPage(pageNum);
          const viewport = p.getViewport({ scale: 2.5 });
          const canvas = document.createElement('canvas');
          canvas.id = 'page-' + pageNum;
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.display = 'block';
          canvas.style.marginBottom = '20px';
          document.getElementById('container').appendChild(canvas);
          
          const ctx = canvas.getContext('2d');
          await p.render({ canvasContext: ctx, viewport: viewport }).promise;
        }
        window.renderComplete = true;
      }
    </script>
  </body>
  </html>
  `;

  await page.setContent(html);
  const pdfBase64 = fs
    .readFileSync('public/images/usa_specification_extract.pdf')
    .toString('base64');
  await page.evaluate((b64) => window.loadPdf(b64), pdfBase64);

  await page.waitForFunction('window.renderComplete === true', { timeout: 30000 });

  const c1 = await page.$('#page-1');
  await c1.screenshot({ path: 'public/images/usa_spec_p1.png' });

  const c2 = await page.$('#page-2');
  await c2.screenshot({ path: 'public/images/usa_spec_p2.png' });

  console.log('Successfully captured usa_spec_p1.png and usa_spec_p2.png!');
  await browser.close();
}

renderPdfToImages().catch(console.error);
