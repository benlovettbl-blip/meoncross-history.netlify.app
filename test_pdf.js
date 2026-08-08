const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function testPdf() {
    const dataBuffer = fs.readFileSync('public/units/early_modern_world/workbook.pdf');
    const pdfDoc = await PDFDocument.load(dataBuffer);
    const pages = pdfDoc.getPageCount();
    console.log("-----------------------");
    console.log("PDF PAGES: " + pages);
    console.log("-----------------------");
    // With all content and page breaks rendered properly, optimal length is ~76 pages.
    if (pages > 80) {
        console.error("FAIL: PDF is " + pages + " pages long! There are still layout overflow issues.");
        process.exit(1);
    } else {
        console.log("SUCCESS: PDF is efficiently packed at " + pages + " pages.");
        process.exit(0);
    }
}
testPdf();
