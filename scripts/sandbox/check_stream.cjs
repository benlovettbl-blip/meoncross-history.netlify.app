const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function run() {
  const bytes = fs.readFileSync('public/pdfs/early_modern_world_pupil_workbook_FINAL_V17.pdf');
  const doc = await PDFDocument.load(bytes);
  const page6 = doc.getPage(5); // 0-indexed: Page 6
  console.log('Page 6 node count / stream length:');
  const stream = page6.node.Contents();
  console.log('Contents stream exists?', !!stream);
}
run();
