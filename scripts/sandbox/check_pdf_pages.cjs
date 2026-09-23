const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function run() {
  const bytes = fs.readFileSync('public/pdfs/early_modern_world_pupil_workbook_FINAL_V17.pdf');
  const doc = await PDFDocument.load(bytes);
  console.log('Page count:', doc.getPageCount());
  for (let i = 0; i < doc.getPageCount(); i++) {
    const page = doc.getPage(i);
    const { width, height } = page.getSize();
    console.log('Page ' + (i + 1) + ': ' + width + ' x ' + height);
  }
}
run();
