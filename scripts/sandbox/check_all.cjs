const fs = require('fs');
const path = require('path');

const files = [
  'public/units/water_and_sanitation/textbook_PUBLISHER.html',
  'public/units/sandbox_pilot/pupil_workbook_pilot.html',
  'public/units/early_modern_world/pupil_workbook.html',
  'public/units/water_and_sanitation/pupil_workbook_v2.html',
];

files.forEach((f) => {
  if (!fs.existsSync(f)) {
    console.log(f, 'DOES NOT EXIST');
    return;
  }
  const content = fs.readFileSync(f, 'utf8');
  console.log('=== FILE:', f, '===');
  console.log('Size:', content.length);
  console.log('Includes undefined:', content.includes('undefined'));
  if (content.includes('undefined')) {
    const lines = content.split('\n');
    lines.forEach((l, i) => {
      if (l.includes('undefined')) console.log(`  Line ${i + 1}: ${l.trim().slice(0, 100)}`);
    });
  }
  console.log('Includes [object Object]:', content.includes('[object Object]'));
  console.log('Includes NaN:', content.includes('NaN'));
  console.log(
    'Broken images src="":',
    (content.match(/src=["'](\s*|null|undefined)["']/g) || []).length,
  );
  const pages = content.match(/class=["'][^"']*(?:page|a4-page|a5-page)[^"']*["']/g) || [];
  console.log('Page elements count:', pages.length);
});
