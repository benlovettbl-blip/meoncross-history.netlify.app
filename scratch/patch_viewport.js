const fs = require('fs');

const dirs = [
  'change_1450_1750', 'cme', 'cme_new', 'cme_structured', 'great_war', 'great_war_part2', 'norman_conquest', 'water_and_sanitation', 'usa'
];

dirs.forEach(dir => {
  const filePath = `c:/Projects/meoncross-history.netlify.app/${dir}/index.html`;
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Explicitly add user-scalable=yes and maximum-scale=5.0 to viewport
    content = content.replace(
      /<meta name="viewport" content="width=device-width, initial-scale=1\.0">/g,
      '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">'
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Patched viewport in ${filePath}`);
  }
});
