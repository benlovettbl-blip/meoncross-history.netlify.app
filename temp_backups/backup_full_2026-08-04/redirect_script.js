const fs = require('fs');
const path = require('path');

const units = [
  'change_1450_1750', 
  'edexcel_medicine', 
  'eee', 
  'great_war', 
  'great_war_part2', 
  'water_and_sanitation', 
  'weimar_nazi_germany', 
  'cme_new'
];

units.forEach(unit => {
  const indexFile = path.join(__dirname, unit, 'index.html');
  if (fs.existsSync(indexFile)) {
    const redirectHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=/unit.html?id=${unit}">
  <script>window.location.replace('/unit.html?id=${unit}');</script>
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting to the unified unit application...</p>
</body>
</html>`;
    fs.writeFileSync(indexFile, redirectHtml);
    console.log('Replaced ' + unit + '/index.html with redirect.');
  }
});
