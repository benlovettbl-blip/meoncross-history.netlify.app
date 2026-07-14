const fs = require('fs');
let code = fs.readFileSync('src/core_app.js', 'utf8');

const helper = `export function getAssetUrl(path) {
  if (!path) return path;
  if (path.startsWith('http') || path.startsWith('/')) return path;
  if (window.currentUnitId) {
    return \`/\${window.currentUnitId}/\${path}\`;
  }
  return path;
}
`;

// Insert the helper function at the top of the file
if (!code.includes('getAssetUrl')) {
  code = code.replace("import { initKeyIndividualsTask } from './key_individuals.js';", "import { initKeyIndividualsTask } from './key_individuals.js';\n\n" + helper);
}

// Now replace usages of image paths
// e.g. <img src="${src}"
code = code.replace(/<img src="\$\{([^}]+)\}"/g, '<img src="${getAssetUrl($1)}"');
code = code.replace(/<img src="\$\{([^}]+)\.image\}"/g, '<img src="${getAssetUrl($1.image)}"');
// In renderTaboo: `<img src="${data.img}"`
code = code.replace(/<img src="\$\{data\.img\}"/g, '<img src="${getAssetUrl(data.img)}"');

fs.writeFileSync('src/core_app.js', code, 'utf8');
console.log('Updated core_app.js with getAssetUrl');
