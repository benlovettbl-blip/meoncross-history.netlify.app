const fs = require('fs');

let content = fs.readFileSync('generate_workbooks.js', 'utf8');

// 1. Sources block
content = content.replace(
  '`<div style="page-break-before: always; margin-bottom: 15px;">`;',
  '`<div style="page-break-inside: auto; margin-bottom: 15px;">`;'
);

// 2. Spectrum mapper
content = content.replace(
  'html += `<div style="page-break-before: always;"></div>`;',
  '// html += `<div style="page-break-before: always;"></div>`;'
);

// 3. GCSE Exam Practice (general)
content = content.replace(
  'html += `<div style="page-break-before: always;">`;\n      html += `<h2 style="margin-top: 0;">GCSE Exam Practice</h2>`;',
  'html += `<div style="page-break-inside: avoid; margin-top: 20px;">`;\n      html += `<h2 style="margin-top: 0;">GCSE Exam Practice</h2>`;'
);

// 4. GCSE Exam Practice (sources)
content = content.replace(
  'html += `<div style="page-break-before: always; page-break-after: always;">`;\n          if (unitId === \'edexcel_medicine\' || unitId === \'weimar_nazi_germany\') {',
  'html += `<div style="page-break-inside: avoid; margin-top: 20px;">`;\n          if (unitId === \'edexcel_medicine\' || unitId === \'weimar_nazi_germany\') {'
);

// 5. Exam Sources & Interpretations (isolated)
content = content.replace(
  'html += `<div style="page-break-before: always; page-break-after: always;">`; // Isolate sources on their own page',
  'html += `<div style="page-break-inside: avoid; margin-top: 20px;">`; // Do not isolate sources'
);


fs.writeFileSync('generate_workbooks.js', content, 'utf8');
console.log('Successfully patched generate_workbooks.js page breaks');
