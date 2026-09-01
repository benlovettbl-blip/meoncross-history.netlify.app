const fs = require('fs');
const path = require('path');

const files = [
  'build_database.cjs',
  'check_overflows.cjs',
  'export_pdfs.cjs',
  'extract_units.cjs',
  'generate_pupil_workbooks.cjs',
  'generate_textbooks.cjs',
  'generate_timelines.cjs',
  'verify_asset_paths.cjs',
  'verify_images.cjs'
];

for (const f of files) {
  const p = path.join(process.cwd(), 'scripts', f);
  if (fs.existsSync(p)) {
      let content = fs.readFileSync(p, 'utf8');
      
      // Move ROOT_DIR definition after path requirement
      if (content.includes('const ROOT_DIR = path.join(__dirname, "..")\nconst path = require(\'path\')') ||
          content.includes('const ROOT_DIR = path.join(__dirname, "..");\nconst path = require(\'path\');')) {
          content = content.replace(/const ROOT_DIR = path\.join\(__dirname, "\.\."\);\s*const path = require\(['"]path['"]\);/g, 'const path = require(\'path\');\nconst ROOT_DIR = path.join(__dirname, "..");');
          fs.writeFileSync(p, content);
          console.log('Fixed path require order in ' + f);
      } else if (content.match(/const ROOT_DIR = path\.join\(__dirname, "\.\."\);\s*const path = require\(['"]path['"]\);/)) {
          content = content.replace(/const ROOT_DIR = path\.join\(__dirname, "\.\."\);\s*const path = require\(['"]path['"]\);/g, 'const path = require(\'path\');\nconst ROOT_DIR = path.join(__dirname, "..");');
          fs.writeFileSync(p, content);
          console.log('Fixed path require order in ' + f);
      }
      
      // Also check if `const ROOT_DIR` is before `const path` via regex
      const rootDirIdx = content.indexOf('const ROOT_DIR = path.join(__dirname, "..");');
      const pathIdx = content.indexOf("const path = require('path');");
      if (rootDirIdx !== -1 && pathIdx !== -1 && rootDirIdx < pathIdx) {
          content = content.replace("const path = require('path');", "");
          content = content.replace('const ROOT_DIR = path.join(__dirname, "..");', "const path = require('path');\nconst ROOT_DIR = path.join(__dirname, \"..\");");
          fs.writeFileSync(p, content);
          console.log('Fixed path require order via generic fallback in ' + f);
      }
  }
}
