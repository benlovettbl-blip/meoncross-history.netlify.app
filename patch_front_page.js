const fs = require('fs');

let content = fs.readFileSync('generate_workbooks.js', 'utf8');

// 1. Make Name and Class one line
content = content.replace(
  /<div style="display: flex; flex-direction: column; align-items: center; margin: 40px auto 0 auto; width: 60%; gap: 20px;">\s*<div[^>]*>Name: <\/div>\s*<div[^>]*>Class: <\/div>\s*<\/div>/g,
  `<div style="display: flex; flex-direction: row; justify-content: center; margin: 25px auto 0 auto; width: 80%; gap: 40px;">
      <div style="flex: 2; border-bottom: 1px solid #000; padding-bottom: 5px; font-weight: 500; font-size: 14pt;">Name: </div>
      <div style="flex: 1; border-bottom: 1px solid #000; padding-bottom: 5px; font-weight: 500; font-size: 14pt;">Class: </div>
    </div>`
);

// 2. Remove the page break before the tracker table and the repeated H2 heading
content = content.replace(
  /<!-- Tracker Table on its own page -->\s*<div style="page-break-before: always;"><\/div>\s*<h2 style="margin-bottom: 25px; margin-top: 60px; font-size: 24pt; text-align: center; border-bottom: none;">Progress & Assessment Tracker<\/h2>/g,
  `<!-- Tracker Table now on front page -->`
);

// 3. Reduce margin/padding above the tracker table and hero image to ensure it fits on the front page
content = content.replace(
  /<div style="margin: 0 5%; width: 90%;">\s*<table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 9\.5pt;">/g,
  `<div style="margin: 30px 5% 0 5%; width: 90%;">
      <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 9.5pt;">`
);

// 4. Shrink the hero image / cover sources slightly so they don't push the table off the page
content = content.replace(
  /<div style="margin: 40px auto 20px auto; text-align: center; max-width: 85%;">\s*<img src="\${heroImageSrc}" style="width: 100%; max-height: 400px;/g,
  `<div style="margin: 25px auto 10px auto; text-align: center; max-width: 85%;">
        <img src="\${heroImageSrc}" style="width: 100%; max-height: 250px;`
);

content = content.replace(
  /<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; width: 85%; margin: 40px auto 20px auto;">/g,
  `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 85%; margin: 25px auto 15px auto;">`
);

fs.writeFileSync('generate_workbooks.js', content, 'utf8');
console.log('Successfully shrunk the front page layout!');
