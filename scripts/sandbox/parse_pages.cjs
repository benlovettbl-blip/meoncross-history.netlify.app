const fs = require('fs');
const pdfParse = require('pdf-parse');

async function run() {
  const dataBuffer = fs.readFileSync('public/pdfs/early_modern_world_pupil_workbook_FINAL_V17.pdf');

  // Custom pager render
  let pageTexts = [];
  function render_page(pageData) {
    let render_options = {
      normalizeWhitespace: false,
      disableCombineTextItems: false,
    };
    return pageData.getTextContent(render_options).then(function (textContent) {
      let lastY,
        text = '';
      for (let item of textContent.items) {
        if (lastY == item.transform[5] || !lastY) {
          text += item.str;
        } else {
          text += '\n' + item.str;
        }
        lastY = item.transform[5];
      }
      return text;
    });
  }

  let options = {
    pagerender: render_page,
  };

  const data = await pdfParse(dataBuffer, options);

  // Let's also do page by page with PDFDocument
  console.log('Total text length:', data.text.length);
  // Search for the exploration text
  const idx = data.text.indexOf('EXPLORATION BALANCE SHEET');
  console.log('Index of EXPLORATION BALANCE SHEET:', idx);
  if (idx !== -1) {
    console.log('Surrounding text:\n' + data.text.slice(idx, idx + 800));
  }
}
run();
