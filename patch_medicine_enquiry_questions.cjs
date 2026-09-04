/**
 * patch_medicine_enquiry_questions.cjs
 * Replaces the generic medicine unit title/enquiry question with
 * a period-specific enquiry question on all workbook and textbook HTML covers.
 */
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'units', 'edexcel_medicine');

// Period-specific enquiry questions
const enquiryQuestions = {
  medieval: 'Why did medieval medicine change so little — and what finally broke the deadlock?',
  renaissance: 'Did the Renaissance truly revolutionise medicine, or was it all talk?',
  '18th_19th': 'Was the 19th century the real turning point for medicine in Britain?',
  modern:
    'Why has medicine advanced more in the 20th century than in all previous history combined?',
  western_front: 'How did the horror of the Western Front both damage and advance medicine?',
};

const GENERIC = 'How has medicine changed from c1250 to the modern day?';

const files = fs.readdirSync(dir).filter((f) => f.endsWith('.html'));

files.forEach((file) => {
  // Identify which period this file belongs to
  const period = Object.keys(enquiryQuestions).find((p) => file.includes(p));
  if (!period) return; // not a period-specific file

  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes(GENERIC)) return; // already updated

  content = content.replaceAll(GENERIC, enquiryQuestions[period]);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅  ${file} → "${enquiryQuestions[period]}"`);
});

console.log('\nDone. Regenerate PDFs with: node scripts/export_pdfs.cjs edexcel_medicine');
