const fs = require('fs');
const path = require('path');

const updates = {
  'public/units/cme_new/data.js': 'Edexcel GCSE: Conflict in the Middle East, 1945-1995',
  'public/units/edexcel_medicine/data.js': 'Edexcel GCSE: Medicine Through Time with the Western Front',
  'edexcel_medicine/data.js': 'Edexcel GCSE: Medicine Through Time with the Western Front',
  'public/units/great_war/data.js': 'KS3: Causes of the Great War',
  'great_war/data.js': 'KS3: Causes of the Great War',
  'public/units/change_1450_1750/data.js': 'KS3: Change 1450-1750',
  'change_1450_1750/data.js': 'KS3: Change 1450-1750',
  'public/units/water_and_sanitation/data.js': 'KS3: Water and Sanitation Through Time',
  'water_and_sanitation/data.js': 'KS3: Water and Sanitation Through Time'
};

for (const [file, title] of Object.entries(updates)) {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    // Support both 'title:' and '"title":'
    content = content.replace(/title:\s*['"][^'"]+['"]/, `title: "${title}"`);
    content = content.replace(/"title":\s*['"][^'"]+['"]/, `"title": "${title}"`);
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${file} to ${title}`);
  } else {
    console.log(`Skipped ${file} - not found`);
  }
}
