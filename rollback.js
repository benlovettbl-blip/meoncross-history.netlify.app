const fs = require('fs');
if (fs.existsSync('src/visual_sources.js')) fs.unlinkSync('src/visual_sources.js');

let code = fs.readFileSync('src/unit_router.js', 'utf8');
code = code.replace(/import \{ initVisualSourcesTask \}.*\n/g, '');
code = code.replace(/\/\/\ 5\.\ Visual Sources Tab[\s\S]*?sidebarNav\.appendChild\(vsLink\);\n\s*\}/, '');
fs.writeFileSync('src/unit_router.js', code, 'utf8');

let data = fs.readFileSync('early_modern_world/data.js', 'utf8');
data = data.replace(/\"visual_sources\":/g, '\"cover_sources\":');
fs.writeFileSync('early_modern_world/data.js', data, 'utf8');

console.log('Rollback successful');
