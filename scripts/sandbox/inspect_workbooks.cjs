const fs = require('fs');

function inspectDetails(filePath) {
  if (!fs.existsSync(filePath)) return console.log('Missing:', filePath);
  const h = fs.readFileSync(filePath, 'utf8');

  // Check Spine stage banner styling
  const bannerMatches = h.match(/class=["']stage-banner["'][^>]*style=["']([^"']*)["']/);
  const bannerStyle = bannerMatches ? bannerMatches[1] : 'NONE';

  // Check left spine width
  const spineColMatches = h.match(
    /style=["'][^"']*width:\s*(\d+mm)[^"']*border-right:[^"']*box-sizing:\s*border-box[^"']*["']/,
  );
  const spineWidth = spineColMatches
    ? spineColMatches[1]
    : (h.match(/width:\s*(\d+mm)/) || [])[1] || 'Unknown';

  // Check last 2 pages
  const lastPageMatch = h.match(/id=["']page-(\d+)["'][\s\S]*?<\/div>\s*<\/div>\s*<\/body>/);
  const lastPageNum = (h.match(/id=["']page-(\d+)["']/g) || []).pop();

  // Check QR codes on back cover
  const qrCount = (h.match(/<svg/g) || []).length;

  // Check Notes page
  const hasNotes =
    h.includes('Notes & Examination Strategy') ||
    h.includes('Notes Page') ||
    h.includes('Exercise Book');

  console.log('=== ' + filePath + ' ===');
  console.log('Last Page:', lastPageNum);
  console.log('Spine Width:', spineWidth);
  console.log('Banner Style:', bannerStyle.slice(0, 100));
  console.log('Total SVG (QR) count:', qrCount);
  console.log('Has British Exercise Notes:', hasNotes);
}

inspectDetails('public/units/edexcel_medicine/pupil_workbook_renaissance.html');
inspectDetails('public/units/weimar_nazi_germany/pupil_workbook_KT1.html');
inspectDetails('public/units/eee/pupil_workbook_KT1.html');
