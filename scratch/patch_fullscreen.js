const fs = require('fs');

const dirs = [
  'change_1450_1750', 'cme', 'cme_new', 'cme_structured', 'great_war', 'great_war_part2', 'norman_conquest', 'water_and_sanitation', 'usa'
];

dirs.forEach(dir => {
  const filePath = `c:/Projects/meoncross-history.netlify.app/${dir}/index.html`;
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    content = content.replace(
      /onclick="if \(!document\.fullscreenElement\) \{ document\.documentElement\.requestFullscreen\(\); \} else \{ document\.exitFullscreen\(\); \}"/g,
      `onclick="if (!document.fullscreenElement) { const el = document.querySelector('.main-wrapper') || document.documentElement; el.requestFullscreen(); } else { document.exitFullscreen(); }"`
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Patched fullscreen logic in ${filePath}`);
  }
});
